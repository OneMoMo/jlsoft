var defineFWWD = JL.JLForm();
var transport = new JLTransport();

defineFWWD.setPlugin({
	"footer" : {
		"jlid": "JLToolBar", 
		"buttons" : {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					console.info('after');
					var resultData = defineFWWD.query();
					
				    CDS = defineFWWD.getCds("CDS");
					CDS.edit();
					CDS.setData({"FWWD":resultData});
					CDS.post();
				}
			},
			"jlCancelSlide":{}
		}
	},
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewCard": {
				"readonly": []
			}
		}
	},
	"FWWD01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"readonly": true,
		"cds-field": "FWWD.FWWD01"
	},
	"FWWD02" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWWD.FWWD02"
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "FWWD.jlbh"
	},
	"WDLX" : {/*人员类型（0：送货，1：服务）*/ 
		"jlid": "JLSelect", 
		"cds": "CDS",
		"cds-field": "FWWD.WDLX",
		"placeholder" : "请选择",
		"default": "1", 
		"options": {"0":"送货","1":"服务"}
	},
	"FZR" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWWD.FZR"
	},
	"YXBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "FWWD.YXBJ",
		"default" : "1",
		"options": {"1":"有效"},
		"listener": { 
	    }
	},
	"WDSX" : {/*自建网点、三方网点、厂家网点*/
		"jlid": "JLSelect", 
		"cds": "CDS",
		"cds-field": "FWWD.WDSX",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"自建网点","1":"三方网点","2":"厂家网点"}
	},
	"SSDQ" : {		
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do",
		"cds": "CDS",
	    "cds-field": "FWWD.SSDQ",
	   // "multi": true,
		"text": false
	},
	"DQXX01" : {
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do",
		"cds": "CDS",
		"multi": true,
	    "cds-field": "FWWD.DQXX01",
		"text": false 
	},
	"CK01" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectCK.do", 
		"cds": "CDS",
	    "cds-field": "FWWD.CK01",
		"param" : {"DQXX04":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
		/*"jlid" : "JLMultiSelect",
		"cds": "CDS",
	    "cds-field": "FWWD.CK01",
	    "placeholder": "请选择！",  
		"sqlid": "CK.MJCK",
		"resource": "scmform"*/
	},
	"PPB01" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectPPB.do",  
		"cds": "CDS",
	    "cds-field": "FWWD.PPB01",
		"param" : {},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"SPFL01" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectSPFL.do", 
		"cds": "CDS",
	    "cds-field": "FWWD.SPFL01",
	    "param" : {"DLBJ":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				//alert("自己写");
			}
		}
	},
	"SFWSD" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWWD.SFWSD",
		"default": "10",
		"format": {
			"null": false,
			"number":true
		}
	},
	"SFWSL" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWWD.SFWSL",
		"format": { 
			"number":true
		}
	},
	"XFWSD" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWWD.XFWSD",
		"default": "15",
		"format": {
			"null": false,
			"number":true
		}
	},
	"XFWSL" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWWD.XFWSL",
		"format": { 
			"number":true
		}
	},
	"GSXX01" : {
		"jlid": "JLSelect",
		  "cds": "CDS", 
		  "cds-field": "FWWD.GSXX01",
		  "sqlid":"JCDY.JTXX",
		  "resource": "scmform",
		  "listener": { 
			  "change": function(data){
			  }
		  }
	},
	"FWWD" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",  
		"style" : "jl_list_03",
        "paging": "more",
		"multi":false,
		"mode": "edit",
		"buttons": {
			"jlNew": {}
	    },
		"title" : [   
		           {"id":"FWWD01", "name":"网点编码", "width":"w02"},  
		           {"id":"FWWD02", "name":"网点名称", "width":"w02"},  
		           {"id":"WDSX", "name":"网点属性", "width":"w02"}, 
		           {"id":"SSDQ", "name":"所在地区", "width":"w02"},
		           {"id":"FZR", "name":"负责人", "width":"w02"},
		           {"id":"YXBJ", "name":"有效标记", "width":"w01"}
		          ], 
        "header" :[
				   {"id":"WDLX",  "title":"网点类型","hidden":true}, 
				   {"id":"SFWSD",  "title":"上午","hidden":true}, 
				   {"id":"SFWSL",  "title":"服务量","hidden":true}, 
				   {"id":"XFWSD",  "title":"下午","hidden":true}, 
				   {"id":"XFWSL",  "title":"服务量","hidden":true}, 
				   {"id":"PPB01",  "title":"负责品牌","hidden":true}, 
				   {"id":"SPFL01",  "title":"负责分类","hidden":true}, 
				   {"id":"CK01",  "title":"负责仓库","hidden":true}, 
				   {"id":"DQXX01",  "title":"负责区域","hidden":true},  
				   {"id":"GSXX01",  "title":"GSXX01","hidden":true},  
				   {"id":"FWWD01", "groupid":"FWWD01", "rowindex":1, "title":"网点编码"},
                   {"id":"FWWD02", "groupid":"FWWD02", "rowindex":1, "title":"网点名称"},
                   {"id":"WDSX", "groupid":"WDSX","rowindex":1, "title":"网点属性"},  
                   {"id":"SSDQ", "groupid":"SSDQ","rowindex":1, "title":"所在地区"}, 
                   {"id":"FZR", "groupid":"FZR","rowindex":1, "title":"负责人"}, 
                   {"id":"YXBJ",  "groupid":"YXBJ", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
            		     "config":{
            		    	       "jlid": "JLCheckbox",
            		    	       "options": {"1":"有效"},
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
	  		            	 "readonly": ["FWWD01","WDLX"]
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

defineFWWD.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		console.info('search');
		var resultData = defineFWWD.query();
		
	    CDS = defineFWWD.getCds("CDS");
		CDS.edit();
		CDS.setData({"FWWD":resultData});
		CDS.post();
	}
}])

defineFWWD.setAfterInit(function() {
	JL.tab(defineFWWD, {
		"JCXX": "基础信息",
		"FWSZ": "服务设置",
		"FWLSZ": "服务量设置"
	});
	
	//打开界面时加载当前登录人信息
	CDS = defineFWWD.getCds("CDS"); 
	  
	//加载Grid数据事件
	console.info('setAfterInit');
	var query = {};
	var queryField={};
	//queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineFWWD.getSqlResult(queryField, "MONGO_FWWD", "CSS_FWWD", "admin/scm/fwgl/search");
	console.info(resultData.data);
	
	//加载工作流步骤-Grid数据事件   
	CDS.edit();
	CDS.setData({"FWWD":resultData.data}); 
	CDS.post();
	defineFWWD.getPluginObj("FWWD").setPaging(resultData.fileName); 
});

defineFWWD.query = function() {
	var query={};
	var search = defineFWWD.getTab().find("[name='CXTJ']").val();
	  
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	var resultData = defineFWWD.getSqlResult(query, "MONGO_FWWD", "CSS_FWWD", "admin/scm/fwgl/search");
	return resultData.data;
};
