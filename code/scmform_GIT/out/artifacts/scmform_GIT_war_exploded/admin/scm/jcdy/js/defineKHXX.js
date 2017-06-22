var defineKHXX = JL.JLForm();

defineKHXX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds":"CDS",
				"success": function(data, tip){
					console.info(data);
					defineKHXX.getTab().find("#jlNewForm").click();
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
	//查看错误信息按钮
	"DRCM":{
		"jlid":"JLToolBar",
		"buttons":{
		  "jlDEL":{
			  "name":"查看错误信息按钮",
			  "css": "jl_btn btn_blue",
			  "func":function(data){
				  if(defineKHXX.find("dl[name='MESSAGE']").is(":hidden"))
				  {
					  defineKHXX.find("dl[name='MESSAGE']").show();
				  }
				  else
				  {
					  defineKHXX.find("dl[name='MESSAGE']").hide();
				  }
			  }
		  }
		}
	},
	 //导入商品错误信息展示
	"MESSAGE": {
		"jlid"    : "JLGrid",
		"tittles" : "错误信息列表", 
		"multi":false,
		"headers" : [
		     {"id" : "NUM", "name" : "EXCEL行号", "width" : 100},
	         {"id" : "ERROR",   "name" : "错误信息", "width" : 800}
	    ]
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
	
	"SMTP":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.SMTP",
		"format": {
		}
	}, 
//	"SFZH":{
//		"jlid": "JLInput",
//		"cds": "CDS", 
//		"cds-field": "LIST.SFZH",
//		"format": {
//		},
//		"listener": 
//		{
//			"blur":function(data)
//			{
//				debugger;
// 				if(data != "")
// 				{
// 					if(data.length!= 18)
// 					{
//     					JL.tip("输入的身份证号不对，请核对","info");
//     					makeKHYHD.getTab().find("input[name='SFZH']").val("");
// 					}
// 				}
//	        }
//		}
//	}, 

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
	
	"DJRQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJRQ",
		"format": {
		}
	},  
	"DWLB":{
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.DWLB",
		"default":"1",
		"options":{"0":"供应商","1":"客户"}	,
		"listener":{
			"click":function(data){
				if(data.key==1){
					defineKHXX.getPluginObj("JGGK01").disabled(false);
				    defineKHXX.getPluginObj("EDKZ01").disabled(false); 
					defineKHXX.getPluginObj("JGGK01").setData([{"key":"1","value":"价格管控"}]);
					defineKHXX.getPluginObj("EDKZ01").setData([{"key":"1","value":"额度控制"}]);
					defineKHXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
					defineKHXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
					
				    defineKHXX.getPluginObj("SJKS").config.param={"WLDW20":"1","WLDW16":"1","GSXX01":userInfo["PCRM_GSXX01"]};
				    defineKHXX.getPluginObj("SJKS").init();
				}
			}
		}
	},
	"YFJZFS":{
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.YFJZFS",
		"options": {"1":"延付发货后记账","2":"延付审核后记账"}
	},
	 "JGGK01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.JGGK01",
		 "options":{"1":"价格管控"},
		 "listener": {
			 "click":function(data){
				 if(data.key==1){
					 defineKHXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
				 }else{
					 defineKHXX.getPluginObj("JGGK").setData();
				 }
			 }
		 }
	 },
	 "JGGK":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.JGGK",
		 "options": {"1":"价格管控"}
	 },
	 "EDKZ01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.EDKZ01",
		 "options":{"1":"额度控制"},
		 "listener": {
			 "click":function(data){
				 if(data.key==1){
					 defineKHXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
				 }else{
					 defineKHXX.getPluginObj("EDKZ").setData();
				 }
			 }
		 }
	 },
	 "EDKZ":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.EDKZ",
		 "options": {"1":"额度控制"}
	 },
	 "YFZDSK":{
		 "jlid": "JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.YFZDSK",
		 "options": {"1":"延付结算自动收款"},
		 "listener":{
				"click": function(data, checked, obj, thisPlugin){
					if (thisPlugin.data.length > 0){
						defineKHXX.getTab().find("[name='emZFFS']").show(); 
					}else{
						defineKHXX.getTab().find("[name='emZFFS']").hide(); 
					}
				}
			}
	 }, 
	 "ZDSK":{
		 "jlid": "JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.ZDSK",
		 "options": {"1":"分销自动收款"},
		 "listener":{
				"click": function(data, checked, obj, thisPlugin){
					if (thisPlugin.data.length > 0){
						defineKHXX.getTab().find("[name='emZFFS']").show(); 
					}else{
						defineKHXX.getTab().find("[name='emZFFS']").hide(); 
					}
				}
			}
	 }, 
	 "YXBJ01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.YXBJ01",
		 "options":{"1":"有效"},
		 "default": "1",
		 "listener": {
			 "click":function(data){
				 if(data.key==0){
					 defineKHXX.getPluginObj("YXBJ").setData({"key":"0","value":"无效"});
				 }else{
					 defineKHXX.getPluginObj("YXBJ").setData({"key":"1","value":"有效"});
		    	 }
			 }
		 }
	},
	"YXBJ" : {
		"jlid" : "JLCheckbox",
		"options" : {
			"1" : "有效"
		},
		"cds" : "CDS",
		"cds-field" : "LIST.YXBJ",
		"format" : {
			"null" : false
		}
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
		"placeholder" : "请输入客户名称",
		"cds": "CDS", 
		"cds-field": "LIST.WLDWMC",
		"format": {
		},
		"listener":{
			"blur":function(data){ 
				if (JL.convertToPinYin(data).length>0){
					defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)[JL.convertToPinYin(data).length-1]); 
				}else{
					defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)); 
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
	"FLKPFS":{
		"jlid": "JLSelect",
		"placeholder" : "请选择发票类型",
		"cds": "CDS",
		//"default":"1",
		"cds-field": "LIST.FLKPFS", 
		"options": {"0":"红字发票","1":"票折"}
	},
	"FPLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择发票类型",
		"cds": "CDS",
		"default":"1",
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
		"placeholder" : "请选择客户行业",
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
			"number":true,
			"null":false
		}
	},
	"LXRLB":{
		"jlid": "JLGrid",
		"cds": "CDS", 
		"cds-field": "LIST.LXRLB",
		"tittles" : "联系人列表",
		"headers" : [ 
			{"id" : "LXRMC", "name" : "联系人名称", "editor":{"type":"text"}, "width" : "100"},
			{"id" : "LXDH", "name" : "联系人电话", "editor":{"type":"text"}, "width" : "150"},
			{"id" : "SFZH", "name" : "身份证", "editor":{"type":"text"}, "width" : "180"},
			{"id" : "MR", "name" : "是否默认", "editor":{
				"type":"select", 
		    	"default": "1",
		    	"options": {"1":"是","0":"否"}
			}, "width" : "100"}],
		"buttons" : [1,2]
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
	/*"JXSL":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JXSL",
		"format": {
		}
	},*/
	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					console.info(this);
					var type = $(this).text();
					if(type == "批量导入"){
						defineKHXX.find("#import").show();
						defineKHXX.getPluginObj("EXCEL").setData([]);
						defineKHXX.find("dl[name='BUTTON']").hide();
						defineKHXX.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
					}else{
						defineKHXX.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
		}
	},
	"KSLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择客户类型",
		"cds": "CDS",
		"cds-field": "LIST.KSLX",
		"sqlid": "PUBCX.KSLX",
		"param" : {"KSLX05":"1"},
		"resource": "scmform"
	},

	"SJKS":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_WLDW.do", 
		"multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"cds": "CDS",
	    "cds-field": "LIST.SJKS",
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"YWY":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectRYXX.do", 
		"multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"],"RYXX08":"3"},
		"cds": "CDS",
	    "cds-field": "LIST.YWY",
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"FXZQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.FXZQ",
		"format": {
		}
	},
	"YFZQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YFZQ",
		"format": {
		}
	},
	"CJBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.CJBM",
		"format": {
		}
	},
	"FXCJBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.FXCJBM",
		"format": {
		}
	},
	"JXSDH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JXSDH",
		"format": {
		}
	},
	"QY":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.QY",
		"format": {
		}
	},
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
		"resource": "scmform",
		"param": {"SKFS":["17","9"]}//9 单位应收 ;17 冲预收款
	}, */
	"ZFFS":{
		"jlid": "JLSelect",
		"placeholder" : "请选择支付方式",
		"cds": "CDS",
		"cds-field": "LIST.ZFFS",
		"options": {"0":"单位应收","1":"冲预收款"}
	},
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"afterUpload" : function(data) {
				debugger; 
				var resultData = JL.getExcelData(5, data); 
				var returnList = resultData.data.returnList;
				
				for (var i=0;i<returnList.length;i++){
					var data = resultData.data.returnList[i];
					
					if (JL.convertToPinYin(data.WLDWMC).length>0){
						resultData.data.returnList[i]["PYM"] = JL.convertToPinYin(data.WLDWMC)[JL.convertToPinYin(data.WLDWMC).length-1];
					}else{
						resultData.data.returnList[i]["PYM"] = JL.convertToPinYin(data.WLDWMC);
					}
				}

				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineKHXX/excelKHXX.do";
				ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
				var resultData = JL.ajax(ajaxJson);
				errorResultData = resultData["data"]["returnList"];
				debugger;
				if(errorResultData != -1){
					console.info("error");
					defineKHXX.find("dl[name='BUTTON']").show();
					defineKHXX.getPluginObj("MESSAGE").setData(errorResultData);
				}else{
					JL.tip("上传成功！");
					defineKHXX.find("dl[name='BUTTON']").hide();
					defineKHXX.query();
				}
				/*if (resultData.data.returnList == -1){
					JL.tip("上传成功！");
				}else{
					JL.tip(resultData.data.err);
				}*/
				
				defineKHXX.query();
			}
		}
	},
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
//						defineKHXX.getPluginObj("SKBJ").setData("1");
						debugger;
