/** 
 * @author 晏志荣
 */
var makeGCHTTZD = JL.JLForm();

makeGCHTTZD.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewForm":{},
			"jlSaveForm":{
				"success":function(data,tip){
					makeGCHTTZD.getTab().find("input[name='GCHTH01']").val(data.GCHTH01);
					//自定义保存成功提示信息         
					tip.obj.remove();    //清除公共提示信息。
					JL.tip("保存成功【单据号："+data.GCHTH01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
				},
				"error":function(data,tip){
					makeGCHTTZD.getTab().find("#jlDeleteForm").hide();
				}
			},
			"jlCancel":{},
			"jlDeleteForm":{}
		}
	},
	
	"GCDLD01" :{
		"dir" : "scm/gcgl/gcdl/search",
		"namespace" : "GCHTTZD",
		"sqlid" : "CXGCHT",
		"fieldMapping": {
			"GCDLD01" : "GCDLD01",
			"JXSDH" : "JXSDH",
			"GCHTH01" : "GCHTH01",
			"JXSMC" : "JXSMC",
			"GCYT" : "GCYT",
			"EJJSXMC" : "EJJSXMC",
			"EJJSXDH" : "EJJSXDH",
			"SYDW" : "SYDW",
			"YHXM" : "YHXM",
			"YHDH" : "YHDH",
			"SYDWDZ" : "SYDWDZ",
			"GCLX" : "GCLX",
			"GMDW" : "GMDW",
			"LXR" : "LXR",
			"LXDH" : "LXDH",
			"AZDZ1" : "AZDZ1",
			"YJAZRQ" : "YJAZRQ",
			"HTQDRQ" : "HTQDRQ",
			"HTSCFJ" : "HTSCFJ",
			"GCMS" : "GCMS",
			"SPLB" : "SPLB",
			"HTXSFS" : "HTXSFS",
			"YJNR" : "YJNR",
			"WLDW01" : "WLDW01",
			"QXCZY01" : "QXCZY01",
			"GSXX01" : "GSXX01",
			"JXS01" : "JXS01",
			"XSBM01" : "XSBM01",
			"BCXCTP":"BCXCTP",
			"MJ":"MJ",
			"PS":"PS"
		},
		"listener" : {
			"aftercallback" : function(data){
				var SPLB = makeGCHTTZD.getPluginObj("SPLB");
				var SPLBDATA = SPLB.getData();
				for(var i=0; i<SPLBDATA.length; i++){
					var YHSL = SPLBDATA[i]["YHSL"]*1;
					if(YHSL != 0){
						SPLB.disabledCell("GCSPBM", i, true);
	   				}
					SPLB.setCell(0, i, SPLB.getRowIndexByID("TZSL"));
					
					
					//--控制要完货的商品合同单价不可编辑,只能修改数量
					debugger;
					var GCDLD01 = data[0].GCDLD01
					var query1={}; 
					query1["GSXX01"] = userInfo.PCRM_GSXX01;
					query1["GCDLD01"] = GCDLD01;
					query1["GCSPBM"] = SPLBDATA[i]["GCSPBM"];;
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl") + "/queryHTTZD/getSFQBYH.do";
					ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
					var resultData = JL.ajax(ajaxJson);
					if(resultData.data.resultlist=="-2"){
						SPLB.disabledCell("SQDJ", i, true);
					}
					
				
					
				}
			}
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
	
	"AZDZ1" : {		
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do"
	},

	"GCLX" : {
		"jlid":"JLSelect",
		"options":{"1":"家用","2":"商用"}
	},
	
	"GCYT" : {
		"jlid":"JLSelect",
		"options":{"1":"市政机关","2":"医疗卫生","3":"酒店餐饮","4":"金融通讯","5":"交通运输","6":"地产住宅","7":"教育科研","8":"商务办公","9":"商场超市","10":"休闲娱乐","11":"工业生产","12":"文体会馆","13":"沿街商铺","14":"小区","15":"监狱部队","16":"其他"}
	},
	 
	"KQBJ" : {
		"jlid": "JLRadio",
		"default": "1",
		"options": {"0":"是","1":"否"}
	},
	
	"SH" : {
        "jlid": "JLRadio",
		"default": "Y",
		"options": {"Y":"同意","N":"驳回"}
	},
	"DJZT":{ //单据状态
		"jlid":"JLSelect",
		  "options":{
			  	"超期作废":"超期作废",
			  	"丢单作废":"丢单作废",
			  	"其它作废":"其它作废"
			  		}
	},
	"BCXCTP" : {
	      "jlid": "JLUploadImage",
	      "auto":true
	 },
	"YJAZRQ" : {
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
		"jlid": "JLUpload"
	},
	"YQFJSC" : {		
		"jlid": "JLUpload"
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
	
	"SPLB" : {
         "jlid": "JLGrid",
         "tittles" : "商品列表",
         "buttons" : [1],
         "headers": [
               {"id": "WBTDH","name": "WBTDH","width": 100,"hidden": true},
               {"id": "SPDM","name": "商品代码","width": 100,"hidden": true},
			   {"id": "SPMC","name": "商品名称","width": 150,"hidden": true},
			   {"id": "SPXX01","name": "商品内码","width": 100,"hidden": true},
               {"id": "GCSPBM","name": "工程商品编码",
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
								 var GCLX=makeGCHTTZD.getPluginObj("GCLX").getData();
					    		 data["GCBJ"]=GCLX.key;
					    		 data["GSXX01"]=makeGCHTTZD.getTab().find("input[name='GSXX01']").val();
				    		 },

				    	}
			   		}
			   },
               {"id": "GCSPMC","name": "工程商品名称","width": 150},
               {"id": "YHSL","name": "要货数量", "width": 100, "align":"right", "format":"number|2"},
               {"id": "TZSL","name": "调整数量", "width": 100, "align":"right", "format":"number|2"},
               {"id": "PFSL","name": "合同数量", "width": 100, "align":"right", "format":"number|2"},
               {"id": "SQDJ","name": "合同单价", "width": 100, "align":"right", "format":"number|2"},
               {"id": "SQJE","name": "合同金额", "width": 100, "align":"right", "summary": "sum", "format":"number|2"},
               {"id": "PFDJ","name": "批复单价", "width": 100, "align":"right", "format":"number|2"},
               {"id": "PFJE","name": "批复金额", "width": 100, "align":"right", "summary": "sum", "format":"number|2"},
               {"id": "DZ","name": "搭载","width": 80,
            	   "editor":{
	            	   "type":"select",
	            	   "default": "否",
	            	   "options" : {"是":"是","否":"否"},
            	   }
               },
               {"id": "AZDZ","name": "安装地址","width": 200},
               {"id": "LXR","name": "联系人", "width": 150},
			   {"id": "LXDH","name": "联系电话", "width": 150},
			   {"id": "BZ","name": "备注","width": 200},
	    ],
		"listener":{
			"new":function (thisPlugin) {
				debugger;
				var row = thisPlugin.data.length - 1;//当前行
                //新增商品时
                thisPlugin.setCell( 0 , row, thisPlugin.getRowIndexByID("PFSL"));
                thisPlugin.setCell( 0 , row, thisPlugin.getRowIndexByID("YHSL"));
                var SYDWDZ = makeGCHTTZD.getTab().find("input[name='SYDWDZ']").val();
                var LXR = makeGCHTTZD.getTab().find("input[name='LXR']").val();
                var LXDH = makeGCHTTZD.getTab().find("input[name='LXDH']").val();
                thisPlugin.setCell(SYDWDZ, row, thisPlugin.getRowIndexByID("AZDZ"));
                thisPlugin.setCell(LXR, row, thisPlugin.getRowIndexByID("LXR"));
                thisPlugin.setCell(LXDH, row, thisPlugin.getRowIndexByID("LXDH"));
            }
        }
	}
});

