var createKey = JL.JLForm();
createKey.setEvent([{
	"selector": "#create",
	"event": "click",
	"func": function(){
		var text = $(this).prev().val();
		if(!JL.isNull(text)){
			var XmlData = {};
			XmlData["path"] = text;
			var ajaxJson = {};
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/JLText/createKey.do";
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
			var resultData = JL.ajax(ajaxJson);
		}
	}
}]);