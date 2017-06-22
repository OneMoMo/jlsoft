var FLSX = new JLForm(); 

FLSX.rowIndex = null;

FLSX.setPlugin({
	"toolbar":{
		"jlid":"JLToolBar",
		"buttons":{
			"jlSaveCard":{
				"name": "保存",
				"icon":"",
				"css":"jl_btn btn_color",
				"sBillName":"FLSX",
				"before":function(){
					FLSX.readData();
					var data = FLSX.getData();
					if(data.SX.length > 0){
						if(!JL.isNull(FLSX.rowIndex)){
							if(FLSX.rowIndex >= 0){
								data.SX[FLSX.rowIndex].item = data.SXZ; 
							}
						}else{
							data.SX[0].item = data.SXZ; 
						}
					}
					data.item = data.SX;
					delete data.SX;
					delete data.SXZ;
					if(!JL.isNull(data.jlbh) && data.jlbh*1 > 0){
						data.jlbh = data.jlbh*1;
						this.sOperateName = "update.do";
						var XmlData = {};
						XmlData["query"] = {
								"jlbh": data.jlbh
						};
						XmlData["doc"] = data;
						FLSX.data = XmlData;
					}else{
						this.sOperateName = "insert.do";
						FLSX.data = data;
					}
				}
			}
		}
	},
	"spfl" : {
		"jlid" : "JLSelectMenuTree",
		"sBillName": pubJson.getURL("ResourceUrl")+"/shopJL/baseData",
		"sOperateName": "W_SPFL.json",
		"dataStructure": "alllist",
		"listener": {
			"click": function(data){
				FLSX.rowIndex = null;
				FLSX.getPluginObj("SX").removeAll();
				FLSX.getPluginObj("SXZ").removeAll();
				
				var XmlData = {};
				XmlData["collection"] = "W_FLSX";
				XmlData["query"] = {
					"spfl.key": data.key	
				};
				
				var ajaxJson = {}; 
				ajaxJson["src"] = "form/find.do?rid="+rid;
				ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
				
				var resultData = JL.ajax(ajaxJson);
				resultData = resultData.data.returnList;
				if(resultData.length > 0){
					resultData = resultData[0];
					FLSX.getTab().find("[name='jlbh']").val(resultData.jlbh);
					FLSX.getPluginObj("SX").setData(resultData.item);
					if(!JL.isNull(resultData.item[0])){
						FLSX.getPluginObj("SXZ").setData(resultData.item[0].item);
					}
				}
			}
		}
	},
	"SX" : {
	    "jlid": "JLGrid",
	    "tittles": "定义属性",
	    "headers": [ 
	        {
	        	"id": "name",
	        	"name": "属性",
	        	"width": 150,
	        	"editor": {"type":"text","disabled":false}
	        },
	        {
	            "id": "xsbj",
	            "name": "显示状态", 
	            "width": 100,
	            "editor": {"type":"select","options":{"1":"显示","0":"隐藏"},"default":"0","disabled":false}
	        },
	        {
	            "id": "btbj",
	            "name": "必填项", 
	            "width": 100,
	            "editor": {"type":"select","options":{"1":"是","0":"否"},"default":"0","disabled":false}
	        }, 
	        {
	            "id": "jgbj",
	            "name": "影响价格", 
	            "width": 100,
	            "editor": {"type":"select","options":{"1":"是","0":"否"},"default":"0","disabled":false}
	        }, 
	        {
	            "id": "tpbj",
	            "name": "上传图片", 
	            "width": 100,
	            "editor": {"type":"select","options":{"1":"是","0":"否"},"default":"0","disabled":false}
	        }, 
	        {
	            "id": "item",
	            "name": "上传图片", 
	            "hidden": true, 
	            "width": 100
	        }
	    ],
	    "buttons": [1,2],
	    "listener": {
	    	"new": function(thisPlugin){
	    		var data = thisPlugin.getData();
	    		console.info(FLSX.getPluginObj("SX").getDL(data.length-1));
	    		FLSX.getPluginObj("SX").getDL(data.length-1).click();
	    	},
	    	"delete": function(thisPlugin){
	    		FLSX.getPluginObj("SXZ").removeAll();
	    		FLSX.rowIndex = -1;
	    	},
	    	"rowclick": function(thisPlugin,data,rowIndex,d){
	    		var SXZ = FLSX.getPluginObj("SXZ");
	    		
	    		if(!JL.isNull(FLSX.rowIndex) && FLSX.rowIndex > -1){
	    			thisPlugin.setCell(SXZ.getData(), FLSX.rowIndex, 5);
	    		}
	    		SXZ.removeAll();
	    		if(!JL.isNull(data.item)){
	    			SXZ.setData(data.item);
	    		}	
	    		FLSX.rowIndex = rowIndex;
	    	}
	    }
	},
	"SXZ" : {
	    "jlid": "JLGrid",
	    "headers": [ 
	        {
	        	"id": "name",
	        	"name": "属性值",
	        	"width": 150,
	        	"editor": {"type":"text","disabled":false}
	        }
	    ],
	    "buttons": [1,2],
	    "listener": {}
	}
});


//初始化按钮
FLSX.setBtnParam({
	/*"jlSave":{
		"sBillName":"FLSX",
		"before":function(){
			FLSX.readData();
			var data = FLSX.getData();
			if(data.SX.length > 0){
				if(!JL.isNull(FLSX.rowIndex)){
					if(FLSX.rowIndex >= 0){
						data.SX[FLSX.rowIndex].item = data.SXZ; 
					}
				}else{
					data.SX[0].item = data.SXZ; 
				}
			}
			data.item = data.SX;
			delete data.SX;
			delete data.SXZ;
			if(!JL.isNull(data.jlbh) && data.jlbh*1 > 0){
				data.jlbh = data.jlbh*1;
				this.sOperateName = "update.do";
				var XmlData = {};
				XmlData["query"] = {
						"jlbh": data.jlbh
				};
				XmlData["doc"] = data;
				FLSX.data = XmlData;
			}else{
				this.sOperateName = "insert.do";
				FLSX.data = data;
			}
		}
	}*/
});
