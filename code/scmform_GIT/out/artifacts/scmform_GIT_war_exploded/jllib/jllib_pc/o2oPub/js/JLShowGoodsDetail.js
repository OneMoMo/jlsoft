function JLShowGoodsDetail(){	
	this.config = {
			"param": {},	
			"listener": {},	
			"sBillName": "jlquery",
			"sOperateName": "select.do",
			"tcCode":""
	};
	//$.extend(this.config, json);
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
		//加载数据
	};
	
	this.write = function(){
		var resultData = this.getData();
		var div="<div>";
		if(resultData!=""){
			for(var i=0;i<resultData.spjs_uri_pc.length;i++){
				div+="<img src=\""+resultData.spjs_uri_pc[i]+"\" title=\"商品名称\" style=\"width:100%\">";
			}
		}
		return div;
	};
}