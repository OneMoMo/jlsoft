var defineSP = JL.JLForm();
defineSP.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"cds": "CDS",
				"success": function(resultData, tip){
					debugger;
					var LIST = [];
					var CDS = defineSP.getCds("CDS");
					if(CDS.mode == "append"){
						LIST.push(resultData);
						$.merge(LIST, defineSP.getPluginObj("LIST").getData());
						defineSP.lastNew = $.extend({}, resultData);
						delete defineSP.lastNew["SPXX01"];
						delete defineSP.lastNew["SPBM"];
						delete defineSP.lastNew["jlbh"];
						delete defineSP.lastNew["JLBH"];
					}else{
						LIST = defineSP.getPluginObj("LIST").getData();
						for(var i=0; i<LIST.length; i++){
							if(LIST[i]["SPXX01"] == resultData.SPXX01){
								LIST[i] = resultData;
							} 
						}
					}
					CDS.edit();
					CDS.setData({"LIST":LIST});
					CDS.post();
					defineSP.query();
				}
			},
			"jlCancelSlide":{}
		}
	},
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
						defineSP.find("#import").show();
						defineSP.getPluginObj("EXCEL").setData([]);
						defineSP.find("dl[name='BUTTON']").hide();
						defineSP.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
					}else{
						defineSP.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
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
					  if(defineSP.find("dl[name='MESSAGE']").is(":hidden"))
					  {
						  defineSP.find("dl[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineSP.find("dl[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
//	"EXCEL" : {
//		"jlid" : "JLUpload",
//		"fileType" : [ "excel" ],
//		"listener" : {
//			"afterUpload" : function(data) {
//				debugger; 
//				var resultData = JL.getExcelData(8, data); 
//				var returnList = resultData.data.returnList;
//				defineSP.getPluginObj("GRID").setData(returnList);
//				var ajaxJson = {};
//				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineSP/excelSPXX.do";
//				ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
//				var resultData = JL.ajax(ajaxJson);
//				if (resultData.data.returnList == -1){
//					JL.tip("上传成功！");
//				}else{
//					JL.tip(resultData.data.err);
//				}
//				defineSP.query();
//			}
//		}
//	},
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"loadFile" : function(data) {
				debugger; 
				var resultData = JL.getExcelData(8, data); 
				//var returnList = resultData.data.returnList;
				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineSP/excelSPXX.do";
				ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
				var resultData = JL.ajax(ajaxJson);
			//	alert(JSON.stringify(resultData["data"]["returnList"]));
				errorResultData = resultData["data"]["returnList"];
			//	returnData = resultData["data"]["returnData"];
//				if(returnData.length>0){ 
//					defineSP.getPluginObj("GRID").setData(returnData);
//				} 
//				
				if(errorResultData != -1){
					console.info("error");
					defineSP.find("dl[name='BUTTON']").show();
					defineSP.getPluginObj("MESSAGE").setData(errorResultData);
					JL.tip("导入失败！","info");
					return ture;
				}else{
					JL.tip("上传成功！");
					defineSP.find("dl[name='BUTTON']").hide();
					defineSP.query();
				}
			}
		}
	},
	 "MESSAGE": {
		  "jlid"    : "JLGrid",
		  "tittles" : "错误信息列表",
		  "headers" : [
		       {"id" : "NUM", "name" : "EXCEL行号", "width" : 100},
	           {"id" : "ERROR",   "name" : "错误信息", "width" : 800}
	       ]
	  },
	  
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"GLCM": {
		"jlid": "JLCheckbox",
		"options": {"1":"管理串码"}
	},
	"YXZT": {
		"jlid": "JLMultiSelect",
		"placeholder": "请选择有效标记",
		"options": {"1":"有效","2":"不允许进货和预售","0":"不允许进货和销售"}
	},
    "SX": {
    	"jlid": "JLCheckbox",
		"cds":"CDS",
		"cds-field": "LIST.SX",
		"options": {"1":"管理串码","2":"管理批号","4":"串货商品","3":"补差商品"}
	},
	"XJJ": {
    	"jlid": "JLCheckbox",
		"cds":"CDS",
		"cds-field": "LIST.XJJ",
		//"default":"1", 
		"options": {"1":"限价"}
	},
	"BMLB": {
		"jlid": "JLSelect",
		"default" : "1",
		"cds":"CDS",
		"cds-field": "LIST.BMLB",
		"noremove":true,
		"options": {"3":"自编码"},
		"default":"3",
		"readonly":true,
		"listener": {
			"change":function(data){
//		       	if(data.key==0||data.key==2){
//		      		defineSP.getTab().find("input[name='SPBM']").attr("disabled","disabled");
//		       	} else{
//		        	defineSP.getTab().find("input[name='SPBM']").removeAttr("disabled");
//		        }
		    }
		}
	},
	"SPXZ" : {
		"jlid": "JLSelect",
		"default" : "0",
		"cds":"CDS",
		"cds-field":"LIST.SPXZ",
		"noremove":true,
		"options": {"0":"全属性","1":"商品","2":"配件","3":"赠品"}
	},
	"SPBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SPBM",	
		 "readonly":true,
		 "format":{
			 "null": true
		 }
	},
	"XXSL" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.XXSL",	
		 "format":{
			 "null": true,
			 "phone": false,
			 "number": true
		 }
			 
	},
	"WBQ" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.WBQ",	
		 "format":{
		 }
			 
	},
	"SPGG" : {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.SPGG",	
		"format":{}
	},
	//商品型号
	"SPXH" : {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.SPXH",
		"format":{},
	"listener":{
		"blur": function(){
			debugger;
			defineSP.formatSPMC();
		}
	}
	},
	"SCCJ" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SCCJ",	
		 "format":{
		 }
			 
	},
	"CJHH" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CJHH",
		 "maxlength":16,
		 "format":{
		 }
	},
	"CMT" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CMT",	
		 "format":{
		 }
			 
	},
	"BZQ" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.BZQ",	
		 "format":{
		 }
			 
	},
	"ZL" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.ZL",	
		 "format":{
		 }
			 
	},
	"DBZDW" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "placeholder":"单位",
		 "cds-field":"LIST.DBZDW",	
		 "format":{
		 }
			 
	},
	"DBZSL" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.DBZSL",	
		 "placeholder":"数量",
		 "format":{
		 }
			 
	},
	"ZBZDW" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.ZBZDW",	
		 "placeholder":"单位",
		 "format":{
		 }
			 
	},
	"ZBZSL" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.ZBZSL",	
		 "placeholder":"数量",
		 "format":{
		 }
			 
	},
	"CLDW" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CLDW",	
		 "placeholder":"单位",
		 "format":{
		 }
			 
	},
	"CLSL" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CLSL",	
		 "placeholder":"数量",
		 "format":{
		 }
	},
	"JLDW" : {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.JLDW",
		 "format":{
		 },
		 "listener": {
			 "blur":function(data){  
	        	if(!JL.isNull(data)){
	        		var DBZDW=defineSP.getTab().find("input[name='DBZDW']").val(); 
	            	var ZBZDW=defineSP.getTab().find("input[name='ZBZDW']").val();
	            	var CLDW=defineSP.getTab().find("input[name='CLDW']").val();
		        	if(data==DBZDW || data == ZBZDW || data==CLDW){
		        		 JL.tip("单位之间不能相同");
		        		 defineSP.getPluginObj("JLDW").setData("");
		         	}
	        	}
	        } 
	 	}
 	},
	"SPMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SPMC",	
		 "format":{
			 
		 }
	},
	"SPMCC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "readonly":true,
		 "cds-field":"LIST.SPMCC",	
		 "format":{
			 
		 }
	},
	"TJ" : {
		"jlid": "JLInput",
		//"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.TJ",
		"format": {
			"null": true,
			"phone": false,
			"number": true
		}
	},
	"C": {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.C",
		"format": {
			"null": true,
			"phone": false,
			"number": true
		},
		"listener": {
			"blur":function(data){ 
        		var K=defineSP.getTab().find("[name='K']").val(); 	
        		var G=defineSP.getTab().find("[name='G']").val();
        		if(K!=""&&G!=""&&data!=""){
	        		 var T=(K*1)*(G*1)*(data*1)/1000000;
	        		 defineSP.getPluginObj("TJ").setData(T);
	        	}
	        } 
		}
	},
	"K" : {
	"jlid": "JLInput",
	"cds":"CDS",
	"cds-field":"LIST.K",
	"format": {
	"null": true,
	"phone": false,
	"number": true
	},
	"listener": {
        "blur":function(data){ 
        	 var C=defineSP.getTab().find("[name='C']").val(); 	
        	 var G=defineSP.getTab().find("[name='G']").val();
        	 if(C!=""&&G!=""&&data!="")
        	{
        		 var T=(C*1)*(G*1)*(data*1)/1000000;
        		 defineSP.getPluginObj("TJ").setData(T);
        	}
        } 
	}
	}, 
	"G" : {
	"jlid": "JLInput",
	"cds":"CDS",
	"cds-field":"LIST.G",	
	"format": {
	"null": true,
	"phone": false,
	"number": true
	},
	"listener": {
        "blur":function(data){ 
        	 var K=defineSP.getTab().find("[name='K']").val(); 	
        	 var C=defineSP.getTab().find("[name='C']").val();
        	 if(K!=""&&C!=""&&data!="")
        	{
        		 var T=(K*1)*(C*1)*(data*1)/1000000;
        		 defineSP.getPluginObj("TJ").setData(T);
        	}
        } 
	}
	},
	"SPPP01" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.SPPP01",
		"format": {
					"null": true,
					"phone": false,
					"number": true
				}
			},	
		"SPXX01" : {
			"jlid": "JLInput",
			"readonly": true,
			"cds":"CDS",
			 "cds-field":"LIST.SPXX01",
			"format": {
						"null": true,
						"phone": false,
						"number": true
					}
				},
		"GSXX01" : {
			"jlid": "JLInput",
			"readonly": true,
			"cds":"CDS",
			 "cds-field":"LIST.GSXX01",
			"format": {
						"null": true,
						"phone": false,
						"number": true
					}
				},	
			//商品品牌名称	
		"SPPPMC" : {
		 "jlid": "JLInput",
		 "readonly":true,
		 "cds":"CDS",
		 "cds-field":"LIST.SPPPMC",	
		 "format":{
			 
		 },
		"dir" : "scm/pub/search",
	    "namespace" : "SPPP",
	    "placeholder":"点击查找品牌",
	    "sqlid" : "ALL",
		"init": {"GSXX01":"GSXX01"},    
		"fieldMapping" : {
			"SPPPMC":"SPPPMC",
			"SPPP01":"SPPP01"	
			},
		"listener":{
			"aftercallback": function(data){
				debugger;
				if(!JL.isNull(data)){
				defineSP.formatSPMC();
			}
			}
		}
	},
	//颜色
	"SX01":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX01",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX01",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
				debugger;
				defineSP.formatSPMC();
			}
		}
	},
	"SX02":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX02",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX02",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(data){
				
			}
		}
	},
	"SX03":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX03",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX03",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	"SX04":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX04",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX04",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	"SX05":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX05",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX05",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	"SX06":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX06",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX06",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	//机身内存
	"SX07":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX07",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX07",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		  "listener":{
				"click": function(){
					debugger;
					defineSP.formatSPMC();
				}
			}
	},
	"SX08":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX08",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX08",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	//单双卡
	"SX09":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX09",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX09",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		  "listener":{
				"click": function(){
					debugger;
					defineSP.formatSPMC();
				}
			}
	},
	"SX10":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		//"default":"auto",
		"cds-field": "LIST.SX10",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.SX10",
		  "resource": "scmform",
		//  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){
			}
		}
	},
	//商品分类
	"SPFL" : {
		"jlid": "JLMultiTree",
		"cds":"CDS",
		"cds-field":"LIST.SPFL",
		"selectMode": "all",
		"sqlid":"JLPub.select_ALLSPFL",
		"resource":"form",
		"clickLoad":false,
		"jbToAll" :1,
		"single":true,
		"last":true,
		"param" : {},
	"listener":{
		"change": function(){
			debugger;
			//defineSP.formatSPMC();
		},
		"click":function(){
			defineSP.formatSPMC();
		}
	}
		/*"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.SPFL01",
		"format": {
			"null": true,
			"phone": false,
			"number": true
		}*/
	},
	/*"SPFLMC" : {
		"jlid": "JLInput",
		"readonly":true,
		"placeholder":"点击查找分类",
		"cds":"CDS",
		"cds-field":"LIST.SPFLMC",	
		"format":{
		},
		"dir" : "scm/pub/search",
		"namespace" : "SPFL",
		"sqlid" : "ALL",
		// "radio":true,
		"init": {"GSXX01":"GSXX01"},    
		"fieldMapping" : {
			"SPFLMC":"SPFLMC",
			"SPFL01":"SPFL01"	
		}
	},*/
	"YXBJ" : {
		"jlid": "JLRadio",
		"default" : "1",
		"cds":"CDS",
		"cds-field":"LIST.YXBJ",
		"options": [
		    {"key":"1","value":"有效"},
		    {"key":"2","value":"不允许进货和预售"},
		    {"key":"0","value":"不允许进货和销售"}
		]
	},
	"TS_S" : {
		 "jlid": "JLDate"
	},
	"TS_E" : {
		 "jlid": "JLDate"
	},
	"LIST" : {
		"jlid": "JLLayoutGrid",
		"cds": "CDS",
		"paging": "more",
		"multi": false,
		"rowclass": "pl10",
		"buttons": {
			"jlNew": {
				"listener": {
					"click": function(obj, thisPlugin){
						debugger;
						defineSP.getPluginObj("SPBM").disabled(true);
						defineSP.getPluginObj("SX").disabled(false);
						/*if(!JL.isNull(defineSP.lastNew)){
							$.each(defineSP.lastNew, function(key, value){
								var pluginObj = defineSP.getPluginObj(key);
								if(!JL.isNull(pluginObj)){
									///pluginObj.setData(value);
									console.info("111");
								}
							});
						}else{*/
							//defineSP.getPluginObj("BMLB").setData({"key":"2", "value":"流水码"}); 
							//defineSP.getPluginObj("SX").setData([{"key":"5", "value":"限价"}]); 
							defineSP.getPluginObj("XXSL").setData("0"); 
							defineSP.getPluginObj("XJJ").setData("1");
						/*}*/
					}
				}
			},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义商品信息模板",{
						"GLCM":"管理串码-GLCM填写0或1 0：否 1：是",
						"GLPH":"管理批号-GLPH填写0或1 0：否 1：是",
						"BCSP":"补差商品-BCSP填写0或1 0：否 1：是",
						"TSSP":"串货商品-TSSP填写0或1  0：否 1：是",
						"XJJ":"限价-XJJ填写0或1 0：否 1：是",
						"SPBM":"*商品编码-SPBM填写字符串",
						"SPMC":"*商品名称-SPMC填写字符串",
						"SPPP01":"*品牌编码-SPPP01填写品牌编码",
						"SPFL01":"*商品分类代码-SPFL01填写商品分类编码",
						"JLDW":"*计量单位-JLDW填写字符串",
						"XXSL":"*销项税率-XXSL必须为数字",
						"YXBJ":"*有效标记-YXBJ(0：不允许进货和销售；1：有效；2：不允许进货和预售)",
						"SPGG":"规格-SPGG填写字符串",
						"SPXH":"型号-SPXH填写字符串",
						"SCCJ":"生产厂家-SCCJ填写字符串",
						"CJHH":"厂家货号-CJHH填写字符串",
						"CMT":"串码头-CMT填写字符串",
						"BZQ":"保质期(月)-BZQ填写字符串",
						"SPXZ":"商品性质-SPXZ0:全属性 1：商品2:配件 3:赠品",
						"WBQ":"维保期(天)-WBQ填写字符串",
						"SX01":"颜色-SX01填写颜色代码 从ZDYITEM表取",
						"SX02":"主屏尺寸-SX02填写主屏尺寸代码 从ZDYITEM表取",
						"SX03":"主屏分辨率-SX03填写主屏分辨率代码 从ZDYITEM表取",
						"SX04":"摄像头像素-SX04填写摄像头像素代码 从ZDYITEM表取",
						"SX05":"电池容量-SX05填写电池容量代码 从ZDYITEM表取",
						"SX06":"CPU核心数-SX06填写CPU核心数代码 从ZDYITEM表取",
						"SX07":"机身内存-SX07填写机身内存代码 从ZDYITEM表取",
						"SX08":"运行内存-SX08填写运行内存代码 从ZDYITEM表取",
						"SX09":"单双卡-SX09填写单双卡代码 从ZDYITEM表取",
						"SX10":"是否支持扩展-SX10填写是否支持扩展代码 从ZDYITEM表取",
						"ZL":"重量-ZL填写字符串",
						"C":"长-C填写字符串",
						"K":"宽-K填写字符串",
						"G":"高-G填写字符串",
						"TJ":"体积-TJ根据长*宽*高计算填写",
						"DBZDW":"大包装单位-DBZDW填写字符串 不能与中包装、拆零一样",
						"DBZSL":"大包装数量-DBZSL填写字符串",
						"ZBZDW":"中包装单位-ZBZDW填写字符串  不能与大包装、拆零一样",
						"ZBZSL":"中包装数量-ZBZSL填写字符串",
						"CLDW":"拆零单位-CLDW填写字符串 不能与大包装、中包装一样",
						"CLSL":"拆零数量-CLSL填写字符串"
			    	});
				}	
		}
	    },
        "title": [
            {"id":"SPXX", "name":"<span class='w04 tr pr20'>商品编码</span><span class='w08'>商品名称</span>", "width":"w04"},
            {"id":"SPPPMC", "name":"品牌", "width":"w01 tc pr0"},
            {"id":"SPFLMC", "name":"商品分类", "width":"w02 tc pr0"},
            {"id":"JLDW", "name":"计量单位", "width":"w01 tc pr0"},
            {"id":"YXBJ", "name":"状态", "width":"w02 tc pr0"},
            {"id":"GLCM", "name":"管理串码", "width":"w01 tc pr0"},
            {"id":"CZ", "name":"操作", "width":"w01 tc pr0"}
	    ],
	    "header" : [
	        {"id":"SPBM", "groupid":"SPXX", "rowindex":1,"title":"商品编码", "css":"mr0 w04 tr pr20"},
	        {"id":"SPMC", "groupid":"SPXX", "rowindex":1,"title":"商品名称", "css":"mr0 w08 text_hide"},
		  //  {"id":"BMLB", "groupid":"SPBM", "rowindex":4, "name":"编码类别","hidden":true},
		    {"id":"SPXZ", "groupid":"SPBM", "rowindex":4, "name":"商品性质","hidden":true},
		    {"id":"SX", "groupid":"SPBM", "rowindex":4, "name":"","hidden":true},
		    {"id":"TJ", "groupid":"SPBM", "rowindex":4, "name":"","hidden":true},
		    {"id":"C", "groupid":"SPBM", "rowindex":4, "name":"","hidden":true},
		    {"id":"K", "groupid":"SPBM", "rowindex":4, "name":"","hidden":true},
		    {"id":"G", "groupid":"SPBM", "rowindex":4, "name":"","hidden":true},
		    {"id":"SPPPMC", "groupid":"SPPPMC", "rowindex":1,"title":"品牌", "css":"mr0 w12 text_hide"},
		    {"id":"SPPP01","title":"品牌编码","hidden":true},
		    {"id":"GSXX01","title":"公司信息","hidden":true},
		    {"id":"SPXX01","title":"商品内码","hidden":true},
		    {"id":"CLSL","title":"数量","hidden":true},
		    {"id":"CLDW","title":"拆零单位","hidden":true},
		    {"id":"ZBZSL","title":"数量","hidden":true},
		    {"id":"ZBZDW","title":"中包装单位","hidden":true},
		    {"id":"DBZSL","title":"数量","hidden":true},
		    {"id":"DBZDW","title":"大包装单位","hidden":true},
		    {"id":"ZL","title":"重量","hidden":true},
		    {"id":"BZQ","title":"保质期","hidden":true},
		    {"id":"WBQ","title":"维保期","hidden":true},
		    {"id":"CMT","title":"串码头","hidden":true},
		    {"id":"CJHH","title":"厂家货号","hidden":true},
		    {"id":"SCCJ","title":"生产厂家","hidden":true},
		    {"id":"SPXH","title":"型号","hidden":true},
		    {"id":"SPGG","title":"规格","hidden":true},
		    {"id":"XXSL","title":"销项税率","hidden":true},
		    {"id":"SPFLMC", "groupid":"SPFLMC", "rowindex":1, "title":"商品分类", "css":"mr0 w12 text_hide"},
		    {"id":"SPFL01","title":"商品分类代码","hidden":true},
		    {"id":"SX001","title":"颜色","hidden":true},
		    {"id":"SX009","title":"单双卡","hidden":true},
		    {"id":"SX007","title":"机身内存","hidden":true},
		    {"id":"JLDW", "groupid":"JLDW", "rowindex":1,"title":"计量单位", "css":"mr0 w12 text_hide"}, 
		    {"id":"YXBJ", "groupid":"YXBJ", "rowindex":1, "title":"有效", "css":"mr0 w12 "}, 
		    {"id":"GLCM", "groupid":"GLCM", "rowindex":1, "title":"管理串码", "editor":"plugin", "css":"w12", 
		    	"config": {
		    		"jlid":"JLCheckbox",
		    		"css":"fr w07",
		    		"options": {
		    			"1":""
		    		}
		    	}
		    }, 
		    {"id":"edit", "groupid":"CZ", "rowindex":1,"css":"mr0", "title":"编辑", "editor":"JLEdit", 
		    	"config":{
		    		"readonly": ["SPBM"],
		    		"mapping":{},
		    		"confirm": "此商品信息有库存，是否要修改"
		    	},
			    "listener": {
			    	"click": function(){
			    		debugger;
			    		
			    		defineSP.getTab().find(".jl_tab_title li:first").click();
			    		defineSP.getTab().find("input[name='SPBM']").attr("disabled","disabled");
			    		defineSP.getPluginObj("SPMC").disabled(false);
			    		defineSP.getPluginObj("BMLB").disabled(true);
			    		defineSP.getPluginObj("SX").disabled(false);
			    		//defineSP.getPluginObj("SPMC");
			    	},
			    	"ok": function(thisPlugin, rowIndex) {
			    		debugger;
			    		defineSP.getPluginObj("SX").disabled(true);
			    		//var SPMC=defineSP.getPluginObj("SPMC").getData();
			    		defineSP.getPluginObj("SPMCC").setData(thisPlugin.data[rowIndex].SPMC);
			    	},
			    	"edit": function(thisPlugin, rowIndex) {
			    	    debugger;
			    		//var SPMC=defineSP.getPluginObj("SPMC").getData();
			    		defineSP.getPluginObj("SPMCC").setData(thisPlugin.data[rowIndex].SPMC);
			    	},
			    	"confirm": function(thisPlugin, rowIndex) {
			    		debugger;
			    		var query={};
				    	query["SPXX01"]=thisPlugin.getData(rowIndex,"SPXX01");
				    	var resultData = defineSP.getSqlResult(query, "SPXX", "CKSP_SPJGB", "scm/pub/search");
				         
				    	var a = false; 
				    	if(!JL.isNull(query.SPXX01) && !JL.isNull(resultData.data)){
				    		a =  true;
				    	}
	                    return a;
			    	}
			    }
		    }
	    ],
	    "listener": {
	    	"loadRow": function(thisPlugin, data, rowIndex, dl){
	    		defineSP.getPluginObj("LIST").disabledRowData(rowIndex, true);
	    	}
	    }
	}
});

