var JLNavigationTop = function(json){
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
	
	this.loadData = function(){
		var param = {};
		var transport = new JLTransport();
		return transport.select(this.config.menuTree.sBillName, this.config.menuTree.sOperateName, param);
	}
	
	this.init = function(){
		this.write();
	}
	
	this.write = function(){
		var divRow = $("<div class=\"content\"><div class=\"row\"></div></div>").appendTo(this.obj);
		//增加树形列表菜单
		if(!JL.isNull(this.config.menuTree)){
			var menuData = this.loadData();
			var menuTreeObj = this.config.menuTree;
			var div = $("<div class=\"w02 pro_nav\"></div>").appendTo(divRow.children("div"));
			//title事件
			var titleDiv = $("<div class=\"w12\"></div>").appendTo(div);
			$("<h3>"+this.config.title+"</h3><i class=\"fa fa-chevron-down\"></i>").appendTo(titleDiv);
			//左侧列表事件
			var mainDiv = $("<div class=\"w12 pro_nav_main\"></div>").appendTo(div);
			if(this.obj.closest("#head").attr("jl-menuTree") != "true"){
				titleDiv.mouseenter(function(){
					$(this).next().show();
				});
				titleDiv.mouseleave(function(){
					$(this).next().hide();
				});
				mainDiv.hide();
				mainDiv.mouseenter(function(event){
					$(this).show();
				});
				mainDiv.mouseleave(function(){
					$(this).hide();
				});
			}
			var oneLevle = $("<div class=\"w02 pro_nav_list\"></div>").appendTo(mainDiv);
			if(!JL.isNull(this.config.menuTree.title)){
				oneLevle.append("<div class=\"w12 nav_title\"><i class=\"fa fa-pagelines\"></i>"+this.config.menuTree.title+"</div>");
			}
			oneLevle.mouseenter(function(){
				$(this).next().show();
			});
			oneLevle.mouseleave(function(){
				$(this).find(".xuan").removeClass("xuan");
				$(this).next().hide();
			});
			var twoLevle = $("<div class=\"w10 pro_nav_case\"></div>").appendTo(mainDiv);
			twoLevle.hide();
			twoLevle.mouseenter(function(event){
				$(event.fromElement).addClass("xuan");
				$(this).show();
			});
			twoLevle.mouseleave(function(){
				$(this).prev().find(".xuan").removeClass("xuan");
				$(this).hide();
			});
			var oneLevleData = menuData[0].item;
			if(!JL.isNull(oneLevleData)){
				$.each(oneLevleData,function(i,val){
					//分类导航只显示7个
//					if(i>7){
//						return false;
//					}
					var oneLevleDl = $("<dl class=\"w12\"></dl>").appendTo(oneLevle);
					oneLevleDl.append("<dd class=\"w11\"><a>"+val.name+"</a><dt class=\"w01\"><i class=\"fa fa-angle-right\"></i></dt></dd>");
					//鼠标移上去
					oneLevleDl.mouseenter(function(){
						oneLevle.find("> dl").removeClass("xuan");
						$(this).addClass("xuan");
						thisPlugin.writeTwoLevle(menuData,val.code,twoLevle,$(this));
					});				
				});
			}
		}
		//增加供应商导航
		if(!JL.isNull(this.config.areaShop)){
			this.writeAreaShop(oneLevle);
		}
		//增加渠道商导航
		if(!JL.isNull(this.config.areaDealer)){
			this.writeAreaDealer(oneLevle);
		}
		//增加找商家导航
		if(!JL.isNull(this.config.areaDealer)){
			this.writeBusiness(oneLevle);
		}
		//增加横向导航菜单
		if(!JL.isNull(this.config.navigation)){
			var ul = $("<ul class=\"w10 title_nav\"></ul>").appendTo(divRow.children("div"));
			//循环导航菜单
			$.each(this.config.navigation,function(i,val){
				var li = $("<li><a href=\""+pubJson.getURL("FormUrl")+val.url+"\">"+val.name+"</a></li>").appendTo(ul);
				//绑定事件
				li.on("mouseenter",function(){
					$(this).children("div").show();
				});
				li.on("mouseleave",function(){
					$(this).children("div").hide();
				});
				//循环次级菜单列表开始
				if(!JL.isNull(val.menu)){
					var li_div = $("<div></div>").appendTo(li);
					$.each(val.menu,function(j,val){
						$("<p><a href=\""+pubJson.getURL("FormUrl")+val.url+"\">"+val.name+"</a></p>").appendTo(li_div);
					});
				}
				//循环次级菜单列表结束
			});
		}
	}
	
	//打印二级所有菜单内容
	this.writeTwoLevle = function(menuData,menuCode,twoLevleObj){
		twoLevleObj.empty();
		$.each(menuData,function(i,oneVal){
			if(oneVal.code == menuCode){
				var twoLevleDiv = $("<div class=\"w12\"></div>").appendTo(twoLevleObj);
				$.each(oneVal.item,function(j,twoVal){
					var twoLevleDl = $("<dl class=\"w12\"></dl>").appendTo(twoLevleDiv);
					$("<dt class=\"w02\"><a>"+twoVal.name+"</a></dt>").appendTo(twoLevleDl);
					var twoLevleDD = $("<dd class=\"w10\"></dd>").appendTo(twoLevleDl);
					$.each(twoVal.item,function(k,threeVal){
						var levelValue = {};
						levelValue["firstLevel"]=oneVal.name;
						levelValue["secondLevel"]=twoVal.name;
						levelValue["thirdLevel"]=threeVal.name;
						$("<a href=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/page/srch.html?paramValue="+threeVal.code+"&levelValue="+escape(JSON.stringify(levelValue))+"\">"+threeVal.name+"</a>").appendTo(twoLevleDD);
					});
				});
				return false;
			}
		});
	}
	
	//区域商家导航输出
	this.writeAreaShop = function(divObj){
		if(!JL.isNull(this.config.areaShop.title)){
			divObj.append("<div class=\"w12 nav_title\"><i class=\"fa fa-pagelines\"></i>"+this.config.areaShop.title+"</div>");
			var oneLevleDl = $("<dl class=\"w12\"></dl>").appendTo(divObj);
			oneLevleDl.append("<dd class=\"w11\"><a>北京、上海、深圳</a><dt class=\"w01\"><i class=\"fa fa-angle-right\"></i></dt></dd>");
		}
	}
	
	//区域渠道商导航输出
	this.writeAreaDealer = function(divObj){
		if(!JL.isNull(this.config.areaDealer.title)){
			divObj.append("<div class=\"w12 nav_title\"><i class=\"fa fa-pagelines\"></i>"+this.config.areaDealer.title+"</div>");
			var oneLevleDl = $("<dl class=\"w12\"></dl>").appendTo(divObj);
			oneLevleDl.append("<dd class=\"w11\"><a>北京、上海、深圳</a><dt class=\"w01\"><i class=\"fa fa-angle-right\"></i></dt></dd>");
		}
	}
	
	//找商机导航输出
	this.writeBusiness = function(divObj){
		if(!JL.isNull(this.config.business.title)){
			divObj.append("<div class=\"w12 nav_title\"><i class=\"fa fa-pagelines\"></i>"+this.config.business.title+"</div>");
			var oneLevleDl = $("<dl class=\"w12\"></dl>").appendTo(divObj);
			oneLevleDl.append("<dd class=\"w11\"><a>家电、医药、汽车</a><dt class=\"w01\"><i class=\"fa fa-angle-right\"></i></dt></dd>");
		}
	}
	
	this.init();
}