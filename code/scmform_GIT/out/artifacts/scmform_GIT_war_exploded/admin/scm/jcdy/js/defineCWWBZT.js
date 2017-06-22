var defineCWWBZT = JL.JLForm();
defineCWWBZT.setPlugin({

		"footer" : {
			"jlid": "JLToolBar",
			"buttons": {
				"jlSaveCard":{
					"grid": "LIST",   //保存成功后,数据写到对应列表控件上显示。
					"before": function(){
					},
					"success":function(data,tip){
						defineCWWBZT.query();
					}
				},
				"jlCancelSlide":{}
			}
		},    
	
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh"
	},
	
	"DYGS":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"placeholder": "请选择！",
		"cds-field": "LIST.DYGS",
		  "sqlid":"RYXX.JTXX",
		  "resource": "scmform",
		  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	"XZJK":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"cds-field": "LIST.XZJK",
		"placeholder": "请选择！",
		 "options":{"0":"用友NC","1":"用友U8-EAI","2":"用友通","3":"金碟KIS","4":"用友U3",
			 "5":"金蝶K3","6":"用友U871","9":"浪潮","10":"金力V5","11":"BOKEV5","12":"金蝶K3WISE",
			 "13":"金蝶K3WISE12.2","14":"低版本用友(kingdee EAS)","15":"百年"},
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},

//	"XZJK":{
//	"jlid": "JLSearch",
//	"cds": "CDS",
//	"cds-field": "LIST.XZJK",
//	 
//	"queryConfig": {
//		"namespace": "RYXX",
//		"sqlid": "XZJK",
//		//"init" : { "GSXX01"  : "GSXX01" },
//		"dir": "scm/pub/search",
//		"fieldMapping":{
//			//"KEY":"XZZT",
//			"VALUE":"XZJK"
//		},
//	"listener":{
//			"beforequery" : function(data) {
//				//data["GSXX01"] =userInfo["PCRM_GSXX01"];
//			}
//		}
//	}
//},

	
	 "WBZT01":{
			"jlid": "JLInput",
			"cds": "CDS", 
			"cds-field": "LIST.WBZT01"
		},
	"WBZT02":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.WBZT02"
	},
	"NCGSID":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.NCGSID"
	},
	"NCGSPK":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.NCGSPK"
	},
	"CWJK":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.CWJK"
	},
	"LIST": {
		"jlid": "JLLayoutGrid",
		"paging": "more",
		"multi": false,
		"mode": "edit",
		"cds": "CDS", 
		"buttons": {
			"jlNew":{
				"listener": {
					"click":function(obj, thisPlugin){
						
					}
				}
			}
		},
		"title" : [
		           {"id":"WBZT01", "name":"帐套编码", "width":"w03"},
		           {"id":"WBZT02", "name":"帐套名称", "width":"w03"},
		           {"id":"DYGS", "name":"公司名称", "width":"w03"},
		           {"id":"CZ", "name":"操作", "width":"w03"}
		          ],
		"header": [
		    {"id":"jlbh", "title":"jlbh","hidden":true}, 
		    {"id":"WBZT01", "groupid":"WBZT01", "title":"帐套编码"},   
		    {"id":"WBZT02", "groupid":"WBZT02", "title":"帐套名称"},
		    {"id":"DYGS", "groupid":"DYGS", "title":"公司名称"}, 
		  

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
							JL.saveForm(defineCWWBZT, data, "删除", {
								"disabled": false,
								"success":function(){
									//defineBOMSPXX.query();
									thisPlugin.removeRow(rowIndex);
									}	 
							});
						});
            		}
            	}
		    }]
     	}
	});

	defineCWWBZT.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineCWWBZT.query();
	}
}]);

defineCWWBZT.setAfterInit(function(){
	defineCWWBZT.query();
});

defineCWWBZT.query = function() {
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	debugger;
	var query={};
	var a = defineCWWBZT.getTab().find("[name='query']").val(); 
	
	if(!JL.isNull(a)){
		query["query"] = a;
	}
	query["GSXX01"] = userInfo["PCRM_GSXX01"];
	query["S_VALUE"] = {"$ne":"D1"};
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineCWWBZT.getSqlResult(query, "MONGO_CWWBZT", "SCM_CWWBZT1", "admin/scm/jcdy/search");
	        
	    	defineCWWBZT.getPluginObj("DYGS").config.options = {};
	    	defineCWWBZT.getPluginObj('DYGS').config.param = {"CZY14":"1"};
	    	defineCWWBZT.getPluginObj('DYGS').init();
	    }else if (data.CZY14==2){
	    	var resultData = defineCWWBZT.getSqlResult(query, "MONGO_CWWBZT", "SCM_CWWBZT2", "admin/scm/jcdy/search");
	    	
	    	defineCWWBZT.getPluginObj("DYGS").config.options = {};
	    	defineCWWBZT.getPluginObj('DYGS').config.param = {};
	    	defineCWWBZT.getPluginObj('DYGS').init();
	    }else{
	    	var resultData = defineCWWBZT.getSqlResult(query, "MONGO_CWWBZT", "SCM_CWWBZT", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = defineCWWBZT.getSqlResult(query, "MONGO_CWWBZT", "SCM_CWWBZT", "admin/scm/jcdy/search");
	} 
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineCWWBZT.getPluginObj("LIST").setPaging(resultData.fileName);
};