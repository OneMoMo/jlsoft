var o2o_imgAD = function(json){
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
		var doc = typeof json.doc =="string"?JSON.parse(json.doc):json.doc;
		//var hrefUrl = pubJson.getURL("FormUrl")+"/news/news.html?htmlUrl=" + doc.url;
		$(this.obj).append('<a href="' + doc.url + '"><img class=\"lazy\" data-original="'+doc.img+'"/></a>');
	}
	
	this.init();
}