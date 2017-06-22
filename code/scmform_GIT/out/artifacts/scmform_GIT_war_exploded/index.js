var userMenu = !localStorage.userMenu? {}: JSON.parse(localStorage.userMenu);

document.onkeydown = function (e) { //屏蔽BackSpace后退
	var code;   
	if (!e){ var e = window.event;}   
	if (e.keyCode){ code = e.keyCode;}
	else if (e.which){ code = e.which;}
	//BackSpace 8;
	if ((event.keyCode == 8)
	     && ((event.srcElement.type != "text" && event.srcElement.type != "textarea" && event.srcElement.type != "password")
	     ||  event.srcElement.readOnly == true)) {
	    event.keyCode = 0;        
	    event.returnValue = false;
	}
	 
	if(event.keyCode == 116){
		if(($("#jlSaveForm").length>0 && !$("#jlSaveForm").is(":hidden")) || ($("#jlSaveCard").length>0 && !$("#jlSaveCard").is(":hidden"))){
			JL.confirm("当前有未提交操作,是否确定刷新", function(){
				window.location.href = window.location.href;
			});
			event.keyCode = 0;        
			event.returnValue = false;
		}
	}
	 
	if(event.keyCode==13&&event.srcElement.onkeydown==null) //把enter转化为tab 
		event.keyCode=9; 
	 
	if ($.inArray(event.keyCode, [112,113,114,115,117,118,119,120,121,122]) != -1){
		return false;
	}
	return true;
};

$(document).mouseup(function(){
	try {
		var clicked = $(event.target);
		
		var table_change = $(this).find(".table_change"); 
		
		for(var i=0; i<table_change.length; i++){
			var obj = $(table_change[i]);
			if(clicked.closest(obj.closest("dd")).length == 0){
				var x = obj.closest("dl").attr("data-index");
				var y = obj.closest("dd").attr("data-index");
				
				var grid = JL.getPluginObj(obj.closest(".table_content").parent());
				
				var id = grid.config.headers[y]["id"];
				if(!JL.isNull(grid.plugin) && !JL.isNull(grid.plugin[x])){
					obj.closest(".table_content").removeClass("overflow_inherit");
					grid.setCell(grid.plugin[x][id].getData(), x, y);
				}
			}
		}
	} catch (e) {
		// TODO: handle exception
		console.error(e);
	}
});

$(window).scroll(function(){
	var form = $(".pagr_content:not(:hidden)").attr("data-name");
	if(!JL.isNull(form)){
		try {
			form = eval(form);
			var plugins = form.pluginObj;
			$.each(plugins, function(key, plugin){
				if(plugin.config.jlid == "JLLayoutGrid" || plugin.config.jlid == "JLTreeGrid"){
					var div = null;
					var offset_top = plugin.obj.offset().top;
					var offset_bottom = offset_top + plugin.obj.children().height();
					var sTop = $(window).scrollTop();
					if(sTop > offset_top -36 /*&& sTop < offset_bottom-120*/){
						if(plugin.obj.find("[data-position-top]").length == 0){
							div = $("<div>");
							div.attr("data-position-top", true);
							div.css({"width": plugin.obj.width()-1+"px", "overflow": "hidden", "position": "fixed", "top":"42px", "z-index": "10", "min-height": "40px"});
							var table_title = plugin.obj.find("> .jl_title").clone(true);
							table_title.appendTo(div);
							//table_title.css({"margin-left": "0px"});
							plugin.obj.prepend(div);
						}
					}else{
						plugin.obj.find("[data-position-top]").remove();
					}
					
					if(form.getTab().find(".jl_bottom").length > 0){
						var offset_top = form.getTab().find(".jl_bottom").offset().top;
						var sTop = $(window).scrollTop();
						if(sTop > offset_top - 200){
							if(!plugin.obj.find(".jl_bottom").is(":hidden")){
								plugin.obj.find(".jl_bottom").click();
							}
						}
					}
				}
				
				if(plugin.config.jlid == "JLGrid"){
					var offset_top = plugin.obj.offset().top;
					var offset_bottom = offset_top + plugin.obj.children().height();
					var sTop = $(window).scrollTop();
					if(sTop > offset_top -36 && sTop < offset_bottom-120){
						var width_main = plugin.obj.find(".table_main").width();
						var div = null;
						var table_show = plugin.obj.find(">.table_content > .table_show");
						var table_main = plugin.obj.find(">.table_content > .table_show > .table_main");
						var title = plugin.obj.find(">.table_content > .table_show > .table_main > .table.title");
						if(plugin.obj.find("[data-position-top]").length == 0){
							div = $("<div>");
							div.attr("data-position-top", true);
							div.css({"width": plugin.obj.width()-1+"px", "overflow": "hidden", "position": "fixed", "top":"42px", "z-index": "10", "min-height": "40px"});
							var table_title = plugin.obj.find(">.table_content > .table_title").clone(true);
							table_title.appendTo(div);
							//table_title.css({"margin-left": "0px"});
							
							var div_inner = $("<div>");
							div_inner.addClass("title");
							div_inner.css({"width": width_main+"px", "margin-left": table_main.css("margin-left")});
							div_inner.append(title.clone(true));
							div_inner.appendTo(div);
							table_main.before(div);
						}
					}else{
						plugin.obj.find("[data-position-top]").remove();
					}
					
					if(offset_top < $(window).height() 
							&& offset_bottom > $(window).height()
							&& sTop < offset_bottom - $(window).height()){
						var width_main = plugin.obj.find(".table_main").width();
						var div = null;
						var table_main = plugin.obj.find(">.table_content > .table_show > .table_main");
						var table_control = plugin.obj.find(">.table_content > .table_control");
						var table_scrollbar = plugin.obj.find(">.table_content > .table_scrollbar");
						if(plugin.obj.find("[data-position-bottom]").length == 0){
							div = $("<div>");
							div.attr("data-position-bottom", true);
							div.css({"width": plugin.obj.width()-1+"px", "overflow": "hidden", "position": "fixed", "bottom":"0px", "z-index": "10"});
							
							var div_inner = $("<div>");
							div_inner.addClass("title");
							div_inner.css({"margin-left": "0px"});
							div_inner.append(table_scrollbar.clone(true));
							div_inner.appendTo(div);
							table_main.after(div);
							
							var div_inner = $("<div>");
							div_inner.addClass("title");
							div_inner.css({"margin-left": "0px"});
							div_inner.append(table_control.clone(true));
							div_inner.appendTo(div);
							table_main.after(div);
						}else{
							div = plugin.obj.find("[data-position-bottom]");
							div_inner = plugin.obj.find("[data-position-bottom] > div.title");
							//var margin_left = plugin.obj.find(".table_show").scrollLeft()*-1;
							//div_inner.css({"margin-left": margin_left+"px"});
						}
					}else{
						plugin.obj.find("[data-position-bottom]").remove();
					}
				}
			});
		} catch (e) {
			// TODO: handle exception
			console.error(e);
		}
	}
});

