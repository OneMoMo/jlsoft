var defineSZPZZL = JL.JLForm();
var czydata=0;

defineSZPZZL.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
					console.info('before');
				},
				"success":function(data,tip){
					console.info('success');
					defineSZPZZL.query();
				}
			},
			"jlCancelSlide":{}
	 }
	},
	"jlbh":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.jlbh",
		"readonly": true,
		"format":{	
		}
	},	
	"XZZT":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.XZZT",
		"placeholder": "请选择外部账套", 
		"queryConfig": {
			"namespace": "RYXX",
			"sqlid": "WBZT01",
			//"init" : {"GSXX01" : userInfo.PCRM_GSXX01},
			"dir": "scm/pub/search",
			"fieldMapping":{
				"KEY":"WBZT01",
				"VALUE":"XZZT"
			},
		"listener":{
				"beforequery" : function(data) {
					if (czydata == 0){
						data["GSXX01"]=userInfo.PCRM_GSXX01;
					}else if (czydata == 1){
						data["CZY14"]="1";
						//data["GSXX01"]=userInfo.PCRM_GSXX01;
					} 
				}
			}
		}
	},
	"WBZT01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.WBZT01",
		"format": {
		}
	},
	"GSXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSXX01"
	},
	"PZBM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PZBM",
		"placeholder" : "请输入凭证编码（数字或字符）",
		"format": {
		}
	},
	"WBPZBM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.WBPZBM",
		"placeholder" : "请输入外部凭证编码",
		"format": {
		}
	},
	
	"PZMC":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PZMC",
		"placeholder": "请输入凭证名称", 
		"format": {
		}
	},
	"RYMC":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.RYMC",
		"placeholder": "请选择结转人员", 
		"queryConfig": {
			"namespace": "PUBCX",
			"sqlid": "ZDR",
			"dir": "admin/scm/jcdy/js", 
			"fieldMapping":{
				"VALUE":"RYMC",
				"BM":"JZRYBM"
			},
			"listener":{
				"beforecallback" : function(data) {
//					data["GSXX01"] =userInfo["GSXX01"] ;
				}
			}
		}
	},
	"JZRYBM" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JZRYBM"
	},
	"PZLB" : {
		"jlid" : "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PZLB",
		"placeholder" : "请输入凭证类别",
		"resource": "scmform"
	},
	"SJLYB" : {
		"jlid" : "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SJLYB",
		"placeholder" : "请输入数据来源表",
		"resource": "scmform"
	},
	"BJZD":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.BJZD",
		"placeholder" : "请输入标记字段",
		"format": {
		}
	},
	"SJZD":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SJZD",
		"placeholder" : "请输入时间字段",
		"format": {
		}
	},
	"JZTJ":{
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.JZTJ",
		"placeholder" : "请选择结转条件",
		"options" : {
//			"1" : "按销售部门结转","2" : "按采购部门和供应商结转","3" : "按客户信息结转","4" : "按人员信息结转","5" : "按收款方式结转","6" : "按供应商结转"
			"1" : "按币别结转"
		},
		"format": {
		}
	},
	"JZFS":{
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.JZFS",
		"placeholder" : "请选择结转方式",
		"options" : {
			"0" : "按天结转","1" : "按月结转"
		},
		"format": {
		}
	},
	"DHZD":{
		"jlid": "JLInput",
		"cds": "CDS",
		"placeholder": "请输入单号字段",
		"cds-field": "LIST.DHZD",
		"format": {
		}
	},
	"FXK" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"default" : "1",
		"cds-field": "LIST.FXK",
		"css": "w3",
		"options" : {
			"1" : "是否有效","2" : "是否自动结转","3" : "是否自动导出","4" : "摘要是否附带接口凭证号"
		}
	},
	"YJTJSQL":{
		"jlid": "JLTextarea",
		"height": "120",
		"cds":"CDS",
		"cds-field":"LIST.YJTJSQL"
	},
	"JZBJSQL":{
		"jlid": "JLTextarea",
		"height": "120",
		"cds":"CDS",
		"cds-field":"LIST.JZBJSQL"
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"buttons": {
			"jlNew": {
				"listener":{
					"click":function(data){
				  		defineSZPZZL.getPluginObj("GSXX01").setData(userInfo.PCRM_GSXX01);
				  		
						var GSXX01=userInfo["PCRM_GSXX01"];
				  		var resultData = defineSZPZZL.getSqlResult({"GSXX01":GSXX01}, "RYXX", "WBZT01", "admin/scm/jcdy/search");
				  		var wbzt01=resultData.data[0]["KEY"];
				  		var wbzt02=resultData.data[0]["VALUE"];
				  		defineSZPZZL.getPluginObj("XZZT").setData(wbzt02)
				  		defineSZPZZL.getPluginObj("WBZT01").setData(wbzt01)
				  		console.info(resultData.data);
					}
				}
			}
	    },
		"title" : [
		           {"id":"PZBM", "name":"凭证编码", "width":"w01"},
		           {"id":"PZMC", "name":"凭证名称", "width":"w02"},
		           {"id":"PZLB", "name":"凭证类别", "width":"w02"},
		           {"id":"SJLYB", "name":"数据来源表", "width":"w02"},
		           {"id":"BJZD", "name":"标记字段", "width":"w02"},
		           {"id":"SJZD", "name":"时间字段", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		],
		"header" : [
		            {"id":"jlbh", "title":"jlbh", "hidden":true},
		            {"id":"PZBM", "groupid":"PZBM",  "rowindex" :1, "title":"凭证编码"},
		            {"id":"PZMC", "groupid":"PZMC",  "rowindex" :1, "title":"凭证名称"},
		            {"id":"PZLB",   "groupid":"PZLB",  "rowindex" :1, "title":"凭证类别"},
		            {"id":"SJLYB",   "groupid":"SJLYB",  "rowindex" :1, "title":"数据来源表"},
		            {"id":"BJZD",   "groupid":"BJZD",  "rowindex" :1, "title":"标记字段"},
		            {"id":"SJZD",   "groupid":"SJZD",  "rowindex" :1, "title":"时间字段"},
					{"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
						"config":{
							"readonly": ["PZBM"],
							"mapping":{}
						}
					},	
					{"id":"delete", "groupid":"CZ", "rowindex":1, "title": "删除", "editor":"link",
                     	 "listener":{
                     		 "click": function(thisPlugin, rowIndex, obj){
                     			JL.confirm("确认删除?", function(){
                     				title = "";
                     				var selectedIndex = thisPlugin.getSelectedIndex();
                     				JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineSZPZZL.initField);
                     				JL.tip("刪除成功");
                     			}); 
                     		 }
                     	 }
                    }
		]	
	}

});

