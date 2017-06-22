var JLRadio = function(json){
	this.config = {
		"default": null, //默认选中
		"css": null, //选项样式
		"options": {}, //选项
		"listener": {}, //监听事件 click
		"fixValue": null // 强制赋值
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
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		} else {
			this.data = {};
			this.obj.find(".jl_input_radio").removeClass("font_color");
			this.obj.find(".jl_input_radio > i.fa-dot-circle-o").addClass("fa-circle-o");
			this.obj.find(".jl_input_radio > i.fa-dot-circle-o").removeClass("fa-dot-circle-o");
		}
	};
	
	this.setData = function(data){
		if(!JL.isNull(thisPlugin.config["fixValue"]) 
				&& JL.checkInitField(thisPlugin.config.id, thisPlugin.form)){
			this.data = this.obj.find(".jl_input_radio[key='"+thisPlugin.config["fixValue"]+"']").data();
			this.obj.find(".jl_input_radio").removeClass("font_color");
			this.obj.find(".jl_input_radio > i.fa-dot-circle-o").addClass("fa-circle-o");
			this.obj.find(".jl_input_radio > i.fa-dot-circle-o").removeClass("fa-dot-circle-o");
			
			this.obj.find(".jl_input_radio[key='"+this.data.key+"']").addClass("font_color");
			var i = this.obj.find(".jl_input_radio[key='"+this.data.key+"'] > i");
			JL.changeClass(i, "fa-circle-o", "fa-dot-circle-o");
		}else{
			if(!JL.isNull(data)){
				if((typeof data == "string" || typeof data == "number") && this.obj.find(".jl_input_radio[key='"+data+"']").length > 0){
					this.data = this.obj.find(".jl_input_radio[key='"+data+"']").data();
				}else if(this.obj.find(".jl_input_radio[key='"+data.key+"']").length > 0){
					this.data = data;
				}
				
				this.obj.find(".jl_input_radio").removeClass("font_color");
				this.obj.find(".jl_input_radio > i.fa-dot-circle-o").addClass("fa-circle-o");
				this.obj.find(".jl_input_radio > i.fa-dot-circle-o").removeClass("fa-dot-circle-o");
				
				this.obj.find(".jl_input_radio[key='"+this.data.key+"']").addClass("font_color");
				var i = this.obj.find(".jl_input_radio[key='"+this.data.key+"'] > i");
				JL.changeClass(i, "fa-circle-o", "fa-dot-circle-o");
			}else{
				this.data = {};
				this.obj.find(".jl_input_radio").removeClass("font_color");
				this.obj.find(".jl_input_radio > i.fa-dot-circle-o").addClass("fa-circle-o");
				this.obj.find(".jl_input_radio > i.fa-dot-circle-o").removeClass("fa-dot-circle-o");
			}
		} 
	}
	
	this.getData = function(key){
		if(!JL.isNull(key)){
			return this.data[key];
		}else{
			return this.data;
		}
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			thisPlugin.obj.prepend("<div disabled style='position: absolute;width: 100%;min-height: 40px;'></div>");
			thisPlugin.obj.find(".jl_input_radio").addClass("font_gray");
		}else{
			thisPlugin.obj.find("div[disabled]").remove();
			thisPlugin.obj.find(".font_gray").removeClass("font_gray");
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
		
		$.each(this.config.options, function(key, value){
			if(typeof value == "object"){
				key = value.key;
				value = value.value;
			}
			var jl_input_radio = $("<div>").addClass("jl_input_radio").appendTo(thisPlugin.obj);
			if(!JL.isNull(thisPlugin.config.css)){
				jl_input_radio.addClass(thisPlugin.config.css);
			}
			jl_input_radio.append("<i class='fa fa-circle-o'></i><span>"+value+"</span>");
			jl_input_radio.attr("key",key);
			jl_input_radio.data({"key":key,"value":value});
			jl_input_radio.click(function(){
				var data = $(this).data();
				if(!JL.isNull(thisPlugin.config.listener.change) && data.key != thisPlugin.data.key){
					thisPlugin.config.listener.change(data);
				}
				thisPlugin.data = data;
				if(!JL.isNull(thisPlugin.config.cds)){
					thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
				}
				if(!JL.isNull(thisPlugin.config.listener.click)){
					thisPlugin.config.listener.click(data, thisPlugin);
				}
			});
			if(!JL.isNull(thisPlugin.config["fixValue"]) 
					&& JL.isNull(thisPlugin.data) 
					&& thisPlugin.config["fixValue"] == key 
					&& JL.checkInitField(thisPlugin.config.id, thisPlugin.form)){
				thisPlugin.data = {"key":key,"value":value};
				jl_input_radio.find("i").removeClass("fa-circle-o");
				jl_input_radio.find("i").addClass("fa-dot-circle-o");
				jl_input_radio.addClass("font_color");
			}
			if(!JL.isNull(thisPlugin.config["default"]) 
					&& JL.isNull(thisPlugin.data) 
					&& thisPlugin.config["default"] == key){
				thisPlugin.data = {"key":key,"value":value};
				jl_input_radio.find("i").removeClass("fa-circle-o");
				jl_input_radio.find("i").addClass("fa-dot-circle-o");
				jl_input_radio.addClass("font_color");
			}
		});	
	}
	this.init();
};

