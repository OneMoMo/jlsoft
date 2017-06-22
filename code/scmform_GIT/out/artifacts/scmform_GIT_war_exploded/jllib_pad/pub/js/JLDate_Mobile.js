var JLDate_Mobile = function(json){
	this.config = {
		"theme": "mobiscroll",  
		"lang": "zh",  
        "display": "bottom",
		"preset": "datetime",
		"dateOrder": "yymmdd",
		"mode": "scroller", //日期选择模式
		"dateFormat": "yyyy-mm-dd",
		//"minDate": new Date(),
		"listener": {}//监听器 change
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = "";
	
	this.setData = function(data){
		this.data = data;
		this.obj.find(":text").val(data);
	};
	
	this.getData = function(){
		this.data = this.obj.find(":text").val(); 
		return this.data;
	};
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.text.mobiscroll("disable");
		}else{
			this.text.mobiscroll("enable");
		}
	};
	
	this.init = function(){
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		var text = $("<input>").appendTo(this.obj);
		text.addClass("jl_time");
		text.attr("type", "text");
		text.attr("name", this.config.id);
		if(!JL.isNull(this.config.readonly)){
			text.attr("readonly", this.config.readonly);
		}
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", this.config.placeholder);
		}
		
		text.mobiscroll().date(this.config);
		this.text = text;
	};
	this.init();
};
