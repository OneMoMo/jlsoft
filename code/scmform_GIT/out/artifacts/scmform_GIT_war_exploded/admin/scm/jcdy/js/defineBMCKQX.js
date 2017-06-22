var defineBMCKQX = JL.JLForm();
defineBMCKQX.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewCard": {
				"readonly": [],
				"listener":function(){				
					//defineBMCKQX.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
				}
			}
		}
	}, 
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				/*"before": function(data){
					console.info('jlSaveCard');
					 debugger;
					var XmlData = {}; 
			    	XmlData["CK"] = defineBMCKQX.getPluginObj("CK").getData();
			    	XmlData["BM"] = defineBMCKQX.getPluginObj("BM").getData();
			    	XmlData["SHWD"] = defineBMCKQX.getPluginObj("SHWD").getData();
			    	XmlData["GSXX01"] = defineBMCKQX.getPluginObj("GSXX01").getData();
			    	XmlData["FWWD"] = defineBMCKQX.getPluginObj("FWWD").getData();
			    	XmlData["QX01"] = defineBMCKQX.getPluginObj("QX01").data;
			    	XmlData["jlbh"] = defineBMCKQX.getPluginObj("jlbh").data;
			    	XmlData["QXMC"] = defineBMCKQX.getPluginObj("QXMC").data;
			    	//XmlData["GSXX01"] = userInfo.PCRM_GSXX01;
			    	var ajaxJson = {};
			    	if (defineBMCKQX.getPluginObj("jlbh").data>0){
			    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineBMCKQX/updateBMCKQX.do";
			    	}else{
			    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineBMCKQX/insertBMCKQX.do";
			    	}
			    	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
			    	var resultData = JL.ajax(ajaxJson);
			    	if(!JL.isNull(resultData.data.returnMap)){
			    		if(resultData.data.returnMap == "1"){
			    			JL.tip("保存成功"); 
			    			return true;
			    		}
			    	}
				},*/
				"success":function(data,tip){
					console.info('success');
					defineBMCKQX.query();
				}
			},
			"jlCancelSlide":{}
		}
	},
