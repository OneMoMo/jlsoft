var JLAddress = function(json) {
	this.config = {
		"param" : {},//接口传递参数 
		"sBillName" : "jlquery",//接口路径(有默认值)
		"sOperateName" : "select.do",//接口方法(有默认值)
		"multi" : true,
		"edit"  : true,
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"listener":{}//监听事件 change|keyup
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.level = 1;
	this.data = [];
	
	this.setData = function(data) {
		this.data = data;
		for(var i=0;i<data.length;i++){
			var row = data[i];
			this.main.find("[name='"+row.KEY+"']").click();
		}
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
				this.data = arry;
				return arry;
			}
		}
		return [];
	}

	this.init = function() {
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		var text = $("<input>").appendTo(this.obj);
		text.attr("type", "text");
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", placeholder);
		}
		this.obj.append("<span class='jl_btn btn_white xuan icon' id='CZ'><i class='fa fa-angle-down'></i></span>");
		this.obj.find("> #CZ").click(function() {
			var search = $(this).prev().val();
			$(this).parent().next().find("> .jl_screen_a_z > .title > li:first").click();
			if (!JL.isNull(search)) {
				var lis = $(this).parent().next().find("> .jl_screen_a_z > .main > .jl_square_texe > ul > li");
				for ( var i = 0; i < lis.length; i++) {
					var li = $(lis[i]);
					var html = li.data("name");
					var pinyin = JL.convertToPinYin(html).toString();
					if (!(html.indexOf(search) != -1 || pinyin.indexOf(search.toUpperCase()) != -1)) {
						li.hide();
					}
				}
			}
		});
		var jl_dropdown_menu = $("<div>").appendTo(this.obj);
		jl_dropdown_menu.addClass("jl_dropdown_menu");

		var jl_address = $("<div>").appendTo(jl_dropdown_menu);
		jl_address.addClass("jl_address");

		var main = $("<div>").appendTo(jl_address);
		main.addClass("addr_box");

		var address_title = $("<ul>").appendTo(main);
		address_title.addClass("address_title w12");

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
		repeat(address_choose);
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.text.attr("disabled","disabled");
		}else{
			this.text.removeAttr("disabled");
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
			li.append("<a>"+ row.VALUE +" </a>");
			li.click(function(){
				var data = $(this).data();
				var level = Number($(this).attr("level"));
				
				var title = thisPlugin.address_title; 
				var ul_level = title.find("[level='"+level+"']");
				if(ul_level.length == 0){
					ul_level = $("<li>").appendTo(title);
					ul_level.attr("level", level);
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
				var level_lis = ul_level.nextAll();
				for(var j=0; j<level_lis.length; j++){
					var level_li = $(level_lis[j]);
					thisPlugin.main.find("div[level='"+level_li.attr("level")+"']").remove(); 
					level_li.remove();
				}
				
				
				if(data.MJBJ == 0){
					thisPlugin.main.find(".address_choose").hide();
					console.info(thisPlugin.loadData({"PARENT":data.KEY}));
					var next_li = $("<li level='"+(level+1)+"'>请选择</li>").appendTo(title);
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
					ul_level.addClass("xuan");
					thisPlugin.obj.find(".jl_dropdown_menu").hide();
					
					thisPlugin.data = [];
					var titles = title.children("li");
					for(var j=0;j<titles.length;j++){
						thisPlugin.data.push($(titles[j]).data());
					}
					thisPlugin.text.val(title.text());
					
					if(!JL.isNull(thisPlugin.config.listener.click)){
						thisPlugin.config.listener.click(data);
					} 
				}
			});
		}
	}

	this.init();
}
