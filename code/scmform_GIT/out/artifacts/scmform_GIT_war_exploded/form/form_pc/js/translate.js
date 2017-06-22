var translate = JL.JLForm();

translate.setData({
	"name": "翻译词库",
	"jyl": "TRANSLATE_WORDS"
});

translate.setPlugin({
	"footer": {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveForm":{}
		}
	},
	"translate": {
		"jlid": "JLLayoutGrid",
		"multi": false,
		"title": [
		    {"id":"ZJ", "name":"源词条", "width":"w04"},
		    {"id":"FY", "name":"文件路径", "width":"w08"},
		],
		"header": [
		    {"id":"key", "title":"源词条", "groupid":"ZJ"},
		    {"id":"value", "title":"目标词条", "groupcss":"w12", "editor":"text",
		    	"listener": {
		    		"keyup": function(thisPlugin, rowIndex, obj){
		    			var e = window.event;
		    			var language = translate.getPluginObj("language").getData()
		    			if(e.keyCode == 38){
		    				obj.closest("dl").prev().find("[data-id='"+language.key+"']").focus();
		    				obj.closest("dl").prev().find("[data-id='"+language.key+"']").select();
		    			}else if(e.keyCode == 40 || e.keyCode == 13){
		    				obj.closest("dl").next().find("[data-id='"+language.key+"']").focus();
		    				obj.closest("dl").next().find("[data-id='"+language.key+"']").select();
		    			}
		    		}
		    	}
		    },
		    /*{"id":"path", "title":"翻译语种", "groupid":"FY", "editor":"Grid",
		    	"header": [
			        {"id":"name", "title":"主键", "groupid":"ZJ"}
			    ]
		    }*/
		],
	},
	"language": {
		"jlid": "JLSelect",
		//"default": "en",
		"options": {
			"en": "英文"
		},
		"listener": {
			"change": function(data){
				console.info(translate.getPluginObj("translate").config.header[1].id);
				translate.getPluginObj("translate").config.header[1].id = data.key;
				console.info(translate.getPluginObj("translate").config.header[1].id);
				//translate.loadWords({});
			}
		}
	}
})

translate.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		var query = {};
		translate.loadWords(query);
	}
}]);

translate.setAfterInit(function(){
	var query = {};
	//translate.loadWords(query);
});

translate.loadWords = function(query){
	var search = translate.getTab().find("[name='search']").val()
	if(!JL.isNull(search)){
		query["key"] = {"$regex": search};
	}

	var filename = translate.getTab().find("[name='filename']").val()
	if(!JL.isNull(filename)){
		query["path.name"] = {"$regex": filename};
	}
	
	var XmlData = {};
	XmlData["collection"] = "TRANSLATE_WORDS";
	XmlData["query"] = query;
	
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/form/find.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data.returnList;
		translate.getPluginObj("translate").setData(resultData);
	}
}