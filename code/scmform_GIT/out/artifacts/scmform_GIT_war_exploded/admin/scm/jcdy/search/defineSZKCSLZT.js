var defineSZKCSLZT_SCM_SZKCSLZT = {
  "title" : "查找定义限额商品",
  "page" : "admin/scm/jcdy/search/defineSZKCSLZT.html",
  "DataBaseType" : "scmform",
  "result" : [
              {"id" : "SPXX01",   "name" : "商品内码",     "width" : 100,"hidden":true},
              {"id" : "SPXX02",   "name" : "商品编码",     "width" : 100},
              {"id" : "SPMC",   "name" : "商品名称",     "width" : 150},
              {"id" : "SLKC",   "name" : "少量库存",     "width" : 120},
              {"id" : "CZKC",   "name" : "充足库存",     "width" : 120},
             
            ],
  "listener" : {
	"loadRow" : function(thisPlugin, data, index, dl){
  },
  "rowclick" : function(thisPlugin, data, rowIndex, dl){
		
	}
  }
};

var defineSZKCSLZT_SPXX = {
		 "title" : "查找商品",
		  "page" : "admin/scm/jcdy/search",
		  "DataBaseType" : "scmform",
		  "result" : [
		              {"id" : "SPNM",   "name" : "商品内码",     "width" : 100,"hidden":true},
		              {"id" : "SPBM",   "name" : "商品编码",     "width" : 100},
		              {"id" : "SPMC",   "name" : "商品名称",     "width" : 150},
		   ],
};

