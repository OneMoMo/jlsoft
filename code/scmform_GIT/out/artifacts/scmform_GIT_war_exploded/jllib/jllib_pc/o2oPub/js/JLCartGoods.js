var JLCartGoods = function(json){
	this.config = {
		"param": {},	
		"listener": {},	
		"sBillName": "",
		"sOperateName": "",
		"fileName":"",
		"trust":false
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = [];
	
	this.setData = function(data){
		this.data = data;
		this.loadImg();
		if(!JL.isNull(thisPlugin.config.coverFun)){
			thisPlugin.config.coverFun(data);
		}
		//懒加载图片
		thisPlugin.form.getTab().find("img.lazy").lazyload({
			//placeholder : pubJson.getURL("FormUrl")+"/o2o/shopJL/images/jz.jpg",
			threshold : 200,
		    effect : "fadeIn"
		   
		});
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
			this.setPage();
		}
	}
	
	this.loadImg = function(){
		debugger;
		this.ul.empty();
		if(!JL.isNull(this.data)){
			for(var i=0;i<this.data.length;i++){
				var row = this.data[i];
				if(i>4){
					break;
					var li = $("<li class=\"w20 hide\">").appendTo(this.ul);
				}else{
					var li = $("<li class=\"w20\">").appendTo(this.ul);
				}
				
				if(!JL.isNull(this.config.css)){
					li.addClass(this.config.css);
				}
				//li.addClass("w03 cd_w20 lg_w03 md_w04");
				li.data(row);
				li.click(function(){
					var data = $(this).data();
					if(!JL.isNull(thisPlugin.config.listener.click)){
						thisPlugin.config.listener.click(data,$(this));
					}
				});
				
				var headers = this.config.header;
				for(var j=0; j<headers.length; j++){
					var header = headers[j];
					
					var split = header.id.split(".");
	
					var html = "";
					if(split.length == 2){
						var arr = row[split[0]];
						if(!JL.isNull(arr) && $.isArray(arr)){
							var arr1 = arr[0][split[1]];
							if(!JL.isNull(arr1) && $.isArray(arr1)){
								html = arr1[0];
							}else{
								html = arr1;
							}
						}
					}else if(split.length == 3){
						if(typeof row[split[0]] != "undefined" && typeof row[split[0]][split[1]] != "undefined" && typeof row[split[0]][split[1]][0] != "undefined" && !JL.isNull(row[split[0]][split[1]][0][split[2]])){
							var arr2 = row[split[0]][split[1]][0][split[2]];
							if(!JL.isNull(arr2)){
								html = arr2;
							}
						}
					}else{
						html = row[header.id];
					}
					if(typeof row[header.id] =="object"){
						html=row[header.id].value;
					}
					if(typeof header.name !="undefined"){
						html=header.name+":"+html;
					}
					var div = $("<div class=\"w12\" id=\""+header.id+"\">").appendTo(li);
					if(header.editor == "img"){
						if(html !=""){
							div.append("<a class=\"w12 list_img\"><img class=\"lazy\" "+ 
								"data-original=\""+html+"\" "+ 
									"src=\""+html+"\" style=\"display: inline;\"></a>")
//							div.append("<a><img class=\"lazy\"   data-original='"+html+"'/></a>");
						}else{
							div.append("<a><img class=\"lazy\"   data-original=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/images/zwtp.jpg\"/></a>");
						}
					}else if(header.editor == "name"){
						div.append("<div class=\"w12\"><a class=\"list_name w12\">"+html+"</a></div>");
					}else if(header.editor == "price"){
						var span=div.append("<span class=\"font_color list_price\"><i class=\"fa fa-rmb\"></i>"+html+"</span>");
					}else if(header.editor == "num"){
						span.append("<span class=\"font_color\"><i class=\"fa fa-times\"></i>"+html+"</span>");
					}
					else if(header.editor == "channelType"){
						div.append("<a class=\"address\"><i class=\"fa fa-share-alt font_color\"></i>"+html+"</a>");
					}else if(header.editor == "time"){
						div.append("<span class=\"time\"><i class=\"fa fa-clock-o font_color\"></i>"+html+"</span>");
					}
					
					if(!JL.isNull(header.class)){
						div.addClass(header.class);
					}

					if(header.hidden){
						div.hide();
					}
				}
				
			}
		}
	}
	
	this.init = function(){
		$(this.obj).empty();
		var div = $("<div class=\"row\"><div class=\"w12 listTitle\"><h2 class=\"w12 font_color\">最近交易<div class=\"paging_tool fr hide\"><a><i class=\"fa fa-angle-left\"></i></a><a><i class=\"fa fa-angle-right\"></i></a>"+
				"</div></h2></div>").appendTo(this.obj);
		var list =$("<div class=\"listBox\"></div>").appendTo(this.obj);
		var ul =$("<ul class=\"w12\"></ul>").appendTo(list);
		this.ul = ul;
		this.loadData();
	}
	
	this.setPage = function(){
		//展示分页，获取总数
		if(!JL.isNull(this.config.fileName)){
			var pageCount = JL.getPagingData(this.config.fileName, "LASTPAGE",this.config.trust);
			$(this.obj).find(".jl_paging02").empty();
			$.kkPages(this,{lastPage:pageCount,filename:this.config.fileName});
		}
	}
	
	this.init();
};