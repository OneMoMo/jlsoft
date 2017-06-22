var defineDBRYXE = JL.JLForm();
	defineDBRYXE.setPlugin({

		"footer" : {
			"jlid": "JLToolBar",
			"buttons": {
				"jlSaveCard":{
					"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
					"listener": {

				},
					"before": function(){
						
						
					},
					"success":function(data,tip){
						
						defineDBRYXE.query();
					   
						
					}
				},
				"jlCancelSlide":{}
			}
		},  
	"jlbh":{
			"jlid": "JLInput",
			"cds": "CDS", 
			"cds-field": "LIST.jlbh",
			
		},
		"GSXX01":{
			"jlid": "JLInput",
			"cds": "CDS", 
			"cds-field": "LIST.GSXX01",
			"format":{}
		},
	"SQR_RYXX01":{
			"jlid": "JLInput",
			"cds": "CDS", 
			"readonly": true,
			"cds-field": "LIST.SQR_RYXX01"
		},
	
	"DBXE":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DBXE",
		"listener": {
			"blur":function(data){ 
				if(!JL.isNull(data)){
	        		var SXED = defineDBRYXE.getPluginObj('SXED').getData();
	        		
	        		
	        			defineDBRYXE.getPluginObj('TZKYED').setData(data-SXED);
	        		
	        		
	        	}	
	        	
	        },
	        
    	}
	},
	"DQSJ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DQSJ"
	},
	"DBQXQ" : {
		"jlid" : "JLDate",
		"cds": "CDS", 
		"cds-field": "LIST.DBQXQ"
	},
	"DBQXZ" : {
		"jlid" : "JLDate",
		"cds": "CDS", 
		"cds-field": "LIST.DBQXZ"
	},
	"DBRMC":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.DBRMC",
		"queryConfig": {
			"namespace": "RYXX",
			"sqlid": "selectDBR",
			"init" : { "GSXX01"  : "GSXX01" },
			"dir": "scm/pub/search",
		//	"textid": "DBRMC",
			"fieldMapping":{
				"KEY":"SQR_RYXX01",
				"VALUE":"DBRMC",
				"SYJE":"SXED",
				"JE":"TZKYED",
				"DBQXQ":"DBQXQ",
				"DBQXZ":"DBQXZ",
				"SQED":"XJSQXE",
				"SYED":"XJYYED",
				"ED":"XJYYED",
				"QXJB":"XJSQJB",
				"ZQ":"DQSJ",
				"SQRQQ":"XJSQQ",
				"SQRQZ":"XJSQZ"		
			},
			"listener":{
//				"click": function(data){ 
//					console.info('asdfasdf');
//					defineDBRYXE.getPluginObj('SQR_RYXX01').setData(data.key);
//					defineDBRYXE.getPluginObj('SXED').setData(data.SYJE);
//					defineDBRYXE.getPluginObj('TZKYED').setData(data.JE);
//					defineDBRYXE.getPluginObj('DBQXQ').setData(data.DBQXQ);
//					defineDBRYXE.getPluginObj('DBQXZ').setData(data.DBQXZ);
//					defineDBRYXE.getPluginObj('XJSQXE').setData(data.SQED);
//					defineDBRYXE.getPluginObj('XJYYED').setData(data.SYED);
//					defineDBRYXE.getPluginObj('XJSYED').setData(data.ED);
//					defineDBRYXE.getPluginObj('XJSQJB').setData(data.QXJB);
//					defineDBRYXE.getPluginObj('DQSJ').setData(data.ZQ);
//					defineDBRYXE.getPluginObj('XJSQQ').setData(data.SQRQQ);
//					defineDBRYXE.getPluginObj('XJSQZ').setData(data.SQRQZ);
		
					"beforequery" : function(data) {
						data["GSXX01"] =userInfo["PCRM_GSXX01"] ;
				
					}
			}
			
		} 
	},


	"SXED":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"readonly": true,
		"cds-field": "LIST.SXED",
		"listener": {
//			"blur":function(data){  
//	        	if(!JL.isNull(data)){
//	        		var DBXE = defineDBRYXE.getPluginObj('DBXE').getData();
//	        		if (data>0){
//	        			defineDBRYXE.getPluginObj('TZKYED').setData(DBXE-data);
//	        		}else{
//	        			defineDBRYXE.getPluginObj('TZKYED').setData(DBXE);
//	        		}
//	        		
//	        	}
//	        } 
    	}
	},
	"TZKYED":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"readonly": true,
		"cds-field": "LIST.TZKYED"
			
	},
