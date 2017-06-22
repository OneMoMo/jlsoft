var JL={};
var userInfoCookie = $.cookie("userInfo");
var userInfo = JSON.parse(userInfoCookie);
var userConfigCookie = $.cookie("userConfig");
var userConfig = JSON.parse(userConfigCookie) || {};
var userHotListCookie = $.cookie("userHotList");
var userHotList = JSON.parse(userHotListCookie) || {};
JL.JLForm = function (){
	return new JLForm();
}

//加载初始化路径
document.write("<script type='text/javascript' src='"+ pubJson.getURL("FormUrl") +"/jllib/jllib_base/js/JLPath.js'><\/script>");

JL.isPC = function(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

JL.getJsonKeyArr = function(json){
	var pros = [];
	for(var key in json){
	    pros.push(key);
	}
	return pros;
};

JL.getExcelData = function(MBBM,FILE){
	var XmlData = {};
	XmlData["MBBM"] = MBBM; // 取MongoDB中excel表的jlbh
	XmlData["FILE"] = FILE;
	var ajaxJson = {};
	ajaxJson["src"] = "excelHandler/getExcelData.do?rid="+ Math.random();
	ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	//console.info(resultData.data);
	return resultData;
}

JL.checkClient = function(client){
	if(JL.isNull(client)){
		var system = {};
		//检测平台
		if(JL.isPC()){
			system.pc = true;
		}else{
			system.mobile = true;
		}
		//system.pc = navigator.platform.indexOf("Win") != -1 || navigator.platform.indexOf("Mac") != -1;
		//system.pad = navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("iPad") != -1;
		//system.mobile = navigator.platform.indexOf("iphone") != -1;
		return system;
	}else{
		return JL.getClient() == client;
	}
}

JL.getClient = function(){
	var client = "pc";
	//检测平台
	if(JL.isPC()){
		client = "pc";
	}else{
		client = "mobile";
	}
	//system.pc = navigator.platform.indexOf("Win") != -1 || navigator.platform.indexOf("Mac") != -1;
	//system.pad = navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("iPad") != -1;
	//system.mobile = navigator.platform.indexOf("iphone") != -1;
	return client;
}

JL.checkInitField = function(key, form){
	if($.inArray(key, form.initField) != -1){
		return true;
	} else {
		return false;
	}
}

JL.setInitFieldData = function(form, data){
	$.each(data, function(key, value){
		if(JL.checkInitField(key, form)){
			if(!JL.isNull(form.getPluginObj(key))){
				if(JL.isNull(form.getPluginObj(key).getData())){
					form.getPluginObj(key).setData(value);
				}
			} else {
				if(JL.isNull(form.getTab().find("[name='"+key+"']").val())){
					form.getTab().find("[name='"+key+"']").val(value);
				}
			}
		}
	});
}

JL.checkLogin = function(){
	var client = JL.getClient();
	var href = "";
	if(client == "pc"){
		href = pubJson.getURL("FormUrl") + "/login.html";
		if(pubJson.product == "O2O"){
			href = pubJson.getURL("FormUrl") + "/o2o/user/account/login.html";
		}
		if(pubJson.pcLoginUrl){
			href = pubJson.pcLoginUrl;
		}
	}else{
		href = pubJson.getURL("FormUrl") + "/form/form_mobile/login.html";
		if(pubJson.mobileLoginUrl){
			href = pubJson.mobileLoginUrl;
		}
	}
	if(JL.isNull(userInfo)){
		window.location.href = href;
		return true;
	}
	
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/user/checkLogin.do";
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		var MSGID = resultData.data.MSGID;
		if(MSGID == "E"){
			window.location.href = href;
			return true;
		}
	}
	return false;
}

JL.top_up = function(money){
	var json = {};
	json["PayMoney"] = money;
	json["WLDW01"] = userInfo["PCRM_CZY02"];
	json["BM01"] = userInfo["PCRM_BM01"];
	
	window.open("InstantTradePay/formatParamater.do?XmlData="+JSON.stringify(json));
}

JL.random = function(str){
	str = JL.isNull(str)? "": str;
	return $.md5(str+Math.floor(Math.random()*10000000));
}

JL.tab = function(form, json, defaultTab){
	var obj = form.getTab().find(".jl_tab_title");
	obj.empty();
	var ul = $("<ul>").appendTo(obj);
	$.each(json, function(key, value){
		var li = $("<li>").appendTo(ul);
		li.attr("data-id", key);
		li.html(value);
		li.click(function(){
			$(this).siblings().removeClass("xuan");
			$(this).addClass("xuan");
			var data_id = $(this).attr("data-id");
			
			$(this).closest(".jl_tab_title").nextAll(".jl_form_02[id]").hide();
			$(this).closest(".jl_tab_title").nextAll(".jl_screening[id]").hide();
			$(this).closest(".jl_tab_title").nextAll("#"+data_id).show();
		});
	});
	
	if(!JL.isNull(defaultTab)){
		obj.find("li[data-id='"+defaultTab+"']").click();
	}else{
		obj.find("li:first").click();
	}
}

JL.message = function(obj, str, type){
	var icon = "", color="";
	if(JL.isNull(type) || type == "success"){
		icon = "fa-check-circle";
		color = "messcolor_green ";
	}else if(type == "error"){
		icon = "fa-times-circle";
		color = "messcolor_red";
	}
	
	obj.nextAll("label.message").remove();
	var message = $("<label class='message "+color+" ml10'><i class='fa "+icon+" mr5'></i></label>");
	message.append(str);
	obj.after(message);
	message.show();
}

JL.closeForm = function(bdmc) {
	$("li[data-name='"+bdmc+"']").find(".fa-times-circle").click();
}

JL.openForm = function(bdbh, jlbh) {
	var resultData = JL.checkForm(bdbh, jlbh);
	if(!JL.isNull(resultData)){
		if(resultData.MSGID == "E"){
			JL.tip(resultData.MESSAGE);
		}else{
			loadPage(resultData);
		}
	}
}

JL.checkForm = function(bdbh, jlbh) {
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/user/getFormConfig.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify({"bdbh": bdbh, "jlbh": jlbh})};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data;
		if(!JL.isNull(resultData.SK01)){
			resultData.CD01 = resultData.GZL01;
			resultData.CD02 = resultData.GZL02 + "("+ resultData.TBLNAME +"-"+ resultData.JLBH+")";
			resultData.YWSJ = {"bdbh": resultData.TBLNAME, "jlbh": resultData.JLBH, "PCRM_CH": false};
		}
	}
	return resultData;
}

JL.showImage = function (img) {
	var jl_modal = $("<div>").appendTo("body");
	jl_modal.addClass("jl_modal");
	jl_modal.fadeIn();
	var div = $("<div>").appendTo(jl_modal);
	div.addClass("image");
	div.css({"width":"100%","height":"100%"});
	div.click(function(e){
		if($(e.target).is("div")){
			$(this).closest(".jl_modal").fadeOut();
			$(this).remove();
		}
	});
	img = img.clone(false);
	img.attr("class", "");
	img.appendTo(div);
	img.css({"max-width":"1000px","max-height":"500px","position": "fixed", "top": "50%", "left": "50%"});
	var height = img.height()/2;
	var width = img.width()/2;
	img.css({"margin-top":-height+"px","margin-left":-width+"px"});
}

JL.progess = function(t){
	$(".jl_modal[progess]").remove();
	
	var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
	
	var jl_modal = $("<div>").appendTo(main);
	jl_modal.addClass("jl_modal");
	jl_modal.attr("progess", "");
	jl_modal.attr("data-id", JL.random());
	jl_modal.show();
	
	var jl_load = $("<div>").appendTo(jl_modal);
	jl_load.addClass("jl_load");
	var jl_loading = $("<div class='jl_loading'></div>").appendTo(jl_load);
	
	$("<i class='fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom'></i>").appendTo(jl_loading);
	var text = $("<span class='w12 mt20'>"+t+"</span>").appendTo(jl_loading);
	
	return {
		"progess": jl_modal,
		"text": text
	};
};

