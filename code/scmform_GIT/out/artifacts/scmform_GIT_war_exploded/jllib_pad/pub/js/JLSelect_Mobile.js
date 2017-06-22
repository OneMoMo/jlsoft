var JLSelect_Mobile = function(json){
	this.config = {
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"readonly": null,//只读属性 true|false
		"placeholder": "",//提示文字
		"sBillName": pubJson.getURL("FormUrl")+"/jlquery",//接口路径(有默认值)
		"sOperateName": "select.do",//接口方法(有默认值)
		"param": {},//接口传递参数
		"default": "",//默认值
		"options": {},//静态下拉选项
		"listener": {}//监听事件 change|keyup
	};
	$.extend(this.config, json);	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = {};
	
	this.setData = function(data){
		this.data = data;
		this.obj.find(":text").val(data.value);
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.loadData = function(){
		var result = {};
		if(!JL.isNull(this.config.options)){
			result = this.config.options;
		}else{
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
			
			if(typeof resultData == "object" && $.isArray(resultData)){
				for(var i=0; i<resultData.length; i++){
					var key = resultData[i].KEY;
					var value = resultData[i].VALUE;
					result[key] = value;
				}
			}
		}
		return result;
	}
	
	this.loadOption = function(){
		var select = this.select;
		var options = this.loadData();
		if(!JL.isNull(options)){
			$.each(options, function(key, value){
				var option = $("<option>").appendTo(select);
				//option.append("<a>"+value+"</a>");
				option.attr("value", key);
				option.append(value);
				
				if(thisPlugin.config.default == key){
					option.attr("selected", "selected");
				}
			});
		}
		select.mobiscroll().select({  
	        "theme": "mobiscroll",  
	        "display": "bottom",
	        "lang": "zh",  
			"mode": "scroller", //日期选择模式
			"onSelect":function(valueText,inst){ 
				var data = {"key":inst.getValue(),"value":valueText};
				thisPlugin.setData(data);
				if(!JL.isNull(thisPlugin.config.listener.change)){
					thisPlugin.config.listener.change(data);
				}
	        }, 
	        "onShow": function(a,b,c,d){
	        	console.info(c);
	        	//c.disable();
	        }
	    });  
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.select.mobiscroll("disable");
		}else{
			this.select.mobiscroll("enable");
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
		var select = $("<select>").addClass("jl_dropdown_menu").appendTo(this.obj);
		var option = $("<option value=''>请选择"+this.config.placeholder+"</option>").appendTo(select);
		this.select = select;
		this.loadOption();
		select.prev(":text").addClass("w12");
	}
	this.init();
};