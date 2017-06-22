var makeGCHT = JL.JLForm();

makeGCHT.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewForm":{},
			"jlSaveForm":{
				"success":function(data,tip){
					makeGCHT.getTab().find("input[name='GCHTH01']").val(data.GCHTH01);
					//自定义保存成功提示信息         
					tip.obj.remove();    //清除公共提示信息。
					JL.tip("保存成功【单据号："+data.GCHTH01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
	
					var BZ02=data.BZ02;
					var FHDLD=data.FHDLD.key;
					if(BZ02=="封单"){
						makeGCHT.getTab().find("#jlCancel").hide();
					}
					debugger;
					//var GCLX=$("body").find("[name='GCLX']").val();
					var GCLX = makeGCHT.getPluginObj("GCLX").getData();
					if (FHDLD=="1") {
						$("body i.fa-times-circle:not(:hidden)").click();
						if (GCLX.key=="1") {
							makeGCDLD.getTab().find("#jlSaveForm").hide();
							makeGCDLD.getTab().find("#jlDeleteForm").hide();
						}else{
							makeSYGCDLD.getTab().find("#jlSaveForm").hide();
							makeSYGCDLD.getTab().find("#jlDeleteForm").hide();
						}
					}else if(FHDLD=="0"){
						data["S_VALUE"]="";
						if (GCLX.key=="1") {
							JL.openForm(1042);
							makeGCDLD.setData(data);
							makeGCDLD.getTab().find("input[name='jlbh']").val("");
						}else{
							JL.openForm(1096); 
							makeSYGCDLD.setData(data);
							makeSYGCDLD.getTab().find("input[name='jlbh']").val("");
						}
					}
				}
			},
			"jlDeleteForm":{},
    		"jlCancel" : {}
		}
	},
	"QXCZY01": {
		"jlid": "JLInput",
		"AccessCzy": {
			"QXCZY01": true
		}
	},
	"WLDW01": {
		 "jlid": "JLInput",
		 "AccessCzy": {
			  "WLDW01": true
		 }
	 },
	"XSBM01": {
		"jlid": "JLInput",
		"AccessCzy": {
			"BM01": true
		}
	},
	"DLXH":{
      	"dir" : "scm/gcgl/gcdl/search",
     	"namespace" : "MONGO_GCDLD",
    	"sqlid" : "SCM_GCDLD1",
		"init": {"YHDH":"YHDH","GCDLD01":"GCDLD01"},
		"autoquery": true
	},
	"AZDZ1" : {		
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do"
	},
	"GCLX" : {
		"jlid":"JLSelect",
		"readonly":true,
		"options":{"1":"家用","2":"商用"}
	},
	"GCYT" : {
		"jlid":"JLSelect",
		"options":{"1":"市政机关","2":"医疗卫生","3":"酒店餐饮","4":"金融通讯","5":"交通运输","6":"地产住宅","7":"教育科研","8":"商务办公","9":"商场超市","10":"休闲娱乐","11":"工业生产","12":"文体会馆","13":"沿街商铺","14":"小区","15":"监狱部队","16":"其他"}
	},
	"GCXZ" : {
		"jlid":"JLSelect",
		"default": "1",
		"options":{"1":"正常","2":"特价"}
	},
	 
	"KQBJ" : {
		"jlid": "JLRadio",
		"default": "1",
		"options": {"0":"是","1":"否"}
	},
	"FHDLD" : {
		"jlid": "JLRadio",
		"default": "1",
		"options": {"0":"是","1":"否"}
	},
	"SH" : {
        "jlid": "JLRadio",
		"default": "Y",
		"options": {"Y":"同意","N":"驳回"}
	},

	"YJAZRQ" : {
        "jlid": "JLDate",
        "placeholder" : "请选择日期" ,
        "todayBtn": true ,
        "startDate":JL.formatDate(0,1)
	},
	"YJWGRQ" : {
		"jlid": "JLDate",
		"placeholder" : "请选择日期" ,
		"todayBtn": true ,
		"startDate":JL.formatDate(0,1)
	},
  
	"HTQDRQ" : {
		"jlid": "JLDate",
		"placeholder" : "请选择日期" 
	},

	"HTSCFJ" : {		
		"jlid": "JLUpload",
		"maxsize":15*1024*1024 
	},
	"BCXCTP" : {
	      "jlid": "JLUploadImage",
	      "auto":true
	 },
	"HTXSFS" : {
		"jlid": "JLSelect",  
		"placeholder" : "请选择销售方式",
		"param" : {"XSLX_F":"1,3",
			"RYQX":(function(){
				var RYQX = userInfo.PCRM_CZY02;
				return RYQX;
			})()
		},
  		"sqlid" : "FLFS.FLFSXX",
	    "resource": "scmform",
	    
	},
	
	"SFJL" : {
		"jlid": "JLRadio",
		"default": "0",
		"options": {"0":"是","1":"否"}
	},
	"SPDJ" : {
		"jlid": "JLRadio",
		"default": "0",
		"options": {"0":"一般审批","1":"加急审批"}
	},
	
	"SPLB" : {
         "jlid": "JLGrid",
         "tittles" : "商品列表", 
         "headers": [
			   {"id": "SPDM","name": "商品代码","width": 100,"hidden": true},
			   {"id": "SPMC","name": "商品名称","width": 150,"hidden": true},
			   {"id": "SPXX01","name": "商品内码","width": 100,"hidden": true},
               {"id": "GCSPBM","name": "工程商品编码","width": 100,
				   "editor":{
	            		"type":"text",
						"jlid":"JLQuery",
						"init": {"GSXX01":"GSXX01","GCBJ":"GCBJ"},
						"multi":true,
						"update" : true, // 更新当前行
						"dir":"scm/pub/search",
			             "namespace" : "SPXX",
			             "sqlid" : "GCSP_SPXX",
						"fieldMapping":{
							"SPXX01":"SPLB.SPXX01",
			   		    	 "SPGG":"SPLB.SPGG",
			   		    	 "SPDM":"SPLB.SPDM",
			   		    	 "SPMC":"SPLB.SPMC",
			   		    	 "GCSPMC":"SPLB.GCSPMC",
			   		    	 "GCSPBM":"SPLB.GCSPBM",
			   		    	 "JLDW":"SPLB.JLDW"
						},
						"listener" : {
							 "beforequery" : function(data){
								 debugger;
								 var GCLX=makeGCHT.getPluginObj("GCLX").getData();
					    		 data["GCBJ"]=GCLX.key;
					    		 data["GSXX01"]=makeGCHT.getTab().find("input[name='GSXX01']").val();
				    		 }
				    	}
			   		}
			   },
               {"id": "GCSPMC","name": "工程商品名称","width": 150},
               {"id": "PFSL","name": "合同数量","width": 100,"align":"right", "format":"number|2"},
               {"id": "SQDJ","name": "合同单价","width": 100,"align":"right", "format":"number|2"},
               {"id": "SQJE","name": "合同金额","width": 100,"align":"right","summary": "sum", "format":"number|2"},
               {"id": "SQSL","name": "申请数量","width": 100,"align":"right","hidden": true},
               {"id": "PFDJ","name": "批复单价","width": 100, "format":"number|2"},
               {"id": "PFJE","name": "批复金额","width": 100, "format":"number|2"},
               {"id": "DZ","name": "搭载","width": 80,
            	   "editor":{
	            	   "type":"select",
	            	   "default": "否",
	            	   "options" : {"是":"是","否":"否"},
	            	   "listener" : {
		    			   "change" : function(data){
	    						/*if(data=="否"){
	    							makeGCHT.getPluginObj("SPLB").hideRowById(id, value);
	    							grid.disabledCell("HSJJ", makeGCYHD.getPluginObj("SPLB").getSelectedIndex(), true);
	    							grid.setCell( "" , x, grid.getRowIndexByID("PFDJ"));
	    						}else{
	    							makeGCHT.getPluginObj("SPLB").disabledCell("AZDZ",makeGCYHD.getPluginObj("SPLB").getSelectedIndex(), false);
	    							makeGCHT.getPluginObj("SPLB").disabledCell("LXR",makeGCYHD.getPluginObj("SPLB").getSelectedIndex(), false);
	    							makeGCHT.getPluginObj("SPLB").disabledCell("LXDH",makeGCYHD.getPluginObj("SPLB").getSelectedIndex(), false);
	    							}*/
		    				   if(data=="否"){
		    					   var SPLB = makeGCHT.getPluginObj("SPLB");
	            	   			   SPLB.setCell("", SPLB.getSelectedIndex(), SPLB.getRowIndexByID("AZDZ"));
		    				   }
		    			   }
	    			   }
            	   }
               },
               {"id": "AZDZ","name": "安装地址","width": 200,"align":"right","editor":{
            	   		"type" : "plugin",
            	   		"jlid" : "JLSearch",// 列查询ID，必须参数。此查询id效果为列上点击三个点弹出一个查询框。支持xml配置的自定义查询。
            	   		"hot":"AZDZ",
            	   		"queryConfig":{
            	   			"textid": "AZDZ",
            				"dir": "scm/gcgl/gcdl/search",
            	   			"namespace" : "MONGO_GCDLD",
            	   			"sqlid" : "AZDZLB",
            	   			"update" : true, // 更新当前行
            	   			"init" : {"GCDLD01" : "GCDLD01","GSXX01":"GSXX01"},// 初始化条件
            	   			"fieldMapping" : {
            		   			"AZDZ" : "SPLB.AZDZ",
            		   			"LXR" : "SPLB.LXR",
            		   			"LXDH" : "SPLB.LXDH"
            	   			}
            	   		},
            	   		"listener" : {
            	   			"blur" : function(thisPlugin, data){
            	   				var SPLB = makeGCHT.getPluginObj("SPLB");
            	   				var SPLBData = SPLB.getData();
            	   				var index = SPLB.getSelectedIndex();
            	   				if(SPLBData[index]["DZ"] == "是"){
            	   					thisPlugin.setData(data);
            	   				}
            	   			}
            	   		}
               		}
               	},
               {"id": "LXR","name": "联系人","width": 100,"align":"right"},
			   {"id": "LXDH","name": "联系电话","width": 100,"align":"right"},
			   {"id": "YHSL","name": "要货数量","width": 100,"hidden": true,"align":"right"},
			   {"id": "FXSL","name": "分销数量","width": 100,"hidden": true,"align":"right"},
			   {"id": "DJ","name": "分销单价","width": 100,"align":"right","hidden": true},
			   {"id": "ZZSL","name": "终止数量","width": 100,"hidden": true},
			   {"id": "KKDSL","name": "可开单数量","width": 100,"hidden": true},
			   {"id": "SYBTSL","name": "剩余不提数量","width": 100,"hidden": true},
			   {"id": "BZ","name": "备注","width": 220,"editor":{"type":"text",}},
          ],
          "queryConfig":{
        	  "dir":"scm/pub/search",
             "namespace" : "SPXX",
             "sqlid" : "GCSP_SPXX",
   		     "form":makeGCHT,
   		     "init": {"GSXX01":"GSXX01"},
   		     "multi":true,
   		     "fieldMapping": {
   		    	 "SPXX01":"SPLB.SPXX01",
   		    	 "SPGG":"SPLB.SPGG",
   		    	 "SPDM":"SPLB.SPDM",
   		    	 "SPMC":"SPLB.SPMC",
   		    	 "GCSPMC":"SPLB.GCSPMC",
   		    	 "GCSPBM":"SPLB.GCSPBM",
   		    	 "JLDW":"SPLB.JLDW"
   		     },
            "listener" : {
	 				"aftercallback" : function() {
	 					var SPLB = makeGCHT.getPluginObj("SPLB").getData();
	 					for (var i = 0; i < SPLB.length; i++) {
	 						var YHSL = SPLB[i]["YHSL"] * 1;
	 						var row = makeGCHT.getPluginObj("SPLB").getRowIndexByID("YHSL");
	 						if (isNaN(YHSL)) {
	 							makeGCHT.getPluginObj("SPLB").setCell(0, i, row);
	 						}
	 						var FXSL = SPLB[i]["FXSL"] * 1;
	 						var FXSLrow = makeGCHT.getPluginObj("SPLB").getRowIndexByID("FXSL");
	 						if (isNaN(FXSL)) {
	 							makeGCHT.getPluginObj("SPLB").setCell(0, i, FXSLrow);
	 						}
	 						var ZZSL = SPLB[i]["ZZSL"] * 1;
	 						var ZZSLrow = makeGCHT.getPluginObj("SPLB").getRowIndexByID("ZZSL");
	 						if (isNaN(ZZSL)) {
	 							makeGCHT.getPluginObj("SPLB").setCell(0, i, ZZSLrow);
	 						}
	 					}
	 				},
	 				"beforequery":function(data,tip){
	 					data["GCBJ"]=makeGCHT.getPluginObj("GCLX").getData().key;
	 				}
	 	       }
   		},     
   		"summary" : {"PFJE":"sum","PFSL":"sum","SQSL":"sum"},
	    "buttons" : [0,2],
	    "listener" : {
	    	"loadData" : function(plugin){
	    		/*var SPLBTEMP = makeGCHT.getPluginObj("SPLBTEMP");
	    		if(SPLBTEMP.getData().length == 0){
	    			SPLBTEMP.setData(plugin.getData());
	    		}*/
	    	}
	    }
	},
	
	"SPLBTEMP" : {
	    "jlid": "JLGrid",
	    "tittles" : "修改前商品列表", 
	    "buttons" : [0,2],
	    "headers": [
	          {"id": "GCSPBM","name":"工程商品编码","width": 100},
	          {"id": "GCSPMC","name": "工程商品名称","width": 150},
	          {"id": "PFSL","name": "合同数量","width": 100},
              {"id": "SQDJ","name": "合同单价","width": 100},
              {"id": "DZ","name": "搭载","width": 100},
              {"id": "AZDZ","name": "安装地址","width": 200},
              {"id": "LXR","name": "联系人","width": 100},
			  {"id": "LXDH","name": "联系电话","width": 100},
			  {"id": "WBTDH","name": "外部提单号","width": 100}
	    ]
	}
});

