var o2o_news_abstractAD = function(json){
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
		var JLO2OType = this.config.JLO2OType;
		if(!JL.isNull(JLO2OType)){
			if(!JL.isNull(JLO2OType.url)){
				hrefUrl = pubJson.getURL("FormUrl")+JLO2OType.url+"?htmlUrl=";
			}
		}
		if(!JL.isNull(doc.url)){
			if((doc.url).indexOf("http") == -1){
				hrefUrl = hrefUrl + doc.url;
			}else{
				hrefUrl = doc.url;
			}
		}
		if(!JL.isNull(doc.zy)){
			$("<dd><a href=\""+hrefUrl+"\" target=\"_blank\"><span>"+doc.zy+"</span></a></dd>").appendTo(thisPlugin.obj);
		}
	}
	
	this.init();
}