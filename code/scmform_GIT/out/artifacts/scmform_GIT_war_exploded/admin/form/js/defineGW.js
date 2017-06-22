var defineGW = JL.JLForm();
defineGW.setPlugin({
	"new":{
		"jlid" : "JLToolBar",
		"buttons":{
			"new": {
				"name": "提交",
				"icon": "check",
				"css": "jl_btn btn_color mr10",
				"func": function(){
					var thisPlugin = defineGW.getPluginObj("GW");
					var XmlData={};
					XmlData["GW01"] = defineGW.getPluginObj("GW01").getData();
					XmlData["GW02"] = defineGW.getPluginObj("GW02").getData();
					XmlData["MENU"] = defineGW.getPluginObj("MENU").getData();
					if (!JL.isNull(defineGW.getPluginObj("GW03").getData())){
						XmlData["GW03"] = defineGW.getPluginObj("GW03").getData()[0].key;
					}else{
						XmlData["GW03"] = 1;
					}
					var GSXX01 = defineGW.getPluginObj("GSXX01").getData();
					if(!JL.isNull(GSXX01)){
						XmlData["GSXX01"] = [];
						for(var i=0; i<GSXX01.length; i++){
							XmlData["GSXX01"].push(GSXX01[i]["key"]);
						}
					}else{
						if(defineGW.CZY14 != 2){
							JL.tip("请选择所属公司");
							return false;
						}
						XmlData["GSXX01"] = [""];
					}
			    	var ajaxJson = {};
			    	if(!JL.isNull(XmlData.GW01)){
			    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defGW/updateGW.do";
			    		XmlData["GSXX01"] = XmlData["GSXX01"][0];
			    	}else{
			    		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defGW/insertGW.do";
			    	}
			    	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
			    	var resultData = JL.ajax(ajaxJson);
			    	if(!JL.isNull(resultData.data)){
			    		resultData = resultData.data;
			    		if(resultData.returnMap == "1"){
			    			JL.tip("保存成功");
			    			/*thisPlugin.setCell(resultData.GW01, rowIndex, "GW01");
			    			thisPlugin.getDL(rowIndex).find("[data-id='choose']").show();*/
			    			defineGW.query();
			    			return true;
			    		}
			    	}
				}
			},
			"cancel": {
				"name": "取消",
				"icon": "check",
				"css": "jl_btn btn_color",
				"func": function(){
					var addCarShow = defineGW.getTab().find(".addCarShow");
					addCarShow.hide();
					defineGW.getTab().append(addCarShow);
				}
			}
		}
	},
	"jlbh":{
		"jlid": "JLInput", 
		"cds": "CDS",
		"cds-field": "GW.jlbh", 
		"format": {
		}
	},
	"GW01":{
		"jlid": "JLInput",
		"cds": "CDS",
	    "cds-field": "GW.GW01", 
	    "readonly": true,
		"format": {
		}
	},
	"GW02":{
		"jlid": "JLInput", 
		"cds": "CDS",
	    "cds-field": "GW.GW02", 
		"format": {
		}
	},
	"GW03" : {
		 "jlid": "JLCheckbox", 
		 "default":"0", 
		 "options": {"0":"有效"},
		 "cds": "CDS",
		    "cds-field": "GW.GW03", 
		 "listener": {  
			  "change": function(data){
			  }
		  }
	},
	"GSXX01" : {
		"jlid": "JLMultiSelect", 
		"cds": "CDS",
		"cds-field": "GW.GSXX01", 
		"sqlid":"JCDY.GSXX",
		"resource": "scmform"
	},
	"MENU" : {
		"jlid": "JLMultiTree", 
		"cds": "CDS",
		"cds-field": "GW.MENU", 
		"sBillName": pubJson.getURL("FormUrl") + "/user/selectMenu.do",
		"sOperateName": "",
		"param" : {"ALL": true},
		"listener": { 
			"click": function(){
			},
			"change": function(data){
			}
		}
	},
	"GW": {
		"jlid": "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "local",
		"pagesize": 50,
		"multi":false,
		"mode": "edit",
		"rowclass": "pl10",
		"buttons": {
			"jlNew": {
				"listener":{
					"click": function(data){   
						if(defineGW.CZY14 == 0){
							defineGW.getPluginObj("GSXX01").setData([{"key":userInfo.PCRM_GSXX01}]);
						}
					}
			    }
			}
	    },
		"title": [ 
            {"id":"GW01", "name":"岗位编号", "width":"w02 pr0"},
            {"id":"GW02", "name":"岗位名称", "width":"w04 pr0"},
            {"id":"GSXX01", "name":"所属公司", "width":"w04 pr0"},
            {"id":"GW03", "name":"有效标记", "width":"w01 pr0"},
            {"id":"CZ", "name":"操作", "width":"w01 tc pr0"}
	    ],
		"header": [
		    {"id":"GW01", "groupid":"GW01", "title":"岗位编号"},       
		    {"id":"GW02", "groupid":"GW02", "title":"岗位名称"},   
		    {"id":"GSXX02", "groupid":"GSXX01", "title":"所属公司"},   
		    {"id":"GW03", "groupid":"GW03", "title":"编号", "editor":"plugin", "groupcss":"pr0", "css":"pl15",
		    	"config":{
		    		"jlid": "JLCheckbox",
		    		"options": {
		    			"0": ""
		    		}
		    	}
		    },
		    {"id":"view", "title":"查看", "editor":"JLEdit", "groupid":"CZ", "rowindex":1, 
		    	"config":{
	          		"readonly": ["GW01", "GW02", "GW03", "GSXX01", "MENU"],
	          		"mapping":{}
	        	},
		    	"listener": {
			    	"edit":function(thisPlugin,rowIndex){//参数data为点击的值，是个json对象
			    		defineGW.find("#d_new").closest("li").hide();
			    	}
		    	}
		    },
		    {"id":"copy", "title":"复制", "groupid":"CZ", "rowindex":1, "editor":"link",
	          	 "listener":{
	          		"click": function(thisPlugin, rowIndex, obj){
	          			defineGW.getTab().find("#jlNew").click();
	          			
	          			var XmlData = thisPlugin.getData(rowIndex);
		    			var ajaxJson = {};
		    			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defGW/selectGWCDQX.do";
		    			ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
		    			var resultData = JL.ajax(ajaxJson);
		    			defineGW.getPluginObj("MENU").setData(resultData.data.returnList);
		    			
	          			$.each(thisPlugin.getData(rowIndex), function(key, value){
	          				var plugin = defineGW.getPluginObj(key);
	          				if(!JL.isNull(plugin) && $.inArray(key, ["GW01"]) == -1){
	          					if(key == "GSXX01"){
	          						if(defineGW.CZY14 == 0){
	          							plugin.setData(value);
	          						}
	          					}else{
	          						plugin.setData(value);
	          					}
	          				}
	          			})
	           		}
	          	 }
		    },
		    {"id":"update", "title":"编辑", "editor":"JLEdit", "groupid":"CZ", "rowindex":1, 
		    	"config":{
		    		"readonly": ["GW01","GSXX01"],
		    		"mapping":{}
		    	},
		    	"listener": {
		    		"edit":function(thisPlugin,rowIndex){//参数data为点击的值，是个json对象
		    			var XmlData = thisPlugin.getData(rowIndex);
		    			var ajaxJson = {};
		    			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defGW/selectGWCDQX.do";
		    			ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
		    			ajaxJson["async"] = true;
		    			ajaxJson["callback"] = function(resultData){
		    				defineGW.getPluginObj("MENU").setData(resultData.data.returnList);
			    			defineGW.find("#d_new").closest("li").show();
		    			};
		    			JL.ajax(ajaxJson);
		    		}
		    	}
		    },
		    {"id":"delete", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1, 
		    	"listener": {
		    		"delete": function(thisPlugin, rowIndex, obj){
				    	if(!JL.isNull(thisPlugin.getData(rowIndex, "GW01"))){
				    		JL.confirm("是否确认删除?", function(){
				    			var XmlData = thisPlugin.getData(rowIndex);
				    			var ajaxJson = {};
				    			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defGW/deleteGW.do";
				    			ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
				    			var resultData = JL.ajax(ajaxJson);
				    			if(!JL.isNull(resultData.data)){
				    				resultData = resultData.data;
				    				if(resultData.returnMap == "1"){
				    					JL.tip("保存成功");
				    					thisPlugin.removeRow(rowIndex);
				    				}
				    			}
				    		});
		    			}else{
		    				thisPlugin.removeRow(rowIndex);
		    			}
		    		}
		    	}
		    }
        ],
        "listener": {
        	"loadRow": function(thisPlugin, data, rowIndex, dl){
        		dl.find("[data-id='view']").hide();
        		if(defineGW.CZY14 != 2 && JL.isNull(data.GSXX01)){
        			dl.find("[data-id='copy']").hide();
	        		dl.find("[data-id='update']").hide();
	        		dl.find("[data-id='delete']").hide();
	        		dl.find("[data-id='view']").show();
        		}
        	}
        }
	}
});

defineGW.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineGW.query();
	}
}])

defineGW.setAfterInit(function(){
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	if(!JL.isNull(data) && !JL.isNull(data.CZY14)){
		defineGW.CZY14 = data.CZY14;
	}
	
	if(defineGW.CZY14 == 0){
		defineGW.find("#d_GSXX01").closest("li").hide();
	}else if(defineGW.CZY14 == 2){
		defineGW.find("#d_GSXX01").closest("li").find("em.btx").hide();
	}

	defineGW.query();
});

defineGW.query = function(){
	
	var queryField={};
	
	var value = this.getTab().find("[name='query']").val();
	if(!JL.isNull(value)){
		queryField["GW02"] = value;
	}
	if(defineGW.CZY14 == 0){
		queryField["GSXX01"] = userInfo.PCRM_GSXX01;
	}
	var resultData = this.getSqlResult(queryField, "com.jlsoft.framework.pcrm.JCXX", "queryGWXX", "admin/form/search");
	var CDS = this.getCds("CDS");
	CDS.edit(); 
	CDS.setData({"GW":resultData.data});
	CDS.post();
}