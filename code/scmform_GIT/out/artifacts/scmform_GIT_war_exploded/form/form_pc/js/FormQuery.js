var data_name = $(".pagr_content[data-name^='FormQuery']:not(:hidden)").attr("data-name");
var querybh = data_name.split("FormQuery_")[1];
eval(
	"var FormQuery_"+querybh+" = JL.JLForm();"+
	//"FormQuery_"+querybh+".setAfterInit(function(){"+
	//"	"+	
	//"});"+
	"FormQuery_"+querybh+".setTab($(\".pagr_content[data-name^='FormQuery']:not(:hidden)\"))	"+	
	"");
var formQuery = eval("FormQuery_"+querybh);
formQuery.config = {};
formQuery.setAfterInit(function(){
	var form = this;
	var modal = this.getTab();

	var querybh = this.getData("querybh");
	if(!JL.isNull(querybh)){
		var ajaxJson = {};
		ajaxJson["src"] = "FormQuery/getConfig.do?rid="+Math.random();
		ajaxJson["data"] = {"XmlData":JSON.stringify({"CX01":querybh})};
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
				}
				if(val["JG04"] != 0){
					header["hidden"] = true;
				}
				if(!JL.isNull(val["JG05"])){
					header["summary"] = val["JG05"];
				}
				if(!JL.isNull(val["JG07"])){
					header["format"] = val["JG07"];
				}
				if(val["JG06"] == 1){
					groupField = val["JG01"];
				}
				headers.push(header);
			});
			
			form.loadGrid(headers, groupField, resultData);
		}
	} else {
		var CD03 = this.getData();
		var sqlMap = JL.getSqlMap(CD03);
		form.loadGrid(sqlMap.result, "", sqlMap);
		if(sqlMap.autoquery){
			form.commonQuery();
		}
	}
});

formQuery.loadGrid = function(headers, groupField, resultData){
	var form = this;
	var modal = this.getTab();
	var gridJson = {
		"jlid":"JLGrid",
		"multi":false,
		"headers":headers,
		"groupField":groupField,
		"excel":true,
		"paging":"more",
		"listener":{
			"loadRow": function(thisPlugin, data, index, dl){
				if(!JL.isNull(resultData.listener) && JL.isFunction(resultData.listener.loadRow)){
					resultData.listener.loadRow(thisPlugin, data, index, dl);
				}
			},
			"rowdblclick": function(grid, data, rowindex){
				if(!JL.isNull(data["bdbh"]) && !JL.isNull(data["jlbh"])){
					window.open("preview.html?bdbh="+data["bdbh"]+"&jlbh="+data["jlbh"]);
				}else if (!JL.isNull(data["BDBH"]) && !JL.isNull(data["JLBH"])){
					window.open("preview.html?bdbh="+data["BDBH"]+"&jlbh="+data["JLBH"]);
				}
			}
		}
	};
	
	gridJson.buttons = [{
		icon:"search",
		text:"查询",
		func:function(){
			form.commonQuery();	
		}
	}];
	
	if(form.data.DCBJ == undefined){
		gridJson.buttons.push(5);
	}else{
		if(form.data.DCBJ != false){
			if(userInfo.FORM_DCBJ != 1){
				gridJson.buttons.push(5);
			}
		}
	}

	if(resultData.dybh){
		gridJson.dybh = resultData.dybh;
		gridJson.buttons.push(7);
	}
	
	if(!JL.isNull(resultData.interfaceId) || !JL.isNull(resultData.url)){
		gridJson.paging = "local";
		gridJson.pagesize = "50";
	}
	
	if(!JL.isNull(form.data.excelType)){
		gridJson.EXPORT_EXCEL_TYPE = form.data.excelType;
	}
	
	if(!JL.isNull(resultData.queryGrid)){
		$.extend(gridJson, resultData.queryGrid);
	}
	if(!JL.isNull(resultData.detailGrid)){
		gridJson.detailGrid = resultData.detailGrid;
	}
	if(!JL.isNull(resultData.menu)){
		gridJson.rightClickMenu = resultData.menu;
	}
	if(resultData.CX10 == 0){
		gridJson.excel = true;
	}
	if(!JL.isNull(resultData.CX08)){
		gridJson.buttons.push({
			text:"查询明细账",
			func:function(){
				var grid = form.getPluginObj("querygrid");
				if(grid.getSelected().length != 1){
					JL.tip("查明细时,只能选择一行主记录");
					return false;
				}
				
				var querybh = form.getData("CX08");
				JLQuery.show(modal, {"querybh":querybh,"noback":true,"excel":true,"autoquery":true});
				JLQuery["config"]["modalField"] = grid.getSelected()[0];
			}
		});
	}
	
	if(resultData["CX10"] == 1){
		delete gridJson["excel"];
	}
	if(!JL.isNull(resultData["CX09"])){
		modal.find("#d_querygrid").attr("dybh",resultData["CX09"]);
		gridJson["print"] = true;
	}
	var g = JL.initPlugIn(this.getTab().find("#d_querygrid"), "querygrid", gridJson, "", [], [], form);
	this.setPluginObj({"querygrid": g});
	
	console.info(resultData);
	var modal_search = modal.find("#modal_search");
	if(!JL.isNull(resultData.CX07) || !JL.isNull(resultData.page)){
		modal.find(".max_modal_main .jl_screening").empty();
		var queryPageUrl = resultData.CX07 || resultData.page;
		modal.find(".max_modal_main .jl_screening").load(queryPageUrl+"?rid="+rid, function(){
			if(!JL.isNull(resultData) && !JL.isNull(resultData.queryField)){
				$.each(resultData.queryField, function(key, value){
					if(value.enterQuery){
						form.getTab().find("[name='"+key+"']").keyup(function(e){
							if(e.keyCode == 13){
								$(this).blur();
								form.commonQuery();
							}
						});
					}
				});
			}
			form.getTab().find("#d_querygrid").show();
			
			$(this).find(".jl_screening_more > span").click(function(){
				if($(this).find("i").hasClass("fa-angle-down")){
					$(this).parent().prev().find("> ul > li.hide").show();
					$(this).parent().prev().find("> ul > li > dl.hide").show();
				}else{
					$(this).parent().prev().find("> ul > li.hide").hide();
					$(this).parent().prev().find("> ul > li > dl.hide").hide();
				}
			});
		});
	}else{
		this.loadCondition(resultData["CXTJ"]);
		form.getTab().find("#d_querygrid").show();
	}
}


