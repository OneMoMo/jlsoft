var MONGO_CXGCTSSCD_queryGCTSSCD = {
	"DataBaseType" : "scmform",
	"title" : "查询工程收差单",
	"url" : pubJson.getURL("FormUrl") + "/queryGCSCD/CXGCTSSCD.do",
    "page" : "scm/gcgl/gcdl/search/CXGCSCD.html",
	"result" : [
	      
	          {"id":"GCDLD01", "name":"工程登录单", "width":200},
		     /* {"id":"QY", "name":"区域", "width":200},*/
		      {"id":"JXSMC", "name":"经销商", "width":200},
		      {"id":"EJJXSMC", "name":"二级经销商", "width":200},
		      {"id":"SYDW", "name":"使用单位", "width":200},
		      {"id":"GCYT", "name":"工程用途", "width":200},
		      {"id":"GMDW", "name":"购买单位", "width":200},
		      /*{"id":"GCGZR", "name":"工程跟踪人", "width":200},*/
              {"id": "JLWBDH","name": "分销单号","width": 135},
              {"id": "SPXX01","name": "商品内码","hidden":true},
			  {"id": "SPXX02","name": "商品代码","width": 80},
			  {"id": "SPXX04","name": "商品名称","width": 150},
              {"id": "THSL","name": "分销数量","summary" : "sum","width": 100,"align":"right"},
              {"id": "PFDJ","name": "分销单价","width": 100,"align":"right"},
              {"id": "WTSCDJ","name": "问题收差单价","width": 110,"align":"right"},
              {"id": "WTCE","name": "问题差额单价","width": 110,"align":"right","summary" : "sum"},
              {"id": "WTZLSL","name": "问题资料数量","width": 110,"align":"right","summary" : "sum"},
  		      {"id":"SCYY", "name":"收差原因", "width": 150}, 
			  {"id": "BZ","name": "备注","width": 200},
              {"id": "YYWTZLSL","name": "已有问题资料数量","width": 120,"align":"right","summary" : "sum"},
              {"id": "ZLSL","name": "资料数量","width": 100,"align":"right","summary" : "sum"},
			  {"id": "WTSCJE","name": "问题收差金额","width": 120,"align":"right","summary" : "sum"},
			  {"id" : "AZDZ","name" : "安装地址","width" : 200},
			  {"id" : "LXR","name" : "联系人","width" : 100},
			  {"id" : "LXDH","name" : "联系电话","width" : 120},
	]
};
