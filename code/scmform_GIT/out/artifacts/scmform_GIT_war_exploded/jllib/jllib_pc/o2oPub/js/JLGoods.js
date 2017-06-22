var JLGoods = function(json){
	this.config = {
			"param": {},	
			"listener": {},	
			"sBillName": "jlquery",
			"sOperateName": "select.do",
			"tcCode":""
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = "";
	
	this.setData = function(data){
		this.data = data;
	};
	
	this.getData = function(){
		return this.data;
	};
	
	this.loadData = function(){
		
	};
	
	this.init = function(){
		//控件渲染
		this.write(); 
	};
	
	this.getTcCode = function(){
		//获取选中的属性值
		var chooseAttr = {};
		$(this.obj).find(".pro_parameter").find("li .xuan").each(function(){
			 var key=$(this).parents("dl").find("dt").text();
			 var value=$(this).text();
			 chooseAttr[key]=value;
		});
		//比较选中的值于远TC属性返回tcCode
		var tcCode="";
		$.each(this.data.tc,function(i,val){
			var flag=thisPlugin.compareJson(val, chooseAttr);
			if(flag==true){
				tcCode = val.tcCode;
				return false;
			}
		});
		return tcCode;
	}
	
	//获取商品外部编码
	this.getOutSideCode = function(tcCode){
		var outSideCode="";
		$.each(this.data.tc,function(i,val){
			if(val.outSideCode == tcCode){
				outSideCode = val.outSideCode;
				return false;
			}
		});
		return outSideCode;
	}
	
	this.compareJson=function(AJson,BJson){
		var compareResult=false;
		var flag=true;
		for(var bKey in BJson){
			if(AJson[bKey]!=BJson[bKey]){
				flag=false;
				break;
			}
		}
		if(flag){
			compareResult=true;
		}
		return compareResult;
	}
	
	this.write = function(){
		//获取自定义增加HTML代码
		var str = "";
		if(!JL.isNull($(this.obj).find("#pro_card_eachContent"))){
			str = $(this.obj).find("#pro_card_eachContent").html();
		}
		$(this.obj).empty();
		var resultData = this.data;
		var tcCode = this.config.tcCode;
		if(!JL.isNull(tcCode) && !JL.isNull(resultData)){
			//归纳商品属性值{"颜色":["白色","黑色"]}
			var tcInfo = {};
			$.each(resultData.tc,function(i,sxData){
				for(var key in sxData){
					var attr=[];
					if(key=="tcCode" || key=="outSideCode" || key=="uri" || key=="price" || key=="stockNum" || key=="attrDetail"|| key=="DistributionPrice" || key=="groupMark" || key=="retailMark" || key=="wholesaleMark" || key=="packNum" || key=="mixNum"){
						continue;
					}
					if(key=="retailMark" || key=="wholesaleMark"){
						continue;
					}
					if(tcInfo.length==0||tcInfo[key]==null){
						var attr=[];
						attr.push(sxData[key]);
						tcInfo[key]=attr;
					}else{
						var vl=tcInfo[key];
						if($.inArray(sxData[key],vl)==-1){
							vl.push(sxData[key]);
							tcInfo[key]=vl;
						}
					}
				}
			});
			//显示商品详细信息
			$.each(resultData.tc,function(i,tcData){
				//获取对应套餐值
				if(tcData.tcCode == tcCode){
					//显示中图
					var div_left = $("<div class=\"w05 md_w06 pro_card_left\">").appendTo(thisPlugin.obj);
					if(tcData.uri.length !=0){
						var imgStr = "<div id=\"preview\" class=\"spec-preview\"><span class=\"jqzoom\">"
					        +"<img jqimg=\""+tcData.uri[0].big+"\" src=\""+tcData.uri[0].middle+"\" />"
							+"</span></div>";
					}else{
						var imgStr = "<div id=\"preview\" class=\"spec-preview\"><span class=\"jqzoom\">"
					        +"<img jqimg=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/images/zwtp.jpg\" src=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/images/zwtp.jpg\" />"
							+"</span></div>";
					}
				
					var imgStrDoc = $(imgStr);
					imgStrDoc.appendTo(div_left);
					imgStrDoc.children("span").jqueryzoom({xzoom:400,yzoom:400});
					//显示小图
					var div = $("<div class=\"spec-scroll\"><div class=\"items\"></div></div>").appendTo(div_left);
					var ul = $("<ul></ul>").appendTo(div.children("div"));
					if(tcData.uri.length !=0){
						$.each(tcData.uri,function(j,tcUriData){
							$("<li><img bimg=\""+tcUriData.middle+"\" src=\""+tcUriData.small+"\" onmousemove=\"preview(this);\"></li>").appendTo(ul);
						});
					}else{
							$("<li><img bimg=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/images/zwtp.jpg\" src=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/images/zwtp.jpg\" onmousemove=\"preview(this);\"></li>").appendTo(ul);
					}
					//显示商品名
					var div_middle = $("<div class=\"w07 md_w06 pro_card_middle\"></div>").appendTo(thisPlugin.obj);
					$("<div class=\"w12 pro_title\"><h2>"+resultData.name+"</h2></div>").appendTo(div_middle);//名称
					//显示价格:tcData.price
					var goodsPrice = tcData.price;
					if(!JL.isNull(thisPlugin.config.getPrice)){
						var paramsData = {};
						paramsData["tcCode"]=tcCode;
						paramsData["zcxx01"]=resultData.zcxx01.key;
						goodsPrice = thisPlugin.config.getPrice(paramsData);
					}
					$("<div class=\"w12 pro_price\"><dt class=\"w02\">价格</dt><dd class=\"w10\"><i class=\"fa fa-rmb\"></i><b>"+goodsPrice+"</b></dd></div>").appendTo(div_middle);//价格
					//增加地址
					$("<dl class=\"w12 pro_parameter\"><dt class=\"w02\">区域：</dt><dd class=\"w10\"><div class=\"w12\" id=\"d_address\"></div></dd></dl>").appendTo(div_middle);
					//显示属性值
					var div_sx = $("<div class=\"w12 pro_parameter\"></div>").appendTo(div_middle);
					for(var key in tcInfo){
						var dl = $("<dl class=\"w12\"></dl>").appendTo(div_sx);
						var dt = $("<dt class=\"w02\">"+key+"</dt>").appendTo(dl);
						var dd = $("<dd class=\"w10\"><ul data-property=\""+key+"\"></ul></dd>").appendTo(dl);
						for(var i=0;i<tcInfo[key].length;i++){
							var li = $("<li><a>"+tcInfo[key][i]+"<em></em></a></li>").appendTo(dd.children("ul"));
							//当与当前所选tc值相同时为选中状态
							if(tcData[key]==tcInfo[key][i]){
								li.children("a").addClass("xuan");
							}
							li.click(function(){
								$(this).parents("ul").find(".xuan").removeClass("xuan");
								$(this).find("a").addClass("xuan");
								if (!JL.isNull(thisPlugin.config.listener.click)) {  
									thisPlugin.config.listener.click(thisPlugin);
								}
								if(item.getTab().find(".pro_price").find(".fa-rmb").siblings().text()*1 <=0){
									item.getTab().find("#buyNow").attr("class","jl_btn  btn_w180 btn_maigin_right btn-disable");
									item.getTab().find("#addCart").attr("class","jl_btn btn_w180 btn-disable");
								}else{
									item.getTab().find("#buyNow").attr("class","jl_btn btn_red_link btn_w180 btn_maigin_right");
									item.getTab().find("#addCart").attr("class","jl_btn btn_red btn_w180");
								}
							})
						}
					}
					//显示商品库存信息
					var strNumDl = $("<dl class=\"w12\"><dt class=\"w02\">数量</dt><dd class=\"w10\"><div class=\"w12 number_input\"></div></dd></dl>").appendTo(div_sx);
					var minus = $("<a class='fl minus'><i class='fa fa-minus'></i></a>").appendTo(strNumDl.children("dd").children("div"));
					
					
					minus.click(function(){
						var num = $(this).next().val();
						
						if( (num*1-1) <= 0 ){
							//alert("数量必须大于0");
							num = 1;
							return;
						}else{
							num -= 1;
						}
						$(this).next().val(num);
						$(this).next().focus();
						$(this).next().blur();
					});
					var child = $("<input type=\"text\" id=\"orderNum\" class=\"w01\">").appendTo(strNumDl.children("dd").children("div"));
					var value = JL.isNull(value)? 1: value;
					child.val(value);
					child.keypress(function(){
						var num = $(this).val();
						if($.inArray(event.keyCode,[48,49,50,51,52,53,54,55,56,57]) == -1){
							return false;
						}
						$(this).val($(this).val().replace(/\D/g,''));
					});
					child.blur(function(){
						if($(this).val() ==""||$(this).val()<=0){
							$(this).val("1");
						}
						$(this).val(parseInt($(this).val()));
						//获取商品库存
						var areaArr = thisPlugin.form.getPluginObj("address").getData();
						var params = {};
						params["zcxx01"]=resultData.zcxx01.key;
						params["tcCode"]=tcCode;
						params["province"]=areaArr[0].KEY;
						params["city"]=areaArr[1].KEY;
						params["area"]=areaArr[2].KEY;
						var goodsStockNum = thisPlugin.getStockNum(params);
						
						var num = $(this).val();
						if(isNaN(num*1)){
							alert("请输入正确的数字");
							$(this).val(1);
							$(this).focus();
							return false;
						}
						if(num>goodsStockNum){
							alert("已超出最大购买数");
							$(this).val(1);
							$(this).focus();
							return false;
						}
					});
					var plus = $("<a class='fl plus'><i class='fa fa-plus'></i></a>").appendTo(strNumDl.children("dd").children("div"));
					plus.click(function(){
						//获取商品库存
						var areaArr = thisPlugin.form.getPluginObj("address").getData();
						var params = {};
						params["zcxx01"]=resultData.zcxx01.key;
						params["tcCode"]=tcCode;
						params["province"]=areaArr[0].KEY;
						params["city"]=areaArr[1].KEY;
						params["area"]=areaArr[2].KEY;
						var goodsStockNum = thisPlugin.getStockNum(params);
						
						var num = $(this).prev().val();
						num++;
						if(num>goodsStockNum){
							alert("已超出最买购买数");
							$(this).val(num-1);
							return false;
						}
						$(this).prev().val(num);
						$(this).prev().focus();
						$(this).prev().blur();
					});
					//空余DIV增加个性内容
					$("<div id=\"pro_card_eachContent\">"+str+"</div>").appendTo(div_middle);
					
					return false;
				}
			});
		}
	};
	
	//获取商品库存
	this.getStockNum = function(data){
		return JL.getGoodsStockNum(data);
	}
	
	this.init();
}