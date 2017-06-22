var FLPP = new JLForm();
var transport = new JLTransport();
var sOperateName;
var jlbh;
FLPP.setPlugin({
	"toolbar":{
		"jlid":"JLToolBar",
		"buttons":{
			"jlSaveCard":{
				"name": "保存",
				"css":"jl_btn btn_color",
				"icon":"",
				"sBillName":"FLPP",
				"sOperateName":"insertBatch.do", 
				"before":function(){ 
					
					var data =[];	
					var json = {};
					var spfldata = FLPP.getPluginObj("JLShowfl").getData();
					var datas = FLPP.getPluginObj("DYPP_BAND").getData();
					var ppdatas = [];
					for (var i=0;i<datas.length;i++){
						var ppdata = {};
						ppdata["key"] = datas[i].key;
						ppdata["value"] = datas[i].value;
						ppdatas.push(ppdata);
					}
					json["spfl"] = {"key":spfldata.key,"value":spfldata.value};
					json.ppList = ppdatas;
					data.push(json);   
					FLPP.setData({"doc":data});
				}
			}
		}
	},
	"toolbar2":{
		"jlid":"JLToolBar",
		"buttons":{
			"jlSaveCard":{
				"css":"jl_btn btn_color",
				"name":"修改",
				"icon":"",
				"sBillName":"FLPP",
				"sOperateName":"updateBatch.do",
				"before":function(){
					
					console.info('update');
					var data =[];	
					var json = {};
					var spfldata = FLPP.getPluginObj("JLShowfl").getData();
					var datas = FLPP.getPluginObj("DYPP_BAND").getData();
					var ppdatas = [];
					console.info(datas);
					for (var i=0;i<datas.length;i++){
						var ppdata = {};
						ppdata["key"] = datas[i].key;
						ppdata["value"] = datas[i].value;
						ppdatas.push(ppdata);
						console.info(ppdatas);
					}
					json["spfl"] = {"key":spfldata.key,"value":spfldata.value};
					json.ppList = ppdatas;
					json.jlbh = jlbh;
					data.push(json);
					FLPP.setData({"doc":data});
					//FLPP.jlSave(FLPP.getTab().find("#update"),{"sBillName":"FLPP","sOperateName":"updateBatch.do"});
				}
			}
		}
	},
	"JLShowfl" : {
		"jlid":"JLSelectMenuTree",
		"sBillName": pubJson.getURL("ResourceUrl")+"/shopJL/baseData",
		"sOperateName": "W_SPFL.json",
		"dataStructure": "alllist",
		"listener":{
			"click": function(row){
				FLPP.getPluginObj("DYPP_BAND").init();
				console.info(row);
				FLPP.getPluginObj("DYPP_BAND").removeAllData();		
				FLPP.getPluginObj("DYPP").removeAllData();		
				var ppbJson=transport.select(pubJson.getURL("ResourceUrl")+"/shopJL/baseData", "W_PPB.json", {});
				for (var i=0;i<ppbJson.length;i++){
					FLPP.getPluginObj("DYPP").addData(ppbJson[i]); 
				}
				var insertbj=0;
				var flppJson=transport.select(pubJson.getURL("ResourceUrl")+"/shopJL/baseData", "W_FLPP.json", {});
				for (var i=0;i<flppJson.length;i++){
					if (flppJson[i].spfl.key == row.key){
						jlbh=flppJson[i].jlbh;
						insertbj = 1;
						for (var h=0;h<flppJson[i].ppList.length;h++){ 
							var num = {};
							num["key"] = flppJson[i].ppList[h].key;
							num["value"] = flppJson[i].ppList[h].value;
							num["yxbj"] = '1'; 
								
							FLPP.getPluginObj("DYPP_BAND").addData(num);
							FLPP.getPluginObj("DYPP").removeData(num); 
						} 
					}
				}
				if (insertbj==1){
					FLPP.getTab().find("#d_toolbar").parent().parent().parent().hide();
					FLPP.getTab().find("#d_toolbar2").show();
				}else{
					FLPP.getTab().find("#d_toolbar").parent().parent().parent().show();
					FLPP.getTab().find("#d_toolbar2").hide();
				}
			}
		}
	},
	"DYPP": {
		"jlid": "JLMultiSelect",
		"sBillName": pubJson.getURL("ResourceUrl")+"/shopJL/baseData",
		"sOperateName": "W_PPB.json",
		"placeholder": "输入品牌1名称可查询",  
		"listener":{
			"click": function(row){  
				console.info('输入品牌1名称可查询');
				var insert = 0;
				FLPP.getPluginObj("DYPP_BAND").addData(row);
				FLPP.getPluginObj("DYPP").removeData(row); 
			}
		}
	},
	"DYPP_BAND": {
		"jlid": "JLMultiSelect", 
		"sBillName": "",
		"sOperateName": "",
		"placeholder": "输入品牌2名称可查询",  
		"listener":{
			"click": function(row){   
				console.info('输入品牌2名称可查询');
				var insert = 0;
				FLPP.getPluginObj("DYPP").addData(row); 
				FLPP.getPluginObj("DYPP_BAND").removeData(row);  
			}
		}
	}
});
 
FLPP.setBtnParam({ 
	/*"jlSave":{
		"sBillName":"FLPP",
		"sOperateName":"insertBatch.do", 
		"before":function(){ 
			console.info('jlSave');
			var data =[];	
			var json = {};
			var spfldata = FLPP.getPluginObj("JLShowfl").getData();
			var datas = FLPP.getPluginObj("DYPP_BAND").getData();
			var ppdatas = [];
			for (var i=0;i<datas.length;i++){
				var ppdata = {};
				ppdata["key"] = datas[i].key;
				ppdata["value"] = datas[i].value;
				ppdatas.push(ppdata);
			}
			json["spfl"] = {"key":spfldata.key,"value":spfldata.value};
			json.ppList = ppdatas;
			data.push(json);   
			FLPP.setData({"doc":data});
		}
	}*/
});
FLPP.setAfterInit(function() {
	FLPP.getTab().find("#d_toolbar2").hide();
//	FLPP.getTab().find(".jl_btn.btn_color").parent().append(FLPP.getTab().find(".jl_btn.btn_color.ml10"));
});

//初始化按钮
FLPP.addButton({
	/*"update":{
		"name":"修改",
		"button":function(){
			console.info('update');
			var data =[];	
			var json = {};
			var spfldata = FLPP.getPluginObj("JLShowfl").getData();
			var datas = FLPP.getPluginObj("DYPP_BAND").getData();
			var ppdatas = [];
			console.info(datas);
			for (var i=0;i<datas.length;i++){
				var ppdata = {};
				ppdata["key"] = datas[i].key;
				ppdata["value"] = datas[i].value;
				ppdatas.push(ppdata);
				console.info(ppdatas);
			}
			json["spfl"] = {"key":spfldata.key,"value":spfldata.value};
			json.ppList = ppdatas;
			json.jlbh = jlbh;
			data.push(json);
			FLPP.setData({"doc":data});
			FLPP.jlSave(FLPP.getTab().find("#update"),{"sBillName":"FLPP","sOperateName":"updateBatch.do"});
		}
	}*/
});

