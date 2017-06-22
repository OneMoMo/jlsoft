var MONGO_SZPZZL_SCM_SZPZZL = {
  "title" : "设置凭证种类",
  "DataBaseType" : "",
  "collection" : "SCM_SZPZZL",
  "page":"admin/scm/jcdy/search",
  "result" : []
};

var MONGO_SZPZZL_SCM_SZPZZL1 = {
		  "title" : "设置凭证种类",
		  "DataBaseType" : "",
		  "collection" : "SCM_SZPZZL",
		  "page":"admin/scm/jcdy/search",
		  "result" : []
		};

var MONGO_SZPZZL_SCM_SZPZZL2 = {
		  "title" : "设置凭证种类",
		  "DataBaseType" : "",
		  "collection" : "SCM_SZPZZL",
		  "page":"admin/scm/jcdy/search",
		  "result" : []
		};


var PUBCX_ZDR = {
    "title" : "查找制单人员",
    "page" : "admin/scm/jcdy/search/defineSZPZZL.html",
    "DataBaseType" : "scmform",
    "result" : [
                  {"id" : "BM",   "name" : "人员编码",     "width" : 100},
		          {"id" : "VALUE",   "name" : "人员名称",     "width" : 100}
		       ],
    "listener" : {
		  "loadRow" : function(thisPlugin, data, index, dl){
		  },
		  "rowclick" : function(thisPlugin, data, rowIndex, dl){
		  }
  }
};

var RYXX_WBZT01 = {
	    "title" : "查找外部账套",
	    "page" : "admin/scm/jcdy/search/defineSZPZZL.html",
	    "DataBaseType" : "scmform",
	    "result" : [
	                  {"id" : "KEY",   "name" : "账套编码",     "width" : 100},
			          {"id" : "VALUE",   "name" : "账套名称",     "width" : 100}
			       ],
	    "listener" : {
			  "loadRow" : function(thisPlugin, data, index, dl){
			  },
			  "rowclick" : function(thisPlugin, data, rowIndex, dl){
			  }
	  }
	};