//						defineKHXX.getPluginObj("ZHZ").setData(defineKHXX.getPluginObj("ZHZ").ul.find("li:first").data());
//						defineKHXX.getPluginObj("COUNTRY").setData(defineKHXX.getPluginObj("COUNTRY").ul.find("li:first").data());
//						defineKHXX.getPluginObj("TYKM").setData(defineKHXX.getPluginObj("TYKM").ul.find("li:first").data());
//						defineKHXX.getPluginObj("PXDM").setData(defineKHXX.getPluginObj("PXDM").ul.find("li:first").data());
//						defineKHXX.getPluginObj("XJGLZ").setData(defineKHXX.getPluginObj("XJGLZ").ul.find("li:first").data());
					/*	defineKHXX.getTab().find("[id='PLDR']").show();
						defineKHXX.getTab().find("[data-id='PLDR']").show();*/
						
						defineKHXX.getTab().find("[data-id='KSXX']").attr("class","xuan"); 
     					defineKHXX.getTab().find("[id='KSXX']").attr("style","");
     				/*	defineKHXX.getTab().find("[data-id='PLDR']").attr("class","");
     					defineKHXX.getTab().find("[id='PLDR']").attr("style","display: none;"); */
     					defineKHXX.getTab().find("[data-id='LXFS']").attr("class","");
     					defineKHXX.getTab().find("[id='LXFS']").attr("style","display: none;"); 
     					defineKHXX.getTab().find("[data-id='ZFXX']").attr("class","");
     					defineKHXX.getTab().find("[id='ZFXX']").attr("style","display: none;"); 
     					defineKHXX.getTab().find("[data-id='QTXX']").attr("class","");
     					defineKHXX.getTab().find("[id='QTXX']").attr("style","display: none;");
						
						defineKHXX.getTab().find("[name='emZFFS']").hide(); 
						defineKHXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
						defineKHXX.getTab().find("input[name='DJRMC']").val(userInfo["PCRM_CZY03"]);
						defineKHXX.getTab().find("input[name='DJR_RYXX01']").val(userInfo["PCRM_CZY02"]);
						defineKHXX.getTab().find("input[name='DJRQ']").val(JL.formatDate(0,2));
						defineKHXX.getPluginObj("JGGK01").setData([{"key":"1","value":"价格管控"}]);
						defineKHXX.getPluginObj("EDKZ01").setData([{"key":"1","value":"额度控制"}]);
						defineKHXX.getPluginObj("YXBJ01").setData([{"key":"1","value":"有效"}]);
						defineKHXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
						defineKHXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
						defineKHXX.getPluginObj("YXBJ").setData({"key":"1","value":"有效"});
						
						//str=str.Substring(2);  //去掉前两位

					}
				}
			},
			"jlExportData":{
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						defineKHXX.getPluginObj("SKBJ").setData("1");
					}
				}
			},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义客户信息模板",{
						"WLDWMC":"*客户名称-WLDWMC",
						"LXR":"*联系人-LXR",
						"LXDH":"*联系电话-LXDH",
						"SHDZ":"*送货地址-SHDZ",
						"SHDZMX":"送货地址详情-SHDZMX",
						"EDKZ":"*额度控制（0：不控制；1：控制）-EDKZ",
						"JGGK01":"*价格管控（0：不控制；1：控制）-JGGK01",
						"ZDSK":"*分销自动收款（0：不自动；1：自动）-ZDSK",
						"YFZDSK":"*延付结算自动收款（0：不自动；1：自动）-YFZDSK",
						"JSBZ":"*结算币种-JSBZ",
						"YXBJ":"*有效标记(0：无效；1：有效)-YXBJ01",
						"CJBM":"工程厂家编码-CJBM",
						"FXCJBM":"分销厂家编码-FXCJBM",
						//"JXSDH":"经销商电话-JXSDH",
						"DZ":"地址-DZ",
						"FRDB":"法人代表-FRDB",
						"SWDJH":"税务登记号-SWDJH",
						"YFZQ":"延付账期-YFZQ",
						"FXZQ":"分销账期-FXZQ",
						"KHYH":"开户银行-KHYH",
						"YWY":"对应业务员-YWY",
						"HY":"行业-HY",
						"FPLX":"发票类型（0:普通发票；1:增值税发票）-FPLX",
						"KSLX":"客户类型-KSLX",
						"SJKS":"上级客户-SJKS",
						"KPHT":"开票户头-KPHT",
						"YFJZFS":"延付记账方式(1:延付发货后记账;2:延付审核后记账)-YFJZFS",
						"YHZH":"银行账号-YHZH",
						"YZBM":"邮政编码-YZBM",
						"ZFFS":"支付方式(0：单位应收；1：冲预收款)-ZFFS",
						"FLKPFS":"返利开票方式(0：红字发票；1：票折)-FLKPFS",
						"JC":"简称-JC",
						"CZHM":"传真号码-CZHM",
						"QY":"区域-QY"
			    	});
				}	
			}
		},
		"title" : [
		           {"id":"KSBM", "name":"客户编码", "width":"w02"},
		           {"id":"KSMC", "name":"客户名称", "width":"w02"},
		           {"id":"KSLX", "name":"客户类型", "width":"w02"},
		           {"id":"PYM", "name":"拼音码", "width":"w01"},
		           {"id":"SWDJH", "name":"税务登记号", "width":"w03","align":"center"},
		           {"id":"YX", "name":"有效标记", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		 ],
		"header" : [
		            {"id":"WLDW01", "groupid":"KSBM",  "rowindex" :5, "title":"客户编码"},
		            {"id":"WLDWMC", "groupid":"KSMC",  "rowindex" :5, "title":"客户名称"},
		            {"id":"PYM",   "groupid":"PYM",  "rowindex" :5, "title":"拼音码"},		 
		            {"id":"JC",     "title":"简称","hidden":true},
		            {"id":"DZ",     "title":"地址","hidden":true},
		            {"id":"KHYH",    "title":"开户银行","hidden":true},
		            {"id":"YHZH",    "title":"银行账号","hidden":true},
		            {"id":"SWDJH",   "groupid":"SWDJH",  "rowindex" :5, "title":"税务登记号"},
		            {"id":"CJBM",      "title":"工程厂家编码","hidden":true},
		            {"id":"FXCJBM",      "title":"分销厂家编码","hidden":true},
		            {"id":"JXSDH",      "title":"经销商电话","hidden":true},
		            {"id":"LXDH",     "title":"联系电话","hidden":true},
		            {"id":"LXR",     "title":"联系人","hidden":true},
		            {"id":"SHDZ",      "title":"送货地址","hidden":true},
		            {"id":"YZBM",  "title":"邮政编码","hidden":true},
		            {"id":"CZHM",    "title":"传真号码","hidden":true},
		            {"id":"SMTP",     "title":"电子邮箱","hidden":true},
		            {"id":"SFZH",     "title":"身份证号","hidden":true},
		            {"id":"FXZQ",    "title":"分销账期","hidden":true},
		            {"id":"YFZQ",   "title":"延付帐期","hidden":true},
		            {"id":"JSBZ",    "title":"结算币种","hidden":true},
		            {"id":"ZFFS",     "title":"支付方式","hidden":true},
		            {"id":"YFJZFS",   "title":"延付记账方式","hidden":true},
		            {"id":"JGGK01",    "title":"价格管控","hidden":true},
		            {"id":"EDKZ",      "title":"额度控制","hidden":true},
		            {"id":"ZDSK",      "title":"自动收款","hidden":true},	
		            {"id":"YFZDSK",      "title":"延付结算自动收款","hidden":true},	
		            {"id":"FPLX",     "title":"发票类型","hidden":true},
		            {"id":"FLKPFS",  "title":"返利开票方式","hidden":true},
		            {"id":"KPHT",    "title":"开票户头","hidden":true},
		            {"id":"FRDB",    "title":"法人代表","hidden":true},
		            {"id":"HY",     "title":"行业","hidden":true},
		            {"id":"KSLX",   "groupid":"KSLX",  "rowindex" :5, "title":"客户类型"},
		            {"id":"YWY",   "title":"对应业务员","hidden":true},
		            {"id":"SJKS",    "title":"上级客户","hidden":true},
		            {"id":"QY",    "title":"区域","hidden":true},	         
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
	         			      "click":function(thisPlugin,rowIndex){//参数data为点击的值，是个json对象
	         			    	  	var CDS = defineKHXX.getCds("CDS");
	         			    	  	CDS.edit();
		         					if(defineKHXX.getPluginObj("DWLB").getData().key==1){
		         					    defineKHXX.getPluginObj("JGGK01").disabled(false);
		         					    defineKHXX.getPluginObj("EDKZ01").disabled(false);
		         					}
		         					if (thisPlugin.data[rowIndex].ZDSK.length == 0){
		         						defineKHXX.getTab().find("[name='emZFFS']").hide(); 
		         					}else{
		         						defineKHXX.getTab().find("[name='emZFFS']").show(); 
		         					} 
		         					defineKHXX.getTab().find("[data-id='KSXX']").attr("class","xuan");
		         					defineKHXX.getTab().find("[id='KSXX']").attr("style","");
		         			/*		defineKHXX.getTab().find("[data-id='PLDR']").attr("class","");
		         					defineKHXX.getTab().find("[id='PLDR']").attr("style","display: none;");*/
		         					defineKHXX.getTab().find("[data-id='LXFS']").attr("class","");
		         					defineKHXX.getTab().find("[id='LXFS']").attr("style","display: none;"); 
		         					defineKHXX.getTab().find("[data-id='ZFXX']").attr("class","");
		         					defineKHXX.getTab().find("[id='ZFXX']").attr("style","display: none;"); 
		         					defineKHXX.getTab().find("[data-id='QTXX']").attr("class","");
		         					defineKHXX.getTab().find("[id='QTXX']").attr("style","display: none;"); 
		         					
				        			/*defineKHXX.getTab().find("[id='PLDR']").hide();
		         					defineKHXX.getTab().find("[data-id='PLDR']").hide();*/
	        			       }
						}
					}
		]	
	}
});

