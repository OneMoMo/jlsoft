var JLSearch_Mobile = function(json){
	this.config = {
		"default": null, //默认选中
		"placeholder": "", //选项样式
		"css": null, //选项样式
		"type": "text", //选项样式
		"default": "",
		"hot": "",
		"readonly": false, //只读配置 true|false
		"format": {}, //选项
		"split": "", //取值时按此分割成数组
		"listener": {} //监听事件 click
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = "";
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setData = function(data){
		this.data = data;
		this.resultDiv.html(data);
	}

	this.setCdsData = function(json, cdsid){
		if(!JL.isNull(json)){
			this.setData(json);
		}else{
			this.setData("");
		}
	}
	
	this.getData = function(){
		if(!JL.isNull(this.config.split) && !JL.isNull(this.data)){
			return this.data.split(this.config.split);
		}else{
			return this.data;
		}
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			//this.input.attr("disabled","disabled");
			//this.span.hide();
		}else{
			//this.input.removeAttr("disabled");
		}
		
	}
	
	this.hide = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.obj.hide();
		}else{
			this.obj.show();
		}
	}

	this.query = function(XmlData){
		var jl_page_container = $("<div>").appendTo(this.obj);
		jl_page_container.addClass("jl_page_container");
		jl_page_container.animate({"right":"0px"},300);

		var header = $("<header>").appendTo(jl_page_container);
		header.addClass("jl_header position_f");

		var nav_left = $("<div>").appendTo(header);
		nav_left.addClass("header_nav nav_left");
		var placeholder = "查询结果";
		nav_left.html("<i class='fa fa-angle-left'></i><span>"+placeholder+"</span>");
		nav_left.click(function(){
			$(this).closest("header").removeClass("position_f");
			$(this).closest(".jl_page_container").animate({"right":"-100%"}, function(){
				$(this).closest(".jl_page_container").remove();
			});
		});

		var nav_right = $("<div>").appendTo(header);
		nav_right.addClass("header_nav nav_right");
		nav_right.html("<span>确定</span>");
		nav_right.click(function(){
			$(this).closest("header").removeClass("position_f");
			$(this).closest(".jl_page_container").animate({"right":"-100%"}, function(){
				$(this).closest(".jl_page_container").prev().animate({"right":"-100%"}, 300);
				$(this).closest(".jl_page_container").remove();
			});
		});
		
		var jl_main = $("<div>").appendTo(jl_page_container);
		jl_main.addClass("jl_main bgcolor_white");
		
		var jl_form = $("<div>").appendTo(jl_main);
		jl_form.addClass("jl_form w12");
		var jl_form_01 = $("<div>").appendTo(jl_form);
		jl_form_01.addClass("jl_form_01 w12");
		
		var queryConfig = this.config.queryConfig;
		queryConfig.form = this.form;
		var sqlMap = JL.getSqlMap(queryConfig);
		
		if(!queryConfig.multi){
			nav_right.hide();
		}

		XmlData = XmlData || {};
		if(!JL.isNull(queryConfig.queryField)){
			$.extend(XmlData, queryConfig.queryField);
		}
		if(!JL.isNull(queryConfig.listener) && !JL.isNull(queryConfig.listener.beforequery)){
			try{
				if(queryConfig.listener.beforequery(XmlData)){
					return true;
				}
			}catch(e){
				console.error(e);
			}
		}
		
		var resultData = this.form.getSqlResult(XmlData, queryConfig.namespace, queryConfig.sqlid, queryConfig.dir);
		this.fileName = resultData.fileName; 
		debugger;
		if(!JL.isNull(resultData.data)){
			this.lastPage = JL.getPagingData(this.fileName, "LASTPAGE") || 1;

			resultData = resultData.data;
			if(resultData.length == 1 && thisPlugin.ul.find("> li:contains('"+input_value+"')").length == 1){
				this.obj.find("div.jl_dropdown_menu").remove();
				thisPlugin.input.attr("readonly", "readonly");
				JL.callback(queryConfig, resultData);
			} else {
				var jl_dropdown_menu_main = $("<div>").appendTo(jl_main);
				jl_dropdown_menu_main.addClass("jl_form_01");
				this.appendResult(jl_dropdown_menu_main, resultData, sqlMap);
				var jl_dropdown_menu_bottom = $("<div>").appendTo(jl_main);
				jl_dropdown_menu_bottom.addClass("jl_title");
				jl_dropdown_menu_bottom.append("<dl class='w12'><span class='fl'><!--点击加载更多--></span><span class='fr'>约"+resultData.length+"个结果</span></dl>");
				jl_dropdown_menu_bottom.click(function(){
					var resultData = JL.getPagingData(fileName, "LASTPAGE");
				});
			}
		}else{
			var jl_dropdown_menu_bottom = $("<div>").appendTo(jl_main);
			jl_dropdown_menu_bottom.addClass("jl_dropdown_menu_bottom min_w12");
			jl_dropdown_menu_bottom.append("<dl>无结果</dl>");
		}
		
		this.obj.find("ul.jl_dropdown_menu > li").remove();
	}
	
	this.appendResult = function(jl_dropdown_menu_main, resultData, sqlMap){
		for(var j=0; j<resultData.length; j++){
			var rowData = resultData[j];
			var dl = $("<dl>").appendTo(jl_dropdown_menu_main);
			dl.data(rowData);
			dl.addClass("w12");
			dl.click(function(){
				thisPlugin.obj.find(".jl_page_container").eq(0).animate({"right":"-100%"},300);
				thisPlugin.obj.find(".jl_page_container").eq(1).animate({"right":"-100%"},function(){
					$(this).remove();
				});
				/*
				nav_right.click();
				$(this).closest(".jl_dropdown_menu").hide();
				thisPlugin.input.attr("readonly", "readonly");
				*/
				JL.callback(thisPlugin.config.queryConfig, [$(this).data()]);
				if(JL.isFunction(thisPlugin.config.listener.selected)){
					thisPlugin.config.listener.selected(thisPlugin);
				}
			});
			for(var i=0; i<sqlMap.result.length; i++){
				var row = sqlMap.result[i];
				var dt = $("<dd>").appendTo(dl);
				dt.addClass("w03 pl10 lh25 max_h25 text_hide");
				dt.html(row.name);
				var dd = $("<dd>").appendTo(dl);
				///dd.css("width", row.width+"px");
				dd.addClass("w09 pl10 lh25 max_h25 text_hide");
				dd.html(rowData[row.id]);
				if(row.hidden){
					dt.hide();
					dd.hide();
				}
			}
		}
	};
	
	this.loadHot = function(){
		if(!JL.isNull(userHotList)){
			var HOT_LIST = userHotList[this.config.hot];
			HOT_LIST = JL.isNull(HOT_LIST)? [] : HOT_LIST;
			for(var i=0; i<HOT_LIST.length; i++){
				var key = HOT_LIST[i].CODE;
				var value = HOT_LIST[i].NAME;
				var dl = $("<dl class='pt15 pb15'>").appendTo(this.jl_form_01);
				dl.append("<dd class='w12 pl10'><span>"+value+"</span><i class='fa fa-angle-right position_a right10'></i></dd>");
				dl.attr("data-key", key);
				dl.data({"key":key,"value":value});
				dl.click(function(){
					var queryConfig = thisPlugin.config.queryConfig;
					var textid = JL.isNull(queryConfig.textid)? thisPlugin.config.id: queryConfig.textid;
					var XmlData = {};
					XmlData[textid] = $(this).data("CODE");
					thisPlugin.query(XmlData);
				});
			}
		}
	}
	
	this.readData = function(){
		var queryConfig = thisPlugin.config.queryConfig;
		var textid = JL.isNull(queryConfig.textid)? thisPlugin.config.id: queryConfig.textid;
		var XmlData = {};
		XmlData[textid] = $(this).data("CODE");
		this.query(XmlData);
	}
	
	this.init = function(){
		$(this.obj).empty();
		var jl_btn_group = this.obj;
		var resultDiv = $("<div>").appendTo(jl_btn_group);
		resultDiv.addClass("w12 pr10 pt5 pb5 lh20 font_gray");
		resultDiv.click(function(){
			$(this).next().click();
		});
		var placeholder = JL.isNull(this.config.placeholder) ? "输入名称可查询" : this.config.placeholder;
		
		var span = $("<span class='form_icon position_a right10 pt5' id='CZ'><i class='fa fa-angle-right'></i></span>").appendTo(jl_btn_group)
		span.click(function(){
			var queryConfig = thisPlugin.config.queryConfig;
			var sqlMap = JL.getSqlMap(queryConfig);
			if(!JL.isNull(sqlMap.page_mobile)){
				thisPlugin.jl_seach.load(pubJson.getURL("FormUrl") + "/" +sqlMap.page_mobile);
			}
			
			$(this).next().show();
			$(this).next().animate({"right":"0px"},function(){
				$(this).find("header").addClass("position_f");
			});
		})
		var jl_page_container = $("<div>").appendTo(jl_btn_group);
		jl_page_container.addClass("jl_page_container");

		var header = $("<header>").appendTo(jl_page_container);
		header.addClass("jl_header");

		var nav_left = $("<div>").appendTo(header);
		nav_left.addClass("header_nav nav_left");
		var placeholder = JL.isNull(this.config.placeholder) ? "请选择" : this.config.placeholder;
		nav_left.html("<i class='fa fa-angle-left'></i><span>"+placeholder+"</span>");
		nav_left.click(function(){
			$(this).closest("header").removeClass("position_f");
			$(this).closest(".jl_page_container").animate({"right":"-100%"},300);
		});

		var nav_right = $("<div>").appendTo(header);
		nav_right.addClass("header_nav nav_right");
		nav_right.html("<span>查询</span>");
		nav_right.click(function(){
			thisPlugin.readData();
			$(this).closest("header").removeClass("position_f");
			$(this).closest(".jl_page_container").animate({"right":"-100%"},300);
		});
		
		var jl_main = $("<div>").appendTo(jl_page_container);
		jl_main.addClass("jl_main bgcolor_white");
		jl_main.append("<div class='jl_title'>查询条件</div>");
		var jl_seach = $("<div>").appendTo(jl_main);
		jl_seach.addClass("jl_form w12");
		jl_main.append("<div class='jl_title'>常用</div>");
		
		var jl_form = $("<div>").appendTo(jl_main);
		jl_form.addClass("jl_form w12");
		var jl_form_01 = $("<div>").appendTo(jl_form);
		jl_form_01.addClass("jl_form_01 w12");
		
		this.jl_form_01 = jl_form_01;
		this.jl_seach = jl_seach;
		this.resultDiv = resultDiv;
		this.span = span;
		this.loadHot();
	}
	this.init();
};

