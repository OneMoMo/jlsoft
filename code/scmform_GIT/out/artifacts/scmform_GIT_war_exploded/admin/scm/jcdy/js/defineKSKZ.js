var defineKSKZ = JL.JLForm();

defineKSKZ.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds":"CDS",
				"success": function(data, tip){
					console.info(data);
					defineKSKZ.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"DZBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DZBM",
		"format": {
		},
		"listener":{
			"blur": function(data, thisPlugin){
				debugger;
				if (JL.isNull(defineKSKZ.getPluginObj("WLDWMC").getData())){
					JL.tip("请先选择客商信息！");
				}
			}
		}
	}, 
	"ZHZ":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"default":"auto",
		"cds-field": "LIST.ZHZ",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.GYSZHZ",
		  "param": {},
		  "resource": "scmform",
		"listener":{
			"click": function(){
				debugger;
				if (JL.isNull(defineKSKZ.getPluginObj("WLDWMC").getData())){
					JL.tip("请先选择客商信息！");
				}
			}
		}
	},
	/*"COUNTRY":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"default":"auto",
		"cds-field": "LIST.COUNTRY",
		"readonly": false,
		"placeholder": "请选择！",
		  "sqlid":"RYXX.GJ",
		  "resource": "scmform",
		"listener":{
			"click": function(){
			}
		}
	},*/
	"COUNTRY":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.COUNTRY",
		"format": {
		}
	},
	"COUNTRYMC" : {
		"jlid":"JLSearch", 
		"hot":"GYS",
		"cds": "CDS", 
		"cds-field": "LIST.COUNTRYMC",
		"placeholder": "请选择国家",
		"queryConfig":{
			"dir": "scm/pub/search",
			"namespace": "GS",
			"sqlid": "GJ",
			"init": {
				"NRBM": "NRBM",
				"NRMS": "NRMS"
			},
			"fieldMapping" : {
				"NRBM": "NRBM",
				"NRMS": "NRMS"
			},
			"listener": {
				"beforequery" : function(data) {
					debugger; 
					if (defineKSKZ.getPluginObj("jlbh").getData() > 0){
						var NRBM= defineKSKZ.getPluginObj("NRBM").getData();
						data["NRBM"]=NRBM;
					}
					//data["search"]=defineKSKZ.getTab().find("[name='COUNTRYMC']").val();
					//defineKSKZ.getPluginObj("COUNTRYMC").getData();
				},
				// 回填前的数据处理
				"beforecallback" : function(data) {
					debugger;  
					defineKSKZ.getPluginObj('COUNTRY').setData(data[0].NRBM);
					defineKSKZ.getPluginObj('COUNTRYMC').setData(data[0].NRMS);
				}
			}
		}
	},
	/*"TYKM":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"default":"auto",
		"cds-field": "LIST.TYKM",
		"placeholder": "请选择！",
		 "sqlid":"RYXX.GYSTYKM",
		 "resource": "scmform",
		 "param": {},
		"listener":{
			"click": function(){
				debugger;
				if (JL.isNull(defineKSKZ.getPluginObj("WLDWMC").getData())){
					JL.tip("请先选择客商信息！");
				}
			}
		}
	},*/
	"TYKM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.TYKM",
		"format": {
		}
	},
	"TYKMMC" : {
		"jlid":"JLSearch", 
		"hot":"GYS",
		"cds": "CDS", 
		"cds-field": "LIST.TYKMMC",
		"placeholder": "请选择统驭科目",
		"queryConfig":{
			"dir": "scm/pub/search",
			"namespace": "GS",
			"sqlid": "GYSTYKM",
			"init": {
				"NRBM": "NRBM",
				"NRMS": "NRMS"
			},
			"fieldMapping" : {
				"NRBM": "NRBM",
				"NRMS": "NRMS"
			},
			"listener": {
				"beforequery" : function(data) {
					debugger; 
					if (defineKSKZ.getPluginObj("jlbh").getData() > 0){
						var NRBM= defineKSKZ.getPluginObj("NRBM").getData();
						data["NRBM"]=NRBM;
					}
				//	data["search"]=defineKSKZ.getPluginObj("TYKMMC").getData();
				//	data["search"]=defineKSKZ.getTab().find("[name='TYKMMC']").val();
				},
				// 回填前的数据处理
				"beforecallback" : function(data) {
					debugger;  
					defineKSKZ.getPluginObj('TYKM').setData(data[0].NRBM);
					defineKSKZ.getPluginObj('TYKMMC').setData(data[0].NRMS);
				}
			}
		}
	},
	
	/*"PXDM":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"default":"auto",
		"cds-field": "LIST.PXDM",
		"placeholder": "请选择！",
		  "sqlid":"RYXX.PXDM",
		  "resource": "scmform",
		"listener":{
			"click": function(){
			}
		}
	},*/
	"PXDM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.PXDM",
		"format": {
		}
	},
	"PXDMMC" : {
		"jlid":"JLSearch", 
		"hot":"GYS",
		"cds": "CDS", 
		"cds-field": "LIST.PXDMMC",
		"placeholder": "请选择排序代码",
		"queryConfig":{
			"dir": "scm/pub/search",
			"namespace": "GS",
			"sqlid": "PXDM",
			"init": {
				"NRBM": "NRBM",
				"NRMS": "NRMS"
			},
			"fieldMapping" : {
				"NRBM": "NRBM",
				"NRMS": "NRMS"
			},
			"listener": {
				"beforequery" : function(data) {
					debugger; 
					if (defineKSKZ.getPluginObj("jlbh").getData() > 0){
						var NRBM= defineKSKZ.getPluginObj("NRBM").getData();
						data["NRBM"]=NRBM;
					}
					//data["search"]=defineKSKZ.getPluginObj("PXDMMC").getData();
					//data["search"]=defineKSKZ.getTab().find("[name='PXDMMC']").val();
				},
				// 回填前的数据处理
				"beforecallback" : function(data) {
					debugger;  
					defineKSKZ.getPluginObj('PXDM').setData(data[0].NRBM);
					defineKSKZ.getPluginObj('PXDMMC').setData(data[0].NRMS);
				}
			}
		}
	},
	"XJGLZ":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"default":"auto",
		"cds-field": "LIST.XJGLZ",
		"placeholder": "请选择！",
		"sqlid":"JCDY.XJGLZ",
		"resource": "scmform",
		"listener":{
			"click": function(){
				debugger;
				if (JL.isNull(defineKSKZ.getPluginObj("WLDWMC").getData())){
					JL.tip("请先选择客商信息！");
				}
			}
		}
	}, 
	"FKTJDM":{
		"jlid": "JLSelect",
		"cds": "CDS", 
		"default":"auto",
		"cds-field": "LIST.FKTJDM",
		"placeholder": "请选择！",
		  "sqlid":"JCDY.FKTJDM",
		  "resource": "scmform",
		"listener":{
			"click": function(){
			}
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"BJ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.BJ",
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
	/*"GSXX01" : {
		  "jlid": "JLSelect",
		  "cds": "CDS", 
		  "cds-field": "LIST.GSXX01",
		  "sqlid":"RYXX.JTXX",
		  "readonly": false,
		  "resource": "scmform",
		 // "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		  "listener": {
			  "click": function(){
				  debugger; 
			  },
			  "change": function(data){
			  }
		  }
	},*/ 
	"GSMC" : {
		"jlid":"JLSearch", 
		"hot":"GYS",
		"cds": "CDS", 
		"cds-field": "LIST.GSMC",
		"placeholder": "请选择公司",
		"queryConfig":{
			"dir": "scm/pub/search",
			"namespace": "GS",
			"sqlid": "GSXX",
			"fieldMapping" : {
				"GSXX01": "GSXX01",
				"GSXX02": "GSMC"
			},
			"listener": { 
				"beforequery" : function(data) {
					debugger; 
					/*if (defineKSKZ.getPluginObj("jlbh").getData() > 0){
						var GSXX01= defineKSKZ.getPluginObj("GSXX01").getData();
						data["GSXX01"]=GSXX01;
					}*/
				},
				// 回填前的数据处理
				"beforecallback" : function(data) { 
					debugger;  
					/*defineKSKZ.getPluginObj('GSXX01').setData(data[0].GSXX01);
					defineKSKZ.getPluginObj('GSMC').setData(data[0].GSXX02);*/
				}
			}
		}
	},
	"ZGSDJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.ZGSDJ", 
		"options": {"1":"总公司冻结"},
		"listener": { 
			"checked": function(data, checked, obj, thisPlugin){
				  debugger; 
				  /*if (checked){
					  defineKSKZ.getPluginObj("SXGSDJ").setData();
				  }*/
			  }
	    }
	},
	"SXGSDJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.SXGSDJ", 
		"options": {"1":"所属公司冻结"},
		"listener": { 
			"checked": function(data, checked, obj, thisPlugin){
				  debugger; 
				/*  if (checked){
					  defineKSKZ.getPluginObj("ZGSDJ").setData();
				  }*/
			  }
	    }
	},
	"WLDW01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.WLDW01",
		"format": {
		}
	},
	"GXSX":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GXSX",
		"format": {
		}
	},
	"WLDWMC" : {
		"jlid":"JLSearch",
		"hot":"GYS",
		"cds": "CDS", 
		"cds-field": "LIST.WLDWMC",
		"placeholder": "请选择供应商",
		"queryConfig":{
			"dir": "scm/pub/search",
			"namespace": "WLDW",
			"sqlid": "ALL",
			"init": {
				"GSXX01": "GSXX01",
				"WLDW01": "WLDW01"
			},
			"fieldMapping" : {
				"WLDW01": "WLDW01",
				"WLDWMC": "WLDWMC"
			},
			"listener": {
				// 查询前的参数处理
				// 采购合同合作方式不能为“联营不管库存”(HZFS <> 2)
				"beforequery" : function(data) {
					debugger; 
					if (defineKSKZ.getPluginObj("jlbh").getData() > 0){
						var WLDW01= defineKSKZ.getPluginObj("WLDW01").getData();
						data["WLDW01"]=WLDW01;
					}
					//data["WLDWMC"]=defineKSKZ.getTab().find("[name='WLDWMC']").val();
				},
				// 回填前的数据处理
				"beforecallback" : function(data) {
					debugger;  
					
					if (data[0].GXSX==0){
						//供应商
						defineKSKZ.getPluginObj("ZHZ").config.options = {};
						defineKSKZ.getPluginObj('ZHZ').config.sqlid = "JCDY.GYSZHZ";
						defineKSKZ.getPluginObj('ZHZ').init();
						 
						defineKSKZ.getPluginObj("XJGLZ").config.options = {};
						defineKSKZ.getPluginObj('XJGLZ').config.sqlid = "JCDY.XJGLZ";
						defineKSKZ.getPluginObj('XJGLZ').init();
						
						defineKSKZ.getPluginObj("TYKMMC").config.options = {};
						//defineKSKZ.getPluginObj('TYKMMC').config.sqlid = "RYXX.GYSTYKM";
						defineKSKZ.getPluginObj('TYKMMC').config.queryConfig.sqlid = "GYSTYKM";
						defineKSKZ.getPluginObj('TYKMMC').init();
					}else if (data[0].GXSX==1){
						//客户
						defineKSKZ.getPluginObj("ZHZ").config.options = {};
						defineKSKZ.getPluginObj('ZHZ').config.sqlid = "JCDY.KHZHZ";
						defineKSKZ.getPluginObj('ZHZ').init();
						
						defineKSKZ.getPluginObj("XJGLZ").config.options = {};
						defineKSKZ.getPluginObj('XJGLZ').config.sqlid = "JCDY.KHGLZ";
						defineKSKZ.getPluginObj('XJGLZ').init();
						
						defineKSKZ.getPluginObj("TYKMMC").config.options = {};
						defineKSKZ.getPluginObj('TYKMMC').config.queryConfig.sqlid = "KHTYKM";
						//defineKSKZ.getPluginObj('TYKMMC').config.sqlid = "RYXX.KHTYKM";
						defineKSKZ.getPluginObj('TYKMMC').init();
					}
					defineKSKZ.getPluginObj('TYKMMC').setData();
					defineKSKZ.getPluginObj('TYKM').setData();
					
					defineKSKZ.getPluginObj('GXSX').setData(data[0].GXSX);
					
					var query={}; 
					query["WLDW01"] = data[0].WLDW01;
	 			   	var ajaxJson = {};
	 			   	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineKSKZ/getWLDW_EX.do";
	 			   	ajaxJson["data"] = {"XmlData": JSON.stringify(query)};
	 			   	var resultData = JL.ajax(ajaxJson);
	 			   	var data = resultData.data.returnList[0];
	 			   	  
	 			   	//defineKSKZ.getPluginObj("DZBM").disabled(false);
                    if (resultData.data.returnList.length>0){
                    	//defineKSKZ.getPluginObj("DZBM").disabled(true);
                    	defineKSKZ.getPluginObj("COUNTRY").setData(data.COUNTRY); 
                    	defineKSKZ.getPluginObj("COUNTRYMC").setData(data.COUNTRYMC);
     	 			   	defineKSKZ.getPluginObj("DZBM").setData(data.DZBM); 
     	 			   	defineKSKZ.getPluginObj("FKTJDM").setData(data.FKTJDM); 
     	 			    defineKSKZ.getPluginObj("PXDM").setData(data.PXDM); 
     	 			    defineKSKZ.getPluginObj("PXDM").setData(data.PXDMMC); 
     	 			    defineKSKZ.getPluginObj("TYKM").setData(data.TYKM);
     	 			    defineKSKZ.getPluginObj("TYKMMC").setData(data.TYKMMC);
     	 			    defineKSKZ.getPluginObj("XJGLZ").setData(data.XJGLZ);
     	 			    defineKSKZ.getPluginObj("ZHZ").setData(data.ZHZ);
     	 			    defineKSKZ.getPluginObj("ZGSDJ").setData(data.ZGSDJ);
     	 			    defineKSKZ.getPluginObj("SXGSDJ").setData(data.SXGSDJ);
                    }
				}
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
						defineKSKZ.getPluginObj("WLDWMC").disabled(false);
						defineKSKZ.getPluginObj("GSXX01").disabled(false);
					}
				}
			}
		},
		"title" : [
		           {"id":"KSBM", "name":"客商编码", "width":"w02"},
		           {"id":"KSMC", "name":"客商名称", "width":"w02"},
		           {"id":"DZBM", "name":"对照编码", "width":"w02"}, 
		           {"id":"GSXX01", "name":"公司名称", "width":"w02"}, 
		           {"id":"CZ", "name":"操作", "width":"w01"}
		 ],
		"header" : [
		            {"id":"WLDW01", "groupid":"KSBM",  "rowindex" :1, "title":"客商编码"},
		            {"id":"WLDWMC", "groupid":"KSMC",  "rowindex" :1, "title":"客商名称"},
		            {"id":"DZBM",   "groupid":"DZBM",  "rowindex" :1, "title":"对照编码"}, 
		            {"id":"GSXX01", "groupid":"GSXX01",  "rowindex" :1, "title":"公司名称"}, 
		            {"id":"jlbh","hidden":true},
					{"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
		            	"config":{ 
					          "mapping":{}
						},
						"listener": {
	         			      "click":function(thisPlugin, rowIndex, obj, plugin){//参数data为点击的值，是个json对象 
	         			    	 debugger; 
	         			    	 defineKSKZ.getPluginObj("GSXX01").disabled(true);
	         			    	 defineKSKZ.getPluginObj("WLDWMC").disabled(true);
	         			    	 defineKSKZ.getPluginObj('GXSX').setData(thisPlugin.data[rowIndex].GXSX);
	         			    	 if (thisPlugin.data[rowIndex].GXSX==0){
	        						//供应商
	        						defineKSKZ.getPluginObj("ZHZ").config.options = {};
	        						defineKSKZ.getPluginObj('ZHZ').config.sqlid = "JCDY.GYSZHZ";
	        						defineKSKZ.getPluginObj('ZHZ').init();
	        						
	        						defineKSKZ.getPluginObj("XJGLZ").config.options = {};
	        						defineKSKZ.getPluginObj('XJGLZ').config.sqlid = "JCDY.XJGLZ";
	        						defineKSKZ.getPluginObj('XJGLZ').init();
	        					 }else if (thisPlugin.data[rowIndex].GXSX==1){
	        						//客户
	        						defineKSKZ.getPluginObj("ZHZ").config.options = {};
	        						defineKSKZ.getPluginObj('ZHZ').config.sqlid = "JCDY.KHZHZ";
	        						defineKSKZ.getPluginObj('ZHZ').init();
	        						
	        						defineKSKZ.getPluginObj("XJGLZ").config.options = {};
	        						defineKSKZ.getPluginObj('XJGLZ').config.sqlid = "JCDY.KHGLZ";
	        						defineKSKZ.getPluginObj('XJGLZ').init();
	        					 }
	        			       }
						}
					},
					{"id":"delete", "groupid":"CZ", "rowindex":1, "title":"删除", "editor":"link",
		            	 "listener":{
		            		 "click": function(thisPlugin, rowIndex, obj, plugin){
		            			 JL.confirm("确认删除?", function(){
	                     				var selectedIndex = thisPlugin.getSelectedIndex();
	                     				JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineKSKZ.initField);
	                     				defineKSKZ.query(); 
	               						JL.tip("刪除成功"); 
	                     		 }); 
		            		 }
		            	 }
		             }
		]	
	}
});

defineKSKZ.setEvent([
{
	"selector": "#search",
	"event": "click",
	"func": function(){
		defineKSKZ.query();
	}
}
]);

defineKSKZ.setAfterInit(function() {
	//defineKSKZ.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);// 公司信息 
    
	defineKSKZ.query();
});

defineKSKZ.query = function(){
	var queryField = {};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var DMMC = defineKSKZ.getTab().find("[name='DMMC']").val();
	if(!JL.isNull(DMMC)){
		queryField["DMMC"] = DMMC;
	}
	var resultData = defineKSKZ.getSqlResult(queryField, "MONGO_KSKZ", "SCM_KSKZ", "admin/scm/jcdy/search");

	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineKSKZ.getPluginObj("LIST").setPaging(resultData.fileName); 
};