$(document).ready(function(){
	if(JL.checkLogin()){
		return false;
	}
	
	loadHead();
	if(!pubJson.localMode) loadMenuIndex();
	loadMenu();
	loadUserConfig();
	
	$("#showMenu").click(function(){
		$(this).animate({'left':'0'},200);
		$(this).next().animate({'left':'0'},200);
		$('.jl_nav').animate({'left':'-225'},200, function(){
			var obj = $(this).find("#showMenu");
			obj.hide();
			obj.next().show();
		});
		$('.jl_content').animate({'margin-left':'0','padding': '10px 20px 80px 20px'},200);
		$(".jl_operation").animate({"left": "-226px"}, 200);
	});
	$("#hideMenu").click(function(){
		$(this).animate({'left':'225'},200);
		$(this).prev().animate({'left':'225'},200);
		$('.jl_nav').animate({'left':'0'},200, function(){
			var obj = $(this).find("#hideMenu");
			obj.hide();
			obj.prev().show();
		});
		$('.jl_content').animate({'margin-left':'225','padding': '10px 245px 80px 20px'},200);
		$(".jl_operation").animate({"left": "0px"}, 200);
	});
	
	
	JLMessage.bind("1001", function(data){
		debugger;
		if (data.PCRM_LX == 'CH'){
			//撤回数量
			if (data.BZ03 != 1){
				if (data.TJCZY01 == userInfo.PCRM_CZY01){  
					var span_cheHui_zs = $("#cheHui> a > span");
					var span_cheHui_mx = $("#cheHui > ul > li[data-id='"+data.GZL01+"'] > a > span");
					if(Number(span_cheHui_zs.html()) + Number(data.NUM) >= 0) {
						span_cheHui_zs.html(Number(span_cheHui_zs.html()) + Number(data.NUM));
						span_cheHui_mx.html(Number(span_cheHui_mx.html()) + Number(data.NUM));
					}else {
						span_cheHui_zs.html(0);
						span_cheHui_mx.html(0);
					} 
				} 
			}
		}else{
			//代办数量
			if (data.BZ03 != 1){
				var span_daiBan_zs = $("#daiBan > a > span");
				var span_daiBan_mx = $("#daiBan > ul > li[data-id='"+data.GZL01+"'] > a > span");
				if(Number(span_daiBan_zs.html()) + Number(data.NUM) >= 0) {
					span_daiBan_zs.html(Number(span_daiBan_zs.html()) + Number(data.NUM));
					span_daiBan_mx.html(Number(span_daiBan_mx.html()) + Number(data.NUM));
				}else {
					span_daiBan_zs.html(0);
					span_daiBan_mx.html(0);
				}
			} 
				
			//菜单中的代办数量
			var label = $(".sub_menu").find("[BZ01='"+data.BZ01+"'] > a > label");
			if (Number(label.html()) + Number(data.NUM) >= 0){
				label.html(Number(label.html()) + Number(data.NUM));
				//row.NUM = Number(label.html()) + Number(data.NUM);
			}else{
				label.html(0);
			}
		}
	});
	//$(".jl_catalog").load("jl_catalog.html?rid="+rid);	
});