defineSP.setEvent([{
	"selector" : ["[name=DBZDW]"],
	"event": "blur",
	"func": function(){
		var DBZDW=defineSP.getTab().find("input[name='DBZDW']").val();
    	if(!JL.isNull(DBZDW)){
    		var JLDW=defineSP.getPluginObj("JLDW").getData();
    		var ZBZDW=defineSP.getTab().find("input[name='ZBZDW']").val(); 
        	var CLDW=defineSP.getTab().find("input[name='CLDW']").val();
	    	if(JLDW==DBZDW || ZBZDW==DBZDW || CLDW==DBZDW){
	    		 JL.tip("单位之间不能相同");
	    		 defineSP.getTab().find("input[name='DBZDW']").val("");
	     	}
		}
    }
},{
	"selector" : ["[name=ZBZDW]"],
	"event": "blur",
	"func": function(){
		var ZBZDW=defineSP.getTab().find("input[name='ZBZDW']").val();
    	if(!JL.isNull(ZBZDW)){
    		var JLDW=defineSP.getPluginObj("JLDW").getData();
    		var DBZDW=defineSP.getTab().find("input[name='DBZDW']").val(); 
        	var CLDW=defineSP.getTab().find("input[name='CLDW']").val();
	    	if(JLDW==ZBZDW || DBZDW==ZBZDW || CLDW==ZBZDW){
	    		 JL.tip("单位之间不能相同");
	    		 defineSP.getTab().find("input[name='ZBZDW']").val("");
	     	}
		}
	}
},{
	"selector" : ["[name=CLDW]"],
	"event": "blur",
	"func": function(){
    	var CLDW=defineSP.getTab().find("input[name='CLDW']").val();
    	if(!JL.isNull(CLDW)){
    		var JLDW=defineSP.getPluginObj("JLDW").getData();
    		var DBZDW=defineSP.getTab().find("input[name='DBZDW']").val(); 
        	var ZBZDW=defineSP.getTab().find("input[name='ZBZDW']").val();
	    	if(JLDW==CLDW || DBZDW==CLDW || ZBZDW==CLDW){
	    		 JL.tip("单位之间不能相同");
	    		 defineSP.getTab().find("input[name='CLDW']").val("");
	     	}
		}
	}
},{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineSP.query();
	}

},
{
	"selector": "[data-id='DR']",
	"event": "click",
	"func": function(){
		defineSP.getTab().find("[id='jlSaveCard']").hide();
		}
	},
	{
		"selector": "[data-id='TJBZ']",
		"event": "click",
		"func": function(){
			defineSP.getTab().find("[id='jlSaveCard']").show();
			}
		},
	{
		"selector": "[data-id='QTXX']",
		"event": "click",
		"func": function(){
			defineSP.getTab().find("[id='jlSaveCard']").show();
			}
		},
		{
			"selector": "[data-id='JCXX']",
			"event": "click",
			"func": function(){
				defineSP.getTab().find("[id='jlSaveCard']").show();
				}
			},
			{
				"selector": "#jlCancelSlide",
				"event":"click",
				"func":function(){
					defineSP.find("li[name='MESSAGE']").hide();
				}
			},
			{
				"selector": "[data-id='DR']",
				"event": "click",
				"func": function(){
					defineSP.getTab().find("[id='jlSaveCard']").hide();
					defineSP.getTab().find("[name='BUTTON']").hide();
					
				}
			},

]);



