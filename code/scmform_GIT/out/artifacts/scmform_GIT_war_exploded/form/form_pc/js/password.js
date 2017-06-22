var password = JL.JLForm();

password.setPlugin({
	"old": {
		"jlid": "JLInput",
		"type": "password",
		"placeholder":"6-20位英文字母、数字、字符等",
		"css": "w12",
		"listener":{
			"blur": function(value){
				debugger;
				if(JL.isNull(value)){
					tip_message("form-ymm-error","原密码不能为空","messcolor_red");
//					password.getPluginObj("old").tip("原密码不能为空");
				}else{
					$("#form-ymm-error").css("display","none");
				}
			}
		}
	},
	"new": {
		"jlid": "JLInput",
		"type": "password",
		"placeholder":"6-20位英文字母、数字、字符等",
		"css": "w12",
		"listener":{
			"blur": function(value){
				debugger;
				if(JL.isNull(value)){
					tip_message("form-new-error","新密码不能为空","messcolor_red");
//					password.getPluginObj("new").tip("新密码不能为空");
				}else if(password.getPluginObj("old").getData() == value){
					tip_message("form-new-error","新旧密码相同,请更换新密码","messcolor_red");
					return false;
//					password.getPluginObj("new").tip("新旧密码相同,请更换新密码");
				}else if(password.getPluginObj("new").getData().length <6 || password.getPluginObj("new").getData().length >20){
					tip_message("form-new-error","6-20位英文字母、数字、字符等","messcolor_red");
					return false;
				}else if(!isNaN(value)){
					tip_message("form-new-error","密码强度过弱不能全为数字","messcolor_red");
					return false;
				}else if(isAllLetter(value)){
					tip_message("form-new-error","密码强度过弱不能全为字母","messcolor_red");
					return false;
				}else{
					$("#form-new-error").css("display","none");
				}
			}
		}
	},
	"new2": {
		"jlid": "JLInput",
		"type": "password",
		"css": "w12",
		"placeholder":"与新密码保持一致",
		"listener":{
			"blur": function(value){
				if(password.getPluginObj("new").getData() != value){
					tip_message("form-new1-error","输入的新密码不一致","messcolor_red");
//					password.getPluginObj("new2").tip("输入的新密码不一致");
				}else{
					$("#form-new1-error").css("display","none");
				}
			}
		}
	}
});

password.setEvent([{
	"selector": "#update",
	"event": "click",
	"func": function(a,b,c,d,e){
		password.check();
	}
}, {
	"selector": "#reset",
	"event": "click",
	"func": function(a,b,c,d,e){
		password.getPluginObj("old").setData("");
		password.getPluginObj("new").setData("");
		password.getPluginObj("new2").setData("");
	}
}]);


password.check = function(){
	password.readData();
	if( JL.isNull(password.getData("old")) ){
		tip_message("form-ymm-error","原密码不能为空","messcolor_red");
//		password.getPluginObj("old").tip("原密码不能为空");
		return false;
	}else{
		password.getTab().find("[name='old']").focus();
	}
	
	if( JL.isNull(password.getData("new")) ){
		tip_message("form-new-error","新密码不能为空","messcolor_red");
//		password.getPluginObj("new").tip("新密码不能为空");
		return false;
	}else{
		password.getTab().find("[name='new']").focus();
	}
	
	if (password.getData("new") != password.getData("new2")) {
		tip_message("form-new1-error","输入的新密码不一致","messcolor_red");
//		password.getPluginObj("new2").tip("输入的新密码不一致");
		password.getTab().find("[name='new2']").focus();
		return false;
	} 
	if (password.getData("old") == password.getData("new")) {
		tip_message("form-new-error","新旧密码相同,请更换新密码","messcolor_red");
//		password.getPluginObj("new").tip("新旧密码相同,请更换新密码");
		password.getTab().find("[name='new']").focus();
		return false;
	} 
	
	if(!isNaN(password.getData("new"))){
		tip_message("form-new-error","密码强度过弱不能全为数字","messcolor_red");
		return false;
	}else if(isAllLetter(password.getData("new"))){
		tip_message("form-new-error","密码强度过弱不能全为字母","messcolor_red");
		return false;
	}

	var tem={};
	tem["CZY02"]=userInfo.PCRM_CZY02;
	tem["oldPasswd"] = password.getData("old");
	var ajaxJson = {};
	ajaxJson["src"] =pubJson.getURL("FormUrl") + "/user/checkPassword.do";
	ajaxJson["data"] = {"json":JSON.stringify(tem)};
	var resultData = JL.ajax(ajaxJson);
	resultData = resultData.data;
	if(resultData.MSGID == "E") {
		JL.tip("原密码错误");
		return;
	}else if(resultData.MSGID == "S"){
		password.update(password.getData("new"));
	}
}
password.update = function(password){
	var XmlData = {};
	XmlData["CZY01"] = userInfo["PCRM_CZY02"];
	XmlData["CZY02"] = password;
	var ajaxJson = {};
	ajaxJson["src"] = "user/updateMM.do?rid="+Math.random();
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data;
		if(resultData["MSGID"] == "E"){
			JL.tip(resultData["MESSAGE"]);
		}else if(resultData["STATE"] == "1"){
			alert("修改密码成功！");
			$.cookie("userInfo", null);
			if(pubJson.product=="O2O"){
				location.href=pubJson.getURL("FormUrl") +"/o2o/user/account/login.html";
			}else{
				location.href=pubJson.getURL("FormUrl") +"/login.html";
			}
			
		} else {
			JL.tip("修改密码失败！请重试...");
		}
	}
}

var tip_message = function(ID,str,color){
	$("#"+ID+"").removeClass();
	$("#"+ID+"").addClass(color);
	$("#"+ID+"").hide().slideDown().html(str);
};

var isAllLetter = function(str){
	var passLe =/^[A-Za-z]+$/; 
	if(passLe.test(str)){
		return true;
	}else{
		return false;
	}
	
}