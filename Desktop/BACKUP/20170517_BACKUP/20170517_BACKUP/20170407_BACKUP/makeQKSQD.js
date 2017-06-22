/**
 * @author :周泽
 * 最后一次修改时间:2016-10-17 14:25:15
 * 类名:请款申请单
 */
var makeQKSQD = JL.JLForm();
var flag = 0;

makeQKSQD.setPlugin({
	"toolbar" : {
	    "jlid": "JLToolBar",
	    "buttons": {
			"jlNewForm":{},
			/*"jlSaveDraft":{},*/
			"jlSaveForm":{
				"success":function(data,tip){
					makeQKSQD.getTab().find("input[name=QKSQD01]").val(data.QKSQD01);
					//保存成功提示信息                                            
    		        tip.obj.remove();    //清除公共提示信息。
                    JL.tip("保存成功【单据号："+data.QKSQD01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
				}
			 },
			"jlDeleteForm":{},
			"PrintOne":{
		    	  "name": "打印",
				  "icon": "print",
				  "func": function(){
					  makeQKSQD.readData();
					  JL.print(41, [makeQKSQD.getData()]);
				  }
		      }
	    }
	},
	
    //申请人
	"SQRMC":{
		"dir" : "scm/pub/search",
		"namespace" : "RYXX",
		"sqlid" : "ALL",
		"init" : {"GSXX01" : "GSXX01"},
		"fieldMapping" : {
			"RYMC" : "SQRMC",
			"RYXX01" : "SQR01"	
		},
		"listener" : {
			"beforequery" : function(data) {
				if (flag == 1) {
					JL.tip("申请人已选择，不可修改");
					return true;
				}
			}
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
	
	//所属部门
	"BMMC":{
		"dir" : "scm/pub/search",
		"namespace" : "BM",
		"sqlid" : "MJBM",
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
			    	  if(makeQKSQD.getTab().find("input[name='SQRMC']").val()==""){
			    		  JL.tip("请先选择申请人");
			    		  return true;  
			    	  }
			    }
		 }
	},
	
	
	
	//请款明细
	"SPLB":{
	    "jlid": "JLGrid",
	    "tittles" : "请款明细", 
	    "headers": [
	                {"id": "FYBM","name": "费用编码","width": 120},
	                {"id": "FYXM","name": "费用项目","width": 120},
	                {"id": "CWKM","name": "科目代码","width": 120},
	                {"id": "YSYE","name": "预算余额","width": 120,"align" : "right","format":"number|2"},
	                {"id": "YSZE","name": "预算总额","width": 120,"align" : "right","format":"number|2"},
	                {"id": "QKZE","name": "请款总额","width": 1,"hidden": true,"align" : "right","format":"number|2"},
	                {"id": "YSQJ","name": "预算期间","width": 1,"hidden": true},
	                {"id": "QKJE","name": "请款金额","width": 120,"align" : "right","format":"number|2"},
	                {"id": "HBBZMC","name": "币种","width": 120/*,
	                	 "editor":{
	              		       "type":"plugin",
	              		       "jlid" : "JLSelect",
	              		       "placeholder" : "请选择币种",
	   	                       "sqlid": "QKSQD_BZ",
	   	                       "resource": "scmform",
	   	                       "param" : {"GSXX01":userInfo["PCRM_GSXX01"]}
	                	 }
	   	            */},
	   	            {"id": "HBBZ","name": "币种编码","hidden": true},
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
	                {"id": "FYBM01","name": "费用部门编码","hidden": true},
	                {"id": "ZFFS","name": "支付方式","width": 120,
	                 	  "editor":{
	              		       "type":"text",
	              		       "jlid" : "JLQuery",
	              		       "dir" : "scm/projects/tecno/fygl/search",
	              		       "namespace" : "QKSQD",
	              		       "sqlid" : "FY_SKFS",
	             		       "form":makeQKSQD,
	             		       "autoquery":true,
	             		       "update":true,
	   	           		   	   /*"init" : {"ZDR_RYXX01":"RYXX01"},*/
	   	           		   	   "fieldMapping" : {
	   						    "SKFSMC" : "SPLB.ZFFS",
	   							"SKFS01" : "SPLB.ZFFS01",
	   							"YHBJ" : "SPLB.YHBJ"
	   	                      }, 
	   	                   "listener": {
	   	         		      "beforequery" : function(data) {
	   	         		    	  debugger;
	   	         		    	  data["JEFS"] = "(0,1,3)";
	   	         		    	  data["RYXX01"] = userInfo["PCRM_CZY02"];
	   	         		      },
	   	         		     "beforecallback" : function(data) {},
							 "aftercallback" : function(data) {
								debugger;
								var SPLB = makeQKSQD.getPluginObj("SPLB");
								for(var i=0;i<SPLB.getData().length;i++){
									if (SPLB.getData(i, "YHBJ") == "1") {
										SPLB.disabledCell("YHZH", i, false);
									    var GSXX01 = makeQKSQD.getTab().find("input[name='GSXX01']").val();
			 			    		    var resultData = makeQKSQD.getSqlResult({"GSXX01":GSXX01}, "SKFS", "YHZHXX", "scm/pub/search");
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
	                {"id": "ZFFS01","name": "支付方式编码","hidden": true},
	                {"id": "YHZH01","name": "银行账号代码","hidden": true},
	                {"id": "YHZH","name": "银行账号","width": 150,
	             	   "editor":{
	      	        	  "type":"text",
	      	        	  "jlid" : "JLQuery",
	      	        	  "dir" : "scm/pub/search",
	      	        	  "namespace" : "SKFS",
	      	        	  "sqlid" : "YHZHXX",
	      	        	  "form":makeQKSQD,
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
	                {"id": "YHBJ","name": "银行标记","hidden": true},
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
			       "namespace" : "QKSQD",
			       "sqlid" : "QKMX",
				    "form":makeQKSQD,
				    "multi":true,
				    "init": {"GSXX01":"GSXX01"},
				    "fieldMapping": {			
				    	 	"FYBM":"SPLB.FYBM",
					    	"FYXM":"SPLB.FYXM",
					    	"CWKM":"SPLB.CWKM",
					    	"YSZE":"SPLB.YSZE",
					    	"YSYE":"SPLB.YSYE",
					    	"YSQJ":"SPLB.YSQJ",
					    	"HBBZMC":"SPLB.HBBZMC",
					    	"HBBZ":"SPLB.HBBZ"
				     	},
			     	"listener": {
		 		      "beforequery" : function(data){
		 		    		if(makeQKSQD.getTab().find("input[name='BMMC']").val()==""){
		 		 				JL.tip("请先选择所属部门");
		 		 				return true;
			 		 		}		 			
		 		 		 },
	 			      //回填前的数据处理 -->计算 ：请款余额 = 预算总额 - 请款总额
	 			      "beforecallback" : function(data) {
	  		    		 debugger;
	  		    		 for(var i=0;i<data.length;i++){
	  		    			 if(!JL.isNull(makeQKSQD.find("input[name='HBBZ']").val()) &&
	  		    				!JL.isNull(makeQKSQD.find("input[name='HBBZMC']").val())){
	  		    				 data[i]["HBBZ"] = makeQKSQD.find("input[name='HBBZ']").val();
	  		    				 data[i]["HBBZMC"] = makeQKSQD.find("input[name='HBBZMC']").val();
	  		    			   //data[i]["HBBZMC"]={"key":data[i]["HBBZ"],"value":makeQKSQD.find("input[name='HBBZMC']").val()};
	  		    			 }
	  		    		 }
	  		    	 
	 			    	  for(var i=0;i<data.length;i++){
	 			    		  data[i]["YSZE"] = 0;//预算总额
	 			    		  data[i]["QKZE"] = 0;//请款总额
	 			    		  data[i]["YSYE"] = 0;//请款余额
	 			    		  var GSXX01 = makeQKSQD.getTab().find("input[name='GSXX01']").val();
	 			    		  var FYBM = data[i]["FYBM"];
	 			    		  var CWKM = data[i]["CWKM"];
	 			    		  var resultData01 = makeQKSQD.getSqlResult({"GSXX01":GSXX01,"FYBM":FYBM,"CWKM":CWKM}, "QKSQD", "YSZE", "scm/projects/tecno/fygl/search");
	 			    		  if(resultData01.data.length>0){
	 			    			  data[i]["YSZE"]= resultData01.data[0]["YSZE"];
	 			    		  }
	 			    		  var resultData02 = makeQKSQD.getSqlResult({"GSXX01":GSXX01,"FYBM":FYBM,"CWKM":CWKM}, "QKSQD", "QKZE", "scm/projects/tecno/fygl/search");
	 			    		  if(resultData02.data.length>0){
	 			    			  data[i]["QKZE"]= resultData02.data[0]["QKZE"];
	 			    		  }
	 			    		      data[i]["YSYE"] = data[i]["YSZE"] - data[i]["QKZE"];
	 			    	  }	
	 			      },
	 			      // 回填后的数据处理
	 			      "aftercallback" : function(data) {
 			        	 flag=1;
	 			        }
		 		       }
				      },
	           "buttons" : [0,{"text":"删除","func": function(){
	        	    debugger;
		        	makeQKSQD.getPluginObj("SPLB").removeSelected();
		        	HJQKZE();
				   }}],
				
			  //双击看明细   
	          "listener": {
	      		"rowdblclick" : function(thisPlugin, data, rowIndex, dl){
	    			debugger;
	    				if(data["FYBM"]!=""){
	    				var queryfield = {};
	    				queryfield["FYBM"] = data["FYBM"];
	    				queryfield["CWKM"] = data["CWKM"];
	    				var resultData = makeQKSQD.getSqlResult(queryfield, "QKSQD", "FYLS", "scm/projects/tecno/fygl/search");
	    				console.info(resultData);
	    				resultData = resultData.data;
	    				if(resultData.length!=0){
	    		    		/*for(var i=0; i<resultData.length; i++){
	    		    			$.extend(resultData[i], data);
	    		    		}*/
	    				var json = {};
	    				json["dir"] = "scm/projects/tecno/fygl/search";
	    				json["namespace"] = "QKSQD";
	    				json["sqlid"] = "FYLS";
	    				json["autoquery"] = true;
	    				json["init"] = {};
	    				json["resultData"] = resultData;
	    				json["fieldMapping"] = {};
	    				json["listener"] = {
	    					"beforecallback":function(data){
	    	   					$.each(data, function(key, value) {});
	    					},
	    					"aftercallback":function(data){}
	    				};
	    				$(".jl_modal .modal_close").click();
	    				JLQuery.show2(makeQKSQD,json);
	    				return true;
	    			}
	    		}
	    		}
	          }
	},
	
    "SH":{
		  "jlid": "JLRadio",
	      "default" : "Y",
		  "options": {"Y":"同意","N":"不同意"},
		  "fixValue":"Y"
	},
	"SP":{
		  "jlid": "JLRadio",
	      "default" : "Y",
		  "options": {"Y":"同意","N":"不同意"},
		  "fixValue":"Y"
	}
});


makeQKSQD.setAfterInit(function() {
	 debugger;
	 makeQKSQD.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeQKSQD.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeQKSQD.getTab().find("input[name='SHRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeQKSQD.getTab().find("input[name='SPRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeQKSQD.getTab().find("input[name='CNRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeQKSQD.getTab().find("input[name='ZDR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeQKSQD.getTab().find("input[name='SHR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeQKSQD.getTab().find("input[name='SPR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeQKSQD.getTab().find("input[name='CNR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeQKSQD.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeQKSQD.getTab().find("input[name='SHRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeQKSQD.getTab().find("input[name='SPRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeQKSQD.getTab().find("input[name='FKRQ']:not(:disabled)").val(JL.formatDate(0,2));

		
	//对应步骤显示对应的内容
	if(makeQKSQD.getTab().find("input[name='ZDRMC']").is(":not(:disabled)")){
		debugger;
		makeQKSQD.getPluginObj("SPLB").hideColumn("ZFFS", true);
		makeQKSQD.getPluginObj("SPLB").hideColumn("YHZH", true);
		makeQKSQD.getTab().find(".step3").hide();
		makeQKSQD.getTab().find("#PrintOne").hide();
		if(makeQKSQD.getTab().find("input[name='SHRMC']").val()!=""){
			makeQKSQD.getTab().find(".step2").show();
			makeQKSQD.getTab().find(".step4").hide();
			makeQKSQD.getTab().find("#jlNewForm").hide();
        }
		if(makeQKSQD.getTab().find("input[name='SPRMC']").val()!=""){
        	makeQKSQD.getTab().find(".step2").hide();
        	makeQKSQD.getTab().find(".step4").show();
        	makeQKSQD.getTab().find("#jlNewForm").hide();
        }else{
			makeQKSQD.getTab().find(".step2").hide();
        	makeQKSQD.getTab().find(".step4").hide();
        	GetBBBZ();
			GetRYMC();
		}
	}
	if(makeQKSQD.getTab().find("input[name='SHRMC']").is(":not(:disabled)")) {
		makeQKSQD.getTab().find(".step3").hide();
		makeQKSQD.getTab().find(".step4").hide();
		makeQKSQD.getTab().find("#PrintOne").hide();
		makeQKSQD.getTab().find("#jlNewForm").hide();
		makeQKSQD.getPluginObj("SH").setData({"key":"Y","value":"同意"});
		makeQKSQD.getPluginObj("SPLB").hideColumn("ZFFS", true);
		makeQKSQD.getPluginObj("SPLB").hideColumn("YHZH", true);
		makeQKSQD.getPluginObj("SPLB").hideButton("0",true);
		makeQKSQD.getPluginObj("SPLB").hideButton("1",true);
	}
	if(makeQKSQD.getTab().find("input[name='SPRMC']").is(":not(:disabled)")) {
		makeQKSQD.getTab().find("#PrintOne").hide();
		makeQKSQD.getTab().find(".step3").hide();
		makeQKSQD.getTab().find("#jlNewForm").hide();
		makeQKSQD.getPluginObj("SP").setData({"key":"Y","value":"同意"});
		makeQKSQD.getPluginObj("SPLB").hideColumn("ZFFS", true);
		makeQKSQD.getPluginObj("SPLB").hideColumn("YHZH", true);
		makeQKSQD.getPluginObj("SPLB").hideButton("0",true);
		makeQKSQD.getPluginObj("SPLB").hideButton("1",true);
	 }
	if(makeQKSQD.getTab().find("input[name='CNRMC']").is(":not(:disabled)")) {
		makeQKSQD.getTab().find("#PrintOne").show();
		makeQKSQD.getTab().find("#jlNewForm").hide();
		makeQKSQD.getTab().find("#jlDeleteForm").hide();
		makeQKSQD.getPluginObj("SPLB").hideColumn("ZFFS", false);
		makeQKSQD.getPluginObj("SPLB").hideColumn("YHZH", false);
		var SPLB = makeQKSQD.getPluginObj("SPLB");
		for(var i=0;i<SPLB.getData().length;i++){
			SPLB.disabledCell("YHZH", i, true);
		}
		makeQKSQD.getPluginObj("SPLB").hideButton("0",true);
		makeQKSQD.getPluginObj("SPLB").hideButton("1",true);
	}
	
	makeQKSQD.getPluginObj("SPLB").setAfterEdit(function(grid, id, x, y, old, edit){
		debugger;
        if(id=="QKJE"){
    	   if(edit*1 <= 0 || isNaN(edit*1)){
    		   JL.tip("请款金额必须大于0,且必须为数字");
    		   grid.setCell("", x, grid.getRowIndexByID("QKJE"));
    		   HJQKZE();
			   return false;
           }
    	      HJQKZE();
	   }
	});
});

/**
 * 合计请款总额
 */
function HJQKZE(){
	debugger;
	var datas = makeQKSQD.getPluginObj("SPLB").getData();
	var num = 0;
	   for(var i=0;i<datas.length;i++){
		   if(datas[i]["QKJE"]!=null){
			 num += datas[i]["QKJE"]*1;
		   }
	    }
	makeQKSQD.getTab().find("input[name='QKZE01']").val(num*1);  
    makeQKSQD.getTab().find("input[name='QKZE']").val(toThousands(num));
}
/**
 * 加载页面时,申请人根据操作员信息自动带出，允许修改；所属部门默认带出，可以修改；
 */
function GetRYMC(){
	debugger;
	//加载页面时,申请人根据操作员信息自动带出，允许修改；所属部门默认带出，可以修改；
	var YWY_RYXX01 = makeQKSQD.getTab().find("input[name='ZDR_RYXX01']").val();
	var GSXX01 = makeQKSQD.getTab().find("input[name='GSXX01']").val();
	var resultData = makeQKSQD.getSqlResult({"RYXX01":YWY_RYXX01,"GSXX01":GSXX01}, "RYXX", "ALL", "scm/pub/search");
	if(resultData.data.length>0){
		makeQKSQD.getTab().find("input[name='SQRMC']").val(resultData.data[0]["RYMC"]);
		makeQKSQD.getTab().find("input[name='SQR01']").val(resultData.data[0]["RYXX01"]);
		makeQKSQD.getPluginObj("BM01").setData(resultData.data[0]["BM01"]);
		makeQKSQD.getTab().find("input[name='BMMC']").val(resultData.data[0]["BMMC"]);
	}
}

/**
 * 加载页面时,获取当前公司的本币币种
 */
function GetBBBZ(){
	debugger;
	//加载页面时,申请人根据操作员信息自动带出，允许修改；所属部门默认带出，可以修改；
	var GSXX01 = makeQKSQD.getTab().find("input[name='GSXX01']").val();
	var resultData = makeQKSQD.getSqlResult({"GSXX01":GSXX01}, "GS", "GSBZ", "scm/pub/search");
	if(resultData.data.length>0){
		makeQKSQD.getTab().find("input[name='HBBZMC']").val(resultData.data[0]["BBBZ02"]);
		makeQKSQD.getTab().find("input[name='HBBZ']").val(resultData.data[0]["BBBZ01"]);
	}
}

/**
 * 把数字转换成千位符
 */
function toThousands(num) {
	return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
