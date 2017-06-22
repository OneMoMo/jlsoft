$(document).ready(function(){
  $(".jl_header").load("jl_header.html?r"+Math.random());
  $(".jl_nav").load("jl_nav.html?r"+Math.random());
  $(".jl_footer").load("jl_footer.html?r"+Math.random());
  $(".jl_quicnav").load("jl_quicnav.html?r"+Math.random());	
  $(".jl_pageconfigure").load("jl_pageconfigure.html?r"+Math.random());	
  $(".jl_operation").load("jl_operation.html?r"+Math.random());	
  $(".jl_modal").load("jl_modal.html?r"+Math.random());	
  $(".jl_catalog").load("jl_catalog.html?r"+Math.random());	
  $(".jl_content").load("jl_index.html?r"+Math.random());
  $(".jl_message").load("jl_message.html?r"+Math.random());
  $(".jl_modal").load("弹出层模板.html?r"+Math.random());
  $(".jl_draftbox").load("jl_draftbox.html?r"+Math.random());
  $(document).on("click",".sub_menu > li",function(){
     var this_text = $(this).children("a").children("span").text();
	 if(this_text == "首页"){
       $(".jl_content").load("jl_index.html?r"+Math.random());
	 }else if(this_text == "系统设置"){
       $(".jl_content").load("jl_syset.html?r"+Math.random());
	 }else if(this_text == "表单模板"){
       $(".jl_content").load("jl_form.html?r"+Math.random());
	 }else if(this_text == "OA模板"){
       $(".jl_content").load("jl_oa.html?r"+Math.random());
	 }else if(this_text == "上传图片"){
       $(".jl_content").load("jl_form.html?r"+Math.random());
	 }else if(this_text == "表格模板"){
       $(".jl_content").load("jl_table.html?r"+Math.random());
	 }else if(this_text == "列表模板"){
       $(".jl_content").load("jl_list.html?r"+Math.random());
	 }else if(this_text == "维修看板模板"){
       $(".jl_content").load("jl_kanban.html?r"+Math.random());
	 }else if(this_text == "批量操作"){
       $(".jl_content").load("jl_piliang.html?r"+Math.random());
	 }else if(this_text == "打印模板"){
       $(".jl_content").load("jl_print.html?r"+Math.random());
	 }else if(this_text == "新闻详细页模板"){
       $(".jl_content").load("jl_news_main.html?r"+Math.random());
	 }
  })
  $(document).on("click","#oa_main",function(){
	 $(".jl_content").load("jl_oa_main.html?r"+Math.random()) 
  })
  $(document).on("click","#oa_main_01",function(){
	 $(".jl_content").load("jl_oa_main_01.html?r"+Math.random()) 
  })
})