JL.tip = function(message, type, func){
	var tip = this;
	this.mobile = function(message, type){
		$(".jl_message").closest(".jl_modal[tip]").remove();
		
		var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
		
		this.jl_modal = $("<div>").appendTo(main);
		this.jl_modal.addClass("jl_modal");
		this.jl_modal.attr("tip", "");
		this.jl_modal.attr("data-id", JL.random());
		this.jl_modal.click(function(event){
			if(!$(event.target).hasClass("jl_message_close")){
				$(this).find("> .jl_message >.jl_message_close").click();
			}
		});
		this.jl_modal.fadeIn();
		this.jl_message = $("<div class='jl_message'></div>").appendTo(this.jl_modal);
		this.jl_message_title = $("<div class='jl_message_title'><i class='fa "+this.icon+" mr5'></i>提示</div>").appendTo(this.jl_message);
		this.jl_message_title.addClass(this.color);
		
		this.jl_message_main = $("<div class='jl_message_main'></div>").appendTo(this.jl_message);
		this.jl_message_main.append("<span>"+message+"</span>");

		this.jl_message_btn = $("<div class='jl_message_btn'></div>").appendTo(this.jl_message);
		this.okBtn = $("<span class='font_red w12'>确定</div>").appendTo(this.jl_message_btn);
		this.okBtn.click(function(){
			if(JL.isFunction(func)){
				func();
			}
		});
		//this.okBtn.click(function(){
		this.jl_message.click(function(){
			$(this).parent().remove();
		});
		/*this.cancelBtn = $("<span>取消</div>").appendTo(this.jl_message_btn);
		this.cancelBtn.click(function(){
			$(this).closest(".jl_modal").fadeOut();
			$(this).closest(".jl_message").animate({"margin-top":"0","opacity":"0"},function(){
				$(this).closest(".jl_modal").remove();
			});
		});
		this.jl_message_close = this.cancelBtn;*/
		this.jl_message_close = this.okBtn;
		
		this.jl_message.animate({"margin-top": - (this.jl_message.height()/2 + 10) + "px","opacity":"1"});
	};
	
	this.pc = function(message, type){
		if($(".jl_operation:not(:hidden)").length > 0 && $(".jl_modal_main:not(:hidden)").length == 0 && false){
			this.jl_message_main = $("<label class='message message_suspension'></label>").appendTo($(".jl_operation:not(:hidden)"));
			this.jl_message_main.addClass(this.messcolor);
			$("<i class='fa "+icon+" mr5'></i>").appendTo(this.jl_message_main);
			this.jl_message_main.append(this.message);
			this.div = $("<div>5s</div>").appendTo(this.jl_message_main);
			this.jl_message_close = $("<i class='fr message_close' title='关闭'>×</i>").appendTo(this.jl_message_main);
			this.jl_message_close.click(function(){
				$(this).closest(".message").remove();
			});
			
			this.jl_message_main.show();
		}else{
			//$(".jl_modal[tip] > .jl_message > .jl_message_close").click();
			$(".jl_modal[tip]").remove();
			
			var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
			
			this.jl_modal = $("<div>").appendTo(main);
			this.jl_modal.addClass("jl_modal");
			this.jl_modal.attr("tip", "");
			this.jl_modal.attr("data-id", JL.random());
			this.jl_modal.click(function(event){
				if(!$(event.target).hasClass("jl_message_close") && $(event.target).closest(".jl_message_main").length == 0){
					$(this).find("> .jl_message >.jl_message_close").click();
				}
			});
			this.jl_modal.fadeIn();
			this.jl_message = $("<div class='jl_message'></div>").appendTo(this.jl_modal);
			this.jl_message_close = $("<div class='jl_message_close hide' title='关闭'>×</div>").appendTo(this.jl_message);
			this.jl_message_close.click(function(){
				$(this).closest(".jl_modal").fadeOut();
				$(this).closest(".jl_message").animate({"margin-top":"0","opacity":"0"},function(){
					$(this).closest(".jl_modal").remove();
				});
			});
			this.jl_message_main = $("<div class='jl_message_main'></div>").appendTo(this.jl_message);
			this.jl_message_main.addClass(this.color);
			
			var html = message;
			
			var arr = html.match(/JL{(\S*)}JL/gm);
			if(arr != null && arr.length > 0){
				message = arr[0].replace("JL{", "").replace("}JL", "");
			}
			this.jl_message_main.append("<span class='pl20'><i class='fa "+this.icon+" position_a left0 ml20 mt5 '></i>"+message+"</span>");

			if(arr != null && arr.length > 0){
				html = html.replace("JL{", "").replace("}JL", "");
				html = html.replace(/ORA-/gm, "<br/>ORA-");
				html = html.replace("<br/>", "");
				var more = $("<a class='w12 pl20 pt10 mt10 bt1 font_blue '>查看详情</a>").appendTo(this.jl_message_main);
				more.click(function(){
					$(this).next().show();
				})
				this.jl_message_main.append("<p class='w12 pl20 mt10 hide'>"+html+"</p>");
			}
			
			this.div = $("<div class='ml10' style='display:inline-block;'>( 5s )</div>").appendTo(this.jl_message_main.find("span"));
			this.jl_message.animate({"margin-top":"35px","opacity":"1"});
		}
		
		
		if(!JL.isNull(this.si)){
			clearInterval(this.si);
		}
		var i=5;
		this.si = setInterval(function(){
			i--;
			if(i > 0){
				tip.div.html("( "+i+"s )");
			}else if(i == 0){
				clearInterval(tip.si);
				tip.jl_message_close.click();
			}
		},1000);
	}
	
	if(JL.isNull(type) || type == "success"){
		this.icon = "fa-check-circle";
		this.color = "font_green";
		this.messcolor = "messcolor_green";
	}else if(type == "error"){
		this.icon = "fa-times-circle";
		this.color = "font_red";
		this.messcolor = "messcolor_red";
	}else if(type == "warning"){
		this.icon = "fa-exclamation-triangle";
		this.color = "font_yellow";
		this.messcolor = "messcolor_yellow";
	}else if(type == "info"){
		this.icon = "fa-exclamation-circle";
		this.color = "font_blue";
		this.messcolor = "messcolor_blue";
	}
	
	this.jl_modal = null;
	this.jl_message = null;
	this.jl_message_close = null;
	this.div = null;
	
	if(JL.checkClient("mobile")){
		this.mobile(message, type);
	}else{
		this.pc(message, type);
	}
	
	var result = {
		"obj": this.jl_modal,
		"message": this.jl_message,
		"close": this.jl_message_close
	};
	
	return result;
};


JL.confirm = function(message, ok, cancel){
	$(".jl_modal[confirm]").remove();
	var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
	
	var jl_modal = $("<div>").appendTo(main);
	jl_modal.attr("confirm","");
	jl_modal.addClass("jl_modal");
	jl_modal.attr("data-id", JL.random());
	jl_modal.click(function(event){
		if(!$(event.target).hasClass("confirm_main") && !$(event.target).hasClass("confirm_main")){
			$(this).find("> .jl_message >.jl_message_close").click();
		}
	});
	jl_modal.show();
	
	var confirm_main = $("<div class='confirm_main'></div>").appendTo(jl_modal);
	var confirm_title = $("<div class='confirm_title'>提醒</div>").appendTo(confirm_main);
	var confirm_close = $("<i class='confirm_close'>×</i>").appendTo(confirm_title);
	confirm_close.click(function(){
		$(this).closest(".jl_modal").remove();
	});
	var confirm_body = $("<div class='confirm_body'></div>").appendTo(confirm_main);
	confirm_body.html(message);
	
	var confirm_btn = $("<div class='confirm_btn'></div>").appendTo(confirm_main);
	var times = $("<a class='jl_btn btn_color_or'><i class='fa fa-times mr5'></i>取消</a>").appendTo(confirm_btn);
	times.click(function(){
		$(this).closest(".jl_modal").remove();
		if(JL.isFunction(cancel)){
			cancel();
		}
	});
	var gavel = $("<a class='jl_btn btn_color'><i class='fa fa-gavel mr5'></i>确定</a>").appendTo(confirm_btn);
	gavel.click(function(){
		$(this).closest(".jl_modal").remove();
		if(JL.isFunction(ok)){
			ok();
		}
	});
	
	confirm_main.css("margin-top", (confirm_main.height()/-2) - 20);
}

JL.prompt = function(title, message, ok, cancel){
	var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
	
	var jl_modal = $("<div>").appendTo(main);
	jl_modal.addClass("jl_modal");
	jl_modal.show();
	jl_modal.attr("data-id", JL.random());
	jl_modal.click(function(event){
		if(!$(event.target).hasClass("confirm_main") && !$(event.target).hasClass("confirm_main")){
			$(this).find("> .jl_message >.jl_message_close").click();
		}
	});
	
	var confirm_main = $("<div class='confirm_main'></div>").appendTo(jl_modal);
	title = JL.isNull(title)? "标题": title;
	var confirm_title = $("<div class='confirm_title'>"+title+"</div>").appendTo(confirm_main);
	var confirm_close = $("<i class='confirm_close'>×</i>").appendTo(confirm_title);
	confirm_close.click(function(){
		$(this).closest(".jl_modal").remove();
	});
	var confirm_body = $("<div class='confirm_body'></div>").appendTo(confirm_main);
	confirm_body.html("<span class='w12'>"+message+"</span>");
	var input_span = $("<span class='w12'></span>").appendTo(confirm_body);
	var text = $("<input type='text' class='w12'>").appendTo(input_span);
	text.focus();
	
	var confirm_btn = $("<div class='confirm_btn'></div>").appendTo(confirm_main);
	var times = $("<a class='jl_btn btn_color_or'><i class='fa fa-times mr5'></i>取消</a>").appendTo(confirm_btn);
	times.click(function(){
		$(this).closest(".jl_modal").remove();
		if(JL.isFunction(cancel)){
			cancel();
		}
	});
	var gavel = $("<a class='jl_btn btn_color'><i class='fa fa-gavel mr5'></i>确定</a>").appendTo(confirm_btn);
	gavel.click(function(){
		var value = $(this).closest(".confirm_btn").prev().find(":text").val();
		if(JL.isFunction(ok)){
			if(ok(value)){
				$(this).closest(".confirm_btn").prev().find(":text").focus();
				return false;
			}
		}
		$(this).closest(".jl_modal").remove();
	});
	
	confirm_main.css({"margin-top": ((confirm_main.height()/-2) - 20) + "px"});
}

