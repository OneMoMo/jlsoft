var defineKSXX = JL.JLForm();

defineKSXX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds":"CDS",
				"success": function(data, tip){
					console.info(data);
					defineKSXX.getTab().find("#jlNewForm").click();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"CZJM":{
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewForm":{}
		}
	},
	 
	"SMTP":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.SMTP",
		"format": {
		}
	}, 
	
	/*"ZGSDJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.ZGSDJ",
		"options": {"1":"冻结"},
		"listener": { 
	    }
	},
	"SXGSDJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.SXGSDJ",
		"options":{"1":"冻结"},
		"listener": { 
	    }
	},*/
	"KSLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择供应商类型",
		"cds": "CDS",
		"cds-field": "LIST.KSLX",
		"sqlid": "PUBCX.KSLX",
		"param" : {"KSLX05":"0"},
		"resource": "scmform"
	},
	/*"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewCard": {
				"click":function(){
					defineKSXX.getPluginObj("DWLB").disabled(false);
					defineKSXX.getTab().find(".font_red").hide();
					defineKSXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
					defineKSXX.getTab().find("input[name='DJRMC']").val(userInfo["PCRM_CZY03"]);
					defineKSXX.getTab().find("input[name='DJR_RYXX01']").val(userInfo["PCRM_CZY02"]);
					defineKSXX.getTab().find("input[name='DJRQ']").val(JL.formatDate(0,2));
					defineKSXX.getPluginObj("JGGK01").setData([{"key":"1","value":"价格管控"}]);
					defineKSXX.getPluginObj("EDKZ01").setData([{"key":"1","value":"额度控制"}]);
					defineKSXX.getPluginObj("YXBJ01").setData([{"key":"1","value":"有效"}]);
					defineKSXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
					defineKSXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
					defineKSXX.getPluginObj("YXBJ").setData({"key":"1","value":"有效"});
				}
			}
		},
	},*/
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"GSXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSXX01",
		"format": {
		}
	},
	"HYXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.HYXX01",
		"format": {
		}
	},
	"GSMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSMC",
		"format": {
		}
	},
	"DJR_RYXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJR_RYXX01",
		"format": {
		}
	}, 
	"DJRMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJRMC",
		"format": {
		}
	}, 
	"DJRQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJRQ",
		"format": {
		}
	},  
	"WBBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.WBBM",
		"format": {
		}
	},
	  "FJSC" : {
          "jlid": "JLUpload",
          "cds": "CDS", 
  		"cds-field": "LIST.FJSC"
	  },

	"DWLB":{
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.DWLB",
		"default":"0",
		"options":{"0":"供应商","1":"客户"}	,
		"listener":{
			"click":function(data){
			/*	console.info('111111');
				defineKSXX.getTab().find(".font_red").hide();
				defineKSXX.getTab().find("[name='WLDWMC']").show();
				/*if(data.key==1){
					defineKSXX.getPluginObj("JGGK01").disabled(false);
				    defineKSXX.getPluginObj("EDKZ01").disabled(false); 
					defineKSXX.getPluginObj("JXSL").setData("");
					defineKSXX.getPluginObj("JGGK01").setData([{"key":"1","value":"价格管控"}]);
					defineKSXX.getPluginObj("EDKZ01").setData([{"key":"1","value":"额度控制"}]);
					defineKSXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
					defineKSXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
					
					defineKSXX.getTab().find("[name='SHDZ']").show();
				    defineKSXX.getTab().find("[name='JSBZ']").show();
				    defineKSXX.getTab().find("[name='LXDH']").show();
				    defineKSXX.getTab().find("[name='LXR']").show(); 
				    
				    defineKSXX.getPluginObj("SJKS").config.param={"WLDW20":"1","WLDW16":"1","GSXX01":userInfo["PCRM_GSXX01"]};
				    defineKSXX.getPluginObj("SJKS").init();
				}else */if(data.key==0){
					defineKSXX.getPluginObj("JXSL").setData("0.17");
				//	defineKSXX.getPluginObj("JGGK01").setData();
				//	defineKSXX.getPluginObj("EDKZ01").setData();
				//	defineKSXX.getPluginObj("JGGK").setData();
				//	defineKSXX.getPluginObj("EDKZ").setData();
				 //   defineKSXX.getPluginObj("JGGK01").disabled(true);
			//	    defineKSXX.getPluginObj("EDKZ01").disabled(true); 
				    
				    /*defineKSXX.getTab().find("[name='SHDZ']").show();
				    defineKSXX.getTab().find("[name='WLDWMC']").show();
				    defineKSXX.getTab().find("[name='JXSL']").show(); 
				    defineKSXX.getTab().find("[name='LXDH']").show();
				    defineKSXX.getTab().find("[name='DZ']").show();  
				    defineKSXX.getTab().find("[name='LXR']").show(); */
				    
				    defineKSXX.getPluginObj("SJKS").config.param={"WLDW20":"0","WLDW16":"1","GSXX01":userInfo["PCRM_GSXX01"]};
				    defineKSXX.getPluginObj("SJKS").init();
				}
			}
		}
	},
	/* "JGGK01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.JGGK01",
		 "options":{"1":"价格管控"},
		 "listener": {
			 "click":function(data){
				 if(defineKSXX.getPluginObj("JGGK01").getData().length==1){
					 defineKSXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
				 }else{
					 defineKSXX.getPluginObj("JGGK").setData();
				 }
			 }
		 }
	 },
	 "JGGK":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.JGGK",
		 "options": {"1":"价格管控"}
	 },*/
	/* "EDKZ01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.EDKZ01",
		 "options":{"1":"额度控制"},
		 "listener": {
			 "click":function(data){
				 if(data.key==1){
					 defineKSXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
				 }else{
					 defineKSXX.getPluginObj("EDKZ").setData();
				 }
			 }
		 }
	 },
	 "EDKZ":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.EDKZ",
		 "options": {"1":"额度控制"}
	 },*/
	 "YXBJ01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.YXBJ01",
		 "options":{"1":"有效"},
		 "default": "1",
		 "listener": {
			 "click":function(data){
				 if(data.key==1){
					 defineKSXX.getPluginObj("YXBJ").setData({"key":"1","value":"有效"});
				 }else{
					 defineKSXX.getPluginObj("YXBJ").setData({"key":"0","value":"无效"});
		    	 }
			 }
			 
		 }
	 },
	 "YXBJ":{
		 "jlid": "JLSelect", 
		 "cds": "CDS",
		 "cds-field": "LIST.YXBJ",
		 "default": "1",
		 "options": {"0":"无效","1":"有效"}
	 },
	"WLDW01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.WLDW01",
		"format": {
		}
	},
	"WLDWMC":{
		"jlid": "JLInput",
		"placeholder" : "请输入供应商名称",
		"cds": "CDS", 
		"cds-field": "LIST.WLDWMC",
		"format": {
		},
		"listener":{
			"blur":function(data){ 
			//	defineKSXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)); 
				if (JL.convertToPinYin(data).length>0){
					defineKSXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)[JL.convertToPinYin(data).length-1]); 
				}else{
					defineKSXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)); 
				}
			}
        }
	},
	"PYM":{
		"jlid": "JLInput",
		"readonly":true,
		"cds": "CDS", 
		"cds-field": "LIST.PYM",
		"format": {
		}
	},
	"CWXTBM":{
		"jlid": "JLInput",
		"readonly":true,
		"cds": "CDS", 
		"cds-field": "LIST.CWXTBM",
		"format": {
		}
	},
	"JC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JC",
		"format": {
		}
	},
	"DZ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DZ",
		"format": {
		}
	},
	"KHYH" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.KHYH",
		"format": {
		}
	},
	"YHZH" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YHZH",
		"format": {
		}
	},
	"SWDJH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.SWDJH",
		"format": {
		}
	},
	"SHDZ" : {
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do",
		"cds": "CDS",
		"multi": false,
	    "cds-field": "LIST.SHDZ",
		"text": true
	},
	"KPHT":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.KPHT",
		"format": {
		}
	},
	"FPLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择发票类型",
		"cds": "CDS",
		"cds-field": "LIST.FPLX",
		"options": {"0":"普通发票","1":"增值税发票"}
	},
	"FRDB":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.FRDB",
		"format": {
		}
	},
	"HY":{
		"jlid": "JLSelect",
		"placeholder" : "请选择行业",
		"cds": "CDS",
		"cds-field": "LIST.HY",
		"sqlid": "PUBCX.HYXX",
		"resource": "scmform"
	},
	"LXDH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.LXDH",
		"format": {
			"number":true
		}
	},
	"LXR":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.LXR",
		"format": {
		}
	},
	"YZBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YZBM",
		"format": {
		}
	},
	"CZHM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.CZHM",
		"format": {
		}
	},
	"JXSL":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JXSL",
		"format": {
		}
	},
	/*"KSLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择供应商类型",
		"cds": "CDS",
		"cds-field": "LIST.KSLX",
		"sqlid": "PUBCX.KSLX",
		"resource": "scmform"
	},*/
	/*"SJKS":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_WLDW.do", 
		"multi" : false,
		"cds": "CDS",
	    "cds-field": "LIST.SJKS",
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},*/
	/*"FXZQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.FXZQ",
		"format": {
		}
	},*/
	/*"YFZQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YFZQ",
		"format": {
		}
	},*/
	"JSBZ":{
		"jlid": "JLSelect",
		"placeholder" : "请选择结算币种",
		"cds": "CDS",
		"cds-field": "LIST.JSBZ",
		"sqlid": "RYXX.BZ",
		"resource": "scmform"
	},
	/*"ZFFS":{
		"jlid": "JLSelect",
		"placeholder" : "请选择支付方式",
		"cds": "CDS",
		"cds-field": "LIST.ZFFS",
		"sqlid": "PUBCX.SKFS",
		"resource": "scmform"
	}, */
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more", 
		"multi":false,     //可以多选
		"mode": "edit",
		"buttons" : {
			"jlNew":{
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
//						defineKSXX.getPluginObj("ZHZ").setData(defineKSXX.getPluginObj("ZHZ").ul.find("li:first").data());
//						defineKSXX.getPluginObj("COUNTRY").setData(defineKSXX.getPluginObj("COUNTRY").ul.find("li:first").data());
//						defineKSXX.getPluginObj("TYKM").setData(defineKSXX.getPluginObj("TYKM").ul.find("li:first").data());
//						defineKSXX.getPluginObj("PXDM").setData(defineKSXX.getPluginObj("PXDM").ul.find("li:first").data());
//						defineKSXX.getPluginObj("XJGLZ").setData(defineKSXX.getPluginObj("XJGLZ").ul.find("li:first").data());
						defineKSXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
						defineKSXX.getTab().find("input[name='DJRMC']").val(userInfo["PCRM_CZY03"]);
						defineKSXX.getTab().find("input[name='DJR_RYXX01']").val(userInfo["PCRM_CZY02"]);
						defineKSXX.getTab().find("input[name='DJRQ']").val(JL.formatDate(0,2));
						defineKSXX.getPluginObj("YXBJ01").setData([{"key":"1","value":"有效"}]);
						defineKSXX.getPluginObj("YXBJ").setData({"key":"1","value":"有效"});
						defineKSXX.getPluginObj("JXSL").setData("0.17");
						//defineKSXX.getPluginObj("JSBZ").setData({"key":"01","value":"RMB"});
					}
				}
			}
		},
		"title" : [
		           {"id":"KSBM", "name":"供应商编码", "width":"w02"},
		           {"id":"KSMC", "name":"供应商名称", "width":"w02"},
		           {"id":"KSLX", "name":"供应商类型", "width":"w02"},
		           {"id":"PYM", "name":"拼音码", "width":"w01"},
		           {"id":"SWDJH", "name":"税务登记号", "width":"w03","align":"center"},
		           {"id":"YX", "name":"有效标记", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		 ],
		"header" : [
		            {"id":"WLDW01", "groupid":"KSBM",  "rowindex" :1, "title":"供应商编码"},
		            {"id":"WLDWMC", "groupid":"KSMC",  "rowindex" :1, "title":"供应商名称"},
		            {"id":"KSLX",   "groupid":"KSLX",  "rowindex" :1, "title":"供应商类型"},
		            {"id":"PYM",   "groupid":"PYM",  "rowindex" :1, "title":"拼音码"},
		            {"id":"SWDJH",   "groupid":"SWDJH",  "rowindex" :1, "title":"税务登记号"},
		            {"id":"YXBJ01",  "groupid":"YX", "title":"有效标记","groupcss":"overflow_inherit", "editor":"plugin",
			   		     "config":{
					    		"jlid": "JLCheckbox",
					    		"options": {
					    			
				    				"1":"有效"
					    		}
					      }
				    }, 
		            {"id":"jlbh","hidden":true},
					{"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
		            	"config":{
							  "readonly": [],
					          "mapping":{}
						},
						"listener": {
	         			      "click":function(data){//参数data为点击的值，是个json对象
	         			    	  	console.info('111111');
	         			    	  	var CDS = defineKSXX.getCds("CDS");
	         			    	  	CDS.edit();
	         			    	  	/*defineKSXX.getPluginObj("DWLB").disabled(true);
		         					defineKSXX.getTab().find(".font_red").hide();*//*
		         					defineKSXX.getTab().find("[name='WLDWMC']").show();*/
		         					if(defineKSXX.getPluginObj("DWLB").getData().key==1){
		         					   /* defineKSXX.getTab().find("[name='JSBZ']").show();*/
		         					    
		         					 //   defineKSXX.getPluginObj("JGGK01").disabled(false);
		         					//    defineKSXX.getPluginObj("EDKZ01").disabled(false);
		         					}else if(defineKSXX.getPluginObj("DWLB").getData().key==0){
		         					/*    defineKSXX.getTab().find("[name='WLDWMC']").show();
		         					    defineKSXX.getTab().find("[name='JXSL']").show();
		         					    defineKSXX.getTab().find("[name='LXR']").show();
		         					    defineKSXX.getTab().find("[name='LXDH']").show();
		         					    defineKSXX.getTab().find("[name='DZ']").show(); */
		         					    //defineKSXX.getTab().find("[name='JSBZ']").show();
		         					   // defineKSXX.getPluginObj("JGGK01").disabled(true);
		         				//	    defineKSXX.getPluginObj("EDKZ01").disabled(true);
		         					}
		         			    	/*//  alert(userInfo["PCRM_GSXX01"]);DWLB
		         			    	defineKSXX.getPluginObj("DWLB").disabled(true);
		         			    	defineKSXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
		         			    	defineKSXX.getTab().find("input[name='DJRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
		         			    	defineKSXX.getTab().find("input[name='DJR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
		         			    	defineKSXX.getTab().find("input[name='DJRQ']:not(:disabled)").val(JL.formatDate(0,2));
		         			    	if(defineKSXX.getPluginObj("DWLB").getData().key==1){
		         			    		defineKSXX.getPluginObj("JGGK01").disabled(false);
		         					    defineKSXX.getPluginObj("EDKZ01").disabled(false); 
	         							defineKSXX.getTab().find(".JSBZ01").show();
	         							defineKSXX.getTab().find(".WLDWYC").show();
	         							defineKSXX.getPluginObj("JXSL").setData("");
	         							defineKSXX.getTab().find(".JXSL01").hide();
	         						    defineKSXX.getTab().find(".LXR01").hide();
	         						    defineKSXX.getTab().find(".LXDH01").hide();
	         						    defineKSXX.getTab().find(".DZ01").hide();
	         						}else{
	         							defineKSXX.getTab().find(".JSBZ01").hide();
	         							defineKSXX.getTab().find(".WLDWYC").hide();
	         							defineKSXX.getPluginObj("JXSL").setData("0.17");
	         							defineKSXX.getPluginObj("JGGK01").setData();
	         							defineKSXX.getPluginObj("EDKZ01").setData();
	         							defineKSXX.getPluginObj("JGGK").setData();
	         							defineKSXX.getPluginObj("EDKZ").setData();
	         						    defineKSXX.getTab().find(".JXSL01").show();
	         						    defineKSXX.getTab().find(".LXR01").show();
	         						    defineKSXX.getTab().find(".LXDH01").show();
	         						    defineKSXX.getTab().find(".DZ01").show();
	         						    defineKSXX.getPluginObj("JGGK01").disabled(true);
	         						    defineKSXX.getPluginObj("EDKZ01").disabled(true); 
	         						}*/
	        			       }
						}
					}
		]	
	}
});

