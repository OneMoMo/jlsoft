function JLShowGoodsGGCS(){	
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
	var tcCode=JL.getUrlParam("tcCode");
	this.setData = function(data){
		this.data = data;
	};
	
	this.getData = function(){
		return this.data;
	};
	this.loadData = function(){

	};
	
	this.write = function(){
		var resultData = this.getData();
		var pdiv = "<table>";
		pdiv+="<thead><tr><td colspan=\"2\"></td></tr></thead>";
		pdiv+= "<tbody>";
		var tcInfo={};
		//当有属性值取属性与套餐的规格参数
		if(resultData!=""){
			if(resultData.attr!=undefined){
				for(var key in resultData.attr){
					var attr=[];
					if(tcInfo.length==0||tcInfo[key]==null){
								var attr=[];
								attr.push(resultData.attr[key]);
								tcInfo[key]=attr;
						}else{
								var vl=tcInfo[key];
								vl.push(resultData.attr[key]);
								tcInfo[key]=vl;
						}
				};
				$.each(resultData.tc,function(i,sxData){
						for(var k in sxData){
							if(sxData[k]==tcCode){
								for(var key in sxData){
									var attr=[];
									//过滤价格库存和套餐代码
									if(key=="tcCode" || key=="uri" || key=="price" || key=="stockNum" || key=="outSideCode" || key=="attrDetail" || key=="DistributionPrice" || key=="groupMark" || key=="retailMark" || key=="wholesaleMark" || key=="packNum" || key=="mixNum"){
										continue;
									}
									if(tcInfo.length==0||tcInfo[key]==null){
										var attr=[];
										attr.push(sxData[key]);
										tcInfo[key]=attr;
								}else{
										var vl=tcInfo[key];
										if($.inArray(sxData[key],vl)==-1){
											vl.push(sxData[key]);
											tcInfo[key]=vl;
										}
									}
								}
							}
						}
				});
			}else{
				//没有定义属性只取套餐参数
				$.each(resultData.tc,function(i,sxData){
					for(var k in sxData){
						if(sxData[k]==tcCode){
							for(var key in sxData){
								var attr=[];
								//过滤价格库存和套餐代码
								if(key=="tcCode" || key=="uri" || key=="price" || key=="stockNum" || key=="outSideCode" || key=="attrDetail"){
									continue;
								}
								if(tcInfo.length==0||tcInfo[key]==null){
									var attr=[];
									attr.push(sxData[key]);
									tcInfo[key]=attr;
							}else{
									var vl=tcInfo[key];
									if($.inArray(sxData[key],vl)==-1){
										vl.push(sxData[key]);
										tcInfo[key]=vl;
									}
								}
							}
						}
					}
				});
			}
		}
	

		
		for (var key in tcInfo){
			//循环拼接数据
			pdiv+= "<tr><th style=\"color: #E83005;\">"+key+"</th><td>&nbsp;"+tcInfo[key]+"</td></tr>";
		}
		return pdiv;
	};
}