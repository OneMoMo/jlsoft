var o2o_spxxAD = function(json){
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
		//懒加载图片
		$("img.lazy").lazyload({
			threshold : 200,
		    effect : "fadeIn"
		});
	}
	
	//输出内容
	this.writeContent = function(doc,JLO2OType,appendObj){
		var docSPXX = doc.tc[0];
		var hrefUrl = pubJson.getURL("FormUrl")+"/o2o/shopJL/page/item.html?tcCode="+docSPXX.tcCode;
		
		if(!JL.isNull(JLO2OType)){
			if(!JL.isNull(JLO2OType.url)){
				hrefUrl = pubJson.getURL("FormUrl")+JLO2OType.url+"?tcCode="+docSPXX.tcCode;
			}
		}
		//显示价格:docSPXX.price
		var goodsPrice = docSPXX.price;
		if(!JL.isNull(JLO2OType)){
			if(!JL.isNull(JLO2OType.getPrice)){
				docSPXX["zcxx01"]=doc.zcxx01.key; //投递时要写zcxx01值
				goodsPrice = JLO2OType.getPrice(docSPXX);
			}
		}
		$(appendObj).append('<a href="' + hrefUrl + '" target="_blank"><dl><dt><img  class=\"lazy\" data-original='+docSPXX.uri[0].middle+' title="商品名称" /></dt><dd class="w12">'+doc.name+'</dd><dd class="price">￥'+goodsPrice+'</dd></dl></a>');
	}
	
	this.init();	
}