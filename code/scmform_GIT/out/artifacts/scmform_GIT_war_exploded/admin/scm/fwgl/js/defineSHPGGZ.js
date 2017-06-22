var defineSHPGGZ = JL.JLForm();
//设置控件
defineSHPGGZ.setPlugin({
	"new":{
		"jlid" : "JLToolBar",
		"buttons":{
			"new": {
				"name": "新增",
				"icon": "check",
				"css": "jl_btn btn_blue_or",
				"func": function(){
					defineSHPGGZ.getPluginObj("LIST").addAndModifyRow({"bdbh":"9028","jlbh":0});
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
	    	{"id":"DQ", "name":"选择地区", "width":"w03"},
	    	{"id":"CK", "name":"选择仓库", "width":"w03"},
	    	{"id":"CZ", "name":"操作", "width":"w03"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
            {"id":"SHWD01", "hidden":true},
		    {"id":"SHWDMC", "groupid":"SHWD", "title":"送货网点名称", "editor":"text"},
		    {"id":"XZDQ", "groupid":"DQ", "title":"对应地区","groupcss":"overflow_inherit",
		      "editor":"plugin",
		    	  "config":{
		    	     "jlid": "JLSelectTree",
		   		     "sBillName": "JLInterface",
		   		     "sOperateName": "getDQXX.do"
		    	} 
		    }, 
		    {"id":"XZCK", "groupid":"CK", "title":"对应仓库", "groupcss":"overflow_inherit", "editor":"plugin", 
		    	"config":{
		    		 "jlid": "JLSelect",
		 			"sqlid": "PUBCX.CK",
		 		    "resource": "scmform",

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
			    			JL.saveForm(defineSHPGGZ, data, "修改" +
			    					"", {
			    				"disabled": false,
			    				"success":function(){
			    					var queryField = {};
			    					queryField["S_VALUE"] = {"$ne":"D1"};
			    					var resultData = defineSHPGGZ.getSqlResult(queryField, "MONGO_SHPGGZ", "CSS_SHPGGZ", "admin/scm/fwgl/search");
			    					console.info(resultData);
			    					defineSHPGGZ.getPluginObj("LIST").setData(resultData.data);  
			    				}
			    			});
		    			}
		    			else
		    			{
		    				JL.saveForm(defineSHPGGZ, data, "保存" +
			    					"", {
			    				"disabled": false,
			    				"success":function(){
			    					var queryField = {};
			    					queryField["S_VALUE"] = {"$ne":"D1"};
			    					var resultData = defineSHPGGZ.getSqlResult(queryField, "MONGO_SHPGGZ", "CSS_SHPGGZ", "admin/scm/fwgl/search");
			    					console.info(resultData);
			    					defineSHPGGZ.getPluginObj("LIST").setData(resultData.data);  
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
               					JL.saveForm(defineSHPGGZ, data, "删除", {
               						"disabled": false,
               						"success":function(){
               							defineSHPGGZ.getPluginObj("LIST").removeRow(rowIndex);
               						}
               					});
               				}); 
               			} else {
               				defineSHPGGZ.getPluginObj("LIST").removeRow(rowIndex);
               			}
               		}
             	}
            },
        ]
	}
});

defineSHPGGZ.setAfterInit(function() {
	//加载Grid数据事件
	var queryField = {};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineSHPGGZ.getSqlResult(queryField, "MONGO_SHPGGZ", "CSS_SHPGGZ", "admin/scm/fwgl/search");
	console.info(resultData);
	defineSHPGGZ.getPluginObj("LIST").setData(resultData.data);  
	defineSHPGGZ.getPluginObj("LIST").setPaging(resultData.fileName); 

});