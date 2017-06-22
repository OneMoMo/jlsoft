var SPKC_querySPKC = {
	"title" : "查询商品库存",
	"DataBaseType" : "scmform",
	"page" : "scm/ccgl/kcd/search/query_SPKC.html",
	"detailGrid": {
		"queryConfig":{
			"namespace": "SPKC",
			"sqlid": "querySPKCMX",
			"dir": "scm/ccgl/kcd/search",
			"autoquery": true
		}
	},
	"queryField" : {
		"SPMC" : {
			"enterQuery" : true
		},
		"WLDW" : {
			"enterQuery" : true
		}
	},
	"result" : [{
		"id" : "GSXX01",
		"name" : "GSXX01",
		"width" : 1,
		"hidden" : true
	}, {
		"id" : "CK",
		"name" : "仓库",
		"width" : 150
	}, {
		"id" : "SPBM",
		"name" : "商品编码",
		"width" : 100
	}, {
		"id" : "SPMC",
		"name" : "商品名称",
		"width" : 200
	}, {
		"id" : "PP",
		"name" : "品牌",
		"width" : 100
	}, {
		"id" : "KMS",
		"name" : "可卖数",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
		
	}, {
		"id" : "BGS",
		"name" : "保管数",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "SJZ",
		"name" : "三级账",
		"width" : 100,
		"summary" : "sum",
		"align" : "right" ,"format":"number|2"
	}, {
		"id" : "YFS",
		"name" : "延付数",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "YSS",
		"name" : "预售数",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "ZCS",
		"name" : "暂存数",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "SPSX",
		"name" : "商品属性 ",
		"width" : 100
	}, {
		"id" : "JLDW",
		"name" : "计量单位",
		"width" : 100,
		"align" : "center"
	}, {
		"id" : "DDZT",
		"name" : "订单在途",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "ZCZT",
		"name" : "转仓在途",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "JCZT",
		"name" : "借出在途",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "JTZT",
		"name" : "集团在途",
		"width" : 100,
		"summary" : "sum",
		"align" : "right","format":"number|2"
	}, {
		"id" : "GYSBM",
		"name" : "供应商编码",
		"width" : 100
	},{
		"id" : "GYS",
		"name" : "供应商",
		"width" : 200
	},{
		"id" : "BM01",
		"name" : "采购部门编码",
		"width" : 100
	}, {
		"id" : "CGBM",
		"name" : "采购部门",
		"width" : 150
	}, {
		"id" : "SPFL",
		"name" : "商品分类",
		"width" : 100
	}, {
		"id" : "PJDJ",
		"name" : "平均单价",
		"align" : "right",
		"width" : 100,"skbj":true ,"format":"number|2"
	}, {
		"id" : "PJKCJE",
		"name" : "平均库存金额",
		"align" : "right",
		"width" : 100,"skbj":true,"format":"number|2"
	}, {
		"id" : "KCYJ",
		"name" : "库存预警",
		"width" : 100
	},
	{
		"id" : "SPDL",
		"name" : "商品大类",
		"width" : 100
	}],
	"listener" : {
    	"loadRow":function(Plugin, data, index, dl){
    		if(data.KCYJ == "库存偏高"){
    			dl.addClass("font_red");
    		}else if(data.KCYJ == "库存偏低"){
    			dl.addClass("font_yellow");
    		}
    	}
    }

};
var SPKC_querySPKCMX = {

		"title" : "查询商品库存",
		"DataBaseType" : "scmform",
		"page" : "scm/ccgl/kcd/search/query_SPKCMX.html",
		"result" : [{
			"id" : "GSXX01",
			"name" : "GSXX01",
			"width" : 1,
			"hidden" : true
		},{
			"id" : "CK01",
			"name" : "CK01",
			"width" : 1,
			"hidden" : true
		},{
			"id" : "BM01",
			"name" : "BM01",
			"width" : 1,
			"hidden" : true
		},{
			"id" : "GYSBM",
			"name" : "GYSBM",
			"width" : 1,
			"hidden" : true
		},{
			"id" : "DJRQ",
			"name" : "单据日期",
			"width" : 100
		}, {
			"id" : "DJHM",
			"name" : "单据号",
			"width" : 100
		}, {
			"id" : "DJLX",
			"name" : "单据类型",
			"width" : 100
		},  {
			"id" : "SPBM",
			"name" : "商品编码",
			"width" : 100
		}, {
			"id" : "SPMC",
			"name" : "商品名称",
			"width" : 100
		}, {
			"id" : "DJSL",
			"name" : "单据数量",
			"width" : 100,
			"summary" : "sum",
			"align" : "right"
		},{
			"id" : "KMSWD",
			"name" : "可卖数未达",
			"width" : 100,
			"summary" : "sum",
			"align" : "right"
		}, {
			"id" : "BGSWD",
			"name" : "保管数未达",
			"width" : 100,
			"summary" : "sum",
			"align" : "right"
		}, {
			"id" : "SJZWD",
			"name" : "三级账未达",
			"width" : 100,
			"summary" : "sum",
			"align" : "right"
		},  {
			"id" : "JSSL",
			"name" : "拒收数量 ",
			"width" : 100,
			"align" : "right"
		}, {
			"id" : "SPSX",
			"name" : "商品属性 ",
			"width" : 100
		},  {
			"id" : "GYS",
			"name" : "供应商",
			"width" : 100
		}, {
			"id" : "CGBM",
			"name" : "采购部门",
			"width" : 100
		},  {
			"id" : "CKMC",
			"name" : "仓库名称",
			"width" : 100
		}, {
			"id" : "CGBMBM",
			"name" : "采购部门编码",
			"width" : 100
		}, {
			"id" : "CKBM",
			"name" : "仓库编码",
			"width" : 100
		}, {
			"id" : "SPFL",
			"name" : "商品分类",
			"width" : 100
		},
		{
			"id" : "SPPP",
			"name" : "品牌",
			"width" : 100
		}]
	};


