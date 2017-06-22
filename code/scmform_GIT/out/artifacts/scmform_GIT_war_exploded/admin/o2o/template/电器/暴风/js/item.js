var productItem = new JLForm();
/*取mongo
 * index.setSrchParam({
	"sBillName":"form",
	"sOperateName":"find.do",
	"data":{
			"json":"{\"collection\":\"pageData\",\"query\":{\"ymid\": \"010101\",\"dqxx\":\"12\",\"flid\":\"00\"}}"
	}
});*/
productItem.setPlugin({
	"ITEM" : {
		"jlid" : "JLItem"
			//"sqlid" : "HAIER.select_YWY",
			//"resource" : "scm",
			//"qx" : "RYDM"
	},
	"spjs":{
		"jlid":"JlItemJs"
    }
});

//取静态json
productItem.setSrchParam({
	"jsonUrl":"/customer/sydjt/json/jl/pageData/item.json"
});

try{
	productItem.setTab(document);
	var json={};
	productItem.initForm(json);//初始化窗口
}catch(e){
	
}

    