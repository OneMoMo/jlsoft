var JLNewsList = function(json){
	this.config = {
		"param": {},	
		"listener": {},	
		"sBillName": "",
		"sOperateName": "",
		"fileName":""
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.setData = function(data){
		this.data = data;
		this.write();
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.removeData = function(){
		return this.data;
	}
	
	this.loadData = function(jsonData){
		var result = [];
		var param = this.config.param;
		var ajaxJson = {};
		if(!JL.isNull(jsonData) &&!JL.isNull(jsonData.sBillName) && !JL.isNull(jsonData.sOperateName)){
			ajaxJson["src"] = jsonData.sBillName+"/"+jsonData.sOperateName+"?rid="+Math.random();
		}else if(!JL.isNull(this.config.sBillName) && !JL.isNull(this.config.sOperateName)){
			ajaxJson["src"] = this.config.sBillName+"/"+this.config.sOperateName+"?rid="+Math.random();
		}
		ajaxJson["data"] = {"XmlData":JSON.stringify(param)};
		if(!JL.isNull(ajaxJson["src"])){
			var resultData = JL.ajax(ajaxJson,true);
			this.config.fileName = resultData.fileName;
			this.setData(resultData.data);
		}
	}
	
	this.write = function(){
		if(this.data.length != null){
			var ul = this.ul;
			ul.empty();
			$.each(this.data,function(i,val){
				var url = "";
				if(!JL.isNull(val.file)){
					url = pubJson.getURL("FormUrl")+"/news/news.html?htmlUrl="+(val.file)[0].FILE_URL;
					if(!JL.isNull(thisPlugin.config.forward)){
						url = pubJson.getURL("FormUrl") + thisPlugin.config.forward + "?htmlUrl="+(val.file)[0].FILE_URL;
					}
				} else if(!JL.isNull(val.url)){
					url = val.url;
				}
				var li = $("<li><a href=\""+url+"\" target=\"_blank\">"+val.title+"</a><span>"+val.ts+"</span></li>").appendTo(ul);
			});
			
		}
	}
	
	this.init = function(){
		$(this.obj).empty();
		//新增标题
		$(this.obj).append("<h5 class=\"w12\"><span class=\"w11\">标题</span><span class=\"w01\">发表时间</span></h5>");
		//$("<h5 class=\"w12\"><span class=\"w11\">标题</span><span class=\"w01\">发表时间</span></h5>").appentTo(this.obj);
		var ul = $("<ul></ul>").appendTo(this.obj);
		this.ul = ul;
		this.loadData();
		this.setPage();
	}
	
	this.setPage = function(){
		//展示分页，获取总数
		if(!JL.isNull(this.config.fileName)){
			var pageCount = JL.getPagingData(this.config.fileName, "LASTPAGE");
			$(this.obj).find(".jl_paging02").empty();
			$.kkPages(this,{lastPage:pageCount,filename:this.config.fileName});
		}
	}
	
	this.init();
};