defineSP.setAfterInit(function() {
	JL.tab(defineSP, {
		"JCXX": "基础信息",
		"QTXX": "其他信息",
		"TJBZ": "体积、包装"
	});
	defineSP.query();
});

defineSP.query = function(){
	var queryField = {};
	var value = defineSP.getTab().find("[name='query']").val();
	if(!JL.isNull(value)){
		queryField["query"] = value;
	}
	var GLCM = defineSP.getPluginObj("GLCM").getData();
	if(!JL.isNull(GLCM) && GLCM.length > 0){
		queryField["GLCM"] = 1;
	//}else{
	//	queryField["GLCM"] = 0;
	}
	var YXZT = defineSP.getPluginObj("YXZT").getData();
	if(!JL.isNull(YXZT) && YXZT.length > 0){
		queryField["YXBJ"] = [];
		for(var i=0; i<YXZT.length; i++){
			queryField["YXBJ"].push(YXZT[i]["key"].toString());
		}
	}
	var resultData = defineSP.getSqlResult(queryField, "MONGO_SP", "SCM_SP", "scm/projects/tecno/fygl/search");
	console.info(resultData.data);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineSP.getPluginObj("LIST").setPaging(resultData.fileName); 
};

defineSP.formatSPMC = function(){
//	var jlbh = defineSP.getPluginObj("jlbh").getData();
//	if(JL.isNull(jlbh) || jlbh < 1){
		
		debugger;
		var value = defineSP.getPluginObj("SPMCC").getData();
		if(defineSP.getPluginObj("SPFL").getData().length!=0){
			var SPFL = defineSP.getPluginObj("SPFL").getData()[0].value;
			value +=SPFL;
		};
		if(defineSP.getPluginObj("SPPPMC").getData().length != 0){
			var PPMC = defineSP.getPluginObj("SPPPMC").getData();
			value +="-"+PPMC;
		}
		if(defineSP.getPluginObj("SPXH").getData().length != 0){
			var SPXH = defineSP.getPluginObj("SPXH").getData();
			value +="-"+ SPXH;
		}
		if(!JL.isNull(defineSP.getPluginObj("SX01").getData())){
			var SX01 = defineSP.getPluginObj("SX01").getData().value;
			value +="-"+ SX01;
		};
		if(!JL.isNull(defineSP.getPluginObj("SX07").getData())){
			var SX07 = defineSP.getPluginObj("SX07").getData().value;
			value +="-"+ SX07;
		};
		if(!JL.isNull(defineSP.getPluginObj("SX09").getData())){
			var SX09 = defineSP.getPluginObj("SX09").getData().value;
			value +="-"+ SX09;
		}
		/*var a = "";
		var b = "";
		var c = "";
		var d = "";
		var e = "";
		var f = "";
		if(!JL.isNull(PPMC)){
			a += "-" + PPMC;
		}
		if(!JL.isNull(SPXH)){
			b += "-" + SPXH;
		}
		if(!JL.isNull(defineSP.getPluginObj("SX07").getData())){
			c +="-" + SX07;
		}
		if(!JL.isNull(defineSP.getPluginObj("SX01").getData())){
			d +="-" + SX01;
		}
		if(!JL.isNull(defineSP.getPluginObj("SX09").getData())){
			e +="-" + SX09;
		}
		if(defineSP.getPluginObj("SPFL").getData().length!=0){
			f +=SPFL;
		};*/
		
		//value =SPMC+SPFL+PPMC+SPXH+SX01+SX07+SX09;
		if(defineSP.getPluginObj("SPMC").getData().indexOf(value) != 0){
			defineSP.getPluginObj("SPMC").setData(value);
		}
	};

