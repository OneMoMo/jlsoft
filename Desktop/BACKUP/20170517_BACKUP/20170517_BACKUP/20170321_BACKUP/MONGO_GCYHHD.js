var MONGO_GCYHHD_SCM_GCYHHD={
	"title":"查找工程要货单",
	"url" : pubJson.getURL("FormUrl") + "/queryGCYHD/getGCYHD.do",
	"page":"scm/gcgl/gcdl/search/QUERY_GCYHD.html",
	"queryField":{
		"GCYHD01":{"enterQuery":true},
		"SYDW":{"enterQuery":true},
		"YHDH":{"enterQuery":true},
		"JXSMC":{"enterQuery":true},
		"YHXM":{"enterQuery":true},
		"GCBH":{"enterQuery":true},
		"GMDW":{"enterQuery":true},
		"YWYMC":{"enterQuery":true},
		"BZ02":{"enterQuery":true},
		"SYDWDZ":{"enterQuery":true}
	},
	"detailGrid":{
		"jlid":"JLGrid",
		"queryConfig":{
			"autoquery":true,
			"dir":"scm/fxgl/yhd/search",
			"namespace":"CXKHYHD",
			"sqlid":"KHYHDMX"
		}
	},
	"result":[
	    {"id":"GSXX01", "name":"公司信息", "width":150,"hidden":true},
	    {"id":"KHYHD", "name":"客户要货单V9单号", "width":150,"hidden":true},
		{"id":"BZ02", "name":"单据状态","width":80},
		{"id":"GCDLD01", "name":"工程登录单号", "width":130},
		{"id":"GCYHD01", "name":"工程要货单号", "width":180},
		{"id":"JXSMC", "name":"经销商", "width":120},
		{"id":"EJJSXMC", "name":"二级经销商", "width":120},
		{"id":"SYDW", "name":"使用单位", "width":150}, 
		{"id":"SPXX02", "name":"商品编码", "width":80},
		{"id":"SPMC", "name":"商品名称", "width":150},
		{"id":"SPPPMC", "name":"品牌", "width":80},
		{"id":"YHDJ", "name":"要货单价", "align":"right","format":"number|2"},
		{"id":"BZJDJ", "name":"保证金单价", "align":"right","format":"number|2"},
		{"id":"KDDJ", "name":"开单单价", "align":"right","format":"number|2"},
		{"id":"YHSL", "name":"要货数量", "align":"right", "summary":"sum","format":"number|0"},
		{"id":"YHJE", "name":"要货金额", "width":100, "align":"right", "summary":"sum","format":"number|2"},
		{"id":"BZJ", "name":"保证金", "width":100, "align":"right", "summary":"sum","format":"number|2"},
		{"id":"HJJE", "name":"开单总价", "width":100, "align":"right", "summary":"sum","format":"number|2"},
		{"id":"FLBL","name":"返利比例","width":100,"align":"right"},
	    {"id":"FLJE","name":"返利金额","width":100,"align":"right","summary":"sum","format":"number|2"},
		{"id":"YKDSL", "name":"已开单数量", "width":100,"align":"right", "summary":"sum","format":"number|0"},
		{"id":"SYKDSL", "name":"剩余开单数量","width":100, "align":"right", "summary":"sum","format":"number|0"},
		{"id":"SYKDJE", "name":"剩余开单金额","width":100, "align":"right", "summary":"sum","format":"number|2"},
		{"id":"GCLX", "name":"工程类型","width":90},
		{"id":"ZZSL", "name":"终止数量","align":"right","summary":"sum","width":100,"format":"number|0"},
		{"id":"XSSL", "name":"销售数量", "align":"right","summary":"sum","width":100,"format":"number|0"},
		{"id":"BMMC", "name":"销售部门", "width":100}, 
		{"id":"XSFS01", "name":"销售方式", "width":100},
		{"id":"AZDZMX", "name":"安装地址", "width":200},
/*	     {"id" : "QY","name" : "区域","width" : 80}, */
		{"id":"YWYMC", "name":"业务员", "width":100},  
		{"id":"ZDR", "name":"制单人", "width":100},
		{"id":"ZDSJ", "name":"制单日期", "width":140},
		{"id":"PFR", "name":"批复人", "width":100},
		{"id":"PFSJ", "name":"批复日期", "width":140},
		{"id":"PSFS", "name":"配送方式","width":80},
		{"id":"SHDZ", "name":"送货地址", "width":200},
		{"id":"KHXM", "name":"联系人", "width":100}, 
		{"id":"KHDH", "name":"联系方式", "width":110},
		{"id":"MJ", "name":"面积", "width":110},
		{"id":"PS", "name":"匹数", "width":110},
		{"id":"YHBZ", "name":"备注", "width":200} 
	],
	"listener" : {
		"loadRow" : function(thisPlugin, data, index, dl){
			debugger;
			//商用业务员
			var gw=userInfo["PCRM_GW01"]
			if(gw=="2101"){
				thisPlugin.hideColumn("YHDJ",true);
				thisPlugin.hideColumn("YHJE",true);
			}
		}
    }
};