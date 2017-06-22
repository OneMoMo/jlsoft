var JLMultiSelect = function(json){
	this.config = {
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"readonly": true,//只读属性 true|false
		"placeholder": null,//提示文字
		"sBillName": pubJson.getURL("FormUrl") + "/jlquery",//接口路径(有默认值)
		"sOperateName": "select.do",//接口方法(有默认值)
		"addParam": null,//接口传递参数
		"param": {},//接口传递参数
		"default": "",//默认值
		"options": {},//静态下拉选项
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
	this.data = [];
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setData = function(data){
		JL.changeClass(this.ul.find("> .font_blue i"), "fa-check-square", "fa-square-o");
		this.ul.find("> .font_blue").removeClass("font_blue");
		this.text.val("");
		
		if(!JL.isNull(data)){
			if(this.obj.find(".jl_dropdown_menu").find("> li").length == 0){
				this.loadOption();
			}
			
			if(typeof data == "object"){
				if($.isArray(data)){
					this.data = [];
					var val = "";
					for(var i=0; i<data.length; i++){
						var checkbox = this.ul.find("> [data-key='"+data[i].key+"']");
						checkbox.addClass("font_blue");
						JL.changeClass(checkbox.find("i"), "fa-square-o", "fa-check-square");
						this.data.push(checkbox.data());
						
						val += checkbox.data("value");
						if(i < data.length-1){
							val += "; "
						}
					}
					this.text.val(val);
				}
			}else{
				this.ul.find("[data-key='"+data+"']").click();
			}
		}else{
			this.data = [];
		}
	};
	
	this.getData = function(){
		return this.data;
	};

	this.setText = function(val){
		this.text.val(val);
	};
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		}else{
			this.data = [];
			this.text.val("");
		}
	};
	
	this.loadData = function(){
		var result = {};
		if(!JL.isNull(this.config.options)){
			result = this.config.options;
		}else{
			var param = this.config.param;
			if(JL.isFunction(this.config.addParam)){
				$.extend(param, this.config.addParam());
			}
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
				if($.isArray(resultData)){
					for(var i=0; i<resultData.length; i++){
						if(JL.isNull(this.config.header)){
							var key = resultData[i].KEY;
							var value = resultData[i].VALUE;
							result[key] = value;
						}else{
							resultData[i].key = resultData[i].KEY;
							resultData[i].value = resultData[i].VALUE;
						}
					}
					if(!JL.isNull(this.config.header)){
						result = resultData;
					}
				}else if(!JL.isNull(resultData)){
					if(resultData.data != undefined){
						result = {};
					}else {
						result = resultData;
					}
				}else{
					result = {};
				}
			}
		}
		return result;
	};
	
	this.loadHeader = function(div){
		if(!JL.isNull(this.config.header)){
			var headers = this.config.header;
			for(var i=0; i<headers.length; i++){
				var header = headers[i];
				$("<span class='"+(header.css || "")+"'>"+(header.title || "")+"</span>").appendTo(div);
			}
		} else {
			$("<span class='w12'>全选</span>").appendTo(div);
		}
	};

	this.appendRow = function(data){
		var li = $("<li>").appendTo(this.ul);
		var div = $("<div class='jl_input_checkbox checkbox_text w12 pl30'></div>").appendTo(li);
		var i = $("<i class='fa fa-square-o ml10 position_a left0 z_index1'></i>").appendTo(div);
		if(!JL.isNull(this.config.header)){
			var headers = this.config.header;
			for(var i=0; i<headers.length; i++){
				var header = headers[i];
				$("<span title='"+header.title+"' class='"+(header.css || "")+"'>"+data[header.id]+"</span>").appendTo(div);
			}
		} else {
			$("<span>"+ data.value + "</span>").appendTo(div);
		}
		li.attr("data-key", data.key);
		li.data(data);
		li.click(function(){
			if($(this).hasClass("font_blue")){
				$(this).removeClass("font_blue");
				JL.changeClass($(this).find("i.fa"), "fa-check-square", "fa-square-o");
			}else{
				$(this).addClass("font_blue");
				JL.changeClass($(this).find("i.fa"), "fa-square-o", "fa-check-square");
			}
			var data = $(this).data();

			var checked = thisPlugin.ul.find("> li[data-key].font_blue");
			thisPlugin.data = [];
			var val = "";
			for (var i = 0; i < checked.length; i++) {
				var data = $(checked[i]).data();
				thisPlugin.data.push(data);
				val += data.value;
				if(i < checked.length-1){
					val += "; ";
				}
			}
			thisPlugin.text.val(val);
			
			if(!JL.isNull(thisPlugin.config.cds)){
				thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
			}
			if (!JL.isNull(thisPlugin.config.listener.click)) {  
				thisPlugin.config.listener.click($(this).data());
			}
			if (!JL.isNull(thisPlugin.config.listener.change)) {  
				thisPlugin.config.listener.change(thisPlugin.getData(), thisPlugin);
			}
		});
		
		if(thisPlugin.config.default == data.key && JL.isNull(thisPlugin.data)){
			thisPlugin.setData(li.data());
		}
	};
	
	this.loadOption = function(){
		var ul = this.ul;
		ul.empty();
		ul.addClass("pt30");
		
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
		
		var li = $("<li>").appendTo(ul);
		var div = $("<div class='jl_input_checkbox checkbox_text w12 pl30'></div>").appendTo(li);
		var i = $("<i class='fa fa-square-o ml10 position_a left0 z_index1'></i>").appendTo(div);
		this.loadHeader(div);
		li.click(function(){
			if($(this).hasClass("font_blue")){
				$(this).removeClass("font_blue");
				JL.changeClass($(this).find("i.fa"), "fa-check-square", "fa-square-o");
				$(this).siblings(".font_blue").click();
				if(JL.isNull(thisPlugin.config.header)){
					$(this).find("span").html("全选");
				}
			}else{
				$(this).addClass("font_blue");
				JL.changeClass($(this).find("i.fa"), "fa-square-o", "fa-check-square");
				$(this).siblings(":not(.font_blue)").click();
				if(JL.isNull(thisPlugin.config.header)){
					$(this).find("span").html("取消全选");
				}
			}
		});
		
		var options = this.loadData();
		if(!JL.isNull(options)){
			if($.isArray(options)){
				for(var i=0; i<options.length; i++){
					thisPlugin.appendRow(options[i]);
				}
			}else{
				$.each(options, function(key, value){
					thisPlugin.appendRow({"key":key,"value":value});
				});
			}
			if(thisPlugin.config.default == "auto" && JL.isNull(thisPlugin.data)){
				thisPlugin.setData(ul.find("li:first").data());
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

			if($(this).parent().nextAll(".jl_dropdown_menu").find("> li").length == 0){
				thisPlugin.loadOption();
			}
		});

		if(!this.config.noremove){
			var remove = $("<i>").appendTo(delete_input);
			remove.html("×");
			remove.attr("title", "清空");
			remove.click(function(){
				thisPlugin.setData([]);
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
		ul.addClass("w12 jl_dropdown_menu overflow_y");
		ul.css({"max-height": "232px"});
		
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