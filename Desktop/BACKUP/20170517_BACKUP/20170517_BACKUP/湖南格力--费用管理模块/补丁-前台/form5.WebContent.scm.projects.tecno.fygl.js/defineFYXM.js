/**
 * @author 周泽
 * 2016-10-14 09:55:05
 */

var defineFYXM = JL.JLForm();
defineFYXM.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					defineFYXM.query();
				}
			},
			"jlCancelSlide":{}
		}
	},
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",	
		 "format":{}
	},
	"SRDM01":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.SRDM01",
		"format":{}
	},
	"SJFYBM":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.SJFYBM",
		"format":{}
	},
	"FYBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYBM",
		 "placeholder":"请输入费用编码(数字或字符)",
		 "format":{"null":false},
			"listener":{	
				"blur":function(value){
					var regex = /^[A-Za-z0-9]+$/; //手机
					if(!regex.test(value)){
						JL.message(defineFYXM.getTab().find("#d_FYBM"), "只能输入数字或字母", "error");
						return false;
					}
					var XmlData = {};
					XmlData["FYBM"] = value;
					XmlData["SJFYBM"] = defineFYXM.getTab().find("[name='SJFYBM']").val();
					var ajaxJson = {};
					ajaxJson["src"] = "JLInterface/checkFYLX.do";
					ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
					JL.ajax(ajaxJson);
				}
			}
	},
	"FYXM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYXM",
		 "placeholder":"请输入项目名称",
		 "format":{"null":false}
	},
	"CWKM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CWKM",	
		 "format":{},
		 "format":{"null":false}
	},
	"SRDM":{
		"jlid": "JLInput",
		"readonly":true,
		"cds": "CDS",
		"cds-field": "LIST.SRDM",
		"format":{},
		"dir": "scm/cgjs/fgdsrd/search",
		"namespace": "FGDSRD",
		"sqlid": "JSSRDM",
		"placeholder" : "选择收入代码",
		"fieldMapping":{
			"JSSR01":"SRDM01",
			"JSSRMC":"SRDM"
		}
	},
	"FYMJBJ" : {
		"jlid": "JLCheckbox", 
		"cds": "CDS",
		"cds-field": "LIST.FYMJBJ",
		/*"default": "1",*/ 
		"options": {"1":"末级"}
	},
	"FYYXBJ" : {
		"jlid": "JLCheckbox", 
		"cds": "CDS",
		"cds-field": "LIST.FYYXBJ",
		"default": "1", 
		"options": {"1":"有效"}
	},
	"LX03":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.FL03",
		"format":{}
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
		"cds" : "CDS",
		"parent": "SJFYBM",//上级节点
		"current": "FYBM",//当前节点
		"level": "LX03",//级别
		"final": {"id":"MJBJ", "key": "1"},//末级标记
		"paging": "more",
		"buttons": {
			"jlNew": {
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						defineFYXM.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
					}
				}
			}
	    },
		"title" : [
		           {"id":"TREE", "name":"代码/名称", "width":"w10"},
		           {"id":"CZ", "name":"操作", "width":"w02 tr pr10"}
		           ],
		    "header" : [
			 {"id":"bdbh", "hidden":true},
			 {"id":"jlbh", "hidden":true},
			 {"id":"LX03", "hidden":true},
			 {"id":"SJFYBM", "hidden":true},
			 {"id":"FYBM","groupid":"TREE", "title":"费用编码"},
		     {"id":"FYXM","groupid":"TREE", "title":"项目名称"},
		     {"id":"CWKM", "hidden":true},
		     {"id":"FYYXBJ","hidden":true},
		     {"id":"FYMJBJ", "hidden":true},
		     {"id":"edit", "groupid":"CZ", "title":"编辑", "css":"fr", "editor":"JLEdit", 
				 "config":{
            		 "readonly": ["FYBM"],
            		 "mapping":{"FYBM": "SJFYBM"}
            	 },
            	 "listener": {
            		 "click": function(data, rowIndex, obj, thisPlugin){
            			 debugger;
            			 defineFYXM.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
            			 if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.FYBM+"'] dl").length > 0){
            				 defineFYXM.getPluginObj("FYMJBJ").disabled(true);
            			 } else {
            				 defineFYXM.getPluginObj("FYMJBJ").disabled(false);
            			 }
            		 }
            	 }
             },
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "css":"fr", "editor":"JLNewChild",
            	 "config":{
            		 "mapping":{"FYBM":"SJFYBM"}
            	 },
            	 "listener": {
            		 "click": function(data, rowIndex, obj, thisPlugin){
            			 defineFYXM.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]); 
            	   }
            	 }
             }
		     ]
	    }
	});

defineFYXM.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineFYXM.query();
	}
}]);

defineFYXM.setAfterInit(function() {
	debugger;
	//defineFYXM.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
	defineFYXM.query();
});

defineFYXM.query = function() {
	debugger;
	var query={};
    query={"GSXX01":userInfo["PCRM_GSXX01"]};
	query["S_VALUE"] = {"$ne":"D1"};
	var search = defineFYXM.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	var resultData = defineFYXM.getSqlResult(query, "MONGO_FYXM", "SCM_FYXM", "scm/projects/tecno/fygl/search");
	console.info(resultData);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineFYXM.getPluginObj("LIST").setPaging(resultData.fileName);
};

