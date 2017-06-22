var defGW = JL.JLForm();
var transport = new JLTransport();

defGW.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = this.getCds("CDS"); 
	CDS.edit();
	CDS.setData({"GZLBZ":[]}); 
	CDS.post();
});

defGW.setPlugin({ 
		"footer" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"save" : {
					"name": "确定",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						var cds = defGW.getCds("CDS");
						if(!JL.isNull(cds)){
							cds.submit();
						}
						defGW.getTab().find(".jl_defCar_header > .close").click(); 
					}
				}
			}
		},
		"bcfooter" : {
			"jlid" : "JLToolBar",
			"buttons" : {
				"save" : {
					"name": "提交",
					"icon": "check",
					"css": "jl_btn btn_blue_or",
					"func": function(){
						console.info('asdf');
						var XmlData = defGW.getCds("CDS").data; 
						XmlData["GZL02"] = defGW.getPluginObj("GZLMC").getText();   		//工作流的名称
						if (defGW.getPluginObj("YXBJ").data.length!=0){
							XmlData["GZL03"] = defGW.getPluginObj("YXBJ").data[0].key; 	//有效标记(0:有效;1:无效;)
						} 
						XmlData["GZL04"] = defGW.getTab().find('[name="GZL04"]').val();	//排序字段
						if (defGW.getPluginObj("LX01").data.length>0){
							XmlData["LX01"] = defGW.getPluginObj("LX01").data[0].key;			//项目类型的代码 
						}
						
 						var ajaxJson = {};
 	        			ajaxJson["src"] = "defGW/insertGZL.do";
 	        			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
 	        			var resultData = JL.ajax(ajaxJson);
 	        			if (resultData.data.jlbh>0){
 	        				JL.tip("提交成功！", null);
 	        			}else{
 	        				JL.tip("提交失败！", null);
 	        			}
					}
				}
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
						defGW.getPluginObj("GZLBZ").addRow({"GZLXW":[]});
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
			"options": {"1":"主机","2":"键盘","3":"鼠标"}
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
			"options": {"1":"有效"}
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
					var resultData = transport.select(pubJson.getURL("FormUrl")+"/defGW","selectGZLBZ.do",XmlData);
					if(!JL.isNull(resultData)){
						CDS.edit();
						CDS.setData({"GZLBZ":resultData.hashMapList}); 
						CDS.post();
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
	 			{"id":"BZCZ","name":"操作","width":"w01",}
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
					    "sOperateName": "selectAllGZL.do",
					    "multi" : true,
						"param" : {},
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
		        			var xwdatas = thisPlugin.data;
		        			var retdata = thisPlugin.data[rowIndex];
		        			thisPlugin.getCds().buildDataPointer(thisPlugin.config["cds-field"], retdata._cdsid);
		        			defGW.getPluginObj("GZLXW").addRow({});
		        			var cds = defGW.getCds("CDS");
							if(!JL.isNull(cds)){
								cds.edit();
							}
							
							if (xwdatas.length>0){
								var options={};
								for (var i=0;i<xwdatas.length;i++){
									if (thisPlugin.data[0].BZ01){
										
									}
									options[thisPlugin.data[0].BZ01] = thisPlugin.data[0].BZ02;
								}
							}
							defGW.getPluginObj("NBZ").config.options = options;
							defGW.getPluginObj("NBZ").loadOption();
							
							defGW.emptyCard();
							defGW.readonly(this, true);
							defGW.cardGridIndex = null;
							JL.showCard(defGW.getTab().find(".jl_defCar")); 
		        		 }
		        	 }
	            },
				{"id":"delete","title":"删除","editor":"i","groupid":"BZCZ","rowindex":2,"align":"center","css":"fa fa-trash-o",
	            	"listener":{
		        		 "click": function(thisPlugin, rowIndex, obj){
		        			 console.info(thisPlugin);
	            			 var XmlData = thisPlugin.data[rowIndex];
	 						 var ajaxJson = {};
	 	        			 ajaxJson["src"] = "defGW/updateGZLBZ.do";
	 	        			 ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	 	        			 var resultData = JL.ajax(ajaxJson);
	 	        			 if (resultData.data.jlbh>0){
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
	 			{"id":"NBZ02","name":"下一步步骤名称","width":"w02"},
	 			{"id":"XW02","name":"行为名称","width":"w02"},
	 			{"id":"GZ01","name":"业务过滤规则","width":"w03"},
	 			{"id":"ZYZH01","name":"摘要编号","width":"w02"},
	 			{"id":"LZZH01","name":"流转编号","width":"w02"},
	 			{"id":"XWCZ","name":"操作","width":"w01"}
	 		 ],
	 		 "header": [
	 		    {"id":"BZ01","title":"步骤编号","hidden":true}, 
				{"id":"NBZ01","title":"下一步步骤编号","hidden":true},
				{"id":"XW01","title":"行为编码","hidden":true},
				{"id":"NBZ02","title":"下一步步骤名称","groupid":"NBZ02","rowindex":1},
				{"id":"XW02","title":"行为名称","groupid":"XW02","rowindex":1},
				{"id":"GZ01","title":"业务过滤规则","groupid":"GZ01","groupcss":"w02 overflow_inherit","rowindex":1,
					"config":{
						"jlid": "JLSelect",
						"sBillName": "JLInterface",
					    "sOperateName": "selectYWGZ.do",
						"param" : {},
						"listener": {
						      "change":function(data){
							     /* alert(data.key);
							      alert(data.value);*/
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
		        		 "click": function(data, rowIndex, obj, plugin){
		        			 console.info(data);
		        		 }
		        	 }
	            },
				{"id":"delete","title":"删除","editor":"i","groupid":"XWCZ","align":"center","rowindex":1,"css":"fa fa-trash-o",
	            	"listener":{
		        		 "click": function(thisPlugin, rowIndex, obj){
		        			 console.info(thisPlugin);
	            			 var XmlData = thisPlugin.data[rowIndex];
	 						 var ajaxJson = {};
	 	        			 ajaxJson["src"] = "defGW/updateGZLXW.do";
	 	        			 ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	 	        			 var resultData = JL.ajax(ajaxJson);
	 	        			 if (resultData.data.jlbh>0){
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

