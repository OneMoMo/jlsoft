var JLMultiTree = function(json){

	this.config = {
		"param" : {},//接口传递参数 
		"sBillName" : pubJson.getURL("FormUrl") + "/jlquery",//接口路径(有默认值)
		"sOperateName" : "select.do",//接口方法(有默认值)
		"jbToAll" : 1,//从此级别加载到底,此级别以上逐级加载
		"sqlid": null,//sqlid
		"resource": null,//数据源 scm|vip|WORKFLOW
		"listener":{},//监听事件 change|keyup
		"last":false, //只能选择末级节点
		"async": false, //异步加载
		"placeholder":"下拉选择",
		"clickLoad":true,//点击加载,否则是初始加载
		"single":false//单选模式
	};

	$.extend(this.config, json);
	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}

	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = [];//选中的数据
	this.allData = [];//所有数据
	this.allParent = [];//所有父节点

	this.text = null;
	this.span = null;
	
	this.parent = null;
	this.allBorther = [];

	this.setText = function() {
		var temp_str = "";
		$.each(this.data, function(n, val) {
			temp_str += val.value;
			if(n < thisPlugin.data.length-1){
				if(thisPlugin.config.selectMode == "all"){
					temp_str += " > ";
				}else{
					temp_str += ",";
				}
			}
		});
		this.text.val(temp_str);
	}

	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setCdsData = function(json, cdsid){
		if(!JL.isNull(json)){
			this.setData(json);
		}
	}
	
	//选中选项
	this.checkOption = function(data){
		for(var i=0; i<data.length; i++){
			var key = data[i]["key"];
			var jb = data[i]["jb"];
			var keys = eval("key.match(/.{"+(key.length/jb)+"}/g)") || key.match(/.{2}/g);
			var parent = "";
			for(var j=0; j<keys.length; j++){
				parent += keys[j];
				var parentObj = this.obj.find("[key='"+parent+"']");
				if(parentObj.length > 0 && parentObj.next().find("li").length == 0){
					parentObj.find("> i:contains('+')").click();
				}
			}
			this.obj.find("[key='"+key+"'] > a").click();
		}
	};

	
	this.setData = function(data){
		this.data = [];
		this.obj.find("em:not(.hide)").attr("class", "hide");
		this.data = [];
		this.text.val("");
		this.obj.find(".jl_dropdown_menu > .delete_input > i").click();
		this.obj.find(".jl_tree_checkbox > li > div > i:contains('-')").click();
		
		if(!JL.isNull(data)){
			if(thisPlugin.config.async){
				this.data = data;
				this.setText();
			}
			if(typeof data == "string"){
				data = JSON.parse(data);
			}
			this.checkOption(data);
		}
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.loadAllData = function(func){
		var result = [];
		var param = this.config.param;
		if( !JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
			var XmlData={};
			XmlData["sqlid"] = this.config.sqlid;
			XmlData["DataBaseType"] = this.config.resource;
			XmlData["dataType"] = "Json";
			XmlData["QryType"] = "Bill";
			$.extend(XmlData, userInfo);
			$.extend(XmlData, this.config.param);
			param = XmlData;
		}
		var ajaxJson = {};
		if(!JL.isNull(this.config.sOperateName)){
			ajaxJson["src"] = this.config.sBillName + "/" + this.config.sOperateName;
		}else{
			ajaxJson["src"] = this.config.sBillName;
		}
		ajaxJson["data"] = {"XmlData":JSON.stringify(param)};
		ajaxJson["async"] = this.config.async;
		ajaxJson["callback"] = function(resultData){
			if(!JL.isNull(resultData)){
				result = resultData;
				if(!JL.isNull(resultData.data)){
					result = resultData.data;
					if(!JL.isNull(resultData.data.returnList)){
						result = resultData.data.returnList;
					}
					if(!JL.isNull(resultData.data.resultList)){
						result = resultData.data.resultList;
					}
				}
			}
			$.merge(thisPlugin.allData, result);
			func(result);
			if(thisPlugin.config.async){
				thisPlugin.setData(thisPlugin.data);
			}
		};
		JL.ajax(ajaxJson);
	}

	this.init = function() {
		delete this.config.param.PARENT;
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		var html ='<div class="delete_input">'+
					  '<input type="text" placeholder="' + this.config.placeholder + '" readonly="readonly">'+
					  '<i title="清空">×</i>'+
				  '</div>'+
				  '<span class="jl_btn btn_white"><i class="fa fa-angle-down"></i></span>'+
				  '<div class="jl_dropdown_menu min_w12 ">'+
			          '<ul class="jl_tree_checkbox overflow_y" style="max-height: 300px;"></ul>'+
			      '</div>';
		

		this.obj.append(html);
		this.text = this.obj.find(":text:first");
		this.text.focus(function(e){
			if(JL.isFunction(thisPlugin.config.listener.show)){
				if(thisPlugin.config.listener.show(thisPlugin)){
					e.stopPropagation();
					return true;
				}
			}
		});
		
		this.span = this.obj.find("> span");
		var search = $("<div>").prependTo(this.obj.find(".jl_dropdown_menu"));
		search.addClass("w12 delete_input");
		var t = $("<input type='text' placeholder='请输入关键字查找'/>").appendTo(search);
		t.keyup(function(){
			var lis = thisPlugin.obj.find(".jl_tree_checkbox > li");
			if(JL.isNull($(this).val())){
				lis.show();
			}else{
				lis.hide();
				for(var i=0; i<lis.length; i++){
					var li = $(lis[i]);
					if(li.find("> div").text().toUpperCase().indexOf($(this).val().toUpperCase()) != -1){
						li.show();
						li.find(".jl_tree_checkbox > li").show();
						li.find("> div > i:contains('+')").click();
						var parents = li.parents(".jl_tree_checkbox").parent("li");
						parents.show();
						parents.find("> div > i:contains('+')").click();
					}
				}
			}
		});
		var i = $("<i title='清空'>×</i>").appendTo(search);
		i.click(function(){
			$(this).prev().val("");
			thisPlugin.obj.find(".jl_tree_checkbox > li").show();
		});
		//首次加载
		if(!this.config.clickLoad) {
			//点击加载数据
			this.text.focus(function(){
				
				if(thisPlugin.obj.find("> div > ul > li").length == 0) {
					if(thisPlugin.config.jbToAll > 1) {
						thisPlugin.config.param["JB"] = 1;
					}else {
						delete thisPlugin.config.param["JB"];
					}
					thisPlugin.loadOption();
				}
				
				var jl_dropdown_menu = thisPlugin.obj.find(".jl_dropdown_menu");
				if(!JL.isNull(jl_dropdown_menu.offset()) && $(window).width() - jl_dropdown_menu.offset().left - jl_dropdown_menu.width() <= 20 ){
					jl_dropdown_menu.addClass("right0");
				}
			});
		}else {
			//初始化加载数据
			if(thisPlugin.obj.find("> div > ul > li").length == 0) {
				if(thisPlugin.config.jbToAll > 1) {
					thisPlugin.config.param["JB"] = 1;
				}else {
					delete thisPlugin.config.param["JB"];
				}
				thisPlugin.loadOption();
			}
		}
		
		//清空已选择
		this.obj.find("> div > i").click(function(){
			thisPlugin.setData([]);
			if(JL.isFunction(thisPlugin.config.listener.remove)){
				thisPlugin.config.listener.remove(thisPlugin);
			}
		});
	}
	
	this.loadOption = function(){
		this.loadAllData(function(options){
			for(var i=0; i<options.length; i++){
				var option = options[i];
				var left = 15 + (option.JB - 1) * 25;
				var ul = null;
				
				if(JL.isNull(option.PARENT)) {
					ul = thisPlugin.obj.find("> div > ul");
				}else {
					var parent_div = thisPlugin.obj.find("[key='" + option.PARENT + "']");
					parent_div.find("> i").text("-");
					ul = parent_div.next("ul");
					if(ul.length == 0) {
						ul = $('<ul class="jl_tree_checkbox">');
						parent_div.after(ul);
					}
				}
				
				var li = $('<li><div style="padding-left:' + left + 'px;"><i>' + (option.MJBJ == 1 ? '-' : '+') + '</i><a><i><em class="hide"></em></i><span class="text_hide" title="' + option.VALUE + '">' + option.VALUE + '</span></a></div></li>').appendTo(ul);
				
				var div = li.find("> div");
				var fa = li.find("> div > i");
				var a = li.find("> div > a");
				
				if(option.MJBJ == 1){
					fa.hide();
				}
				
				div.data({"key": option.KEY,"value": option.VALUE,"mjbj": option.MJBJ,"jb": option.JB,"parent": option.PARENT});
				div.attr("key", option.KEY);
				
				//收缩展开
				fa.click(function(){
					
					var data = $(this).parent().data();
					var ul = $(this).parent().nextAll("ul");
					
					if($(this).text() == "+") {
						$(this).text("-");
						//展开查询数据
						if(ul.length == 0 && data.mjbj == 0){
							ul = $('<ul class="jl_tree_checkbox">');
							$(this).parent().after(ul);
							if(thisPlugin.config.clickLoad){
								thisPlugin.config.param["PARENT"] = data.key;
								if(data.jb + 1 < thisPlugin.config.jbToAll) {
									thisPlugin.config.param["JB"] = data.jb + 1;
								} else {
									delete thisPlugin.config.param["JB"];
								}
								thisPlugin.loadOption();
							}
						}
						if(ul.length > 0) ul.removeClass("hide");
					}else {
						$(this).text("+");
						if(ul.length > 0) ul.addClass("hide");
					}
					
				});
				
				//选中,取消选中
				a.click(function(){
					var data = $(this).parent().data();
					
					if(thisPlugin.config.single && thisPlugin.config.last && data.mjbj == 0){
						return false;
					}
					
					//单选,清空其他选项
					if(thisPlugin.config.single){
						thisPlugin.obj.find("a > i > em").not($(this).find("> i > em")).removeClass("fa fa-check hide").addClass("hide");
					}
					
					var fa = $(this).find("> i > em");
					var jl_tree_checkbox = $(this).parent().parent().parents(".jl_tree_checkbox");
					var parent = jl_tree_checkbox.prev().find("> a > i > em");
					var child = $(this).parent().next().find("li > div > a > i > em");
					var div = $(this).parent();
					
					//处理当前点击选项和下级节点选中状态
					if(fa.hasClass("fa-check")){
						fa.removeClass("fa fa-check").addClass("hide");
						child.removeClass("fa fa-check").addClass("hide");
					}else{
						fa.removeClass("hide").addClass("fa fa-check");
						child.removeClass("hide").addClass("fa fa-check");
					}
					
					//处理上级节点选中状态
					for(var i=0; i<jl_tree_checkbox.length; i++){
						var ul = $(jl_tree_checkbox[i]);
						var prev_fa = ul.prev().find("> a > i > em");
						
						if(ul.find("li > div > a > i > em.fa-check").length == 0){
							prev_fa.removeClass("fa fa-check").addClass("hide");
						}else if(ul.find("li > div > a > i > em.fa-check").length == ul.find("li > div > a > i > em").length){
							prev_fa.removeClass("hide").addClass("fa fa-check");
						}else{
							prev_fa.removeClass("hide fa fa-check");
						}
					}
					
					//获取最上级选中的数据, 半选时循环子节点
					var formatData = function(arr, ul){
						var options = ul.find("> li > div > a > i > em:not(.hide)");//获取半选和选中的选项
						for(var i=0; i<options.length; i++){
							var em = $(options[i]);
							if(em.hasClass("fa-check")){
								var checked_data = em.closest("div").data();
								
								if(thisPlugin.config.last && checked_data.mjbj == 0){
									formatData(arr, em.closest("div").next());
								}else{
									//单选模式下配置展示结果为   上级 > 中级 > 下级 的展示效果
									if(thisPlugin.config.single && thisPlugin.config.selectMode == "all"){
										var div = em.closest("div").parents(".jl_tree_checkbox").prev(":not(.delete_input)");
										for(var j=div.length-1; j>=0; j--){
											arr.push($(div[j]).data());
										}
									}
									arr.push(checked_data);
								}
							}else{
								formatData(arr, em.closest("div").next());
							}
						}
					}  
					
					var arr = [];
					formatData(arr, thisPlugin.obj.find("> .jl_dropdown_menu > .jl_tree_checkbox"));
					thisPlugin.data = arr;
					
					if(JL.isFunction(thisPlugin.config.listener.change)){
						thisPlugin.config.listener.change(data, arr, thisPlugin);
					}
					
					thisPlugin.setText();
				});
				ul.find(".jl_tree_checkbox > li > div > i:contains(-)").click();
			}
		});
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
	}
	
	this.hide = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.obj.hide();
		}else{
			this.obj.show();
		}
	}

	this.init();
};