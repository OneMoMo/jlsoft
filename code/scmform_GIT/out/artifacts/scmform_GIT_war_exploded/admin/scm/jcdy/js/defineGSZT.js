
var defineGSZT = JL.JLForm();

defineGSZT.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds":"CDS",
				"success":function(data,tip){
					defineGSZT.query(); 
				}
			},
			"jlCancelSlide":{}
	 }
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"GSZT01":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.GSZT01",
		"placeholder": "请输入四位长度编码（数字或字符）",
		"format": {
		}
	},
	"GSZTMC":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.GSZTMC",
		"placeholder": "请输入公司名称", 
		"format": {
		}
	},
	"LRRQ":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.LRRQ",
		"placeholder": "请输入公司名称", 
		"format": {
		}
	},
	"SSJT":{
		"jlid" : "JLSelect",
		"sqlid": "GS.JTXX",
		"cds": "CDS",
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"cds-field": "LIST.SSJT",
		"resource": "scmform"
	},
	/*"BBBZ" : {
		"jlid" : "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.BBBZ",
		"sqlid": "RYXX.BZ",
		   "resource": "scmform"
	},*/
	"HBMC" : {
		"jlid" : "JLSelect",
		"sqlid": "RYXX.BZ",
		"cds": "CDS",
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"cds-field": "LIST.HBMC",
		"resource": "scmform"
	},
	"KHYH" : {
		"jlid" : "JLSelect",
		"sqlid": "SKFS.YHXX",
		"cds": "CDS",
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"cds-field": "LIST.KHYH",
		"resource": "scmform"
	},
	"GSDZ":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.GSDZ",
		"format": {
		}
	},
	"SWH":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SWH",
		"format": {
		}
	},
	"YHZH":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.YHZH",
		"format": {
		}
	},
	"SHH":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SHH",
		"format": {
		}
	},
	"MYKPED":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.MYKPED",
		"format": {
		}
	},
	"XYED":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.XYED",
		"format": {
		}
	},
	"CZHM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.CZHM",
		"format": {
		}
	},
	"FRDB":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.FRDB",
		"format": {
		}
	},
	"LXDH":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.LXDH",
		"format": {
		}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"buttons": {
			"jlNew": {}
	    },
		"title" : [
		           {"id":"GSDM", "name":"公司编码", "width":"w01"},
		           {"id":"GSMC", "name":"公司名称", "width":"w03"},
		           {"id":"SSJT", "name":"所属集团", "width":"w02"},
		           {"id":"BBBZ", "name":"本币币种", "width":"w01"},
		           {"id":"LRRQ", "name":"录入日期", "width":"w03"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		],
		"header" : [
		            {"id":"jlbh", "title":"jlbh", "hidden":true},
		            {"id":"HBDM", "title":"货币编码","hidden": true},
		            {"id":"GSZT01", "groupid":"GSDM",  "rowindex" :2, "title":"公司编码"},
		            {"id":"GSZTMC", "groupid":"GSMC",  "rowindex" :2, "title":"公司名称"},
		            {"id":"SSJT",   "groupid":"SSJT",  "rowindex" :2, "title":"所属集团"},
		            {"id":"HBMC",   "groupid":"BBBZ",  "rowindex" :2, "title":"本币币种"},
					{"id":"LRRQ",   "groupid":"LRRQ",  "rowindex" :2, "title":"录入日期"},
					{"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
						"config":{
							"readonly": ["GSZT01","HBMC"],
							"mapping":{},
							 "listener":{
	                     		 "click": function(thisPlugin, rowIndex, obj){
	                     			 console.info('12312');
	                     			
	                     		 }
							 }
						}
					},
					{"id":"delete", "groupid":"CZ", "rowindex":1, "title":"删除", "editor":"link",
                     	 "listener":{
                     		 "click": function(thisPlugin, rowIndex, obj){
                     			JL.confirm("确认删除?", function(){
                     				var selectedIndex = thisPlugin.getSelectedIndex();
                     				JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineGSZT.initField);
                     				defineGSZT.query(); 
               						JL.tip("刪除成功");
                     				/*var ajaxJson = {};
               						ajaxJson["async"] = true;
               						ajaxJson["src"] = "form/saveRecord.do";
               						thisPlugin.S_VALUE="D1";
               						ajaxJson["data"] = {"jyl":true, "json": JSON.stringify(thisPlugin)};
               						
               						ajaxJson["error"] = function(data){
               							if(!JL.isNull(tip)){
               								tip.message.animate({"margin-top":"70px","opacity":"0"}, function(){
               									tip.obj.animate({"opacity":"0"}, function(){
               										tip.obj.remove();
               									});
               								});
               							}
               						};
               						ajaxJson["callback"] = function(resultData){
               							if(!JL.isNull(resultData)){
               								resultData = resultData.data;
               								if(!JL.isNull(tip)){
               									tip.message.animate({"margin-top":"70px","opacity":"0"}, function(){
               										tip.obj.animate({"opacity":"0"}, function(){
               											tip.obj.remove();
               										});
               									});
               								}
               								if(rowIndex.S_VALUE == "D1"){
               									var selected = arr.slice(0,index);
               									if(index <= (arr.length-1) && !JL.isNull(selected)){
               										grid.removeSelected(selected);
               									}
               								}
               							}
               						};
               						JL.ajax(ajaxJson);
               						defineGSZT.query(); 
               						JL.tip("刪除成功");*/
                     			}); 
                     		 }
                     	 }
                    }
		]	
	}

});

defineGSZT.setEvent([{ 
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineGSZT.query();
	}
}]);

defineGSZT.query = function(){
	var queryField = {};
	//queryField["S_VALUE"] = {"$ne":"D1"};
	var a = defineGSZT.getTab().find("[name='GSBM']").val();
	/*
	var c = defineGSZT.getPluginObj("TS_S").getData();
	var d = defineGSZT.getPluginObj("TS_E").getData();*/
	queryField["S_VALUE"] = {"$ne":"D1"};
	if(!JL.isNull(a)){
		queryField["GSBM"] = a;
	}
	/*if(!JL.isNull(c)){
		queryField["TS_S"] = c;
	}
	if(!JL.isNull(d)){
		queryField["TS_E"] = d;
	}*/
	var resultData = defineGSZT.getSqlResult(queryField, "MONGO_GS", "SCM_GSZT", "admin/scm/jcdy/search");

	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	defineGSZT.getPluginObj("LIST").setPaging(resultData.fileName);
	CDS.post();
};

defineGSZT.setAfterInit(function() {
	JL.tab(defineGSZT, {
		"JCXX": "基础信息",
		"QTXX": "其他信息"
	});
	defineGSZT.query();
    //加载Grid数据事件
	/*var queryField = {};
	queryField["S_VALUE"] = {"$ne":"D1"};
	queryField["GSXX01"] = userInfo["PCRM_GSXX01"];
	var resultData = defineGSZT.getSqlResult(queryField, "MONGO_GS", "SCM_GSZT", "admin/scm/jcdy/search");
	console.info(resultData);*/
	/*var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	defineGSZT.getPluginObj("LIST").setPaging(resultData.fileName);
	CDS.post();*/
	
});
