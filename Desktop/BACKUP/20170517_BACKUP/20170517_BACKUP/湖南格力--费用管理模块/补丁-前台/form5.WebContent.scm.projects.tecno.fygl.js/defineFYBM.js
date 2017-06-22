/**
 * @author 周泽
 * 2016-10-14 10:55:05
 */

var defineFYBM = JL.JLForm();
defineFYBM.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
					debugger;
					defineFYBM.readData();
					defineFYBM.getData();
				},
				"success":function(data,tip){
					defineFYBM.query();
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
	"GSXX01" : {
		  "jlid": "JLInput",
		  "cds": "CDS", 
		  "cds-field": "LIST.GSXX01",
		  "format":{}
	},
	"SJBMBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SJBMBM",	
		 "format":{}
	},
	"GSMC":{
		  "jlid": "JLSelect",
		  "cds": "CDS", 
		  "readonly": false,
		  "cds-field": "LIST.GSMC",
		  "sqlid":"JCDY.JTXX",
		  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		  "resource": "scmform"
	},
	"FYBMDM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYBMDM",
		 //"maxlength": 4,
		 "placeholder":"请输入编码(数字或字符)",
		 "format":{"null":false},
			"listener":{	
				"blur":function(value){
					var regex = /^[A-Za-z0-9]+$/; //手机
					if(!regex.test(value)){
						JL.message(defineFYBM.getTab().find("#d_FYBMDM"), "只能输入数字或字母", "error");
						return false;
					}
					/*if(value.length < 4){
						JL.message(defineFYBM.getTab().find("#d_FYBMDM"), "请输入四位编码", "error");
						return false;
					}*/
					var XmlData = {};
					XmlData["FYBMDM"] = value;
					XmlData["SJBMBM"] = defineFYBM.getTab().find("[name='SJBMBM']").val();
					var ajaxJson = {};
					ajaxJson["src"] = "JLInterface/checkFYBM.do";
					ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
					JL.ajax(ajaxJson);
				}
			}
	},
	"FYBMMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYBMMC",	
		 "format":{}
	},
	"YWBMMC":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.YWBMMC",
		"placeholder" : "选择部门",
		"queryConfig": {
			"namespace": "FYYS",
			"sqlid": "MJBM",
			"dir": "scm/projects/tecno/fygl/search",
			"init":{"GSMC.key":"GSXX01"},
			"fieldMapping":{
				"BM01":"BM01",
				"BMMC":"YWBMMC"
			}
		},
	},
	"BM01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.BM01",	
		 "format":{}
	},
	"JLWBBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.JLWBBM",	
		 "format":{}
	},
	"BMMJBJ" : {
		"jlid": "JLCheckbox", 
		"cds": "CDS",
		"cds-field": "LIST.BMMJBJ",
		/*"default": "1", */
		"options": {"1":"末级"}
	},
	"BMYXBJ" : {
		"jlid": "JLCheckbox", 
		"cds": "CDS",
		"cds-field": "LIST.BMYXBJ",
		"default": "1", 
		"options": {"1":"有效"}
	},
	"LX03":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.LX03",
		"format":{}
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
		"cds" : "CDS",
		"parent": "SJBMBM",//上级节点
		"current": "FYBMDM",//当前节点
		"level": "LX03",//级别
		"final": {"id":"MJBJ", "key": "1"},//末级标记
		"paging": "more",
		"buttons": {
			"jlNew": {
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
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
			 {"id":"SJBMBM","hidden":true},
			 {"id":"SJBMBM","hidden":true},
			 {"id":"GSMC","hidden":true},
		     {"id":"FYBMMC","groupid":"TREE", "title":"费用部门名称"},
		     {"id":"DYBM","hidden":true},
		     {"id":"WBBM","hidden":true},
		     {"id":"newChild", "groupid":"CZ", "title":"新增子级", "css":"fr", "editor":"JLNewChild",
             	 "config":{
             		"readonly": ["GSMC"],
             		 "mapping":{"FYBMDM":"SJBMBM"}
             	 },
             	 "listener": {
             		 "click": function(data, rowIndex, obj, thisPlugin){
             			 debugger;
             			 var json={};
           			     json["key"]=data.GSMC.key;
           			     json["value"]=data.GSMC.value;
            			 defineFYBM.getPluginObj("GSMC").setData(json);
             	   }
             	 }
              },
		     {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
            	 "config":{
            		 "readonly": ["FYBMDM","GSMC"],
            		 "mapping":{"FYBMDM": "SJBMBM"}
	             },
	        	 "listener": {
            		 "click": function(data, rowIndex, obj, thisPlugin){
            			 debugger;
            			 var json={};
            			 json["key"]=data.GSMC.key;
            			 json["value"]=data.GSMC.value;
             			 defineFYBM.getPluginObj("GSMC").setData(json);
            			 if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.FYBMDM+"'] dl").length > 0){
            				 defineFYBM.getPluginObj("BMMJBJ").disabled(true);
            			 } else {
            				 defineFYBM.getPluginObj("BMMJBJ").disabled(false);
            			 }
            		 }
            	 }
              }
		     ]
	    }
	});

defineFYBM.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineFYBM.query();
	}
}]);


defineFYBM.setAfterInit(function() {
	debugger;
	defineFYBM.query();
});

defineFYBM.query = function() {
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	debugger;
	var query={};
	var a = defineFYBM.getTab().find("[name='query']").val(); 
	debugger;
	if(!JL.isNull(a)){
		query["query"] = a;
	}
	query["GSXX01"] = userInfo["PCRM_GSXX01"];
	query["S_VALUE"] = {"$ne":"D1"};
	
	var resultData;
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	 resultData = defineFYBM.getSqlResult(query, "MONGO_FYBM", "SCM_FYBM1", "scm/projects/tecno/fygl/search");
	        
	    	defineFYBM.getPluginObj("GSMC").config.options = {};
	    	defineFYBM.getPluginObj('GSMC').config.param = {"CZY14":"1"};
	    	defineFYBM.getPluginObj('GSMC').init();
	    }else if (data.CZY14==2){
	    	resultData = defineFYBM.getSqlResult(query, "MONGO_FYBM", "SCM_FYBM2", "scm/projects/tecno/fygl/search");
	    	
	    	defineFYBM.getPluginObj("GSMC").config.options = {};
	    	defineFYBM.getPluginObj('GSMC').config.param = {};
	    	defineFYBM.getPluginObj('GSMC').init();
	    }else{
	    	resultData = defineFYBM.getSqlResult(query, "MONGO_FYBM", "SCM_FYBM", "scm/projects/tecno/fygl/search");
	    }
	}else{
		 resultData = defineFYBM.getSqlResult(query, "MONGO_FYBM", "SCM_FYBM", "scm/projects/tecno/fygl/search");
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineFYBM.getPluginObj("LIST").setPaging(resultData.fileName);

};

