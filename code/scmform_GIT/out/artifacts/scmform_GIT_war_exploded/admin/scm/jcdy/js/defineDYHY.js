
var defineDYHY = JL.JLForm();

defineDYHY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"cds": "CDS", 
				"success":function(data){
					defineDYHY.query();  
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
	//行业编码
	"HYBM":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.HYBM",
		"maxlength": 2,
		"placeholder":"请输入编码(数字或字符)",
		"format":{
			"null":false
		}/*,
		"listener":{	
			"blur":function(value){
				var regex = /^[A-Za-z0-9]+$/; //手机
				if(!regex.test(value)){
					JL.message(defineDYHY.getTab().find("#d_SPFL01"), "只能输入数字或字母", "error");
					return false;
				}
				if(value.length < 2){
					JL.message(defineDYHY.getTab().find("#d_SPFL01"), "请输入两位编码", "error");
					return false;
				}
				
				var XmlData = {};
				XmlData["SPFL01"] = value;
				XmlData["SJBM"] = defineDYHY.getTab().find("[name='SJBM']").val();
				var ajaxJson = {};
				ajaxJson["src"] = "JLInterface/checkSPFL01.do";
				ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
				JL.ajax(ajaxJson);
			}
		}*/
	},
	"DQJB":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.DQJB",
		"readonly": true
	},
	//行业名称
	"HYMC":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.HYMC",
		"placeholder":"请输入行业名称",
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
	/*//选商品大类
	"SPDLBJ":{
		"jlid" : "JLCheckbox",
		"cds" : "CDS",
		"cds-field": "LIST.SPDLBJ",
		"defalut" : "1",
		"options": {"1":"商品大类"}
	},*/
	"HYMJBJ" : {
	    "jlid": "JLCheckbox",
		"cds" : "CDS",
		"cds-field": "LIST.HYMJBJ",
		//"options": {"1":"末级","0":"非末级"}
		"options": {"1":"末级"}
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
		"cds" : "CDS",
		"parent": "SJBM",//上级节点
		"current": "HYBM",//当前节点
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
			 {"id":"HYBM", "groupid":"TREE", "title":"行业编码"}, 
			 {"id":"HYMC", "groupid":"TREE", "title":"行业名称"},
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
							 JL.saveForm(defineDYHY, data, "删除", {
								 "disabled": false,
								 "success":function(){
									 defineDYHY.query();  
								 }
							 });
						 });
					 }
				 }
			 },
             {"id":"edit", "groupid":"CZ", "title":"编辑", "css":"fr", "editor":"JLEdit", 
				 "config":{
            		 "readonly": ["HYBM"],
            		 "mapping":{"HYBM": "SJBM"}
            	 },
            	 "listener": {
            		 "click": function(data, rowIndex, obj, thisPlugin){
            			 if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.HYBM+"'] dl").length > 0){
            				 defineDYHY.getPluginObj("HYMJBJ").disabled(true);
            			 } else {
            				 defineDYHY.getPluginObj("HYMJBJ").disabled(false);
            			 }
            		 },
            	 }
             },
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "css":"fr", "editor":"JLNewChild",
            	 "config":{
            		 "mapping":{"HYBM":"SJBM"}
            	 }
             }
		]
	}
});

defineDYHY.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineDYHY.query();
	}
}]);

defineDYHY.setAfterInit(function() {
	//加载Grid数据事件
	defineDYHY.query();
});

defineDYHY.query = function(){
	var queryField={};
	var value = defineDYHY.getTab().find("[name='query']").val();
	if(!JL.isNull(value)){
		queryField["query"] = value;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineDYHY.getSqlResult(queryField, "MONGO_DYHY", "SCM_DYHY", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineDYHY.getPluginObj("LIST").setPaging(resultData.fileName); 
};


