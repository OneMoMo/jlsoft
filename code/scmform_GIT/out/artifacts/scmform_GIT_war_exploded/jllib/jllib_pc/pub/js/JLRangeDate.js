var JLRangeDate = function(json){
	this.config = {
		"text": true,
		"months": 1, //同时展示的日期
		"mode": "range", //选择模式 range范围|multiple多选|week星期
		"direction": "any", //past只能选今天之前的|today-past只能选今天之前的(含今天)|any所有|today-future只能选今天之后的(含今天)|future只能选今天之后的
		"disabledDay": [], //禁用日期 ["2016-03-14","2016-03-24","2016-04-14"]
		"blackout": function (date) {
			var rq = date.format(this.settings.format || 'YYYY-MM-DD');
			return $.inArray(rq, thisPlugin.config.disabledDay) == -1 ? 0: 1; //blackout every other day
		},
		//"selected":[Kalendae.moment("2016-05-14")],

		"subscribe": {},
		"listener": {}
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.setData = function(data){
		this.data = data;
		if(this.config.mode == "range" && data.length > 1){
			this.addSelected(data[0], data[data.length-1]);
		}else{
			this.addSelected(data);
		}
		if(!JL.isNull(this.config.text) && this.config.text == true){
			var val = "";
			if(data.length >=2 && this.config.mode == "range"){
				val = data[0] +" - "+data[data.length-1];
			}else{
				for (var i = 0; i < data.length; i++) {
					val += data[i];
					if(i < (data.length-1)){
						val += ",";
					}
				}
			}
			this.text.val(val+" 有效天数: "+data.length+"天");
		}
	}
	
	this.getData = function(){
		return this.data;
	}

	this.disabledDays = function(days){
		this.ka.setDisabledDay(days);
	}

	this.addSelected = function(date_s,date_e){
		if(this.config.mode == "range" && !JL.isNull(date_e)){
			this.ka.addSelected(date_s);
			this.ka.addSelected(date_e);
			console.info(this.getData());
		}else{
			for(var i=0;i<date_s.length;i++){
				this.ka.addSelected(date_s[i]);
			}
		}
	}
	
	this.init = function(){
		$(this.obj).empty();
		var date = this.obj[0]
		
		if(!JL.isNull(this.config.text) && this.config.text == true){
			var text = $("<input>").appendTo(this.obj);
			text.attr("type", "text");
			text.addClass("w12");
			
			text.focus(function(){
				$(this).next().show();
			});
			this.text = text;
			
			var div_date = $("<div>").appendTo(this.obj);
			div_date.addClass("hide");
			div_date.css({"top": "30px", "width": "2000px"});
			if(!JL.isNull(this.config.float)){
				div_date.css("float", "left");
			} else {
				div_date.css("position", "absolute");
			}
			div_date.mouseleave(function(){
				$(this).prev().blur();
				$(this).hide();
				console.info(thisPlugin.ka);
				thisPlugin.setData(thisPlugin.ka.getSelected());
			});
			date = div_date[0];
		}
		
		this.config.change = function(date,action){
			thisPlugin.data = thisPlugin.ka.getSelected();
			if(!JL.isNull(thisPlugin.config.listener.change)){
				thisPlugin.config.listener.change(thisPlugin.data);
			}
		}

		this.ka = new Kalendae(date, this.config);
	};
	this.init();
};