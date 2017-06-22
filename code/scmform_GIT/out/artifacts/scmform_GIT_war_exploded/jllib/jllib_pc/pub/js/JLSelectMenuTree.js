var JLSelectMenuTree = function(json){
	this.config = {
		"param": {},	
		"listener": {},	
		"sBillName": "jlquery",
		"sOperateName": "select.do",
		"dataStructure": "list",
		"final": false
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = {};

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
		}
	}
	
	this.setData = function(data){
		this.data = data;
		this.text.val(data.value);
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.loadData = function(){
		var result = [];
		var param = this.config.param;
		if( !JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
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
			result = resultData;
			if(!JL.isNull(resultData.data)){
				result = resultData.data;
				if(!JL.isNull(resultData.data.returnList)){
					result = resultData.data.returnList;
				}
			}
		}
		return result;
	}
	
	this.loadOption_List = function(ul){
		var options = this.loadData();
		for(var i=0; i<options.length; i++){
			var option = options[i];
			var li = $("<li>").appendTo(ul);
			var html = option.VALUE;
			if(option.MJBJ == 0){
				html += "<span><i class='fa fa-angle-right font_gray'></i></span>";
			}
			li.append("<a>"+ html +"</a>");
			li.data({"key": option.KEY,"value": option.VALUE,"mjbj": option.MJBJ});
			li.mouseenter(function(){
				var data = $(this).data();
				var ul = $(this).find("ul");
				if(ul.length == 0){
					ul = $("<ul>").appendTo($(this));
					ul.addClass("jl_dropdown_menu jl_dropleft_menu");
					thisPlugin.config.param = {"PARENT": data.key};
					thisPlugin.loadOption_List(ul);
				}
			});
			li.find("> a").click(function(){
				console.info('2222222222222');
				var data = $(this).parent().data();
				if (thisPlugin.config.final){
					if (data.mjbj ==1){
						thisPlugin.setData(data);
						if(!JL.isNull(thisPlugin.config.listener.click)){
							thisPlugin.config.listener.click(data);
						}
						if(!JL.isNull(thisPlugin.config.cds)){
							thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
						}
					}
				}else{
					thisPlugin.setData(data);
					if(!JL.isNull(thisPlugin.config.listener.click)){
						thisPlugin.config.listener.click(data);
					}
					if(!JL.isNull(thisPlugin.config.cds)){
						thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
					}
				}
			});
		}
	}
	
	this.loadOption_AllList = function(ul, options){
		for(var i=0; i<options.length; i++){
			var option = options[i];
			var li = $("<li name=''>").appendTo(ul);
			li.attr("name",option.code);
			var html = option.name;
			if(!JL.isNull(option.item) && option.item.length>0){
				html += "<span><i class='fa fa-angle-right font_gray'></i></span>";
			}
			li.append("<a>"+ html +"</a>");
			li.data({"key": option.code,"value": option.name,"mjbj": option.mjbj});
			li.find("> a").click(function(){
				console.info ('111111111');
				var data = $(this).parent().data();
				if (thisPlugin.config.final){
					if (data.mjbj ==1){
						thisPlugin.setData(data);
						if(!JL.isNull(thisPlugin.config.listener.click)){
							thisPlugin.config.listener.click(data);
						}
						if(!JL.isNull(thisPlugin.config.cds)){
							thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
						}
					}
				}else{
					thisPlugin.setData(data);
					if(!JL.isNull(thisPlugin.config.listener.click)){
						thisPlugin.config.listener.click(data);
					}
					if(!JL.isNull(thisPlugin.config.cds)){
						thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
					}
				}
				
			});
			
			if(!JL.isNull(option.sjcode)){ 
				if (thisPlugin.obj.find("li[name="+option.sjcode+"] >ul").attr('class') == null){
				/*	var parentli = thisPlugin.obj.find("li[name="+option.sjcode+"]");
					var jl_dropleft_menu = $("<ul>").appendTo(li);
					jl_dropleft_menu.addClass("jl_dropdown_menu jl_dropleft_menu");
					jl_dropleft_menu.appendTo(parentli);
					li.appendTo(jl_dropleft_menu);*/
					var parentli = thisPlugin.obj.find("li[name="+option.sjcode+"]");
					var jl_dropleft_menu = $("<ul>").appendTo(parentli);
					jl_dropleft_menu.addClass("jl_dropdown_menu jl_dropleft_menu");
					//jl_dropleft_menu.appendTo(parentli);
					li.appendTo(jl_dropleft_menu);
				}else{
					var parentli = thisPlugin.obj.find("li[name="+option.sjcode+"]");
					var parentul = parentli.find('ul')[0];
					//var jl_dropleft_menu = parentul.appendTo(parentli);
					//li.appendTo(jl_dropleft_menu);
					li.appendTo(parentul);
				}
			}
		}
	}
	
	this.loadOption_Tree = function(ul, options){
		for(var i=0; i<options.length; i++){
			var option = options[i];
			var li = $("<li>").appendTo(ul);
			var html = option.name;
			if(!JL.isNull(option.item) && option.item.length>0){
				html += "<span><i class='fa fa-angle-right font_gray'></i></span>";
			}
			li.append("<a>"+ html +"</a>");
			li.data({"key": option.code,"value": option.name});
			li.find("> a").click(function(){
				console.info('333333333333');
				var data = $(this).parent().data();
				if (thisPlugin.config.final){
					if (data.mjbj ==1){
						thisPlugin.setData(data);
						if(!JL.isNull(thisPlugin.config.listener.click)){
							thisPlugin.config.listener.click(data);
						}
						if(!JL.isNull(thisPlugin.config.cds)){
							thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
						}
					}
				}else{
					thisPlugin.setData(data);
					if(!JL.isNull(thisPlugin.config.listener.click)){
						thisPlugin.config.listener.click(data);
					}
					if(!JL.isNull(thisPlugin.config.cds)){
						thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
					}
				}
				
			});
			
			if(!JL.isNull(option.item)){
				var jl_dropleft_menu = $("<ul>").appendTo(li);
				jl_dropleft_menu.addClass("jl_dropdown_menu jl_dropleft_menu")
				this.loadOption_Tree(jl_dropleft_menu, option.item);
			}
		}
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.text.attr("disabled","disabled");
			this.span.hide();
		}else{
			this.text.removeAttr("disabled");
			this.span.show();
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
	
	this.init = function(json){
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		console.info('123123123123');
		var text = $("<input>").appendTo(this.obj);
		text.attr("type", "text");
		text.attr("name", this.config.id);
		text.attr("readonly", "readonly");
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", this.config.placeholder);
		}
		var span = $("<span class='jl_btn btn_white'><i class='fa fa-angle-down'></i></span>").appendTo(this.obj);
		var ul = $("<ul>").addClass("jl_dropdown_menu").appendTo(this.obj);
		
		if(thisPlugin.config.dataStructure == "list"){
			this.loadOption_List(ul);
		}else if(thisPlugin.config.dataStructure == "alllist"){
			var options = this.loadData(); 
			this.loadOption_AllList(ul, options);
		}else if(thisPlugin.config.dataStructure == "tree"){
			var options = this.loadData();
			this.loadOption_Tree(ul, options);
		}
		
		this.text = text;
		this.span = span;
		this.ul = ul;
	}
	this.init();
};