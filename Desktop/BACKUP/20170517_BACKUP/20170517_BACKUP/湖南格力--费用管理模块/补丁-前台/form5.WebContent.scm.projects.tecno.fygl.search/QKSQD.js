var QKSQD_QKMX= {
  "title" : "选择费用项目",
  "page" : "scm/projects/tecno/fygl/search/QKSQD.html",
  "DataBaseType" : "scmform",
  "result" : [
    {"id" : "FYBM", "name" : "费用编码", "width" : 150},
    {"id" : "FYXM", "name" : "费用项目", "width" : 150},
    {"id" : "CWKM", "name" : "科目代码", "width" : 150}
  ]
};

var QKSQD_YSZE= {
  "DataBaseType" : "scmform",
  "result" : [
    {"id" : "YSZE", "name" : "预算总额", "width" : 150,"format":"number|2"}
  ]
};

var QKSQD_QKZE= {
  "DataBaseType" : "scmform",
  "result" : [
    {"id" : "QKZE", "name" : "请款总额", "width" : 150,"format":"number|2"}
  ]
};

var QKSQD_FYLS = {
	"title" : "查看费用历史",
	"DataBaseType" : "scmform",
	"result" : [
               {"id": "QKSQD01","name": "请款申请单号","width": 200},
               {"id": "SQRMC","name": "申请人","width": 120},
               {"id": "SQRQ","name": "申请日期","width": 120},
               {"id": "KMDM","name": "科目代码","width": 120},
               {"id": "QKJE","name": "请款金额","width": 100,"align" : "right","format":"number|2","summary":"sum","format":"number|2"},
               {"id": "YSQJ","name": "预算期间","width": 100},
               {"id": "DJH01","name": "情况申请单号","hidden" : true}
              ]
};

//收款方式(请款申请单,费用报销共用)
var QKSQD_FY_SKFS= {
   "title" : "查看收款方式",
  "DataBaseType" : "scmform",
  "result" : [
    {"id" : "SKFS01", "name" : "收款方式编码", "width" : 150},
    {"id" : "SKFSMC", "name" : "收款方式名称", "width" : 150},
    {"id" : "YHBJ", "name" : "银行标记","hidden" : true},
  ]
};

//查询请款申请单
var QKSQD_queryQKSQD= {
	"title" : "查询请款申请单",
	"DataBaseType" : "scmform",
	"page" : "scm/projects/tecno/fygl/search/queryQKSQD.html",
	"queryField" : {
		"QKSQD01" : {"enterQuery" : true},
		"SQRMC" : {"enterQuery" : true}
	},
/*	  "detailGrid" : {
		"jlid" : "JLGrid",
		"queryConfig" : {
			"autoquery" : true,
			"dir" : "scm/projects/tecno/fygl/search",
			"namespace" : "queryYSZXQK",
			"sqlid" : "MX"
		}
	},*/
	"menu":[[
       {
    	"text":"打印",
    	"func": function(){
    		debugger;
    		$(this).closest("dl").click();
    		var plugin=JL.getPluginObj($(this).closest("[id^='d_']"));
    		console.info(plugin.getSelected());
    		plugin=plugin.getSelected()[0];
    		var query={};
    		query["QKSQD01"]=plugin.QKSQD01;
    		query["GSXX01"]=plugin.GSXX01;
			var resultData=JL.JLForm().getSqlResult(query, "QKSQD", "SCM_QKSQD", "scm/projects/tecno/fygl/search");
			resultData=resultData.data;
			if(JL.isNull(resultData)){
				JL.tip("没有查询到数据！","info");
				return false;
			}
			JL.print(41, [resultData[0]],"auto"); 
    	}
       }
	]],
	"result" : [
	             {"id" : "QKSQD01","name" : "申请单号","width" : 150}, 
	             {"id" : "SQRMC","name" : "申请人"},
	             {"id" : "BMMC","name" : "所属部门","width" : 250},
	             {"id" : "BM01","name" : "部门编码","width" : 120},
	             {"id" : "DJZT","name" : "单据状态","width" : 120},
	             {"id" : "SQYY","name" : "申请原因","width" : 120},
	             {"id" : "QKZE","name" : "请款总额","width" : 120,"align" : "right","format":"number|2"}, 
	             {"id" : "FYLX01","name" : "费用编码","width" : 120},
	             {"id" : "FYMC","name" : "费用项目","width" : 120},
	             {"id" : "KMDM","name" : "科目代码","width" : 120},
	             {"id" : "YSYE","name" : "预算余额","width" : 120,"align" : "right","format":"number|2"},
	             {"id" : "QKJE","name" : "请款金额","width" : 120,"align" : "right","format":"number|2"}, 
	             {"id" : "CUR","name" : "币种编码"},
	             {"id" : "WBBZ","name" : "币种"},
	             {"id" : "SKFS01","name" : "收款方式编码"},
	             {"id" : "SKFSMC","name" : "收款方式",},
	             {"id" : "YHZH","name" : "银行账号","width" : 150},
	             {"id" : "YSQJ","name" : "预算期间","width" : 100},
	             {"id" : "SQRQ","name" : "申请日期","width" : 100},
	             {"id" : "ZDRMC","name" : "制单人"},
	             {"id" : "ZDRQ","name" : "制单日期","width" : 100},
	             {"id" : "SHRMC","name" : "审核人"},
	             {"id" : "SHRQ","name" : "审核日期","width" : 100},
	             {"id" : "CNRMC","name" : "出纳人"},
	             {"id" : "CNRQ","name" : "出纳日期","width" : 100},
	             {"id" : "BZ","name" : "备注","width" : 120},
	             {"id" : "GSXX01","name" : "GSXX01","width" : 120,"hidden" : true}
	             ]
};

var QKSQD_SCM_QKSQD = {
	"title" : "查询工厂直拨单MONGO",
	"collection" : "SCM_QKSQD",
	"result" : []
};