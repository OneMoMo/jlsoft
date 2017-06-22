/**
 * @author :周泽
 * 最后一次修改时间:2016-9-6 14:33:11
 * 类名:定义采购方式
 */
var defineDYCGFS = JL.JLForm();
defineDYCGFS.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					defineDYCGFS.query();
				}
			},
			"jlCancelSlide":{}
		}
	},
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",	
		 "format":{}
	},
	"YXBJ" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YXBJ",	
		 "format":{}
	},
	"CGFS01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CGFS01",	
		 "format":{},
		 "readonly":true 
	},
	"CGFSMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CGFSMC",	
		 "format":{}
	},
	"YXBJ01" : {
		"jlid": "JLCheckbox", 
		"cds": "CDS",
		"cds-field": "LIST.YXBJ01",
		"placeholder" : "请选择",
		"default": "1", 
		"options": {"1":"有效"}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS", 
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"buttons": {
			"jlNew": {}
	    },
		"title" : [
		           {"id":"BM", "name":"采购方式编码", "width":"w04"},
		           {"id":"MC", "name":"采购方式名称", "width":"w04"},
		           {"id":"YX", "name":"有效", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		           ],
		    "header" : [
			 {"id":"bdbh",  "hidden":true},
			 {"id":"jlbh",  "hidden":true},  
			 {"id":"YXBJ","hidden":true},
			 {"id":"CGFS01","groupid":"BM", "title":"采购方式编码"},
		     {"id":"CGFSMC","groupid":"MC", "title":"采购方式名称"}, 
		     {"id":"YXBJ01",  "groupid":"YX", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
		    	 "config":{
		    	       "jlid": "JLCheckbox",
		    	       "options": {"1":""},
		    	       "listener": {
		    			      "checked":function(data, checked, arr){
		    			    	  if(checked){
		    			    		  data.key = 1;
		    			    		  data.value ="有效";
		    			    	  }else{
		    			    		  data.key = 0;
		    			    		  data.value ="无效";
		    			    	  }
		    			       }
		    		   }
		             }
		     },
		     {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
            	 "config":{
	            	 "readonly": ["CGFS01"]
	             },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 console.info(data);
	        		 }
	        	 }
              },
                {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"fr", "editor":"link",
  				"listener":{
  					"click": function(thisPlugin, rowIndex, obj){
  						debugger;
  						var data = thisPlugin.getData(rowIndex);
  						JL.confirm("是否确认删除?", function(){
  							data["S_VALUE"] = "D1";
  							JL.saveForm(defineDYCGFS, data, "删除", {
  								"disabled": false,
  								"success":function(){
  									thisPlugin.removeRow(rowIndex);
  								}
  							});
  						});
  					}
  				}
  			},
		     ]
	    }
	});

defineDYCGFS.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineDYCGFS.query();
	}
}]);

defineDYCGFS.setAfterInit(function() {
	defineDYCGFS.query();
});

defineDYCGFS.query = function() {
	debugger;
	var query={};
	query["S_VALUE"] = {"$ne":"D1"};
	var search = defineDYCGFS.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	var resultData = defineDYCGFS.getSqlResult(query, "MONGO_DYCGFS", "SCM_DYCGFS", "admin/scm/jcdy/search");
	console.info(resultData);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineDYCGFS.getPluginObj("LIST").setPaging(resultData.fileName);
};

