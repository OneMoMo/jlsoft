var index = new JLForm();
/*取mongo
 * index.setSrchParam({
	"sBillName":"form",
	"sOperateName":"find.do",
	"data":{
			"json":"{\"collection\":\"pageData\",\"query\":{\"ymid\": \"010101\",\"dqxx\":\"12\",\"flid\":\"00\"}}"
	}
});*/

//取静态json
index.setSrchParam({
	"jsonUrl":"/customer/sydjt/json/jl/pageData/shop_index.json"
});

/*$.getJSON("/customer/sydjt/json/index.json", function(data){
	  	alert(JSON.stringify(data));
	});*/

try{
	index.setTab(document);
	var json={};
	index.initForm(json);//初始化窗口
}catch(e){}
