var JLTableImg = function(json){
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
		this.ul.empty();
		if(!JL.isNull(this.data)){
			for(var i=0;i<this.data.length;i++){
				var row = this.data[i];
				var li = $("<li>").appendTo(this.ul);
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
						if(typeof row[split[0]] != "undefined" && typeof row[split[0]][0][split[1]] != "undefined" && typeof row[split[0]][0][split[1]][0] != "undefined" && !JL.isNull(row[split[0]][0][split[1]][0][split[2]])){
							var arr2 = row[split[0]][0][split[1]][0][split[2]];
							if(!JL.isNull(arr2)){
								html = arr2;
							}
						}
					}else{
						html = row[header.id];
					}
					var div = $("<div id=\""+header.id+"\">").appendTo(li);
					if(header.editor == "img"){
						if(html !=""){
							div.append("<a><img class=\"lazy\"   data-original='"+html+"'/></a>");
						}else{
							div.append("<a><img class=\"lazy\"   data-original=\""+pubJson.getURL("FormUrl")+"/o2o/shopJL/images/zwtp.jpg\"/></a>");
						}
					}else if(header.editor == "i"){
						div.append("<i class='fa "+header.icon+"'></i><span>"+html+"</span>");
					}else if(!JL.isNull(header.editor)){
						div.append("<"+header.editor+">"+html+"</"+header.editor+">");
					}else if(JL.isNull(header.editor)){
						div.append(html);
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
		var ul = $("<ul>").appendTo(this.obj);
		ul.addClass("listBOX jl_list w12 pro_list pro_list_img mb10");
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