var loadHead = function(){
	var rid = Math.random();
	//特有商家传入参数，如：BaofengTV
	var resourceId = JL.getUrlParam("resourceId");
	//加载页头跟页尾
	if(!JL.isNull(pubJson.backMenuSwitch) && pubJson.backMenuSwitch == true){
		var shortcutUrl = pubJson.getURL("FormUrl")+"/o2o/shopJL/page/shortcut.html?rid="+rid;
		if(!JL.isNull(resourceId)){
			shortcutUrl = pubJson.getURL("FormUrl")+"/o2o/shop"+resourceId+"/page/shortcut.html?rid="+rid;
		}
		$("#shortcut").load(shortcutUrl);
		$("#foot").load(pubJson.getURL("FormUrl")+"/o2o/shopJL/page/footer.html?rid="+rid,function(){
			$("#footerContactUs").hide();
		});
	}
	//加载head页面
	if(!JL.isNull(resourceId)){
		//显示个性台头
		var backHeadUrl = pubJson.getURL("FormUrl") + "/o2o/shop"+resourceId+"/page/jl_header.html?rid="+rid;
		$(".jl_header").load(backHeadUrl,function(){
			var logoUrl = pubJson.getURL("FormUrl")+"/o2o/shopBaofengTV/images/bfTV_backLogo.png";
			$(this).find("#jl_logo img").attr("src",logoUrl);
		});
	}else{
		$(".jl_header").load("jl_header.html?rid="+rid,function(){		
			//左上角台头logo
			if(!JL.isNull(pubJson.backLogoSwitch) && pubJson.backLogoSwitch == true){
				var logoUrl = pubJson.getURL("FormUrl")+"/o2o/shopJL/images/backLogo.png";
				$(this).find("#jl_logo img").attr("src",logoUrl);
				//$(this).find("#jl_logo").attr("href",pubJson.getURL("FormUrl")+"/o2o/shopJL/page/index.html");
				//$(this).find("#jl_logo").after("<span style=\"color:#ffffff\">"+userInfo.PCRM_CZY03+"</span>");
			}
			
			$(this).find("#jl_logo").click(function(){
				if(($("#jlSaveForm").length>0 && !$("#jlSaveForm").is(":hidden")) || ($("#jlSaveCard").length>0 && !$("#jlSaveCard").is(":hidden"))){
					JL.confirm("当前有未提交操作,是否确定刷新", function(){
						window.location.href = window.location.href;
					});
				}else{
					window.location.href = window.location.href;
				}
			});

			if(!pubJson.localMode){
				loadZSL($(this));
			}else{
				$(this).find("#jl_logo").append("<span class='font_white font_weight_bold' style='line-height:40px; font-size:30px !important;'>off-line sale</span>");
			}
			$(this).find("#systemMenu > a").empty();
			$(this).find("#systemMenu > a").append("<i class='fa fa-user'></i>"+userInfo.PCRM_CZY03);
			$(this).find("#systemMenu > a").attr("title", userInfo.PCRM_CZY03);
			if(!JL.isNull(pubJson.language)){
				$(this).find("#systemMenu > .jl_dropdown_menu > li#changeLanguage").show().mouseenter(function(){
					var ul = $(this).find("> ul");
					if(ul.find("> li").length == 0){
						$.each(pubJson.language, function(key, value){
							var li = $("<li>").appendTo(ul);
							li.html("<a>"+value+"</a>");
							li.data({"key":key,"value":value});
							li.click(function(){
								var data = $(this).data();
								$.cookie("language", null);
								$.cookie("language", data.key, {path:"/"});
								var XmlData = {};
								XmlData["CZY01"] = userInfo["PCRM_CZY01"];
								XmlData["PersonID"] = userInfo["PCRM_CZY02"];
								XmlData["ALL"] = true;
								var ajaxJson={};
								ajaxJson["src"] = pubJson.getURL("BaseUrl") + data.key+"/user/selectMenu.do";
								ajaxJson["data"]={"XmlData":JSON.stringify(XmlData)};
								ajaxJson["callback"] = function(resultData){
									if(!JL.isNull(resultData)){
										resultData = resultData.data.resultList;
									}else{
										resultData = [];
									}
									localStorage.userMenu = JSON.stringify(resultData);
									window.location.replace(pubJson.getURL("BaseUrl") + data.key+"/index.html");
								};
								JL.ajax(ajaxJson);
							});
						});
					}
				});
			}
			$(this).find("#systemMenu > .jl_dropdown_menu > li#settings").click(function(){
				var json = {};
				json["CD02"] = "设置";
				json["CD03"] = JSON.stringify({
					"bdym": "settings",
					"url": pubJson.getURL("FormUrl") + "/form/form_pc/settings.html"
				});
				loadPage(json);
			});
			$(this).find("#systemMenu > .jl_dropdown_menu > li#resetPassWord").click(function(){
				var json = {};
				json["CD02"] = "修改密码";
				json["CD03"] = JSON.stringify({
					"bdym": "password",
					"url": pubJson.getURL("FormUrl") + "/form/form_pc/password.html"
				});
				loadPage(json);
			});
			$(this).find("#systemMenu > .jl_dropdown_menu > li#logout").click(function(){
				var logout = function(){
					sessionStorage.clear();
					//localStorage.clear();
					$.cookie("userInfo", null,{path:"/"});
					//删除后台session
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl")+"/user/logout.do";
					ajaxJson["data"] = {"json":""};
					JL.ajaxCall(ajaxJson);
					if(typeof pubJson.logoutUrl == "undefined"){
						window.location.href = "login.html";
					}else{
						window.location.href = pubJson.logoutUrl;
					}
				}
				
				if(($("#jlSaveForm").length>0 && !$("#jlSaveForm").is(":hidden")) || ($("#jlSaveCard").length>0 && !$("#jlSaveCard").is(":hidden"))){
					JL.confirm("当前有未提交操作,是否确定退出", function(){
						logout();
					});
				}else{
					logout();
				}
			});
			$(this).find("#systemMenu > a").click(function(){
				var json = {};
				json["CD02"] = "个人主页";
				json["CD03"] = JSON.stringify({
					"bdym": "personal",
					"url": pubJson.getURL("FormUrl") + "/form/form_pc/personal.html?rid="+Math.random()
				});
				loadPage(json);
			});
			if(!pubJson.localMode) $(this).find("#systemMenu > a").click();
			
			var lockMenu = JL.isNull(localStorage["lockMenu"+userInfo.PCRM_CZY02])? {}: JSON.parse(localStorage["lockMenu"+userInfo.PCRM_CZY02]);
			$.each(lockMenu, function(key, value){
				loadPage(value);
			});
			
			if(userInfo.FORM_MRCD) {
				var XmlData = {};
				XmlData["CZY01"] = userInfo.PCRM_CZY01;
				XmlData["PersonID"] = userInfo.PCRM_CZY02;
				XmlData["CompanyID"] = userInfo.PCRM_GSXX01; 
				XmlData["VIEW01"] = userInfo.FORM_MRCD;
				XmlData["VIEW05"] = 1;
				XmlData["ALL"] = 1;
				var ajaxJson={};
				ajaxJson["src"] = pubJson.getURL("FormUrl")+"/user/selectMenu.do";
				ajaxJson["data"]={"XmlData":JSON.stringify(XmlData)};
				var resultData = JL.ajax(ajaxJson);
				if(!JL.isNull(resultData)){
					resultData = resultData.data.resultList;
					loadPage(resultData[0]);
				}else{
					resultData = [];
				}
			}			

			if(pubJson.localMode) {
				$(this).find("#systemMenu > a").unbind("click");
				$(this).find("#daiBan").addClass("hide");
				$(this).find("#cheHui").addClass("hide");
				$("body").find("#d_serchMenu").parent().addClass("hide");
			}
		});
	}
}

