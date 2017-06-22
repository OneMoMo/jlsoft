var o2o_showGoodsExten = {};
o2o_showGoodsExten["version"] = 2;
o2o_showGoodsExten.data = {};
o2o_showGoodsExten.config = {};
o2o_showGoodsExten.options = [];
o2o_showGoodsExten.configs = {};
o2o_showGoodsExten.values = {};

o2o_showGoodsExten.setValue = function(json,value){
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

o2o_showGoodsExten.init = function(json){
	o2o_showGoodsExten.config = JL.isNull(json.config) ? {} : json.config;
	o2o_showGoodsExten.configs[json.zdid] = o2o_showGoodsExten.config;
	o2o_showGoodsExten.configs[json.zdid]["param"] = JL.isNull(o2o_showGoodsExten.config["param"])? {}: o2o_showGoodsExten.config["param"];
	if(!JL.isNull(json["INITFIELD"]) && $.inArray(json["zdid"], json["INITFIELD"]) == -1){
		json["disabled"] = true;
	}else{
		json["disabled"] = false;
	}
	
	o2o_showGoodsExten["options"] = [];
	
	//初始化数据
	if(json["disabled"] == false
			&& JL.isNull(o2o_showGoodsExten.config["edit"])){
		o2o_showGoodsExten.load(json);
	} 

	if(!JL.isNull(json["value"])){
		o2o_showGoodsExten["values"] = {"KEY":json["value"]["key"],"VALUE":json["value"]["value"]};
		
		if(o2o_showGoodsExten["options"].length == 0){
			o2o_showGoodsExten["options"].push(o2o_showGoodsExten["values"]);
		}else{	
			var noOption = true;
			$.each(o2o_showGoodsExten["options"],function(i,arr){
				if(arr["KEY"] == o2o_showGoodsExten["values"]["KEY"]
					&& arr["VALUE"] == o2o_showGoodsExten["values"]["VALUE"]){
					noOption = false;
				}
			});
			if(noOption){
				o2o_showGoodsExten["options"].push(o2o_showGoodsExten["values"]);
			}
		}
	}
	
	//控件渲染
	o2o_showGoodsExten.write(json); 
	
	if($.inArray(json["zdid"], json["INITFIELD"]) != -1){
		$(json["obj"]).find("input,select").attr("disabled");
	}
}

o2o_showGoodsExten.load = function(json){
	o2o_showGoodsExten.options = [];
}

o2o_showGoodsExten.write = function(json){
	var jlbh = Number($.getUrlParam("jlbh"))
	$(json.obj).empty();
	var str = "";
	var name ="";
	var doc ="";
	var options=o2o_showGoodsExten.options;
	if(options.length!=0){
		$.each(options,function(i,proItem){
			for(var i=0;i<proItem.spjs_uri.length;i++){
				$(json.obj).load(proItem.spjs_uri[i]);
			}
		});
	}else{
		$.getJSON("/shopJL/goods/1.json", function(resultJson){		
			if(resultJson[0].jlbh==jlbh)
			{
				doc =resultJson[0];
			}else{
				var ajaxJson = {};
				ajaxJson["src"] = "/form/find.do";
				ajaxJson["data"] = {"json":JSON.stringify({
					"collection": "Goods",
					"query": {
						"jlbh": Number($.getUrlParam("jlbh"))
					}
				})};
				var resultData = JL.ajax(ajaxJson);
				if(!JL.isNull(resultData)){
					resultData = resultData.data.returnList;
					doc = resultData[0];
				}
			}
			
			str +='<div class="w10">';
			str +='<div class="w12 parameter" id="d_productAttr" >';
			//str +='<p>品牌名称：<a>Apple/苹果</a><a class="btn_radius"><i class="fa fa-heart"></i>关注</a></p>';
			//str +='<h4>产品参数：<a>更多参数<i class="fa  fa-chevron-circle-right"></i></a></h4>';
			str +='<dl>';
			$.each(doc.tc[0].sx,function(key,val){
					str +='<dd>'+key+':'+val+'</dd>';
			});
			
			str +='<dd>'+doc.name+'</dd>';
			//str +='<dd>CPU型号:A8</dd>';
			str +='<dd>型号:'+doc.name+'</dd>';
			
			
			/*str +='<dd>机身颜色:银色 深空灰色 金色</dd>';
			str +='<dd>运行内存RAM:1GB</dd>';
			str +='<dd>机身内存:16GB 64GB 128GB</dd>';
			str +='<dd>网络模式:单卡多模</dd>';
			str +='<dd>电池容量:1810mAh</dd>';*/
			str +='</dl>';
			str +='</div>';
			str +='<div class="w12 info_img">';
			$.each(doc.spjs_uri,function(index,val){
				str +='<img src="'+val+'" />';
			})
			//str +='<img src="../images/banner01.jpg" />';
			        /*<img src="../images/banner01.jpg" />
			        <img src="../images/banner01.jpg" />
			        <img src="../images/banner01.jpg" />
			        <img src="../images/banner01.jpg" />*/
			str +='</div>';
			str +='</div>';
			$(json.obj).append(str);
		});

	}
	
}
