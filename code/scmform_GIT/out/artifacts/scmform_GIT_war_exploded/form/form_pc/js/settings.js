var settings = JL.JLForm();

settings.setPlugin({
	"SHOW": {
		"jlid": "JLCheckbox",
		"css": "w12",
		"options": {
			"0": "隐藏系统顶部",
			"1": "隐藏系统左侧主菜单"
		},
		"listener": {
			"checked": function(data, checked){
				if(checked){
					if(data.key == "0"){
						$('.jl_header').animate({'margin-top': '-42'},200);
						$('.jl_main').animate({'margin-top': '0'},200);
						$('.jl_nav').animate({'top': '0'},200);
						$('.jl_pageconfigure').animate({'top': '3'},200);
					}else if(data.key == "1"){
						$('.jl_nav').animate({'left':'-225'},200);
						$('.jl_content').animate({'margin-left':'0','padding': '10px 20px 80px 20px'},200);
					}
				} else {
					if(data.key == "0"){
						$('.jl_header').animate({'margin-top': '0'},200);
						$('.jl_main').animate({'margin-top': '42'},200);
						$('.jl_nav').animate({'top': '42'},200);
						$('.jl_pageconfigure').animate({'top': '45'},200);
					}else if(data.key == "1"){
						$('.jl_nav').animate({'left':'0'},200);
						$('.jl_content').animate({'margin-left':'225','padding': '10px 245px 80px 20px'},200);
					}
				}
			}
		}
	}
});

settings.setEvent([{
	"selector": "#save",
	"event": "click",
	"func": function(){
		var XmlData = {};

		userConfig.SHOW = settings.getPluginObj("SHOW").getData();
		userConfig.show = settings.getPluginObj("SHOW").getArrData();
		$.cookie("userConfig", null);
		$.cookie("userConfig", JSON.stringify(userConfig));
		
		XmlData["SHOW"] = settings.getPluginObj("SHOW").getData();
		XmlData["show"] = settings.getPluginObj("SHOW").getArrData();
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/user/saveUserConfig.do";
		ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		console.info(resultData);
	}
}])

settings.setAfterInit(function() {
	settings.getPluginObj("SHOW").setData(userConfig.SHOW || []);
});


