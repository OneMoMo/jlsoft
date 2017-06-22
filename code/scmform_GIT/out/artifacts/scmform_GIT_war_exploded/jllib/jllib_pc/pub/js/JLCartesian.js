var JLCartesian = function(json){
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
		this.data = data;
		this.result.empty();
		var text = "";
		for(var i=0; i<data.length; i++){
			var data_id = "",html = "";
			$.each(data[i], function(key, value){
				if(typeof value == "object"){
					data_id += value.key + "_";
					html += value.value + " ";
				}
			});
			text += html;
			if(i < data.length - 1){
				text += "、";
			}
			var li = $("<li data-id='"+data_id+"' class='w12 text_hide' title='"+html+"'><i class='fa fa-square-o mr5'></i>"+html+"</li>").appendTo(thisPlugin.result);
			li.data(data[i]);	
		}
		this.text.val();
	};
	
	this.getData = function(){
		return this.data;
	};
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		}else{
			this.data = {};
			this.text.val("");
		}
	};
	
	this.loadData = function(row){
	//	debugger;
		var result = {};
		if(!JL.isNull(row.options)){
			result = row.options;
		}else{
			var param = row.param;
			if( !JL.isNull(row.sqlid) && !JL.isNull(row.resource) ){
				var XmlData={};
				XmlData["sqlid"] = row.sqlid;
				XmlData["DataBaseType"] = row.resource;
				$.extend(XmlData, userInfo);
				$.extend(XmlData, row.param);
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
						row.options = result;
					}
				}else if(!JL.isNull(resultData)){
					if(resultData.data != undefined){
						result = {};
						row.options = {};
					}else {
						result = resultData;
						row.options = result;
					}
				}else{
					result = {};
					row.options = {};
				}
			}
		}
		return result;
	};
	
	this.loadOption = function(ul, row){
		ul.empty();
		var options = this.loadData(row);
		if(!JL.isNull(options)){
			$.each(options, function(key, value){
				var li = $("<li>").appendTo(ul);
				li.addClass("w12 text_hide");
				li.attr("title", value);
				li.attr("data-key", key);
				li.append("<i class='fa fa-square-o mr5'></i>"+value);
				li.data({"key":key,"value":value});
			});
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
			thisPlugin.setData(thisPlugin.data);
		});

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
		var jl_dropdown_menu = $("<div>").appendTo(this.obj);
		jl_dropdown_menu.addClass("jl_dropdown_menu jl_datamerge");
		
		var jl_dropdown_menu_title = $("<div>").appendTo(jl_dropdown_menu);
		jl_dropdown_menu_title.addClass("jl_dropdown_menu_title min_w12");
		var dl = $("<dl>").appendTo(jl_dropdown_menu_title);
		dl.on("click", "i", function(){
			var data_id = $(this).parent().attr("data-id");
			var ul = $(this).closest(".jl_dropdown_menu_title").nextAll("[data-id='"+data_id+"']");
			if($(this).hasClass("fa-square-o")){
				ul.find(".fa-square-o").click();
				JL.changeClass($(this), "fa-square-o", "fa-check-square font_blue")
			}else if($(this).hasClass("fa-check-square")){
				ul.find(".fa-check-square").click();
				JL.changeClass($(this), "fa-check-square font_blue", "fa-square-o");
			}
		});
		for(var i=0;i<this.config.header.length;i++){
			var row = this.config.header[i];
			dl.append("<dd data-id='"+row.id+"' style='width:150px'><i class='fa fa-square-o mr5'></i>"+row.name+"</dd>");
			
			var ul = $("<ul>").appendTo(jl_dropdown_menu);
			ul.attr("data-id", row.id);
			ul.css("width", "150px");
			
			this.loadOption(ul, row);
		}
		jl_dropdown_menu_title.append("<dd style='width:300px; margin-left:70px;'><i class='fa fa-square-o mr5'></i>结果</dd>");
		jl_dropdown_menu_title.css("width", (this.config.header.length*150 + 370) +"px");
		
		jl_dropdown_menu.on("click", "li", function(){
			var fa = $(this).find("i");
			if(fa.hasClass("fa-square-o")){
				JL.changeClass(fa, "fa-square-o", "fa-check-square")
				$(this).addClass("xuan");
			}else if(fa.hasClass("fa-check-square")){
				JL.changeClass(fa, "fa-check-square", "fa-square-o");
				$(this).removeClass("xuan");
			}
		});
		
		var change = $("<div>").appendTo(jl_dropdown_menu);
		change.addClass("change");
		var plus = $("<i class='fa fa-plus btn_color' style='margin-top:70px'></i>").appendTo(change);
		plus.click(function(){
			var uls = $(this).closest(".change").siblings("[data-id]");
			var arr = [];
			for(var i=0; i<uls.length; i++){
				var arr2 = [];
				var data_id = $(uls[i]).attr("data-id");
				var lis = $(uls[i]).find("> .xuan");
				for(var j=0; j<lis.length; j++){
					var json = {};
					json[data_id] = $(lis[j]).data(); 
					arr2.push(json);
				}
				if(arr2.length > 0){
					arr.push(arr2);
				}
			}
			
			var DKEJ = JL.diKaErJi(arr);//笛卡尔积
			var text = ""
			for(var i=0; i<DKEJ.length; i++){
				var row = DKEJ[i];
				var html = "";
				var data_id = "";
				var rowData = {};
				for(var j=0; j<row.length; j++){
					$.extend(rowData, row[j]);
					$.each(row[j], function(key, value){
						data_id += value.key + "_";
						html += value.value + " ";
					});
				}
				text += html;
				if(i < DKEJ.length - 1){
					text += "、";
				}
				if(thisPlugin.result.find("[data-id='"+data_id+"']").length == 0){
					var li = $("<li data-id='"+data_id+"' class='w12 text_hide' title='"+html+"'><i class='fa fa-square-o mr5'></i>"+html+"</li>").appendTo(thisPlugin.result);
					li.data(rowData);	
				}
			}
			thisPlugin.text.val(text);
		});
		var minus = $("<i class='fa fa-minus btn_color mt10' style='margin-top:70px'></i>").appendTo(change);
		minus.click(function(){
			$(this).closest(".change").next().find("> .xuan").remove();
		});
		
		var result = $("<ul>").appendTo(jl_dropdown_menu);
		result.css("width", "300px");

		var bottom = $("<div>").appendTo(jl_dropdown_menu);
		bottom.addClass("w12 mt10 mb10 pl10");
		var qd = $("<a class='jl_btn btn_color'><i class='fa fa-gavel mr5'></i>确定</a>").appendTo(bottom);
		qd.click(function(){
			thisPlugin.data = []
			var lis = thisPlugin.result.find("li");
			for(var i=0; i<lis.length; i++){
				thisPlugin.data.push($(lis[i]).data());	
			}
			$(this).closest(".jl_dropdown_menu").hide();
		});
		var cz = $("<a class='jl_btn btn_color ml10'><i class='fa fa-gavel mr5'></i>重置</a>").appendTo(bottom);
		cz.click(function(){
			thisPlugin.obj.find(".xuan").click();
			thisPlugin.result.empty();
		});
		
		this.text = text;
		this.span = span;
		this.result = result;
	};
	this.init();
};