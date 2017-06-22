$(document).ready(function(){
	var chaoSong = JL.JLForm();
	chaoSong.setTab(document);
	chaoSong.setPlugin({
		"chaoSong" : {
			"jlid": "JLLayoutGrid",
			"multi": false,
			"style": "jl_list_05",
			"rowclass": "pl0",
			"touchMenu": [
                {"id": "FN", "groupcss" : "list_name bgcolor_blue"} 
            ],
			"header" : [ 
                {"id": "FN", "groupcss" : "list_name bgcolor_blue"}, 
                {"id": "BZ02", "groupid": "div", "rowindex": 1, "groupcss": "list_main pl55 w12", "css": "fl", "editor": "h4"}, 
                {"id": "LSH", "groupid": "div", "rowindex": 1, "css": "fl pl5"}, 
				{"id": "SK04", "groupid": "div", "rowindex": 1, "css" : "font_gray fr"}, 
				{"id": "TJRYMC", "groupid": "div", "rowindex": 2,  "css" : "w12"}
			],
			"listener" : {
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
						thisPlugin.setRow(row, index);
					}
					
					if(row.ZT == "超时"){
						dl.append("<em class='bgcolor_red'>超</em>");
						dl.parent().addClass("oa_urgent");
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
							
							resultData = resultData.data.resultList;
							for (var i = 0; i < resultData.length; i++) {
								var row = resultData[i];
								obj.find(".btn > ul").append("<li class='btn_red' style='width:100px;'><span class='w12' title='title'>"+row.XW02+"</span></li>");
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

	chaoSong.setAfterInit(function() {
		chaoSong.find("#back > span", "header.jl_header").html(JL.getUrlParam("GZL02") + "抄送列表");
		var XmlData = {};
		XmlData["GZL01"] = JL.getUrlParam("GZL01");
		var BZ01 = JL.getUrlParam("BZ01");
		if(!JL.isNull(BZ01)){
			XmlData["BZ01"] = BZ01;
		}
		chaoSong.getDB(XmlData);
	});
	
	chaoSong.getDB = function(XmlData){
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/selectDBSY.do";
		ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		if(!JL.isNull(resultData)){
			chaoSong.getPluginObj("chaoSong").setData(resultData.data);
			chaoSong.getPluginObj("chaoSong").setPaging(resultData.fileName);
		}
	}

	$(".jl_header").load("header.html", function(){
		chaoSong.initForm();
	});
	$(".jl_footer").load("footer.html");
});