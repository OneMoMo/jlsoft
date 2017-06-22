var defineDYSPFZM = JL.JLForm();
defineDYSPFZM.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"cds": "CDS",
				"success": function(resultData, tip){
					debugger;
					var LIST = [];
					var CDS = defineDYSPFZM.getCds("CDS");
					if(CDS.mode == "append"){
						LIST.push(resultData);
						$.merge(LIST, defineDYSPFZM.getPluginObj("LIST").getData());
						defineDYSPFZM.lastNew = $.extend({}, resultData);
						delete defineDYSPFZM.lastNew["SPXX01"];
						delete defineDYSPFZM.lastNew["SPBM"];
						delete defineDYSPFZM.lastNew["jlbh"];
						delete defineDYSPFZM.lastNew["JLBH"];
					}else{
						LIST = defineDYSPFZM.getPluginObj("LIST").getData();
						for(var i=0; i<LIST.length; i++){
							if(LIST[i]["SPXX01"] == resultData.SPXX01){
								LIST[i] = resultData;
							} 
						}
					}
					CDS.edit();
					CDS.setData({"LIST":LIST});
					CDS.post();
					defineDYSPFZM.query();
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
						defineDYSPFZM.find("#import").show();
						defineDYSPFZM.getPluginObj("EXCEL").setData([]);
						defineDYSPFZM.find("dl[name='BUTTON']").hide();
						defineDYSPFZM.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
						
					}else{
						defineDYSPFZM.find("#import").hide();
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
					  if(defineDYSPFZM.find("dl[name='MESSAGE']").is(":hidden"))
					  {
						  defineDYSPFZM.find("dl[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineDYSPFZM.find("dl[name='MESSAGE']").hide();
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
				var resultData = JL.getExcelData(45, data); 
				//var returnList = resultData.data.returnList;
				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineDYSPFZM/excelDYSPFZM.do";
				ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
				var resultData = JL.ajax(ajaxJson);
				errorResultData = resultData["data"]["returnList"];
				if(errorResultData != -1){
					console.info("error");
					defineDYSPFZM.find("dl[name='BUTTON']").show();
					defineDYSPFZM.getPluginObj("MESSAGE").setData(errorResultData);
					JL.tip("导入失败！","info");
					return ture;
				}else{
					JL.tip("上传成功！");
					defineDYSPFZM.find("dl[name='BUTTON']").hide();
					defineDYSPFZM.query();
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
	"BMLX": {
		"jlid": "JLSelect",
		"default" : "1",
		"cds":"CDS",
		"cds-field": "LIST.BMLX",
		"noremove":true,
		"options": {"2":"流水码","0":"店内码","3":"自编码","1":"条形码"},
		"listener": {
			"change":function(data){
				debugger;
		       	if(data.key==0||data.key==2){
		      		defineDYSPFZM.getTab().find("input[name='SPFZM']").attr("disabled","disabled");
		       	} else{
		        	defineDYSPFZM.getTab().find("input[name='SPFZM']").removeAttr("disabled");
		        }
				
		    }
		}
	},
	"SPFZM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SPFZM",	
		 "format":{
			 "null": true
		 }
	},
	//商品编码
	"SPBM" : {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.SPBM",
		"dir" : "admin/scm/jcdy/search",
	    "namespace" : "MONGO_DYSPFZM",
	    "autoquery":true,
	    "placeholder":"点击查找商品",
	    "sqlid" : "SCM_SPXX",
		"init": {"GSXX01":"GSXX01"},    
		"fieldMapping" : {
			"SPXX01":"SPXX01",
			"SPBM":"SPBM",
			"SPMC":"SPMC",
			"JLDW":"JLDW",
			"SPFL":"SPFL",
			"SPGG":"SPGG",
			"SPPPMC":"SPPPMC",
			"SPPP01":"SPPP01",
			"SPFL01":"SPFL01",
			"SPFLMC":"SPFLMC"
		}
	},
	"SPGG" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.SPGG",	
		"format":{}
	},
	"JLDW" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.JLDW",
		 "format":{
		 },
		 "listener": {
			 "blur":function(data){
	        } 
	 	}
 	},
	"SPMC" : {
		 "jlid": "JLInput",
		 "readonly": true,
		 "cds":"CDS",
		 "cds-field":"LIST.SPMC",	
		 "format":{
			 
		 }
	},
	"SPPP01" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.SPPP01",
		"format": {
					"null": true,
					"phone": false,
					"number": true
				}
			},	
	"SPXX01" : {
			"jlid": "JLInput",
			"readonly": true,
			"cds":"CDS",
			 "cds-field":"LIST.SPXX01",
			"format": {
						"null": true,
						"phone": false,
						"number": true
					}
				},
	"GSXX01" : {
			"jlid": "JLInput",
			"readonly": true,
			"cds":"CDS",
			 "cds-field":"LIST.GSXX01",
			"format": {
						"null": true,
						"phone": false,
						"number": true
					}
				},	
				
	"SPPPMC" : {
		 "jlid": "JLInput",
		 "readonly":true,
		 "cds":"CDS",
		 "cds-field":"LIST.SPPPMC",	
		 "format":{
			 
		 }
		/*"dir" : "scm/pub/search",
	    "namespace" : "SPPP",
	    "placeholder":"点击查找品牌",
	    "sqlid" : "ALL",
		"init": {"GSXX01":"GSXX01"},    
		"fieldMapping" : {
			"SPPPMC":"SPPPMC",
			"SPPP01":"SPPP01"	
			}*/
	},
	/*"SPFL" : {
		"jlid": "JLMultiTree",
		"readonly":true,
		"cds":"CDS",
		"cds-field":"LIST.SPFL",
		"selectMode": "all",
		"sqlid":"JLPub.select_ALLSPFL",
		"resource":"form",
		"clickLoad":true,
		"jbToAll" :1,
		"single":true,
		"last":true,
		"param" : {}
	},*/
	"SPFL01" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.SPFL01",
		"format": {
					"null": true,
					"phone": false,
					"number": true
				}
	},
	"SPFLMC" : {
		 "jlid": "JLInput",
		 "readonly":true,
		 "cds":"CDS",
		 "cds-field":"LIST.SPFLMC",	
		 "format":{
			 
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
						defineDYSPFZM.getPluginObj("SPBM").disabled(false);
						defineDYSPFZM.getPluginObj("BMLX").setData({"key":"3", "value":"自编码"}); 
							
						/*if (!JL.isNull(fzsj)){
							defineDYSPFZM.getPluginObj("BMLX").setData(fzsj.BMLX);
							defineDYSPFZM.getPluginObj("SPBM").setData(fzsj.SPBM);
							defineDYSPFZM.getPluginObj("SPMC").setData(fzsj.SPMC);
							defineDYSPFZM.getPluginObj("SPPP01").setData(fzsj.SPPP01);
							defineDYSPFZM.getPluginObj("SPPPMC").setData(fzsj.SPPPMC);
							defineDYSPFZM.getPluginObj("SPFL").setData(fzsj.SPFL);
							defineDYSPFZM.getPluginObj("JLDW").setData(fzsj.JLDW); 
							defineDYSPFZM.getPluginObj("SPGG").setData(fzsj.SPGG);
							defineDYSPFZM.getPluginObj("SPFZM").setData(fzsj.SPFZM);
						}*/
					}
				}
			}, 
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义商品辅助码模板",{
						"BMLX":"*编码类型 0:店内码,1:条形码,2:流水码,3:自编码",
						"SPFZM":"*商品辅助码，当编码类型为0或2时，必须为空",
						"SPBM":"*商品编码",
						"SPMC":"商品名称-SPMC填写字符串",
			    	});
				}	
		}
	    },
        "title": [
            {"id":"SPXX", "name":"<span class='w04 tr pr20'>商品编码</span><span class='w08'>商品名称</span>", "width":"w04"},
            {"id":"SPFZM", "name":"商品辅助码", "width":"w02 tc pr0"},
            {"id":"BMLX", "name":"编码类型", "width":"w02 tc pr0"},
            {"id":"CZ", "name":"操作", "width":"w02 tc pr0"}
	    ],
	    "header" : [
	        {"id":"SPBM", "groupid":"SPXX", "rowindex":1,"title":"商品编码", "css":"mr0 w04 tr pr20"},
	        {"id":"SPMC", "groupid":"SPXX", "rowindex":1,"title":"商品名称", "css":"mr0 w08 text_hide"},
		    {"id":"SPFZM", "groupid":"SPFZM", "rowindex":2, "title":"商品辅助码","css":"mr0 w12 text_hide"},
		    {"id":"BMLX", "groupid":"BMLX", "rowindex":2, "title":"编码类型","css":"mr0 w12 text_hide"},
		    
		    {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit", 
		    	"config":{
		    		"readonly": ["BMLX"],
		    		"mapping":{},
		    		"confirm": "此商品信息有库存，是否要修改"
		    	},
			    "listener": {
			    	"click": function(thisPlugin, rowIndex){
			    		debugger;
			    		defineDYSPFZM.getTab().find(".jl_tab_title li:first").click();
			    		var SPFZM = defineDYSPFZM.getPluginObj("SPFZM").getData();
			    		defineDYSPFZM.getTab().find('[name="YSPFZM"]').val(SPFZM);
			    	},
			    	"edit": function(thisPlugin, rowIndex) {
			    	    debugger;
			    		defineDYSPFZM.getPluginObj("SPBM").disabled(true);
			    		var SPFZM = defineDYSPFZM.getPluginObj("SPFZM").getData();
			    		defineDYSPFZM.getTab().find('[name="YSPFZM"]').val(SPFZM);
			    	},
			    	"ok": function(thisPlugin, rowIndex) {
			    		defineDYSPFZM.getPluginObj("SPBM").disabled(true);
			    	},
			    	"confirm": function(thisPlugin, rowIndex) {
			    		var query={};
				    	query["SPXX01"]=thisPlugin.getData(rowIndex,"SPXX01");
				    	var resultData = defineDYSPFZM.getSqlResult(query, "SPXX", "CKSP_SPJGB", "scm/pub/search");
				    	var a = false;
				    	if(!JL.isNull(query.SPXX01) && !JL.isNull(resultData.data)){
				    		a =  true;
				    	}
	                    return a;
			    	}
			    }
		    },
		    {"id":"delete", "groupid":"CZ", "rowindex" :1,"title":"删除",  "editor":"link",
           	 "listener":{
           		 "click": function(thisPlugin, rowIndex, obj){
						debugger;
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineDYSPFZM, data, "删除", {
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
	    "listener": {
	    	"loadRow": function(thisPlugin, data, rowIndex, dl){
	    		defineDYSPFZM.getPluginObj("LIST").disabledRowData(rowIndex, true);
	    	}
	    }
	}
});

defineDYSPFZM.setEvent([{
		"selector": "#query",
		"event":"click",
		"func":function(){
			defineDYSPFZM.query();
		}

	},
	{
		"selector": "[data-id='DR']",
		"event": "click",
		"func": function(){
			defineDYSPFZM.getTab().find("[id='jlSaveCard']").hide();
		}
	},
	{
			"selector": "[data-id='JCXX']",
			"event": "click",
			"func": function(){
				defineDYSPFZM.getTab().find("[id='jlSaveCard']").show();
				}
	},
	{
			"selector": "#jlCancelSlide",
			"event":"click",
			"func":function(){
				defineDYSPFZM.find("li[name='MESSAGE']").hide();
			}
	},
	{
			"selector": "[data-id='DR']",
			"event": "click",
			"func": function(){
				defineDYSPFZM.getTab().find("[id='jlSaveCard']").hide();
				defineDYSPFZM.getTab().find("[name='BUTTON']").hide();
					
			}
	},

]);



defineDYSPFZM.setAfterInit(function() {
	JL.tab(defineDYSPFZM, {
		"JCXX": "基础信息"
	});
	defineDYSPFZM.query();
});

defineDYSPFZM.query = function(){
	var queryField = {};
	var value = defineDYSPFZM.getTab().find("[name='query']").val();
	if(!JL.isNull(value)){
		queryField["query"] = value;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	queryField["GSXX01"] = userInfo.PCRM_GSXX01;
	debugger;
	var resultData = defineDYSPFZM.getSqlResult(queryField, "MONGO_DYSPFZM", "SCM_DYSPFZM", "admin/scm/jcdy/search");
	console.info(resultData.data);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineDYSPFZM.getPluginObj("LIST").setPaging(resultData.fileName); 
};


