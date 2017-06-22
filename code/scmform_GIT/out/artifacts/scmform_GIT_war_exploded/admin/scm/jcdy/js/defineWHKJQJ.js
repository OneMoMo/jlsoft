var defineWHKJQJ = JL.JLForm();
var czydata=0;
var flag = true;
String.prototype.replaceALL = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"), s2);
}
defineWHKJQJ.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST",
				"success" : function(data, tip) {
					console.info('after');
					defineWHKJQJ.query();
				}
			},
			"jlCancelSlide" : {
				"cds" : "CDS"
			}
		}
	},
	"WHCWND" : {
		"jlid" : "JLSelect",
		"placeholder" : "请选择财务年度", 
		"sqlid":"RYXX.CWND",
		"resource" : "scmform",
	    "readonly" : true,
	    "param" : {
	    	"GSXX01":userInfo["PCRM_GSXX01"]
	    },
	    "listener":{
	    	"change":function(data){
	    		debugger;
	    		defineWHKJQJ.query();
	    	}
	    }
	},
	"WHKJQJ":{
		"jlid": "JLGrid",
	    "tittles" : "会计期间",
	    "cds" : "CDS",
		"cds-field" : "LIST.WHKJQJ",
	    "headers": [
	                {"id": "CWND",  "name": "财务年度"},
	                {"id": "KJQJ",  "name": "会计期间"},
	                {"id": "KSRQ",  "name": "开始日期","editor":{
	                	"type":"text",
	                	"jlid":"JLDate"
	                	
	                }},
	                {"id": "ZZRQ",  "name": "终止日期","editor":{
	                	"type":"text",
	                	"jlid":"JLDate"
	                	
	                }},
	                {"id": "YJBJ",  "name": "月结标记",
	                	"editor":
	    		    	{
	    		    		"type" : "checkbox"
	    		    	}
	                }
	           ],
	     "buttons":[{"text":"新建","icon":"plus","func": function(){
	    	 if(!flag){
	    		 JL.tip("您已经新建了！");
	    		 return false;
	    	 }
	    	 var cwnd = defineWHKJQJ.getPluginObj("CWND").getData();
				JL.confirm("是否生成"+cwnd+"年会计期间?", function(){
					var plugin = defineWHKJQJ.getPluginObj("WHKJQJ");
					for(var count = 1; count < 13;count++){
						debugger;
						var data;
						if(count == 4||count == 6||count == 9||count ==11){
							data = {"CWND":cwnd,"KJQJ":count,"KSRQ":cwnd+"-"+count+"-1","ZZRQ":cwnd+"-"+count+"-30","YJBJ":0};//{"key":"1","value":"111"}
						}else if(count == 2){
							if((cwnd+1) % 4 == 0 && (cwnd+1) % 100 != 0 || (cwnd+1) % 400 == 0){
								data = {"CWND":cwnd,"KJQJ":count,"KSRQ":cwnd+"-"+count+"-1","ZZRQ":cwnd+"-"+count+"-29","YJBJ":0};
							}else{
								data = {"CWND":cwnd,"KJQJ":count,"KSRQ":cwnd+"-"+count+"-1","ZZRQ":cwnd+"-"+count+"-28","YJBJ":0};
							}
							
						}else{
							data = {"CWND":cwnd,"KJQJ":count,"KSRQ":cwnd+"-"+count+"-1","ZZRQ":cwnd+"-"+count+"-31","YJBJ":0};
						}
						plugin.addRow(data);
					}
					flag = false;
				}, function(){
				
				});
	    	 
	     }}]

		
	},
	"XZZT" : {
		"jlid" : "JLSearch",
		"placeholder" : "请选择账套",
		"readonly" : false,
		"cds" : "CDS",
		"cds-field" : "LIST.XZZT",
		"queryConfig" : {
			"namespace" : "RYXX",
			"sqlid" : "WBZT",
			 /*"init" : {
			 "GSXX01" : "GSXX01"
			 },*/
			"dir" : "scm/pub/search",
			"fieldMapping" : {
				"KEY" : "WBZT01",
				"VALUE" : "XZZT"
			},
			"listener" : {
				"beforequery" : function(data) {
					if (czydata == 0){
						data["GSXX01"]=userInfo.PCRM_GSXX01;
					}else if (czydata == 1){
						data["CZY14"]="1";
						//data["GSXX01"]=userInfo.PCRM_GSXX01;
					} 
				},
				"beforecallback" : function(data) {
					var XmlData = {};
					XmlData["GSXX01"] = data[0].KEY;
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineWHKJQJ/selectWHKJQ.do";
					ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
					debugger;
					var resultData = JL.ajax(ajaxJson);
					console.info(resultData);
					var returnList = resultData.data;
					if(returnList.YWKJ02 == 12){
						defineWHKJQJ.getPluginObj("CWND").setData(returnList.YWKJ01+1);
					}else{
						if(!JL.isNull(returnList)){
							defineWHKJQJ.getPluginObj("CWND").setData(returnList.YWKJ01);
						}else {
							defineWHKJQJ.getPluginObj("CWND").setData(new Date().getFullYear());
						}
					}
					
					flag = true;
					var plugin = defineWHKJQJ.getPluginObj("WHKJQJ");
					plugin.removeAll();
				}
			}
		}
	},
	"CWND" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.CWND",
		"noremove":true,
		"listener":{
			"blur":function(data){
				debugger;
				var cwnd = defineWHKJQJ.getPluginObj("CWND").getData();
				var num = /^\d{4}$/;
				if(!num.test(parseInt(cwnd))){
					JL.tip('财务年度必须为4位数字');
					defineWHKJQJ.getPluginObj("CWND").setData("");
				}
			}
		}
	},
	
	
	"WBZT01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.WBZT01",
		"format" : {}
	},
	"BJ" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.BJ"

	},
	"LXR" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.LXR"
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh"
	},
	"GSXX01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.GSXX01"
	},
	
	
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging" : "more",
		"multi" : false,
		"mode":"edit",
		"buttons" : {
			"jlNew" : {
				"listener" : {
					"click" : function(data) { 
						debugger;
						defineWHKJQJ.getPluginObj("GSXX01").setData(userInfo.PCRM_GSXX01);
						var XmlData = {};
						XmlData["GSXX01"] = userInfo.PCRM_GSXX01;
						var ajaxJson = {};
						ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineWHKJQJ/selectWHKJQ.do";
						ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
						debugger;
						var resultData = JL.ajax(ajaxJson);
						console.info(resultData);
						var returnList = resultData.data;
						if(returnList.YWKJ02 == 12){
							defineWHKJQJ.getPluginObj("CWND").setData(returnList.YWKJ01+1);
						}else{
							if(!JL.isNull(returnList)){
								defineWHKJQJ.getPluginObj("CWND").setData(returnList.YWKJ01);
							}else {
								defineWHKJQJ.getPluginObj("CWND").setData(new Date().getFullYear());
							}
						}
						
						//界面加载前显示默认公司账套
						var result = defineWHKJQJ.getSqlResult({"GSXX01":userInfo.PCRM_GSXX01}, "RYXX", "WBZT", "scm/pub/search");
						console.info(result);
						defineWHKJQJ.getPluginObj("XZZT").setData( result.data[0].VALUE);
						defineWHKJQJ.getPluginObj("WBZT01").setData( result.data[0].KEY);
						var arr = [0];
						defineWHKJQJ.getPluginObj("WHKJQJ").hideButton(arr,false);
						flag = true;
					}
				}
			}
		},

		"title" : [{
			"id" : "XZZT",
			"name" : "当前账套",
			"width" : "w02"
		},{
			"id" : "CWND",
			"name" : "财务年度",
			"width" : "w08"
		},
		{
			"id" : "CZ",
			"name" : "操作",
			"width" : "w02"
		} ],
		"header" : [ {
			"id" : "XZZT",
			"groupid" : "XZZT",
			"rowindex" : 1,
			"title" : "选择账套",
			"config":{
				"readonly":true
				
			}
		},
		{
			"id" : "CWND",
			"groupid" : "CWND",
			"rowindex" : 2,
			"title" : "财务年度"
		},
		 {
			"id" : "edit",
			"groupid" : "CZ",
			"rowindex" : 1,
			"title" : "编辑",
			"editor" : "JLEdit",
			"config" : {
				"mapping" : {
					
				}
			},
			"listener" : {
				"click" : function(thisPlugin,rowIndex) {
					debugger;
					var arr = [0];
					defineWHKJQJ.getPluginObj("WHKJQJ").hideButton(arr,true);
					defineWHKJQJ.getTab().find("#jlEmptyCard").hide();
				}
			}
		}]
	}
});


