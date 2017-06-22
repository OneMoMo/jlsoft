$(document).ready(function(){
/****登录****/
$("#login_btn").click(function(){
	var login_user = $("#login_user").val();
	if(login_user == ""){
	    $(".model").fadeIn();
	  }else{
	    window.location.href='index.html';
	  }
   })
   
$(".seach_main").click(function(){
	  window.location.href='seachPro.html';
   })
   
$("#Hy_ui_btn_test").click(function(){
	  var Hy_input_val = $("#Hy_ui_input_val").val();
	  if(Hy_input_val == "1"){
		$("#Hy_ui_001").addClass("hide"); 
		$("#Hy_ui_002").removeClass("hide"); 
		$("#Hy_ui_003").addClass("hide"); 
	  }if(Hy_input_val == "2"){
		$("#Hy_ui_001").addClass("hide"); 
		$("#Hy_ui_002").addClass("hide"); 
		$("#Hy_ui_003").addClass("hide"); 
		$("#Hy_ui_004").removeClass("hide"); 
	  }
   })
   
$("span.more").click(function(){
	var this_text = $(this).text();
	if(this_text == "更多"){
	  $(this).siblings("span").css({"max-height":"inherit","overflow":"auto"});
	  $(this).html("收起<i class='fa fa-angle-up ml5'></i>")
	}else if(this_text == "收起"){
	  $(this).siblings("span").css({"max-height":"10rem","overflow":"hidden"});
	  $(this).html("更多<i class='fa fa-angle-down ml5'></i>")
	}
   })
   
$(".jl_list_case i").click(function(){
	var this_class = $(this).attr("class");
	if(this_class == "fa fa-heart-o"){
      $(".model").removeClass("hide");
      $(this).attr("class","fa fa-heart xuan");
	}else if(this_class == "fa fa-heart xuan"){
      $(this).attr("class","fa fa-heart-o");
	}
})

$("#pro_info_ui_title").click(function(){
   $(".model").removeClass("hide");
   $(".pro_info_sx").animate({right:"0"});
})
   
/****提示关闭****/
$("#model_close").click(function(){
	  $(".pro_info_sx").animate({right:"-100%"});
	  $(".model").addClass("hide");
   })

$("#guanzhu").click(function(){
	  $(this).addClass("xuan");
   })
   
$(".user_info_title li").click(function(){
	  var this_text = $(this).text();
	  if(this_text == "选会员"){
	     $(".user_info").removeClass("hide");
		 $(".none_user_info").addClass("hide");
		 $(".sales_info").addClass("hide");
	  }else if(this_text == "非会员"){
		 $(".model").fadeIn();
	     $(".user_info").addClass("hide");
		 $(".none_user_info").removeClass("hide");
		 $(".sales_info").addClass("hide");
	  }else if(this_text == "选营业员"){
	     $(".user_info").addClass("hide");
		 $(".none_user_info").addClass("hide");
		 $(".sales_info").removeClass("hide");
	  }
   })
$(".coupon_prepaid_tltle li").click(function(){
	  var this_text = $(this).text();
	  if(this_text == "电子券"){
	     $(".coupon").removeClass("hide");
		 $(".prepaid").addClass("hide");
	  }else if(this_text == "活动"){
	     $(".coupon").addClass("hide");
		 $(".prepaid").removeClass("hide");
	  }
   })
$(".cat_cz").click(function(){
	  var this_text = $(this).text();
	  if(this_text == "立即使用"){
		$(this).text("取消使用")
	    $(this).parent(".cat_case").parent("li").addClass("xuan")
	  }else if(this_text == "取消使用"){
		$(this).text("立即使用")
	    $(this).parent(".cat_case").parent("li").removeClass("xuan")
	  }else if(this_text == "立即送储值"){
		$(this).text("取消送储值")
	    $(this).parent(".cat_case").parent("li").addClass("xuan")
	  }else if(this_text == "取消送储值"){
		$(this).text("立即送储值")
	    $(this).parent(".cat_case").parent("li").removeClass("xuan")
	  }
   })
   
   
/****input****/
$(".jl_input > input").focus(function(){
	  $(this).next("i").css({"display":"block"});
   }) 
   
/****jl_tab****/ 
$(".jl_tab li").click(function(){
	  $(this).addClass("xuan");
	  $(this).siblings("li").removeClass("xuan");
   }) 
   
})
