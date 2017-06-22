 var defineRY = JL.JLForm();

defineRY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(data){
					console.info(data);
				},
				"success":function(data,tip){
					console.info('success');
					defineRY.query();
				}
			}, 
			"jlCancelSlide":{}
		} 
	},
	
	"SSBM":{
		"jlid" : "JLMultiTree",
		"sqlid" : "PUBCX.TREE_BM",
		"resource" : "scmform",
		"placeholder": "请选择所属部门"
	},
	"CXRYJS":{
		"jlid": "JLMultiSelect",
		"cds": "CDS",
		"cds-field": "LIST.RYJS",
		"placeholder": "请选择人员角色",
		"options": {"3":"销售员","2":"采购员","9":"导购员","4":"收银员","8":"售后人员","5":"财务人员","6":"保管员","1":"管理人员"},
	},
	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					debugger;
					console.info(this);
					var type = $(this).text();
					if(type == "批量导入"){
						defineRY.find("#import").show();
						defineRY.getPluginObj("EXCEL").setData([]);
						defineRY.find("dl[name='BUTTON']").hide();
						defineRY.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
						
					}else{
						defineRY.find("#import").hide();
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
					  if(defineRY.find("dl[name='MESSAGE']").is(":hidden"))
					  {
						  defineRY.find("dl[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineRY.find("dl[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	"EXCEL" : {
			"jlid" : "JLUpload",
			"fileType" : [ "excel" ],
			"listener" : {
				"loadFile" : function(data) {
					debugger; 
					var resultData = JL.getExcelData(29, data); 
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/excelRY.do";
					ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
					var resultData = JL.ajax(ajaxJson);
					errorResultData = resultData["data"]["returnList"];
					console.info(errorResultData);
					debugger;
					if(errorResultData != -1){
						console.info("error");
						defineRY.find("dl[name='BUTTON']").show();
						defineRY.getPluginObj("MESSAGE").setData(errorResultData);
						JL.tip("上传失败！");
						return true;
					}else{
						JL.tip("上传成功！");
						defineRY.find("dl[name='BUTTON']").hide();
						defineRY.query();
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
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewCard": {
				"readonly": [],
				"click":function(){
					 defineRY.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
				}
			}
		}
	},
	"RYXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.RYXX01",
		"format": {
		}
	}, 
	"RYMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.RYMC",
		"format": {
			"null" : false
		}
	},
	"LXDH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.LXDH",
		"format": {
			"number": true,
			"null": false
		}
	},
	"SFZH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.SFZH",
		"format": {
		}
	},
	"YHKH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YHKH",
		"format": {
		}
	},
	"XSFS":{
		"jlid" : "JLSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_QXXSFS.do", 
		"cds": "CDS",
	    "cds-field": "LIST.XSFS",
	    "multi" : false,
		"param" : {},
		"readonly":false,
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"SKFS":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_QXSKFS.do", 
		"cds": "CDS",
	    "cds-field": "LIST.SKFS",
		"param" : {},
		"multi" : false,
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"DLMM":{
		"jlid": "JLInput",
		"type": "password",
		"cds": "CDS", 
		"cds-field": "LIST.DLMM",
		"placeholder": "6~20位英文字母和数字", 
		"format": {
		}
	},
	"OLDDLMM":{
		"jlid": "JLInput",
		"type": "password",
		"cds": "CDS", 
		"cds-field": "LIST.OLDDLMM", 
		"format": {
		}
	},
	"GZBM":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.GZBM",
		 "sqlid": "RYXX.GZBM",
		 "resource": "scmform",
		// "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		 "listener":{
				"click": function(data){
					debugger;
					if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
						defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
						defineRY.getTab().find("[id='RYXX']").attr("style",""); 
						defineRY.getTab().find("[data-id='QTXX']").attr("class","");
						defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
						defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
						defineRY.getPluginObj("PPFL").setData();
	 					JL.tip("请先选择所属公司！");
	 					
					}
					
					debugger;
					var RYJS=defineRY.getPluginObj("RYJS").getData();
					var GZBM=null;
					if(defineRY.getPluginObj("GZBM").getData() !=null){
					GZBM=defineRY.getPluginObj("GZBM").getData();
 					if(!JL.isNull(GZBM.key)){
 					if(RYJS.length>0){
 					for(var i=0;i<RYJS.length;i++){
 						var key=RYJS[i]["key"];
 						if(key==9){
 							var SSGS=defineRY.getPluginObj("SSGS").getData();
 							var query={};
 							query["BM01"] =GZBM.key;
 							query["GSXX01"] = SSGS.key;
 							var resultData = defineRY.getSqlResult(query, "RYXX", "GZBM", "admin/scm/jcdy/search");
 							var BM06=resultData.data[0]["BM06"];
 							if(BM06!=3){
 								JL.tip("人员角色为导购员时工作部门应选销售部门");
 								defineRY.getPluginObj("GZBM").setData([]);
 								}
 							}
 						}
 					}
 				}
					}
			}
		}
	},
	"SSGS" : {
		  "jlid": "JLSelect",
		  "cds": "CDS", 
		  "cds-field": "LIST.SSGS",
		  "sqlid":"RYXX.JTXX",
		  "resource": "scmform",
		  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		  "listener": { 
			  "click": function(){
			  },
			  "change": function(data){
				  debugger;
				  var data = defineRY.getPluginObj("SSGS").getData();
				  
				  defineRY.getPluginObj("GZBM").config.options = {};
				  defineRY.getPluginObj('GZBM').config.param = {"GSXX01":data.key,"MJBJ":"1"};
				  defineRY.getPluginObj('GZBM').init(); 
				  
				  defineRY.getPluginObj("GZGW").config.options = {};
				  defineRY.getPluginObj('GZGW').config.param = {"GSXX01":data.key};
				  defineRY.getPluginObj('GZGW').init();
				  
				  defineRY.getPluginObj("CZBMCK").config.options = {};
				  defineRY.getPluginObj('CZBMCK').config.param = {"GSXX01":data.key};
				  defineRY.getPluginObj('CZBMCK').init();
				  
				  defineRY.getPluginObj("CXBMCK").config.options = {};
				  defineRY.getPluginObj('CXBMCK').config.param = {"GSXX01":data.key};
				  defineRY.getPluginObj('CXBMCK').init();
				   
				  defineRY.getPluginObj("PPFL").config.options = {};
				  defineRY.getPluginObj('PPFL').config.param = {"GSXX01":data.key,"QXLX":"0"};
				  defineRY.getPluginObj('PPFL').init();
				  
				  defineRY.getPluginObj("WLDWQX").config.options = {};
				  defineRY.getPluginObj('WLDWQX').config.param = {"GSXX01":data.key,"QXLX":"1"};
				  defineRY.getPluginObj('WLDWQX').init();
				  
				  defineRY.getPluginObj("CZGSQX").config.options = {};
				  defineRY.getPluginObj('CZGSQX').config.param = {"GSXX01":data.key};
				  defineRY.getPluginObj('CZGSQX').init();
			  }
		  }
	},
	"RYZT" : {
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.RYZT",
		 "default": "0",//默认值
		 "options": {"0":"在职","1":"请假","2":"出差","3":"离职"}
	},
	"RYLX" : {
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.RYLX",
		 "default": "0",//默认值
		 "options": {"0":"公司人员","1":"供应商","2":"经销商"}
	},
	"SKBJ" : {
		 "jlid": "JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.SKBJ",
		 "options": {"1":"禁止查看成本、利润"}
	},
	"DCBJ" : {
		 "jlid": "JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.DCBJ",
		 "options": {"1":"禁止导出"}
	},
	"RYJS" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.RYJS", 
		"options": {"3":"销售员","2":"采购员","9":"导购员","4":"收银员","8":"售后人员","5":"财务人员","6":"保管员","1":"管理人员"},
		"listener": { 
			"checked":function(data, checked, arr){
				debugger;
				console.info(arr);
				if(defineRY.getPluginObj("GZBM").getData()!=null){
				var GZBM=defineRY.getPluginObj("GZBM").getData();
				if(!JL.isNull(GZBM.key)){
				for(var i=0;i<arr.length;i++){
					var key=arr[i]["key"];
					if(key==9){
						var SSGS=defineRY.getPluginObj("SSGS").getData();
						var query={};
						query["BM01"] =GZBM.key;
						query["GSXX01"] = SSGS.key;
						var resultData = defineRY.getSqlResult(query, "RYXX", "GZBM", "admin/scm/jcdy/search");
						var BM06=resultData.data[0]["BM06"];
						if(BM06!=3){
							JL.tip("人员角色为导购员时工作部门应选销售部门");
							defineRY.getPluginObj("GZBM").setData([]);
							}
						}
					}
				}
			}
			}
		}
	},
	"FJSC" : {
        "jlid": "JLUpload",
        "cds": "CDS", 
  		"cds-field": "LIST.FJSC",
//  		"fileType" : ["img","text","excel","html"],
//  		"suffix" : ["pdf","word"]
	  },
	  /*"CXRY" : {
			"jlid" : "JLGrid",
			"buttons": [0,2],
			"cds": "CDS",
			"cds-field": "LIST.CXRY",
			"primarykey": ["RYXX01"],
		    "headers" : [
		        {"id":"RYXX01", "name":"人员编码", "width": 100},
			    {"id":"RYMC", "name":"人员名称", "width": 100},
			    {"id":"BMMC", "name":"部门名称", "width": 100},
			    {"id":"GSMC", "name":"公司名称", "width": 100},
			    {"id":"RYZTMC", "name":"人员状态", "width": 100},
			],
			"listener": {
				"loadRow": function(thisPlugin, data, rowIndex, dl){
				}
			},
			"queryConfig": {
				"multi": true,
				"namespace":"RYXX",
				"sqlid": "ALL",
				"dir": "scm/pub/search",
				"queryField": {},
				"init": {"GSXX01"  : "GSXX01"},
				"fieldMapping":{
					"RYXX01":"CXRY.RYXX01",
					"RYMC":"CXRY.RYMC",
					"BMMC":"CXRY.BMMC",
					"GSMC":"CXRY.GSMC",
					"RYZTMC":"CXRY.RYZTMC"
				},
				"listener":{
					"beforequery" : function(data) {
						data["GSXX01"] =userInfo["PCRM_GSXX01"];
						}
					}
			}
		},*/
	"RYJB": {
		  "jlid": "JLSelect",
		  "cds": "CDS",
		  "cds-field": "LIST.RYJB",
		  "options": {"0":"无限价","1":"限价级别1","2":"限价级别2","3":"限价级别3","4":"限价级别4","5":"限价级别5"}
	},
	"RZRQ" : {
		 "jlid": "JLDate",
		 "cds": "CDS",
		 "cds-field": "LIST.RZRQ"
	},
	"GZGW":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectGW.do", 
		"cds": "CDS",
	    "cds-field": "LIST.GZGW", 
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				debugger;
				if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
					defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
					defineRY.getTab().find("[id='RYXX']").attr("style",""); 
					defineRY.getTab().find("[data-id='QTXX']").attr("class","");
					defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
					defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
					defineRY.getPluginObj("GZGW").setData();
 					JL.tip("请先选择所属公司！");
				}
			}
		}
	},
	"CZBMCK":{
		"jlid" : "JLSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_BMCK.do", 
		"cds": "CDS",
	    "cds-field": "LIST.CZBMCK", 
	    "multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
					defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
					defineRY.getTab().find("[id='RYXX']").attr("style",""); 
					defineRY.getTab().find("[data-id='QTXX']").attr("class","");
					defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
					defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
					defineRY.getPluginObj("CZBMCK").setData();
 					JL.tip("请先选择所属公司！");
				}
			}
		}
	},
	"CZGSQX":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectCZGSQX.do", 
		"cds": "CDS",
	    "cds-field": "LIST.CZGSQX", 
	    "multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
					defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
					defineRY.getTab().find("[id='RYXX']").attr("style",""); 
					defineRY.getTab().find("[data-id='QTXX']").attr("class","");
					defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
					defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
					defineRY.getPluginObj("CZGSQX").setData();
 					JL.tip("请先选择所属公司！");
				}    
			}
		}
	},
