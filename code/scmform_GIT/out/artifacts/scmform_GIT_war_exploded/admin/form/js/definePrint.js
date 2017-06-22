var definePrint = JL.JLForm();

definePrint.setPlugin({
	"save": {
		"jlid":"JLToolBar",
		"buttons": {
			"aaaa":{
				"name":"提交",
				"icon":"check",
				"func": function(){
					definePrint.readData();
					var XmlData = definePrint.getData();
					if(JL.isNull(XmlData.dybh)){
						XmlData.dymc = definePrint.find("[name='dymc']").val();
					}
					var resultData = JL.ajax({
						"src": pubJson.getURL("FormUrl") + "/DefinePrint/save.do",
						"data": {"XmlData":JSON.stringify(XmlData)}
					});
					if(!JL.isNull(resultData)){
						resultData = resultData.data
						if(resultData.MSGID == "S"){
							JL.tip("提交成功");
							var addCarShow = definePrint.find(".addCarShow").hide();
							definePrint.getTab().append(addCarShow);
						}
					}
				}
			},
			"jlCancelSlide":{
				
			}
		}
	},
	"design": {
		"jlid":"JLToolBar",
		"buttons": {
			"aa":{
				"name": "打印设计",
				"icon": "plus-square",
				"func": function(){
					definePrint.LODOP = getLodop();
					
					data = definePrint.getPluginObj("mnsj").getData();
					data = JL.isNull(data)? {}: JSON.parse(data);
					
					var designCode = definePrint.getPluginObj("sjdm").getData();
					designCode = designCode.replace(/LODOP/gm, "definePrint.LODOP")
					console.info(designCode);
					eval(designCode); 

					var returnCode = definePrint.LODOP.PRINT_DESIGN()
					definePrint.getPluginObj("sjdm").setData(returnCode);
				}
			},
			"bb":{
				"name": "打印预览",
				"icon": "plus-square",
				"func": function(){
					
					definePrint.LODOP = getLodop();
					
					data = definePrint.getPluginObj("mnsj").getData();
					data = JL.isNull(data)? {}: JSON.parse(data);
					console.info(data);
					
					var returnCode = definePrint.getPluginObj("sjdm").getData();

					returnCode = returnCode.replace (/[\\][n]/gm, "");
					returnCode = returnCode.replace (/\\"/gm, "\"");

					returnCode = returnCode.replace(/<script>window.alert = null;window.confirm = null;window.open = null;window.showModalDialog = null;<\/script>/gm, "");

					returnCode = returnCode.replace(/"<JL>/gm, "data.");
					returnCode = returnCode.replace(/<\/JL>"/gm, "");
					returnCode = returnCode.replace(/"<JL2>/gm, "(function(){");
					returnCode = returnCode.replace(/<\/JL2>"/gm, "return html;})()");
					
					returnCode = returnCode.replace(/<JL2.HEAD>([\s\S]*)<\/JL2.HEAD>/g, "var html = '$1';");
					returnCode = returnCode.replace(/<JL2.TR>([\s\S]*)<\/JL2.TR>/g, "html +='$1';");
					returnCode = returnCode.replace(/<JL2.FOOT>([\s\S]*)<\/JL2.FOOT>/g, "} html +='$1';");
					returnCode = returnCode.replace(/<JL2.ID>([\s\S]*)<\/JL2.ID>/g, "for(var i=0;i<data.$1.length;i++){ var $1 = data.$1[i];");

					returnCode = returnCode.replace(/<JL2.TD>/gm, "'+");
					returnCode = returnCode.replace(/<\/JL2.TD>/gm, "+'");
					
					returnCode = returnCode.replace(/LODOP/gm, "definePrint.LODOP");
					console.info(returnCode);
					eval(returnCode); 

					definePrint.LODOP.PREVIEW();
				}
			}
		}
	},
	/*"mnsj": {//模拟数据
		"jlid": "JLTextarea",
		"height": 100
	},
	"sjdm": {//打印设计代码
		"jlid": "JLTextarea",
		"height": 200
	},
	"yldm": {//打印代码
		"jlid": "JLTextarea",
		"disabled": true,
		"height": 200
	},*/

	"jlbh": {//打印代码
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh" 
	},
	"dybh": {//打印代码
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.dybh" 
	},
	"dymc": {//打印代码
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.dymc", 
		"queryConfig": {
			"namespace": "MONGO_PRINT",
			"sqlid": "DYMC",
			"dir": "admin/form/search",
			"fieldMapping": {
				"dybh": "dybh",
				"dymc": "dymc"
			}
		}
		
	},
	"mbbh": {//打印代码
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.mbbh" 
	},
	"mbmc": {//打印代码
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.mbmc" 
	},
	"mbnr": {//打印代码
		"jlid": "JLTextarea",
		"height": 200,
		"cds": "CDS",
		"cds-field": "LIST.mbnr" 
	},
	"mrmb": {//打印代码
		"jlid": "JLCheckbox",
		"options": {
			"1":""
		},
		"cds": "CDS",
		"cds-field": "LIST.mrmb" 
	},
	"bz": {//打印代码
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.bz" 
	},
	"ssgs": { 
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectGSXX.do",  
		"multi": true,
		"param" : {},
		"listener":{
			"click": function(){
			}
		},
		"header" : [
            {"id":"KEY", "title":"公司编码", "css":"w06"},
            {"id":"VALUE", "title":"公司名称", "css":"w06"}
        ],
		"cds": "CDS",
		"cds-field": "LIST.ssgs" 
	},
	"ssbm": { 
		"jlid": "JLMultiTree",
		"sqlid":"JLPub.select_ALLBM",
		"resource":"form",
		"cds": "CDS",
		"cds-field": "LIST.ssbm" 
	},
	"LIST": {
		"jlid": "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"rowclass" : "pl10",
		"buttons" : {
			"jlNew":{
				"listener": {
					"click": function(){
						//definePrint.getPluginObj("mnsj").setData('{"AAA":1,"SPLB":[{"SPBM":"1","SPMC":"11"},{"SPBM":"2","SPMC":"22"}]}');
					}
				}
			}
		},
		"groupField" : [
	        {"id":"dybh", "name":"打印编号", "css":"mr10"},
	        {"id":"dymc", "name":"打印名称", "css":"mr10"}
        ],
		"title" : [
	    	{"id":"DM", "name":"模版编号", "width":"w02 tc pr0"},
	    	{"id":"MC", "name":"模版名称", "width":"w08"},
	    	{"id":"MR", "name":"默认", "width":"w01"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tc pr0"}
	    ],
	    "header" : [
		    {"id":"mbbh", "groupid":"DM", "title":"主商品编码", "rowindex":1, "css":"w12 mr0"},
		    {"id":"mbmc", "groupid":"MC", "title":"主商品名称", "css":""}, 
		    {"id":"mrmb", "groupid":"MR", "title":"默认", "editor":"plugin", "css":"w12 pr5 mr0",
		    	"config":{
		    		"jlid": "JLCheckbox",
		    		"disabled": true,
		    		"options": {
		    			"1":""
		    		},
		    	}
		    }, 
		    {"id":"update", "title":"编辑", "groupid":"CZ", "rowindex":1, "editor":"JLEdit",
		    	"config":{
		    		
		    	},
		    	"listener":{
		    		"click": function(thisPlugin, rowIndex, obj){
		    		}
		    	}
		    },
		    {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
						var XmlData = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							var resultData = JL.ajax({
								"src": pubJson.getURL("FormUrl") + "/DefinePrint/delete.do",
								"data": {"XmlData":JSON.stringify(XmlData)}
							});
							if(!JL.isNull(resultData)){
								resultData = resultData.data
								if(resultData.MSGID == "S"){
									JL.tip("删除成功");
									var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
									addCarShow.hide();
									thisPlugin.form.getTab().append(addCarShow);
									thisPlugin.removeRow(rowIndex);
								}
							}
						});
					}
				}
			}
	    ]
	}
});

definePrint.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		definePrint.query();
	}
}])

definePrint.setAfterInit(function(){
	var XmlData = {};
	XmlData["collection"] = "formPrint"; 
	XmlData["order"] = {"jlbh": -1}; 
	JL.ajax({
		"src": pubJson.getURL("FormUrl") + "/form/find.do",
		"data":{"XmlData": JSON.stringify(XmlData)},
		"async": true,
		"callback": function(resultData){
			resultData = resultData.data.returnList;
			console.info(resultData);
			
			var CDS = definePrint.getCds("CDS");
			CDS.edit(); 
			CDS.setData({"LIST":resultData});
			CDS.post();
		}
	})
});
