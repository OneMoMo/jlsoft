var JLDate = function(json){
	this.config = {
		"placeholder": "",
		"format": "yyyy-mm-dd",//日期时间格式
		"language": (function(){
			if(language != ""){
				if(language == "zh"){
					return "ch";
				}else{
					return language.replace("_","");
				}
			} else if(pubJson.defaultLanguage == "zh" || JL.isNull(pubJson.defaultLanguage)){
				return "ch";
			} else {
				return pubJson.defaultLanguage;
			}
		})(),//语言 ch(中文)|en(英文)
		"todayBtn": true,//选择今天的按钮
		"readonly": true,//只读 true|false
		"startDate": null,//最小可选日期
		"endDate": null,//最大可选日期
		"todayFormat": "",
		"daysOfWeekDisabled": null,//禁用星期几
		"defaultDate":null, //默认时间 
		"listener": {}//监听器 change
	};
	$.extend(this.config, json);	
	if(this.config.format.indexOf("h") != -1){
		this.config.pickTime=true;
	}
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
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		}else{
			this.setData("");
		}
	};
	
	this.setData = function(data){
		this.data = data;
		this.text.val(data);
	}
	
	this.getData = function(){
		return this.data;
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
	};
	
	this.init = function(){
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		var delete_input = $("<div>").appendTo(this.obj);
		delete_input.addClass("delete_input");
		var text = $("<input>").appendTo(delete_input);
		this.text = text;
		text.addClass("jl_time");
		text.attr("type", "text");
		text.attr("name", this.config.id);
		text.attr("readonly", this.config.readonly);
		/*if(!JL.isNull(this.config.readonly)){
			text.attr("readonly", this.config.readonly);
		}*/
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", this.config.placeholder);
		}
		if(!JL.isNull(this.config.defaultDate)){
			var date = "";
			if(typeof this.config.defaultDate == "string"){
				date = this.config.defaultDate;
			}else if(this.config.pickTime){
				date = JL.formatDate(this.config.defaultDate,2);
			}else{
				date = JL.formatDate(this.config.defaultDate,1);
			}
			this.setData(date);
		}
		if(!this.config.noremove){
			var remove = $("<i>").appendTo(delete_input);
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
		
		var span = $("<span class='jl_btn btn_white'><i class='fa fa-calendar'></i></span>").appendTo(this.obj);
		span.click(function(){
			text.focus();
		});
		
		this.config.onRender = function (date) {
			if(!JL.isNull(thisPlugin.config.beforeDate)){
				var checkin = null;
				if(!JL.isNull(thisPlugin.form)){
					checkin = thisPlugin.form.find(thisPlugin.config.beforeDate);
				}else{
					checkin = $(thisPlugin.config.beforeDate);
				}
				if(!JL.isNull(checkin) && checkin.length == 1){
					return date.valueOf() < checkin.data("datepicker").date.valueOf() && !JL.isNull(checkin.val()) ? 'disabled' : '';
				}
			}
			if(!JL.isNull(thisPlugin.config.afterDate)){
				var checkout = null;
				if(!JL.isNull(thisPlugin.form)){
					checkout = thisPlugin.form.find(thisPlugin.config.afterDate);
				}else{
					checkout = $(thisPlugin.config.afterDate);
				}
				if(!JL.isNull(checkout) && checkout.length == 1){
					return date.valueOf() > checkout.data("datepicker").date.valueOf() && !JL.isNull(checkout.val()) ? 'disabled' : '';
				}
			}
		}

		
		text.fdatepicker(this.config).on('changeDate', function(ev){
			text.focus().blur();
			console.info(ev);
			if(!JL.isNull(thisPlugin.config.afterDate)){
				var checkout = null;
				if(!JL.isNull(thisPlugin.form)){
					checkout = thisPlugin.form.find(thisPlugin.config.afterDate);
				}else{
					checkout = $(thisPlugin.config.afterDate).data("datepicker");
				}
				
				var datepicker = checkout.data("datepicker");
				if(!JL.isNull(datepicker) && ev.date.valueOf() >= datepicker.date.valueOf()) {
					datepicker.update(new Date(ev.date));
					var plugin = checkout.parent().parent().data("plugin");
					plugin.setData($(this).val());
				}
			}
		    if(!JL.isNull(thisPlugin.config.listener.select)){
				thisPlugin.config.listener.select(thisPlugin.getData(), $(this));
			} 
		    if(!JL.isNull(thisPlugin.config.listener.change)){
		    	thisPlugin.config.listener.change(thisPlugin.getData(), thisPlugin);
		    } 
		});
		text.blur(function(){
			thisPlugin.data = $(this).val();
			if(!JL.isNull(thisPlugin.config.cds)){
				thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
			}
			if(!JL.isNull(thisPlugin.config.listener.blur)){
		    	thisPlugin.config.listener.blur(thisPlugin.getData());
		    } 
		});
		
		this.fdatepicker = text.data('datepicker');
		this.span = span;
	};
	this.init();
	
	//$('.jl_time').fdatepicker({format: 'yyyy-mm-dd hh:ii',pickTime: true});
};