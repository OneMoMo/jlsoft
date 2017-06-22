var o2o_bannerAD = function(json){
	this.config = {
	}
	$.extend(this.config, json);
	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = "";
	
	this.setData = function(data){
		this.data = data;
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.init = function(){
		this.write();
	}
	
	this.write = function(){
		$(this.obj).empty();
		var doc = typeof this.config.doc =="string"?JSON.parse(this.config.doc):this.config.doc;
		if(doc.url != "http://"){
			$(this.obj).attr("href",""+doc.url+"");
		}
		$(this.obj).attr("style","background:url("+doc.img+") 50% 0% no-repeat;");
		//$(this.obj).append('<img src="'+doc.img+'"/>');
	}
	
	this.init();
}