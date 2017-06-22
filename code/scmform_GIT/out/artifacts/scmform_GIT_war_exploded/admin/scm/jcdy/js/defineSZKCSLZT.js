var defineSZKCSLZT= JL.JLForm();
defineSZKCSLZT.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST", // 保存成功后，数据写到对应列表控件上显示。
				"before" : function(data) {
					console.info(data);
				},
				"success":function(data,tip){
					defineSZKCSLZT.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	"XZSPLB" : {
		"jlid" : "JLGrid",
		"buttons": [0,2],
		"sequence": false,
		"primarykey": ["SPXX02"],
		 "headers": [
		             {"id": "jlbh","width": 100,"hidden":true},
		             {"id": "SPXX01","name": "商品内码","width": 100,"hidden":true},
		             {"id": "SPXX02","name": "商品编码","width": 150},
		             {"id": "SPMC","name": "商品名称","width": 150},
		             {"id": "SLKC","name": "少量","width": 150,"editor": {
		                 "type":"text",
		             }},
		             {"id": "CZKC","name": "充足","width": 150,"editor": {
		                 "type":"text",
		             }}
		        ],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
			}
		},
		"queryConfig":{
	    	"multi": true,
	  		"dir" : "scm/pub/search",
	        "namespace" : "SPXX",
	        "sqlid" : "SPXX",
			    "init": {},    
			     "fieldMapping": {
			    	"SPXX01":"XZSPLB.SPXX01",
			    	"SPBM":"XZSPLB.SPXX02",
			    	"SPMC":"XZSPLB.SPMC"
			     }
			},
			// 商品列表工具栏按钮
		    "buttons" : [0,2,
		                     {"text":"导出模板","css": "drop_menu","icon": "ffa fa-file-image-o","func": function(data)
		    	                     {
		    								debugger;
									    	JL.downloadTemplate("设置库存数量状态模板",{
									    	    "SPXX02": "商品编码",
									    	    "SPMC": "商品名称",
									    	    "SLKC":"少量库存",
									    	    "CZKC":"充足库存"
									    	});
		    	                     }
		    					  }
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
			"jlNew":{
				"listener": {
					"click": function(){
						debugger;
						defineSZKCSLZT.find("li[name='BUTTON']").hide();
						defineSZKCSLZT.getPluginObj("EXCEL").setData([])
					}
				},
			}
		},
		"title" : [
	    	{"id":"SPXX02", "name":"商品编码", "width":"w02"},
	    	{"id":"SPMC", "name":"商品名称", "width":"w03 "},
	    	{"id":"SLKC", "name":"少量库存", "width":"w02 tc"},
	    	{"id":"CZKC", "name":"充足库存", "width":"w03 tc"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tc pr0"}
	    ], 
	    "header" : [
	        {"id":"jlbh", "hidden":true},
		    {"id":"SPXX01", "title":"商品内码","width":"w02","hidden":true},
		    {"id":"SPXX02", "groupid":"SPXX02", "title":"商品编码", "css":"w12 mr0  font_size_standard "}, 
		    {"id":"SPMC", "groupid":"SPMC", "title":"商品名称", "css":"w12 mr0 font_size_standard "}, 
		    {"id":"SLKC", "groupid":"SLKC", "title":"少量库存", "css":"w12 mr0  font_size_standard tc","editor":"text"}, 
		    {"id":"CZKC", "groupid":"CZKC", "title":"充足库存", "css":"w12 mr0  font_size_standard tc","editor":"text"}, 
		    {"id":"update", "title":"编辑", "groupid":"CZ",  "rowindex":1, "editor":"JLUpdateSubmit",
		    	"listener":{
		    		"submit": function(thisPlugin, rowIndex, obj){
				    	debugger;
				    	var arr =  new Array();
				    	var map = new Object();
				    	var XmlData = $.extend({}, thisPlugin.getData(rowIndex));
				    	if(JL.isNull(XmlData["SLKC"])){
				    		JL.tip("请填写少量库存限额");
				    		return false;
				    	}else if(XmlData["SLKC"]*1 <= 0||isNaN(XmlData["SLKC"]*1)){
				    		JL.tip("少量库存限额必须为数字");
				    		return false;
				    	}
				    	if(JL.isNull(XmlData["CZKC"])){
				    		JL.tip("请填写充足库存限额");
				    		return false;
				    	}else if(XmlData["CZKC"]*1 <= 0||isNaN(XmlData["CZKC"]*1)){
				    		JL.tip("充足库存限额必须为数字");
				    		return false;
				    	}
				    	if(XmlData["SLKC"]*1 > XmlData["CZKC"]*1){
				    		JL.tip("少量库存数量必须小于充足库存数量");
				    		return false;
				    	}
				    	XmlData["GSXX01"] = userInfo["PCRM_GSXX01"];
				    	arr[0] = XmlData;
				    	map["XZSPLB"]  = arr;
				    	var ajaxJson = {};
				    	debugger;
				    //	ajaxJson["src"] = "http://192.13.4.38:8080/V9/Inbound/invoke.do?rid="+Math.random();
				    	ajaxJson["src"] = pubJson.getURL("ScmUrl") + "/Inbound/invoke.do?rid="+Math.random();
				    	ajaxJson["data"] = {"interfaceId":"scmform.kcslzt.update", "data":JSON.stringify(map)};
				    	var resultData = JL.ajax(ajaxJson);
				    	console.info(resultData);
				    	if(resultData["MSGID"]=="S"){
				    		JL.tip("保存成功");
				    		return true;
				    	}else{
				    		JL.tip(resultData["MESSAGE"]);
				    		return false;
				    	}
				    }
		    	}
		    }, 
		    {"id":"delete", "title":"删除", "groupid":"CZ",  "rowindex":1, "editor":"link",
		    	"listener":{
		    		"click": function(thisPlugin, rowIndex, obj){
				    	debugger;
				    	var arr =  new Array();
				    	var map = new Object();
				    	var XmlData = $.extend({}, thisPlugin.getData(rowIndex));
				    	JL.confirm("是否确认删除?", function(){
				    		XmlData["GSXX01"] = userInfo["PCRM_GSXX01"];
					    	arr[0] = XmlData;
					    	map["XZSPLB"]  = arr;
					    	var ajaxJson = {};
					    	debugger;	
					    	ajaxJson["src"] = pubJson.getURL("ScmUrl") + "/Inbound/invoke.do?rid="+Math.random();
					    	ajaxJson["data"] = {"interfaceId":"scmform.kcslzt.delete", "data":JSON.stringify(map)};
					    	var resultData = JL.ajax(ajaxJson);
					    	console.info(resultData);
					    	if(resultData["MSGID"]=="S"){
					    		JL.tip("删除成功");
					    		thisPlugin.removeRow(rowIndex);
					    		return true;
					    	}else{
					    		JL.tip(resultData["MESSAGE"]);
					    		return false;
					    	}
						});
				    //	ajaxJson["src"] = "http://192.13.4.38:8080/V9/Inbound/invoke.do?rid="+Math.random();
				    }
		    	}
		    }
        ]
	},
	//商品导入
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"afterUpload" : function(data) {
				var XmlData = {};
				XmlData["MBBM"] = 4; // 取MongoDB中excel表的jlbh
				XmlData["FILE"] = data;
				var ajaxJson = {};
				ajaxJson["src"] = "excelHandler/getExcelData.do?rid="+ Math.random();
				ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
				var resultData = JL.ajax(ajaxJson);
				var new_SPLB=[];
				var error_SPLB=[];
			    var tip="";
			    if (!JL.isNull(resultData)) {
			    	resultData = resultData.data.returnList;
			    	 if(resultData.length>0){
					    	for(var i=0;i<resultData.length;i++){
					    		var querydata={};
					    		querydata["SPBM"] = resultData[i]["SPXX02"];
					    		querydata["SPMC"] = resultData[i]["SPMC"];
					    	    if(JL.isNull(querydata["SPBM"])){
					    	    	 var error={};
									 error.NUM=i*1+1;
									 error.ERROR="导入的商品编码不能为空";
									 error_SPLB.push(error);
					    	    }else{
					    	    	var flag = 0;
					    	    	//检查数量
					    	    	if(!JL.isNull(resultData[i]["SLKC"])){
					    				if(resultData[i]["SLKC"]*1 <= 0||isNaN(resultData[i]["SLKC"]*1)){
					    					 var error={};
											 error.NUM=i*1+1;
											 error.ERROR="导入的少量库存数量必须为数字";
											 error_SPLB.push(error);
											 flag = 1;
					    				}
					    			}
					    	    	if(!JL.isNull(resultData[i]["CZKC"])){
					    				if(resultData[i]["CZKC"]*1 <= 0||isNaN(resultData[i]["CZKC"]*1)){
					    					 var error={};
											 error.NUM=i*1+1;
											 error.ERROR="导入的充足库存数量必须为数字";
											 error_SPLB.push(error);
											 flag = 1;
					    				}
					    			}
					    	    	if(flag==0){
					    	    		//判断商品是否有效
						    	    	var resultData1 = defineSZKCSLZT.getSqlResult(querydata,"defineSZKCSLZT","SPXX","admin/scm/jcdy/search");
						    	    	resultData1 = resultData1["data"];
						    	    	if (resultData1.length>0) {
						    	    		
						    	    		//补值
						    	    		//if(JL.isNull(resultData[i]["SPMC"])){
						    	    			resultData[i]["SPMC"] = resultData1[0]["SPMC"]
						    	    		//}
						    	    		resultData[i].SPXX01 = resultData1[0]["SPXX01"]
						    	    		new_SPLB.push(resultData[i]);
						    	    	}else{
						    	    		var error={};
											error.NUM=i*1+1;
											error.ERROR="导入商品不符合条件或系统中不存在该商品";
											error_SPLB.push(error);
						    	    	}
					    	    	}
					    	    	
					    	    }
					    	}
					    	//数据汇总
					    	if(new_SPLB.length>0){
					    		for(var i=0;i<new_SPLB.length;i++){
					    			if(!JL.isNull(new_SPLB[i]["SLKC"])){
					    				new_SPLB[i]["SLKC"] = parseInt(new_SPLB[i]["SLKC"]);
					    			}
					    			if(!JL.isNull(new_SPLB[i]["CZKC"])){
					    				new_SPLB[i]["CZKC"] = parseInt(new_SPLB[i]["CZKC"]);
					    			}
					    		}
					    	}
					    	 if(new_SPLB.length!=resultData.length){
					    		 defineSZKCSLZT.find("li[name='BUTTON']").show();
					    		 defineSZKCSLZT.getPluginObj("MESSAGE").setData(error_SPLB);
							}
					    	 defineSZKCSLZT.getPluginObj("XZSPLB").setData(new_SPLB);// 将数据写入到对应的列表控件名grid上。
					    }
			    }else {
					JL.tip("读取Excel失败");
				}
			}
	},
	},
	 //查看错误信息按钮
	  "DRCM":{
		  "jlid":"JLToolBar",
		  "buttons":{
			  "jlDEL":{
				  "name":"查看错误信息按钮",
				  "css": "jl_btn btn_blue",
				  "func":function(data){
					  if(defineSZKCSLZT.find("li[name='MESSAGE']").is(":hidden"))
					  {
						  defineSZKCSLZT.find("li[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineSZKCSLZT.find("li[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	 //导入商品错误信息展示
	  "MESSAGE": {
		  "jlid"    : "JLGrid",
		  "tittles" : "错误信息列表",
		  "headers" : [
		       {"id" : "NUM", "name" : "EXCEL行号", "width" : 120},
	           {"id" : "ERROR",   "name" : "错误信息", "width" : 400}
	       ]
	  }
});
defineSZKCSLZT.setEvent([
	{
		"selector": "#CX",
		"event":"click",
		"func":function(){
			defineSZKCSLZT.query();
		}
	},
	{
		"selector": "#PLSZ",
		"event":"click",
		"func":function(){
			var slkc = defineSZKCSLZT.getTab().find("[name='SLKC']").val();
			var czkc = defineSZKCSLZT.getTab().find("[name='CZKC']").val();
			if(JL.isNull(slkc) && JL.isNull(czkc)){
				JL.tip("请填写设定限额数量");
				return false;
			}
			//少量
			if(JL.isNull(czkc)){
				if(slkc*1 <= 0||isNaN(slkc*1)){
					JL.tip("少量库存数量必须大于0,且必须为数字");
					return false;
				} 
			}
			//充足
			if(JL.isNull(slkc)){
				if(czkc*1 <= 0||isNaN(czkc*1)){
					JL.tip("充足库存数量必须大于0,且必须为数字");
					return false;
				}
			}
			var gxsp = defineSZKCSLZT.getPluginObj("XZSPLB").getSelected();//选中的商品
			var gxhh = defineSZKCSLZT.getPluginObj("XZSPLB").getSelectedIndex();//选中的行号
			if(gxsp.length>0){
				for(var i=0;i<gxhh.length;i++){
					var hh = gxhh[i];
					if(!JL.isNull(slkc)){
						defineSZKCSLZT.getPluginObj("XZSPLB").setCell(slkc, gxhh[i],4);
					}
					if(!JL.isNull(czkc)){
						defineSZKCSLZT.getPluginObj("XZSPLB").setCell(czkc, gxhh[i],5);
					}
				}
			}else{
				JL.tip("请选择批量设置商品");
				return false;
			}
		}
	}
	
])

defineSZKCSLZT.setAfterInit(function() {
	defineSZKCSLZT.query();
});

defineSZKCSLZT.query = function() {
	var query={};
	var search = defineSZKCSLZT.getTab().find("[name='query']").val();
	if(!JL.isNull(search)){
		query["SPMC"] = search;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	query["GSXX01"]= userInfo["PCRM_GSXX01"];
	console.info(query);
	var resultData = defineSZKCSLZT.getSqlResult(query, "defineSZKCSLZT", "SCM_SZKCSLZT", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineSZKCSLZT.getPluginObj("LIST").setPaging(resultData.fileName); 
};