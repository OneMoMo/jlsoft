var defineSPFL = JL.JLForm();

defineSPFL.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"cds": "CDS", 
				"success":function(data){
					defineSPFL.query();  
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
	"SPFL01":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.SPFL01",
		"maxlength": 2,
		"placeholder":"请输入两位长度编码(数字或字符)",
		"format":{
			"null":false
		},
		"listener":{	
			"blur":function(value){
				var regex = /^[A-Za-z0-9]+$/; //手机
				if(!regex.test(value)){
					JL.message(defineSPFL.getTab().find("#d_SPFL01"), "只能输入数字或字母", "error");
					return false;
				}
				if(value.length < 2){
					JL.message(defineSPFL.getTab().find("#d_SPFL01"), "请输入两位编码", "error");
					return false;
				}
				
				var XmlData = {};
				XmlData["SPFL01"] = value;
				XmlData["SJFLBH"] = defineSPFL.getTab().find("[name='SJFLBH']").val();
				var ajaxJson = {};
				ajaxJson["src"] = "JLInterface/checkSPFL01.do";
				ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
				JL.ajax(ajaxJson);
			}
		}
	},
	"FL03":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.FL03",
		"readonly": true
	},
	"SPFLMC":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.SPFLMC",
		"placeholder":"请输入分类名称",
		"format":{
			"null":false
		}
	},
	"SJFLBH":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.SJFLBH",
		"readonly" : true,
		"format":{}
	},
	//选商品大类
	"SPDLBJ":{
		"jlid" : "JLCheckbox",
		"cds" : "CDS",
		"cds-field": "LIST.SPDLBJ",
		"defalut" : "1",
		"options": {"1":"商品大类"}
	},
	"SPMJBJ" : {
	    "jlid": "JLCheckbox",
		"cds" : "CDS",
		"cds-field": "LIST.SPMJBJ",
		//"options": {"1":"末级","0":"非末级"}
		"options": {"1":"末级"}
	},
	"KSSJ" : {
		 "jlid": "JLDate"
	},
	"JSSJ" : {
		 "jlid": "JLDate"
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
		"cds" : "CDS",
		"parent": "SJFLBH",//上级节点
		"current": "SPFL01",//当前节点
		"level": "FL03",//级别
		"final": {"id":"MJBJ", "key": "1"},//末级标记
		"paging": "more",
		"buttons": {
			"jlNew":{}
		},
		"title" : [
		           {"id":"TREE", "name":"代码/名称", "width":"w10"},
				   {"id":"CZ", "name":"操作", "width":"w02 tr pr10"}
        ],
		"header" : [
			 {"id":"SPFL01", "groupid":"TREE", "title":"分类编号"}, 
			 {"id":"SPFLMC", "groupid":"TREE", "title":"分类名称"},
			 {"id":"FL03", "title":"级别", "hidden":true},	
			 {"id":"SPDLBJ", "title":"商品大类", "hidden":true}, 
			 {"id":"SJFLBH", "title":"上级分类编码", "hidden":true},	
			 {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"fr", "editor":"link",
				 "listener":{
					 "click": function(data, rowIndex, obj, plugin){
						 if(data.MJBJ.key == "0"){
							 JL.tip("非末级分类不允许删除","error");
						     return false;
						 }
						 JL.confirm("是否确认删除?", function(){
							 data["S_VALUE"] = "D1";
							 JL.saveForm(defineSPFL, data, "删除", {
								 "disabled": false,
								 "success":function(){
									 defineSPFL.query();  
								 }
							 });
						 });
					 }
				 }
			 },
             {"id":"edit", "groupid":"CZ", "title":"编辑", "css":"fr", "editor":"JLEdit", 
				 "config":{
            		 "readonly": ["SPFL01"],
            		 "mapping":{"SPFL01": "SJFLBH"}
            	 },
            	 "listener": {
            		 "click": function(data, rowIndex, obj, thisPlugin){
            			 if(thisPlugin.obj.find("div.jl_tree_02[data-id='"+data.SPFL01+"'] dl").length > 0){
            				 defineSPFL.getPluginObj("SPMJBJ").disabled(true);
            			 } else {
            				 defineSPFL.getPluginObj("SPMJBJ").disabled(false);
            			 }
            		 },
            	 }
             },
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "css":"fr", "editor":"JLNewChild",
            	 "config":{
            		 "mapping":{"SPFL01":"SJFLBH"}
            	 }
             }
		]
	}
});

defineSPFL.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineSPFL.query();
	}
}])

defineSPFL.setAfterInit(function() {
	//加载Grid数据事件
	defineSPFL.query();
});

defineSPFL.query = function(){
	var queryField={};
	var value = defineSPFL.getTab().find("[name='query']").val();
	if(!JL.isNull(value)){
		queryField["query"] = value;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineSPFL.getSqlResult(queryField, "MONGO_SPFL", "SCM_SPFL", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineSPFL.getPluginObj("LIST").setPaging(resultData.fileName); 
}


