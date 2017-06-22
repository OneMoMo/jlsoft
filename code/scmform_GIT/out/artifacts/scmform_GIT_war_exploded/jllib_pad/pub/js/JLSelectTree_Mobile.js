var JLSelectTree_Mobile = function(json){
	this.config = {
		"param": {"type":"mongo"},	
		"listener": {},	
		"sBillName": "jlquery",
		"sOperateName": "select.do",
		"dataStructure": "list",
		"listener": {}	
	};
	$.extend(this.config, json);	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.setData = function(data){
		this.data = data;
		var str = "";
		for(var i=0; i<data.length; i++){
			str += data[i]["value"];
			if(i > 0){
				str += " ";
			}
		}
		this.obj.find(":text").val(str);
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
	
	this.loadOption = function(ul, options, index){
		index = JL.isNull(index)? 0: index;
		for(var i=0; i<options.length; i++){
			var option = options[i];
			var li = $("<li>").appendTo(ul);
			li.append("<a>"+ option.NAME +"</a>");
			li.attr("data-val", option.NAME);
			li.attr("data-index", index);
			li.data({"key": option.CODE,"value": option.NAME});
			
			if(!JL.isNull(option.item)){
				var jl_dropleft_menu = $("<ul>").appendTo(li);
				jl_dropleft_menu.addClass("jl_dropdown_menu jl_dropleft_menu")
				this.loadOption(jl_dropleft_menu, option.item, index+1);
			}
		}
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.ul.mobiscroll("disable");
		}else{
			this.ul.mobiscroll("enable");
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
		
		var ul = $("<ul>").addClass("jl_dropdown_menu").appendTo(this.obj);
		
		var options = this.loadData();
		this.loadOption(ul, options);
		
		this.ul = ul;
		ul.mobiscroll().treelist({  
	        "theme": "mobiscroll",  
	        "display": "bottom",
	        "lang": "zh",  
			"mode": "scroller", //日期选择模式
			"labels": ['Region', 'Country', 'City'] ,
			"onCancel": function(value,b,c,d){
			},
			"onSelect": function(value,b,c,d){
				var split = value.split(" ");
				thisPlugin.data = [];
				for(var i=0; i<split.length; i++){
					var row = split[i];
					var liData = thisPlugin.obj.find("li[data-val='"+row+"'][data-index='"+i+"']").data();
					thisPlugin.data.push(liData);
				}
				if(!JL.isNull(thisPlugin.config.listener.change)){
					thisPlugin.config.listener.change(thisPlugin.data);
				}
			},
			"onShow": function(value,b,c,d){
			},
			"onChange": function(value,b,c,d){
			}
	    });  
		this.obj.find(":text").addClass("w12");
	}
	this.init();
};