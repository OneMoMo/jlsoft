var JLClassBrand = function(json){
	this.config = {
		"title": "",
		"param": {},	
		"listener": {}
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = "";
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setData = function(data){
		this.data = data;
	}

	this.getData = function(){
		return this.data;
	}

	this.setCdsData = function(json , cdsid){
	}
	
	this.loadData = function(){
		var result = [];
		var param = this.config.param;
		var transport = new JLTransport();
		var resultData = [];
		if(!JL.isNull(this.config.sBillName) && !JL.isNull(this.config.sOperateName)){
			resultData = transport.select(this.config.sBillName, this.config.sOperateName, param);
		}
		return resultData;
	}
	
	this.init = function(){
		$(this.obj).empty();
		this.write();
	}
	
	this.showDL = function(){
		$(this.obj).find("dl").show();
	}
	
	this.loadOption = function(data){
		var dl = $("<dl class=\"w12\"></dl>").appendTo(thisPlugin.config.obj);
		$("<dt class=\"w01\">"+this.config.title+"：</dt>").appendTo(dl);
		var dd = $("<dd class=\"w09\"><div class=\"w12 s_brand_img\"><ul></ul></div></dd>").appendTo(dl);
		
		for(var i=0; i<data.length; i++){
			var row = data[i];
			var li = $("<li>"+row.value+"</li>").appendTo(dd.find("> div > ul"));
			li.data(row);
			li.click(function(){
				$(this).closest("dl").hide();
				var liData = $(this).data();
				var cds = thisPlugin.getCds();
				cds.edit();
				cds.put(thisPlugin.config["cds-field"], liData);
				cds.submit();
				
				if (!JL.isNull(thisPlugin.config.listener.click)) {  
					thisPlugin.config.listener.click(liData);
				}
			});
		}
	}
	
	this.write = function(){
		var resultData = this.loadData();
		if(resultData.length>0){
			//循环所有分类关联品牌，判断是否有对应品牌
			$.each(resultData, function(i, spflData) {
				if(spflData.spfl.key == thisPlugin.config.param.paramValue){
					var dd_pp;
					if(spflData.ppList.length>0){
						var dl = $("<dl class=\"w12\"></dl>").appendTo(thisPlugin.config.obj);
						$("<dt class=\"w01\">品牌：</dt>").appendTo(dl);
						dd_pp = $("<dd class=\"w09\"><div class=\"w12 s_brand_img\"><ul></ul></div></dd>").appendTo(dl);
						//循环品牌值
						$.each(spflData.ppList, function(j, ppData) {
							var li = $("<li>"+ppData.value+"</li>").appendTo(dd_pp.children("div").children("ul"));
							li.data(ppData);
							//点击品牌
							li.click(function(){
								$(this).closest("dl").hide();
								var liData = $(this).data();
								var cds = thisPlugin.getCds();
								cds.edit();
								cds.put(thisPlugin.config["cds-field"], liData);
								cds.submit();
								
								if (!JL.isNull(thisPlugin.config.listener.click)) {  
									thisPlugin.config.listener.click(liData);
								}
							});
							//显示更多控制
							var dd_ppWidth = $(dd_pp).width();
							var liWidth = 0;
							liWidth = liWidth + $(li).width() + 20;
							if(j==eval(spflData.ppList.length-1)){
								if(liWidth > dd_ppWidth){
									$(dd_pp).children().attr("style","overflow: hidden;height: 50px;");
									var dd_more = $("<dd class=\"w02\"><a class=\"btn\">更多<i class=\"fa fa-chevron-up\"></i></a></dd>").appendTo(dl);
									dd_more.click(function(){
										if($(dd_pp).children().attr("style") == ""){
											$(dd_pp).children().attr("style","overflow: hidden;height: 50px;");
											$(this).find("i").attr("class","fa fa-chevron-down");
										}else{
											$(dd_pp).children().attr("style","");
											$(this).find("i").attr("class","fa fa-chevron-up");
										}
									});
								}
							}
						});
					}
					return false;
				}
			});
		}
	}
	
	this.init();
};