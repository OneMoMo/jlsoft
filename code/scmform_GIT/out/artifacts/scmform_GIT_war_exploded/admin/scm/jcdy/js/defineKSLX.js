var defineKSLX= JL.JLForm();


defineKSLX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"cds": "CDS", 
				"success":function(data){
					defineKSLX.query();  
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
	//编码
	"KSBM":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.KSBM",
		"maxlength": 2,
		"placeholder":"请输入编码(数字或字符)",
		"format":{
			"null":false
		}
	},
	//名称
	"KSLXMC":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.KSLXMC",
		"placeholder":"请输入名称",
		"format":{
			"null":false
		}
	},
	//上级编码
	"SJBM":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.SJBM",
		"readonly" : true,
		"format":{}
	},
	//当前级别
	"DQJB":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.DQJB",
		"readonly": true
	},
	"KSSX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择类型",
		"default": "0",
		"options": {"0":"供应商","1":"客户"},
		"cds" : "CDS",
		"cds-field": "LIST.KSSX"
	},
	"KSMJBJ" : {
	    "jlid": "JLCheckbox",
		"cds" : "CDS",
		"cds-field": "LIST.KSMJBJ",
		//"options": {"1":"末级","0":"非末级"}
		"options": {"1":"末级"}
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
		"cds" : "CDS",
		"parent": "SJBM",//上级节点
		"current": "KSBM",//编码
		"level": "DQJB",//级别
		"final": {"id":"MJBJ", "key": "1"},//末级标记
		"paging": "more",
		"buttons": {
			"jlNew":{}
		},
		"title" : [
		           {"id":"TREE", "name":"编码/名称", "width":"w10"},
				   {"id":"CZ", "name":"操作", "width":"w02 tr pr10"}
        ],
		"header" : [
			 {"id":"KSBM", "groupid":"TREE", "title":"编码"}, 
			 {"id":"KSLXMC", "groupid":"TREE", "title":"名称"},
			 {"id":"jlbh", "title":"jlbh", "hidden":true},
			 {"id":"DQJB", "title":"级别", "hidden":true},	
			 {"id":"SJBM", "title":"上级分类编码", "hidden":true},
			 {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"fr", "editor":"link",
				 "listener":{
					 "click": function(data, rowIndex, obj, plugin){
						 if(data.MJBJ.key != "1"){
							 JL.tip("非末级行业不允许删除","error");
						     return false;
						 }
						 JL.confirm("是否确认删除?", function(){
							 data["S_VALUE"] = "D1";
							 JL.saveForm(defineKSLX, data, "删除", {
								 "disabled": false,
								 "success":function(){
									 defineKSLX.query();  
								 }
							 });
						 });
					 }
				 }
			 },
             {"id":"edit", "groupid":"CZ", "title":"编辑", "css":"fr", "editor":"JLEdit", 
				 "config":{
            		 "readonly": ["KSBM"],
            		 "mapping":{"KSBM": "SJBM"}
            	 },
            	 "listener": {
            		 "click": function(data, rowIndex, obj, thisPlugin){
            			 debugger;
            			 if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.KSBM+"'] dl").length > 0){
            				 defineKSLX.getPluginObj("KSMJBJ").disabled(true);
            			 } else {
            				 defineKSLX.getPluginObj("KSMJBJ").disabled(false);
            			 }
            		 },
            	 }
             },
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "css":"fr", "editor":"JLNewChild",
            	 "config":{
            		 "mapping":{"KSBM":"SJBM"}
            	 }
             }
		]
	}
});

defineKSLX.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineKSLX.query();
	}
}]);

defineKSLX.setAfterInit(function() {
	//加载Grid数据事件
	defineKSLX.query();
});

defineKSLX.query = function(){
	debugger;
	var queryField={};
	var value = defineKSLX.getTab().find("[name='query']").val();
	if(!JL.isNull(value)){
		queryField["query"] = value;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineKSLX.getSqlResult(queryField, "MONGO_KSLX", "SCM_KSLX", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineKSLX.getPluginObj("LIST").setPaging(resultData.fileName); 
};


