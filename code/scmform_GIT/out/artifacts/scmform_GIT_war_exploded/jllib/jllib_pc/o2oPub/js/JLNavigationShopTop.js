var JLNavigationShopTop = function(json){
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
		var divRow = $("<div><div class='w12'></div></div>").appendTo(this.obj);
		//增加树形列表菜单
		if(!JL.isNull(this.config.menuTree)){
			var menuData = this.loadData();
			var menuTreeObj = this.config.menuTree;
			var div = $("<div class=\"w02 pro_nav\"></div>").appendTo(divRow.children("div"));
			//title事件
			var titleDiv = $("<div class=\"w12\"></div>").appendTo(div);
			$("<h3>"+menuTreeObj.title+"</h3><i class=\"fa fa-chevron-down\"></i>").appendTo(titleDiv);
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
			var oneLevleData = menuData;
			if(!JL.isNull(oneLevleData)){
				$.each(oneLevleData,function(i,val){
					var oneLevleDl = $("<dl class=\"w12\"></dl>").appendTo(oneLevle);
					oneLevleDl.append("<dt class=\"w12\"><a>"+val.name+"</a><i class=\"fa fa-angle-right\"></i></dt>");
					//默认选中item前四位值
					$.each(val.item,function(i,item){
						//oneLevleDl.append("<dd class=\"w06\">"+item.name+"</dd>");
						var oneLevleDD = $("<dd class=\"w06\"></dd>").appendTo(oneLevleDl);
						var levelValue = {};
						levelValue["firstLevel"]="";
						levelValue["secondLevel"]=val.name;
						levelValue["thirdLevel"]=item.name;
						$("<a href=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/page/srch.html?paramValue="+item.code+"&levelValue="+escape(JSON.stringify(levelValue))+"\">"+item.name+"</a>").appendTo(oneLevleDD);
						if(i==3)return false;
					})
					//鼠标移上去
					oneLevleDl.mouseenter(function(){
						oneLevle.find("> dl").removeClass("xuan");
						$(this).addClass("xuan");
						thisPlugin.writeTwoLevle(val,twoLevle,$(this));
					});				
				});
			}
		}
		//增加横向导航菜单
		if(!JL.isNull(this.config.navigation)){
			var ul = $("<ul class=\"w12 title_nav\"></ul>").appendTo(divRow.children("div"));
			var menuList = this.config.navigation;
			//根据权限显示不同的导航菜单
			if(!JL.isNull(this.config.getMenuPower)){
				menuList = this.config.getMenuPower(this.config.navigation);
			}
			//循环导航菜单
			$.each(menuList,function(i,val){
				if(JL.isNull(val.data)){
					var li = $("<li><a>"+val.name+"</a></li>").appendTo(ul);
				}else{
					var li = $("<li><a class=\"ts\" data-title=\""+val.data+"\">"+val.name+"</a></li>").appendTo(ul);
				}
				li.find("a").on("click",function(){
					o2o.setNavigationMenu(val.name);
					$(this).attr("href",pubJson.getURL("FormUrl")+val.url);
				});
				
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
			//获取控制导航变亮
			var menuParam = o2o.getNavigationMenu();
			if(!JL.isNull(menuParam)){
				menuParam = unescape(menuParam);
				var liArr = ul.find("li");
				for(var i=0;i<liArr.size();i++){
					var li = liArr[i];
					if($(li).text() == menuParam){
						ul.find("li").children().removeClass("active");
						$(li).children().addClass("active");
		//				$(li).children().attr("class","active");
						break;
					}
				}
			}
			//导航控制结束
		}
	}
	
	//打印二级所有菜单内容
	this.writeTwoLevle = function(menuData,twoLevleObj){
		twoLevleObj.empty();
		var twoLevleObj = $("<div class=\"w12\"></div>").appendTo(twoLevleObj);
		var twoLevleDiv = null;
		$.each(menuData.item,function(i,oneVal){
			if(i%8==0){
				twoLevleDiv = $("<div class=\"w03\"></div>").appendTo(twoLevleObj);
			}
			var twoLevleDl = $("<dl class=\"w12\"></dl>").appendTo(twoLevleDiv);
			var levelValue = {};
			levelValue["firstLevel"]="";
			levelValue["secondLevel"]=menuData.name;
			levelValue["thirdLevel"]=oneVal.name;
			$("<a href=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/page/srch.html?paramValue="+oneVal.code+"&levelValue="+escape(JSON.stringify(levelValue))+"\">"+oneVal.name+"</a>").appendTo(twoLevleDl);
		});
	}
	
	this.init();
}