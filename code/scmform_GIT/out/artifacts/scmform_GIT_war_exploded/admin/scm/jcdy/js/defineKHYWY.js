var defineKHYWY = JL.JLForm();
defineKHYWY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(data){
					debugger;
				},
				"success":function(data){
					defineKHYWY.query();
				}
			},
			"jlCancelSlide":{
				"before": function(data){
					debugger;
					defineKHYWY.getPluginObj("MESSAGE").removeAll();
					defineKHYWY.find("li[name='BUTTON']").hide();
					defineKHYWY.find("div[name='MESSAGE']").hide();
				}
			}
		}
	},
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",
		 "format":{}
	},
	"GSXX01" : {
		"jlid": "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.GSXX01",
		"format": {}
	},	
	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					console.info(this);
					debugger;
					var type = $(this).text();
					if(type == "批量导入"){
						defineKHYWY.find("#import").show();
						//defineKHYWY.getPluginObj("EXCEL").setData([])
						defineKHYWY.find("dl[name='BUTTON']").hide();
						defineKHYWY.find("div[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
					}else{
						defineKHYWY.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
		}
	},
	 //查看错误信息按钮
	  "DRCM":{
		  "jlid":"JLToolBar",
		  "buttons":{
			  "jlDEL":{
				  "name":"查看错误信息按钮",
				  "css": "jl_btn btn_blue",
				  "func":function(data){
					  debugger;
					  if(defineKHYWY.find("div[name='MESSAGE']").is(":hidden"))
					  {
						  defineKHYWY.find("div[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineKHYWY.find("div[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	"RYXX01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.RYXX01",
		 "format":{}
	},
	"RY" : {
		"jlid" : "JLInput",
		"cds":"CDS",
		"cds-field":"LIST.RY",
		"dir" : "scm/pub/search",
        "namespace" : "RYXX",
        "readonly": true,
        "sqlid" : "YWYYX",
		"init": {"GSXX01":"GSXX01"},   
		"fieldMapping" : {
			"RYMC":"RY",
			"RYXX01":"RYXX01",
			"BM01":"BM01",
			"BMMC":"BMMC"
		},
		"listener": {
			"beforequery" : function(data){	
				debugger;
				var grid=defineKHYWY.getPluginObj("SPLB").getData();
				if(grid.length>0)
				{
					JL.tip("明细已选择不允许修改","info");
					return true;
				}
				data["GSXX01"]=userInfo["PCRM_GSXX01"];
				data["XSLX_F"] = "(1,3)";
			},
			"aftercallback" : function(data){
				debugger;
				var RYXX01=defineKHYWY.getTab().find("input[name=RYXX01]").val();
				var BM01=defineKHYWY.getTab().find("input[name=BM01]").val();
				var GSXX01=defineKHYWY.getTab().find("input[name=GSXX01]").val();
				var resultData1 = defineKHYWY.getSqlResult({"BM01":BM01,"RYXX01":RYXX01,"GSXX01":GSXX01}, "WLDW", "YWY_KH", "scm/pub/search");
				resultData1=resultData1.data;
				if(resultData1.length>0)
				{
					defineKHYWY.getPluginObj("SPLB").setData(resultData1);
				}
			}
		}
	},
	"BM01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.BM01",
		 "format":{}
	},
	"BMMC" : {
		"jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.BMMC",
		 "format":{}
	},
	"SPLB" : {
        "jlid": "JLGrid",
        "cds":"CDS",
		 "cds-field":"LIST.SPLB",
        "tittles" : "明细列表", 
         "headers": [
              {"id": "RYXX01","name": "人员编码","width": 100,"hidden": true},
              {"id": "RY","name": "人员","width": 100,"hidden": true},
              {"id": "BM01","name": "部门编码","width": 120,"hidden": true},
              {"id": "BMMC","name": "部门","width": 120,"hidden": true},
              {"id": "WLDW01","name": "客户编码","width": 180},
              {"id": "WLDWMC","name": "客户名称","width": 120},
              {"id": "LXDH","name": "联系电话","width": 120},
              {"id": "LXDZ","name": "地址","width": 280},
              {"id": "XSFS","name": "销售方式","width": 280,"editor":{
            	  "type":"plugin",
            	  "jlid":"JLMultiSelect",
            	  "sqlid":"FLFS.FLFSXX",
            	  "resource":"scmform",
            	  "param" : {"XSLX_F":"1,3","RYQX":defineKHYWY.getTab().find("input[name='RYXX01']").val()},
              }}
         ],
         "primarykey" : ["WLDW01"],
         "queryConfig":{
        	 "dir" : "scm/pub/search",
             "namespace" : "WLDW",
             "sqlid" : "KH_YX",
 		     "form":defineKHYWY,
 		     "multi":true,
 		     "fieldMapping": {	
 		    	 "WLDW01":"SPLB.WLDW01",
 		    	 "WLDWMC":"SPLB.WLDWMC",
 		    	 "LXDH":"SPLB.LXDH",
 		    	 "LXDZ":"SPLB.LXDZ",
 		    	 "RYXX01":"SPLB.RYXX01",
 		    	 "RY":"SPLB.RY",
 		    	 "BM01":"SPLB.BM01",
 		    	 "BMMC":"SPLB.BMMC"
 		    },
 		    "listener": {
 		    	"beforequery" : function(data){	
 		    		debugger;
 		    		if(defineKHYWY.getTab().find("input[name='RY']").val()=="")
 		    		{
 		    			JL.tip("先选择人员","info");
 		    			return true;
 		    		}
 		    	},
 		    	"beforecallback" : function(data){	
 		    		debugger;
 					var RYXX01=defineKHYWY.getTab().find("input[name='RYXX01']").val();
 					var RY=defineKHYWY.getTab().find("input[name='RY']").val();
 					var BM01=defineKHYWY.getTab().find("input[name='BM01']").val();
 					var BMMC=defineKHYWY.getTab().find("input[name='BMMC']").val();
 					for(var i=0;i<data.length;i++)
 					{
 						data[i]["RYXX01"]=RYXX01;
 						data[i]["RY"]=RY;
 						data[i]["BM01"]=BM01;
 						data[i]["BMMC"]=BMMC;
 					}
 				}
 		    }
 		},
 		"buttons" : [0,2]
	},
	//导入商品错误信息展示
	"MESSAGE": {
		  "jlid"    : "JLGrid",
		  "tittles" : "错误信息列表",
		  "headers" : [
		       {"id" : "NUM", "name" : "EXCEL行号", "width" : 120},
	           {"id" : "ERROR",   "name" : "错误信息", "width" : 400}
	       ]
	},
	//导入
	"DR" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"beforeupload" : function(data) {
				debugger;
				defineKHYWY.getPluginObj("DR").setData([]);
			},
			"afterUpload" : function(data) {
				defineKHYWY.getPluginObj("SPLB").removeAll();
				defineKHYWY.find("li[name='BUTTON']").hide();
				defineKHYWY.find("div[name='MESSAGE']").hide();
				defineKHYWY.getPluginObj("MESSAGE").removeAll();
				var RYXX01=defineKHYWY.getTab().find("input[name='RYXX01']").val();
				var RY=defineKHYWY.getTab().find("input[name='RY']").val();
				var BM01=defineKHYWY.getTab().find("input[name='BM01']").val();
				var BMMC=defineKHYWY.getTab().find("input[name='BMMC']").val();
					
				debugger;
				var XmlData = {};
				XmlData["MBBM"] = 18; // 取MongoDB中excel表的jlbh
				XmlData["FILE"] = data;
				var ajaxJson = {};
				ajaxJson["src"] = "excelHandler/getExcelData.do?rid="+ Math.random();
				ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
				var resultData = JL.ajax(ajaxJson);
				if (!JL.isNull(resultData)) 
				{
					var new_SPLB=[];
					var error_SPLB=[];
					resultData = resultData.data.returnList;
					if(resultData.length>0)
					{
						for(var i=0;i<resultData.length;i++)
						{
							for(var k=0;k<resultData.length;k++)
							{
								if(i!=k)
								{
									if(resultData[i]["RYXX01"]==resultData[k]["RYXX01"]&&resultData[i]["WLDW01"]==resultData[k]["WLDW01"])
									{
										var error={};
										error.NUM=i*1+2;
										error.ERROR="导入数据重复，请核对！";
										error_SPLB.push(error);
									}
								}
							}
						}
						for(var i=0;i<resultData.length;i++)
						{
							if(resultData[i]["RYXX01"]!="")
							{
								var RYXX01=resultData[i]["RYXX01"];
								var resultDataRYXX01 = defineKHYWY.getSqlResult({"GSXX01":userInfo["PCRM_GSXX01"],"RYXX01":RYXX01}, "RYXX", "YWYYX", "scm/pub/search");
								resultDataRYXX01 = resultDataRYXX01["data"];
								if(resultDataRYXX01.length>0)
								{
									resultDataRYXX01=resultDataRYXX01[0];
									if(resultData[i]["WLDW01"]!="")
									{
										var WLDW01=resultData[i]["WLDW01"];
										var resultData1 = defineKHYWY.getSqlResult({"WLDW01":WLDW01}, "WLDW", "KH_YX", "scm/pub/search");
					  	            	resultData1 = resultData1["data"];
					  	            	if (resultData1.length>0) {
					  	            		resultData1[0]["RYXX01"]=resultDataRYXX01["RYXX01"];
					  	            		resultData1[0]["RY"]=resultDataRYXX01["RYMC"];
					  	            		resultData1[0]["BM01"]=resultDataRYXX01["BM01"];
					  	            		resultData1[0]["BMMC"]=resultDataRYXX01["BMMC"];
					  	            		resultData1[0]["GSXX01"]=userInfo["PCRM_GSXX01"];
					  						new_SPLB.push(resultData1[0]);
					  	            	}
					  	            	else
					  	            	{
					  	            		var error={};
											error.NUM=i*1+2;
										    error.ERROR="不存在该客户或者没有该客户权限，请核对！";
											error_SPLB.push(error);
					  	            	}
									}
									else
									{
										var error={};
										error.NUM=i*1+2;
									    error.ERROR="导入的客户编码不允许为空请核对";
										error_SPLB.push(error);
									}
							    }
								else
								{
									var error={};
									error.NUM=i*1+2;
								    error.ERROR="该公司不存在该人员，请核对";
									error_SPLB.push(error);
								}
							}
							else
							{
								 var error={};
								 error.NUM=i*1+2;
								 error.ERROR="导入的人员不允许为空";
								 error_SPLB.push(error);
							}
						}
					}
					else
					{
						 var error={};
						 error.NUM=0;
						 error.ERROR="导入的数据不允许为空";
						 error_SPLB.push(error);
					}
					debugger;
					defineKHYWY.getPluginObj("DR").setData([]);
					if(error_SPLB.length>0)
					{
						defineKHYWY.getPluginObj("MESSAGE").removeAll();
						defineKHYWY.find("dd[name='BUTTON']").show();
						defineKHYWY.getPluginObj("MESSAGE").setData(error_SPLB);
						return true;
					}
					if(error_SPLB.length==0)
					{
						var ajaxJson = {};
						var resultData={};
						resultData.data=new_SPLB;
						resultData.GSXX01=userInfo["PCRM_GSXX01"];
						ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DRKHYWY/DRKHYWY.do";
						ajaxJson["data"] = {"XmlData": JSON.stringify(resultData)};
						var resultData = JL.ajax(ajaxJson);
						errorResultData = resultData["data"]["returnList"];
						if(errorResultData != -1){
						}else{
							JL.tip("上传成功！");
							defineKHYWY.query();
						}
					}
				}
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
			"jlNew": {
				"listener": {
					"click":function(obj, thisPlugin){
						defineKHYWY.getPluginObj("GSXX01").setData(userInfo["PCRM_GSXX01"]);
					}
				}
			},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义客户业务员模板",{   
						"RYXX01":"人员编码",
						"WLDW01": "客户编码"
			    	});
				}
			}
	    },
		"title" : [
			         {"id":"BZMC", "name":"人员编码", "width":"w02"},
			         {"id":"FS", "name":"人员", "width":"w02"},
			         {"id":"GS", "name":"部门编码", "width":"w02"},
			         {"id":"MC", "name":"部门名称", "width":"w02"},
			         {"id":"CZ", "name":"操作", "width":"w04"}
		           ],
		    "header" : [
			 {"id":"bdbh", "hidden":true,"groupid":"BZMC","rowindex":5},
			 {"id":"jlbh", "hidden":true,"groupid":"BZMC","rowindex":5},
			 {"id":"SPLB","hidden":true,"groupid":"BZMC","rowindex":5},
			 {"id":"DR","hidden":true,"groupid":"BZMC","rowindex":5},
			 {"id":"RYXX01","groupid":"BZMC", "title":"人员编码","rowindex":5},
			 {"id":"RY","groupid":"FS","rowindex":1, "title":"人员"},
		     {"id":"BM01","groupid":"GS","rowindex":2, "title":"部门编码"},
		     {"id":"DR","groupid":"GS","rowindex":2},
			 {"id":"BMMC","groupid":"MC", "rowindex":2,"title":"部门名称"},	
			 {"id":"GSXX01","hidden":true,"groupid":"MC","rowindex":2},
             {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
	            	 "config":{
		            	 "readonly": ["RYXX01","RY"]
		             },
		             "listener":{
		        		 "click": function(data, rowIndex, obj, plugin){
		        			 console.info(data);
		        			 //defineKHYWY.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
		        		 }
		        	 }
	         },
	      	 {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "editor":"link",
					 "listener":{
						 "click": function(thisPlugin, rowIndex, obj){
							 var data = thisPlugin.getData(rowIndex);
							 //defineKHYWY.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);
							 JL.confirm("是否确认删除?", function(){
								 data["S_VALUE"] = "D1";
								 JL.saveForm(defineKHYWY, data, "删除", {
									 "disabled": false,
									 "success":function(){
										 //defineKHYWY.query();
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
defineKHYWY.setEvent([
	{
		"selector": "#query",
		"event":"click",
		"func":function(){
			defineKHYWY.query();
		}
	},
	{
		"selector" : ["input[name=RY]"],
		"event": "keyup",
		"func": function(){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==13){
				var GSXX01 = userInfo["PCRM_GSXX01"];
				var RY = defineKHYWY.find("input[name=RY]").val();
				var resultData = defineKHYWY.getSqlResult({"GSXX01":GSXX01,"RYMC":RY}, "RYXX", "YWYYX", "scm/pub/search");
				resultData=resultData.data;
				debugger;
				if(resultData.length==1)
				{
					resultData=resultData[0];
					defineKHYWY.getTab().find("input[name='RY']").val(resultData["RYMC"]);
					defineKHYWY.getPluginObj("RYXX01").setData(resultData["RYXX01"]);
					defineKHYWY.getPluginObj("BM01").setData(resultData["BM01"]);
					defineKHYWY.getPluginObj("BMMC").setData(resultData["BMMC"]);
				}
			    else{
					var json = {
						"dir" : "scm/pub/search",
						"namespace" : "RYXX",
						"sqlid" : "YWYYX",
						"init" : {},
						"autoquery" : true,
						"fieldMapping" : {
							"RYMC":"RY",
							"RYXX01":"RYXX01",
							"BM01":"BM01",
							"BMMC":"BMMC"
						},
						"listener" : {
							"beforequery" : function(data){
								var RY = defineKHYWY.find("input[name=RY]").val();
								data["RYMC"]=RY;
								data["GSXX01"]=userInfo["PCRM_GSXX01"];
							},
							"aftercallback" : function(){
								defineKHYWY.find("input[name='SR']").focus();
							}
						}
					}
					JLQuery.show2(defineKHYWY, json);
				}
			}
		}
	}
]);

defineKHYWY.setAfterInit(function() {
	defineKHYWY.query();
});

defineKHYWY.query = function(){
	defineKHYWY.find("li[name='BUTTON']").hide();
	defineKHYWY.find("div[name='MESSAGE']").hide();
	debugger;
	var query={};
	var search = defineKHYWY.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["CXTJ"] = search;
	}
	query["S_VALUE"] = "D1";
	query["GSXX01"] = userInfo["PCRM_GSXX01"];
	debugger;
	var resultData = defineKHYWY.getSqlResult(query, "MONGO_KHYWY", "SCM_KHYWY", "admin/scm/jcdy/search");
	console.info('defineKHYWY.query');
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineKHYWY.getPluginObj("LIST").setPaging(resultData.fileName); 
};