//	"CZGSQX":{
//		"jlid": "JLSearch",
//		"cds": "CDS",
//		"cds-field": "LIST.CZGSQX",
//		"placeholder": "请选择！", 
//		"queryConfig": {
//			"namespace": "RYXX",
//			"sqlid": "CZGSQX",
//			"init" : { "GSXX01"  : "GSXX01" },
//			"dir": "scm/pub/search",
//			"fieldMapping":{
//				"KEY":"GSXX01",
//				"VALUE":"CZGSQX"
//			},
//		"listener":{
//				"beforequery" : function(data) {
//					//data["GSXX01"] =userInfo["PCRM_GSXX01"];
//				}
//			}
//		}
//	},
	"CXBMCK":{
		"jlid" : "JLSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_BMCK.do", 
		"cds": "CDS",
	    "cds-field": "LIST.CXBMCK", 
	  //  "multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
					defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
					defineRY.getTab().find("[id='RYXX']").attr("style",""); 
					defineRY.getTab().find("[data-id='QTXX']").attr("class","");
					defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
					defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
					defineRY.getPluginObj("CXBMCK").setData();
 					JL.tip("请先选择所属公司！");
				}
			}
		}
	},
	"WLDWQX":{
		"jlid" : "JLSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_PPSPFLQX.do", //PPSPFLQX
		"cds": "CDS",
	    "cds-field": "LIST.WLDWQX",
	    "readonly": false,//只读属性 true|false
	  //  "multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"],"QXLX":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
					defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
					defineRY.getTab().find("[id='RYXX']").attr("style",""); 
					defineRY.getTab().find("[data-id='QTXX']").attr("class","");
					defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
					defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
					defineRY.getPluginObj("WLDWQX").setData();
 					JL.tip("请先选择所属公司！");
				}
			}
		}
	},
	/*"WDQX":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_WLDW.do", 
		"cds": "CDS",
	    "cds-field": "LIST.KHQX",
	    "multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"],"WLDW16":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	}, */
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"userid":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.userid",
		"format": {
		}
	},
	"PPFL":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_PPSPFLQX.do", 
		"cds": "CDS",
	    "cds-field": "LIST.PPFL",
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"],"QXLX":"0"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
				if (defineRY.getPluginObj("SSGS").getData().key==undefined){ 
					defineRY.getTab().find("[data-id='RYXX']").attr("class","xuan"); 
					defineRY.getTab().find("[id='RYXX']").attr("style",""); 
					defineRY.getTab().find("[data-id='QTXX']").attr("class","");
					defineRY.getTab().find("[id='QTXX']").attr("style","display: none;"); 
					defineRY.getTab().find("[data-id='ZFXX']").attr("class",""); 
					defineRY.getPluginObj("PPFL").setData();
 					JL.tip("请先选择所属公司！");
				}
			}
		}
	},
	"CZY":{
		"jlid" : "JLSelect",
		"options":{"0":"普通","1":"管理员","2":"系统管理员"},
		"cds": "CDS",
	    "cds-field": "LIST.CZY",
		"param" : {},
		"default": "0",
		"multi" : false,
		"listener":{
			"change": function(data){
				console.info(data);
				
				if (!JL.isNull(data)){
					if (data.key==1){
						defineRY.getTab().find("[name='gsli']").show();
					}else{
						defineRY.getTab().find("[name='gsli']").hide();
						defineRY.getPluginObj("CZGSQX").setData();
					} 
				}
			}
		}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi" : false,
		"buttons" : {
			"jlNew":{
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						defineRY.getPluginObj("SKBJ").setData("1");
						
						if (!JL.isNull(fzsj)){
							defineRY.getPluginObj("RYLX").setData(fzsj.RYLX);
							defineRY.getPluginObj("RYZT").setData(fzsj.RYZT);
							defineRY.getPluginObj("RZRQ").setData(fzsj.RZRQ);
							defineRY.getPluginObj("SSGS").setData(fzsj.SSGS);
							defineRY.getPluginObj("GZBM").setData(fzsj.GZBM);
							defineRY.getPluginObj("YHKH").setData(fzsj.YHKH);
							defineRY.getPluginObj("CZY").setData(fzsj.CZY);
							defineRY.getPluginObj("RYJS").setData(fzsj.RYJS);
							defineRY.getPluginObj("SKBJ").setData(fzsj.SKBJ);
							defineRY.getPluginObj("DCBJ").setData(fzsj.DCBJ); 
							defineRY.getPluginObj("XSFS").setData(fzsj.XSFS);
							defineRY.getPluginObj("SKFS").setData(fzsj.SKFS);
							defineRY.getPluginObj("RYJB").setData(fzsj.RYJB);
							defineRY.getPluginObj("GZGW").setData(fzsj.GZGW);
							defineRY.getPluginObj("CZGSQX").setData(fzsj.CZGSQX);
							defineRY.getPluginObj("PPFL").setData(fzsj.PPFL);
							defineRY.getPluginObj("CZBMCK").setData(fzsj.CZBMCK);
							defineRY.getPluginObj("CXBMCK").setData(fzsj.CXBMCK);
							defineRY.getPluginObj("WLDWQX").setData(fzsj.WLDWQX);
							fzsj=null;
						}
					}
				}
			},
			"jlExportData":{
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						//defineRY.getPluginObj("SKBJ").setData("1");
					}
				}
			},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义人员模板",{
						"RYXX01":"人员编码-RYXX01",
						"RYLX":"*人员类型RYLX(0:公司人员 1:供应商 2:经销商)",
						"RYZT":"*人员状态-RYZT(0:在职 1:请假 2:转仓 3:离职)",
						"RYMC":"*人员名称-RYMC填写字符串",
						"LXDH":"*联系电话-LXDH填写字符串",
						"RZRQ":"入职日期-RZRQ(日期格式)",
						"SSGS":"*所属公司-SSGS(填写存在的公司编码)",
						"GZBM":"*工作部门-GZBM(填写存在的末级部门)",
						"SFZH":"身份证号-SFZH填写字符串",
						"YHKH":"银行卡号-YHKH填写字符串",
						"CZY":"*操作员类型-CZY(0:普通；1:管理员;2:系统管理员)",
						"RYJS":"*人员角色-RYJS(可填写多个值并用;分开 1:管理人员;2:销售员;3:业务员;4:收银员;5:财务人员;6:保管员;8:售后人员；9:导购员)",
						"SKBJ":"受控标记-SKBJ填写(1:禁止查看成本、利润)",
						"XSFS":"销售方式-XSFS(填写有效的销售方式代码)",
						"SKFS":"收款方式-SKFS(填写有效的收款方式代码,可填写多个值并用;分开)",
						"RYJB":"授权级别-RYJB(0:无限价 1:限价级别1  2:限价级别2 3:限价级别3 4:限价级别4 5:限价级别5)",
						"GZGW":"*工作岗位-GZGW填(填写有效的工作岗位代码,可填写多个值并用;分开)",
						"PPFL":"品牌分类权限-PPFL(填写有效的权限编码 ,可填写多个值并用;分开)",
						"CZBMCK":"操作部门仓库权限-CZBMCK(填写有效的权限编码)",
						"CXBMCK":"查询门仓库权限-CXBMCK(填写有效的权限编码)",
						"WLDWQX":"往来单位权限-WLDWQX(填写有效的权限编码)",
						"DLMM":"登录密码-DLMM(初始密码:111111)",
						"DCBJ":"导出标记-DCBJ(1:禁止导出 ,默认0)"
			    	});
				}	
			}
		},
		"title" : [
		           {"id":"DM", "name":"人员信息", "width":"w03"},
		           {"id":"BM", "name":"部门", "width":"w04"},
		           {"id":"GW", "name":"岗位", "width":"w02"},
		           {"id":"LXDH", "name":"联系电话", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		          ],
	   "header" : [
			       {"id":"RYXX01", "groupid":"DM","rowindex" :5, "title":"人员编码"},
			       {"id":"RYMC", "groupid":"DM", "rowindex" : 5,"title":"人员姓名"},
				   {"id":"RYLX", "title":"人员类型","hidden":true},
				   {"id":"RYZT", "title":"人员状态","hidden":true},
			       {"id":"LXDH", "groupid":"LXDH", "rowindex" : 7,"title":"联系电话"},
				   {"id":"RZRQ", "title":"入职日期","hidden":true},
			       {"id":"SSGS", "groupid":"BM", "rowindex" : 5,"title":"所属公司"},
			       {"id":"GZBM", "groupid":"BM", "rowindex" : 5,"title":"工作部门"},
			       {"id":"CZY",  "rowindex" : 5,"title":"操作员类型"},
			       {"id":"RYJS", "title":"人员角色","hidden":true},
			       {"id":"SFZH", "title":"身份证","hidden":true},
			       {"id":"YHKH", "title":"银行卡号","hidden":true},
			       {"id":"SKBJ", "title":"受控标记","hidden":true},
			       {"id":"DCBJ", "title":"导出标记","hidden":true},
			       {"id":"XSFS", "title":"销售方式","hidden":true}, 
			       {"id":"SKFS", "title":"收款方式","hidden":true},
			       {"id":"RYJB", "title":"授权级别","hidden":true},
			       {"id":"GZGW", "groupid":"GW", "rowindex" : 7,"title":"工作岗位"},
			       {"id":"CZGSQX", "rowindex" : 7,"title":"操作公司权限"},
			       {"id":"PPFL", "title":"品牌分类","hidden":true},
			       {"id":"CZBMCK", "title":"操作部门仓库权限","hidden":true},
			       {"id":"CXBMCK", "title":"查询部门仓库权限","hidden":true},
			       {"id":"WLDWQX", "title":"往来单位权限","hidden":true},
			       {"id":"jlbh", "title":"JLBH","hidden":true},
			       {"id":"userid", "title":"userid","hidden":true},
			       {"id":"fz", "groupid":"CZ", "rowindex":1, "title":"复制", "editor":"link",
			          	 "listener":{
			          		"click": function(thisPlugin, rowIndex, obj){
			          			JL.confirm("确认复制?", function(){
			          				debugger;
			          				fzsj = thisPlugin.data[rowIndex];
			          				defineRY.getTab().find("#jlNew").click();
			          			});
			           		 }
			          	 }
			        },
			       /* {"id":"delete", "groupid":"CZ", "rowindex":1, "title":"删除", "editor":"link",
			          	 "listener":{
			          		"click": function(thisPlugin, rowIndex, obj){
			          			JL.confirm("确认删除?", function(){
			        	          var selectedIndex = thisPlugin.getSelectedIndex();
			     		          JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineRY.initField);
			          			});
			           		 }
			          	 }
			        },*/
			       {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit", "config":{
			          	 "readonly": ["RYXX01"],
			          	 "mapping":{}
			           },
			           "listener": {
					      "click":function(thisPlugin,rowIndex){//参数data为点击的值，是个json对象
					    	 console.info(thisPlugin);
					    	 debugger;
					    	 defineRY.getTab().find("input[name='GSXX01']:not(:disabled)").val(thisPlugin.data[rowIndex].GSXX01);
					 	 
					    	 defineRY.getPluginObj("GZBM").config.options = {};
							 defineRY.getPluginObj('GZBM').config.param = {"GSXX01":thisPlugin.data[rowIndex].GSXX01,"MJBJ":"1"};
							 defineRY.getPluginObj('GZBM').init();
					    	 defineRY.getPluginObj("GZBM").setData(thisPlugin.data[rowIndex].GZBM);
					    	 
					    	 defineRY.getPluginObj("GZGW").config.options = {};
							 defineRY.getPluginObj('GZGW').config.param = {"GSXX01":thisPlugin.data[rowIndex].GSXX01};
							 defineRY.getPluginObj('GZGW').init();
					    	 defineRY.getPluginObj("GZGW").setData(thisPlugin.data[rowIndex].GZGW);
					    	 
					    	 defineRY.getPluginObj("WLDWQX").config.options = {};
							 defineRY.getPluginObj('WLDWQX').config.param = {"GSXX01":thisPlugin.data[rowIndex].GSXX01,"QXLX":"1"};
							 defineRY.getPluginObj('WLDWQX').init();
					    	 defineRY.getPluginObj("WLDWQX").setData(thisPlugin.data[rowIndex].WLDWQX);
					    	 
//					    	 defineRY.getPluginObj("PPFL").config.options = {};
//							 defineRY.getPluginObj('PPFL').config.param = {"GSXX01":thisPlugin.data[rowIndex].GSXX01,"QXLX":"0"};
//							 defineRY.getPluginObj('PPFL').init();
//					    	 defineRY.getPluginObj("PPFL").setData(thisPlugin.data[rowIndex].PPFL);
							 
							 defineRY.getPluginObj("CZBMCK").config.options = {};
							 defineRY.getPluginObj('CZBMCK').config.param = {"GSXX01":thisPlugin.data[rowIndex].GSXX01};
							 defineRY.getPluginObj('CZBMCK').init();
							 defineRY.getPluginObj("CZBMCK").setData(thisPlugin.data[rowIndex].CZBMCK);
							 
							 defineRY.getPluginObj("CXBMCK").config.options = {};
							 defineRY.getPluginObj('CXBMCK').config.param = {"GSXX01":thisPlugin.data[rowIndex].GSXX01};
							 defineRY.getPluginObj('CXBMCK').init();
							 defineRY.getPluginObj("CXBMCK").setData(thisPlugin.data[rowIndex].CZBMCK);
					    	// defineRY.getPluginObj("GZBM").setData({key: "88010201", value: "采购一部"});
					    	 
					    	 var query1={}; 
			 			   	 query1["CZY01"] = thisPlugin.data[rowIndex].RYXX01;
			 			   	 var ajaxJson = {};
			 			   	 ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getCZY.do";
			 			   	 ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
			 			   	 var resultData = JL.ajax(ajaxJson);
			 			   	 var data = resultData.data.returnList[0];
			 			   	 if(!JL.isNull(data)){ 
			 			   		defineRY.getPluginObj("OLDDLMM").setData(data.CZY04);
			 			   		defineRY.getPluginObj("SKBJ").setData(data.SKBJ);
			 			   	 }
			 			     defineRY.getPluginObj("DLMM").setData();
					      }
			           }
			       }
	      ]
	}
});

