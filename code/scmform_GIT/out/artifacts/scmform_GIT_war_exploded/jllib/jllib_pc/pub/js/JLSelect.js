var JLSelect = function(json){
	this.config = {
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"readonly": true,//只读属性 true|false
		"placeholder": null,//提示文字
		"sBillName": pubJson.getURL("FormUrl") + "/jlquery",//接口路径(有默认值)
		"sOperateName": "select.do",//接口方法(有默认值)
		"param": {},//接口传递参数
		"default": "",//默认值
		"options": {},//静态下拉选项
		"attached": {},
		"listener": {}//监听事件 change|keyup
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
	
	this.setData = function(data){
		if(typeof data == "string" || typeof data == "number"){
			if(this.obj.find(".jl_dropdown_menu").find("> li").length == 0){
				this.loadOption();
			}
			this.data = this.obj.find("li[data-key='"+data+"']").data();
		}else{
			this.data = data;
		}
		if (this.data==null){
			this.text.val("");
		}else{
			this.text.val(this.data.value);
		}
		if(!JL.isNull(thisPlugin.config.listener.change)){
			thisPlugin.config.listener.change(data, thisPlugin);
		}
	};
	
	this.getData = function(key){
		if(JL.isNull(key)){
			return this.data;
		}else{
			return this.data[key];
		}
	};

	this.getResult = function(key, filter){
		if(JL.isNull(filter)){
			return this.config.attached[key] || {};
		} else {
			return this.config.attached[key][filter] || {};
		}
	};
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		}else{
			this.data = {};
			this.text.val("");
		}
	};
	
	this.loadData = function(){
	//	debugger;
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

			if(typeof resultData == "object"){
				if(!JL.isNull(resultData.resultlist)){
					resultData = resultData.resultlist;
				}
				if($.isArray(resultData)){
					for(var i=0; i<resultData.length; i++){
						var key = resultData[i].KEY;
						var value = resultData[i].VALUE;
						result[key] = value;
						this.config.options = result;
						this.config.attached[key] = resultData[i];
					}
				}else if(!JL.isNull(resultData)){
					if(resultData.data != undefined){
						result = {};
						this.config.options = {};
						this.config.attached = {};
					}else {
						result = resultData;
						this.config.options = result;
						this.config.attached = {};
					}
				}else{
					result = {};
					this.config.options = {};
				}
			}
		}
		return result;
	};
	
	this.loadOption = function(){
		var ul = this.ul;
		ul.empty();
		
		var search = $("<div>").appendTo(ul);
		search.addClass("w12 delete_input");
		search.css({
			"position": "absolute",
	    	"z-index": "1",
	    	"top": "0"
		});
		var t = $("<input type='text' placeholder='请输入关键字查找'/>").appendTo(search);
		t.keyup(function(){
			var lis = $(this).parent().siblings();
			lis.hide();
			for(var i=0; i<lis.length; i++){
				debugger;
				var li = $(lis[i]);
				if(li.text().toUpperCase().indexOf($(this).val().toUpperCase()) != -1){
					li.show();
				}
			}
		});
		var i = $("<i title='清空'>×</i>").appendTo(search);
		i.click(function(){
			$(this).prev().val("");
			$(this).parent().siblings().show();
		});
		search.appendTo(ul);
		
		var options = this.loadData();
		if(!JL.isNull(options)){
			$.each(options, function(key, value){
				var li = $("<li>").appendTo(ul);
				li.append("<a>"+value+"</a>");
				li.attr("data-key", key);
				li.data({"key":key,"value":value});
				li.click(function(){
					var data = $(this).data();
					thisPlugin.setData(data);
					if(!JL.isNull(thisPlugin.config.cds)){
						thisPlugin.getCds().put(thisPlugin.config["cds-field"], data);
					}
					thisPlugin.ul.hide();
					if(!JL.isNull(thisPlugin.config.listener.gridchange)){
						thisPlugin.config.listener.gridchange($(this), data);
					}
				});
				
				if(thisPlugin.config.default == key && JL.isNull(thisPlugin.data)){
					thisPlugin.setData(li.data());
				}
			});
			if(thisPlugin.config.default == "auto" && JL.isNull(thisPlugin.data)){
				thisPlugin.setData(ul.find("li:first").data());
			}else if(thisPlugin.config.default == "last" && JL.isNull(thisPlugin.data)){
				thisPlugin.setData(ul.find("li:last").data());
			}
		}
	};
	
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
	
	this.hide = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.obj.hide();
		}else{
			this.obj.show();
		}
	};
	
	this.init = function(json){
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		$(this.obj).click(function(){
			if(!JL.isNull(thisPlugin.config.listener.click)){
				if(thisPlugin.config.listener.click()){
					return false;
				}
			}
		});
		
		var delete_input = $("<div>").addClass("w12 delete_input").appendTo(this.obj);
		
		var text = $("<input>").appendTo(delete_input);
		text.attr("type", "text");
		text.attr("name", this.config.id);
		if(!JL.isNull(this.config.readonly)){
			text.attr("readonly", this.config.readonly);
		}
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", this.config.placeholder);
		}
		text.focus(function(e){
			thisPlugin.span.addClass("xuan");
			
			$(this).parent().nextAll(".jl_dropdown_menu").find(":first > i").click();
			
			if($(this).closest(".delete_input").nextAll(".jl_dropdown_menu").find("> li").length == 0){
				thisPlugin.loadOption();
			}
		});
		if(thisPlugin.config.readonly != true){
			text.focus(function(e){
				var hover = $(this).parent().next().next().find("li.hover");
				hover.removeClass("hover");
				var lis = $(this).parent().next().next().find("li");
				lis.show();
				/*for(var i=0;i<lis.length;i++){
					var li = $(lis[i]);
					if(li.text().indexOf(this.value) != -1){
						li.show();
					}
				}*/
			});
			text.keyup(function(e){
				var ul = thisPlugin.ul;
				var li = ul.find("li:not(:hidden)");
				var hover = ul.find("li.hover");
				if(e.keyCode == 38){
					var prev = null;
					if(hover.length > 0){
						if(hover.prevAll("li:not(:hidden):eq(0)").length > 0){
							hover.removeClass("hover");
							prev = hover.prevAll("li:not(:hidden):eq(0)");
						}else{
							prev = li.last();
						}
					}
					
					if(prev != null){
						prev.addClass("hover");
						if(prev.position().top <= 0 || prev.position().top > ul.height()){
							ul.scrollTop(prev.prop("offsetTop"));
						}
					}
				} else if(e.keyCode == 40){
					var next = null; 
					if(hover.length == 0 && li.length > 0){
						next = li.eq(0); 
					}else if(hover.length > 0){
						if(hover.nextAll("li:not(:hidden):eq(0)").length > 0){
							hover.removeClass("hover");
							next = hover.nextAll("li:not(:hidden):eq(0)");
						}else{
							next = li.eq(0);
						}
					}
					
					if(next != null){
						next.addClass("hover");
						if(next.position().top > ul.height() || next.position().top <= 0){
							ul.scrollTop(next.prop("offsetTop") - ul.height());
						}
					}
				} else {
					if(hover.length > 0 && e.keyCode == 13){
						hover.click();
					}
					hover.removeClass("hover");
					var lis = ul.find("li");
					lis.hide();
					for(var i=0;i<lis.length;i++){
						var li = $(lis[i]);
						if(li.text().indexOf(this.value) != -1){
							li.show();
						}
					}
					thisPlugin.data = {};
					for(var i=0;i<lis.length;i++){
						var li = $(lis[i]);
						if(li.text() == this.value){
							thisPlugin.data = li.data();
							break;
						}
					}
					if(!JL.isNull(thisPlugin.config.listener.keyup)){
						thisPlugin.config.listener.keyup($(this).val());
					}
				}
			});
		}

		if(!this.config.noremove){
			var remove = $("<i>").appendTo(delete_input);
			remove.html("×");
			remove.attr("title", "清空");
			remove.click(function(){
				thisPlugin.setData({});
				//清空方法
				if(!JL.isNull(thisPlugin.config.listener.remove)){
					if(thisPlugin.config.listener.remove(thisPlugin)){
						return false;
					}
				}
			});
			this.remove = remove;
		}
		
		var i_fa = JL.isNull(this.config.fa)? "angle-down": this.config.fa;
		
		var span = $("<span class='jl_btn btn_white'><i class='fa fa-"+i_fa+"'></i></span>").appendTo(this.obj);
		var ul = $("<ul>").appendTo(this.obj);
		ul.addClass("w12 jl_dropdown_menu overflow_y pt30");
		ul.css({"max-height": "250px"});
		
		this.text = text;
		this.span = span;
		this.ul = ul;
		
		//有默认值自动加载
		if(!JL.isNull(thisPlugin.config.default) || !JL.isNull(thisPlugin.config.options)){
			thisPlugin.loadOption();
		}
	};
	this.init();
};