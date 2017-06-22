var defineCK = JL.JLForm();

defineCK.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{ 
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					console.info('after');
					defineCK.query();
				}
			},
			"jlCancelSlide":{}
		}
	},
	"SMBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.SMBJ",
		"default" : "1",
		"options": {"1":"无需扫码出库"},
		"listener": { 
	    }
	},
	"YXBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
		"default" : "1",
		"options": {"1":"有效"},
		"listener": { 
	    }
	},
	"CKMCBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.CKMCBJ", 
		"options": {"1":"是"},
		"listener": { 
	    }
	},
	"KHYHBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.KHYHBJ", 
		"options": {"1":"是"},
		"listener": { 
	    }
	},
	"CKBGPL" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectSPFL.do", 
		"cds": "CDS",
	    "cds-field": "LIST.CKBGPL",
		"param" : {"DLBJ":"1"}, 
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"GSXX01" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.GSXX01",
		"format": {}
	},
	"CKRL" : {
		"jlid": "JLInput", 
		"cds":"CDS",
		"cds-field":"LIST.CKRL",
		"format": {
			"number" : true
		}
	},
	"CK01":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"maxlength": 2,
		"cds-field": "LIST.CK01",
		"placeholder": "请输入两位长度编码(数字或字符)",
		"format":{	
		}
	},
	"CKMC":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"cds-field": "LIST.CKMC",
		"format":{	
		}
	},
	"jlbh":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format":{	
		}
	},
	"SJCKDM":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"cds-field": "LIST.SJCKDM",
		"readonly" : true,
		"format":{	
		}
	},
	"CK03":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"cds-field": "LIST.CK03",
		"format":{	
		}
	},
	"LXR":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"cds-field": "LIST.LXR",
		"format":{	
		}
	},
	"LXDH":{
		"jlid" : "JLInput",
		"css" : "w12",
		"cds": "CDS",
		"cds-field": "LIST.LXDH",
		"format":{	
			"number" : true
		}
	},
	"MJBJ" : {
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.MJBJ",
		"default" : "0",
		"options": {"1":"末级","0":"非末级"},
		"listener": {
		      "click":function(data){//参数data为点击的值，是个json对象
		    	  debugger;
		    	  defineCK.getPluginObj("CKSZ1").disabled(false);
    			  defineCK.getPluginObj("CKSZ2").disabled(false);
    			  defineCK.getPluginObj("CKSZ3").disabled(false);
    			  defineCK.getPluginObj("CKSZ4").disabled(false);
		    	  if (data.key==0){
		    		  defineCK.getPluginObj("CKSZ1").disabled(true);
	    			  defineCK.getPluginObj("CKSZ2").disabled(true); 
	    			  defineCK.getPluginObj("CKSZ3").disabled(true);
	    			  defineCK.getPluginObj("CKSZ4").disabled(true);
	    			  defineCK.getPluginObj("CKSZ1").setData();
	    			  defineCK.getPluginObj("CKSZ2").setData();
	    			  defineCK.getPluginObj("CKSZ3").setData();
	    			  defineCK.getPluginObj("CKSZ4").setData();
		    	  }
		       }
	    }
	},
	"CKSX" : {
		  "jlid": "JLSelect",
		  "cds": "CDS",
		  "cds-field": "LIST.CKSX",
		  "options": {"0":"正常","1":"残次"},
		  "default": "0"
	},
	/*"CKSZ3" : {
		  "jlid": "JLCheckbox",
		  "cds": "CDS",
		  "cds-field": "LIST.CKSZ3",
		  "options": {"5":"物流总仓"},
		  "listener": {
		      "checked":function(data, checked, arr){
		    	  
		      }
		}
	},*/
	"CKSZ1" : {
		  "jlid": "JLCheckbox",
		  "cds": "CDS",
		  "cds-field": "LIST.CKSZ1",
		  "options": {"1":"自动发货"},
		  "listener": {
		      "checked":function(data, checked, arr){
		    	  debugger;
		    	  if (checked){  
		    		  if (data.key==1 || defineCK.getPluginObj("CKSZ3").getData().length > 0){
		    			  defineCK.getPluginObj("CKSZ2").disabled(true);
		    			  defineCK.getPluginObj("CKSZ4").disabled(true);
		    		  }
		    	  }else{
		    		  defineCK.getPluginObj("CKSZ2").disabled(false);
		    		  defineCK.getPluginObj("CKSZ4").disabled(false);
		    		  if (defineCK.getPluginObj("CKSZ3").getData().length > 0){
	    				  defineCK.getPluginObj("CKSZ2").disabled(true);
	    				  defineCK.getPluginObj("CKSZ4").disabled(true);
	    			  }
		    		  
		    		  if (defineCK.getPluginObj("CKSZ3").getData().length > 0){
		    			  var thisPlugin = defineCK.getPluginObj("LIST");
		    			  if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.CK01+"'] dl").length > 0){
	            				defineCK.getPluginObj("MJBJ").disabled(true);
		           		  } else {
		           				defineCK.getPluginObj("MJBJ").disabled(false);
		           		  }
		    		  }
		    	  } 
		      }
		}
	},
	"CKSZ3" : {
		  "jlid": "JLCheckbox",
		  "cds": "CDS",
		  "cds-field": "LIST.CKSZ3",
		  "options": {"4":"退货仓库"},
		  "listener": {
		      "checked":function(data, checked, arr){
		    	  debugger;
		    	  if (checked){  
		    		  if (defineCK.getPluginObj("CKSZ1").getData().length > 0 || data.key==4){
		    			  defineCK.getPluginObj("CKSZ2").disabled(true);
		    			  defineCK.getPluginObj("CKSZ4").disabled(true);
		    		  }
		    	  }else{
		    		  defineCK.getPluginObj("CKSZ2").disabled(false);
		    		  defineCK.getPluginObj("CKSZ4").disabled(false);
		    		  if (defineCK.getPluginObj("CKSZ1").getData().length > 0){
	    				  defineCK.getPluginObj("CKSZ2").disabled(true);
	    				  defineCK.getPluginObj("CKSZ4").disabled(true);
	    			  }
		    		  
		    		  if (defineCK.getPluginObj("CKSZ1").getData().length > 0){
		    			  var thisPlugin = defineCK.getPluginObj("LIST");
		    			  if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.CK01+"'] dl").length > 0){
	            				defineCK.getPluginObj("MJBJ").disabled(true);
		           		  } else {
		           				defineCK.getPluginObj("MJBJ").disabled(false);
		           		  }
		    		  }
		    	  } 
		      }
		}
	},
	"CKSZ2" : {
		  "jlid": "JLCheckbox",
		  "cds": "CDS",
		  "cds-field": "LIST.CKSZ2",
		  "options": {"2":"厂家仓库"},
		  "listener": {
		      "checked":function(data, checked, arr){
		    	  debugger;
		    	  defineCK.getPluginObj('CKSZ4').setData([]);
		    	  if (checked){  
		    		  if (data.key==2 || defineCK.getPluginObj("CKSZ4").getData().length > 0){
		    			  defineCK.getPluginObj("CKSZ1").disabled(true);
		    			  defineCK.getPluginObj("CKSZ3").disabled(true);
		    		  }
		    	  }else{
		    		  defineCK.getPluginObj("CKSZ1").disabled(false);
		    		  defineCK.getPluginObj("CKSZ3").disabled(false);
		    		  if (defineCK.getPluginObj("CKSZ4").getData().length > 0){
	    				  defineCK.getPluginObj("CKSZ1").disabled(true);
	    				  defineCK.getPluginObj("CKSZ3").disabled(true);
	    			  }
		    	  } 
		      }
		}
	},
	"CKSZ4" : {
		  "jlid": "JLCheckbox",
		  "cds": "CDS",
		  "cds-field": "LIST.CKSZ4",
		  "options": {"3":"虚拟仓库"},
		  "listener": {
		      "checked":function(data, checked, arr){
		    	  debugger;
		    	  defineCK.getPluginObj('CKSZ2').setData([]);
		    	  if (checked){  
		    		  if (defineCK.getPluginObj("CKSZ2").getData().length > 0 || data.key==3){
		    			  defineCK.getPluginObj("CKSZ1").disabled(true);
		    			  defineCK.getPluginObj("CKSZ3").disabled(true);
		    		  }
		    	  }else{
		    		  defineCK.getPluginObj("CKSZ1").disabled(false);
		    		  defineCK.getPluginObj("CKSZ3").disabled(false);
		    		  if (defineCK.getPluginObj("CKSZ2").getData().length > 0){
	    				  defineCK.getPluginObj("CKSZ1").disabled(true);
	    				  defineCK.getPluginObj("CKSZ3").disabled(true);
	    			  }
		    	  } 
		      }
		}
	},
	"SSBM" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "select_BM.do",  
		"cds": "CDS",
		"cds-field": "LIST.SSBM",
		"param" : {"GSXX01":userInfo.PCRM_GSXX01},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(data){
				debugger;
				defineCK.getPluginObj("SSBM").setData([data]);
			},
			"change": function(data){
				debugger;
			}
		},
		"header" : [
		            {"id":"KEY", "title":"部门代码", "css":"w03"},
		            {"id":"VALUE", "title":"部门名称", "css":"w04"}
		           ] 
    },
    "PSWD":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectPSWD.do",  
		"multi": true,
		"cds": "CDS",
		"cds-field": "LIST.PSWD",
		//"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"param" : {"WDLX":"0","CompanyID":userInfo.PCRM_GSXX01,"PersonID":userInfo.PCRM_CZY02},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		},
		"header" : [
		            {"id":"KEY", "title":"网点代码", "css":"w03"},
		            {"id":"VALUE", "title":"网点名称", "css":"w04"},
		            {"id":"GSXX02", "title":"公司名称", "css":"w04"}
		           ]
    },