formQuery.commonQuery = function(){
	var querybh = this.getData("querybh");
	if(!JL.isNull(querybh)){
		this.query();
	}else{
		this.query2();
	}
	var querygrid = this.pluginObj.querygrid.obj;
	
	if(querygrid.offset().top + querygrid.height() < $(window).height()){
		$("[data-position-bottom]").remove();
	}
};

//查询编号
formQuery.query = function(){
	this.readData();
	var queryField = this.getData();
	$.each(queryField, function(key, value){
		 if(value == "请选择" || key == "querygrid"){
			queryField[key] = "";
		}else if(typeof value == "object"){
			if(value.key != undefined && value.key != null ){
				queryField[key] = value.key;
			}
		}
	});
	var XmlData={};
	XmlData["CX01"] = this.getData("querybh");
	XmlData["queryField"] = $.extend(queryField,userInfo);
	
	if(!JL.isNull(formQuery.config.beforeQuery) && typeof formQuery.config.beforeQuery == "function"){
		if(formQuery.config.beforeQuery(queryField)){
			return true;
		}
	}
	
	var ajaxJson = {};
	ajaxJson["src"] = "jlquery/selectCustom.do?rid="+Math.random();
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData["data"];
	var fileName = resultData["fileName"];
	this.getPluginObj("querygrid").setData(data);
	this.getPluginObj("querygrid").setPaging(fileName);
}

//sqlid
formQuery.query2 = function(){
	this.getPluginObj("querygrid").removeAll();
	this.readData();
	var data = this.getData();
	delete data["querygrid"];
	delete data["jlbh"];
	$.each(data, function(key, value){
		if(typeof value == "object"){
			if($.isArray(value)){
				if(value.length > 0){
					if(typeof value[0] == "object"){
						var arr = [];
						for(var i=0;i<value.length;i++){
							arr.push(value[i]["key"]);
						}
						data[key] = arr;
					}
				}else{
					delete data[key]; 
				}
			}else if(!JL.isNull(value.key)){
				data[key] = value.key;
			}else{
				delete data[key]; 
			}
		}
	});
	
	var CD03 = this.getData();
	var sqlMap = JL.getSqlMap(CD03);

	var XmlData = {};
	$.extend(XmlData, data);
	$.extend(XmlData, userInfo);
	
	console.info(XmlData);
	XmlData["dataType"] = "Json";
	XmlData["sqlid"] = sqlMap.sqlid;
	XmlData["DataBaseType"] = sqlMap.DataBaseType;
	
	if(!JL.isNull(sqlMap.queryField)){
		$.each(sqlMap.queryField, function(key, value){
		});
	}
	
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

	if(JL.isFunction(sqlMap.before)){
		if(sqlMap.before(XmlData)){
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
		XmlData["result"] = sqlMap.fields || {};
		if(sqlMap.fields == undefined){
			for (var i = 0; i < sqlMap.result.length; i++) {
				var row = sqlMap.result[i];
				XmlData["result"][row.id] = 1;
			}
		}
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/selectMongo.do?rid="+Math.random();
		ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	}else{
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/select.do?rid="+Math.random();
		XmlData["QryType"] = "Report";
		ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		
		this.getPluginObj("querygrid").obj.find(".table_content > .table_title > .title_right > .jl_btn:contains('导出数据')").html("<i class='fa fa-spinner fa-spin mr5'></i>数据加载中");

		//返回数据length 及最大页数
		JLMessage.unbind("1003").bind("1003", function(data, param){
			console.info(data);
			var grid = param.form.getPluginObj("querygrid");
			grid.obj.find(".title_right .fa-spinner").parent().html("<i class='fa fa-mail-forward mr5'></i>导出数据");
			grid.setLastPaging(data.LASTPAGE);
		}, {
			"form":this
		});
	}
	var resultData = JL.ajax(ajaxJson,true);
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
			if(JL.isNull(sqlMap.interfaceId) && JL.isNull(sqlMap.url)){
				this.getPluginObj("querygrid").setPaging(fileName);
				var form = this;
				var getLastPage = function(){
					setTimeout(function(){
						debugger;
						var grid = form.getPluginObj("querygrid");
						if(grid.obj.find(".title_right .fa-spinner").length > 0){
							var lastPage = JL.getPagingData(fileName, "LASTPAGE");
							if(!JL.isNull(lastPage)){
								grid.obj.find(".title_right .fa-spinner").parent().html("<i class='fa fa-mail-forward mr5'></i>导出数据");
								grid.setLastPaging(lastPage);
							}else{
								getLastPage();
							}
						}
					}, 10000)
				}
				getLastPage();
			}
		}
		if(resultData.length == 0){
			JL.tip("未查到相关数据");
			this.getPluginObj("querygrid").obj.find(".title_right .fa-spinner").parent().html("<i class='fa fa-mail-forward mr5'></i>导出数据");
			return false;
		}
		this.getPluginObj("querygrid").setData(resultData);
	}else if($.isArray(resultData) && resultData.length == 0){
		JL.tip("未查到相关数据");
		this.getPluginObj("querygrid").obj.find(".title_right .fa-spinner").parent().html("<i class='fa fa-mail-forward mr5'></i>导出数据");
		return false;
	}
}

