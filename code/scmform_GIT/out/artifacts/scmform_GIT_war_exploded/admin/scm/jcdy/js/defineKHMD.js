var defineKHMD = JL.JLForm();
defineKHMD.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后,数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					defineKHMD.query();
				}
			},
			"jlCancelSlide":{}
		}
	},  
	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					console.info(this);
					var type = $(this).text();
					if(type == "批量导入"){
						defineKHMD.find("#import").show();
						defineKHMD.getPluginObj("EXCEL").setData([]);
						defineKHMD.find("dl[name='BUTTON']").hide();
						defineKHMD.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
						
					}else{
						defineKHMD.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
		}
	},
	//查看错误信息按钮
	  "DRCM":{
		  "jlid":"JLToolBar",
		  "buttons":{
			  "jlDEL":{
				  "name":"查看错误信息按钮",
				  "css": "jl_btn btn_blue",
				  "func":function(data){
					  if(defineKHMD.find("dl[name='MESSAGE']").is(":hidden"))
					  {
						  defineKHMD.find("dl[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineKHMD.find("dl[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"loadFile" : function(data) {
				debugger; 
				var resultData = JL.getExcelData(38, data); 
				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineKHMD/excelKHMD.do";
				ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
				var resultData = JL.ajax(ajaxJson);
				errorResultData = resultData["data"]["returnList"];
				if(errorResultData != -1&&errorResultData != 2){
					console.info("error");
					defineKHMD.find("dl[name='BUTTON']").show();
					defineKHMD.getPluginObj("MESSAGE").setData(errorResultData);
					JL.tip("导入失败！","info");
					return true;
				} else if(errorResultData ==2){
					JL.tip("请填写数据！","info");
					return true;
				}else if(errorResultData == -1){
					JL.tip("上传成功！");
					defineKHMD.find("dl[name='BUTTON']").hide();
					defineKHMD.query();
				}
			}
		}
	},
	 "MESSAGE": {
		  "jlid"    : "JLGrid",
		  "tittles" : "错误信息列表",
		  "headers" : [
		       {"id" : "NUM", "name" : "EXCEL行号", "width" : 100},
	           {"id" : "ERROR",   "name" : "错误信息", "width" : 800}
	       ]
	  },
	  
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"MDBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.MDBM",	
		 "format":{
		 }
			 
	},
	"YXBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
		"options": {"1":"有效"},
		"listener": { 
	    }
	},
	"MDMC" : {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.MDMC",	
		"format":{}
	},
	"CYXE" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CYXE",	
		 "format":{
		 }
			 
	},
	"WLDW01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.WLDW01",	
		 "format":{
		 }
			 
	},
	"GSXX01" : {
			"jlid": "JLInput",
			"cds":"CDS",
			 "cds-field":"LIST.GSXX01",
			"format": {
			}
	},	
	"WLDWMC":{
	"jlid": "JLSearch",
	"cds": "CDS",
	"cds-field": "LIST.WLDWMC",
	 "reaonly":false,
	"queryConfig": {
		"namespace": "KHMD",
		"sqlid": "CXKHWLDW",
		//"init" : { "GSXX01"  : "GSXX01" },
		"dir": "admin/scm/jcdy/search",
		"fieldMapping":{
			"KEY":"WLDW01",
			"VALUE":"WLDWMC"
		},
	"listener":{
			"beforequery" : function(data) {
				//data["GSXX01"] =userInfo["PCRM_GSXX01"];
			}
		}
	}
},	
	"LIST" : {
		"jlid": "JLLayoutGrid",
		"cds": "CDS",
		"paging": "more",
		"multi": false,
		"rowclass": "pl10",
		"buttons": {
			
			"jlNew": {
				"listener": {
					"click": function(obj, thisPlugin){
						debugger;
						defineKHMD.getPluginObj("YXBJ").setData("1");
						//defineSPXX.getPluginObj("SPBM").disabled(true); 
						/*if(!JL.isNull(defineSPXX.lastNew)){
							$.each(defineSPXX.lastNew, function(key, value){
								var pluginObj = defineSPXX.getPluginObj(key);
								if(!JL.isNull(pluginObj)){
									///pluginObj.setData(value);
									console.info("111");
								}
							});
						}else{*/
						/*}*/
					}
				}
			},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义客户门店模板",{
						"WLDW01":"*客户编码",
						"WLDWMC":"*客户名称",
						"MDBM":"*门店编码",
						"MDMC":"*门店名称",
						"CYXE":"*出样限额",
						"YXBJ":"有效标记"
			    	});
				}	
			}
	    },
	    "groupField": [
	                   {"id":"WLDW01", "title":"客户编码", "css":"font_weight_bold font_size_standard","width" : "w01"},
	                   {"id":"WLDWMC", "title":"客户名称", "css":"font_weight_bold font_size_standard","width" : "w02"},

		           ],
        "title": [
                   {"id":"WLDW01", "name":"客户编码", "width":"w02"},
		           {"id":"WLDWMC", "name":"客户名称", "width":"w03"},
		           {"id":"MDBM", "name":"门店编码", "width":"w01"},
		           {"id":"MDMC", "name":"门店名称", "width":"w02"},
		           {"id":"CYXE", "name":"出样限额", "width":"w01"},
		           {"id":"YXBJ", "name":"有效标记", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
	    ],
	    "header" : [
	                {"id":"jlbh", "title":"jlbh","hidden":true}, 
	                {"id":"WLDW01", "groupid":"WLDW01","rowindex" : 1,"title":"客户编码"},   
	                {"id":"WLDWMC", "groupid":"WLDWMC","rowindex" : 1,"title":"客户名称"},
	                {"id":"MDBM", "groupid":"MDBM","rowindex" : 1, "title":"门店编码"}, 
	                {"id":"MDMC", "groupid":"MDMC","rowindex" : 1, "title":"门店名称"},
	                {"id":"CYXE", "groupid":"CYXE", "rowindex" : 1,"title":"出样限额"},
	                {"id":"YXBJ",  "groupid":"YXBJ", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
	          		     "config":{
	          		    	       "jlid": "JLCheckbox",
	          		    	       "options": {"1":"有效"},
	          		    	       "listener": {
	          		    			      "checked":function(data, checked, arr){
	          		    			    	  if(checked){
	          		    			    		  data.key = 1;
	          		    			    		  data.value ="有效";
	          		    			    	  }else{
	          		    			    		  data.key = 0;
	          		    			    		  data.value ="无效";
	          		    			    	  }
	          		    			       }
	          		    		   }
	          		             }
	          		   },
	                {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
						"config":{
							"readonly": [""],
							"mapping":{}
						},
						"listener": {
		            		"click": function(thisPlugin, rowIndex, obj){
		            		}
						}
					},
			    {"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
	            	"listener": {
	            		"click": function(thisPlugin, rowIndex, obj){
							debugger;
							var data = thisPlugin.getData(rowIndex);
							JL.confirm("是否确认删除?", function(){
								data["S_VALUE"] = "D1";
								JL.saveForm(defineKHMD, data, "删除", {
									"disabled": false,
									"success":function(){
										thisPlugin.removeRow(rowIndex);
									}	 
								});
							});
	            		}
	            	}
			    }
	    ],
	}
});

defineKHMD.setEvent([{
	"selector": "#search",
	"event":"click",
	"func":function(){
		defineKHMD.query();
	}

}]);



defineKHMD.setAfterInit(function() {
	defineKHMD.query();
});

defineKHMD.query = function(){
	var queryField = {};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var DMMC = defineKHMD.getTab().find("[name='search']").val();
	if(!JL.isNull(DMMC)){
		queryField["search"] = DMMC;
	}
	var MD = defineKHMD.getTab().find("[name='query']").val();
	debugger;
	if(!JL.isNull(MD)){
		queryField["query"]= MD;
	}
	var resultData = defineKHMD.getSqlResult(queryField, "MONGO_KHMD", "SCM_KHMD", "admin/scm/jcdy/search");

	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineKHMD.getPluginObj("LIST").setPaging(resultData.fileName); 
};


