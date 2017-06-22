var defineXSFS = JL.JLForm();

defineXSFS.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					console.info('success');
					defineXSFS.query();
				}
			},
			"jlCancelSlide" : {}	
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh",
		
	},
	"XJKZ":{
		"jlid" : "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.XJKZ",
		"options":{
			"0":"控制单品限价",
			"1":"控制整单限价"
		}
	},
	"XSLX":{
		"jlid" : "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.XSLX",
		"options":{
			"3":"零售",
			"4":"分销"
		}
	},
	"YHBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.YHBJ", 
		"default" : "1",
		"options": {"1":"优惠"},
		"listener": { 
	    }
	},
	"YXBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
		"default" : "1",
		"options": {"1":"有效"},
		"listener": { 
	    }
	},
	"XSDM" : {
		"jlid": "JLInput", 
		"cds":"CDS",
		"cds-field":"LIST.XSDM",
		"placeholder": "请输入数字或字符",
		"format": {}
	},
	"XSFS" : {
		"jlid": "JLInput", 
		"cds":"CDS",
		"cds-field":"LIST.XSFS",
		"format": {}
	},
	"SYSZ" : {
		"jlid" : "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.SYSZ",
		"options" : {
			"0" : "会员销售",
			"1" : "显示会员单位信息",
			"2" : "不用延付结算",
			"3" : "调拨使用",
			"4" : "按保证金金额控制销售开单"
		},
		"YXBJ":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.YXBJ",
		 "options":{"1":"有效"},
		 "default" : "1",
		 "listener": {
			 "click":function(data){
				 
			 }
			 
		 }
	 },	
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging" : "paging",
		"cds" : "CDS",
		"paging": "more", 
		"multi":false,     //可以多选
		"mode": "edit",
		"buttons" : {
			"jlNew":{}
		},
		"title" : [
		           {"id" : "XSDM","name" : "销售代码",	"width" : "w03"}, 
		           {"id" : "XSFS","name" : "销售方式",	"width" : "w03"}, 
		           {"id" : "XSLX","name" : "销售类型",	"width" : "w02"},
		           {"id" : "YXBJ","name" : "有效标记",	"width" : "w02"}, 
		           {"id" : "CZ","name" : "操作","width" : "w02"}
		],
		"header" : [
		            {"id" : "jlbh", "title":"jlbh", "hidden":true},
		            {"id" : "YXBJ", "title":"有效标记", "hidden":true},
		            {"id" : "XSDM", "groupid" : "XSDM","title" : "销售代码"}, 
		            {"id" : "XSFS", "groupid" : "XSFS","title" : "销售方式"}, 
		            {"id" : "XSLX", "groupid" : "XSLX","title" : "销售类型"}, 
		            {"id" : "edit", "groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		            	"config":{
							  "readonly": ["XSDM"],
					          "mapping":{}
						},
						"listener" : {
							"click" : function () { 
							}
						}
		            }, 
		            /*{"id" : "delete","groupid" : "CZ","rowindex" : 1,"title" : "删除","editor" : "link",
						"listener" : {
							"click" : function () { 
							}
						}
		            }, */
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
		            {"id" : "SYSZ",	"name" : "使用设置","groupcss" : "more w12","css" : "w12"},
//		            {"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
//		            	"listener": {
//		            		"delete": function(thisPlugin, rowIndex, obj){
//		               			var data = thisPlugin.getData(rowIndex);
//		               			JL.confirm("确认删除?", function(){ 
//		               				  var selectedIndex = thisPlugin.getSelectedIndex();
//		             		          JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineXSFS.initField);
//		               			});
//		               		}
//						
//				    }
//				    }
		]
	}
});

defineXSFS.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineXSFS.query();
	}
}]);

defineXSFS.setAfterInit(function () {
	defineXSFS.query();
});

defineXSFS.query = function(){
	var queryField = {};
	var a = defineXSFS.getTab().find("[name='DMMC']").val(); 
	
	if(!JL.isNull(a)){
		queryField["DMMC"] = a;
	}
	//queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineXSFS.getSqlResult(queryField, "MONGO_XSFS", "SCM_XSFS", "admin/scm/jcdy/search");
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	defineXSFS.getPluginObj("LIST").setPaging(resultData.fileName); 
	CDS.post();
}