var SPKC_querySPKCZT= {
		"title" : "查询商品库存状态",
		"DataBaseType" : "scmform",
		"page" : "scm/ccgl/kcd/search/QUERY_SPKCZT.html",
		"queryField":{
			"SPMC":{"enterQuery":true}
		},
		"result" : [
		          {"id" : "SPBM","name" : "商品编码","width" : 100},
		          {"id" : "SPMC","name" : "商品名称","width" : 160},
		          {"id" : "KCZT","name" : "库存状态","width" : 100},
		          {"id" : "SPPPMC","name" : "品牌","width" : 100},
		          {"id" : "SPFLMC","name" : "商品分类","width" : 120}
		          ]
		      };

var SPKC_querySPWDZ = {
	"title" : "查询商品未达账",
	"DataBaseType" : "scmform",
	"page" : "scm/ccgl/kcd/search/query_SPWDZ.html",
		"result" : [
		  {"id" : "DJHM","name" : "单据号"}, 
		  {"id" : "DJLX","name" : "单据类型"},  
		  {"id" : "DJRQ","name" : "单据日期","width" : 90},  
		  {"id" : "SPBM","name" : "商品编码","width" : 120}, 
		  {"id" : "SPMC","name" : "商品名称", "width" : 300}, 
		  {"id" : "CKMC","name" : "仓库名称","width" : 150}, 
		  {"id" : "DJSL","name" : "单据数量", "width" : 90,"summary" : "sum","align" : "right","format":"number|2" },
		  {"id" : "KMSWD","name" : "可卖数未达","width" : 90,"summary" : "sum","align" : "right","format":"number|2"}, 
		  {"id" : "BGSWD","name" : "保管数未达","width" : 90,"summary" : "sum","align" : "right","format":"number|2"}, 
		  {"id" : "SJZWD","name" : "三级账未达","width" : 90,"summary" : "sum","align" : "right","format":"number|2"},  
		  {"id" : "JSSL","name" : "拒收数量","width" : 90,"summary" : "sum","align" : "right","format":"number|2"}, 
		  {"id" : "SPSX","name" : "商品属性"},  
		  {"id" : "GYS","name" : "供应商","width" : 260}, 
		  {"id" : "CGBM","name" : "采购部门","width" : 220},  
		  {"id" : "CGBMBM","name" : "采购部门编码","width" : 100}, 
		  {"id" : "CKBM","name" : "仓库编码","width" : 100}, 
		  {"id" : "SPFL","name" : "商品分类","width" : 100},
		  {"id" : "SPPP","name" : "品牌","width" : 150}
	]
};