//	"PSWD" : {
//		"jlid" : "JLMultiTree",
//		"cds": "CDS",
//		"cds-field": "LIST.PSWD",
//		"sBillName": "JLInterface",
//		"sOperateName": "selectFWWDTREE.do", 
//		"clickLoad":false,
//		"jbToAll" :3,
//	    "param" : {"WDLX":"0"}
//	},
	"PSCK" : { 
		"jlid" : "JLSelect",
		"sBillName":"JLInterface",
		"sOperateName":"select_PSCK.do",
		"cds": "CDS",
		"cds-field": "LIST.PSCK",
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"resource": "scmform"
	},
	"CKDZ" : {
		  "jlid":"JLSelectTree",
		  "cds":"CDS",
		  "cds-field":"LIST.CKDZ", 
		  "sBillName":"JLInterface",
		  "sOperateName":"getDQXX.do",
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
	    "cds": "CDS",
		"current": "CK01",//当前节点
		"parent": "SJCKDM",//上级节点
		"level": "CK01",//级别
		"paging": "more",
		"final": {"id":"MJBJ", "key": "1"},//末级标记//末级标记
		"title" : [
		    {"id":"TREE", "name":"代码/名称", "width":"w10"},
		    {"id":"CZ", "name":"操作", "width":"w02"}
        ],
		"header" : [
             {"id":"CK01", "groupid":"TREE", "title":"仓库代码"},
             {"id":"CKMC", "groupid":"TREE", "title":"仓库名称"},
             {"id":"GSXX01", "title":"GSXX01","hidden":true},
             {"id":"SSBM", "title":"SSBM","hidden":true},
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "editor":"JLNewChild", 
            	 "config":{
	            	 "readonly": ["SJCKDM"],
	            	 "mapping":{"CK03":"CK03","CK01":"SJCKDM","GSXX01":"GSXX01"}
            	 },
            	 "listener":{
	            	 "click":function(data){
	            		 debugger; 
            			// defineCK.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
            			 defineCK.getPluginObj("MJBJ").disabled(false);
            			 defineCK.getPluginObj("SSBM").config.options = {};
            			 defineCK.getPluginObj("SSBM").config.param = {"GSXX01": data.GSXX01, "dataType": "Json", "QryType": "Bill"};
            			 defineCK.getPluginObj("SSBM").init();
            			
            			 defineCK.getTab().find("[data-id='JCXX']").attr("class","xuan");
            			 defineCK.getTab().find("[data-id='QTXX']").attr("class","");
            			 defineCK.getTab().find("[id='JCXX']").attr("style","");
            			 defineCK.getTab().find("[id='QTXX']").attr("style","display: none;");
            			
            			 defineCK.getPluginObj("CKSZ1").disabled(true);
          			  	 defineCK.getPluginObj("CKSZ2").disabled(true);
          			     defineCK.getPluginObj("CKSZ3").disabled(true);
          			     defineCK.getPluginObj("CKSZ4").disabled(true);
	            	 }
            	 }
             },
             {"id":"edit", "groupid":"CZ", "title":"编辑","editor":"JLEdit", 
            	 "config":{
	            	 "readonly": ["CK01","SJCKDM"],
	            	 "mapping":{}
            	 },
            	 "listener":{
             		"click": function(data, rowIndex, obj,thisPlugin){
             			 debugger;
             			if (data.SJCKDM==""){
	            			JL.tip("顶级仓库不能编辑！","info");
	            			defineCK.getTab().find("[class='jl_form addCarShow hide']").attr("style","");
	            		}else{ 
		         		//	defineCK.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
		        			
		        			if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.CK01+"'] dl").length > 0){
		        				defineCK.getPluginObj("MJBJ").disabled(true);
		           			} else {
		           				defineCK.getPluginObj("MJBJ").disabled(false);
		           			}
		        			var CK01=defineCK.getPluginObj("CK01").getData();
		             			if(!JL.isNull(CK01)){
		             			 var resultData = defineCK.getSqlResult({"CK01":CK01}, "JCDY", "BGZS", "admin/scm/jcdy/search");
		             			var a = resultData.data;
		             			 if(a.length>0){
		             			 var BGZS=resultData.data[0]["BGZS"];
		             			 var MJBJ=defineCK.getPluginObj("MJBJ").getData();
		             			  console.info(BGZS);
		             			  if(BGZS>0&&MJBJ.key==1){
		             				 JL.tip("此仓库有库存","info");
		             				defineCK.getPluginObj("MJBJ").disabled(true);
		             			  }
		             			}
		             		}
		        			var CKSZS = defineCK.getPluginObj("CKSZ1").getData();
		        			if(CKSZS.length > 0){
		        				for (var i=0;i<CKSZS.length;i++){
		        					var CKSZ = CKSZS[i];
		        					if (CKSZ.key == '4'){
		        						defineCK.getPluginObj("MJBJ").disabled(true);
		        					}
		        				}
		        			}
		        			
		        			var MJBJ = defineCK.getPluginObj("MJBJ").getData();
		        			if (MJBJ.key == 0){ 
		        				defineCK.getPluginObj("CKSZ1").disabled(true);
		          			  	defineCK.getPluginObj("CKSZ2").disabled(true);
		          			    defineCK.getPluginObj("CKSZ3").disabled(true);
		          			    defineCK.getPluginObj("CKSZ4").disabled(true);
		        			}else{
		        				defineCK.getPluginObj("CKSZ1").disabled(false);
		          			  	defineCK.getPluginObj("CKSZ2").disabled(false);
		          			    defineCK.getPluginObj("CKSZ3").disabled(false);
		        			    defineCK.getPluginObj("CKSZ4").disabled(false);
		        			} 
		        			defineCK.getPluginObj("SSBM").config.options = {};
		        			defineCK.getPluginObj("SSBM").config.param = {"GSXX01": data.GSXX01,"dataType": "Json", "QryType": "Bill"};
		        			defineCK.getPluginObj("SSBM").init();
		        			defineCK.getPluginObj("SSBM").setData(data.SSBM);
		        			defineCK.getPluginObj("PSWD").setData(data.PSWD);
		        			defineCK.getPluginObj("YXBJ").setData(data.YXBJ);
		        			
		        			 defineCK.getPluginObj("PSCK").config.options = {};
	            			 defineCK.getPluginObj("PSCK").config.param = {"GSXX01": data.GSXX01,"dataType": "Json", "QryType": "Bill"};
	            			 defineCK.getPluginObj("PSCK").init();
	            			 
		        			defineCK.getPluginObj("PSCK").setData(data.PSCK);
		        			
		        			defineCK.getTab().find("[data-id='JCXX']").attr("class","xuan");
		        			defineCK.getTab().find("[data-id='QTXX']").attr("class","");
		        			defineCK.getTab().find("[id='JCXX']").attr("style","");
		        			defineCK.getTab().find("[id='QTXX']").attr("style","display: none;");
	            		}
             		}
                }
             },
             {"id":"delete", "groupid":"CZ","title":"删除", "css":"fr", "editor":"link",
				 "listener":{
					 "click": function(data, rowIndex, obj, plugin){
						 if(data.MJBJ.key == "0"){
							 JL.tip("非末级仓库不允许删除","error");
						     return false;
						 }
						 JL.confirm("是否确认删除?", function(){
							 data["S_VALUE"] = "D1";
							 JL.saveForm(defineCK, data, "删除", {
								 "disabled": false,
								 "success":function(){
									 defineCK.query();  
								 }
							 });
						 });
					 }
				 }
			 }
             /*{"id":"delete", "groupid":"CZ", "title":"删除", "editor":"link",
            	 "listener":{
            		 "click": function(data, rowIndex, obj, plugin){
            			 console.info(data);
            			 var XmlData = data;
            			 XmlData["S_VALUE"]= "D1";  
            			 var ajaxJson = {};
            			 ajaxJson["src"] = "DefineCK/deleteCK.do";
            			 ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
            			 var resultData = JL.ajax(ajaxJson);
            			 console.info(resultData);
            			 if(!JL.isNull(resultData)){
            				 plugin.removeRow(rowIndex);
            			 }
            		 }
            	 }
             }*/
		]
	}
});