JL.popup = function(json, html){
	var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
	var jl_modal = $("<div class='jl_modal' popup>").appendTo(main);
	jl_modal.attr("data-id", JL.random());
	jl_modal.click(function(){
		//$(this).find("> .jl_message >.jl_message_close").click();
	});
	jl_modal.fadeIn();
	$("body").css("overflow-y","hidden");
	var jl_message = $("<div class='jl_message'></div>").appendTo(jl_modal);
	jl_message.click(function(){
		
	});
	
	var jl_message_close = $("<div class='jl_message_close'>×</div>").appendTo(jl_message);
	jl_message_close.click(function(e){
		$("body").css("overflow-y","auto");
		$(this).closest(".jl_modal").fadeOut();
		$(this).closest(".jl_message").animate({"margin-top":"0","opacity":"0"},function(){
			$(this).closest(".jl_modal").remove();
		});
		e.stopPropagation();
	});
	
	var jl_message_main = $("<div class='jl_message_main'></div>").appendTo(jl_message);
	jl_message_main.addClass("jl_form");
	
	if(!JL.isNull(html)){
		jl_message.removeClass("hide");
		jl_message.animate({"margin-top":"35px","opacity":"1"});
		jl_message_main.html(html);
	}else{
		var url = pubJson.getURL("FormUrl") + "/"+ json.page + "?rid=" + Math.random();
		jl_message_main.load(url,function(){
			jl_message.removeClass("hide");
			jl_message.animate({"margin-top":"35px","opacity":"1"});
			
			var jl_form = eval(json.form);
			jl_form.setTab($(this));
			if(!JL.isNull(json.data)){
				jl_form.setData(json.data);
			}
			if(JL.isFunction(json.init)){
				jl_form.setAfterInit(json.init);
			}
			jl_form.initForm();
			
		});
		
		var jl_message_btn = $("<div class='jl_message_btn'></div>").appendTo(jl_message);
		var ok_btn = $("<a class='jl_btn btn_color mr5'><i class='fa fa-gavel mr5'></i>确定</a>").appendTo(jl_message_btn);
		ok_btn.click(function(){
			if(JL.isFunction(json.ok)){
				var formData = {};
				if(!JL.isNull(json.form)){
					var jl_form = eval(json.form);
					jl_form.readData();
					formData = jl_form.getData();
				}
				if(json.ok(formData)){
					return false;
				}
			}
			$(this).closest(".jl_message").find("> .jl_message_close").click();
		});
		
		var cancel_btn = $("<a class='jl_btn btn_color'><i class='fa fa-times mr5'></i>取消</a>").appendTo(jl_message_btn);
		cancel_btn.click(function(){
			$(this).closest(".jl_message").find("> .jl_message_close").click();
		});
	}
}

JL.window = function(url, modalField, afterLoad){
	var main = $(".pagr_content:not(:hidden)").width() == $("body").width()? $(".pagr_content:not(:hidden) > div:first"): $("body");
	var jl_modal = $("<div>").appendTo(main);
	jl_modal.addClass("jl_modal");
	jl_modal.attr("window", "");
	jl_modal.attr("data-id", JL.random());
	jl_modal.click(function(event){
		if(!$(event.target).hasClass("jl_message_close")){
			$(this).find("> .jl_message >.jl_message_close").click();
		}
	});
	jl_modal.fadeIn();
	$("body").css("overflow-y","hidden");
	var jl_modal_main = $("<div class='jl_modal_main'></div>").appendTo(jl_modal);
	var modal_close = $("<div class='modal_close'></div>").appendTo(jl_modal_main);
	modal_close.click(function(){
		$("body").css("overflow-y","auto");
		
		$(this).closest(".jl_modal").fadeOut();
		$(this).closest(".jl_modal_main").animate({"margin-top":"0","opacity":"0"},function(){
			$(this).closest(".jl_modal").remove();
		});
	});
	var modal_main = $("<div class='modal_main'></div>").appendTo(jl_modal_main);
	modal_main.load(url,function(){
		jl_modal_main.removeClass("hide");
		jl_modal_main.animate({"margin-top":"35px","opacity":"1"});
		
		if(JL.isFunction(afterLoad)){
			afterLoad($(this));
		};
		
		$(this).find("> .max_modal_main > .modal_title > span").click(function(){
			$(this).closest(".modal_main").prev().click();
		});
	});
}

JL.showCard = function(obj){
	$("body").css("overflow-y","hidden");
	obj.animate({"left":"0","opacity":"1"},300);
	obj.find("> .jl_defCar_header > .close").unbind();
	obj.find("> .jl_defCar_header > .close").bind("click", function(){
		$("body").css("overflow-y","auto");
		obj.animate({"left":"-100%","opacity":"0"},300);
	});
}

JL.addZero = function(obj, length){
	length = length - obj.toString().length;
	for(var i=0; i<length; i++){
		obj = "0" + obj;
	}
	return obj.toString();
}

