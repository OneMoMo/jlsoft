var defineSHRY = JL.JLForm();
var transport = new JLTransport();

defineSHRY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar", 
		"buttons" : {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					console.info('after');
					var resultData = defineSHRY.query();
					
				    CDS = defineSHRY.getCds("CDS");
					CDS.edit();
					CDS.setData({"FWRY":resultData});
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
				"cds": "CDS", 
				"readonly": []
			}
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "FWRY.jlbh"
	},
	"FWRY01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.FWRY01"
	},
	"FWRY02" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.FWRY02",
		"format": {
	        "null": false,
		}
	},
	"SHLX" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
	    "cds-field": "FWRY.SHLX",
		"options": {"1":"送货"},
		"listener": {
			"click": function(data, checked, obj, thisPlugin){
				//alert("自己写");
				debugger;
				defineSHRY.getPluginObj('WLGS').setData({});
			/*	defineSHRY.getPluginObj('BYLX').setData({});*/
				if (thisPlugin.data.length == 1){
					defineSHRY.getTab().find("[name='a']").show();
					//defineSHRY.getTab().find("[name='b']").show();
					defineSHRY.getTab().find("[name='ssdq']").hide();
					defineSHRY.getTab().find("[name='jfb']").hide();
					defineSHRY.getTab().find("[name='tcf']").hide();
					defineSHRY.getTab().find("[name='tsf']").hide();
					defineSHRY.getTab().find("[name='tcfy']").hide();
					defineSHRY.getTab().find("[name='fdf']").hide();
					
					defineSHRY.getPluginObj('DQXX01').setData({});
					defineSHRY.getPluginObj('JSBZ').setData();
					defineSHRY.getPluginObj('TCF').setData();
					defineSHRY.getPluginObj('TSXHF').setData();
					defineSHRY.getPluginObj('YCF').setData();
					defineSHRY.getPluginObj('XHDF').setData();
				}
			}
		}
	},
	"BYLX" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
	    "cds-field": "FWRY.BYLX",
		"options": {"1":"搬运"},
		"listener": {
			"click": function(data, checked, obj, thisPlugin){
				//alert("自己写");
				debugger;
				defineSHRY.getPluginObj('WLGS').setData({});
			/*	defineSHRY.getPluginObj('SHLX').setData({});*/
				if (thisPlugin.data.length == 1){
					defineSHRY.getTab().find("[name='a']").show();
					defineSHRY.getTab().find("[name='b']").show();
					defineSHRY.getTab().find("[name='ssdq']").hide();
					defineSHRY.getTab().find("[name='jfb']").hide();
					defineSHRY.getTab().find("[name='tcf']").hide();
					defineSHRY.getTab().find("[name='tsf']").hide();
					defineSHRY.getTab().find("[name='tcfy']").hide();
					defineSHRY.getTab().find("[name='fdf']").hide();
					
					defineSHRY.getPluginObj('DQXX01').setData({});
					defineSHRY.getPluginObj('JSBZ').setData();
					defineSHRY.getPluginObj('TCF').setData();
					defineSHRY.getPluginObj('TSXHF').setData();
					defineSHRY.getPluginObj('YCF').setData();
					defineSHRY.getPluginObj('XHDF').setData();
				}
			}
		}
	},
	"WLGS" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
	    "cds-field": "FWRY.WLGS",
		"options": {"1":"物流公司"},
		"listener": {
			"click": function(data, checked, obj, thisPlugin){
				//alert("自己写");
				debugger;
				defineSHRY.getPluginObj('BYLX').setData({});
				defineSHRY.getPluginObj('SHLX').setData({});
				if (thisPlugin.data.length == 0){
					defineSHRY.getTab().find("[name='ssdq']").hide();
					defineSHRY.getTab().find("[name='jfb']").hide();
					defineSHRY.getTab().find("[name='tcf']").hide();
					defineSHRY.getTab().find("[name='tsf']").hide();
					defineSHRY.getTab().find("[name='tcfy']").hide();
					defineSHRY.getTab().find("[name='fdf']").hide();
					
					defineSHRY.getPluginObj('DQXX01').setData({});
					//defineSHRY.getPluginObj('YCFBZ').setData();
					defineSHRY.getPluginObj('TCF').setData();
					defineSHRY.getPluginObj('TSXHF').setData();
					defineSHRY.getPluginObj('YCF').setData();
					defineSHRY.getPluginObj('XHDF').setData();
				}else{
					defineSHRY.getTab().find("[name='a']").hide();
				//	defineSHRY.getTab().find("[name='b']").hide();
					
					defineSHRY.getTab().find("[name='ssdq']").show();
					defineSHRY.getTab().find("[name='jfb']").show();
					defineSHRY.getTab().find("[name='tcf']").show();
					defineSHRY.getTab().find("[name='tsf']").show();
					defineSHRY.getTab().find("[name='tcfy']").show();
					defineSHRY.getTab().find("[name='fdf']").show();
				}
			}
		}
	},
	"FWWD01" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWD.do", 
		"cds": "CDS",
	    "cds-field": "FWRY.FWWD01",
		"multi": false,
		"param" : {"WDLX":"0","CompanyID":userInfo.PCRM_GSXX01,"PersonID":userInfo.PCRM_CZY02},
		"placeholder": "请选择网点！", 
		"listener":{
			"click": function(){
				//alert("自己写");
			}
		}
	},
	"LXDH" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "FWRY.LXDH",
		"format": {
			"null": false,
			"number":true
		}
	},
	"SFZH" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.SFZH",
		"format": {
			"null": true
		}
	},
	"RYZT" : {/*人员状态(0 在职, 1, 请假, 2,辞职)*/
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "FWRY.RYZT",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"在职","1":"请假","2":"辞职"}
	},
	"JSBZ" : {/*人员状态(0 在职, 1, 请假, 2,辞职)*/
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "FWRY.JSBZ",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"按次","1":"按比例"}
	},
	"YXBJ" : {
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "FWRY.YXBJ",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"有效","1":"无效"}
	},
	"DQXX01" : {
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do",
		"cds": "CDS",
		"multi": false,
		"placeholder" : "请选择地区",
	    "cds-field": "FWRY.DQXX01",
	    "param" : {"DQXX03":"2"},
		"text": false
	},
