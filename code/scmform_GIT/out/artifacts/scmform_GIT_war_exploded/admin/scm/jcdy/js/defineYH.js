/**
 * @author 周泽
 * 2016-7-23 10:40:42
 */
var defineYH = JL.JLForm();
var transport = new JLTransport();
defineYH.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					defineYH.query();
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
	
	
	"YHBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YHBM",	
		 "format":{},
		 "readonly":true 
	},
	
	"YHMC" : {
		    "jlid": "JLInput",
			"cds":"CDS",
			"cds-field":"LIST.YHMC",
			"format":{}
	},
	
	"YHSXF" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YHSXF",
		/* "placeholder": "请输入0-1的数字",*/
		 "format":{}
	},
	"KMDM":{
		"jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.KMDM",
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
		           {"id":"BM", "name":"银行编码", "width":"w02"},
		           {"id":"MC", "name":"银行名称", "width":"w03"},
		           {"id":"FL", "name":"手续费率", "width":"w02"},
		           /*{"id":"KM", "name":"科目代码", "width":"w02"},*/
		           {"id":"YX", "name":"有效", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w02"}
		           ],
		    "header" : [
			 {"id":"jlbh", "hidden":true},
			 {"id":"YXBJ01", "hidden":true}, 
			 {"id":"YHBM",  "groupid":"BM", "title":"银行编码"},
		     {"id":"YHMC",  "groupid":"MC", "title":"银行名称"}, 
		     {"id":"YHSXF", "groupid":"FL", "title":"手续费率％"},
		    /* {"id":"KMDM", "groupid":"KM", "title":"科目代码"},*/
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
	            	 "readonly": ["YHBM"]
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

defineYH.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(data){
		defineYH.query(); 
	}
}]);

defineYH.setAfterInit(function() {
	//加载Grid数据事件
	defineYH.query();
});

defineYH.query = function() {
	var query={};
	var search = defineYH.getTab().find("[name='CXTJ']").val();
	
	if(!JL.isNull(search)){
		query["CXTJ"] = search;
	}
	var resultData = defineYH.getSqlResult(query, "MONGO_YH", "SCM_YH", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineYH.getPluginObj("LIST").setPaging(resultData.fileName);
};
