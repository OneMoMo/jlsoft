var JLSearch = function(json){
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
		this.input.val(data);
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
			this.input.attr("disabled","disabled");
			if(!JL.isNull(this.remove)){
				this.remove.hide();
			}
		}else{
			this.input.removeAttr("disabled");
			if(!JL.isNull(this.remove)){
				this.remove.show();
			}
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

	this.query = function(){
		this.obj.find("div.jl_dropdown_menu").remove();
		
		var queryConfig = this.config.queryConfig;
		queryConfig.form = this.form;
		var sqlMap = null;
		if(!JL.isNull(queryConfig.querybh)){
			sqlMap = {};
			sqlMap.result = [];
			
			var ajaxJson = {};
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/FormQuery/getConfig.do?rid="+Math.random();
			ajaxJson["data"] = {"XmlData":JSON.stringify({"CX01":queryConfig.querybh})};
			var resultData = JL.ajax(ajaxJson);
			if(!JL.isNull(resultData)){
				resultData = resultData.data;
				
				var CXJG = resultData["CXJG"];
				var headers = [];
				var groupField = "";
				$.each(CXJG, function(i,val){
					var header = {};
					header["id"] = val["JG01"];
					header["name"] = val["JG02"];
					if(val["JG03"] > 0){
						header["width"] = val["JG03"];
					}else{
						var fontSize = (window.getComputedStyle(document.body, "").fontSize || 12).replace("px", "");
						header["width"] = Number(fontSize) * header.name.length + 20;
					}
					if(val["JG04"] != 0){
						header["hidden"] = true;
					}
					if(!JL.isNull(val["JG05"])){
						header["summary"] = val["JG05"];
					}
					if(val["JG06"] == 1){
						groupField = val["JG01"];
					}
					headers.push(header);
				});
				sqlMap.result = headers;
			}
		}else{
			sqlMap = JL.getSqlMap(queryConfig);
		}

		var input_value = this.input.val();
		var XmlData = {};
		if(!JL.isNull(queryConfig.init)){
			$.each(queryConfig.init, function(name,value){
				var split = name.split(".");
				if(split.length > 1){
					if(split[1] == "key"){
						var pluginData = queryConfig.form.getPluginObj(split[0]).getData();
						XmlData[value] = pluginData.key;
					}else if(split[1] == "value"){
						var pluginData = queryConfig.form.getPluginObj(split[0]).getData();
						XmlData[value] = pluginData.value;
					}else{
						var rowindex = queryConfig.form.getPluginObj(split[0]).getSelectedIndex()[0];
						var pluginData = queryConfig.form.getPluginObj(split[0]).getData(rowindex);
						XmlData[value] = pluginData[split[1]];
					}
				}else{
					XmlData[value] = queryConfig.form.getTab().find("[name='"+name+"']").val();
				}
			});
		}
		if(!JL.isNull(queryConfig.queryField)){
			$.extend(XmlData, queryConfig.queryField);
		}
		if(!JL.isNull(this.input.val())){
			var textid = JL.isNull(queryConfig.textid)? this.config.id: queryConfig.textid;
			XmlData[textid] = this.input.val();
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

		var jl_dropdown_menu = $("<div>").appendTo(this.obj);
		jl_dropdown_menu.addClass("jl_dropdown_menu min_w12");
		jl_dropdown_menu.show();
		jl_dropdown_menu.width();
	
		if(!JL.isNull(sqlMap.result)){
			var jl_dropdown_menu_title = $("<div>").appendTo(jl_dropdown_menu);
			jl_dropdown_menu_title.addClass("jl_dropdown_menu_title");
			var dl = $("<dl>").appendTo(jl_dropdown_menu_title);
			//var dt = $("<dt><i class='fa fa-square-o'></i></dt>").appendTo(dl);
			/*dt.click(function(){
				$(this).closest(".jl_dropdown_menu_title").next().find(".fa-square-o").parent().click();
			});*/
			var width = 0;
			for(var i=0; i<sqlMap.result.length; i++){
				var row = sqlMap.result[i];
				var dd = $("<dd>").appendTo(dl);
				dd.attr("data-id", row.id);
				dd.css("width", (row.width)+"px");
				dd.html(row.name);
				if(row.hidden){
					dd.hide();
				}else{
					width += (row.width);
				}
			}
			if(this.obj.width() > width){
				jl_dropdown_menu_title.addClass("min_w12");
			}else{
				jl_dropdown_menu_title.css("width", width + "px");
			}
		}
		
		debugger;
		var resultData = null;
		if(!JL.isNull(queryConfig.querybh)){
			resultData = this.form.getJLQueryPaging(queryConfig.querybh, XmlData);
		}else{
			resultData = this.form.getSqlResult(XmlData, queryConfig.namespace, queryConfig.sqlid, queryConfig.dir);
		}
		if(!JL.isNull(resultData)){
			if(typeof resultData == "object" && !$.isArray(resultData)){
				if(resultData.MSGID == "E" && resultData.MESSAGE != undefined){
					JL.tip(resultData.MESSAGE, "info");
					return false;
				}
				var fileName = resultData.fileName;
				resultData = resultData.data;
				if(!JL.isNull(resultData) && resultData.resultlist != undefined){
					resultData = resultData.resultlist;
				}
			}
			if(resultData.length == 1 && thisPlugin.ul.find("> li:contains('"+input_value+"')").length == 1){
				this.obj.find("div.jl_dropdown_menu").remove();
				thisPlugin.input.attr("readonly", "readonly");
				JL.callback(queryConfig, resultData , thisPlugin.form);
			} else {
				var jl_dropdown_menu_main = $("<div>").appendTo(jl_dropdown_menu);
				jl_dropdown_menu_main.addClass("jl_dropdown_menu_main min_w12");
				for(var j=0; j<resultData.length; j++){
					if(j<10){
						var rowData = resultData[j];
						var dl = $("<dl>").appendTo(jl_dropdown_menu_main);
						dl.data(rowData);
						dl.addClass("w12");
						dl.click(function(){
							$(this).closest(".jl_dropdown_menu").hide();
							thisPlugin.input.attr("readonly", "readonly");
							JL.callback(queryConfig, [$(this).data()], thisPlugin.form);
							if(JL.isFunction(thisPlugin.config.listener.selected)){
								thisPlugin.config.listener.selected(thisPlugin);
							}
						});
						for(var i=0; i<sqlMap.result.length; i++){
							var row = sqlMap.result[i];
							var dd = $("<dd>").appendTo(dl);
							dd.css("width", (row.width)+"px");
							dd.attr("title", rowData[row.id]);
							dd.html(rowData[row.id]);
							if(row.hidden){
								dd.hide();
							}else{
								width += (row.width);
							}
						}
					}
				}
				var jl_dropdown_menu_bottom = $("<div>").appendTo(jl_dropdown_menu);
				jl_dropdown_menu_bottom.addClass("jl_dropdown_menu_bottom min_w12");
				jl_dropdown_menu_bottom.append("<dl>约"+resultData.length+"个结果</dl>");
			}
		}else{
			var jl_dropdown_menu_bottom = $("<div>").appendTo(jl_dropdown_menu);
			jl_dropdown_menu_bottom.addClass("jl_dropdown_menu_bottom min_w12");
			jl_dropdown_menu_bottom.append("<dl>无结果</dl>");
		}
		
		this.obj.find("ul.jl_dropdown_menu > li").remove();
	}
	
	this.init = function(){
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		var delete_input = $("<div>").appendTo(this.obj); 
		delete_input.addClass("delete_input");
		
		var input = $("<input>").appendTo(delete_input); 
		input.attr("type", "text");
		input.attr("name", this.config.id);
		if(!JL.isNull(this.config.placeholder)){
			input.attr("placeholder", this.config.placeholder);
		}
		if(this.config.readonly){
			input.attr("readonly", "readonly");
		}
		if(!JL.isNull(this.config.css)){
			input.addClass(this.config.css);
		}
		
		input.focus(function(){
			thisPlugin.obj.find("div.jl_dropdown_menu").remove();
			if(!JL.isNull(userHotList) && !$(this).prop("readonly")){
				thisPlugin.ul.empty();
				var HOT_LIST = userHotList[thisPlugin.config.hot];
				HOT_LIST = JL.isNull(HOT_LIST)? [] : HOT_LIST;
				for(var i=0; i<HOT_LIST.length; i++){
					var key = HOT_LIST[i].CODE;
					var value = HOT_LIST[i].NAME;
					var li = $("<li>").appendTo(thisPlugin.ul);
					li.append("<a>"+value+"</a>");
					li.attr("data-key", key);
					li.data({"key":key,"value":value});
					li.click(function(){
						thisPlugin.remove.click();
						var data = $(this).data();
						thisPlugin.input.val(data.value);
						$(this).parent().hide();
						setTimeout(function(){
							thisPlugin.search.click();
						}, 10);
					});
				}
			}
		});
		
		input.blur(function(){
			if(!JL.isNull(thisPlugin.config.listener) && JL.isFunction(thisPlugin.config.listener.blur)){
				var data = thisPlugin.input.val();
				thisPlugin.config.listener.blur(thisPlugin, data);
			}
			
			if(!JL.isNull(this.value) && !$(this).prop("readonly") && thisPlugin.obj.find("div.jl_dropdown_menu:not(:hidden)").length == 0){
				setTimeout(function(){
					thisPlugin.search.click();
				}, 100);
			}
		});
		
		input.keyup(function(e){
			var hover = thisPlugin.ul.find("> li.hover:not(:hidden)");
			if(e.keyCode == 38){ // 上 键
				if(hover.length == 0){
					thisPlugin.ul.find("> li:not(:hidden):last").addClass("hover");
				}else if(hover.length > 0){
					hover.siblings("li").addBack().removeClass("hover");
					if(hover.prevAll(":not(:hidden):eq(0)").length > 0){
						hover.prevAll(":not(:hidden):eq(0)").addClass("hover");
					}else{
						thisPlugin.ul.find("> li:not(:hidden):last").addClass("hover");
					}
				}
			} else if(e.keyCode == 40){ // 下 键
				var li = hover.siblings(":not(:hidden)");
				if(hover.length == 0){
					thisPlugin.ul.find("> li:not(:hidden):first").addClass("hover");
				}else if(hover.length > 0){
					hover.siblings("li").addBack().removeClass("hover");
					if(hover.nextAll(":not(:hidden):eq(0)").length > 0){
						hover.nextAll(":not(:hidden):eq(0)").addClass("hover");
					}else{
						thisPlugin.ul.find("> li:not(:hidden):first").addClass("hover");
					}
				}
			} else if(e.keyCode == 13){
				if(!thisPlugin.ul.is(":hidden") && thisPlugin.ul.find("li.hover").length > 0){
					thisPlugin.ul.find("li.hover").click();
				}else{
					setTimeout(function(){
						thisPlugin.search.click();
					}, 0);
				}
			}else{
				var input_value = $(this).val();
				var lis = thisPlugin.ul.find("> li");
				if(JL.isNull(input_value)){
					$(this).focus();
				}else{
					lis.hide();
					for(var i=0; i<lis.length; i++){
						var value = $(lis[i]).data("value");
						
						var pinyin_i_v = JL.convertToPinYin(input_value).toString().toLowerCase();
						var pinyin_v = JL.convertToPinYin(value).toString().toLowerCase();
						
						if(value.indexOf(input_value) != -1 || pinyin_v.indexOf(pinyin_i_v) != -1){
							$(lis[i]).show();
						}
					}
				}
			}
		});
		
		if(!this.config.readonly){
			var remove = $("<i>").appendTo(delete_input);
			//remove.addClass("fa fa-times");
			remove.html("×");
			remove.attr("title", "清空");
			remove.click(function(){
				thisPlugin.setData("");
				thisPlugin.input.removeAttr("readonly");
				//清空方法
				if(!JL.isNull(thisPlugin.config.listener.remove)){
					if(thisPlugin.config.listener.remove(thisPlugin)){
						return false;
					}
				}
				//自定义查询回填结果清空使用方法
				if(!JL.isNull(thisPlugin.config.listener.queryremove)){
					thisPlugin.config.listener.queryremove(thisPlugin);
				}
				var queryConfig = thisPlugin.config.queryConfig;
				$.each(queryConfig.fieldMapping, function(key, value){
					JLQuery.write(value, "");
				});
			});
			this.remove = remove;
		}
		
		var search = $("<span class='jl_btn btn_white'><i class='fa fa-search'></i></span>").appendTo(this.obj);
		search.click(function(){
			thisPlugin.query();
		});
		
		var ul = $("<ul>").appendTo(this.obj);
		ul.addClass("w12 jl_dropdown_menu overflow_y");
		ul.css({"max-height": $(window).height() / 2 +"px"});
		this.input = input;
		this.search = search;
		this.ul = ul;
	}
	this.init();
};