var getGZL = function(LX01){
	var XmlData={};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	XmlData["CompanyID"] = userInfo["PCRM_GSXX01"];
	XmlData["PersonID"] = userInfo["PCRM_CZY02"]; 
	XmlData["GZL06"] = 1;
	if(!JL.isNull(LX01)){
		XmlData["LX01"] = LX01;
	}
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl")+"/CX/selectCD.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData),"sid":Math.random()};
	var resultData=JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data.resultList;
	}else{
		resultData = [];
	}
	return resultData;
}

//获得待办总数量
var getZSL = function(func){
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
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

//待办数量
var getDBSL = function(func){
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	XmlData["PersonID"] = userInfo["PCRM_CZY02"];
	XmlData["CompanyID"] = userInfo["PCRM_GSXX01"]; 
	var ajaxJson = {};
	ajaxJson["async"] = true;
	ajaxJson["src"] = "CX/selectDBSL.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
		}
		func(resultData);
	};
	JL.ajax(ajaxJson);
}

//已办数量
var getYBSL = function(func){
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	XmlData["PersonID"] = userInfo["PCRM_CZY02"];
	XmlData["CompanyID"] = userInfo["PCRM_GSXX01"]; 
	XmlData["RYBH"] = userInfo["PCRM_CZY01"];
	var ajaxJson = {};
	ajaxJson["async"] = true;
	ajaxJson["src"] = "CX/selectYBSL.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
		}
		func(resultData);
	};
	JL.ajax(ajaxJson);
}

//撤回数量
var getCHSL = function(func){
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	var ajaxJson = {};
	ajaxJson["async"] = true;
	ajaxJson["src"] = "CX/selectCHSL.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
		}
		func(resultData);
	};
	JL.ajax(ajaxJson);
}

//抄送数量
var getCSSL = function(func){
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	var ajaxJson = {};
	ajaxJson["async"] = true;
	ajaxJson["src"] = "CX/selectDBSL_CC.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
		}
		func(resultData);
	};
	JL.ajax(ajaxJson);
}

//获得菜单
var getMenu = function(parent, func){
	var XmlData = {};
	XmlData["CZY01"] = userInfo["PCRM_CZY01"];
	XmlData["PersonID"] = userInfo["PCRM_CZY02"];
	XmlData["CompanyID"] = userInfo["PCRM_GSXX01"]; 
	XmlData["VIEW06"] = 1;
	if(!JL.isNull(parent)){
		XmlData["PARENT"] = parent;
	}
	var ajaxJson={};
	ajaxJson["src"] = pubJson.getURL("FormUrl")+"/user/selectMenu.do";
	ajaxJson["data"]={"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			resultData = resultData.data.resultList;
		}else{
			resultData = [];
		}
		
		/*if(!JL.isNull(parent)){
			var GZL = getGZL(parent);
			$.unique($.merge(resultData, GZL));
		}*/
		
		if(JL.isFunction(func)){
			func(resultData);
		}
	};
	JL.ajax(ajaxJson);
}

var loadZSL = function(obj){
	var daiBan = obj.find("#daiBan");
	loadDBSL($(".jl_header > .jl_navbar")); 
	var yiBan = obj.find("#yiBanInfo");
	var chaoSong = obj.find("#chaoSong");
	var cheHui = obj.find("#cheHui");
	getZSL(function(ZSL){
		if(ZSL.CCSL > 0){
			chaoSong.find("> a > span").html(ZSL.CCSL);
			chaoSong.show();
			chaoSong.mouseenter(function(){
				loadCSSL($(".jl_header > .jl_navbar"));
			});
		}else{
			chaoSong.hide();
		}
		if(ZSL.CHSL > 0){
			cheHui.find("> a > span").html(ZSL.CHSL);
			cheHui.show();
			cheHui.mouseenter(function(){
				loadCHSL($(".jl_header > .jl_navbar"));
			});
		}else{
			cheHui.hide();
		}
		if(ZSL.YBSL > 0){
			//yiBan.find("> a > span").html(ZSL.YBSL);
			yiBan.show();
			yiBan.click(function(){
				loadYBSL($(".jl_header > .jl_navbar"));
			});
		}else{
			yiBan.hide();
		}
	});
}

var loadDBSL = function(obj){
	var daiBan = obj.find("#daiBan");
	if(daiBan.find(".jl_dropdown_menu").length == 0){
		getDBSL(function(DBSL){
			if(DBSL.length > 0){
				var jl_dropdown_menu = $("<ul class='jl_dropdown_menu'>").appendTo(daiBan);
				jl_dropdown_menu.addClass("todo todo_0"+Math.ceil(DBSL.length/15));
				
				if(DBSL.length <= 4){
					daiBan.hide();
				}
				
				var total = 0;
				for(var i=0;i<DBSL.length;i++){
					var row = DBSL[i];
					var li = null;
					if(i < 4){
						li = $("<li>").prependTo(obj);
						li.addClass("drop_menu");
					}else{
						li = $("<li>").appendTo(jl_dropdown_menu);
						total+=row.NUM;
					}
					li.attr("data-id", row.GZL01);
					li.append("<a><i class='fa fa-edit'></i>"+row.GZL02+"<span class='bgcolor_red'>"+row.NUM+"</span></a>");
					li.data(row);
					li.click(function(){
						var data = $(this).data();
						data.CD03 = JSON.stringify({"GZL01":data.GZL01});
						loadPage(data);
					});
				}
			}
			daiBan.find("> a > span").html(total);
			resizeHeader();
			//resizeHeader();
		});
	}
}