JL.formatNumber = function(str, length){
	str = str.toString();
	if(length == undefined){
		length = 2;
	}
	str = Number(str).toFixed(length);
	
	var split = str.toString().split(".");//按小数点分成2部分
	var number = split[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");

	if(length > 0){
		var decimal = split[1];
		return number + "." + decimal;//再将小数部分合并进来
	}else{
		return number;//再将小数部分合并进来
	}
}

JL.formatDate = function(addDay,time){ 
	var d = new Date();
	if(addDay instanceof Date){
		d = addDay;
	}else{
		d.setDate(d.getDate()+addDay*1);//当前日期+几天
	}
	var str=''; 
	var FullYear = d.getFullYear();
	var Month = d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1;
	var Day = d.getDate()<10?'0'+d.getDate():d.getDate();
	var Hours = d.getHours()<10?'0'+d.getHours():d.getHours();
	var Minutes = d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
	var Seconds = d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();
	str +=FullYear+'-'; //获取当前年份 
	str +=Month+'-'; //获取当前月份（0——11） 
	if(time==1){
		str +=Day;
	}else if(time==2){
		str +=Day+' '; 
		str +=Hours+':'; 
		str +=Minutes+':'; 
		str +=Seconds; 
	}
	return str; 
} 

//获取增加时间后的日期
JL.getDay = function(addDayCount){
	var dd = new Date();
	dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
	var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
	return y+"-"+m+"-"+d;
}

//获取时间星期几，格式：yyyy-MM-dd
JL.getWeek = function(day){
	var dateArr = day.split("-");
	var date = dateArr[1]+"/"+dateArr[2]+"/"+dateArr[0]; 
    var day = new Date(Date.parse(date)); 
    var today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');  
    var week = today[day.getDay()];
	return week;
}

JL.getType = function(str){
	if(typeof str == "undefined"){
		return "undefined";
	}else if(str == null){
		return "null";
	}else if(typeof str == "string" && (str === "" || str === "undefined" || str === "null")){
		return "string";
	}else if(typeof str == "object" && $.isArray(str) && str.length == 0){
		return "list";
	}else if(typeof str == "object" && $.isEmptyObject(str)){
		return "map";
	}
}

JL.isNull = function(str){
	if(typeof str == "undefined"){
		return true;
	}else if(str == null){
		return true;
	}else if(typeof str == "string" && (str === "" || str === "undefined" || str === "null")){
		return true;
	}else if(typeof str == "object" && $.isArray(str) && str.length == 0){
		return true;
	}else if(typeof str == "object" && $.isEmptyObject(str)){
		return true;
	}else{
		return false;
	}
}

JL.isColumnRepeat = function(arr, json){
	for(var i=0;i<arr.length;i++){
		var size = 0; 
		var repeatSize = 0; 
		$.each(json, function(key, value){
			if(arr[i][key] == value){
				repeatSize++;
			}
			size++;
		});
		
		if(size > 0 && size == repeatSize){
			return true;
		}
	}
	return false;
}

JL.isFunction = function(func){
	if(!JL.isNull(func) && typeof func == "function"){
		return true;
	}else{
		return false;
	}
}

JL.isString = function(str){
	if( typeof str == "string" )
		return true;
	else
		return false;
}

JL.isNumber = function(value){
    if(isNaN(value)){
		return false;
    }else{
    	return true;
    }
}

JL.isNumberLetter = function(value){
	var reg = /^[0-9a-zA-Z]*$/g;
	if(reg.test(value) && !JL.isNull(value)){
		return true;
	}else{
		return false;
	}
}

JL.isEmail = function(value){
	var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; //,//邮箱
	if(regEmail.test(value) && !JL.isNull(value)){
		return true;
	}else{
		return false;
	}
}

JL.isPhone = function(value){
	var regMobile = /^0?1[3|4|5|7|8][0-9]\d{8}$/; //手机
	if(!JL.isNull(value) && !isNaN(value) && regMobile.test(value)){
		return true;
	}else{
		return false;
	}
}

JL.changeClass = function(obj,o,n){
	$(obj).removeClass(o);
	$(obj).addClass(n);
}

JL.ajaxCall = function(json){
	var contentType = JL.isNull(json.contentType) ? "" : json.contentType;
	var async = JL.isNull(json.async) ? false : true;
	var callback = JL.isNull(json.callback) ? null : json.callback;
	var type = JL.isNull(json.type) ? "POST" : "GET";
	var src = JL.isNull(json.src) ? pubJson.getURL("FormUrl") : json.src;
	var url = JL.isNull(json.url) ? "" : json.url;
	var data = JL.isNull(json.data) ? {} : json.data;
	data["sid"]=Math.random();
	if(!JL.isNull(userInfo) && !JL.isNull(userInfo.SessionID)){
		data["SessionID"] = userInfo.SessionID;
	}
	if(pubJson.SIGN_CODE){
		$.extend(data, JL.getUrlParams(src+url));
		data["timestamp"] = new Date().getTime();
		var arr = [];
		$.each(data, function(key, value){
			arr.push(key);
		});
		arr.sort();
		var str = "";
		for(var i=0; i<arr.length; i++){
			str += arr[i] + data[arr[i]];
		}
		data["sign"] = $.md5(pubJson.SIGN_CODE+str+pubJson.SIGN_CODE); 
	}
	
	var ajaxJson = {};
	if(contentType!="")ajaxJson["contentType"]=contentType;
	ajaxJson["async"]=async;
	ajaxJson["type"]=type;
	ajaxJson["url"]=src+url;
	ajaxJson["data"]=data;
	ajaxJson["error"]=function(XMLHttpRequest,B,C,D) {
		returnData = [];
	}
	ajaxJson["success"]=function(data) {
		try {
			returnData = typeof data=="object"? data: JSON.parse(data);
			if(callback!=null && typeof callback == "function"){
				callback(returnData);
			}
		}catch (e) {
			if(data.indexOf("Exception") != -1){
				if(data.indexOf("RuntimeException") != -1){
					data = data.replace(/Exception: java.lang.RuntimeException:/gm,'提示: ');
				}else{
					data = data.replace(/Exception: java.lang.Exception:/gm,'提示: ');
				}
			}
			returnData={};
			returnData["error"] = data;
		}
	};
	var returnData=null;
	$.ajax(ajaxJson);
	return returnData;
}

JL.getUrlParams = function(src){
	var arr = {};
	var paramaters = src.substring(src.indexOf("?")+1, src.length);
	if(src.indexOf("?") != -1 && !JL.isNull(paramaters)){
		paramaters = paramaters.split("&");
		for(var i=0; i<paramaters.length; i++){
			var paramater = paramaters[i];
			var p_key = paramater.substring(0, paramater.indexOf("="))
			var p_value = paramater.substring(paramater.indexOf("=")+1, paramater.length)
			arr[p_key] = p_value;
		}
	}
	return arr;
}

JL.ajax = function(json,loading){
	if(json.src.indexOf(".do")==-1){
		return JL.ajaxCall(json);
	}
	var contentType = JL.isNull(json.contentType) ? "" : json.contentType;
	var async = JL.isNull(json.async) ? false : json.async;
	var callback = JL.isNull(json.callback) ? null : json.callback;
	var type = JL.isNull(json.type) ? "POST" : "GET";
	var src = JL.isNull(json.src) ? pubJson.getURL("FormUrl") : json.src;
	var url = JL.isNull(json.url) ? "" : json.url;
	var data = JL.isNull(json.data) ? {} : json.data;
	data["sid"] = Math.random();
	if(!JL.isNull(userInfo) && !JL.isNull(userInfo.SessionID)){
		data["SessionID"] = userInfo.SessionID;
	}
	if(pubJson.SIGN_CODE){
		$.extend(data, JL.getUrlParams(src+url));
		data["timestamp"] = new Date().getTime();
		var arr = [];
		$.each(data, function(key, value){
			arr.push(key);
		});
		arr.sort();
		var str = "";
		for(var i=0; i<arr.length; i++){
			str += arr[i] + data[arr[i]];
		}
		data["sign"] = $.md5(pubJson.SIGN_CODE+str+pubJson.SIGN_CODE); 
	}
	
	var ajaxJson = {};
	if(contentType!="")ajaxJson["contentType"]=contentType;
	ajaxJson["async"]=async;
	ajaxJson["type"]=type;
	ajaxJson["url"]=src+url;
	ajaxJson["data"]=data;
	ajaxJson["error"]=function(XMLHttpRequest,B,C,D) {
		var tips = "";
		if(XMLHttpRequest.status == 404){
			tips = "服务器连接失败";
		}else if(XMLHttpRequest.status == 500){
			tips = "服务器内部错误";
		}else{
			tips = XMLHttpRequest.statusText;
		}
		if(json.alert == true){
			alert(tips);
		}else{
			JL.tip(tips, "error");
		}
		if(JL.isFunction(json.error)){
			json.error();
		}
	}
	ajaxJson["success"]=function(data) {
		try {
			returnData = typeof data=="object"? data: JSON.parse(data);
			if(callback!=null && typeof callback == "function"){
				if(!JL.isNull(returnData) && !JL.isNull(returnData.data)){
					callback(returnData);
				}
			}
		} catch (e) {
			if(data.indexOf("没有登录") != -1){
				alert("请重新登录");
				window.location.href="login.html";
				return false;
			}
			if(data.indexOf("Exception") != -1){
				if(json.alert == true){
					alert(data);
				}else{
					if(data.indexOf("RuntimeException") != -1){
						data = data.replace(/Exception: java.lang.RuntimeException:/gm,'操作失败: ')
						JL.tip(data, "info");
					}else{
						data = data.replace(/Exception: java.lang.Exception:/gm,'操作失败: ')
						JL.tip(data, "error");
					}
				}
				if(JL.isFunction(json.error)){
					json.error();
				}
			}else{
				returnData = data;
			}
		}
	};
	
	var returnData=null;
	$.ajax(ajaxJson);
	return returnData;
}

JL.getPagingData = function (filename, size ,trust) {
	var XmlData = {};
	XmlData["filename"] = filename;
	XmlData["size"] = size;
	var ajaxJson = {};
	var src = pubJson.getURL("FormUrl")+"/JLInterface/getPagingData.do";
	if(!JL.isNull(trust) && trust==true){
		src = pubJson.getURL("FormUrl")+"/trust/o2o/searchHandler/getPagingData.do";
	}
	ajaxJson["src"] = src;
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		try{
			resultData = JSON.parse(resultData.data.returnList);
		}catch(e){
			resultData = resultData.data.returnList;
		}
	}else{
		resultData = []
	}
	return resultData;
}

JL.downloadTemplate = function (filename, keys, key) {
	
	var XmlData = {
		"showBracket": key || 0, //是否导出对应字段主键
		"filename": filename, //文件名
	};
	if(typeof keys != "object"){
		XmlData["jlbh"] = keys;//模版编号
	}else{
		XmlData["keys"] = keys;//字段中文对照
	}
	JL.download(pubJson.getURL("FormUrl") + "/excelHandler/downloadTemplate.do", {"XmlData": JSON.stringify(XmlData)});	
}

JL.download = function (url, data, method) {
	if (url && data) { // data 是 string 或者 array/object
		$("[data-download]").remove();
		var iframe = $("<iframe>");
		iframe.attr("data-download","true");
		iframe.css("display","none");
		iframe.appendTo("body");
		var form = $("<form>");
		form.attr("id", "downloadForm");
		form.attr("action", url);
		form.attr("method", (method || 'post'));
		form.appendTo(iframe.contents().find("body"));
		$.each(data, function (key,value) {
			var input = $("<input>");
			input.attr("type", "hidden");
			input.attr("name", key);
			input.val(value);
			input.appendTo(form);
	    });
		var input = $("<input>");
		input.attr("type", "hidden");
		input.attr("name", "SessionID");
		input.val(userInfo.SessionID);
		input.appendTo(form);
		form.submit();
		//iframe.remove();
	};
}

JL.getFormURL = function(bdbh,ymbh){
	var json = {};
	json["src"] = pubJson.getURL("FormUrl") + "/form/getFormURL.do";
	var data = {};
	data["bdbh"] = bdbh;
	if(!JL.isNull(ymbh)){
		data["ymbh"] = ymbh;
	}
	var system = JL.checkClient()
	if(system.mobile){
		data["client"] = "phone";
	}else if(system.ipad){
		data["client"] = "pad";
	}
	json["data"] = data;
	var resultData = JL.ajax(json);
	if(resultData != null){
		resultData = resultData.data;
		if(resultData.url.indexOf("http") == -1){
			resultData.url = pubJson.getURL("FormUrl") + "/" + resultData.url;
		}
	}
	return resultData;
}

JL.disabledClass = function(selector,disabled){
	if(disabled){
		$(selector).addClass("none");
		$(selector).attr("disabled","disabled");
	}else{
		$(selector).removeClass("none");
		$(selector).removeAttr("disabled");
	}
}


