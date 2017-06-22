var JLInput = function(json){
	this.config = {
		"default": null, //默认选中
		"placeholder": "", //选项样式
		"css": null, //选项样式
		"type": "text", //选项样式
		"default": "",
		"readonly": false, //只读配置 true|false
		"format": {}, //选项
		"split": "", //取值时按此分割成数组
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
	this.data = "";
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setData = function(data){  
		if(!JL.isNull(this.config.split) && !JL.isNull(data)){
			this.data = "";
			for(var i=0; i<data.length; i++){
				this.data += data[i];
				if(i < data.length - 1){
					this.data += this.config.split;
				}
			}
		}else{  
		   this.data = data;
		   var format = thisPlugin.config.format; 
		   if (format.kilobit && !isNaN(this.data) && !JL.isNull(this.data)){
			   data = JL.formatNumber(this.data,format.kilobit);
		   }  
		}
		this.input.val(data);
	}

	this.setCdsData = function(json, cdsid){ 
		if(!JL.isNull(json)){
			this.setData(json);
		}else{
			this.setData("");
		}
	}
	
	this.getData = function(){
		if(!JL.isNull(this.config.split) && !JL.isNull(this.data)){
			return this.data.split(this.config.split);
		}else{
			var format = thisPlugin.config.format;
			if (format.kilobit){
				this.data = this.data.replace(/,/g, "");
			}
			return this.data;
		}
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.obj.closest(".jl_btn_group").find("span.jl_btn").hide();
			this.input.attr("disabled","disabled");
		}else{
			this.obj.closest(".jl_btn_group").find("span.jl_btn").show();
			this.input.removeAttr("disabled");
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
	
	this.init = function(){
		$(this.obj).empty();
		$(this.obj).addClass("delete_input");
		
		var input = $("<input>").appendTo(this.obj); 
		input.attr("type", this.config.type);
		input.attr("name", this.config.id);
		if(!JL.isNull(this.config.placeholder)){
			input.attr("placeholder", this.config.placeholder);
		}
		if(!JL.isNull(this.config.maxlength)){
			input.attr("maxlength", this.config.maxlength);
		}
		if(this.config.readonly){
			input.attr("readonly", "readonly");
		}
		if(!JL.isNull(this.config.css)){
			input.addClass(this.config.css);
		}
		input.focus (function(){ 
			var format = thisPlugin.config.format;
			if (format.kilobit){ 
				thisPlugin.input.val(thisPlugin.data.replace(/,/g, "")); 
			}
		});
		input.change(function(){
			var value = $(this).val();
			thisPlugin.data = $(this).val();
			var format = thisPlugin.config.format;
			if (format.kilobit){ 
			   if(!JL.isNull(value)){  
				   thisPlugin.setData(value);
			   }
			}
		});
		input.blur(function(){
			var value = $(this).val();
			thisPlugin.data = $(this).val();
			var format = thisPlugin.config.format;
			if(!JL.isNull(format.null) && !format.null && JL.isNull(value)){
				JL.message(thisPlugin.obj, "必填", "error");
			}else if(format.number && isNaN(value)){
				JL.message(thisPlugin.obj, "无效数字", "error");
			}else if(format.phone && !JL.isPhone(value)){
				JL.message(thisPlugin.obj, "无效手机号", "error");
			}else if(format.email && !JL.isEmail(value)){
				JL.message(thisPlugin.obj, "无效邮箱", "error");
			}else{
				thisPlugin.obj.nextAll(".message").remove();
			}
			
			if (format.kilobit && !isNaN(value)){ 
			   if(!JL.isNull(value)){ 
				   thisPlugin.setData(value);
			   }
			}
			
			if(!JL.isNull(thisPlugin.config.listener.blur)){
				thisPlugin.config.listener.blur(thisPlugin.data, thisPlugin);
			}
		});
		
		if(!JL.isNull(thisPlugin.config.listener)){
			$.each(thisPlugin.config.listener, function(key, func){
				if($.inArray(key, ["change","keypress","blur"]) == -1){
					input.bind(key, func);
				}
			});
		}
		
		//if(!this.config.readonly){
		if(!this.config.noremove){
			var remove = $("<i>").appendTo(this.obj);
			//remove.addClass("fa fa-times");
			remove.html("×");
			remove.attr("title", "清空");
			remove.click(function(){
				thisPlugin.setData("");
				//清空方法
				if(!JL.isNull(thisPlugin.config.listener.remove)){
					if(thisPlugin.config.listener.remove(thisPlugin)){
						return false;
					}
				}
				//自定义查询回填结果清空使用方法
				if(!JL.isNull(thisPlugin.config.listener.queryremove)){
					thisPlugin.config.listener.queryremove(thisPlugin);
				}
			});
			this.remove = remove;
		}
		
		this.input = input;
		if(!JL.isNull(this.config.default)){
			this.setData(this.config.default);
		}
	}
	this.init();
};