defineSZPZZL.setEvent([{ 
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineSZPZZL.query();
	}
}]);

defineSZPZZL.query = function(){
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	
	var queryField = {};

	var a = defineSZPZZL.getTab().find("[name='DMMC']").val();

	queryField["S_VALUE"] = {"$ne":"D1"};
	if(!JL.isNull(a)){
		queryField["search"] = a;
	}
	
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineSZPZZL.getSqlResult(queryField, "MONGO_SZPZZL", "SCM_SZPZZL1", "admin/scm/jcdy/search");
	    	czydata = 1;
	    }else if (data.CZY14==2){
	    	var resultData = defineSZPZZL.getSqlResult(queryField, "MONGO_SZPZZL", "SCM_SZPZZL2", "admin/scm/jcdy/search");
	    	czydata = 2;
	    }else{
	    	var resultData = defineSZPZZL.getSqlResult(queryField, "MONGO_SZPZZL", "SCM_SZPZZL", "admin/scm/jcdy/search"); 
	    }
	}else{
		var resultData = defineSZPZZL.getSqlResult(queryField, "MONGO_SZPZZL", "MONGO_SZPZZL", "admin/scm/jcdy/search"); 
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineSZPZZL.getPluginObj("LIST").setPaging(resultData.fileName);
};

defineSZPZZL.setAfterInit(function() {
	JL.tab(defineSZPZZL, {
		"JCXX": "基础信息"
	});
	defineSZPZZL.query();
});