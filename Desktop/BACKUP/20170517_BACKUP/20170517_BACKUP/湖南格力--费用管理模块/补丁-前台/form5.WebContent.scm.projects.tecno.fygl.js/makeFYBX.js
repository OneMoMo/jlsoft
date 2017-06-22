/**
 * @author :周泽
 * 最后一次修改时间:2016-10-17 14:25:15
 * 类名:费用报销
 */
var makeFYBX = JL.JLForm();
var flag = 0;
makeFYBX.setPlugin({
	"toolbar" : {
	    "jlid": "JLToolBar",
	    "buttons": {
			"jlNewForm":{},
			/*"jlSaveDraft":{},*/
			"jlSaveForm":{
				"success":function(data,tip){
					debugger;
					makeFYBX.getTab().find("input[name=FYBXD01]").val(data.FYBXD01);
					//保存成功提示信息                                            
    		        tip.obj.remove();    //清除公共提示信息。
                    JL.tip("保存成功【单据号："+data.FYBXD01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
				}
			 },
			"jlDeleteForm":{}						
	    }
	},
	//代办部门权限
	"BM01":{
		"jlid": "JLInput", 
		"format": {
		}, 
		"AccessCzy" : {
			"BM01" : true
		}
	},
    //报销人
	"BXRMC":{
		"dir" : "scm/pub/search",
		"namespace" : "RYXX",
		"sqlid" : "ALL",
		"init" : {"GSXX01" : "GSXX01"},
		"fieldMapping" : {
			"RYMC" : "BXRMC",
			"RYXX01" : "BXR01"	
		},
		"listener" : {
			"beforequery" : function(data) {
				if (flag == 1) {
					JL.tip("报销人已选择，不可修改");
					return true;
				}
			}
		}
	
	},
	
	"SCFJ" : {"jlid" : "JLUpload"},
	
	//所属部门
	"BMMC":{
		"dir" : "scm/pub/search",
		"namespace" : "BM",
		"sqlid" : "ALL",
		"init" : {"GSXX01" : "GSXX01"},
		"fieldMapping" : {
			"BM01":"BM01",
			"BMMC":"BMMC"
		},
		 "listener" : {
			    "beforequery" : function(data) {
			    	  if(flag==1){
			    		  JL.tip("所属部门已选择，不可修改");
			    		  return true;
			    	  }
			    	  if(makeFYBX.getTab().find("input[name='BXRMC']").val()==""){
			    		  JL.tip("请先选择报销人");
			    		  return true;  
			    	  }
			    }
		 }
	},
	//报销日期
	"BXRQ":{
		"jlid":"JLDate",
		"defaultDate":JL.formatDate(0,1)
	},
	
	//查询请款申请
	"CXQKSQ":{
		"dir" : "scm/projects/tecno/fygl/search",
		"namespace" : "FYBX",
		"sqlid" : "queryQKSQ",
		"multi":false,
		"init" : {"GSXX01":"GSXX01"},
		"fieldMapping" : {
			"QKSQD01":"QKSQD01",
			"FYBM":"SPLB.FYBM",
    	 	"FYXM":"SPLB.FYXM",
    	 	"CWKM":"SPLB.CWKM",
    	 	"QKJE":"SPLB.QKJE",
    	 	"BXJE":"SPLB.BXJE"
		},
		"listener" : {
		    "beforequery" : function(data) {},
		    // 回填前的数据处理
	        "beforecallback" : function(data) {
	        	debugger;
	        	var SPLB = makeFYBX.getPluginObj("SPLB");
	        	if(SPLB.getData().length!=0){
	        		SPLB.setData([]);
	        		makeFYBX.getPluginObj("SPLB").hideButton("0",false);
	        		makeFYBX.getTab().find("input[name='QKSQD01']").val("");
	        	}
	        	//根据请款单号带出这个单据所有的明细
	        	var query = {"QKSQD01":data[0]["QKSQD01"],"GSXX01":userInfo["PCRM_GSXX01"]};
	        	var resultData = makeFYBX.getSqlResult(query, "MONGO_QKSQD", "SCM_QKSQD", "scm/projects/tecno/fygl/search");
	        	var Data =resultData.data.resultlist;
	        	if(Data.length!=0){
	        		for(var i=0;i<Data.length;i++){
	        			var FYBMMC = Data[i]["FYBMMC"].value;
	        			Data[i]["HBBZMC"]={"key":Data[i]["HBBZ"],"value":Data[i]["HBBZMC"]};
	        			Data[i]["FYBMMC"]={"key":Data[i]["FYBM"],"value":FYBMMC};
	        		}
	        	}
	        	makeFYBX.getPluginObj("SPLB").addData(Data);
	        },
		    "aftercallback" : function(data){
		         debugger;
		    	 makeFYBX.getPluginObj("SPLB").hideButton("0",true);
		    }
		}
	},
	
	//费用报销明细
	"SPLB":{
	    "jlid": "JLGrid",
	    "tittles" : "费用报销明细", 
	    "headers": [
	                {"id": "FYBM","name": "费用编码","width": 120},
	                {"id": "FYXM","name": "费用项目","width": 120},
	                {"id": "CWKM","name": "科目代码","width": 120},
	                {"id": "QKJE","name": "请款金额","width": 120,"align" : "right","format":"number|2"},
	                {"id": "FYBMMC","name": "费用部门","width": 120,
					    "editor" : {
					    	"type" : "plugin",
							"jlid": "JLSelect",
							"placeholder" : "请选择费用部门",
							"sqlid": "FYYS_FYBM",
							"resource": "scmform",
							"param" : {"GSXX01":userInfo["PCRM_GSXX01"]}
					    }	                	
	                },
	                {"id": "FYBM01","name": "费用部门编码","width": 120,"hidden": true},
	                {"id": "BXJE","name": "报销金额","width": 120,"align" : "right","format":"number|2"},
	                {"id": "PJSL","name": "票据数","width": 100},
	                {"id": "HBBZMC","name": "币种","width": 100,
	                	 "editor":{
	              		       "type":"plugin",
	              		       "jlid" : "JLSelect",
	              		       "placeholder" : "请选择币种",
	   	                       "sqlid": "QKSQD_BZ",
	   	                       "resource": "scmform",
	   	                       "param" : {"GSXX01":userInfo["PCRM_GSXX01"]}
	                	 }
	   	            },
	   	            {"id": "HBBZ","name": "币种编码","width": 120,"hidden": true},
	   	            {"id": "ZFFS","name": "支付方式","width": 120,
	                 	  "editor":{
	              		       "type":"text",
	              		       "jlid" : "JLQuery",
	              		       "dir" : "scm/projects/tecno/fygl/search",
	              		       "namespace" : "QKSQD",
	              		       "sqlid" : "FY_SKFS",
	             		       "form":makeFYBX,
	             		       "autoquery":true,
	             		       "update":true,
	   	           		   	   "init" : {"ZDR_RYXX01":"RYXX01"},
	   	           		   	   "fieldMapping" : {
		   	           		   	"SKFSMC" : "SPLB.ZFFS",
	   							"SKFS01" : "SPLB.ZFFS01",
	   							"YHBJ" : "SPLB.YHBJ"
	   	                      },
	   	                   "listener": {
	   	         		      "beforequery" : function(data) {
	   	         		    	  data["JEFS"]="(0,1,3)";
	   	         		      },
	   	         		      
	   	         		     "aftercallback" : function(data) {
								debugger;
								var SPLB = makeFYBX.getPluginObj("SPLB");
								for(var i=0;i<SPLB.getData().length;i++){
									if (SPLB.getData(i, "YHBJ") == "1") {
										SPLB.disabledCell("YHZH", i, false);
									    var GSXX01 = makeFYBX.getTab().find("input[name='GSXX01']").val();
				 			    		var resultData = makeFYBX.getSqlResult({"GSXX01":GSXX01}, "SKFS", "YHZHXX", "scm/pub/search");
			 			    		    if(resultData.data.length=1){
			 			    		       SPLB.setCell(resultData.data[0]["YHZH02"], i, SPLB.getRowIndexByID("YHZH"));
			 			    		       SPLB.setCell(resultData.data[0]["YHZH01"], i, SPLB.getRowIndexByID("YHZH01"));
			 			    		       SPLB.setCell(resultData.data[0]["YHXX02"], i, SPLB.getRowIndexByID("YHXX02"));
			 			    		    }
									} else {
										SPLB.disabledCell("YHZH", i, true);
										SPLB.setCell("", i, SPLB.getRowIndexByID("YHZH"));
									}
								}
								}
	   	         		    }
	              		   }
	                },
	                {"id": "ZFFS01","name": "支付方式编码","width": 120,"hidden": true},
	                {"id": "YHZH01","name": "银行账号代码","hidden": true},
	                {"id": "YHZH","name": "银行账号","width": 150,
	             	   "editor":{
	      	        	  "type":"text",
	      	        	  "jlid" : "JLQuery",
	      	        	  "dir" : "scm/pub/search",
	      	        	  "namespace" : "SKFS",
	      	        	  "sqlid" : "YHZHXX",
	      	        	  "form":makeFYBX,
	      	        	  "autoquery":true,  
	      	        	  "update":true,
	      	        	  "init" : {"GSXX01":"GSXX01"},
	      	        	  "fieldMapping" : {
	      	        		   "YHZH02" : "SPLB.YHZH",
	                           "YHZH01" : "SPLB.YHZH01",
	                           "YHXX02" : "SPLB.YHXX02"
	      	        	  }
	      	            }  
	                },
	                {"id": "YHXX02","name": "银行名称","hidden": true},
	                {"id": "YYDM","name": "原因代码","width": 300,
	                	 "editor":{
	             		       "type":"plugin",
	             		       "jlid" : "JLSelect",
	             		       "placeholder" :"请选择原因代码",
	  	                       "sqlid": "QKSQD_YYDM",
	  	                       "resource": "scmform",
	                   	 }
	                },
	                {"id": "BZ","name": "备注","width": 120}
	           ],
	           "primarykey" : ["FYBM","FYXM","CWKM"],
		       "queryConfig":{
			   	   "dir" : "scm/projects/tecno/fygl/search",
			       "namespace" : "FYBX",
			       "sqlid" : "BXMX",
				    "form":makeFYBX,
				    "multi":true,
				    "init": {"GSXX01":"GSXX01"},
				    "fieldMapping": {			
				    	 	"FYBM":"SPLB.FYBM",
					    	"FYXM":"SPLB.FYXM",
					    	"CWKM":"SPLB.CWKM"
				     	},
				  "listener": {
	 		    	"beforequery" : function(data){
	 		    		if(makeFYBX.getTab().find("input[name='BMMC']").val()==""){
	 		 				JL.tip("请先选择所属部门");
	 		 				return true;
		 		 		}		 			
	 		 		   },
	 			        // 回填前的数据处理
	 			        "beforecallback" : function(data) {},
	 			        // 回填后的数据处理
	 			        "aftercallback" : function(data) {
	 			        	flag=1;
	 			        	debugger;
	 			        	for(var i=0;i<data.length;i++){
	 			        	   makeFYBX.getPluginObj("SPLB").setCell(0, i, makeFYBX.getPluginObj("SPLB").getRowIndexByID("QKJE"));
	 			        	}
	 			        	//去查费用预算
		 			        /*for(var i=0;i<data.length;i++){
		 			        	var GSXX01 = makeFYBX.getTab().find("input[name='GSXX01']").val();
		 			        	var FYBM = data[i]["FYBM"];
		 			        	var CWKM = data[i]["CWKM"];
								var resultData = makeFYBX.getSqlResult({"GSXX01":GSXX01,"FYBM":FYBM,"CWKM":CWKM}, "FYBX", "QKJE", "scm/projects/tecno/fygl/search");
								resultData = resultData.data;
								if(resultData.length>0){
									resultData = resultData[0];
									makeFYBX.getPluginObj("SPLB").setCell(resultData["QKJE"], i, makeFYBX.getPluginObj("SPLB").getRowIndexByID("QKJE"));
								}else{
									makeFYBX.getPluginObj("SPLB").setCell(0, i, makeFYBX.getPluginObj("SPLB").getRowIndexByID("QKJE"));
								}
							  }*/
		 			     makeFYBX.getTab().find("li[id='cxqksq']").hide();//隐藏查询请款按钮
	 			        }
	 		          }
				     },
	           "buttons" : [0,{"text":"删除","func": function(){
	        	debugger;
	        	makeFYBX.getPluginObj("SPLB").removeSelected();
            	var SPLB = makeFYBX.getPluginObj("SPLB").getData();
            	if(SPLB.length==0){
            		makeFYBX.getTab().find("input[name='QKSQD01']").val("");
            		makeFYBX.getPluginObj("SPLB").hideButton("0",false);
            		makeFYBX.getTab().find("li[id='cxqksq']").show();
            	}
               }
             }]
	},
	
    "SH":{
		  "jlid": "JLRadio",
	      "default" : "Y",
		  "options": {"Y":"同意","N":"不同意"},
		  "fixValue":"Y"
	}
});


makeFYBX.setAfterInit(function() {
	 debugger;
	 makeFYBX.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeFYBX.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeFYBX.getTab().find("input[name='SHRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeFYBX.getTab().find("input[name='CNRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeFYBX.getTab().find("input[name='ZDR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeFYBX.getTab().find("input[name='SHR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeFYBX.getTab().find("input[name='CNR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeFYBX.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeFYBX.getTab().find("input[name='SHRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeFYBX.getTab().find("input[name='FKRQ']:not(:disabled)").val(JL.formatDate(0,2));

	//加载页面时,申请人根据操作员信息自动带出，允许修改；所属部门默认带出，可以修改；
	 	var YWY_RYXX01 = makeFYBX.getTab().find("input[name='ZDR_RYXX01']").val();
	 	var GSXX01 = makeFYBX.getTab().find("input[name='GSXX01']").val();
		var resultData = makeFYBX.getSqlResult({"RYXX01":YWY_RYXX01,"GSXX01":GSXX01}, "RYXX", "ALL", "scm/pub/search");
		if(resultData.data.length>0){
			if(makeFYBX.getTab().find("input[name='BXRMC']").val()==""){
			makeFYBX.getTab().find("input[name='BXRMC']").val(resultData.data[0]["RYMC"]);
			}
			//makeFYBX.getTab().find("input[name='BXRMC']").val(resultData.data[0]["RYMC"]);
			makeFYBX.getTab().find("input[name='BXR01']").val(resultData.data[0]["RYXX01"]);
			makeFYBX.getPluginObj("BM01").setData(resultData.data[0]["BM01"]);
			if(makeFYBX.getTab().find("input[name='BMMC']").val()==""){
				makeFYBX.getTab().find("input[name='BMMC']").val(resultData.data[0]["BMMC"]);
				}
			//makeFYBX.getTab().find("input[name='BMMC']").val(resultData.data[0]["BMMC"]);
		}
		
	//对应步骤显示对应的内容
	if(makeFYBX.getTab().find("input[name='ZDRMC']").is(":not(:disabled)")){
		makeFYBX.getTab().find(".step2").hide();
		makeFYBX.getTab().find(".step3").hide();
		makeFYBX.getPluginObj("SPLB").hideColumn("ZFFS", true);
		makeFYBX.getPluginObj("SPLB").hideColumn("YHZH", true);
		if(makeFYBX.getTab().find("input[name='SHRMC']").val()!=""){
			makeFYBX.getTab().find(".step2").show();
			makeFYBX.getTab().find("#jlNewForm").hide();
			var QKSQD01 = makeFYBX.getTab().find("input[name='QKSQD01']").val();
			if(QKSQD01==""){
				makeFYBX.getTab().find("li[id='cxqksq']").hide();//隐藏查询请款按钮
			}else{
				makeFYBX.getPluginObj("SPLB").hideButton("0",true);
			}
        }
	}
	if(makeFYBX.getTab().find("input[name='SHRMC']").is(":not(:disabled)")) {
		makeFYBX.getTab().find(".step3").hide();
		makeFYBX.getTab().find("#jlNewForm").hide();
		makeFYBX.getPluginObj("SH").setData({"key":"Y","value":"同意"});
		makeFYBX.getPluginObj("SPLB").hideColumn("ZFFS", true);
		makeFYBX.getPluginObj("SPLB").hideColumn("YHZH", true);
		makeFYBX.getTab().find("li[id='cxqksq']").hide();//隐藏查询请款按钮
	}
	if(makeFYBX.getTab().find("input[name='CNRMC']").is(":not(:disabled)")) {
		makeFYBX.getTab().find("#jlNewForm").hide();
		makeFYBX.getTab().find("#jlDeleteForm").hide();
		makeFYBX.getPluginObj("SPLB").hideColumn("ZFFS", false);
		makeFYBX.getPluginObj("SPLB").hideColumn("YHZH", false);
		makeFYBX.getTab().find("li[id='cxqksq']").hide();//隐藏查询请款按钮
		var SPLB = makeFYBX.getPluginObj("SPLB");
		for(var i=0;i<SPLB.getData().length;i++){
			SPLB.disabledCell("YHZH", i, true);
		}
		makeFYBX.getPluginObj("SPLB").hideButton("0",true);
		makeFYBX.getPluginObj("SPLB").hideButton("1",true);
	}
	
	makeFYBX.getPluginObj("SPLB").setAfterEdit(function(grid, id, x, y, old, edit){
		debugger;
        if(id=="BXJE"){
    	   if(edit*1 < 0 || isNaN(edit*1)){
    		   JL.tip("报销金额必须大于等于0,且必须为数字");
    		   grid.setCell("", x, grid.getRowIndexByID("BXJE"));
			   return false;
        	}
	   }
	});
});
