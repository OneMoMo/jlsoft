/**
 * @author 周泽
 * 2016-7-25 10:35:25
 */
var defineYHZH = JL.JLForm();
var transport = new JLTransport();
defineYHZH.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					defineYHZH.query();
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
	
	"KMDM":{
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.KMDM",
		"format":{}
	},
	
	"GSXX01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.GSXX01",	
		 "format":{},
		 
	},
	
	"YHZH" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YHZH",	
		 "format":{},
		 "readonly":true 
	},
	
	"YHMC" : {
		    "jlid": "JLSelect",
			"cds":"CDS",
			"cds-field":"LIST.YHMC",
	    	"placeholder" : "选择银行名称",
	    	"sqlid": "SKFS.YHXX",
	    	"resource": "scmform"
	},
	
	"YHZHMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YHZHMC",	
		 "format":{}
	},
	
	"YHZH02" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YHZH02",
		 "placeholder": "请输入小于三十位长度编码(数字或字母)",
		 "format":{}
	},
	
	"BMMC" : {
		"jlid": "JLSelect",
		"cds":"CDS",
		"cds-field":"LIST.BMMC",
    	"placeholder" : "选择所属部门",
    	"sqlid": "PUBCX.SYBM",
    	"resource": "scmform"
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
		           {"id":"DM",   "name":"编码", "width":"w01"},
		           {"id":"MC",   "name":"银行名称", "width":"w02"},
		           {"id":"ZHMC", "name":"支行名称", "width":"w02"},
		           {"id":"ZH",   "name":"银行账号", "width":"w02"},
		           {"id":"BM",   "name":"所属部门", "width":"w02"},
		           {"id":"KM",   "name":"科目代码", "width":"w01"},
		           {"id":"YX",   "name":"有效", "width":"w01"},
		           {"id":"CZ",   "name":"操作", "width":"w01"}
		           ],
		    "header" : [
			 {"id":"jlbh", "hidden":true},
			 {"id":"GSXX01", "hidden":true},
			 {"id":"YHZH",  "groupid":"DM", "title":"编码"},
			 /*{"id":"YHBM",  "groupid":"MC", "title":"银行编码", "hidden":true},*/       
		     {"id":"YHMC",  "groupid":"MC", "title":"银行名称"},
			 {"id":"YHZHMC","groupid":"ZHMC", "title":"支行名称"},
		     {"id":"YHZH02","groupid":"ZH", "title":"银行账号"},
		     {"id":"BMMC",  "groupid":"BM", "title":"所属部门"}, 
		     {"id":"KMDM", "groupid":"KM", "title":"科目代码"},
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
	            	 "readonly": ["YHZHBM"]
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

defineYHZH.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineYHZH.query();
	}
}]);

defineYHZH.setAfterInit(function() {
	//加载Grid数据事件
	defineYHZH.query();
});

defineYHZH.query = function() {
	var query={"GSXX01":userInfo["PCRM_GSXX01"]};
	var search = defineYHZH.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	var resultData = defineYHZH.getSqlResult(query, "MONGO_YHZH", "SCM_YHZH", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineYHZH.getPluginObj("LIST").setPaging(resultData.fileName);
};