defineWHKJQJ.setEvent([ {
	"selector" : "#search",
	"event" : "click",
	"func" : function(data) {
		 defineWHKJQJ.query();
	}
} ]);

defineWHKJQJ.setAfterInit(function() {
	// 加载Grid数据事件
	 defineWHKJQJ.query();
});


defineWHKJQJ.query = function() {
	debugger;
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	  
	var queryField = {};
	queryField["S_VALUE"] = {
		"$ne" : "D1"
	};
	var search = defineWHKJQJ.getTab().find("[name='WHCWND']").val();
	if (!JL.isNull(search)) {
		queryField["WHCWND"] = search;
	}
	queryField["GSXX01"] = userInfo.PCRM_GSXX01;
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineWHKJQJ.getSqlResult(queryField, "MONGO_WHKJQJ",
	    			"SCM_WHKJQJ1", "admin/scm/jcdy/search");
	    	czydata = 1;
	    }else if (data.CZY14==2){
	    	var resultData = defineWHKJQJ.getSqlResult(queryField, "MONGO_WHKJQJ",
	    			"SCM_WHKJQJ2", "admin/scm/jcdy/search");
	    	czydata = 2;
	    }else{
	    	var resultData = defineWHKJQJ.getSqlResult(queryField, "MONGO_WHKJQJ",
	    			"SCM_WHKJQJ", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = defineWHKJQJ.getSqlResult(queryField, "MONGO_WHKJQJ",
    			"SCM_WHKJQJ", "admin/scm/jcdy/search"); 
	}
//	var resultData = defineWHKJQJ.getSqlResult(queryField, "MONGO_WHKJQJ",
//			"SCM_WHKJQJ", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST" : resultData.data});
	CDS.post(); // 分页加在更多
	defineWHKJQJ.getPluginObj("LIST").setPaging(resultData.fileName);
};

/*defineWHKJQJ.query = function() {
	var queryField = {};
	queryField["S_VALUE"] = {
		"$ne" : "D1"
	};
	var search = defineWHKJQJ.getTab().find("[name='WHCWND']").val();
	if (!JL.isNull(search)) {
		queryField["WHCWND"] = search;
	}
	queryField["GSXX01"] = userInfo.PCRM_GSXX01;
	var resultData = defineWHKJQJ.getSqlResult(queryField, "MONGO_WHKJQJ",
			"SCM_WHKJQJ", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST" : resultData.data});
	CDS.post(); // 分页加在更多
	defineWHKJQJ.getPluginObj("LIST").setPaging(resultData.fileName);
};*/

