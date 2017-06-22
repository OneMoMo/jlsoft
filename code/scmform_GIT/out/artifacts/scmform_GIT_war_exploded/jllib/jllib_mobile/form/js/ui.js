$(document).ready(function(){
	var resultfontSize = $.cookie("resultfontSize");
    	resultfontSize = JSON.parse(resultfontSize);
	  if(resultfontSize){
	   if(resultfontSize["resultfontSize"]=="12px"){
			$("body").attr("style","font-size:12px !important");
	   }else if(resultfontSize["resultfontSize"]=="14px"){
			$("body").attr("style","font-size:14px !important");
	   }else if(resultfontSize["resultfontSize"]=="16px"){
		   $("body").attr("style","font-size:16px !important");
	   }else if(resultfontSize["resultfontSize"]=="18px"){
		   $("body").attr("style","font-size:18px !important");
	   }
	   
	  }

/***
load页面
jl_page_container
李龙威
***/
$(".jl_footer").load("footer.html");
$(".page_content").load("menu.html")
$(document).on("click",".jl_footer > ul > li",function(){
	var this_text = $(this).children("a").children("span").text();
	if(this_text == "消息"){
		$(".page_content").load("daiban.html")
	}else if(this_text == "我的"){
		$(".page_content").load("user.html")
	}else{
		$(".page_content").load("menu.html")
	}
})

	/*******************************************************************************
	 * 控件jl_input_radio
	 ******************************************************************************/
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
设置系统字体大小
李龙威
***/
var fontSize;
$(document).on("click",".jl_font_small",function(){
	$("body").attr("style","font-size:12px !important");
	fontSize="12px";
	$("#message_ts").text("小");
	var reData = {};
    reData["fontSize"] = fontSize;
    $.cookie("fontSize", JSON.stringify(reData),{path:"/"});
   
})

$(document).on("click",".jl_font_standard",function(){
	$("body").attr("style","font-size:14px !important");
	fontSize="14px";
	$("#message_ts").text("标准");
	var reData = {};
    reData["fontSize"] = fontSize;
   $.cookie("fontSize", JSON.stringify(reData),{path:"/"});
})

$(document).on("click",".jl_font_large",function(){
	$("body").attr("style","font-size:16px !important");
	fontSize="16px";
	$("#message_ts").text("大");
	var reData = {};
	 reData["fontSize"] = fontSize;
	 $.cookie("fontSize", JSON.stringify(reData),{path:"/"});
})

$(document).on("click",".jl_font_super",function(){
	$("body").attr("style","font-size:18px !important");
	fontSize="18px";
	$("#message_ts").text("超大");
	var reData = {};
	 reData["fontSize"] = fontSize;
	 $.cookie("fontSize", JSON.stringify(reData),{path:"/"});
})

$(document).on("click",".jl_footer > ul > li",function(){
	  $(".jl_footer > ul > li").removeClass("xuan");
	  $(this).addClass("xuan");
})


/***
提示
jl_modal_radio
李龙威
***/
$(document).on("click",".message_ts",function(){
  $(".jl_modal").fadeIn();
  $(".jl_modal_radio").removeClass("hide");
  var message_height = -$(".jl_modal_radio").height()/2-30;
  $(".jl_modal_radio").animate({"margin-top":message_height,"opacity":"1"});
   
})

$(document).on("click",".jl_modal_close",function(){
  $(".jl_modal").fadeOut();
  $(".jl_modal_radio").animate({"margin-top":"0","opacity":"0"},function(){$(".jl_modal_radio").addClass("hide")});
})

$(document).on("click",".jl_modal_radio > li",function(){
  $(".jl_modal").fadeOut();
  $(".jl_modal_radio").animate({"margin-top":"0","opacity":"0"},function(){$(".jl_modal_radio").addClass("hide")});
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
$(document).on("click",".message_ts",function(){
	$(".jl_modal").fadeIn();
	$(".jl_message").removeClass("hide");
	var message_height = -$(".jl_message").height()/2-30;
	$(".jl_message").animate({"margin-top":message_height,"opacity":"1"});
})
$(document).on("click",".jl_modal_close",function(){
	$(".jl_modal").fadeOut();
	$(".jl_message").animate({"margin-top":"0","opacity":"0"},function(){$(".jl_message").addClass("hide")});
})






});


function selectShow(){
  $(".cui-pop-box").animate({"bottom":"0"});
}


/***
滑动操作
***/
$(document).on("pageinit",".swiper",function(){
	 $(".list_case").on("swipeleft",function(){
		    $(this).children("ul").animate({"margin-left":"-200px"});
			$(this).children(".btn").animate({"right":"0"});
		  });
		  
		  $(".list_case").on("swiperight",function(){
		    $(this).children("ul").animate({"margin-left":"0"});
			$(this).children(".btn").animate({"right":"-100%"});
		  });                   
	});


/***
批量操作
***/
$(document).on("click","#edit_title",function(){	
      var this_text = $(this).text();
	  if(this_text == "批量操作"){
        $(this).text("取消")
	    $(".list_case > ul > li").animate({"padding-left":"30px"});
	    $(".form_checkbox").fadeIn();  
		$(".jl_edit_main").fadeIn();
	  }else{
        $(this).text("批量操作")
	    $(".list_case > ul > li").animate({"padding-left":"0"});
	    $(".form_checkbox").fadeOut();   
		$(".jl_edit_main").fadeOut();
	  }       
});


/***
title收起展开
***/
$(document).on("click",".jl_title",function(){
	var this_i_class = $(this).children("i").attr("class");
	if(this_i_class == "fa fa-angle-down"){
		$(this).children("i").attr("class","fa fa-angle-left");
		$(this).next().slideUp();
	}else if(this_i_class == "fa fa-angle-left"){
		$(this).children("i").attr("class","fa fa-angle-down");
		$(this).next().slideDown();
	}
})


/***
流程展示
jl_process
李龙威
***/
$(document).on("click",".jl_process_open",function(){
	$(".jl_process").fadeIn();
	$(".jl_process").children("ul").animate({"right":"0px"});
})
$(document).on("click",".jl_process_close",function(){
	$(".jl_process").fadeOut();
	$(".jl_process").children("ul").animate({"right":"-100%"});
})