var FXD_SPJGB_FXD = {
  "title" : "查找分销单商品",
  "page" : "scm/fxgl/fxd/search/FXD_SPMC.html",
 // "DataBaseType" : "scmform",
 // "interfaceId": "jl.scm.fxgl.fxd.GetSPJG.getSPJG", //接口id
  "interfaceId": "jl.scm.fxgl.fxd.GetSPJG_FXD.getSPJG",
  "result" : [
    {"id" : "BJ",   "name" : "BJ", "width" : 100,"hidden" : true},
    {"id" : "GSXX01", "name" : "公司信息",     "width" : 1,    "hidden" : true},
    {"id" : "SPXX01", "name" : "商品内码",     "width" : 1,    "hidden" : true},
    {"id" : "SPPP",   "name" : "商品品牌", "width" : 100},
    {"id" : "SPBM",   "name" : "商品编码",     "width" : 100},
    {"id" : "SPMC",   "name" : "商品名称",     "width" : 100},
    {"id" : "CKMC",   "name" : "仓库名称",     "width" : 200},
    {"id" : "KMS",    "name" : "可卖数",       "width" : 100},
    {"id" : "FMBJ",    "name" : "负卖标记",       "width" : 100},
    {"id" : "FXDJ",   "name" : "单价",         "width" : 100},
    {"id" : "BMMC",   "name" : "采购部门", "width" : 130},
    {"id" : "SPGG",   "name" : "规格",         "width" : 100},
    {"id" : "JLDW",   "name" : "单位",         "width" : 100},
    {"id" : "KHBZJG",   "name" : "标准价",         "width" : 100},
    {"id" : "FXDJ1",   "name" : "优惠单价",         "width" : 100,"hidden": true},
    {"id" : "YSSL",   "name" : "预售数量",         "width" : 100,"hidden": true},
    {"id" : "FXXJ",   "name" : "分销限价",         "width" : 100,"hidden": true},
    {"id" : "FXXJ1",   "name" : "分销限价",         "width" : 100,"hidden": true},
    {"id" : "KMS1",    "name" : "可优惠数量",       "width" : 100,"hidden" : true},
    {"id" : "FMBJ01",   "name" : "负卖标记代码", "width" : 1,    "hidden" : true},
    {"id" : "HZFS",   "name" : "合作方式", "width" : 100,"hidden" : true},
    {"id" : "SPSX",   "name" : "商品属性编号", "width" : 1,"hidden" : true},
    {"id" : "CGXY02", "name" : "商品属性",     "width" : 100},
    {"id" : "WLDWMC",  "name" : "供应商",   "width" : 300},
    {"id" : "BM01",   "name" : "采购部门代码", "width" : 1,    "hidden" : true},
    {"id" : "CK01",   "name" : "仓库编码",     "width" : 100, "hidden" : true},
    {"id" : "JGLX",   "name" : "促销信息",     "width" : 100},
    {"id" : "TJ",   "name" : "体积",     "width" : 100},
    {"id" : "JGLX1",   "name" : "用于存储接口查询返回的促销信息",    "width" : 100,"hidden": true},
    {"id": "GYS01","name": "供应商代码","width": 60,"hidden": true},
    {"id": "KH01","name": "客户代码","width": 60,"hidden": true},
    {"id": "XSBM01","name": "销售部门","width": 60,"hidden": true},
    {"id": "XSFS","name": "销售方式","width": 60,"hidden": true},
    {"id": "YHDH","name": "优惠单号","width": 60,"hidden": true},
    {"id": "YHDH1","name": "优惠单号","width": 60,"hidden": true},
    {"id": "YHLYKL","name": "优惠联营扣率","width": 60,"hidden": true}
  ],
  "listener" : {
	"loadRow" : function(thisPlugin, data, index, dl){
		/*if("优惠" == data.JGLX){
				dl.addClass("font_green");
		}*/
		},
		"rowclick" : function(thisPlugin, data, rowIndex, dl){
			/*data["YHBJ"] = "1";
			data["DJLX"] = "8";
			var ajaxJson = {};
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Inbound/dispatch.do?rid="+Math.random();
			ajaxJson["data"] = {"interfaceId":"jl.scm.fxgl.fxd.GetSPJG.getSPJG", "data":JSON.stringify(data)};
			var resultData = JL.ajax(ajaxJson);
			console.info(resultData); 
			if(resultData.length >0){
				if(!JL.isNull(resultData[0]["SPXX01"]))
				{
					$("#LSSYT_SPXX").show();
					var ZKSP = data.SPBM + " - " + data.SPMC;
					$("#LSSYT_SPXX [name=ZKSP]").html(ZKSP);
					$("#LSSYT_SPXX [name=YHDJ]").html(resultData[0]["FXDJ"]);
					$("#LSSYT_SPXX [name=YHSL]").html(resultData[0]["KMS"]);
					thisPlugin.setCell(resultData[0]["FXDJ"], rowIndex, thisPlugin.getRowIndexByID("FXDJ1"));
					thisPlugin.setCell(resultData[0]["FXXJ"], rowIndex, thisPlugin.getRowIndexByID("FXXJ1"));
					thisPlugin.setCell(resultData[0]["KMS"], rowIndex, thisPlugin.getRowIndexByID("KMS1"));
					thisPlugin.setCell(resultData[0]["YHDH"], rowIndex, thisPlugin.getRowIndexByID("YHDH1"));
					thisPlugin.setCell(resultData[0]["YHLYKL"], rowIndex, thisPlugin.getRowIndexByID("YHLYKL"));
					thisPlugin.setCell(resultData[0]["JGLX"], rowIndex, thisPlugin.getRowIndexByID("JGLX1"));
				}
			}
			else{
				$("#LSSYT_SPXX [name=ZKSP]").html("&nbsp;");
				$("#LSSYT_SPXX [name=YHDJ]").html("&nbsp;");
				$("#LSSYT_SPXX [name=YHSL]").html("&nbsp;");
				$("#LSSYT_SPXX").hide();
				//thisPlugin.setCell(resultData[0]["WLDW01"], rowIndex, thisPlugin.getRowIndexByID("WLDW01"));
			}*/
			
		},
		"checked":function(thisPlugin, rowIndex, bool){
			var checkbox = thisPlugin.getDL(rowIndex).find("> dt > :checkbox");
			if(checkbox.is(":checked")){
				debugger;
				var data=thisPlugin.getData(rowIndex);
				data["YHBJ"] = "1";
				data["DJLX"] = "8";
				data["SPYH"] = true;
				data["WLDWDM"]=data["GYS01"];
				data["WLDW01"]=data["KH01"];
				data["GSXX01"]=userInfo["PCRM_GSXX01"];
				var ajaxJson = {};
				ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Inbound/dispatch.do?rid="+Math.random();
				ajaxJson["data"] = {"interfaceId":"jl.scm.fxgl.fxd.GetSPJG.getSPJG", "data":JSON.stringify(data)};
				var resultData =[];
				//if(data["JGLX"]=="普通" )
				//{
				resultData = JL.ajax(ajaxJson);
				//}
				console.info(resultData); 
				if(resultData.length >0){
					if(!JL.isNull(resultData[0]["SPXX01"]))
					{
						$("#LSSYT_SPXX").show();
						var ZKSP = data.SPBM + " - " + data.SPMC;
						$("#LSSYT_SPXX [name=ZKSP]").html(ZKSP);
						$("#LSSYT_SPXX [name=YHDJ]").html(resultData[0]["FXDJ"]);
						$("#LSSYT_SPXX [name=YHSL]").html(resultData[0]["KMS"]);
						thisPlugin.setCell(resultData[0]["FXDJ"], rowIndex, thisPlugin.getRowIndexByID("FXDJ1"));
						thisPlugin.setCell(resultData[0]["FXXJ"], rowIndex, thisPlugin.getRowIndexByID("FXXJ1"));
						thisPlugin.setCell(resultData[0]["KMS"], rowIndex, thisPlugin.getRowIndexByID("KMS1"));
						thisPlugin.setCell(resultData[0]["YHDH"], rowIndex, thisPlugin.getRowIndexByID("YHDH1"));
						thisPlugin.setCell(resultData[0]["YHLYKL"], rowIndex, thisPlugin.getRowIndexByID("YHLYKL"));
						thisPlugin.setCell(resultData[0]["JGLX"], rowIndex, thisPlugin.getRowIndexByID("JGLX1"));
					}
				}
				else{
					$("#LSSYT_SPXX [name=ZKSP]").html("&nbsp;");
					$("#LSSYT_SPXX [name=YHDJ]").html("&nbsp;");
					$("#LSSYT_SPXX [name=YHSL]").html("&nbsp;");
					$("#LSSYT_SPXX").hide();
					//thisPlugin.setCell(resultData[0]["WLDW01"], rowIndex, thisPlugin.getRowIndexByID("WLDW01"));
				}
				var rows =thisPlugin.getSelectedIndex();
				/*var Data=thisPlugin.getData(rowIndex);
				if(Data["JGLX1"]=="商品优惠单")
				{
					thisPlugin.checkedCurrent(rowIndex);
				}*/
			}
			else
			{
				$("#LSSYT_SPXX [name=ZKSP]").html("&nbsp;");
				$("#LSSYT_SPXX [name=YHDJ]").html("&nbsp;");
				$("#LSSYT_SPXX [name=YHSL]").html("&nbsp;");
				$("#LSSYT_SPXX").hide();
			}
			var checkbox = thisPlugin.getDL(rowIndex).find("> dt > :checkbox");
			if(checkbox.is(":checked")){
				var falg=0;
				for(var i=0;i<rows.length;i++)
				{
					var datas=thisPlugin.getData(rows[i]);
					var checkbox = thisPlugin.getDL(rows[i]).find("> dt > :checkbox");
					if(datas["JGLX1"]=="商品优惠单")
					{
						falg=falg+1;
					}
				}
				if(rows.length>1)
				{
					for(var i=0;i<rows.length;i++)
					{
						var datas=thisPlugin.getData(rows[i]);
						
						if(datas["JGLX1"]=="商品优惠单"&&rowIndex!=rows[i])
						{
							if(falg>1)
							{
								thisPlugin.checked(rows[i],false);
							}
						}
					}
				}
			}
		},
		"rowdblclick" : function(thisPlugin, data, rowIndex, dl){
		debugger;
		//商品属性不为0普通的为协议商品，双击弹出此商品的协议信息的查询框以供选择商品的协议信息
		var KH=data["WLDWDM"];
		data["WLDWDM"]=data["WLDW01"];
		data["WLDW01"]=KH;
		if(data["SPSX"] != "0"){	
			var queryfield = {};
			queryfield["FMBJ"]=data["FMBJ01"];
			queryfield["XSBM01"] = data["XSBM01"];
			queryfield["SPSX"] = data["SPSX"];
			queryfield["WLDW01"] = data["WLDWDM"];
			queryfield["SPXX01"] = data["SPXX01"];
			queryfield["CGBM01"] = data["BM01"];
			queryfield["HZFS"] = data["HZFS"];
			queryfield["GSXX01"] = userInfo["PCRM_GSXX01"];
			var KH=data["WLDWDM"];
			data["WLDWDM"]=data["WLDW01"];
			data["WLDW01"]=KH;
			var resultData = makeFXD.getSqlResult(queryfield, "FXD", "XYSPXX", "scm/fxgl/fxd/search");
			console.info(resultData);
			resultData = resultData.data;
    		for(var i=0; i<resultData.length; i++){
    			$.extend(resultData[i], data);
    		}
			var json = {};
			json["dir"] = "scm/fxgl/fxd/search";
			json["namespace"] = "FXD";
			json["sqlid"] = "XYSPXX";
			json["autoquery"] = true;
			var FMBJ=data["FMBJ01"];
			debugger;
			json["init"] = {"FMBJ":FMBJ};
			json["resultData"] = resultData;
			json["fieldMapping"] = {
					"BJ":"SPLB.BJ",
 		    	 	"SPXX01":"SPLB.SPXX01",
 		    	 	"SPSX":"SPLB.SPSX",
 		    	 	"CGXY02":"SPLB.CGXY02",
 			    	"SPBM":"SPLB.SPBM",
 			    	"SPMC":"SPLB.SPMC",
 			    	"BMMC":"SPLB.CGBMMC",
 			    	"SPGG":"SPLB.SPGG",
 			    	"KMS":"SPLB.KMS",
 			    	"FMBJ01":"SPLB.FMBJ01",
 			    	"FMBJ":"SPLB.FMBJ",
 			    	"JLDW":"SPLB.JLDW",
 			    	"XYSJ":"SPLB.FXDJ",
 			    	"XYXJ":"SPLB.FXXJ",
 			    	//"KXSSL":"SPLB.XSSL",
 			    	"SYFL":"SPLB.SYFL",
 			    	"YSSL":"SPLB.YSSL",
 			    	//"SSJE":"SPLB.SSJE",
 			    	//"XSJE":"SPLB.XSJE",
 			    	"HSBL":"SPLB.HSBL",
 			    	"JGLX":"SPLB.JGLX",
 			    	"WLDW01":"SPLB.GYS_WLDW01",
 			    	"BM01":"SPLB.CG_BM01",
 			    	"XSBM01":"SPLB.XS_BM01",
 			    	"CK01":"SPLB.CK01",
 			    	"YHDH":"SPLB.YHDH",
 			    	"YHLYKL":"SPLB.YHLYKL",
 			    	"CKMC":"SPLB.CK",
 			    	"CGXY01":"SPLB.CGXY01"
			};
			json["listener"] = {
				"beforecallback":function(data){
					debugger;
   					$.each(data, function(key, value) {
   						debugger;
   						if(value["KXSSL"]<value["KMS"])
   						{
   							value["KMS"]=value["KXSSL"];
   						}
   						//分销销售，销售协议商品时，当采购协议为 负卖时，界面上的可卖数直接取协议上的可销售 数量
   						if(value["XSFSA"]==1)
   						{
   							value["KMS"]=value["KXSSL"];
   						}
   						value["XSSL"] = value["KMS"];
		 	        	value["XSJE"] = value["XSSL"] * value["FXDJ"];
		 	        	value["SYFL"] = 0;
		 	        	value["SSJE"] = value["XSSL"] * value["FXDJ"]-value["SYFL"];
   					});
				},
				"aftercallcallback":function(data){
				debugger;
					$.each(data, function(key, value) {
						debugger;
						value["XSSL"] = value["KMS"];
						value["XSJE"] = value["XSSL"] * value["FXDJ"];
						value["SYFL"] = 0;
						value["SSJE"] = value["XSSL"] * value["FXDJ"]-value["SYFL"];
					});
				}
			};
			$(".jl_modal .modal_close").click();
			JLQuery.show2(makeFXD,json);
			return true;
		}
	}
  }
};


