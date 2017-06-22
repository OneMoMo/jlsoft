var JLCheckbox = function(json){
	this.config = {
		"default": null, //默认选中
		"css": null, //选项样式
		"options": {}, //选项
		"listener": {} //监听事件 click
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
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setCdsData = function(data, _cdsid){
		if(!JL.isNull(data)){
			this.setData(data);
		} else {
			this.data = [];
			this.obj.find(".font_color").removeClass("font_color");
			this.obj.find("i.fa-check-square").addClass("fa-square-o");
			this.obj.find("i.fa-check-square").removeClass("fa-check-square");
		}
	};
	
	this.setData = function(data){
		this.data = data;
		this.obj.find(".font_color").removeClass("font_color");
		this.obj.find("i.fa-check-square").addClass("fa-square-o");
		this.obj.find("i.fa-check-square").removeClass("fa-check-square");
		
		if(!JL.isNull(data)){
			if(typeof data == "object" &&  $.isArray(data)){
				for(var i=0; i<data.length; i++){
					//this.obj.find("[key='"+data[i].key+"']").click();
					var checkbox = this.obj.find("[key='"+data[i].key+"']");
					checkbox.addClass("font_color");
					JL.changeClass(checkbox.children("i"), "fa-square", "fa-check-square");
				}
			}else{
				this.obj.find("[key='"+data+"']").click();
			}
		}
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.getArrData = function(){
		var arr = [];
		for(var i=0;i<this.data.length;i++){
			var key = this.data[i]["key"];
			if(!JL.isNull(key)){
				arr.push(key);
			}
		}
		return arr;
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			var height = thisPlugin.obj.parent().height();
			var width = thisPlugin.obj.parent().width();
			height = height <= 0? 30: height;
			thisPlugin.obj.prepend("<div disabled style='position: absolute;width: "+width+"px;min-height: "+height+"px;'></div>");
			thisPlugin.obj.addClass("font_gray");
			thisPlugin.obj.find("i").addClass("font_gray");
		}else{
			thisPlugin.obj.find("div[disabled]").remove();
			thisPlugin.obj.removeClass("font_gray");
			thisPlugin.obj.find("i").removeClass("font_gray");
		}
	}

	this.hide = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.obj.hide()
		}else{
			this.obj.show()
		}
	}
	
	this.hideOption = function(arr,boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(typeof data == "object" &&  $.isArray(arr)){
			for(var i=0; i<arr.length; i++){
				if(boolean){
					this.obj.find("[key='"+arr[i]+"']").hide();
				}else{
					this.obj.find("[key='"+arr[i]+"']").show();
				}
			}
		}else{
			if(boolean){
				this.obj.find("[key='"+arr+"']").hide();
			}else{
				this.obj.find("[key='"+arr+"']").show();
			}
		}
	}

	this.delData = function(arrs){   
		var datas = thisPlugin.data;
		if(typeof data == "object" &&  $.isArray(arr)){
			for(var i=0; i<arrs.length; i++){
				var arr = arrs[i]; 
				for (var h=0; h<datas.length; h++){
					var data = datas[h];
					if (arr.key == data.key){
						datas.pop(h);
					}
				}
			}
		}else{
			datas.pop(arrs);
		}
		thisPlugin.data = datas;
	}

	this.init = function(json){
		$(this.obj).empty();
		this.obj.addClass("fl");
		
		$.each(this.config.options, function(key, value){
			var jl_input_checkbox = $("<div>").appendTo(thisPlugin.obj);
			jl_input_checkbox.addClass("jl_input_checkbox checkbox_css");
			if(!JL.isNull(thisPlugin.config.css)){
				jl_input_checkbox.addClass(thisPlugin.config.css);
			}
			jl_input_checkbox.attr("key", key);
			jl_input_checkbox.append("<i class='fa fa-square-o'></i><span>"+value+"</span>");
			jl_input_checkbox.data({"key":key,"value":value});
			jl_input_checkbox.click(function(){
				var data = $(this).data();
				var checked = $(this).siblings(".font_color");
				thisPlugin.data = [];
				for (var i = 0; i < checked.length; i++) {
					thisPlugin.data.push($(checked[i]).data());
				}
				var arr = thisPlugin.data;
				if(!$(this).hasClass("font_color")){
					thisPlugin.data.push(data);
				}
				
				if(!JL.isNull(thisPlugin.config.cds)){
					thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
				}
				if(!JL.isNull(thisPlugin.config.listener.checked)){
					thisPlugin.config.listener.checked(data, !$(this).hasClass("font_color"), arr);
				} 
				if(!JL.isNull(thisPlugin.config.listener.click)){
					thisPlugin.config.listener.click(data, checked, $(this), thisPlugin);
				} 
				if(!JL.isNull(thisPlugin.config.listener.change)){
					thisPlugin.config.listener.change(thisPlugin.data, thisPlugin);
				} 
			});
			
			if(!JL.isNull(thisPlugin.config.default) 
					&& JL.isNull(thisPlugin.data) 
					&& $.inArray(key, thisPlugin.config.default) != -1){
				var data = {"key":key,"value":value};
				
				var inArr = $.inArray(data, thisPlugin.data);
				if(inArr != -1){
					thisPlugin.data.splice(inArr, 1);
				}else{
					thisPlugin.data.push(data);
				}
				
				jl_input_checkbox.find("i").removeClass("fa-square-o");
				jl_input_checkbox.find("i").addClass("fa-check-square font_color");
				jl_input_checkbox.addClass("font_color");
			}
		});	
	}
	this.init();
};