//IFrame重新加载高度
JL.resizeIFrame = function(obj){
	var iframe= $(obj);
	var iframeName= $(obj).attr("name");
    var innerHTML = eval("document."+iframeName) ? eval("document."+iframeName).document : iframe.contentDocument;
    if(iframe != null && innerHTML != null) {
    	$(obj).height(innerHTML.body.scrollHeight);
	}
}

JL.formatString = function(value){
	if( typeof value == "string" 
		&& value.indexOf("key") != -1  
		&& value.indexOf("value") != -1 ){
		value = JSON.parse(value)["key"];
	}else if( typeof value == "object" ){
		value = value["key"];
	}
	return value;
}
JL.formatObject = function(value){
	if( typeof value == "string"){ 
		if( value.indexOf("key") != -1 && value.indexOf("value") != -1 ){
			value = JSON.parse(value);
		}else if( value.indexOf("KEY") != -1 && value.indexOf("VALUE") != -1 ){
			value = JSON.parse(value);
		}else if( value.indexOf("key") == -1 && value.indexOf("value") == -1 ){
			value = {"key":value,"value":value};
		}
	}
	return value;
}
JL.formatArray = function(value){
	if(typeof value == "string"){ 
		if( value.indexOf("[") != -1 && value.indexOf("]") != -1 ){
			value = JSON.parse(value);
		}else{
			value = [];
		}
	}
	return value;
}

JL.loading = function(state){
	if(state){
		$(".loading").fadeIn();
	}else{
		$(".loading").fadeOut();
	}
}

JL.light = function(obj){
	$(obj).addClass("box_shadow_show");  
	var top = $(obj).offset().top - 200;
	$("body,html").animate({scrollTop:top},1000);  
	setTimeout(function(){
		$(obj).removeClass("box_shadow_show");  
	},3000);  
}

JL.callback = function(config, jsonData, form){
	if(!JL.isNull(config.listener) && !JL.isNull(config.listener.beforecallback)){
		try{
			var bcb = config.listener.beforecallback(jsonData);
			if(bcb != undefined){
				jsonData = bcb;
			}
		}catch(e){
			console.error(e);
		}
	}
	
	if(!JL.isNull(config.fieldMapping)){
		for(var i=0; i<jsonData.length; i++){
			var rowData = jsonData[i];
			var rowNew = {};
			var grid = null;
			$.each(rowData, function(key,value){
				if(typeof value == "string" 
					&& value.indexOf("[") == 0 
					&& value.indexOf("]") != -1 ){
					value = JSON.parse(value);
				}
				var name = config.fieldMapping[key];
				
				if(!JL.isNull(name)){
					var name_split = name.split(".");
					if(name_split.length == 1){
						JLQuery.write(name,value,form);
					}else if(name_split.length == 2){
						grid = config.form.getPluginObj(name_split[0]);
						rowNew[name_split[1]] = value;
					}
				}else{
					if(typeof value == "object" && $.isArray(value)){
						for(var j=0; j<value.length; j++){
							var detailRow = value[j];
							var detailRowNew = {};
							var grid1 = null;
							if(typeof detailRow == "object"){
								$.each(detailRow, function(key1,value1){
									var name1 = config.fieldMapping[key+"."+key1];
									if(!JL.isNull(name1)){
										var name_split1 = name1.split(".");
										var gridName = name_split1[0];
										var fieldName = name_split1[1];
										grid1 = config.form.getPluginObj(gridName);
										detailRowNew[fieldName] = value1;
									}
								});
							}
							
							if(!JL.isNull(grid1)){
								$.extend(detailRowNew, rowNew);
								grid1.addRow(detailRowNew);
							}
						}
					}
				}
			});
			
			if(!JL.isNull(grid)){
				if(!(!JL.isNull(rowData.item) && rowData.item.length > 0)){
					if(config.update && i == 0){
						var lastActive = grid.getSelectedIndex()[0];
						grid.setRow(rowNew,lastActive);
					}else{
						grid.addRow(rowNew);
					}
				}
			}
		}
	} else {
		JLQuery.hide(jsonData);
	}
	
	$(".jl_modal .modal_close").click();

	if(!JL.isNull(config.listener) && !JL.isNull(config.listener.aftercallback)){
		try{
			config.listener.aftercallback(jsonData);
		}catch(e){
			console.error(e);
		}
	}
}

JL.getSqlMap = function(json){
	var dir = "context";
	if(!JL.isNull(json.dir)){
		dir = json.dir;
	}
	var namespace = json.namespace;
	var sqlid = json.sqlid;
	if(!JL.isNull(namespace) && $("script[src*='/"+namespace+".js']").length==0){
		var src = pubJson.getURL("FormUrl") + "/"+dir+"/"+namespace+".js";
		$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
	}
	
	var sqlMap = eval(namespace+"_"+sqlid);
	sqlMap.sqlid = namespace+"."+sqlid;
	
	return sqlMap;
}

JL.changePrintTmp = function(obj,dymb,bdbh,jlbh,XmlData){
	var dybh=$(obj).val();
	var url="formPrint/findFormPrint.do?dybh="+dybh+"&dymb="+JSON.stringify(dymb)+"&jlbh="+jlbh+"&bdbh="+bdbh+"&XmlData="+JSON.stringify(XmlData).replace(/%/gm,"%25").replace(/&/gm,"%26");
	location.href=url;
}
JL.print = function(dybh,data,target){
	sessionStorage["PRINT_DATAS"] = JSON.stringify(data);
	if(target == "auto"){
		debugger;
		$("div.autoprint").remove();
		var div = $("<div>").appendTo($("body"));
		div.addClass("autoprint hide");
		div.load("autoprint.html?dybh="+dybh, function(){
			$("#print_main").attr("style","");
			
			var json = {};
			json["src"] = "form/find.do";
			json["data"] = {"XmlData":JSON.stringify({
				"collection": "formPrint",
				"query": {
					"dybh": dybh.toString()
				}
			})};
			var resultData = JL.ajax(json);
			if(!JL.isNull(resultData)){
				resultData = resultData["data"]["returnList"];
				for(var i=0; i<resultData.length; i++){
					var row = resultData[i];
					if(!JL.isNull(row["default"])){
						changeTemp(row);
					}
				}
			}
		});
	}else{
		window.open("print.html?dybh="+dybh);
	}
}

JL.fullScreen = function(elem){
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	}
};

JL.exitFullScreen = function(elem){
	if (document.exitFullscreen) {
	    document.exitFullscreen();
	}
	else if (document.mozCancelFullScreen) {
	    document.mozCancelFullScreen();
	}
	else if (document.webkitCancelFullScreen) {
	    document.webkitCancelFullScreen();
	}
	else if (document.msExitFullscreen) {
	    document.msExitFullscreen();
	}
};

JL.diKaErJi = function(all){
	/*var aa=[1,2];
	var bb = [7];
	var cc = [4,8];
	var dd = [1,2,3];
	var all=[aa,bb,cc,dd]; //有多少数组都集起来
*/	
	var i=all.length;
	var abc = [];

	var arrl = function(arr,k,str){
	    if(k>=i){
	        return false;
	    }else{
	        var a=arr[k];
	        if(k==i-1){
	            for(var l=0;l<a.length;l++){
	            	if(JL.isNull(str)){
	            		str = "[";
	            	}
	            	var string = "";
	            	if(typeof a[l] == "string"){
	            		string = str + "\""+a[l]+"\"";
	            	}else{
	            		string = str + JSON.stringify(a[l]);
	            	}
	            	var cba = JSON.parse(string + "]");
	                abc.push(cba);
	            }
	        }else{
	            for(var l=0;l<a.length;l++){
	                if(k==0){str="["};
	                var string = "";
	                if(typeof a[l] == "string"){
	                	string = str+"\""+a[l]+"\",";
	                }else{
	                	string = str + JSON.stringify(a[l]) +",";
	                }
	                var b=k+1;
	                arrl(arr,b,string);
	            }
	        }
	    }
	}
	arrl(all,0,"");
	console.info(abc);
	return abc;
}

/*//页面间通过URL传值 
$.getUrlParam = function(name)
	{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) 
		return decodeURI(r[2]); 
		return null;
}*/

//获取中文拼音首字母
JL.convertToPinYin=function(str, all){
	if(all == 0){
		//全拼
		return pinyin.getFullChars(str).toUpperCase();
	}else if(all == 1){
		//首字母
		return pinyin.getCamelChars(str);
	}else{
		//首字母数组
		return [pinyin.getCamelChars(str)];
	}
}

JL.checkJS = function(src){
	var boolean = true;
	$.ajax({ 
		url: src, 
		type:'HEAD', 
		async: false,//使用同步的方式,true为异步方式
		error: function() {
			boolean = false;
		}, 
		success: function() {
			boolean = true;
		} 
	});
	return boolean;
}

JL.getCurrentForm = function(){
	var data_name = $(".pagr_content:not(:hidden)").attr("data-name");
	if(!JL.isNull(data_name)){
		return eval(data_name); 
	}
}

