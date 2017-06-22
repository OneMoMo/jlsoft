var message = null;
$(document).ready(function(){
	$(".jl_header").load("header.html");
	$(".jl_footer").load("footer.html");
	
	message = JL.JLForm();
	message.setTab(document);
	message.setPlugin({
		"daiBan" : {
			"jlid" : "JLLayoutGrid",
			"style": "jl_list_05",
			"multi": false,
			"header" : [ 
			    {"id" : "GZL02", "groupid" : "div", "rowindex" : 1, "groupcss" : "list_main pl10", "editor" : "h4", "css" : "w12"}, 
			    {"id" : "NUM","groupid" : "div","rowindex" : 1, "editor" : "label", "css" : "bgcolor_red position_a right0"}
			],
			"listener" : {
				"rowclick" : function(thisPlugin, data, rowIndex) {
					window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/daiBan.html?GZL01="+data.GZL01+"&GZL02="+escape(data.GZL02);
				}
			}
		},
		"chaoSong" : {
			"jlid" : "JLLayoutGrid",
			"style": "jl_list_05",
			"multi": false,
			"header" : [ 
			    {"id" : "GZL02", "groupid" : "div", "rowindex" : 1, "groupcss" : "list_main pl10", "editor" : "h4", "css" : "w12"}, 
			    {"id" : "NUM","groupid" : "div","rowindex" : 1, "editor" : "label", "css" : "bgcolor_red position_a right0"}
			],
			"listener" : {
				"rowclick" : function(thisPlugin, data, rowIndex) {
					window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/chaoSong.html?GZL01="+data.GZL01+"&GZL02="+escape(data.GZL02);
				}
			}
		}
	});

	message.setAfterInit(function() {
		var XmlData = {};
		XmlData["GZL08"] = 1;
		XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
		
		
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectDBSL.do";
		ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
			message.getPluginObj("daiBan").setData(resultData);
			var NUM = 0;
			for(var i=0; i<resultData.length; i++){
				NUM += resultData[i]["NUM"];
			}
			$("#daiBanSize").html("("+NUM+"条)");
		}

		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/CX/selectDBSL_CC.do";
		ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		if(!JL.isNull(resultData)){
			resultData = resultData.data.returnList;
			message.getPluginObj("chaoSong").setData(resultData);
			var NUM = 0;
			for(var i=0; i<resultData.length; i++){
				NUM += resultData[i]["NUM"];
			}
			$("#chaoSongSize").html("("+NUM+"条)");
		}
	});

	message.initData = function(XmlData, url, type, returnRE) {
		var ajaxJson = {};
		ajaxJson["src"] = url;
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify(XmlData)
		};
		var resultData = JL.ajax(ajaxJson);
		var data;
		if (resultData) {
			if (returnRE) {
				data = resultData.data.returnList;
			} else {
				data = resultData.data;
				for (var i = 0; i < data.length; i++) {
					data[i].SK02 = JL.isNull(data[i].SK02) ? {} : JSON
							.parse(data[i].SK02)
					data[i].SK03 = JL.isNull(data[i].SK03) ? {} : JSON
							.parse(data[i].SK03);//摘要数据
					data[i].TODO_PROFILE_STR = "";
					$.each(data[i].SK02, function(key, value) {
						data[i].TODO_PROFILE_STR += key + ": " + value
								+ "&nbsp;&nbsp;";
					});
					data[i].TODO_PROFILE_STR = "(&nbsp;&nbsp;"
							+ data[i].TODO_PROFILE_STR + ")";

					data[i].title = data[i].TBLNAME + "-" + data[i].JLBH + '-'
							+ data[i].BZ02 + ' ' + data[i].TODO_PROFILE_STR;
				}

			}
			message.getPluginObj(type).setData(data);
		}
	}
	message.initForm();
});