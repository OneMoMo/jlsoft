var JLEditTree = function(json){ 
	this.config = {
		"param": {},	
		"listener": {},	
		"sBillName": "jlquery",
		"sOperateName": "select.do"
	};
	$.extend(this.config, json);	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = "";
	this.newData = [];
	this.values = {};
	this.options = [];
	
	this.setData = function(data){
		this.data = data;
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.setText = function(data) { 
		this.newData.push(data);
		console.info(this.newData);
	}

	this.getText = function() {
		return this.newData;
	}

	this.setValue = function(json,value){
		value = JL.formatObject(value);
		var select = $(json["obj"]).find("[name='"+json["zdid"]+"']");
		var option = select.find("option[value='"+value["key"]+"']");
		if(option.length == 0){
			select.append("<option value='"+value["key"]+"'>"+value["value"]+"</option>");
		}else{
			select.val(value["key"]);
		}
		
		if(!JL.isNull(json["edit"]) && json["edit"]){
			$(json["obj"]).find(":text").val(value["value"]);
		}
	}

	this.init = function(json){
		this.write();  
	}

	this.loadData = function(){ 
		if(!JL.isNull(this.config.sBillName) && !JL.isNull(this.config.sOperateName)){  
			var transport = new JLTransport();
			var resultData = transport.select(this.config.sBillName, this.config.sOperateName, this.config.param);
 
			if(!JL.isNull(resultData)){
				return resultData;
			}
		}  
	}
	/*
	this.callback = function(div,json){
		fa="" ;
		button="";
		$.each(json,function(key,val){
			if(val.mjbj=="1"){
				 fa = "fa-caret-right";  
			}else{
				 fa = "fa-caret-down";
			}
			var div_children = $(div).children("dl").children(".child");
			var jl_tree_main = $('<div class="jl_tree_main"></div>').appendTo(div_children); 
			var w12 = $('<dl class="w12" code="" index=""></dl>').appendTo(jl_tree_main); 
			w12.attr("code", val.code);
			w12.attr("index", key);
			$('<dt class="lj"></dt><dt class="line"></dt>').appendTo(jl_tree_main); 
			var w06 = $('<dd class="w06"></dd>').appendTo(w12); 
			w06.data(val);

			$('<i class="fa '+fa+'" name="slideshow"></i>').appendTo(w06); 
			var text = $('<input type="text" code="" value="">').appendTo(w06); 
			text.attr("code", val.code);
			text.attr("value", val.name);
			
			//新增
			text.blur(function(){ 
				if(JL.isNull($(this).val())){
					$(this).focus();
				}else{
					var newData = {};
					newData.name = $(this).val();
					newData.code = $(this).attr("code");
					newData.sjcode = $(this).closest("dl[code]").closest("div").closest("dl[code]").attr("code");
					if ($(this).closest("dl[code]").find(".fa-ban").attr("title") == "非末级"){
						newData.mjbj = 0;
					}else{
						newData.mjbj = 1;
					}
					thisPlugin.setText(newData);
					console.info(newData);
				}
			});
			
			var fa_level_down = $('<i class="fa fa-level-down cz" title="新增"></i>').appendTo(w06);
			fa_level_down.click(function(){ 
				thisPlugin.addSon($(this).parent().parent().children(".child"));
				var flag = false;
				$.each($(this).parent().siblings(".child").find(".jl_tree_main > dl > dd > input"),function(){
					  if($(this).val().length==0){
						  $(this).attr("placeholder","请输入分类");
						  flag = true;
						  return true;
					  }
				})
				if(!flag){			  
				  if($(this).siblings("i[name=\"slideshow\"]").attr("class")=="fa fa-caret-right"){
					  $(this).siblings("i[name=\"slideshow\"]").click(); 
				  }
				}
				thisPlugin.config.listener.insertclick(w06);
			})
			
			var fa_level_down = $('<i class="fa fa-trash-o cz" title="删除"></i>').appendTo(w06); 
			fa_level_down.click(function(){
				$(this).parent().parent().parent().remove();
				thisPlugin.config.listener.delclick(w06);
			})
			
			var fa_ban = $('<i class="fa fa-ban cz" title="非末级"></i>').appendTo(w06); 
			fa_ban.click(function(){
				var mjdata = $(this).closest("dd.w06").data();
				if ($(this).attr("title")=="非末级"){
					$(this).parent().find("i[title=\"新增\"]").hide();
					$(this).attr("title","末级");
					$(this).addClass("font_red");
					mjdata.mjbj = 0;
				}else{
					$(this).attr("title","非末级");
					$(this).parent().find("i[title=\"新增\"]").show();
					$(this).parent().find("i[title=\"删除\"]").show();
					$(this).removeClass("font_red");
					mjdata.mjbj = 1;
				}
				thisPlugin.config.listener.mjclick(mjdata);
			})
			
			var text = $('<div class="w12 child"></div>').appendTo(w12); 
			 
			if(!JL.isNull(val.item)){
				thisPlugin.callback(jl_tree_main,val.item);
			}
		})
	}*/

	this.write = function(){ 
		console.info("aaaaaaaaa");
		this.data = this.loadData();
		this.obj.empty();
		for(var i=0;i<this.data.length;i++){
				var jl_tree_main = $('<div class="jl_tree_main" name=""></div>'); 
				jl_tree_main.attr("name", this.data[i].code); 
				var w12 = $('<dl class="w12" code="" index=""><dt class="lj"></dt></dl>').appendTo(jl_tree_main); 
				w12.attr("code", this.data[i].code);
				w12.attr("index", i);
				var w06 = $('<dd class="w06"></dd>').appendTo(w12); 
				w06.data(this.data[i]);
				var fa_caret_down = $('<i class="fa fa-caret-down" name="slideshow"></i>').appendTo(w06); 
				fa_caret_down.click(function(){
					if($(this).attr("class")=="fa fa-caret-down"){
						  $(this).removeClass("fa-caret-down");
						  $(this).parent().siblings("div.child").slideUp();
						  $(this).addClass("fa-caret-right");
					}else{
						  $(this).removeClass("fa-caret-right");
						  $(this).parent().siblings("div.child").slideDown();
						  $(this).addClass("fa-caret-down");
					}
				});
				var text = $('<input type="text" jlbh="" code="" value="">').appendTo(w06); 
				text.attr("jlbh", this.data[i].jlbh);
				text.attr("code", this.data[i].code);
				text.attr("value", this.data[i].name);
				
				//新增
				text.blur(function(){ 
					if(JL.isNull($(this).val())){
						$(this).focus();
					}else{  
						var newData = {};
						newData.name = $(this).val();
						newData.code = $(this).attr("code");
						if ($(this).closest("dl[code]").find(".fa-ban").attr("title") == "非末级"){
							newData.mjbj = 0;
						}else{
							newData.mjbj = 1;
						}
						thisPlugin.setText(newData);
						console.info(newData);
					}
				});
				
				var fa_level_down = $('<i class="fa fa-level-down cz" title="新增"></i>').appendTo(w06);
				fa_level_down.click(function(){ 
					thisPlugin.addSon($(this).parent().parent().children(".child"));
					var flag = false;
					$.each($(this).parent().siblings(".child").find(".jl_tree_main > dl > dd > input"),function(){
						  if($(this).val().length==0){
							  $(this).attr("placeholder","请输入分类");
							  flag = true;
							  return true;
						  }
					  })
					  if(!flag){			  
						  if($(this).siblings("i[name=\"slideshow\"]").attr("class")=="fa fa-caret-right"){
							  $(this).siblings("i[name=\"slideshow\"]").click(); 
						  }
					  } 
					thisPlugin.config.listener.insertclick(w06);
				})
				
				var fa_level_down = $('<i class="fa fa-trash-o cz" title="删除"></i>').appendTo(w06); 
				fa_level_down.click(function(){
					var mjdata = $(this).closest("dd.w06").data();
					$(this).parent().parent().parent().remove();
					thisPlugin.config.listener.delclick(mjdata); 
				})
				
				if (this.data[i].mjbj == 0 || JL.isNull(this.data[i].mjbj)){
					var fa_ban = $('<i class="fa fa-ban cz" title="非末级"></i>').appendTo(w06); 
				}else{ 
					var fa_ban = $('<i class="fa fa-ban cz font_red" title="末级"></i>').appendTo(w06); 
				} 
				  
				fa_ban.click(function(){
					var mjdata = $(this).closest("dd.w06").data();
					console.info(mjdata);
					if ($(this).attr("title")=="非末级"){
						$(this).parent().find("i[title=\"新增\"]").hide();
						$(this).attr("title","末级");
						$(this).addClass("font_red");
						mjdata.mjbj = 0;
					}else{
						$(this).attr("title","非末级");
						$(this).parent().find("i[title=\"新增\"]").show();
						$(this).parent().find("i[title=\"删除\"]").show();
						$(this).removeClass("font_red");
						mjdata.mjbj = 1;
					}
					thisPlugin.config.listener.mjclick(mjdata);
				})
				
				$('<div class="w12 child"></div>').appendTo(w12);  
				
				if (this.data[i].code.length>2){
					parentDiv = thisPlugin.obj.find("div[name="+this.data[i].code.substring(0,this.data[i].code.length-2)+"]");
					childDiv = $(parentDiv).find(".child")[0];
					jl_tree_main.appendTo(childDiv);
				}else{
					jl_tree_main.appendTo(this.obj); 
				}
		}
		 
		//默认
		if(this.config.node=="hide"){
			thisPlugin.find("dl > .child").attr("style","display: none;");
			thisPlugin.find("dl>dd>i[name=\"slideshow\"]").removeClass("fa-caret-down");
			thisPlugin.find("dl>dd>i[name=\"slideshow\"]").addClass("fa-caret-right");
		}
	}

	this.addSon = function(div){
		if (thisPlugin.obj.find("input[xzbj]").length==1){
			return false;
		}
		var jl_tree_main = $('<div class="jl_tree_main"></div>').appendTo(div); 
		
	/*	var code="",index="";
		if(jl_tree_main.siblings(".jl_tree_main").length == 0){
			code = jl_tree_main.closest("dl[code]").attr("code") + "01";
			index = 0;
		} else { 
			var maxcode=0;
			for (var i =0;i<jl_tree_main.siblings(".jl_tree_main").length;i++){
				var icode = $(jl_tree_main.siblings(".jl_tree_main")[i]).attr("code");
				if (maxcode < icode.substring(icode.length-2,2)){
					maxcode = icode.substring(icode.length-2,2);
				}
			}
			
			code = jl_tree_main.closest("dl[code]").attr("code") + "01";
			index = jl_tree_main.siblings(".jl_tree_main").length + 1;
		}*/
		
		var w12 = $('<dl class="w12" code="" index=""><dt class="lj"></dt><dt class="line"></dt></dl>').appendTo(jl_tree_main); 
		/*w12.attr("code",code);
		w12.attr("index",index);*/

		var w06 = $('<dd class="w06"></dd>').appendTo(w12); 
		var slideshow = $('<i class="fa fa-caret-right" name="slideshow"></i>').appendTo(w06);
		//展开隐藏
		slideshow.click(function(){
			if($(this).attr("class")=="fa fa-caret-down"){
				$(this).removeClass("fa-caret-down");
				$(this).parent().siblings("div.child").slideUp();
				$(this).addClass("fa-caret-right");
			}else{
				$(this).removeClass("fa-caret-right");
				$(this).parent().siblings("div.child").slideDown();
				$(this).addClass("fa-caret-down");
			}
		});
		
		//新增
		var input = $('<input type="text" xzbj>').appendTo(w06);
		input.focus();
		input.blur(function(){ 
			if(JL.isNull($(this).val())){
				$(this).focus();
			}else{
				var newData = {};
				newData.name = $(this).val();
				newData.code = $(this).attr("code");
				newData.sjcode = $(this).closest("dl[code]").closest("div").closest("dl[code]").attr("code");
				if ($(this).closest("dl[code]").find(".fa-ban").attr("title") == "非末级"){
					newData.mjbj = 0;
				}else{
					newData.mjbj = 1;
				}
				thisPlugin.setText(newData);
				console.info(newData);
			}
		});
		
		var fa_trash_o = $('<i class="fa fa-trash-o cz" title="删除"></i>').appendTo(w06);
		//删除
		fa_trash_o.click(function(){
			$(this).parent().parent().parent().remove(); 
		}) 
		  
		var fa_ban = $('<i class="fa fa-ban cz" title="非末级"></i>').appendTo(w06);
		//改为末级
		fa_ban.click(function(){
			if ($(this).attr("title")=="非末级"){
				$(this).parent().find("i[title=\"新增\"]").hide();
				//$(this).parent().find("i[title=\"删除\"]").hide();
				$(this).attr("title","末级");
				$(this).addClass("font_red");
			}else{
				$(this).attr("title","非末级");
				$(this).parent().find("i[title=\"新增\"]").show();
				$(this).parent().find("i[title=\"删除\"]").show();
				$(this).removeClass("font_red");
			}  
		})
		  
		$('<div class="w12 child"></div>').appendTo(w12);
		 
	    //默认
		if(this.config.node=="hide"){
			thisPlugin.find("dl > .child").attr("style","display: none;");
			thisPlugin.find("dl>dd>i[name=\"slideshow\"]").removeClass("fa-caret-down")
			thisPlugin.find("dl>dd>i[name=\"slideshow\"]").addClass("fa-caret-right");
		}
	}
    
	this.forJson = function(obj,itemList){
		$(obj).children(".jl_tree_main").each(function(){
			var itemjson={};
			itemjson["code"]=$(this).children("dl").children("dd").children("input").attr("code");
			itemjson["name"]=$(this).children("dl").children("dd").children("input").val();
			itemjson["item"]=[];
			itemList.push(itemjson);
			if($(this).children("dl").children(".child").children(".jl_tree_main").children("dl").length>0){
				this.forJson($(this).children("dl").children(".child"),itemjson["item"]);
			}
		}); 
	}
	 
	this.init();
}  

