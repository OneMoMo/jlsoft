var makeZPXX = JL.JLForm();
//设置控件
makeZPXX.setPlugin({
	"new":{
		"jlid" : "JLToolBar",
		"buttons":{
			"new": {
				"name": "新增",
				"icon": "check",
				"css": "jl_btn btn_blue_or",
				"func": function(){
					makeZPXX.getPluginObj("LIST").addAndModifyRow({"bdbh":"9021","jlbh":0,"YXBJ":{"key":"0","value":"有效"},"GSXX01":userInfo["PCRM_GSXX01"]/*,"ZPMC":"ZPMC","WKPSL":"WKPSL","ZPDJ":"ZPDJ","DJRMC":"DJRMC","DJRQ":"DJRQ","CZ":"CZ"*/});
			/*		makeZPXX.getTab().find("input[name='DJRQ']:not(:disabled)").val(JL.formatDate(0,2));*/
					makeZPXX.getPluginObj("LIST").setCell(JL.formatDate(0,2), makeZPXX.getPluginObj("LIST").getData().length-1, "DJRQ");
					makeZPXX.getPluginObj("LIST").setCell(userInfo["PCRM_CZY03"], makeZPXX.getPluginObj("LIST").getData().length-1, "DJRMC");
					
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
	    	{"id":"ZPXX01", "name":"赠品编码", "width":"w01"},
	    	{"id":"ZPMC", "name":"赠品名称", "width":"w02"},
	    	{"id":"WKPSL", "name":"赠品规格", "width":"w01"},
	    	{"id":"ZPDJ", "name":"赠品单价", "width":"w01"},
	    	{"id":"YXBJ", "name":"有效", "width":"w02"},
	    	{"id":"DJRMC", "name":"登记人", "width":"w02"},
	    	{"id":"DJRQ", "name":"登记日期", "width":"w02"},
	    	{"id":"CZ", "name":"操作", "width":"w01"}
	    ],
	    "header" : [
            {"id":"DJR_RYXX01", "name":"登记人编码", "hidden":true},
            {"id":"GSXX01", "name":"公司编码", "hidden":true},
            {"id":"GSMC", "name":"公司名称", "hidden":true},
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"ZPXX01", "groupid":"ZPXX01", "title":"赠品编码", "editor":"text"},
		    {"id":"ZPMC", "groupid":"ZPMC", "title":"赠品名称", "editor":"text"},
		    {"id":"WKPSL", "groupid":"WKPSL", "title":"赠品规格", "editor":"text"},
		    {"id":"ZPDJ", "groupid":"ZPDJ", "title":"赠品单价", "editor":"text"},
		    {"id":"DJRMC", "groupid":"DJRMC", "title":"登记人", "editor":"text"},
		    {"id":"DJRQ", "groupid":"DJRQ", "title":"登记日期", "editor":"text"},

		    {"id":"YXBJ", "groupid":"YXBJ", "title":"有效", "groupcss":"overflow_inherit", "editor":"plugin",
		    	"config":{
		    		"jlid": "JLSelect",
		    		"options": {
		    			"1":"无效",
	    				"0":"有效"
		    		}
		    	}
		    },
		    
		    {"id":"update", "groupid":"CZ", "rowindex":1, "editor":"JLUpdateSubmit",
		    	"listener":{
		    		"update": function(thisPlugin, rowIndex, obj){
		    			//thisPlugin.readonlyEditor(rowIndex, ["ZPXX01"]);
		    			thisPlugin.readonlyEditor(rowIndex, ["DJRMC","ZPXX01","DJRQ"]);
		    			//thisPlugin.readonlyEditor(rowIndex, ["DJRQ"]);
		    		},
		    		"submit": function(thisPlugin, rowIndex, obj){
		    			var data = thisPlugin.getData(rowIndex);
		    			var boolean = false;
		    			//alert();
		    			if(data.jlbh>0){
			    			JL.saveForm(makeZPXX, data, "保存" +
			    					"", {
			    				"disabled": false,
			    				"success":function(){
			    					var queryField = {};
			    					queryField["S_VALUE"] = {"$ne":"D1"};
			    					var resultData = makeZPXX.getSqlResult(queryField, "MONGO_ZPXX", "SCM_ZPXX", "admin/scm/zpxx/search");
			    					console.info(resultData);
			    					makeZPXX.getPluginObj("LIST").setData(resultData.data);
			    					

			    				}
			    			});
		    			}
		    			else
		    			{
		    				JL.saveForm(makeZPXX, data, "保存" +
			    					"", {
			    				"disabled": false,
			    				"success":function(){
			    					var queryField = {};
			    					queryField["S_VALUE"] = {"$ne":"D1"};
			    					var resultData = makeZPXX.getSqlResult(queryField, "MONGO_ZPXX", "SCM_ZPXX", "admin/scm/zpxx/search");
			    					console.info(resultData);
			    					makeZPXX.getPluginObj("LIST").setData(resultData.data);
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
               					JL.saveForm(makeZPXX, data, "删除", {
               						"disabled": false,
               						"success":function(){
               							makeZPXX.getPluginObj("LIST").removeRow(rowIndex);
               						}
               					});
               				});
               			} else {
               				makeZPXX.getPluginObj("LIST").removeRow(rowIndex);
               			}
               		}
             	}
            },
        ]
	}
});
makeZPXX.setAfterInit(function() {
	//加载Grid数据事件
	var queryField = {};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = makeZPXX.getSqlResult(queryField, "MONGO_ZPXX", "SCM_ZPXX", "admin/scm/zpxx/search");
	console.info(resultData);
	makeZPXX.getPluginObj("LIST").setData(resultData.data);
	makeZPXX.getPluginObj("LIST").setPaging(resultData.fileName);
	makeZPXX.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
});
/*makeZPXX.setAfterInit(function() {
	makeZPXX.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	makeZPXX.getTab().find("input[name='ZPDJ']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	makeZPXX.getTab().find("input[name='DJR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	makeZPXX.getTab().find("input[name='DJRQ']:not(:disabled)").val(JL.formatDate(0,2));
	
	makeZPXX.getPluginObj("LIST").setCell("PCRM_CZY03", x, id);*/


/*});*/