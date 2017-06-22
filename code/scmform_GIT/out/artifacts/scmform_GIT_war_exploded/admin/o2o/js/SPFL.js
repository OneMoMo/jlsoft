var SPFL = JL.JLForm();
var transport = new JLTransport();

SPFL.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"sBillName":"SPFL", 
				"before":function(){
					SPFL.readData();
					var data = SPFL.getData();
					data.mjbj = data.mjbj.key;
					if(!JL.isNull(data.jlbh) && data.jlbh*1 > 0){
						data.jlbh = data.jlbh*1;
						this.sOperateName = "update.do";
						var XmlData = {};
						XmlData["query"] = {"jlbh": data.jlbh};
						XmlData["doc"] = data;
						SPFL.data = XmlData;
					}else{
						delete data.doc;
						delete data.query;
						this.sOperateName = "insert.do";
						SPFL.data = data;
					}
				},
				"after":function(resultData){
				}
			},
			"jlCancelSlide":{}
		}
	},
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewCard": {
				"readonly": []
			}
		}
	},
	"spfl" : { 
		"jlid" : "JLTreeGrid", 
		"current": "code",//当前节点
		"parent": "sjcode",//上级节点
		"level": "",//级别
		"final": {"id":"mjbj", "key": "末级"},//末级标记
		"title" : [
		     {"id":"TREE", "name":"名称", "width":"w07"},
		     {"id":"KZ", "name":"扩展", "width":"w03"},
			 {"id":"CZ", "name":"操作", "width":"w02"}
        ],
		"header" : [
             {"id":"code", "groupid":"TREE", "title":"代码"},
             {"id":"name", "groupid":"TREE", "title":"名称"},
             {"id":"jlbh", "groupid":"TREE","title":"jlbh","css":"hide"}, 
             {"id":"impress", "groupid":"TREE","title":"jlbh","css":"hide"}, 
			 {"id":"mjbj", "groupid":"TREE", "title":"末级标记","css":"hide"},
			 {"id":"sjcode", "groupid":"KZ", "name":"上级代码","css":"hide"},
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "editor":"JLNewChild", "config":{
            	 "mapping":{"code":"sjcode"}
             }},
             {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit", "config":{
            	 "readonly": ["code"],
            	 "mapping":{}
             }},
             {"id":"delete", "groupid":"CZ", "title":"删除", "editor":"link",
            	 "listener":{
            		 "click": function(data, rowIndex, obj, plugin){ 
            			 if(!confirm("确认删除该数据么？")){
            				 return;
            			 }
            			 var XmlData = data;
            			 XmlData["yxbj"] = 0;
            			 
            			 var json = {}; 
            			 json["query"] = {"jlbh":data.jlbh};
            			 json["doc"] = XmlData; 
            			 
            			 var ajaxJson = {};
            			 ajaxJson["src"] = "SPFL/findSize.do";
            			 ajaxJson["data"] = {"json":JSON.stringify(json)};
            			 var resultData = JL.ajax(ajaxJson);
            			 var size = resultData.data.size;
            			 if(size>0){
             				JL.tip("该类下还有其子类,如要删除,请先删除其子类!","error");
             				return;
             			 }else{
             				 var ajaxJson1 = {};
                			 ajaxJson1["src"] = "SPFL/update.do";
                			 ajaxJson1["data"] = {"json":JSON.stringify(json)};
                			 JL.ajax(ajaxJson1);
             				 plugin.removeRow(rowIndex);
             			 }
            		 }
            	 }
             }
		]
	},
	"code" : {
		"jlid": "JLInput",
		"css": "w09",
		"format": {
		}
	},
	"sjcode" : {
		"jlid": "JLInput",
		"css": "w09",
		"format": {
		}
	},
	"name" : {
		"jlid": "JLInput",
		"css": "w09",
		"format": {
		}
	}, 
	"mjbj" : {
		  "jlid": "JLRadio",
		  "css":"w03",
		  "options": {"1":"末级","0":"非末级"}
	},
	"impress" : {
		"jlid": "JLInput",
		"css": "w09",
		"placeholder": "英文逗号隔开"
	},
	"jlbh" : {
		"jlid": "JLInput",
		"css": "w09",
		"format": {
		}
	}
}); 

SPFL.setAfterInit(function() {
	var resultData=transport.select(pubJson.getURL("ResourceUrl")+"/shopJL/baseData", "W_SPFL.json", {});
	SPFL.getPluginObj("spfl").setData(resultData);  
});