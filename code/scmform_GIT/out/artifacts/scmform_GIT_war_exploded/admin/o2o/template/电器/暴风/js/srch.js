var srch = new JLForm();
/*取mongo
 * index.setSrchParam({
	"sBillName":"form",
	"sOperateName":"find.do",
	"data":{
			"json":"{\"collection\":\"pageData\",\"query\":{\"ymid\": \"010101\",\"dqxx\":\"12\",\"flid\":\"00\"}}"
	}
});*/

//取静态json
srch.setSrchParam({
	"jsonUrl":"/customer/sydjt/json/jl/pageData/srch.json"
});

srch.setPlugin({
	"srchSPXX" : {
		"jlid" : "JLSrchSPXX"
		//"sqlid" : "HAIER.select_YWY",
		//"resource" : "scm",
		//"qx" : "RYDM"
	},
	"flsx":{
		"jlid" : "JLFLSX"
	}
});

try{
	srch.setTab(document);
	var json={};
	srch.initForm(json);//初始化窗口
}catch(e){}