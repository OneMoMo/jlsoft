var queryYSZXQK_ZB = {
	"title" : "查询预算执行情况",
	"DataBaseType" : "scmform",
	"page" : "scm/projects/tecno/fygl/search/queryYSZXQK.html",
	"queryField" : {
		"FYXM" : {
			"enterQuery" : true
		},
		"BMMC" : {
			"enterQuery" : true
		}
	},
	  "detailGrid" : {
		"jlid" : "JLGrid",
		"queryConfig" : {
			"autoquery" : true,
			"dir" : "scm/projects/tecno/fygl/search",
			"namespace" : "queryYSZXQK",
			"sqlid" : "MX"
		}
	},
	"result" : [
         {"id" : "BM01","name" : "费用部门编码","width" : 120}, 
         {"id" : "BMMC","name" : "费用部门","width" : 120},
         {"id" : "FYBM","name" : "费用编码","width" : 120},
         {"id" : "FYXM","name" : "费用项目","width" : 120},
         {"id" : "YSQJ","name" : "预算期间","width" : 120},
         {"id" : "YSJE","name" : "预算金额","width" : 120,"align" : "right","format":"number|2","summary" : "sum"}, 
         {"id" : "FSJE","name" : "预算发生费用","width" : 120,"align" : "right","format":"number|2","summary" : "sum"},
         {"id" : "SYJE","name" : "预算剩余金额","width" : 120,"summary" : "sum","align" : "right","format":"number|2"}
     ]
};

var queryYSZXQK_MX = {
	  "title" : "查询预算执行情况明细",
	  "DataBaseType" : "scmform",
	  "result" : [
          {"id" : "BXRQ","name" : "报销日期","width" : 100}, 
          {"id" : "BXRMC","name" : "报销人","width" : 100}, 
          {"id" : "BM01","name" : "费用部门编码","width" : 120}, 
          {"id" : "BMMC","name" : "费用部门","width" : 120},
          {"id" : "FYBM","name" : "费用编码","width" : 120},
          {"id" : "YSQJ","name" : "预算期间","width" : 120}, 
          {"id" : "BXJE","name" : "报销金额","width" : 100,"format":"number|2","summary" : "sum"},
          {"id" : "BZ","name" : "备注","width" : 120}
      ]
};