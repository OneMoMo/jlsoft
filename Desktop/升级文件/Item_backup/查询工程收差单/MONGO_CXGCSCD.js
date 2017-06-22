var MONGO_CXGCSCD_queryGCSCD = {
	"DataBaseType" : "scmform",
	"title" : "查询工程收差单",
	"url" : pubJson.getURL("FormUrl") + "/queryGCSCD/CXGCSCD.do",
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
          {"id": "JLWBDH","name": "分销单号","width": 140},
          {"id": "SPXX02","name": "商品代码","width": 120},
          {"id": "SPXX04","name": "商品名称","width": 200},
          {"id": "THSL","name": "分销数量","summary" : "sum","width": 120,"align":"right"},
          {"id": "PFDJ","name": "分销单价","width": 100,"align":"right"},
          {"id": "SCDJ","name": "收差单价","width": 100,"align":"right"},
          {"id": "SCCE","name": "收差差额","width": 100,"align":"right"},
          {"id": "SCSL","name": "收差数量","summary" : "sum","width": 100,"align":"right"},
          {"id": "SCJE","name": "收差金额","width": 100,"align":"right","summary" : "sum"},
	      {"id":"SCYY", "name":"收差原因", "width":150,"format":"number|2","align":"right","summary" : "sum"},
	      {"id":"SCBZ", "name":"收差备注", "width":250},
	]
};
