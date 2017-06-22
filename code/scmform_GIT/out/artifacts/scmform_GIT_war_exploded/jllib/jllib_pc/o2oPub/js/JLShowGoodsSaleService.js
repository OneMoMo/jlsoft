function JLShowGoodsSaleService(){	
	this.config = {
			"param": {},
			"listener": {},	
			"sBillName": "jlquery",
			"sOperateName": "select.do",
			"zcxx01":0
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
		var transport = new JLTransport();
		var resultData = transport.getSqlResult({"zcxx01":this.config.zcxx01}, "user", "jlbh", "o2o/user/search");
		resultData = resultData.data[0];
		this.setData(resultData);
	};
	
	this.write = function(){
		this.loadData();
		var resultData = this.getData();
		var div="<div>";
		if(!JL.isNull(resultData)){
			if(!JL.isNull(resultData.other)){
				if(!JL.isNull(resultData.other.saleService)){
					div+=resultData.other.saleService;
				}
			}
		}
		div=div+"</div>";
		return div;
	};
}