JL.initQueryPlugin = function(ul, pluginConfig){
	var data_name = null;
	if($(".jl_modal:not(:hidden) > .jl_modal_main:not(:hidden)").length > 0){
		data_name = "commonQuery";
	}else{
		data_name = ul.closest(".pagr_content[data-name]").attr("data-name");
	}

	if(!JL.isNull(data_name)){
		var form = eval(data_name);
		form.plugin = pluginConfig;
		form.initPlugIn();
	}
}

JL.getPluginObj = function(selector){
	return $(selector).data("plugin");
}

JL.loadDetailGrid = function(obj, config){
	var plugin = JL.getPluginObj(obj.closest("[id^='d_']"));
	if(JL.isFunction(plugin.loadDetailGrid)){
		plugin.loadDetailGrid(obj, config);
	}
}

JL.attachmentView = function(obj){
	var plugin = JL.getPluginObj(obj.closest("[id^='d_']"));
	if(!JL.isNull(plugin.data)){
		var rowIndex = obj.closest("dl[data-index]").attr("data-index");
		JL.window(pubJson.getURL("FormUrl") + "/form/form_pc/fileview.html?rid="+Math.random(),{}, function(obj){
			fileview.setTab(obj);
			var data = plugin.data[rowIndex];
			delete data["bdbh"];
			delete data["jlbh"];
			fileview.setData(data);
			fileview.initForm();
		});
	}
}

JL.initPlugIn = function(obj, key, value, initValue, initField, hideField, form){
	obj.empty();
	//try{//引入及控件JS
		var rid = Math.random();
		if(!JL.isNull(value["jlid"]) && $("script[src*='"+value["jlid"]+".js']").length==0){
			var pluginConfig = JL.Plugin[value["jlid"]];
			var path = pluginConfig.path;
			var version = pluginConfig.version;
			//$(document).find("body").append("<script type='text/javascript' src='"+path+value["jlid"]+".js?version="+version+"'><\/script>");
			$(document).find("body").append("<script type='text/javascript' src='"+path+value["jlid"]+".js?version="+Math.random()+"'><\/script>");
		}
		var JLID = eval(value["jlid"]);
		if(!JL.isNull(JLID)){
			if( typeof JLID == "function" ){
				var json = value;
				json["id"] = key;
				json["obj"] = obj;
				json["form"] = form;
				
				JLID = new JLID(json);
				
				var INITFIELD = JL.isNull(initField)? []: initField;
				if(!JL.isNull(initField)){
					var str = JSON.stringify(INITFIELD);
					if(json.jlid == "JLGrid"){
						var disabledKey = {};
						if(str.indexOf(key) != -1){
							for(var i=0;i<initField.length;i++){
								var split = initField[i].split(".");
								if(split[0] == key){
									disabledKey[split[1]] = false;
								}
							}
						}
						JLID.disabled(disabledKey);
					}else if($.inArray(key, INITFIELD) == -1){
						JLID.disabled();
					} 
				}
				
				var HIDEFIELD = JL.isNull(hideField)? []: hideField;
				if(!JL.isNull(hideField)){
					var str = JSON.stringify(HIDEFIELD);
					if(json.jlid == "JLGrid"){
						var hideKey = [];
						if(str.indexOf(key) != -1){
							for(var i=0;i<hideField.length;i++){
								var split = hideField[i].split(".");
								if(split[0] == key){
									hideKey.push(split[1]);
								}
							}
						}
						JLID.hide(hideKey, true);
					}else if($.inArray(key, HIDEFIELD) != -1){
						JLID.hide();
					} 
				}

				if(!JL.isNull(initValue)){
					JLID.setData(initValue);
				}
				
				if(!JL.isNull(form)){
					form.pluginObj[key] = JLID;
				}
				
				obj.data("plugin", JLID);
				return JLID;
			}else if(JLID["version"] == 2){
				var json = {};
				json["obj"] = obj;
				json["zdid"] = key;
				json["value"] = initValue;
				//json["tab"] = form.getTab();
				json["config"] = value;
				var INITFIELD = JL.isNull(initField)? []: initField;
				var HIDEFIELD = JL.isNull(hideField)? []: hideField;
				json["INITFIELD"] = INITFIELD;
				json["HIDEFIELD"] = HIDEFIELD;
				JLID.init(json);
			}
		}
	//}catch(e){
	//	console.info("字段名为"+key+"的控件报错信息为:"+e.message);	
	//}
}

//页面存url
JL.setUrlParam=function(val){
	var obj ={};
	obj["url"]=val;
	JL["UrlParam"]=obj;
}

//页面间通过URL传值 
/**
JL.getUrlParam=function(paramName){
	var paramValue = null;  
	var url=JL.UrlParam==undefined?"":JL.UrlParam["url"];
	if (url.indexOf("?") > 0 && url.indexOf("=") > 0) {  
		arrSource = unescape(url).substring(url.indexOf("?")+1, url.length).split("&"), i = 0; 
		while (i < arrSource.length)
			{
				if(arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()){
					paramValue = arrSource[i].split("=")[1];
				}
				i++;
			}  
	}  
	return paramValue;  
}
*/

//替换页面img、hrefURL路劲地址
JL.setObjUrl = function(){
	var imgArr = $("img[jl-package]");
	$.each(imgArr,function(i,obj){
		$(obj).attr("src",pubJson.getURL($(obj).attr("jl-package"))+$(obj).attr("jl-url"));
	});
	var hrefArr = $("a[jl-package]");
	$.each(hrefArr,function(i,obj){
		$(obj).attr("href",pubJson.getURL($(obj).attr("jl-package"))+$(obj).attr("jl-url"));
	});
}

//获取URL路劲后面参数
JL.getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//脚本获取根路劲
JL.getBasePath = function(){ 
   var obj=window.location; 
   var contextPath=obj.pathname.split("/")[1]; 
   //var basePath=obj.protocol+"//"+obj.host+"/"+contextPath; 
   return "/"+contextPath;
} 

JL.saveForm = function(form, XmlData, type, json, supplementJson){
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/form/saveRecord.do";
	ajaxJson["data"] = {"jyl":true, "json": JSON.stringify(XmlData)};
	$.extend(ajaxJson.data, supplementJson)
	var resultData = JL.ajax(ajaxJson); 
	form.checkResult(json, resultData, type, true);
	//不自动打开下一个表单
}

//判断传过来的对象是array还是object，当是数组时返回true;
JL.checkJSONArray = function(json){
	var flag = $.isArray(json);
	return flag;
}

//判断字串是对象格式，还是文本数字格式
JL.checkObj = function(str){
	var flag = false;
	if(str.indexOf("{")==0 && str.lastIndexOf("}")==str.length-1){
		flag = true;
	}
	if(str.indexOf("[")==0 && str.lastIndexOf("]")==str.length-1){
		flag = true;
	}
	return flag;
}

//异步递归调用
JL.recursiveAjaxForDaiBan = function (grid, addData, arr, type, index, GZ01, tip) {
	if(arr.length > 0){
		var rowIndex = arr[index];
		var rowData = grid.getData(rowIndex);
		var XW = null;
		var sDate = new Date();
		
		var XmlData = addData || {};
		XmlData["bdbh"] = rowData.TBLNAME;
		XmlData["jlbh"] = rowData.JLBH;
		
		var ajaxJson = {};
		ajaxJson["async"] = true;
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/form/saveRecord.do";
		ajaxJson["data"] = {"jyl":true, "json": JSON.stringify(XmlData)};
		for(var i=0; i<rowData.XW.length; i++){
			if(rowData.XW[i]["GZ01"] == GZ01){
				var JK03 = JSON.parse(rowData.XW[i]["JK03"]);
				ajaxJson["data"]["initField"] = JSON.stringify(JK03.field);
				ajaxJson["data"]["xwbh"] = rowData.XW[i]["XW01"];
			}
		}
		ajaxJson["error"] = function(data){
			if(!JL.isNull(tip)){
				tip.message.animate({"margin-top":"70px","opacity":"0"}, function(){
					tip.obj.animate({"opacity":"0"}, function(){
						
					});
				});
			}
			
			if(addData.S_VALUE == "D1"){
				var selected = arr.slice(0,index);
				if(index <= (arr.length-1) && !JL.isNull(selected)){
					grid.removeSelected(selected);
				}
			}
		};
		ajaxJson["callback"] = function(resultData){
			if(!JL.isNull(resultData)){
				resultData = resultData.data;
				if(!JL.isNull(tip)){
					tip.message.animate({"margin-top":"70px","opacity":"0"}, function(){
						tip.obj.animate({"opacity":"0"}, function(){
							
						});
					});
				}
				var ntip = null;
				if(!JL.isNull(rowData.TBLNAME) && !JL.isNull(resultData.jlbh)){
					ntip = JL.tip(type + "成功[流水号:"+rowData.TBLNAME+"-"+resultData.jlbh+"]");
				}else if(!JL.isNull(resultData.jlbh)){
					ntip = JL.tip(type + "成功[流水号:"+resultData.jlbh+"]");
				}else{
					ntip = JL.tip(type + "成功");
				}
				//if(addData.S_VALUE == "D1"){
				grid.removeDL(rowIndex);
				if(index == (arr.length-1)){
					grid.removeSelected(arr);
				}
				//}
				
				if((index + 1) < arr.length){
					index++;
					var lDate = new Date() - sDate;
					if(lDate < 1500){
						setTimeout(function(){
							JL.recursiveAjaxForDaiBan(grid, addData, arr, type, index, GZ01, ntip);
						}, 1500 - lDate);
					}else{
						JL.recursiveAjaxForDaiBan(grid, addData, arr, type, index, GZ01, ntip);
					}
				}
			}
		};
		JL.ajax(ajaxJson);
	}
}

