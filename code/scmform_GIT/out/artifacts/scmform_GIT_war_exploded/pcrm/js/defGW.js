var defGW = JL.JLForm();
var transport = new JLTransport();
 
defGW.setPlugin({ 
		"footer" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"save" : {
					"name": "提交",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						console.info("提交");
						var cds = defGW.getCds("CDS");
						if(!JL.isNull(cds)){
							cds.submit();
						}
						
						var XmlData = {};
						XmlData["GW01"]=defGW.getPluginObj("GW01").data;
						XmlData["GW02"]=defGW.getPluginObj("GW02").data;
						XmlData["GW03"]=defGW.getPluginObj("GW03").data.key;
						if (!JL.isNull(defGW.getPluginObj("GSXX01").data)){
							XmlData["GSXX01"]=defGW.getPluginObj("GSXX01").data;
						}else{
							XmlData["GSXX01"]=userInfo.PCRM_GSXX01;
						}
						
						var ajaxJson = {};
						if (defGW.getPluginObj("GW01").data>0){
							ajaxJson["src"] = "defGW/updateGW.do";
						}else{
							ajaxJson["src"] = "defGW/insertGW.do";
						}
 	        			
 	        			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
 	        			var resultData = JL.ajax(ajaxJson);
 	        			if (resultData.data.returnMap==1){
 	        				JL.tip("提交成功！", null);
 	        			}else{
 	        				JL.tip("提交失败！", null);
 	        			}
 	        			defGW.getTab().find(".jl_defCar > .jl_defCar_header > .close").click();
						/*console.info(thisPlugin);
          			 	var XmlData = thisPlugin.data[rowIndex];
						var ajaxJson = {};
	        			ajaxJson["src"] = "defGW/updateGZLBZ.do";
	        			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	        			var resultData = JL.ajax(ajaxJson);
	        			if (resultData.data.jlbh>0){
	        				JL.tip("提交成功！", null);
	        			}else{
	        				JL.tip("提交失败！", null);
	        			}
	        			if(!JL.isNull(resultData)){
	        				plugin.removeRow(rowIndex);
          			  	} 
	        			 
						defGZL.getTab().find(".jl_defCar_header > .close").click(); */
					}
				},
				"jlEmptyCard":{}
			}
		},
		"gwtoolbar" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"insert" : {
					"name": "新增岗位",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						//defGW.getPluginObj("GW").addRow({});
						var cds = defGW.getCds("CDS"); 
						if(!JL.isNull(cds)){
							cds.edit();
						}
						
						defGW.emptyCard();
						defGW.readonly(this, true);
						defGW.cardGridIndex = null;
						//defGW.getTab().find(".jl_defCar").show();
						JL.showCard(defGW.getTab().find(".jl_defCar"));  
					}
				}
			}
		},
		"GWXX" : {
            "jlid": "JLMultiSelect", 
            "sBillName": "JLInterface",
		    "sOperateName": "selectGW.do",  
			"param" : {"GSXX01":userInfo.PCRM_GSXX01},
			"listener": {
				"click": function(row){  
					console.info('岗位');
					var GWList = []; 
					var GWXX = defGW.getPluginObj("GWXX").getData();
					for (var i=0;i<GWXX.length;i++){
						GWList.push(GWXX[i].key);
					}
					defGW.getPluginObj("GW").showRowById('GW01',GWList);
				}
		    }
        },
        "GSXX01" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GW.GSXX01"
		},
		"GW01" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GW.GW01"
		},
		"GW02" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GW.GW02"
		},
		"GW03" : {
			"jlid": "JLSelect",
			"cds": "CDS",
			"cds-field": "GW.GW03",
			"placeholder" : "请选择",
			"options": {"0":"有效","1":"无效"}
		},
        "GW" : {
	         "jlid": "JLLayoutGrid", 
	         "cds" : "CDS",
	 		 "paging" : "paging",
	 		 "style" : "jl_list_03",
	         "multi": false,
	 		 "title": [  
	 			{"id":"GW02","name":"岗位名称","width":"w03"}, 
	 			{"id":"GSXX02","name":"公司名称","width":"w03"},
	 			{"id":"GW03","name":"有效标记","width":"w02"},
	 			{"id":"GW","name":"操作","width":"w02"}
	 		 ],
	 		 "header": [
	 		    {"id":"GW01","title":"工作流编号","fontcolor":"red","hidden":true},
				{"id":"GSXX01","title":"公司编号","fontcolor":"red","hidden":true}, 
				{"id":"GW02","title":"岗位名称","groupid":"GW02","rowindex":1},
				{"id":"GSXX02","title":"公司名称","groupid":"GSXX02","rowindex":1},
				{"id":"GW03","title":"有效标记","editor":"plugin","groupid":"GW03","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择类型",
						"default": "0", 
						"options": {"0":"有效","1":"无效"} 
					}
				}, 
				{"id":"edit", "groupid":"GW", "title":"编辑", "editor":"JLEdit","rowindex":1,
	            	 "config":{
		            	 "readonly": ["GW01"]
		             },
		             "listener":{
		        		 "click": function(data, rowIndex, obj, plugin){
		        			// defGW.getTab().find(".jl_defCar").show();
		        			 JL.showCard(defGW.getTab().find(".jl_defCar"));  
		        		 }
		        	 }
	            }
	 		  ]
        }
});


defGW.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = defGW.getCds("CDS"); 
	  
	//加载Grid数据事件
	console.info('setAfterInit');
	var query = {};
	query.GSXX01 = userInfo.PCRM_GSXX01;
	
	//加载工作流步骤-Grid数据事件  
	var resultData = transport.select(pubJson.getURL("FormUrl")+"/defGW","selectGWXX.do",query);
	console.info(resultData);
	if(!JL.isNull(resultData)){
		CDS.edit();
		CDS.setData({"GW":resultData}); 
		CDS.post();
	} 
});

