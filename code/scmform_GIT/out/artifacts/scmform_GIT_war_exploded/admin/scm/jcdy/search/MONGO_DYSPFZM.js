var MONGO_DYSPFZM_SCM_DYSPFZM = {
  "title" : "查找商品辅助码",
  "DataBaseType" : "",
  "collection" : "SCM_DYSPFZM",
  "result" : [
  ]
};

var MONGO_DYSPFZM_SCM_SPXX = {
		  "title" : "查找商品信息",
		  "DataBaseType" : "",
		  "collection" : "SCM_SPXX",
		  "page":"admin/scm/jcdy/search/MONGO_DYSPFZM.html",
		  "sort":{"jlbh":-1},
		  "queryField":{
				"query":{
					"enterQuery":true
				}
			},
		  "result" : [{
		      "id" : "SPXX01",
		      "name" : "商品内码",
		      "width" : 100,
		      "hidden":true
		    }, 
		    {
		      "id" : "SPBM",
		      "name" : "商品编码",
		      "width" : 150
		    } ,
		    {
			  "id" : "SPMC",
			  "name" : "商品名称",
			  "width" : 150
			} ,
		    {
				  "id" : "SPPP01",
				  "name" : "品牌代码",
				  "width" : 150,
			      "hidden":true
			} ,
			{
				  "id" : "SPPPMC",
				  "name" : "品牌名称",
				  "width" : 150
			} , 
			{
				  "id" : "SPFL",
				  "name" : "商品分类",
				  "width" : 150
			},
			{
				  "id" : "JLDW",
				  "name" : "计量单位",
				  "width" : 150
			},
			{
				  "id" : "SPGG",
				  "name" : "商品规格",
				  "width" : 150
			}
		  ]
};