var o2o_news_imgTitleAbstractAD = function(json){
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
		var hrefUrl = pubJson.getURL("FormUrl")+"/news/news.html?htmlUrl=";
		// img
		if(!JL.isNull(doc.img)){
			$(thisPlugin.obj).append("<dt><img src=\""+doc.img+"\"/></dt>");
		}
		// title
		var dd = $("<dd><a href=\""+hrefUrl+doc.url+"\">"+doc.title+"</a></dd>").appendTo(thisPlugin.obj);
		if(!JL.isNull(doc.time)){
			$(dd).append("</br><time>"+doc.time+"</time>");
		}
	}
	
	this.init();
}