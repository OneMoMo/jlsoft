var defineGCSPXJ= JL.JLForm();

defineGCSPXJ.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"success":function(data,tip){
					defineGCSPXJ.query();
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
					var type = $(this).text();
					if(type == "批量导入"){
						defineGCSPXJ.find("#import").show();
						defineGCSPXJ.getPluginObj("EXCEL").setData([]);
						defineGCSPXJ.getPluginObj("ERROR").setData([]);
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
					}else{
						defineGCSPXJ.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
		}
	},
	
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : ["excel"],
		"multi" : false,
		"listener" : {
			"loadFile" : function(data){
				console.info(data);
				var XmlData = {};
				XmlData["MBBM"] = 37;  
				XmlData["FILE"] = data;
				var ajaxJson = {};
				ajaxJson["src"] ="excelHandler/getExcelData.do?rid=" + Math.random();
				ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
				var resultData = JL.ajax(ajaxJson);
				
				if(!JL.isNull(resultData)){
					resultData = resultData.data.returnList;
					if (resultData.length > 0) {
						var XmlData = {};
						XmlData["GSXX01"] = userInfo["PCRM_GSXX01"];
						XmlData["data"] = resultData;
						var ajaxJson = {};
						ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineGCSPXJ/importGCSPXJ.do?rid="+Math.random();
						ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
			    		var result = JL.ajax(ajaxJson);
			    		console.info(result);
			    		defineGCSPXJ.getPluginObj("ERROR").setData(result.data.error);
			    		defineGCSPXJ.query();
			    		JL.tip("导入成功" + result.data.list.length + "条，导入失败" + result.data.error.length + "条");
					} else {
						JL.tip("读取Excel失败");
					}
				}
				return true;
			}
		}
	},
	
	"ERROR" : {
		"jlid" : "JLGrid",
		"multi": false,
		"sequence" : false,
		"tittles": "批量导入失败记录",
		"headers" : [
            {"id":"HS", "name":"行数"},
            {"id":"GCSPBM", "name":"工程商品编码", "width":150},
            {"id":"SBYY", "name":"失败原因", "width":500}
        ],
        "listener" : {
        	"loadRow" : function(thisPlugin, data, index, rowDL){
         		rowDL.addClass("font_red");
         	}
        }
	},
	
	"GSXX01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.GSXX01"
	},
	
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh"
	},
	
	"GCSPMC":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.GCSPMC",
		"readonly" : true,
		"dir" : "admin/scm/jcdy/search",
		"namespace" : "MONGO_GCSPXJ",
		"sqlid" : "GCSP",
		"autoquery" : true,
		"fieldMapping" : {
			"GCSPMC" : "GCSPMC",
			"GCSPBM" : "GCSPBM",
		},
		"listener" : {
			"beforequery" : function(data){
				data["S_VALUE"] = "D1";
			}
		}
	},
	
	"GCSPBM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.GCSPBM"
	},
	
	"PFXJ1":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PFXJ1"
	},
	
	"PFXJ2":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PFXJ2"
	},
	
	"PFXJ3":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PFXJ3"
	},
	
	"PFXJ4":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PFXJ4"
	},
	
	"PFXJ5":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PFXJ5"
	},

	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"mode": "edit",
		"rowclass": "pl10",
		"buttons" : {
			"jlNew":{
				"listener" : {
					"click" : function(data){
						defineGCSPXJ.getPluginObj("GSXX01").setData(userInfo["PCRM_GSXX01"]);
					}
				}
			},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义工程商品限价模板",{
						"GCSPBM":"工程商品编码",
						"GCSPMC":"工程商品名称",
						"PFXJ1":"批复限价1",
						"PFXJ2":"批复限价2",
						"PFXJ3":"批复限价3",
						"PFXJ4":"批复限价4",
						"PFXJ5":"批复限价5"
					});
					
				}	
			}
		},
		"title" : [
	    	{"id":"GCSPBM", "name":"工程商品编码", "width":"w02"},
	    	{"id":"GCSPMC", "name":"工程商品名称", "width":"w03"},
	    	{"id":"PFXJ1", "name":"批复限价1", "width":"w01"},
	    	{"id":"PFXJ2", "name":"批复限价2", "width":"w01"},
	    	{"id":"PFXJ3", "name":"批复限价3", "width":"w01"},
	    	{"id":"PFXJ4", "name":"批复限价4", "width":"w01"},
	    	{"id":"PFXJ5", "name":"批复限价5", "width":"w01"},
	    	{"id":"CZ", "name":"操作", "width":"w01"}
	    	
	    ], 
	    "header" : [
            {"id":"jlbh", "hidden":true},
            {"id":"GSXX01", "hidden":true},
		    {"id":"GCSPBM", "groupid":"GCSPBM", "title":"工程商品编码"},
		    {"id":"GCSPMC", "groupid":"GCSPMC", "title":"工程商品名称"},
		    {"id":"PFXJ1", "groupid":"PFXJ1", "title":"批复限价1"},
		    {"id":"PFXJ2", "groupid":"PFXJ2", "title":"批复限价2"}, 
		    {"id":"PFXJ3", "groupid":"PFXJ3", "title":"批复限价3"}, 
		    {"id":"PFXJ4", "groupid":"PFXJ4", "title":"批复限价4"}, 
		    {"id":"PFXJ5", "groupid":"PFXJ5", "title":"批复限价5"}, 
		    {"id":"update", "groupid":"CZ",  "rowindex":1, "title":"编辑", "editor":"JLEdit", "config":{}}, 
		    {"id":"delete", "groupid":"CZ",  "rowindex":1, "title":"删除", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineGCSPXJ, data, "删除", {
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

defineGCSPXJ.setAfterInit(function() {
	defineGCSPXJ.query();
});

defineGCSPXJ.setEvent([
{
	"selector" : "span#query",
	"event" : "click",
	"func": function(){
		defineGCSPXJ.query();
	}
},
{
	"selector" : ".addCarShow > div > ul li:not(:first,:last) :text",
	"event" : "blur",
	"func": function(){
		var val = $(this).val();
		if(!JL.isNull(val)){
			var str = $(this).closest("dd").prev().text();
			if(isNaN(val)){
				JL.tip(str + "必须为数字");
				this.value = "";
				this.focus();
			}else if(val*1 < 0){
				JL.tip(str + "必须大于0");
				this.value = "";
				this.focus();
			}
		}
	}
}
]);

defineGCSPXJ.query = function() {
	var query={};
	var GCSP = defineGCSPXJ.find("input[name='GCSP']").val();
	if(!JL.isNull(GCSP)){
		query["GCSP"] = GCSP;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineGCSPXJ.getSqlResult(query, "MONGO_GCSPXJ", "SCM_GCSPXJ", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineGCSPXJ.getPluginObj("LIST").setPaging(resultData.fileName); 
};