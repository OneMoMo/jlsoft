//登录界面enter事件
document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==13){ // enter 键
		$("#loginBtn").click();
	}
};

var languageObj = {"data":{"key":""}};
if(!JL.isNull(pubJson.language)){
	languageObj = JL.initPlugIn($("#d_language"), "language", {
		"jlid": "JLSelect",
		"readonly": false,
		"noremove": true,
		"placeholder": "选择语言",
		"default": language,
		"options": pubJson.language,
		"listener": {
			"change": function(data){
				$.cookie("language", null);
				if(language != data.key){
					$.cookie("language", data.key, {path:"/"});
					window.location.href = pubJson.getURL("BaseUrl") + data.key+"/login.html";
				}
			}
		}
	});
}else{
	$("#d_language").closest("li").hide();
}
$(document).ready(function(){
	
	if(!JL.isNull(localStorage.getItem("uid"))){
		login({"uid": localStorage.getItem("uid")});
	}
	
	$("#CZY01").focus(function(){
		loginTip("请输入用户名");
	});
	$("#CZY01").blur(function(){
		if(this.value == ""){
			loginTip("请输入用户名");
		}else{
			loginTip("请输入密码");
		}
	});
	$("#CZY02").blur(function(){
		if(this.value == ""){
			loginTip("请输入密码");
		}else{
			loginTip("请登陆");
		}
	});
	$("#CZY01").focus();
	
	$("#loginBtn").click(function(){
		var CZY01 = $("#CZY01").val();
		var CZY02 = $("#CZY02").val();
		var FB01 = $("#FB01").val();
		if(JL.isNull(CZY01)){
			loginTip("用户名不能为空");
			return false;
		}else if(JL.isNull(CZY02)){
			loginTip("密码不能为空");
			return false;
		}else if(!$("#FB01").is(":hidden") && JL.isNull(FB01)){
			//loginTip("请选择接入方式");
			//return false;
		}
		
		var json={};
		json["CZY01"]=CZY01;
		json["CZY02"]=CZY02;
		if(!JL.isNull(FB01)){
			json["FB01"]=FB01;
		}
		login(json);
	});
});

var loginTip = function(str){
	$("#tip").show().html(str);
}

var login = function(json){
	if($(".fa-check-square").length == 1){
		json.remember = true;
	}
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/user/login.do";
	ajaxJson["data"] = {"json":JSON.stringify(json)};
	var resultData = JL.ajax(ajaxJson); 
	if(!JL.isNull(resultData)){
		resultData = resultData.data;
		if(resultData["STATE"] === 0){
			var str = "登录失败！用户名或密码错误";
			if(!JL.isNull(resultData.MESSAGE)){
				str = resultData.MESSAGE;
			}
			loginTip(str);
			if(resultData.uid == ""){
				localStorage.setItem("uid", "");
			}
			return false;
		}else if(JL.isNull(resultData["userInfo"])){
			loginTip("未经授权");
			return false;
		}else if(resultData["STATE"] === 1){
			if(!JL.isNull(resultData.uid)){
				localStorage.setItem("uid", resultData.uid);
			}
			saveUserInfoCookies(resultData["userInfo"]);
			saveUserConfigCookies(resultData["userConfig"]);
			saveUserHotListCookies(resultData["HOT_LIST"]);
			localStorage.userMenu = JSON.stringify(resultData.userMenu);
			if(pubJson.verification){
				window.location.href = pubJson.getURL("FormUrl")+"/form/form_pc/authentication.html";
			}else{
				window.location.href = pubJson.getURL("FormUrl")+"/index.html";
			}
		}
	}
}

var saveUserInfoCookies = function(resultData){
	var userData = {};
	userData["PCRM_CZY01"] = resultData["USERID"];
	userData["PCRM_CZY02"] = resultData["CZY01"];
	userData["PCRM_CZY03"] = resultData["CZY03"];
	userData["PCRM_CZY06"] = resultData["CZY06"];
	userData["PCRM_GW01"] = resultData["GW01"];
	userData["PCRM_GW02"] = resultData["GW02"];
	userData["PCRM_BM01"] = resultData["BM01"];
	userData["PCRM_BM02"] = resultData["BM02"];
	userData["PCRM_BM03"] = resultData["BM03"];
	userData["PCRM_BM_BM01"] = resultData["BM_BM01"];
	userData["PCRM_GSXX01"] = resultData["GSXX01"];

	userData["SCM_BM01"] = resultData["SCM_BM01"];
	
	userData["FORM_MRCD"] = resultData["MRCD"];//默认菜单
	userData["FORM_DCBJ"] = resultData["DCBJ"];//导出标记
	userData["skbj"] = resultData["SKBJ"];//受控标记
	userData["SessionID"] = resultData["SessionID"];
	
	userData["UPDATETIME"] = JL.formatDate(0,1);
	$.cookie("userInfo", null);
	$.cookie("userInfo", JSON.stringify(userData),{path:"/"});
}

var saveUserConfigCookies = function(resultData){
	var userConfig = JL.isNull(resultData)? {}: resultData;
	$.cookie("userConfig", null);
	$.cookie("userConfig", JSON.stringify(userConfig));
}

var saveUserHotListCookies = function(resultData){
	var userHotList = JL.isNull(resultData)? {}: resultData;
	$.cookie("userHotList", null);
	$.cookie("userHotList", JSON.stringify(userHotList));
}