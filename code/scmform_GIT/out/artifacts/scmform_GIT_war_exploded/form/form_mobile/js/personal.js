var personal = null;
$(document).ready(function(){
	if(JL.checkLogin()){
		return false;
	}
	
	$(".jl_header").load("header.html");
	$(".jl_footer").load("footer.html");
	
	personal = JL.JLForm();
	personal.setTab($("body"));
	
	personal.setAfterInit(function(){
		personal.find("#PCRM_CZY03").html(userInfo.PCRM_CZY03);
		personal.find("#setting").click(function(){
			window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/setting.html";
		});
		personal.find("#logout").click(function(){
			sessionStorage.clear();
			localStorage.clear();
			$.cookie("userInfo", null,{path:"/"});
			//删除后台session
			var ajaxJson = {};
			ajaxJson["src"] = pubJson.getURL("FormUrl")+"/user/logout.do";
			ajaxJson["data"] = {"json":""};
			JL.ajaxCall(ajaxJson);
			if(typeof pubJson.logoutUrl == "undefined"){
				window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/login.html";
			}else{
				window.location.href = pubJson.logoutUrl;
			}
			
		});
	});
	
	personal.initForm();
});