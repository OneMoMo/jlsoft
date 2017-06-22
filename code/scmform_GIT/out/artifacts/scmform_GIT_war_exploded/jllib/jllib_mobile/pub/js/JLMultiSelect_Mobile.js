var JLMultiSelect_Mobile = function(json) {
	this.config = {
		"param" : {},//接口传递参数 
		"sBillName" : pubJson.getURL("FormUrl")+"/jlquery",//接口路径(有默认值)
		"sOperateName" : "select.do",//接口方法(有默认值)
		"multi" : true,
		"options": [],
		"edit"  : true,
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"listener":{}//监听事件 change|keyup
	};
	$.extend(this.config, json);
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setCdsData = function(json, cdsid){
		if(!JL.isNull(json)){
			this.setData(json);
		}else{
			this.setData([]);
		}
	}

	this.setData = function(data) {
		this.data = data;
		this.appendDiv(data);
	}

	this.getData = function() {
		return this.data;
	}

	this.readData = function() {
		this.data = [];
		var checked = this.ul.children("li.font_blue");
		var html = "";
		for(var i=0; i<checked.length; i++){
			var li = $(checked[i]);
			this.data.push(li.data());
			//html += "<span class='pt5 pb5 pl10 pr10 mr10 mb5 btn_white'>" + li.data("value") + "</span>";
			html += li.data("value");
			if(i < checked.length-1){
				html += ",";
			}
		}
		thisPlugin.resultDiv.html(html);
	}

	this.appendDiv = function(data) {
		var html = "";
		for(var i=0; i<data.length; i++){
			var row = data[i];
			html += row.value;
			if(i < data.length-1){
				html += ",";
			}
		}
		thisPlugin.resultDiv.html(html);
	}

	this.loadData = function() {
		var arry = [];
		
		if(!JL.isNull(this.config.options)){
			$.each(this.config.options, function(key, value){
				arry.push({"key": key,"value": value});
			});
			this.config.options = arry;
		}else if (!JL.isNull(this.config.sBillName)
				&& !JL.isNull(this.config.sOperateName)) {
			var transport = new JLTransport(); 
			
			var param = this.config.param;
			if(!JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
				var XmlData={};
				XmlData["sqlid"] = this.config.sqlid;
				XmlData["DataBaseType"] = this.config.resource;
				$.extend(XmlData, userInfo);
				$.extend(XmlData, this.config.param);
				param = XmlData;
			}
			
			var resultData = transport.select(this.config.sBillName,this.config.sOperateName, param);
             
            if(typeof resultData == "object"){
            	if($.isArray(resultData)){ 
 					for(var i=0; i<resultData.length; i++){ 
 						var row = resultData[i];
 						if(!JL.isNull(row.KEY) && !JL.isNull(row.VALUE)){
 							row.key = row.KEY;
 							row.value = row.VALUE;
 							delete row.KEY;
 							delete row.VALUE;
 						}
 						arry.push(row);  
 					}
 				}else{
 					this.config.options = resultData;
 				}
 			}
		
			if (!JL.isNull(arry)) {
				this.config.options = arry;
			}
		}
	}

	this.write = function() {
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
			if(JL.isNull($(this).attr("disabled"))){
				thisPlugin.ul.children("li.font_blue").click();
				thisPlugin.setData(thisPlugin.getData());
				$(this).next().find("header").addClass("position_f");
				$(this).next().show();
				$(this).next().animate({"right":"0px"},300);
			}
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
		nav_right.html("<span>确定</span>");
		nav_right.click(function(){
			thisPlugin.readData();
			$(this).closest("header").removeClass("position_f");
			$(this).closest(".jl_page_container").animate({"right":"-100%"},300);
		});
		
		var jl_main = $("<div>").appendTo(jl_page_container);
		jl_main.addClass("jl_main bgcolor_white");
		var ul = $("<ul>").appendTo(jl_main);
		this.ul = ul;
		this.resultDiv = resultDiv;
		this.span = span;
		this.loadData();
		this.pplist(ul, false);
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.span.hide();
			this.span.attr("disabled", "disabled");
		}else{
			this.span.show();
			this.span.removeAttr("disabled");
		}
	};

	this.pplist = function(ul, check) {
		var resultData = this.config.options;
		ul.empty();
		for ( var h = 0; h < resultData.length; h++) {
			var row = resultData[h];
			var li = $("<li>").appendTo(ul);
			li.addClass("w12");
			li.attr("name", row.key);
			var div = $("<div class='jl_input_checkbox checkbox_text w12 pt5 pb5 pl10'></div>").appendTo(li);
			var i = $("<i class='fa fa-square-o mr10'></i>").appendTo(div);
			var span = $("<span>"+ row["value"] + "</span>").appendTo(div);
			li.data(row);
			li.click(function() {
				var fa = $(this).find('i.fa');
				if (fa.hasClass("fa-check-square")){
					JL.changeClass(fa, "fa-check-square", "fa-square-o");
					$(this).removeClass("font_blue"); 
				}else{
					if (!thisPlugin.config.multi){
						var checks = $(this).parent().find('.fa-check-square');
						JL.changeClass(checks, "fa-check-square", "fa-square-o");
						$(this).siblings(".font_blue").removeClass("font_blue"); 
					}
					JL.changeClass(fa, "fa-square-o", "fa-check-square");
					$(this).addClass("font_blue"); 
				}
				
				if(!JL.isNull(thisPlugin.config.cds)){
					thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.getData());
				}
				if (!JL.isNull(thisPlugin.config.listener.click)) {  
					thisPlugin.config.listener.click($(this).data());
				}
				if (!JL.isNull(thisPlugin.config.listener.change)) {  
					thisPlugin.config.listener.change(thisPlugin.getData());
				}
			});
		}

		ul.find("> li >.jl_btn_group > span").click(function() { 
			var XG = $(this).prev().val();
			if (JL.isNull(XG)) {
				alert("不能为空");
				return false;
			}
			var span = $(this).parent().prevAll("span");
			span.html(XG);
			span.show();
			$(this).parent().hide();
			$(this).closest("li").data("name", XG); 
		});
		ul.find("> li >.jl_masklayer > div >.fa-times").click(function() {
			$(this).closest("li").remove();
		});
	}

	this.init = function() {
		// 控件渲染
		this.write(); 
	}
	this.init();
}