//	"YCFBZ" : {
//		"jlid": "JLInput",
//		"cds": "CDS",
//		"cds-field": "FWRY.YCFBZ",
//		"placeholder" : "请填写0到1之间的小数！",
//		"format": { 
//			"number":true
//		}
//	},
	"TCF" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.TCF",
		"placeholder" : "请填写数字！",
		"format": { 
			"number":true
		}
	},
	"TSXHF" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.TSXHF",
		"placeholder" : "请填写0到1之间的小数！",
		"format": { 
			"number":true
		}
	},
	"YCF" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.YCF",
		"placeholder" : "请填写数字！",
		"format": { 
			"number":true
		}
	},
	"XHDF" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.XHDF",
		"placeholder" : "请填写数字！",
		"format": { 
			"number":true
		}
	},
	"FWRY" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS", 
		"paging" : "paging",
		"mode": "edit",
		"style" : "jl_list_03",
        "multi": false,
        "buttons": {
			"jlNew": {
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						defineSHRY.getTab().find("[name='ssdq']").hide();
						defineSHRY.getTab().find("[name='jfb']").hide();
						defineSHRY.getTab().find("[name='tcf']").hide();
						defineSHRY.getTab().find("[name='tsf']").hide();
						defineSHRY.getTab().find("[name='tcfy']").hide();
						defineSHRY.getTab().find("[name='fdf']").hide();
						
						defineSHRY.getPluginObj('DQXX01').setData({});
						//defineSHRY.getPluginObj('YCFBZ').setData();
						defineSHRY.getPluginObj('TCF').setData();
						defineSHRY.getPluginObj('TSXHF').setData();
						defineSHRY.getPluginObj('YCF').setData();
						defineSHRY.getPluginObj('XHDF').setData();
					}
				}
			}
	    },
		"title" : [  
		           {"id":"FWRY01", "name":"人员编码", "width":"w01"},
		           {"id":"FWRY02", "name":"人员名称", "width":"w02"},
		           {"id":"FWWD01", "name":"网点", "width":"w02"},
		           {"id":"LXDH", "name":"手机号码", "width":"w02"},
		           {"id":"SHLX", "name":"送货", "width":"w01"}, 
		           {"id":"BYLX", "name":"搬运", "width":"w01"}, 
		           {"id":"WLLX", "name":"物流公司", "width":"w01"}, 
		           {"id":"RYZT", "name":"人员状态", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		          ], 
        "header" :[
                   {"id":"jlbh", "name":"jlbh","hidden":true},   
                   {"id":"SFZH", "name":"SFZH","hidden":true}, 
				   {"id":"FWRY01", "groupid":"FWRY01", "rowindex":1, "title":"人员编码"},
                   {"id":"FWRY02", "groupid":"FWRY02", "rowindex":1, "title":"人员名称"},
                   {"id":"FWWD01", "groupid":"FWWD01", "rowindex":1,"title":"网点"},
                   {"id":"LXDH", "groupid":"LXDH","rowindex":1, "title":"手机号码"}, 
                   {"id":"SHLX",  "groupid":"SHLX", "title":"送货标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
          		     "config":{
	          		    	       "jlid": "JLCheckbox",
	          		    	       "options": {"1":"送货"},
	          		    	       "listener": {
	          		    			      "checked":function(data, checked, arr){
		          		    			    	  if(checked){
		          		    			    		  data.key = 1;
		          		    			    	  }else{
		          		    			    		  data.key = 0;
		          		    			    	  }
	          		    			       }
	          		    		   }
          		             }
          		   },
          		   {"id":"BYLX",  "groupid":"BYLX", "title":"搬运标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
            		     "config":{
	            		    	       "jlid": "JLCheckbox",
	            		    	       "options": {"1":"搬运"},
	            		    	       "listener": {
	            		    			      "checked":function(data, checked, arr){
		            		    			    	  if(checked){
		            		    			    		  data.key = 1;
		            		    			    	  }else{
		            		    			    		  data.key = 0;
		            		    			    	  }
	            		    			       }
	            		    		   }
            		             }
            	   },
            	   {"id":"WLGS",  "groupid":"WLLX", "title":"物流公司标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
          		     "config":{
	          		    	       "jlid": "JLCheckbox",
	          		    	       "options": {"1":"物流公司"},
	          		    	       "listener": {
	          		    			      "checked":function(data, checked, arr){
		          		    			    	  if(checked){
		          		    			    		  data.key = 1;
		          		    			    	  }else{
		          		    			    		  data.key = 0;
		          		    			    	  }
	          		    			       }
	          		    		   }
          		             }
            	   },
                   {"id":"RYZT", "groupid":"RYZT","rowindex":1, "title":"人员状态"}, 
                   {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
	  	            	 "config":{
	  		            	 "readonly": ["FWRY01"]
	  		             },
	  		             "listener":{
	  		        		 "click": function(data, rowIndex, obj, plugin){
	  		        			 console.info(data);
	  		        			 if (JL.isNull(data.data[rowIndex].WLGS)){
	  		        				defineSHRY.getTab().find("[name='a']").show();
	  		        			//	defineSHRY.getTab().find("[name='b']").show();
	  		        				defineSHRY.getTab().find("[name='ssdq']").hide();
	  								//.getTab().find("[name='jfb']").hide();
	  								defineSHRY.getTab().find("[name='tcf']").hide();
	  								defineSHRY.getTab().find("[name='tsf']").hide();
	  								defineSHRY.getTab().find("[name='tcfy']").hide();
	  								defineSHRY.getTab().find("[name='fdf']").hide();
	  								
	  								defineSHRY.getPluginObj('DQXX01').setData({});
	  								defineSHRY.getPluginObj('JSBZ').setData();
	  								defineSHRY.getPluginObj('TCF').setData();
	  								defineSHRY.getPluginObj('TSXHF').setData();
	  								defineSHRY.getPluginObj('YCF').setData();
	  								defineSHRY.getPluginObj('XHDF').setData();
	  		        			 }else{
	  		        				defineSHRY.getTab().find("[name='a']").hide();
	  		  		   			  //  defineSHRY.getTab().find("[name='b']").hide();
	  		        				defineSHRY.getTab().find("[name='ssdq']").show();
	  								//defineSHRY.getTab().find("[name='jfb']").show();
	  								defineSHRY.getTab().find("[name='tcf']").show();
	  								defineSHRY.getTab().find("[name='tsf']").show();
	  								defineSHRY.getTab().find("[name='tcfy']").show();
	  								defineSHRY.getTab().find("[name='fdf']").show();
	  		        			 }
	  		        		 }
	  		        	 }
	  	           }/*,
	  	           {"id":"delete", "groupid":"CZ", "title":"删除", "editor":"JLEdit","rowindex":1,
	  		             "listener":{
	  		        		 "click": function(data, rowIndex, obj, plugin){
	  	            			 var XmlData = data;
	  	            			 XmlData["S_VALUE"]= "D1"; 
	  	            			// XmlData["YXBJ"] = {"key":"1", "value":"无效"};
	  	            			 var ajaxJson = {};
	  	            			 ajaxJson["src"] = "form/saveRecord.do";
	  	            			 ajaxJson["data"] = {"jyl":true,"json":JSON.stringify(XmlData)};
	  	            			 var resultData = JL.ajax(ajaxJson);
	  	            			 console.info(resultData);
	  	            			 if(!JL.isNull(resultData)){
	  	            				 plugin.removeRow(rowIndex);
	  	            			 }
	  		        		 }
	  		        	 }
	  	           }*/
                  ],
          		"listener":{
        			"loadRow": function(thisPlugin, data, rowIndex, dl){
        			}
        		}
	}
});

