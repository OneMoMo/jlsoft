$(document).ready(function(){
	
	$("ul.left-nav li").click(function(){
		$(this).siblings(".active").removeClass("active");
		$(this).addClass("active");
	});
	
	/* search */
	$("div.search-content > div.s-title > a").click(function(){
		elecBilling.search($(this).prev("input").val());
	});
	
	$("div.search-content").delegate("ul > li", "click",function(event){
		$("div.jl_modal_CKSP").show();
		elecBilling.showCKSP($(this).data()["data"]);
	});
	
	/* 弹出层 */
	$("div.jl_modal").find("div.modal_footer > a").click(function(){
		/* model top parent */
		var parent = $(this).parent().parent().parent().parent();
		if($(this).index() === 1){
			if($(parent).attr("class").indexOf("CKSP") > -1 ){
				//return data
				var i = $(this).parent().prev().find("label > i.fa-check-circle-o").attr("index");
				var data = $(this).parent().prev().find('div[index='+i+']').data();
				elecBilling.returnCKSP(data["data"]);
			}
		}
		$("div.jl_modal").hide();
	});
	
	
	$("div.modal_close,div.modal_title > div > i.close").click(function(){
		$("div.jl_modal").hide();
	});
	
	$("div.jl_modal_CKSP").find("div.modal_title").find("div.w02").click(function(){
		if( $(this).find("i").attr("class").indexOf("check") > -1 ){
			$(this).find("i").removeClass("fa-check-circle-o").addClass("fa-circle-o");
		}else{
			$(this).find("i").removeClass("fa-circle-o").addClass("fa-check-circle-o");
		}
	});
	
	$("div.jl_modal_CKSP").find("div.modal_content").delegate("div.ware_item", "click",function(event){
		$(this).find("label > i").removeClass("fa-circle-o").addClass("fa-check-circle-o");
		$(this).siblings().find("label > i.fa-check-circle-o").removeClass("fa-check-circle-o").addClass("fa-circle-o");
		elecBilling.checkCKSP($(this));
	});

	/* main-list */	
	$("div.m-list").delegate(".m-header", "click",function(event){
		$(this).next(".m-body").slideToggle();
		if( $(this).find("div > a > i").attr('class').indexOf("down") > -1 ){
			$(this).find("div > a > i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		}else{
			$(this).find("div > a > i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		}
	});
	
	$("div.m-body").delegate("dl dt em", "click",function(event){
		if( $(this).attr("class").indexOf("check") > -1 ){
			$(this).removeClass("fa-check-square-o").addClass("fa-square-o");
			$(this).prev("input").removeAttr("checked");
		}else{
			$(this).removeClass("fa-square-o").addClass("fa-check-square-o");
			$(this).prev("input").attr("checked","checked");
		}
	});
	
	$("div.m-body").delegate("a.for_more", "click",function(event){
		$(this).parent(".more").next(".drop_down_main").fadeToggle("slow");
		if( $(this).children("i").attr("class").indexOf("down") > -1 ){
			$(this).children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
		}else{
			$(this).children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
		}
	});
	
	$("div.m-body").delegate("a.edit.font_blue.pl5", "click",function(event){
		var label = $(this).prev("label");
		if( $(this).children("i").attr("class").indexOf("check") > -1 ){
			$(label).find("input").hide();
			var inputVal = $(label).find("input").val();
			$(label).find("span").text(inputVal);
			$(label).find("span").show();
			$(this).html('<i class="fa fa-edit pr5"></i>修改');
			elecBilling.changeSPJE( $(label).parent().parent().parent() );
		}else{
			$(label).find("span").hide();
			$(label).find("input").show();
			$(this).html('<i class="fa fa-check pr5"></i>保存');
		}
	});
	
	$("div.m-body").delegate("dd.ticket > a", "click",function(event){
		$("div.jl_modal_YHJ").show();
	
	});
	
	$("div.m-body").delegate("dd.tool > a", "click",function(event){
		var num = 0;
		if( $(this).find("i").attr("class").indexOf("minus") > -1 ){
			num = parseInt( $(this).next("input").val() );
			if( isNaN(num) ){
				alert("请输入正确格式内容");
				num = 1;
				return;
			}else if( (num-1) <= 0 ){
				alert("数量必须大于0");
				num = 1;
				return;
			}else{
				num -= 1;
			}
			$(this).next("input").val(num);
		}else{
			num = parseInt( $(this).prev("input").val() );
			if( isNaN(num) ){
				alert("请输入正确格式内容");
				num = 1;
				return;
			}else{
				num += 1;
			}
		}
		$(this).prev("input").val(num);
		elecBilling.changeSPJE( $(this).parent().parent() );
	});
	
	
	/* 点击模块 收缩效果 */
	$("div.securitiesDeposited, div.hy , div.fw").delegate("div.public_header", "click",function(event){
		$(this).next("div.public_body").slideToggle();
		if( $(this).find("i").attr("class").indexOf("down") > -1 ){
			$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		}else{
			$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		}
	});
	
	/* 人员地址列表 */
	$("input[name=KHDH]").parent("label").siblings("a").click(function(){
		$("div.jl_modal_RYDZ").show();
	});
	
	
	/*会员建卡*/
	$("div.main-content > div.footer > a.hyjk").click(function(){
		$("div.jl_modal_HYJK").show();
	});
	
	
	/*订单查询*/
	$("header > div.w04 > a.ddcx").click(function(){
		$("div.jl_modal_DDCX").show();
	});
	
	
	/*确定支付*/
	$("div.main-content > div.footer > a.qdzf").click(function(){
		$("div.jl_modal_QDZF").show();
		elecBilling.checkDDSP();
	});
	
});



$(document).on("swipeleft",".page-container > .jd_content",function(){
	alert(1);
});
$(document).on("swiperight",".page-container > .jd_content",function(){
	alert(1);
});

$("div").on("swipeleft",function(){
    alert("您向左滑动!");
}); 