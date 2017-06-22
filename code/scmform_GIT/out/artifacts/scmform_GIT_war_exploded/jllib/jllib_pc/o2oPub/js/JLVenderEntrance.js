var JLVenderEntrance = function(json){
	this.config = {
		"param": {},	
		"listener": {},	
		"sBillName": "",
		"sOperateName": "",
		"zcxx01":0
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.setData = function(data){
		this.data = data;
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.loadData = function(){
		var transport = new JLTransport();
		var resultData = transport.getSqlResult({"zcxx01":this.config.zcxx01}, "user", "jlbh", "o2o/user/search");
		resultData = resultData.data[0];
		this.setData(resultData);
	}
	
	this.write = function(){
		$(this.obj).empty();
		var resultData = this.getData();
		var ul = $("<ul class=\"w12\"></ul>").appendTo(this.obj);
		var headers = thisPlugin.config.header;
		for(var i=0;i<headers.length;i++){
			var header = headers[i];
			var li = $("<li class=\"w12\"></li>").appendTo(ul);
			//判断节点有几级
			var html;
			var split = header.id.split(".");
			if(split.length == 2){
				html = resultData[split[0]][split[1]];
			}else{
				html = resultData[header.id];
			}
			//拼接属性值
			if(!JL.isNull(header.editor) && header.editor == "img"){
				if(typeof html=="string"){
					$("<img src=\""+JSON.parse(html)[0].FILE_URL+"\" class=\"w12\" />").appendTo(li);
				}else{
					$("<img src=\""+html[0].FILE_URL+"\" class=\"w12\" />").appendTo(li);
				}
				
			}else if(!JL.isNull(header.editor) && header.editor == "button"){
				var enterVender = $("<a class=\"jl_btn btn_white w06 md_w10 md_ml_w01\"><i class=\"fa fa-home\"></i>进店逛逛</a>").appendTo(li);
				var concernVender = $("<a class=\"jl_btn btn_white w06 md_w10 md_ml_w01\"><i class=\"fa fa-star\"></i>关注店铺 </a>").appendTo(li);
			/*	enterVender.click(function(){
					window.location.href= pubJson.getURL("FormUrl") + "/o2o/vender/page/index.html?zcxx01="+resultData.zcxx01;
				});*/
			}else{
				$("<span class=\"w12\">"+html+"</span>").appendTo(li);
			}
			//拼接样式
			if(!JL.isNull(header.groupcss)){
				li.find("span,button").addClass = header.groupcss;
			}
		}
	}
	
	this.init = function(){
		this.loadData();
		this.write();
	}
	
};