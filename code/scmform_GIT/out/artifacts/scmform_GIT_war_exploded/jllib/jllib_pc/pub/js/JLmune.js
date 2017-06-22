var JLmune =function(json){
	var userInfoCookie = $.cookie("userInfo");
	var userInfo = JSON.parse(userInfoCookie);
	this.config = {
	
		};
		$.extend(this.config,json);	
		var thisPlugin = this;
		this.obj = this.config.obj;
		this.form = this.config.form;

		this.version = 3;
		this.data = {};
	

	this.init= function(){
		console.info("JLmune.init");
		var XmlData = {};
		XmlData["CZY01"] = userInfo["PCRM_CZY01"];

		var ajaxJson={};
		ajaxJson["src"]= "http://localhost:30800/form5/user/getMenu.do";
		ajaxJson["data"]={"XmlData":JSON.stringify(XmlData)};
		console.info(ajaxJson);
		var resultData = JL.ajax(ajaxJson);

		if(resultData){
		
			var data=resultData.data.resultList;
				
			var model= $("#d_model");
			model.empty();
			for(var i=0;i<data.length;i++){
			$('<li class="w04"><dl><dt><i class="fa fa-edit font_red"></i></dt><dd>'+data[i].CD02+'</dd></dl></li>')
			.appendTo(model);
			}
		}
		
	};
	
	this.init();
	
};