var FXD_SPJGB_FXD2 = {
		  "title" : "查找分销单商品",
		  "page" : "scm/fxgl/fxd/search/FXD_SPMC.html",
		  "DataBaseType" : "scmform",
		  "result" : [
		             
		    {"id" : "BJ",   "name" : "BJ", "width" : 100,"hidden" : true},
		    {"id" : "GSXX01", "name" : "公司信息",     "width" : 1,    "hidden" : true},
		    {"id" : "SPXX01", "name" : "商品内码",     "width" : 1,    "hidden" : true},
		    {"id" : "SPBM",   "name" : "商品编码",     "width" : 100},
		    {"id" : "SPMC",   "name" : "商品名称",     "width" : 100},
		    {"id" : "BMMC",   "name" : "采购部门", "width" : 130},
		    {"id" : "CKMC",   "name" : "仓库名称",     "width" : 200},
		    {"id" : "SPGG",   "name" : "规格",         "width" : 100},
		    {"id" : "JLDW",   "name" : "单位",         "width" : 100},
		    {"id" : "FXDJ",   "name" : "单价",         "width" : 100},
		    {"id" : "FXDJ1",   "name" : "优惠单价",         "width" : 100,"hidden": true},
		    {"id" : "YSSL",   "name" : "预售数量",         "width" : 100,"hidden": true},
		    {"id" : "FXXJ",   "name" : "分销限价",         "width" : 100,"hidden": true},
		    {"id" : "FXXJ1",   "name" : "分销限价",         "width" : 100,"hidden": true},
		    {"id" : "KMS",    "name" : "可卖数",       "width" : 100},
		    {"id" : "KMS1",    "name" : "可优惠数量",       "width" : 100,"hidden" : true},
		    {"id" : "FMBJ",    "name" : "负卖标记",       "width" : 100},
		    {"id" : "FMBJ01",   "name" : "负卖标记代码", "width" : 1,    "hidden" : true},
		    {"id" : "SPSX",   "name" : "商品属性编号", "width" : 1,    "hidden" : true},
		    {"id" : "CGXY02", "name" : "商品属性",     "width" : 100},
		    {"id" : "WLDWMC",  "name" : "供应商",   "width" : 300},
		    {"id" : "BM01",   "name" : "采购部门代码", "width" : 1,    "hidden" : true},
		    {"id" : "CK01",   "name" : "仓库编码",     "width" : 100, "hidden" : true},
		    {"id" : "JGLX",   "name" : "促销信息",     "width" : 100},
		    {"id" : "JGLX1",   "name" : "用于存储接口查询返回的促销信息",    "width" : 100,"hidden": true},
		    {"id": "WLDWDM","name": "供应商代码","width": 60,"hidden": true},
		    {"id": "WLDW01","name": "客户代码","width": 60,"hidden": true},
		    {"id": "XSBM01","name": "销售部门","width": 60,"hidden": true},
		    {"id": "XSFS","name": "销售方式","width": 60,"hidden": true},
		    {"id": "YHDH","name": "优惠单号","width": 60,"hidden": true},
		    {"id": "YHDH1","name": "优惠单号","width": 60,"hidden": true},
		    {"id": "YHLYKL","name": "优惠联营扣率","width": 60,"hidden": true}
		  ],
		  "listener" : {
			"loadRow" : function(thisPlugin, data, index, dl){
				/*if("优惠" == data.JGLX){
						dl.addClass("font_green");
				}*/
				},
				"rowclick" : function(thisPlugin, data, rowIndex, dl){
					debugger;
					data["YHBJ"] = "1";
					data["DJLX"] = "8";
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Inbound/dispatch.do?rid="+Math.random();
					ajaxJson["data"] = {"interfaceId":"jl.scm.fxgl.fxd.GetSPJG.getSPJG", "data":JSON.stringify(data)};
					var resultData = JL.ajax(ajaxJson);
					console.info(resultData); 
					if(resultData.length >0){
						if(!JL.isNull(resultData[0]["SPXX01"]))
						{
							$("#LSSYT_SPXX").show();
							var ZKSP = data.SPBM + " - " + data.SPMC;
							$("#LSSYT_SPXX [name=ZKSP]").html(ZKSP);
							$("#LSSYT_SPXX [name=YHDJ]").html(resultData[0]["FXDJ"]);
							$("#LSSYT_SPXX [name=YHSL]").html(resultData[0]["KMS"]);
							thisPlugin.setCell(resultData[0]["FXDJ"], rowIndex, thisPlugin.getRowIndexByID("FXDJ1"));
							thisPlugin.setCell(resultData[0]["FXXJ"], rowIndex, thisPlugin.getRowIndexByID("FXXJ1"));
							thisPlugin.setCell(resultData[0]["KMS"], rowIndex, thisPlugin.getRowIndexByID("KMS1"));
							thisPlugin.setCell(resultData[0]["YHDH"], rowIndex, thisPlugin.getRowIndexByID("YHDH1"));
							thisPlugin.setCell(resultData[0]["YHLYKL"], rowIndex, thisPlugin.getRowIndexByID("YHLYKL"));
							thisPlugin.setCell(resultData[0]["JGLX"], rowIndex, thisPlugin.getRowIndexByID("JGLX1"));
						}
					}
					else{
						$("#LSSYT_SPXX [name=ZKSP]").html("&nbsp;");
						$("#LSSYT_SPXX [name=YHDJ]").html("&nbsp;");
						$("#LSSYT_SPXX [name=YHSL]").html("&nbsp;");
						$("#LSSYT_SPXX").hide();
						//thisPlugin.setCell(resultData[0]["WLDW01"], rowIndex, thisPlugin.getRowIndexByID("WLDW01"));
					}
					
				}
		  }
		};

