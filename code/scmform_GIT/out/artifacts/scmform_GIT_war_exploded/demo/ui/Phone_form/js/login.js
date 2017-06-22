$(document).ready(function(){
	
	$("#loginBtn").click(function(){
		var CZY01 = $("#CZY01").val();
		var CZY02 = $("#CZY02").val();
		var FB01 = $("#FB01").val();
		if(!CZY01){
			alert("用户名不能为空!");
			return false;
		}else if(!CZY02){
			alert("密码不能为空!");
			return false;
		}else if(!$("#FB01").is(":hidden") && !FB01){
			//loginTip("请选择接入方式");
			//return false;
		}
		
		var json={};
		json["CZY01"]=CZY01;
		json["CZY02"]=CZY02;
		if(FB01){
			json["FB01"]=FB01;
		}
		login(json);
	});
});


var login = function(json){
	var ajaxJson = {};
	ajaxJson["src"] = "http://localhost:30800/form5/user/login.do?rid="+Math.random();
	ajaxJson["data"] = {"json":JSON.stringify(json)};
	var resultData = JL.ajax(ajaxJson); 
	if(resultData){
		resultData = resultData.data;
		if(resultData["STATE"] === 0){
			var str = "登录失败！用户名或密码错误";
			if(resultData.MESSAGE){
				str = resultData.MESSAGE;
			}
			alert(str);
			if(resultData.uid == ""){
				localStorage.setItem("uid", "");
			}
			return false;
		}else if(!resultData["userInfo"]){
			loginTip("未经授权");
			return false;
		}else if(resultData["STATE"] === 1){
			if(resultData.uid){
				localStorage.setItem("uid", resultData.uid);
			}
			saveUserInfoCookies(resultData["userInfo"]);
    		savePubJsonCookies(resultData["pubJson"]);
    		 
    		var userInfoCookie = $.cookie("userInfo");
    			var userInfo = JSON.parse(userInfoCookie);
    		console.info("JLmune.init");
    				var XmlData = {};
    				XmlData["CZY01"] = userInfo["PCRM_CZY01"];
    				XmlData["CD06"] = 4;
    				var ajaxJson={};
    		//		ajaxJson["async"] = true;
    				ajaxJson["src"]= "http://localhost:30800/form5/user/getMenu.do";
    				ajaxJson["data"]={"XmlData":JSON.stringify(XmlData)};
    				console.info(ajaxJson);
    				var resultData = JL.ajax(ajaxJson);
    				
    		console.info(resultData);
    		location.href=location.href.replace("login","index");
		}
		
		
	}
}



var saveUserInfoCookies = function(resultData){
	var userData = {};
	userData["PCRM_CZY01"] = resultData["USERID"];
	userData["PCRM_CZY02"] = resultData["CZY01"];
	userData["PCRM_CZY03"] = resultData["CZY03"];
	userData["PCRM_GW01"] = resultData["GW01"];
	userData["PCRM_GW02"] = resultData["GW02"];
	userData["PCRM_BM01"] = resultData["BM01"];
	userData["PCRM_BM02"] = resultData["BM02"];
	userData["PCRM_BM03"] = resultData["BM03"];
	userData["PCRM_BM_BM01"] = resultData["BM_BM01"];
	userData["PCRM_GSXX01"] = resultData["GSXX01"];
	
	userData["UPDATETIME"] = JL.formatDate(0,1);
	$.cookie("userInfo", null);
	$.cookie("userInfo", JSON.stringify(userData));
}

var savePubJsonCookies = function(resultData){
	$.each(resultData ,function(key,value){
		if(key.indexOf("Url")!=-1 && value.indexOf("http")==-1) 
			resultData[key] = location.protocol+"//"+location.hostname+value;
	});
	$.cookie("pubJson", null);
	$.cookie("pubJson", JSON.stringify(resultData));
}