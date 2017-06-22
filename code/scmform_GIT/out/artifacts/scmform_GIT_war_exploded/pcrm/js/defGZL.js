var defGZL = JL.JLForm();
var transport = new JLTransport();

defGZL.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = this.getCds("CDS"); 
	CDS.edit();
	CDS.setData({"GZLBZ":[]}); 
	CDS.post();
});

defGZL.setPlugin({ 
		"footer" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"save" : {
					"name": "确定",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						var cds = defGZL.getCds("CDS");
						if(!JL.isNull(cds)){
							cds.submit();
						}
						defGZL.getTab().find(".jl_defCar_header > .close").click(); 
					}
				}
			}
		},
		"bcfooter" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"insert" : {
					"name": "新建",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						console.info('新建');
						 
						defGZL.getCds("CDS").edit();
						defGZL.getCds("CDS").setData({}); 
						defGZL.getCds("CDS").post(); 
						defGZL.getPluginObj("GZLMC").setData({});
						defGZL.getPluginObj("LX01").setData({});
						defGZL.getPluginObj("YXBJ").setData({});
						defGZL.getTab().find('[name="GZL04"]').val(""); 
					}
				},
				"save" : {
					"name": "提交",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						console.info('提交');
						var XmlData = defGZL.getCds("CDS").data;
						var gzlbzs = XmlData.GZLBZ;
						for (var i=0;i<gzlbzs.length;i++){
							var gzlbz = gzlbzs[i];
							
							gzlbz.BZ03 = gzlbz.BZ03.key;
							gzlbz.ZDCS_CC = gzlbz.ZDCS_CC.key;
						}
						
						XmlData["GSXX01"] = defGZL.getPluginObj("GSXX01").getData();//公司代码
						//	defGZL.getTab().find('[name="GSXX01"]').val();  
						XmlData["GZL02"] = defGZL.getPluginObj("GZLMC").getText();   		//工作流的名称
						if (defGZL.getPluginObj("YXBJ").data.length!=0){
							XmlData["GZL03"] = defGZL.getPluginObj("YXBJ").data[0].key; 	//有效标记(0:有效;1:无效;)
						} 
						XmlData["GZL04"] = defGZL.getTab().find('[name="GZL04"]').val();	//排序字段
						if (defGZL.getPluginObj("LX01").data.length>0){
							XmlData["LX01"] = defGZL.getPluginObj("LX01").data[0].key;		//项目类型的代码 
						}
						if (defGZL.getPluginObj("GZLMC").getData().length>0){				//工作流
							XmlData["GZL01"] = defGZL.getPluginObj("GZLMC").getData()[0].key;
						}
						
						console.info(XmlData);
 						var ajaxJson = {};
 	        			ajaxJson["src"] = "defGZL/insertGZL.do";
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
		"bztoolbar" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"insert" : {
					"name": "新增步骤",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						defGZL.getPluginObj("GZLBZ").addRow({"GZLXW":[]});
					}
				}
			}
		},
		"XW01" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GZLBZ.GZLXW.XW01"
		},
		"GSXX01" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GSXX01"
		},
		"XW02" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GZLBZ.GZLXW.XW02"
		},
		"NBZ" : {
			"jlid": "JLSelect",
			"cds": "CDS",
			"cds-field": "GZLBZ.GZLXW.NBZ",
			"placeholder" : "请选择下一步骤",
			"options": {"1":"1"}
		},
		"JK01" : {
			"jlid": "JLSelect",
			"sBillName": "JLInterface",
		    "sOperateName": "selectJK.do",
		    "cds": "CDS",
		    "cds-field": "GZLBZ.GZLXW.JK01",
		    "readonly":false,
			"param" : {}
		},
		"XW04" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GZLBZ.GZLXW.XW04"
		},
		"GZ01" : {
			"jlid": "JLSelect",
			"sBillName": "JLInterface",
		    "sOperateName": "selectYWGZ.do",
		    "cds": "CDS",
		    "cds-field": "GZLBZ.GZLXW.GZ01",
			"param" : {} 
		},
		"ZYZH01" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GZLBZ.GZLXW.ZYZH01"
		},
		"LZZH01" : {
			"jlid": "JLInput",
			"css": "w09",
			"cds": "CDS",
			"cds-field": "GZLBZ.GZLXW.LZZH01"
		},
		"YXBJ" : {
            "jlid": "JLCheckbox",
			"options": {"0":"有效"}
		}, 
        "LX01" : {
            "jlid": "JLMultiSelect",
			"sBillName": "JLInterface",
		    "sOperateName": "selectCDLX.do",
		    "multi" : false,
			"param" : {},
			"listener": {
			      "change":function(){
			       }
		    }
        },
        "GZLMC" : {
            "jlid": "JLMultiSelect",
			"sBillName": "JLInterface",
		    "sOperateName": "selectAllGZL.do",
		    "multi" : false,
			"param" : {},
			"listener": {
				"click": function(row){  
					console.info('加载工作流步骤');
					
					//加载工作流步骤-Grid数据事件 
					var XmlData ={};
					XmlData["GZL01"] = row.key;
					var resultData = transport.select(pubJson.getURL("FormUrl")+"/defGZL","selectGZLBZ.do",XmlData);
					console.info(resultData.hashMapList);
					if(!JL.isNull(resultData)){
						var gzl = resultData.hashMapList[0];
						
						CDS.edit();
						CDS.setData({"GZLBZ":gzl.GZLBZ}); 
						CDS.post(); 
						
						defGZL.getPluginObj("YXBJ").setData([{"key":gzl.GZL03}]); 
					    defGZL.getPluginObj("LX01").setData([{"key":gzl.LX01,"value":gzl.LX02}]); 
						defGZL.getTab().find('[name="GZL04"]').val(resultData.hashMapList[0].GZL04);
					}
				}
		    }
        },
        "GZLBZ" : {
	         "jlid": "JLLayoutGrid", 
	         "cds" : "CDS",
	 		 "paging" : "paging",
	 		 "style" : "jl_list_03",
	         "multi": false,
	 		 "title": [  
	 			{"id":"BZ02","name":"步骤名称","width":"w02"},
	 			{"id":"BZ03","name":"步骤类型","width":"w02"},
	 			{"id":"BZ05","name":"步骤处理时限(S)","width":"w02"},
	 			{"id":"BZGW","name":"岗位名称","width":"w03"},
	 			{"id":"ZDCS_CC","name":"自动抄送","width":"w02"},
	 			{"id":"BZCZ","name":"操作","width":"w01"}
	 		 ],
	 		 "header": [
	 		    {"id":"GZL01","title":"工作流编号","fontcolor":"red","hidden":true},
				{"id":"BZ01","title":"步骤编号","fontcolor":"red","hidden":true},
				{"id":"GZLXW","title":"GZLXW","fontcolor":"red","hidden":true},
				{"id":"BZ02","title":"步骤名称","editor":"text","groupid":"BZ02","rowindex":1},
				{"id":"BZ03","title":"步骤类型","editor":"plugin","groupid":"BZ03","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择类型",
						"default": "0", 
						"options": {"0":"中间步骤","1":"开始步骤","2":"结束步骤"} 
					}
				},
				{"id":"BZ05","title":"步骤处理时限","editor":"text","groupid":"BZ05","rowindex":1},
				{"id":"BZGW","title":"岗位名称","editor":"plugin","groupid":"BZGW","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLMultiSelect",
						"sBillName": "JLInterface",
					    "sOperateName": "selectGW.do",
					    "multi" : true,
						"param" : {"GSXX01":userInfo.PCRM_GSXX01},
						"listener": {
							"click": function(row){  
								console.info('加载工作流步骤');
							}
					    }
					}
				},
				{"id":"ZDCS_CC","title":"自动抄送","editor":"plugin","groupid":"ZDCS_CC","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"placeholder" : "请选择类型", 
						"default": "1", 
						"options": {"0":"不抄送","1":"抄送"} 
					}
				},
				{"id":"edit", "groupid":"BZCZ", "title":"编辑行为", "editor":"link","rowindex":1,  
		             "listener":{
		        		 "click": function(thisPlugin, rowIndex, obj){
		        			var retdata = thisPlugin.data[rowIndex];
		        			thisPlugin.getCds().buildDataPointer(thisPlugin.config["cds-field"], retdata._cdsid);
		        		 }
		        	 }
	            },
				{"id":"edit", "groupid":"BZCZ", "title":"新增行为", "editor":"link","rowindex":2,  
		             "listener":{
		        		 "click": function(thisPlugin, rowIndex, obj){
		        			console.info('新增行为');
		        			var xwdatas = thisPlugin.data;
		        			var retdata = thisPlugin.data[rowIndex];
		        			thisPlugin.getCds().buildDataPointer(thisPlugin.config["cds-field"], retdata._cdsid);
		        			defGZL.getPluginObj("GZLXW").addRow({});
		        			var cds = defGZL.getCds("CDS");
							if(!JL.isNull(cds)){
								cds.edit();
							}
							
							if (xwdatas.length>0){
								var options={};
								for (var i=0;i<xwdatas.length;i++){
									if (thisPlugin.data[rowIndex].BZ01!=xwdatas[i].BZ01 && xwdatas[i].BZ03!=1){
										options[xwdatas[i].BZ01] = xwdatas[i].BZ02;
									}
								}
							}
							defGZL.getPluginObj("NBZ").config.options = options;
							defGZL.getPluginObj("NBZ").loadOption();
							
							defGZL.emptyCard();
							defGZL.readonly(this, true);
							defGZL.cardGridIndex = null;
							JL.showCard(defGZL.getTab().find(".jl_defCar")); 
		        		 }
		        	 }
	            },
				{"id":"delete","title":"删除","editor":"i","groupid":"BZCZ","rowindex":2,"align":"center","css":"fa fa-trash-o",
	            	"listener":{
		        		 "click": function(thisPlugin, rowIndex, obj){
		        			 console.info(thisPlugin);
	            			 var XmlData = thisPlugin.data[rowIndex];
	 						 var ajaxJson = {};
	 	        			 ajaxJson["src"] = "defGZL/updateGZLBZ.do";
	 	        			 ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	 	        			 var resultData = JL.ajax(ajaxJson);
	 	        			 if (resultData.data.returnMap==1){
	 	        				JL.tip("删除成功！", null);
	 	        			 }else{
	 	        				JL.tip("删除失败！", null);
	 	        			 }
	 	        			 if(!JL.isNull(resultData)){
	            				 plugin.removeRow(rowIndex);
	            			 } 
		        		 }
	            	}
				}
	 		  ]
        },
        "GZLXW" : {
	         "jlid": "JLLayoutGrid",
	         "cds" : "CDS",
	         "cds-field":"GZLBZ.GZLXW",
	 		 "paging" : "paging",
	         "multi": false,
	 		 "title": [
	 			{"id":"NBZ","name":"下一步步骤名称","width":"w02"},
	 			{"id":"XW02","name":"行为名称","width":"w02"},
	 			{"id":"GZ01","name":"业务过滤规则","width":"w03"},
	 			{"id":"ZYZH01","name":"摘要编号","width":"w02"},
	 			{"id":"LZZH01","name":"流转编号","width":"w02"},
	 			{"id":"XWCZ","name":"操作","width":"w01"}
	 		 ],
	 		 "header": [
	 		    {"id":"BZ01","title":"步骤编号","hidden":true}, 
				{"id":"XW01","title":"行为编码","hidden":true},
				{"id":"NBZ","title":"下一步步骤名称","groupid":"NBZ","rowindex":1},
				{"id":"XW02","title":"行为名称","groupid":"XW02","rowindex":1},
				{"id":"GZ01","title":"业务过滤规则","groupid":"GZ01","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"sBillName": "JLInterface",
					    "sOperateName": "selectYWGZ.do",
						"param" : {},
						"listener": {
						      "change":function(data){
						       }
					    } 
					}
				},
				{"id":"ZYZH01","title":"摘要","groupid":"ZYZH01","rowindex":1},
				{"id":"LZZH01","title":"流转","groupid":"LZZH01","rowindex":1},
				{"id":"edit", "groupid":"XWCZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
	            	 "config":{
		            	 "readonly": ["NBZ01","XW01"]
		             },
		             "listener":{
		        		 "click": function(thisPlugin, rowIndex, obj, data){
		        			 console.info('编辑');
		        			 var bzdatas = defGZL.getPluginObj("GZLBZ").data;
		        			 if (bzdatas.length>0){
								var options={};
								for (var i=0;i<bzdatas.length;i++){
									if (thisPlugin.data[rowIndex].BZ01!=bzdatas[i].BZ01 && bzdatas[i].BZ03!=1){
										options[bzdatas[i].BZ01] = bzdatas[i].BZ02;
									}
								}
							}
							defGZL.getPluginObj("NBZ").config.options = options;
							defGZL.getPluginObj("NBZ").loadOption();
		        		 }
		        	 }
	            },
				{"id":"delete","title":"删除","editor":"i","groupid":"XWCZ","align":"center","rowindex":1,"css":"fa fa-trash-o",
	            	"listener":{
		        		 "click": function(thisPlugin, rowIndex, obj){
		        			 console.info(thisPlugin);
	            			 var XmlData = thisPlugin.data[rowIndex];
	 						 var ajaxJson = {};
	 	        			 ajaxJson["src"] = "defGZL/updateGZLXW.do";
	 	        			 ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	 	        			 var resultData = JL.ajax(ajaxJson);
	 	        			 if (resultData.data.returnMap==1){
	 	        				JL.tip("删除成功！", null);
	 	        			 }else{
	 	        				JL.tip("删除失败！", null);
	 	        			 }
	 	        			 if(!JL.isNull(resultData)){
	            				 plugin.removeRow(rowIndex);
	            			 } 
		        		 }
		        	}
				}
	 		 ]
        }
});