defineRY.setEvent([
   {
		"selector": "#search",
		"event": "click",
		"func": function(data){
			defineRY.query(); 
		}
   },
   {
		"selector": "#query",
		"event": "click",
		"func": function(data){
			defineRY.queryResultList();
		}
    }/*,
    {
		"selector": "#ztsj",
		"event": "click",
		"func": function(data){
			debugger;
			if (!JL.isNull(fzsj)){
				defineRY.getPluginObj("RYLX").setData(fzsj.RYLX);
				defineRY.getPluginObj("RYZT").setData(fzsj.RYZT);
				defineRY.getPluginObj("RZRQ").setData(fzsj.RZRQ);
				defineRY.getPluginObj("SSGS").setData(fzsj.SSGS);
				defineRY.getPluginObj("GZBM").setData(fzsj.GZBM);
				defineRY.getPluginObj("YHKH").setData(fzsj.YHKH);
				defineRY.getPluginObj("CZY").setData(fzsj.CZY);
				defineRY.getPluginObj("RYJS").setData(fzsj.RYJS);
				defineRY.getPluginObj("SKBJ").setData(fzsj.SKBJ);
				defineRY.getPluginObj("DCBJ").setData(fzsj.DCBJ); 
				defineRY.getPluginObj("XSFS").setData(fzsj.XSFS);
				defineRY.getPluginObj("SKFS").setData(fzsj.SKFS);
				defineRY.getPluginObj("RYJB").setData(fzsj.RYJB);
				defineRY.getPluginObj("GZGW").setData(fzsj.GZGW);
				defineRY.getPluginObj("CZGSQX").setData(fzsj.CZGSQX);
				defineRY.getPluginObj("PPFL").setData(fzsj.PPFL);
				defineRY.getPluginObj("CZBMCK").setData(fzsj.CZBMCK);
				defineRY.getPluginObj("CXBMCK").setData(fzsj.CXBMCK);
				defineRY.getPluginObj("WLDWQX").setData(fzsj.WLDWQX); 
			}
		}
   }*/
]);


