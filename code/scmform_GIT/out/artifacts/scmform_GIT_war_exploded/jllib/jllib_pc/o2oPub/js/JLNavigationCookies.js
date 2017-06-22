var JLNavigationCookies = function(json){
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
		
	}
	
	this.init = function(){
		this.write();
	}
	
	this.write = function(){
		if(!JL.isNull(this.config.navigation)){
			var userInfoCookie = $.cookie("userInfo");
			var userInfo = JSON.parse(userInfoCookie);
			//循环导航菜单
			$.each(this.config.navigation,function(i,val){
				//登录显示“欢迎***”
				if(i==0){
					if(!JL.isNull(userInfo)){
						var showName = userInfo.companyName==null?userInfo.PCRM_CZY03:userInfo.companyName;
						$("<li>"+showName+"您好</li>").appendTo(thisPlugin.obj);
						var singOut = $("<li style='cursor:pointer'> 退出</li>").appendTo(thisPlugin.obj);
						singOut.on("click",function(){
							//删除后台session
							var ajaxJson = {};
							ajaxJson["src"] =pubJson.getURL("FormUrl")+"/user/logout.do?rid="+Math.random();
							ajaxJson["data"] = {"json":""};
							JL.ajaxCall(ajaxJson);
							//删除前台cookie
							$.cookie("userInfo", null,{path:"/"});
							localStorage.removeItem("uid");
							localStorage.removeItem("area");
							if(JL.isNull(thisPlugin.config.logOutUrl)){
								window.location.href = pubJson.getURL("FormUrl") + "/";
							}else{
								window.location.href = JL.forwardUrl(thisPlugin.config.logOutUrl);
								//window.location.href = pubJson.getURL("FormUrl") + thisPlugin.config.logOutUrl;
							}
						});
					}
				}
				//获取路径
				var hrefUrl = "";
				if((val.url).indexOf("http:")>-1){
					hrefUrl = val.url
				}else{
					hrefUrl = pubJson.getURL("FormUrl")+val.url;
				}
				if(val.channelType == "true"){
					hrefUrl = hrefUrl + "?channelType="+o2o.getCookieChannelType();
				}
				//输出配置导航
				var li;
				if(val.flag == "all"){
					li = $("<li id=\""+val.id+"\"><a href=\""+hrefUrl+"\">"+val.name+"</a></li>").appendTo(thisPlugin.obj);
				}else if(JL.isNull(userInfo) && val.flag == "false"){
					li = $("<li id=\""+val.id+"\"><a href=\""+hrefUrl+"\">"+val.name+"</a></li>").appendTo(thisPlugin.obj);
				}else if(!JL.isNull(userInfo) && val.flag == "true"){
					li = $("<li id=\""+val.id+"\"><a href=\""+hrefUrl+"\">"+val.name+"</a></li>").appendTo(thisPlugin.obj);
				}
			});
			//当是加盟商登录时，增加加盟商跳转首页
			if(!JL.isNull(userInfo) && userInfo.buyerType == "B2B"){
				//$("<li><a href=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/page/wholesaleSrch.html\">加盟商首页</a></li>").appendTo(thisPlugin.obj);
			}
		}
	}
	
	this.init();
}