makeGCHTTZD.setAfterInit(function(){
	makeGCHTTZD.getTab().find("input[name='ZDR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	makeGCHTTZD.getTab().find("input[name='ZDRDM']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	makeGCHTTZD.getTab().find("input[name='HTSJ']:not(:disabled)").val(JL.formatDate(0,2));
	makeGCHTTZD.getTab().find("input[name='SHR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	makeGCHTTZD.getTab().find("input[name='SHSJ']:not(:disabled)").val(JL.formatDate(0,2));
	makeGCHTTZD.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	
	if (makeGCHTTZD.getTab().find("input[name='ZDR']").is(":not(:disabled)")) {
		makeGCHTTZD.getTab().find(".step2").hide();
		if (makeGCHTTZD.getPluginObj("SH").getData().value=="驳回") {
			makeGCHTTZD.getTab().find(".step2").show();
		}else{
			makeGCHTTZD.getTab().find("#jlDeleteForm").hide();
		}
	}
	if (makeGCHTTZD.getTab().find("input[name='SHR']").is(":not(:disabled)")) {
		makeGCHTTZD.getTab().find("#jlNewForm").hide();
		makeGCHTTZD.getTab().find("#jlDeleteForm").hide();
		makeGCHTTZD.getPluginObj("SH").setData({"key":"Y","value":"同意"});
	}
	 
	makeGCHTTZD.getPluginObj("SPLB").setAfterEdit(function(grid, id, x, y, old, edit){
		var datas = grid.getData();
		if(id=="PFDJ"){
			if(isNaN(edit)){
				JL.tip("批复单价必须为数字");
				grid.setCell( "" , x, grid.getRowIndexByID("PFDJ"));
			}
			if(edit*1 <= 0){
				JL.tip("批复单价必须大于0");
				grid.setCell( "" , x, grid.getRowIndexByID("PFDJ"));
			}
			var PFSL = datas[x]["PFSL"] * 1;
			var TZSL = datas[x]["TZSL"] * 1;
			var PFDJ = datas[x]["PFDJ"] * 1;
			grid.setCell((PFSL+TZSL) * PFDJ, x, grid.getRowIndexByID("PFJE"));
		
		}
		if(id=="TZSL"){
			if(isNaN(edit)){
				JL.tip("调整数量必须为数字");
				grid.setCell("", x, grid.getRowIndexByID("TZSL"));
			}
			var PFSL = datas[x]["PFSL"] * 1;
			var YHSL = datas[x]["YHSL"] * 1;
			if(edit*1+PFSL < YHSL){
				JL.tip("调整后合同数量不能小于要货数量");
				grid.setCell("", x, grid.getRowIndexByID("TZSL"));
			}
			
			var TZSL = datas[x]["TZSL"] * 1;
			var PFDJ = datas[x]["PFDJ"] * 1;
			grid.setCell(PFDJ * (PFSL+TZSL), x, grid.getRowIndexByID("PFJE"));
			var SQDJ = datas[x]["SQDJ"] * 1;
			grid.setCell((PFSL+TZSL) * SQDJ, x, grid.getRowIndexByID("SQJE"));
		}
		if(id=="SQDJ"){
			if(isNaN(edit)){
				JL.tip("合同单价必须为数字");
				grid.setCell("", x, grid.getRowIndexByID("SQDJ"));
			}
			if(edit*1 <= 0){
				JL.tip("合同单价必须大于0");
				grid.setCell("", x, grid.getRowIndexByID("SQDJ"));
			}
			var PFSL = datas[x]["PFSL"] * 1;
			var TZSL = datas[x]["TZSL"] * 1;
			var SQDJ = datas[x]["SQDJ"] * 1;
			grid.setCell((PFSL+TZSL) * SQDJ, x, grid.getRowIndexByID("SQJE"));
		}
	});
});

