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
  $(".jl_content").load("jl_dypp.html");
  $(".jl_message").load("jl_message.html");
  $(".jl_modal").load("弹出层模板.html");
  $(".jl_draftbox").load("jl_draftbox.html");	
  $(document).on("click",".fou_menu > ul > li",function(){
     var this_text = $(this).children("a").children("span").text();
	 if(this_text == "定义返利代码"){
       $(".jl_content").load("page/basInfor/jl_dyfldm.html");
	 }else if(this_text == "定义公司"){
       $(".jl_content").load("page/basInfor/defineGSZT.html");
	 }else if(this_text == "定义人员"){
       $(".jl_content").load("page/basInfor/makeRYXX.html");
	 }else if(this_text == "定义商品信息"){
       $(".jl_content").load("page/basInfor/jl_dyspxx.html");
	 }else if(this_text == "定义部门仓库权限"){
       $(".jl_content").load("page/basInfor/jl_dybmckqx.html");
	 }else if(this_text == "定义商品分类"){
       $(".jl_content").load("page/basInfor/makeSPFL.html");
	 }else if(this_text == "定义收款方式"){
       $(".jl_content").load("page/basInfor/defineSKFS.html");
	 }
  })
  $(document).on("click",".sub_menu > li",function(){
     var this_text = $(this).children("a").children("span").text();
	 if(this_text == "送货单"){		 
       $(".jl_content").load("page/basInfor/deliveryNote.html");
	 }else if(this_text == "仓库收发货加扫码"){
       $(".jl_content").load("page/basInfor/scanCode.html");
	 }else if(this_text == "订货单"){
       $(".jl_content").load("page/basInfor/order.html");
	 }
  })
  $(document).on("click",".jl_note",function(){
    $(".jl_content").load("jl_note_main.html");
  })
  $(document).on("click",".jl_draftbox",function(){
    $(".jl_content").load("jl_draftbox_main.html");
  })
  $(document).on("click",".ljfb",function(){
    $(".jl_content").load("jl_fbsp02.html");
  })
  $(document).on("click",".jl_draftbox",function(){
    $(".jl_content").load("jl_draftbox_main.html");
  })
  
})


