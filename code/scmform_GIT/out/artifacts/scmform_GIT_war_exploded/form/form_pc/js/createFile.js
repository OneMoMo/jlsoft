var createFile = JL.JLForm();
createFile.setEvent([{
	"selector": "#create",
	"event": "click",
	"func": function(){
		var text = $(this).prev().val();
		if(!JL.isNull(text)){
			var XmlData = {};
			XmlData["path"] = text;
			var ajaxJson = {};
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/JLText/createFile.do";
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
			var resultData = JL.ajax(ajaxJson);
		}
	}
}]);