$(window).resize(function() {
	resizeHeader();
});

var resizeHeader = function(){
	var total = $("#daiBan > a > span.bgcolor_red");
	if($(".jl_navbar").width() > $(".jl_header").width() - 450){
		var first = $(".jl_navbar > li").eq(0).appendTo($("#daiBan > .jl_dropdown_menu"));
		$("#daiBan").show();
		total.html(Number(total.html()) + first.data("NUM"));
		resizeHeader();
	}else if($("#daiBan > .jl_dropdown_menu > li.drop_menu:last").length > 0 && $(".jl_navbar").width() + $("#daiBan > .jl_dropdown_menu > li.drop_menu:last").width() < $(".jl_header").width() - 450){
		var last = $("#daiBan > .jl_dropdown_menu > li.drop_menu:last").prependTo($(".jl_navbar"));
		total.html(Number(total.html()) - last.data("NUM"));
		if($("#daiBan > .jl_dropdown_menu > li").length == 0){
			$("#daiBan").hide();
		}
		resizeHeader();
	}
}

//已办待办数量
var loadYBSL = function(obj){
	var yiBan = obj.find("#yiBanInfo");
	if(yiBan.find(".jl_dropdown_menu").length == 0){
		var json = {};
		json["bdym"] = "yiBan";
		json["random"] = "已办";
		json["CD02"] = "已办";
		json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/yiBan.html";
		json["CD03"] = '{"bdym":"yiBan","url":"'+pubJson.getURL("FormUrl")+'/form/form_pc/yiBan.html"}'; 
		
		loadMain(json);
		loadPage(json);
	}
}


var loadCHSL = function(obj){
	var cheHui = obj.find("#cheHui");
	if(cheHui.find(".jl_dropdown_menu").length == 0){
		getCHSL(function(CHSL){
			if(CHSL.length > 0){
				var jl_dropdown_menu = $("<ul class='jl_dropdown_menu'>").appendTo(cheHui);
				jl_dropdown_menu.addClass("todo todo_0"+Math.ceil(CHSL.length/15));
				var total = 0;
				for(var i=0;i<CHSL.length;i++){
					var row = CHSL[i];
					var li = $("<li>");
					li.attr("data-id", row.GZL01);
					li.append("<a><i class='fa fa-edit'></i>"+row.GZL02+"<span class='bgcolor_red'>"+row.NUM+"</span></a>");
					li.appendTo(jl_dropdown_menu);
					li.data(row);
					li.click(function(){
						var data = $(this).data();
						data.CD03 = JSON.stringify({"GZL01":data.GZL01,"TYPE":"PCRM_CH"});
						loadPage(data);
					});
					total+=row.NUM;
				}
			}
		});
	}
}

var loadCSSL = function(obj){
	var chaoSong = obj.find("#chaoSong");
	if(chaoSong.find(".jl_dropdown_menu").length == 0){
		getCSSL(function(CSSL){
			if(CSSL.length > 0){
				var jl_dropdown_menu = $("<ul class='jl_dropdown_menu'>").appendTo(chaoSong);
				jl_dropdown_menu.addClass("todo todo_0"+Math.ceil(CSSL.length/15));
				var total = 0;
				for(var i=0;i<CSSL.length;i++){
					var row = CSSL[i];
					var li = $("<li>");
					li.append("<a><i class='fa fa-edit'></i>"+row.GZL02+"<span class='bgcolor_red'>"+row.NUM+"</span></a>");
					li.appendTo(jl_dropdown_menu);
					li.data(row);
					li.click(function(){
						var data = $(this).data();
						data.CD03 = JSON.stringify({"GZL01":data.GZL01,"TYPE":"CS"});
						loadPage(data);
					});
					total+=row.NUM;
				}
			}
		});
	}
}

var loadMenuIndex = function(){
	$("#d_serchMenu > :text").keyup(function(e){
		if($(this).nextAll("ul").is(":hidden")){
			$(this).nextAll("ul").show();
		}
		
		var hover = $(this).next().next().find("li.hover");
		if(e.keyCode == 38){
			if(hover.length > 0 && hover.prevAll(":not(:hidden):eq(0)").length > 0){
				hover.removeClass("hover");
				hover.prevAll(":not(:hidden):eq(0)").addClass("hover");
			}
		} else if(e.keyCode == 40){
			var li = $(this).next().next().find("li:not(:hidden)");
			if(hover.length == 0 && li.length > 0){
				li.eq(0).addClass("hover");
			}else if(hover.length > 0 && hover.nextAll(":not(:hidden):eq(0)").length > 0){
				hover.removeClass("hover");
				hover.nextAll(":not(:hidden):eq(0)").addClass("hover");
			}
		} else {
			if(hover.length > 0 && e.keyCode == 13){
				hover.click();
			}
			hover.removeClass("hover");
			var lis = $(this).next().next().find("li");
			lis.hide();
			for(var i=0;i<lis.length;i++){
				var li = $(lis[i]);
				var text = li.text();
				if(text.toUpperCase().indexOf(this.value.toUpperCase()) != -1 
						|| JL.convertToPinYin(text, 0).indexOf(this.value.toUpperCase()) != -1
						|| JL.convertToPinYin(text, 1).indexOf(this.value.toUpperCase()) != -1 ){
					li.show();
				}
			}
		}
	});
	
	var serch = $("#d_serchMenu > span");
	serch.click(function(){
		var value = $(this).prev().val();
		var datalist = $(this).next().find("[value='"+value+"']");
		if(datalist.length > 0){
			quickLoadPage(datalist);
		}
		$(this).next().hide();
	});
	
	for(var i=0; i<userMenu.length; i++){
		var row = userMenu[i];
		if(row.MJBJ == 1){
			var li = $("<li>").appendTo($("#d_serchMenu > .jl_dropdown_menu"));
			if(!JL.isNull(row.CD03) && row.CD03.indexOf("BZ01") != -1){
				li.attr("value", row.CDMC + "-" + row.CD02);
				li.append("<a>"+ row.CDMC + "-" + row.CD02 +"</a>");
			}else{
				li.attr("value", row.CD02);
				li.append("<a>"+row.CD02+"</a>");
			}
			li.data(row);
			li.click(function(){
				var data = $(this).data();
				var ul = $(this).parent();
				ul.prevAll(":text").val($(this).find("> a").html());
				ul.hide();
				quickLoadPage($(this));
			});
		}
	}
}

