var GCJLHZB_CXGCJLHZ = {
	"DataBaseType" : "scmform",
	"title" : "查找工程奖励汇总",
	"url" : pubJson.getURL("FormUrl") + "/queryGCJLHZ/getJLHZ.do",
    "page" : "scm/gcgl/gcdl/search/CXGCJLHZB.html",
    //查询工程奖励汇总表，可通过资料结算审核日期起始值、经销商名称查询。
    //表单字段（序号、经销商名称、奖励金额（按照查询日期、经销商合计）、收差金额（按照查询日期、经销商合计）、收差说明）
    //奖励金额总计、收差金额总计 
	"result" : [
	      {"id":"GCDLD01", "name":"工程登录单", "width":200},
	      {"id":"JXSMC", "name":"经销商名称", "width":200},
          {"id":"JLJE", "name":"奖励金额", "width":150,"summary" : "sum","format":"number|2","align":"right"},
	      {"id":"SCJE", "name":"收差金额", "width":150,"format":"number|2","align":"right","summary" : "sum"},
	      {"id":"SCSM", "name":"收差说明", "width":250},
	]
};
