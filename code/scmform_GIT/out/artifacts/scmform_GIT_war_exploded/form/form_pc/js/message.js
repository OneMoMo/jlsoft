var message = JL.JLForm();

message.setPlugin({
	"footer": {
		"jlid": "JLToolBar",
		"buttons": {
		}
	},
	"ALL": {
		"jlid": "JLToolBar",
		"buttons": {
			"ALL":{
				"name": "全部标为已读",
				"func":function(){
					for(var i=0; i<message.getPluginObj("WD").getData().length; i++){
						var XmlData = {};
					    XmlData["QX01"] = message.getPluginObj("WD").getData(i, "QX01");
					    JL.ajax({
						    "async": false,
						    "src": pubJson.getURL("FormUrl") + "/defMSG/updateMSGHF.do",
						    "data": {"XmlData": JSON.stringify(XmlData)},
						    "callback": function(resultData){
							    thisPlugin.removeDL(rowIndex);
						    }
					    });
					}
					message.getPluginObj("WD").setData([]);
				}
			}
		}
	},
	"XXFL" : {
		"jlid": "JLSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectXXFL.do",
		"placeholder": "按类型查找",
		"listener":{
			"change": function(){
				message.selectMessage();
			}
		}
	}, 
	"time" : {
		"jlid": "JLRadio",
		"default": "7",
		"options": {"0":"今天","7":"最近一周","30":"最近一个月"},
		"listener": {
			"click":function(data, thisPlugin){
				message.selectMessage();
			}
		}
	}, 
	"YD": {
		"jlid": "JLLayoutGrid",
		"style": "jl_table_01",
		"paging": "more",
		"multi": false,
		"rowclass": "pl10",
		"header": [
	    	//{"id" : "TJRYMC","title": "提交人", "css":"w12", "groupid": "RY"}, 
	    	{"id" : "MS06","title": "标题", "css":"w10", "groupid": "F", "rowindex":1, "groupcss": "w12 font_blue pl0", "editor": "h2"}, 
	    	/*{"id" : "FLMC","name": "类型", "css":"w02 pr0 tc", "groupid": "F", "rowindex":1},*/
	    	{"id" : "MS11","title": "摘要", "css":"w12 mr0 pl0 font_gray", "groupcss":"w06"}, 
	    	{"id" : "FLMC","title": "类型", "groupcss":"w02 tc", "css":"w12 pr0"}, 
	    	//{"id" : "BZ02","title": "步骤", "css":"mr10", "groupid": "ZT", "rowindex":1}, 
	    	{"id" : "MS03","title": "发布人", "groupcss":"w02 tc", "css":"w12 pr0"}, 
	    	{"id" : "MS10","title": "提交时间", "groupcss":"w02 tc", "css":"w12 pr0"}, 
	    	/*{"id" : "more","title": "查看附件", "groupcss":"w01 tc", "groupid": "more", "rowindex":1, "css": "mr10",
	    		"editor": "link",
	    		"listener": {
	    			"click": function(thisPlugin, rowIndex, obj){
	    				JL.attachmentView(obj);
	    			}
	    		}
	    	}*/
		],
        "listener":{
    		"rowclick":function(thisPlugin, data, rowIndex){
    			debugger;
    			var json = {};
    			json["CD02"] = "公告详情";
    			json["CD03"] = JSON.stringify({
					"bdym": "messageDetail",
					"url": pubJson.getURL("FormUrl") + "/form/form_pc/messageDetail.html?rid="+Math.random()
				});
    			json["YWSJ"]=data;
				loadPage(json);
    	   }
       }
	},
	"WD": {
		"jlid": "JLLayoutGrid",
		"style": "jl_table_01",
		"paging": "more",
		"multi": false,
		"rowclass": "pl10",
		"header": [
            {"id" : "MS06","title": "标题", "css":"w10", "groupid": "F", "rowindex":1, "groupcss": "w12 font_blue pl0", "editor": "h2"}, 
	    	/*{"id" : "FLMC","name": "类型", "css":"w02 pr0 tc", "groupid": "F", "rowindex":1},*/ 
            {"id" : "MS11","title": "摘要", "css":"w12 mr0 pl0 font_gray", "groupcss":"w06"}, 
            {"id" : "FLMC","title": "类型", "groupcss":"w02 tc", "css":"w12 pr0"}, 
            {"id" : "MS03","title": "发布人", "groupcss":"w02 tc", "css":"w12 pr0"}, 
            {"id" : "MS10","title": "提交时间", "groupcss":"w02 tc", "css":"w12 pr0"}, 
            {"id" : "ZT", "hidden":true} 
        ],
        "listener":{
    		"rowclick":function(thisPlugin, data, rowIndex){
    			var json = {};
    			json["CD02"] = "公告详情";
    			json["CD03"] = JSON.stringify({
					"bdym": "messageDetail",
					"url": pubJson.getURL("FormUrl") + "/form/form_pc/messageDetail.html?rid="+Math.random()
				});
    			json["YWSJ"]=data;
				loadPage(json);
				thisPlugin.removeRow(rowIndex);
    	   }
       }
	}
});

message.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		message.selectMessage({});
	}
},{
	"selector": ".jl_tab_title > ul > li",
	"event": "click",
	"func": function(){
		var id = $(this).attr("data-id");
		if(id == "WD"){//未读
			$("#d_ALL").show();
			message.find("#XXZT").val("0");
			message.selectMessage({});
		}else if(id == "YD"){//已读
			$("#d_ALL").hide();
			message.find("#XXZT").val("1");
			message.selectMessage({});
		}
	}
}]);

message.selectMessage = function(json){
	var form = this;
	var current = message.find(".jl_tab_title > ul > li.xuan").attr("data-id");
	form.getPluginObj(current).setData([]);
	var XmlData = {};
	XmlData["pagenum"] = 1;
	XmlData["pagesize"] = 20;
	XmlData["XXZT"] = message.find("#XXZT").val();
	XmlData["TEXT"] = message.find("#TEXT").val();
	XmlData["XXFL"] = message.getPluginObj("XXFL").getData("key");
	XmlData["time"] = message.getPluginObj("time").getData("key");
	$.extend(XmlData, json);
	JL.ajax({
		"async": false,
		"src": pubJson.getURL("FormUrl") + "/defMSG/selectMSG.do",
		"data": {"XmlData": JSON.stringify(XmlData)},
		"callback": function(resultData){
			if(!JL.isNull(resultData)){
				resultData = resultData.data.returnList;
				message.getPluginObj(current).setData(resultData);
			}
		}
	});
}

message.setAfterInit(function(){
	JL.tab(message, {
		"WD": "未读公告",
		"YD": "已读公告"
	});
	this.selectMessage();
	JLMessage.unbind("1002").bind("1002", function(data){
		console.info(data);
		var current = message.find(".jl_tab_title > ul > li.xuan").attr("data-id");
		var LIST_DATA = message.getPluginObj(current).getData();
		var arr = [];
		arr.push(data);
		for(var i=0; i<LIST_DATA.length; i++){
			arr.push(LIST_DATA[i]);
		}
		message.getPluginObj(current).setData(arr);
	});
});

