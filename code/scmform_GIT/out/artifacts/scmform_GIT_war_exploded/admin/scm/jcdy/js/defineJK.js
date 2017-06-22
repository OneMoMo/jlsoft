var defineJK = JL.JLForm();

defineJK.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds":"CDS"
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
	"JKLX01":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.JKLX01",
		"queryConfig": {
			"namespace": "MONGO_JK1",
			"sqlid": "SCM_JK", 
			"init" : {},
			"dir": "admin/scm/jcdy/js", 
			"fieldMapping":{
				"JKLX01":"JKLX01",
				"JKLX02":"JKLX02"
			},
			"listener":{
				"beforecallback" : function(data) {
					console.info(data);
					if (data[0].JKLX01=="infobip"){ 
						defineJK.getTab().find("[name='sxtd']").show();
					}else{
						defineJK.getTab().find("[name='sxtd']").hide();
					}
				}
			}
		}
	},
	"JKSJ04":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.JKSJ04",
		"placeholder": "请输入模版名称", 
		"format": {
		}
	}, 
	"JKSJ03":{ 
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.JKSJ03",
		"options": {"0":"scm","1":"vip","2":"sh","3":"workflow"} 
	},
	"JKSJ05":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.JKSJ05",
		"placeholder": "请输入查询范围字段", 
		"format": {
		}
	},
	"JKSJ06":{
		"jlid": "JLDate",
		"format": "yyyy年mm月dd日 hh:ii:ss", 
		"placeholder" : "请选择日期", 
		"defaultDate": 0,
		"cds": "CDS",
		"cds-field": "LIST.JKSJ06",
		"readonly" : false  
	},
	"JKSJ08":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.JKSJ08",
		"placeholder": "请输入查询范围表", 
		"format": {
		}
	},
	"JKSJ02":{
		"jlid": "JLTextarea",
		"height": "120",
		"cds":"CDS",
		"cds-field":"LIST.JKSJ02"
	},
	"JKSJ01":{
		"jlid": "JLTextarea",
		"height": "120",
		"cds":"CDS",
		"cds-field":"LIST.JKSJ01"
	},
	"JKSJ09":{
		"jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.JKSJ09",
		 "options":{"1":"打开通道"},
		 "listener": {
			 "click":function(data){
			 }
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
		           {"id":"JKSJ04", "name":"模版名称", "width":"w03"},
		           {"id":"JKLX02", "name":"接口类型", "width":"w02"},
		           {"id":"JKSJ03", "name":"数据源", "width":"w02"}, 
		           {"id":"JKSJ06", "name":"查询起始时间戳", "width":"w02"}, 
		           {"id":"CZ", "name":"操作", "width":"w01"}
		],
		"header" : [
		            {"id":"jlbh", "title":"jlbh", "hidden":true}, 
		            {"id":"JKLX01", "title":"JKLX01", "hidden":true}, 
		            {"id":"JKSJ04", "groupid":"JKSJ04",  "rowindex" :1, "title":"模版名称"},
		            {"id":"JKLX02", "groupid":"JKLX02",  "rowindex" :1, "title":"接口类型"},
		            {"id":"JKSJ03",   "groupid":"JKSJ03",  "rowindex" :1, "title":"数据源"},
		            {"id":"JKSJ06",   "groupid":"JKSJ06",  "rowindex" :1, "title":"查询起始时间戳"}, 
					{"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
						"config":{
							"readonly": [],
							"mapping":{},
						}
					},
					{"id":"delete", "groupid":"CZ", "rowindex":1, "title":"删除", "editor":"link",
                     	 "listener":{
                     		 "click": function(thisPlugin, rowIndex, obj){
                     			JL.confirm("确认删除?", function(){
                     				var selectedIndex = thisPlugin.getSelectedIndex();
                     				JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineJK.initField);
                     				defineJK.query(); 
               						JL.tip("刪除成功"); 
                     			}); 
                     		 }
                     	 }
                    }
		]	
	}

});

defineJK.setEvent([{ 
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineJK.query();
	}
}]);

defineJK.query = function(){
	var queryField = {};
	var a = defineJK.getTab().find("[name='qry']").val();
	queryField["S_VALUE"] = {"$ne":"D1"};
	if(!JL.isNull(a)){
		queryField["qry"] = a;
	}

	var resultData = defineJK.getSqlResult(queryField, "MONGO_JK", "FORM_JK", "admin/scm/jcdy/search");

	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	defineJK.getPluginObj("LIST").setPaging(resultData.fileName);
	CDS.post();
};

defineJK.setAfterInit(function() {
	defineJK.query();
});