defineSHRY.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		console.info('search');
		var resultData = defineSHRY.query();
		
	    CDS = defineSHRY.getCds("CDS");
		CDS.edit();
		CDS.setData({"FWRY":resultData});
		CDS.post();
	}
}]);

defineSHRY.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = defineSHRY.getCds("CDS"); 
	  
	//加载Grid数据事件
	console.info('setAfterInit');
	var query={};
	var search = defineSHRY.getTab().find("[name='CXTJ']").val();
	  
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	//queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineSHRY.getSqlResult(query, "MONGO_SHRY", "CSS_SHRY", "admin/scm/fwgl/search");
	console.info(resultData.data);
	
	//加载工作流步骤-Grid数据事件   
	CDS.edit();
	CDS.setData({"FWRY":resultData.data}); 
	CDS.post();
	
	defineSHRY.getTab().find("[name='ssdq']").hide();
	defineSHRY.getTab().find("[name='jfb']").hide();
	defineSHRY.getTab().find("[name='tcf']").hide();
	defineSHRY.getTab().find("[name='tsf']").hide();
	defineSHRY.getTab().find("[name='tcfy']").hide();
	defineSHRY.getTab().find("[name='fdf']").hide();
});

defineSHRY.query = function() {
	var query={};
	var search = defineSHRY.getTab().find("[name='CXTJ']").val();
	  
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	var resultData = defineSHRY.getSqlResult(query, "MONGO_SHRY", "CSS_SHRY", "admin/scm/fwgl/search");
	return resultData.data;
};

