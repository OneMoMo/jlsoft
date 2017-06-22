$(document).ready(function(){
  $(".jl_header").load("jl_header.html");
  $(".jl_nav").load("jl_nav.html");
  $(".jl_footer").load("jl_footer.html");
  $(".jl_quicnav").load("jl_quicnav.html");	
  $(".jl_pageconfigure").load("jl_pageconfigure.html");	
  $(".jl_operation").load("jl_operation.html");	
  $(".jl_modal").load("jl_modal.html");	
  $(".jl_catalog").load("jl_catalog.html");	
  $(".jl_content").load("jl_index.html");
  $(".jl_message").load("jl_message.html");
  $(".jl_modal").load("弹出层模板.html");
  $(".jl_draftbox").load("jl_draftbox.html");	
  $(document).on("click",".sub_menu > li",function(){
     var this_text = $(this).children("a").children("span").text();
	 if(this_text == "定义品牌"){
       $(".jl_content").load("jl_dypp.html");
	 }else if(this_text == "定义分类"){
       $(".jl_content").load("jl_dyfl.html");
	 }else if(this_text == "定义分类品牌"){
       $(".jl_content").load("jl_dyflpp.html");
	 }else if(this_text == "定义分类属性"){
       $(".jl_content").load("jl_dyflsx.html");
	 }else if(this_text == "定义页面"){
       $(".jl_content").load("jl_dyym.html");
	 }else if(this_text == "发布商品"){
       $(".jl_content").load("jl_fbsp.html");
	 }else if(this_text == "表单模板"){
       $(".jl_content").load("jl_form.html");
	 }else if(this_text == "上传图片"){
       $(".jl_content").load("jl_sctp.html");
	 }else if(this_text == "表格模板"){
       $(".jl_content").load("jl_table.html");
	 }else if(this_text == "列表模板"){
       $(".jl_content").load("jl_list.html");
	 }else if(this_text == "维修看板模板"){
       $(".jl_content").load("jl_kanban.html");
	 }
  })

  
})


