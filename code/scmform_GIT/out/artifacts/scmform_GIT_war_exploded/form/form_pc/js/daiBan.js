var data_name = $(".pagr_content[data-name^='daiBan']:not(:hidden)").attr("data-name");
eval("var "+data_name+" = JL.JLForm();");
var daiBan = eval(data_name);

daiBan.BUTTONS = {};
daiBan.BUTTONSIZE = {};
daiBan.XWLIST = {};

daiBan.setButton = function(){
	this.getTab().find(".jl_operation").show();
	if(this.getTab().find(".jl_operation > .oper_main > a:not(:hidden)").length == 0){
		this.getTab().find(".jl_operation").hide();
	}else{
		this.getTab().find(".jl_operation").show();
	}
}

daiBan.setPlugin({
	"footer": {
		"jlid": "JLToolBar",
		"buttons": {
		}
	},
	"BZ": {
		"jlid": "JLSelect",
		"placeholder" : "请选择步骤"
	},
	"LIST": {
		"jlid": "JLLayoutGrid",
		"style": "jl_table_01",
		"paging": "more",
		"severity": "ZT",
		//"pagesize":"10",
		"header": [],
		"listener": {
			"checked": function(thisPlugin, rowIndex, dl){
				var form = thisPlugin.form;
				var data = thisPlugin.getData(rowIndex);
				if(data.GZL05 == 1 && data.BZ03 != 1){
					var GZLBZ = data.GZL01 +"_"+ data.BZ01;
					var XWLIST = form.XWLIST[GZLBZ];
					//同一步骤只取一次行为
					if(JL.isNull(form.XWLIST[GZLBZ])){
						var ajaxJson = {};
						ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectXW.do"; 
						ajaxJson["data"] = {"XmlData":JSON.stringify(data)};
						var resultData = JL.ajax(ajaxJson);
						if(!JL.isNull(resultData)){ 
							resultData = resultData.data.resultList;
							form.XWLIST[GZLBZ] = resultData;
							XWLIST = resultData;
						}
					}
					thisPlugin.setCell(XWLIST, rowIndex, "XW");
				}
				
				//获取选中行
				var selected = thisPlugin.getSelected();
				form.BUTTONSIZE = {};
				for(var i=0; i<selected.length; i++){
					var row = selected[i];
					//OA审批流 并且不是 第一步
					if(row.GZL05 == 1 && row.BZ03 != 1){
						//循环按钮
						for(var j=0; j<row.XW.length; j++){
							var XW = row.XW[j]; 
							var buttonid = "batch_" + XW.GZ01;
							//获取相同规则的数量
							form.BUTTONSIZE[buttonid] = JL.isNull(form.BUTTONSIZE[buttonid])? 1: form.BUTTONSIZE[buttonid]+1;
							if(JL.isNull(form.BUTTONS[buttonid])){
								var buttons = {};
								buttons[buttonid] = {
									"name": "批量" + XW.XW02,
									"GZ01": XW.GZ01,
									"icon": "plus-square",
									"css": "jl_btn btn_blue_or",
									"func": function(){
										var button_id = $(this).attr("id");
										var GZ01 = form.BUTTONS[button_id]["GZ01"];
										console.info($(this).attr("id"));
										console.info(GZ01);
										var grid = form.getPluginObj("LIST");
								        var selectedIndex = grid.getSelectedIndex();

										JL.recursiveAjaxForDaiBan(grid, {}, selectedIndex, "操作", 0, GZ01);
									}
								}
								$.extend(form.BUTTONS, buttons);
								
								form.getPluginObj("footer").addButton(buttons);
							}
						}
					}
				}
				
				//显示隐藏按钮
				form.getTab().find(".jl_operation > .oper_main > a").hide();
				$.each(form.BUTTONSIZE, function(key, value){
					if(value == selected.length){
						form.getTab().find("#"+key).show();
					}
				});
				form.setButton();
			},
			"loadRow": function(thisPlugin, data, index, dl){
				var row = data;
				if(JL.isNull(row.LSH)){
					row.XW = JL.isNull(row.XW)?[]:JSON.parse(row.XW);//摘要数据
					row.SK02 = JL.isNull(row.SK02)?{}:JSON.parse(row.SK02);//摘要数据
					row.SK03 = JL.isNull(row.SK03)?{}:JSON.parse(row.SK03);//摘要数据
					row.TODO_PROFILE_STR = {};
					row.PROFILE = {};
					var TODO_PROFILE_STR_SIZE = 0;
					$.each(row.SK02, function(key,value){
						var str = value;
						if(TODO_PROFILE_STR_SIZE < 5){
							row.TODO_PROFILE_STR[key] = value;
						}else{
							row.PROFILE[key] = value;
						}
						TODO_PROFILE_STR_SIZE++;
					});
					row.LSH = row.TBLNAME+"-"+row.JLBH;
					var CSZT = "";
					if(!JL.isNull(row.CSZT)){
						if(row.CSZT > 0){
							if(row.CSZT/60/24 > 0){
								var tian = row.CSZT/24/60;
								var shi = (row.CSZT - parseInt(tian) * 24 * 60) / 60;
								var fen = row.CSZT - parseInt(tian) * 24 * 60 - parseInt(shi) * 60;
								CSZT += "超过" + parseInt(tian) + "天";
								CSZT += parseInt(shi)  + "小时";
								CSZT += parseInt(fen) + "分钟未处理";   
							}else if(row.CSZT/60 > 0){
								var shi = row.CSZT/60;
								var fen = row.CSZT - parseInt(shi) * 60;
								CSZT += "超过" + row.CSZT/60 + "小时";
								CSZT += row.CSZT + "分钟未处理";
							}else if(row.CSZT > 0){
								CSZT += "超过" + row.CSZT + "分钟未处理";   
							}
							row.ZT = "超时";
						}else if(row.CSZT < 0){
							row.CSZT = row.CSZT * -1;
							if(row.CSZT/60/24 > 0){
								var tian = row.CSZT/24/60;
								var shi = (row.CSZT - parseInt(tian) * 24 * 60) / 60;
								var fen = row.CSZT - parseInt(tian) * 24 * 60 - parseInt(shi) * 60;
								CSZT += "还有" + parseInt(tian) + "天";
								CSZT += parseInt(shi)  + "小时";
								CSZT += parseInt(fen) + "分钟超时";   
							}else if(row.CSZT/60 > 0){
								row.CSZT = row.CSZT * -1;
								var shi = row.CSZT/60;
								var fen = row.CSZT - parseInt(shi) * 60;
								CSZT += "还有" + row.CSZT/60 + "小时";
								CSZT += row.CSZT + "分钟超时";
							}else if(row.CSZT > 0){
								CSZT += "还有" + row.CSZT + "分钟超时";   
							}
							row.ZT = "正常";
						}else if(row.CSZT == 0){
							CSZT += "即将超时";
							row.ZT = "正常";
						}
					}
					row.CSZT = CSZT;
					thisPlugin.setRow(row, index);
				}
				
				if(row.ZT == "超时"){
					dl.append("<em class='bgcolor_red'>超</em>");
					dl.parent().addClass("oa_urgent");
				}
			},
			"rowclick": function(thisPlugin, daiBanRow, rowIndex){
				if($(window.event.target).closest("[groupid='CZ']").length == 0){
					daiBan.openForm(daiBanRow);
				}
				
				thisPlugin.getDL(rowIndex).addClass("visited");
			}
		}
	}
});

