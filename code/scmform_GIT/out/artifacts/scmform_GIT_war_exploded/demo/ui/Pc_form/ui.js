$(document).ready(function(){
$(document).on("focus","input[type='text']",function(){
  $(this).siblings("i").fadeIn(100);
  $(this).parent().siblings(".message").fadeIn(100);
  $(this).parent().parent().siblings(".message").fadeIn(100);
  $(this).css({"border":"1px solid #aaa"});
  $(this).parent().siblings(".jl_btn").addClass("xuan");
})
$(document).on("blur","input[type='text']",function(){
  $(this).siblings("i").fadeOut(100);
  $(this).parent().siblings(".message").fadeOut(100);
  $(this).parent().parent().siblings(".message").fadeOut(100);
  $(this).css({"border":"1px solid #e1e1e1"})
  $(this).parent().siblings(".jl_btn").removeClass("xuan");
  $(this).parent().siblings(".jl_dropdown_menu").fadeOut(100);
})

$(document).on("focus","textarea",function(){
  $(this).siblings(".message").fadeIn(100);
  $(this).css({"border":"1px solid #aaa"});
})
$(document).on("blur","textarea",function(){
  $(this).siblings(".message").fadeOut(100);
  $(this).css({"border":"1px solid #e1e1e1"});
})


$(document).on("click",".jl_btn",function(){
  $(".message_suspension").fadeIn(100);
})
$(document).on("click",".message_suspension > .message_close",function(){
  $(".message_suspension").fadeOut(100);
})


/***
主从表from_the_table
***/	
$(document).on("click","#from_the_table > dl",function(){
  if($(event.target).closest(".from_the_table_close").length == 0){
  $(this).parent().parent().parent().addClass("overflow_inherit");
  $(this).parent().parent().attr("style","width:100%;");
  $(this).parent().siblings(".table_summary").attr("style","width:100%;");
  $(this).siblings("dl").children(".from_the_table").fadeOut(100);
  $(this).children(".from_the_table").fadeIn(100);
  }
})
$(document).on("click",".from_the_table_close",function(){
  $(this).parent().parent().parent().parent().parent().removeClass("overflow_inherit");
  $(this).parent().parent().parent().parent().attr("style","");
  $(this).parent().parent().parent().siblings(".table_summary").attr("style","");
  $(this).siblings("dl").children(".from_the_table").fadeOut(100);
  $(".from_the_table").fadeOut(100);
})

/***
table删选
***/	
$(document).on("click",".table_main .fa-filter",function(){
  var this_class = $(this).attr("class");
  if(this_class == "fa fa-filter ml5"){
	$(this).addClass("xuan");
    $(this).next(".jl_dropdown_menu").fadeIn();
   }
})




/***
菜单jl_nav
***/	
$(document).on("click",".nav_menu > li > a",function(){
  if(!JL.isNull(pubJson.backMenuSwitch) && pubJson.backMenuSwitch == true){
  }else{
	  $(".nav_menu > li").removeClass("xuan");
	  $(".nav_menu > li").removeClass("bian");
	  $(".nav_menu > li").children(".sub_menu").slideUp();
	  $(".nav_menu > li > a > .arrow").attr("class","arrow fa fa-angle-left"); 
  }
  var li = $(this).parent("li");
  if($(this).siblings(".sub_menu").is(":hidden")){
	li.addClass("xuan bian"); 
    $(this).siblings(".sub_menu").slideDown(); 
    $(this).children(".arrow").attr("class","arrow fa fa-angle-down");
  }
});

$(document).on("mouseover",".sub_menu > li",function(){
	$(this).children(".thr_menu").fadeIn(100);
})
$(document).on("mouseleave",".sub_menu > li",function(){
	$(this).children(".thr_menu").fadeOut();
})

$(document).on("mouseover",".sub_menu > li",function(){
	$(".sub_menu > li").removeClass("xuan");
    $(this).addClass("xuan");
})


/***
Grid相关事件
***/
$(document).on("click","#table_cz_title",function(){
	$(this).attr("id","table_cz_title_cos");
	$(this).attr("class","fa fa-angle-double-up cz_title xuan");
	$(this).next(".cz_main").fadeIn();
});
$(document).on("click","#table_cz_title_cos",function(){
	$(this).attr("id","table_cz_title");
	$(this).attr("class","fa fa-angle-double-down cz_title");
	$(".cz_main").fadeOut();
});
$(document).on("click","#table_title_main",function(){
	$(this).attr("id","table_title_main_cos");
	$(this).addClass("xuan");
	$(this).siblings(".table_title_main").fadeIn();
});
$(document).on("click","#table_title_main_cos",function(){
	$(this).attr("id","table_title_main");
	$(this).removeClass("xuan");
	$(".table_title_main").fadeOut();
});


/***
流程jl_process
***/
$(document).on("click",".jl_process > i",function(){
	$(this).addClass("xuan");
	$(this).next(".jl_process_menu").removeClass("hide");
});
$(document).on("mouseleave",".jl_process",function(){
	$(this).children("i").removeClass("xuan");
	$(this).children(".jl_process_menu").addClass("hide");
});

/***
面包屑导航jl_breadcrumb
***/
$(document).on("mouseover",".qzdj_title",function(){
	$(this).children(".jl_dropdown_menu").fadeIn();
});
$(document).on("mouseleave",".qzdj_title",function(){
	$(this).children(".jl_dropdown_menu").fadeOut();
});


/***
滚动条事件
***/
$(document).on("scroll",window,function(){
/***
快速菜单jl_quicnav
***/
  $(".jl_quicnav");
  	
})


/***
页面目录jl_catalog
***/
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

	
/***
下拉菜单jl_navbar/jl_dropdown_menu
***/
$(document).on("mouseover",".jl_header > .jl_navbar > li",function(){
  $(this).addClass("xuan"); 
})
$(document).on("mouseleave",".jl_header > .jl_navbar > li",function(){
  $(this).removeClass("xuan"); 
})


/***
系统配置jl_pageconfigure
***/
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
 
 
/***
下拉按钮jl_btn_group
***/
$(document).on("click",".jl_btn_group > span",function(){
  var i_class = $(this).children("i").attr("class");
  $(this).addClass("xuan");
  $(this).siblings(".delete_input").children("input").focus();
  $(this).siblings(".delete_input").children("i").fadeIn(100);
  $(this).siblings(".jl_dropdown_menu").css({"display":"block"});
  if(i_class == "fa fa-angle-right"){
	 $(this).children("i").attr("class","fa fa-angle-left");
     $(this).siblings(".btn_hide_main").fadeOut();
   }else if(i_class == "fa fa-angle-left"){
	 $(this).children("i").attr("class","fa fa-angle-right");
     $(this).siblings(".btn_hide_main").fadeIn();
   }else if(i_class == "fa fa-angle-down"){
	 $(this).children("i").attr("class","fa fa-angle-up");
     $(this).siblings(".jl_dropdown_menu").css({"display":"block"});
   }else if(i_class == "fa fa-angle-up"){
	 $(this).children("i").attr("class","fa fa-angle-down");
     $(this).siblings(".jl_dropdown_menu").css({"display":"none"});
   }
})
$(document).on("focus",".jl_btn_group > input",function(){
  $(this).siblings("span").addClass("xuan");
  var i = $(this).siblings("span").find("i");
  if(i.hasClass("fa-angle-down")){
	  JL.changeClass(i, "fa-angle-down", "fa-angle-up");
  }
  $(this).siblings(".jl_dropdown_menu").css({"display":"block"});
})




/***
控件jl_input_radio
***/
$(document).on("click",".jl_input_radio",function(){
  var radio_class = $(this).children("i").attr("class");
  if(radio_class == "fa fa-circle-o"){
	 $(this).addClass("font_blue");
	 $(this).siblings().removeClass("font_blue");
     $(this).children("i").attr("class","fa fa-dot-circle-o");
	 $(this).siblings().children("i").attr("class","fa fa-circle-o");
  }	
})

/***
控件checkbox_css
***/
$(document).on("click",".checkbox_css",function(){
  var radio_class = $(this).children("i").attr("class");
  if(radio_class == "fa fa-square-o"){
	 $(this).addClass("font_blue");
     $(this).children("i").attr("class","fa fa-check-square");
  }else{
	 $(this).removeClass("font_blue");
     $(this).children("i").attr("class","fa fa-square-o");
  }	
})

/***
消息提示jl_message
***/
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

/***
消息提示jl_modal
***/
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


/***
下载附件
***/
$(document).on("click","#downattachments",function(){
  $(".jl_modal").fadeIn();
  $(".downattachments_main").removeClass("hide");
  $(".downattachments_main").animate({"margin-top":"35px","opacity":"1"});
})
$(document).on("click",".downattachments_close",function(){
  $(this).closest(".jl_modal").fadeOut();
  $(this).closest(".downattachments_main").animate({"margin-top":"0","opacity":"0"},function(){
	  $(".jl_modal_main").addClass("hide")
  });
})

/***
选择提示jl_confirm
***/
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

/***
下拉按钮多级jl_dropleft_menu
***/
$(document).on("mouseenter",".jl_dropdown_menu > li",function(){
  $(this).children(".jl_dropleft_menu").show();
})
$(document).on("mouseleave",".jl_dropdown_menu > li",function(){
  $(this).children(".jl_dropleft_menu").hide();
})

$(document).on("click",".jl_dropdown_menu > li#about",function(){
	$("jl_about").removeClass("hide")
	})



/***
jl_from_01/提示
***/
$(document).on("focus",".jl_form_01 > dl > dd input",function(){
  $(this).siblings("label").css({"display":"block"})
  $(this).parent().siblings("label").css({"display":"block"})
  $(this).parent().parent().siblings("label").css({"display":"block"})
}) 

 
/***
树形控件/jl_tree_02
***/
$(document).on("click",".jl_tree_02 > dl > dd:first-child",function(){
  var i_class = $(this).children("i:first-child").attr("class");
  if(i_class == "fa fa-minus-square-o"){
	$(this).children("i:first-child").attr("class","fa fa-plus-square-o");
	$(this).children("i:last-child").attr("class","fa fa-folder");
    $(this).parent("dl").next(".jl_form").nextUntil("dl").slideUp();
  }else{
	$(this).children("i:first-child").attr("class","fa fa-minus-square-o");
	$(this).children("i:last-child").attr("class","fa fa-folder-open");
    $(this).parent("dl").next(".jl_form").nextUntil("dl").slideDown();
  }
})

$(document).on("click",".jl_tree_02 > dl > dd > a",function(){
  var a_text = $(this).text();
  if(a_text == "编辑"){
	$(this).text("取消");
    $(this).parent("dd").parent("dl").addClass("xuan");
    $(this).parent("dd").parent("dl").next(".jl_form").slideDown();
  }else if(a_text == "取消"){
	$(this).text("编辑");
    $(this).parent("dd").parent("dl").removeClass("xuan");
    $(this).parent("dd").parent("dl").next(".jl_form").slideUp();
  }
})

$(document).on("click","#gszt",function(){
	$(this).prev(".jl_form").prevUntil(".jl_tree_02").addClass("xuan");
    $(this).prevUntil("dl").slideDown();
})



$(document).on("click",".jl_list_03 dd a",function(){
  var a_text = $(this).text();
  if(a_text == "编辑"){
	$(this).text("取消");
	$(".jl_list_03 .jl_form").slideUp();
	$(".jl_list_03 dl").removeClass("xuan");
	$(this).parent("span").parent("li").parent("ul").parent("dd").parent("dl").addClass("xuan");
	$(this).parent("span").parent("li").parent("ul").parent("dd").parent("dl").next(".jl_form").slideDown();
  }else if(a_text == "取消"){
	$(this).text("编辑");
	$(this).parent("span").parent("li").parent("ul").parent("dd").parent("dl").removeClass("xuan");
	$(this).parent("span").parent("li").parent("ul").parent("dd").parent("dl").next(".jl_form").slideUp();
  }
})

$(document).on("click",".add_item > span",function(){
	$(this).parent().addClass("xuan");
	$(this).parent().next(".jl_form").slideDown();
})


/***
jl_tab_title
***/
$(document).on("mouseover",".jl_tab_title > ul > li",function(){
  $(this).addClass("xuan");
  $(this).siblings("li").removeClass("xuan");
})

/***
list_item_title
***/
$(document).on("click",".list_item_title > i",function(){
  var i_class = $(this).attr("class");
  if(i_class == "fa fa-angle-down"){
    $(this).attr("class","fa fa-angle-right")
    $(this).attr("title","展开")
    $(this).parent(".list_item_title").next().slideUp();
  }else if(i_class == "fa fa-angle-right"){
    $(this).attr("class","fa fa-angle-down")
    $(this).attr("title","拉下")
    $(this).parent(".list_item_title").next().slideDown();
  }
})



/***
jl_screening > more
***/
$(document).on("mouseover",".jl_screening > .jl_screening_more",function(){
  $(this).siblings(".jl_screening_main").css({"border-bottom":"1px solid #00a2ca"})
})
$(document).on("mouseleave",".jl_screening > .jl_screening_more",function(){
  $(this).siblings(".jl_screening_main").css({"border-bottom":"1px solid #ccc"})
})
$(document).on("click",".jl_screening > .jl_screening_more > span",function(){
  var more_ul_class = $(this).parent(".jl_screening_more").siblings(".jl_screening_main").attr("class");
  if(more_ul_class == "jl_screening_main jl_screening_down"){
     $(this).parent(".jl_screening_more").siblings(".jl_screening_main").removeClass("jl_screening_down")
     $(this).empty();
     $(this).append("展开更多条件<i class='fa fa-angle-down'>");
  }else{
     $(this).parent(".jl_screening_more").siblings(".jl_screening_main").addClass("jl_screening_down")
     $(this).empty();
     $(this).append("收起<i class='fa fa-angle-up'>");
  }
})

})