var FXD_FXD_FLD = {
		  "title" : "查找返利",
		  //"page" : "scm/fxgl/fxd/search/FXD_SPMC.html",
		  "DataBaseType" : "scmform",
		  "result" : [
		    {"id" : "FLDH", "name" : "返利单号","width" : 100},
		    {"id" : "FLMC",   "name" : "返利名称","width" : 100},
		    {"id" : "DJLX",   "name" : "单据类型","width" : 100 ,"hidden":true},
		    {"id" : "SYFL",   "name" : "使用返利","width" : 100},
		    {"id" : "KYFL",   "name" : "可用返利","width" : 100},
		    {"id" : "KPBJ",   "name" : "开票标记","width" : 100,"hidden":true}
		  ]
};
var FXD_queryFXD = {
		  "title" : "查找分销单",
		  "url" : pubJson.getURL("FormUrl") + "/queryFXD/getFXD.do",
		  "page" : "scm/fxgl/fxd/search/QUERY_FXD.html",
		 // "DataBaseType" : "scmform",
			"queryField":{
				"FXDH":{
					"enterQuery":true
				},
				"SPMC":{
					"enterQuery":true
				},
				"WLDW":{
					"enterQuery":true
				},
				"BZ":{"enterQuery":true}
			},
			"menu":[[
			 	    {
			 	    	"text":"查看单据信息",
			 	    	"func": function(){
			 	    		JL.loadDetailGrid($(this), {
			 	    			"jlid":"JLGrid",
			 	    			"queryConfig":{
			 	    				//"autoquery":true,//自动查询
			 	    				"dir":"scm/fxgl/fxd/search",
			 	    				"namespace": "FXD",
			 	    				"sqlid": "queryFXDMX",
			 	    				"listener": {
			 	    				}
			 	    			}
			 	    		});
			 	    	}
			 	    },
			 	    {
			 	    	"text":"查看送货信息",
			 	    	"func": function(){
			 	    		JL.loadDetailGrid($(this), {
			 	    			"jlid":"JLGrid",
			 	    			"queryConfig":{
			 	    				//"autoquery":true,//自动查询
			 	    				"dir":"scm/fxgl/fxd/search",
			 	    				"namespace": "FXD",
			 	    				"sqlid": "queryFXDSHMX",
			 	    				"listener": {
			 	    				}
			 	    			}
			 	    		});
			 	    	}
			 	    },
			 	    {
			 	    	"text":"查看要货单",
			 	    	"func": function(){
			 	    		JL.loadDetailGrid($(this), {
			 	    			"jlid":"JLGrid",
			 	    			"queryConfig":{
			 	    				//"autoquery":true,//自动查询
			 	    				"dir":"scm/fxgl/fxd/search",
			 	    				"namespace": "FXD",
			 	    				"sqlid": "queryKHYHD",
			 	    				"listener": {
			 	    				}
			 	    			}
			 	    		});
			 	    	}
			 	    }
			 	]],
			/*"detailGrid":{
				"jlid":"JLGrid",
				"queryConfig":{
					"dir":"scm/fxgl/fxd/search",
					"namespace":"FXD",
					"sqlid":"queryFXDMX"
				}
				},*/
		  "result" : [
		     {"id" : "jlbh", "name" : "jlbh","width" : 80,"hidden":true},
		    {"id" : "bdbh", "name" : "bdbh","width" : 80,"hidden":true},
		    {"id" : "GSXX01", "name" : "公司代码","width" : 80,"hidden":true},
		    {"id" : "WBTDH", "name" : "WBTDH","width" : 80,"hidden":true},
		    {"id" : "DJLX01", "name" : "单据类型编码","width" : 80,"hidden":true},
		    {"id" : "FXDH", "name" : "分销单号","width" : 160},
		    {"id" : "KHYHDH", "name" : "客户要货单","width" : 160},
		    {"id" : "FHDH", "name" : "发货单号","width" : 160},
		    {"id" : "SPBM",   "name" : "商品编码","width" : 100},
		    {"id" : "SPMC",   "name" : "商品名称","width" : 300},
		    {"id" : "SPFL01", "name" : "商品分类编码","width" : 160},
		    {"id" : "SPFLMC",   "name" : "商品分类名称","width" : 100},
		    {"id" : "PPMC",   "name" : "品牌名称","width" : 100},
		    {"id" : "KHBZJG",   "name" : "标准价","width" : 100,"align":"right"},
		    {"id" : "FXDJ",   "name" : "分销单价","width" : 100,"align":"right"},
		    {"id" : "FXSL",   "name" : "分销数量","width" : 100,"summary" : "sum","align":"right"},
		    {"id" : "FXJE",   "name" : "分销金额","width" : 100,"summary" : "sum","align":"right"},
            {"id" : "KPJE",   "name" : "开票金额","width" : 100,"summary" : "sum","align":"right"},
		    {"id" : "SSJE",   "name" : "实收金额","width" : 100,"summary" : "sum","align":"right"},
		    {"id" : "FXCB",   "name" : "分销成本","width" : 100,"align":"right","skbj":true},
		   //  {"id" : "FLJE",   "name" : "返利金额","width" : 100,"align":"right","skbj":true},
		    {"id" : "FLJE",   "name" : "返利金额","width" : 100,"align":"right"},
		    {"id" : "ML",   "name" : "毛利","width" : 100,"align":"right","skbj":true},
		    {"id" : "SJ",   "name" : "税金","width" : 100,"align":"right","skbj":true},
		    {"id" : "KD",   "name" : "扣点","width" : 100},
		    {"id" : "SPSX",   "name" : "商品属性","width" : 100},
		    {"id" : "JLDW",   "name" : "计量单位","width" : 100},
		    {"id" : "KHBM",   "name" : "客户编码","width" : 100},
		    {"id" : "KHMC",   "name" : "客户名称","width" : 100},   
		    {"id" : "KHJC",   "name" : "客户简称","width" : 100},   
		    {"id" : "XSFS",   "name" : "销售方式","width" : 100},
		    {"id" : "XSBM",   "name" : "销售部门","width" : 100},
		    {"id" : "CKMC",   "name" : "仓库","width" : 150},
		    {"id" : "CGBM",   "name" : "采购部门","width" : 100},
		    /*{"id" : "PPMC",   "name" : "品牌","width" : 100},*/
		    {"id" : "PSLX",   "name" : "配送方式","width" : 100},
		    {"id" : "SHDZ",   "name" : "送货地址","width" : 100},
		    {"id" : "KPHM",   "name" : "发票号码","width" : 250},
		    {"id" : "FPRQ",   "name" : "开票时间","width" : 100},

//			{"id" : "SPFL",   "name" : "商品分类", "width" : 100},
		    {"id" : "XSWDMC",   "name" : "销售网点","width" : 100},
		    {"id" : "ZDR",   "name" : "制单人","width" : 100},
		    {"id" : "SHR",   "name" : "审核人","width" : 100},
		    {"id" : "SKR",   "name" : "收款员","width" : 100},
		    {"id" : "ZDRQ",   "name" : "制单日期","width" : 150},
		    {"id" : "SHRQ",   "name" :   "审核日期","width" : 100},
		    {"id" : "XSRQ",   "name" :   "销售日期","width" : 100},
		    {"id" : "CWRQ",   "name" :   "财务日期","width" : 100},
		    {"id" : "SKRQ",   "name" : "收款日期","width" : 100},
		    {"id" : "YYY",   "name" : "业务员","width" : 100},
		    {"id" : "JHRQ",   "name" : "计划日期","width" : 100},
		    {"id" : "YYSJ",   "name" : "预约时间","width" : 100},
		    {"id" : "GCMC",   "name" : "工程名称","width" : 100},
		    {"id" : "FHZT",   "name" : "发货状态","width" : 100},
			{"id" : "FHRQ",   "name" : "发货日期","width" : 100},
		    {"id" : "KSLXMC",   "name" : "客商类型","width" : 100},
		    {"id" : "HDZTMC",   "name" : "活动主题","width" : 100},
		    {"id" : "CJBM",   "name" : "厂家编码","width" : 100},
		    {"id" : "BZ",   "name" : "备注","width" : 100},
		    {"id" : "TJ",   "name" : "体积", "width" : 100},
		    {"id" : "LXRMX",   "name" : "联系人", "width" : 100},
		    {"id" : "LXDHMX",   "name" : "联系电话", "width" : 100},
		    {"id" : "QY",   "name" : "区域", "width" : 100},
		    
		  ],
		  "listener" : {
				"loadRow" : function(thisPlugin, data, index, dl){
					debugger;
					//商用业务员 不能看
					var gw=userInfo["PCRM_GW01"]
					if(gw=="2101"){
						thisPlugin.hideColumn("FXDJ",true);
						thisPlugin.hideColumn("FXJE",true);
						thisPlugin.hideColumn("SSJE",true);
						thisPlugin.hideColumn("KPJE",true);
					}
				}
		    }
};
var FXD_queryKHYHD = {
		  "title" : "查找客户要货单",
		  //"page" : "scm/fxgl/fxd/search/FXD_KHYHDH.html",
		  "DataBaseType" : "scmform",
		  "result" : [
		    {"id" : "JLWBDH", "name" : "要货单号","width" : 160},
		    {"id" : "KHYHD01",   "name" : "提单号","width" : 100,"hidden":true},
		    {"id" : "HDZT01",   "name" : "活动主题","width" : 100,"hidden":true},
		    {"id" : "HDZTMC",   "name" : "活动主题","width" : 100,"hidden":true},
		    {"id" : "KH_WLDW01",   "name" : "客户编码","width" : 120},
		    {"id" : "KHMC",   "name" : "客户名称","width" : 180},
		    {"id" : "SPBM",   "name" : "商品编码","width" : 180},
		    {"id" : "SPMC",   "name" : "商品名称","width" : 180},
		    {"id" : "YHSL",   "name" : "要货数量","width" : 180},
		    {"id" : "YHDJ",   "name" : "要货单价","width" : 180},
		    {"id" : "YHJE",   "name" : "要货金额","width" : 180},
		    {"id" : "YWYMC",   "name" : "业务员","width" : 120},
		    {"id" : "YWY_RYXX01",   "name" : "业务员编码","width" : 100,"hidden":true},
		    {"id" : "XS_BM01",   "name" : "销售部门编码","width" : 100,"hidden":true},
		    {"id" : "XSBMMC",   "name" : "销售部门","width" : 100},
		    {"id" : "XSFS01",   "name" : "销售方式编码","width" : 100,"hidden":true},
		    {"id" : "XSFS02",   "name" : "销售方式","width" : 100},
		    {"id" : "BZ",      "name" : "备注","width" : 120},
		    {"id" : "JGGK",   "name" : "价格管控","width" : 100,"hidden":true},
		    {"id" : "SKBJ",   "name" : "自动收款标记","width" : 100,"hidden":true},
		  ],
		  "listener" : {
				"loadRow" : function(thisPlugin, data, index, dl){
					debugger;
					//商用业务员 不能看
					var gw=userInfo["PCRM_GW01"]
					if(gw=="2101"){
						thisPlugin.hideColumn("YHDJ",true);
						thisPlugin.hideColumn("YHJE",true);
					}
				}
		    }
};
var FXD_queryFXDMX = {
		  "title" : "查找分销单明细",
		  //"page" : "scm/fxgl/fxd/search/QUERY_FXDMX.html",
		  "DataBaseType" : "scmform",
		  "queryField":{
				"SPMC":{
					"enterQuery":true
				}
			},
		  "result" : [
		    {"id" : "DJBH", "name" : "单据编号","width" : 160},
		    {"id" : "TDH",   "name" : "提单号","width" : 100},
		    {"id" : "SPBM",   "name" : "商品编码","width" : 100},
		    {"id" : "SPMC",   "name" : "商品名称","width" : 100},
		    {"id" : "SL",   "name" : "数量","width" : 80},
		    {"id" : "FHR",   "name" : "发货人","width" : 100},
		    {"id" : "FHRQ",   "name" : "发货日期","width" : 100},
		    
		  ]
};
var FXD_queryFXDSHMX = {
		  "title" : "查找分销送货明细单明细",
		  //"page" : "scm/fxgl/fxd/search/QUERY_FXDMX.html",
		  "DataBaseType" : "scmform",
		  "result" : [
		    {"id" : "SHWD", "name" : "送货网点","width" : 160},
		    {"id" : "SHRY",   "name" : "送货人员","width" : 100},
		    {"id" : "SHLXFS",   "name" : "送货人员联系方式","width" : 100},
		    {"id" : "PGSJ",   "name" : "派工时间","width" : 100},
		    {"id" : "HZSJ",   "name" : "回执时间","width" : 80},
		    {"id" : "SHDZ",   "name" : "送货地址","width" : 100},
		    {"id" : "LXR",   "name" : "联系人","width" : 100},
		    {"id" : "LXFS",   "name" : "联系方式","width" : 100}
		    
		  ]
};
var FXD_KHYHD = {
		  "title" : "查找客户要货单",
		  "page" : "scm/fxgl/fxd/search/FXD_KHYHDH.html",
		  "DataBaseType" : "scmform",
		  "result" : [
		    {"id" : "JLWBDH", "name" : "要货单号","width" : 160},
		    {"id" : "KHYHD01",   "name" : "提单号","width" : 100,"hidden":true},
		    {"id" : "HDZT01",   "name" : "活动主题","width" : 100,"hidden":true},
		    {"id" : "HDZTMC",   "name" : "活动主题","width" : 100,"hidden":true},
		    {"id" : "KH_WLDW01",   "name" : "客户编码","width" : 120},
		    {"id" : "KHMC",   "name" : "客户名称","width" : 180},
		    {"id" : "YWYMC",   "name" : "业务员","width" : 120},
		    {"id" : "YWY_RYXX01",   "name" : "业务员编码","width" : 100,"hidden":true},
		    {"id" : "XS_BM01",   "name" : "销售部门编码","width" : 100,"hidden":true},
		    {"id" : "XSBMMC",   "name" : "销售部门","width" : 100},
		    {"id" : "XSFS01",   "name" : "销售方式编码","width" : 100,"hidden":true},
		    {"id" : "XSFS02",   "name" : "销售方式","width" : 100},
		    {"id" : "BZ",      "name" : "备注","width" : 120},
		    {"id" : "JGGK",   "name" : "价格管控","width" : 100,"hidden":true},
		    {"id" : "SKBJ",   "name" : "自动收款标记","width" : 100,"hidden":true},
		    {"id" : "ZDRQ",   "name" : "客户要货单制单日期","width" : 100,"hidden":true}
		  ]
};
var FXD_KHYHDMX = {
		  "title" : "查找客户要货单明细",
		 // "page" : "scm/fxgl/fxd/search/FXD_KHYHDH.html",
		  "DataBaseType" : "scmform",
		  "result" : [
		    {"id" : "SPXX01", "name" : "商品内码","width" : 150,"hidden":true},
		    {"id" : "YHDXH", "name" : "客户要货单序号","width" : 150,"hidden":true},
		    {"id" : "KHBZJG",   "name" : "标准价","width" : 150},
		    {"id" : "GYS_WLDW01", "name" : "供应商","width" : 150,"hidden":true},
		    {"id" : "SPPPMC", "name" : "商品品牌","width" : 150,"hidden":true},
		    {"id" : "SPBM",   "name" : "商品编码","width" : 100},
		    {"id" : "KHBZJG",   "name" : "标准价","width" : 150},
		    {"id" : "SPMC",   "name" : "商品名称","width" : 150},
		    {"id" : "FXDJ",   "name" : "单价","width" : 120},
		    {"id" : "XSSL",   "name" : "要货数量","width" : 120},
		    {"id" : "SPGG",   "name" : "商品规格","width" : 100},
		    {"id" : "WBTDH",   "name" : "外部提单号","width" : 100},
		    {"id" : "FLBL", "name" : "返利比例","width" : 150,"hidden":true},
		    {"id" : "SYFL", "name" : "使用返利","width" : 150,"hidden":true},
		    {"id" : "FLDJ", "name" : "返利单价","width" : 150,"hidden":true},
		    {"id" : "TJ",   "name" : "体积",     "width" : 100}
		  ]
};

