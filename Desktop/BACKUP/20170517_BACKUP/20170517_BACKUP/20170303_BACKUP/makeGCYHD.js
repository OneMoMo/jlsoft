var makeGCYHD = JL.JLForm();

makeGCYHD.setPlugin({
	"toolbar" : {
	    "jlid": "JLToolBar",
	    "buttons": {
			"jlNewForm":{},
			"jlCancel":{
				"success":function(data,tip){
					makeGCYHD.getTab().find("#jlCancel").hide();
					makeGCYHD.getTab().find("#jlNewForm").hide();
				}
			},
			"jlSaveForm":{
				"success":function(data,tip){
					makeGCYHD.getTab().find("input[name=GCYHD01]").val(data.GCYHD01);
					
					//保存成功提示信息                                            
    		        tip.obj.remove();    //清除公共提示信息。
                    JL.tip("保存成功【单据号："+data.GCYHD01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
				}
			},
			"jlDeleteForm":{}
	    }
	},
	"GCDLD01":{
		"dir" : "scm/gcgl/gcdl/search",
		"namespace" : "MONGO_GCDLD",
		"sqlid" : "YHCXDLD",
		"init": {"DLDZT":"BZ02"},    
		"fieldMapping" : { 
			"GCDLD01":"GCDLD01",
			"JXSMC":"JXSMC",
			"SYDW":"SYDW",
			"SYDWDZ":"SYDWDZ",
			"EJJSXMC":"EJJSXMC",
			"EJJXS01":"EJJXS01",
			"EJJSXDH":"EJJSXDH",
			"LXR":"LXR",
			"LXDH":"LXDH",
			"GCBH":"GCBH",
			"YHXM":"YHXM",
			"YHDH":"YHDH",
			"GCLX":"GCLX",
			"GMDW":"GMDW",
			"GCYT":"GCYT",
			"GCMS":"GCMS",
			"BMMC":"BMMC",
			"YHBZ":"YHBZ",
			"SPXX01":"SPXX01",
			"BM01":"BM01",
			"KQBH":"KQBH",
			"SHDZ":"SHDZ",
			"PSFS":"PSFS",
			"GCDLD01":"GCDLD01",
			"WLDW01":"KH_WLDW01",
			"HTXSFS":"XSFS01",
			"SPLB":"SPLB",
			"HTSCFJ":"HTSCFJ",
			"MJ":"MJ",
			"PS":"PS"
		},
		"listener" : {
			 "beforequery" : function(data){	 
	    		 data["BZ02"]="封单";
	    		 },
			"aftercallback" : function(data){
				makeGCYHD.getPluginObj("JXS01").setData(data[0]["WLDW01"]);
				
				debugger;
				var queryField = {};
				queryField["WLDW01"] = makeGCYHD.getTab().find("input[name='KH_WLDW01']").val();
				queryField["BM01"] = makeGCYHD.getPluginObj("BM01").getData();
				queryField["GSXX01"] = userInfo["PCRM_GSXX01"];
				var resultData = makeGCYHD.getSqlResult(queryField, "RYXX", "GCCXYWY", "scm/pub/search");
				resultData = resultData.data;
				if(resultData.length > 0){
					makeGCYHD.getTab().find("input[name='YWYMC']").val(resultData[0]["YWYMC"]);
					makeGCYHD.getTab().find("input[name='YWY_RYXX01']").val(resultData[0]["RYXX01"]);
				}
				getDWYEZ();
				
				//家用默认为5% ，商用默认0% 
				var GCLX=makeGCYHD.getPluginObj("GCLX").getData();
				if(GCLX.key==1){
					//海南需求 家用默认为2  差异
					makeGCYHD.getTab().find("input[name='BZJBL']").val(2);
					//上海需求 家用默认为5
//					makeGCYHD.getTab().find("input[name='BZJBL']").val(5);
					JSBZJ();//计算保证金
				}else{
					makeGCYHD.getTab().find("input[name='BZJBL']").val(0);
					JSBZJ();//计算保证金
				}
				var EJJSXMC=makeGCYHD.getTab().find("input[name='EJJSXMC']").val();
				if(EJJSXMC==""){
					makeGCYHD.getTab().find("li[name='EJJXS']").hide();
				}
			}	
		}
	},
	"DKHTZ" :{
		"jlid": "JLCheckbox",
		"options": {"1":"等客户通知"},
		"listener": {
		      "checked":function(data, checked, arr){
		    	  if(checked){
		    		  makeGCYHD.getPluginObj("PSSJ").disabled(true);
		    		  makeGCYHD.getPluginObj("PSSJ").setData(null);
		    	  }else{
		    		  makeGCYHD.getPluginObj("PSSJ").disabled(false);
		    	 }
		      }
		}
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
    
    "QXCZY01": {
    	"jlid": "JLInput"
	 },
    
    "SH":{
		 "jlid": "JLRadio",
		 "default" : "Y",
		 "options": {"Y":"同意","N":"不同意"}
	 },
	 
	 "YWYMC":{
		"multi": false,
		"autoquery": true,
		"dir" : "scm/pub/search",
		"namespace" : "RYXX",
		"sqlid" : "GCCXYWY",
		"init": {"GSXX01":"GSXX01"},  
		"fieldMapping" : {
			"YWYMC":"YWYMC",
			"RYXX01":"YWY_RYXX01",
		},
		"listener" : {
			"aftercallback" : function(){
				getDWYEZ();
			},
			"beforequery" : function(data){
				data["BM01"]=makeGCYHD.getPluginObj("BM01").getData();
				var KH_WLDW01=makeGCYHD.getTab().find("input[name='KH_WLDW01']").val();
				data["GSXX01"]=userInfo["PCRM_GSXX01"];
				data["WLDW01"]=KH_WLDW01;
 		    }
		}
	 },

	"BM01" : {
		"jlid" : "JLInput",
		"AccessCzy" : {
			"BM01" : true
		}
	},
	
	"JXS01" : {
		"jlid" : "JLInput",
		"AccessCzy" : {
			"WLDW01" : true
		}
	},
	
	/*"BMMC" : {
		//"querybh" : 9002,
		"dir":"scm/pub/search",
		"namespace":"BM",
		"sqlid":"XSBM",
		"init": {"GSXX01":"GSXX01"},
		"fieldMapping": {
			"BM01":"BM01",
			"BMMC":"BMMC"
		},
		"listener" : {
			"aftercallback" : function(){
				getDWYEZ();
				},
			"beforequery" : function(data) {
			  				if(a==1){
			  					JL.tip("商品已选择，不可修改");
			  					return true;
				    	  }
				    }
		}
	},*/

	"XSFS01" : {
        "jlid": "JLSelect",  
        "param" : {"XSLX_F":"1,3","RYQX":"YWY_RYXX01"},
    	"sqlid" : "FLFS.FLFSXX",
	    "resource": "scmform"
	},
	
	"SHDZ" : {		
		"jlid": "JLSelectTree",
		"placeholder":"点击选择送货地址",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do"
	},
	
	"PSFS" : {
	      "jlid":"JLSelect",
	      "placeholder":"点击选择配送方式",
		  "options":{"0":"自提","1":"配送"},
		  "default":"1",
		  "listener" : {
				"click" : function(data) {
					debugger;
					var PSFS=makeGCYHD.getPluginObj("PSFS").getData();
					if(PSFS.key==0){
						makeGCYHD.getTab().find("em[name='PSBT']").attr("style","display:none");
						makeGCYHD.getTab().find("input[name='KHXM']:not(:disabled)").attr("readonly","readonly");
						makeGCYHD.getTab().find("input[name='KHDH']:not(:disabled)").attr("readonly","readonly");
						makeGCYHD.getPluginObj("SHDZ").disabled(true);
						makeGCYHD.getPluginObj("PSSJ").disabled(true);
						makeGCYHD.getPluginObj("DKHTZ").disabled(true);
					}else{
						makeGCYHD.getTab().find("em[name='PSBT']").removeAttr("style","display:none");
						makeGCYHD.getTab().find("input[name='KHXM']:not(:disabled)").removeAttr("readonly","readonly");
						makeGCYHD.getTab().find("input[name='KHDH']:not(:disabled)").removeAttr("readonly","readonly");
						makeGCYHD.getPluginObj("SHDZ").disabled(false);
						makeGCYHD.getPluginObj("DKHTZ").disabled(false);
						var DKHTZ=makeGCYHD.getPluginObj("DKHTZ").getData();
						if (DKHTZ.length>0) {
							makeGCYHD.getPluginObj("PSSJ").disabled(true);
						}else{
							makeGCYHD.getPluginObj("PSSJ").disabled(false);
						}
						
					}
				}
			}
	 },
	 
	"PSSJ" : {
		"jlid": "JLDate",
		"readonly" : true ,
		"todayBtn": true ,
		"startDate": JL.formatDate(-1,2)
	},	  
	
	"HTSCFJ" : {		
		"jlid": "JLUpload"
	},
	
	"HDZT" : {
		"dir" : "scm/fxgl/yhd/search",
		"namespace" : "KHYHD",
		"sqlid" : "HDZT",
		"init" : {"GSXX01" : "GSXX01","JXS01":"WLDW01"},
		"fieldMapping" : {
			"HDZTMC" : "HDZT",
			"HDZT01" : "HDZT01"
		}
	},
  
	"SPLB" : {
		"jlid": "JLGrid",
		"tittles" : "商品列表", 
		"initCell":[
		    "GCSPBM", "GCSPMC",  "PFDJ", "PFSL", "KKDSL", "PFDJ","SQDJ",
		    "AZDZMX", "LXRMX", "LXDHMX", "FXDJ","BZJDJ","DJTDH"
		],
		"primarykey" : ["SPXX01", "AZDZMX"],           
		"groupField" : "GCSPMC",
		"width": 600,	 
		"buttons" : [2],
		"headers": [
            {"id": "SPXX02","name": "商品代码","width": 150,
            	"editor":{
            		"dir":"scm/gcgl/gcdl/search",
            		"type":"text",
					"jlid":"JLQuery",
					"multi":true,
					"namespace" : "GCYHD",
					"sqlid" : "hotGCYHD", 
					"fieldMapping":{
						"SPXX02" : "SPLB.SPXX02",
						"SPXX04" : "SPLB.SPXX04",
						"SPXX01" : "SPLB.SPXX01",
						"PPMC" : "SPLB.PPMC",
						"SL" : "SPLB.SL",
					},
			    	"listener" : {
						 "beforequery" : function(data){
				    		 data["GCSPBM"]=makeGCYHD.getPluginObj("SPLB").getSelected()[0]["GCSPBM"];
				    		 data["GSXX01"]=makeGCYHD.getTab().find("input[name='GSXX01']").val();
			    		 }
			    	}
		   		}
            },
			{"id": "SPXX04","name": "商品名称","width": 300},
			{"id": "PPMC","name": "品牌名称","width": 150},
			{"id": "SPXX01","name": "商品内码","hidden":true},
			{"id": "PFDJ","name": "批复单价","hidden":true},
			{"id": "PFSL","name": "批复数量","hidden":true},
			{"id": "SQDJ","name": "合同单价","width": 120,"summary" : "sum","align":"right", "format":"number|2"},
			{"id": "KKDSL","name": "可开单数量","width": 120,"summary" : "sum","align":"right"},
			{"id": "FXDJ","name": "批复单价","width": 120,"align":"right", "format":"number|2"},
			{"id": "YHSL","name": "本次要货数量","width": 120,"summary" : "sum","align":"right", "format":"number|2"},
			{"id": "PFJE","name": "本次要货金额","width": 120,"summary" : "sum","align":"right", "format":"number|2"},
			{"id": "BZJDJ","name": "保证金单价","width": 120,"align":"right", "format":"number|2"},
			{"id": "BZJ","name": "保证金","width": 120,"summary" : "sum","align":"right", "format":"number|2"}, 
			{"id": "HJJE","name": "合计金额","width": 120,"summary" : "sum","align":"right", "format":"number|2"},	//合计金额=要货金额+保证金额 
			{"id": "BZ","name": "备注","width": 250},
			{"id": "SL","name": "可卖数","width": 120},
			{"id": "WBTDH","name": "WBTDH","width": 100,"hidden":true},
			{"id": "YSZZSL","name": "要货终止数量","width": 100,"hidden":true},
			{"id": "FXSL","name": "YHD分销数量","width": 100,"hidden":true},
			{"id": "SFDZ","name": "是否搭载","width": 120,
				"editor":{
					"type":"select",
					"default": "否",
					"options" : {"是":"是","否":"否"},
					"listener" : {
						"change" : function(data){
							var SPLB = makeGCYHD.getPluginObj("SPLB");
        				    var SPLBData = SPLB.getData();
        				    var index = SPLB.getSelectedIndex();
        					if(data=="否"){
        						SPLB.disabledCell("AZDZMX", index, true);
        						SPLB.disabledCell("LXRMX", index, true);
        						SPLB.disabledCell("LXDHMX", index, true);
        						
        						SPLB.setCell(SPLBData[index]["AZDZMXtemp"], index, SPLB.getRowIndexByID("AZDZMX"));
        						SPLB.setCell(SPLBData[index]["LXRMXtemp"], index, SPLB.getRowIndexByID("LXRMX"));
        						SPLB.setCell(SPLBData[index]["LXDHMXtemp"], index, SPLB.getRowIndexByID("LXDHMX"));
        					}else{
        						SPLB.disabledCell("AZDZMX", index, false);
        						SPLB.disabledCell("LXRMX", index, false);
        						SPLB.disabledCell("LXDHMX", index, false);
        					}
        				},	
        			}
		   		}
			},
		    {"id": "AZDZMX","name": "安装地址","width": 180},
		    {"id": "LXRMX","name": "联系人","width": 120},
		    {"id": "LXDHMX","name": "联系电话","width": 120},
		    {"id": "GCSPBM","name": "工程商品编码","width": 120},
		    {"id": "GCSPMC","name": "工程商品名称","width": 120},
		    {"id": "AZDZMXtemp","name": "安装地址","width": 180,"hidden":true},
		    {"id": "LXRMXtemp","name": "联系人","width": 120,"hidden":true},
		    {"id": "LXDHMXtemp","name": "联系电话","width": 120,"hidden":true},
		    {"id": "DJTDH","name": "DJTDH","width": 100,"hidden":true}
	    ],
	    "listener": {
	    	"loadRow" : function(Plugin, data, index, dl){
	    		if(!JL.isNull(data.PFDJ)){
	    			var FXDJ = (data.PFDJ*1).toFixed(2)*1;		//要货单价
	    			Plugin.setCell(FXDJ, index, Plugin.getRowIndexByID("FXDJ"));
	    			//保证金比例
	    			var BZJBL = makeGCYHD.getTab().find("input[name='BZJBL']").val()*1;		
	    			//计算赋值 保证金单价=要货单价*保证金比例/100
		    		var BZJDJ = (FXDJ*(BZJBL/100)).toFixed(2)*1;	
		    		Plugin.setCell(BZJDJ, index, Plugin.getRowIndexByID("BZJDJ"));
		    		if(!JL.isNull(data.YHSL)){
		    			var YHSL = (data.YHSL*1).toFixed(2)*1;		//要货数量
			    		//计算赋值 要货金额=要货单价*要货数量
			    		Plugin.setCell((FXDJ*YHSL).toFixed(2), index, Plugin.getRowIndexByID("PFJE"));
			    		//计算赋值 保证金=保证金单价*要货数量
			    		Plugin.setCell((BZJDJ*YHSL).toFixed(2), index, Plugin.getRowIndexByID("BZJ"));
			    		//计算赋值 合计金额=(保证金单价+要货单价)*要货数量
			    		Plugin.setCell(((BZJDJ+FXDJ)*YHSL).toFixed(2), index, Plugin.getRowIndexByID("HJJE"));
		    		}
	    		}
	    		
	    		Plugin.setCell(0, index, Plugin.getRowIndexByID("YSZZSL"));
	    		
	    		Plugin.setCell(data.AZDZMX, index, Plugin.getRowIndexByID("AZDZMXtemp"));
	    		Plugin.setCell(data.LXRMX, index, Plugin.getRowIndexByID("LXRMXtemp"));
	    		Plugin.setCell(data.LXDHMX, index, Plugin.getRowIndexByID("LXDHMXtemp"));
	    	
	    		if(data.SFDZ=="否"){
	    			Plugin.disabledCell("AZDZMX", index, true);
	    			Plugin.disabledCell("LXRMX", index, true);
	    			Plugin.disabledCell("LXDHMX", index, true);
				}else{
					Plugin.disabledCell("AZDZMX", index, false);
					Plugin.disabledCell("LXRMX", index, false);
					Plugin.disabledCell("LXDHMX", index, false);
				}
	    	}
	    }
	}
});

makeGCYHD.setAfterInit(function() {
	debugger;
	 if (makeGCYHD.getPluginObj("QXCZY01").getData().length<=0){
		 makeGCYHD.getPluginObj("QXCZY01").setData(userInfo["PCRM_CZY02"]);
	 }
	 makeGCYHD.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeGCYHD.getPluginObj("GCLX").disabled(true);
	 makeGCYHD.getPluginObj("GCYT").disabled(true);
	 makeGCYHD.getPluginObj("XSFS01").disabled(true);
	 
	 makeGCYHD.getTab().find("li[name='JXSDH']").hide();
	 makeGCYHD.getTab().find("li[name='YHXM']").hide();
	 makeGCYHD.getTab().find("li[name='SYDWDZ_LI']").hide();
	 makeGCYHD.getTab().find("li[name='LXDH']").hide();
	 
	if(makeGCYHD.getTab().find("input[name='ZDR']").is(":not(:disabled)")){
		makeGCYHD.getTab().find("input[name='ZDR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
		makeGCYHD.getTab().find("input[name='ZDR01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
		makeGCYHD.getTab().find("input[name='ZDSJ']:not(:disabled)").val(JL.formatDate(0,2));
		makeGCYHD.getTab().find(".step2").hide();
		if (makeGCYHD.getPluginObj("SH").getData().key=="N") {
			makeGCYHD.getTab().find(".step2").show();
			QuerySJKMS();
		}
	}
	
	if(makeGCYHD.getTab().find("input[name='PFR']").is(":not(:disabled)")){
		makeGCYHD.getTab().find("input[name='PFR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
		makeGCYHD.getTab().find("input[name='PFR01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
		makeGCYHD.getTab().find("input[name='PFSJ']:not(:disabled)").val(JL.formatDate(0,2));
		makeGCYHD.getPluginObj("SH").setData({"key":"Y","value":"同意"});
		makeGCYHD.getTab().find("input[name='BZJ']:not(:disabled)").attr("readonly","readonly");
		makeGCYHD.getTab().find("#jlSaveDraft").hide();
		QuerySJKMS();
		getDWYEZ();
	}
	
	JSBZJ();
	
	if(makeGCYHD.pid){
		makeGCYHD.getTab().find("#jlNewForm").hide();
		getDWYEZ();
	}

	makeGCYHD.getPluginObj("SPLB").setAfterEdit(function(grid, id, x, y, old, edit){
        var data = grid.getData();
        if(id == "YHSL"){
        	if(JL.isNull(edit) || isNaN(edit*1) || edit*1<0){
        		JL.tip("本次要货数量必须为数字,且大于0");
        		grid.setCell( 0, x, grid.getRowIndexByID("YHSL"));
        	}else{
        		var GCSPBM = data[x]["GCSPBM"];
            	var DJTDH = data[x]["DJTDH"];
            	var sumYHSL = 0;
            	for(var i = 0; i < data.length; i++){
            		if(data[i]["GCSPBM"] == GCSPBM && data[i]["DJTDH"] == DJTDH){
            			sumYHSL += JL.isNull(data[i]["YHSL"])?0:data[i]["YHSL"]*1;
            		}
            	}
            	var KKDSL = data[x]["KKDSL"]*1;
            	if(sumYHSL > KKDSL){
        			JL.tip("商品" + data[x]["GCSPMC"] + "的本次要货数量不能大于可开单数量" + KKDSL);
        			grid.setCell( 0, x, grid.getRowIndexByID("YHSL"));
            	}
        	}
        	
        	var FXDJ = (data[x]["FXDJ"]*1).toFixed(2)*1;
			var YHSL = (data[x]["YHSL"]*1).toFixed(2)*1;
			var BZJDJ = (data[x]["BZJDJ"]*1).toFixed(2)*1; 
		    grid.setCell((FXDJ*YHSL).toFixed(2), x, grid.getRowIndexByID("PFJE"));
		    grid.setCell((BZJDJ*YHSL).toFixed(2), x, grid.getRowIndexByID("BZJ"));
		    //计算赋值合计金额=要货金额+保证金额。
		    var HJJE = (YHSL * (FXDJ + BZJDJ)).toFixed(2);
		    grid.setCell(HJJE, x, grid.getRowIndexByID("HJJE"));
		    
		    //累加商品列表中的保证金并赋值给主表上的保证金文本框
		    var SPLBDATA = makeGCYHD.getPluginObj("SPLB").getData();
        	var BZJ = 0;
        	for(var i=0; i<SPLBDATA.length; i++){
        		BZJ += JL.isNull(SPLBDATA[i]["BZJ"])?0:SPLBDATA[i]["BZJ"]*1;
        	}
        	makeGCYHD.getTab().find("input[name='BZJ']").val(BZJ.toFixed(2));
        } 
	});
});

makeGCYHD.setEvent([
{
	"selector":"input[name='BZJ']",
	"event":"blur",
	"func":function(){
		var BZJ = makeGCYHD.getTab().find("input[name='BZJ']").val();
		if(JL.isNull(BZJ) || isNaN(BZJ) || BZJ < 0){
    		JL.tip("保证金必须为数字,且不能小于0");
    		makeGCYHD.getTab().find("input[name='BZJ']").val(0);
    		return false;
    	}
		/*var SPLB = makeGCYHD.getPluginObj("SPLB");
		for(var i=0; i<SPLB.getData().length; i++){
			SPLB.setCell(0, i, SPLB.getRowIndexByID("BZJ"));
			SPLB.setCell(0, i, SPLB.getRowIndexByID("BZJDJ"));
		}*/
	}
},
{
	"selector":"input[name='BZJBL']",
	"event":"blur",
	"func":function(){
		var BZJBL = makeGCYHD.getTab().find("input[name='BZJBL']").val();
		if(JL.isNull(BZJBL)){
			JL.tip("保证金比例不能为空");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(5);
		}
		if(BZJBL.split(" ").length > 1){
			JL.tip("保证金比例不能输入空格");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(5);
		}
		if(isNaN(BZJBL)){
			JL.tip("保证金比例只能为数字");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(5);
		}
		//上海 的要求  打补丁的时候请注意
		if(BZJBL!=0 && BZJBL!=5){
			JL.tip("保证金比例只能输入0或5");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(5);
		}
		
		//项目差异
		/*if(JL.isNull(BZJBL)){
			JL.tip("保证金比例不能为空");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(2);
		}
		if(BZJBL.split(" ").length > 1){
			JL.tip("保证金比例不能输入空格");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(2);
		}
		if(isNaN(BZJBL)){
			JL.tip("保证金比例只能为数字");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(2);
		}
		if(BZJBL!=0 && BZJBL!=2){
			JL.tip("保证金比例只能输入0或2");
			makeGCYHD.getTab().find("input[name='BZJBL']").val(2);
		}*/
		JSBZJ();//计算保证金	
	}
}
]);

function getDWYEZ(){
	var JXS01 = makeGCYHD.getTab().find("input[name='KH_WLDW01']").val();
	var XS_BM01 = makeGCYHD.getPluginObj("BM01").getData();
	if (JXS01 && XS_BM01){
		var query = {};
		query["WLDW01"] = JXS01;
		query["BM01"] = XS_BM01;
		query["GSXX01"] = userInfo["PCRM_GSXX01"];
		var resultData = makeGCYHD.getSqlResult(query, "WLDW", "DWYEZ", "scm/pub/search");
		resultData = resultData.data;
		if(!JL.isNull(resultData)){
			resultData = resultData[0];
			console.info(resultData);
			makeGCYHD.getTab().find("input[name='FLYE']").val((resultData["FANLI_YE"] - resultData["YAOHUO_FL_JE"]).toFixed(2));
			makeGCYHD.getTab().find("input[name='YSYE']").val(resultData["YUSHOU_YE"].toFixed(2));
			makeGCYHD.getTab().find("input[name='KYYE']").val((resultData["KYYE"]).toFixed(2));
			b=resultData["KEYONG_FANLI_YE"];
		} else {
			makeGCYHD.getTab().find("input[name='FLYE']").val(0);
			makeGCYHD.getTab().find("input[name='YSYE']").val(0);
			makeGCYHD.getTab().find("input[name='KYYE']").val(0);
		}
	}
}
//计算保证金
function JSBZJ(){
	var BZJBL = makeGCYHD.getTab().find("input[name='BZJBL']").val();
	var SPLB = makeGCYHD.getPluginObj("SPLB");
	var data = SPLB.getData();
	var FXDJ, BZJDJ, YHSL, sumBZJ=0;
	for(var i=0; i<data.length; i++){
		FXDJ = (data[i]["FXDJ"]*1).toFixed(2)*1;
		YHSL = (data[i]["YHSL"]*1).toFixed(2)*1;
		BZJDJ = ((BZJBL*1/100)*FXDJ).toFixed(2)*1;
		SPLB.setCell(BZJDJ, i, SPLB.getRowIndexByID("BZJDJ"));
		SPLB.setCell((BZJDJ*YHSL).toFixed(2), i, SPLB.getRowIndexByID("BZJ"));
		SPLB.setCell(((FXDJ+BZJDJ)*YHSL).toFixed(2), i, SPLB.getRowIndexByID("HJJE"));
		
		//累加保证金
		sumBZJ += (BZJDJ*YHSL).toFixed(2)*1;
	}
	makeGCYHD.getTab().find("input[name='BZJ']").val(sumBZJ.toFixed(2));
}

/**
 * 实时查询实际可卖数
 */
function QuerySJKMS() {
	debugger;
	var SPLB = makeGCYHD.getPluginObj("SPLB");
	var data = SPLB.getData();
	for(var i =0;i<data.length;i++){
		var resultData = makeGCYHD.getSqlResult({"SPXX01":data[i]["SPXX01"]}, "KHYHD", "CXSJKMS", "scm/fxgl/yhd/search");
		if (makeGCYHD.getPluginObj("SH").getData().key=="N") {
			if(resultData.data.length>0){
				SPLB.setCell(resultData.data[0]["SL"], i, SPLB.getRowIndexByID("SL"));
			}else{
				SPLB.setCell(0, i, SPLB.getRowIndexByID("SL"));	
			}
		}else if(makeGCYHD.getPluginObj("SH").getData().key=="Y"){
			if(resultData.data.length>0){
				SPLB.setCell(resultData.data[0]["SJKMS"], i, SPLB.getRowIndexByID("SL"));
			}else{
				SPLB.setCell(0, i, SPLB.getRowIndexByID("SL"));	
			}
		}
	}
}
