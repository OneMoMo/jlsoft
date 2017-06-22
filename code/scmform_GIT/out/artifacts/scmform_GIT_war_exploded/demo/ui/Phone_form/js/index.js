$(function(){
	getDBSL();

});

var userInfoCookie = $.cookie("userInfo");
var userInfo = JSON.parse(userInfoCookie);
var getDBSL = function(){
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	var ajaxJson = {};
	ajaxJson["src"] = "http://localhost:30800/form5/CX/selectDBSL.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(resultData){
	  console.log(JSON.stringify(resultData))
     var data =resultData.data.returnList.length;
     $("#messageId").text(data);
     }
};