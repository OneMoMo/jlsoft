var defineRY = JL.JLForm();
var transport = new JLTransport();

defineRY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar", 
		"buttons" : {
			"save" : {
				"name": "提交",
				"icon": "check",
				"css": "jl_btn btn_blue_or",
				"func": function(){
					console.info('提交');
					var XmlData = {};
					XmlData.CZY01 = defineRY.getPluginObj("CZY01").data;
					XmlData.CZY02 = defineRY.getPluginObj("CZY02").data;
					XmlData.CZY03 = defineRY.getPluginObj("CZY03").data;
					XmlData.CZY05 = defineRY.getPluginObj("CZY05").data;
					XmlData.CZY06 = defineRY.getPluginObj("CZY06").data;
					XmlData.CZY07 = defineRY.getPluginObj("CZY07").data.key;
					XmlData.CZY08 = defineRY.getPluginObj("CZY08").data.key;
					XmlData.GSXX01 = defineRY.getPluginObj("SSGS").data.key;
					XmlData.BM01 = defineRY.getPluginObj("SSBM").data.key;
					 
					console.info(XmlData);
					var ajaxJson = {};
					if (XmlData.CZY01>0){
						ajaxJson["src"] = "defCZY/updateCZY.do";
					}else{
						ajaxJson["src"] = "defCZY/insertCZY.do";
					}
        			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
        			var resultData = JL.ajax(ajaxJson);
        			if (resultData.data.returnMap==1){
        				JL.tip("提交成功！", null);
        			}else{
        				JL.tip("提交失败！", null);
        			}
				}
			}
		}
	},
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {"jlNewCard":{}}
	},
	"SSGS" : {
		"jlid": "JLSelect",
		"sBillName": "JLInterface",
	    "sOperateName": "selectGSXX.do",
	    "cds": "CDS",
	    "cds-field": "CZY.GSXX01",
	    "readonly":false,
		"param" : {}  
	},
	"SSBM" : {
		/*"jlid":"JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "selectBM.do",
		"dataStructure": "list", 
		"text":false,
		"final":true,
		"listener":{
			"click": function(row){ 
				console.info(row);
				defineRY.getPluginObj("SSBM").setData();
			}
		}*/
		"jlid":"JLSelectMenuTree",
		"sBillName": "JLInterface",
		"sOperateName": "selectBM.do",
	//	"cds": "CDS",
	   // "cds-field": "CZY.BM01",
		"dataStructure": "list", 
		"final":true,
		"listener":{
			"click": function(row){ 
				console.info(row);
			}
		}
	},
	"CZY01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CZY.CZY01"
	},
	"CZY02" : {
		"jlid": "JLInput",
		"readonly" : true,
		"cds": "CDS",
		"cds-field": "CZY.CZY02"
	},
	"CZY03" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CZY.CZY03"
	},
	"CZY05" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CZY.CZY05"
	},
	"CZY06" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CZY.CZY06"
	},
	"CZY08" : {
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "CZY.CZY08",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"编内","1":"编外"}
	},
	"CZY07" : { 
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "CZY.CZY07",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"有效","1":"无效"}
	},
	"CZY" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS", 
		"paging" : "paging",
		"style" : "jl_list_03",
        "multi": false,
		"title" : [ 
		           {"id":"CZY03", "name":"操作员名称", "width":"w03"},  
		           {"id":"SSBM", "name":"所属部门", "width":"w02"},
		           {"id":"SSGS", "name":"所属公司", "width":"w03"},
		           {"id":"CZY07", "name":"有效标记", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w02"}
		          ], 
        "header" :[
				   {"id":"BM01",  "title":"部门代码","hidden":true},
				   {"id":"GSXX01", "title":"公司代码","hidden":true},
                   {"id":"CZY01", "title":"操作员编号","hidden":true},
                   {"id":"CZY02", "title":"操作员代码","hidden":true},
                   {"id":"CZY03", "groupid":"CZY03", "rowindex":1, "title":"操作员名称"},
                   {"id":"BM02", "groupid":"SSBM", "rowindex":1,"title":"所属部门"},
                   {"id":"GSXX02", "groupid":"SSGS","rowindex":1, "title":"所属公司"}, 
                   {"id":"CZY07","title":"有效标记","editor":"plugin","groupid":"CZY07","groupcss":"w02 overflow_inherit","rowindex":1,
	   					"config":{
	   						"jlid": "JLSelect",
	   						"placeholder" : "请选择类型",
	   						"default": "0", 
	   						"options": {"0":"有效","1":"无效"} 
	   					}
	   			   }, 
                   {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
	  	            	 "config":{
	  		            	 "readonly": ["BM02","GSXX02","CZY01","CZY02"]
	  		             },
	  		             "listener":{
	  		        		 "click": function(data, rowIndex, obj, plugin){
	  		        			 console.info(data);
	  		        		 }
	  		        	 }
	  	           }
                  ]
	}
});

defineRY.setEvent([{
	"selector": "#jlNew",
	"event": "click",
	"func": function(){
	}
}])

defineRY.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = defineRY.getCds("CDS"); 
	  
	//加载Grid数据事件
	console.info('setAfterInit');
	var query = {};
	query.GSXX01 = userInfo.PCRM_GSXX01;
	
	//加载工作流步骤-Grid数据事件  
	var resultData = transport.select(pubJson.getURL("FormUrl")+"/defCZY","selectCZY.do",query);
	console.info(resultData);
	if(!JL.isNull(resultData)){
		CDS.edit();
		CDS.setData({"CZY":resultData}); 
		CDS.post();
	}
});