//	"GSXX01":{
//		"jlid": "JLInput",
//		"cds": "CDS", 
//		"cds-field": "BMCKQX.GSXX01"
//	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "BMCKQX.jlbh"
	},
	"QX01":{
		"jlid":"JLInput",
		"readonly":"readonly",
		"noremove":"true",
		"cds":"CDS",
		"cds-field": "BMCKQX.QX01"
	},
	"QXMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "BMCKQX.QXMC"
	},
	"CK":{
		"jlid": "JLMultiTree",
		"sqlid":"JLPub.select_ALLCK1",
		"cds": "CDS", 
		"cds-field": "BMCKQX.CK",
		"resource":"form",
		"clickLoad":true,
		"jbToAll" :1, 
		"param" : {
		}	//"GSXX01":userInfo.PCRM_GSXX01
	},
	"BM":{ 
		"jlid": "JLMultiTree",
		"sqlid":"JLPub.select_ALLBM1",
		"resource":"form",
		"clickLoad":true,
		"cds": "CDS", 
		"cds-field": "BMCKQX.BM",
		"jbToAll" :1,
		"param" : {
		}//"GSXX01":userInfo.PCRM_GSXX01
	},
	"SHWD":{
	/*	"jlid" : "JLMultiTree",
		//"cds": "CDS",
	//	"cds-field": "BMCKQX.SHWD",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWDTREE.do", 
		"clickLoad":false,
		"jbToAll" :3,
	    "param" : {"WDLX":"0","PARENT":"NO"}*/
	
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWD.do", 
		"cds": "CDS",
	    "cds-field": "BMCKQX.SHWD",
		"multi": true,
		"param" : {"WDLX":"0"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		},
		"header" : [
		            {"id":"VALUE", "title":"网点名称", "css":"w06"},
		            {"id":"GSXX02", "title":"公司名称", "css":"w06"}
		           ]
	},
	"GSXX01":{
		"jlid": "JLSelect",
		"cds": "CDS",
		"readonly":false,
		"placeholder": "请选择！",
		"cds-field": "BMCKQX.GSXX01",
		  "sqlid":"JCDY.JTXX",
		  "resource": "scmform",
		  "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"listener":{
			"click": function(){

			}
		}
	},
	"FWWD":{
		/*"jlid" : "JLMultiTree",
		//"cds": "CDS",
		//"cds-field": "BMCKQX.FWWD",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWDTREE.do", 
		"clickLoad":false, 
		"jbToAll" :3,
	    "param" : {"WDLX":"1","PARENT":"NO"}*/
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWD.do", 
		"cds": "CDS",
	    "cds-field": "BMCKQX.FWWD",
		"multi": true,
		"param" : {"WDLX":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		},
		"header" : [
		            {"id":"VALUE", "title":"网点名称", "css":"w06"},
		            {"id":"GSXX02", "title":"公司名称", "css":"w06"}
		           ]
	},
	/*"SHWD":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWD.do", 
		"cds": "CDS",
	    "cds-field": "BMCKQX.SHWD",
		"multi": true,
		"param" : {"WDLX":"0"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"FWWD":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWD.do", 
		"cds": "CDS",
	    "cds-field": "BMCKQX.FWWD",
		"multi": true,
		"param" : {"WDLX":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},*/
	"BMCKQX": {
		"jlid": "JLLayoutGrid",
		"paging": "more",
		"multi": false,
		"mode": "edit",
		"cds": "CDS", 
		"buttons": {
			"jlNew": {
				"listener":{
					"click":function(){
						defineBMCKQX.getPluginObj("GSXX01").disabled(false); 
					}
				}
			}
	    },
		"title" : [
		           {"id":"QX01", "name":"权限编码", "width":"w03"},
		           {"id":"QXMC", "name":"权限名称", "width":"w03"}, 
		           {"id":"GSXX01", "name":"所属公司", "width":"w03"}, 
		           {"id":"CZ", "name":"操作","width":"w03"}		  
		          ],
		"header": [
		    {"id":"jlbh", "title":"jlbh","hidden":true},  
		    {"id":"QX01", "groupid":"QX01","title":"权限编码"},  
		    {"id":"QXMC", "groupid":"QXMC", "title":"权限名称"}, 
		    {"id":"GSXX01", "groupid":"GSXX01", "title":"所属公司"}, 
		    {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
            	 "config":{
	            	 "readonly": ["FWRY01"]
	             },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 debugger;
	        			 console.info(data);
	        			 var CDS = data.getCds("CDS");
	        			 defineBMCKQX.getPluginObj("CK").setData(data.getData(rowIndex).CK);
	        			 defineBMCKQX.getPluginObj("BM").setData(data.getData(rowIndex).BM);
	        			 defineBMCKQX.getPluginObj("SHWD").setData(data.getData(rowIndex).SHWD);
	        			 defineBMCKQX.getPluginObj("FWWD").setData(data.getData(rowIndex).FWWD);
	        			 defineBMCKQX.getPluginObj("GSXX01").setData(data.getData(rowIndex).GSXX01);
	        			 defineBMCKQX.getPluginObj("GSXX01").disabled(true); 
	        		 }
	        	 }
            },
            {"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
		    	"listener": {
		    		"delete": function(thisPlugin, rowIndex, obj){
		    			console.info('delete');
		    			JL.confirm("是否确认删除?", function(){
		    				var XmlData = {}; 
							XmlData["jlbh"] = thisPlugin.data[rowIndex].jlbh;
					    	XmlData["CK"] = thisPlugin.data[rowIndex].CK;//defineBMCKQX.getPluginObj("CK").getData();
					    	XmlData["BM"] = thisPlugin.data[rowIndex].BM;
					    	XmlData["SHWD"] = thisPlugin.data[rowIndex].SHWD;
					    	XmlData["FWWD"] = thisPlugin.data[rowIndex].FWWD;
					    	XmlData["GSXX01"] = thisPlugin.data[rowIndex].GSXX01;
					    	XmlData["QX01"] = thisPlugin.data[rowIndex].QX01;
					    	XmlData["QXMC"] = thisPlugin.data[rowIndex].QXMC;
					    	//XmlData["GSXX01"] = thisPlugin.data[rowIndex].GSXX01;
					    	var ajaxJson = {};
					    	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineBMCKQX/deleteBMCKQX.do";
					    	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
					    	var resultData = JL.ajax(ajaxJson);
					    	thisPlugin.removeRow(rowIndex);
					    	if(!JL.isNull(resultData.data.returnMap)){
					    		if(resultData.data.returnMap == "1"){
					    			JL.tip("保存成功");
					    			return true;
					    		}
					    	}
						}); 
		    		}
		    	}
		    }
		    /*{"id":"delete", "title":"修改", "editor":"JLUpdateSubmit", "groupid":"CZ", "css":"fr", "rowindex":1,
			    "listener": {
				    "submit": function(thisPlugin, rowIndex, obj){
				    	var XmlData = $.extend({}, thisPlugin.getData(rowIndex));
				    	XmlData["GSXX01"] = userInfo.PCRM_GSXX01;
				    	var ajaxJson = {};
				    	if(XmlData.jlbh>0){
				    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineBMCKQX/updateBMCKQX.do";
				    	}else{
				    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineBMCKQX/insertBMCKQX.do";
				    	}
				    	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
				    	var resultData = JL.ajax(ajaxJson);
				    	if(!JL.isNull(resultData.data.returnMap)){
				    		if(resultData.data.returnMap == "1"){
				    			JL.tip("保存成功");
				    			return true;
				    		}
				    	}
				    }
			    }
		    }*/     
        ],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
		    	if(!JL.isNull(thisPlugin.getData(rowIndex, "jlbh"))){
		    		dl.find("[data-id='choose']").show();
		    	}else{
		    		dl.find("[data-id='choose']").hide();
		    	}	
		    }
		}
	}
});

