var JLSearchTop = function(json){
	this.config = {
		"param": {},	
		"listener": {},	
		"sBillName": "jlquery",
		"sOperateName": "select.do",
		"placeholder": "请输入关键字"
	};
	$.extend(this.config, json);
	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = "";
	
	this.setData = function(data){
		this.data = data;
		this.text.val(data);
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.loadData = function(){
		var result = [];
		var param = this.config.param;
		if(!JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
			var XmlData={};
			XmlData["sqlid"] = this.config.sqlid;
			XmlData["DataBaseType"] = this.config.resource;
			$.extend(XmlData, userInfo);
			$.extend(XmlData, this.config.param);
			param = XmlData;
		}
		var transport = new JLTransport();
		var resultData = transport.select(this.config.sBillName, this.config.sOperateName, param);
		if(!JL.isNull(resultData)){
			if(!JL.isNull(resultData.data)){
				if(!JL.isNull(resultData.data.DBObjectList)){
					result = resultData.data.DBObjectList;
				}
			}
		}
		return result;
	}
	
	this.loadOption = function(){
		var ul = this.ul;
		var keyWord = this.data;
		ul.empty();
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/trust/o2o/searchHandler/fuzzysearch.do";
		ajaxJson["data"] = {"XmlData": JSON.stringify({"keyWord":keyWord})};
		var resultData = JL.ajax(ajaxJson);
		resultData = resultData.data.returnList
		for(var i=0; i<resultData.length; i++){
			if(i==8){
				return false;
			}
			var row = resultData[i];
			var li = $("<li class='w12'>"+row+"</li>").appendTo(ul);
			li.click(function(){
				$(thisPlugin.obj).find(":text").val($(this).html());
				ul.hide();
				thisPlugin.serch.click();
			});
		}
	}
	
	this.init = function(){
		$(this.obj).empty();

		var text = $("<input>").appendTo(this.obj);
		text.attr("type", "text");
		text.attr("placeholder", this.config.placeholder);
		text.addClass("w08");
		
		text.blur(function(){
			thisPlugin.ul.fadeOut();
		});
		text.focus(function(){
			var value = $(this).val();
			var ul = $(this).next().next();
			if(JL.isNull(value)){
				ul.fadeOut();
			}else{
				if(ul.is(":hidden")){
					ul.fadeIn();
				}
				if(ul.find("li").length == 0){
					thisPlugin.data = value;
					thisPlugin.loadOption();
				}
			}
		});
		text.keyup(function(e){
			var xuan = thisPlugin.ul.find("li.xuan");
			console.info(e.keyCode);
			if(e.keyCode == 38 || e.keyCode == 40){
				if(e.keyCode == 38){
					if(xuan.prevAll(":not(:hidden):eq(0)").length > 0){
						xuan.prevAll(":not(:hidden):eq(0)").addClass("xuan");
					}else{
						thisPlugin.ul.find("li:not(:hidden):last").addClass("xuan");
					}
				} else if(e.keyCode == 40){
					if(xuan.nextAll(":not(:hidden):eq(0)").length > 0){
						xuan.nextAll(":not(:hidden):eq(0)").addClass("xuan");
					}else{
						thisPlugin.ul.find("li:not(:hidden):first").addClass("xuan");
					}
				}
				if(xuan.length == 0){
					thisPlugin.ul.find("li:not(:hidden):first").addClass("xuan");
				}else{
					xuan.removeClass("xuan");
				}
			} else if(e.keyCode == 13){
				if(xuan.length > 0){
					xuan.click();
				}else{
					thisPlugin.serch.click();
				}
			} else {
				var value = $(this).val();
				var ul = $(this).next().next();
				if(JL.isNull(value)){
					ul.fadeOut();
				}else{
					if(ul.is(":hidden")){
						ul.fadeIn();
					}
					thisPlugin.data = value;
					thisPlugin.loadOption();
				}
			}
		});

		var serch = $("<a>").appendTo(this.obj);
		serch.addClass("w02");
		serch.html("搜索");
		serch.click(function(){
			if (!JL.isNull(thisPlugin.config.listener.click)) {  
				thisPlugin.config.listener.click(thisPlugin.text.val());
			}
		});

		var ul = $("<ul>").appendTo(this.obj);
		ul.addClass("w08 display_none search_dataList");
		
		this.text = text;
		this.ul = ul;
		this.serch = serch;
	}
	this.init();
};