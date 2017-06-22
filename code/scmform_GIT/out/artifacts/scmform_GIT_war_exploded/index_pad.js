var userInfoCookie = $.cookie("userInfo");
var userInfo = JSON.parse(userInfoCookie);
var pubJsonCookie = $.cookie("pubJson");
var pubJson = JSON.parse(pubJsonCookie);
$(document).ready(function(){
	if(JL.isNull(userInfo)){
		var loginHtml = "login_pad.html";
		if(!JL.isNull(pubJson) && !JL.isNull(pubJson.loginHtml)){
			loginHtml = pubJson.loginHtml;
		}
		window.location.href = loginHtml;
	}
	//接受传送过来的数据，掉接口转换人员信息 {"FBID":"v5scm01","PERSON_ID":"00003"}
	aa={};
	//aa["FBID"]=$.cookie("FBID");
	//aa["PERSON_ID"]=$.cookie("PERSON_ID");
	aa["FBID"]="v5scm01";
	aa["PERSON_ID"]="00003";
	var bb = {};
	//alert(JSON.stringify(pubJson));
	bb["src"] = pubJson["ScmUrl"] +"WX_RYDL/selectRYXX.do?ds=v5scm01&rid="+Math.random();
	bb["data"] = {"XmlData":JSON.stringify(aa)};
	var resultData = JL.ajax(bb);
	//alert(JSON.stringify(resultData));
	if(!JL.isNull(resultData)){
		userInfo["RYXX"] = resultData["data"];
	}
	
	var rid = Math.random();
	loadMenu();
	
	var html = "营业员："+userInfo["RYXX"]["RYMC"]+"("+userInfo["RYXX"]["PERSON_ID"]+")，"+userInfo["RYXX"]["BMMC"];
	$(".jl_header > .page_title").html(html);
});

var getMenu = function(parent){
	var XmlData = {};
	XmlData["CZY01"] = userInfo["PCRM_CZY01"];
	XmlData["CD06"] = 3;
	if(!JL.isNull(parent)){
		XmlData["CD08"] = parent;
	}
	var ajaxJson={};
	ajaxJson["src"]="user/getMenu.do";
	ajaxJson["data"]={"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data.resultList;
	}
	return resultData;
}

var getXW = function(XmlData){
	var ajaxJson = {};
	ajaxJson["src"] = "CX/selectXW.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var XW = JL.ajax(ajaxJson);
	if(!JL.isNull(XW)){
		XW = XW["data"]["resultList"][0];
	}
	return XW;
}

var loadMenu = function(){
	var resultData = getMenu();
	if(!JL.isNull(resultData)){
		var left_nav = $(".jl_main > .left_nav > .left_nav_main");
		for(var i=0; i<resultData.length; i++){
			var row = resultData[i];
			var li = $("<li>").appendTo(left_nav);
			var tubiao = JL.isNull(row.CD10)? "fa-file-text-o": row.CD10;
			li.append("<a><i class='fa "+tubiao+"'></i><span>"+row.CD02+"</span></a>");
			li.data(row);
			li.click(function(){
				var config = $(this).data();
				loadPage(config);
			});
		}
		
		left_nav.find("li:first").click();
	}
}

var formatURL = function(config){
	var json = {};
	if(!JL.isNull(config["CD03"])){
		var CD03 = JSON.parse(config["CD03"]);
		if(!JL.isNull(CD03["querybh"])){
			json["url"] = "queryPages/FormQuery.html";
			json["bdym"] = "FormQuery";
		}else if(!JL.isNull(CD03["bdym"]) && !JL.isNull(CD03["url"])){
			json["url"] = CD03["url"];
			json["bdym"] = CD03["bdym"];
		}else{
			var formPath = JL.getFormURL(CD03["bdbh"]);
			json["url"] = formPath["url"];
		    json["bdym"] = formPath["bdym"];
		    var YWSJ = {};
		    YWSJ["bdbh"] = CD03["bdbh"];
		    YWSJ["jlbh"] = 0;
		    config["YWSJ"] = YWSJ;
		}
		json["config"] = config;
	}else{
		var XmlData = {};
		XmlData["GZL01"] = config["CD01"];
		XmlData["BZ01"] = config["BZ01"];
		var XW = getXW(XmlData);
		var formPath = JL.getFormURL(XW["YWSJ"]["bdbh"]);
		json["url"] = formPath["url"];
		json["bdym"] = formPath["bdym"];
		json["config"] = $.extend(config, XW);
	}
	
	json["random"] = $.md5("queryPage"+Math.floor(Math.random()*10000000)); 
	return json;
}

var loadPage = function(data){
	var json = formatURL(data);
	var config = json.config;
	
	$(".jl_main > .page_main > .jl_content").remove();
	var div = $("<div>").appendTo(".jl_main > .page_main");
	div.addClass("jl_content");
	
	div.attr("data-id", json.random);
	div.attr("data-name", json.bdym);
	div.data(config);
	div.load(json.url+"?rid="+Math.random(), function(){
		JL.loading(true);
		try {
			var name = $(this).attr("data-name");
			var config = $(this).data();
			var jl_form = eval(name);
			jl_form.setTab($(this)); 
			jl_form.setData(config["YWSJ"]);
			if(config["CS"] == true){
				jl_form.previewForm();
			} else if(!JL.isNull(config["CD03"])){
				jl_form.initForm();
			} else {
				config["INITFIELD"] = JSON.parse(config["JK03"])["field"];
				config["HIDEFIELD"] = JL.isNull(config["HFID"])? []: JSON.parse(config["HFID"])
				var skid = JL.isNull(config["SKID"])?"":config["SKID"];
				var pid = JL.isNull(config["PID"])?"":config["PID"];
				jl_form.setWorkflow(config["INITFIELD"],skid,pid);
				jl_form.setHideField(config["HIDEFIELD"]);
				jl_form.initForm();
			}
		} catch (e) {
			// TODO: handle exception
		}
		JL.loading(false);
	});
}