defineRY.query = function() {
	debugger;
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	defineRY.getPluginObj("SKBJ").setData(data.SKBJ);	
	var query={};
	var a = defineRY.getTab().find("[name='DMMC']").val();
	debugger;
//	var ssbm = defineRY.getPluginObj("SSBM").getData();
//	var cxryjs = defineRY.getPluginObj("CXRYJS").getData();
	
	if(!JL.isNull(a)){
		query["DMMC"] = a;
	}


//	debugger;
//	var str='[{"RYJS.key":"';
//	if(!JL.isNull(cxryjs) && cxryjs.length > 0){
//		if(cxryjs.length==1){
//			str+=cxryjs[0]["key"].toString();
//		}else{
//			for(var i=0; i<cxryjs.length; i++){
//				if(i!=cxryjs.length-1){
//					str+=cxryjs[i]["key"].toString()+'"},{"RYJS.key":"';
//				}else{
//					str+=cxryjs[i]["key"].toString();
//				}
//			}
//		}
//		str+='"}]';
//	}else{
//		str=null;
//	}
//	
////	var str= [{"RYJS.key":"1"},{"RYJS.key":"2"},{"RYJS.key":"3"}]; 
//	if(!JL.isNull(str)){
//		query["str"]=str;
//	}
//	
//	
//	var str1='[{"GZBM.key":/^';
//	if(!JL.isNull(ssbm) && ssbm.length > 0){
//		if(ssbm.length==1){
//			str1+=ssbm[0]["key"].toString()+'.*/';
//		}else{
//			for(var i=0; i<ssbm.length; i++){
//				if(i!=ssbm.length-1){
//					str1+=ssbm[i]["key"].toString()+'.*/},{"GZBM.key":'+'/^';
//				}else{
//					str1+=ssbm[i]["key"].toString()+'.*/';
//				}
//				
//			}
//		}
//		str1+='}]';
//	}else{
//		str1=null;
//	}
//	
////	str1=[{"GZBM.key":"88020101"},{"GZBM.key":"lc010201"}];
//	if(!JL.isNull(str1)){
//		query["str1"]=str1;
//	}
	
	
	debugger;
	query["GSXX01"] = userInfo.PCRM_GSXX01;
//	var ajaxJson = {};
//	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getCZYXX.do";
	if(!JL.isNull(data)){
		
	    if (data.CZY14==1){
	    	
	    	var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY1", "admin/scm/jcdy/search");
//	    	query["JK"] = "MONGO_RY.SCM_RY1";
//	    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
//	    	var resultData = JL.ajax(ajaxJson);
//	    	
	    	debugger;
	    	defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {"CZY14":"1"};
			defineRY.getPluginObj('SSGS').init();
	    }else if (data.CZY14==2){
	    	var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY2", "admin/scm/jcdy/search");
//	    	query["JK"] = "MONGO_RY.SCM_RY2";
//	    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
//	    	var resultData = JL.ajax(ajaxJson);
//	    	
	    	defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {};
			defineRY.getPluginObj('SSGS').init();
	    }else{
	    	var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY", "admin/scm/jcdy/search");
//	    	query["JK"] = "MONGO_RY.SCM_RY";
//	    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
//	    	var resultData = JL.ajax(ajaxJson);
	    }
	}else{
		var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY", "admin/scm/jcdy/search");
//		query["JK"] = "MONGO_RY.SCM_RY";
//    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
//    	var resultData = JL.ajax(ajaxJson);
	}
	debugger;
	var CDS = this.getCds("CDS");
	CDS.edit(); 
	CDS.setData({"LIST":resultData.data});//CDS.setData({"LIST":resultData.data.resultlist});
	CDS.post();
	defineRY.getPluginObj("LIST").setPaging(resultData.fileName); 
};
	


