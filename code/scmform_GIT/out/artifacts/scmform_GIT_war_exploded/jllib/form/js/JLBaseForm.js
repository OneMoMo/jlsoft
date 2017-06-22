function JLBaseForm(){ 
	var form = this;
	this.tab = null;
	this.plugin = {};
	this.pluginObj = {};
	this.data = {};
	this.event = [];
	this.events = "";
	
	this.afterInit = "";
	this.hideField = [];
	this.readonlyField = [];

	//this.sBillName = "form";
	//this.sOperateName = "getRecord";
	//this.async = "";
	//this.callback = {};

	this.setTab = function(tab){
		this.tab = tab;
	}
	this.getTab = function(){
		return $(this.tab);
	}
	this.find = function(selector){
		return $(this.tab).find(selector);
	}

	this.setData = function(json){
		var form = this;
		$.extend(this.data, json);
		if(JL.isNull(this.data.jlbh)){
			this.data.jlbh = 0;
		}
		
	};
     
	this.getData = function(field){
		delete this.data["_id"];
		if(!JL.isNull(field)){
			return this.data[field];
		}else{
			return this.data;
		}
	};
	
	this.setAfterInit = function(fn){
		this.afterInit = fn;
	};
	
	this.getAfterInit = function(){
		return this.afterInit;
	};
	
	this.setPlugin = function(json){
		$.extend(this.plugin, json);
	};
	
	this.getPlugin = function(key){
		if(JL.isNull(key)){
			return this.plugin;
		}else if(!JL.isNull(key)){
			return this.plugin[key];
		}
	}
	
	this.setPluginObj = function(json){
		$.extend(this.pluginObj, json);
	}
	
	this.getPluginObj = function(key){
		if(JL.isNull(key)){
			return this.pluginObj;
		}else if(!JL.isNull(key)){
			return this.pluginObj[key];
		}
	}

    this.setEvents = function(fn){
		this.events = fn;
	}

    this.setEvent = function(json){
    	this.event = this.event.concat(json);
    }

    this.runEvents = function(fn){
    	var form = this;
		if(!JL.isNull(this.events)){
			this.events();
		}
		if(!JL.isNull(this.event)){
			var form = this;
			$.each(this.event, function(i, row){
				if(typeof row.selector == "string"){
					//this.getTab().delegate(row.selector, row.event, row.func);
					form.getTab().off(row.event, row.selector);
					form.getTab().on(row.event, row.selector, row.func);
				}else{
					for(var j=0; j<row.selector.length; j++){
						var selector = row.selector[j];
						//this.getTab().delegate(selector, row.event, row.func);
						form.getTab().off(row.event, selector);
						form.getTab().on(row.event, selector, row.func);
					}
				}
			})
		}
	}
    
    this.define = function(json){
		var obj = this;
		$.each(json,function(key,value){
			obj[key] = value;
		})
	}
	
	this.emptyCard = function(data){
		var form = this;
		
		var formPage = null;
		if(form.getTab().find(".jl_defCar").length > 0){
			formPage = form.getTab().find(".jl_defCar");
		}else if(form.getTab().find(".addCarShow").length > 0){
			formPage = form.getTab().find(".addCarShow");
		}
		
		var plug = formPage.find("[id^='d_']");
		for(var i=0; i<plug.length; i++){
			var key = $(plug[i]).attr("id").split("d_")[1];
			var plugobj = form.pluginObj[key];
			if(plugobj.config.jlid != "JLToolBar"){
				var value = "";
				if($.inArray(plugobj.config.jlid, ["JLSelect","JLRadio","JLSelectMenuTree"]) != -1){
					value = {};
				}else if($.inArray(plugobj.config.jlid, ["JLUpload", "JLUploadImage", "JLCheckbox", "JLMultiSelect"]) != -1){
					value = [];
				}
				plugobj.setData(value);
			}
		}

		var text = formPage.find(":text");
		for(var i=0; i<text.length; i++){
			$(text[i]).val("");
		}
		this.readonly(this.readonlyField, false);
		
		$.each(form.pluginObj, function(key, plugin){
			if(!JL.isNull(plugin.config.default)){
				plugin.setData(plugin.config.default);
			}
		});
	}
	
	this.putCard = function(data){
		var form = this;
		var formPage = null;
		if(form.getTab().find(".jl_defCar").length > 0){
			formPage = form.getTab().find(".jl_defCar");
		}else if(form.getTab().find(".addCarShow").length > 0){
			formPage = form.getTab().find(".addCarShow");
		}
		
		$.each(data, function(key, value){
			if(formPage.find("#d_"+key).length > 0){
				form.pluginObj[key].setData(value);
			}else if(formPage.find("[name='"+key+"']").length > 0){
				var json = {};
				json[key] = value;
				form.initValue(json);
			}
		});
	}

	this.readonlyFields = function(fields, bool){
		var form = this;
		var formPage = null;
		if(form.getTab().find(".jl_defCar").length > 0){
			formPage = form.getTab().find(".jl_defCar");
		}else if(form.getTab().find(".addCarShow").length > 0){
			formPage = form.getTab().find(".addCarShow");
		}
		
		for(var i=0; i<fields.length; i++){
			var key = fields[i];
			if(JL.isNull(form.pluginObj[key])){
				if(bool){
					formPage.find("[name='"+key+"']").attr("readonly","readonly");
				}else{
					formPage.find("[name='"+key+"']").removeAttr("readonly");
				}
			} else {
				form.pluginObj[key].disabled(bool);
			}
		}
	}

	this.readonly = function(fields, bool){
		this.readonlyFields(this.readonlyField, false);
		fields = JL.isNull(fields)? []: fields;
		this.readonlyField = fields;
		this.readonlyFields(fields, bool);
	}


	this.cdsObj = {};

	this.getCds = function(name) {
		return this.cdsObj[name]== undefined ? null : this.cdsObj[name];
	};

	this.reloadPlugin = function(key, value){
		try{
			var form = this;
			var obj = this.getTab().find("#d_"+key);
			var initValue = this.data[key];
			if(!JL.isNull(value.jlid)){
				var JLID = JL.initPlugIn(obj, key, value, initValue, this.initField, this.hideField, form);
	
				if(!JL.isNull(JLID)){
					form.pluginObj[key] = JLID;
					if (value["cds"] != undefined) {
						var cdsName = value["cds"];
						var cds = form.getCds(cdsName)
						if (cds == null) {
							cds = new JLCds();
							form.cdsObj[cdsName] = cds;
						}
						cds.pluginObj[value["cds-field"] == undefined ? key : value["cds-field"]] = JLID;
					}
				}
			}
		}catch(e){
			console.info("字段名为"+key+"的控件报错信息为:"+e.message);	
		}
	};
	
	this.initPlugIn = function(){
		var form = this;
		var plugin = form.plugin;
		$.each(plugin, function(key, value){
			var obj = form.getTab().find("#d_"+key);
			var initValue = form.data[key];
			var initField = form.initField;
			var hideField = form.hideField; 
			if(!JL.isNull(value.jlid)){
				if (JL.isNull(value.param)){
					value.param={"PID":form.pid,"SK01":form.sk01}; 
				}
				var JLID = JL.initPlugIn(obj, key, value, initValue, initField, hideField, form);
				if(form.preview){
					if(value.jlid == "JLGrid"){
						JLID.disabled({});
					}else{
						JLID.disabled();
					}
				}
	
				if(!JL.isNull(JLID)){
					form.pluginObj[key] = JLID;
					if (value["cds"] != undefined) {
						var cdsName = value["cds"];
						var cds = form.getCds(cdsName)
						if (cds == null) {
							cds = new JLCds();
							form.cdsObj[cdsName] = cds;
						}
						cds.pluginObj[value["cds-field"] == undefined ? key : value["cds-field"]] = JLID;
					}
				}
			}
			if(!JL.isNull(value.querybh) || 
					(!JL.isNull(value.namespace) && !JL.isNull(value.sqlid)) ){
				var type = form.getTab().find("[name='"+key+"']");
				var htmlObj = null;
				if(!JL.isNull(value.jlid) && value.jlid == "JLInput" && type.is(":not(:disabled)")){
					htmlObj = type.parent().wrap("<div class='jl_btn_group "+(type.parent().attr("class") || "")+"'></div>");
					htmlObj.attr("class", "delete_input");
					htmlObj.parent().remove("delete_input");
					form.appendSpanQuery(htmlObj, value);
					if(!JL.isNull(JLID)){
						JLID.config.listener.queryremove = function(){
							$.each(value.fieldMapping, function(key, value){
								JLQuery.write(value, "");
							});
						}
					}
				}else if(type.attr("type") == "text" && type.is(":not(:disabled)")){
					htmlObj = type.wrap("<div class='jl_btn_group "+(type.attr("class") || "")+"'></div>");
					form.appendSpanQuery(htmlObj, value);
				}else{
					var json = {};
					json.selector = "[name='"+key+"']";
					json.event = "click";
					json.func = function(event){
						if(!JL.isNull(value.before) && typeof value.before == "function"){
							if(value.before()){
								return false;
							}
						}
						if(!JL.isNull(value.querybh)){
							JLQuery.show(form, value);
						}else if(!JL.isNull(value.sqlid)){
							JLQuery.show2(form, value);
						}
					}
					form.setEvent([json]);
				}

			}
		});	
	}
	
	this.disabledQuery = function(name, bool){
		bool = JL.isNull(bool)? true: bool;
		if(bool){
			this.find("[name='"+name+"']").closest(".jl_btn_group").find("span.jl_btn").hide();
		}else{
			this.find("[name='"+name+"']").closest(".jl_btn_group").find("span.jl_btn").show();
		}
	}
	
	this.appendSpanQuery = function(htmlObj, value){
		var form = this;
		var span = $("<span class='jl_btn btn_white'><i class='fa fa-search'></i></span>").appendTo(htmlObj.closest(".jl_btn_group"));
		span.click(function(){
			if(!JL.isNull(value.before) && typeof value.before == "function"){
				if(value.before()){
					return false;
				}
			}
			if(!JL.isNull(value.querybh)){
				JLQuery.show(form, value);
			}else if(!JL.isNull(value.sqlid)){
				JLQuery.show2(form, value);
			}
		});
	}

	this.initValue = function(data){
		var form = this;
		$.each(data,function(key,value){
			var html = form.getTab().find("[name='"+key+"']");
			var jl = form.getTab().find("#d_"+key);
			var html = form.getTab().find("[name='"+key+"']");
			if( jl.length > 0){
				
			}else if( html.length > 0){
				if(html[0].type == "radio"){
					value = JL.isString(value) ? value: value.key;
					html.filter("[value='"+value+"']").attr("checked",true);
				}else if(html[0].type == "checkbox"){
					var array = JL.isString(value) ? value.split("|"): value; 
					for(var i=0;i<array.length;i++){
						var row = array[i];
						row = JL.isString(row) ? row: row.key;
						html.filter("[value='"+row+"']").attr("checked",true);
					}
				}else{
					if(html[0].type == "select-one"){
						value = JL.isString(value) ? value: value.key;
					}
					html.val(value);
				}
			}
		});
		
		var plugin = this.plugin;
		$.each(plugin,function(key,value){
			var obj = form.getTab().find("[name='"+key+"']");
			if(!obj.is(":disabled") && !JL.isNull(value["qx"])){
				var qx = JL.isNull(userInfo[value["qx"]])? "": userInfo[value["qx"]];
				obj.val(qx);
			}
		});
	}

	this.setHideField = function(hideField){
		this.hideField = hideField;
	}
   
	this.initHidden = function(json){
		for(var i=0;i<json.HIDEFIELD.length;i++){
			var key = json.HIDEFIELD[i];
			if(key.indexOf(".") == -1) {
				this.getTab().find("#"+key).hide();
			}
		}
	}	

	this.lastInit = function(){
		if(!JL.isNull(this.afterInit)){
			this.afterInit();
		}
	}

	this.previewForm = function(json){
		this.loadData();
		this.initOA_SHMB();
		this.initDisabled({"INITFIELD":this.initField});  
		this.initPlugIn();
		this.initValue(this.data);
		this.lastInitOA();
		this.lastInit(); 
		setTimeout(function(){JL.loading(false);},1000);
		
		//判断是否是抄送，并回传抄送查看标记
		if (this.data.CS){
			var ajaxJson = {};
			var XmlData = {}; 
			XmlData.SK01 = this.data.sk01;  
			XmlData.CZY01 = userInfo.PCRM_CZY01;
			ajaxJson["src"] ="Jk/updateCC.do";
			ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)}; 
			console.info(ajaxJson);
			var resultData = JL.ajax(ajaxJson); 
		}
	}

	this.initOA_SHMB = function(json){
		var template = this.getTab().data("template");
		if(!JL.isNull(template)){
			var path = JL.Template[template]["path"];
			
			var div = this.find("#template");
			if(div.length == 0){
				div = $("<div id='template' class='w12'></div>").appendTo(this.getTab());
			}
			var html = JL.ajax({"src":path + template + ".html"}).error;
			div.append(html);
			try {
				div.append("<script type='text/javascript' src='"+ path + "js/" + template + ".js"+"?rid="+Math.random()+"'><\/script>");
				var plugin = eval(template);
				if(!JL.isNull(plugin.PCRM_HTBZ)){
					plugin.PCRM_HTBZ.param = {"SK01": this.sk01, "PID": this.pid};
				}
				this.setPlugin(plugin);
			} catch (e) {
				// TODO: handle exception
				console.error(e);
			}
		}
	}

	this.lastInitMobile = function(json){
		if(!JL.isNull(this.mobileBatchButton)){
			this.find("#common").show();
			this.find("#common").html("<i>批量</i>");
			this.find("#common").click(function(){
				if($(this).text() == "批量"){
					$(".jl_list_05 dl").animate({"padding-left":"30px"}, 300);
					$(".jl_list_05 dl dt").show();
					$(this).html("<i>取消</i>");
					var jl_edit_main = $("<div class='jl_edit_main hide'></div>").appendTo("body");
					jl_edit_main.fadeIn();
					form.setMobileBatchState(true);
					form.addMobileBatchButton(form.mobileBatchButton);
				}else{
					$(".jl_list_05 dl").animate({"padding-left":"0px"}, 300);
					$(".jl_list_05 dl dt").hide();
					$(this).html("<i>批量</i>");
					$(".jl_edit_main").fadeOut();
					form.setMobileBatchState(false);
				}
			});
		}
	};
	
	this.defaultMobileBatchButton = {
			
	};
	
	this.setMobileBatchState = function(bool){
		if(!JL.isNull(form.mobileBatchGrid)){
			for(var i=0; i<form.mobileBatchGrid.length; i++){
				var row = form.mobileBatchGrid[i];
				form.getPluginObj(row).mobileBatchState = bool;
			}
		}
	};
	
	this.addMobileBatchButton = function(buttons){
		$.each(buttons, function(key,value){
			if(key == "allCheck"){
				var button = $("<span class='mr10'><i class='fa fa-square-o'></i> 全选</span>").appendTo(form.find(".jl_edit_main"));
				if(!JL.isNull(form.mobileBatchGrid)){
					
				}
			} else {
				var button = null;
				var row = {};
				if(!JL.isNull(form.defaultMobileBatchButton[key])){
					$.extend(form.defaultMobileBatchButton[key], value);
					$.extend(row, form.defaultMobileBatchButton[key]);
				}else{
					row = value;
				}
				row.id = key;
				var css = !JL.isNull(row.css)? row.css: "jl_btn btn_color mr10";
				var html = "<a id='"+row.id+"' class='"+css+" mr5'><i class='fa fa-"+row.icon+" mr5'></i>"+row.name+"</a>"
				button = $(html).appendTo(form.find(".jl_edit_main"));
				button.click(row.func);
			}
		});
	};
	
	this.lastInitOA = function(json){
		var template = this.getTab().data("template");
		if(!JL.isNull(template)){
			//this.getPluginObj("OA_LOG").disabledCurrentData(true);
			var client = JL.getClient();
			if(!JL.isNull(this.data["OA_LOG"])){
				var OA_LOG = this.getTab().find("#d_OA_LOG");
				for(var i=0;i<this.data.OA_LOG.length; i++){
					var row = this.data.OA_LOG[i];
					
					var rowHtml = "";
					if(template == "DIALOG"){
						if(i%2 == 0){
							OA_LOG.append("<div class='jl_form_01 oa_demo_01 mt10'></div>");
							rowHtml = "<dl>"
								+ "	<dd class='w01'>跟进人</dd>"
								+ "	<dd class='w11'>"+row.OA_SHR+"</dd>"
								+ "	<dd class='w01'>跟进时间</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "	<dd class='w01'>发送至</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "	<dd class='w01'>跟进情况</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "</dl>";
						}else{
							rowHtml = "<dl>"
								+ "	<dd class='w01'>回复人</dd>"
								+ "	<dd class='w11'>"+row.OA_SHR+"</dd>"
								+ "	<dd class='w01'>回复时间</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "	<dd class='w01'>发送至</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "	<dd class='w01'>回复意见</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "	<dd class='w01'>修改记录</dd>"
								+ "	<dd class='w11'>"+row.OA_SHSJ+"</dd>"
								+ "</dl>";
						}
						OA_LOG.find(".jl_form_01:last").append(rowHtml);
					}else if(template == "OA_PROCESS"){
						if(JL.isNull(row.OA_SHZT)){
							if(client == "mobile"){
								rowHtml +=  "<div class='jl_title'>"+
								"    "+row.BZSJ+" ("+row.OA_SQR+")" +
								"	 <span class='ml10 font_gray'>"+row.OA_SQSJ+"</span></dt>"+
								"</div>"+
								"<div class='jl_form_01 hide'></div>";
							}else{
								rowHtml +=  "<dl class='w12 jl_catalog_line'>"+
								"    <dt class='catalog_title'><h3>"+row.BZSJ+"（"+row.OA_SQR+"）</h3><span>"+row.OA_SQSJ+"</span></dt>"+
								"    <dd class='w12'></dd>"+
								"    <dt class='catalog_cz'><i class='fa fa-angle-left' title='展开'></i></dt>"+
								"</dl>"+
								"<div class='jl_form_01 hide'></div>";
							}
						} else {
							var font_color = "font_green";
							if(row.OA_SHZT.value == "驳回" || row.OA_SHZT.value == "不同意"){
								font_color = "font_red";
							}
							if(client == "mobile"){
								rowHtml +=  "<div class='jl_title'>"+
								"    "+row.BZSJ+" ("+row.OA_SHR+")" +
								"	 <span class='ml10 "+font_color+"'>"+row.OA_SHZT.value+"</span></dt>"+
								"	 <span class='ml10 font_gray'>"+row.OA_SHSJ+"</span></dt>"+
								"    <i class='fa fa-angle-left' title='展开'></i>"+
								"</div>"+
								"<div class='jl_form_01 hide'>"+
								"	<dl>"+
								"		<dt class='w03' title='审核意见'>审核意见</dt>"+
								"		<dd class='w09'><ul><li class='w11'><span class='w12 tr font_gray'>"+row.OA_SHYJ+"</span></li></ul></dd>"+
								"	</dl>" +
								"</div>"
							}else{
								rowHtml += "<dl class='w12 jl_catalog_line'>"+
								"    <dt class='catalog_title'>" +
								"		<h3>"+row.BZSJ+"（"+row.OA_SHR+"）</h3>" +
								"		<span>" +
								"			<font class='"+font_color+" ml10'><b>"+row.OA_SHZT.value+"</b></font>";
								rowHtml += "			<font class='ml10 xx text_hide'>"+row.OA_SHYJ+"</font>";
								rowHtml += "			<font class='ml10'>"+row.OA_SHSJ+"</font>" +
								"		</span>" +
								"	</dt>"+
								"    <dd class='w12'></dd>"+
								"    <dt class='catalog_cz'><i class='fa fa-angle-left' title='展开'></i></dt>"+
								"</dl>"+
								"<div class='jl_form_01 hide'>"+
								"	<dl>"+
								"		<dt class='w01' title='审核意见'>审核意见</dt>"+
								"		<dd class='w11'><span>"+row.OA_SHYJ+"</span></dd>"+
								"	</dl>" +
								"</div>"
							}
						}
						OA_LOG.prepend(rowHtml);
					}
				}
			}

			if(!JL.isNull(this.sk01)){
				if(!JL.checkInitField("OA_SQR", this.initField)){
					this.getTab().find("#OA_DSH").show();
				}
				this.getTab().find("#OA_YSH").show();
				
				if(this.getTab().data("oabj")){
					this.getTab().find("#OA_SQ").addClass("jl_form_02_oa");
					var firstForm = this.getTab().find(".jl_form:first");
					firstForm.addClass("jl_form_02_oa");
					firstForm.find("em.btx.font_red").hide();
					firstForm.find(".table_content").addClass("table_oa_show");
					firstForm.find(".table_title").hide();
					firstForm.find(".table_show").attr("style", "");
					this.getTab().find(".jl_form_02_oa [placeholder]").removeAttr("placeholder");
				}
				
				JL.setInitFieldData(this, {
					"OA_SHZT": {"key":"0", "value":"同意"},
					"OA_SHR": userInfo.PCRM_CZY03,
					"OA_SHSJ": JL.formatDate(0, 2)
				});
			}
		}
	}
	
	this.quickDaiBan = function(json){
		var client = JL.getClient();
		if(!JL.isNull(this.sk01) && client == "pc" && this.getTab().data("oabj")){
			var pageData = this.getTab().data();
			var jl_bottom = $("<div>").addClass("jl_bottom").prependTo(this.getTab());
			var ul = $("<ul>").appendTo(jl_bottom);
			var title = $("<li><h3>"+pageData.CD02+"</h3></li>").appendTo(ul);

			var gzl01 = this.workflow.gzl01;
			try{
				var allDaiBan = eval("daiBan_" + gzl01);
				var daiBanList = allDaiBan.getPluginObj("LIST");
				var daiBanIndex = daiBanList.getSelectedIndex()[0];
				
				var jl_bottom = this.find(".jl_operation > .oper_main");
				
				var prev = $("<a class='jl_btn btn_color mr10'><i class='fa fa-arrow-circle-left mr5'></i>上一条</a>").appendTo(jl_bottom);
				var next = $("<a class='jl_btn btn_color'><i class='fa fa-arrow-circle-right mr5'></i>下一条</a>").appendTo(jl_bottom);
				if(Number(daiBanIndex)+1 == daiBanList.getData().length){
					if(daiBanList.obj.find(".jl_bottom").css("display") == "none"){
						next.hide();
					}
				}
				if(daiBanIndex == "0"){
					prev.hide();
				}
				
				var form = this;
				next.click(function(){
					var gzl01 = form.workflow.gzl01;
					try{
						var allDaiBan = eval("daiBan_" + gzl01);
						var daiBanList = allDaiBan.getPluginObj("LIST");
						var daiBanIndex = daiBanList.getSelectedIndex()[0];
						daiBanList.getDL(Number(daiBanIndex)+1).click();
					}catch(e){
						
					}
				});
				prev.click(function(){
					var gzl01 = form.workflow.gzl01;
					try{
						var allDaiBan = eval("daiBan_" + gzl01);
						var daiBanList = allDaiBan.getPluginObj("LIST");
						var daiBanIndex = daiBanList.getSelectedIndex()[0];
						daiBanList.getDL(Number(daiBanIndex)-1).click();
					}catch(e){
						
					}
				});
			}catch(e){
				console.error(e);
			}
		}
	}
	
	this.resetForm = function(json){
		//initForm-loadData-initPlugin-initDis-initValue-initHid
		this.initOA_SHMB();//初始化OA审核模板
		this.initWorkflow();//初始化流程
		this.initDivs(json);//初始化窗口数据
		this.initUI();//初始化UI数据
		
		if(!JL.isNull(this.initField)){
			this.initDisabled({"INITFIELD":this.initField});
		}
		this.initPlugIn();
		this.initValue(this.data);
		this.initHidden({"HIDEFIELD":this.hideField});
		this.loadButton();
		this.runEvents();
		this.lastInitMobile();
		this.lastInitOA();
		this.lastInit();
		this.quickDaiBan();
		
		if(userConfig.index_left){
			this.getTab().find(".jl_operation").css("left", "-226px");
		}
	}
	
	this.initForm = function(json){
		JL.setObjUrl();//替换img、href路径
		//initForm-loadData-initPlugin-initDis-initValue-initHid
		this.initOA_SHMB();//初始化OA审核模板
		this.initWorkflow();//初始化流程
		this.initDivs(json);//初始化窗口数据
		this.initUI();//初始化UI数据
		
		if((Number(this.data.jlbh) > 0 && !JL.isNull(this.data.bdbh))
				|| (!JL.isNull(this.sk01) && !JL.isNull(this.pid))){
			this.loadData();
		}
		if(!JL.isNull(this.initField)){
			this.initDisabled({"INITFIELD":this.initField});
		}
		this.initPlugIn();
		this.initValue(this.data);
		this.initHidden({"HIDEFIELD":this.hideField});
		this.loadButton();
		this.runEvents();
		this.lastInitMobile();
		this.lastInitOA();
		this.lastInit();
		this.quickDaiBan();

		if(userConfig.index_left){
			this.getTab().find(".jl_operation").css("left", "-226px");
		}
	}
	
	//读取数据
	this.readData =function(){
		var json = {};
		if(this.getTab().find(".jl_defCar").length > 0 || this.getTab().find(".addCarShow").length > 0){
			json = this.readDataCard();
		}else{
			json = this.readDataForm();
		}
		delete json["_id"];
		delete json["undefined"];
		this.setData(json);		
	}

	//读取表单界面所有的数据
	this.readDataForm =function(){
		var json={};
		var form = this;
		this.getTab().find(":text,textarea,:password").each(function(){
			if($(this).closest(".jl_list").length == 0){
				var key=$(this).attr('name');
				if(!JL.isNull(key) && JL.isNull(form.pluginObj[key])){
					json[key]=$(this).val();
				}
			}
		});
		
		$.each(this.pluginObj,function(key,value){
			if (!JL.isNull(value.config) && value.config.jlid != "JLToolBar") {
				json[key] = value.getData();
			}
		});
		
		return json;		
	}
	
	//读取弹出卡片层数据
	this.readDataCard =function(){
		var json={};
		var form = this;
		var formPage = null;
		if(form.getTab().find(".jl_defCar").length > 0){
			formPage = form.getTab().find(".jl_defCar");
		}else if(form.getTab().find(".addCarShow").length > 0){
			formPage = form.getTab().find(".addCarShow");
		}
		
		formPage.find(":text,textarea,:password").each(function(){
			var key=$(this).attr('name');
			if(!JL.isNull(key) && JL.isNull(form.pluginObj[key])){
				json[key]=$(this).val();
			}
		});
		
		$.each(this.pluginObj,function(key,value){
			if (!JL.isNull(value.config) && value.config.jlid != "JLToolBar") {
				if (formPage.find("#d_"+key).length > 0){
					json[key] = value.getData();
				}
			}
		});
		
		return json;		
	}
	
	this.fullScreen = function(queryForm, obj){
		var elem = this.getTab()[0];
		JL.fullScreen(elem);
		
		this.getTab().find(".jl_operation").hide();
	};
	
	this.exitFullScreen = function(queryForm, obj){
		var elem = this.getTab()[0];
		JL.exitFullScreen(elem);
	};
}
