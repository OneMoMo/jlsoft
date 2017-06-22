var defineFWPGGZ = JL.JLForm();
//设置控件
defineFWPGGZ.setPlugin({
	"new":{
		"jlid" : "JLToolBar",
		"buttons":{
			"new": {
				"name": "新增",
				"icon": "check",
				"css": "jl_btn btn_blue_or",
				"func": function(){
					defineFWPGGZ.getPluginObj("LIST").addAndModifyRow({"bdbh":"9029","jlbh":0});
				}
			}
		}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"title" : [
	    	{"id":"SHWD", "name":"送货网点名称", "width":"w03"},
	    	{"id":"DQ", "name":"对应地区", "width":"w03"},
	    	{"id":"PP", "name":"品牌", "width":"w02"},
	    	{"id":"FL", "name":"分类", "width":"w02"},
	    	{"id":"CZ", "name":"操作", "width":"w02"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
            {"id":"SHWD01", "hidden":true},
		    {"id":"SHWDMC", "groupid":"SHWD", "title":"送货网点名称", "editor":"text"},
		    {"id":"XZDQ", "groupid":"DQ", "title":"选择地区", "editor":"text",
		    	"config":{
		    	 "jlid": "JLSelectTree",
		   		 "sBillName": "JLInterface",
		   		 "sOperateName": "getDQXX.do"
		    	} 
		    }, 
		    {"id":"PP", "groupid":"PP", "title":"服务品牌", "groupcss":"overflow_inherit", "editor":"plugin", 
		    	"config":{
		    		"jlid": "JLSelect",
		    		"options": {
		    			"0":"无效",
	    				"1":"有效"
		    		}
		    	}
		    }, 
		    {"id":"PP", "groupid":"FL", "title":"服务品类", "groupcss":"overflow_inherit", "editor":"plugin", 
		    	"config":{
		    		"jlid": "JLSelect",
		    		"options": {
		    			"0":"无效",
	    				"1":"有效"
		    		}
		    	}
		    }, 
		    {"id":"update", "groupid":"CZ", "rowindex":1, "editor":"JLUpdateSubmit",
		    	"listener":{/*
		    		"update": function(thisPlugin, rowIndex, obj){
		    			thisPlugin.readonlyEditor(rowIndex, ["SHWDMC"]);
		    		},*/
		    		"submit": function(thisPlugin, rowIndex, obj){
		    			var data = thisPlugin.getData(rowIndex);
		    			var boolean = false;
		    			//alert();
		    			if(data.jlbh>0){
			    			JL.saveForm(defineFWPGGZ, data, "修改" +
			    					"", {
			    				"disabled": false,
			    				"success":function(){
			    					var queryField = {};
			    					queryField["S_VALUE"] = {"$ne":"D1"};
			    					var resultData = defineFWPGGZ.getSqlResult(queryField, "MONGO_SHPGGZ", "CSS_SHPGGZ", "admin/scm/fwgl/search");
			    					console.info(resultData);
			    					defineFWPGGZ.getPluginObj("LIST").setData(resultData.data);  
			    				}
			    			});
		    			}
		    			else
		    			{
		    				JL.saveForm(defineFWPGGZ, data, "保存" +
			    					"", {
			    				"disabled": false,
			    				"success":function(){
			    					var queryField = {};
			    					queryField["S_VALUE"] = {"$ne":"D1"};
			    					var resultData = defineFWPGGZ.getSqlResult(queryField, "MONGO_SHPGGZ", "CSS_SHPGGZ", "admin/scm/fwgl/search");
			    					console.info(resultData);
			    					defineFWPGGZ.getPluginObj("LIST").setData(resultData.data);  
			    				}
			    			});
		    			}
		    			return boolean;
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
               					JL.saveForm(defineFWPGGZ, data, "删除", {
               						"disabled": false,
               						"success":function(){
               							defineFWPGGZ.getPluginObj("LIST").removeRow(rowIndex);
               						}
               					});
               				}); 
               			} else {
               				defineFWPGGZ.getPluginObj("LIST").removeRow(rowIndex);
               			}
               		}
             	}
            },
        ]
	}
});

defineFWPGGZ.setAfterInit(function() {
	//加载Grid数据事件
	var queryField = {};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineFWPGGZ.getSqlResult(queryField, "MONGO_FWPGGZ", "CSS_FWPGGZ", "admin/scm/fwgl/search");
	console.info(resultData);
	defineFWPGGZ.getPluginObj("LIST").setData(resultData.data);  
	defineFWPGGZ.getPluginObj("LIST").setPaging(resultData.fileName); 

});