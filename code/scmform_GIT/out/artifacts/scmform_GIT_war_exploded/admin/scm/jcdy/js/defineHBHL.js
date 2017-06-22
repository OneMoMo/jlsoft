var defineHBHL = JL.JLForm();

defineHBHL.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST", // 保存成功后，数据写到对应列表控件上显示。
				"before" : function(data) {
					console.info(data);
				},
				"success":function(data,tip){
					console.info('after');
					defineHBHL.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w06",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	"HBHL01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w06",
		"cds-field" : "LIST.HBHL01",
		"format" : {}
	},
	//外币币种
	"HBMC":{
		"jlid": "JLSelect",
		"sqlid": "PUBCX.BZ",
		"placeholder" : "请选择币种" ,
	    "resource": "scmform",
		"cds": "CDS",
		"cds-field": "LIST.HBMC",
	},
	//本币币种
	"HBBM":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w12",
		"cds-field" : "LIST.HBBM",
		"format" : {},
		"readonly":true
	},
	//本币币种代码
	"HBBM01":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w12",
		"cds-field" : "LIST.HBBM01",
		"format" : {}
	},
	"HBHL" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w12",
		"placeholder" : "请输入汇率" ,
		"cds-field" : "LIST.HBHL",
		"format" : {
			"null": false,
			"number": true
		},
		"listener": {
	        "blur":function(data){ 
	        	debugger;
	        	
	        	var arr = new Array();
	        	arr = data.split(" ");
	        	if(arr.length != 1){
	        		JL.tip("输入不能有空格", "info");
	        		defineHBHL.getPluginObj("HBHL").setData(null);
	        		return true;
	        	}
	            if(isNaN(data)||data*1<=0)
	            {
	            	JL.tip("必须为数字且为正数", "info");
	            	defineHBHL.getPluginObj("HBHL").setData(null);
	            	return true;
	            }
	            var decimalIndex=data.indexOf('.');     
	            if(decimalIndex=='-1')
	            { 
	            	return false;
	            }
	            else{     
	            	var decimalPart=data.substring(decimalIndex+1,data.length);   
	            	if(decimalPart.length>8)
	            	{
	            		JL.tip("不能超过小数点8位", "info");
		            	defineHBHL.getPluginObj("HBHL").setData(null);
		            	return true;
	            	}
	            	else
	            	{     
	            		return false;
	            	}
	            }     
	        } 
		}
	},
	"GSXX":{
		"jlid": "JLSelect",
		"sqlid": "PUBCX.GSXX",
	    "resource": "scmform",
		"cds": "CDS",
		"readonly": false,
		"param": {"GSXX01":userInfo.PCRM_GSXX01},//接口传递参数
		"placeholder" : "请选择公司" ,
		"cds-field": "LIST.GSXX",
		"listener": {
	        "change":function(data){
	        	debugger;
	        	var GSXX01=data.key;
	        	if(!JL.isNull(GSXX01))
	        	{
		        	var resultData = defineHBHL.getSqlResult({"GSXX01":GSXX01}, "GS", "GSBZ", "scm/pub/search");
		        	resultData=resultData.data;
		        	resultData=resultData[0];
		        	defineHBHL.getPluginObj("HBBM").setData(resultData["BBBZ02"]);
		        	defineHBHL.getPluginObj("HBBM01").setData(resultData["BBBZ01"]);
	        	}
	        }
	   }
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"mode": "edit",
		"buttons" : {
			"jlNew":{}
		},
		"title" : [
		    {"id":"GSXX", "name":"公司账套", "width":"w03"},
	    	{"id":"HBMC", "name":"外币", "width":"w02"},
	    	{"id":"HBBM", "name":"本币", "width":"w02"},
	    	{"id":"HBHL", "name":"汇率", "width":"w03"},
	    	{"id":"CZ", "name":"操作", "width":"w01"}
			    ],
		"header" : [
		    {"id":"GSXX", "title":"公司名称", "groupid":"GSXX", "groupcss":"w03","editor":"text"},  
		    {"id":"HBMC", "title":"外币", "groupid":"HBMC", "groupcss":"w02", "editor":"text"},
		    {"id":"HBBM", "title":"本币", "groupid":"HBBM", "groupcss":"w02", "editor":"text"},	
		    {"id":"HBHL", "title":"汇率", "groupid":"HBHL", "groupcss":"w03", "editor":"text"}, 
		    {"id":"edit","groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		    	"config" : {
		    		"readonly": ["GSXX","HBMC"]
		        },
		        "listener": {
			    	"click":function(data){//参数data为点击的值，是个json对象
			    	
			    	}
		        }
		    }, 
		    {"id":"delete", "groupid":"CZ", "rowindex":1, "editor":"JLCancelDelete",
		    	"listener":{
               		"delete": function(thisPlugin, rowIndex, obj){
               			var data = thisPlugin.getData(rowIndex);
               			JL.confirm("确认删除?", function(){ 
               				  var selectedIndex = thisPlugin.getSelectedIndex();
             		          JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineHBHL.initField);
               			});
               		}
             	}
            }
		]
	}
});

defineHBHL.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineHBHL.query();
	}
}]);

defineHBHL.setAfterInit(function() {
	defineHBHL.query();
});


defineHBHL.query = function(){
	debugger;
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	
	var query={};
	var search = defineHBHL.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["CXTJ"] = search;
	}
	query["S_VALUE"] = "D1";
	query["GSXX01"] = userInfo.PCRM_GSXX01;
	
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineHBHL.getSqlResult(query, "MONGO_HBHL", "SCM_HBHL1", "admin/scm/jcdy/search");
	        
	    	defineHBHL.getPluginObj("GSXX").config.options = {};
			defineHBHL.getPluginObj('GSXX').config.param = {"CZY14":"1"};
			defineHBHL.getPluginObj('GSXX').init();
	    }else if (data.CZY14==2){
	    	var resultData = defineHBHL.getSqlResult(query, "MONGO_HBHL", "SCM_HBHL2", "admin/scm/jcdy/search");
	    	
	    	defineHBHL.getPluginObj("GSXX").config.options = {};
			defineHBHL.getPluginObj('GSXX').config.param = {};
			defineHBHL.getPluginObj('GSXX').init();
	    }else{
	    	var resultData = defineHBHL.getSqlResult(query, "MONGO_HBHL", "SCM_HBHL", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = defineHBHL.getSqlResult(query, "MONGO_HBHL", "SCM_HBHL", "admin/scm/jcdy/search");
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineHBHL.getPluginObj("LIST").setPaging(resultData.fileName); 
};