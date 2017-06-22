var o2o_shopAD = function(json){
	this.config = {
	}
	$.extend(this.config, json);
	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
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
		var JLO2OType = json.JLO2OType;
		var doc = typeof json.doc =="string"?JSON.parse(json.doc):json.doc;
		var flag = JL.checkJSONArray(doc);
		if(!flag){
			this.writeContent(doc, JLO2OType, this.obj);
		}else{
			var nodeHtml = "<li>";
			if(!JL.isNull($(this.obj).attr("jl-node"))){
				nodeHtml = "<"+$(this.obj).attr("jl-node")+">";
			}
			for(var i=0;i<doc.length;i++){
				var node = $(nodeHtml).appendTo(this.obj);
				this.writeContent(doc[i], JLO2OType, node);
			}
		}
	}
	
	//输出内容
	this.writeContent = function(doc,JLO2OType,appendObj){
		var url = pubJson.getURL("FormUrl")+"/o2o/shop"+doc.resourceId+"/page/index.html?rid="+Math.random();
		var content = '<a href="' + url + '" target="_blank"><dl>';
		content = content + '<dt><img  class=\"lazy\" data-original='+doc.logoUrl+' title="商家LOGO" /></dt>';
		content = content + '<dd class="w12">'+doc.shopName+'</dd>';
		content = content + '<dd class="w12">经销商：'+doc.dealerNumber+'家</dd>';
		content = content + '</dl></a>';
		$(appendObj).append(content);
	}
	
	this.init();	
}