//	"XJSQJB":{
//		"jlid": "JLInput",
//		"cds": "CDS", 
//		"readonly": true,
//		"cds-field": "LIST.XJSQJB"
//	},
	"XJSQJB" : {
		"jlid": "JLSelect",
		"default" : "",
		"cds":"CDS",
		"cds-field":"LIST.XJSQJB",
		"noremove":true,
		"options": {"0":"0","1":"限价级别1","2":"限价级别2","3":"限价级别3","4":"限价级别4","5":"限价级别5"}
	},
	"XJSQQ" : {
		"jlid" : "JLDate",
		"cds": "CDS", 
		"cds-field": "LIST.XJSQQ"
	},
	"XJSQZ" : {
		"jlid" : "JLDate",
		"cds": "CDS", 
		"cds-field": "LIST.XJSQZ"
	},
	"XJSQXE":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.XJSQXE",
		"listener": {
			"blur":function(data){  
	        	if(!JL.isNull(data)){
	        		var XJYYED = defineDBRYXE.getPluginObj('XJYYED').getData();
	        		if (XJYYED>0){
	        			defineDBRYXE.getPluginObj('XJSYED').setData(data-XJYYED);
	        		}else{
	        			defineDBRYXE.getPluginObj('XJSYED').setData(data);
	        		}
	        		
	        	}
	        } 
    	}
	},
	"XJYYED":{
		"jlid": "JLInput",
		"cds": "CDS",
		"readonly": true,
		"cds-field": "LIST.XJYYED",
		"listener": {
//			"blur":function(data){  
//	        	if(!JL.isNull(data)){
//	        		var XJSQXE = defineDBRYXE.getPluginObj('XJSQXE').getData();
//	        		if (data>0){
//	        			defineDBRYXE.getPluginObj('XJSYED').setData(XJSQXE-data);
//	        		}else{
//	        			defineDBRYXE.getPluginObj('XJSYED').setData(XJSQXE);
//	        		}
//	        		
//	        	}
//	        } 
    	}
	},
	"XJSYED":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"readonly": true,
		"cds-field": "LIST.XJSYED"
	},
