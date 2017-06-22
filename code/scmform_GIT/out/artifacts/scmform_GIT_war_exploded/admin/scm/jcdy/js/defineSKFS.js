var defineSKFS = JL.JLForm();

defineSKFS.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds": "CDS",
					"success":function(data,tip){
						defineSKFS.query();
					    
						
					}
			},
			"jlCancelSlide" : {
				"cds": "CDS"
			}
		}
	},
	"jlbh" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"SKFS01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SKFS01",
		"format": {
		}
	},
	"SKMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SKMC",
		"format": {
			"null": false
		}
	},
	"SXFL" : {
		"jlid" : "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.SXFL",
		"options" : {
			"1" : "需要银行账号",
		},
		"listener": {
			"checked":function(data, checked, arr){
		    	var JEFS=defineSKFS.getPluginObj("JEFS").getData();
		    	var J=JEFS.key;
		    	console.info(data.key);
		    	console.info(checked);
		    	if(checked){
		    		if(JEFS.key!="1") {
		    			JL.tip("不允许勾选银行账号","info");
		    			console.info(arr);
		    			defineSKFS.getPluginObj("SXFL").setData(arr);
		    		}
		    	}
			}
		}
	},
	"FLDM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.FLDM"
	},
	"SRDM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SRDM"
	},
	"JEFS" : {
		"jlid" : "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.JEFS",
		"options" : {
			"0" : "现金",
            "1" : "银行卡",
            "2" : "电子券",
            "3" : "支票",
            "18" : "承兑汇票",
            "5" : "上门收款",
            "6" : "个人赊款",
            "9" : "单位应收",
            "10" : "会员积分",
            "11" : "会员储值",
            "13" : "长短款",
            "16" : "预收款",
            "17" : "冲预收款",
            "19" : "费用",
            "01" : "冲预付款",
            "27" : "保证金",
		},
		"listener": {
			"change":function(data){
		    	var SXFL=defineSKFS.getPluginObj("SXFL").getData();
			}
		},
	},
	"WBBZ" : {
		"jlid" : "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.WBBZ",
		"sqlid": "RYXX.BZ",
	   "resource": "scmform"
	},
	"BBBZ" : {
		"jlid" : "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.BBBZ",
		"sqlid": "RYXX.BZ",
		   "resource": "scmform"
	},
	"LSSYSZ" : {
		"jlid" : "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.LSSYSZ",
		"options" : {
			"1" : "零售收款",
			"2" : "零售订金",
			"3" : "收余款",
			"4" : "零售收付款",
			"5" : "可退现金",
			"6" : "可找零"
		},
		"listener": {
		      "checked":function(data, checked, arr){
		    	  var JEFS=defineSKFS.getPluginObj("JEFS").getData();

		    	  
		    	  var J=JEFS.key;
		    	  console.info(data.key);
		    	  console.info(checked);
		    	  if(!checked)
		    	  {
			    	  if(data.key=="7")
					  {
			    		  defineSKFS.getTab().find("dl[name='SRFL']").hide();
			    		  defineSKFS.getTab().find("dl[name='FL']").hide();
					 }
		    	  }
		    	  if(checked)
		    	  {
			    	  if(data.key=="7")
					  {
			    		  defineSKFS.getTab().find("dl[name='SRFL']").show();
			    		  defineSKFS.getTab().find("dl[name='FL']").show();
					 }
			      
			    	  if(J==5||J==6||J==10|J==11||J==13||J==14)
			    	  {
			    		  var SYSZ=defineSKFS.getPluginObj("SYSZ").getData();
			    		  if(SYSZ.length>1)
			    		  {
			    			  JL.tip("该金额方式只能定义一种设置","info");
			    			  defineSKFS.getPluginObj("SYSZ").setData(arr);
			    			  return false;
			    		  }
			    	  }
		    	  }
			      
			    
		       }
		}
	},
	"FXSYSZ" : {
		"jlid" : "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.FXSYSZ",
		"options" : {
			"1" : "分销收款",
			"2" : "分销结算",
			"3" : "返利付款",
			"4" : "分销收付款"
				}
		},
	"JSSYSZ" : {
			"jlid" : "JLCheckbox",
			"cds": "CDS",
			"cds-field": "LIST.JSSYSZ",
			"options" : {
				"1" : "结算付款",
				"2" : "收入收款"
					},
			"listener": {
			      "checked":function(data, checked, arr){

			      }}
			},
	"SRFL" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SRFL",
		"css": "w09",
		"dir"       : "scm/pub/search",
		"namespace" : "FLFS",
		"sqlid"     : "SR",
    	"fieldMapping" : {
    	      "JSSR02" : "SRFL",
    	      "JSSR01" : "SRDM",
    	}
	},
	"FL" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.FL",
		"dir": "scm/pub/search",
		"namespace": "FLFS",
		"sqlid": "FLDM",
    	"fieldMapping": {
    		"FLDM02": "FL",
    		"FLDM01": "FLDM",
    	}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi": false,
		"rowclass": "pl10",
		"buttons": {
			"jlNew":{}
		},
		"title" : [
           {"id":"SKXX", "name":"<span class='w04 tr pr20'>收款编码</span><span class='w08'>收款名称</span>", "width":"w03"},
		   {"id" : "JEFS","name" : "金额方式","width" : "w02"}, 
		   {"id" : "LSSYSZ","name" : "零售收款","width" : "w02"}, 
		   {"id" : "FXSYSZ","name" : "分销收款","width" : "w02"}, 
		   {"id" : "JSSYSZ","name" : "结算付款","width" : "w02"},
		   {"id" : "CZ","name" : "操作","width" : "w01 tc pr0"}
		],
		"header" : [
		    {"id" : "SKFS01","groupid" : "SKXX","rowindex" : 1, "title" : "代码", "css":"mr0 w04 tr pr20"}, 
		    {"id" : "SKMC","groupid" : "SKXX","rowindex" : 1, "title" : "名称", "css":"mr0 w08 text_hide"}, 
		    {"id" : "JEFS","groupid" : "JEFS","title" : "金额方式", "css":"mr0 w12"}, 
		    {"id" : "LSSYSZ","groupid" : "LSSYSZ","rowindex" : 1,"title" : "零售收款", "css":"mr0 w12 text_hide"}, 
		    {"id" : "FXSYSZ","groupid" : "FXSYSZ","rowindex" : 1,"title" : "分销收款", "css":"mr0 w12 text_hide"}, 
		    {"id" : "JSSYSZ","groupid" : "JSSYSZ","rowindex" : 1,"title" : "结算付款", "css":"mr0 w12 text_hide"}, 
		    {"id" : "edit","groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		    	"config" : {
		    		"readonly": ["SKFS01"]
		        },
		        "listener": {
			    	"click":function(data){//参数data为点击的值，是个json对象
			    		console.info("HKKKKKKKKKKKKK");
			    		defineSKFS.getTab().find("#jlEmptyCard").hide();
			    	
			    	}
		        }
		    }, 
			{"id" : "delete","groupid" : "CZ","rowindex" : 1,"title" : "删除","editor" : "link","css":"mr0",
				"listener" : {
					"click": function(thisPlugin, rowIndex, obj){
              			JL.confirm("确认删除?", function(){
            	          var selectedIndex = thisPlugin.getSelectedIndex();
         		          JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineSKFS.initField);
              			});
               		}
				}
		    }
		]
	}
});

defineSKFS.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(data){
		defineSKFS.query();
	}
}]);

defineSKFS.setAfterInit(function() {
	//加载Grid数据事件
	defineSKFS.query();
});

defineSKFS.query = function() {
	var queryField = {};
	var a = defineSKFS.getTab().find("[name='DMMC']").val(); 
	
	if(!JL.isNull(a)){
		queryField["DMMC"] = a;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineSKFS.getSqlResult(queryField, "MONGO_SKFS", "SCM_SKFS", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineSKFS.getPluginObj("LIST").setPaging(resultData.fileName); 
};