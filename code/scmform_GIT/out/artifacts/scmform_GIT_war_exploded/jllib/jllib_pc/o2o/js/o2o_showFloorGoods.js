var o2o_showFloorGoods = {};
o2o_showFloorGoods["version"] = 2;
o2o_showFloorGoods.data = {};
o2o_showFloorGoods.config = {};
o2o_showFloorGoods.options = [];
o2o_showFloorGoods.configs = {};
o2o_showFloorGoods.values = {};

o2o_showFloorGoods.setValue = function(json,value){
	value = JL.formatObject(value);
	var select = $(json["obj"]).find("[name='"+json["zdid"]+"']");
	var option = select.find("option[value='"+value["key"]+"']");
	if(option.length == 0){
		select.append("<option value='"+value["key"]+"'>"+value["value"]+"</option>")
	}else{
		select.val(value["key"]);
	}
	
	if(!JL.isNull(json["edit"]) && json["edit"]){
		$(json["obj"]).find(":text").val(value["value"]);
	}
}

o2o_showFloorGoods.init = function(json){	
	//数据初始化
	o2o_showFloorGoods.load(json);
	
	//控件渲染
	o2o_showFloorGoods.write(json); 
	
}

o2o_showFloorGoods.load = function(json){
	o2o_showFloorGoods.options = json;
}

o2o_showFloorGoods.write = function(json){
	$(json.obj).empty();
	var doc = typeof json.doc =="string"?JSON.parse(json.doc):json.doc;
    var docspxx = doc.tc[0];
    var name = doc.name;
    $.each(docspxx.sx,function(key,val){
    	name +=val;
    });
	$(json.obj).append('<a class="" href="/shopJL/page/item.html?jlbh='+doc.jlbh+'" target="_blank">'+
				'<dl><dt><img src='+docspxx.uri[0]+' data-src='+docspxx.uri[0]+'  /></dt><dd>'+name+'</dd><dd class="price">￥:'+docspxx.jg+'</dd></dl></a>');

}
