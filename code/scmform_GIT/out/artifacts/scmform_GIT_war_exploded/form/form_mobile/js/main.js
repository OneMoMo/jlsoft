$(document).ready(function(){
	var pageData = JL.getUrlParam("data");
	if(!JL.isNull(pageData)){
		pageData = JSON.parse(pageData);
		$(".jl_header").load("header.html", function(){
			if(!JL.isNull(pageData.CD03) && pageData.CD03.indexOf("BZ01") != -1){
				$(this).find("#back > span").html(pageData.CDMC);
			} else if(!JL.isNull(pageData.LSH)){
				$(this).find("#back > span").html(pageData.GZL02 + pageData.LSH);
			} else {
				$(this).find("#back > span").html(pageData.CD02);
			}
		});
		loadPage(pageData);
	}else{
		history.back();
	}
})

var loadMain = function(json, parentData, grandData, formData){
	var div = $(".jl_main");
	div.attr("data-id", json.random);
	div.attr("data-name", JL.formatDataName(json));
	div.data(json);
	div.data("formData", formData);
	
	if(json.CD11 == 1){
		JL.fullScreen(div[0]);
	}
	
	div.load(json.url+"?rid="+Math.random(), function(a,ajaxType,c,d,e){
		if(ajaxType == "success"){
			var config = $(this).data();
			var data_id = $(this).attr("data-id");
			var data_name = $(this).attr("data-name");
			var jl_process_page = $("<div class='jl_process_page w12'>").prependTo(this);
			loadLCT(jl_process_page, config);
			var jl_form = eval(data_name);
			jl_form.setTab($(this)); 
			jl_form.setData(config["YWSJ"]);
			if(config["CS"] == true){
				jl_form.setData({"CS":true,"sk01":config.formData.SK01});
				jl_form.initField=["initField"];
				jl_form.previewForm();
			} else if(!JL.isNull(config["CD03"]) && config["CD03"].indexOf("\"BZ03\":\"1\"") == -1){
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
	});
	if(json.bdym != "FormQuery"){
		div.prepend("<script type='text/javascript' src='"+json.url.replace(json.bdym+".html", "js/"+json.bdym+".js")+"?rid="+Math.random()+"'><\/script>");
	}
}

var loadPage = function(data, parentData, grandData){
	var formData = $.extend({}, data);
	var json = JL.formatURL(formData);
	if(JL.isNull(json.CD11) || json.CD11 == 0 || json.CD11 == 1){
		loadMain(json, parentData, grandData, formData);
	}else{
		window.open(json.url);
	}
}


var loadLCT = function(ul, json){
	var step = $("<ul class='w12'>").appendTo(ul);
	if(!JL.isNull(json.BZ01) && !JL.isNull(json.XW01)){
		var old = {};
		var arr = [];
		var resultData = getLCT(json);
		for(var i=0; i<resultData.length; i++){
			var row = resultData[i];
			if(!JL.isNull(row.SJ)){
				old = row;
			}else if(row.SJ == ""){
				arr.push(row);
			}
		}
		
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
		
		if(step.find("li").length == 2){
			step.find("li").addClass("w06");
		}else if(step.find("li").length == 3){
			step.find("li").addClass("w04");
		}
		
	}else if(JL.isNull(json.YWSJ) || !JL.isNull(json.YWSJ.bdbh)){
		//jl_process.show();
		//step.append("<li class='center center01'>制单</li>");
		//step.append("<li class='after'>封单</li>");
		//jl_dropdown_menu.append("<li><a>"+userInfo.PCRM_CZY03+"<label class='jl_btn bgcolor_green'>当前流程</label></a></li>");
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
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectDBGZL.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){
		resultData = resultData.data.resultList;
	}else{
		resultData = [];
	}
	return resultData;
}