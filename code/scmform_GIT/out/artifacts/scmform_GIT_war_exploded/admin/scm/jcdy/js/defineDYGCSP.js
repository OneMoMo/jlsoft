var defineDYGCSP= JL.JLForm();
defineDYGCSP.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			//导出
			"jlDC":{
				"name": "导出",
				"func": function(){}
			},
			
			"jlSaveCard" : {
				"grid" : "LIST", // 保存成功后，数据写到对应列表控件上显示。
				"before" : function(data) {
					console.info(data);
				},
				"success":function(data,tip){
					defineDYGCSP.getPluginObj("XZGCSPBM").setData(data["GCSPBM"]);
					defineDYGCSP.query();
				}
			},
			"jlCancelSlide" : {}
		}
	}, 
	"GCLX":{
		"jlid":"JLSelect", 
    	"default": "1",
    	"cds" : "CDS",
		"cds-field" : "LIST.GCLX",
    	"options": {"2":"商用销售","1":"家用销售"}
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	"XZGCSPBM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.ZSPBM",
		"readonly":true,
		"format": {
		}
	},
	"GCSPBM":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.GCSPBM",
		"readonly":true,
		"format": {
		}
	},
	"MR":{
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.GLSPMX.MR",
		"readonly":true,
		"format": {
		}
	},
	"GCSPMC":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.GCSPMC",
		"format": {
		}
	},
	/*"GCSPBM":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.GCSPBM",
		"queryConfig": {
			"namespace": "SPXX",
			"sqlid": "SPXX",
			"dir": "scm/pub/search",
			"textid": "SPMC",
			"queryField": {"SPXX28": 1},
			"fieldMapping":{
				"SPXX01":"ZSPXX01",
				"SPBM":"ZSPBM",
				"JLDW01":"JLDW",
				"SPMC":"ZSPMC"
			}
		},
		"format": {
		}
	},*/
	"GLSPMX" : {
		"jlid" : "JLGrid",
		"buttons": [0,2],
		"cds": "CDS",
		"cds-field": "LIST.GLSPMX",
		"primarykey": ["SPBM"],
	    "headers" : [
	        {"id":"SPXX01", "name":"商品内码", "hidden":true},
		    {"id":"XH", "name":"序号", "hidden":true},
		    {"id":"isXZ", "name":"是否新增", "width": 250,"hidden":true},
		    {"id":"SPBM", "name":"商品编码", "width": 100},
		    {"id":"SPMC", "name":"商品名称", "width": 250},
		    {"id":"YBDJ", "name":"预报单价", "width": 120,"editor":{"type":"text"}},
		    {"id":"JLDJ", "name":"奖励单价", "width": 120,"editor":{"type":"text"}},
		    {"id":"MR", "name":"默认", "width": 100,"editor":{
		    	"type":"select", 
		    	"default": "1",
		    	"options": {"1":"是","0":"否"}
		    }}
		],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
			}
		},
		"queryConfig": {
			"multi": true,
			"namespace":"SPXX",
			"sqlid": "SPXX",
			"dir": "scm/pub/search",
			"queryField": {},
			"init": {},
			"fieldMapping":{
				"SPXX01":"GLSPMX.SPXX01",
				"SPBM":"GLSPMX.SPBM",
				"SPMC":"GLSPMX.SPMC"
			}
		}
	},

	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					console.info(this);
					var type = $(this).text();
					if(type == "批量导入"){
						defineDYGCSP.find("#import").show();
						defineDYGCSP.getPluginObj("EXCEL").setData([])
						defineDYGCSP.find("dl[name='BUTTON']").hide();
						defineDYGCSP.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
					}else{
						defineDYGCSP.find("#import").hide();
						$(this).html("批量导入");
					}
				}
			}
		}
	},
	
	
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"afterUpload" : function(data) {
				debugger; 
				var resultData = JL.getExcelData(16,data); 
				var returnList = resultData.data.returnList;
				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineDYGCSP/excelSPXX.do";
				ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
				var resultData = JL.ajax(ajaxJson);
			//	alert(JSON.stringify(resultData["data"]["returnList"]));
				errorResultData = resultData["data"]["returnList"];
				debugger; 
				/*if(errorResultData.length>0){
					console.info("error");
					defineDYGCSP.find("dl[name='BUTTON']").show();
					defineDYGCSP.getPluginObj("MESSAGE").setData(errorResultData);
				}else{
					JL.tip("上传成功！");
					defineDYGCSP.query();
				}*/
				
				if(errorResultData.length >0){
					console.info("error");
					defineDYGCSP.find("dl[name='BUTTON']").show();
					defineDYGCSP.getPluginObj("MESSAGE").setData(errorResultData);
					JL.tip("导入失败！","info");
					return ture;
				}else{
					JL.tip("上传成功！");
					defineDYGCSP.find("dl[name='BUTTON']").hide();
					defineDYGCSP.query();
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
					  if(defineDYGCSP.find("dl[name='MESSAGE']").is(":hidden"))
					  {
						  defineDYGCSP.find("dl[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineDYGCSP.find("dl[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	 //导入商品错误信息展示
	  "MESSAGE": {
		  "jlid"    : "JLGrid",
		  "tittles" : "错误信息列表",
//		 / "sequence": false,
		  "multi":false,
		  "headers" : [
		       {"id" : "NUM", "name" : "EXCEL行号", "width" : 120},
	           {"id" : "ERROR",   "name" : "错误信息", "width" : 400}
	       ]
	  },
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"mode": "edit",
		"rowclass": "pl10",
		"buttons" : {
	/*		"jlExportData":{
				"listener": {
					"click":function(obj, thisPlugin){
						debugger;
						//defineRY.getPluginObj("SKBJ").setData("1");
					}
				}
			},*/
			"jlNew":{
				"listener": {
					"click": function(){
						//defineDYGCSP.getTab().find("[id='XZSPMC']").show();
						defineDYGCSP.find("dl[name='BUTTON']").hide();
						defineDYGCSP.find("li[name='MESSAGE']").hide();
					}
				},
			},
			"DC": {
				"name":"导出数据",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					debugger;
					var arr = new Array(),json={},ajaxJson={},query={},data={},sum=0;
					ajaxJson["GSXX01"] = userInfo.PCRM_GSXX01;
					debugger;
					//oracle查询
					var resultData = defineDYGCSP.getSqlResult(ajaxJson, "SPXX", "DYGCSP", "scm/cxgl/cxzc/search");
					var XSMXLB=resultData.data;
					for(var i = 0; i < XSMXLB.length;i++){
						var ajax = {};
						if(XSMXLB[i]["GCBJ"] == "1"){
							ajax["GCLX"] = "家用销售";
						}else if(XSMXLB[i]["GCBJ"] == "2"){
							ajax["GCLX"] = "商用销售";
						}else{
							ajax["GCLX"] = "家用销售";
						}
						ajax["GCSPBM"] = XSMXLB[i]["GCSPBM"];
						ajax["GCSPMC"] = XSMXLB[i]["GCSPMC"];
						ajax["SPBM"] = XSMXLB[i]["SPXX02"];
						ajax["SPMC"] = XSMXLB[i]["SPXX04"];
						ajax["YBDJ"] = XSMXLB[i]["YBDJ"];
						arr[i] = ajax;
					}
					
					//mongo查询
					/*var search = defineDYGCSP.getTab().find("[name='query']").val();
					if(!JL.isNull(search)){
						query["search"] = search;
					}
					query["S_VALUE"] = {"$ne":"D1"};*/
					/*	var resultData = defineDYGCSP.getSqlResult(query, "MONGO_DYGCSP", "SCM_DYGCSP", "admin/scm/jcdy/search");*/
					/*for(var i=0;i<XSMXLB.length;i++){
  				  		for(var j = 0;j<XSMXLB[i]["GLSPMX"].length;j++){
  				  			var ajax = {};
  				  			ajax["GCSPBM"] = XSMXLB[i]["GCSPBM"];
  				  			ajax["GCSPMC"] = XSMXLB[i]["GCSPMC"];
  				  			ajax["SPBM"] = XSMXLB[i]["GLSPMX"][j]["SPBM"];
  				  			ajax["SPMC"] = XSMXLB[i]["GLSPMX"][j]["SPMC"];
  				  			ajax["GCLX"] = XSMXLB[i]["GLSPMX"][j]["GCLX"];
  				  			arr[sum] = ajax;sum++;
  				  		}
  				  	}*/
					json["GCSPBM"]="*工程商品编码",json["GCSPMC"]="*工程商品名称",json["SPBM"]="*商品编码",json["SPMC"]="商品名称",json["GCLX"]="工程类型(1:家用销售,2:商用销售)";json["YBDJ"]="预报单价";
					data["data"] = JSON.stringify(arr);
				  	data["columnName"] = JSON.stringify(json);
				  	console.log(arr);
					debugger;
					JL.download("excelHandler/excelExport.do", data);
				/*	JL.downloadTemplate("定义工程商品模板",{
						"GCSPBM":"*工程商品编码",
						"GCSPMC":"*工程商品名称",
						"SPBM":"*商品编码",
						"SPMC":"商品名称",
						"YBDJ":"预报单价",
						"GCLX":"工程类型(1:家用销售,2:商用销售)",
						"MR":"*是否默认(否,是)",
					});*/
					
				}	
			},
			
			"DCMB": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					
						JL.downloadTemplate("定义工程商品模板",{
							"GCSPBM":"*工程商品编码",
							"GCSPMC":"*工程商品名称",
							"SPBM":"*商品编码",
							"SPMC":"商品名称",
							"YBDJ":"预报单价",
							"GCLX":"工程类型(1:家用销售,2:商用销售)",
							"MR":"*是否默认(否,是)",
						});
					
				}	
			},
		},

		"title" : [
	    	{"id":"GCSPBM", "name":"工程商品编码", "width":"w01"},
	    	{"id":"GCSPMC", "name":"工程商品名称", "width":"w01 tc"},
	    	{"id":"GSXX01", "name":"公司编码", "width":"w01 tc"},
	    	{"id":"GCLX", "name":"工程类型", "width":"w01 tc"},
	    	{"id":"SPXX01", "name":"<span class='w03 tc pr0'>商品编码</span><span class='w05 pr0'>商品名称</span><span class='w02 pr0'>预报单价</span><span class='w02 tc'>默认商品</span>", "width":"w07 pr0 min_h30"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tc pr0"}
	    	
	    ], 
	    "header" : [
	        {"id":"jlbh", "hidden":true},
		    {"id":"GCSPBM", "groupid":"GCSPBM", "title":"工程商品编码","width":"w02","css":" mr0 font_weight_bold font_size_standard"},
		    {"id":"GCSPMC", "groupid":"GCSPMC", "title":"工程商品名称", "css":"w12 mr0 font_weight_bold font_size_standard tc"}, 
		    {"id":"GSXX01", "groupid":"GSXX01", "title":"公司编码", "css":"w12 mr0 font_weight_bold font_size_standard tc"}, 
		    {"id":"GCLX", "groupid":"GCLX", "title":"工程类型", "css":"w12 mr0 font_weight_bold font_size_standard tc"}, 
		    {"id":"update", "title":"编辑", "groupid":"CZ",  "rowindex":1, "editor":"JLEdit",
		    	"config":{
		    		
		    	},
		    	"listener":{
		    		"click": function(thisPlugin, rowIndex, obj){
		    			//defineDYGCSP.getTab().find("[id='GCSPBM']").show();
		    		}
		    	}
		    }, 
		    {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除","css":"mr0", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("是否确认删除?", function(){
							data["S_VALUE"] = "D1";
							JL.saveForm(defineDYGCSP, data, "删除", {
								"disabled": false,
								"success":function(){
									thisPlugin.removeRow(rowIndex);
								}
							});
						});
					}
				}
			},
		    {"id":"GLSPMX", "editor":"Grid", "groupcss":"w12","groupid":"SPXX01",
		    	"rowcss": "lh30 fl w12",
	    		"header" : [
	    		    {"id":"SPBM", "title":"商品编码", "groupcss":"w03 tc"},
	    		    {"id":"SPMC", "title":"商品名称", "groupcss":"w05"},
	    		    {"id":"YBDJ", "title":"商品名称", "groupcss":"w02"},
	    		    {"id":"MR", "title":"默认商品", "css":"w06 fr ","groupcss":"w02","editor":"plugin", 
	    		    	"config":{
	    		    		"jlid": "JLCheckbox",
	    		    		"readonly":false,
	    		    		//"default": "1",
	    		    		"options": {
	    	    				"1":""
	    		    		}
	    		    	}
	    		    }
	    		    
	            ]
		    }
        ]
	}
	
});
defineDYGCSP.setEvent([
   {
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineDYGCSP.query();
	},
	
   },
   //批量导入隐藏提交
   {
		"selector": "[data-id='DR']",
		"event": "click",
		"func": function(){
			defineDYGCSP.getTab().find("[id='jlSaveCard']").hide();
			defineDYGCSP.getTab().find("[name='BUTTON']").hide();
			
		}
	},
	//取消 
	
	{
		"selector": "#jlCancelSlide",
		"event":"click",
		"func":function(){
			defineDYGCSP.find("li[name='MESSAGE']").hide();
		},
	},
	{
		"selector": "[data-id='JCXX']",
		"event": "click",
		"func": function(){
			defineDYGCSP.getTab().find("[id='jlSaveCard']").show();
			}
		}
  ]);

defineDYGCSP.setAfterInit(function() {
	/*JL.tab(defineDYGCSP, {
		"JCXX": "基础信息",
		"DR": "批量导入"
	});*/
	defineDYGCSP.getPluginObj("GLSPMX").setAfterEdit(function(grid, id, x, y, old, edit){
		debugger;
		if(id=="JLDJ"){
			if(isNaN(edit)){
				JL.tip("奖励单价必须为数字,且大于0");
        		grid.setCell( 0, x, grid.getRowIndexByID("JLDJ"));
        		return false;
			}
		}
		if(id=="YBDJ"){
			if(isNaN(edit)){
				JL.tip("预报单价必须为数字,且大于0");
        		grid.setCell( 0, x, grid.getRowIndexByID("YBDJ"));
        		return false;
			}
		}
	});
	
	defineDYGCSP.query();
});

defineDYGCSP.query = function() {
	debugger;
	var query={};
	var search = defineDYGCSP.getTab().find("[name='query']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	debugger;
	var resultData = defineDYGCSP.getSqlResult(query, "MONGO_DYGCSP", "SCM_DYGCSP", "admin/scm/jcdy/search");
	debugger;
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineDYGCSP.getPluginObj("LIST").setPaging(resultData.fileName); 
};