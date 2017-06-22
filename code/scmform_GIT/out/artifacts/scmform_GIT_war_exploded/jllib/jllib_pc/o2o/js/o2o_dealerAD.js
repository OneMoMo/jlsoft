var o2o_dealerAD = function(json){
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
		var hrefUrl = doc.forwardUrl;
		var content = '<a href="' + hrefUrl + '" target="_blank">'+doc.dealerName+'</a>';
		//content = content + '<dt><img  class=\"lazy\" data-original='+doc.logoUrl+' title="渠道商LOGO" /></dt>';
		//content = content + '<dd class="w12">'+doc.dealerName+'</dd>';
		//content = content + '<dd class="w12">历史交易：￥'+JL.getMoneySplit(doc.dealMoney)+'</dd>';
		//content = content + '</dl></a>';
		$(appendObj).append(content);
	}
	
	this.init();	
}