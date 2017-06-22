var JLAddress = function(json) {
	this.config = {
		"param" : {},//接口传递参数 
		"sBillName" : "jlquery",//接口路径(有默认值)
		"sOperateName" : "select.do",//接口方法(有默认值)
		"multi" : true,
		"text": true,
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"listener":{}//监听事件 change|keyup
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.level = 1;
	this.data = [];
	
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
			this.data = [];
			this.text.val("");
		}
	};
	
	this.setData = function(data) {
		this.data = data;
		var html = "";
		for(var i=0;i<data.length;i++){
			var row = data[i];
			if(row.KEY == "0"){
				this.main.find("textarea").val(row.VALUE);
			}else{
				this.main.find("[name='"+row.KEY+"']").click();
			}
			html += row.VALUE +" ";
		}
		this.text.val(html);
	}

	this.getData = function() {
		return this.data;
	}
	
	this.setText = function(data) {  
		this.text.val(data); 
	}

	this.getText = function() {
		return this.text.val();
	}

	this.loadData = function(param) {
		var arry = [];
		if (!JL.isNull(this.config.sBillName)
				&& !JL.isNull(this.config.sOperateName)) {
			var transport = new JLTransport(); 
			
			param = JL.isNull(param)? {}: param;
			if(!JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
				var XmlData={};
				XmlData["sqlid"] = this.config.sqlid;
				XmlData["DataBaseType"] = this.config.resource;
				$.extend(XmlData, userInfo);
				param = XmlData;
			}
			if(!JL.isNull(this.config.param)){
				$.extend(param, this.config.param);
			}
			
			var resultData = transport.select(this.config.sBillName,this.config.sOperateName, param);
            if(typeof resultData == "object"){
            	if($.isArray(resultData)){ 
 					for(var i=0; i<resultData.length; i++){ 
 						var row = resultData[i];
 						arry.push(row);  
 					}
 				}else{
 					result = resultData;
 				}
 			}
		
			if (!JL.isNull(arry)) {
				return arry;
			}
		}
		return [];
	}

	this.init = function() {
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		var delete_input = $("<div>").appendTo(this.obj); 
		delete_input.addClass("delete_input");
		
		var text = $("<input>").appendTo(delete_input); 
		text.attr("type", "text");
		text.attr("readonly", "readonly");
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", placeholder);
		}
		
		if(!this.config.readonly){
			var remove = $("<i>").appendTo(delete_input);
			//remove.addClass("fa fa-times");
			remove.html("×");
			remove.attr("title", "清空");
			remove.click(function(){
				thisPlugin.data = [];
				thisPlugin.text.val("");
				thisPlugin.address_title.find("[level='1']").html("请选择");
				thisPlugin.address_title.find("[level='1']").click();
				thisPlugin.address_title.find("[level='1']").nextAll(":not([level='0'])").remove();
				
				thisPlugin.main.find(".address_choose[level='1']").nextAll().remove();
				//清空方法
				if(!JL.isNull(thisPlugin.config.listener.remove)){
					if(thisPlugin.config.listener.remove(thisPlugin)){
						return false;
					}
				}
			});
			this.remove = remove;
		}
		
		this.span = $("<span class='jl_btn btn_white xuan icon'><i class='fa fa-angle-down'></i></span>").appendTo(this.obj);
		
		var jl_dropdown_menu = $("<div>").appendTo(this.obj);
		jl_dropdown_menu.addClass("jl_dropdown_menu w12");

		var jl_address = $("<div>").appendTo(jl_dropdown_menu);
		jl_address.addClass("jl_address");

		var main = $("<div>").appendTo(jl_address);
		main.addClass("addr_box");

		var address_title = $("<ul>").appendTo(main);
		address_title.addClass("address_title w12");
		var ul_level = $("<li class='xuan'>").appendTo(address_title);
		ul_level.attr("level", 1);
		ul_level.html("请选择");
		ul_level.click(function(){
			var level = $(this).attr("level");
			$(this).siblings(".xuan").removeClass("xuan");
			$(this).addClass("xuan");

			thisPlugin.main.find(".address_choose").hide(); 
			thisPlugin.main.find("div[level='"+ 1 +"']").show(); 
		});

		if(thisPlugin.config.text){
			var ul_level = $("<li>").appendTo(address_title);
			ul_level.attr("level", 0);
			ul_level.html("详细地址");
			ul_level.click(function(){
				var level = $(this).attr("level");
				$(this).siblings(".xuan").removeClass("xuan");
				$(this).addClass("xuan");
				
				thisPlugin.main.find(".address_choose").hide(); 
				thisPlugin.main.find("div[level='"+ 0 +"']").show(); 
			});

			var address_choose = $("<div>").appendTo(main);
			address_choose.attr("level", "0");
			address_choose.addClass("address_choose w12 hide");
			address_choose.html("<textarea class='w12' style='min-height:150px' placeholder='请填写详细地址'></textarea>");
			
			var qd = $("<a>确定</a>").appendTo(address_choose);
			qd.addClass("jl_btn btn_color mt5");
			qd.css({"margin": 0});
			qd.click(function(){
				thisPlugin.obj.find(".jl_dropdown_menu").hide();
				thisPlugin.data = [];
				var html = "";
				var titles = thisPlugin.address_title.children("li");
				for(var j=0;j<titles.length;j++){
					var row = $(titles[j]);
					if(row.attr("level") == "0"){
						html += thisPlugin.obj.find("textarea").val() + " ";
						thisPlugin.data.push({"KEY":"0","VALUE":thisPlugin.obj.find("textarea").val()});
					}else{
						html += row.data("VALUE") + " ";
						thisPlugin.data.push(row.data());
					}
				}
				thisPlugin.text.val(html);
				
				if(!JL.isNull(thisPlugin.config.cds)){
					thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
				}
	
				if(JL.isFunction(thisPlugin.config.listener.click)){
					thisPlugin.config.listener.click();
				} 
			});
	
			var cz = $("<a>重置</a>").appendTo(address_choose);
			cz.addClass("jl_btn btn_color mt5 ml10");
			cz.css({"margin": 0});
			cz.click(function(){
				thisPlugin.data = [];
				thisPlugin.text.val("");
				thisPlugin.address_title.find("[level='1']").html("请选择");
				thisPlugin.address_title.find("[level='1']").click();
				thisPlugin.address_title.find("[level='1']").nextAll(":not([level='0'])").remove();
				
				thisPlugin.main.find(".address_choose[level='1']").nextAll().remove();
			});
		}

		this.address_title = address_title;
		this.main = main;
		this.text = text;
		this.loadOption(this.loadData());
		var address_choose = this.main.find(".address_choose:eq(0)");
		
		var repeat = function(div){
			div.find("ul li:eq(0)").click();
			if(div.next().length > 0){
				repeat(div.next());
			}
		}
		//repeat(address_choose);
	}
	
	this.disabled = function(boolean){
		this.obj.find(".jl_dropdown_menu").hide();
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.text.attr("disabled","disabled");
			this.span.hide();
			if(!JL.isNull(this.remove)){
				this.remove.hide();
			}
		}else{
			this.text.removeAttr("disabled");
			this.span.show();
			if(!JL.isNull(this.remove)){
				this.remove.show();
			}
		}
	};

	this.loadOption = function(resultData, div_level) {
		var address_choose = $("<div>").appendTo(this.main);
		address_choose.addClass("address_choose w12");
		div_level = JL.isNull(div_level)? 1: div_level;
		address_choose.attr("level", div_level);

		var ul = $("<ul>").appendTo(address_choose);
		ul.addClass("w12");
		
		for(var i=0; i<resultData.length; i++){
			var row = resultData[i];
			var li = $("<li>").appendTo(ul);
			li.addClass("w03");
			li.data(row);
			li.attr("level", div_level);
			li.attr("name", row.KEY);
			li.attr("title", row.VALUE);
			li.append("<a>"+ row.VALUE +" </a>");
			li.click(function(){
				var data = $(this).data();
				var level = Number($(this).attr("level"));
				
				var title = thisPlugin.address_title; 
				var ul_level = title.find("[level='"+level+"']");
				if(ul_level.length == 0){
					ul_level = $("<li>");
					ul_level.attr("level", level);
					if(!thisPlugin.config.text){
						ul_level.appendTo(title);
					}else{
						title.find("[level='0']").before(ul_level);
					}
				}
				ul_level.data(data);
				ul_level.html(data.VALUE+" ");
				ul_level.click(function(){
					var level = $(this).attr("level");
					$(this).siblings(".xuan").removeClass("xuan");
					$(this).addClass("xuan");

					thisPlugin.main.find(".address_choose").hide(); 
					thisPlugin.main.find("div[level='"+ level +"']").show(); 
				});
				
				
				ul_level.siblings(".xuan").addBack().removeClass("xuan");
				var level_lis = ul_level.nextAll(":not([level='0'])");
				for(var j=0; j<level_lis.length; j++){
					var level_li = $(level_lis[j]);
					thisPlugin.main.find("div[level='"+level_li.attr("level")+"']").remove(); 
					level_li.remove();
				}
				
				
				if(data.MJBJ == 0){
					thisPlugin.main.find(".address_choose").hide();
					console.info(thisPlugin.loadData({"PARENT":data.KEY}));
					var next_li = $("<li level='"+(level+1)+"'>请选择</li>");
					if(!thisPlugin.config.text){
						next_li.appendTo(title);
					}else{
						title.find("[level='0']").before(next_li);
					}
					next_li.addClass("xuan");
					next_li.click(function(){
						var level = $(this).attr("level");
						$(this).siblings(".xuan").removeClass("xuan");
						$(this).addClass("xuan");

						thisPlugin.main.find(".address_choose").hide(); 
						thisPlugin.main.find("div[level='"+ level +"']").show(); 
					});
					thisPlugin.loadOption(thisPlugin.loadData({"PARENT":data.KEY}), level+1);
				}else{
					if(!thisPlugin.config.text){
						ul_level.addClass("xuan");
						thisPlugin.obj.find(".jl_dropdown_menu").hide();
						thisPlugin.data = [];
						var titles = title.children("li");
						for(var j=0;j<titles.length;j++){
							thisPlugin.data.push($.extend({}, $(titles[j]).data()));
						}
						thisPlugin.text.val(title.text());
						
						if(!JL.isNull(thisPlugin.config.cds)){
							thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
						}

						if(!JL.isNull(thisPlugin.config.listener.click)){
							thisPlugin.config.listener.click(data);
						} 
					}else{
						title.find("[level='0']").click();
					}
				}
			});
		}
	}

	this.init();
}
