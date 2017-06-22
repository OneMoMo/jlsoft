var JLMultiSelect = function(json) {
	this.config = {
		"param" : {},//接口传递参数 
		"sBillName" : pubJson.getURL("FormUrl") + "/jlquery",//接口路径(有默认值)
		"sOperateName" : "select.do",//接口方法(有默认值)
		"multi" : true,
		"edit"  : true,
		"sqlid": null,//sqlid
		"default": null, //默认选中
		"options": {}, //选项
		"resource": null,//数据源 scm|vip|WORKFLOW
		"listener":{}//监听事件 change|keyup
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
	
	this.setCdsData = function(json, cdsid){
		if(!JL.isNull(json)){
			this.setData(json);
		}else{
			this.setData([]);
		}
	}

	this.setData = function(data) {
		console.info('setData');
		this.data = data;
		this.setCheck(data);
		this.setText(this.getValues()); 
	}

	this.getData = function() {
		var checks = this.ul.find("li>.jl_input_checkbox>.fa-check-square");
		var arr=[];
		for (var i=0;i<checks.length;i++){
			var check = $(checks[i]);
			arr.push(check.closest("li").data());
		}
		return arr;
	}
	
	this.getallData = function() {
		return this.data;
	}
	
	this.setText = function(data) {  
		this.text.val(data); 
	}

	this.getText = function() {
		return this.text.val();
	}
	
	this.setCheck = function(data) {
		console.info('setCheck');
		if(thisPlugin.obj.find(".jl_dropdown_menu").find(".jl_square_texe > ul > li").length == 0){
			var resultData = thisPlugin.loadData();
			thisPlugin.pplist(thisPlugin.ul, resultData, false);
		}
		
		if (data.length <= 0){
			var checks = this.ul.find("li>.jl_input_checkbox>.fa-check-square");
			$(checks).closest("li").find("div > i").attr("class","fa fa-square-o");
		}else{
			var checks = this.ul.find("li>.jl_input_checkbox>.fa-square-o");
			
			for (var j=0;j<data.length;j++){
				for (var i=0;i<checks.length;i++){
					var check = $(checks[i]);
					
					if ($(check).closest("li").attr("name") == data[j].key){
						$(checks[i]).closest("li").find("div > i").attr("class","fa fa-check-square");
					}
				}
			} 
		}
	}
	
	this.getSelected = function() {
		var checks = this.ul.find("li>.jl_input_checkbox>.fa-check-square");
		var arr=[];
		
		for (var i=0;i<checks.length;i++){
			var check = $(checks[i]);
			arr.push(check.closest("li").data());
		}
		return arr;
	}
	
	this.getValues = function() {
		var checks = this.ul.find("li>.jl_input_checkbox>.fa-check-square");
		var values;
		for (var i=0;i<checks.length;i++){
			var check = $(checks[i]);
			if (values==null){
				values = check.closest("li").data().value;
			}else{
				values += ';'+check.closest("li").data().value;
			} 
		}
		return values;
	}

	this.addData = function(data) {
		console.info('addData');
		var add = 0;
		for (var i=0;i<this.data.length;i++){
			if (!JL.isNull(data.value) && !JL.isNull(this.data[i])){
				if (this.data[i].value==data.value){
					add = 1;
				}
			}
		}
		console.info('add:'+add);
		if (add==0){
			// 填充数据
			console.info('data：'+data);
			this.data.push(data);
			this.pplist(this.ul, this.data, true);
			this.setText(this.getValues()); 
		}
	}

	this.removeData = function(data) {
		console.info('removeData');
		// 渲染
		this.ul.find("li[name='" + data.key + "']").remove();

		// 填充数据
		for ( var i = 0; i < this.data.length; i++) {
			if (this.data[i].key == data.key){
				this.data.splice(i,1);
			}
		} 
		this.pplist(this.ul, this.data, true);
		this.setText(this.getValues()); 
	}
	
	this.removeAllData = function() { 
		this.ul.find("li").remove();
		this.data=[];
		this.setText(""); 
	}

	this.loadData = function() {
		var arry = [];
		
		if(!JL.isNull(this.config.options)){
			$.each(this.config.options, function(key, value){
				arry.push({"key": key,"value": value});
			});
			return arry;
		}else if (!JL.isNull(this.config.sBillName)
				&& !JL.isNull(this.config.sOperateName)) {
			var transport = new JLTransport(); 
			
			var param = this.config.param;
			if(!JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
				var XmlData={};
				XmlData["sqlid"] = this.config.sqlid;
				XmlData["DataBaseType"] = this.config.resource;
				$.extend(XmlData, userInfo);
				$.extend(XmlData, this.config.param);
				param = XmlData;
			}
			
			var resultData = transport.select(this.config.sBillName,this.config.sOperateName, param);
             
            if(typeof resultData == "object"){
            	if($.isArray(resultData)){ 
 					for(var i=0; i<resultData.length; i++){ 
 						var row = resultData[i];
 						if(!JL.isNull(row.KEY) && !JL.isNull(row.VALUE)){
 							row.key = row.KEY;
 							row.value = row.VALUE;
 							delete row.KEY;
 							delete row.VALUE;
 						}
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

	this.write = function() {
		$(this.obj).empty();
		$(this.obj).addClass("jl_dataexchange");
		var dataexchange_case = $("<div>").appendTo(this.obj);
		dataexchange_case.addClass("w12 dataexchange_case");

		var jl_btn_group = $("<div>").appendTo(dataexchange_case);
		jl_btn_group.addClass("jl_btn_group w12");
		var delete_input = $("<div>").appendTo(jl_btn_group);
		delete_input.addClass("delete_input");
		if (this.config.edit == true){
			var text = $("<input>").appendTo(delete_input);
		}else{
			var text = $("<input readonly=false>").appendTo(delete_input);
		} 
		text.attr("type", "text");
		var placeholder = JL.isNull(this.config.placeholder) ? "输入名称可查询" : this.config.placeholder;
		text.attr("placeholder", placeholder);
		
		text.focus(function(){
			if(thisPlugin.obj.find(".jl_dropdown_menu").find(".jl_square_texe > ul > li").length == 0){
				var resultData = thisPlugin.loadData();
				thisPlugin.pplist(thisPlugin.ul, resultData, false);
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
		
		var span = $("<span class='jl_btn btn_white' id='CZ'><i class='fa fa-search'></i></span>").appendTo(jl_btn_group);
		this.search = span;
		jl_btn_group.find("> #CZ").click(
						function() {
							console.info('CZ.click');
							var text = thisPlugin.text.val();
							var next = $(this).next();
							if (!JL.isNull(text)){
								if (text.indexOf("；") != -1){
									text = text.replace(/；/g,';');
								}
								var searchs = text.split(';');
								if (!JL.isNull(searchs)) {
									$(this).next().find('.main > .jl_square_texe > ul > li').hide();
									var lis = $(this).parent().find("> .jl_dropdown_menu > .dataexchange_main > .jl_screen_a_z > ul > li");
									
									for (var k=0;k<searchs.length;k++){
										var search = searchs[k];
										var spans = next.find("span:contains('"+search+"')");
										
										spans.parent().parent().show();
										var letter = spans.parent().parent().attr("letter");
										
										for ( var i = 0; i < lis.length; i++) {
											var li = $(lis[i]);
											var html = li.html();
											if (html == "全部") {
												li.show();
											}else{
												if ((html.indexOf(letter) != -1 || html.indexOf(letter.toUpperCase()) != -1)) {
													li.show();
												}
											} 
										}
									}
								}
							}else{
								$(this).next().find('.main > .jl_square_texe > ul > li').show();
							}
						});
		var jl_dropdown_menu = $("<div>").appendTo(jl_btn_group);
		jl_dropdown_menu.addClass("jl_dropdown_menu w12");
		jl_dropdown_menu.append("");
		
		var dataexchange_main = $("<div>").appendTo(jl_dropdown_menu);
		dataexchange_main.addClass("dataexchange_main w12");
		dataexchange_main.append("");

		var jl_screen_a_z = $("<div>").addClass("jl_screen_a_z").appendTo(dataexchange_main);
		var ul_title = $("<ul>").addClass("title").appendTo(jl_screen_a_z);
		var li_all = $("<li>").addClass("xuan font_blue").html("全部").appendTo(ul_title);
		var li_ABCDE = $("<li>").html("ABCDE").appendTo(ul_title);
		var li_FGHJK = $("<li>").html("FGHIJ").appendTo(ul_title);
		var li_LMNOP = $("<li>").html("KLMNO").appendTo(ul_title);
		var li_QRSTU = $("<li>").html("PQRST").appendTo(ul_title);
		var li_VWSYZ = $("<li>").html("UVWXYZ").appendTo(ul_title);
		ul_title.find("> li").click(function() {
			console.info('li.click');
			var html = $(this).html();
			var ul = $(this).parent().next().find("> div > ul");
			var lis = ul.find("li");
			var input = thisPlugin.text.val();
			var checks = ul.find("li>.jl_input_checkbox>.fa-check-square");
			
			if (JL.isNull(input) || checks.length > 0){
				if (html == "全部") {
					lis.show();
				} else {
					lis.hide();
					html = html.split("");
					for ( var i = 0; i < html.length; i++) {
						ul.find("li[letter='" + html[i] + "']").show();
					}
				}
			}else{
				if (input.indexOf("；") != -1){
					input = input.replace(/；/g,';');
				}
				var searchs = input.split(';');
				if (!JL.isNull(searchs)) {
					ul.find("li").hide();
					
					for (var k=0;k<searchs.length;k++){
						var search = searchs[k];
						var pinyin = JL.convertToPinYin(search).toString();
						var spans = ul.find("span:contains('"+search+"')");
						var letter = spans.parent().parent().attr("letter");
						if (html == "全部") {
							spans.parent().parent().show();
						}else{
							if ((html.indexOf(letter) != -1 || html.indexOf(letter.toUpperCase()) != -1)) {
								spans.parent().parent().show();
							}
						}
					}
				}
			}

			$(this).siblings().removeClass("xuan font_blue");
			$(this).addClass("xuan font_blue");
		});

		var main = $("<div>").addClass("main").appendTo(jl_screen_a_z);
		var jl_square_texe = $("<div>").addClass("jl_square_texe w12").appendTo(main);
		var ul = $("<ul>").addClass("w12").appendTo(jl_square_texe);
		var ppb = $(this.obj);

		//var resultData = thisPlugin.loadData();
		//thisPlugin.pplist(ul, resultData, false);
		
		this.ul = ul;
		this.text = text;
	}
	
	this.disabled = function(boolean){ 
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.text.attr("disabled","disabled");
			this.search.hide();
		}else{
			this.text.removeAttr("disabled");
			this.search.show();
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

	this.pplist = function(ul, resultData, check) {
		ul.empty();
		for ( var h = 0; h < resultData.length; h++) {
			var row = resultData[h];
			var li = $("<li>").appendTo(ul);
			var pinyin = JL.convertToPinYin(row["value"]).toString();
			li.attr("name", row.key);
			li.attr("letter", pinyin.substring(0, 1));
			var div = $("<div class='jl_input_checkbox checkbox_text'></div>").appendTo(li);
			var i = $("<i class='fa fa-square-o'></i>").appendTo(div);
			if (check){
				i.attr("class","fa fa-check-square");
			}
			var span = $("<span>"+ row["value"] + "</span>").appendTo(div);
			 
		}

		var smaller = function(a, b) {
			var val1 = JL.convertToPinYin($(a).html()).toString();
			var val2 = JL.convertToPinYin($(b).html()).toString();
			return val1 < val2 ? -1 : 1;
		};
		var compare = function(obj) {
			var sort = obj.sort(smaller);
			obj.remove();
			return sort;
		};

		var lis = ul.find("li");
		var sort = compare(lis);
		sort.appendTo(ul);
         
		for ( var i = 0; i < resultData.length; i++) {
			var row = resultData[i];
			ul.find(">li[name='" + row.key + "']").data(row);
			ul.find(">li[name='" + row.key + "']").click(function() {
				if ($(this).find('.fa-square-o').length==0){
					$(this).find('.fa-check-square').attr("class","fa fa-square-o");
				}else{
					if (thisPlugin.config.multi == true){
						$(this).find('.fa-square-o').attr("class","fa fa-check-square");
					}else{ 
						var checks = $(this).parent().find('.fa-check-square');
						checks.attr("class","fa fa-square-o");
						$(this).find('.fa-square-o').attr("class","fa fa-check-square");
					}
					
				}
				thisPlugin.setText(thisPlugin.getValues()); 
				
				if(!JL.isNull(thisPlugin.config.cds)){
					thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.getData());
				}
				
				if (!JL.isNull(thisPlugin.config.listener.click)) {  
					thisPlugin.config.listener.click($(this).data());
				}
				if (!JL.isNull(thisPlugin.config.listener.change)) {  
					thisPlugin.config.listener.change(thisPlugin.getData());
				}
			});
		}

		ul.find("> li >.jl_btn_group > span").click(function() { 
			var XG = $(this).prev().val();
			if (JL.isNull(XG)) {
				alert("不能为空");
				return false;
			}
			var span = $(this).parent().prevAll("span");
			span.html(XG);
			span.show();
			$(this).parent().hide();
			$(this).closest("li").data("name", XG); 
		});
		ul.find("> li >.jl_masklayer > div >.fa-times").click(function() {
			$(this).closest("li").remove();
		});
	}

	this.init = function() {
		// 控件渲染
		this.write(); 
	}
	this.init();
}