var FXD_CK = {
		  "title" : "查找仓库",
		 // "page" : "scm/fxgl/fxd/search/FXD_KHYHDH.html",
		  "DataBaseType" : "scmform",
		  "result" : [
            {"id" : "WLDW01", "name" : "供应商代码","width" : 120},
            {"id" : "FXXJ", "name" : "分销限价","width" : 120,"hidden":true},
            {"id" : "WLDW02", "name" : "供应商","width" : 120},
            {"id" : "BM01", "name" : "采购部门代码","width" : 120},
            {"id" : "BM02", "name" : "采购部门","width" : 120},
		    {"id" : "CK01", "name" : "仓库代码","width" : 120},
		    {"id" : "CK",   "name" : "仓库","width" : 150},
		    {"id" : "KMS",   "name" : "可卖数","width" : 150},
		    {"id" : "FMBJ", "name" : "负卖标记","width" : 120,"hidden":true},
		    {"id" : "SPSX", "name" : "商品属性编码","width" : 120,"hidden":true},
		    {"id" : "SPSXMC",   "name" : "商品属性","width" : 150}
		  ]
};
var FXD_SPCK = {
		  "title" : "查找仓库",
		  "page" : "scm/fxgl/fxd/search/SPCKMC.html",
		  "DataBaseType" : "scmform",
		  "result" : [
          {"id" : "WLDW01", "name" : "供应商代码","width" : 120,"hidden":true},
          {"id" : "FXXJ", "name" : "分销限价","width" : 120,"hidden":true},
          {"id" : "WLDW02", "name" : "供应商","width" : 120,"hidden":true},
          {"id" : "BM01", "name" : "采购部门代码","width" : 120,"hidden":true},
          {"id" : "SPBM", "name" : "商品编码","width" : 120},
          {"id" : "SPMC", "name" : "商品名称","width" : 120},
          {"id" : "BM02", "name" : "采购部门","width" : 120},
		  {"id" : "CK01", "name" : "仓库代码","width" : 120,"hidden":true},
		  {"id" : "CK",   "name" : "仓库","width" : 150},
		  {"id" : "SPGG",   "name" : "规格","width" : 150},
		  {"id" : "FXDJ",   "name" : "单价","width" : 150},
		  {"id" : "KMS",   "name" : "可卖数","width" : 150},
		  {"id" : "FMBJ", "name" : "负卖标记","width" : 120,"hidden":true},
		  {"id" : "SPSX", "name" : "商品属性编码","width" : 120,"hidden":true},
		  {"id" : "SPSXMC",   "name" : "商品属性","width" : 150}
	 ]
};
var FXD_ZHSP = {
		"title" : "查询组合商品",
		"multi" : true,
		//"interfaceId": "jl.scm.lsgl.lsd.selectLSSYT.getPrice",
		"DataBaseType" : "scmform",
		"page":"scm/fxgl/fxd/search/FXD_ZHSP.html",
		"isNotNull":{
			  "ZHSP01":"请先输入组合信息"
		  },
		"queryGrid" : {
			"groupField": [
			     {"id":"ZHSP01", "title":"组合编码", "css":"font_weight_bold font_size_standard"},
	   		    {"id":"SPBM", "title":"商品编码", "css":"font_weight_bold font_size_standard"},
	   		    {"id":"SPMC", "title":"商品名称", "css":"font_weight_bold font_size_standard"},
	   		    {"id":"ZHSL", "title":"组合数量", "css":"font_weight_bold font_size_standard"},
	   		    {"id":"ZHDJ", "name":"组合价格", "css":"ml20 font_weight_bold font_size_standard"}
	           ],
	        "rowSelectMode":"groupRadio",
	        "listener": {
	        	"loadData": function(thisPlugin){
	        		thisPlugin.getGroup().find("> dl:first").click();
	        	},
	        	"rowdblclick": function(thisPlugin, data, rowIndex){
	        	},
				"rowclick": function(thisPlugin, data, rowIndex){
					debugger;
					var checkbox = thisPlugin.getDL(rowIndex).find("> dt > :checkbox");
					if(!checkbox.is(":checked")){
						checkbox.click();
					}
				},
				"checked": function(thisPlugin, rowIndex, bool){
					var checkbox = thisPlugin.getDL(rowIndex).find("> dt > :checkbox");
					if(!checkbox.is(":checked")){
						checkbox.click();
					}
				}
	        }
		},
		"result" : [
		    {"id":"ZHSP01", "name":"组合编码", "width":150, "hidden":true},
		    {"id":"ZBBJ", "name":"组别", "width":150, "hidden":true},
			{"id":"ZHDJ", "name":"组合价格", "width":150, "hidden":true},
			{"id":"ZHSL", "name":"组合数量", "width":150, "hidden":true},
	        {"id":"SPMC", "name":"商品名称", "width":200},
	        {"id":"SPBM", "name":"商品编码", "width":150},
	        {"id":"SPGG", "name":"规格", "width":150},
	        {"id":"LSDJ", "name":"单价", "width":100},
	        {"id":"KMS", "name":"可卖数", "width":100},
	        {"id":"CKMC", "name":"仓库名称", "width":150},
	        {"id":"SPSXMC", "name":"商品属性", "width":100},
	        {"id":"CGBMMC", "name":"采购部门", "width":100},
	        {"id":"WLDWMC", "name":"供应商名称", "width":200},
	        {"id":"JLDW", "name":"计量单位", "width":100},
	        {"id":"JGLX", "name":"价格类型 ", "width":100},
	        {"id":"YHLYKL", "name":"联营扣率 ", "width":100, "hidden":true},
	        {"id":"SPXX01", "name":"商品内码", "width":100, "hidden":true},
	        {"id":"FMBJ", "name":"负卖标记", "width":100, "hidden":true},
	        {"id":"SPSX", "name":"商品属性代码", "width":100, "hidden":true},
	        {"id":"CK01", "name":"仓库代码", "width":100, "hidden":true},
	        {"id":"WLDW01", "name":"供应商代码", "width":100, "hidden":true},
	        {"id":"CGBM01", "name":"采购部门代码", "width":100, "hidden":true},
	        {"id":"LSXJ", "name":"零售限价 ", "width":100, "hidden":true},
	        {"id":"HZFS", "name":"合作方式 ", "width":100, "hidden":true},
	        {"id":"YHDJ", "name":"优惠单价", "width":100, "hidden":true},
	        {"id":"YHSL", "name":"优惠数量", "width":100, "hidden":true},
	        {"id":"YHDH", "name":"优惠单号 ", "width":100, "hidden":true}
		]
	};
