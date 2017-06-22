var JLPageChange = function(json){
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
	
	this.write = function(){
		$(this.obj).empty();
		var ul = $("<ul class=\"w12\"></ul>").appendTo(this.obj);
		var pageDiv = $("<div class=\"w12 tab_content\"></div>").appendTo(this.obj);
		$.each(this.config.page,function(i,val){
			//显示活页标签
			var li = $("<li id=\""+val.id+"\"><a>"+val.title+"</a></li>").appendTo(ul);
			if(!JL.isNull(val.showFlage) && val.showFlage=="true"){
				li.addClass("selected");
			}
			//显示标签内容
			var div=$("<div id=\""+val.id+"_page\" class=\"w12\"></div>").appendTo(pageDiv);
			if(!JL.isNull(val.groupcss)){
				div.addClass(val.groupcss);
			}
			//增加活页标签事件
			li.click(function(){
				$(this).parent().find("li").removeClass("selected");
				$(this).addClass("selected");
				$(this).parent().parent().find("div > div").hide();
				if (!JL.isNull(val.listener.click)){
					val.listener.click(thisPlugin);
				}
			});
		});
		//默认触发选中事件
		$(this.obj).find("ul li[class]").click();
	};
	
}