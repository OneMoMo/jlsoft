var Delivery = JL.JLForm();

Delivery.setPlugin({
	"doc" : {
		"jlid" : "JLLayoutGrid",
		"paging" : "paging",
		"multi" : false,
		"rowclass": "pl10",
		"style":"jl_list_01",
		"header" : [
		    { "id" : "sequence", "groupid" : "XH", "title": "序列","groupcss":"w01"}, 
		    { "id" : "logisticsId", "groupid" : "DM", "title": "物流公司ID","groupcss":"w02"},
		    { "id" : "logisticsName", "groupid" : "MC", "title": "物流公司名称","groupcss":"w08"},
		    { "id" : "isValid", "title": "有效标记" ,"hidden":true},
		    { "id" : "yx", "groupid" : "YXBJ", "rowindex":1,"groupcss":"w01","title" : "点击设为有效", "editor" : "i", "css": "fa fa-check",
				"listener" : {
					"click" : function (thisPlugin, rowIndex, obj) {
						obj.parent().hide();
						obj.parent().next().show();
						var data = thisPlugin.getData(rowIndex);
						data.isValid = "1";
						Delivery.save(data);
						thisPlugin.setRow(data ,rowIndex);
					}
				}
			},
			{ "id" : "wx", "groupid" : "YXBJ", "rowindex":1, "title" : "点击设为无效", "editor" : "i", "css": "fa fa-times",
				"listener" : {
					"click" : function (thisPlugin, rowIndex, obj) {
						obj.parent().hide();
						obj.parent().prev().show();
						var data = thisPlugin.getData(rowIndex);
						data.isValid = "0";
						Delivery.save(data);
						thisPlugin.setRow(data ,rowIndex);
					}
				}
			},
		    { "id" : "description", "name" : "描述", "groupcss": "more w12 ", "css": "w12" }
		],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
				console.info(data.isValid);
				if(data.isValid == "1"){
					dl.find("[data-id='yx']").parent().hide();
					dl.find("[data-id='wx']").parent().show();
				}else if(data.isValid == "0"){
					dl.find("[data-id='yx']").parent().show();
					dl.find("[data-id='wx']").parent().hide();
				}
			}
		}
	}
});

Delivery.save = function(data) {
	var XmlData = {};
	XmlData["query"] = {"userId": userInfo.PCRM_CZY02, "logisticsId": data.logisticsId};
	XmlData["collection"] = "W_Delivery";
	XmlData["result"] = "logisticsId";
	var ajaxJson = {}; 
	ajaxJson["src"] = "form/find.do?rid="+rid;
	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
	var info = JL.ajax(ajaxJson);
	console.info(info);
	
	var XmlData = {};
	var ajaxJson = {}; 
	if(info.data.returnList.length > 0 ){
		var jlbh = info.data.returnList[0].jlbh;
		XmlData["query"] = {"jlbh":jlbh};
		data.jlbh = jlbh;
		XmlData["doc"] = data;
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Delivery/update.do?rid="+rid;
		ajaxJson["data"] = {"json": JSON.stringify(XmlData)};
	}else{
		XmlData = data;
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Delivery/insert.do?rid="+rid;
		ajaxJson["data"] = {"json": JSON.stringify(XmlData)};
	}
	JL.ajax(ajaxJson);
};

Delivery.setAfterInit(function() {
	var XmlData = {};
	XmlData["query"] = {"userId": userInfo.PCRM_CZY02, "isValid": "1"};
	XmlData["collection"] = "W_Delivery";
	XmlData["result"] = "logisticsId";
	var ajaxJson = {}; 
	ajaxJson["src"] = "form/distinct.do?rid="+rid;
	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
	var Deliverys = JL.ajax(ajaxJson);
	Deliverys = JL.isNull(Deliverys.data.resultList)? []: Deliverys.data.resultList;
	
	var XmlData = {};
	XmlData["collection"] = "W_Logistics";
	var ajaxJson = {}; 
	ajaxJson["src"] = "form/find.do?rid="+rid;
	ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
	var Logistics = JL.ajax(ajaxJson);
	if(!JL.isNull(Logistics)){
		Logistics = Logistics.data.returnList;
		var doc = [];
		for(var i=0;i<Logistics.length;i++){
			var row = {};
			row.logisticsId = Logistics[i].id;
			row.logisticsName = Logistics[i].name;
			row.description = Logistics[i].remark;
			row.sequence = Logistics[i].sequence;
			if($.inArray(Logistics[i].id, Deliverys) != -1){
				row.isValid = "1";
			} else {
				row.isValid = "0";
			}
			doc.push(row);
		}
		Delivery.getPluginObj("doc").setData(doc);
	}
});

