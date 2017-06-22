function JLShowGoodsPackList(){	
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
		if(!JL.isNull(resultData)){
			if(!JL.isNull(resultData.packList)){
				div+=resultData.packList;
			}
		}
		div=div+"</div>";
		return div;
	};
}