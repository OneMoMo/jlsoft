var defineBBXX = JL.JLForm();


defineBBXX.setPlugin({
	"toolbar" : {
	    "jlid": "JLToolBar",
	    "buttons": {
	      //新建
	      "jlNewForm":{},
	      //保存草稿
//	      "jlSaveDraft":{},
	      //提交
	      "jlSaveCard":{
	    	  "before":function(){
	    		  
	    	  },
	    	  "success":function(data,tip){
		    		  debugger;
		    	   //自定义保存成功提示信息
		    	 //  tip.obj.remove();    //清除公共提示信息。
		    		  JL.tip("保存成功,流程待办号："+data.bdbh+"-"+data.jlbh);
		    		  if(defineBBXX.getTab().find("input[name='ZDRMC']").is(":disabled")&&defineBBXX.getTab().find("input[name='SHRQ']").is(":disabled")){
		    			  defineBBXX.getTab().find("#jlSaveCard").hide();
	    			  }
	    	  }
	      },
	       //删除
	      "jlDeleteForm":{
	    	  "success": function(resultData, tip){
	    		  defineBBXX.getTab().find("#jlSaveCard").hide();
				},
	      }  
	    }
	},
	"jlbh":{
		"jlid": "JLInput",
		"format": {
		}
	},
	"GSXX01":{
		"jlid": "JLInput",
		"format": {
		}
	},
	 
	/*"JSGS":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectGSXX.do",  
		"multi": true,
		"param" : {},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		},
		"header" : [
		            {"id":"KEY", "title":"公司编码", "css":"w06"},
		            {"id":"VALUE", "title":"公司名称", "css":"w06"}
		           ]
	},
	"JSBM":{
		"jlid": "JLMultiTree",
		"sqlid":"JLPub.select_ALLBM",
		"resource":"form",
		"clickLoad":false, 
		"single":false,
		"jbToAll" :5,
		"param" : {}
	},
	"JSGW":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectGW.do",  
		"multi": true,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		},
		"header" : [
		            {"id":"KEY", "title":"岗位编码", "css":"w06"},
		            {"id":"VALUE", "title":"岗位名称", "css":"w06"}
		           ]
	},
	"JSRY":{
			"jlid" : "JLMultiSelect",
			"sBillName": "JLInterface",
			"sOperateName": "selectCZY.do",  
			"multi": true,
			"param" : {},
			"placeholder": "请选择！", 
			"listener":{
				"click": function(){
				}
			},
			"header" : [
			            {"id":"CZY02", "title":"人员编码", "css":"w06"},
			            {"id":"VALUE", "title":"人员名称", "css":"w06"}
			           ]
	},*/
	
	"ZDRDM" : {
		"jlid": "JLInput", 
		"format": {
		}
	}, 
	"SHRDM" : {
		"jlid": "JLInput", 
		"format": {
		}
	}, 
	"MB" : {
		"jlid"    : "JLSelect",
	    "sBillName": "form",
	    "sOperateName": "getOption.do", //固定写法
	    "param": {
	      "collection": "reports", //查询的MOng的表名
	      "keys": "mbbh,mbmc",//key,value
	      //"query":{"bbbh" : "3"}  //查询条件
	    },
		"listener":{
	    	"click":function(){
	    		if(JL.isNull(defineBBXX.getPluginObj("BB").getData()))
				{
					JL.tip("选择报表不允许为空");
					return true;
				}
	    	}
	    }
	}, 
	
    "SH":{
		 "jlid": "JLRadio",
	     "default" : "Y",
		 "options": {"Y":"同意","N":"不同意"}
	},
	"BB":{
		"jlid"    : "JLSelect",
	    "sBillName": "form",
	    "sOperateName": "getOption.do", //固定写法
	    "param": {
	      "collection": "FORM_BB", //查询的MOng的表名
	      "keys": "BBBH,BBMC",//key,value
	      //"query":{"BBBH" : "300"}  //查询条件
	    },
	    "listener":{
	    	"change":function(data){
	    		debugger;
	    		if(defineBBXX.getPluginObj("BB")!==undefined){
	    			var key = data.key;
		    		defineBBXX.getPluginObj("MB").config.param.query = {"bbbh" : key};
		    		defineBBXX.getPluginObj("MB").config.options={};
		    		defineBBXX.getPluginObj("MB").init();
	    		}
	    		
	    		
	    		/*JL.initPlugIn($("#d_MB"), "MB", {
	    			"jlid"    : "JLSelect",
	    		    "sBillName": "form",
	    		    "sOperateName": "getOption.do", //固定写法
	    		    "param": {
	    		      "collection": "reports", //查询的MOng的表名
	    		      "keys": "bbms,bbms",//key,value
	    		      "query":{"bbbh" : key}  //查询条件
	    		    },
	    		    
	    		});*/
	    	}
	    }
	}
});
 
defineBBXX.setAfterInit(function() {
	debugger;
	
	
	//加载Grid数据事件 
	defineBBXX.getPluginObj("GSXX01").setData(userInfo["PCRM_GSXX01"]);  
	defineBBXX.getPluginObj("ZDRDM").setData(userInfo["PCRM_CZY01"]);
	defineBBXX.getTab().find("input[name='ZDRMC']").val(userInfo["PCRM_CZY03"]);
	defineBBXX.getTab().find("input[name='ZDRQ']").val(JL.formatDate(0,2));
	if (defineBBXX.getTab().find("input[name='ZDRMC']").is(":not(:disabled)")) { 
		defineBBXX.getTab().find(".step2").hide();
		if(defineBBXX.data.jlbh>0){		
			defineBBXX.getTab().find("a[id='jlDeleteForm']").show();
		}else{
			defineBBXX.getTab().find("a[id='jlDeleteForm']").hide();
		}
	}
	if (defineBBXX.getTab().find("input[name='SHRQ']").is(":not(:disabled)")) {
		defineBBXX.getTab().find(".step1").hide(); 
		defineBBXX.getPluginObj("SHRDM").setData(userInfo["PCRM_CZY01"]);
		defineBBXX.getTab().find("input[name='SHRMC']").val(userInfo["PCRM_CZY03"]);
		defineBBXX.getTab().find("input[name='SHRQ']").val(JL.formatDate(0,2));
		debugger;
		defineBBXX.getTab().find("a[id='jlDeleteForm']").hide();
		defineBBXX.getTab().find("a[id='jlSaveDraft']").hide();
	}
	
});
 