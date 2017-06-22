var defineCX = JL.JLForm();
defineCX.setPlugin({
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
					defineCX.query();
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
	"CX02":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.CX02",
		"placeholder": "名称",
		"format": {
		}
	},
	"CX05":{
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.CX05",
		"default": "0",
		"options": {
			"0": "SQL",
			"1": "MONGO",
			//"2": "接口"
		},
		"listener":{
			"click": function(data){
				if(!JL.isNull(defineCX.getPluginObj("CX03").getData())
						|| !JL.isNull(defineCX.getPluginObj("CX06").getData())
				/*|| !JL.isNull(defineCX.getPluginObj("ZDYTJ").getData())*/){
					JL.confirm("切换后将清空查询语句", 
							function(){
						defineCX.getPluginObj("CX03").setData("");
						defineCX.getPluginObj("CX06").setData("");
					}, function(){
						defineCX.getPluginObj("CX05").setData(defineCX.CXLX);
					})
				}
				defineCX.changeCXLX(data);
			},
			"change": function(data){
				defineCX.CXLX = defineCX.getPluginObj("CX05").getData();
			}
		}
	},
	"CX06":{
		//"jlid": "JLInput",
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.CX06",
		"sOperateName":"selectDATASOURCE.do",
		"sBillName":"DefineCX",
		"param": {
			"type": "0"
		},
		"placeholder": "数据源",
		"listener":{
			"change": function(){
				if(defineCX.getPluginObj("CX05").getData().key == "1"){
					defineCX.getColumnNames({});
				}
			}
		}
	},
	"CX03":{
		"jlid": "JLTextarea",
		"cds": "CDS",
		"cds-field": "LIST.CX03",
		"placeholder": "SQL语句",
		"style":{
			"height": "250px"
		},
		"listener":{
			"focus": function(){
				defineCX.updateSQL = defineCX.getPluginObj("CX03").getData();
			},
			"blur": function(data, thisPlugin){
				defineCX.getColumnNames(data);
			}
		}
	},
	"CX04":{
		"jlid": "JLTextarea",
		"cds": "CDS",
		"cds-field": "LIST.CX04",
		"placeholder": "排序语句"
	},
	"CX11":{
		"jlid": "JLTextarea",
		"cds": "CDS",
		"cds-field": "LIST.CX11",
		"placeholder": "备注"
	},
	"CX09":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.CX09"
	},
	"CXTJ":{
		"jlid": "JLGrid",
		"cds": "CDS",
		"cds-field": "LIST.CXTJ",
		"buttons":[1,2],
		"sequence":false,
		"defaultCell": {
			"YXBJ": 1
		},
		"headers": [
            {"id":"SXH","name":"顺序号",
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"TJ01","name":"条件字段",
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"TJ02","name":"条件名称",
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"TJ03","name":"条件语句", "width":"200",
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"TJ04","name":"控件类型", "width":"110",
		    	"editor":{
		    		"type": "select",
		    		"default": "0",
		    		"options": {
		    			"0": "文本框",
		    			"1": "隐藏框",
		    			//"2": "下拉框",
		    			"3": "日期框",
		    			"4": "时间框"
		    		}
		    	}
		    },// ( 0: 默认文本框; 1: 隐藏框; 2: 静态下拉框; 3: 时间控件; )
		    {"id":"TJ05","name":"默认值",
		    	"editor":{
		    		"type": "text"
		    	}
		    }, 
		    {"id":"TJ06","name":"必填条件",
		    	"editor":{
		    		"type": "checkbox"
		    	}
		    },
		    {"id":"TJ07","name":"回车查询",
		    	"editor":{
		    		"type": "checkbox"
		    	}
		    },
	    	{"id":"YXBJ","name":"有效",
		    	"editor":{
		    		"type": "checkbox"
		    	}
		    }
		]
	},
	"CXJG":{
		"jlid": "JLGrid",
		"cds": "CDS",
		"cds-field": "LIST.CXJG",
		"buttons":[1,2],
		"defaultCell": {
			"YXBJ": 1
		},
		"sequence":false,
		"headers": [
            {"id":"SXH","name":"顺序号",
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"JG01","name":"结果字段", "width":"100"},
		    {"id":"JG02","name":"显示列名", "width":"200", "required": true,
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"JG03","name":"列宽", "width":"100", 
		    	"editor":{
		    		"type": "text"
		    	}
		    },
		    {"id":"JG05","name":"合计类型", "width":"100",
		    	"editor":{
		    		"type": "select",
		    		"options": {
		    			"": "",
		    			"sum": "合计",
		    			"average": "平均值",
		    			"max": "最大值",
		    			"min": "最小值"
		    		}
		    	}
		    },
		    {"id":"JG07","name":"字段类型", "width":"100",
		    	"editor":{
		    		"type": "select",
		    		"default": "",
		    		"options": {
		    			"": "文本",
		    			"number": "数字",
		    			"number|2": "数字(保留两位小数)",
		    			"number|4": "数字(保留四位小数)"
		    		}
		    	}
		    },
		    {"id":"JG04","name":"隐藏", 
		    	"editor":{
		    		"type": "checkbox"
		    	}
		    },
		    {"id":"JG06","name":"分组", 
		    	"editor":{
		    		"type": "checkbox"
		    	}
		    },
	    	{"id":"YXBJ","name":"有效",
		    	"editor":{
		    		"type": "checkbox"
		    	}
		    }
		]
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
	    	{"id":"MC", "name":"字段名称", "width":"w07"},
	    	{"id":"LX", "name":"查询类型", "width":"w02 tc"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tc pr15"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"CX01", "groupid":"DM", "title":"查询编号", "css":""},
		    {"id":"CX02", "groupid":"MC", "title":"查询名称", "css":""},
		    {"id":"CX05", "groupid":"LX", "title":"查询类型", "css":"w12 mr0"},
		    {"id":"update", "title":"编辑", "groupid":"CZ", "groupcss":"fr", "rowindex":1, "editor":"JLEdit",
		    	"config":{
		    		"readonly": ["CX01", "CX05"]
		    	},
		    	"listener":{
		    		"click": function(thisPlugin, rowIndex, obj){
		    			defineCX.changeCXLX(thisPlugin.getData(rowIndex, "CX05"));
		    		}
		    	}
		    },
		    {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineCX, data, "删除", {
								"disabled": false,
								"success":function(){
									thisPlugin.removeRow(rowIndex);
								}
							});
						});
					}
				}
			}
        ]
	}
});