makeGCHT.setAfterInit(function(){
	makeGCHT.getTab().find("#fhdld").hide();
	if(makeGCHT.workflow.bz01=='90921'&&!JL.isNull(makeGCHT.sk01)){
//		 makeGCHT.getPluginObj("FHDLD").hide();
		 makeGCHT.getTab().find("#fhdld").show();
	}	debugger;
	var config = JL.getJLconf({"DJLX":"makeGCHT"});
	var configData = config.data.linkedCaseInsensitiveMapList;
	for(var i = 0; i < configData.length;i++){
		debugger;
		//通过参数控制是否奖励
		if(configData[i].JLCO08 == "SFJL"){
			if(configData[i].JLCO04 == "0"){
				debugger;
				 makeGCHT.getTab().find("#sfjl").show();
			}else if(configData[i].JLCO04 == "2"){
				 makeGCHT.getTab().find("#sfjl").hide();
			}
		}
		//通过参数控制审批等级
		if(configData[i].JLCO08 == "SPDJ"){
			if(configData[i].JLCO04 == "0"){
				debugger;
				 makeGCHT.getTab().find("#spdj").show();
			}else if(configData[i].JLCO04 == "2"){
				 makeGCHT.getTab().find("#spdj").hide();
			}
		}
		//通过参数控制审批等级
		if(configData[i].JLCO08 == "GCXZ"){
			if(configData[i].JLCO04 == "0"){
				debugger;
				makeGCHT.getTab().find("li[name='li_gcxz']").show();
			}else if(configData[i].JLCO04 == "2"){
				makeGCHT.getTab().find("li[name='li_gcxz']").hide();
			}
		}
		
	}
//预计完成日期
	var config = JL.getJLconf({"DJLX":"GCHT"});
	var configData = config.data.linkedCaseInsensitiveMapList;
	if(configData[0].JLCO08 == "YJWGRQ"){
		if(configData[0].JLCO04 == "0"){
			makeGCHT.getTab().find("li[name='li_YJWGRQ']").show();
		}
	}
	
	 makeGCHT.getTab().find("input[name='ZDR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCHT.getTab().find("input[name='ZDRDM']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeGCHT.getTab().find("input[name='HTSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCHT.getTab().find("input[name='SHR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCHT.getTab().find("input[name='SHSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCHT.getTab().find("input[name='BM01']:not(:disabled)").val(userInfo["PCRM_BM01"]);
	 makeGCHT.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeGCHT.getPluginObj("GCLX").disabled();
	 if (makeGCHT.getPluginObj("QXCZY01").getData().length<=0){
		 makeGCHT.getPluginObj("QXCZY01").setData(userInfo["PCRM_CZY02"]);
	 }
	 
	 if (makeGCHT.getTab().find("input[name='ZDR']").is(":not(:disabled)")) {
		 makeGCHT.getTab().find(".step2").hide();
		 makeGCHT.getTab().find("#jlDeleteForm").hide();
		 if (makeGCHT.getPluginObj("SH").getData().value=="驳回") {
			 makeGCHT.getTab().find(".step2").show();
		 }else{
			 var SPLB = makeGCHT.getPluginObj("SPLB");
			 var SPLBData = SPLB.getData();
			 for(var i=0; i<SPLBData.length; i++){
				 SPLB.setCell(SPLBData[i]["SQSL"], i, SPLB.getRowIndexByID("PFSL"));
			 } 
		 }
	 }
	 JSPFJE();
	 if (makeGCHT.getTab().find("input[name='SHR']").is(":not(:disabled)")) {
		 makeGCHT.getTab().find("#jlNewForm").hide();
		 makeGCHT.getPluginObj("SH").setData({"key":"Y","value":"同意"});
	 }
	 if(makeGCHT.pid){
		 makeGCHT.getTab().find("#jlNewForm").hide();
	 }
	 
	 
	makeGCHT.getPluginObj("SPLB").setAfterEdit(function(grid, id, x, y, old, edit){
		var datas = grid.getData();
		var PFDJ = datas[x]["PFDJ"] * 1;
		var PFSL = datas[x]["PFSL"] * 1;
		var SQSL = datas[x]["SQSL"] * 1;
		var SQDJ = datas[x]["SQDJ"] * 1;
		var DZ   = datas[x]["DZ"];
		var GCSPMC= datas[x]["GCSPMC"];
		if(id=="PFDJ"){
			if(edit*1<=0||isNaN(edit*1)){
				JL.tip("批复单价必须大于0,且必须为数字");
				grid.setCell( "" , x, grid.getRowIndexByID("PFDJ"));
				grid.setCell( "" , x, grid.getRowIndexByID("PFJE"));
				return false;
			}
			if(PFSL){
				var PFJE = (PFDJ * PFSL)*1 ;//计算方式
				grid.setCell(PFDJ, x, grid.getRowIndexByID("PFDJ"));
				grid.setCell(PFJE, x, grid.getRowIndexByID("PFJE"));//赋值
				grid.setCell(0, x, grid.getRowIndexByID("SYBTSL"));
			}
		}
		if(id=="PFSL"){
			debugger;
			if(isNaN(edit) || edit*1<=0){
				JL.tip("合同数量必须为数字,且大于0");
				grid.setCell("", x, grid.getRowIndexByID("PFSL"));
				grid.setCell("", x, grid.getRowIndexByID("KKDSL"));
				grid.setCell( "" , x, grid.getRowIndexByID("PFJE"));
				grid.setCell( "" , x, grid.getRowIndexByID("SQJE"));
				return false;
			}
		
			if(PFDJ){
				var PFJE = (PFDJ * PFSL)*1 ;//计算方式
				grid.setCell(PFJE, x, grid.getRowIndexByID("PFJE"));//赋值
			}
			grid.setCell(PFSL, x, grid.getRowIndexByID("KKDSL"));//赋值
			grid.setCell(0, x, grid.getRowIndexByID("SYBTSL"));
			grid.setCell(0, x, grid.getRowIndexByID("SQSL"));
			if (SQDJ) {
				grid.setCell(PFSL*SQDJ, x, grid.getRowIndexByID("SQJE"));
			}
		}
		if(id=="SQDJ"){
			if(isNaN(edit) || edit*1<=0){
				JL.tip("合同单价必须为数字,且大于0");
				grid.setCell("", x, grid.getRowIndexByID("SQDJ"));
				grid.setCell("", x, grid.getRowIndexByID("SQJE"));
				return false;
			}
			if(SQDJ){
				grid.setCell(SQDJ, x, grid.getRowIndexByID("SQDJ"));//赋值
			}
			if(PFSL){
				grid.setCell( PFSL*SQDJ, x, grid.getRowIndexByID("SQJE"));
			}
		}
	});
	
	var SPLBTEMP = makeGCHT.getPluginObj("SPLBTEMP");

	if(SPLBTEMP.getData().length == 0){
		var data = makeGCHT.getPluginObj("SPLB").getData();
		var a = [];
		for(var i=0; i<data.length; i++){
			var b = {};
			b["GCSPBM"] = data[i]["GCSPBM"];
			b["GCSPMC"] = data[i]["GCSPMC"];
			b["PFSL"] = data[i]["PFSL"];
			b["SQDJ"] = data[i]["SQDJ"];
			b["WBTDH"] = data[i]["WBTDH"];
			a.push(b);
		}
		SPLBTEMP.setData(a);
	}
});

makeGCHT.setEvent([{
	"selector" : "[name='SYDW']",
	"event" : "change",
	"func" : function() {
		var SYDW = makeGCHT.getTab().find("input[name='SYDW']:not(:disabled)").val();
		makeGCHT.getTab().find("input[name='GMDW']:not(:disabled)").val(SYDW);
	}
}
]);

//加载页面时 查询登陆人的信息 (SCM_JXSZC)
function makeQuerry() {
	//alert(userInfo["PCRM_CZY02"]);
	var queryField={"DLZH":userInfo["PCRM_CZY02"]};
	var resultData = makeGCHT.getSqlResult(queryField, "JXSJB", "CZY", "scm/pub/search");
	//alert(resultData.data.length);
	if(resultData.data.length!=0){
		if(resultData.data[0]["JXSJB"]==2){//二级经销商
			var resultData01 = makeGCHT.getSqlResult(queryField, "MONGO_JXSZC", "SCM_JXSZC", "scm/gcgl/gcdl/search");
			//alert(resultData01.data[0]["DLZH"]);	
			console.info(resultData01.data);
			var JXSMC = resultData01.data[0]["KHMC"];
			var JXSDH = resultData01.data[0]["LXDH"];
			var EJJSXMC = resultData01.data[0]["ERJXSGSQC"];
			var EJJSXDH = resultData01.data[0]["YDDH"];
			makeGCHT.getTab().find("input[name='JXSMC']:not(:disabled)").val(JXSMC);
			makeGCHT.getTab().find("input[name='JXSDH']:not(:disabled)").val(JXSDH);
			makeGCHT.getTab().find("input[name='EJJSXMC']:not(:disabled)").val(EJJSXMC);
			makeGCHT.getTab().find("input[name='EJJSXDH']:not(:disabled)").val(EJJSXDH);
		}
		if(resultData.data[0]["JXSJB"]==1){//一级经销商
			var queryField02={};
			var resultData02 = makeGCHT.getSqlResult(queryField02, "WLDW", "KH_ALL", "scm/pub/search");	
				var JXSMC = resultData02.data[0]["WLDWMC"];
				var JXSDH = resultData02.data[0]["LXDH"];
				makeGCHT.getTab().find("input[name='JXSMC']:not(:disabled)").val(JXSMC);
				makeGCHT.getTab().find("input[name='JXSDH']:not(:disabled)").val(JXSDH);
				makeGCHT.getTab().find("li[id='ejjsxmc']").hide();
				makeGCHT.getTab().find("li[id='ejjsxdh']").hide();
				makeGCHT.getTab().find("li[id='kong']").hide(); 
		}
	}else{
		makeGCHT.getTab().find("li[id='ejjsxmc']").hide();
		makeGCHT.getTab().find("li[id='ejjsxdh']").hide();
		makeGCHT.getTab().find("li[id='kong']").hide(); 
	}
}

function JSPFJE() {//计算依据填写了批复单价的商品的批复金额
	debugger;
	var data=makeGCHT.getPluginObj("SPLB").getData();
	if (data.length == 0) {
	} else {
		for (var i = 0; i < data.length; i++){
			var PFDJ = data[i]["PFDJ"]*1;
			var PFSL = data[i]["PFSL"]*1;
			if(PFDJ>0&&PFSL){
				makeGCHT.getPluginObj("SPLB").setCell(PFDJ*PFSL,i,10);
			}
		}
	}
}