defineCK.setEvent([{
		"selector": "#search",
		"event": "click",
		"func": function(){
			defineCK.query();
		}
	}]);

defineCK.setAfterInit(function() {
	JL.tab(defineCK, {
		"JCXX": "基础信息",
		"QTXX": "其他信息"
	});
	defineCK.query();
});

defineCK.query = function() {
	debugger;
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	
	var query={};
	var a = defineCK.getTab().find("[name='CK']").val(); 
	query["S_VALUE"] = {"$ne":"D1"};
	if(!JL.isNull(a)){
		query["CK"] = a;
	}
	query["GSXX01"] = userInfo.PCRM_GSXX01;
	
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	 resultData = defineCK.getSqlResult(query, "MONGO_CK", "SCM_CK1", "admin/scm/jcdy/search");
	    	debugger;
	    	/*defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {"CZY14":"1"};
			defineRY.getPluginObj('SSGS').init();*/
	    }else if (data.CZY14==2){
	    	 resultData = defineCK.getSqlResult(query, "MONGO_CK", "SCM_CK2", "admin/scm/jcdy/search");
	    	/*defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {};
			defineRY.getPluginObj('SSGS').init();*/
	    }else{
	    	 resultData = defineCK.getSqlResult(query, "MONGO_CK", "SCM_CK", "admin/scm/jcdy/search");
	    }
	}else{
		 resultData = defineCK.getSqlResult(query, "MONGO_CK", "SCM_CK", "admin/scm/jcdy/search");
	}
	//query["GSXX01"] = "DAZ1";
	console.info(resultData.data);
	var CDS = defineCK.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();	
	defineCK.getPluginObj("LIST").setPaging(resultData.fileName);  
};

