/**
 * @author 陈奇
 * 2016-8-8 16:41:24
 */
var WLGS01=0;
var defineSHFYBZ = JL.JLForm();
//var thisPlugin = this;


defineSHFYBZ.setPlugin({
	"PLGX" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"PLGX" : {
				// "grid": "LIST",
				"name" : "批量更新",
				"icon" : "fa fa-reply-all",
				"func" : function() {
					debugger;
					 var  ZZTJ = defineSHFYBZ.getPluginObj("TJ").getData();
					 var  JULI = defineSHFYBZ.getPluginObj("JULI").getData();
					 var  FYDJ = defineSHFYBZ.getPluginObj("FYDJ").getData();
					 var  CFDJ = defineSHFYBZ.getPluginObj("CFDJ").getData();
					 
						if (JL.isNull(defineSHFYBZ.getPluginObj("TJFYMX").getData(0))) {
							JL.tip("请先选择地区");
							return true;
						}
						  var j=defineSHFYBZ.getPluginObj("TJFYMX").getSelectedIndex().length;
						  if(j>0){
							  for (var i=0;i<j;i++){
								  if(!JL.isNull(ZZTJ)){
									  defineSHFYBZ.getPluginObj("TJFYMX").setCell(ZZTJ, defineSHFYBZ.getPluginObj("TJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("ZZTJ"));
								  }
								  if(!JL.isNull(JULI)){
									  defineSHFYBZ.getPluginObj("TJFYMX").setCell(JULI, defineSHFYBZ.getPluginObj("TJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("SHJL"));
								  }
								  if(!JL.isNull(FYDJ)){
									  defineSHFYBZ.getPluginObj("TJFYMX").setCell(FYDJ, defineSHFYBZ.getPluginObj("TJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("FYDJ"));
								  }	 
								  if(!JL.isNull(CFDJ)){
									  defineSHFYBZ.getPluginObj("TJFYMX").setCell(CFDJ, defineSHFYBZ.getPluginObj("TJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("CFDJ"));
								  }	 
							  }
						  }
					   else{
						   var j=defineSHFYBZ.getPluginObj("TJFYMX").getData().length;
						   for (var i=0;i<j;i++){
							defineSHFYBZ.getPluginObj("TJFYMX").setCell(ZZTJ, i, defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("ZZTJ"));
							defineSHFYBZ.getPluginObj("TJFYMX").setCell(JULI, i, defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("SHJL"));
							defineSHFYBZ.getPluginObj("TJFYMX").setCell(FYDJ, i, defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("FYDJ"));
							defineSHFYBZ.getPluginObj("TJFYMX").setCell(CFDJ, i, defineSHFYBZ.getPluginObj("TJFYMX").getRowIndexByID("CFDJ"));
						   }
						}
						
				}
			},
			
		}
	},
	"PLGX1" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"PLGX1" : {
				// "grid": "LIST",
				"name" : "批量更新",
				"icon" : "fa fa-reply-all",
				"func" : function() {
					debugger;
					 var  FYDJ1 = defineSHFYBZ.getPluginObj("FYDJ1").getData();
					 var  JFSD_Q = defineSHFYBZ.getPluginObj("JFSD_Q").getData();
					 var  JFSD_E = defineSHFYBZ.getPluginObj("JFSD_E").getData();
					
					 
						if (JL.isNull(defineSHFYBZ.getPluginObj("AJFYMX").getData(0))) {
							JL.tip("请先选择分类");
							return true;
						}
						  var j=defineSHFYBZ.getPluginObj("AJFYMX").getSelectedIndex().length;
						  if(j>0){
							  for (var i=0;i<j;i++){
								  if(!JL.isNull(FYDJ1)){
									  defineSHFYBZ.getPluginObj("AJFYMX").setCell(FYDJ1, defineSHFYBZ.getPluginObj("AJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("AJFYMX").getRowIndexByID("FYDJ1"));
								  }
								  if(!JL.isNull(JFSD_Q)){
									  defineSHFYBZ.getPluginObj("AJFYMX").setCell(JFSD_Q, defineSHFYBZ.getPluginObj("AJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("AJFYMX").getRowIndexByID("JFSJQ"));
								  }
								  if(!JL.isNull(JFSD_E)){
									  defineSHFYBZ.getPluginObj("AJFYMX").setCell(JFSD_E, defineSHFYBZ.getPluginObj("AJFYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("AJFYMX").getRowIndexByID("JFSJE"));
								  }	  
							  }
						  }
					 else{
						   var j=defineSHFYBZ.getPluginObj("AJFYMX").getData().length;
						   for (var i=0;i<j;i++){
							  defineSHFYBZ.getPluginObj("AJFYMX").setCell(FYDJ1, i, defineSHFYBZ.getPluginObj("AJFYMX").getRowIndexByID("FYDJ1"));
							  defineSHFYBZ.getPluginObj("AJFYMX").setCell(JFSD_Q, i, defineSHFYBZ.getPluginObj("AJFYMX").getRowIndexByID("JFSJQ"));
							  defineSHFYBZ.getPluginObj("AJFYMX").setCell(JFSD_E, i, defineSHFYBZ.getPluginObj("AJFYMX").getRowIndexByID("JFSJE"));
						      }
						  }
				}
			},
			
		}
	},
	"PLGX2" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"PLGX2" : {
				// "grid": "LIST",
				"name" : "批量更新",
				"icon" : "fa fa-reply-all",
				"func" : function() {
					debugger;
					 var  FYMC1 = defineSHFYBZ.getPluginObj("FYMC1").getData();
					 var  FYDJ2 = defineSHFYBZ.getPluginObj("FYDJ2").getData();
					 var  FYJE = defineSHFYBZ.getPluginObj("FYJE").getData();
					/* var  BL = defineSHFYBZ.getPluginObj("BL").getData();*/
					 var  ZZTJ1 = defineSHFYBZ.getPluginObj("ZZTJ1").getData(); 
					 
						if (JL.isNull(defineSHFYBZ.getPluginObj("CCYYMX").getData(0))) {
							JL.tip("请先选择地区");
							return true;
						}
						  var j=defineSHFYBZ.getPluginObj("CCYYMX").getSelectedIndex().length;
						  if(j>0){
							  for (var i=0;i<j;i++){
								  if(!JL.isNull(FYMC1)){
									  defineSHFYBZ.getPluginObj("CCYYMX").setCell(FYMC1, defineSHFYBZ.getPluginObj("CCYYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("SHFYMC"));
								  }
								  if(!JL.isNull(FYDJ2)){
									  defineSHFYBZ.getPluginObj("CCYYMX").setCell(FYDJ2, defineSHFYBZ.getPluginObj("CCYYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("FYDJ"));
								  }
								  if(!JL.isNull(FYJE)){
									  defineSHFYBZ.getPluginObj("CCYYMX").setCell(FYJE, defineSHFYBZ.getPluginObj("CCYYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("FYJE"));
								  }	 
								  if(!JL.isNull(ZZTJ1)){
									  defineSHFYBZ.getPluginObj("CCYYMX").setCell(ZZTJ1, defineSHFYBZ.getPluginObj("CCYYMX").getSelectedIndex()[i], defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("ZZTJ"));
								  }	 
							  }
						  }
						var j=defineSHFYBZ.getPluginObj("CCYYMX").getData().length;
						for (var i=0;i<j;i++){
							defineSHFYBZ.getPluginObj("CCYYMX").setCell(FYMC1, i, defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("SHFYMC"));
							defineSHFYBZ.getPluginObj("CCYYMX").setCell(FYDJ2, i, defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("FYDJ"));
							defineSHFYBZ.getPluginObj("CCYYMX").setCell(FYJE, i, defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("FYJE"));
							/*defineSHFYBZ.getPluginObj("CCYYMX").setCell(BL, i, defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("BL"));*/
							defineSHFYBZ.getPluginObj("CCYYMX").setCell(ZZTJ1, i, defineSHFYBZ.getPluginObj("CCYYMX").getRowIndexByID("ZZTJ"));
						}
				}
			},
			
		}
	},
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(data){
					debugger;
					console.info(data);
				},
				"success":function(data){
					debugger;
					defineSHFYBZ.getPluginObj("FYBZBM").setData(data.FYBZBM);
					/*var resultData = defineSHFYBZ.query();
					
				    CDS = defineSHFYBZ.getCds("CDS");
					CDS.edit();
					CDS.setData({"LIST":resultData});
					CDS.post();*/
					console.info('after');
					defineSHFYBZ.query();
				}
			},
			"jlCancelSlide":{},
			
			
			/*"jlEmptyCard":{}*/
		}
	},
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",
		 "format":{}
	},
	"FYBZBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYBZBM",
		 "format":{}
	},
	"FYBZMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.FYBZMC",
		 "format":{}
	},
	
	"JFFS" : {
		 "jlid": "JLSelect",
		 "cds":"CDS",
		 "cds-field":"LIST.JFFS",
		 "placeholder":"请选择计费方式",
		 "options" : {"0":"按体积","1":"按件","2":"按车次"},
		 "listener": {
		        "change":function(data){
		        	     debugger;
		                //alert(data.key);
		                if(data.key==0){
		                	debugger;
		                    //显示物流公司
		                	defineSHFYBZ.getTab().find("#LI_WLGS").show();
		                	//屏蔽费用
		                	defineSHFYBZ.getTab().find("#LI_FY").hide();
		                	//屏蔽
		                	//"TJFYBZ": "费用标准",
		            	    //"AJFYBZ": "费用标准",
		            		//"AJSYWD": "试用网点",
		            		//"AJCCFF": "费用标准"
		                    defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").hide();
		                	defineSHFYBZ.getTab().find("[data-id='AJSYWD']").hide();
		                	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").hide();
		                	//显示"TJFYBZ": "费用标准",
		                	defineSHFYBZ.getTab().find("[data-id='TJFYBZ']").show();
		                	defineSHFYBZ.getTab().find("[data-id='TJFYBZ']").click();
		                	defineSHFYBZ.getTab().find("[data-id='TJFYBZ']").attr("class","xuan");
		                	//不显示
		                	defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").attr("class","");
		                	defineSHFYBZ.getTab().find("[data-id='AJSYWD']").attr("class","");
		                	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").attr("class","");
		                	
		                }
		                if(data.key==1){
		                	debugger;
		                	//屏蔽物流公司
		                	defineSHFYBZ.getTab().find("#LI_WLGS").hide();
		                	 //显示费用
		                	defineSHFYBZ.getTab().find("#LI_FY").show();
		                	
		                	//屏蔽
		                	//"TJFYBZ": "费用标准",
		            	    //"AJFYBZ": "费用标准",
		            		//"AJSYWD": "试用网点",
		            		//"AJCCFF": "费用标准"
		                	defineSHFYBZ.getTab().find("[data-id='TJFYBZ']").hide();
		                	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").hide();
		                	//显示
		                	defineSHFYBZ.getTab().find("[data-id='AJSYWD']").show();
		                	defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").show();
		                	defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").click();
		                	defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").attr("class","xuan");
		                	
		                }
		                if(data.key==2){
		                	debugger;
		                    //显示物流公司
		                	defineSHFYBZ.getTab().find("#LI_WLGS").show();
		                	//屏蔽费用
		                	defineSHFYBZ.getTab().find("#LI_FY").hide();
		                	//屏蔽
		                	//"TJFYBZ": "费用标准",
		            	    //"AJFYBZ": "费用标准",
		            		//"AJSYWD": "试用网点",
		            		//"AJCCFF": "费用标准"
		                	defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").hide();
		                	defineSHFYBZ.getTab().find("[data-id='AJSYWD']").hide();
		                	defineSHFYBZ.getTab().find("[data-id='TJFYBZ']").hide();
		                	//显示"TJFYBZ": "费用标准",
		                	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").show();
		                	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").attr("class","xuan");
		                	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").click();
		                }
		               
		        }
		}
	},
	//费用名称
	"FYMC" : {
		 "jlid": "JLInput",
		 "readonly":true,
		 "cds":"CDS",
		 "cds-field":"LIST.FYMC",
		 "format":{
			 
		 },
		"dir" : "scm/pub/search",
	    "namespace" : "SHFY",
	    "placeholder":"点击查找费用名称",
	    "sqlid" : "SHFY",
	    "autoquery" : true,
		"init": {"GSXX01":"GSXX01"},
		"fieldMapping" : {
			"FYMC":"FYMC",
			"FYBM01":"FYBM01"
			}
	},
	//费用编码
	"FYBM01" : {
		"jlid": "JLInput",
		"readonly": true,
		"cds":"CDS",
		"cds-field":"LIST.FYBM01",
		"format": {
					"null": true,
					"phone": false,
					"number": true
				}
			},
			
			//物流公司
			"WLGS":{
				 "jlid": "JLSelect",
				 "cds":"CDS",
				 "cds-field":"LIST.WLGS",
				 "sqlid" : "PUBCX.RYWLGS",
					"resource" : "scmform",
					"listener": {
				        "change":function(data){
				        	debugger;
				        	defineSHFYBZ.getPluginObj("WLGS01").setData(data.key);	
				        	//WLGS01=data.key;
				        }
					}
			},
			//物流公司编码
			"WLGS01" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.WLGS01",
				 "format":{}
			},
			//装载体积
			"TJ" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.TJ",
				 "readonly":true,
				/* "placeholder":"请输入装载体积",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("装载体积只允许输入非负数");
					        		//清空
					        		debugger;
					        		 defineSHFYBZ.getPluginObj("TJ").setData("");
					        	}  	
					    }
					}*/
				"dir" : "scm/pub/search",
			    "namespace" : "BM",
			    "placeholder":"点击查询装载体积",
			    "sqlid" : "CLXX",
			    "autoquery" : true,
				"init": {"WLGS01":"WLGS01"},
				"fieldMapping" : {
					"ZZTJ":"TJ"
					}
			},
			//送货距离
			"JULI" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.TJ",
				 "placeholder":"请输入送货距离",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("送货距离只允许输入非负数");
					        		//清空
					        		debugger;
					        		 defineSHFYBZ.getPluginObj("JULI").setData("");
					        	}  	
					    }
					}
			},
			//送货单价
			"FYDJ" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.FYDJ",
				 "placeholder":"请输入送货单价",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("送货单价只允许输入非负数");
					        		//清空
					        		debugger;
					        		 defineSHFYBZ.getPluginObj("FYDJ").setData("");
					        	}  	
					    }
					}
			},
			//超方单价 
			"CFDJ" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.CFDJ",
				 "placeholder":"请输入超方单价",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("超方单价只允许输入非负数");
					        		//清空
					        		debugger;
					        		 defineSHFYBZ.getPluginObj("CFDJ").setData("");
					        	}  	
					    }
					}
			},
		/*	//批量更新
			"PLGX":{
			"name": "批量更新",
			"icon": "fa fa-reply-all",
			"func": function(){
				debugger;
			}
			},*/
			//体积费用明细
			"TJFYMX" : {
				"jlid" : "JLGrid",
				"buttons": [{
	  				"text" : "选择地区",
	  				"icon" :"search",
	  				"func" : function() {
	  					var queryConfig = defineSHFYBZ.getPluginObj("TJFYMX").config.queryConfig;
						
						if(JL.isFunction(defineSHFYBZ.getPluginObj("TJFYMX").config.listener.query)){
							if(defineSHFYBZ.getPluginObj("TJFYMX").config.listener.query()){
								return false;
							}
						}
						
						if(!JL.isNull(queryConfig.querybh)){
							JLQuery.show(defineSHFYBZ.getPluginObj("TJFYMX").form, queryConfig);
						}else if(!JL.isNull(queryConfig.sqlid)){
							JLQuery.show2(defineSHFYBZ.getPluginObj("TJFYMX").form, queryConfig);
						}
	  				
	  					}
	  				},
	  				2],
				"cds": "CDS",
				"cds-field": "LIST.TJFYMX",
				//"primarykey": ["BSPXX01"],
			    "headers" : [
				    {"id":"DQXX01", "name":"地区编码",  "width" : 1,    "hidden" : true },
				    {"id":"DQMC", "name":"地区", "width": 100   },
				    {"id":"ZZTJ", "name":"装载体积(立方米)", "width": 150, "editor":{"type":"text"}},
				    {"id":"SHJL", "name":"送货距离(米)", "width": 150, "editor":{"type":"text"}},
				    {"id":"FYDJ", "name":"费用单价", "width": 100, "editor":{"type":"text"}},
				    {"id":"CFDJ", "name":"超方单价", "width": 100, "editor":{"type":"text"}}
				   
				],
			/*	"queryGrid": {
					"jlid" : "JLTreeGrid",
					"parent": "SJBM",//上级节点
					"current": "DQXX01",//当前节点
					"level": "DQJB",//级别
					"final": {"id":"MJBJ", "key": "1"},//末级标记
					"paging": "more",
					"title" : [
					           {"id":"TREE", "name":"编码/名称", "width":"w10"}
						
			        ],
					"header" : [
						 {"id":"DQXX01", "groupid":"TREE", "title":"行业编码"}, 
						 {"id":"DQXX02", "groupid":"TREE", "title":"行业名称"},
						 {"id":"jlbh", "title":"jlbh", "hidden":true},
						 {"id":"DQJB", "title":"级别", "hidden":true},	
						 {"id":"SJBM", "title":"上级分类编码", "hidden":true},
				]
				},*/

		"queryConfig": {
					"multi": true,
					 "autoquery": true,  
					"namespace": "BM",
					"sqlid": "DQ",
					"dir": "scm/pub/search",
					"fieldMapping":{
						"DQXX02":"TJFYMX.DQMC",
						"DQXX01":"TJFYMX.DQXX01"
						
					}
				}
			},
			
		
			//送货单价(按件)
			"FYDJ1" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.FYDJ1",
				 "placeholder":"请输入送货单价",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("送货单价只允许输入非负数");
					        		//清空
					        		 defineSHFYBZ.getPluginObj("FYDJ1").setData("");
					        	}  	
					    }
					}
			},
			"JFSD_Q" : {
				"jlid" : "JLDate",
				"afterDate":"[name='JFSD_E']",
				 "placeholder" : "请选择日期" ,
				 "format": "mm-dd",
				 "cds":"CDS",
				"cds-field":"LIST.JFSD_Q",
				
			},
			"JFSD_E" : {
				"jlid" : "JLDate",
				"beforeDate":"[name='JFSD_Q']",
				 "placeholder" : "请选择日期" ,
				 "format": "mm-dd ",
				 "cds":"CDS",
				 "cds-field":"LIST.JFSD_E",
				
			},
			
			/*//批量更新
			"PLGX1":{
			"name": "批量更新",
			"icon": "fa fa-reply-all",
			"func": function(){
			}
			},*/
			//体积费用明细
			"AJFYMX" : {
				"jlid" : "JLGrid",
				"buttons": [{
	  				"text" : "选择分类",
	  				"icon" :"search",
	  				"func" : function() {
                   var queryConfig = defineSHFYBZ.getPluginObj("AJFYMX").config.queryConfig;
						
						if(JL.isFunction(defineSHFYBZ.getPluginObj("AJFYMX").config.listener.query)){
							if(defineSHFYBZ.getPluginObj("AJFYMX").config.listener.query()){
								return false;
							}
						}
						
						if(!JL.isNull(queryConfig.querybh)){
							JLQuery.show(defineSHFYBZ.getPluginObj("AJFYMX").form, queryConfig);
						}else if(!JL.isNull(queryConfig.sqlid)){
							JLQuery.show2(defineSHFYBZ.getPluginObj("AJFYMX").form, queryConfig);
						}
	  					}
	  				},
	  				2],
				"cds": "CDS",
				"cds-field": "LIST.AJFYMX",
				//"primarykey": ["BSPXX01"],
			    "headers" : [
			        {"id":"SPFL01", "name":"商品分类",  "width" : 1,    "hidden" : true },
				    {"id":"SPFLMC", "name":"商品分类", "width": 150 },
				    {"id":"FYDJ1", "name":"费用单价", "width": 150, "editor":{"type":"text"}},
				    {"id":"JFSJQ", "name":"计费时间起", "width": 150, "editor":{"type":"text"}},
				    {"id":"JFSJE", "name":"计费时间止", "width": 150, "editor":{"type":"text"}}
				],
				"queryConfig": {
					"multi": true,
					"namespace": "SPFL",
					"sqlid": "SXSPFL",
					 "autoquery" : true,
					"dir": "scm/pub/search",
					"fieldMapping":{
						"SPFL01":"AJFYMX.SPFL01",
						"SPFLMC":"AJFYMX.SPFLMC"
						
					}
				}
			},
			//按件显示试用网点
			"TJSHWD" : {
				"jlid" : "JLGrid",
				"buttons": [{
	  				"text" : "选择网点",
	  				"icon" :"search",
	  				"func" : function() {
                   var queryConfig = defineSHFYBZ.getPluginObj("TJSHWD").config.queryConfig;
						
						if(JL.isFunction(defineSHFYBZ.getPluginObj("TJSHWD").config.listener.query)){
							if(defineSHFYBZ.getPluginObj("TJSHWD").config.listener.query()){
								return false;
							}
						}
						
						if(!JL.isNull(queryConfig.querybh)){
							JLQuery.show(defineSHFYBZ.getPluginObj("TJSHWD").form, queryConfig);
						}else if(!JL.isNull(queryConfig.sqlid)){
							JLQuery.show2(defineSHFYBZ.getPluginObj("TJSHWD").form, queryConfig);
						}
	  					}
	  				},
	  				2],
				"cds": "CDS",
				"cds-field": "LIST.TJSHWD",
				//"primarykey": ["BSPXX01"],
			    "headers" : [
				  
				    {"id":"WDBM", "name":"网点编码", "width": 150 },
				    {"id":"WDMC", "name":"网点名称", "width": 150},
				    {"id":"SSGS", "name":"所属公司", "width": 150}
				   
				],
				"queryConfig": {
					"multi": true,
					"namespace": "BM",
					"sqlid": "WD",
					 "autoquery" : true,
					"dir": "scm/pub/search",
					"fieldMapping":{
						"FWWD01":"TJSHWD.WDBM",
						"FWWD02":"TJSHWD.WDMC",
						"GSXX02":"TJSHWD.SSGS"
						
					}
				}
			},
		
			//费用名称
			"FYMC1" : {
				 "jlid": "JLInput",
				 "readonly":true,
				 "cds":"CDS",
				 "cds-field":"LIST.FYMC",
				 "format":{
					 
				 },
				"dir" : "scm/pub/search",
			    "namespace" : "BM",
			    "placeholder":"点击查找车辆名称",
			    "sqlid" : "CLXX",
				"init": {"WLGS01":"WLGS01"},
				"fieldMapping" : {
					"MC":"FYMC1",
					"ZZTJ":"ZZTJ1"
					}
			},
			//装载体积
			"ZZTJ1" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.ZZTJ1",
				 "readonly":true,
				 "placeholder":"车辆装载体积（立方）",
				    "format": {
				        "number":true
				         },
			},
			//送货单价
			"FYDJ2" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.FYDJ2",
				 "placeholder":"请输入超方单价",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("送货单价只允许输入非负数");
					        		//清空
					        		 defineSHFYBZ.getPluginObj("FYDJ2").setData("");
					        	}
					        	//defineSHFYBZ.getPluginObj("FYJE").disabled(true);
					    }
					}
			},
			//送货金额
			"FYJE" : {
				 "jlid": "JLInput",
				 "cds":"CDS",
				 "cds-field":"LIST.FYJE",
				 "placeholder":"请输入送货金额",
				    "format": {
				        "number":true
				         },
				    "listener": {
					  "blur":function(data){
						       debugger;
					        	if(isNaN(data)||data<0){
					        		JL.tip("送货金额只允许输入非负数");
					        		//清空
					        		 defineSHFYBZ.getPluginObj("FYJE").setData("");
					        	}  	
					        	//defineSHFYBZ.getPluginObj("FYDJ2").disabled(true);
					    }
					}
			},
	/*	    "BL" : {
		        "jlid": "JLInput",
		        "cds":"CDS",
		        "cds-field":"LIST.BL",
		        "placeholder":"请输入比例（0-1）",
		        "format": {
			        "number":true
			         },
			    "listener": {
				  "blur":function(data){
					        debugger;
				        	if(isNaN(data)||data<0||data>1){
				        		JL.tip("比例可输入范围为0-1");
				        		//清空
				        		 defineSHFYBZ.getPluginObj("BL").setData("");
				        	}
				    }
				}
		   },*/
		/* //批量更新
			"PLGX2":{
			"name": "批量更新",
			"icon": "fa fa-reply-all",
			"func": function(){
			}
			},*/
			
			"CCYYMX" : {
				"jlid" : "JLGrid",
				"buttons": [{
	  				"text" : "选择地区",
	  				"icon" :"search",
	  				"func" : function() {
                   var queryConfig = defineSHFYBZ.getPluginObj("CCYYMX").config.queryConfig;
						
						if(JL.isFunction(defineSHFYBZ.getPluginObj("CCYYMX").config.listener.query)){
							if(defineSHFYBZ.getPluginObj("CCYYMX").config.listener.query()){
								return false;
							}
						}
						
						if(!JL.isNull(queryConfig.querybh)){
							JLQuery.show(defineSHFYBZ.getPluginObj("CCYYMX").form, queryConfig);
						}else if(!JL.isNull(queryConfig.sqlid)){
							JLQuery.show2(defineSHFYBZ.getPluginObj("CCYYMX").form, queryConfig);
						}
	  					}
	  				},
	  				2],
				"cds": "CDS",
				"cds-field": "LIST.CCYYMX",
				//"primarykey": ["BSPXX01"],
			    "headers" : [
				  
				     {"id":"DQXX01", "name":"地区编码",  "width" : 1,    "hidden" : true },
				    {"id":"DQMC", "name":"地区", "width": 200   },
				    {"id":"SHFYMC", "name":"车辆名称", "width": 150},
				    {"id":"ZZTJ", "name":"车辆装载体积（立方）", "width": 200},
				    {"id":"FYDJ", "name":"超方单价", "width": 150},
				    {"id":"FYJE", "name":"费用金额", "width": 150}
				  /*  {"id":"BL", "name":"比例", "width": 150}*/
				    
				   
				],
				"queryConfig": {
					"multi": true,
					"namespace": "BM",
					"sqlid": "DQ",
					"dir": "scm/pub/search",
					"fieldMapping":{
						"DQXX02":"CCYYMX.DQMC",
						"DQXX01":"CCYYMX.DQXX01"
						
					}
				}
			},
			
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"buttons": {
			
			"jlNew": {},
			"jlExport": {
				"templates": {
					"A模版": 1,
					"B模版": 2
				}
			}
	    },
	    /*"groupField": [
	                
	                   {"id":"FYBZMC", "title":"费用标准名称", "css":"font_weight_bold font_size_standard"},
	                   ],*/
		"title" : [
		         {"id":"BZMC", "name":"费用标准名称", "width":"w03"},
		         {"id":"FS", "name":"计费方式", "width":"w03"},
		         {"id":"GS", "name":"物流公司", "width":"w03"},
		           {"id":"MC", "name":"费用名称", "width":"w02"},
		           
		           {"id":"CZ", "name":"操作", "width":"w01"}
		           ],
		    "header" : [
			 {"id":"bdbh", "hidden":true},
			 {"id":"jlbh", "hidden":true},
			 {"id":"JFSD_Q", "hidden":true},
			 {"id":"JFSD_E", "hidden":true},
			 {"id":"FYBZBM","hidden":true},
			 {"id":"TX","hidden":true},
			 {"id":"JULI","hidden":true},
			 {"id":"FYDJ","hidden":true},
			 {"id":"CFDJ","hidden":true},
			 {"id":"FYDJ1","hidden":true},
			 {"id":"JFSD_Q","hidden":true},
			 {"id":"JFSD_E","hidden":true},
			 {"id":"FYDJ2","hidden":true},
			 {"id":"FYJE","hidden":true},
			 {"id":"BL","hidden":true},
			 {"id":"FYBM01","hidden":true},
			 {"id":"FYBZMC","groupid":"BZMC", "title":"费用标准名称"},
		     {"id":"FYMC",  "groupid":"MC", "title":"费用名称"},
		     {"id":"JFFS",  "groupid":"FS", "title":"计费方式"},
		     {"id":"WLGS",  "groupid":"GS", "title":"计费方式"},
		
             {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
	            	 "config":{
		            	 "readonly": ["FYBZBM"]
		             },
		             "listener":{
		        		 "click": function(data, rowIndex, obj, plugin){
		        			 console.info(data);
		        		 }
		        	 }
	           },
	      /*     {"id":"TJFYMX", "editor":"Grid", "groupcss":"w12 more pt10 pb10",
			    	"rowcss": "pl5 pt5 fl w12",
		    		"header" : [
		    		    {"id":"DQ", "name":"地区", "width": 100 , "groupcss":"w02 tr pr10"  },
					    {"id":"ZZTJ", "name":"装载体积(立方米)", "width": 100, "groupcss":"w05"},
					    {"id":"SHJL", "name":"送货距离(米)", "width": 100, "groupcss":"w01 tc"},
					    {"id":"FYDJ", "name":"费用单价", "width": 100, "groupcss":"w01 tc"},
					    {"id":"CCDJ", "name":"超方单价", "width": 100, "groupcss":"w01 tc"}
					   
		            ]
			    },
			    {"id":"AJFYMX", "editor":"Grid", "groupcss":"w12 more pt10 pb10",
			    	"rowcss": "pl5 pt5 fl w12",
		    		"header" : [
		    		            
		    		    {"id":"SPFL", "name":"商品分类", "width": 100,"groupcss":"w02 tr pr10" },
		    			{"id":"FYDJ1", "name":"费用单价", "width": 100, "groupcss":"w05"},
		    			{"id":"JFSJQ", "name":"计费时间起", "width": 100, "groupcss":"w01 tc"},
		    			{"id":"JFSJE", "name":"计费时间止", "width": 100, "groupcss":"w02 tc"}
					   
		            ]
			    },
			    
			    {"id":"TJSHWD", "editor":"Grid", "groupcss":"w12 more pt10 pb10",
			    	"rowcss": "pl5 pt5 fl w12",
		    		"header" : [
		    		            
		    		            {"id":"WDBM", "name":"网点编码", "width": 100 ,"groupcss":"w02 tr pr10"},
		    				    {"id":"WDMC", "name":"网点名称", "width": 100, "groupcss":"w05"},
		    				    {"id":"SSGS", "name":"所属公司", "width": 100, "groupcss":"w02 tc"}
		    				   
					   
		            ]
			    },
			    {"id":"CCYYMX", "editor":"Grid", "groupcss":"w12 more pt10 pb10",
			    	"rowcss": "pl5 pt5 fl w12",
		    		"header" : [
		    		            
		    		            {"id":"WDBM", "name":"网点编码", "width": 100 ,"groupcss":"w02 tr pr10"},
		    				    {"id":"WDMC", "name":"网点名称", "width": 100, "groupcss":"w05"},
		    				    {"id":"SSGS", "name":"所属公司", "width": 100, "groupcss":"w02 tc"}
		    				   
					   
		            ]
			    },*/
	      	 {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "editor":"link",
					 "listener":{
						 "click": function(thisPlugin, rowIndex, obj){
							 var data = thisPlugin.getData(rowIndex);
							 JL.confirm("是否确认删除?", function(){
								 data["S_VALUE"] = "D1";
								 JL.saveForm(defineSHFYBZ, data, "删除", {
									 "disabled": false,
									 "success":function(){
										 //defineSHFYBZ.query();
										 thisPlugin.removeRow(rowIndex);
									 }
								 });
							 });
						 }
					 }
				 }
			
		     ]
	    }
	});




