var SPJXC_querySPJXC = {
	"title" : "查找商品",
    "page" : "scm/bbgl/querySPJXC/search/querySPJXC.html",
	"DataBaseType" : "scmform",
	"isNotNull": {
	    "RQQ":"日期起不能为空",
	    "RQZ":"日期止不能为空"
	},
	"result" : [
		  {"id":"SPXX02", "name":"商品编码", "width":150},
		  {"id":"SPXX04", "name":"商品名称 ", "width":200},
		  {"id":"BQJCSL", "name":"本期库存数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSBQJCJE", "name":"本期库存金额", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"SQJCSL", "name":"上期库存数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSSQJCJE", "name":"上期库存金额 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"SLCE", "name":"数量差异 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"JECE", "name":"金额差异", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"JHSL", "name":"进货数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSJHJE", "name":"进货金额 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"BJSL", "name":"变价数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSBJJE", "name":"变价金额", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSBJCB", "name":"变价调成本 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"BJSL", "name":"变价调库存 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"FCSL", "name":"退货数量", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSFCJE", "name":"退货金额 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSFCBJCB", "name":"退货调成本 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"LSSL", "name":"零售数量", "width":150, "summary":"sum", "align":"right"},
		  {"id":"LSJE", "name":"零售金额 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSLSCB", "name":"零售成本 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSLSML", "name":"零售毛利", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"YJJE", "name":"用券金额 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"JLSJE", "name":"净零售金额 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSJLSML", "name":"净零售毛利", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"SYSL", "name":"损溢数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSSYJE", "name":"损溢金额 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"CYSL", "name":"出样数量", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSCYJE", "name":"出样金额 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"PFSL", "name":"分销数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"PFJE", "name":"分销金额", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSPFCB", "name":"分销成本 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSPFML", "name":"分销毛利 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"XSYFJE", "name":"销售月返", "width":150, "summary":"sum", "align":"right"},
		  {"id":"XSSL", "name":"销售数量合计 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"XSJE", "name":"销售金额合计 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSXSML", "name":"销售毛利合计", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"JXSJE", "name":"净销售金额合计 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSJXSML", "name":"净销售毛利合计 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"PFBJSL", "name":"分销变价数量", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSPFBJJE", "name":"分销变价金额", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSZHCB", "name":"综合成本 ", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSZHML", "name":"综合毛利", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"HSZHMLV", "name":"综合毛利率 ", "width":150,"skbj":true},
	      {"id":"KCZZL", "name":"库存周转率", "width":150},
	      {"id":"ZJZZQK", "name":"库存周转天数", "width":150},
	      {"id":"KCZZTS", "name":"资金周转情况", "width":150},
		  {"id":"ZZSL", "name":"组装数量 ", "width":150, "summary":"sum", "align":"right"},
		  {"id":"HSZZJE", "name":"组装金额", "width":150, "summary":"sum", "align":"right","skbj":true},
		  {"id":"WLDW01", "name":"供应商编码 ", "width":150},
		  {"id":"WLDW02", "name":"供应商名称 ", "width":200},
		  {"id":"BM01",	"name":"部门编码", "width":150},
		  {"id":"BM02", "name":"部门名称 ", "width":150},
		  {"id":"HZFS", "name":"合作方式 ", "width":150},
		  {"id":"SPFL02", "name":"商品分类", "width":150},
		  {"id":"SPDL", "name":"商品大类", "width":150},
		  {"id":"PPB02", "name":"商品品牌 ", "width":150},
		  {"id":"SPJXC08", "name":"商品属性 ", "width":150}
	],
	"listener" : {
		"loadRow" : function(thisPlugin, data, index, dl){
			var KCZZTS = 0;
			var ZJZZQK = 0;
			var sum = data.HSSQJCJE*1 + data.HSBQJCJE*1;
			if(sum != 0){
				KCZZTS = (data.HSZHCB*2)/sum;
				if(KCZZTS != 0){
					ZJZZQK = 360/KCZZTS;
				}
			}
			thisPlugin.setCell(KCZZTS, index, thisPlugin.getRowIndexByID("KCZZTS"));
			thisPlugin.setCell(ZJZZQK, index, thisPlugin.getRowIndexByID("ZJZZQK"));
		}
	}
};

var SPJXC_RCLDATE = {
	"title" : "查询日处理时间",
	"DataBaseType" : "scmform",
	"result" : []
};