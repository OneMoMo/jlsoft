JLLayoutGrid = function(json){
	this.config = {
		"style": "jl_list_03",//高度
		"height": null,//高度
		"rowradio": true,//点击行单选
		"rowSelectMode": "radio",
		"title": [],//标题
		"header": [],//列头
		"head": {},
		"mode": "show",
		"more": [],//隐藏块
		"multi": true,//隐藏块
		"paging": null,// 分页 more|page
		"listener": {}//监听事件 click|dblclick|loadData
	};
	$.extend(this.config, json);
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	
	this.version = 3;
	this.data = [];
	this.plugin = {};
	this.paging = {};
	this.updateData = {};//JLUpdateSubmit&JLCancelDelete联合使用
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	//外部可用
	this.setData = function(data){
		console.info(new Date());
		this.removeAll();
		this.data = data;
		var length = this.config.pagesize && Number(thisPlugin.config.pagesize) <= thisPlugin.data.length? this.config.pagesize: this.data.length;
		for(var i=0; i<length; i++){
			this.appendRow(this.data[i], i);
		}
		if(!JL.isNull(this.config.listener.loadData)){
			this.config.listener.loadData(this);
		}
		if(this.config.pagesize){
			thisPlugin.paging.currentPage=1;
			thisPlugin.paging.lastPage = Math.ceil(this.data.length/this.config.pagesize);
			setTimeout(function(){thisPlugin.setPaging();}, 3000); 
		}
		
		if(!JL.isNull(thisPlugin.config.cds)){
			var cds = thisPlugin.getCds();
			var XmlData = cds.getData();
			XmlData[this.config["cds-field"]] = this.data;
			cds.setData(XmlData);
		}
	}

	this.setCdsData = function(json, cdsid){
		if(!JL.isNull(json)){
			this.setData(json);
		}else{
			this.setData([]);
		}
	}

	this.addData = function(data){
		if(!JL.isNull(thisPlugin.config.cds)){
			for(var i=0; i<data.length; i++){
				this.data.push(data[i]);
			}
			thisPlugin.getCds().edit();
			var XmlData = {};
			XmlData[this.config["cds-field"]] = this.data;
			thisPlugin.getCds().setData(XmlData);
			thisPlugin.getCds().post();
		}else{
			for(var i=0; i<data.length; i++){
				this.addRow(data[i]);
			}
			if(!JL.isNull(this.config.listener.addData)){
				this.config.listener.addData(this);
			}
		}
	}
	
	//外部可用
	this.getData = function(index, id){
		if(!JL.isNull(index) && !JL.isNull(id)){
			return this.data[index][id];
		} else if(!JL.isNull(index)){
			return this.data[index];
		} else {
			return this.data;
		}
	}
	
	this.getHead = function(id){
		if(!JL.isNull(id)){
			return this.config.head[id];
		} else {
			return this.config.head;
		}
	}
	
	this.disabledCurrentData = function(boolean){
		if(boolean){
			this.obj.find(":text").attr("disabled", "disabled");
		}else{
			this.obj.find(":text").removeAttr("disabled");
		}
		$.each(this.plugin ,function(rowIndex, plugin){
			$.each(plugin ,function(key, value){
				var JLID = value;
				if(!JL.isNull(JLID) && JL.isFunction(JLID.disabled)){
					JLID.disabled(boolean);
				}
			});
		});
	}

	this.disabledRowData = function(rowIndex, boolean){
		if(boolean){
			this.getDL(rowIndex).find(":text").attr("disabled", "disabled");
		}else{
			this.getDL(rowIndex).find(":text").removeAttr("disabled");
		}
		$.each(this.plugin[rowIndex], function(key, value){
			var JLID = value;
			if(!JL.isNull(JLID) && JL.isFunction(JLID.disabled)){
				JLID.disabled(boolean);
			}
		});
	}

	this.readonlyEditor = function(index, id){
		var texts = this.getDL(index).find(":text[data-id]")
		for(var i=0; i<texts.length; i++){
			var text = $(texts[i]);
			text.removeAttr("readonly");
			var key = text.attr("data-id");
			if($.inArray(key, id) != -1){
				text.attr("readonly", "readonly");
			}
		}
		$.each(this.plugin[index] ,function(key, value){
			value.disabled(false);
			if($.inArray(key, id) != -1){
				value.disabled(true);
			}
		});
	}
	
	this.hideAllColumnEditor = function(id, boolean){
		if(!JL.isNull(this.plugin[0][id])){
			for(var i=0; i<this.data.length; i++){
				var JLID = this.plugin[i][id];
				if(!JL.isNull(JLID) && JL.isFunction(JLID.hide)){
					if($.inArray(JLID.config.jlid, ["JLCheckbox","JLRadio"]) == -1){
						JLID.hide(boolean);
						if(boolean){
							JLID.obj.after("<span>"+thisPlugin.formatValue(JLID.data, {})+"</span>");
						} else {
							JLID.obj.next().remove();
						}
					}else{
						JLID.disabled(boolean);
					}
				}
			}
		}else{
			if(boolean){
				this.getAllDL().find("[data-id='"+id+"']").hide().after("<span>"+text.val()+"</span>");
			}else{
				this.getAllDL().find("[data-id='"+id+"']").show().next().remove();
			}
		}
	}
	
	this.hideColumnEditor = function(index, id, boolean){
		var plugin = this.plugin[index][id];
		if(!JL.isNull(plugin)){
			var JLID = plugin;
			if(!JL.isNull(JLID) && JL.isFunction(JLID.hide)){
				if($.inArray(JLID.config.jlid, ["JLCheckbox","JLRadio"]) == -1){
					JLID.hide(boolean);
					if(boolean){
						JLID.obj.after("<span>"+thisPlugin.formatValue(JLID.data, {})+"</span>");
					} else {
						JLID.obj.next().remove();
					}
				}else{
					JLID.disabled(boolean);
				}
			}
		}else{
			if(boolean){
				var text = this.getDL(index).find("[data-id='"+id+"']")
				text.hide().after("<span>"+text.val()+"</span>");
			}else{
				this.getDL(index).find("[data-id='"+id+"']").show().next().remove();
			}
		}
	}
	
	this.hideRowEditor = function(index, boolean){
		$.each(this.plugin[index] ,function(key, value){
			var JLID = value;
			if(!JL.isNull(JLID) && JL.isFunction(JLID.hide)){
				if($.inArray(JLID.config.jlid, ["JLCheckbox","JLRadio"]) == -1){
					JLID.hide(boolean);
					if(boolean){
						JLID.obj.after("<span>"+thisPlugin.formatValue(JLID.data, {})+"</span>");
					} else {
						JLID.obj.next().remove();
					}
				}else{
					JLID.disabled(boolean);
				}
			}
		});
		if(boolean){
			var texts = this.getDL(index).find(":text");
			for(var i=0; i<texts.length; i++){
				var text = $(texts[i]);
				text.hide();
				text.after("<span>"+text.val()+"</span>")
			}
		}else{
			var texts = this.getDL(index).find(":text");
			for(var i=0; i<texts.length; i++){
				var text = $(texts[i]);
				text.show();
				text.next().remove();
			}
		}
	}
	
	//外部可用 获取选中行号
	this.getSelectedIndex = function(){
		var Arr = [];
		var checkboxs = this.jl_list_01.find("> div > dl > dt > i.fa-check-square-o");
		for(var i=0; i<checkboxs.length; i++){
			var checkbox = $(checkboxs[i]);
			var index = checkbox.closest("dl").attr("data-index");
			Arr.push(index);
		}
		return Arr;
	};

	this.getFirstDL = function(){
		return this.jl_list_01.find("> div > dl[data-index='0']");
	};

	this.getGroup = function(key){
		if(JL.isNull(key)){
			return this.jl_list_01.find("> [data-group]");
		}else{
			return this.jl_list_01.find("> [data-group='"+key+"']");
		}
	};

	this.getGroupData = function(key){
		var array = [];
		var dls = this.getGroup(key).find("> dl[data-index]");
		for(var i=0; i<dls.length; i++){
			var data_index = $(dls[i]).attr("data-index");
			array.push(thisPlugin.data[data_index]);
		}
		return array;
	};
	
	this.getSelectGroup = function(){
		var Arr = [];
		var groups = this.jl_list_01.find("> [data-group] > dl > dt > i.fa-check-square-o").closest("[data-group]");
		for(var i=0; i<groups.length; i++){
			var group = $(groups[i]);
			var array = [];
			var map = {};
			var dl = group.find("> dl");
			for(var j=0; j<dl.length; j++){
				var index = $(dl[j]).attr("data-index");
				var gridData = $.extend({}, this.data[index]);
				if(j==0){
					for(var k=0; k<this.config.groupField.length; k++){
						var row = this.config.groupField[k];
						var value = JL.isNull(gridData[row.id])? "": gridData[row.id];
						if(JL.isNull(row.editor) || (row.editor!="i" && row.editor!="title")){
							map[row.id] = value;
							delete gridData[row.id];
						}
					}
				}
				array.push(gridData);
			}
			map[this.config.id] = array;
			Arr.push(map);
		}
		console.info(Arr);
		return Arr;
	};
	
	this.getDL = function(index){
		return this.jl_list_01.find("> div > dl[data-index='"+index+"']");
	};

	this.getAllDL = function(index){
		return this.jl_list_01.find("> div > dl");
	};

	this.getLastDL = function(){
		return this.jl_list_01.find("> div > dl[data-index='"+(this.data.length-1)+"']");
	};

	//外部可用 获取选中行数据
	this.getSelected = function(){
		var Arr = [];
		var checkboxs = this.jl_list_01.find("> div > dl > dt > i.fa-check-square-o");
		for(var i=0; i<checkboxs.length; i++){
			var checkbox = $(checkboxs[i]);
			var index = checkbox.closest("dl").attr("data-index");
			Arr.push(this.data[index]);
		}
		return Arr;
	}
	
	this.initHeader = function(){
		var jl_title = $("<div>").appendTo(thisPlugin.obj);
		jl_title.addClass("jl_title");
		this.jl_title = jl_title;
		
		var dl = $("<dl>").appendTo(jl_title);
		var dt = $("<dt>").appendTo(dl);
		dt.append("<i class='fa fa-square-o'></i>");
		dt.click(function(){
			var square = $(this).find("> i");
			if(square.hasClass("fa-check-square-o")){
				square.removeClass("fa-check-square-o");
				square.addClass("fa-square-o");
				thisPlugin.jl_list_01.find("> div > dl > dt > i.fa-check-square-o").click();
				thisPlugin.jl_list_01.find("> div > i.fa-check-square-o").click();
			}else if(square.hasClass("fa-square-o")){
				square.removeClass("fa-square-o");
				square.addClass("fa-check-square-o");
				thisPlugin.jl_list_01.find("> div > dl > dt > i.fa-square-o").click();
				thisPlugin.jl_list_01.find("> div > i.fa-square-o").click();
			}
		});
		if(!thisPlugin.config.multi){
			dt.hide();
		}else{
			dl.addClass("pl30");
		}
		
		for(var i=0; i<thisPlugin.config.title.length; i++){
			var row = thisPlugin.config.title[i];
			var dd = $("<dd class='"+row.width+"' groupid='"+row.id+"'>"+row.name+"</dd>").appendTo(dl);
			
			if(!JL.isNull(row.align)){
				dd.css({"text-align":row.align});
			}
		}
	};
	
	this.hideGroup = function(id, boolean){
		if(boolean){
			if(typeof id == "object"){
				for(var i=0;i<id.length;i++){
					var key = id[i];
					this.jl_title.find("dd[groupid='"+key+"']").hide();
					this.jl_list_01.find("dd[groupid='"+key+"']").hide();
				}
			}else{
				this.jl_title.find("dd[groupid='"+id+"']").hide();
				this.jl_list_01.find("dd[groupid='"+id+"']").hide();
			}
		}else{
			if(typeof id == "object"){
				for(var i=0;i<id.length;i++){
					var key = id[i];
					this.jl_title.find("dd[groupid='"+key+"']").show();
					this.jl_list_01.find("dd[groupid='"+key+"']").show();
				}
			}else{
				this.jl_title.find("dd[groupid='"+id+"']").show();
				this.jl_list_01.find("dd[groupid='"+id+"']").show();
			}
		}
	};
	
	this.hideGroupField = function(id, boolean, index){
		if(boolean){
			if(typeof id == "object"){
				for(var i=0;i<id.length;i++){
					var key = id[i];
					if(JL.isNull(index)){
						this.jl_list_01.find("span[data-id='"+key+"']").hide();
					}else{
						this.jl_list_01.find("dl[data-index='"+index+"']").closest("div").prev().find("span[data-id='"+key+"']").hide();
					}
				}
			}else{
				if(JL.isNull(index)){
					this.jl_list_01.find("span[data-id='"+id+"']").hide();
				}else{
					this.jl_list_01.find("dl[data-index='"+index+"']").closest("div").prev().find("span[data-id='"+id+"']").hide();
				}
			}
		}else{
			if(typeof id == "object"){
				for(var i=0;i<id.length;i++){
					var key = id[i];
					if(JL.isNull(index)){
						this.jl_list_01.find("span[data-id='"+key+"']").show();
					}else{
						this.jl_list_01.find("dl[data-index='"+index+"']").closest("div").prev().find("div.list_item_title").find("span[data-id='"+key+"']").show();
					}
				}
			}else{
				if(JL.isNull(index)){
					this.jl_list_01.find("span[data-id='"+id+"']").show();
				}else{
					this.jl_list_01.find("dl[data-index='"+index+"']").closest("div").prev().find("span[data-id='"+id+"']").show();
				}
			}
		}
	};

	this.hideColumn = function(id, boolean){
		if(boolean){
			this.jl_list_01.find("[data-id='"+id+"']").hide();
		}else{
			this.jl_list_01.find("[data-id='"+id+"']").show();
		}
	};

	this.loadButtons = function(id, boolean){
		if(!JL.isNull(this.config.buttons)){
			var add_item = $("<div>").appendTo(thisPlugin.obj);
			add_item.addClass("add_item");
			$.each(this.config.buttons, function(key, config){
				if(key == "jlNew"){
					var jlNew = $("<span id='jlNew' class='pr10'><i class='fa fa-plus ml10 mr5'></i>新增</span>").appendTo(add_item);
					jlNew.data(config);
					jlNew.click(function(){
						debugger;
						var config = $(this).data(); 
						var cds = thisPlugin.getCds();
						if(!JL.isNull(cds)){
							cds.append();
						}
						thisPlugin.form.emptyCard();
						thisPlugin.form.readonly(config.readonly, true);
						if(!JL.isNull(thisPlugin.form) && thisPlugin.form.getTab().find(".addCarShow").length > 0){
							var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
							var dl = $(this).closest(".add_item");
							dl.after(addCarShow);
							addCarShow.show();
							$('html,body').animate({scrollTop:dl.offset().top - 44}, 300);
						}
						if(!JL.isNull(config.listener) && JL.isFunction(config.listener.click)){
							config.listener.click($(this), thisPlugin);
						}
					});
				}else if(key == "jlExport"){
					var jlExport = $("<span id='jlExport' class='pr10'><i class='fa fa-mail-forward ml10 mr5'></i>导出模版</span>").appendTo(add_item);
					jlExport.data(config);
					jlExport.click(function(){
						var config = $(this).data();
						
						var templates = JL.getJsonKeyArr(config.templates);
						if(!JL.isNull(templates)){
							if(templates.length == 1){
								JL.downloadTemplate(templates[0], config.templates[templates[0]]);
							}else{
								var html = "";
								for(var i=0; i<templates.length; i++){
									html += "<dl class='w12'><a onclick='JL.downloadTemplate(\""+templates[i]+"\", "+config.templates[templates[i]]+");' class='jl_btn btn_color w06 mb20' style='float: none;'>"+templates[i]+"</a></dl>";
								}
								
								if(html != ""){
									JL.popup({}, "<h3>导出模版</h3><div class='jl_form_02 mt10 pt10 tc'>" + html + "</div>");
								}
							}
						}
					});
				}else if(key == "jlExportData"){
					debugger;
					var jlExportData = $("<span id='jlExportData' class='pr10'><i class='fa fa-mail-forward ml10 mr5'></i>导出数据</span>").appendTo(add_item);
					jlExportData.data(config);
					jlExportData.click(function(){
						debugger;
						var head = {};
						var columnType = {};
						var columnName = {};
						var dds = thisPlugin.config.header;
						for(var i=0; i<dds.length; i++){
							var row = dds[i];
							head[row.id] = row.name || row.title;
							if(row.format && row.format.indexOf("number") != -1){
								columnType[row.id] = row.format;
							}
							if(row.export != false){
								columnName[row.id] = row.name || row.title;
							}
						}
						if(!JL.isNull(thisPlugin.paging.filename) && thisPlugin.data.length > 0){
							var data = {};
							data["fileName"] = thisPlugin.paging.filename;
							data["lastPage"] = thisPlugin.paging.lastPage;
							data["columnName"] = JSON.stringify(columnName);
							data["columnType"] = JSON.stringify(columnType);
							data["columnSummary"] = JSON.stringify(thisPlugin.config.summary);
							if(thisPlugin.config.EXPORT_EXCEL_TYPE){
								data["EXPORT_EXCEL_TYPE"] = thisPlugin.config.EXPORT_EXCEL_TYPE;
							}
							JL.download(pubJson.getURL("FormUrl")+"/excelHandler/excelExport.do", data);
						}else if(thisPlugin.data.length <= 0){
							JL.tip("没有可导出的数据");
						}else if(thisPlugin.data.length > 0){
							var data = {};
							data["data"] = JSON.stringify(thisPlugin.data);
							data["columnName"] = JSON.stringify(columnName);
							data["columnType"] = JSON.stringify(columnType);
							data["columnSummary"] = JSON.stringify(thisPlugin.config.summary);
							if(thisPlugin.config.EXPORT_EXCEL_TYPE){
								data["EXPORT_EXCEL_TYPE"] = thisPlugin.config.EXPORT_EXCEL_TYPE;
							}
							JL.download(pubJson.getURL("FormUrl")+"/excelHandler/excelExport.do", data);
						}else{
							JL.tip("请先查询需要导出的结果");
						}
					});
				}else if(key == "jlImport"){
					var jlImport = $("<span class='pr10'><i class='fa fa-sign-in ml10 mr5'></i>导入</span>").appendTo(add_item);
					jlImport.click(function(){
						//暂无
					});
				}else{
					var css = !JL.isNull(config.css)? config.css: "mr10";
					var html = "<span id='"+key+"' class='"+css+" pr10'><i class='fa fa-"+config.icon+" mr5'></i>"+config.name+"</span>"
					var button = $(html).appendTo(add_item);
					button.click(config.func);
				}
			});
			
		}
	};
	
	this.initBody = function(){
		this.loadButtons();
		
		this.jl_list_01 = $("<div>").appendTo(thisPlugin.obj);
		if(!JL.isNull(this.config.height)){
			this.jl_list_01.css({"max-height":this.config.height+"px"});
			this.jl_list_01.addClass("overflow_y");
		}
		this.jl_list_01.addClass(this.config.style);
	}

	this.setPaging = function(fileName){
		console.info(fileName);
		if(!JL.isNull(this.config.pagesize)){
			if(thisPlugin.paging.currentPage < thisPlugin.paging.lastPage){
				this.jl_bottom.show();
			} else {
				this.jl_bottom.hide();
			}
		}else if(!JL.isNull(this.config.paging)){
			console.info(this.config.paging);
			this.paging.currentPage = 1;
			var resultData = JL.getPagingData(fileName, "LASTPAGE");
			this.paging.lastPage = JL.isNull(resultData) ? 1 : resultData;
			this.paging.filename = fileName;
			
			if(thisPlugin.paging.currentPage < thisPlugin.paging.lastPage){
				this.jl_bottom.show();
			} else {
				this.jl_bottom.hide();
			}
		}
	}
	
	this.initPaging = function(){
		var jl_bottom = $("<div>").appendTo(thisPlugin.obj);
		jl_bottom.addClass("jl_bottom hide");
		if(this.config.paging == "more" || this.config.paging == "local" ){
			jl_bottom.click(function(){
				debugger;
				if(thisPlugin.config.pagesize){
					thisPlugin.paging.lastPage = Math.ceil(thisPlugin.data.length/thisPlugin.config.pagesize);
					var firstPageData = thisPlugin.data.slice(thisPlugin.config.pagesize*thisPlugin.paging.currentPage, thisPlugin.config.pagesize*(thisPlugin.paging.currentPage+1));
					for(var i=0; i<firstPageData.length; i++){
						thisPlugin.appendRow(firstPageData[i], thisPlugin.config.pagesize*thisPlugin.paging.currentPage+i);
					}
					thisPlugin.paging.currentPage++;
				}else{
					thisPlugin.paging.currentPage++;
					var resultData = JL.getPagingData(thisPlugin.paging.filename,thisPlugin.paging.currentPage);
					thisPlugin.addData(resultData);
				}
				if(thisPlugin.paging.currentPage == thisPlugin.paging.lastPage) {
					$(this).hide();
				}
			});
			var div_more = $("<div>").appendTo(jl_bottom);
			div_more.addClass("pad_load");
			div_more.append("<i class='fa fa-angle-double-down'></i><span>点击加载更多</span>");
		}else{
			var ul = $("<ul>").appendTo(jl_bottom);
			ul.append("<li><div class='jl_input_checkbox'><i class='fa fa-square-o'></i><span>全选</span></div></li>");
			
			var li_choose = $("<li>").appendTo(ul);
			var div_choose = $("<div>").appendTo(li_choose);
			JL.initPlugIn(div_choose, this.id+"_pagesize", {
				"jlid": "JLSelect",
				"default": "20",
				"options": {
					"10":"每页10条",
					"20":"每页20条",
					"50":"每页50条",
					"100":"每页100条",
				}
			});
			
			var li_paging = $("<li>").appendTo(ul);
			var div_paging = $("<div>").appendTo(li_paging);
			div_paging.addClass("paging");
			div_paging.append("<a class='border_radius' title='首页'><i class='fa fa-angle-double-left'></i></a>");
			div_paging.append("<a class='border_radius' title='上一页'><i class='fa fa-angle-left'></i></a>");
			div_paging.append("<label><input><span>共</span><span>3</span><span>页</span></label>");
			div_paging.append("<a class='border_radius' title='下一页'><i class='fa fa-angle-right'></i></a>");
			div_paging.append("<a class='border_radius' title='末页'><i class='fa fa-angle-double-right'></i></a>");
		}
		this.jl_bottom = jl_bottom; 
	}

	//外部可用 删除所有数据
	this.removeAll = function(){
		if(!JL.isNull(thisPlugin.form) && thisPlugin.obj.find(".addCarShow").length > 0){
			var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
			addCarShow.hide();
			thisPlugin.form.getTab().append(addCarShow);
		}
		this.data = [];
		this.jl_list_01.empty();
	}

	this.appendGrid = function(li, config, value){
		var main = $("<div>").appendTo(li);
		main.attr("data-id", config.id);
		if(!JL.isNull(config.gridcss)){
			main.addClass(config.gridcss);
		}else{
			main.addClass("w12");
		}
		
		for(var j=0; j<value.length; j++){
			var data = value[j];

			var rowDiv = $("<div>").appendTo(main);
			if(!JL.isNull(config.rowcss)){
				rowDiv.addClass(config.rowcss);
			}else{
				rowDiv.addClass("w12");
			}
			rowDiv.attr("data-item-index",j);
			rowDiv.data(data);
			
			for(var i=0; i<config.header.length; i++){
				var row = config.header[i];
				var itemValue = JL.isNull(data[row.id])? "": data[row.id];
				var div = null,ul = null;
				if(!JL.isNull(row.groupid)){
					div = rowDiv.find("> div[groupid='"+row.groupid+"']").length == 0? $("<div>").appendTo(rowDiv): rowDiv.find("> div[groupid='"+row.groupid+"']");
					div.attr("groupid", row.groupid);
				}else{
					div = $("<div>").appendTo(rowDiv);
					div.addClass(row.width);
				}
				
				if(!JL.isNull(row.groupcss)){
					div.addClass(row.groupcss);
				}
				
				var item = {};
				item["id"] = config.id;
				item["rowIndex"] = j;
				this.appendEditor(div, row, itemValue, item);
			}
			if(JL.isFunction(thisPlugin.config.listener.loadItemRow)){
				var dl = li.closest("dl[data-index]");
				var rowIndex = dl.attr("data-index");
				thisPlugin.config.listener.loadItemRow(thisPlugin, data, rowIndex, config.id, j, dl);
			}
		}
		return main;
	}
	
	this.appendNumber = function(li, value){
		var div_number = $("<div>").appendTo(li);
		div_number.addClass("tool");
		var minus = $("<a class='fl minus'><i class='fa fa-minus'></i></a>").appendTo(div_number);
		minus.click(function(){
			var num = $(this).next().val();
			if( (num*1-1) <= 0 ){
//				alert("数量必须大于0");
				num = 1;
			}else{
				num -= 1;
			}
			$(this).next().val(num);
			$(this).next().focus();
			$(this).next().blur();
			event.stopPropagation();
		});
		var child = $("<input type='text' class='w06'>").appendTo(div_number);
		value = JL.isNull(value)? 1: value;
		child.val(value);
		child.keypress(function(){
			var num = $(this).val();
			if($.inArray(event.keyCode,[48,49,50,51,52,53,54,55,56,57]) == -1){
				return false;
			}
		});
		child.click(function(){
			event.stopPropagation();
		});
		child.blur(function(){
			var num = $(this).val();
			if(isNaN(num*1)){
				alert("请输入正确的数字");
				$(this).val(1);
				$(this).focus();
				return false;
			}
		});
		var plus = $("<a class='fl plus'><i class='fa fa-plus'></i></a>").appendTo(div_number);
		plus.click(function(){
			var num = $(this).prev().val();
			num++;
			$(this).prev().val(num);
			$(this).prev().focus();
			$(this).prev().blur();
			event.stopPropagation();
		});
		return child;
	}
	
	this.valEditor = function(child, row, value){
		if(row.editor == "img"){
			
		} else if(row.editor == "plugin"){
			var rowIndex = child.closest("dl[data-index]").attr("data-index");
			var plugin = this.plugin[rowIndex][row.id];
			plugin.setData(value);
		} else{
			child.html(value);
		}
	}
	
	this.appendEditor = function(li, row, value, item){
		var rowIndex = li.closest("dl").attr("data-index");
		if(JL.isNull(this.plugin[rowIndex])){
			this.plugin[rowIndex] = {};
		}
		
		var child = null;
		if(row.editor == "img"){
			var div = $("<div>").appendTo(li);
			if(!JL.isNull(value)){
				if(typeof value == "object"){
					for(var i=0;i<value.length;i++){
						var img = value[i];
						child = $("<img>").appendTo(div);
						if(typeof img == "object"){
							child.attr("src", img.FILE_URL);
							child.attr("title", img.FILE_DESC);
							child.addClass(row.imgcss);
						}else{
							child.attr("src", img);
						}
					}
					child = div;
				}else{
					child = $("<img>").appendTo(div);
					child.attr("src", value);
				}
			}else if(!JL.isNull(row.default)){
				child = $("<img>").appendTo(div);
				child.attr("src", row.default);
			}else{
				child = div;
			}
		}else if(row.editor == "file"){
			var div = $("<div>").appendTo(li);
			if(!JL.isNull(value)){
				for(var i=0;i<value.length;i++){
					var file = value[i];
					child = $("<a>").appendTo(div);
					child.attr("title", file.FILE_DESC);
					child.data(file);
					child.html(file.FILE_DESC);
					child.addClass(row.filecss);
					child.click(function(){
						var XmlData = {};
						XmlData["filename"] = $(this).data("FILE_DESC");
						XmlData["url"] = $(this).data("FILE_URL");
						JL.download(pubJson.getURL("FormUrl") + "/FormUpload/download.do", XmlData);
					});
				}
			}
			child = div;
		}else if(row.editor == "arr"){
			var div = $("<div>").appendTo(li);
			if(!JL.isNull(value)){
				if(typeof value == "object"){
					if($.isArray(value)){
						for(var i=0;i<value.length;i++){
							child = $("<span>").appendTo(div);
							child.html(value[i]);
						}
						child = div;
					}else{
						$.each(value, function(title, html){
							child = $("<span>").appendTo(div);
							child.attr("title", title);
							child.html(html);
						})
						child = div;
					}
				}else{
					child = $("<span>").appendTo(div);
					child.html(value[i]);
				}
			}else{
				child = div;
			}
		}else if(row.editor == "fa"){
			child = $("<i>").appendTo(li);
		}else if(row.editor == "i"){
			var span = $("<span>").appendTo(li);
			if(!JL.isNull(row.parentcss)){
				span.addClass(row.parentcss);
			}
			child = $("<i>").appendTo(span);
		}else if(row.editor == "a"){
			child = $("<a>").appendTo(li);
			child.html(value);
			child.attr("href", value);
			child.attr("target", "_blank");
		}else if(row.editor == "text"){
			var child = $("<input>").appendTo(li);
			child.attr("type","text");
			child.attr("placeholder", row.title);
			child.val(value);
			if(JL.isNull(row.width)){
				child.addClass("w12");
			}
		}else if(row.editor == "star"){
			child = $("<div>").appendTo(li);
			
			for(var i=0; i<5; i++){
				var star = $("<a><i class='fa fa-star'></i></a>").appendTo(child);
				if(i < value){
					star.children("i").addClass("font_red");
				}else{
					star.children("i").addClass("font_grey");
				}
			}
		}else if(row.editor == "number"){
			child = this.appendNumber(li, value);
		}else if(row.editor == "Grid"){
			child = this.appendGrid(li, row, value);
		}else if(row.editor == "button"){
			child = $("<a class='jl_btn'>"+row.title+"</a>").appendTo(li);
		}else if(row.editor == "JLEdit"){
			child = $("<a class='font_color'>"+row.title+"</a>").appendTo(li);
			var rowData = this.getData(rowIndex);
			child.click(function(){
				if(!JL.isNull(thisPlugin.form) && thisPlugin.form.getTab().find(".addCarShow").length > 0){
					var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
					addCarShow.hide();
					thisPlugin.form.getTab().append(addCarShow);
				}
				thisPlugin.form.getTab().find(".jl_defCar").find("#jlEmptyCard").hide();
				var dataIndex = $(this).closest("dl[data-index]").attr("data-index");
				if(!JL.isNull(row.listener) && JL.isFunction(row.listener.confirm) && row.listener.confirm(thisPlugin, dataIndex)){
					JL.confirm(row.config.confirm, function(){
						thisPlugin.form.emptyCard();
						thisPlugin.form.readonly(row.config.readonly, true);
						if(!JL.isNull(thisPlugin.form) && thisPlugin.form.getTab().find(".jl_defCar").length > 0){
							JL.showCard(thisPlugin.form.getTab().find(".jl_defCar"));
						}
						var rowData = thisPlugin.getData(dataIndex);
						thisPlugin.getCds().buildDataPointer(thisPlugin.config["cds-field"], rowData._cdsid)
						var newData = {}; 
						thisPlugin.getCds().edit();
						if(!JL.isNull(thisPlugin.form) && thisPlugin.form.getTab().find(".addCarShow").length > 0){
							var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
							var dl = thisPlugin.obj.find("dl[data-index='"+dataIndex+"']");
							dl.after(addCarShow);
							addCarShow.show();
							$('html,body').animate({scrollTop:dl.offset().top - 44 - 35}, 300);
						}
						if(!JL.isNull(row.listener) && JL.isFunction(row.listener.ok)){
							row.listener.ok(thisPlugin,rowIndex);
						}
					}, function(){
						if(!JL.isNull(row.listener) && JL.isFunction(row.listener.cancel)){
							row.listener.cancel(thisPlugin,rowIndex);
						}
					});
				}else{
					if(!JL.isNull(row.listener) && JL.isFunction(row.listener.click)){
						row.listener.click(thisPlugin,rowIndex);
					}
					thisPlugin.form.emptyCard();
					thisPlugin.form.readonly(row.config.readonly, true);
					if(!JL.isNull(thisPlugin.form) && thisPlugin.form.getTab().find(".jl_defCar").length > 0){
						JL.showCard(thisPlugin.form.getTab().find(".jl_defCar"));
					}
					var rowData = thisPlugin.getData(dataIndex);
					thisPlugin.getCds().buildDataPointer(thisPlugin.config["cds-field"], rowData._cdsid)
					var newData = {}; 
					thisPlugin.getCds().edit();
					if(!JL.isNull(thisPlugin.form) && thisPlugin.form.getTab().find(".addCarShow").length > 0){
						var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
						var dl = thisPlugin.obj.find("dl[data-index='"+dataIndex+"']:not(.table)");
						dl.after(addCarShow);
						addCarShow.show();
						$('html,body').animate({scrollTop:dl.offset().top - 44 -35}, 300);
					}
					if(!JL.isNull(row.listener) && JL.isFunction(row.listener.edit)){
						row.listener.edit(thisPlugin,rowIndex);
					}
				}
			});
		}else if(row.editor == "JLUpdateSubmit"){
			child = $("<a class='font_blue' data-type='update'>修改</a>").appendTo(li);
			child.click(function(){
				var type = $(this).attr("data-type");
				if(type == "update"){
					thisPlugin.jl_list_01.find("[data-type='cancel']").click();
					$(this).html("提交");
					$(this).attr("data-type", "submit");
					thisPlugin.hideRowEditor(rowIndex, false);
					thisPlugin.updateData[rowIndex] = $.extend({}, thisPlugin.getData(rowIndex));
					$(this).closest("dl").find("[data-type='delete']").html("取消");
					$(this).closest("dl").find("[data-type='delete']").attr("data-type", "cancel");
					if(!JL.isNull(row.listener) && JL.isFunction(row.listener.update)){
						row.listener.update(thisPlugin, rowIndex, $(this));
					}
				}else if(type == "submit"){
					$(this).closest("dl").find(":text").blur();
					if(!JL.isNull(row.listener) && JL.isFunction(row.listener.submit)){
						if(row.listener.submit(thisPlugin, rowIndex, $(this))){
							$(this).html("修改");
							$(this).attr("data-type", "update");
							thisPlugin.hideRowEditor(rowIndex, true);
							$(this).closest("dl").find("[data-type='cancel']").html("删除");
							$(this).closest("dl").find("[data-type='cancel']").attr("data-type", "delete");
						}
					}
				}
			});
		}else if(row.editor == "JLCancelDelete"){
			if(!JL.isNull(row.config) && row.config.nodelete){
				child = $("<a class='font_blue' data-type='cancel'>取消</a>").appendTo(li);
			}else{
				child = $("<a class='font_blue' data-type='delete'>删除</a>").appendTo(li);
			}
			child.click(function(){
				var type = $(this).attr("data-type");
				if(type == "delete"){
					if(!JL.isNull(row.listener) && JL.isFunction(row.listener.delete)){
						row.listener.delete(thisPlugin, rowIndex, $(this));
					}
				}else if(type == "cancel"){
					$(this).html("删除");
					$(this).attr("data-type", "delete");
					thisPlugin.hideRowEditor(rowIndex, true);
					$(this).closest("dl").find("[data-type='submit']").html("修改");
					$(this).closest("dl").find("[data-type='submit']").attr("data-type", "update");
					thisPlugin.setRow(thisPlugin.updateData[rowIndex], rowIndex);
				}
			});
		}else if(row.editor == "link"){
			child = $("<a class='font_blue'>"+row.title+"</a>").appendTo(li);
		}else if(row.editor == "select"){
			var span = $("<span>").appendTo(li);
			child = $("<label>"+value+"</label>").appendTo(span);
			child.after("<i class='fa fa-pencil'></i>");
			
			var dropdown_menu = $("<div>").appendTo(span);
			dropdown_menu.addClass("dropdown_menu");
			dropdown_menu.append("<span class='bot'></span>");
			dropdown_menu.append("<span class='top'></span>");
			
			var ul_select = $("<ul>").appendTo(dropdown_menu);
			var param = this.data[rowIndex];
			if( !JL.isNull(row.config.sqlid) && !JL.isNull(row.config.resource) ){
				var XmlData={};
				param["sqlid"] = row.config.sqlid;
				param["DataBaseType"] = row.config.resource;
				$.extend(param, userInfo);
			}
			var transport = new JLTransport();
			var resultData = transport.select("jlquery", "select.do", param);
			
			for(var i=0;i<resultData.length;i++){
				var option = resultData[i];
				var li =  $("<li>").appendTo(ul_select);
				li.data(option);
				li.html(option.VALUE);
				li.click(function(){
					var data_index = $(this).closest("dl").attr("data-index");
					thisPlugin.setCell($(this).html(), data_index, row.id);
					if(!JL.isNull(row.listener) && JL.isFunction(row.listener.change)){
						row.listener.change($(this).data(), data_index, thisPlugin);
					}
				});
			}
		}else if(row.editor == "JLRangeDate"){
			child = $("<div>").appendTo(li);
			row.config.listener = {
				"change": function(data){
					thisPlugin.data[rowIndex][row.id] = data;
				}
			}
			var rangeDate = JL.initPlugIn(child, row.id+rid, row.config);
			if(!JL.isNull(value)){
				rangeDate.setData(value);
			}
			this.plugin[rowIndex][row.id] = rangeDate;
		}else if(row.editor == "plugin"){
			child = $("<div>").appendTo(li);
			var pluginConfig = $.extend({}, {}, row.config);
			if(JL.isNull(pluginConfig.listener)){
				pluginConfig.listener = {};
			}
			if(JL.isNull(pluginConfig.listener.change)){
				if(pluginConfig.jlid == "JLMultiTree"){
					pluginConfig.listener.change = function(data, arr, plugin){
						debugger
						var rowIndex = plugin.obj.closest("dl[data-index]").attr("data-index");
						thisPlugin.data[rowIndex][row.id] = arr;
					}
				}else{
					pluginConfig.listener.change = function(data, plugin){
						debugger
						var rowIndex = plugin.obj.closest("[data-index]").attr("data-index");
						var itemIndex = plugin.obj.closest("[data-item-index]").attr("data-item-index");
						if(!JL.isNull(itemIndex)){
							var itemID = plugin.obj.closest("[data-item-index]").parent("[data-id]").attr("data-id")
							thisPlugin.data[rowIndex][itemID][itemIndex][row.id] = data;
						}else{
							thisPlugin.data[rowIndex][row.id] = data;
						}
					}
				}
			}
			var plugin = JL.initPlugIn(child, row.id+rid, pluginConfig);
			if(!JL.isNull(item)){
				value = thisPlugin.data[rowIndex][item.id][item.rowIndex][row.id];
				if(!JL.isNull(value)){
					plugin.setData(value);
				}
				this.plugin[rowIndex][item.id+"_"+item.rowIndex+"_"+row.id] = plugin;
			}else{
				value = thisPlugin.data[rowIndex][row.id];
				if(!JL.isNull(value)){
					plugin.setData(value);
				}
				this.plugin[rowIndex][row.id] = plugin;
			}
		}else if(row.editor == "title"){
			child = $("<span>").appendTo(li);
			child.html(row.title);
		}else if(!JL.isNull(row.editor)){
			child = $("<"+row.editor+">").appendTo(li);
			child.html(value);
			if(!JL.isNull(row.style)){
				child.addClass(row.style);
			}
		}else{
			child = $("<span>").appendTo(li);
			child.html(JL.isNull(value)?"&nbsp;":value);
		}

		if(child.is(":text")){
			child.keyup(function(){
				var id = $(this).data("id");
				thisPlugin.data[rowIndex][id] = $(this).val();
			});
			child.blur(function(){
				var id = $(this).data("id");
				thisPlugin.data[rowIndex][id] = $(this).val();
			});
		}
		
		if(!JL.isNull(row.parentcss)){
			child.parent().addClass(row.parentcss);
		}
		
		if(!JL.isNull(row.align)){
			li.css({"text-align":row.align});
		}
		if(!JL.isNull(row.width)){
			child.addClass(row.width);
		}
		if(!JL.isNull(row.css)){
			child.addClass(row.css);
		}
		if(!JL.isNull(row.title)){
			if(JL.isNull(row.name)){
				child.attr("title", row.title + ": " + value);
			}else{
				child.attr("title", value);
			}
		}
		if(!JL.isNull(row.fontcolor)){
			child.addClass("font_"+row.fontcolor);
		}
		if(!JL.isNull(row.hidden) && row.hidden == true){
			li.hide();
		}
		if(!JL.isNull(row.listener) && row.editor != "JLEdit"){
			$.each(row.listener, function(key, value){
				var func = function(){
					var rowIndex = $(this).closest("dl").attr("data-index");
					var itemIndex = $(this).closest("[data-item-index]").attr("data-item-index");
					var va =  value(thisPlugin, rowIndex, $(this), itemIndex);
					if(va){
						return false;
					}
				};
				child.bind(key, func);
			});
		}
		child.attr("data-id",row.id);
		child.data(row);
		return child;
	}
	
	//外部可用 通过列的值隐藏行
	this.hideRowById = function(id, value){
		var data = this.getData();
		for(var i=0; i<data.length; i++){
			var row = data[i];
			if(typeof row[id] =="object" && row[id].key == value.key){
				this.hideRow(i);
			}else if(row[id] == value){
				this.hideRow(i);
			}
		}
	};
	
	//外部可用 通过列的值显示行
	this.showRowById = function(id, value){
		var data = this.getData();
		thisPlugin.jl_list_01.find(" > div > dl[data-index]").hide();
		for(var i=0; i<data.length; i++){
			var row = data[i];
			if (typeof value == "object"){
				for (var j=0;j<value.length;j++){
					if(typeof row[id] =="object" && row[id].key == value[j].key){
						thisPlugin.jl_list_01.find(" > div > dl[data-index='"+i+"']").show();
					}else if(row[id] == value[j]){
						thisPlugin.jl_list_01.find(" > div > dl[data-index='"+i+"']").show();
					}
				}
			}else{
				if(typeof row[id] =="object" && row[id].key == value.key){
					thisPlugin.jl_list_01.find(" > div > dl[data-index='"+i+"']").show();
				}else if(row[id] == value){
					thisPlugin.jl_list_01.find(" > div > dl[data-index='"+i+"']").show();
				}
			}
		}
		
	};
	
	this.hideCell = function(index, id){
		thisPlugin.jl_list_01.find(" > div > dl[data-index='"+index+"'] [data-id='"+id+"']").hide();
	};

	this.hideRow = function(index){
		thisPlugin.jl_list_01.find(" > div > dl[data-index='"+index+"']").hide();
	};
	 
	this.hideAllRow = function(index){
		thisPlugin.jl_list_01.find(" > div > dl").hide();
	};

	this.showAllRow = function(index){
		thisPlugin.jl_list_01.find(" > div > dl").show();
	};
	
	//外部可用 单元格赋值
	this.setCell = function(value, x, id){
		this.data[x][id] = value;
		
		var DL = thisPlugin.jl_list_01.find(" > div > dl[data-index='"+x+"']");
		if(DL.find(":text[data-id='"+id+"']").length != 0){
			DL.find(":text[data-id='"+id+"']").val(value);
		}else{
			for(var i=0; i<thisPlugin.config.header.length; i++){
				var row = thisPlugin.config.header[i];
				if(row.id == id){
					value = this.formatValue(value, row);
					if(!JL.isNull(row.name)){
						value = row.name+": "+ value;
					}
					
					var child = DL.find("[data-id='"+id+"']");
					this.valEditor(child, row, value);
				}
			}
			//DL.find("[data-id='"+id+"']").html(value);
		}
	}
	
	this.formatValue = function(value, row){
		if(!JL.isNull(row) && row.format == false){
			return value;
		}
		
		if(JL.isNull(value)){
			value = "";
		}else{
			if(typeof value == "object"){
				if($.isArray(value)){
					var str = "";
					for(var i=0; i<value.length; i++){
						var row = value[i];
						if(!JL.isNull(row.key) && !JL.isNull(row.value)){
							str += row.value + " ";
						}else if(!JL.isNull(row.KEY) && !JL.isNull(row.VALUE)){
							str += row.VALUE + " ";
						}
					}
					if(!JL.isNull(str)){
						value = str;
					}
				}else if(!JL.isNull(value)){
					value = value.value;
				}
			}
		}
		
		if(!JL.isNull(row.format) && !JL.isNull(value)){
			var format = row.format.split("|");
			if(format[0] == "money" || format[0] == "number"){
				value = Number(value).toFixed(format[1]);
				value = JL.formatNumber(value, format[1]);
			}else{
				
			}
		}
		
		return value;
	}
	
	this.addCell = function(ul, row, value){
		var li = null;
		if(JL.isNull(row.rowindex)){
			li = $("<li>").appendTo(ul);
		}else if(ul.find("> li").eq(row.rowindex-1).length == 0){
			li = $("<li>").appendTo(ul);
		}else{
			li = ul.find("> li").eq(row.rowindex-1);
		}
		
		value = this.formatValue(value, row);
		if(!JL.isNull(row.name)){
			value = row.name+": "+ value;
		}
		
		var child = this.appendEditor(li, row, value);
	}
	
	//外部可用 删除行
	this.removeRow = function(index){
		var arr = [];
		for(var i=0;i<this.data.length;i++){
			if(i != index){
				arr.push(this.data[i]);
			}
		}
		this.setData(arr);
	};

	//外部可用 删除行
	this.removeDL = function(index){
		var dl = this.jl_list_01.find("> div > dl[data-index='"+ index +"']"); 
		if(dl.siblings("dl").length == 0){
			dl.parent().prev().remove();
			dl.parent().remove();
		}else{
			dl.remove();
		}
	};
	
	//外部可用 删除选中行
	this.removeSelected = function(selectedIndex){
		var selected = JL.isNull(selectedIndex)? this.getSelectedIndex(): selectedIndex;
		var arr = [];
		for(var i=0;i<this.getData().length;i++){
			if($.inArray(i.toString(), selected) == -1){
				arr.push(this.getData(i));				
			}
		}
		this.setData(arr);
	};
	
	//外部可用 行添加数据
	this.setRow = function(data, index){
		var oldData = this.getData(index);
		var newData = $.extend({}, oldData, data);
		if(!JL.isNull(thisPlugin.config.cds)){
			thisPlugin.getCds().append();
			thisPlugin.getCds().put(this.config["cds-field"], newData);
			thisPlugin.getCds().submit();
		}else{
			this.data[index] = newData;
			this.appendRow(newData, index);
		}
	};
	
	this.addRow = function(data){
		this.data.push(data);
		return this.appendRow(data, this.data.length-1);
	}

	this.addAndModifyRow = function(data){
		var dl = this.addRow(data);
		dl.prependTo(thisPlugin.jl_list_01.find("div:not(:hidden):first"));
		dl.find("[data-type='update']").click();
		dl.find("[data-type='cancel']").html("删除");
		dl.find("[data-type='cancel']").attr("data-type", "delete");
	}
	
	this.loadGroup = function(data){
		if(typeof this.config.groupField == "string"){
			var groupField = this.formatValue(data[this.config.groupField], {});
			var list_item_main = thisPlugin.jl_list_01.find("> [data-group='"+groupField+"']");
			if(list_item_main.length == 0){
				var list_item_title = $("<div>").appendTo(thisPlugin.jl_list_01);
				list_item_title.addClass("list_item_title");
				//list_item_title.append("<i class='fa fa-square-o checkbox'></i>");
				list_item_title.append("<i class='fa fa-angle-down'></i>");
				if(!JL.isNull(this.config.head[this.config.groupField])){
					list_item_title.append("<div>"+this.config.head[this.config.groupField] +": "+ groupField+"</div>");
				}else{
					list_item_title.append("<div>"+groupField+"</div>");
				}
				list_item_main = $("<div>").appendTo(thisPlugin.jl_list_01);
				list_item_main.addClass("list_item_main");
				list_item_main.attr("data-group", groupField);
			}
		}else if(typeof this.config.groupField == "object"){
			var groupField = "";
			for(var i=0; i<this.config.groupField.length; i++){
				var row = this.config.groupField[i];
				var value = JL.isNull(data[row.id])? "": data[row.id];
				groupField+= value +"_";
			}
				
			var list_item_main = thisPlugin.jl_list_01.find("> [data-group='"+groupField+"']");
			if(list_item_main.length == 0){
				var list_item_title = $("<div>").appendTo(thisPlugin.jl_list_01);
				list_item_title.addClass("list_item_title");
				var checkbox = $("<i class='fa fa-square-o checkbox'></i>").appendTo(list_item_title);
				checkbox.click(function(e){
					if(!JL.isNull(thisPlugin.config.listener.beforeGroupChecked)){
						var bgc = thisPlugin.config.listener.beforeGroupChecked(thisPlugin, checkbox);
						if(bgc){
							return false;
						}
					}
					if($(this).hasClass("fa-square-o")){
						JL.changeClass($(this), "fa-square-o", "fa-check-square-o");
						$(this).closest("div").next().find("> dl > dt > .fa-square-o").parent().click();
					}else if($(this).hasClass("fa-check-square-o")){
						JL.changeClass($(this), "fa-check-square-o", "fa-square-o");
						$(this).closest("div").next().find("> dl > dt > .fa-check-square-o").parent().click();
					}
					e.stopPropagation();
				});
				list_item_title.append("<i class='fa fa-angle-down'></i>");
				for(var i=0; i<this.config.groupField.length; i++){
					var row = this.config.groupField[i];
					var value = JL.isNull(data[row.id])? "": data[row.id];
					value = this.formatValue(value, row);
					if(!JL.isNull(row.name)){
						value = row.name+": "+ value;
					}
					this.appendEditor(list_item_title, row, value);
				}
				list_item_title.click(function(){
					if($(event.target).closest(".checkbox").length == 0){
						if($(this).next().is(":hidden")){
							JL.changeClass($(this).find(".fa-angle-right"), "fa-angle-right", "fa-angle-down");
							$(this).next().slideDown();
						}else{
							JL.changeClass($(this).find(".fa-angle-down"), "fa-angle-down", "fa-angle-right");
							$(this).next().slideUp();
						}
					}
				});
				
				list_item_main = $("<div>").appendTo(thisPlugin.jl_list_01);
				list_item_main.addClass("list_item_main");
				list_item_main.attr("data-group", groupField);
			}
		}
		
		return list_item_main;
	}
	
	this.appendRow = function(data, rowIndex){
		console.info(JL.formatDate(0, 2))
		var list_item_main = null;
		if(!JL.isNull(this.config.groupField)){
			list_item_main = this.loadGroup(data);
		} else if(!JL.isNull(this.config.severity)){
			var groupField = this.formatValue(data[this.config.severity], {});
			list_item_main = thisPlugin.jl_list_01.find("> [data-group='"+groupField+"']");
			if(list_item_main.length == 0){
				list_item_main = $("<div>").appendTo(thisPlugin.jl_list_01);
				list_item_main.addClass("list_item_main");
				list_item_main.attr("data-group", groupField);
			}
		} else {
			list_item_main = thisPlugin.jl_list_01.find("> .list_item_main");
			if(list_item_main.length == 0){
				list_item_main = $("<div>").appendTo(thisPlugin.jl_list_01);
				list_item_main.addClass("list_item_main");
			}
		}
		
		var dl = null;
		var dl_title = $(thisPlugin.obj).find("> .jl_title > dl");
		var dl_list = thisPlugin.jl_list_01.find(" > div > dl[data-index='"+ rowIndex +"']");
		if(dl_title.length > 0){
			dl = dl_title.clone(false).appendTo(list_item_main);
			dl.find("dd").html("");
		}else{
			dl = $("<dl>").appendTo(list_item_main);
			var dt = $("<dt>").appendTo(dl);
			dt.append("<i class='fa fa-square-o'></i>");
			if(!thisPlugin.config.multi){
				dt.hide();
			}
		}
		
		if(dl_list.length > 0){
			dl_list.after(dl);
			dl_list.remove();
			
			if(dl.closest(list_item_main).length == 0){
				dl.appendTo(list_item_main);
			}
		}
		
		if(!JL.isNull(this.config.rowclass)){
			dl.addClass(this.config.rowclass);
		}
		
		dl.attr("data-index",rowIndex);
		dl.find("> dt").click(function(){
			var dl = $(this).closest("dl");
			var square = $(this).find("> i");
			if(square.hasClass("fa-check-square-o")){
				square.removeClass("fa-check-square-o");
				square.addClass("fa-square-o");
				dl.removeClass("xuan");
			}else if(square.hasClass("fa-square-o")){
				square.removeClass("fa-square-o");
				square.addClass("fa-check-square-o");
				dl.addClass("xuan");
			}

			if(thisPlugin.obj.find("dl[data-index] > dt > .fa-check-square-o").length == thisPlugin.data.length){
				thisPlugin.obj.children(".jl_title").find(" > dl > dt > i").removeClass("fa-square-o").addClass("fa-check-square-o");
			}else{
				thisPlugin.obj.children(".jl_title").find(" > dl > dt > i").removeClass("fa-check-square-o").addClass("fa-square-o");
			}
			
			if(!JL.isNull(thisPlugin.config.listener.checked)){
				var rowIndex = dl.attr("data-index");
				thisPlugin.config.listener.checked(thisPlugin, rowIndex, dl);
			}
		});
		if(!thisPlugin.config.multi){
			dl.find("> dt").hide();
		}

		//滑动事件
		if(!JL.isNull(dl.swipeleft)){
			dl.swipeleft(function(e){
				var obj = $(this);
				
				if(!JL.isNull(thisPlugin.config.listener.beforeswipeleft)){
					var rowIndex = $(this).attr("data-index");
					var data = thisPlugin.getData(rowIndex);
					thisPlugin.config.listener.beforeswipeleft(thisPlugin, data, rowIndex, obj);
				}
				
				var touch = obj.siblings(".touch");
				touch.animate({"margin-left": "0"}, 300);
				touch.removeClass("touch");
				obj.addClass("touch");
				
				var btn_width = obj.find("> dd.btn").width();
				obj.animate({"margin-left": - btn_width + "px"}, 300);
				e.preventDefault();
				event.preventDefault();
				
				if(!JL.isNull(thisPlugin.config.listener.afterswipeleft)){
					var rowIndex = $(this).attr("data-index");
					var data = thisPlugin.getData(rowIndex);
					thisPlugin.config.listener.afterswipeleft(thisPlugin, data, rowIndex, obj);
				}
			});
			dl.swiperight(function(e){
				$(this).animate({"margin-left": "0px"}, 300);
				e.preventDefault();
				event.preventDefault();
			});
		}
		
		dl.click(function(event){
			if($(event.target).closest("dt").length == 0){
				if(thisPlugin.config.rowSelectMode == "radio"){
					$(this).parent().siblings(".list_item_main").addBack().find("> dl > dt > i.fa-check-square-o").click();
					$(this).find("> dt > i.fa-square-o").click();
				}else if(thisPlugin.config.rowSelectMode == "toggleRadio"){
					$(this).parent().siblings(".list_item_main").find("> dl > dt > i.fa-check-square-o").click();
					$(this).siblings("dl").find("> dt > i.fa-check-square-o").click();
					$(this).find("> dt > i").click();
				}else if(thisPlugin.config.rowSelectMode == "multi"){
					$(this).find("> dt > i").click();
				}else if(thisPlugin.config.rowSelectMode == "group"){

				}else if(thisPlugin.config.rowSelectMode == "none"){
					
				}else if(thisPlugin.config.rowradio){
					$(this).parent().siblings(".list_item_main").addBack().find("> dl > dt > i.fa-check-square-o").click();
				}
				if(thisPlugin.mobileBatchState){
					return false;
				}
				
				if(!JL.isNull(thisPlugin.config.listener.rowclick)){
					var rowIndex = $(this).attr("data-index");
					var data = thisPlugin.getData(rowIndex);
					thisPlugin.config.listener.rowclick(thisPlugin, data, rowIndex);
				}
			}
		});
		
		dl.dblclick(function(){
			if(!JL.isNull(thisPlugin.config.listener.rowdblclick)){
				var rowIndex = $(this).attr("data-index");
				var data = thisPlugin.getData(rowIndex);
				thisPlugin.config.listener.rowdblclick(thisPlugin, data, rowIndex);
			}
		});
	
		for(var i=0; i<thisPlugin.config.header.length; i++){
			var row = thisPlugin.config.header[i];
			var value = JL.isNull(data[row.id])? "": data[row.id];
			var dd = null,ul = null;
			if(!JL.isNull(row.groupid)){
				dd = dl.find("> dd[groupid='"+row.groupid+"']").length == 0? $("<dd>").appendTo(dl): dl.find("> dd[groupid='"+row.groupid+"']");
				dd.attr("groupid", row.groupid);
				if(!JL.isNull(row.groupwidth)){
					dd.addClass(row.groupwidth);
				}
			}else{
				dd = $("<dd>").appendTo(dl);
				dd.addClass(row.width);
			}
			
			if(!JL.isNull(row.groupcss)){
				dd.addClass(row.groupcss);
			}
			
			ul = dd.find("> ul").length == 0? $("<ul>").appendTo(dd.empty()): dd.find("> ul");
			this.addCell(ul, row, data[row.id]);
		}
		
		if(!JL.isNull(thisPlugin.config.more)){
			var more = $("<dd>").appendTo(dl);
			more.addClass("more");
			if(thisPlugin.config.multi){
				more.addClass("w09");
			}else{
				more.addClass("w10");
			}
			//var ul = more.find("> ul").length == 0? $("<ul>").appendTo(more.empty()): more.find("> ul");
			var ul = $("<ul>").hide().appendTo(more);
		 	
		 	var dd = $("<dd>").appendTo(dl);
		 	dd.addClass("w01 ml10 mt10 jl_list_btn");
		 	dd.append("<ul><li class='jl_list_btn'><a class='jl_btn btn_white'><i class='fa fa-angle-down'></i>更多</a></li></ul>");
		 	dd.find("> ul > li > a.jl_btn").click(function(){
		 		var ul = $(this).closest("dd").prev().find("> ul");
		 		var i = $(this).find("> i");
		 		if(ul.is(":hidden")){
		 			i.removeClass("fa-angle-up");
		 			i.addClass("fa-angle-down");
		 			ul.slideDown();
		 		}else{
		 			i.removeClass("fa-angle-down");
		 			i.addClass("fa-angle-up");
		 			ul.slideUp();
		 		}
		 	});
		 	
			for(var i=0; i<thisPlugin.config.more.length; i++){
				var row = thisPlugin.config.more[i];
				var child = this.addCell(ul, row, data[row.id]);
			}
		}
		
		if(this.config.mode == "edit"){
			this.hideRowEditor(rowIndex,true);
		}

		if(!JL.isNull(thisPlugin.config.listener.loadRow)){
			thisPlugin.config.listener.loadRow(thisPlugin, data, rowIndex, dl);
		}
		
		return dl;
	}

	this.disabled = function(){
		
	}
	
	this.init = function(){
		$(this.obj).empty();
		$(this.obj).addClass("jl_list");
		
		for(var i=0; i<thisPlugin.config.header.length; i++){
			var row = thisPlugin.config.header[i];
			this.config.head[row.id] = row.name || row.title;
		}
		
		if(!JL.isNull(this.config.title)){
			this.initHeader();
		}
		this.initBody();
		if(!JL.isNull(this.config.paging) || !JL.isNull(this.config.pagesize)){
			this.initPaging();
		}
	}
	this.init();
}