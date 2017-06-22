/**
 * @author 周泽
 * 2016-7-26 15:24:29
 */
var defineFWFY = JL.JLForm();
var transport = new JLTransport();
defineFWFY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					var resultData = defineFWFY.query();
					
				    CDS = defineFWFY.getCds("CDS");
					CDS.edit();
					CDS.setData({"LIST":resultData});
					CDS.post();
					
				}
			},
			"jlCancelSlide":{}
			/*"jlEmptyCard":{}*/
		}
	},    
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",	
		 "format":{}
	},
	"JSDXBH" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.JSDXBH",	
		 "format":{}
	},
	"FWLXBH" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FWLXBH",	
		 "format":{}
	},
	"FYBM01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYBM01",	
		 "format":{}
	},
	"FYMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYMC",	
		 "format":{}
	},
	"FWLX" : {
		"jlid": "JLMultiSelect",
		"cds":"CDS",
		"cds-field":"LIST.FWLX",
    	"placeholder" : "选择服务类型",
    	"sqlid": "FWXX.FWLX",
    	"resource": "scmform",
	},
	"JSDX" : {
		 "jlid": "JLMultiSelect",
		 "cds":"CDS",
		 "cds-field":"LIST.JSDX",	
		 "options" : {"0":"人员","1":"网点"} 
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
		           {"id":"BM", "name":"费用编码", "width":"w01"},
		           {"id":"MC", "name":"费用名称", "width":"w02"},
		           {"id":"DX", "name":"结算对象", "width":"w02"},
		           {"id":"LX", "name":"服务类型", "width":"w04"},
		           {"id":"YX", "name":"有效", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w02"}
		           ],
		    "header" : [
			 {"id":"jlbh", "hidden":true},
			 {"id":"FWLXBH", "hidden":true},
			 {"id":"JSDXBH", "hidden":true},
			 {"id":"FYBM01", "groupid":"BM", "title":"编码"},
		     {"id":"FYMC",   "groupid":"MC", "title":"费用名称"}, 
		     {"id":"JSDX",   "groupid":"DX", "title":"结算对象"},
		     {"id":"FWLX",   "groupid":"LX", "title":"服务类型"},
		     {"id":"YXBJ",  "groupid":"YX", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
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
	            	 "readonly": ["FYBM01"]
	             },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 console.info(data);
	        		 }
	        	 }
           }
		   ]
	    }
	});

defineFWFY.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		console.info('search');
		var resultData = defineFWFY.query();
		
	    CDS = defineFWFY.getCds("CDS");
		CDS.edit();
		CDS.setData({"LIST":resultData});
		CDS.post();
	}
}]);

defineFWFY.setAfterInit(function() {
	//加载Grid数据事件
	var queryField = {};
	var resultData = defineFWFY.getSqlResult(queryField, "MONGO_FWFY", "CSS_FWFY", "admin/scm/fwgl/search");
	console.info(resultData);
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	defineFWFY.getPluginObj("LIST").setPaging(resultData.fileName); 
	CDS.post();
});

defineFWFY.query = function() {
	var query={};
	var search = defineFWFY.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	var resultData = defineFWFY.getSqlResult(query, "MONGO_FWFY", "CSS_FWFY", "admin/scm/fwgl/search");
	return resultData.data;
};