//异步递归调用
JL.recursiveAjax = function (grid, addData, arr, type, index, initField, tip) {
	if(arr.length > 0){
		var rowIndex = arr[index];
		var rowData = grid.getData(rowIndex);
		var sDate = new Date();
		
		var XmlData = $.extend(rowData, addData);
		
		var ajaxJson = {};
		ajaxJson["async"] = true;
		ajaxJson["src"] = "form/saveRecord.do";
		ajaxJson["data"] = {"jyl":true, "json": JSON.stringify(XmlData)};
		if(!JL.isNull(initField)){
			ajaxJson["data"]["initField"] = JSON.stringify(initField);
		}
		ajaxJson["error"] = function(data){
			if(!JL.isNull(tip)){
				tip.message.animate({"margin-top":"70px","opacity":"0"}, function(){
					tip.obj.animate({"opacity":"0"}, function(){
						
					});
				});
			}
			
			if(addData.S_VALUE == "D1"){
				var selected = arr.slice(0,index);
				if(index <= (arr.length-1) && !JL.isNull(selected)){
					grid.removeSelected(selected);
				}
			}
		};
		ajaxJson["callback"] = function(resultData){
			if(!JL.isNull(resultData)){
				resultData = resultData.data;
				if(!JL.isNull(tip)){
					tip.message.animate({"margin-top":"70px","opacity":"0"}, function(){
						tip.obj.animate({"opacity":"0"}, function(){
							
						});
					});
				}
				var ntip = null;
				if(!JL.isNull(rowData.bdbh) && !JL.isNull(resultData.jlbh)){
					ntip = JL.tip(type + "成功[流水号:"+rowData.bdbh+"-"+resultData.jlbh+"]");
				}else if(!JL.isNull(resultData.jlbh)){
					ntip = JL.tip(type + "成功[流水号:"+resultData.jlbh+"]");
				}else{
					ntip = JL.tip(type + "成功");
				}
				//if(addData.S_VALUE == "D1"){
				grid.removeDL(rowIndex);
				if(index == (arr.length-1)){
					grid.removeSelected(arr);
				}
				//}
				
				if((index + 1) < arr.length){
					index++;
					var lDate = new Date() - sDate;
					if(lDate < 1500){
						setTimeout(function(){
							JL.recursiveAjax(grid, addData, arr, type, index, initField, ntip);
						}, 1500 - lDate);
					}else{
						JL.recursiveAjax(grid, addData, arr, type, index, initField, ntip);
					}
				}
			}
		};
		JL.ajax(ajaxJson);
	}
}

//获取价格
JL.getGoodsPrice = function (json) {
	var price = 0.0;
	var ajaxJson = {};
	ajaxJson["src"]=pubJson.getURL("FormUrl")+"/trust/o2o/PriceControl/getPrice.do";
	ajaxJson["data"]={"json": JSON.stringify(json)};
	resultData = JL.ajaxCall(ajaxJson);
	if(!JL.isNull(resultData)){
		if(!JL.isNull(resultData.data)){
			price = resultData.data.price;
		}
	}
	return price;
}

//获取库存
JL.getGoodsStockNum = function (json) {
	var stockNum = 0;
	var ajaxJson = {};
	ajaxJson["src"]=pubJson.getURL("FormUrl")+"/trust/o2o/StockControl/getStockNum.do";
	ajaxJson["data"]={"json": JSON.stringify(json)};
	resultData = JL.ajaxCall(ajaxJson);
	if(!JL.isNull(resultData)){
		if(!JL.isNull(resultData.data)){
			stockNum = resultData.data.stockNum;
		}
	}
	return stockNum;
};

JL.getFileSize = function(bytes){
	if (bytes === 0) return '0 B';
    var k = 1024, // or 1024
		sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i];
};

//给图片加上点击事件
JL.clickImg = function(){
	$(".more_img").find("ul").find("li").click(function(){
		$(".jl_modal").fadeIn();
		var div = $("<div>").appendTo(".jl_modal");
		div.addClass("image");
		div.css({"width":"100%","height":"100%"});
		div.click(function(e){
			if($(e.target).is("div")){
				$(".jl_modal").fadeOut();
				$(this).remove();
			}
		});
		var img = $(this).find("img").clone(false);
		img.appendTo(div);
		img.css({"max-width":"1000px","max-height":"500px","position": "fixed", "top": "50%", "left": "50%"});
		var height = img.height()/2;
		var width = img.width()/2;
		img.css({"margin-top":-height+"px","margin-left":-width+"px"});
	});
};

JL.formatDataName = function(json){
	var data_name = "";
	if(json.bdym == "FormQuery"){
		if(!JL.isNull(json.querybh)){
			data_name = json.bdym+"_"+json.YWSJ.querybh;
		}else{
			data_name = json.bdym+"_"+json.YWSJ.sqlid;
		}
	} else if(json.bdym == "daiBan" || json.bdym == "chaoSong" || json.bdym == "cheHui"){
		data_name = json.bdym+"_"+json.YWSJ.GZL01;
	} else {
		data_name = json.bdym;
	}
	return data_name;
}

JL.getXW = function(XmlData){
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectXW.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var XW = JL.ajax(ajaxJson);
	if(!JL.isNull(XW["data"]["resultList"])){
		XW = XW["data"]["resultList"][0];
	}
	return XW;
}

JL.formatXW = function(config){
	var json = {};
	var XmlData = {};
	XmlData["GZL01"] = config["GZL01"];
	XmlData["BZ01"] = config["BZ01"];
	var XW = JL.getXW(XmlData);
	if (JL.isNull(XW)){
		console.info("该流程没有配置行为，无法正常使用！（GZL01："+XmlData["GZL01"]+";BZ01："+XmlData["BZ01"]+"）");
	}
	if(JL.isNull(config.YWSJ)){
		json.YWSJ = {};
		json.YWSJ.jlbh = 0;
		json.YWSJ.bdbh = XW["TBLNAME"];
	}
	$.extend(json, JL.getFormURL(json.YWSJ.bdbh, XW["YMBH"]));
	$.extend(json, XW);
	return json;
};

JL.formatURL = function(config){
	var json = {};
	if(!JL.isNull(config["CD03"])){
		var CD03 = JSON.parse(config["CD03"]);
		if(!JL.isNull(CD03["sqlid"])){
			json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/FormQuery.html";
			json["bdym"] = "FormQuery";
			config["YWSJ"] = CD03;
			
			if(!JL.isNull(CD03.namespace) && $("script[src*='/"+CD03.namespace+".js']").length==0){
				var src = pubJson.getURL("FormUrl") + "/"+CD03.dir+"/"+CD03.namespace+".js";
				$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
			}
			
			CD03.sqlMap = eval(CD03.namespace+"_"+CD03.sqlid);
			CD03.sqlMap.sqlid = CD03.namespace+"."+CD03.sqlid;
			
			CD03.modalField = {};
			$.extend(JLQuery["config"], CD03);
		}else if(!JL.isNull(CD03["querybh"])){
			json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/FormQuery.html";
			json["bdym"] = "FormQuery";
			config["YWSJ"] = {"querybh": CD03.querybh};
			JLQuery["config"]["querybh"] = CD03.querybh;
		}else if(!JL.isNull(CD03["GZL01"])){
			if(!JL.isNull(CD03["BZ01"]) && CD03["BZ03"] == "1"){
				config.CD02 = config.CDMC;
				$.extend(json, JL.formatXW(CD03));
			}else{
				if(JL.isNull(CD03.TYPE) || CD03.TYPE == "DB"){
					json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/daiBan.html";
					json["bdym"] = "daiBan";
					json["CD02"] = config.GZL02 + "待办";
				}else if(CD03.TYPE == "CS"){
					json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/chaoSong.html";
					json["bdym"] = "chaoSong";
					json["CD02"] = config.GZL02 + "抄送";
				}else if(CD03.TYPE == "PCRM_CH"){
					json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/cheHui.html";
					json["bdym"] = "cheHui";
					json["CD02"] = config.GZL02 + "撤回";
				}
				if(!JL.isNull(CD03.BZ01)){
					json["YWSJ"] = CD03;
				}else{
					json["YWSJ"] = {"GZL01": config.GZL01};
					if(!JL.isNull(json.BZ01)){
						json["YWSJ"]["BZ01"] = config.BZ01;
					}
				}
			}
		}else if(!JL.isNull(CD03["bdym"]) && !JL.isNull(CD03["url"])){
			json["url"] = CD03["url"];
			json["bdym"] = CD03["bdym"];
		}else{
			var formPath = JL.getFormURL(CD03["bdbh"]);
			$.extend(json, formPath);
			json["YWSJ"] = CD03;
		    if(JL.isNull(json["YWSJ"]["jlbh"])){
		    	json["YWSJ"]["jlbh"] = 0;
		    }
		}
		$.extend(json, config);
	} else {
		var XmlData = {};
		XmlData["GZL01"] = config["GZL01"];
		XmlData["BZ01"] = config["BZ01"];
		$.extend(json, JL.formatXW(XmlData));
		$.extend(json, config);
	}
	
	json["random"] = JL.random(); 
	return json;
}