var quickLoadPage = function(obj){
	var config = obj.data();
	if(config.CD03 == "GZL"){
		getGZLBZ(config.CD01, function(resultData){
			var menu = resultData.data.resultList[0];
			menu.CD02 = config.CD02
			menu.GZL02 = config.CD02
			loadPage(menu, config);
		});
	}else{
		var parent = {};
		parent.CD01 = config.CD08;
		parent.CD02 = config.CDMC;
		var grand = {};
		if(!JL.isNull(config.GCD01)){
			grand.CD01 = config.GCD01;
			grand.CD02 = config.GCDMC;
		}
		loadPage(config, parent, grand);
	}
}

var loadMenu = function(){
	
	var userMenu = JSON.parse(localStorage.userMenu);
	
	for(var i=0;i<userMenu.length;i++){
		var row = userMenu[i];
		var ul = $(".jl_nav > .nav_menu");
		if(!JL.isNull(row.PARENT)){
			if(row.JB == 4){
				ul = ul.find("[data-id='"+row.PARENT+"'] > div > ul");
			}else{
				ul = ul.find("[data-id='"+row.PARENT+"'] > ul");
			}
		}
		if(ul.find("li[data-id='"+row.CD01+"']").length == 0){
			var CD03 = JL.isNull(row.CD03)? {}: JSON.parse(row.CD03);
			var li = $("<li>").appendTo(ul);
			li.data(row);
			li.attr("data-id", row.CD01);
			
			if(!JL.isNull(CD03.GZL01) && !JL.isNull(CD03.BZ01) && CD03.BZ03 != 1){
				li.attr("GZL01", CD03.GZL01);
				li.attr("BZ01", CD03.BZ01);
			}
			
			var a = $("<a class='text_hide'>").appendTo(li);
			
			if(row.MJBJ == 0){
				var ul = $("<ul>").appendTo(li);
				if(row.JB == 1){
					ul.addClass("sub_menu");
				}else if(row.JB == 2){
					ul.addClass("thr_menu");
				}else if(row.JB == 3){
					ul.wrap("<div>");
					ul.parent().addClass("fou_menu");
				}
			}
			
			var i_fa = "";
			if(!JL.isNull(row.CD10)){
				i_fa = row.CD10;
			}else if(row.VIEW04 == 1){
				i_fa = "folder";
			}else if(row.VIEW04 == 2){
				i_fa = "book";
			}else if(row.VIEW04 == 3){
				i_fa = "file-text";
			}else if(row.VIEW04 == 4){
				i_fa = "arrow-circle-right";
			}
			
			if(!pubJson.backMenuSwitch){
				a.append("<i class='fa fa-"+i_fa+"'></i>");
			}
			a.attr("title",row.CD02);
			a.append(row.CD02);
			if(row.VIEW04 == 1 && row.CD04 == 0){
				a.append("<i class='arrow fa fa-angle-left position_a right0'></i>");
			}else if(row.VIEW04 == 2 && row.CD04 == 0){
				a.append("<i class='arrow fa fa-angle-left'></i>");
			}
			
			if(!JL.isNull(row.NUM) && !JL.isNull(CD03.BZ03) && CD03.BZ03 != 1){
				a.append("<label class='bgcolor_red'>"+row.NUM+"</label>");
			}
			
			//末级菜单才可以打开菜单
			if(!JL.isNull(row.CD03)){
				li.click(function(){
					var config = $(this).data();
					loadPage(config, $(this).parent().closest("li").data());
				});
			}
			
			//默认展开第一个菜单
			if(i == 0){
				li.addClass("xuan bian");
				li.find("> a > i:last").removeClass("fa-angle-left").addClass("fa-angle-down");
				li.find("> ul").show();
			}
		}
	}
}

var getGZLBZ = function(parent, func){
	var XmlData = {};
	XmlData["GZL01"] = parent;
	XmlData["RYBH"] = userInfo.PCRM_CZY01;
	var ajaxJson = {};
	ajaxJson["async"] = true;
	ajaxJson["src"] = "CX/selectGZLBZDB.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = func;
	JL.ajax(ajaxJson);
}

var loadGZLBZ = function(parent, obj){
	if(obj.find("> div.thr_menu").length == 0){
		var div = $("<div>").appendTo(obj);
		div.addClass("thr_menu");
		var ul = $("<ul>").appendTo(div);
		
		getGZLBZ(parent, function(resultData){
			var list = resultData.data.resultList;
			
			for(var i=0;i<list.length;i++){
			var row = list[i];
				if(ul.find("li[data-id='"+row.CD01+"']").length == 0){
					var li = $("<li>").appendTo(ul);
					li.data(row);
					li.attr("data-id", row.CD01);
					var a = $("<a>").appendTo(li);
					var i_fa = JL.isNull(row.CD10)? "file-text-o": row.CD10;
					a.append("<i class='fa fa-"+i_fa+"'></i>");
					a.append("<span>"+row.BZ02+"</span>");
					if(row.BZ03 != 1){
						a.append("<label class='bgcolor_red'>"+row.NUM+"</label>");
					}
					li.click(function(){
						var liData = $(this).data();
						var parentLi = $(this).parent().closest("li");
						var parent = parentLi.data();
						var grand = parentLi.parent().closest("li").data();
						
						if(liData.BZ03 != 1){
							liData.CD03 = JSON.stringify({"GZL01":liData.GZL01,"BZ01":liData.BZ01});
						}
						liData.GZL02 = parent.CD02;
						liData.CD02 = parent.CD02;
						loadPage(liData, parent, grand);
					});
				}
			}
		});
	}
}

