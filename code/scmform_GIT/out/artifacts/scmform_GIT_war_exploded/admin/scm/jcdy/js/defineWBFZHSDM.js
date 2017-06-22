var defineWBFZHSDM = JL.JLForm();
defineWBFZHSDM.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST",
				"success" : function(data, tip) {
					console.info('after');
					defineWBFZHSDM.query();
				}
			},
			"jlCancelSlide" : {
				"cds" : "CDS"
			}
		}
	},
	"DM" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.DM",
		"readonly" : false,
		"format" : {}
	},
	"MC" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.MC",
		"format" : {}
	},
	"DMBM" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.DMBM",
		"format" : {}
	},
	"MCBM" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.MCBM",
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
		"buttons" : {
			"jlNew" : {
				"listener" : {
					"click" : function(data) {
						defineWBFZHSDM.getPluginObj("GSXX01").setData(
								userInfo.PCRM_GSXX01);
					}
				}
			}
		},

		"title" : [ {
			"id" : "DM",
			"name" : "代码",
			"width" : "w02"
		}, {
			"id" : "MC",
			"name" : "名称",
			"width" : "w02"
		}, {
			"id" : "DMBM",
			"name" : "代码别名",
			"width" : "w02"
		}, {
			"id" : "MCBM",
			"name" : "名称别名",
			"width" : "w02"
		}, {
			"id" : "YX",
			"name" : "有效",
			"width" : "w02"
		}, {
			"id" : "CZ",
			"name" : "操作",
			"width" : "w02"
		} ],
		"header" : [ {
			"id" : "DM",
			"groupid" : "DM",
			"rowindex" : 1,
			"title" : "代码"
		}, {
			"id" : "MC",
			"groupid" : "MC",
			"title" : "名称"
		}, {
			"id" : "DMBM",
			"groupid" : "DMBM",
			"rowindex" : 1,
			"title" : "代码别名"
		}, {
			"id" : "MCBM",
			"groupid" : "MCBM",
			"rowindex" : 1,
			"title" : "名称别名"
		}, {
			"id" : "YX",
			"groupid" : "YX",
			"rowindex" : 1,
			"title" : "有效",
			"groupcss" : "overflow_inherit",
			"editor" : "plugin",
			"config" : {
				"jlid" : "JLCheckbox",
				"options" : {
					"1" : "有效"
				},
				"listener" : {
					"checkd" : function(data, check, arr) {
						if (checked) {
							data.key = 1;
							data.value = "有效";
						} else {
							data.key = 0;
							data.value = "无效";
						}
					}
				}

			}
		}, {
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
					 defineWBFZHSDM.getTab().find("#jlEmptyCard").hide();

				}
			}
		}, {
			"id" : "delete",
			"groupid" : "CZ",
			"rowindex" : 1,
			"title" : "删除",
			"editor" : "JLCancelDelete",
			"config" : {

			},
			"listener" : {
				"delete" : function(thisPlugin, rowIndex, obj) {
					var data = thisPlugin.getData(rowIndex);
					JL.confirm("确认删除?", function() {
						var selectedIndex = thisPlugin.getSelectedIndex();
						JL.recursiveAjax(thisPlugin, {
							"S_VALUE" : "D1"
						}, selectedIndex, "删除", 0, defineWBFZHSDM.initField);
					});
				}
			}
		}

		]
	}
});

defineWBFZHSDM.setEvent([ {
	"selector" : "#search",
	"event" : "click",
	"func" : function(data) {
		 defineWBFZHSDM.query();
	}
} ]);

defineWBFZHSDM.setAfterInit(function() {
	// 加载Grid数据事件
	defineWBFZHSDM.query();
});

defineWBFZHSDM.query = function() {
	var queryField = {};
	queryField["S_VALUE"] = {
		"$ne" : "D1"
	};
	var search = defineWBFZHSDM.getTab().find("[name='PSCK']").val();
	if (!JL.isNull(search)) {
		queryField["PSCK"] = search;
	}
	var resultData = defineWBFZHSDM.getSqlResult(queryField, "MONGO_WBFZHSDM",
			"SCM_WBFZHSDM", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({
		"LIST" : resultData.data
	});
	CDS.post();
	// 分页加在更多
	defineWBFZHSDM.getPluginObj("LIST").setPaging(resultData.fileName);
};



