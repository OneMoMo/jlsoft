var defineZD = JL.JLForm();
defineZD.setPlugin({
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
					defineZD.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	"ID":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.ID",
		"format": {
		}
	},
	"NAME":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.NAME",
		"format": {
		}
	},
	"BZ":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.BZ",
		"format": {
		}
	},
	"ZDLX":{
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.ZDLX",
		"default": "select",
		"options": {
			"select": "下拉结构",
			"tree": "树形结构"
		}, 
		"listener": {
			"change": function(data){
				debugger;
				if(data.key == "select"){
					defineZD.find("#d_ZDYITEM").closest("li").show();
					defineZD.find("#d_TREEITEM").closest("li").hide();
				}else if(data.key == "tree"){
					defineZD.find("#d_ZDYITEM").closest("li").hide();
					defineZD.find("#d_TREEITEM").closest("li").show();
				}
			}
		}
	},
	"ZDYITEM" : {
		"jlid" : "JLGrid",
		"buttons": [1,2],
		"cds": "CDS",
		"cds-field": "LIST.ZDYITEM",
	    "headers" : [
		    {"id":"NRBM", "name":"内容编码", "width": 100, 
		    	"editor":{
		    		"type": "text",
		    		"disabled": false
		    	}
		    },
		    {"id":"NRMS", "name":"内容描述", "width": 100, 
		    	"editor":{
		    		"type": "text",
		    		"disabled": false
		    	}
		    },
		    {"id":"BZ", "name":"备注", "width": 250, 
		    	"editor":{
		    		"type": "text",
		    		"disabled": false
		    	}
		    }
		],
	},
	"TREEITEM" : {
		"jlid" : "JLTreeGrid",
		"cds": "CDS",
		"cds-field": "LIST.TREEITEM",
		"parent": "SJNRBM",//上级节点
		"current": "NRBM",//当前节点
		"final": {"id":"MJBJ", "key": "1"},//末级标记
		"mode": "edit",
		"card": false,
		"buttons": {
			"new": {
				"name": "新增",
				"func": function(){
					var TREEITEM = defineZD.getPluginObj("TREEITEM");
					var save = TREEITEM.obj.find("[data-id='save']");
					
					if(save.is(":not(:hidden)")){
						JL.confirm("是否保存新增内容", function(){
							var NRBM = TREEITEM.obj.find("[data-id='NRBM']");
							if(NRBM.is(":not(:hidden)") && JL.isNull(NRBM.val())){
								JL.tip("请输入编码");
								return false;
							}
							save.click();
							TREEITEM.addRow({}).find("[data-id='update']").click();
						});
					} else {
						TREEITEM.addRow({}).find("[data-id='update']").click();
					}
				}
			}
		},
		"title" : [
	    	{"id":"DM", "name":"内容编码", "width":"w03"},
	    	{"id":"MC", "name":"内容名称", "width":"w03"},
	    	{"id":"BZ", "name":"备注", "width":"w03"},
	    	{"id":"MJ", "name":"末级", "width":"w01"},
	    	{"id":"CZ", "name":"操作", "width":"w02 tc pr15"}
	    ],
		"header" : [
	        {"id":"NRBM", "title":"内容编码", "groupid": "DM", "css":"w06",
	        	 "editor": "text" 
	        },
	        {"id":"NRMS", "title":"内容描述", "groupid": "MC", "css":"w10",
	        	"editor": "text" 
	        },
	        {"id":"BZ", "title":"备注", "groupid": "BZ", "css":"w10",
	        	"editor": "text" 
	        },
	        {"id":"MJ", "title":"末级", "groupid": "MJ",
	        	"editor": "plugin", 
	        	"config":{
	        		"jlid": "JLCheckbox",
        			"options":{
        				"1": ""
        			}
	        	} 
	        },
	        {"id":"cancel", "groupid":"CZ",  "rowindex":1,"title":"取消", "css":"fr hide", "editor":"link",
	        	"listener":{
	        		"click": function(data, rowIndex, obj, thisPlugin){
	        			obj.siblings("[data-id='save']").addBack().hide();
		    			obj.siblings("[data-id='delete'],[data-id='new'],[data-id='update']").show();
		    			thisPlugin.data[rowIndex] = thisPlugin.updateData[rowIndex];
		    			thisPlugin.hideRowEditor(rowIndex, true);
	        		}
	        	}
	        },
	        {"id":"save", "groupid":"CZ",  "rowindex":1,"title":"保存", "css":"fr hide", "editor":"link",
	        	"listener":{
	        		"click": function(data, rowIndex, obj, thisPlugin){
	        			if(JL.isNull(data.NRBM)){
							JL.tip("请输入编码");
							return false;
						}
	        			
	        			var datas = thisPlugin.getData();
	        			for(var i=0; i<datas.length; i++){
	        				if(datas[i].NRBM == data.NRBM && i != rowIndex){
	        					JL.tip("输入编码重复");
	        					return false;
	        				}
	        			}
	        			
	        			obj.siblings("[data-id='cancel']").addBack().hide();
		    			obj.siblings("[data-id='delete'],[data-id='new'],[data-id='update']").show();
		    			thisPlugin.hideRowEditor(rowIndex, true);
		    			if(JL.isNull(data.MJBJ)){
		    				thisPlugin.setData(thisPlugin.getData());
		    			}
	        		}
	        	}
	        },
	        {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"fr", "editor":"link",
				"listener":{
					"click": function(data, rowIndex, obj, thisPlugin){
						thisPlugin.removeRow(rowIndex);
					}
				}
			},
		    {"id":"update", "title":"编辑", "groupid":"CZ", "css":"fr", "rowindex":1, "editor":"link",
		    	"listener":{
		    		"click": function(data, rowIndex, obj, thisPlugin){
		    			thisPlugin.hideRowEditor(rowIndex, false);
						thisPlugin.updateData[rowIndex] = $.extend({}, data);
		    			obj.siblings("[data-id='save'],[data-id='cancel']").show();
		    			obj.siblings("[data-id='delete'],[data-id='new']").addBack().hide();
		    		}
		    	}
		    },
            {"id":"new", "groupid":"CZ", "title":"新增子级", "css":"fr", "editor":"link",
	          	"listener":{
	          		"click": function(data, rowIndex, obj, thisPlugin){
	          			if(JL.isNull(data.NRBM)){
	          				JL.tip("请填写内容编码");
	          				return false;
	          			}
	          			debugger;
	          			var childRow = thisPlugin.addRow({
	          				"SJNRBM": data.NRBM
	          			});
	          			childRow.find("[data-id='update']").click();
	          		}
	          	}
            }
        ],
        "listener": {
        	"loadRow": function(thisPlugin, data, rowIndex, dl){
        		thisPlugin.hideRowEditor(rowIndex, true);
        		if(!JL.isNull(data.MJ)){
        			dl.find("[data-id='new']").hide();
    			}
        	}
        }
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"rowclass": "pl10",
		"buttons" : {
			"jlNew":{}
		},
		"title" : [
	    	{"id":"DM", "name":"字段编码", "width":"w02"},
	    	{"id":"MC", "name":"字段名称", "width":"w09"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tc pr15"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"ID", "groupid":"DM", "title":"字段编码", "css":""},
		    {"id":"NAME", "groupid":"MC", "title":"字段名称", "css":""},
		    {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"fr", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineZD, data, "删除", {
								"disabled": false,
								"success":function(){
									thisPlugin.removeRow(rowIndex);
								}
							});
						});
					}
				}
			},
		    {"id":"update", "title":"编辑", "groupid":"CZ", "groupcss":"fr", "rowindex":1, "editor":"JLEdit",
		    	"config":{
		    		"readonly": ["ID","ZDLX"]
		    	},
		    	"listener":{
		    		"click": function(thisPlugin, rowIndex, obj){
					var data = thisPlugin.getData(rowIndex, "ZDLX");
					if(data.key == "select"){
						defineZD.find("#d_ZDYITEM").closest("li").show();
						defineZD.find("#d_TREEITEM").closest("li").hide();
					}else if(data.key == "tree"){
						defineZD.find("#d_ZDYITEM").closest("li").hide();
						defineZD.find("#d_TREEITEM").closest("li").show();
					}
		    		}
		    	}
		    }
        ]
	}
});

defineZD.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineZD.query();
	}
}])

defineZD.setAfterInit(function() {
	defineZD.query();
});

defineZD.query = function() {
	var query={};
	var search = defineZD.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineZD.getSqlResult(query, "MONGO_ZD", "SCM_ZD", "admin/scm/jcdy/search");
	console.info('defineZD.query');
	if(!JL.isNull(resultData.data) && !JL.isNull(resultData.data)){
		var CDS = this.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":resultData.data}); 
		CDS.post();
		defineZD.getPluginObj("LIST").setPaging(resultData.fileName); 
	} else {
		JL.tip("未找到任何数据");
		var CDS = this.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":[]}); 
		CDS.post();
	}
};