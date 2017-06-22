var defineBOMSPXX = JL.JLForm();
defineBOMSPXX.setPlugin({
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
					defineBOMSPXX.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					console.info(this);
					var type = $(this).text();
					defineBOMSPXX.getPluginObj("GRID").setData([]);
					if(type == "批量导入"){
						defineBOMSPXX.find("#import").show();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
					}else{
						defineBOMSPXX.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
		}
	},
	"EXCEL" : {
		"jlid" : "JLUpload",
		"listener": {
			"afterUpload": function(data){
				var resultData = JL.getExcelData(17, data); 
				var returnList = resultData.data.returnList;
				defineBOMSPXX.getPluginObj("GRID").setData(returnList);
				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineBOMSPXX/importBOMSPXX.do";
				ajaxJson["data"] = {"XmlData": JSON.stringify({"GRID":returnList})};
				var resultData = JL.ajax(ajaxJson);
				debugger;
				if (resultData.data.returnList == -1){
					JL.tip("导入成功");
					defineBOMSPXX.query();
				}else{
					JL.tip(resultData.data.err);
				}
			}
		}
	},
	"GRID" : {
		"jlid" : "JLGrid",
		"multi": false,
		"tittles": "批量导入BOM商品",
		"excelhead":{
			"ZSPBM":"主商品编码",
			"BSPBM":"子商品编码",
			"SL":"数量",
			"CMT":"串码头",
			"CBBL":"成本比例"
		},
		"buttons": [6],
	    "headers" : [
		    {"id":"BSPXX01", "name":"子商品内码", "hidden":true},
		    {"id":"ZSPBM", "name":"主商品编码", "width": 100},
		    {"id":"BSPBM", "name":"子商品编码", "width": 100},
		    //{"id":"BSPMC", "name":"子商品名称", "width": 250},
		    {"id":"CMT", "name":"串码头", "width": 100},
		    {"id":"SL", "name":"数量", "width": 100},
		    {"id":"CBBL", "name":"成本比例", "width": 100}
		]
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	"BOM01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.BOM01",
		"format" : {}
	},
	"ZSPXX01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.ZSPXX01",
		"readonly": true,
		"format" : {}
	},
	"ZSPBM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.ZSPBM",
		"readonly": true,
		"format": {
		}
	},
	"JLDW":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.JLDW",
		"readonly": true,
		"format": {
		}
	},
	"ZSPMC":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.ZSPMC",
		"queryConfig": {
			"namespace": "SPXX",
			"sqlid": "SPXX",
			"dir": "scm/pub/search",
			"textid": "SPMC",
			"queryField": {"SPXX28": 1},
			"fieldMapping":{
				"SPXX01":"ZSPXX01",
				"SPBM":"ZSPBM",
				"JLDW01":"JLDW",
				"SPMC":"ZSPMC"
			}
		},
		"format": {
		}
	},
	"SPLB" : {
		"jlid" : "JLGrid",
		"buttons": [0,2],
		"cds": "CDS",
		"cds-field": "LIST.SPLB",
		"primarykey": ["BSPXX01"],
	    "headers" : [
		    {"id":"BSPXX01", "name":"子商品内码", "hidden":true},
		    {"id":"BSPBM", "name":"子商品编码", "width": 100},
		    {"id":"BSPMC", "name":"子商品名称", "width": 250},
		    {"id":"JLDW", "name":"单位", "width": 100},
		    {"id":"CMT", "name":"串码头", "width": 100, "editor":{"type":"text"}},
		    {"id":"SL", "name":"数量", "width": 100, "editor":{"type":"text"}},
		    {"id":"CBBL", "name":"成本比例", "editor":"text", "width": 100, "editor":{"type":"text"}}
		],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
				if(JL.isNull(data.SL)){
					thisPlugin.setCell("1", rowIndex, thisPlugin.getRowIndexByID("SL"));
				}
			}
		},
		"queryConfig": {
			"multi": true,
			"namespace": "SPXX",
			"sqlid": "SPXX",
			"dir": "scm/pub/search",
			"queryField": {"SPXX28": 1},
			"init": {"ZSPXX01": "ZSPXX01"},
			"fieldMapping":{
				"SPXX01":"SPLB.BSPXX01",
				"SPBM":"SPLB.BSPBM",
				"SPMC":"SPLB.BSPMC",
				"CMT":"SPLB.CMT",
				"JLDW01":"SPLB.JLDW"
			}
		}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"buttons" : {
			"jlNew":{}
		},
		"title" : [
	    	{"id":"DM", "name":"商品编码", "width":"w02"},
	    	{"id":"MC", "name":"商品名称", "width":"w05"},
	    	{"id":"DW", "name":"单位", "width":"w01 tc min_h30"},
	    	{"id":"SL", "name":"数量", "width":"w01 tc min_h30"},
	    	{"id":"CMT", "name":"串码头", "width":"w01 tc min_h30"},
	    	{"id":"CBBL", "name":"成本比例", "width":"w01 tc min_h30"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tr pr15"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
            {"id":"BOM01", "hidden":true},
            {"id":"zsp", "title":"主商品:", "editor":"title", "groupid":"DM", "rowindex":1, "css":"font_weight_bold font_size_standard mr0"},
		    {"id":"ZSPBM", "groupid":"DM", "title":"主商品编码", "rowindex":1, "css":"fr mr0 font_weight_bold font_size_standard"},
		    {"id":"ZSPMC", "groupid":"MC", "title":"主商品名称", "css":"font_weight_bold font_size_standard"}, 
		    {"id":"JLDW", "groupid":"DW", "title":"单位", "css":"w12 mr0 font_weight_bold font_size_standard"}, 
		    {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"fr", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineBOMSPXX, data, "删除", {
								"disabled": false,
								"success":function(){
									//defineBOMSPXX.query();
									thisPlugin.removeRow(rowIndex);
								}
							});
						});
					}
				}
			},
		    {"id":"update", "title":"编辑", "groupid":"CZ", "groupcss":"fr", "rowindex":1, "editor":"JLEdit",
		    	"config":{
		    		
		    	},
		    	"listener":{
		    		"click": function(thisPlugin, rowIndex, obj){
		    		}
		    	}
		    },
		    {"id":"SPLB", "editor":"Grid", "groupcss":"w12 more pt10 pb10",
		    	"rowcss": "pl5 pt5 fl w12",
	    		"header" : [
	    		    {"id":"BSPBM", "title":"子商品编码", "groupcss":"w02 tr pr10"},
	    		    {"id":"BSPMC", "title":"子商品名称", "groupcss":"w05"},
	    		    {"id":"JLDW", "title":"单位", "groupcss":"w01 tc"},
	    		    {"id":"SL", "title":"数量", "groupcss":"w01 tc"},
	    		    {"id":"CMT", "title":"串码头", "groupcss":"w01 tc"},
	    		    {"id":"CBBL", "title":"成本比例", "groupcss":"w01 tc"}
	            ]
		    }
        ]
	}
});

defineBOMSPXX.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineBOMSPXX.query();
	}
}])

defineBOMSPXX.setAfterInit(function() {
	defineBOMSPXX.query();
});

defineBOMSPXX.query = function() {
	var query={};
	var search = defineBOMSPXX.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	query["GSXX01"] = userInfo.PCRM_GSXX01;
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineBOMSPXX.getSqlResult(query, "MONGO_BOMSPXX", "SCM_BOMSPXX", "admin/scm/jcdy/search");
	console.info('defineBOMSPXX.query');
	if(!JL.isNull(resultData.data) && !JL.isNull(resultData.data)){
		var CDS = this.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":resultData.data}); 
		CDS.post();
		defineBOMSPXX.getPluginObj("LIST").setPaging(resultData.fileName); 
	} else {
		JL.tip("未找到任何数据");
		var CDS = this.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":[]}); 
		CDS.post();
	}
};