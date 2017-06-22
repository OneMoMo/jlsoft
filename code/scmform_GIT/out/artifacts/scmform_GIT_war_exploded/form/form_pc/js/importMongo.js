var importMongo = JL.JLForm();

importMongo.setPlugin({
	"footer": {
		"jlid": "JLToolBar",
		"buttons": {
			"save": {
				"name": "提交",
				"icon": "check",
				"func": function(){
					importMongo.readData();
					var XmlData = importMongo.getData();
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl") + "/excelHandler/importMongo.do";
					ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
					JL.ajax(ajaxJson);
				}
			}
		}
	},
	"mainkeys": {
		"jlid": "JLInput",
		"split": ","
	},
	"update": {
		"jlid": "JLInput",
		"split": ","
	},
	"excel": {
		"jlid": "JLUpload"
	}
});
