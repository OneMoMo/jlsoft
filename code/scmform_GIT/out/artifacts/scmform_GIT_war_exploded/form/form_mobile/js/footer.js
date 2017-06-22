$(document).ready(function(){
	var footer = JL.JLForm();
	footer.setTab($("footer.jl_footer"));
	footer.find("#"+$("body").attr("page")).addClass("xuan");

	getZSL(function(resultData){
		footer.find("#daiBan > a > label").html(resultData.DBSL);
	});
	
	footer.find("#daiBan").click(function(){
		window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/message.html";
	});
	footer.find("#index").click(function(){
		window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/index.html";
	});
	footer.find("#personal").click(function(){
		window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/personal.html";
	});
});

function getZSL(func){
	var XmlData = {};
	//XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	XmlData["GZL08"] = 1;
	var ajaxJson = {};
	ajaxJson["async"] = true;
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectZSL.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
		}
		func(resultData);
	};
	JL.ajax(ajaxJson);
}