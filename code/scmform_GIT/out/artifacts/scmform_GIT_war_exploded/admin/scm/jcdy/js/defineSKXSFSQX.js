var defineSKXSFSQX = JL.JLForm();
	defineSKXSFSQX.setPlugin({

		"footer" : {
			"jlid": "JLToolBar",
			"buttons": {
				"jlSaveCard":{
					"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
					"before": function(){
					},
					"success":function(data,tip){
						defineSKXSFSQX.query();
					    
						
					}
				},
				"jlCancelSlide":{}
			}
		},    
	
	
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh"
	},
	
	"QXLB":{
		"jlid": "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectSKFS.do",//
		"cds": "CDS", 
		"cds-field": "LIST.QXLB",
		"multi": true,
		"listener":{
			"click": function(){
			}
		}
	},
	"QXLX":{
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.QXLX",
		"default" : "0",
		"options":{"0":"收款方式","1":"销售方式"},
		"listener": {
			"click": function(data, thisPlugin){
				if (data.key == 0){
					defineSKXSFSQX.getPluginObj('QXLB').config.sOperateName = "selectSKFS.do";
					defineSKXSFSQX.getPluginObj('QXLB').init();
				}else if(data.key == 1){
					defineSKXSFSQX.getPluginObj('QXLB').config.sOperateName = "selectXSFS.do";
					defineSKXSFSQX.getPluginObj('QXLB').init();
				}
			}
		} 
	},

//	"YXBJ":{
//		 "jlid":"JLCheckbox",
//		 "cds": "CDS",
//		 "cds-field": "LIST.YXBJ",
//		 "options":{"1":"有效"},
//		 "default" : "1",
//		 "listener": {
//			 "click":function(data){
//				 
//			 }
//			 
//		 }
//	 },
	
	 "QX01":{
			"jlid": "JLInput",
			"cds": "CDS", 
			"cds-field": "LIST.QX01"
		},
	"QXMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.QXMC"
	},
	"LIST": {
		"jlid": "JLLayoutGrid",
		"paging": "more",
		"multi": false,
		"mode": "edit",
		"cds": "CDS", 
		"buttons": {
			"jlNew":{
				"listener": {
					"click":function(obj, thisPlugin){
						
							defineSKXSFSQX.getPluginObj('QXLB').config.sOperateName = "selectSKFS.do";
							defineSKXSFSQX.getPluginObj('QXLB').init();
						
					}
				}
			}
		},
		"title" : [
		           {"id":"QX01", "name":"权限编码", "width":"w05"},
		           {"id":"QXMC", "name":"权限名称", "width":"w04"},
		           {"id":"CZ", "name":"操作", "width":"w03"}
		          ],
		"header": [
		    {"id":"jlbh", "title":"jlbh","hidden":true}, 
		    {"id":"QX01", "groupid":"QX01", "title":"权限编码"},   
		    {"id":"QXMC", "groupid":"QXMC", "title":"权限名称"}, 
		  
//		    {"id":"YXBJ",  "groupid":"YXBJ", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
//     		     "config":{
//     		    	       "jlid": "JLCheckbox",
//     		    	       "options": {"1":"有效"},
//     		    	       "listener": {
//     		    			      "checked":function(data, checked, arr){
//     		    			    	  if(checked){
//     		    			    		  data.key = 1;
//     		    			    		  data.value ="有效";
//     		    			    	  }else{
//     		    			    		  data.key = 0;
//     		    			    		  data.value ="无效";
//     		    			    	  }
//     		    			       }
//     		    		   }
//     		             }
//     		   },
     		  {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
					"config":{
						"readonly": ["QX01","QXLX"],
						"mapping":{}
					},
					"listener": {
	            		"click": function(thisPlugin, rowIndex, obj){
							debugger;
							if (thisPlugin.data[rowIndex].QXLX.key == 0){
								defineSKXSFSQX.getPluginObj('QXLB').config.sOperateName = "selectSKFS.do";
								defineSKXSFSQX.getPluginObj('QXLB').init();
							}else if(thisPlugin.data[rowIndex].QXLX.key == 1){
								defineSKXSFSQX.getPluginObj('QXLB').config.sOperateName = "selectXSFS.do";
								defineSKXSFSQX.getPluginObj('QXLB').init();
							}
							defineSKXSFSQX.getPluginObj('QXLB').setData(thisPlugin.data[rowIndex].QXLB);
	            		}
					}
				},
		    {"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
            	"listener": {
            		"click": function(thisPlugin, rowIndex, obj){
						debugger;
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineSKXSFSQX, data, "删除", {
								"disabled": false,
								"success":function(){
									//defineBOMSPXX.query();
									thisPlugin.removeRow(rowIndex);
								 }	 
            			});
            		});
            	}
		    }
		    }
		    ]
            /*{"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
		    	"listener": {
		    		"delete": function(thisPlugin, rowIndex, obj){
		    			console.info('delete');
		    			JL.confirm("是否确认删除?", function(){
		    				var XmlData = {}; 
							XmlData["jlbh"] = thisPlugin.data[rowIndex].jlbh;
					    	XmlData["CK"] = thisPlugin.data[rowIndex].CK;//defineSKXSFSQX.getPluginObj("CK").getData();
					    	XmlData["BM"] = thisPlugin.data[rowIndex].BM;
					    	XmlData["SHWD"] = thisPlugin.data[rowIndex].SHWD;
					    	XmlData["FWWD"] = thisPlugin.data[rowIndex].FWWD;
					    	XmlData["QX01"] = thisPlugin.data[rowIndex].QX01;
					    	XmlData["QXMC"] = thisPlugin.data[rowIndex].QXMC;
					    	XmlData["GSXX01"] = thisPlugin.data[rowIndex].GSXX01;
					    	var ajaxJson = {};
					    	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineSKXSFSQX/deleteLIST.do";
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
		    },
		    /*{"id":"delete", "title":"修改", "editor":"JLUpdateSubmit", "groupid":"CZ", "css":"fr", "rowindex":1,
			    "listener": {
				    "submit": function(thisPlugin, rowIndex, obj){
				    	var XmlData = $.extend({}, thisPlugin.getData(rowIndex));
				    	XmlData["GSXX01"] = userInfo.PCRM_GSXX01;
				    	var ajaxJson = {};
				    	if(XmlData.jlbh>0){
				    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineSKXSFSQX/updateLIST.do";
				    	}else{
				    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineSKXSFSQX/insertLIST.do";
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
        
		/*"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
		    	if(!JL.isNull(thisPlugin.getData(rowIndex, "jlbh"))){
		    		dl.find("[data-id='choose']").show();
		    	}else{
		    		dl.find("[data-id='choose']").hide();
		    	}	
		    }
		}*/
	}
	});

defineSKXSFSQX.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineSKXSFSQX.query();
	}
}]);

defineSKXSFSQX.setAfterInit(function(){
	defineSKXSFSQX.query();
});

defineSKXSFSQX.query = function() {
	
	var query={};
	var a = defineSKXSFSQX.getTab().find("[name='query']").val(); 
	
	if(!JL.isNull(a)){
		query["query"] = a;
	}
	//query["GSXX01"] = userInfo["PCRM_GSXX01"];
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineSKXSFSQX.getSqlResult(query, "MONGO_SKXSFSQX", "SCM_SKXSFSQX", "admin/scm/jcdy/search");
	  
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineSKXSFSQX.getPluginObj("LIST").setPaging(resultData.fileName);
};