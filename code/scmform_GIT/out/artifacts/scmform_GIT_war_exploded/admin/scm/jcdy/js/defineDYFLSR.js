var defineDYFLSR = JL.JLForm();

defineDYFLSR.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"before" : function(data) {
					console.info(data);
				},
				"success" : function(data, tip) {
					console.info('after');
					defineDYFLSR.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w06",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	// 返利收入编码
	"FLSRBM" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w12",
		"placeholder" : "请输入1~6位数字",
		"cds-field" : "LIST.FLSRBM",
		"format" : {}
	},
	// 返利收入名称
	"FLSRMC" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w12",
		"placeholder" : "请输入返利名称",
		"cds-field" : "LIST.FLSRMC",
		"format" : {}
	},
	// 财务类型
	"CWLX" : {
		"jlid" : "JLSelect",
		"placeholder" : "请选择财务类型",
		"default" : "0",
		"options" : {
			"0" : "返利",
			"1" : "费用",
			"2" : "其他"
		},
		"cds" : "CDS",
		"css" : "w12",
		"cds-field" : "LIST.CWLX"
	},
	"SYSZ" : {
		"jlid" : "JLCheckbox",
		"options" : {
			"0" : "供应商收入",
			"1" : "客户返利"
		},
		"cds" : "CDS",
		"cds-field" : "LIST.SYSZ",
		"listener" : {
			"checked" : function(data, thisPlugin) {
				debugger;
				var h=0;
				var SYSZ = defineDYFLSR.getPluginObj('SYSZ').getData();
				for (var i=0;i<SYSZ.length;i++){
					var SYSZ1 = SYSZ[i];
					if(SYSZ1.key==1){
						h=1;
					}
				}
				if (h==1){
					defineDYFLSR.getPluginObj('FPBJ').disabled(false); 
				}else{
					defineDYFLSR.getPluginObj('FPBJ').disabled(true); 
					defineDYFLSR.getPluginObj('FPBJ').setData([]);
				}
			/*	 if(data.key==1){
					defineDYFLSR.getPluginObj('FPBJ').disabled(false); 
				 }else{
			    	defineDYFLSR.getPluginObj('FPBJ').disabled(true); 
			     }
				 if(data.key==0 && thisPlugin ==false){
					defineDYFLSR.getPluginObj('FPBJ').disabled(false); 
				 }*/
			}
		}
	},
	"YX" : {
		"jlid" : "JLCheckbox",
		"options" : {
			"1" : "有效"
		},
		"cds" : "CDS",
		"default" : "1",
		"css" : "w12",
		"cds-field" : "LIST.YX"
	},
	"FPBJ" : {
		"jlid" : "JLCheckbox",
		"options" : {
			"1" : "不开发票"
		},
		"cds" : "CDS",
		"css" : "w12",
		"cds-field" : "LIST.FPBJ",
		"listener" : {
		}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging" : "more",
		"multi" : false,
		"cds" : "CDS",
		"mode" : "edit",
		"buttons" : {
			"jlNew" : {
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						defineDYFLSR.getPluginObj('FPBJ').disabled(true); 
					}
				}
			}
		},
		"title" : [ {
			"id" : "FLSRBM",
			"name" : "返利收入编码",
			"width" : "w02"
		}, {
			"id" : "FLSRMC",
			"name" : "返利收入名称",
			"width" : "w02"
		}, {
			"id" : "CWLX",
			"name" : "财务类型",
			"width" : "w02"
		}, {
			"id" : "SYSZ",
			"name" : "使用设置",
			"width" : "w03"
		}, {
			"id" : "YX",
			"name" : "有效标记",
			"width" : "w01"
		}, {
			"id" : "CZ",
			"name" : "操作",
			"width" : "w01"
		} ],
		"header" : [ {
			"id" : "FLSRBM",
			"title" : "返利收入编码",
			"groupid" : "FLSRBM",
			"groupcss" : "w02",
			"editor" : "text"
		}, {
			"id" : "FLSRMC",
			"title" : "返利收入名称",
			"groupid" : "FLSRMC",
			"groupcss" : "w02",
			"editor" : "text"
		}, {
			"id" : "CWLX",
			"title" : "财务类型",
			"groupid" : "CWLX",
			"groupcss" : "w02",
			"editor" : "text"
		}, {
			"id" : "SYSZ",
			"title" : "使用设置",
			"groupid" : "SYSZ",
			"groupcss" : "w03",
			"editor" : "text"
		}, {
			"id" : "YX",
			"title" : "有效标记",
			"groupid" : "YX",
			"groupcss" : "w01",
			"editor" : "plugin",
			"config" : {
				"jlid" : "JLCheckbox",
				"options" : {
					"1" : ""
				},
				"listener" : {
					"checked" : function(data, checked, arr) {
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
		}, 
		
		{"id" : "edit","groupid" : "CZ","rowindex":1,"title" : "编辑","editor" : "JLEdit",
			"config" : {
				"readonly" : [ "FLSRBM" ],
				"mapping":{}
			},
			"listener" : {
				"click" : function(thisPlugin, rowIndex, obj) {// 参数data为点击的值，是个json对象
					// defineDYFLSR.getTab().find("#jlEmptyCard").hide();
					debugger;
					
					var h=0;
					var SYSZ = thisPlugin.data[rowIndex].SYSZ;
					for (var i=0;i<SYSZ.length;i++){
						var SYSZ1 = SYSZ[i];
						if(SYSZ1.key==1){
							h=1;
						}
					}
					if (h==1){
						defineDYFLSR.getPluginObj('FPBJ').disabled(false); 
					}else{
						defineDYFLSR.getPluginObj('FPBJ').disabled(true); 
						defineDYFLSR.getPluginObj('FPBJ').setData([]);
					}
//					if(thisPlugin.data[rowIndex].SYSZ.key == 1){
//						defineDYFLSR.getPluginObj('FPBJ').disabled(false);
//					}else{
//						defineDYFLSR.getPluginObj('FPBJ').disabled(true);
//					}
					
				}
			}
		}, {
			"id" : "delete",
			"groupid" : "CZ",
			"rowindex" : 1,
			"editor" : "JLCancelDelete",
			"listener" : {
				"delete" : function(thisPlugin, rowIndex, obj) {
					var data = thisPlugin.getData(rowIndex);
					JL.confirm("确认删除?", function() {
						var selectedIndex = thisPlugin.getSelectedIndex();
						JL.recursiveAjax(thisPlugin, {
							"S_VALUE" : "D1"
						}, selectedIndex, "删除", 0, defineDYFLSR.initField);
					});
				}
			}
		} ]
	}
});

defineDYFLSR.setEvent([ {
	"selector" : "#query",
	"event" : "click",
	"func" : function() {
		defineDYFLSR.query();
	}
} ]);

defineDYFLSR.setAfterInit(function() {
	defineDYFLSR.query();
});

defineDYFLSR.query = function() {
	debugger;
	var query = {};
	var search = defineDYFLSR.getTab().find("[name='CXTJ']").val();
	if (!JL.isNull(search)) {
		query["CXTJ"] = search;
	}
	query["S_VALUE"] = "D1";
	debugger;
	var resultData = defineDYFLSR.getSqlResult(query, "MONGO_SRFL",
			"SCM_DYFLSR", "admin/scm/jcdy/search");
	console.info('defineDYFLSR.query');
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({
		"LIST" : resultData.data
	});
	CDS.post();
	defineDYFLSR.getPluginObj("LIST").setPaging(resultData.fileName);
};