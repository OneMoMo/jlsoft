var o2o_showProductItem = {};
o2o_showProductItem["version"] = 2;
o2o_showProductItem.data = {};
o2o_showProductItem.config = {};
o2o_showProductItem.options = [];
o2o_showProductItem.configs = {};
o2o_showProductItem.values = {};

o2o_showProductItem.setValue = function(json,value){
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

o2o_showProductItem.init = function(json){
	o2o_showProductItem.config = JL.isNull(json.config) ? {} : json.config;
	o2o_showProductItem.configs[json.zdid] = o2o_showProductItem.config;
	o2o_showProductItem.configs[json.zdid]["param"] = JL.isNull(o2o_showProductItem.config["param"])? {}: o2o_showProductItem.config["param"];
	if(!JL.isNull(json["INITFIELD"]) && $.inArray(json["zdid"], json["INITFIELD"]) == -1){
		json["disabled"] = true;
	}else{
		json["disabled"] = false;
	}
	
	o2o_showProductItem["options"] = [];
	
	//初始化数据
	if(json["disabled"] == false
			&& JL.isNull(o2o_showProductItem.config["edit"])){
		o2o_showProductItem.load(json);
	} 

	if(!JL.isNull(json["value"])){
		o2o_showProductItem["values"] = {"KEY":json["value"]["key"],"VALUE":json["value"]["value"]};
		
		if(o2o_showProductItem["options"].length == 0){
			o2o_showProductItem["options"].push(o2o_showProductItem["values"]);
		}else{	
			var noOption = true;
			$.each(o2o_showProductItem["options"],function(i,arr){
				if(arr["KEY"] == o2o_showProductItem["values"]["KEY"]
					&& arr["VALUE"] == o2o_showProductItem["values"]["VALUE"]){
					noOption = false;
				}
			});
			if(noOption){
				o2o_showProductItem["options"].push(o2o_showProductItem["values"]);
			}
		}
	}
	
	//控件渲染
	o2o_showProductItem.write(json); 
	
	if($.inArray(json["zdid"], json["INITFIELD"]) != -1){
		$(json["obj"]).find("input,select").attr("disabled");
	}
}

o2o_showProductItem.load =function(json){
	var jlbh=$.getUrlParam("jlbh");
	var url="/shopJL/goods/"+jlbh+".json";
	var jsonData=o2o_showProductItem.sendAjax(url);
	if(!JL.isNull(jsonData)){
		o2o_showProductItem.options=JSON.parse(jsonData);
	}else{
		var ajaxJson = {};
		ajaxJson["src"] = "/form/find.do";
		ajaxJson["data"] = {"json":JSON.stringify({
			"collection": "Goods",
			"query": {
				"jlbh": Number(jlbh)
			}
		})};
		var resultData = JL.ajax(ajaxJson);
		o2o_showProductItem.options=resultData.data.returnList;
	};
} 
o2o_showProductItem.sendAjax=function(url){
	var jsonData;
	$.ajax(
			{
				async:false,
				type:"POST",
				url:url,
				data:{"sid":Math.random()},
				success:function(data){
					jsonData=data;
				}
			}
		);
	return jsonData;
}
o2o_showProductItem.write = function(json){
	var jlbh = Number($.getUrlParam("jlbh"));
		$(json.obj).empty();
	var doc=o2o_showProductItem.options;
	 $(json.obj).append(o2o_showProductItem.createHtmlElment(doc)); 
	 o2o_showProductItem.setCEvent(doc,json);
}
o2o_showProductItem.isJson=function (obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
	return isjson;
}
o2o_showProductItem.createHtmlElment=function(resultJson){
	//取第一个json数据为默认值
	var defaultImg="";
	var showHtml="<div class='w06 pro_card_middle' >";
		$.each(resultJson,function(i,proItem){
			showHtml=(showHtml+"<div class='w12 pro_title'><h2><a target='_blank' href='#'>"+proItem.name+"</a></h2><p></p></div>");
			showHtml=(showHtml+"<div class='w12 pro_price'><dl class='w12'><dt class='w02'>价格</dt><dd class='w10'><b><i class='fa fa-rmb'></i>"+proItem.tc[0].jg+"</b><em>原封国行</em></dd></dl></div>");
			//showHtml=(showHtml+"<div class='w12 pro_freight'><dl class='w12'><dt class='w02'>运费</dt><dd class='w10'><span>上海</span>至<p><span>武汉<i class='fa  fa-chevron-down'></i></span><span>江岸区 大智街办事处<i class='fa  fa-chevron-down'></i></span></p><a href='#' target='_blank'>顺丰包邮</a><span>19:00前付款，预计9月19日(后天)送达</span></dd></dl></div>");
			var tcInfo={};
			$.each(proItem.tc,function(j,tcsx){
				if(j==0){
					defaultImg=tcsx;
				}
				var sx=tcsx.sx;
				for(var key in sx){
						if(tcInfo.length==0||tcInfo[key]==null){
							var attr=[];
							attr.push(sx[key]);
							tcInfo[key]=attr;
						}else{
							var vl=tcInfo[key];
							for(var m=0;m<vl.length;m++){
								if(vl[m]!=sx[key]){
									vl.push(sx[key]);
								}
							}
							tcInfo[key]=vl;
						}
				}
			});
			var attrHtml="<div class='w12 pro_parameter'>";
			for (var key in tcInfo){
				var keyHtml="<dt class='w02'>"+key+"</dt>";
				var valHtml="<dd class='w10'><ul data-property="+tcInfo[key]+">";
				for(var i=0;i<tcInfo[key].length;i++){
					if(i==0){
						valHtml=(valHtml+"<li><a href='#' class='xuan'>"+tcInfo[key][i]+"<em></em></a></li>");
					}else{
						valHtml=(valHtml+"<li><a href='#' >"+tcInfo[key][i]+"<em></em></a></li>");
					}
				}
				valHtml=(valHtml+"</ul></dd>");
				var attrItemHtml="<dl class='w12'>"+keyHtml+valHtml+"</dl>";
				attrHtml=(attrHtml+attrItemHtml);
			}
			attrHtml=(attrHtml+"</div>");
			attrHtml=(attrHtml+"<div class='w12 pro_service'><dl class='w12'><dt class='w02'>服务承诺</dt><dd class='w10'><a href='#' target='_blank'><i class='fa fa-shield'></i>全国联保</a> <a href='#' target='_blank'><i class='fa fa-truck'></i>顺丰包邮</a><a href='#' target='_blank'><i class='fa fa-briefcase'></i>货票同行</a> <a href='#' target='_blank'><i class='fa fa-heart'></i>无忧退换货</a></dd></dl></div>");
			attrHtml=(attrHtml+"<div class='w12 pro_settlement'><dl><dt>&nbsp;</dt><dd><a href='../settlement/settlement.html' rel='nofollow' data-addfastbuy='true' title='点击此按钮，到下一步确认购买信息。' class='jl_btn btn_red_link btn_w180 btn_maigin_right'>立刻购买</a><a href='javascript:void(0)' onClick='o2o_showProductItem.addCart(\""+proItem.shopid+"\");' rel='nofollow' class='jl_btn btn_red btn_w180'><i class='fa fa-shopping-cart'></i>加入购物车</a>	</dd></dl></div>");
			showHtml=(showHtml+attrHtml+"</div>");
  		});
	//start
	 var imgHtml="<div class='w04 pro_card_left'>";
	 var bigImg="<div id='preview' class='spec-preview'><span class='jqzoom'><img jqimg='"+defaultImg.uri[0]+"' src='"+defaultImg.uri[0]+"'></span></div>";
	 var smallImg="<div class='spec-scroll'><div class='items'><ul>";
	 for(var m=0;m<defaultImg.uri.length;m++){
		 smallImg=(smallImg+"<li><img alt='iphone6' bimg='"+defaultImg.uri[m]+"' src='"+defaultImg.uri[m]+"' onmousemove='preview(this);'></li>");
	 }
	 smallImg=(smallImg+"</ul></div></div>");
	 imgHtml=(imgHtml+bigImg+smallImg+"</div>");
	 //end
	 showHtml=(imgHtml+showHtml);
	 return showHtml;
}

o2o_showProductItem.setCEvent=function(resultJson,json){
	$(json.obj).find(".pro_parameter").find("li").each(function(){
		$(this).on("click",function(){
			$(this).parents("ul").find(".xuan").removeClass("xuan");
			$(this).find("a").addClass("xuan");
			var srchJson={};
			$(json.obj).find("li .xuan").each(function(){
				 var key=$(this).parents("dl").find("dt").text();
				 var value=$(this).text();
				 srchJson[key]=value;
			});
			var attrJson=o2o_showProductItem.srchJson(resultJson,srchJson);
			//加载图片
			var itemObj=$("#d_"+json.zdid).find("#preview").siblings(".spec-scroll").find("ul");
			$(itemObj).empty();
			o2o_showProductItem.loadGoodsAttr($(this));
			// $("#d_"+json.zdid).find("#preview").siblings(".spec-scroll").find("ul")
			
		});
	});
	
	//查询
	//显示
	$(json.obj).find(".pro_parameter").find("ul").each(function(){
		
	});
}


//加入购物车
o2o_showProductItem.addCart=function(shopid){
	var chooseData={};
	chooseData.shopid=shopid;
	var attrArr=[];
	var attrJson={};
	$(".pro_parameter").find(".xuan").each(function(){
		 var key =$(this).parents("ul").parent().siblings("dt").text();
		 var value=$(this).text();
		 attrJson[key]=value;
	});
	var resultJson=o2o_showProductItem.options;
	var addJson=o2o_showProductItem.srchJson(resultJson, attrJson);
	 	addJson.sl=1;
	    attrArr.push(addJson);
	chooseData.goods=attrArr;
	chooseData["dqxx01"]="1201";
	delete chooseData.goods[0].uri;
	alert(JSON.stringify(chooseData));
	var ajaxUrl="http://127.0.0.1:8088/jlo2o_bd/ecspi/insertGWC.action";
	var ajaxJson={};
		ajaxJson.src=ajaxUrl;
		ajaxJson["data"] = {"XmlData":JSON.stringify(chooseData)};
		
	var resultData=JL.ajax(ajaxJson);
	if(JL.isNull(resultData)){
		alert("加入失败!");
	}else{
		window.location.href="/jlo2o_bd/customer/sydjt/shopping/cart.html";
	}
	return false;
}
//点击上面的一个属性加载下面的属性
o2o_showProductItem.loadGoodsAttr=function(thisObj){
	var chooseJson={};
	var key=$(thisObj).parents("dl").find("dt").text();
	var value=$(thisObj).find("xuan").text();
	    chooseJson[key]=value;
	    o2o_showProductItem.alreadyChooseAttr(thisObj,chooseJson);
	//查找并加载下级元素
}
//查找全部上级选择的节点
o2o_showProductItem.alreadyChooseAttr=function(thisLi,chooseJson){
	var prevNode=$(thisLi).prev();
	if(!JL.isNull(prevNode)){
		//有上级节点的时候
		var key =$(thisObj).parents("dl").find("dt").text();
		var value=$(thisObj).find(".xuan").text();
		chooseJson[key]=value;
		o2o_showProductItem.alreadyChooseAttr(prevNode,chooseJson);
	}
}

//点击元素重新加载下级元素
o2o_showProductItem.reloadNextAttr=function(chooseJson,thisLi){
	//查询下级元素
	var resultJson=o2o_showProductItem.options;
	var loadJson=[];
	if(!JL.isNull(resultJson)){
		resultJson=resultJson[0].tc;
		$(resultJson,function(m,reJson){
			var flag=true;
			for(var key in chooseJson){
				if(reJson[key]!=chooseJson[key]){
					flag=false;
				}
			}
			if(flag){
				loadJson.push(reJson);
			}
		});
		
		//加载json
		var chooseJson={};
		var loadAttr={};
		$.each(loadJson,function(m,loJson){
			var json={};
			if(m==0){
				//第一个默认选中
				chooseJson=loJson;
			}
			for(var key in loJson){
				var attrA=[];
				if(!JL.isNull(loadAttr[key])){
					attrA=loadAttr[key];
				}
				var paJson={};
				paJson.attr=loJson[key];
				if(m==0){
					paJson.mark=1;
				}
				attrA.push(paJson);
				loadAttr[key]=attrA;
			}
		});
		//展示数据
		$(thisLi).parents("dl").next().remove();
		var showAttrHtml;
		for(var key in loadAttr){
			var key='<dl class="w12"><dt class="w02">'+key+'</dt>';
			var value='<dd class="w10"><ul data-property="'+key+'">';
			$.each(loadAttr,function(nn,nnJson){
				var style="";
				if(JL.isNull(nnJson.mark)&&nnJson.mark==1){
					style="xuan";
				}
				value=(value+'<li><a href="#" class="'+style+'">'+nnJson.attr+'<em></em></a></li>');
			});
			value=(key+value+"</ul></dd></dl>");
			showAttrHtml=(showAttrHtml+value);
		}
		$(thisLi).parents("dl").parent().append(showAttrHtml);
	}
}

//根据条件查找对应Json对象
o2o_showProductItem.srchJson=function(resultJson,sendParam){
	var returnJson={};
	$.each(resultJson[0]["tc"],function(m,reJson){
		var flag=true;
		var sxJson=reJson["sx"];
		var flag=o2o_showProductItem.compareJson(sxJson, sendParam);
		if(flag==true){
			returnJson=reJson;
			return false;
		}
	});
	return returnJson;
}

o2o_showProductItem.compareJson=function(AJson,BJson){
	var compareResult=false;
	var aLength=0;
	var bLength=0;
	var flag=true;
	for(var aKey in AJson){
		aLength++;
	}
	for(var bKey in BJson){
		if(AJson[bKey]!=BJson[bKey]){
			flag=false;
			break;
		}
		bLength++;
	}
	if(flag&&aLength==bLength){
		compareResult=true;
	}
	return compareResult;
}
/**
o2o_showProductItem.showProductInfo=function(resultJson){
	var divEl="<div class='content' style='position:static;'><div class='row'></div></div>";
	var imgEl="<div class='w04 pro_card_left'></div>";
	//大图
	var bigImg="<div id='preview' class='spec-preview'><span class='jqzoom'></span><div>";
	var bigImgObj=$(bigImg).append("<img jqimg='/jllib/jllib_pc/o2o/images/sp.jpg' src='/jllib/jllib_pc/o2o/images/sp.jpg'>");
	//小图
	var smallImg="<div class='spec-scroll'><div class='items'><ul></ul></div></div>";
	var productInfo="<div class='w06 pro_card_middle'></div>";
	//商品名称
	var productName="<div class='w12 pro_title'><h2><a target='_blank' href='#'>"+resultJson.name+"</a></h2><p>"+JL.isNull(resultJson.title)?"":resultJson.title+"</p></div>";
	//价格
	var productPrice="<div class='w12 pro_price'><dl class='w12'><dt class='w02'>价格</dt><dd class='w10'><b><i class='fa fa-rmb'></i>"+resultJson.jg+"</b><em>"+JL.isNull(resultJson.priceRemark)+"</em></dd></dl></div>";
	//物流运费
	var productPs="<div class='w12 pro_freight'><dl class='w12'><dt class='w02'>运费</dt><dd class='w10'><span>上海</span>至<p><span>武汉<i class='fa  fa-chevron-down'></i></span><span>江岸区 大智街办事处<i class='fa  fa-chevron-down'></i></span></p><a href='#' target='_blank'>顺丰包邮</a><span>19:00前付款，预计9月19日(后天)送达</span></dd></dl></div>";	
	//商品属性
	var productAttr="<div class='w12 pro_parameter'></div>";
	//联保
	var productLb="<div class='w12 pro_service'><dl class='w12'><dt class='w02'>服务承诺</dt><dd class='w10'><a href='#' target='_blank'><i class='fa fa-shield'></i>全国联保</a><a href='#' target='_blank'><i class='fa fa-truck'></i>顺丰包邮</a><a href='#' target='_blank'><i class='fa fa-briefcase'></i>货票同行</a><a href='#' target='_blank'><i class='fa fa-heart'></i>无忧退换货</a></dd></dl> </div>";
	//加入购物车
	var productBug="<div class='w12 pro_settlement'><dl><dt>&nbsp;</dt><dd><a href='../settlement/settlement.html' rel='nofollow' data-addfastbuy='true' title='点击此按钮，到下一步确认购买信息。' class='jl_btn btn_red_link btn_w180 btn_maigin_right'>立刻购买</a><a href='../cart/cart.html' rel='nofollow' class='jl_btn btn_red btn_w180'><i class='fa fa-shopping-cart'></i>加入购物车</a>	</dd></dl></div>";
	//注入商品属性数据
	var tcInfo={};
	$.each(resultJson.tc,function(j,tcsx){
		var sx=tcsx.sx;
		for(var key in sx){
				if(tcInfo.length==0||tcInfo[key]==null){
					var attr=[];
					attr.push(sx[key]);
					tcInfo[key]=attr;
				}else{
					var vl=tcInfo[key];
					for(var m=0;m<vl.length;m++){
						if(vl[m]!=sx[key]){
							vl.push(sx[key]);
						}
					}
					tcInfo[key]=vl;
				}
		}
	});
	var liEl;
	for (var key in tcInfo){
		var keyHtml="<dt class='w02'>"+key+"</dt>";
		var valHtml="<dd class='w10'><ul data-property="+tcInfo[key]+">";
		for(var i=0;i<tcInfo[key].length;i++){
			if(i==0){
				valHtml=(valHtml+"<li><a href='#' class='xuan'>"+tcInfo[key][i]+"<em></em></a></li>");
			}else{
				valHtml=(valHtml+"<li><a href='#' >"+tcInfo[key][i]+"<em></em></a></li>");
			}
		}
		valHtml=(valHtml+"</ul></dd>");
		var attrItemHtml="<dl class='w12'>"+keyHtml+valHtml+"</dl>";
		liEl=(liEl+attrItemHtml);
	}
	$(imgEl).append(bigImgObj).append(smallImg);
	
}
**/
