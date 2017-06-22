$(document).ready(function(){

 $(".jl_footer").load("jl_footer.html");
  $(".page_content").load("menu.html")

$(document).on("click",".jl_footer > ul > li",function(){
  var this_text = $(this).children("a").children("span").text();
  if(this_text == "消息"){
    $(".page_content").load("message.html")
   }else if(this_text == "我的"){
    $(".page_content").load("user.html")
   }else{
    $(".page_content").load("menu.html")
   }
})
  
/***
当前页面容器
jl_page_container
李龙威
***/
$(document).on("click",".jl_form_01 > ul > li",function(){
  var this_text = $(this).children("dl").children("dt").text();
  if(this_text == "单选"){
	$(".jl_page_container").load("jl_Radio.html"); 
  }else if(this_text == "多选"){
	$(".jl_page_container").load("jl_Checkbox.html"); 
  }else if(this_text == "时间控件"){
	$(".jl_page_container").load("jl_Time.html"); 
  }else if(this_text == "地区控件"){
	$(".jl_page_container").load("jl_Address.html"); 
  }else if(this_text == "列表控件"){
	$(".jl_page_container").load("jl_List.html"); 
  }else if(this_text == "选项卡控件"){
	$(".jl_page_container").load("jl_Tab.html"); 
  }else if(this_text == "搜索控件"){
	$(".jl_page_container").load("jl_Seach.html"); 
  }else if(this_text == "按钮"){
	$(".jl_page_container").load("jl_Btn.html"); 
  }
});

$(document).on("click","#order_title",function(){
	$(".jl_page_container").load("query.html"); 
});
$(document).on("click","#ov_title",function(){
	$(".jl_page_container").load("ov_seach.html"); 
});
$(document).on("click",".addcompany_title",function(){
	$(".jl_page_container").load("addcompany.html"); 
});
$(document).on("click",".seach_title",function(){
	$(".jl_page_container").load("seach.html"); 
});

$(document).on("click",".jl_footer > ul > li",function(){
  $(".jl_footer > ul > li").removeClass("xuan");
  $(this).addClass("xuan");
})
	
/***
单选控件
jl_input_radio
李龙威
***/
$(document).on("click",".jl_input_radio",function(){
  var this_class = $(this).children("i").attr("class");
  if(this_class == "fa fa-circle-o"){
    $(this).children("i").attr("class","fa fa-dot-circle-o");
  }else{
    $(this).children("i").attr("class","fa fa-circle-o");
  }
})

$(document).on("click",".jl_title > i",function(){
  var this_i_class = $(this).attr("class");
  if(this_i_class == "fa fa-angle-down"){
    $(this).attr("class","fa fa-angle-left");
	$(this).parent(".jl_title").next().slideUp();
  }else if(this_i_class == "fa fa-angle-left"){
    $(this).attr("class","fa fa-angle-down");
	$(this).parent(".jl_title").next().slideDown();
  }
})







/***
提示
jl_form_01展开
李龙威
***/
$(document).on("click",".jl_form_01 > ul > li",function(){
	var i_class = $(this).children("dl").children("dd").children("i").attr("class");
    if(i_class == "fa fa-angle-down"){
		var i_class = $(this).children("dl").children("dd").children("i").attr("class","fa fa-angle-up")
		$(this).children("dl").children("dd:last").slideDown();
	}else if(i_class == "fa fa-angle-up"){
		var i_class = $(this).children("dl").children("dd").children("i").attr("class","fa fa-angle-down")
		$(this).children("dl").children("dd:last").slideUp();
	}
})  

/***
提示
jl_message
李龙威
***/
$(document).on("click","#message_ts",function(){  
  $(".jl_modal").fadeIn();
  $(".jl_message").removeClass("hide");
  var message_height = -$(".jl_message").height()/2-30;
  $(".jl_message").animate({"margin-top":message_height,"opacity":"1"});
})
$(document).on("click",".jl_modal_close",function(){
  $(".jl_modal").fadeOut();
  $(".jl_message").animate({"margin-top":"0","opacity":"0"},function(){$(".jl_message").addClass("hide")});
})


/***
列表编辑模式
jl_page_container
李龙威
***/
$(document).on("click",".header_nav > .fa-pencil-square-o",function(){  
  $(this).attr("class","fa fa-check-square-o");
  $(".jl_form_01 > ul > li > i").fadeIn();
  $(".jl_form_01 > ul > li > dl").animate({"padding-left":"20px"},300);
})
$(document).on("click",".header_nav > .fa-check-square-o",function(){  
  $(this).attr("class","fa fa-pencil-square-o");
  $(".jl_form_01 > ul > li > i").fadeOut();
  $(".jl_form_01 > ul > li > dl").animate({"padding-left":"0"},300);
})

});

/***
当前页面容器
jl_page_container
李龙威
***/
function pageContainerShow(){
  $(".jl_page_container").animate({"right":"0px"},300);
}
function pageContainerHide(){
  $(".jl_page_container").animate({"right":"-100%"},300);
}

function selectShow(){
  $(".cui-pop-box").animate({"bottom":"0"});
}
