var JLClassAttr = function(json){
	this.config = {
			"param": {},	
			"listener": {},	
			"sBillName": "jlquery",
			"sOperateName": "select.do"
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = [];
	
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
		var resultData = transport.select(this.config.sBillName, this.config.sOperateName, param);
		return resultData;
	}
	
	this.init = function(){
		$(this.obj).empty();
		this.write();
	}

	this.showDL = function(name){
		console.info($(this.obj).find("dl[data-name='"+name+"']"));
		$(this.obj).find("dl[data-name='"+name+"']").show();
	}
	
	this.write = function(){
		var resultData = this.loadData();
		if(resultData.length>0){	
			$.each(resultData, function(i, spflData) {
				if(spflData.spfl.key == thisPlugin.config.param.paramValue){
					$.each(spflData.item, function(i, flsxData) {
						var dl = $("<dl class=\"w12\"></dl>").appendTo(thisPlugin.obj);
						dl.attr("data-name", flsxData.name);
						dl.data(flsxData);
						var dt = $("<dt class=\"w01\">"+flsxData.name+"：</dt>").appendTo(dl);
						var dd = $("<dd class=\"w09\"></dd>").appendTo(dl);
						//拼接属性值
						$.each(flsxData.item, function(j, flsxzData) {
							var a = $("<a>"+flsxzData.name+"</a>").appendTo(dd);
							a.data(flsxzData);
							a.click(function(){
								var closeDL = $(this).closest("dl");
								closeDL.hide();
								var dlData = closeDL.data();
								var aData = $(this).data("name");
								var cds = thisPlugin.getCds();
								
								var cdsData = {};
								cdsData[flsxData.name] = aData;
								
								cds.edit();
								cds.put(thisPlugin.config["cds-field"], cdsData);
								cds.submit();
							});
						});
						//增加更多选择
						var ddWidth = $(dd).width();
						var aArr = $(dd).find("a");
						var aWidth = 0;
						for(var i=0;i<aArr.length;i++){
							aWidth = aWidth + $(aArr[i]).width() + 25;
						}
						if(aWidth>ddWidth){
							$(dd).attr("style","overflow: hidden;height: 25px;");
							if(i=eval(spflData.item.length-1)){
								var dd_more=$("<dd class=\"w02\"><a class=\"btn\">更多<i class=\"fa fa-chevron-down\"></i></a></dd>").appendTo(dl);
								dd_more.click(function(){
									if($(dd).attr("style") == ""){
										$(dd).attr("style","overflow: hidden;height: 25px;");
										$(this).find("i").attr("class","fa fa-chevron-down");
									}else{
										$(dd).attr("style","");
										$(this).find("i").attr("class","fa fa-chevron-up");
									}
								});
							}
						}
					});
					return false;
				}
			});
		}
	}
	
	this.init();
};