daiBan.openForm = function(daiBanRow){
	daiBanRow.CD01 = daiBanRow.GZL01;
	daiBanRow.CD02 = daiBanRow.GZL02 + "("+ daiBanRow.TBLNAME +"-"+ daiBanRow.JLBH+")";
	daiBanRow.YWSJ = {"bdbh":daiBanRow.TBLNAME,"jlbh":daiBanRow.JLBH,"PCRM_CH":false};
	
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectDBYZ.do"; 
	ajaxJson["data"] = {"sid":Math.random(),"XmlData":JSON.stringify(daiBanRow)};
	
	var resultData = JL.ajax(ajaxJson);
	if(!JL.isNull(resultData)){ 
		resultData = resultData["data"];  
		if (resultData.NUM > 0){
			loadPage(daiBanRow,{"CD02":daiBanRow.GZL02+"待办"});
		}else{
			JL.tip("该待办已经被处理，请刷新后再操作！", "error");
		}
	}
}

daiBan.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(a,b,c,d,e){
		var XmlData = {};
		if(!JL.isNull($(this).prev().val())){
			XmlData["CXTJ"] = $(this).prev().val().split(" ");
		}
		var form = eval(data_name);
		form.selectDBSY(XmlData);
	}
}])

daiBan.selectDBSY = function(queryField){
	debugger;
	var form = this;
	form.getPluginObj("LIST").setData([]);
	var XmlData = {};
	if(!JL.isNull(queryField)){
		XmlData = queryField;
	}
	XmlData["PI_USERNAME"] = userInfo.PCRM_CZY02;
	XmlData["PersonID"] = userInfo.PCRM_CZY02;
	XmlData["CompanyID"] = userInfo.PCRM_GSXX01; 
	XmlData["GSXX01"] = userInfo.PCRM_GSXX01;
	XmlData["GZL01"] = form.getData("GZL01");
	console.info(form.getData("GZL01"));
	if(!JL.isNull(form.getData("BZ01"))){
		XmlData["BZ01"] = form.getData("BZ01");
	}
	 
	if(!JL.isNull(form.getPluginObj("BZ").getData())){
		XmlData["BZ01"] = daiBan.getPluginObj("BZ").getData().key;
	}
	var ajaxJson = {};
	ajaxJson["src"] = "jlquery/selectDBSY.do";
	ajaxJson["async"] = false;
	ajaxJson["data"] = {"sid":Math.random(),"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			if(resultData.data.length > 0){
				var header = [];
				var jl_title = form.getTab().find(".jl_title");
				if(resultData.data[0]["GZL05"] == "1"){
					header = [
				    	//{"id" : "TJRYMC","title": "提交人", "css":"w12", "groupid": "RY"}, 
				    	{"id" : "LSH","title": "流水号", "css":"mr10 font_red", "groupid": "ZT", "rowindex":1, "groupcss": "w08 br"}, 
				    	{"id" : "BZ02","title": "步骤", "css":"mr10", "groupid": "ZT", "rowindex":1}, 
				    	{"id" : "TODO_PROFILE_STR", "title": "步骤", "editor":"arr", "format":false, "css":"mr10", "groupid": "ZT", "rowindex":1}, 
				    	{"id" : "SJZT","title": "提交时间", "groupid": "CZ", "rowindex": 1, "groupcss": "w04", "css":"fl pl5"}, 
				    	{"id" : "XW", "groupid": "CZ", "rowindex": 1, "editor":"Grid", "gridcss":"fr", "rowcss":"fr mr10",
				    		"header": [
		        	             {"id" : "XW02","title": "提交时间", "editor":"span", 
		        	            	 "listener":{
		        	            		 "click": function(thisPlugin, rowIndex, obj, itemIndex){
		        	            			 if(thisPlugin.getData(rowIndex, "BZ03") != "1"){
		        	            				 var row = thisPlugin.getData(rowIndex, "XW")[itemIndex];
		        	            				 console.info(row);
		        	            				 if(!JL.isNull(row.GZ01)){
		        	            					 var selectedIndex = thisPlugin.getSelectedIndex();
		        	            					 JL.recursiveAjaxForDaiBan(thisPlugin, {}, selectedIndex, "操作", 0, row.GZ01);
		        	            				 }
		        	            			 }else{
		        	            				 daiBan.openForm(thisPlugin.getData(rowIndex));
		        	            			 }
		        	            		 }
		        	            	 }
		        	             } 
			        	 	]
				    	}, 
			         	{"id" : "PROFILE","title": "摘要", "editor":"arr", "format":false, "groupid": "ZY", "rowindex": 1, "groupcss": "w12", "parentcss":"hide", "css":"w09 pl20 mh10"}, 
			         	{"id" : "CSZT","title": "超时", "groupid": "ZY", "rowindex": 1, "css":"fr tr mt10 w03"}, 
			         	{"id" : "ZT", "hidden":true} 
			    	];
					
					jl_title.find("[groupid='SC']").attr("class", "");
					jl_title.find("[groupid='SC']").addClass("w02 tr pr10");
					jl_title.find("[groupid='SC']").html("操作");
					jl_title.html("<dl class='pl30'>" + 
						  		  "    <dt><i class='fa fa-square-o'></i></dt>" +
						  		  "    <dd class='w08'>主题</dd>" +
						  		  "    <dd class='w02'>时间</dd>" +
						  		  "    <dd class='w02 tr pr10'>操作</dd>" +
						  		  "</dl>");
				}else if(resultData.data[0]["GZL05"] == "0"){
					header = [
				    	//{"id" : "TJRYMC","title": "提交人", "css":"w12", "groupid": "RY"}, 
				    	{"id" : "LSH","title": "流水号", "css":"mr10 font_red", "groupid": "ZT", "rowindex":1, "groupcss": "w11 br"}, 
				    	{"id" : "BZ02","title": "步骤", "css":"mr10", "groupid": "ZT", "rowindex":1}, 
				    	{"id" : "TODO_PROFILE_STR", "title": "步骤", "editor":"arr", "format":false, "css":"mr10", "groupid": "ZT", "rowindex":1}, 
				    	{"id" : "SJZT","title": "提交时间", "groupid": "CZ", "rowindex": 1, "groupcss": "w01", "css":"fl"}, 
			         	{"id" : "PROFILE","title": "摘要", "editor":"arr", "format":false, "groupid": "ZY", "rowindex": 1, "groupcss": "w12", "parentcss":"hide", "css":"w09 pl20 mh10"}, 
			         	{"id" : "CSZT","title": "超时", "groupid": "ZY", "rowindex": 1, "css":"fr tr mt10 w03"}, 
			         	{"id" : "ZT", "hidden":true} 
			    	];
					
					jl_title.html("<dl class='pl30'>" + 
						  		  "    <dt><i class='fa fa-square-o'></i></dt>" +
						  		  "    <dd class='w11'>主题</dd>" +
						  		  "    <dd class='w01 pr10'>时间</dd>" +
						  		  "</dl>");
				}
				form.getPluginObj("LIST").config.header = header;
				form.getPluginObj("LIST").setData(resultData.data);
				form.getPluginObj("LIST").setPaging(resultData.fileName);
			}
		}
	};
	JL.ajax(ajaxJson);
}