//给数字加三位一逗号间隔
JL.getMoneySplit = function(XmlData){
	var  number = XmlData;
	if(typeof number=="number"){
		number=number.toFixed(2);
	}
	number = number.replace(/\,/g, "");
	if(isNaN(number) || number == "")return "";
	number = Math.round(number * 100) / 100;
    if (number < 0)
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}

//页面不同路径跳转
JL.forwardUrl = function(url){
	var forwardUrl = "";
	if(url.indexOf("http") == -1){
		forwardUrl = pubJson.getURL("FormUrl") + url;
	}else{
		forwardUrl = url;
	}
	return forwardUrl;
}

//格式化金额
function outputdollars(number) {
	    if (number.length <= 3)
	        return (number == '' ? '0' : number);
	    else {
	        var mod = number.length % 3;
	        var output = (mod == 0 ? '' : (number.substring(0, mod)));
	        for (i = 0; i < Math.floor(number.length / 3); i++) {
	            if ((mod == 0) && (i == 0))
	                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
	            else
	                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
	        }
	        return (output);
	    }
	}
function outputcents(amount) {
	    amount = Math.round(((amount) - Math.floor(amount)) * 100);
	    return (amount < 10 ? '.0' + amount : '.' + amount);
}

//检查身份证号码是否符合规范，包括长度，类型  
JL.isCardNo = function(card){  
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
    if(reg.test(card) === false)  
    {  
        return false;  
    }  
  
    return true;  
};

JL.upperCaseMoney = function(money){
	money = money.toString();

	var arr1 = new Array("", " thousand", " million", " billion"),
	    arr2 = new Array("zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"),
	    arr3 = new Array("zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"),
	    arr4 = new Array("ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen");

	function doToEn(a) {
		//alert(a);
	    var b = a.length,
	        f, h = 0,
	        g = "",
	        e = Math.ceil(b / 3),
	        k = b - e * 3;
	        g = "";
	    for (f = k; f < b; f += 3) {
	        ++h;
	        num3 = f >= 0 ? a.substring(f, f + 3) : a.substring(0, k + 3);
	        strEng = English(num3);
	        if (strEng != "") {
	            if (g != "") g += ",";
	            g += English(num3) + arr1[e - h]
	        }
	    }
	    return g.toUpperCase()+" ONLY";
	}
	var doToEnWuxiaoshudian = function(a) {
    		var b = a.length, f, h = 0, g = "", e = Math.ceil(b / 3), k = b - e * 3; 
		g = "";
    		for (f = k; f < b; f += 3) {
        		++h;
        		num3 = f >= 0 ? a.substring(f, f + 3) : a.substring(0, k + 3);
        		strEng = English(num3);
        		if (strEng != "") {
            			if (g != "") g += ",";
            			g += English(num3) + arr1[e - h]
        		}
    		}
    		return g.toUpperCase();
	}
	var English = function (a) {
	    strRet = "";
	    if (a.length == 3 && a.substr(0, 3) != "000") {
	        if (a.substr(0, 1) != "0") {
	            strRet += arr3[a.substr(0, 1)] + " hundred";
	            if (a.substr(1, 2) != "00") strRet += " and "
	        }
	        a = a.substring(1);
	    }
	    if (a.length == 2)
	        if (a.substr(0, 1) == "0") a = a.substring(1);
	        else if (a.substr(0, 1) == "1") strRet += arr4[a.substr(1, 2)];
	    else {
	        strRet += arr2[a.substr(0, 1)];
	        if (a.substr(1, 1) != "0") strRet += "-";
	        a = a.substring(1)
	    } if (a.length == 1 && a.substr(0, 1) != "0") strRet += arr3[a.substr(0, 1)];
	    return strRet;
	};

	var doToEnYouxiaoshudian = function (a) {
		//alert(a);
	    var b = a.length,
	        f, h = 0,
	        g = "",
	        e = Math.ceil(b / 3),
	        k = b - e * 3;
	        g = "";
	    for (f = k; f < b; f += 3) {
	        ++h;
	        num3 = f >= 0 ? a.substring(f, f + 3) : a.substring(0, k + 3);
	        strEng = English(num3);
	        if (strEng != "") {
	            if (g != "") g += ",";
	            g += English(num3) + arr1[e - h]
	        }
	    }
	    return "CENTS "+g.toUpperCase()+" ONLY";
	}
	
	function doToCn(a) {
	    var b = 9.999999999999E10,
	       f = "零",
	       h = "壹",
	       g = "贰",
	       e = "叁",
	       k = "肆",
	       p = "伍",
	       q = "陆",
	       r = "柒",
	       s = "捌",
	       t = "玖",
	       l = "拾",
	       d = "佰",
	       i = "仟",
	       m = "万",
	       j = "亿",
	       o = "元",
	       c = "角",
	       n = "分",
	       v = "整",
	       fu = false;//负数

	    a = a.toString();
	    if (isNaN(Number(a))) { 
	        return "";
	    }
	    if(Number(a)<0){
	    	a = Number(a)*-1
	    	a = a.toString();
	    	fu = true;
	    }
	    b = a.split(".");
	    if (b.length > 1) {
	        a = b[0];
	        b = b[1];
	        b = b.substr(0, 2)
	    } else {
	        a = b[0];
	        b = "";
	    }
	    h = new Array(f, h, g, e, k, p, q, r, s, t);
	    l = new Array("", l, d, i);
	    m = new Array("", m, j);
	    n = new Array(c, n);
	    c = "";
	    if (Number(a) > 0) {
	        for (d = j = 0; d < a.length; d++) {
	            e = a.length - d - 1;
	            i = a.substr(d,
	            1);
	            g = e / 4;
	            e = e % 4;
	            if (i == "0") j++;
	            else {
	                if (j > 0) c += h[0];
	                j = 0;
	                c += h[Number(i)] + l[e];
	            }
	            if (e == 0 && j < 4) c += m[g];
	        }
	        c += o;
	    }
	    if (b != "") for (d = 0; d < b.length; d++) {
	        i = b.substr(d, 1);
	        if (i != "0") c += h[Number(i)] + n[d];
	    }
	    if (c == "") c = f + o;
	    if (b.length < 2) c += v;
	    if(fu){
	    	return c = "负" + c
	    }else{
	    	return c = "" + c
	    }
	}

	if(JL.getLanguage() == "zh"){
		return doToCn(money);
	}else{
		if(money.indexOf(".")!=-1){
			var aaaaa = money.split(".")[0];
			//alert(aaaaa);
			var bbbbb = money.split(".")[1];
			var ddddd;
			//alert(bbbbb.length);
			var ccccc = doToEnWuxiaoshudian(aaaaa);
			
			ddddd = doToEnYouxiaoshudian(bbbbb);
			
			return ccccc+" AND " + ddddd;
		} else {
			return doToEn(money);
		}
	}
}

JL.getLanguage = function(){
	if(language != ""){
		return language.replace("_", "");
	} else if(JL.isNull(pubJson.defaultLanguage)){
		return "zh";
	} else {
		return pubJson.defaultLanguage.replace("_", "");
	}
}

//全角转半角方法
JL.convertToBJ = function(str){
	var result="";
	for (var i = 0; i < str.length; i++){
		if (str.charCodeAt(i)==12288){
			result+=String.fromCharCode(str.charCodeAt(i)-12256);
			continue;
		}
		if (str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375){
			result+=String.fromCharCode(str.charCodeAt(i)-65248);
		}else{
			result+=String.fromCharCode(str.charCodeAt(i));
		}
	}
	return result;
}

//得到系统参数(XmlData格式：{"DJLX":"","DJZD":""})
JL.getJLconf = function(XmlData){
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/JLConf/selSwitch.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var jlconf = JL.ajax(ajaxJson);
//	if(!JL.isNull(jlconf["data"]["resultlist"])){
		jlconf = jlconf["data"]["resultlist"];
//	}
	return jlconf;
}

//增加自定义导出Excel
JL.getExportLayout = function(dcbh,data){
	debugger;
	var json = {};
	json["src"] = pubJson.getURL("FormUrl") + "/form/getExportConfig.do";
	json["data"] = {"XmlData":JSON.stringify({"collection": "formExcel","dcbh": dcbh.toString()})};
	var resultData = JL.ajax(json);
	if(!JL.isNull(resultData)){
		resultData=resultData.data;
		JL.download(resultData["url"],data,null);
	}else{
		JL.tip("没有查询到对应的导出模板","info");
		return false;
	}
	//console.info(resultData.data);
	return true;
}