var FXD_SKFS = {
	"title" : "查找收款方式",
	"DataBaseType" : "scmform",
	"result" : [
	  {"id" : "SKFS01","name" : "收款方式代码","width" : 150},
	  {"id" : "SKFS02","name" : "收款方式名称","width" : 150	},
	  {"id" : "SKFS06","name" : "金额方式","width" : 100,"hidden" : true},
	  {"id" : "YHBJ","name" : "银行标记","width" : 100,"hidden" : true}
	]
};

var FXD_XYSPXX = {
		"title" : "查询协议商品信息",
		"DataBaseType" : "scmform",
		"result" : [
	        {"id":"JLWBDH", "name":"协议号", "width":200},
	        {"id":"KXSSL", "name":"协议数量", "width":100},
	        {"id":"XYSJ", "name":"协议单价", "width":100},
	        {"id":"XYXJ", "name":"协议限价", "width":100},
	        {"id":"XSFSA", "name":"销售方式", "width":100,"hidden":true},
	        {"id":"BZ", "name":"备注", "width":200}
		],
	};

var FXD_JHDH = {
	"title" : "查询借出单",
	"DataBaseType" : "scmform",
	"page":"scm/fxgl/fxd/search/FXD_JHDH.html",
	"result" : [
        {"id":"JHDH", "name":"借还单号", "width":150},
        {"id":"JHD01", "name":"借还单号", "width":140,"hidden":true},
        {"id":"KH01", "name":"借出单位编码", "width":120},
        {"id":"KHMC", "name":"借出单位", "width":160},
        {"id":"CK01", "name":"仓库编码", "width":100},
        {"id":"CKMC", "name":"仓库名称", "width":100},
        {"id":"XS_BM01", "name":"借出部门编码", "width":120},
        {"id":"BMMC", "name":"借出部门", "width":150},
        {"id":"FHDH", "name":"发货单号", "width":100},
        {"id":"JCRQ", "name":"借出日期", "width":120},
        {"id":"BZ", "name":"备注", "width":100}
	]
};