formQuery.loadCondition = function(CXTJ){
	var form = this;
	var li = this.getTab().find(".jl_screening > .jl_screening_main > ul > li");
	
	var dl = null;
	for(var i=0; i<CXTJ.length; i++){
		var TJ = CXTJ[i];
		if(i%3 == 0){
			dl = $("<dl>").appendTo(li);
			dl.addClass("w12");
		}
		
		var dt = $("<dt>");
		dt.addClass("w01");
		dt.append("<b>"+TJ["TJ02"]+"</b>");
		dt.appendTo(dl);
		var dd = $("<dd>");
		dd.addClass("w03");
		dd.appendTo(dl);
		if(TJ["TJ04"] == 0 || TJ["TJ04"] == 1){
			var input = $("<input>").appendTo(dd);
			input.attr("type", "text");
			input.attr("name", TJ.TJ01);
			input.addClass("w11");
			if(TJ["TJ07"] == 1){
				input.keydown(function(event){
					var e = event || window.event || arguments.callee.caller.arguments[0];
					if(e && e.keyCode==13){ // enter 键
						form.commonQuery();
			    	}	
			    });
			}
			if(!JL.isNull(TJ["TJ05"])){
				input.val(TJ["TJ05"]);
			}
			if(TJ["TJ04"] == 1){
				dt.hide();
				dd.hide();
			}
		}else if(TJ["TJ04"] == 2){
			var div = $("<div>").appendTo(dd);
			div.attr("id", TJ.TJ01);
			div.addClass("w11");
			var selectConfig = {
				"jlid": "JLSelect",
				"options": JSON.parse(TJ.TJ07)
			};
			if(!JL.isNull(TJ.TJ09)){
				selectConfig["default"] = TJ.TJ09;
			}
			var plugin = JL.initPlugIn(div, TJ.TJ01, selectConfig);
			var config = {};
			config[TJ.TJ01] = plugin;
			this.setPluginObj(config);
		}else if(TJ["TJ04"] == 3){
			var div = $("<div id='"+TJ["TJ01"]+"'></div>");
			div.addClass("w11");
			div.appendTo(dd);
			var json = {
				"jlid":"JLDate"
			};
			if(!JL.isNull(TJ["TJ05"])){
				json.defaultDate = JL.formatDate(TJ["TJ05"], 1);
			}
			var plugin = JL.initPlugIn(div, TJ.TJ01, json);
			var config = {};
			config[TJ.TJ01] = plugin;
			this.setPluginObj(config);
		}else if(TJ["TJ04"] == 4){
			var div = $("<div id='"+TJ["TJ01"]+"'></div>");
			div.addClass("w11");
			div.appendTo(dd);
			var json = {
				"jlid":"JLDate",
				"format": "yyyy-mm-dd hh:mi:ss"
			};
			if(!JL.isNull(TJ["TJ05"])){
				json.defaultDate = JL.formatDate(TJ["TJ05"], 2);
			}
			var plugin = JL.initPlugIn(div, TJ.TJ01, json);
			var config = {};
			config[TJ.TJ01] = plugin;
			this.setPluginObj(config);
		}
	}
};