//流程图取数
var getLCT = function(json){
	var XmlData = {};
	XmlData["BZ01"] = json.BZ01;
	if(!JL.isNull(json.PID)){
		XmlData["PID"] = json.PID;
	}
	var ajaxJson = {};
	ajaxJson["src"] = "CX/selectDBGZL.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data.resultList;
	}else{
		resultData = [];
	}
	return resultData;
}
//加载流程图
var loadLCT = function(ul, json){
	var jl_process = $("<div>").appendTo(ul);
	jl_process.addClass("jl_process hide");
	
	var i_sort = $("<i>").appendTo(jl_process);
	i_sort.addClass("fa fa-sort-amount-asc");
	i_sort.attr("title", "查看已处理步骤");
	
	var jl_process_menu = $("<div>").appendTo(jl_process);
	jl_process_menu.addClass("jl_process_menu hide");

	var jl_dropdown_menu = $("<ul>").appendTo(jl_process_menu);
	jl_dropdown_menu.addClass("jl_dropdown_menu");
	
	var step = $("<ul>").appendTo(jl_process);
	if(!JL.isNull(json.BZ01) && !JL.isNull(json.XW01)){
		jl_process.show()
		var old = {};
		var arr = [];
		var resultData = getLCT(json);
		for(var i=0; i<resultData.length; i++){
			var row = resultData[i];
			if(!JL.isNull(row.SJ)){
				old = row;
				jl_dropdown_menu.append("<li><a>"+row.RYMC+"<label class='jl_btn bgcolor_gray'>"+row.BZ02+" "+row.SJ+"</label></a></li>");
			}else if(row.SJ == ""){
				arr.push(row);
			}
		}
		jl_dropdown_menu.append("<li><a>"+userInfo.PCRM_CZY03+"<label class='jl_btn bgcolor_green'>当前流程</label></a></li>");
		
		if(json.BZ03 == 1){
			step.append("<li class='before before01'>"+json.BZ02+"</li>");
			step.append("<li class='after'>"+resultData[0].BZ02+"</li>");
		}else if(arr.length > 0){
			step.append("<li class='before'>"+old.BZ02+"</li>");
			step.append("<li class='center'>"+json.BZ02+"</li>");
			step.append("<li class='after'>"+arr[0].BZ02+"</li>");
		}else{
			step.append("<li class='before'>上一步流程</li>");
			step.append("<li class='after'>"+json.BZ02+"</li>");
		}
	}else if(JL.isNull(json.YWSJ) || !JL.isNull(json.YWSJ.bdbh)){
		//jl_process.show();
		//step.append("<li class='center center01'>制单</li>");
		//step.append("<li class='after'>封单</li>");
		//jl_dropdown_menu.append("<li><a>"+userInfo.PCRM_CZY03+"<label class='jl_btn bgcolor_green'>当前流程</label></a></li>");
	}
}

var loadTab = function(json, parentData, grandData){
	var data_name = JL.formatDataName(json);
	var jl_content = $(".jl_main > .page_main > .jl_content");
	var ul_title = jl_content.find("> .jl_huoye_title > ul");
	if(ul_title.find("li[data-name='"+data_name+"']").length > 0){
		ul_title.find("li[data-name='"+data_name+"'] > a > i.fa-times-circle").click();
	}
	if(ul_title.find("li[data-name]").length == 5){
		ul_title.find("li[data-name]:not(.suo):last > a > i.fa-times-circle").click();
	}
	var li = $("<li>").addClass("xuan").prependTo(ul_title);
	var lockMenu = JL.isNull(localStorage["lockMenu"+userInfo.PCRM_CZY02])? {}: JSON.parse(localStorage["lockMenu"+userInfo.PCRM_CZY02]);
	if(!JL.isNull(lockMenu[data_name])){
		li.addClass("suo");
	}
	li.siblings().removeClass("xuan");
	li.attr("data-id", json.random);
	li.attr("data-name", data_name);
	li.data(json);
	var a = $("<a>"+json["CD02"]+"</a>").appendTo(li);
	a.click(function(event){
		if($(event.target).is("a")){
			var xuan = $(this).closest("li");
			li.siblings().removeClass("xuan");
			xuan.siblings("xuan").removeClass("xuan");
			xuan.addClass("xuan");
			var data_id = xuan.attr("data-id");
			
			$(".page_main > .jl_order_asc > ul").hide();
			$(".page_main > .jl_order_asc > ul[data-id='"+data_id+"']").show();
			$(".jl_main > .page_main > .jl_content > .jl_huoye_main > .jl_breadcrumb").hide();
			$(".jl_main > .page_main > .jl_content > .jl_huoye_main > .jl_breadcrumb[data-id='"+data_id+"']").show();
			$(".jl_main > .page_main > .jl_content > .jl_huoye_main > .pagr_content").hide();
			$(".jl_main > .page_main > .jl_content > .jl_huoye_main > .pagr_content[data-id='"+data_id+"']").show();
		}
	});
	var remove = $("<i class='fa fa-times-circle'></i>").appendTo(a);
	remove.click(function(){
		var this_li = $(this).closest("li");
		var data_id = this_li.attr("data-id");
		if(this_li.closest("li").next().length > 0){
			this_li.closest("li").next().find("a").click();
		}else if(this_li.closest("li").prev().length > 0){
			this_li.closest("li").prev().find("a").click();
		}else{
			//$("#systemMenu > a").click();
			return false;
		}
		$(".jl_main > .page_main > .jl_order_asc > ul[data-id='"+data_id+"']").remove();
		$(".jl_main > .page_main > .jl_content > .jl_huoye_title > ul > li[data-id='"+data_id+"']").remove();
		$(".jl_main > .page_main > .jl_content > .jl_huoye_main > .jl_breadcrumb[data-id='"+data_id+"']").remove();
		$(".jl_main > .page_main > .jl_content > .jl_huoye_main > .pagr_content[data-id='"+data_id+"']").remove();
	});
	var thumb = $("<i class='fa fa-thumb-tack'></i>").appendTo(a);
	thumb.click(function(){
		var li = $(this).closest("li");
		var data_name = li.attr("data-name");
		var lockMenu = JL.isNull(localStorage["lockMenu"+userInfo.PCRM_CZY02])? {}: JSON.parse(localStorage["lockMenu"+userInfo.PCRM_CZY02]);
		if(li.hasClass("suo")){
			li.removeClass("suo");
			delete lockMenu[data_name];
		}else{
			li.addClass("suo");
			lockMenu[data_name] = li.data();
		}
		localStorage["lockMenu"+userInfo.PCRM_CZY02] = JSON.stringify(lockMenu);
	});
	
	var jl_breadcrumb = $("<div>").prependTo(jl_content.find("> .jl_huoye_main"));
	jl_breadcrumb.addClass("jl_breadcrumb");
	jl_breadcrumb.attr("data-id", json.random);
	
	var guide = $("<ul>").appendTo(jl_breadcrumb);
	guide.append("<li><i class='fa fa-home mr5'></i><a href='index.html'>首页</a></li>");
	if(!JL.isNull(grandData)){
		guide.append("<i class='fa fa-angle-right'>");
		guide.append("<li><a>"+grandData.CD02+"</a></li>");
	}
	if(!JL.isNull(parentData)){
		guide.append("<i class='fa fa-angle-right'>");
		guide.append("<li><a>"+parentData.CD02+"</a></li>");
	}
	var mj = JL.isNull(json.BZ02)? json.CD02: json.BZ02;
	guide.append("<i class='fa fa-angle-right'>");
	guide.append("<li><a>"+mj+"</a></li>");
	
	//加载流程图
	loadLCT(jl_breadcrumb, json);
	//加载前置单据
	loadQZDJ(json);
	
	a.click();
}

