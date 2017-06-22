var defineWDXTGG = JL.JLForm();
defineWDXTGG.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST",
				"success" : function(data, tip) {
					console.info('after');
					defineWDXTGG.query();
				}
			},
			"jlCancelSlide" : {
				"cds" : "CDS"
			}
		}
	},
	"XXFL" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.XXFL",
		"readonly" : false,
		"format" : {}
	},
	"GGBH" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.GGBH",
		"format" : {}
	},
	"ZT" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.ZT",
		"format" : {}
	},
	"ZY" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.ZY",
		"format" : {
			"null" : false
		}
	},
	"YX" : {
		"jlid" : "JLCheckbox",
		"options" : {
			"1" : "有效"
		},
		"cds" : "CDS",
		"cds-field" : "LIST.YX",
		"format" : {
			"null" : false
		}
	},
	"BJ" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.BJ"
	},
	"LXR" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.LXR"
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh"
	},
	"GSXX01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.GSXX01"
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging" : "more",
		"multi" : false,
		"mode": "edit",
		/*"buttons" : {
			"jlNew" : {
				"listener" : {
					"click" : function(data) {
						defineWDXTGG.getPluginObj("GSXX01").setData(
								userInfo.PCRM_GSXX01);
					}
				}
			}
		},
*/
		"title" : [ {
			"id" : "XXFL",
			"name" : "消息分类",
			"width" : "w02"
		}, {
			"id" : "GGBH",
			"name" : "公告编号",
			"width" : "w02"
		}, {
			"id" : "ZT",
			"name" : "主题",
			"width" : "w02"
		}, {
			"id" : "ZY",
			"name" : "摘要",
			"width" : "w03"
		}, {
			"id" : "CZ",
			"name" : "操作",
			"width" : "w03"
		} ],
		"header" : [ {
			"id" : "XXFL",
			"groupid" : "XXFL",
			"rowindex" : 1,
			"title" : "消息分类"
		}, {
			"id" : "GGBH",
			"groupid" : "GGBH",
			"title" : "公告编号"
		}, {
			"id" : "ZT",
			"groupid" : "ZT",
			"rowindex" : 1,
			"title" : "主题"
		}, {
			"id" : "ZY",
			"groupid" : "ZY",
			"rowindex" : 1,
			"title" : "摘要"
		},/* {
			"id" : "edit",
			"groupid" : "CZ",
			"rowindex" : 1,
			"title" : "编辑",
			"editor" : "JLEdit",
			"config" : {
				"readonly" : [ "DM" ]
			},
			"listener" : {
				"click" : function(data) {
					console.info("HKKKKKKKKKKKKK");
					defineWDXTGG.getTab().find("#jlEmptyCard").hide();

				}
			}
		},*/ {
			"id" : "delete",
			"groupid" : "CZ",
			"rowindex" : 1,
			"title" : "删除",
			"editor" : "JLCancelDelete",
			"config" : {

			},
			"listener" : {
				"delete" : function(thisPlugin, rowIndex, obj) {
					JL.confirm("确认删除?", function() {
						var selectedIndex = thisPlugin.getSelectedIndex();
						var index = parseInt(selectedIndex[0]);
						var data = thisPlugin.data[index];
						debugger;
	           			var ajaxJson = {};
	           			ajaxJson["src"] = "DefineWDXTGG/deleteXTGG.do";
	           			ajaxJson["data"] = {"XmlData": JSON.stringify(data)};
	           			var resultData = JL.ajax(ajaxJson);
	           			console.info(resultData);
	           			resultData = resultData.data;
	           			var statu = parseInt(resultData["state"]);
	           			if(statu == 1){
	           				thisPlugin.removeRow(index);
	           				JL.tip("刪除成功!");
	           			}
					});
				}
			}
			/*	JL.recursiveAjax(thisPlugin, {
							"S_VALUE" : "D1"
						}, selectedIndex, "删除", 0, defineWDXTGG.initField);*/
		}

		]
	}
});

defineWDXTGG.setEvent([ {
	"selector" : "#search",
	"event" : "click",
	"func" : function(data) {
		 defineWDXTGG.query();
	}
} ]);

defineWDXTGG.setAfterInit(function() {
	// 加载Grid数据事件
	
	defineWDXTGG.query();
});

defineWDXTGG.query = function() {
	var queryField = {};
	queryField["S_VALUE"] = {"$ne" : "D1"};
	queryField["GSXX01"] = userInfo.PCRM_GSXX01;
	queryField["ZDRDM"] = userInfo.PCRM_CZY01;
	queryField["BZ02"] = "封单";
	var search = defineWDXTGG.getTab().find("[name='PSCK']").val();
	if (!JL.isNull(search)) {
		queryField["PSCK"] = search;
	}
	var resultData = defineWDXTGG.getSqlResult(queryField, "MONGO_WDXTGG",
			"FORM_XTGG", "admin/scm/jcdy/search");
	console.log(resultData);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({
		"LIST" : resultData.data
	});
	CDS.post();
	// 分页加在更多
	defineWDXTGG.getPluginObj("LIST").setPaging(resultData.fileName);
};



