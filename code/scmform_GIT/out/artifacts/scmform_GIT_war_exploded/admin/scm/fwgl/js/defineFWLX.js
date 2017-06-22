/**
 * @author 周泽
 * 2016-8-3 18:05:13
 */

var defineFWLX = JL.JLForm();
defineFWLX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					defineFWLX.query();
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
	"YXBJ01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YXBJ01",	
		 "format":{}
	},
	"FWLX01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FWLX01",	
		 "format":{},
		 "readonly":true 
	},
	"FWLX" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FWLX",	
		 "format":{}
	},
	"YXBJ" : {
		"jlid": "JLCheckbox", 
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
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
		           {"id":"BM", "name":"服务类型编码", "width":"w04"},
		           {"id":"LX", "name":"服务类型", "width":"w04"},
		           {"id":"XT", "name":"系统标记", "width":"w01"},
		           {"id":"YX", "name":"有效", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w01 "}
		           ],
		    "header" : [
			 {"id":"bdbh", "hidden":true},
			 {"id":"jlbh", "hidden":true},  
			 {"id":"YXBJ01", "hidden":true},  
			 {"id":"FWLX01","groupid":"BM", "title":"服务类型编码"},
		     {"id":"FWLX",  "groupid":"LX", "title":"服务类型"}, 
				     {"id":"XTGY", "groupid":"XT", "title":"系统标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
					    	"config":{
					    		"jlid": "JLCheckbox",
					    		"options": {"1":""}
					    	}
					 }, 
		     {"id":"YXBJ",  "groupid":"YX", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
		    	 "config":{
		    	       "jlid": "JLCheckbox",
					    		"options": {"1":""}
		             }
		     },
		     {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
            	 "config":{
	            	 "readonly": ["FWLX01"]
	             },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 console.info(data);
	        		 }
	        	 }
              },
		              {"id":"delete", "groupid":"CZ", "title":"删除", "css":"fr", "editor":"link","rowindex":1,
  				"listener":{
  					"click": function(thisPlugin, rowIndex, obj){
  						debugger;
  						var data = thisPlugin.getData(rowIndex);
  						JL.confirm("是否确认删除?", function(){
  							data["S_VALUE"] = "D1";
  							JL.saveForm(defineFWLX, data, "删除", {
  								"disabled": false,
  								"success":function(){
  									thisPlugin.removeRow(rowIndex);
  								}
  							});
  						});
  					}
  				}
		  			  }
		     ],
		     "listener": {
		        	"loadRow": function(thisPlugin, data, rowIndex, dl){
		        		debugger;
		        		if(data.XTGY.key != 0){
		        			dl.find("dd[groupid='CZ']").hide();
		        		}
		        	}
		     }
	    }
	});

defineFWLX.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineFWLX.query();
	}
}]);

defineFWLX.setAfterInit(function() {
	debugger;
	defineFWLX.query();
});

defineFWLX.query = function() {
	debugger;
	var query={};
	query["S_VALUE"] = {"$ne":"D1"};
	var search = defineFWLX.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	var LIST = [];
	var resultData = JL.ajax({
		"src": pubJson.getURL("FormUrl") + "/DefineFWLX/getFWLX.do",
		"data": {"XmlData":JSON.stringify(query)},
	});
	if(!JL.isNull(resultData) && !JL.isNull(resultData.data) && !JL.isNull(resultData.data.returnList)){
		$.merge(LIST, resultData.data.returnList);
	}
	
	var resultData = defineFWLX.getSqlResult(query, "MONGO_FWLX", "CSS_FWLX", "admin/scm/fwgl/search");
	console.info(resultData);
	if(!JL.isNull(resultData) && !JL.isNull(resultData.data)){
		$.merge(LIST, resultData.data);
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":LIST}); 
	CDS.post();
	defineFWLX.getPluginObj("LIST").setPaging(resultData.fileName);
};

