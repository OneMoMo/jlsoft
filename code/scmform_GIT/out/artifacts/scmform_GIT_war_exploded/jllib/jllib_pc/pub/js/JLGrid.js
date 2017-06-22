var JLGrid = function(json){
	this.config = {
		"tittles": "",
		"sort": {},
		"head": {},
		"buttons": [],
		"headers": {},
		"initCell": [],
		"lastActive": null,
		"sequence": true,//序号
		"summary": {},
		"listener": {}
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
	this.filter = {};//筛选
	this.selectedIndex = [];
	this.paging = {
		"currentPage": 1,
		"lastPage": 1
	}
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setCdsData = function(data){
		this.setData(data);
	};
	
	$(this.obj).empty();
	var table_content = $("<div class='table_content'></div>").appendTo(this.obj);
	var table_title = $("<div class='table_title'></div>").appendTo(table_content);
	table_title.append("<h3>"+this.config.tittles+"</h3>");
	table_title.append("<div class='title_right' ></div>");
	var table_show = $("<div class='table_show'></div>").appendTo(table_content);
	var table_main = $("<div class='table_main'></div>").appendTo(table_show);
	table_main.append("<dl class='table title'><dt><input type='checkbox'></dt></dl>");
	var table_summary = $("<div class='table_summary'></div>").appendTo(table_main);
	var table_control = $("<div class='table_control hide'></div>").appendTo(table_content);
	table_control.append("<div class='w07'>&nbsp;</div><div class='w05'></div>");

	this.disabled = function(keys){
		if(JSON.stringify(keys) == "{}"){
			table_title.children(".title_right").hide();
		}
		var headers = this.config.headers;
		for(var i=0;i<headers.length;i++){
			var row = headers[i];
			if(!JL.isNull(row.editor)){
				if(!JL.isNull(keys[row.id])){
					this.config.headers[i].editor.disabled = false;
				}else{
					this.config.headers[i].editor.disabled = true;
				}
			}else{
				if(!JL.isNull(keys[row.id])){
					this.config.headers[i].editor = {};
					this.config.headers[i].editor.type = "text";
					this.config.headers[i].editor.disabled = false;
				}
			}
		}
	};

	this.disabledAllColumn = function(boolean){
		for(var j=0; j<this.config.headers.length; j++){
			var row = this.config.headers[j];
			if(!JL.isNull(row.editor)){
				row.editor.disabled = boolean;
				if(boolean){
					var dls = table_main.find("> .table_case > .table");
					for(var i=0;i<dls.length;i++){
						var dl = $(dls[i]);
						var rowIndex = dl.attr("data-index");
						var data = this.formatValue(this.getData(rowIndex, row.id), j, rowIndex);
						if(row.editor.type != "checkbox"){
							dl.find("> [data-index='"+j+"']").removeClass("edit");
							dl.find("> [data-index='"+j+"']").html("<div class='ellipsis' title='"+data+"'>"+data+"</div>");
						}
					}
				} else {
					table_main.find("> .table_case > .table > [data-index='"+j+"']").addClass("edit");
				}
			}
		}
	};
	
	this.disabledColumn = function(id, boolean){
		var index = this.getRowIndexByID(id);
		this.config.headers[index].editor.disabled = boolean;
		if(boolean){
			var dls = table_main.find("> .table_case > .table");
			for(var i=0;i<dls.length;i++){
				var dl = $(dls[i]);
				var rowIndex = dl.attr("data-index");
				var data = this.formatValue(this.getData(rowIndex, id), index, rowIndex);
				dl.find("> [data-index='"+index+"']").removeClass("edit");
				dl.find("> [data-index='"+index+"']").html("<div class='ellipsis' title='"+data+"'>"+data+"</div>");
			}
		} else {
			table_main.find("> .table_case > .table > [data-index='"+index+"']").addClass("edit");
		}
	};

	this.disabledCell = function(id, rowIndex, boolean){
		var index = this.getRowIndexByID(id);
		if(boolean){
			var data = this.formatValue(this.getData(rowIndex, id), index, rowIndex);
			var dl = table_main.find("> .table_case > .table[data-index='"+rowIndex+"']"); 
			dl.find("> [data-index='"+index+"']").removeClass("edit");
			dl.find("> [data-index='"+index+"']").html("<div class='ellipsis' title='"+data+"'>"+data+"</div>");
		}else{
			table_main.find("> .table_case > .table[data-index='"+rowIndex+"'] > [data-index='"+index+"']").addClass("edit");
		}
	};

	this.hideColumn = function(id, boolean){
		var i = this.getRowIndexByID(id);
		this.config.headers[i].hidden = boolean;
		var column = table_main.find("> .table.title > [data-index='"+i+"']");
		if(boolean){
			if(!column.is(":hidden")){
				table_main.css("width", (table_main.width() - column.width()) + "px");
			}
			column.hide();
			table_main.find("> .table_case > .table > [data-index='"+i+"']").hide();
			table_main.find("> .table_summary > .summary_main > .table > [data-index='"+i+"']").hide();
		}else{
			if(column.is(":hidden")){
				table_main.css("width", (table_main.width() + column.width()) + "px");
			}
			column.show();
			table_main.find("> .table_case > .table > [data-index='"+i+"']").show();
			table_main.find("> .table_summary > .summary_main > .table > [data-index='"+i+"']").show();
		}
	};

	this.hideButton = function(arr, boolean){
		var buttons = table_title.find("> .title_right a");
		for(var i = 0; i < arr.length; i++) {
			if(boolean){
				table_title.find("> .title_right a").eq(buttons.length - 1 - arr[i]).hide();
			} else {
				table_title.find("> .title_right a").eq(buttons.length - 1 - arr[i]).show();
			}
		}
	};

	this.hide = function(keys, boolean){
		var headers = this.config.headers;
		for(var i=0;i<headers.length;i++){
			var row = headers[i];
			if($.inArray(row.id, keys) != -1){
				if(boolean){
					this.hideColumn(row.id, true);
				} else {
					this.hideColumn(row.id, false);
				}
			}
		}
	};
	
	this.init = function(){
		this.setHeight(this.config.height);
		if(JL.isNull(this.config.buttons) && JL.isNull(this.config.tittles)){
			table_title.hide();
		}
		if(!JL.isNull(this.config.print) && this.config.print == true){
			var fa_print = $("<i class='fa fa-print' title='打印'></i>").appendTo(table_title);
			fa_print.click(function(){
				var dybh = thisPlugin.obj.attr("dybh");
				var selected = thisPlugin.getSelected();
				if(!JL.isNull(dybh) && selected.length > 0){
					JL.print(dybh,selected);
				}
			});
		}
		this.loadHead();
		this.loadButton();
		for(var i=0;i<this.config.headers.length;i++){
			var row = this.config.headers[i];
			if(!JL.isNull(row.editor) && JL.isNull(row.editor.disabled)){
				row.editor.disabled = false;
			}
		}
		
		if(!JL.isNull(this.config.paging)){
			if(this.config.paging == "more" || this.config.paging == "local"){
				this.loadMore();
			}else{
				this.loadPaging();
			}
		}
		this.loadEvents();
		var clone = table_main.clone();
		JL.changeClass(clone, "table_main", "summary_main");
		var title = clone.find(".table.title");
		title.removeClass("title");
		title.children().empty();
		table_summary.append(clone);
		if(JL.isNull(this.config.summary)){
			table_summary.hide();
		}else{
			$.each(this.config.summary, function(key, value){
				var html = "";
				var dd_sum = table_summary.find("> .summary_main > dl > [data-id='"+key+"']");
				for(var i=0;i<thisPlugin.config.headers.length;i++){
					var row = thisPlugin.config.headers[i];
					if(!JL.isNull(row.align) && row.id == key){
						dd_sum.attr("align", row.align);
					}
				}
				if(typeof value == "object"){
					html = "0";
					dd_sum.attr("title", value.title);
				}else if(value == "sum"){
					html = "0";
					//html = "合计: 0";
					dd_sum.attr("title", "合计");
				}else if(value == "average"){
					html = "0";
					//html = "平均值: ";
					dd_sum.attr("title", "平均值");
				}else if(value == "max"){
					//html = "最大值: ";
					dd_sum.attr("title", "最大值");
				}else if(value == "min"){
					//html = "最小值: ";
					dd_sum.attr("title", "最小值");
				}
				if(html === "0"){
					html = JL.formatNumber(html);
				}
				dd_sum.html(html);
			});
		}
		if(!JL.isNull(thisPlugin.config.detailGrid) && JL.isNull(thisPlugin.config.rightClickMenu)){
			thisPlugin.config.rightClickMenu = [[{
				text: "查看明细", 
				func: thisPlugin.loadDetailGrid2
			}]];
		}
	}
	
	this.loadDetailGrid = function(obj, detailGridConfigs){
		var rowIndex = obj.closest("dl[data-index]").attr("data-index");
		var rowDL = thisPlugin.getDL(rowIndex);
		thisPlugin.getAllDL().find(".from_the_table").remove();
		
		rowDL.closest(".table_content").addClass("overflow_inherit");
		var detailGrid = $("<div>").appendTo(rowDL);
		detailGrid.addClass("from_the_table");
		var margin_left = table_main.css("margin-left");
		margin_left = margin_left.substring(1,margin_left.length);
		detailGrid.css({"width": (thisPlugin.obj.width() - 20) +"px", "margin-left": margin_left});
		
		var sqlMap = JL.getSqlMap(detailGridConfigs.queryConfig);
		
		var detailGridConfig = {};
		detailGridConfig.obj = detailGrid;
		detailGridConfig.multi = false;
		detailGridConfig.paging = true;
		detailGridConfig.headers = sqlMap.result;
		if(JL.isNull(detailGridConfig.buttons)){
			detailGridConfig.buttons = [5];
		}else{
			detailGridConfig.buttons.push(5);
		}
		$.extend(detailGridConfig,detailGridConfigs);
		var gridObj = new JLGrid(detailGridConfig);
		gridObj.form = thisPlugin.form;
		gridObj.obj.find(".table_show").css("height", ($(window).height() - 450) + "px")
		var rowIndex = obj.attr("data-index");
		
		var detailGrid_title = detailGrid.find("> .table_content > .table_title");
		detailGrid_title.show();
		
		var search = $("<a class='jl_btn btn_color ml5'><i class='fa fa-search mr5'></i>查询</a>").prependTo(detailGrid_title);
		search.click(function(){
			thisPlugin.detailGridQuery(gridObj, detailGridConfig, rowIndex);
		});
		
		var queryField = $("<div>").prependTo(detailGrid_title);
		queryField.addClass("jl_screening pr10");
		queryField.load(sqlMap.page+"?rid="+Math.random(), function(){
			var obj = $(this);
			obj.children("div").addClass("mb10");
			if(!JL.isNull(sqlMap) && !JL.isNull(sqlMap.queryField)){
				$.each(sqlMap.queryField, function(key, value){
					if(value.enterQuery){
						obj.find("[name='"+key+"']").keyup(function(e){
							if(e.keyCode == 13){
								$(this).blur();
								thisPlugin.detailGridQuery(gridObj, detailGridConfig, rowIndex);
							}
						});
					}
				});
			}
			if(detailGridConfig.queryConfig.autoquery){
				thisPlugin.detailGridQuery(gridObj, detailGridConfig, rowIndex);
			}
		});
		
		var from_the_table_close = $("<i class='from_the_table_close' title='关闭'>×</i>").appendTo(detailGrid_title);
		from_the_table_close.click(function(){
			$(this).closest(".overflow_inherit").removeClass("overflow_inherit");
			$(this).closest(".from_the_table").remove();
		});
	}
	
	this.loadDetailGrid2 = function(){
		var rowIndex = $(this).closest("dl[data-index]").attr("data-index");
		var rowDL = thisPlugin.getDL(rowIndex);
		thisPlugin.getAllDL().find(".from_the_table").remove();
		
		rowDL.closest(".table_content").addClass("overflow_inherit");
		var detailGrid = $("<div>").appendTo(rowDL);
		detailGrid.addClass("from_the_table");
		var margin_left = table_main.css("margin-left");
		margin_left = margin_left.substring(1,margin_left.length);
		detailGrid.css({"width": (thisPlugin.obj.width() - 20) +"px", "margin-left": margin_left});
		
		var queryConfig = thisPlugin.config.detailGrid.queryConfig;
		var sqlMap = JL.getSqlMap(queryConfig);
		
		var detailGridConfig = $.extend({},thisPlugin.config.detailGrid);
		detailGridConfig.obj = detailGrid;
		detailGridConfig.multi = false;
		detailGridConfig.paging = true;
		detailGridConfig.headers = sqlMap.result;
		if(JL.isNull(detailGridConfig.buttons)){
			detailGridConfig.buttons = [5];
		}else{
			detailGridConfig.buttons.push(5);
		}
		var gridObj = new JLGrid(detailGridConfig);
		gridObj.form = thisPlugin.form;
		gridObj.obj.find(".table_show").css("height", ($(window).height() - 450) + "px")
		var rowIndex = $(this).attr("data-index");
		
		var detailGrid_title = detailGrid.find("> .table_content > .table_title");
		detailGrid_title.show();
		
		var search = $("<a class='jl_btn btn_color ml5'><i class='fa fa-search mr5'></i>查询</a>").prependTo(detailGrid_title);
		search.click(function(){
			thisPlugin.detailGridQuery(gridObj, detailGridConfig, rowIndex);
		});
		
		var queryField = $("<div>").prependTo(detailGrid_title);
		queryField.addClass("jl_screening pr10");
		queryField.load(sqlMap.page+"?rid="+Math.random(), function(){
			gridObj.form.initPlugIn();
			var obj = $(this);
			obj.children("div").addClass("mb10");
			if(!JL.isNull(sqlMap) && !JL.isNull(sqlMap.queryField)){
				$.each(sqlMap.queryField, function(key, value){
					if(value.enterQuery){
						obj.find("[name='"+key+"']").keyup(function(e){
							if(e.keyCode == 13){
								$(this).blur();
								thisPlugin.detailGridQuery(gridObj, detailGridConfig, rowIndex);
							}
						});
					}
				});
			}
			if(queryConfig.autoquery){
				thisPlugin.detailGridQuery(gridObj, detailGridConfig, rowIndex);
			}
		});
		
		var from_the_table_close = $("<i class='from_the_table_close' title='关闭'>×</i>").appendTo(detailGrid_title);
		from_the_table_close.click(function(){
			$(this).closest(".overflow_inherit").removeClass("overflow_inherit");
			$(this).closest(".from_the_table").remove();
		});
	};
	

	this.detailGridQuery = function(gridObj, detailGridConfig, rowIndex){
		var queryConfig = detailGridConfig.queryConfig;
		var sqlMap = JL.getSqlMap(queryConfig);
		
		var XmlData = $.extend({},thisPlugin.getData(rowIndex));
		if(!JL.isNull(queryConfig.queryField)){
			$.extend(XmlData, queryConfig.queryField);
		}
		var inputs = gridObj.obj.find(".jl_screening [name]");
		
		for(var i=0; i<inputs.length; i++){
			var input = $(inputs[i]);
			var plugin = input.closest("[id^='d_']").data("plugin");
			var value = plugin.getData();
			var key = plugin.config.id;
			if(typeof value == "object"){
				if($.isArray(value)){
					if(value.length > 0){
						if(typeof value[0] == "object"){
							var arr = [];
							for(var i=0;i<value.length;i++){
								arr.push(value[i]["key"]);
							}
							XmlData[key] = arr;
						}
					}else{
						delete XmlData[key]; 
					}
				}else if(!JL.isNull(value.key)){
					XmlData[key] = value.key;
				}else{
					delete XmlData[key];
				}
			}else{
				XmlData[key] = value;
			}
		}
		XmlData["dataType"] = "Json";
		XmlData["sqlid"] = sqlMap.sqlid;
		XmlData["DataBaseType"] = sqlMap.DataBaseType;
		$.extend(XmlData, userInfo);
		
		if(!JL.isNull(sqlMap.isNotNull)){
			var num = 0;
			$.each(sqlMap.isNotNull, function(key, value){
				if(JL.isNull(XmlData[key])){
					JL.tip(value, "info");
					num++;
					return false;
				}
			});
			if(num > 0){
				return false;
			}
		}
		
		var ajaxJson = {};
		if(!JL.isNull(sqlMap.url)){
			ajaxJson["src"] = sqlMap.url;
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}else if(!JL.isNull(sqlMap.interfaceId)){
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Inbound/dispatch.do?rid="+Math.random();
			ajaxJson["data"] = {"interfaceId":sqlMap.interfaceId, "data":JSON.stringify(XmlData)};
		}else if(!JL.isNull(sqlMap.collection)){
			XmlData["collection"] = sqlMap.collection;
			XmlData["result"] = {};
			for (var i = 0; i < sqlMap.result.length; i++) {
				var row = sqlMap.result[i];
				XmlData["result"][row.id] = 1;
			}
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/selectMongo.do?rid="+Math.random();
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}else{
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/select.do?rid="+Math.random();
			XmlData["QryType"] = "Report";
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}
		gridObj.setData([]);
		var resultData = JL.ajax(ajaxJson,true);
		if(!JL.isNull(resultData)){
			if(typeof resultData == "object" && !$.isArray(resultData)){
				var fileName = resultData.fileName;
				resultData = resultData.data;
				if(!JL.isNull(resultData) && resultData.resultlist != undefined){
					resultData = resultData.resultlist;
				}
				if(JL.isNull(sqlMap.interfaceId) && JL.isNull(sqlMap.url)){
					gridObj.setPaging(fileName);
				}
			}
			if(resultData.length == 0){
				JL.tip("未查到相关数据");
			}
			gridObj.setData(resultData);
		}
	};
	
	this.getDL = function(index){
		return this.obj.find("> .table_content > .table_show > .table_main > div > dl[data-index='"+index+"']");
	};

	this.getAllDL = function(index){
		return this.obj.find("> .table_content > .table_show > .table_main > div > dl[data-index]");
	};
	
	this.compare = function(obj, DD_id){
		var sort = null;
		if(JL.isNull(thisPlugin.config.sort[DD_id]) || thisPlugin.config.sort[DD_id]){
			sort = obj.sort(function(a,b){
				var DL1 = $(a).attr("data-groupfield");
				DL1 = JL.isNull(DL1)? $(a).attr("data-index"): DL1;
				var DL2 = $(b).attr("data-groupfield");
				DL2 = JL.isNull(DL2)? $(b).attr("data-index"): DL2;
				var value = thisPlugin.data[DL1][DD_id];
				value = JL.isNull(value)? "": value;
				var value1 = thisPlugin.data[DL2][DD_id];
				value1 = JL.isNull(value1)? "": value1;
				return value > value1 ? -1 : 1;
			});
		}else{
			sort = obj.sort(function(a,b){
				var DL1 = $(a).attr("data-groupfield");
				DL1 = JL.isNull(DL1)? $(a).attr("data-index"): DL1;
				var DL2 = $(b).attr("data-groupfield");
				DL2 = JL.isNull(DL2)? $(b).attr("data-index"): DL2;
				var value = thisPlugin.data[DL1][DD_id];
				value = JL.isNull(value)? "": value;
				var value1 = thisPlugin.data[DL2][DD_id];
				value1 = JL.isNull(value1)? "": value1;
				return value1 > value ? -1 : 1;
			});
		}
		obj.remove();
		return sort;
	}
	
	this.sort = function(DD_id){
		if(!JL.isNull(thisPlugin.config.groupField) && DD_id == thisPlugin.config.groupField){
			var GROUPS = table_main.find("> div[data-groupfield]");
			var sort = this.compare(GROUPS, DD_id);
			sort.appendTo(table_main);

			var table_case = table_main.find("> .table_case");
			for(var i=0;i<table_case.length;i++){
				var key = table_case.eq(i).attr("data-groupid");
				table_main.find("[data-groupfield='"+key+"']").after(table_case.eq(i));
			}						
		}else{
			var table_case = table_main.find("> .table_case");
			for(var i=0;i<table_case.length;i++){
				var DLS = table_case.eq(i).find("> .table:not(.title)");
				var sort = this.compare(DLS, DD_id);
				sort.appendTo(table_case.eq(i));
			}
		}
		this.loadSequence();
	};
	
	this.loadHead = function(){
		var headHTML = "";
		var tableWidth = 35;
		var headers = thisPlugin.config.headers;
		for(var i=0;i<headers.length;i++){
			var header = headers[i];
			thisPlugin.config.head[header["id"]] = header["name"];
			if(!JL.isNull(header["skbj"]) && userInfo.skbj == 1){
				header["hidden"] = true;
			}
			if(!JL.isNull(header["summary"])){
				thisPlugin.config.summary[header["id"]] = header["summary"];
			}
			var dd = $("<dd>");
			dd.attr("data-id", header["id"]);
			dd.attr("data-index", i);
			if(header.required){
				header["name"]+"<font class='font_red pl5'>*</font>";
			}
			dd.append("<div class='ellipsis'>"+header["name"]+"</div>");
			dd.find(".ellipsis").attr("title", header["title"] || header["name"]);
			if(JL.isNull(header["width"])){
				var fontSize = (window.getComputedStyle(document.body, "").fontSize || 12).replace("px", "");
				//header["width"] = header["name"] *  ;
				header["width"] = Number(fontSize) * header.name.length + 20;
			}
			if(header["hidden"]){
				dd.css({"display": "none"});
			}else{
				tableWidth += header["width"];
			}
			dd.css({"width": header["width"]+"px"});
			var cz_sort = $("<i class='cz_sort mr25'></i>").appendTo(dd);
			
			var cz_div = $("<div class='title_cz hide'></div>").appendTo(dd); 
			cz_div.append("<i class='cz_screening fa fa-filter ml5 fr'></i><i class='cz_sort hide fa fa-arrow-down ml5 fr'></i>");
			cz_div.find(".fa-filter").click(function(e){
				var data_index = $(this).closest("dd").attr("data-index");
				var data_id = $(this).closest("dd").attr("data-id");
				$(this).closest("dd").siblings().find(".jl_dropdown_menu").hide();
				
				var jl_dropdown_menu = $(this).siblings(".jl_dropdown_menu");
				if(jl_dropdown_menu.is(":hidden")){
					jl_dropdown_menu.show();
					
					jl_dropdown_menu.find("ul").empty();
					var checkAll = $("<li class='w12 font_color text_hide'><i class='fa fa-check-square mr5'></i>全选/反选</li>").appendTo(jl_dropdown_menu.find("ul"));
					checkAll.click(function(){
						var data_index = $(this).closest("dd").attr("data-index");
						var fa = $(this).find("i");
						if(fa.hasClass("fa-check-square")){
							thisPlugin.hideAllRow();
							var rowData = $(this).siblings();
							thisPlugin.filter[data_id]["hide"] = [];
							for(var i=0; i<rowData.length; i++){
								var text = $(rowData[i]).attr("title");
								thisPlugin.filter[data_id]["hide"].push(text);
							}
							$(this).siblings().addBack().removeClass("font_color");
							$(this).closest(".jl_dropdown_menu").prevAll(".cz_screening").removeClass("fa-filter").addClass("fa-sort-amount-asc");
							JL.changeClass($(this).siblings().addBack().find("i"), "fa-check-square", "fa-square-o");
						}else{
							thisPlugin.showAllRow();
							thisPlugin.filter[data_id]["hide"] = [];
							$(this).siblings().addBack().addClass("font_color");
							$(this).closest(".jl_dropdown_menu").prevAll(".cz_screening").removeClass("fa-sort-amount-asc").addClass("fa-filter");
							JL.changeClass($(this).siblings().addBack().find("i"), "fa-square-o", "fa-check-square");
						}
					});
					
					if(JL.isNull(thisPlugin.filter[data_id])){
						thisPlugin.filter[data_id] = {};
						thisPlugin.filter[data_id]["hide"] = [];
					}
					
					var rowData = thisPlugin.obj.find(".table_case > dl.table:not(.title) > dd[data-index='"+data_index+"']");
					for(var i=0; i<rowData.length; i++){
						var text = $(rowData[i]).text();
						
						if(jl_dropdown_menu.find("ul > li[title='"+text+"']").length == 0){
							var li = $("<li title='"+text+"' row-index='"+$(rowData[i]).parent().attr("data-index")+"' data-id='"+$(rowData[i]).attr("data-id")+"' class='w12 font_color text_hide'><i class='fa fa-check-square mr5'></i>"+text+"</li>").appendTo(jl_dropdown_menu.find("ul"));
							li.click(function(){
								var title = $(this).attr("title");
								var data_id = $(this).attr("data-id");
								var row_index = $(this).attr("row-index");
								var fa = $(this).find("i");
								if(fa.hasClass("fa-check-square")){
									if($.inArray(title, thisPlugin.filter[data_id]["hide"]) == -1){
										thisPlugin.filter[data_id]["hide"].push(title);
									}
									thisPlugin.hideRowById(data_id, thisPlugin.getData(row_index, data_id));
									$(this).removeClass("font_color");
									JL.changeClass(fa, "fa-check-square", "fa-square-o");
								}else{
									thisPlugin.filter[data_id]["hide"].remove($.inArray(title, thisPlugin.filter[data_id]["hide"]));
									thisPlugin.showRowById(data_id, thisPlugin.getData(row_index, data_id));
									$(this).addClass("font_color");
									JL.changeClass(fa, "fa-square-o", "fa-check-square");
								}
								
								if($(this).siblings("li[title]").addBack().find(".fa-square-o").length > 0){
									$(this).closest(".jl_dropdown_menu").prevAll(".cz_screening").removeClass("fa-filter").addClass("fa-sort-amount-asc");
									$(this).siblings("li:not([title])").removeClass("font_color");
									JL.changeClass($(this).siblings("li:not([title])").find("i"), "fa-check-square", "fa-square-o");
								} else {
									$(this).siblings("li:not([title])").addClass("font_color");
									$(this).closest(".jl_dropdown_menu").prevAll(".cz_screening").removeClass("fa-sort-amount-asc").addClass("fa-filter");
									JL.changeClass($(this).siblings("li:not([title])").find("i"), "fa-square-o", "fa-check-square");
								}
							});
							
							if($.inArray(text, thisPlugin.filter[data_id]["hide"]) != -1){
								li.click();
							}
							
							var reg_text = jl_dropdown_menu.find(">.delete_input > :text").val();
							if(!JL.isNull(reg_text) && li.html().indexOf(reg_text) == -1){
								li.hide();
							}
						}
					}
				}else{
					jl_dropdown_menu.hide();
				}
				
				e.stopPropagation();
			});
			
			var jl_dropdown_menu = $("<div class='jl_dropdown_menu'></div>").appendTo(cz_div);
			var delete_input = $("<div class='delete_input'></div>").appendTo(jl_dropdown_menu);
			var text = $("<input type='text' placeholder='输入条件检索'>").appendTo(delete_input);
			text.keyup(function(e){
				if(e.keyCode == 13){
					if(!JL.isNull(this.value)){
						$(this).closest(".jl_dropdown_menu").prevAll(".cz_screening").removeClass("fa-filter").addClass("fa-sort-amount-asc");
					}else{
						$(this).closest(".jl_dropdown_menu").prevAll(".cz_screening").removeClass("fa-sort-amount-asc").addClass("fa-filter");
					}
					var ul = $(this).parent().next();
					ul.find("> li[title]").hide();
					var lis = ul.find("> li[title]:contains('"+this.value+"')").show();
					thisPlugin.hideAllRow();
					for(var i=0; i<lis.length; i++){
						var li = $(lis[i]);
						var data_id = li.attr("data-id");
						var row_index = li.attr("row-index");
						var fa = li.find("i");
						if(fa.hasClass("fa-check-square")){
							thisPlugin.showRowById(data_id, thisPlugin.getData(row_index, data_id));
						}else{
							li.click();
						}
					}

					thisPlugin.filter[data_id]["hide"] = [];
					var lis = ul.find("> li[title]:not(:contains('"+this.value+"'))");
					for(var i=0; i<lis.length; i++){
						var li = $(lis[i]);
						var data_id = li.attr("data-id");
						var title = li.attr("title");
						thisPlugin.filter[data_id]["hide"].push(title);
					}
					
					//ul.find("> li[title]").show();
					//ul.find("> li[title]:not(:contains('"+this.value+"'))").hide();
					
				}
			});
			var empty = $("<i title='清空'>×</i>").appendTo(delete_input);
			empty.click(function(){
				var data_id = $(this).closest("dd").attr("data-id");
				$(this).prev().val("");
				var ul = $(this).parent().next();
				ul.find("> li[title]").show();
				ul.find("> li[title] >i.fa-square-o").click();
				thisPlugin.showAllRow();
				thisPlugin.filter[data_id]["hide"] = [];
			});
			
			var ul = $("<ul class='w12 mt10 overflow_y'></div>").appendTo(jl_dropdown_menu);
			
			dd.append("<i></i>");
			dd.appendTo(table_main.find(".table.title"));
			dd.click(function(){
				if($(event.target).is(".ellipsis")){
					$(this).siblings().find(".cz_sort").addClass("hide");
					var DD_id = $(this).attr("data-id");
					var sort_fa = $(this).find("> .title_cz > .cz_sort");
					if(sort_fa.hasClass("fa-arrow-down")){
						sort_fa.addClass("fa-arrow-up").removeClass("fa-arrow-down hide");
						thisPlugin.config.sort[DD_id] = true;
					}else if(sort_fa.hasClass("fa-arrow-up")){
						sort_fa.addClass("fa-arrow-down").removeClass("fa-arrow-up hide");
						thisPlugin.config.sort[DD_id] = false;
					}
					thisPlugin.sort(DD_id);
				}
			});
			dd.mouseenter(function(){
				$(this).find(".title_cz").show();
			}).mouseleave(function(){
				if($(this).find(".fa-sort-amount-asc").length == 0){
					$(this).find(".title_cz").hide();
				}
			});
			
			dd.attr("draggable", true);
			dd.on("dragstart",function(e){
				event.dataTransfer.setData("data_index", $(this).attr("data-index"));
			});
			dd.on("dragover",function(e){
				e.preventDefault();
			});
			dd.on("drop",function(e){
				var data_index_o = event.dataTransfer.getData("data_index");
				var data_index_n = $(this).attr("data-index");
				var dds = thisPlugin.obj.find("dd[data-index='"+data_index_o+"']");
				for(var i=0; i<dds.length; i++){
					var cloumn = $(dds[i]);
					if(event.offsetX <= $(this).width()/2){
						cloumn.siblings("[data-index='"+data_index_n+"']").before(cloumn);
					}else if(event.offsetX > $(this).width()/2){
						cloumn.siblings("[data-index='"+data_index_n+"']").after(cloumn);
					}
				}
				
				var arr = [];
				var dds = $(this).siblings().addBack();
				for(var i=0; i<dds.length; i++){
					var data_index = $(dds[i]).attr("data-index");
					if(!JL.isNull(data_index)){
						arr.push(data_index);
					}
				}
				if(!JL.isNull(thisPlugin.form)){
					var data_name = thisPlugin.form.getTab().attr("data-name");
					var plugin_name = thisPlugin.config.id;
					delete localStorage[data_name+"_"+plugin_name+"_order"];
					localStorage[data_name+"_"+plugin_name+"_order"] = JSON.stringify(arr);
				}
			});
		}
		table_main.width(tableWidth);
		if(thisPlugin.config.rowSelectMode == "groupRadio"
			|| thisPlugin.config.rowSelectMode == "radio"
			|| thisPlugin.config.rowSelectMode == "radioGroup"){
			table_main.find("dt :checkbox").attr("disabled","disabled");
		}else if(thisPlugin.config.multi == false){
			table_main.find("dt :checkbox").attr("disabled","disabled");
			table_main.find("dt").hide();
		}

		var X = 0,canMove = false,current = null;
		table_main.find(".table.title > dd > i").mousedown(function(event){ 
			X = event.clientX;
			canMove = true;
			current = this; 
			return false; 
		}); 
		$(document).mousemove(function(event){
			if(canMove){
				var moved_X = event.clientX - X;
				var dd = $(current).parent("dd");
				var table_main = $(current).closest(".table_show").find("> .table_main"); 
				var ddWidth = dd.width()*1 + moved_X;
				if(ddWidth > 0){
					X = event.clientX;
					var dd_index = dd.attr("data-index");
					//thisPlugin.config.headers[dd_index]["width"] = ddWidth+21;
					thisPlugin.config.headers[dd_index]["width"] = ddWidth;
					var tableWidth = table_main.width()*1 + moved_X;
					thisPlugin.obj.find("dd[data-index='"+dd_index+"']").width(ddWidth);
					if(table_main.width() > 0){
						table_main.width(tableWidth);
						table_main.prevAll("[data-position-top]").find("> .title").width(tableWidth);
						table_main.find("> .table_summary > .summary_main").width(tableWidth);
						thisPlugin.setScrollXWidth();
					}
				}
			}
			//return false; 
		}); 
		$(document).mouseup(function(e) { 
			canMove = false;
			current = null; 
		})
		
		this.loadCookiesCloumn();
		this.loadScrollX();
	};
	
	this.setScrollXWidth = function(){
		table_content.find("> .table_scrollbar").show();
		var ph = table_content.find("> .table_scrollbar > .table_scrollbar_main").parents(".hide:not([style*='display: block;'])");
		ph.show();		
		var table_main_width = table_main.width();
		var table_show_width = table_main.parent().width();
		var table_scrollbar_s = table_content.find("> .table_scrollbar > .table_scrollbar_main > .table_scrollbar_s");

		var table_scrollbar_main = Number(table_content.find("> .table_scrollbar > .table_scrollbar_main").width().toFixed(4));
		var mr = Number(Number((table_scrollbar_s.css("margin-left") || "0").replace("px", "")).toFixed(4));
		var bl = (table_show_width / table_main_width).toFixed(4);
		var width = table_scrollbar_main*bl;
		if(width + mr > table_scrollbar_main){
			table_scrollbar_s.css("margin-left", (table_scrollbar_main-width) + "px");
		}
		//table_scrollbar_s.css("width", (width/table_show_width)*100 +"%");
		table_scrollbar_s.css("width", width + "px");
		ph.hide();		
	}
	
	this.loadScrollX = function(){
		var table_main_width = table_main.width();
		var table_show_width = table_main.parent().width();
		var table_scrollbar = $("<div class='table_scrollbar hide'></div>");
		table_show.after(table_scrollbar);
		table_scrollbar.append("<i class='scroll_left fa fa-caret-left'></i>");
		var table_scrollbar_main = $("<div class='table_scrollbar_main'></div>").appendTo(table_scrollbar);
		var table_scrollbar_s = $("<div class='table_scrollbar_s'></div>").appendTo(table_scrollbar_main);
		table_scrollbar.append("<i class='scroll_right fa fa-caret-right'></i>");
		this.setScrollXWidth();
	
		var ScrollX = 0,canMove = false,current = null;
		table_scrollbar_s.mousedown(function(event){ 
			ScrollX = event.clientX;
			canMove = true;
			current = this; 
			return false; 
		}); 
		$(document).mousemove(function(event){
			if(canMove){
				var table_scrollbar_main_w = $(current).parent(".table_scrollbar_main").width();
				var table_scrollbar_s_w = $(current).width();
				var table_content = $(current).closest(".table_content");
				var table_show = table_content.find("> .table_show");
				var table_main = table_show.find(" > .table_main");
				var scroll_ml = table_scrollbar_main_w - table_scrollbar_s_w;

				var moved_X = event.clientX - ScrollX;
				var current_ml = Number($(current).css("margin-left").replace("px",""));
				if(current_ml >= 0){
					var table_main_width = table_main.width();
					var table_show_width = table_main.parent().width() - 30;
					var scrollBL = table_show_width / table_main_width;
					console.info(scrollBL);
					
					var moveScrollX = current_ml + moved_X;
					if(moveScrollX >= 0 && moveScrollX <= scroll_ml){
						table_content.find(".table_scrollbar_s").css("margin-left", moveScrollX + "px");
						var scrollLeft = -(moveScrollX / scrollBL);
						if(moveScrollX == scroll_ml){
							scrollLeft = - table_main_width + table_show_width + 4;
						}
						table_show.find("> [data-position-top] > .title").css("margin-left", scrollLeft + "px");
						//table_show.scrollLeft(moveScrollX / scrollBL + 4);
						table_main.css("margin-left", scrollLeft + "px");
					}else if(moveScrollX < 0){
						table_content.find(".table_scrollbar_s").css("margin-left", "0px");
						table_show.find("> [data-position-top] > .title").css("margin-left", "0px");
						table_main.css("margin-left", "0px");
					}
					ScrollX = event.clientX;
				}
			}
			//return false; 
		}); 
		$(document).mouseup(function(e) { 
			canMove = false;
			current = null; 
		})
		if(table_main_width > table_show_width){
		}else{
			table_scrollbar.hide();
		}
	}

	this.setColumnTitle = function(id, html){
		var headers = this.config.headers;
		for(var i=0; i<headers.length; i++){
			var header = headers[i];
			if(header.id == id){
				if(header.required){
					html += "<font class='font_red pl5'>*</font>";
				}
				this.obj.find(".table.title > dd[data-id='"+id+"'] > .ellipsis").html(html);
			}
		}
	};
	
	//外部可用 设置高度
	this.setHeight = function(height){
		if(!JL.isNull(height)){
			this.config.height = height;
			table_show.addClass("overflow_y overflow_xh");
			table_show.height(height);
		}
	};
	
	this.loadMore = function(){
		var table_bottom = $("<div class='w12 table_bottom tc hide'></div>").appendTo(table_content);
		var pagesize = $("<span class='w04' type='pagesize'>1/1</div>").appendTo(table_bottom);
		var more = $("<span class='w04' type='more'><i class='fa fa-angle-double-down mr10'></i>点击加载更多</div>").appendTo(table_bottom);
		var all = $("<span class='w04' type='all'><i class='fa fa-angle-double-down mr10'></i>点击加载全部</div>").appendTo(table_bottom);
		
		this.jl_bottom = table_bottom;
		all.click(function(){
			var asyncLoad = function(obj){
				thisPlugin.paging.currentPage++;
				
				var resultData = [];
				if(thisPlugin.config.paging == "local" && thisPlugin.config.pagesize){
					var nextSize = thisPlugin.config.pagesize*thisPlugin.paging.currentPage;
					var currentSize = thisPlugin.config.pagesize*(thisPlugin.paging.currentPage-1);
					nextSize = nextSize < thisPlugin.data.length? nextSize: thisPlugin.data.length;
					for(var i=currentSize; i<nextSize; i++){
						resultData.push(thisPlugin.data[i]);
						thisPlugin.addRow(thisPlugin.data[i], i, true);
					}
				}else{
					for(var i=0; i<thisPlugin.paging.pagingData.length; i++){
						thisPlugin.addRow(thisPlugin.paging.pagingData[i], null, true);
					}
					resultData = JL.getPagingData(thisPlugin.paging.filename,thisPlugin.paging.currentPage+1);
					if(resultData.length > 0) {
						thisPlugin.paging.pagingData = resultData;
					}else{
						thisPlugin.paging.pagingData = [];
					}
				}
				var progess = JL.progess(((thisPlugin.paging.currentPage/thisPlugin.paging.lastPage)*100).toFixed(0) +"%");
				if(resultData.length <= 0 || (thisPlugin.paging.currentPage == thisPlugin.paging.lastPage && resultData.length <= thisPlugin.config.pagesize)) {
					if(!thisPlugin.jl_bottom.is(":hidden")){
						var height = thisPlugin.config.height + 50;
						thisPlugin.setHeight(isNaN(height)? "": height);
					}
					obj.parent().hide();
					progess.progess.remove();
				}
				if(thisPlugin.paging.currentPage < thisPlugin.paging.lastPage){
					setTimeout(function(){
						asyncLoad(obj);
					}, 500);
				} else {
					thisPlugin.loadSummary();
				}
				obj.siblings("[type='pagesize']").html(thisPlugin.paging.currentPage+"/"+thisPlugin.paging.lastPage);
			}
			asyncLoad($(this));
		});
		more.click(function(){
			if(thisPlugin.config.paging == "local" && thisPlugin.config.pagesize){
				thisPlugin.paging.lastPage=Math.ceil(thisPlugin.data.length/thisPlugin.config.pagesize);
				var currentSize = thisPlugin.config.pagesize*thisPlugin.paging.currentPage;
				var nextSize = thisPlugin.config.pagesize*(thisPlugin.paging.currentPage+1);
				nextSize = nextSize < thisPlugin.data.length? nextSize: thisPlugin.data.length;
				for(var i=currentSize; i<nextSize; i++){
					thisPlugin.addRow(thisPlugin.data[i], i, true);
				}
				thisPlugin.paging.currentPage++;
				if(thisPlugin.paging.currentPage == thisPlugin.paging.lastPage) {
					if(!thisPlugin.jl_bottom.is(":hidden")){
						var height = thisPlugin.config.height + 50;
						thisPlugin.setHeight(isNaN(height)? "": height);
					}
					$(this).parent().hide();
				}
			}else{
				thisPlugin.paging.currentPage++;
				var resultData = thisPlugin.paging.pagingData;
				for(var i=0; i<resultData.length; i++){
					thisPlugin.addRow(resultData[i], null, true);
				}
				var resultData = JL.getPagingData(thisPlugin.paging.filename,thisPlugin.paging.currentPage+1);
				if(resultData.length > 0) {
					thisPlugin.paging.pagingData = resultData;
				}else{
					if(!thisPlugin.jl_bottom.is(":hidden")){
						var height = thisPlugin.config.height + 50;
						thisPlugin.setHeight(isNaN(height)? "": height);
					}
					$(this).parent().hide();
				}
			}
			$(this).siblings("[type='pagesize']").html(thisPlugin.paging.currentPage+"/"+thisPlugin.paging.lastPage);
			thisPlugin.loadSummary();
		});
	}
	
	this.loadPaging = function(){
		table_control.show();
		var paging = "<ul class='jl_paging02'>"
			+  "	<li class='w02'><span></span></li>"
			+  "	<li><i class='fa fa-fast-backward' title='首页'></i></li>"
			+  "	<li><i class='fa fa-chevron-left' title='上一页'></i></li>"
			+  "	<li><span></span></li>"
			+  "	<li><input type='text'></li>"
			+  "	<li><input type='button' class='jl_btn btn_blue_or' value='跳转'></li>"
			+  "	<li><i class='fa fa-chevron-right' title='下一页'></i></li>"
			+  "	<li><i class='fa fa-fast-forward' title='尾页'></i></li>"
			+  "</ul>";
		
		paging = $(paging);
		paging.appendTo(table_control.find("> .w05"));
		
		var page_func = function(){
			var resultData = null;
			if(thisPlugin.config.paging == "local"){
				resultData = thisPlugin.data.slice((thisPlugin.paging.currentPage - 1)*thisPlugin.config.pagesize, thisPlugin.paging.currentPage*thisPlugin.config.pagesize);
			}else if(JL.isFunction(thisPlugin.config.interfaceQuery)){
				resultData = thisPlugin.config.interfaceQuery({"PAGENUM":thisPlugin.paging.currentPage});
			}else{
				resultData = JL.getPagingData(thisPlugin.paging.filename,thisPlugin.paging.currentPage);
			}
			resultData = JL.isNull(resultData)? []: resultData;
			if(thisPlugin.config.paging == "local"){
				thisPlugin.removeAll();
				for(var i=0; i<resultData.length; i++){
					thisPlugin.appendRow(resultData[i], ((thisPlugin.paging.currentPage - 1)*thisPlugin.config.pagesize + i));
				}
				paging.find("li:eq(0) span").html(thisPlugin.paging.currentPage+"/"+thisPlugin.paging.lastPage);
			}else if(JL.isFunction(thisPlugin.config.interfaceQuery)){
				if(JL.isNull(thisPlugin.data)){
					alert("没有更多数据了");
				}else{
					paging.find("li:eq(0) span").html("第"+thisPlugin.paging.currentPage+"页");
				}
			}else{
				paging.find("li:eq(0) span").html(thisPlugin.paging.currentPage+"/"+thisPlugin.paging.lastPage);
				thisPlugin.setData(resultData);
			}
		}
		
		paging.find("li:eq(1) i").unbind().click(function(){
			thisPlugin.paging.currentPage = 1;
			paging.find("li:eq(4) :text").val("");
			page_func();
		});
		paging.find("li:eq(2) i").unbind().click(function(){
			if(thisPlugin.paging.currentPage <= 1){
				alert("已经是第一页了");
				return false;
			}
			thisPlugin.paging.currentPage--;
			paging.find("li:eq(4) :text").val("");
			page_func();
		});
		paging.find("li:eq(5) :button").unbind().click(function(){
			var text_val = $(this).parent().prev().find(":text").val();
			if(text_val < 1 || text_val > thisPlugin.paging.lastPage){
				alert("请输入正确的页码");
				return false;
			}
			thisPlugin.paging.currentPage = text_val;
			page_func();
		});
		paging.find("li:eq(6) i").unbind().click(function(){
			if(!JL.isFunction(thisPlugin.config.interfaceQuery) && thisPlugin.paging.currentPage >= thisPlugin.paging.lastPage){
				alert("已经是最后一页了");
				return false;
			}
			thisPlugin.paging.currentPage++;
			paging.find("li:eq(4) :text").val("");
			page_func();
		});
		paging.find("li:eq(7) i").unbind().click(function(){
			thisPlugin.paging.currentPage = thisPlugin.paging.lastPage;
			paging.find("li:eq(4) :text").val("");
			page_func();
		});
	};
	
	this.setLastPaging = function(lastPage){
		thisPlugin.paging.lastPage = lastPage;
		thisPlugin.jl_bottom.find("[type='pagesize']").html(thisPlugin.paging.currentPage+"/"+thisPlugin.paging.lastPage);
	};
	
	this.setPaging = function(fileName){
		thisPlugin.paging.currentPage = 1;
		delete thisPlugin.paging.filename;
		if(!JL.isNull(thisPlugin.config.paging)){
			if(thisPlugin.config.paging == "more"){
				thisPlugin.paging.filename = fileName;
				setTimeout(function(){
					thisPlugin.paging.pagingData = JL.getPagingData(thisPlugin.paging.filename,thisPlugin.paging.currentPage+1);
					var height = "";
					if(thisPlugin.paging.pagingData.length > 0){
						if(thisPlugin.jl_bottom.is(":hidden")){
							height = thisPlugin.config.height - 50;
						}
						thisPlugin.jl_bottom.show();
					}else{
						if(!thisPlugin.jl_bottom.is(":hidden")){
							height = thisPlugin.config.height + 50;
						}
						thisPlugin.jl_bottom.hide();
					}
					thisPlugin.setHeight(isNaN(height)? "": height);
				}, 1000);
			}else if(thisPlugin.config.paging == "local"){
				var height = "";
				if(thisPlugin.paging.currentPage < thisPlugin.paging.lastPage){
					if(thisPlugin.jl_bottom.is(":hidden")){
						height = thisPlugin.config.height - 50;
					}
					this.jl_bottom.show();
				} else {
					if(!thisPlugin.jl_bottom.is(":hidden")){
						height = thisPlugin.config.height + 50;
					}
					this.jl_bottom.hide();
				}
				thisPlugin.setHeight(isNaN(height)? "": height);
			}else{
				setTimeout(function(){
					var resultData = JL.getPagingData(fileName, "LASTPAGE");
					thisPlugin.paging.lastPage = JL.isNull(resultData) ? 1 : resultData;
					thisPlugin.paging.filename = fileName;
					table_control.find("li:eq(0) span").html(thisPlugin.paging.currentPage+"/"+thisPlugin.paging.lastPage);
				}, 1000);
			}
		}
	};
	
	this.addData = function(data){
		for(var i=0; i<data.length; i++){
			this.addRow(data[i]);
		}
	};
	
	this.loadButton = function(){
		if(!JL.isNull(thisPlugin.config.buttons)){
			var buttons = $.merge([], thisPlugin.config.buttons);
			buttons.push({
				"icon": "cog",
				"css": "drop_menu",
				"text": "管理",
				"func": function(){
					if($(this).hasClass("xuan")){
						$(this).removeClass("xuan")
						$(this).parent().find(".jl_dropdown_menu.table_title_main.headers").remove();
					}else{
						var headers = $("<ul>").appendTo($(this).parent());
						headers.addClass("jl_dropdown_menu table_title_main headers");
						headers.show();
						var cloumnSize = 0; 
						for(var i=0; i<thisPlugin.config.headers.length; i++){
							var header = thisPlugin.config.headers[i];
							if(!header.hidden){
								cloumnSize++;
								var li = $("<li>").appendTo(headers);
								if(table_main.find("dl.table.title").find("[data-id='"+header.id+"']").is(":hidden")){
									li.html("<a><i class='fa fa-square-o'></i>"+header.name+"</a>");
								}else{
									li.html("<a class='font_blue'><i class='fa fa-check-square'></i>"+header.name+"</a>");
								}
								header.index = i;
								li.data(header);
								li.click(function(){
									var data = $(this).data();
									var table_show = $(this).closest(".table_content").find("> .table_show");
									var table_main = table_show.find("> .table_main");
									
									var dds = table_main.find(".table.title > [data-index='"+data.index+"']")
									.add(table_main.find("> .table_case > dl > [data-index='"+data.index+"']"))
									.add(table_main.find("> .table_summary > .summary_main > dl > [data-index='"+data.index+"']"))
									.add(table_show.find("> [data-position-top] > .title > dl > [data-index='"+data.index+"']"));
									//.add(table_show.find("> [data-position-bottom] > .title > dl > [data-index='"+data.index+"']"));
									
									if($(this).find(".fa-square-o").length > 0){
										$(this).find("a").addClass("font_blue");
										$(this).find(".fa-square-o").addClass("fa-check-square");
										$(this).find(".fa-square-o").removeClass("fa-square-o");
										dds.show();
									}else if($(this).find(".fa-check-square").length > 0){
										$(this).find("a").removeClass("font_blue");
										$(this).find(".fa-check-square").addClass("fa-square-o");
										$(this).find(".fa-check-square").removeClass("fa-check-square");
										dds.hide();
									}
									
									var arr = [];
									var siblings = $(this).siblings().addBack().find(".fa-square-o");
									for(var i=0; i<siblings.length; i++){
										var sibling = $(siblings[i]).closest("li").data();
										arr.push(sibling.index);
									}
									
									var xuanxiang = $(this).siblings(":not(:first)").addBack();//选项
									
									if(xuanxiang.find(".fa-square-o").length > 0){
										$(this).siblings(":first").html("<a><i class='fa fa-square-o'></i>全选</a>");
									}else if(xuanxiang.find(".font_blue").length == xuanxiang.length){
										$(this).siblings(":first").html("<a class='font_blue'><i class='fa fa-check-square'></i>全不选</a>");
									}
									
									if(!JL.isNull(thisPlugin.form)){
										var data_name = thisPlugin.form.getTab().attr("data-name");
										var plugin_name = thisPlugin.config.id;
										$.cookie(data_name+"_"+plugin_name+"_show", null);
										$.cookie(data_name+"_"+plugin_name+"_show", JSON.stringify(arr),{path:"/"});
									}
								});
							}
						}
						
						var li = $("<li>").prependTo(headers);
						if(headers.find("> li > .font_blue").length == thisPlugin.config.headers.length){
							li.html("<a class='font_blue'><i class='fa fa-check-square'></i>全不选</a>");
						}else{
							li.html("<a><i class='fa fa-square-o'></i>全选</a>");
						}
						
						li.click(function(){
							if($(this).find("> a").hasClass("font_blue")){
								$(this).find("a").html("<i class='fa fa-check-square'></i>全选");
								$(this).find("a").removeClass("font_blue");
								$(this).find(".fa-check-square").addClass("fa-square-o").removeClass("fa-check-square");
								$(this).nextAll("li").children(".font_blue").click();
							}else{
								$(this).find("a").html("<i class='fa fa-square-o'></i>全不选");
								$(this).find("a").addClass("font_blue");
								$(this).find(".fa-square-o").addClass("fa-check-square").removeClass("fa-square-o");
								$(this).nextAll("li").children(":not(.font_blue)").click();
							}
							
							if($(this).find(".fa-square-o").length > 0){
							}else if($(this).find(".fa-check-square").length > 0){
							}
						})
						
						headers.addClass("tabel_title_0"+Math.ceil(cloumnSize/15));
						$(this).addClass("xuan");
					}
				}
			});
			
			for(var i=0;i<buttons.length;i++){
				var button = buttons[i];
				if(typeof button == "number"){
					if(button == 0){
						button = {};
						button.icon = "search";
						button.text = "查询";
						button.func = function(){
							var queryConfig = thisPlugin.config.queryConfig;
							
							if(JL.isFunction(thisPlugin.config.listener.query)){
								if(thisPlugin.config.listener.query()){
									return false;
								}
							}
							
							if(!JL.isNull(queryConfig.querybh)){
								JLQuery.show(thisPlugin.form, queryConfig);
							}else if(!JL.isNull(queryConfig.sqlid)){
								JLQuery.show2(thisPlugin.form, queryConfig);
							}
						};
					}else if(button == 1){
						button = {};
						button.icon = "plus-square";
						button.text = "新增";
						button.func = function(){
							if(JL.isFunction(thisPlugin.config.listener.beforeNew)){
								if(thisPlugin.config.listener.beforeNew(thisPlugin)){
									return false;
								};
							}
							thisPlugin.addRow({});
							if(JL.isFunction(thisPlugin.config.listener.new)){
								thisPlugin.config.listener.new(thisPlugin);
							}
						};
					}else if(button == 2){
						button = {};
						button.icon = "trash-o";
						button.text = "删除";
						button.func = function(){
							thisPlugin.removeSelected();
							if(JL.isFunction(thisPlugin.config.listener.delete)){
								thisPlugin.config.listener.delete(thisPlugin);
							}
						};
					}else if(button == 3){
						button = {};
						button.icon = "trash-o";
						button.text = "清空";
						button.func = function(){
							thisPlugin.removeAll();
						};
					}else if(button == 4){
						button = {};
						button.icon = "print";
						button.text = "打印";
						button.func = function(){
							thisPlugin.form.jlPrint($(this), {"html": thisPlugin.obj.prop('outerHTML')});
						};
					}else if(button == 5){
						button = {};
						button.icon = "mail-forward";
						button.text = "导出数据";
						button.func = function(){
							if(!$(this).find("i").hasClass("fa-mail-forward")){
								if($(this).find("i").hasClass("fa-spinner")){
									var lastPage = JL.getPagingData(thisPlugin.paging.filename+"aaaaaa", "LASTPAGE");
									if(!JL.isNull(lastPage)){
										thisPlugin.obj.find(".title_right .fa-spinner").parent().html("<i class='fa fa-mail-forward mr5'></i>导出数据");
										thisPlugin.setLastPaging(lastPage);
									}else{
										JL.tip("分页数据加载中,请稍后再试");
									}
									return false;
								}
							}
							var head = {};
							var columnType = {};
							var dds = thisPlugin.obj.find("> .table_content > .table_show > .table_main > .table.title > dd[data-index]:not(:hidden)");
							for(var i=0; i<dds.length; i++){
								var row = $(dds[i]);
								var rowIndex = row.attr("data-index");
								var rowConfig = thisPlugin.config.headers[rowIndex];
								head[row.attr("data-id")] = row.find(".ellipsis").text();
								if(rowConfig.format && rowConfig.format.indexOf("number") != -1){
									columnType[rowConfig.id] = rowConfig.format;
								}
							}
							if(!JL.isNull(thisPlugin.paging.filename) && thisPlugin.data.length > 0){
								var data = {};
								data["fileName"] = thisPlugin.paging.filename;
								data["lastPage"] = thisPlugin.paging.lastPage;
								data["columnName"] = JSON.stringify(head);
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
								data["columnName"] = JSON.stringify(head);
								data["columnType"] = JSON.stringify(columnType);
								data["columnSummary"] = JSON.stringify(thisPlugin.config.summary);
								if(thisPlugin.config.EXPORT_EXCEL_TYPE){
									data["EXPORT_EXCEL_TYPE"] = thisPlugin.config.EXPORT_EXCEL_TYPE;
								}
								JL.download(pubJson.getURL("FormUrl")+"/excelHandler/excelExport.do", data);
							}else{
								JL.tip("请先查询需要导出的结果");
							}
						};
					}else if(button == 6){
						button = {};
						button.icon = "mail-forward";
						button.text = "导出模板";
						button.func = function(){
							var filename = thisPlugin.config.tittles + "模板";
							JL.downloadTemplate(filename, thisPlugin.config.excelhead || thisPlugin.config.head);
						};
					}else if(button == 7){
						button = {};
						button.icon = "print";
						button.text = "打印";
						button.func = function(){
							JL.print(thisPlugin.config.dybh, thisPlugin.getSelected());
						};
					}
				}
				
				//fa fa-mail-forward 
				var btn = $("<a class='jl_btn "+(button.css || "")+"'><i class='fa fa-"+button.icon+" mr5'></i>"+button.text+"</a>").prependTo(table_title.find(".title_right"));
				if(button.hide){
					btn.hide();
				}
				btn.click(button["func"]);
			}
		}
	};
	
	this.checkedCurrent = function(rowIndex){
		var tablehover = this.getDL(rowIndex).siblings(".tablehover");
		tablehover.removeClass("tablehover");
		tablehover.find("dt > :checkbox:checked").prop("checked", false);
		for(var i=0;i<tablehover.length;i++){
			var dl_index = $(tablehover[i]).attr("data-index");
			thisPlugin.setSelectedIndex(dl_index, false);
		}
	};
	
	this.checked = function(rowIndex, bool){
		var tablehover = this.getDL(rowIndex);
		if(bool){
			tablehover.addClass("tablehover");
		}else{
			tablehover.removeClass("tablehover");
		}
		this.setSelectedIndex(rowIndex, bool);
		tablehover.find("dt > :checkbox:checked").prop("checked", bool);
	};
	
	this.loadEvents = function(){
		$(this.obj).find("> .table_content > .table_title > i.fa-chevron").click(function(){
			if($(this).parent().next().is(":hidden")){
				JL.changeClass($(this), "fa-chevron-down", "fa-chevron-up");
			}else{
				JL.changeClass($(this), "fa-chevron-up", "fa-chevron-down");
			}
			$(this).parent().next().slideToggle();
		});
		
		table_show.scroll(function(){
			var width = $(this).width()-16;
			var div = null;
			var title = table_main.find(" > .table.title");
			if($(this).find("[data-position-top]").length == 0){
				div = $("<div>");
				div.attr("data-position-top", true);
				div.css({"width": width+"px", "overflow": "hidden", "position": "absolute", "z-index": "1", "min-height": "40px"});
				var div_inner = $("<div>");
				div_inner.addClass("title");
				div_inner.css({"width": table_main.width()+"px", "margin-left": table_main.css("margin-left")});
				div_inner.append(title.clone(true));
				div_inner.appendTo(div);
				table_main.before(div);
			}else{
				div = $(this).find("[data-position-top]");
				div_inner = $(this).find("[data-position-top] > div.title");
			}
			
			/*if($(this).find("> .table_main > .table_summary").length > 0){
				$(this).find("> .table_main > .table_summary").css("bottom", - $(this).scrollTop() + "px");
			}*/
			
			if(table_show.hasClass("overflow_y")){
				if($(this).scrollTop() > 1){
					div.show();
				}else{
					div.remove();
				}
			}
		});

		table_show.dblclick(function(){
			if(!JL.isNull(thisPlugin.config.listener.tabledblclick)){
				thisPlugin.config.listener.tabledblclick(thisPlugin);
			}
		});

		table_main.find("> .table.title > dt > :checkbox").click(function(){
			var checkboxs = table_main.find("> .table_case > .table:not(.title) > dt > :checkbox");
			if($(this).prop("checked")){
				if(thisPlugin.config.rowSelectMode == "group"){
					table_main.find("> .table_case").find("> .table:not(.title):first > dt > :checkbox").filter(":not(:checked)").click();
				}else{
					checkboxs.filter(":not(:checked)").click();
				}
				table_main.find("div[data-groupfield] i.fa-plus").parent().click();
			}else{
				if(thisPlugin.config.rowSelectMode == "group"){
					table_main.find("> .table_case").find("> .table:not(.title):first > dt > :checkbox").filter(":checked").click();
				}else{
					checkboxs.filter(":checked").click();
				}
				checkboxs.prop("checked", false);
			}
			$(this).next().slideToggle();
		});
		
		table_main.undelegate();
		table_main.delegate("> .table_case > .table:not(.title) > dt", "click", function(event) {
			if($(event.target).closest($(this).children(":checkbox")).length == 0){
				$(this).children(":checkbox").click();
			}
		});
		table_main.delegate("> .table_case > .table:not(.title) > dt > :checkbox", "click", function(event) {
			var rowIndex = $(this).closest("dl[data-index]").attr("data-index");
			var bool = $(this).is(":checked");
			if(bool){
				if(thisPlugin.config.rowSelectMode == "radio"){
					var table_case = $(this).closest("dl").parent().siblings(".table_case").addBack();
					var tablehover = table_case.find("> .tablehover");
					tablehover.removeClass("tablehover");
					tablehover.find("dt > :checkbox:checked").prop("checked", false);
					for(var i=0;i<tablehover.length;i++){
						var dl_index = $(tablehover[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, false);
					}
				}else if(thisPlugin.config.rowSelectMode == "multi"){
					
				}else if(thisPlugin.config.rowSelectMode == "group"){
					var table_case = $(this).closest("dl").parent();
					table_case.find("> dl[data-index]").addClass("tablehover");
					table_case.find("> dl[data-index] > dt > :checkbox:not(:checked)").prop("checked", true);
					var tablehover = table_case.find("> .tablehover");
					for(var i=0;i<tablehover.length;i++){
						var dl_index = $(tablehover[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, true);
					}
				}else if(thisPlugin.config.rowSelectMode == "groupRadio" 
					|| (!JL.isNull(thisPlugin.config.multi) && thisPlugin.config.multi == false)){
					var tablehover = $(this).closest("dl").siblings(".tablehover");
					tablehover.removeClass("tablehover");
					tablehover.find("dt > :checkbox:checked").prop("checked", false);
					for(var i=0;i<tablehover.length;i++){
						var dl_index = $(tablehover[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, false);
					}
				}else if(thisPlugin.config.rowSelectMode == "radioGroup"){
					var table_case = $(this).closest("dl").parent();
					table_case.find("> dl[data-index]").addClass("tablehover");
					table_case.find("> dl[data-index] > dt > :checkbox:not(:checked)").prop("checked", true);
					var tablehover = table_case.find("> .tablehover");
					for(var i=0;i<tablehover.length;i++){
						var dl_index = $(tablehover[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, true);
					}
					
					var table_case_sib = table_case.siblings(".table_case");
					table_case.siblings(".table_case").find("> dl[data-index] > dt > :checkbox:checked").prop("checked", false);
					var tablehover2 = table_case_sib.find("> .tablehover");
					tablehover2.removeClass("tablehover");
					for(var i=0;i<tablehover2.length;i++){
						var dl_index = $(tablehover2[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, false);
					}
					
				}
				$(this).closest("dl").addClass("tablehover");
				thisPlugin.setSelectedIndex(rowIndex, true);
			}else{
				if(thisPlugin.config.rowSelectMode == "group"){
					var table_case = $(this).closest("dl").parent();
					var tablehover = table_case.find("> .tablehover");
					for(var i=0;i<tablehover.length;i++){
						var dl_index = $(tablehover[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, false);
					}
					tablehover.removeClass("tablehover");
					tablehover.find("> dt > :checkbox:checked").prop("checked", false);
				}else if(thisPlugin.config.rowSelectMode == "radioGroup"){
					var table_case = $(this).closest("dl").parent();
					var tablehover = table_case.find("> .tablehover");
					for(var i=0;i<tablehover.length;i++){
						var dl_index = $(tablehover[i]).attr("data-index");
						thisPlugin.setSelectedIndex(dl_index, false);
					}
					tablehover.removeClass("tablehover");
					tablehover.find("> dt > :checkbox:checked").prop("checked", false);
				}else{
					$(this).closest("dl").removeClass("tablehover");
					thisPlugin.setSelectedIndex(rowIndex, false);
				}
			}
			
			if(!JL.isNull(thisPlugin.config.listener.checked)){
				thisPlugin.config.listener.checked(thisPlugin, rowIndex, bool);
			}
		});
		
		table_main.delegate("> div[data-groupfield]", "click", function(event) {
			if($(this).next().is(":hidden")){
				JL.changeClass($(this).find("i"), "fa-plus", "fa-minus");
			}else{
				JL.changeClass($(this).find("i"), "fa-minus", "fa-plus");
			}
			$(this).next().slideToggle();
		});
		
		table_main.delegate("> .table_case > dl.table:not(.title)", "dblclick", function(event) {
			if($(event.target).closest($(this).children("dt")).length == 0){
				if(thisPlugin.config.rowSelectMode == "group"){
				}else if(thisPlugin.config.rowSelectMode == "groupRadio"){
				}else if(thisPlugin.config.rowSelectMode == "radioGroup"){
				}else{
					var table_case = $(this).parent().siblings(".table_case").addBack();
					table_case.find("> dl.table:not(.title) > dt > :checkbox").prop("checked", false);
					table_case.find("> dl.tablehover").removeClass("tablehover");
					$(this).find("> dt > :checkbox").prop("checked", true);
					$(this).addClass("tablehover");
				}

				if(!JL.isNull(thisPlugin.config.listener.rowdblclick)){
					var rowIndex = $(this).attr("data-index");
					var data = thisPlugin.getData(rowIndex);
					thisPlugin.config.listener.rowdblclick(thisPlugin, data, rowIndex);
				}
			}
		});
		
		table_main.delegate("> .table_case > dl.table:not(.title)", "mousedown", function(e) {
			if(!JL.isNull(thisPlugin.config.rightClickMenu)){
				console.info("rightClick");
				$.smartMenu.remove();
				$(this).smartMenu(thisPlugin.config.rightClickMenu, {"afterShow": function(a,b,c){
					if($(e.target).closest($(this).children(".from_the_table")).length != 0){
						$.smartMenu.remove();
					}
				}});
			}
		});
		
		table_main.delegate("> .table_case > dl.table:not(.title)", "click", function(event) {
			var rowIndex = $(this).attr("data-index");
			if($(event.target).closest($(this).children("dt")).length == 0){
				if(!JL.isNull(thisPlugin.config.rowSelectMode) && 
						$(event.target).closest(".edit").length == 0 ){
					$(this).find("> dt > :checkbox").click();
				}else{
					if(!thisPlugin.config.multi){
						var table_case = $(this).closest("dl").parent().siblings(".table_case").addBack();
						var checked_dls = table_case.find("> dl.table:not(.title)")
						for(var i=0;i<checked_dls.length;i++){
							var checked_dl = checked_dls.eq(i);
							if(checked_dl.find(" > dt > input:checkbox").prop("checked")){
								thisPlugin.setSelectedIndex(checked_dl.attr("data-index"), false);
							}
						}
						table_case.find("> dl.table:not(.title) > dt > :checkbox").prop("checked", false);
						table_case.find("> dl.tablehover").removeClass("tablehover");
						$(this).find("> dt > :checkbox").prop("checked", true);
						$(this).addClass("tablehover");
					}
					if($(this).find("> dt > :checkbox").prop("checked")){
						thisPlugin.setSelectedIndex(rowIndex, true);
					}else{
						thisPlugin.setSelectedIndex(rowIndex, false);
					}
				}
			}
			if(!JL.isNull(thisPlugin.config.listener.rowclick)){
				var rowIndex = $(this).attr("data-index");
				var data = thisPlugin.getData(rowIndex);
				thisPlugin.config.listener.rowclick(thisPlugin, data, rowIndex);
			}
		});
		
		table_main.delegate("> .table_case > dl.table:not(.title) > dd[data-index]", "click", function(event) {
			if($(event.target).closest(".table_change").length == 0 ){
				var x = $(this).closest("dl").attr("data-index");
				var y = $(this).attr("data-index");
				var editor = thisPlugin.config.headers[y]["editor"];
				if($(this).hasClass("edit")){
					var id = thisPlugin.config.headers[y]["id"];
					var gridData = thisPlugin.getData();
					var value = JL.isNull(gridData[x][id])? "" :gridData[x][id];
					var selector = null; 
					var dd = $(this);
					if(JL.isFunction(editor.beforeopen) && editor.beforeopen()){
						return false;
					}
					if(editor["type"] == "text"){
						
						var table_change = $("<div class='table_change'><input type='text' data-name='"+id+"'><i class='fa fa-ellipsis-h' style='display:none;'></i></div>");
						var jl_poplayer = $("<div class='jl_poplayer hide'></div>");
						jl_poplayer.appendTo(table_change);
						table_change.appendTo($(this));
						
						selector = $(this).find(".table_change :text");
						selector.val(value);
						selector.focus();

						if(editor["jlid"] == "JLGridQuery"){
							table_change.css({"z-index": "1000000"});
							table_change.find(".fa-ellipsis-h").show();
							if(JL.isNull(editor["beforeopen"]) || editor["beforeopen"]() != true){
								JLQuery.gridShow(jl_poplayer, editor);
								jl_poplayer.slideDown();
							}else{
								table_change.remove();
							}
							$("body").click(function(e){
								if($(e.target).closest(dd).length == 0){
									table_change.remove();
									jl_poplayer.slideUp();
								}
							});
						}else if(editor["jlid"] == "JLQuery"){
							table_change.css({"z-index": "2"});
							table_change.find(".fa-ellipsis-h").show();
							table_change.find(".fa-ellipsis-h").click(function(){
								if(!JL.isNull(editor.sqlid)){
									JLQuery.show2(thisPlugin.form, editor);
								}else{
									JLQuery.show(thisPlugin.form, editor);
								}
							});
							$("body").click(function(e){
								if($(e.target).closest(dd).length == 0){
									table_change.remove();
									jl_poplayer.slideUp();
								}
							});
						}else if(editor["jlid"] == "JLDate"){
							var data_id = "time_"+$.md5("date"+Math.floor(Math.random()*10000000)); 
							var table_change = selector.parent();
							table_change.attr("id",data_id);
							if(JL.isNull(editor.listener)){
								editor.listener = {};
							}
							editor.listener.select = function(date, obj){ 
								var x = obj.closest("dl").attr("data-index");
								var y = obj.closest("dd").attr("data-index");
								thisPlugin.setCell(date, x, y);
							}
							var id = thisPlugin.config.headers[y]["id"];
							var value = thisPlugin.getData(x, id);
							JL.initPlugIn(table_change, data_id, editor, value);
							table_change.find(":text").blur();
						}else{
							selector.keyup(function(e){
								var x = $(this).closest("dl").attr("data-index");
								var y = $(this).closest("dd").attr("data-index");
								if(e.keyCode == 13){
									var nextCell = $(this).closest("dd").nextAll(".edit:first");
									var nextIndex = nextCell.attr("data-index");
									var nextEdit = $(this).closest("dl").nextAll("dl:not(:hidden):first").find(".edit:not(:hidden):first");
									var bottomEdit = $(this).closest("dl").next().find("> [data-index='"+ y +"']");
									if(nextCell.length > 0 ){
										var ml = 200 - nextCell.position().left;
										if(ml > 0){
											table_main.css("margin-left", "0px");
										}else if(nextCell.position().left <  Number(table_main.css("margin-left").replace("px",""))*-1 + table_show.width()){
										}else if(-1*ml < table_main.width() - table_show.width()){
											table_main.css("margin-left", ml + "px");
										}else{
											table_main.css("margin-left", - (table_main.width() - table_show.width())+"px");
										}
										nextCell.click();
									}else if(nextEdit.length > 0 ){
										var ml = 200 - nextEdit.position().left;
										if(ml > 0){
											table_main.css("margin-left", "0px");
										}else if(-1*ml < table_main.width() - table_show.width()){
											table_main.css("margin-left", ml + "px");
										}else{
											table_main.css("margin-left", - (table_main.width() - table_show.width())+"px");
										}
										nextEdit.click();
									}else{
										$(this).blur();
									}
								}
							});
							selector.blur(function(){
								var x = $(this).closest("dl").attr("data-index");
								var y = $(this).closest("dd").attr("data-index");
								thisPlugin.setCell($(this).val(), x, y);
								$(this).parent().remove();
								if(!JL.isNull(thisPlugin.config.afterEdit)){
									var id = thisPlugin.config.headers[y]["id"];
									thisPlugin.config.afterEdit(thisPlugin, id, x, y, value, $(this).val());
								}
							});
						}
						
					}else if(editor["type"] == "plugin"){
						var table_change = $("<div class='table_change'></div>").appendTo(this);
						var div_select = $("<div></div>").appendTo(table_change);
						div_select.addClass("w12");
						if(JL.isNull(editor.listener)){
							editor.listener = {};
						}

						var plugin = JL.initPlugIn(div_select, thisPlugin.config.id + "_"+ x +"_"+ id, editor, "", [], [], thisPlugin.form);
						if(!JL.isNull(thisPlugin.data[x][id])){
							plugin.setData(thisPlugin.data[x][id]);
						}
						if(JL.isNull(thisPlugin.plugin[x])){
							thisPlugin.plugin[x] = {};
						}
						thisPlugin.plugin[x][id] = plugin;
						
						table_content.addClass("overflow_inherit");
						/*table_change.mouseleave(function(){
							var x = $(this).closest("dl").attr("data-index");
							var y = $(this).closest("dd").attr("data-index");

							thisPlugin.setCell(thisPlugin.plugin[x][id].getData(), x, y);
							table_show.removeClass("overflow_inherit");
							//thisPlugin.data[x][id] = thisPlugin.plugin[x][id].getData();
							//$(this).remove();
						});*/
					}else if(editor["type"] == "select"){
						$(this).empty();
						var table_change = $("<div class='table_change'></div>").appendTo(this);
						var div_select = $("<div class='select'></div>").appendTo(table_change);
						var select = $("<select></select>").appendTo(div_select);
						$.each(editor["options"],function(key,val){
							var option = $("<option value='"+key+"'>"+val+"</option>").appendTo(select);
							if(key == value){
								option.attr("selected","selected");
							}
						});
						
						if(JL.isNull(select.val())){
							select.val(editor["default"]);
						}
						select.change(function(){
							var x = $(this).closest("dl").attr("data-index");
							var y = $(this).closest("dd").attr("data-index");
							var option = $(this).find(":selected");
							thisPlugin.setCell(option.val(), x, y);
							
							if(!JL.isNull(editor.listener) && !JL.isNull(editor.listener.change)){
								editor.listener.change(option.val());
							}
						});
					}
				}
			}
		});
	};
	
	//外部可用 设置编辑后事件
	this.setAfterEdit = function(fn){
		thisPlugin.config.afterEdit = fn;
	};
		
	this.loadSummary = function(data){
		if(!JL.isNull(thisPlugin.config.summary)){
			var data_length = thisPlugin.config.pagesize && Number(thisPlugin.config.pagesize) <= thisPlugin.data.length? thisPlugin.config.pagesize*(thisPlugin.paging.currentPage): thisPlugin.data.length;
			
			$.each(thisPlugin.config.summary, function(key, value){
				var html = "";
				if(typeof value == "object"){
					var formula = value.formula;
					$.each(value.param, function(code, type){
						var val = 0;
						for(var i=0; i<data_length; i++){
							if(!JL.isNull(thisPlugin.data[i])){
								var cell = JL.isNull(thisPlugin.data[i][code])? 0: thisPlugin.data[i][code];
								val += Number(cell);
								val = Number(Number(val).toFixed(6));
							}
						}
						if(type == "average"){
							val = val/thisPlugin.data.length;
						}
						formula = formula.replace(code, val);
					});
					html = eval(formula);
					if(html == Infinity){
						html = 0;
					}
				}else if(value == "sum"){
					html = 0;
					for(var i=0; i<data_length; i++){
						if(!JL.isNull(thisPlugin.data[i])){
							var cell = JL.isNull(thisPlugin.data[i][key])? 0: thisPlugin.data[i][key];
							html += Number(cell);
							html = Number(Number(html).toFixed(6));
						}
					}
					html = html.toFixed(2);
					//html = "合计: "+html; 
				}else if(value == "average"){
					html = 0;
					var size = 0;
					for(var i=0; i<data_length; i++){
						if(!JL.isNull(thisPlugin.data[i])){
							var cell = JL.isNull(thisPlugin.data[i][key])? 0: thisPlugin.data[i][key];
							html += cell*1;
							size++;
						}
					}
					html = html/size;
					//html = "平均值: "+html; 
				}else if(value == "max"){
					html = 0;
					for(var i=0; i<data_length; i++){
						if(!JL.isNull(thisPlugin.data[i])){
							if(html == 0){
								html = thisPlugin.data[i][key];
							}else if(html < thisPlugin.data[i][key]){
								html = thisPlugin.data[i][key];
							}
						}
					}
					//html = "最大值: "+html; 
				}else if(value == "min"){
					html = 0;
					for(var i=0; i<data_length; i++){
						if(!JL.isNull(thisPlugin.data[i])){
							if(html == 0){
								html = thisPlugin.data[i][key];
							}else if(html > thisPlugin.data[i][key]){
								html = thisPlugin.data[i][key];
							}
						}
					}
					//html = "最小值: "+html; 
				}
				
				table_summary.find("> .summary_main > dl > [data-id='"+key+"']").html("<div class='ellipsis'>"+JL.formatNumber(html)+"</div>");
			});
		}
		
		this.loadSequence();
		this.loadCookiesCloumn();
	};
	
	this.loadSequence = function(){
		if(thisPlugin.config.sequence){
			if(table_main.find("> dl.table.title > dd[data-index]:first").prev("dd").length == 0){
				table_main.css("width",(table_main.width()+50)+"px");
				table_summary.find("> .summary_main").css("width",(table_main.width())+"px");
			}
			table_main.find("> dl.table.title > dd[data-index]:first").prev("dd").remove();
			table_main.find("> dl.table.title > dd[data-index]:first").before("<dd style='width:50px;'><div class='ellipsis'>序号</div><i></i></dd>");
			var dl = table_main.find("> .table_case > dl.table:not(.title)");
			for(var i=0; i<dl.length; i++){
				var selector = $(dl[i]).find("> dd[data-index]:first");
				selector.prev("dd").remove();
				selector.before("<dd style='width:50px;text-align:center;'><div class='ellipsis'>"+(selector.parent().index()+1)+"</div><i></i></dd>");
				if(i == (dl.length-1) && !table_summary.is(":hidden")){
					table_summary.find("> .summary_main > dl > dd[data-index]:first").prev("dd").remove();
					table_summary.find("> .summary_main > dl > dd[data-index]:first").before("<dd class='tc' style='width:50px;'><div class='ellipsis'>"+(selector.parent().index()+1)+"</div><i></i></dd>");
				}
			}
			this.setScrollXWidth();
		}
	}
	
	this.loadCookiesCloumn = function(data){
		if(!JL.isNull(thisPlugin.form)){
			var data_name = thisPlugin.form.getTab().attr("data-name");
			var plugin_name = thisPlugin.config.id;
			var gridShow = $.cookie(data_name+"_"+plugin_name+"_show");
			if(!JL.isNull(gridShow)){
				gridShow = JSON.parse(gridShow);
				for(var i=0; i<gridShow.length; i++){
					table_main.find("dl dd[data-index='"+gridShow[i]+"']").hide();
				}
			}
			var gridOrder = localStorage[data_name+"_"+plugin_name+"_order"];
			if(!JL.isNull(gridOrder)){
				gridOrder = JSON.parse(gridOrder);
	
				var dls = table_main.find("dl.table.title");
				for(var i=0; i<dls.length; i++){
					var dl = $(dls[i]);
					for(var j=0; j<gridOrder.length; j++){
						var o = dl.find("dd[data-index='"+gridOrder[j]+"']");
						var n = dl.find("dd[data-index='"+gridOrder[j+1]+"']");
						o.after(n);
					}
				}
			}
		}
	};
	
	this.loadData = function(data){
		this.removeAll();
		if(!JL.isNull(data)){
			for(var i=0;i<data.length;i++){
				thisPlugin.addRow(data[i], null, true);
			}
			this.loadSummary();
		}
	};
	
	this.setAllData = function(value){
		if(!JL.isNull(value)){
			this.data = value;
		}else{
			this.data = [];
		}
	};
	
	//外部可用
	this.setData = function(data){
		this.removeAll();
		if(!JL.isNull(data)){
			//检查主键
			if(!JL.isNull(this.config.primarykey)){
				this.data = [];
				var repeatArr = [];
				for(var i=0; i<data.length; i++){
					var row = data[i];
					var repeatStr = "";
					for(var j=0; j<this.config.primarykey.length; j++){
						var key = this.config.primarykey[j];
						repeatStr += row[key]+"_";
					}
					if($.inArray(repeatStr, repeatArr) == -1){
						this.data.push(row);
						repeatArr.push(repeatStr);
					}
				}
			}else{
				this.data = data;
			}
			
			var length = this.config.pagesize && Number(thisPlugin.config.pagesize) <= thisPlugin.data.length? this.config.pagesize: this.data.length;
			for(var i=0; i<length; i++){
				this.addRow(this.data[i], i, true);
			}
		}
		this.loadSummary();
		if(!JL.isNull(this.config.listener.loadData)){
			this.config.listener.loadData(this);
		}
		if(this.config.pagesize){
			thisPlugin.paging.currentPage=1;
			thisPlugin.paging.lastPage = Math.ceil(this.data.length/this.config.pagesize);
			this.setPaging();
		}
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

	this.getLastActive = function(){
		return this.config.lastActive;
	};
		
	this.selectFirst = function(){
		table_main.find("> .table_case > .table:not(.title):first").click();
	};
	
	//外部可用 获取选中行数据
	this.getSelected = function(){
		var checkboxs = table_main.find("> .table_case > dl.table:not(.title) > dt > :checkbox:checked");
		var Arr = [];
		for(var i=0;i<checkboxs.length;i++){
			var checkbox = $(checkboxs[i]);
			var index = checkbox.closest("dl").attr("data-index");
			Arr.push(this.data[index]);
		}
		return Arr;
	};
	
	this.setSelectedIndex = function(index, bool){
		var arr = [];
		if(bool){
			arr.push(index);
		}
		for(var i=0; i<this.selectedIndex.length; i++) {
			var row = this.selectedIndex[i];
			if(row != index){
				arr.push(row);
			}
		}
		this.selectedIndex = arr;
	};
	
	//外部可用 获取选中行号
	this.getSelectedIndex = function(index){
		return this.selectedIndex;
	};
	
	//外部可用 删除选中行
	this.removeSelected = function(){
		var selected = this.getSelectedIndex();
		var arr = [];
		for(var i=0;i<this.getData().length;i++){
			var selectedIndex = $.inArray(i.toString(), selected);
			if(selectedIndex == -1){
				arr.push(this.getData(i));				
			}
		}
		this.setData(arr);
		this.selectedIndex = [];
	};
	
	//外部可用 删除行
	this.removeRow = function(index){
		delete this.data[index];
		var dl = table_main.find("dl[data-index='"+index+"']");
		if(dl.siblings().length == 0){
			dl.closest(".table_case").prev(".table_nav").remove();
			dl.closest(".table_case").remove();
		}
		dl.remove();
		this.loadSummary();
	};
	
	//外部可用 删除所有行
	this.removeAll = function(){
		table_main.find("> div.table_case").remove();
		table_main.find("> div.table_nav").remove();
		if(thisPlugin.config.paging != "local"){
			this.data = [];
		}
		this.loadSummary();
	};
	
	/**
	this.getRowData = function(index){
		return this.data[index];
	};**/
	
	//外部可用 获取列号
	this.getRowIndexByID = function(id){
		var headers = this.config.headers;
		for(var i=0; i<headers.length; i++){
			if(headers[i]["id"] == id){
				return i;
			}
		}
	};
	
	//外部可用 单元格赋值
	this.setCell = function(value, x, y){
		this.data[x][thisPlugin.config.headers[y]["id"]] = value;
		var DD = table_main.find("dl[data-index='"+x+"'] dd[data-index='"+y+"']");
		var context = this.formatValue(value, y, x);
		var editor = thisPlugin.config.headers[y]["editor"];
		if(!JL.isNull(editor)){
			if(editor["type"] == "select" && !JL.isNull(editor["options"][value])){
				context = editor["options"][value];
			}
		}
		
		var ellipsis = $("<div class='ellipsis'>"+context+"</div>");
		DD.html(ellipsis);
		this.loadSummary();
	};
	
	this.formatValue = function(val,y,x){
		var value = JL.isNull(val)? "": val;
		if(typeof value == "object"){
			if($.isArray(value)){
				var str = "";
				for(var i=0; i<value.length; i++){
					var row = value[i];
					if(!JL.isNull(row.key) && !JL.isNull(row.value)){
						str += row.value + " ";
					}else if(!JL.isNull(row.KEY) && !JL.isNull(row.VALUE)){
						str += row.VALUE + " ";
					}else if(!JL.isNull(row.FILE_DESC) && !JL.isNull(row.FILE_URL)){
						str += row.FILE_DESC + " ";
					}
				}
				if(!JL.isNull(str)){
					value = str;
				}
			}else if(!JL.isNull(value["key"]) && !JL.isNull(value["value"])){
				value = value["value"];
			}
		}else if(typeof value == "string" && value.indexOf("key")!=-1 && value.indexOf("value")!=-1){
			if(value.indexOf("[")!=-1 && value.lastIndexOf("]")!=-1){
				var array = JSON.parse(value);
				value = "";
				for(var i=0;i<array.length;i++){
					value += array[i]["value"];
					if(i<array.length-1){
						value += ",";
					}
				}
			}else{
				value = JSON.parse(value)["value"];
			}
		}
		
		var row = thisPlugin.config.headers[y];
		if(!JL.isNull(row.format) && !JL.isNull(value)){
			var format = row.format.split("|");
			if(format[0] == "money" || format[0] == "number"){
				value = Number(value).toFixed(format[1]);
				this.data[x][row.id] = value;
				value = JL.formatNumber(value, format[1]);
			}else{
				
			}
			
		}

		var editor = row.editor;
		if(!JL.isNull(editor)){
			if(!JL.isNull(editor["default"]) && JL.isNull(editor["options"][value])){
				value = editor["default"];
				this.setCell(value, x, y);
			}
			if(editor["type"] == "select" && !JL.isNull(editor["options"][value])){
				value = editor["options"][value];
			}
		}
		return value;
	};
		
	this.copyRow = function(data){
		if(!JL.isNull(thisPlugin.config.defaultCell)){
			$.extend(data, thisPlugin.config.defaultCell);
		}
		if(!JL.isNull(thisPlugin.config.initCell)){
			var selected = this.getSelected();
			if(selected.length == 1){
				$.each(selected[0], function(key, value){
					if($.inArray(key, thisPlugin.config.initCell) != -1){
						data[key] = value;
					}
				});
			}
		}
		return data;
	};
	
	this.showAllRow = function(index){
		table_main.find("dl[data-index]").show();
	};
	
	this.hideAllRow = function(index){
		table_main.find("dl[data-index]").hide();
	};
	
	//外部可用 通过列的值隐藏行
	this.showRowById = function(id, value){
		var data = this.getData();
		var arr = [];
		for(var i=0; i<data.length; i++){
			var row = data[i];
			if(row[id] == value){
				arr.push(this.showRow(i));
			}
		}
		return arr;
	};
	
	//外部可用 通过列的值隐藏行
	this.hideRowById = function(id, value){
		var data = this.getData();
		for(var i=0; i<data.length; i++){
			var row = data[i];
			if(row[id] == value){
				this.hideRow(i);
			}
		}
	};
		
	this.showRow = function(index){
		return table_main.find("dl[data-index='"+index+"']").show();
	};
	
	this.hideRow = function(index){
		table_main.find("dl[data-index='"+index+"']").hide();
	};
	
	//外部可用 行赋值
	this.getGroup = function(index){
		var selector = null;
		if(!JL.isNull(index)){
			selector = thisPlugin.getDL(index).parent();
		}else{
			selector = table_main.find("[data-groupid]");
		}
		return selector;
	};

	//外部可用 行赋值
	this.getGroupIndex = function(lastActive){
		var groups = table_main.find("[data-groupid]");
		for(var i=0;i<groups.length;i++){
			var group = $(groups[i]);
			var dls = group.find("> [data-index='"+lastActive+"']");
			if(dls.length > 0){
				return i;
			}
		}
	};
	
	this.getGroupData = function(){
		var arr = [];
		var groups = table_main.find("[data-groupid]");
		for(var i=0;i<groups.length;i++){
			var group = $(groups[i]);
			var dls = group.find("> dl");
			var item = [];
			for(var j=0;j<dls.length;j++){
				var rowIndex = $(dls[j]).attr("data-index");
				item.push(this.data[rowIndex]);
			}
			arr.push(item);
		}
		return arr;
	};
		
	//外部可用 行赋值
	this.setRow = function(data,index){
		this.data[index] = $.extend(this.data[index], data);
	
		var rowDL = table_main.find("dl[data-index='"+index+"']");
		rowDL.find("dd").remove();
		this.appendDD(rowDL,this.data[index]);
		
		if(!JL.isNull(thisPlugin.config.listener.updateRow)){
			thisPlugin.config.listener.updateRow(thisPlugin, data, index, rowDL);
		}
		
		this.loadSummary();
	};

	//外部可用 删除分组
	this.removeGroup = function(value){
		if(!JL.isNull(this.config.groupField)){
			var arr = [];
			for(var i=0;i<this.data.length;i++){
				var row = this.data[i];
				if(row[this.config.groupField] != value){
					arr.push(row);
				}
			}
			this.setData(arr);
		}
	};
		
	//外部可用 新增行
	this.addRow = function(data, index, all){
		//检查主键
		if(!JL.isNull(this.config.primarykey)){
			if(JL.isNull(index)){
				var repeatArr = [];
				for(var i=0; i<this.data.length; i++){
					var row = this.data[i];
					var repeatStr = "";
					for(var j=0; j<this.config.primarykey.length; j++){
						var key = this.config.primarykey[j];
						repeatStr += row[key]+"_";
					}
					repeatArr.push(repeatStr);
				}
				var repeatStr_n = "";
				for(var j=0; j<this.config.primarykey.length; j++){
					var key = this.config.primarykey[j];
					repeatStr_n += data[key]+"_";
				}
				if($.inArray(repeatStr_n, repeatArr) != -1){
					return false;
				}
			}
		}
		
		var copyData = thisPlugin.copyRow({});
		$.extend(data, copyData);
		if(JL.isNull(index)){
			this.data.push(data);
			index = this.data.length - 1;
		}else{
			this.data[index] = data;
		}
		
		this.appendRow(data, index, all);
	}
	
	this.appendRow = function(data, index, all){
		console.info(JL.formatDate(0,2));
		var rowDL = $("<dl class='table' data-index='"+index+"'><dt><input type='checkbox'></dt></dl>");
		if(!JL.isNull(thisPlugin.config.multi) && thisPlugin.config.multi == false){
			rowDL.find("dt").hide();
		}
		this.appendDD(rowDL,data);
		
		var table_main = this.obj.find("> .table_content > .table_show > .table_main");
		if(!JL.isNull(thisPlugin.config.groupField)){
			var groupValue = "", groupHtml = "";
			if(typeof thisPlugin.config.groupField == "string"){
				groupValue = JL.isNull(data[thisPlugin.config.groupField])? "": data[thisPlugin.config.groupField];
				groupHtml = thisPlugin.config.head[thisPlugin.config.groupField]+" : "+groupValue;
			}else if(typeof thisPlugin.config.groupField == "object"){
				for(var i=0; i<thisPlugin.config.groupField.length; i++){
					var row = thisPlugin.config.groupField[i];
					var value = JL.isNull(data[row.id])? "": data[row.id];
					groupValue += value +"_";
					groupHtml += "<span class='mr15'>"+ row.name +": "+value + "  </span>";
				}
			}
			
			var table_group = table_main.find("[data-groupfield='"+groupValue+"']");
			if(table_group.length == 0){
				table_group = $("<div>").appendTo(table_main);
				table_group.attr("data-groupfield", groupValue);
				table_group.addClass("table_nav");
				table_group.append("<i class='fa fa-minus' title='收起'></i>"+groupHtml);
				var table_case = $("<div class='table_case'></div>").appendTo(table_main);
				table_case.attr("data-groupid", groupValue);
			}
			if(thisPlugin.config.rowaddmode == "prepend"){
				table_group.next(".table_case").prepend(rowDL);
			}else{
				table_group.next(".table_case").append(rowDL);
			}
		}else{
			var table_case = table_main.find("> .table_case");
			if(table_case.length == 0){
				var table_case = $("<div class='table_case'></div>").appendTo(table_main);
				table_case.attr("data-groupid", groupValue);
			}
			if(thisPlugin.config.rowaddmode == "prepend"){
				rowDL.prependTo(table_case);
			}else{
				rowDL.appendTo(table_case);
			}
		}
		
		if(!JL.isNull(thisPlugin.config.listener.loadRow)){
			thisPlugin.config.listener.loadRow(thisPlugin, data, index, rowDL);
		}

		if(!all){
			this.loadSummary();
		}

		return index;
	};
	
	this.appendDD = function(rowDL,row){
		var headers = thisPlugin.config.headers;
		var dds = table_main.find("> .table.title > dd[data-index]");
		for(var j=0;j<dds.length;j++){
			var titleDD = dds.eq(j);
			var id = titleDD.attr("data-id");
			var data_index = titleDD.attr("data-index");
			var value = this.formatValue(row[id], data_index, rowDL.attr("data-index"));
			//var rowDD = $("<dd style='width:"+titleDD.outerWidth()+"px;' data-id='"+ id +"' data-index='"+ data_index +"'></dd>").appendTo(rowDL);
			var rowDD = titleDD.clone(false).appendTo(rowDL);
			rowDD.removeAttr("draggable");
			if(headers[data_index]["hidden"] || titleDD.css("display") == "none"){
				rowDD.hide();
			}
			if(headers[data_index]["align"]){
				rowDD.attr("align", headers[data_index]["align"]);
			}
			var editor = headers[data_index]["editor"];
			if(!JL.isNull(editor) && editor.type == "checkbox"){
				rowDD.html("");
				var checkbox = $("<input type='checkbox'>");
				checkbox.addClass("w12");
				checkbox.appendTo(rowDD);
				checkbox.click(function(){
					var editor = headers[data_index]["editor"];
					var x = $(this).closest("dl").attr("data-index");
					var data_id = $(this).closest("dd").attr("data-id");
					if($(this).is(":checked")){
						thisPlugin.data[x][data_id] = "1";
					}else{
						thisPlugin.data[x][data_id] = "0";
					}
					
					if(!JL.isNull(editor) && !JL.isNull(editor.listener) && JL.isFunction(editor.listener.click)){
						editor.listener.click(thisPlugin, $(this).is(":checked"), $(this));
					}
				});
				
				if(!JL.isNull(value) && value == "1"){
					checkbox.prop("checked", true);
				}else{
					thisPlugin.data[rowDL.attr("data-index")][id] = "0";
				}
				
				if(editor.disabled){
					checkbox.attr("disabled", "disabled");
				}
			}else{
				if(!JL.isNull(editor) && editor["disabled"] == false){
					rowDD.addClass("edit");
				}
				if(value == "0" || value == "0.00") {
					rowDD.html("<div class='ellipsis font_gray' title='"+value+"'>"+value+"</div>");
				}else {
					rowDD.html("<div class='ellipsis' title='"+value+"'>"+value+"</div>");
				}
			}
		}
		
		/*if(!JL.isNull(thisPlugin.config.groupField)){
			var groupValue = JL.isNull(row[thisPlugin.config.groupField])? "": row[thisPlugin.config.groupField];
			if(table_main.find("[data-groupfield='"+groupValue+"']").length == 0){
				var table_nav = rowDL.parent().prev();
				table_nav.attr("data-groupfield", groupValue);
				table_nav.html("<i class='fa fa-minus' title='收起'></i>"+thisPlugin.config.head[thisPlugin.config.groupField]+" : "+groupValue);
			}else{
				rowDL.appendTo(table_main.find("[data-groupfield='"+groupValue+"']").next());
				if(table_main.find("[data-groupfield='']").next().find("dl").length == 0){
					table_main.find("[data-groupfield='']").next().remove();
					table_main.find("[data-groupfield='']").remove();
				}
			}
		}*/
	};
	
	this.init();
	//this.loadData([{"abc":"123","abcd":123},{"abc":"12311","abcd":1232},{"abc":"123","abcd":123},{"abc":"12311","abcd":1232},{"abc":"12311","abcd":1232},{"abc":"123","abcd":123},{"abc":"12311","abcd":1232},{"abc":"12311","abcd":1232},{"abc":"123","abcd":123},{"abc":"12311","abcd":1232},{"abc":"123","abcd":123},{"abc":"12311","abcd":1232}]);
}