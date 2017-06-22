$(document).ready(function(){
	
	$(document).on("mouseenter",".delete_input",function(){
		var input = $(this).find(":text,textarea");
		if(!input.prop("disabled")){
			input.siblings("i:contains('×')").show();
		}
		input.css({"border":"1px solid #aaa"});
		$(this).siblings(".jl_btn").addClass("xuan");
	})
	$(document).on("mouseleave",".delete_input",function(){
		var input = $(this).find(":text,textarea");
		input.siblings("i:contains('×')").hide();
		input.css({"border":"1px solid #e4e4e4"})
		$(this).siblings(".jl_btn").removeClass("xuan");
	})	
	/*******************************************************************************
	 * 菜单jl_nav
	 ******************************************************************************/	
	$(document).on("click",".nav_menu > li > a",function(){
	  if(!JL.isNull(pubJson.backMenuSwitch) && pubJson.backMenuSwitch == true){
	  }else{
		  $(".nav_menu > li").removeClass("xuan");
		  $(".nav_menu > li").removeClass("bian");
		  $(".nav_menu > li").children(".sub_menu").slideUp();
		  $(".nav_menu > li > a > .arrow").attr("class","arrow fa fa-angle-left position_a right0"); 
	  }
	  var li = $(this).parent("li");
	  if($(this).siblings(".sub_menu").is(":hidden")){
		li.addClass("xuan bian"); 
	    $(this).siblings(".sub_menu").slideDown(); 
	    $(this).children(".arrow").attr("class","arrow fa fa-angle-down position_a right0");
	  }
	});
	
	$(document).on("mouseenter",".thr_menu > li",function(){
		var for_menu = $(this).children(".fou_menu");
		//if(for_menu.length > 0){
			$(this).children(".fou_menu").fadeIn(100);
		//}else{
			$(this).addClass("xuan");
		//}
	});
	$(document).on("mouseleave",".thr_menu > li",function(){
		var for_menu = $(this).children(".fou_menu");
		//if(for_menu.length > 0){
			$(this).children(".fou_menu").fadeOut();
		//}else{
			$(this).removeClass("xuan");
		//}
	})

	$(document).on("click",".sub_menu > li > a",function(){
		var thr_menu = $(this).siblings(".thr_menu");
		if(thr_menu.is(":hidden")){
			thr_menu.slideDown();
			$(this).parent().addClass("bian");
			JL.changeClass($(this).find(".fa-angle-left"), "fa-angle-left", "fa-angle-down");
		}else{
			thr_menu.slideUp();
			$(this).parent().removeClass("bian");
			JL.changeClass($(this).find(".fa-angle-down"), "fa-angle-down", "fa-angle-left");
		}
	})
	
	$(document).on("mouseover",".sub_menu > li",function(){
		$(".sub_menu > li").removeClass("xuan");
	    $(this).addClass("xuan");
	})
	/*******************************************************************************
	 * 流程jl_process
	 ******************************************************************************/
	$(document).on("click",".jl_process > i",function(){
		$(this).addClass("xuan");
		$(this).next(".jl_process_menu").removeClass("hide");
	});
	$(document).on("mouseleave",".jl_process",function(){
		$(this).children("i").removeClass("xuan");
		$(this).children(".jl_process_menu").addClass("hide");
	});
	
	
	/*******************************************************************************
	 * 滚动条事件
	 ******************************************************************************/
	$(document).on("scroll",window,function(){
	/*******************************************************************************
	 * 快速菜单jl_quicnav
	 ******************************************************************************/
	  $(".jl_quicnav");
	  	
	})
	
	
	/*******************************************************************************
	 * 页面目录jl_catalog
	 ******************************************************************************/
	$(document).on("click",".catalog_ico",function(){
	  var catalog_ico_class = $(this).attr("class");
	  if(catalog_ico_class == "catalog_ico"){
	    $(this).addClass("xuan");
	    $(this).next(".catalog_main").slideUp();
	  }else{
	    $(this).removeClass("xuan");
	    $(this).next(".catalog_main").slideDown();
	  }
	})
	$(document).on("click",".jl_catalog_line",function(){
	  var i_class = $(this).children(".catalog_cz").children("i").attr("class");
	  if(i_class == "fa fa-angle-down"){
		$(this).children(".catalog_cz").children("i").attr("class","fa fa-angle-left");
	    $(this).next().slideUp();
	  }else if(i_class == "fa fa-angle-left"){
		$(this).children(".catalog_cz").children("i").attr("class","fa fa-angle-down");
	    $(this).next().slideDown();
	  }
	})
	
		
	/*******************************************************************************
	 * 下拉菜单jl_navbar/jl_dropdown_menu
	 ******************************************************************************/
	$(document).on("mouseenter",".jl_header > .jl_navbar > li",function(){
		$(this).siblings(".xuan").find(".jl_dropdown_menu").hide(); 
		$(this).find(".jl_dropleft_menu").hide(); 
		$(this).siblings(".xuan").removeClass("xuan");
		$(this).addClass("xuan"); 
		$(this).find("> .jl_dropdown_menu").show(); 
	})


	/*******************************************************************************
	 * 下拉菜单jl_navbar/jl_dropdown_menu
	 ******************************************************************************/
	$(document).on("mouseleave",".jl_header > .jl_navbar > li",function(){
		$(this).siblings(".xuan").find(".jl_dropdown_menu").hide(); 
		$(this).find(".jl_dropleft_menu").hide(); 
		$(this).siblings(".xuan").removeClass("xuan");
		$(this).addClass("xuan"); 
		$(this).find("> .jl_dropdown_menu").hide(); 
	})
	
	
	/*******************************************************************************
	 * 系统配置jl_pageconfigure
	 ******************************************************************************/
	$(document).on("click",".jl_pageconfigure > i",function(){
	  var jl_pageconfigure_class = $(this).attr("class");
	  if(jl_pageconfigure_class == "fa fa-cog"){
	    $(this).attr("class","xuan fa fa-times")
	    $(this).siblings("ul").fadeIn();	  
	  }else{
	    $(this).attr("class","fa fa-cog")
	    $(this).siblings("ul").fadeOut();	  
	  }
	})
	 
	 
	/*******************************************************************************
	 * 下拉按钮jl_btn_group
	 ******************************************************************************/
	$(document).on("click",".jl_btn_group > span",function(){
		var i_fa = $(this).children("i");
		var jl_btn_group = $(this).closest(".jl_btn_group");
		var jl_dropdown_menu = jl_btn_group.find(".jl_dropdown_menu").eq(0).show();
		if(i_fa.hasClass("fa-angle-right")){
			i_fa.attr("class","fa fa-angle-left");
			$(this).siblings(".btn_hide_main").fadeOut();
		}else if(i_fa.hasClass("fa-angle-left")){
			i_fa.attr("class","fa fa-angle-right");
			$(this).siblings(".btn_hide_main").fadeIn();
		}else if(i_fa.hasClass("fa-angle-down")){
			jl_btn_group.find("input").css({"border":"1px solid #aaa"});
			$(this).addClass("xuan");
			i_fa.attr("class","fa fa-angle-up");
			jl_btn_group.find(">　input").focus();
			jl_btn_group.find("> .delete_input > input").focus();
		}else if(i_fa.hasClass("fa-angle-up")){
			jl_btn_group.find("input").css({"border":"1px solid #e4e4e4"});
			$(this).removeClass("xuan");
			i_fa.attr("class","fa fa-angle-down");
			jl_dropdown_menu.hide();
		}
	})
	$(document).on("focus",".jl_btn_group input",function(){
		$(this).siblings("span").addClass("xuan");
		var jl_btn_group = $(this).closest(".jl_btn_group");
		var i = jl_btn_group.find(" > span > i");
		if(i.hasClass("fa-angle-down")){
			JL.changeClass(i, "fa-angle-down", "fa-angle-up");
		}
		var jl_dropdown_menu = jl_btn_group.find(".jl_dropdown_menu").show();
		if(!JL.isNull(jl_dropdown_menu.offset()) && $(window).width() - jl_dropdown_menu.offset().left - jl_dropdown_menu.width() <= 20 ){
			jl_dropdown_menu.addClass("right0");
		}
		var pagr_content = $(".pagr_content:not(:hidden)");
		if(!JL.isNull(jl_btn_group.offset()) && pagr_content.length > 0){
			var bottom = pagr_content.innerHeight() - (jl_btn_group.offset().top - pagr_content.offset().top) - jl_dropdown_menu.height();
			if(jl_dropdown_menu.hasClass("bottom_100") && bottom > 120){
				jl_dropdown_menu.removeClass("bottom_100");
			}else if(bottom < 120){
				jl_dropdown_menu.addClass("bottom_100");
			}
		}
		jl_btn_group.find(".jl_dropleft_menu").hide();
	});
	
	$(document).click(function(e){
		if($(e.target).closest("body").length > 0){
			var hideGroup = null;
			if($(e.target).closest(".jl_btn_group").length == 0 && $(e.target).closest(".jl_dropdown_menu").length == 0 && $(e.target).closest(".drop_menu").length == 0){
				hideGroup = $(".jl_btn_group");
				$(".jl_dropdown_menu").hide();
				$(".drop_menu").removeClass("xuan");
			}else if($(e.target).closest(".jl_btn_group").length > 0){
				var hideGroup = $(".jl_btn_group").not($(e.target).closest(".jl_btn_group")); 
				hideGroup.find(".jl_dropdown_menu").hide();
			}else{
				hideGroup = $(".jl_btn_group");
			}
			JL.changeClass(hideGroup.find("> span > .fa-angle-up"), "fa-angle-up", "fa-angle-down");
			
			$(".jl_header > .jl_navbar > li").removeClass("xuan");
		}
	});
	
	
	/*******************************************************************************
	 * 控件jl_input_radio
	 ******************************************************************************/
	$(document).on("click",".jl_input_radio",function(){
	  var radio_class = $(this).children("i").attr("class");
	  if(radio_class == "fa fa-circle-o"){
		 $(this).addClass("font_color");
		 $(this).siblings().removeClass("font_color");
	     $(this).children("i").attr("class","fa fa-dot-circle-o");
		 $(this).siblings().children("i").attr("class","fa fa-circle-o");
	  }	
	})
	
	/*******************************************************************************
	 * 控件checkbox_css
	 ******************************************************************************/
	$(document).on("click",".checkbox_css",function(){
	  var radio_class = $(this).children("i").attr("class");
	  if(radio_class == "fa fa-square-o"){
		 $(this).addClass("font_color");
	     $(this).children("i").attr("class","fa fa-check-square");
	  }else{
		 $(this).removeClass("font_color");
	     $(this).children("i").attr("class","fa fa-square-o");
	  }	
	})
	
	/*******************************************************************************
	 * 消息提示jl_message
	 ******************************************************************************/
	$(document).on("click","#message_ts",function(){
	  $(".jl_modal").fadeIn();
	  $(".jl_message").removeClass("hide");
	  $(".jl_message").animate({"margin-top":"35px","opacity":"1"});
	})
	$(document).on("click",".jl_message_close",function(){
	  $(this).closest(".jl_modal").fadeOut();
	  $(this).closest(".jl_message").animate({"margin-top":"0","opacity":"0"},function(){
		  $(".jl_message").addClass("hide")
	  });
	})
	
	/*******************************************************************************
	 * 消息提示jl_modal
	 ******************************************************************************/
	$(document).on("click","#modal_ts",function(){
	  $(".jl_modal").fadeIn();
	  $(".jl_modal_main").removeClass("hide");
	  $(".jl_modal_main").animate({"margin-top":"35px","opacity":"1"});
	})
	$(document).on("click",".modal_close",function(){
	  $(this).closest(".jl_modal").fadeOut();
	  $(this).closest(".jl_modal_main").animate({"margin-top":"0","opacity":"0"},function(){
		  $(".jl_modal_main").addClass("hide")
	  });
	})
	
	/*******************************************************************************
	 * 选择提示jl_confirm
	 ******************************************************************************/
	$(document).on("click","#confirm_ts",function(){
	  $(".jl_modal").fadeIn(1);
	  $(".confirm_main").removeClass("hide");
	  $(".confirm_main").css({"margin-top":-$(".confirm_main").height()/2-20});
	
	})
	$(document).on("click",".confirm_close",function(){
	  $(this).closest(".jl_modal").fadeOut(1);
	  $(".confirm_main").addClass("hide")
	  $(".confirm_main").css({"margin-top":"inherit"});
	})
	
	/*******************************************************************************
	 * 下拉按钮多级jl_dropleft_menu
	 ******************************************************************************/
	$(document).on("mouseenter",".jl_dropdown_menu > li",function(){
	  $(this).children(".jl_dropleft_menu").show();
	})
	$(document).on("mouseleave",".jl_dropdown_menu > li",function(){
	  $(this).children(".jl_dropleft_menu").hide();
	})
	
	/*******************************************************************************
	 * 树形控件/jl_tree_02
	 ******************************************************************************/
	$(document).on("click",".jl_tree_02 > dl > dd:first-child",function(){
	  var i_first = $(this).children("i:first-child");
	  if(i_first.hasClass("fa-minus-square-o")){
		  JL.changeClass(i_first, "fa-minus-square-o", "fa-plus-square-o");
		  $(this).parent("dl").next(".jl_tree_02").slideUp();
	  }else if(i_first.hasClass("fa-plus-square-o")){
		  JL.changeClass(i_first, "fa-plus-square-o", "fa-minus-square-o");
		  $(this).parent("dl").next(".jl_tree_02").slideDown();
	  }
	})
	
	/*******************************************************************************
	 * list_item_title
	 ******************************************************************************/
	$(document).on("click",".list_item_title",function(){
	  var i_class = $(this).children("i").attr("class");
	  if(i_class == "fa fa-angle-down"){
	    $(this).children("i").attr("class","fa fa-angle-right")
	    $(this).children("i").attr("title","展开")
	    $(this).next().slideUp();
	  }else if(i_class == "fa fa-angle-right"){
	    $(this).children("i").attr("class","fa fa-angle-down")
	    $(this).children("i").attr("title","拉下")
	    $(this).next().slideDown();
	  }
	})
	
	
	
	/*******************************************************************************
	 * jl_screening > more
	 ******************************************************************************/
	$(document).on("mouseover",".jl_screening > .jl_screening_more",function(){
	  $(this).siblings(".jl_screening_main").css({"border-bottom":"1px solid #00a2ca"})
	})
	$(document).on("mouseleave",".jl_screening > .jl_screening_more",function(){
	  $(this).siblings(".jl_screening_main").css({"border-bottom":"1px solid #ccc"})
	})
	$(document).on("click",".jl_screening > .jl_screening_more > span",function(){
	  if($(this).find("i").hasClass("fa-angle-down")){
	     $(this).empty();
	     $(this).append("收起<i class='fa fa-angle-up'>");
	  }else{
	     $(this).empty();
	     $(this).append("更多条件<i class='fa fa-angle-down'>");
	  }
	})

});