var daiBan = null;
$(document).ready(function(){
	daiBan = JL.JLForm();
	daiBan.setTab(document);
	
	daiBan.BUTTONS = {};
	daiBan.BUTTONSIZE = {};
	daiBan.XWLIST = {};
	
	daiBan.mobileBatchGrid = ["daiBan"];
	daiBan.mobileBatchButton = {
		"allCheck":""
	};
	daiBan.setPlugin({
		"daiBan" : {
			"jlid": "JLLayoutGrid",
			"multi": false,
			"style": "jl_list_05",
			"rowSelectMode": "multi",
			"header" : [ 
                {"id": "FN", "groupcss" : "list_name"}, 
                {"id": "BZ02", "groupid": "div", "rowindex": 1, "groupcss": "list_main pl55 w12", "css": "fl", "editor": "h4"}, 
                {"id": "LSH", "groupid": "div", "rowindex": 1, "css": "fl pl5"}, 
				{"id": "SJZT", "groupid": "div", "rowindex": 1, "css" : "font_gray fr"}, 
				{"id": "TJRYMC", "groupid": "div", "rowindex": 2,  "css" : "w12"}
			],
			"listener" : {
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
										"name": XW.XW02,
										"GZ01": XW.GZ01,
										//"icon": "plus-square",
										"css": "jl_btn btn_color",
										"func": function(){
											var button_id = $(this).attr("id");
											var GZ01 = form.BUTTONS[button_id]["GZ01"];
											console.info($(this).attr("id"));
											console.info(GZ01);
											var grid = form.getPluginObj("daiBan");
									        var selectedIndex = grid.getSelectedIndex();

											JL.recursiveAjaxForDaiBan(grid, {}, selectedIndex, "操作", 0, GZ01);
										}
									}
									$.extend(form.BUTTONS, buttons);
									
									form.addMobileBatchButton(buttons);
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
						row.FN = row.TJRYMC.substring(0, 1);//摘要数据
						row.XW = JL.isNull(row.XW)?[]:JSON.parse(row.XW);//摘要数据
						row.SK02 = JL.isNull(row.SK02)?{}:JSON.parse(row.SK02);//摘要数据
						row.SK03 = JL.isNull(row.SK03)?{}:JSON.parse(row.SK03);//摘要数据
						row.TODO_PROFILE_STR = [];
						row.PROFILE = [];
						$.each(row.SK02, function(key,value){
							var str = value;
							if(row.TODO_PROFILE_STR.length < 3){
								row.TODO_PROFILE_STR.push(str);
							}else{
								row.PROFILE.push(str);
							}
						});
						row.LSH = "("+row.TBLNAME+"-"+row.JLBH+")";
						
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
					
					var FN = dl.find("[data-id='FN']");
					if(row.ZT == "超时"){
						FN.closest("dd").addClass("bgcolor_red");
						FN.html("超时");
					}else{
						FN.closest("dd").addClass("bgcolor_green");
						FN.html("待办");
					}
				},
				"beforeswipeleft" : function(thisPlugin, data, rowIndex, obj) {
					if(obj.find(".btn > ul > li").length == 0){
						var ajaxJson = {};
						ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectXW.do"; 
						ajaxJson["data"] = {"XmlData":JSON.stringify(data)};
						var resultData = JL.ajax(ajaxJson);
						if(!JL.isNull(resultData)){ 
							if(obj.find(".btn > ul").length == 0){
								obj.append("<dd class='btn'><ul></ul></dd>");
							}
							var btn_color = ["green", "red", "blue", "yellow"];

							resultData = resultData.data.resultList;
							if(resultData.length == 0){
								return false;
							}
							for (var i = 0; i < resultData.length; i++) {
								var row = resultData[i];
								var btn = $("<li class='btn_"+btn_color[i]+"' style='width:100px;'><span class='w12' title='title'>"+row.XW02+"</span></li>").appendTo(obj.find(".btn > ul"));
								btn.data(row);
								btn.click(function(e){
									var BZ = thisPlugin.getData(rowIndex);
									if(BZ.BZ03 != "1"){
										var XmlData = BZ.SK03;
	       	            				var row = $(this).data();
	       	            				var XWData = {};
	       	            				XWData["initField"] = JSON.stringify(JSON.parse(row.JK03).field);
	       	            				XWData["xwbh"] = row.XW01;
	       	            				debugger;
	       	            				if(!JL.isNull(row.GZ01)){
	       	            					var selectedIndex = thisPlugin.getSelectedIndex();
	       	            					JL.saveForm(daiBan, XmlData, "操作", {
	       	            						"success":function(){
	       	            							thisPlugin.removeRow(rowIndex);
	       	            						}
	       	            					}, XWData);
	       	            					
	       	            				}
	       	            			}
									e.stopPropagation();
								});
							}
						}
					}
				},
				"rowclick" : function(thisPlugin, data, rowIndex) {
					data.YWSJ = {"bdbh": data.TBLNAME, "jlbh": data.JLBH, "PCRM_CH": false};
    				window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/main.html?data="+escape(JSON.stringify(data));
				}
			}
		}
	});

	daiBan.setAfterInit(function() {
		daiBan.find("#back > span", "header.jl_header").html(JL.getUrlParam("GZL02") + "待办列表");
		var XmlData = {};
		XmlData["GZL01"] = JL.getUrlParam("GZL01");
		var BZ01 = JL.getUrlParam("BZ01");
		if(!JL.isNull(BZ01)){
			XmlData["BZ01"] = BZ01;
		}
		daiBan.getDB(XmlData);
	});
	
	daiBan.getDB = function(XmlData){
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/selectDBSY.do";
		ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		if(!JL.isNull(resultData)){
			daiBan.getPluginObj("daiBan").setData(resultData.data);
			daiBan.getPluginObj("daiBan").setPaging(resultData.fileName);
		}
	}

	$(".jl_header").load("header.html", function(){
		daiBan.initForm();
	});
	$(".jl_footer").load("footer.html");
});