daiBan.setAfterInit(function(){
	this.selectDBSY();
	var DB = this;
	JLMessage.bind("1001", function(data, param){
		if (data.PCRM_LX != 'CH'){
			var GZL01 = param.form.getData("GZL01");
			if(GZL01 == data.GZL01){
				var SK03 = JL.isNull(data.SK03)?{}:JSON.parse(data.SK03);//摘要数据
				data.TBLNAME = SK03.bdbh;
				data.JLBH = SK03.jlbh;
				data.SJZT = "今天";
				var LIST_DATA = DB.getPluginObj("LIST").getData();
				var arr = [];
				if(data.NUM == 1){
					arr.push(data);
				}
				for(var i=0; i<LIST_DATA.length; i++) {
					if(data.NUM == 1 || 
							(data.NUM == -1
									&& data.SK01 != LIST_DATA[i]["SK01"])){
						arr.push(LIST_DATA[i]);
					}
				}
				DB.getPluginObj("LIST").setData(arr);
			}
		}
	}, {
		"form":this
	});
	
	daiBan.getPluginObj("BZ").config.options = {};
	daiBan.getPluginObj('BZ').config.sBillName = "JLInterface";
	daiBan.getPluginObj('BZ').config.sOperateName = "selectGZLBZ.do";
	daiBan.getPluginObj('BZ').config.param = {"GZL01":daiBan.getData().GZL01};
	daiBan.getPluginObj('BZ').init(); 
});

