var loadUserConfig = function(){
	
	//首页顶部导航隐藏
	if($.inArray("0", userConfig.show) != -1){
		$(".jl_header").css({"margin-top": "-42px"});
		$(".jl_main").css({"margin-top": "0px"});
		$(".jl_nav").css({"top": "0px"});
		$(".jl_pageconfigure").css({"top": "3px"});
		$("#systemConfig [name='top'] .lbl_ture").css({"left": "-100%"});
		$("#systemConfig [name='top'] .lbl_false").css({"left": "0"});
	}

	//首页左侧菜单隐藏
	if($.inArray("1", userConfig.show) != -1){
		$(".jl_nav").css({"left":"-225px"});
		$(".jl_content").css({"margin-left":"0px","padding": "10px 20px 80px 20px"});
		$("#systemConfig [name='left'] .lbl_ture").css({"left": "-100%"});
		$("#systemConfig [name='left'] .lbl_false").css({"left": "0"});
	}
	
}