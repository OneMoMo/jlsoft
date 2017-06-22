var MONGO_JK_FORM_JK = {
  "title" : "查找接口",
  "DataBaseType" : "",
  "collection" : "FORM_JK",
  "page":"admin/scm/jcdy/search",
  "result" : []
};

var MONGO_JK1_SCM_JK = {
    "title" : "查找接口类型",
    "page" : "admin/scm/jcdy/search/defineJK.html",
    "DataBaseType" : "scmform",
    "result" : [
		          {"id" : "JKLX01",   "name" : "接口代码",     "width" : 100,"hidden":true},
		          {"id" : "JKLX02",   "name" : "接口名称",     "width" : 300}
		       ],
    "listener" : {
		  "loadRow" : function(thisPlugin, data, index, dl){
		  },
		  "rowclick" : function(thisPlugin, data, rowIndex, dl){
		  }
  }
}; 