var MONGO_GCSPXJ_SCM_GCSPXJ = {
	"collection" : "SCM_GCSPXJ",
};

var MONGO_GCSPXJ_GCSP = {
	"title" : "查找工程商品",
	"collection" : "SCM_DYGCSP",
	"page":"admin/scm/jcdy/search/MONGO_GCSPXJ_GCSP.html",
	"queryField":{
		"GCSP" : {
			"enterQuery" : true
		}
	},
	"result" : [
        {"id":"GCSPMC", "name":"工程商品名称", "width":200},
        {"id":"GCSPBM", "name":"工程商品编码", "width":150}
	]
};