defineKSXX.setEvent([
{
	
	"selector": "[name='WLDWMC']",
	"event": "keyup",
	"func": function(data,event){
		var WLDWMC=defineKSXX.getTab().find("input[name='WLDWMC']").val();
		//defineKSXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC));
		if (JL.convertToPinYin(WLDWMC).length>0){
			defineKSXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC)[JL.convertToPinYin(WLDWMC).length-1]); 
		}else{
			defineKSXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC)); 
		}
	}
},
{
	
	"selector": "#search",
	"event": "click",
	"func": function(){
	defineKSXX.query();
		
	}
}
]);

defineKSXX.setAfterInit(function() {
	JL.tab(defineKSXX, {
		"KSXX": "基础信息",
		"LXFS": "联系方式",
		"ZFXX": "支付信息",
		"QTXX": "其他信息"
	});
	
	defineKSXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);// 公司信息
	defineKSXX.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	defineKSXX.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0,2));
    //加载Grid数据事件
	defineKSXX.query();
});

defineKSXX.query = function(){
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	debugger;
	var queryField = {};
	var DMMC = defineKSXX.getTab().find("[name='DMMC']").val();
	if(!JL.isNull(DMMC)){
		queryField["DMMC"] = DMMC;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	queryField["GSXX01"] = userInfo["PCRM_GSXX01"];
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineKSXX.getSqlResult(queryField, "MONGO_KSXX", "SCM_KSXX1", "admin/scm/jcdy/search");
	        
	    	defineKSXX.getPluginObj("GSXX01").config.options = {};
	    	defineKSXX.getPluginObj('GSXX01').config.param = {"CZY14":"1"};
	    	defineKSXX.getPluginObj('GSXX01').init();
	    }else if (data.CZY14==2){
	    	var resultData = defineKSXX.getSqlResult(queryField, "MONGO_KSXX", "SCM_KSXX2", "admin/scm/jcdy/search");
	    	
	    	defineKSXX.getPluginObj("GSXX01").config.options = {};
	    	defineKSXX.getPluginObj('GSXX01').config.param = {};
	    	defineKSXX.getPluginObj('GSXX01').init();
	    }else{
	    	var resultData = defineKSXX.getSqlResult(queryField, "MONGO_KSXX", "SCM_KSXX", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = defineKSXX.getSqlResult(queryField, "MONGO_KSXX", "SCM_KSXX", "admin/scm/jcdy/search");
	}	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineKSXX.getPluginObj("LIST").setPaging(resultData.fileName); 
};