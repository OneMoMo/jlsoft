JLTreeGrid = function(json){
	this.config = {
		"style": "jl_tree_02",//高度
		"height": null,//高度
		"title": [],//标题
		"header": [],//列头
		"more": [],//隐藏块
		"card": true,
		"multi": false,//隐藏块
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
	this.updateData = {};
	this.plugin = {};
	this.paging = {};
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	//外部可用
	this.setData = function(data){
		this.removeAll();
		if(JL.isNull(data)){
			this.data = [];
		}else{
			this.data = data;
		}
		for(var i=0; i<this.data.length; i++){
			this.appendRow(this.data[i], i);
		}
		if(!JL.isNull(this.config.listener.loadData)){
			this.config.listener.loadData();
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
		}
	};
	
	//外部可用 获取选中行数据
	this.getSelected = function(){
		var checkboxs = this.jl_list_01.find("dl[data-index] dd i.fa-check-square");
		var Arr = [];
		for(var i=0;i<checkboxs.length;i++){
			var checkbox = $(checkboxs[i]);
			if(checkbox.closest("dl").next("div.jl_tree_02").length == 0){
				if(checkbox.index() < 2){
					var index = checkbox.closest("dl").attr("data-index");
					Arr.push(this.data[index]);
				}
			}
		}
		return Arr;
	};
	
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
	
	this.getFirstDL = function(){
		return this.jl_list_01.find("dl[data-index='0']");
	};

	this.getDL = function(index){
		return this.jl_list_01.find("dl[data-index='"+index+"']");
	};

	this.getLastDL = function(){
		return this.jl_list_01.find("dl[data-index='"+(this.data.length-1)+"']");
	};
	
	this.initHeader = function(){
		var jl_title = $("<div>").appendTo(thisPlugin.obj);
		jl_title.addClass("jl_title");
		
		var dl = $("<dl>").appendTo(jl_title);
		for(var i=0; i<thisPlugin.config.title.length; i++){
			var row = thisPlugin.config.title[i];
			var dd = $("<dd class='"+row.width+"' groupid='"+row.id+"'>"+row.name+"</dd>").appendTo(dl);
			
			if(!JL.isNull(row.align)){
				dd.css({"text-align":row.align});
			}
		}
	}
	
	this.loadButtons = function(id, boolean){
		if(!JL.isNull(this.config.buttons)){
			var add_item = $("<div>").appendTo(thisPlugin.obj);
			add_item.addClass("add_item");
			$.each(this.config.buttons, function(key, config){
				if(key == "jlNew"){
					var jlNew = $("<span class='pr10'><i class='fa fa-plus ml10 mr5'></i>新增</span>").appendTo(add_item);
					jlNew.data(config);
					jlNew.click(function(){
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

	//外部可用 删除所有数据
	this.removeAll = function(){
		if(thisPlugin.form.find(".addCarShow").length > 0 && this.config.card){
			var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
			addCarShow.hide();
			thisPlugin.form.getTab().append(addCarShow);
		}
		this.data = [];
		this.jl_list_01.empty();
	};
	
	this.setPaging = function(fileName){
		if(!JL.isNull(this.config.paging)){
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
	};
	
	this.initPaging = function(){
		var jl_bottom = $("<div>").appendTo(thisPlugin.obj);
		jl_bottom.addClass("jl_bottom hide");
		if(this.config.paging == "more"){
			jl_bottom.click(function(){
				thisPlugin.paging.currentPage++;
				var resultData = JL.getPagingData(thisPlugin.paging.filename,thisPlugin.paging.currentPage);
				thisPlugin.addData(resultData);
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
	
	this.formatValue = function(value){
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
		
		return value;
	}

	this.appendEditor = function(dd, row, value, item){
		var rowIndex = dd.closest("dl").attr("data-index");
		if(JL.isNull(this.plugin[rowIndex])){
			this.plugin[rowIndex] = {};
		}
		var child = null;
		if(row.editor == "a"){
			child = $("<a>").appendTo(dd);
			child.html(value);
			child.attr("href", value);
			child.attr("target", "_blank");
		}else if(row.editor == "text"){
			var child = $("<input>").appendTo(dd);
			child.attr("type","text");
			child.attr("placeholder", row.title);
			child.val(value);
			if(JL.isNull(row.width)){
				child.addClass("w12");
			}
		}else if(row.editor == "button"){
			child = $("<a class='jl_btn btn_blue'>"+row.title+"</a>").appendTo(dd);
		}else if(row.editor == "link"){
			child = $("<a class='font_blue'>"+row.title+" </a>").appendTo(dd);
		}else if(row.editor == "JLEdit" || row.editor == "JLNewChild"){
			child = $("<a class='font_blue'>"+row.title+"</a>").appendTo(dd);
			child.attr("editortype", row.editor);
			var rowData = this.getData(rowIndex);
			var finalData = rowData[this.config.final.id];
			if(typeof finalData == "object" && !JL.isNull(finalData.key)){
				finalData = finalData.key;
			}
			if(row.editor == "JLNewChild"){
				if(finalData == this.config.final.key){
					child.hide();
				}
			}
			
			child.click(function(){
				if(thisPlugin.form.getTab().find(".addCarShow").length > 0){
					var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
					addCarShow.hide();
					thisPlugin.form.getTab().append(addCarShow);
				}
				thisPlugin.form.emptyCard();
				thisPlugin.form.readonly(row.config.readonly, true);
				var dataIndex = $(this).closest("dl[data-index]").attr("data-index");
				var rowData = thisPlugin.getData(dataIndex);
				
				var cds = thisPlugin.getCds();
				if(!JL.isNull(cds)){
					if(row.editor == "JLEdit"){
						cds.buildDataPointer(thisPlugin.config["cds-field"], rowData._cdsid)
						cds.edit();
					}else if(row.editor == "JLNewChild"){
						var newData = {}; 
						cds.append();
						$.each(row.config.mapping, function(o, n){
							newData[n] = rowData[o];
						});
						thisPlugin.form.putCard(newData);
					} 
				}else{
					var newData = {}; 
					$.each(rowData, function(key, value){
						if(!JL.isNull(row.config.mapping) && !JL.isNull(row.config.mapping[key])){
							newData[row.config.mapping[key]] = value;
						}else if(row.editor == "JLEdit"){
							newData[key] = value;
						}
					})
					thisPlugin.form.putCard(newData);
				}
				if(thisPlugin.form.getTab().find(".jl_defCar").length > 0){
					JL.showCard(thisPlugin.form.getTab().find(".jl_defCar"));
				}
				if(thisPlugin.form.getTab().find(".addCarShow").length > 0){
					var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
					var dl = thisPlugin.obj.find("dl[data-index='"+dataIndex+"']");
					dl.after(addCarShow);
					addCarShow.show();
					$('html,body').animate({scrollTop:dl.offset().top - 44}, 300);
				}
				/*var newData = {}; 
				$.each(rowData, function(key, value){
					if(!JL.isNull(row.config.mapping) && !JL.isNull(row.config.mapping[key])){
						newData[row.config.mapping[key]] = value;
					}else if(row.editor == "JLEdit"){
						newData[key] = value;
					}
				})
				thisPlugin.form.putCard(newData);*/
			});
		}else if(row.editor == "select"){
			var span = $("<span>").appendTo(dd);
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
			console.info(resultData);
			
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
		}else if(row.editor == "plugin"){
			child = $("<div>").appendTo(dd);
			var pluginConfig = $.extend({}, row.config);
			if(JL.isNull(pluginConfig.listener)){
				pluginConfig.listener = {};
			}
			if(JL.isFunction(pluginConfig.listener.change)){
				pluginConfig.listener.change_n = pluginConfig.listener.change;
			}
			pluginConfig.listener.change = function(data){
				thisPlugin.data[rowIndex][row.id] = data;
				if(JL.isFunction(this.change_n)){
					this.change_n(data);
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
		}else if(!JL.isNull(row.editor)){
			child = $("<"+row.editor+">").appendTo(dd);
			child.html(value);
			if(!JL.isNull(row.style)){
				child.addClass(row.style);
			}
		}else{
			child = $("<label>").appendTo(dd);
			child.addClass("mr10");
			child.html(value);
		}

		if(child.is(":text")){
			child.blur(function(){
				var id = $(this).data("id");
				thisPlugin.data[rowIndex][id] = $(this).val();
			});
		}
		
		if(!JL.isNull(row.align)){
			dd.css({"text-align":row.align});
		}
		if(!JL.isNull(row.width)){
			child.addClass(row.width);
		}
		if(!JL.isNull(row.css)){
			child.addClass(row.css);
		}
		if(!JL.isNull(row.title)){
			child.attr("title",row.title);
		}
		if(!JL.isNull(row.fontcolor)){
			child.addClass("font_"+row.fontcolor);
		}
		if(!JL.isNull(row.hidden) && row.hidden == true){
			dd.hide();
		}
		if(!JL.isNull(row.listener)){
			$.each(row.listener, function(key, value){
				var func = function(){
					var rowIndex = dd.closest("dl").attr("data-index");
					value(thisPlugin.getData(rowIndex), rowIndex, $(this), thisPlugin);
				};
				child.bind(key, func);
			});
		}
		child.attr("data-id",row.id);
		child.data(row);
		return child;
	}
	
	//外部可用 单元格赋值
	this.setCell = function(value, x, id){
		this.data[x][id] = value;
		
		value = this.formatValue(value);
		
		var DL = thisPlugin.jl_list_01.find("dl[data-index='"+x+"']");
		if(DL.find(":text[data-id='"+id+"']").length != 0){
			DL.find(":text[data-id='"+id+"']").val(value);
		}else{
			for(var i=0; i<thisPlugin.config.header.length; i++){
				var row = thisPlugin.config.header[i];
				if(row.id == id && !JL.isNull(row.name)){
					value = row.name+": "+ value;
				}
			}
			DL.find("[data-id='"+id+"']").html(value);
		}
	}
	
	this.addCell = function(dd, row, value){
		value = this.formatValue(value);
		if(JL.isNull(value)){
			value = "";
		}
		if(!JL.isNull(row.name)){
			value = row.name+": "+ value;
		}
		var child = this.appendEditor(dd, row, value);
	}
	
	this.hideRowEditor = function(index, boolean){
		$.each(this.plugin[index] ,function(key, value){
			var JLID = value;
			if(!JL.isNull(JLID) && JL.isFunction(JLID.hide)){
				if($.inArray(JLID.config.jlid, ["JLCheckbox","JLRadio"]) == -1){
					JLID.hide(boolean);
					if(boolean){
						JLID.obj.after("<label>"+thisPlugin.formatValue(JLID.data, {})+"</label>");
					} else {
						JLID.obj.next().remove();
					}
				}else{
					JLID.setData(thisPlugin.getData(index, key) || "");
					JLID.disabled(boolean);
				}
			}
		});
		if(boolean){
			var texts = this.getDL(index).find(":text");
			for(var i=0; i<texts.length; i++){
				var text = $(texts[i]);
				text.hide();
				text.after("<label>"+(this.getData(index, text.attr("data-id")) || "")+"</label>")
			}
		}else{
			var texts = this.getDL(index).find(":text");
			for(var i=0; i<texts.length; i++){
				var text = $(texts[i]);
				text.show();
				text.val((this.getData(index, text.attr("data-id")) || ""));
				text.next().remove();
			}
		}
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
	
	//外部可用 行添加数据
	this.setRow = function(data,index){
		$.each(data, function(key, value){
			thisPlugin.setCell(value, index, key);
		});
		
		var finalData = data[this.config.final.id];
		if(typeof finalData == "object" && !JL.isNull(finalData.key)){
			finalData = finalData.key;
		}
		
		var dl = thisPlugin.jl_list_01.find("dl[data-index='"+index+"']");
		var dd = dl.find("> dd:first");
		var margin_left = dd.find("i:first").css("margin-left").split("px")[0]*1;
		dd.find("i").remove();
		if(finalData == this.config.final.key){
			if((margin_left-26)%30 != 0){
				margin_left+=26;
			}
			dd.prepend("<i class='fa fa-hospital-o' style='margin-left:"+margin_left+"px'></i>");
			dl.find("[data-id='newChild']").hide();
		}else{
			if((margin_left-26)%30 == 0){
				margin_left-=26;
			}
			dd.prepend("<i class='fa fa-folder-open'></i>");
			dd.prepend("<i class='fa fa-minus-square-o' style='margin-left:"+margin_left+"px'></i>");
			dl.find("[data-id='newChild']").show();
		}
	};
	
	this.addRow = function(data){
		this.data.push(data);
		return this.appendRow(data, this.data.length-1);
	}
	
	//外部可用 新增行
	this.appendRow = function(data, rowIndex){
		var parent = data[this.config.parent];
		var tree_div = null;
		if(JL.isNull(parent)){
			tree_div = thisPlugin.jl_list_01;
		}else{
			tree_div = thisPlugin.jl_list_01.find("div[data-id='"+parent+"']");
			if(tree_div.length == 0){
				tree_div = thisPlugin.jl_list_01;
			}
		}
		
		//var dl = $("<dl>").appendTo(tree_div);
		var dl = null;
		var dl_title = $(thisPlugin.obj).find("> .jl_title > dl");
		if(dl_title.length > 0){
			dl = dl_title.clone(false).appendTo(tree_div);
		}else{
			dl = $("<dl>").appendTo(tree_div);
		}
		
		dl.find("> dd").html("");
		dl.attr("data-index", rowIndex);
		dl.attr("data-id", data[this.config.current]);
		dl.click(function(event){
			if($(event.target).closest("dt").length == 0){
				$(this).siblings().find("> dt > i.fa-check-square-o").click();
				$(this).find("> dt > i.fa-square-o").click();
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
			
			this.addCell(dd, row, data[row.id]);
		}
		
		var margin_left = 0
		var finalData = data[this.config.final.id];
		if(typeof finalData == "object" && !JL.isNull(finalData.key)){
			finalData = finalData.key;
		}
		
		if(dl.closest(".jl_tree_02").prev().find("> dd:first > i:first").length > 0){
			margin_left = dl.closest(".jl_tree_02").prev().find("> dd:first > i:first").css("margin-left").replace("px","") * 1;
			margin_left += 24;
			if(finalData == this.config.final.key){
				margin_left += 24;
			}
		}
		if(finalData == this.config.final.key){
			dl.find("dd:first").prepend("<i class='fa fa-hospital-o' style='margin-left:"+margin_left+"px'></i>");
			if(this.config.multi){
				var checkbox = $("<i class='fa fa-square-o' style='margin-left:"+margin_left+"px'></i>").prependTo(dl.find("dd:first"));
				checkbox.click(function(e){
					if($(this).hasClass("fa-square-o")){
						JL.changeClass($(this), "fa-square-o", "fa-check-square");
					}else{
						JL.changeClass($(this), "fa-check-square", "fa-square-o");
						JL.changeClass($(this).closest("dl").parents(".jl_tree_02").prev("dl[data-index]").find(".fa-check-square"), "fa-check-square fa-square-o", "fa-minus-square");
					}
					var jl_tree_02 = $(this).closest("dl").parents(".jl_tree_02");
					for(var i=0; i<jl_tree_02.length; i++){
						var dl = $(jl_tree_02[i]).prev("dl[data-index]");
						var checked = dl.find(".fa-check-square,.fa-minus-square,.fa-square-o");
						
						if($(jl_tree_02[i]).find("> dl[data-index]").length == $(jl_tree_02[i]).find("> dl[data-index] > dd >.fa-check-square").length){
							JL.changeClass(checked, "fa-check-square fa-minus-square fa-square-o", "fa-check-square");
						}else if($(jl_tree_02[i]).find("> dl[data-index] > dd >.fa-check-square,> dl[data-index] > dd >.fa-minus-square").length == 0){
							JL.changeClass(checked, "fa-check-square fa-minus-square fa-square-o", "fa-square-o");
						}else{
							JL.changeClass(checked, "fa-check-square fa-minus-square fa-square-o", "fa-minus-square");
						}
					}
					e.stopPropagation();
				});
				checkbox.next().addClass("ml0")
			}
		}else{
			dl.find("dd:first").prepend("<i class='fa fa-folder-open'></i>");
			if(this.config.multi && this.config.multi != "MJ"){
				var checkbox = $("<i class='fa fa-square-o'></i>").prependTo(dl.find("dd:first"));
				checkbox.click(function(e){
					if($(this).hasClass("fa-square-o")){
						JL.changeClass($(this), "fa-square-o", "fa-check-square");
						JL.changeClass($(this).closest("dl").next(".jl_tree_02[data-id]").find("dl[data-index] .fa-square-o"), "fa-square-o", "fa-check-square");
					}else if($(this).hasClass("fa-minus-square")){
						JL.changeClass($(this), "fa-minus-square", "fa-check-square");
						JL.changeClass($(this).closest("dl").next(".jl_tree_02[data-id]").find("dl[data-index] .fa-square-o, dl[data-index] .fa-minus-square"), "fa-square-o fa-minus-square", "fa-check-square");
					}else{
						JL.changeClass($(this), "fa-check-square", "fa-square-o");
						JL.changeClass($(this).closest("dl").next(".jl_tree_02[data-id]").find("dl[data-index] .fa-check-square"), "fa-check-square", "fa-square-o");
						
					}
					var jl_tree_02 = $(this).closest("dl").parents(".jl_tree_02");
					for(var i=0; i<jl_tree_02.length; i++){
						var dl = $(jl_tree_02[i]).prev("dl[data-index]");
						var checked = dl.find(".fa-check-square,.fa-minus-square,.fa-square-o");
						
						if($(jl_tree_02[i]).find("> dl[data-index]").length == $(jl_tree_02[i]).find("> dl[data-index] > dd >.fa-check-square").length){
							JL.changeClass(checked, "fa-check-square fa-minus-square fa-square-o", "fa-check-square");
						}else if($(jl_tree_02[i]).find("> dl[data-index] > dd >.fa-check-square,> dl[data-index] > dd >.fa-minus-square").length == 0){
							JL.changeClass(checked, "fa-check-square fa-minus-square fa-square-o", "fa-square-o");
						}else{
							JL.changeClass(checked, "fa-check-square fa-minus-square fa-square-o", "fa-minus-square");
						}
					}
					e.stopPropagation();
				});
			}
			dl.find("dd:first").prepend("<i class='fa fa-minus-square-o' style='margin-left:"+margin_left+"px'></i>");
			var div = $("<div>");
			div.addClass("jl_tree_02");
			div.attr("data-id",data[this.config.current]);
			dl.after(div);
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
		if(!JL.isNull(this.config.title)){
			this.initHeader();
		}
		this.initBody();
		
		if(!JL.isNull(this.config.paging)){
			this.initPaging();
		}
	}
	this.init();
}