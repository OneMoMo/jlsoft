var defineHYLX = JL.JLForm();
//设置控件
defineHYLX.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST", // 保存成功后，数据写到对应列表控件上显示。
				"before" : function(data) {
					console.info(data);
				},
				"success":function(){
					defineHYLX.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"GSXX01" : {
		"jlid" : "JLInput",
		"css" : "w06",
		"cds-field" : "LIST.GSXX01",
		"format" : {}
	},
	"HYLX01" : {
		"jlid" : "JLInput",
		"css" : "w06",
		"cds-field" : "LIST.HYLX01",
		"format" : {}
	},
	"HYLXMC":{
		"jlid": "JLInput",
		"css": "w06",
		"cds-field": "LIST.HYLXMC",
		"format": {
		}
	},
	"YXBJ" : { 
		"jlid": "JLRadio",
		"cds-field": "LIST.YXBJ",
		"default" : "1",
		"options": {"1":"有效","2":"无效"},
		"listener": { 
	    }
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"buttons" : {
			"jlNew":{}
		},
		"title" : [
	    	{"id":"BM", "name":"会员类型编码", "width":"w02"},
	    	{"id":"MC", "name":"会员类型名称", "width":"w07"},
	    	{"id":"BJ", "name":"有效", "width":"w02"},
	    	{"id":"CZ", "name":"操作", "width":"w01"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"HYLX01", "groupid":"BM", "title":"会员类型编码", "editor":"text"},
		    {"id":"HYLXMC", "groupid":"MC", "title":"会员类型名称", "editor":"text"}, 
		    {"id":"YXBJ", "groupid":"BJ", "title":"有效", "groupcss":"overflow_inherit", "editor":"plugin", 
		    	"config":{
		    		"jlid": "JLSelect",
		    		"options": {
		    			"0":"无效",
	    				"1":"有效"
		    		}
		    	}
		    }, 
		    {"id":"update", "groupid":"CZ", "rowindex":1, "editor":"JLUpdateSubmit",
		    	"listener":{
		    		"update": function(thisPlugin, rowIndex, obj){
		    			thisPlugin.readonlyEditor(rowIndex, ["HYLX01"]);
		    		},
		    		"submit": function(thisPlugin, rowIndex, obj){
		    			var data = thisPlugin.getData(rowIndex);
		    			var flag = false;
		    			if(data.jlbh>0){
			    			JL.saveForm(defineHYLX, data, "修改", {
			    				"disabled": false,
			    				"success":function(){
			    					defineHYLX.query();
		    					}
			    			});
		    			}else{
		    				JL.saveForm(defineHYLX, data, "保存", {
			    				"disabled": false,
			    				"success":function(){
			    					defineHYLX.query();
			    				}
			    			});
		    			}
		    			return flag;
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
               					JL.saveForm(defineHYLX, data, "删除", {
               						"disabled": false,
               						"success":function(){
               							defineHYLX.getPluginObj("LIST").removeRow(rowIndex);
               						}
               					});
               				}); 
               			}else{
               				defineHYLX.getPluginObj("LIST").removeRow(rowIndex);
               			}
               		}
             	}
            }
        ]
	}
});

defineHYLX.setAfterInit(function() {
	defineHYLX.query();
});

defineHYLX.define({
	"query":function(){
		var queryField = {};
		queryField["S_VALUE"] = {"$ne":"D1"};
		var resultData = defineHYLX.getSqlResult(queryField, "MONGO_HYXX", "VIP_HYLX", "admin/scm/hyxx/search");
		console.info(resultData);
		defineHYLX.getPluginObj("LIST").setData(resultData.data);
		defineHYLX.getPluginObj("LIST").setPaging(resultData.fileName);
	}
});