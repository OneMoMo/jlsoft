var o2o_showFloorAD = {};
o2o_showFloorAD["version"] = 2;
o2o_showFloorAD.data = {};
o2o_showFloorAD.config = {};
o2o_showFloorAD.options = [];
o2o_showFloorAD.configs = {};
o2o_showFloorAD.values = {};

o2o_showFloorAD.setValue = function(json,value){
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

o2o_showFloorAD.init = function(json){
	//数据初始化
	o2o_showFloorAD.load(json);
	
	//控件渲染
	o2o_showFloorAD.write(json); 
	
}

o2o_showFloorAD.load = function(json){
	var url="/shopJL/pageData/index.json";
	$.ajax(
			{
				async:false,
				type:"POST",
				url:url,
				data:{"sid":Math.random()},
				success:function(data){
					o2o_showFloorAD.options =data;
				}
			}
	);
	return o2o_showFloorAD.options;
}

o2o_showFloorAD.write = function(json){
	$(json.obj).empty();
	var readData=o2o_showFloorAD.options;
	$.each(readData,function(m,readJson){
		var SPXX=JSON.parse(readJson.doc);
		var name;
		var imgUrl;
		var url;
		var title;
		var price;
		if(!JL.isNull(SPXX.tc)){
			url=SPXX.tc[0].uri[0];
			imgUrl=SPXX.tc[0].uri[0];
			name=SPXX.tc[0].name;
			title="";
			price=SPXX.tc[0].jg;
		}else{
			url=SPXX.url;
			imgUrl=JL.isNull(SPXX.img)?"":SPXX.img;
			name=JL.isNull(SPXX.name)?"":SPXX.name;
			title=JL.isNull(SPXX.title)?"":SPXX.title;
			price="";
		}
		var showHtml='<li><a href="'+url+'" target="_blank"><img src="'+imgUrl+'" data-src="'+imgUrl+'" title="'+title+'" class="w12" /></a><p><a>'+name+'</a></p><b><i class="fa fa-rmb"></i>'+price+'</b></li>';
		$(json.obj).append(showHtml);
	});
	
}
