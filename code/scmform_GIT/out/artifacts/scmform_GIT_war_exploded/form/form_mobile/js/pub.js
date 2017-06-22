var userInfoCookie = $.cookie("userInfo");
var userInfo = JSON.parse(userInfoCookie);
var data=JL.getUrlParam("data");
    data= JSON.parse(data);
    //$(".loadPage").load(data.URL);
    
    var formatURL = function(config){
    	var json = {};

    	if(!JL.isNull(config["CD03"])){
    		var CD03 = JSON.parse(config["CD03"]);
    		debugger;
    		if(!JL.isNull(CD03["sqlid"])){
    			json["url"] = pubJson.getURL("FormUrl") + "/form/form_pc/FormQuery.html";
    			json["bdym"] = "FormQuery";
    			config["YWSJ"] = CD03;
    			
    			if(!JL.isNull(CD03.namespace) && $("script[src*='"+CD03.namespace+".js']").length==0){
    				var src = pubJson.getURL("FormUrl") + "/"+CD03.dir+"/"+CD03.namespace+".js";
    				$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
    			}
    			
    			CD03.sqlMap = eval(CD03.namespace+"_"+CD03.sqlid);
    			CD03.sqlMap.sqlid = CD03.namespace+"."+CD03.sqlid;
    			
    			CD03.modalField = {};
    			$.extend(JLQuery["config"], CD03);
    		}else if(!JL.isNull(CD03["querybh"])){
    			json["url"] = pubJson.getURL("FormUrl") + "/form/form_mobile/FormQuery.html";
    			json["bdym"] = "FormQuery";
    			config["YWSJ"] = {"querybh": CD03.querybh};
    			JLQuery["config"]["querybh"] = CD03.querybh;
    		}else if(!JL.isNull(CD03["bdym"]) && !JL.isNull(CD03["url"])){
    			json["url"] = CD03["url"];
    			json["bdym"] = CD03["bdym"];
    		}else{
    			var formPath = JL.getFormURL(CD03["bdbh"]);
    			json["url"] = formPath["url"];
    		    json["bdym"] = formPath["bdym"];
    		    var YWSJ = CD03;
    		    if(JL.isNull(YWSJ["jlbh"])){
    		    	YWSJ["jlbh"] = 0;
    		    }
    		    config["YWSJ"] = YWSJ;
    		}
    		json["config"] = config;
    	} else {
    		var XmlData = {};
    		XmlData["GZL01"] = config["GZL01"];
    		XmlData["BZ01"] = config["BZ01"];
    		var XW = getXW(XmlData);
    		//debugger;

    		if(JL.isNull(config.YWSJ)){
    			var YWSJ = {};
    			YWSJ["jlbh"] = 0;
    			config["YWSJ"] = YWSJ;
    		}
    		if (JL.isNull(XW["TBLNAME"])){
    			config.YWSJ.bdbh = config["TBLNAME"];
    		}else{
    			config.YWSJ.bdbh = XW["TBLNAME"];
    		}
    		//config.YWSJ.bdbh = config["TBLNAME"];
    		var formPath = JL.getFormURL(config.YWSJ.bdbh, XW["YMBH"]);
    		json["url"] = formPath["url"];
    		json["bdym"] = formPath["bdym"];
    		json["config"] = $.extend(config, XW);
    	}
    	
    	json["random"] = JL.random(); 
    	return json;
    }
    
    var getXW = function(XmlData){
    	//debugger;
    	var ajaxJson = {};
    	ajaxJson["src"] = pubJson.getURL("FormUrl")+"/CX/selectXW.do";
    	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
    	var XW = JL.ajax(ajaxJson);
    	if(!JL.isNull(XW["data"]["resultList"])){
    		XW = XW["data"]["resultList"][0];
    	}
    	return XW;
    }
    
    var formatDataName = function(json){
    	var data_name = "";
    	if(json.bdym == "FormQuery"){
    		data_name = json.bdym+"_"+json.config.YWSJ.sqlid;
    	} else if(json.bdym == "FormQuery"){
    		data_name = json.bdym+"_"+json.config.YWSJ.querybh;
    	} else if(json.bdym == "daiBan"){
    		data_name = json.bdym+"_"+json.config.YWSJ.GZL01;
    	} else {
    		data_name = json.bdym;
    	}
    	return data_name;
    }
    
    
    var loadMain = function(json, parentData, grandData, formData){
    	//loadTab(json, parentData, grandData);
    	 loadLCT($(".jl_process_page"),json)
     debugger;
    	var div = $("<div>").appendTo($(".loadPage"));
    	div.siblings(".pagr_content").hide();
    	div.addClass("pagr_content");
    	div.attr("data-id", json.random);
    	div.attr("data-name", formatDataName(json));
    	div.data(json.config);
    	div.data("formData", formData);
    	
    
    	div.load(pubJson.getURL("FormUrl")+"/"+json.url+"?rid="+Math.random(), function(a,ajaxType,c,d,e){
    		if(ajaxType == "success"){
    			//debugger;
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
    			} else if(!JL.isNull(config["CD03"])){
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
    	
    		div.prepend("<script type='text/javascript' src='"+pubJson.getURL("FormUrl")+"/"+json.url.replace(json.bdym+".html", "js/"+json.bdym+".js")+"?rid="+Math.random()+"'><\/script>");
    	}
    }
  
    
   var loadPage = function(data, parentData, grandData){
	   debugger;
		var formData = $.extend({},data);
		var json = formatURL(formData);
		var config = json.config;
		if(JL.isNull(config.CD11) || config.CD11 == 0 || config.CD11 == 1){
			loadMain(json, parentData, grandData, formData);
		}else{
			window.open(json.url);
		}
		
	}
   
   $(function(){
   loadPage(data);

   });
   
   var getLCT = function(json){
	   //debugger;
		var XmlData = {};
		XmlData["BZ01"] = json.config.BZ01;
		if(!JL.isNull(json.config.PID)){
			XmlData["PID"] = json.config.PID;
		}
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl")+"/CX/selectDBGZL.do";
		ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		if(!JL.isNull(resultData)){
			resultData = resultData.data.resultList;
		}else{
			resultData = [];
		}
		return resultData;
	}
   
   
   var loadLCT = function(ul, json){
		var step = $("<ul>").appendTo(ul);
		if(!JL.isNull(json.config.BZ01) && !JL.isNull(json.config.XW01)){

			var old = {};
			var arr = [];
			var resultData = getLCT(json);
			for(var i=0; i<resultData.length; i++){
				var row = resultData[i];
				if(!JL.isNull(row.SJ)){
					old = row;
					//jl_dropdown_menu.append("<li><a>"+row.RYMC+"<label class='jl_btn bgcolor_gray'>"+row.BZ02+" "+row.SJ+"</label></a></li>");
				}else if(row.SJ == ""){
					arr.push(row);
				}
			}
			//jl_dropdown_menu.append("<li><a>"+userInfo.PCRM_CZY03+"<label class='jl_btn bgcolor_green'>当前流程</label></a></li>");
			
			if(json.config.BZ03 == 1){
				step.append("<li class='center center01'>"+json.config.BZ02+"</li>");
				step.append("<li class='after'>"+resultData[0].BZ02+"</li>");
			}else if(arr.length > 0){
				step.append("<li class='before'>"+old.BZ02+"</li>");
				step.append("<li class='center'>"+json.config.BZ02+"</li>");
				step.append("<li class='after'>"+arr[0].BZ02+"</li>");
			}else{
				step.append("<li class='before'>上一步流程</li>");
				step.append("<li class='center center02'>"+json.config.BZ02+"</li>");
			}
		}else if(JL.isNull(json.config.YWSJ) || !JL.isNull(json.config.YWSJ.bdbh)){
		
			step.append("<li class='center center01'>制单</li>");
			step.append("<li class='after'>封单</li>");
			//jl_dropdown_menu.append("<li><a>"+userInfo.PCRM_CZY03+"<label class='jl_btn bgcolor_green'>当前流程</label></a></li>");
		}
	}
   
   
   
   
