var defineSPSX = JL.JLForm();
defineSPSX.setPlugin({
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
					defineSPSX.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh":{
		"jlid": "JLInput"
	},
	"SPSX01" : {
		"jlid" : "JLInput",
		"readonly": true
	},
	"SPSXMC":{
		"jlid": "JLInput"
	},
	"XTBJ" : {
		"jlid" : "JLInput"
	},
	"YXBJ" : {
		"jlid" : "JLInput"
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"rowclass": "pl10",
		"buttons" : {
			"jlNew":{},
		},
		"title" : [
	    	{"id":"DM", "name":"属性编码", "width":"w02"},
	    	{"id":"MC", "name":"属性名称", "width":"w07"},
	    	{"id":"XT", "name":"系统标记", "width":"w01 pr0 tc"},
	    	{"id":"YX", "name":"有效标记", "width":"w01 pr0 tc"},
	    	{"id":"CZ", "name":"操作", "width":"w01 pr0 tc"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"SPSX01", "groupid":"DM", "title":"属性编码"},
		    {"id":"SPSXMC", "groupid":"MC", "title":"属性名称", "editor":"text"}, 
		    {"id":"XTBJ", "groupid":"XT", "title":"系统标记", "groupcss":"overflow_inherit", "editor":"plugin", "css":"w12 pl35 ", 
		    	"config":{
		    		"jlid": "JLCheckbox",
		    		"default": "1",
		    		"options": {
	    				"1":""
		    		}
		    	}
		    }, 
		    {"id":"YXBJ", "groupid":"YX", "title":"有效标记", "groupcss":"overflow_inherit", "editor":"plugin", "css":"w12 pl35 ",
		    	"config":{
		    		"jlid": "JLCheckbox",
		    		"default": "1",
		    		"options": {
	    				"1":""
		    		}
		    	}
		    }, 
		    {"id":"update", "groupid":"CZ", "rowindex":1, "editor":"JLUpdateSubmit",
		    	"listener":{
		    		"update": function(thisPlugin, rowIndex, obj){
		    			thisPlugin.readonlyEditor(rowIndex, ["SPSX01","XTBJ"]);
		    		},
		    		"submit": function(thisPlugin, rowIndex, obj){
		    			var data = thisPlugin.getData(rowIndex);
		    			var type = data.jlbh > 0? "修改": "保存";
		    			JL.saveForm(defineSPSX, data, type, {
		    				"disabled": false,
		    				"success":function(){
		    				}
		    			});
		    			return true;
		    		}
		    	}
		    },
		    {"id":"delete", "groupid":"CZ", "rowindex":1, "editor":"JLCancelDelete",
		    	"listener":{
               		"delete": function(thisPlugin, rowIndex, obj){
               			var data = thisPlugin.getData(rowIndex);
               			if(!JL.isNull(data.jlbh) && data.jlbh > 0){
               				JL.confirm("确认删除?", function(){ 
               					data["S_VALUE"] = "D1";
               					JL.saveForm(defineSPSX, data, "删除", {
               						"disabled": false,
               						"success":function(){
               							defineSPSX.getPluginObj("LIST").removeRow(rowIndex);
               						}
               					});
               				}); 
               			} else {
               				defineSPSX.getPluginObj("LIST").removeRow(rowIndex);
               			}
               		}
             	}
            },
        ],
        "listener": {
        	"loadRow": function(thisPlugin, data, rowIndex, dl){
        		console.info(data.XTBJ);
        		if(data.XTBJ != 0){
        			dl.find("dd[groupid='CZ']").hide();
        		}
        	}
        }
	}
});

defineSPSX.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineSPSX.query();
	}
}])

defineSPSX.setAfterInit(function() {
	defineSPSX.query();
});


defineSPSX.query = function() {
	var query = {};
	query["S_VALUE"] = {"$ne": "D1"};
	var search = defineSPSX.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	var LIST = [];
	var resultData = JL.ajax({
		"src": pubJson.getURL("FormUrl") + "/DefineSPSX/getSystemSPSX.do",
		"data": {"XmlData":JSON.stringify(query)},
	});
	if(!JL.isNull(resultData) && !JL.isNull(resultData.data) && !JL.isNull(resultData.data.returnList)){
		$.merge(LIST, resultData.data.returnList);
	}
	
	var resultData = defineSPSX.getSqlResult(query, "MONGO_SPSX", "SCM_SPSX", "admin/scm/jcdy/search");
	console.info('defineSPSX.query');
	if(!JL.isNull(resultData) && !JL.isNull(resultData.data)){
		$.merge(LIST, resultData.data);
	}
	
	defineSPSX.getPluginObj("LIST").setData(LIST); 
	defineSPSX.getPluginObj("LIST").setPaging(resultData.fileName); 
};