defineRY.queryResultList = function() {
	debugger;
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	defineRY.getPluginObj("SKBJ").setData(data.SKBJ);	
	var query={};
	var a = defineRY.getTab().find("[name='DMMC']").val();
//	debugger;
	var ssbm = defineRY.getPluginObj("SSBM").getData();
	var cxryjs = defineRY.getPluginObj("CXRYJS").getData();
	
	if(!JL.isNull(a)){
		query["DMMC"] = a;
	}
	query["ssbm"]=ssbm;

	debugger;
	//拼接人员角色查询语句
	var js='[{"RYJS.key":"';
	if(!JL.isNull(cxryjs) && cxryjs.length > 0){
		if(cxryjs.length==1){
			js+=cxryjs[0]["key"].toString();
		}else{
			for(var i=0; i<cxryjs.length; i++){
				if(i!=cxryjs.length-1){
					js+=cxryjs[i]["key"].toString()+'"},{"RYJS.key":"';
				}else{
					js+=cxryjs[i]["key"].toString();
				}
			}
		}
		js+='"}]';
	}else{
		js=null;
	}
	

	if(!JL.isNull(js)){
//		var js= [{"RYJS.key":"1"},{"RYJS.key":"2"},{"RYJS.key":"3"}]; 
		query["js"]=js;
	}
	
	//拼接部门查询语句
	var bm1 = [];
	//var str1='[{"GZBM.key":/^';
	if(!JL.isNull(ssbm) && ssbm.length > 0){
		if(ssbm.length==1){
			var bm2={};
			var bm3={};
			bm3["$regex"] = "^"+ssbm[0]["key"];
			bm2["GZBM.key"] = bm3;
			bm1.push(bm2);
		}else{
			for(var i=0; i<ssbm.length; i++){
				var bm2={};
				var bm3={};
				bm3["$regex"] = "^"+ssbm[i]["key"];
				bm2["GZBM.key"] = bm3;
				bm1.push(bm2);
			}
		}
	}else{
		bm1=null;
	}
	
//	str1=[{"GZBM.key":"88020101"},{"GZBM.key":"lc010201"}];
	if(!JL.isNull(bm1)){
		query["bm1"]=bm1;
	}
	
	
	debugger;
	query["GSXX01"] = userInfo.PCRM_GSXX01;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getCZYXX.do";
	if(!JL.isNull(data)){
		
	    if (data.CZY14==1){
	    	
	    	//var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY1", "admin/scm/jcdy/search");
	    	query["JK"] = "MONGO_RY.SCM_RY1";
	    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
	    	var resultData = JL.ajax(ajaxJson);
	    	
	    	debugger;
	    	defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {"CZY14":"1"};
			defineRY.getPluginObj('SSGS').init();
	    }else if (data.CZY14==2){
	    	//var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY2", "admin/scm/jcdy/search");
	    	query["JK"] = "MONGO_RY.SCM_RY2";
	    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
	    	var resultData = JL.ajax(ajaxJson);
	    	
	    	defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {};
			defineRY.getPluginObj('SSGS').init();
	    }else{
	    	//var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY", "admin/scm/jcdy/search");
	    	query["JK"] = "MONGO_RY.SCM_RY";
	    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
	    	var resultData = JL.ajax(ajaxJson);
	    }
	}else{
		//var resultData = defineRY.getSqlResult(query, "MONGO_RY", "SCM_RY", "admin/scm/jcdy/search");
		query["JK"] = "MONGO_RY.SCM_RY";
    	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
    	var resultData = JL.ajax(ajaxJson);
	}
	debugger;
	var CDS = this.getCds("CDS");
	CDS.edit(); 
	CDS.setData({"LIST":resultData.data.resultlist});
	CDS.post();
	defineRY.getPluginObj("LIST").setPaging(resultData.fileName); 
};



defineRY.setAfterInit(function() {
	JL.tab(defineRY, {
		"RYXX": "人员信息",
		"QTXX": "权限信息"
	});
	 
	defineRY.query();
});

