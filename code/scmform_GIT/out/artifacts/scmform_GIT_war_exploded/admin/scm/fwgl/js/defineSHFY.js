/**
 * @author 周泽
 * 2016-8-3 16:41:24
 */
var defineSHFY = JL.JLForm();

defineSHFY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					var resultData = defineSHFY.query();
					
				    CDS = defineSHFY.getCds("CDS");
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
		           {"id":"BM", "name":"费用编码", "width":"w02"},
		           {"id":"MC", "name":"费用名称", "width":"w03"},
		           {"id":"DX", "name":"结算对象", "width":"w03"},
		           {"id":"YX", "name":"有效", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w02"}
		           ],
		    "header" : [
			 {"id":"bdbh", "hidden":true},
			 {"id":"jlbh", "hidden":true},
			 {"id":"JSDXBH", "hidden":true},
			 {"id":"FWLXBH", "hidden":true},
			 {"id":"FYBM01","groupid":"BM", "title":"编码"},
		     {"id":"FYMC",  "groupid":"MC", "title":"费用名称"}, 
		     {"id":"JSDX",  "groupid":"DX", "title":"结算对象"},
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

defineSHFY.setAfterInit(function() {
	//加载Grid数据事件
	var queryField = {};
	var resultData = defineSHFY.getSqlResult(queryField, "MONGO_SHFY", "CSS_SHFY", "admin/scm/fwgl/search");
	console.info(resultData);
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	//defineSHFY.getPluginObj("LIST").setData(resultData.data);
	//defineSHFY.getPluginObj("LIST").setPaging(resultData.fileName); 
	CDS.post();
});

defineSHFY.query = function() {
	var query={};
	var search = defineSHFY.getTab().find("[name='FWFY']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	var resultData = defineSHFY.getSqlResult(query, "MONGO_SHFY", "CSS_SHFY", "admin/scm/fwgl/search");
	return resultData.data;
};