defineKHXX.setEvent([
	{
		"selector": "[name='WLDWMC']",
		"event": "keyup",
		"func": function(data,event){
			var WLDWMC=defineKHXX.getTab().find("input[name='WLDWMC']").val();
		//	defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC));
			if (JL.convertToPinYin(WLDWMC).length>0){
				defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC)[JL.convertToPinYin(WLDWMC).length-1]); 
			}else{
				defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC)); 
			}
		}
	},
	{
		"selector": "#search",
		"event": "click",
		"func": function(){
			defineKHXX.query();
		
		}
	},
	{
		"selector": "[data-id='KSXX']",
		"event": "click",
		"func": function(){
			defineKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	},
	{
		"selector": "[data-id='LXFS']",
		"event": "click",
		"func": function(){
			defineKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	},
	{
		"selector": "[data-id='ZFXX']",
		"event": "click",
		"func": function(){
			defineKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	},
	{
		"selector": "[data-id='QTXX']",
		"event": "click",
		"func": function(){
			defineKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	}/*,
	{
		"selector": "[data-id='PLDR']",
		"event": "click",
		"func": function(){
			defineKHXX.getTab().find("[id='jlSaveCard']").hide();
		}
	}*/
]);

defineKHXX.setAfterInit(function() {
	JL.tab(defineKHXX, {
		"KSXX": "基础信息",
		"LXFS": "联系方式",
		"ZFXX": "支付信息",
		"QTXX": "其他信息"/*,
		"PLDR": "批量导入"*/
	});
	
	defineKHXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);// 公司信息
	defineKHXX.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	defineKHXX.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0,2));
    //加载Grid数据事件
	defineKHXX.query();
	defineKHXX.getPluginObj("LXRLB").setAfterEdit(function(grid, id, x, y, old, edit){
		//参数grid为当前控件对象，参数id为列id名，参数x为行号，参数y为列号，参数edit当前输入项
        var datas = grid.getData();
        if(id=="LXDH"){
            var r = /^[1-9][0-9]*$/;
            if(!JL.isNull(edit) && !r.test(edit)){
                grid.setCell( "" , x, grid.getRowIndexByID("LXDH"));
                JL.tip("联系电话必须为数字！");
                return false;	
            }
        }
        // if(id=="SFZH"){
        //     var r = /^(\d{18}|\d{17}x)$/;
        //     if(!JL.isNull(edit) && !r.test(edit)){
        //         grid.setCell( "" , x, grid.getRowIndexByID("SFZH"));
        //         JL.tip("身份证号码有误，请核对！");
        //         return false;
        //     }
        // }
	});
});

defineKHXX.query = function(){
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	debugger;
	var queryField = {};
	var DMMC = defineKHXX.getTab().find("[name='DMMC']").val();
	if(!JL.isNull(DMMC)){
		queryField["DMMC"] = DMMC;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	queryField["GSXX01"] = userInfo["PCRM_GSXX01"];

	debugger;
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX1", "admin/scm/jcdy/search");
	        
	    	defineKHXX.getPluginObj("GSXX01").config.options = {};
	    	defineKHXX.getPluginObj('GSXX01').config.param = {"CZY14":"1"};
	    	defineKHXX.getPluginObj('GSXX01').init();
	    }else if (data.CZY14==2){
	    	var resultData = defineKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX2", "admin/scm/jcdy/search");
	    	
	    	defineKHXX.getPluginObj("GSXX01").config.options = {};
	    	defineKHXX.getPluginObj('GSXX01').config.param = {};
	    	defineKHXX.getPluginObj('GSXX01').init();
	    }else{
	    	var resultData = defineKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = defineKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX", "admin/scm/jcdy/search");
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineKHXX.getPluginObj("LIST").setPaging(resultData.fileName); 
};