defineSHFYBZ.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		1
		defineSHFYBZ.query();
	}
}])

defineSHFYBZ.setAfterInit(function() {
	debugger;
	
	
	JL.tab(defineSHFYBZ, {
		"TJFYBZ": "费用标准",
		"AJFYBZ": "费用标准",
		"AJSYWD": "适用网点",
		"AJCCFF": "费用标准"
	});
	//屏蔽
	//"TJFYBZ": "费用标准",
    //"AJFYBZ": "费用标准",
	//"AJSYWD": "试用网点",
	//"AJCCFF": "费用标准"
    defineSHFYBZ.getTab().find("[data-id='AJFYBZ']").hide();
	defineSHFYBZ.getTab().find("[data-id='AJSYWD']").hide();
	defineSHFYBZ.getTab().find("[data-id='AJCCFF']").hide();
	//显示"TJFYBZ": "费用标准",
	//defineSHFYBZ.getTab().find("[data-id='TJFYBZ']").show();
	defineSHFYBZ.getPluginObj("FYDJ2").disabled(false);
	defineSHFYBZ.getPluginObj("FYJE").disabled(false);
	defineSHFYBZ.query();
});


defineSHFYBZ.query = function() {
	var query={};
	debugger;
	
	var search = defineSHFYBZ.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineSHFYBZ.getSqlResult(query, "MONGO_SHFYBZ", "CSS_SHFYBZ", "admin/scm/fwgl/search");
	console.info('defineSHFYBZ.query');
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineSHFYBZ.getPluginObj("LIST").setPaging(resultData.fileName);
	
};