//	"SQID" : {
//		 "jlid": "JLInput",0
//		 "cds":"CDS",
//		 "cds-field":"LIST.SQID",
//		 "placeholder": "请输入小于三十位长度编码(数字或字母)",
//		 
//	},
//	
//	"SQMM":{
//		"jlid": "JLInput",
//		"type": "password",
//		"cds": "CDS", 
//		"cds-field": "LIST.SQMM",
//		"placeholder": "6~20位英文字母和数字", 
//		
//	},
	"LIST": {
		"jlid": "JLLayoutGrid",
		"paging": "more",
		"multi": false,
		"mode": "edit",
		"cds": "CDS", 
		"buttons": {
			"jlNew": {}
	    },
		"title" : [
		           
		           {"id":"SQR_RYXX01", "name":"人员编码", "width":"w01"},
		           {"id":"DBRMC", "name":"人员名称", "width":"w01"},
		           {"id":"DBXE", "name":"担保限额", "width":"w01"},
		           {"id":"SXED", "name":"使用金额", "width":"w01"},
		           {"id":"TZKYED", "name":"剩余额度", "width":"w01"},
		           {"id":"XJSQXE", "name":"限价授权限额", "width":"w02"},
		           {"id":"XJYYED", "name":"限价已用额度", "width":"w02"},
		           {"id":"XJSYED", "name":"限价剩余额度", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		          ],
		"header": [
		    {"id":"jlbh", "title":"jlbh","hidden":true}, 
			{"id":"SQR_RYXX01",  "groupid":"SQR_RYXX01", "title":"人员编码","groupcss":"w01"},
			{"id":"DBRMC",  "groupid":"DBRMC", "title":"人员名称","groupcss":"w01"},
			{"id":"DBXE",  "groupid":"DBXE", "title":"担保限额","groupcss":"w01"},
			{"id":"SXED",  "groupid":"SXED", "title":"使用金额","groupcss":"w01"},
			{"id":"TZKYED",  "groupid":"TZKYED", "title":"剩余额度","groupcss":"w01"},
			{"id":"XJSQXE",  "groupid":"XJSQXE", "title":"限价授权限额","groupcss":"w02"},
			{"id":"XJYYED",  "groupid":"XJYYED", "title":"限价已用额度","groupcss":"w02"},
			{"id":"XJSYED",  "groupid":"XJSYED", "title":"限价剩余额度","groupcss":"w02"},
			// {"id":"DBMC", "title":"担保名称", "hidden":true},
			 {"id":"XJSQJB",  "title":"限价授权级别", "hidden":true},
			 {"id":"DBQXQ",  "title":"担保期限起", "hidden":true},
			 {"id":"DBQXZ",  "title":"担保期限止", "hidden":true},
			 {"id":"DQSJ",  "title":"账期", "hidden":true},
			 {"id":"XJSQQ", "title":"限价授权期起", "hidden":true},
			 {"id":"XJSQZ",  "title":"限价授权期止", "hidden":true},
		    {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit","groupcss":"w01",
				"config":{
					"readonly": ["DBRMC","SXED","TZKYED","XJYYED","XJSYED"],
					"mapping":{},
				},
				"listener" : {
					"click" : function (thisPlugin,rowIndex) { 
						console.info(thisPlugin.data[rowIndex]);
						
						var XmlData = {};  
						//defineDBRYXE.getPluginObj('DBQXQ').setData(thisPlugin.data[rowIndex].DBQXQ);
//						defineDBRYXE.getPluginObj('DBQXQ').setData(data.DBQXQ);
//						defineDBRYXE.getPluginObj('DBQXZ').setData(data.DBQXZ);
//						
//						defineDBRYXE.getPluginObj('XJSQJB').setData(data.QXJB);
//						defineDBRYXE.getPluginObj('DQSJ').setData(data.ZQ);
//						defineDBRYXE.getPluginObj('XJSQQ').setData(data.SQRQQ);
//						defineDBRYXE.getPluginObj('XJSQZ').setData(data.SQRQZ);
//						//调接口
						/*var XmlData = {}; 
						XmlData["RYXX01"] = thisPlugin.data[rowIndex].SQR_RYXX01;
						var ajaxJson = {};
						ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineDBRYXE/getDBSYED.do";
						ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
						var resultData = JL.ajax(ajaxJson);
						var returnList = resultData.data.returnList;
						//赋值
						defineDBRYXE.getPluginObj('SXED').setData(returnList[0].SXED);
						defineDBRYXE.getPluginObj('TZKYED').setData(returnList[0].TZKYED);
						defineDBRYXE.getPluginObj('XJYYED').setData(returnList[0].XJYYED);
						defineDBRYXE.getPluginObj('XJSYED').setData(returnList[0].XJSYED);*/
					}
				},
//            	"listener": {
//            		"click": function(thisPlugin, rowIndex, obj){
//            			var XmlData = {}; 
//						XmlData["DBXE"] = thisPlugin.data[rowIndex].DBXE;
//				    	var ajaxJson = {};
//				    	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineSKXSFSQX/selectDBR.do";
//				    	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
//				    	var resultData = JL.ajax(ajaxJson);
//            		}
//            	}
				
			},
		    {"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
            	"listener": {
            		"click": function(thisPlugin, rowIndex, obj){
						debugger;
						//defineDBRYXE.getPluginObj('jlbh').setData(0);
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否清零?", function(){
//							var selectedIndex = thisPlugin.getSelectedIndex();
//	         		          JL.recursiveAjax(thisPlugin, {"jlbh" : "0","SXED": "0","TZKYED": "0","XJSQXE": "0","XJYYED": "0",
//								"XJSYED": "0","DBXE": "0","bdbh":"9037"}, selectedIndex, "删除", 0, defineDBRYXE.initField);
							debugger;
							var XmlData = {}; 
							XmlData["SQR_RYXX01"]=data["SQR_RYXX01"];
							XmlData["DBQXQ"]=data["DBQXQ"];
							XmlData["DBQXZ"]=data["DBQXZ"];
							XmlData["DBXE"]="0";
							XmlData["SXED"]="0";
							XmlData["TZKYED"]="0";
							XmlData["XJSQXE"]="0";
							XmlData["XJYYED"]="0";
							XmlData["XJSYED"]="0";
							var ajaxJson = {};
							ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineDBRYXE/delDBRYED.do";
							ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
							var resultData = JL.ajax(ajaxJson);
							var returnList = resultData.data.returnList;
							if (returnList == 1){
								JL.tip("清零成功");
								defineDBRYXE.query();
							}
		    				debugger;
		    			/*	data["jlbh"] = "0";
							data["DBXE"]="0";
							data["SXED"]="0";
							data["TZKYED"]="0";
							data["XJSQXE"]="0";
							data["XJYYED"]="0";
							data["XJSYED"]="0";
							JL.saveForm(defineDBRYXE, data, "删除", {
								"disabled": false,
								"success":function(){
									
									//thisPlugin.removeRow(rowIndex);
									defineDBRYXE.query();
								 }	 
            			});*/
            		});
            	}
		    }
		    }
		    ]
           
	}
	});

defineDBRYXE.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(data){
	//	console.info('query');
		defineDBRYXE.query();
	}
}]);

defineDBRYXE.setAfterInit(function(){
		defineDBRYXE.query();
	//	defineDBRYXE.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
});

defineDBRYXE.query = function() {
	//var query={};
	var a = defineDBRYXE.getTab().find("[name='query']").val(); 
	
	var XmlData = {}; 
	if(!JL.isNull(a)){
		XmlData["query"] = a;
	}
	XmlData["GSXX01"] = userInfo["PCRM_GSXX01"];
	
	console.info('123123');
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineDBRYXE/getDBXE.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	var returnList = resultData.data.returnList;
	 
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":returnList});
	CDS.post();
	defineDBRYXE.getPluginObj("LIST").setPaging(resultData.fileName);
};