var FXD_JHDHMX = {
		"title" : "查询借出单",
		"DataBaseType" : "scmform",
		"result" : [
	        {"id":"BJ", "name":"BJ", "width":80,"hidden":true},
	        {"id":"JHD01", "name":"借还单号", "width":140,"hidden":true},
	        {"id":"JHDI01", "name":"借出提单号", "width":120},
	        {"id":"SPXX01", "name":"商品内码", "width":160},
	        {"id":"SPBM", "name":"商品编码", "width":100},
	        {"id":"SPMC", "name":"商品名称", "width":100},
	        {"id":"SPGG", "name":"商品规格", "width":120},
	        {"id":"SPPPMC", "name":"品牌", "width":150},
	        {"id":"JLDW", "name":"计量单位", "width":100},
	        {"id":"TJ", "name":"体积", "width":120},
	        {"id":"GYS_WLDW01", "name":"供应商编码", "width":100},
	        {"id":"CG_BM01", "name":"采购部门编码", "width":100},
	        {"id":"CGBMMC", "name":"采购部门名称", "width":100},
	        {"id":"FHSL", "name":"发货数量", "width":100},
	        {"id":"YGHSL", "name":"已归还数量", "width":100},
	        {"id":"FXDJ", "name":"分销单价", "width":100},
	        {"id":"FXXJ", "name":"分销限价", "width":100},
	        {"id":"CK01", "name":"仓库编码", "width":100},
	        {"id":"CK", "name":"仓库", "width":100},
	        {"id":"FMBJ01", "name":"负卖标记编码", "width":100},
	        {"id":"FMBJ", "name":"负卖", "width":100},
	        {"id":"CGXY02", "name":"商品属性", "width":100},
	        {"id":"CKSP12", "name":"商品属性编码", "width":100}
		]
	};