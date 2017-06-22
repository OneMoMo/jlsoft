var pageData = new JLForm();
pageData.setPlugin({
	"toolbar":{
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewForm":{
				"icon":""
			},
			"jlSaveCard":{
				"name": "保存",
				"icon": "",
				"sBillName":"PageData",
				"sOperateName":"insertBatch.do",
				"before": function(){
					var array = [];
					var xxData = pageData.getPluginObj("XX").getData();
					for(var i=0;i<xxData.length;i++){
						xxData[i].type = "XX"; 
					}
					var spData = pageData.getPluginObj("SP").getData();
					for(var i=0;i<spData.length;i++){
						spData[i].type = "SP"; 
					}
					$.merge(array, xxData);
					$.merge(array, spData);
					pageData.setData({"doc":array});
				}
			}
		}
	},
	"PAGE" : {
		"jlid": "JLSelect",
		"readonly": true,
		"sBillName": "form",
		"sOperateName": "getOption.do",
		"param": {
			"collection": "page",
			"keys": "ymid,ymmc",
			"query":{"shopId":(function(){
				var zcxx01 = userInfo.resourceId;
				return zcxx01;
			})()},
		},
		"listener": {
			"change": function(data){
				var XmlData = {};
				XmlData["collection"] = "page";
				XmlData["query"] = {
					"shopId":userInfo.resourceId,
					"ymid": data.key
				};
				var transport = new JLTransport();
				var result = transport.select("form", "find.do", XmlData);
				if(!JL.isNull(result[0].XX)){
					pageData.getPluginObj("XX").setData(result[0].XX);
				}
				if(!JL.isNull(result[0].SP)){
					pageData.getPluginObj("SP").setData(result[0].SP);
				}
			}
		}
	},
	"TDLX" : {
		"jlid": "JLSelect",
		//"jlid": "JLSelect_Mobile",
		"readonly": true,
		"options": {
			"SP": "商品",
			"XX": "信息"
		},
		"listener": {
			"change": function(data){
				pageData.getTab().find("[ycbj]").hide();
				pageData.getTab().find("#d_"+data.key).show();
				
				if(data.key == "XX"){
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl")+"/trust/o2o/pageDataInterface/findXXZCXX01.do";
					var resultData = JL.ajax(ajaxJson);
					pageData.getTab().find("[name='zcxx01']").val(resultData.data.zcxx01);
				}else if(data.key == "SP"){
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl")+"/trust/o2o/pageDataInterface/findZCXX01.do";
					var resultData = JL.ajax(ajaxJson);
					if(resultData.data.mainMark=="2"){
						var jsonData ={};
						var zcxx01= JSON.stringify(jsonData);
						pageData.getTab().find("[name='zcxx01']").val(zcxx01);
					}else{
						var json ={};
						var jsonData ={};
						json["$in"]=resultData.data.zcxx01;
						jsonData["zcxx01.key"]=json;
						var zcxx01= JSON.stringify(jsonData);
						pageData.getTab().find("[name='zcxx01']").val(zcxx01);
					}
					
				}
			}
		}
	},
	"XX" : {
		"jlid": "JLLayoutGrid",
		"multi": false,
		"style":"jl_list_01",
		"rowclass": "pl10",
		"title": [
            {"id":"DD", "name":"选择信息", "width":"w01"},
			{"id":"AA", "name":"投递位置", "width":"w02"},
			{"id":"BB", "name":"标题", "width":"w03"},
			{"id":"CC", "name":"超链接", "width":"w06"}
		],
		"header": [
			{"id":"button", "title":"选择信息", "editor":"i", "css": "fa fa-search", "groupid":"DD", "groupcss":"w01",
				"listener":{
					"click": function(){
						JLQuery.show(pageData, {
							"querybh": 3,
							"sort":{"ts":-1},
							"autoquery": true,
							"update": true,
							"fieldMapping": {
								"title":"XX.title",
								"zy":"XX.zy",
								"url":"XX.url",
								"ts":"XX.ts",
								"image":"XX.image"
							},
							"init": {
								"zcxx01": "zcxx01.key"
							},
							"queryGrid": {
								"jlid": "JLLayoutGrid",
								"height":"50",
								"multi": false,
								"paging":"more",
								"rowclass": "pl10",
								"title": [
								    {"id":"AA", "name":"标题", "width":"w04"},
								    {"id":"BB", "name":"超链接", "width":"w08"}
								],
								"header": [
						            {"id":"title", "title":"标题", "groupid":"AA"},
									{"id":"url", "title":"超链接", "groupid":"BB"}
								]
							}
						});
					}
				}
			},
			{"id":"name", "title":"投递位置", "groupid":"AA", "groupcss":"w02"},
			{"id":"title", "title":"标题", "groupid":"BB", "groupcss":"w03"},
			{"id":"url", "title":"超链接", "editor":"a", "groupid":"CC", "groupcss":"w06"},
			
			{"id":"ckid", "title":"窗口编号", "hidden":true},
			{"id":"ckjs", "title":"窗口js", "hidden":true},
			{"id":"shopId", "title":"店铺id", "hidden":true},
			{"id":"ymid", "title":"页面id", "hidden":true},
			
			{"id":"time", "title":"时间","css": "w12", "groupcss":"w12 more",
				"editor":"JLRangeDate","config":{
				"jlid": "JLRangeDate",
				"float":true,
				"months": 4, //同时展示的日期
				"mode": "range", //选择模式 range范围|multiple多选|week星期
				"direction": "today-future"
			}}
			
		],
		"listener": {
			"loadData": function(){
				var XmlData = {};
				XmlData["collection"] = "W_PageData";
				XmlData["query"] = {
					"type": "XX",
					"date": {"$gte":JL.formatDate(0,1)}
				};
				var transport = new JLTransport();
				var result = transport.select("form", "find.do", XmlData);
				console.info(result);

				var disabledDay = {};
				var addDay = {};
				for (var i = 0; i < result.length; i++) {
					var row = result[i];
					if(JL.isNull(disabledDay[row.ckid])){
						disabledDay[row.ckid] = [];
					}
					/**
					if(JL.isNull(addDay[row.ckid])){
						addDay[row.ckid] = [];
					}
					if(row.tjry == userInfo["PCRM_CZY02"]){
						addDay[row.ckid].push(row.date);
					}else{
						disabledDay[row.ckid].push(row.date);
					}
					**/
					disabledDay[row.ckid].push(row.date);
				}
				
				var data = pageData.getPluginObj("XX").getData();
				var plugin = pageData.getPluginObj("XX").plugin;
				
				for (var i = 0; i < data.length; i++) {
					var row = data[i];
					plugin[i].time.disabledDays(disabledDay[row.ckid]);
					
					/*
					if(!JL.isNull(addDay[row.ckid])){
						var add = addDay[row.ckid].sort();
						var s = add[0];
						var e = add[add.length-1];
						plugin[i].time.addSelected(s,e);
					}
					*/
				}
				
			}
		}
	},
	"SP" : {
		"jlid": "JLLayoutGrid",
		"multi": false,
		"style":"jl_list_01",
		"rowclass": "pl10",
		"title": [
            {"id":"DD", "name":"选择商品", "width":"w01"},
			{"id":"AA", "name":"缩略图", "width":"w01"},
			{"id":"BB", "name":"商品信息", "width":"w10"}
		],
		"header": [
			{"id":"button", "title":"选择商品", "editor":"i", "css": "fa fa-search", "groupid":"DD", "groupcss":"w01",
				"listener":{
					"click": function(){
						JLQuery.show(pageData, {
							"querybh": 1,
							"autoquery": true,
							"sort":{"ts":-1},
							"update": true,
							"init": {
								"zcxx01": "zcxx01.key"
							},
							"fieldMapping": {
								"spfl":"SP.spfl",
								"ppb":"SP.ppb",
								"sptp":"SP.tp",
								"tc":"SP.tc",
								"jlbh":"SP.jlbh",
								"name":"SP.name",
								"zcxx01":"SP.zcxx01"
							},
							"queryGrid": {
								"jlid": "JLLayoutGrid",
								"height":"50",
								"multi": false,
								"paging":"more",
								"rowclass": "pl10",
								"title": [
								    {"id":"AA", "name":"商品信息", "width":"w12"}
								],
								"header": [
						            {"id":"name", "title":"商品名称", "css":"w07", "groupid":"AA", "rowindex":1},
						            {"id":"spfl", "title":"商品分类", "css":"w02", "groupid":"AA", "rowindex":1},
						            {"id":"ppb", "title":"商品品牌", "css":"w02", "groupid":"AA", "rowindex":1},
						            {"id":"tc", "title":"套餐", "css":"w09", "groupid":"AA", "hidden":true}
								]
							},
							"listener":{
								"beforecallback": function(jsonData){
									for (var i = 0; i < jsonData.length; i++) {
										var row = jsonData[i];
										if(row["tc"].length > 0 && row["tc"][0]["uri"].length > 0){
											jsonData[i]["sptp"] = row["tc"][0]["uri"][0]["small"];
										}
									}
								}
							}
						});
					}
				}
			},
			{"id":"tp", "title":"缩略图", "css":"w12", "groupid":"AA", "groupcss":"w01", "editor":"img"},
			{"id":"name", "name":"商品名称", "css":"w02", "groupid":"BB", "rowindex":1, "groupcss":"w10"},
			{"id":"spfl", "name":"商品分类", "groupid":"BB", "rowindex":1},
			{"id":"ppb", "name":"品牌", "groupid":"BB", "rowindex":1},
			{"id":"tc", "title":"套餐", "hidden":true},
			{"id":"jlbh", "title":"jlbh", "hidden":true},
			{"id":"ckid", "title":"窗口编号", "hidden":true},
			{"id":"ckjs", "title":"窗口js", "hidden":true},
			{"id":"shopId", "title":"店铺id", "hidden":true},
			{"id":"ymid", "title":"页面id", "hidden":true},
			{"id":"zcxx01", "title":"页面id", "hidden":true},
			
			{"id":"time", "title":"时间","css": "w12", "groupcss":"w12 more",
				"editor":"JLRangeDate","config":{
				"jlid": "JLRangeDate",
				"float":true,
				"months": 4, //同时展示的日期
				"mode": "range", //选择模式 range范围|multiple多选|week星期
				"direction": "today-future"
			}}
			
		],
		"listener": {
			"loadData": function(){
				var XmlData = {};
				XmlData["collection"] = "W_PageData";
				XmlData["query"] = {
					"type": "XX",
					"date": {"$gte":JL.formatDate(0,1)}
				};
				var transport = new JLTransport();
				var result = transport.select("form", "find.do", XmlData);
				console.info(result);

				var disabledDay = {};
				var addDay = {};
				for (var i = 0; i < result.length; i++) {
					var row = result[i];
					if(JL.isNull(disabledDay[row.ckid])){
						disabledDay[row.ckid] = [];
					}
					/**
					if(JL.isNull(addDay[row.ckid])){
						addDay[row.ckid] = [];
					}
					if(row.tjry == userInfo["PCRM_CZY02"]){
						addDay[row.ckid].push(row.date);
					}else{
						disabledDay[row.ckid].push(row.date);
					}
					**/
					disabledDay[row.ckid].push(row.date);
				}
				
				var data = pageData.getPluginObj("XX").getData();
				var plugin = pageData.getPluginObj("XX").plugin;
				
				for (var i = 0; i < data.length; i++) {
					var row = data[i];
					plugin[i].time.disabledDays(disabledDay[row.ckid]);
					
					/*
					if(!JL.isNull(addDay[row.ckid])){
						var add = addDay[row.ckid].sort();
						var s = add[0];
						var e = add[add.length-1];
						plugin[i].time.addSelected(s,e);
					}
					*/
				}
				
			}
		}
	}
});

pageData.setAfterInit(function() {
	
});