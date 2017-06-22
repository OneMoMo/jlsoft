var defineCD = JL.JLForm();
var transport = new JLTransport();

defineCD.setPlugin({
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
					XmlData.VIEW01 = defineCD.getPluginObj("VIEW01").data;
					XmlData.VIEW02 = defineCD.getPluginObj("VIEW02").data;
					XmlData.VIEW03 = defineCD.getPluginObj("VIEW03").data;
					XmlData.VIEW04 = defineCD.getPluginObj("VIEW04").data;
					XmlData.VIEW05 = defineCD.getPluginObj("VIEW05").data.key;
					XmlData.VIEW06 = defineCD.getPluginObj("VIEW06").data.key;
					XmlData.VIEW07 = defineCD.getPluginObj("VIEW07").data.key;
					XmlData.VIEW08 = defineCD.getPluginObj("VIEW08").data.key;
					XmlData.VIEW09 = defineCD.getPluginObj("VIEW09").data;
					XmlData.VIEW10 = defineCD.getPluginObj("VIEW10").data.key;
					XmlData.VIEW11 = defineCD.getPluginObj("VIEW11").data;
					XmlData.MENU01 = defineCD.getPluginObj("MENU01").data;
					XmlData.MENU02 = defineCD.getPluginObj("MENU02").data;
					XmlData.YXBJ = defineCD.getPluginObj("YXBJ").data.key;
					
					console.info(XmlData);
					var ajaxJson = {};
					if (XmlData.VIEW01>0){
						ajaxJson["src"] = "defMENU/updateCD.do";
					}else{
						ajaxJson["src"] = "defMENU/insertCD.do";
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
	"VIEW01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.VIEW01"
	},
	"VIEW02" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.VIEW02"
	},
	"VIEW03" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.VIEW03"
	},
	"VIEW04" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.VIEW04"
	},
	"VIEW05" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "CD.VIEW05",
		"placeholder" : "请选择",
		"options": {"0":"非末级","1":"末级"}
	},
	"VIEW06" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "CD.VIEW06",
		"placeholder" : "请选择",
		"options": {"0":"否","1":"是"}
	},
	"VIEW07" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "CD.VIEW07",
		"placeholder" : "请选择",
		"options": {"0":"否","1":"是"}
	},
	"VIEW08" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "CD.VIEW08",
		"placeholder" : "请选择",
		"options": {"0":"否","1":"是"}
	},
	"VIEW09" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.VIEW09"
	},
	"VIEW10" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "CD.VIEW10",
		"placeholder" : "请选择",
		"options": {"0":"活页","1":"全屏","2":"新窗口"}
	},
	"VIEW11" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.VIEW11"
	},
	"MENU01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.MENU01"
	},
	"MENU02" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "CD.MENU02"
	},
	"YXBJ" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "CD.YXBJ",
		"placeholder" : "请选择",
		"options": {"0":"有效","1":"无效"}
	},
	"CD" : {
		"jlid" : "JLTreeGrid",
		"cds": "CDS", 
		"current": "VIEW01",		//当前节点
		"parent": "VIEW03",	//上级节点
		"level": "VIEW04",		//级别
		"final": {"id":"VIEW05", "key": "1"},//末级标记
		"title" : [
		     {"id":"VIEW02", "name":"名称", "width":"w03"},
		     {"id":"VIEW05", "name":"末级标记", "width":"w01"},
		     {"id":"VIEW06", "name":"PC使用", "width":"w01"},
		     {"id":"VIEW07", "name":"PAD使用", "width":"w01"},
		     {"id":"VIEW08", "name":"PHONE使用", "width":"w01"},
		     {"id":"VIEW10", "name":"打开方式", "width":"w01"},
		     {"id":"VIEW11", "name":"顺序号", "width":"w01"}, 
		     {"id":"YXBJ", "name":"有效标记", "width":"w01"}, 
			 {"id":"CZ", "name":"操作", "width":"w02"}
        ],
		"header" : [
             {"id":"VIEW01", "title":"展示菜单代码", "hidden":true},
             {"id":"VIEW03", "title":"上级展示菜单编码", "hidden":true},
             {"id":"VIEW04", "title":"展示菜单级别", "hidden":true},
             {"id":"VIEW09", "title":"图标 ", "hidden":true},
             {"id":"MENU01", "title":"关联菜单", "hidden":true}, 
             {"id":"MENU02", "title":"菜单配置 ", "hidden":true},
             {"id":"VIEW02", "groupid":"VIEW02", "title":"展示菜单名称"},
             {"id":"VIEW05","title":"末级标记","editor":"plugin","groupid":"VIEW05","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择",
						"default": "0", 
						"options": {"0":"非末级","1":"末级"} 
					}
			 }, 
			 {"id":"VIEW06","title":"PC使用","editor":"plugin","groupid":"VIEW06","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择",
						"default": "0", 
						"options": {"0":"否","1":"是"} 
					}
			 },
			 {"id":"VIEW07","title":"PAD使用","editor":"plugin","groupid":"VIEW07","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择",
						"default": "0", 
						"options": {"0":"否","1":"是"} 
					}
			 }, 
			 {"id":"VIEW08","title":"PHONE使用","editor":"plugin","groupid":"VIEW08","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择",
						"default": "0", 
						"options": {"0":"否","1":"是"} 
					}
			 },  
			 {"id":"VIEW10","title":"打开方式","editor":"plugin","groupid":"VIEW10","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择",
						"default": "0", 
						"options": {"0":"活页","1":"全屏","2":"新窗口"} 
					}
			 },    
             {"id":"VIEW11", "groupid":"VIEW11", "title":"顺序号 "},
             {"id":"YXBJ","title":"有效标记","editor":"plugin","groupid":"YXBJ","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择",
						"default": "0", 
						"options": {"0":"有效","1":"无效"} 
					}
			 },    
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "editor":"JLNewChild", 
					 "config":{
		            	 "readonly": ["VIEW01","VIEW03","VIEW04","MENU01"],
		            	 "mapping":{"VIEW01":"VIEW03","VIEW02":"V_VIEW02","VIEW04":"VIEW04"}
					 }
			 },
             {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit", 
            	 "config":{
	            	 "readonly": ["VIEW01","VIEW03","VIEW04","MENU01"],
	            	 "mapping":{}
	             },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 console.info(data);
	        		 }
	        	 }
             },
             {"id":"delete", "groupid":"CZ", "title":"删除", "editor":"link",
            	 "listener":{
            		 "click": function(data, rowIndex, obj, plugin){
            			 console.info(data);
            			 var XmlData = data;
            			 XmlData["S_VALUE"]= "D1"; 
            			 XmlData["YXBJ"] = {"key":"1", "value":"无效"};
            			 var ajaxJson = {};
            			 ajaxJson["src"] = "defMENU/updateCD.do";
            			 ajaxJson["data"] = {"jyl":true,"json":JSON.stringify(XmlData)};
            			 var resultData = JL.ajax(ajaxJson);
            			 console.info(resultData);
            			 if(!JL.isNull(resultData)){
            				 plugin.removeRow(rowIndex);
            			 }
            		 }
            	 }
             }
		],
		"listener":{
			"loadRow": function(thisPlugin, data, rowIndex, dl){
				var row=data;
				if (typeof(data.VIEW05)!="object"){
					if (data.VIEW05 == '0'){
						row.VIEW05 = {"key":data.VIEW05,"value":"非末级"};
					}else{
						row.VIEW05 = {"key":data.VIEW05,"value":"末级"};
					}
				}
				if (typeof(data.VIEW06)!="object"){
					if (data.VIEW06 == '0'){
						row.VIEW06 = {"key":data.VIEW06,"value":"否"};
					}else{
						row.VIEW06 = {"key":data.VIEW06,"value":"是"};
					}
				}
				if (typeof(data.VIEW07)!="object"){
					if (data.VIEW07 == '0'){
						row.VIEW07 = {"key":data.VIEW07,"value":"否"};
					}else{
						row.VIEW07 = {"key":data.VIEW07,"value":"是"};
					}
				}
				if (typeof(data.VIEW08)!="object"){
					if (data.VIEW08 == '0'){
						row.VIEW08 = {"key":data.VIEW08,"value":"否"};
					}else{
						row.VIEW08 = {"key":data.VIEW08,"value":"是"};
					}
				}
				if (typeof(data.VIEW10)!="object"){
					if (data.VIEW10 == '0'){
						row.VIEW10 = {"key":data.VIEW10,"value":"活页"};
					}else if(data.VIEW10 == '1'){
						row.VIEW10 = {"key":data.VIEW10,"value":"全屏"};
					}else if(data.VIEW10 == '2'){
						row.VIEW10 = {"key":data.VIEW10,"value":"新窗口"};
					}
				}
				if (typeof(data.YXBJ)!="object"){
					if (data.YXBJ == '0'){
						row.YXBJ = {"key":data.YXBJ,"value":"有效"};
					}else{
						row.YXBJ = {"key":data.YXBJ,"value":"无效"};
					}
				}
				
				thisPlugin.setRow(row,rowIndex);
			}
		}
	}
});

defineCD.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = defineCD.getCds("CDS"); 
	  
	//加载Grid数据事件
	console.info('setAfterInit');
	var query = {};
	query.GSXX01 = userInfo.PCRM_GSXX01;
	
	//加载工作流步骤-Grid数据事件  
	var resultData = transport.select(pubJson.getURL("FormUrl")+"/defMENU","selectCD.do",query);
	console.info(resultData);
	if(!JL.isNull(resultData)){
		CDS.edit();
		CDS.setData({"CD":resultData}); 
		CDS.post();
	}
});