defineBMCKQX.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(data){
		defineBMCKQX.query(); 
	}
}]);

defineBMCKQX.setAfterInit(function(){
	defineBMCKQX.query();
	
	console.info('setAfterInit');
});

defineBMCKQX.query = function() {
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	debugger;
	var query={};
	var a = defineBMCKQX.getTab().find("[name='query']").val(); 
	debugger;
	if(!JL.isNull(a)){
		query["query"] = a;
	}
	query["GSXX01"] = userInfo["PCRM_GSXX01"];
	query["S_VALUE"] = {"$ne":"D1"};
	console.info("操作员:"+data.CZY14);
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineBMCKQX.getSqlResult(query, "MONGO_BMCKQX", "SCM_BMCKQX1", "admin/scm/jcdy/search");
	        
	    	defineBMCKQX.getPluginObj("GSXX01").config.options = {};
	    	defineBMCKQX.getPluginObj('GSXX01').config.param = {"CZY14":"1"};
	    	defineBMCKQX.getPluginObj('GSXX01').init();
	    	
	    	defineBMCKQX.getPluginObj("BM").config.options = {};
	    	defineBMCKQX.getPluginObj('BM').config.param = {"CZY14":"1", "GSXX01":userInfo["PCRM_GSXX01"]};
	    	defineBMCKQX.getPluginObj('BM').init();
	    }else if (data.CZY14==2){
	    	var resultData = defineBMCKQX.getSqlResult(query, "MONGO_BMCKQX", "SCM_BMCKQX2", "admin/scm/jcdy/search");
	    	
	    	defineBMCKQX.getPluginObj("GSXX01").config.options = {};
	    	defineBMCKQX.getPluginObj('GSXX01').config.param = {};
	    	defineBMCKQX.getPluginObj('GSXX01').init();
	    	
	    	defineBMCKQX.getPluginObj("BM").config.options = {};
	    	defineBMCKQX.getPluginObj('BM').config.param = {"CZY14":"2", "GSXX01":userInfo["PCRM_GSXX01"]};
	    	defineBMCKQX.getPluginObj('BM').init();
	    }else{
	    	var resultData = defineBMCKQX.getSqlResult(query, "MONGO_BMCKQX", "SCM_BMCKQX", "admin/scm/jcdy/search");
	    	defineBMCKQX.getPluginObj("BM").config.options = {};
	    	defineBMCKQX.getPluginObj('BM').config.param = {"CZY14":"0", "GSXX01":userInfo["PCRM_GSXX01"]};
	    	defineBMCKQX.getPluginObj('BM').init();
	    	defineBMCKQX.getPluginObj("CK").config.options = {};
	    	defineBMCKQX.getPluginObj('CK').config.param = {"CZY14":"0", "GSXX01":userInfo["PCRM_GSXX01"]};
	    	defineBMCKQX.getPluginObj('CK').init();
	    }
	}else{
		var resultData = defineBMCKQX.getSqlResult(query, "MONGO_BMCKQX", "SCM_BMCKQX", "admin/scm/jcdy/search");
		defineBMCKQX.getPluginObj("BM").config.options = {};
    	defineBMCKQX.getPluginObj('BM').config.param = {};
    	defineBMCKQX.getPluginObj('BM').init();
	}
	
	  
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"BMCKQX":resultData.data});
	CDS.post();
	defineBMCKQX.getPluginObj("BMCKQX").setPaging(resultData.fileName); 
};