var loadQZDJ = function(json){
	if(!JL.isNull(json.prev) || !JL.isNull(json.next)){
		var jl_order_asc = $(".jl_order_asc");
		jl_order_asc.children().hide();
		var ul = $("<ul>").appendTo(jl_order_asc);
		ul.attr("data-id", json.random);
		
		
		if(!JL.isNull(json.next)){
			$("<li title='后置单据'><i class='fa fa-file-text-o mr5'></i>"+json.next.bdmc+"</li>").appendTo(ul);
			$("<i class='fa fa-angle-right fr ml10 mr10'></i>").appendTo(ul);
		}

		$("<li class='xuan' title='当前单据'><i class='fa fa-file-text-o mr5'></i>"+json.bdmc+"</li>").appendTo(ul);
		
		if(!JL.isNull(json.prev)){
			$("<i class='fa fa-angle-right fr ml10 mr10'></i>").appendTo(ul);
			$("<li title='前置单据'><i class='fa fa-file-text-o mr5'></i>"+json.prev.bdmc+"</li>").appendTo(ul);
		}
	}
}

var loadMain = function(json, parentData, grandData, formData, afterFunc){ 
	loadTab(json, parentData, grandData);

	var div = $("<div>").appendTo($(".jl_main > .page_main > .jl_content > .jl_huoye_main"));
	div.siblings(".pagr_content").hide();
	div.addClass("pagr_content");
	div.attr("data-id", json.random);
	div.attr("data-name", JL.formatDataName(json));
	div.data(json);
	div.data("formData", formData);
	
	if(json.CD11 == 1){
		JL.fullScreen(div[0]);
	}
	
	div.load(json.url+"?rid="+Math.random(), function(a,ajaxType,c,d,e){
		if(ajaxType == "success"){
			var data_id = $(this).attr("data-id");
			var data_name = $(this).attr("data-name");
			var config = $(this).data();
			var jl_form = eval(data_name);
			jl_form.setTab($(this)); 
			jl_form.setData(config["YWSJ"]);
			if(config["CS"] == true){
				jl_form.setData({"CS":true,"sk01":config.formData.SK01});
				jl_form.initField=["initField"];
				jl_form.previewForm();
			} else if (config["PCRM_YB"] == true){
				jl_form.setData({"PCRM_YB":true,"sk01":config.formData.SK01});
				jl_form.initField=["initField"];
				jl_form.previewForm(); 
				jl_form.plugin.toolbar.obj.hide();
			}else if(!JL.isNull(config["CD03"]) && config["CD03"].indexOf("\"BZ03\":\"1\"") == -1){
				if(!JL.isNull(config["YWSJ"]) && !JL.isNull(config["YWSJ"]["preview"])){
					jl_form.preview = true;
					jl_form.previewForm();
				}else{
					jl_form.initForm();
				}
			} else {
				config["HIDEFIELD"] = JL.isNull(config["HFID"])? []: JSON.parse(config["HFID"])
				jl_form.setWorkflow(config);
				jl_form.setHideField(config["HIDEFIELD"]);
				jl_form.initForm();
			}
		}
		
		if(JL.isFunction(afterFunc)){
			afterFunc();
		}
	});
	div.prepend("<script type='text/javascript' src='"+json.url.replace(json.bdym+".html", "js/"+json.bdym+".js")+"?rid="+Math.random()+"'><\/script>");
}

var loadPage = function(data, parentData, grandData, afterFunc){
	$('html,body').animate({scrollTop:0}, 300);
	var formData = $.extend({}, data);
	var json = JL.formatURL(formData);
	if(JL.isNull(json.CD11) || json.CD11 == 0 || json.CD11 == 1){
		loadMain(json, parentData, grandData, formData, afterFunc);
	}else{
		window.open(json.url);
	}
}