defineCX.getColumnNames = function(data){
	var resultData = JL.ajax({
		"src": pubJson.getURL("FormUrl") + "/DefineCX/getColumnNames.do",
		"data": {
			"XmlData": JSON.stringify({
				"CXLX": defineCX.getPluginObj("CX05").getData().key,
				"jdbc": defineCX.getPluginObj("CX06").getData().key,
				"sql": data
			})
		}
	});
	defineCX.updateSQL = "";
	
	var JG01 = [];
	//数据库中的查询结果
	var JG = resultData.data.CXJG;
	for(var i=0; i<JG.length; i++){
		JG01.push(JG[i]["JG01"]);
	}

	//已经录入的查询结果
	var CXJG = defineCX.getPluginObj("CXJG").getData();
	for(var i=0; i<CXJG.length; i++){
		var row = CXJG[i];
		var index = $.inArray(row["JG01"], JG01);
		if(index != -1){
			JG[index] = row;
		}
	}

	defineCX.getPluginObj("CXJG").setData(JG);
}

defineCX.changeCXLX = function(data){
	if(data.key == "0"){
		defineCX.find("#d_CX03").closest("li").show();
	}else{
		defineCX.find("#d_CX03").closest("li").hide();
	}
	var CX06_CONFIG = defineCX.getPlugin("CX06");
	CX06_CONFIG.param = {
		"type": data.key
	};
	defineCX.reloadPlugin("CX06", CX06_CONFIG);
}

defineCX.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineCX.query();
	}
}])

defineCX.setAfterInit(function() {
	JL.tab(defineCX, {
		"CX": "基础信息",
		"CXTJ": "查询条件",
		"CXJG": "查询结果",
	});
	defineCX.query();
});

defineCX.query = function() {
	var query={};
	var search = defineCX.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineCX.getSqlResult(query, "MONGO_CX", "FORM_CX", "admin/scm/jcdy/search");
	if(!JL.isNull(resultData.data) && !JL.isNull(resultData.data)){
		var CDS = this.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":resultData.data}); 
		CDS.post();
		defineCX.getPluginObj("LIST").setPaging(resultData.fileName); 
	} else {
		JL.tip("未找到任何数据");
		var CDS = this.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":[]}); 
		CDS.post();
	}
};