var defineFLPPQX = JL.JLForm();

defineFLPPQX.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds" : "CDS",
				"success" : function(resultData) {
					var LIST = [];
					var CDS = defineFLPPQX.getCds("CDS");
					if(CDS.mode == "append"){
						LIST.push(resultData);
						$.merge(LIST, defineFLPPQX.getPluginObj("LIST").getData());
					}else{
						LIST = defineFLPPQX.getPluginObj("LIST").getData();
						var index = defineFLPPQX.getPluginObj("LIST").getSelectedIndex();
						for(var i=0; i<LIST.length; i++){
							if(LIST[i]["QX01"] == resultData.QX01){
								LIST[i] = resultData;
							} 
						}
					}
					CDS.edit();
					CDS.setData({"LIST":LIST});
					CDS.post();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh",
		"readonly" : true,
		"format" : {}
	},
	"GSXX" : {
		"jlid": "JLSelect",
		"cds": "CDS", 
		"cds-field": "LIST.GSXX",
		"sqlid":"RYXX.JTXX",
		"resource": "scmform"
	},
	"LX" : {
		"jlid" : "JLRadio",
		"options" : {
			"0" : "分类品牌",
			"1" : "客户供应商",
		},
		"listener" : {
			"click" : function(data) {
				defineFLPPQX.query();
			}
		}
	},
	"QXLX" : {
		"jlid" : "JLRadio",
		"cds" : "CDS",
		"cds-field" : "LIST.QXLX",
		"options" : {
			"0" : "分类品牌",
			"1" : "客户供应商",
		},
		"listener" : {
			"click" : function(data) {
				if (data.key == "0") {
					defineFLPPQX.getPluginObj("KHLB").setData([]);
					defineFLPPQX.getPluginObj("GYSLB").setData([]);
					defineFLPPQX.find("#FLPP").show();
					defineFLPPQX.find("#KHGYS").hide();
				} else if (data.key == "1") {
					defineFLPPQX.getPluginObj("PPB").setData([]);
					defineFLPPQX.getPluginObj("SPFL").setData([]);
					defineFLPPQX.find("#FLPP").hide();
					defineFLPPQX.find("#KHGYS").show();
				}
			}
		}
	},
	"QX01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.QX01",
		"readonly" : true
	},
	"QXMC" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.QXMC"
	},
	"PPB" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "PUBCX.PP",
		"resource" : "scmform",
		"cds" : "CDS",
		"cds-field" : "LIST.PPB",
		"readonly" : true
	},
	"SPFL" : {
		"jlid" : "JLMultiTree",
		"sqlid" : "PUBCX.TREE_SPFL",
		"resource" : "scmform",
		"cds" : "CDS",
		"cds-field" : "LIST.SPFL",
		"clickLoad": false,
		"readonly" : true
	},
	"KHLB" : {
		"jlid" : "JLGrid",
		"cds" : "CDS",
		"cds-field" : "LIST.KHLB",
		"tittles" : "客户",
		"primarykey" : ["WLDW01"],
		"buttons" : [ 0, 2 ],
		"queryConfig": {
			"dir" : "scm/pub/search",
		    "namespace" : "WLDW",
		    "placeholder":"点击查找客户",
		    "sqlid" : "KH_ALL",
		    "multi": true,
			"init": {"GSXX01":"GSXX01"},
			"fieldMapping" : {
				"WLDW01":"KHLB.WLDW01",
				"WLDWMC":"KHLB.WLDWMC"
			}
		},
		"headers" : [ {
			"id" : "WLDW01",
			"name" : "客户代码",
			"width" : 120
		}, {
			"id" : "WLDWMC",
			"name" : "客户名称",
			"width" : 200
		} ]
	},
	"GYSLB" : {
		"jlid" : "JLGrid",
		"cds" : "CDS",
		"cds-field" : "LIST.GYSLB",
		"tittles" : "供应商",
		"primarykey" : ["WLDW01"],
		"buttons" : [ 0, 2 ],
		"queryConfig": {
			"dir" : "scm/pub/search",
			"namespace" : "WLDW",
			"placeholder":"点击查找客户",
			"sqlid" : "GYS_ALL",
			"multi": true,
			"init": {"GSXX01":"GSXX01"},
			"fieldMapping" : {
				"WLDW01":"GYSLB.WLDW01",
				"WLDWMC":"GYSLB.WLDWMC"
			}
		},
		"headers" : [ {
			"id" : "WLDW01",
			"name" : "供应商代码",
			"width" : 120
		}, {
			"id" : "WLDWMC",
			"name" : "供应商名称",
			"width" : 200
		} ]
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging" : "more",
		"multi" : false,
		"rowclass" : "pl10",
		"buttons" : {
			"jlNew" : {
				"listener" : {
					"click" : function() {
						defineFLPPQX.find("#KHGYS").hide();
						defineFLPPQX.find("#FLPP").hide();
						defineFLPPQX.getPluginObj("QXLX").disabled(false);
						defineFLPPQX.getPluginObj("GSXX").disabled(false);
						defineFLPPQX.getPluginObj("GSXX").setData(userInfo.PCRM_GSXX01);
					}
				}
			}
		},
		"title" : [ {
			"id" : "QXDM",
			"name" : "代码",
			"width" : "w01 tc pr0"
		}, {
			"id" : "QXMC",
			"name" : "名称",
			"width" : "w07 tl pr0 pl30"
		}, {
			"id" : "QXLX",
			"name" : "类型",
			"width" : "w02 tc pr0"
		},/* {
			"id" : "MX",
			"name" : "明细",
			"width" : "w07 tc pr0"
		}, */{
			"id" : "CZ",
			"name" : "操作",
			"width" : "w02 tc pr10"
		} ],
		"header" : [
				{
					"id" : "QX01",
					"groupid" : "QXDM",
					"title" : "编号",
					"css" : "mr0 w12 tc"
				},
				{
					"id" : "QXMC",
					"groupid" : "QXMC",
					"title" : "名称",
					"css" : "mr0 w12 tl"
				},
				{
					"id" : "QXLX",
					"groupid" : "QXLX",
					"title" : "类型",
					"css" : "mr0 w12 tc"
				},
				/*{
					"id" : "PPB",
					"groupid" : "MX",
					"rowindex" : 1,
					"css" : "w06 mr0",
					"title" : "品牌"
				},
				{
					"id" : "SPFL",
					"groupid" : "MX",
					"rowindex" : 1,
					"css" : "w06 mr0",
					"title" : "分类"
				},
				{
					"id" : "KHLB",
					"groupid" : "MX",
					"rowindex" : 2,
					"css" : "w06 mr0", "editor":"Grid",
			    	"rowcss": "lh30 fl w12",

					"header" : [
				    		    {"id":"WLDW01", "title":"客户编码", "groupcss":"w04", "css":"w12"},
				    		    {"id":"WLDWMC", "title":"客户名称", "groupcss":"w08", "css":"w12"},
				    ],
					"title" : "分类"
				},
				{
					"id" : "GYSLB",
					"groupid" : "MX",
					"rowindex" : 2,
					"css" : "w06 mr0", "editor":"Grid",
			    	"rowcss": "lh30 fl w12",

					"header" : [
					            {"id":"WLDW01", "title":"供应商编码", "groupcss":"w04", "css":"w12"},
					            {"id":"WLDWMC", "title":"供应商名称", "groupcss":"w08", "css":"w12"},
					            ],
					"title" : "品牌"
				},*/
				{
					"id" : "edit",
					"groupid" : "CZ",
					"rowindex" : 1,
					"title" : "编辑",
					"editor" : "JLEdit",
					"config" : {
						"mapping" : {}
					},
					"listener" : {
						"click" : function(thisPlugin,rowIndex) {
							var data = thisPlugin.getData(rowIndex);
							var dl = thisPlugin.getDL(rowIndex);
							if (data.QXLX.key == "0") {
								defineFLPPQX.getPluginObj("KHLB").setData([]);
								defineFLPPQX.getPluginObj("GYSLB").setData([]);
								defineFLPPQX.find("#FLPP").show();
								defineFLPPQX.find("#KHGYS").hide();
							} else if (data.QXLX.key == "1") {
								defineFLPPQX.getPluginObj("PPB").setData([]);
								defineFLPPQX.getPluginObj("SPFL").setData([]);
								defineFLPPQX.find("#FLPP").hide();
								defineFLPPQX.find("#KHGYS").show();
							}
							
							defineFLPPQX.getPluginObj("QXLX").disabled(true);
							defineFLPPQX.getPluginObj("GSXX").disabled(true);
						}
					}
				},{
					"id" : "delete",
					"groupid" : "CZ",
					"rowindex" : 1,
					"title" : "删除",
					"css" : "mr0",
					"editor" : "link",
					"listener" : {
						"click": function(thisPlugin, rowIndex, obj){
							JL.confirm("确认删除?", function(){
								var data = thisPlugin.getData(rowIndex);
	            	        	var XmlData = $.extend({}, data);
	            	        	XmlData["S_VALUE"] = "D1";
	            	        	JL.saveForm(defineFLPPQX, XmlData, "删除", {
	            	        		"success": function(data){
	            	        			thisPlugin.removeRow(rowIndex);
	            	        		}
	            	        	});
	              			});
						}
					}
				}],
				"listener": {
					"loadRow": function(thisPlugin, data, rowIndex, dl){
						if(data.QXLX.key == "0"){
							dl.find("[groupid='MX'] > ul > li:eq(1)").hide();
						}else if(data.QXLX.key == "1"){
							dl.find("[groupid='MX'] > ul > li:eq(0)").hide();
						}
					}
				}
	}
});

defineFLPPQX.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineFLPPQX.query();
	}
}]);

defineFLPPQX.setAfterInit(function() {
	// 加载Grid数据事件
	defineFLPPQX.query();
});

defineFLPPQX.query = function() {
	var query = {};
	query["S_VALUE"] = {"$ne":"D1"};
	
	var search = defineFLPPQX.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	var LX = defineFLPPQX.getPluginObj("LX").getData();
	if(!JL.isNull(LX)){
		query["LX"] = LX.key;
	}
	
	var resultData = defineFLPPQX.getSqlResult(query, "MONGO_FLPPQX",
			"SCM_FLPPQX", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({
		"LIST" : resultData.data
	});
	CDS.post();
	defineFLPPQX.getPluginObj("LIST").setPaging(resultData.fileName);
}
