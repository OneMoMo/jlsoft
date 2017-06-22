var makeGCJZL = JL.JLForm();
var DY=0;
makeGCJZL.setAfterInit(function() {
	debugger;
	
	
	var config = JL.getJLconf({"DJLX":"makeGCJZL"});
	var configData = config;
	
	for(var i=0;i<configData.length;i++){
		if(configData[i].JLCO08 == "FJGCZP"){
			debugger;
			if(configData[i].JLCO04 == "0"){
				//湖南格力
				makeGCJZL.getTab().find("dt[name='hn_gczp']").show();
				makeGCJZL.getTab().find("dt[name='sh_gczp']").hide();
			}else if(configData[i].JLCO04 == "2"){
				makeGCJZL.getTab().find("dt[name='hn_gczp']").hide();
				makeGCJZL.getTab().find("dt[name='sh_gczp']").show();
			}
		}	
		if(configData[i].JLCO08 == "ZLZT"){
			debugger;
			if(configData[i].JLCO04 == "0"){
				//湖南格力
				makeGCJZL.getPluginObj("ZLZT").config.options={1: "正常", 2: "逾期"};
			}else if(configData[i].JLCO04 == "1"){
				makeGCJZL.getPluginObj("ZLZT").config.options={1: "正常", 2: "迟交", 3: "逾期"};
			}
		}
	}
	
	
	 makeGCJZL.getTab().find("#jlSaveForm").hide();
	 makeGCJZL.getTab().find("#jlJS").hide();
	 makeGCJZL.getTab().find("#jlFileView").hide();
	 makeGCJZL.getPluginObj("GCLX").disabled(true);
	 makeGCJZL.getPluginObj("GCYT").disabled(true);
	 makeGCJZL.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeGCJZL.getTab().find("input[name='SBR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCJZL.getTab().find("input[name='SBRDM']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeGCJZL.getTab().find("input[name='SBSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCJZL.getTab().find("li[name='JDRQ_li']").hide();
	 makeGCJZL.getTab().find("input[name='PFR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCJZL.getTab().find("input[name='PFRDM']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeGCJZL.getTab().find("input[name='BM01']:not(:disabled)").val(userInfo["PCRM_BM01"]);
	 if (makeGCJZL.getPluginObj("QXCZY01").getData().length<=0){
		 makeGCJZL.getPluginObj("QXCZY01").setData(userInfo["PCRM_CZY02"]);
	 }
	 if(makeGCJZL.data.PCRM_CH){
		 makeGCJZL.getTab().find("#jlTJ").hide();
		 makeGCJZL.getTab().find("#jlDY").hide();
         makeGCJZL.getTab().find("#jlDY1").hide();
	 }
	 if (makeGCJZL.getTab().find("input[name='SBR']").is(":not(:disabled)")) {
		 makeGCJZL.getTab().find(".step2").hide();
		 makeGCJZL.getTab().find(".step3").hide();
		 if (makeGCJZL.getPluginObj("SH").getData().key=="N") {
			 makeGCJZL.getTab().find(".step2").show();
		 }
	 }else if(!makeGCJZL.getTab().find("input[name='YJNR']").is(":not(:disabled)")&&makeGCJZL.pid){
     	 makeGCJZL.getTab().find("#jlTJ").hide();
         makeGCJZL.getTab().find("#jlDY").hide();
         makeGCJZL.getTab().find("#jlDY1").hide();
	}
	 if(makeGCJZL.getTab().find("input[name='PFR']").is(":not(:disabled)")){
		 makeGCJZL.getPluginObj("SH").setData({"key":"Y","value":"同意"});
		 makeGCJZL.getTab().find("#jlSaveDraft").hide();
		 makeGCJZL.getTab().find("#jlFileView").show();
		 var SDSJ = makeGCJZL.getPluginObj("SDSJ").getData();//收单时间
		 var JGSJ = makeGCJZL.getPluginObj("JGSJ").getData();//竣工时间
		 var ZHYCFXSJ = makeGCJZL.getTab().find("input[name='ZHYCFXSJ']").val();//分销单开单时间
		 debugger;
		 SDSJ = new Date(SDSJ.replace(/-/,"/"));
		 JGSJ = new Date(JGSJ.replace(/-/,"/"));
		 ZHYCFXSJ = new Date(ZHYCFXSJ.replace(/-/,"/"));
		 var date1 = Math.floor((SDSJ.getTime()-ZHYCFXSJ.getTime())/(24*3600*1000));
		 var date2 = Math.floor((SDSJ.getTime()-JGSJ.getTime())/(24*3600*1000));
		 if(!isNaN(date1)){
			 makeGCJZL.getTab().find("input[name='DATE1']").val(date1);
		 }
		 if(!isNaN(date2)){
			 makeGCJZL.getTab().find("input[name='DATE2']").val(date2);
		 }
		}
	 
	 //设置默认状态
	 if(makeGCJZL.pid){
		 makeGCJZL.getTab().find("#jlNewForm").hide();
		 var time=makeGCJZL.getMrzt(makeGCJZL.getPluginObj("SDSJ").getData(),makeGCJZL.getPluginObj("JGSJ").getData());
		 if(time=="正常"){
			 makeGCJZL.getPluginObj("ZLZT").setData({"key":"1","value":"正常"});
		 }else if(time=="迟交"){
			 makeGCJZL.getPluginObj("ZLZT").setData({"key":"2","value":"迟交"});
		 }else if(time=="逾期"){
			 makeGCJZL.getPluginObj("ZLZT").setData({"key":"3","value":"逾期"});
		 }
	 }
	 makeGCJZL.getTab().find("input[name='PFSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCJZL.getPluginObj("LX").setAfterEdit(function(grid, id, x, y, old, edit){
			//	参数grid为当前控件对象，参数id为列id名，参数x为行号，参数y为列号，参数edit当前输入项
				        var datas = grid.getData();
				        var PFDJ=datas[x]["PFDJ"]*1;
					    var SJSL=datas[x]["SJSL"]*1;
					    var FXSL=datas[x]["FXSL"]*1;
					    var BCZLSL=datas[x]["BCZLSL"]*1;
					    var ZLSL=datas[x]["ZLSL"]*1;
					    var THSL=datas[x]["THSL"]*1;
					    var GCSCSL=datas[x]["GCSCSL"]*1;
					    var BZJDJ=datas[x]["BZJDJ"]*1;
					    var WSJSL=datas[x]["WSJSL"]*1;
						if(id=="SJSL"){
				        	if(edit*1<0||isNaN(edit*1)){
				        		JL.tip("上交数量必须大于等于0,且必须为数字");
				        		grid.setCell("",x,grid.getRowIndexByID("SJSL"));
				        		grid.setCell("",x,grid.getRowIndexByID("WSJSL"));
								return false;
				        	}
				        	if(SJSL){
				        		grid.setCell(FXSL-SJSL,x,grid.getRowIndexByID("WSJSL"));
				        	}
				        }
				        
				        if(id=="BCZLSL"){
				        	if(BCZLSL>WSJSL){
				        		JL.tip("资料数量必须大于0,不能大于未交资料数量"+WSJSL+"，且必须为数字");
				        		grid.setCell(WSJSL,x,grid.getRowIndexByID("BCZLSL"));
				        		return false;
				        	}
				        	if(edit*1<0||isNaN(edit*1)||JL.isNull(edit)||BCZLSL>THSL-ZLSL-GCSCSL){
				        		var WJZLSL=THSL-ZLSL-GCSCSL;
				        		JL.tip("资料数量必须大于0,不能大于未交资料数量"+WJZLSL+"，且必须为数字");
				        		grid.setCell(THSL-ZLSL-GCSCSL,x,grid.getRowIndexByID("BCZLSL"));
				        		return false;
				        	}
				        	debugger;
				        	grid.setCell(BCZLSL*PFDJ,x,grid.getRowIndexByID("PFJE"));
				        	grid.setCell(BCZLSL*BZJDJ*1,x,grid.getRowIndexByID("BCFHBZJ"));
				        }
				        
				        if(id=="PFDJ"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("批复单价必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("PFDJ"));
								return false;
				        	}	      
		                }
				        if(id=="PFSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("批复数量必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("PFSL"));
								return false;
				        	}	      
		                }
				        if(id=="HTSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("合同数量必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("HTSL"));
								return false;
				        	}	      
		                }
//				        if(id=="THSL"){
//				        	if(edit*1<=0||isNaN(edit*1)){
//				        		JL.tip("提货数量必须大于0,且必须为数字");
//				        		grid.setCell( "" , x, grid.getRowIndexByID("THSL"));
//								return false;
//				        	}	      
//		                }
						if(id=="SJSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("上交数量必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("SJSL"));
								return false;
				        	}	      
		                }
						if(id=="WSJSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("未上交数量必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("WSJSL"));
								return false;
				        	}	      
		                }
						if(id=="SYBTSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("剩余不提数量量必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("SYBTSL"));
								return false;
				        	}	      
		                }
			/*if(!JL.isNull(datas[x]["PFDJ"]) && !JL.isNull(datas[x]["PFSL"])){
			   var PFDJ = datas[x]["PFDJ"] * 1;//获取值
			   var PFSL = datas[x]["PFSL"] * 1;//获取值
		       var PFJE = PFDJ * PFSL ;//计算方式
		       grid.setCell(PFJE, x, grid.getRowIndexByID("PFJE"));//赋值
	 		}*/
	   });

});

makeGCJZL.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			//新建
			"jlNewForm":{},
			//保存草稿
			/*"jlSaveDraft":{
				"beforeSave":function(obj,data){
					debugger;
					if(JL.isNull(data["GCDLD01"])
							&&JL.isNull(data["JXSMC"])
							&&JL.isNull(data["GCZLDH"])
							&&JL.isNull(data["EJJSXMC"])
							&&JL.isNull(data["EJJSXDH"])
							&&JL.isNull(data["HTQDSJ"])
							&&JL.isNull(data["JGSJ"])
							&&JL.isNull(data["SDSJ"])
							&&JL.isNull(data["JDRQ"])
							&&JL.isNull(data["FJFPZP"])
							&&JL.isNull(data["FJGCZP"])
							&&JL.isNull(data["JGYSSHB"])
							&&JL.isNull(data["FJTMSC"])
							&&JL.isNull(data["HTSCFJ"])
							&&JL.isNull(data["BZHTFJ"])
							&&JL.isNull(data["ZLSHBH"])
							&&JL.isNull(data["JZLLXR"])
							&&JL.isNull(data["YHSJ"])
							&&JL.isNull(data["BZ"])){
						//tip.obj.remove();
						JL.tip("数据为空，不允许保存草稿!","error"); 
						return true;
					}
					if(JL.isNull(data["GCDLD01"])){
						JL.tip("工程登录单号不允许为空!","error"); 
						return true;
					}
				}
			},*/
			//提交
			"jlSaveForm":{
			  "success":function(data,tip){
				    makeGCJZL.getTab().find("input[name=GCZLDH]").val(data.GCZLDH);
					//自定义保存成功提示信息                                            
			        tip.obj.remove();    //清除公共提示信息。
	                JL.tip("保存成功【单据号："+data.GCZLDH+"】流程待办号："+data.bdbh+"-"+data.jlbh);
	                makeGCJZL.getTab().find("#jlTJ").hide();
	                if(!makeGCJZL.getTab().find("input[name='YJNR']").is(":not(:disabled)")&&makeGCJZL.pid){
	                	makeGCJZL.getTab().find("#jlDC").show();
					}
	                debugger;
	                var SH=makeGCJZL.getPluginObj("SH").getData();
	                var PFR=makeGCJZL.getTab().find("input[name='PFR']").val();
	                if(SH.key!="N"&&!PFR==""){
	                	makeGCJZL.getTab().find("#jlJS").show();
	                }
			  },
			  "error":function(data,tip){
				    debugger;
					makeGCJZL.getTab().find("#jlSaveForm").hide();
					makeGCJZL.getTab().find("#jlSaveDraft").hide();
			  	}
			},
			"jlTJ":{
				"name":"提交",
				"func":function(){
					
					if(JL.isNull(makeGCJZL.getPluginObj("FJTMSC").getData())){
						JL.tip("请上传条码excel","info");
						return false;
						makeGCJZL.getTab().find("#jlSaveForm").hide();
					}
					
					if(JL.isNull(makeGCJZL.getPluginObj("JGSJ").getData())){
						JL.tip("请输入竣工时间","info");
						return false;
						makeGCJZL.getTab().find("#jlSaveForm").hide();
					}
					if(JL.isNull(makeGCJZL.getPluginObj("SDSJ").getData())){
						JL.tip("请输入收单时间","info");
						return false;
						makeGCJZL.getTab().find("#jlSaveForm").hide();
					}
					
					if(JL.isNull(makeGCJZL.getPluginObj("FJFPZP").getData())){
						JL.tip("请上传发票照片","info");
						return false;
						makeGCJZL.getTab().find("#jlSaveForm").hide();
					}
					if(JL.isNull(makeGCJZL.getPluginObj("FJGCZP").getData())){
						JL.tip("请上传工程照片","info");
						return false;
						makeGCJZL.getTab().find("#jlSaveForm").hide();
					}
					if(JL.isNull(makeGCJZL.getPluginObj("JGYSSHB").getData())){
						JL.tip("请上传竣工验收审核表 ","info");
						return false;
						makeGCJZL.getTab().find("#jlSaveForm").hide();
					}
					
					debugger;
					if(makeGCJZL.workflow.bz01!='90442'){
						if(JL.isNull(makeGCJZL.getPluginObj("YSMXBZP").getData())){
							JL.tip("请上传验收明细表照片","info");
							return false;
							makeGCJZL.getTab().find("#jlSaveForm").hide();
						}
					}
					if(makeGCJZL.getTab().find("input[name='SBR']").is(":not(:disabled)")) {
						debugger;
						var SH=makeGCJZL.getPluginObj("SH").getData();
						var JGYSSHB=makeGCJZL.getPluginObj("JGYSSHB").getData();
						if(!JGYSSHB.length>0){
							if(SH.key!="N"){
								if(DY==0){
									JL.tip("请先打印竣工验收审核表再进行提交","info");
									return false;
									makeGCJZL.getTab().find("#jlSaveForm").hide();
								}
							}
						}
					}
					makeGCJZL.getTab().find("#jlSaveForm").click();
				}
			},
		    //删除
		    "jlDeleteForm":{
		    	 "success":function(data,tip){
		    		 debugger
		    		 makeGCJZL.getTab().find("#jlSaveForm").hide();
		    		 makeGCJZL.getTab().find("#jlTJ").hide();
		    	 }
		    },
		    //导出
		    "jlDC":{
		    	"name": "导出",
		    	"func": function(){
		    		debugger;
		    		var data = {},json={},arr=new Array(),sum=0;
		    		var SCLB = makeGCJZL.getPluginObj("SCLB").getData();
		    		json["XH"]="序号";
		    		json["GGXH"]="规格型号";
		    		json["SNJ"]="室内机条码";
		    		json["SWJ"]="室外机条码";
		    		//json["SYDW"]="使用单位";
		    		json["AZDZ"]="名称地址";
		    		json["LXDH"]="联系电话";
		    		//arr[0]={"AZDZ":makeGCJZL.getTab().find("input[name='SYDW']").val()};
		    		for(var i=0;i<SCLB.length;i++){
		    			//SCLB[i]["SYDW"]=makeGCJZL.getTab().find("input[name='SYDW']").val();
		    			SCLB[i]["XH"]=i+1;
		    			arr[sum]=SCLB[i];
		    			sum++;
		    		}
		    		data["data"] = JSON.stringify(arr);
  				  	data["columnName"] = JSON.stringify(json);
  				  	data["DCSJ"]=JL.formatDate(0,1).substr(0,4)+"年"+JL.formatDate(0,1).substr(5,2)+"月"+JL.formatDate(0,1).substr(8,2)+"日";
  				  	data["SYDW"]=makeGCJZL.getTab().find("input[name='SYDW']").val();
  				  	JL.download("makeXSFPSQD/excelExport.do", data);
		    	}
		    },
		    "jlDY":{
			    "name": "打印竣工验收审核表",
			    "icon": "check",
			    "func": function(){
			    	DY=1;
			    	makeGCJZL.readData();
		    		JL.print(35, [makeGCJZL.getData()],"auto");
			    }
		    },
		    "jlDY1":{
			    "name": "打印竣工验收明细表",
			    "icon": "check",
			    "func": function(){
			    	makeGCJZL.readData();
			    	JL.print(34, [makeGCJZL.getData()],"auto");
			    }
		    },
		    "jlCancel" : {},
		    "jlFileView":{},
		    "jlJS":{
			    "name": "经销商结算",
			    "icon": "check",
			    "func": function(){
			    	debugger;
			    	var GCDLD01=makeGCJZL.getTab().find("input[name='GCDLD01']").val();
			    	var queryField={"GCDLD01":GCDLD01};
			    	var resultData = makeGCJZL.getSqlResult(queryField, "MONGO_GCDLD", "CXGCJZL", "scm/gcgl/gcdl/search");
			    	JL.openForm(1049);
			    	var SPLB=resultData.data.resultlist[0]["LX"];
			    	resultData.data.resultlist[0]["SPLB"]=SPLB;
			    	makeJXSJS.setData(resultData.data.resultlist[0]);
			    }
		    },
		    
		}
	},
	"QXCZY01": {
		 "jlid": "JLInput",
		 "AccessCzy": {
			  "QXCZY01": true
		 }
	 },
	 "GCDLD01":{
	 	"dir" : "scm/gcgl/gcdl/search",
		"namespace" : "MONGO_GCDLD",
		"sqlid" : "ZLCXDLD",
		//"radio":true,
		"init": {"GSXX01":"GSXX01"},    
		"fieldMapping" : { 
			"GCDLD01":"GCDLD01",
			"JXSMC":"JXSMC",
			"JXS01":"JXS01",
			"SYDW":"SYDW",
			"SYDWDZ":"SYDWDZ",
			"EJJSXMC":"EJJSXMC",
			"EJJSXDH":"EJJSXDH",
			"LXDH":"LXDH",
			"GCBH":"GCBH",
			"KQBH":"KQBH",
			"LXR":"LXR",
			"YHLXR":"YHLXR",
			"YHDH":"YHSJ",
			"YHXM":"JZLLXR",
			"GCLX":"GCLX",
			"GMDW":"GMDW",
			"AZDZ1":"AZDZ1",
			"AZDZ2":"AZDZ2",
			"GCYT":"GCYT",
			"GCMS":"GCMS",
			"BMMC":"BMMC",
			"JXSDH":"JXSDH",
			"GCDLD01":"GCDLD01",
			"SPLB":"LX",
		    "PFDJ":"PFDJ",
		    "PFSL":"PFSL",
		    "FXSL":"FXSL",
		    "HTSCFJ":"HTSCFJ",
		    "JXSLXR":"JXSLXR",
		    "CJBM":"CJBM",
		    "HTQDRQ":"HTQDSJ",
		    "MJ":"MJ",
		    "PS":"PS",
		    "YQBZ":"BZ",
		    "ZHYCFXSJ":"ZHYCFXSJ"
		    },
		"listener":{
			"aftercallback":function(data){
				makeGCJZL.getPluginObj("JXS01").setData(data[0]["WLDW01"]);
				var data=makeGCJZL.getPluginObj("LX").getData();
				if(data.length!=0){
					for(var i=0;i<data.length;i++){
						var FXSL = data[i]["THSL"]*1;
						var BCZLSL = data[i]["ZLSL"]*1;
//						alert(FXSL+"  "+BCZLSL);
						makeGCJZL.getPluginObj("LX").setCell(FXSL-BCZLSL,i,6);
						//makeGCJZL.getPluginObj("LX").setCell("",i,makeGCJZL.getPluginObj("LX").getRowIndexByID("WBTDH"));
					}
				}
				var EJJSXMC=makeGCJZL.getTab().find("input[name='EJJSXMC']").val();
				if(EJJSXMC==""){
					makeGCJZL.getTab().find("li[name='EJJXS']").hide();
				}
			}
		}
	},
// 下拉控件
 "GCLX" : 
	{
      "jlid":"JLSelect",
	  "options":{"1":"家用","2":"商用(工装)","3":"商用(家装)"}
	 
    },
	 "GCYT" : 
	{
      "jlid":"JLSelect",
	  "options":{"1":"市政机关","2":"医疗卫生","3":"酒店餐饮","4":"金融通讯","5":"交通运输","6":"地产住宅","7":"教育科研","8":"商务办公","9":"商场超市","10":"休闲娱乐","11":"工业生产","12":"文体会馆","13":"沿街商铺","14":"小区","15":"监狱部队","16":"其他"}
	 
    },
    "ZLZT" : 
	{
      "jlid":"JLSelect"
    },
    //"default":"1",
    //"options":{"1":"正常","2":"迟交","3":"逾期"}
//单选
	  "KQBJ" : {
            "jlid": "JLRadio",
			"default": "0",
			"options": {"0":"同意","1":"不同意"}
  },
   "SH" : {
            "jlid": "JLRadio",
			"default": "Y",
			"options": {"Y":"同意","N":"不同意"}
  },
  "JXS01":{
		"jlid": "JLInput", 
		"format": {
		}, 
		"AccessCzy" : {
		    "WLDW01" : true
		}
  	},
// 日期控件
  	"YJAZRQ" : {
        "jlid": "JLDate",
		"endDate": JL.formatDate(10,2)
  	},
  //竣工时间	
  "JGSJ" : {
	  "jlid": "JLDate",
	  "endDate": JL.formatDate(10,2),
	  "listener": {
		  "change":function(){
			  var time=makeGCJZL.getMrzt(makeGCJZL.getPluginObj("SDSJ").getData(),makeGCJZL.getPluginObj("JGSJ").getData());
			  if(time=="正常"){
				  makeGCJZL.getPluginObj("ZLZT").setData({"key":"1","value":"正常"});
			  }else if(time=="迟交"){
				  makeGCJZL.getPluginObj("ZLZT").setData({"key":"2","value":"迟交"});
			  }else if(time=="逾期"){
				  makeGCJZL.getPluginObj("ZLZT").setData({"key":"3","value":"逾期"});
			  }
			  var SDSJ = makeGCJZL.getPluginObj("SDSJ").getData();//收单时间
			  var JGSJ = makeGCJZL.getPluginObj("JGSJ").getData();//竣工时间
			  var ZHYCFXSJ = makeGCJZL.getTab().find("input[name='ZHYCFXSJ']").val();//分销单开单时间
			  debugger;
			  SDSJ = new Date(SDSJ.replace(/-/,"/"));
			  JGSJ = new Date(JGSJ.replace(/-/,"/"));
			  ZHYCFXSJ = new Date(ZHYCFXSJ.replace(/-/,"/"));
			  var date1 = Math.floor((SDSJ.getTime()-ZHYCFXSJ.getTime())/(24*3600*1000));
			  var date2 = Math.floor((SDSJ.getTime()-JGSJ.getTime())/(24*3600*1000));
			  if(!isNaN(date1)){
					 makeGCJZL.getTab().find("input[name='DATE1']").val(date1);
			  }
			  if(!isNaN(date2)){
					 makeGCJZL.getTab().find("input[name='DATE2']").val(date2);
			  }
		  }
	  }
  },
  "SDSJ" : {
      "jlid": "JLDate",
      "endDate": JL.formatDate(10,2),
      "listener": {
		  "change":function(){
			  var time=makeGCJZL.getMrzt(makeGCJZL.getPluginObj("SDSJ").getData(),makeGCJZL.getPluginObj("JGSJ").getData());
			  if(time=="正常"){
				  makeGCJZL.getPluginObj("ZLZT").setData({"key":"1","value":"正常"});
			  }else if(time=="迟交"){
				  makeGCJZL.getPluginObj("ZLZT").setData({"key":"2","value":"迟交"});
			  }else if(time=="逾期"){
				  makeGCJZL.getPluginObj("ZLZT").setData({"key":"3","value":"逾期"});
			  }
			  var SDSJ = makeGCJZL.getPluginObj("SDSJ").getData();//收单时间
			  var JGSJ = makeGCJZL.getPluginObj("JGSJ").getData();//竣工时间
			  var ZHYCFXSJ = makeGCJZL.getTab().find("input[name='ZHYCFXSJ']").val();//分销单开单时间
			  debugger;
			  SDSJ = new Date(SDSJ.replace(/-/,"/"));
			  JGSJ = new Date(JGSJ.replace(/-/,"/"));
			  ZHYCFXSJ = new Date(ZHYCFXSJ.replace(/-/,"/"));
			  var date1 = Math.floor((SDSJ.getTime()-ZHYCFXSJ.getTime())/(24*3600*1000));
			  var date2 = Math.floor((SDSJ.getTime()-JGSJ.getTime())/(24*3600*1000));
			  if(!isNaN(date1)){
					 makeGCJZL.getTab().find("input[name='DATE1']").val(date1);
			  }
			  if(!isNaN(date2)){
					 makeGCJZL.getTab().find("input[name='DATE2']").val(date2);
			  }
		  }
	  }
},
//合同签订时间  
  "HTQDSJ" : {
        "jlid": "JLDate",

		"endDate": JL.formatDate(10,2)
  },
  
//交单时间  
  "JDRQ" : {
        "jlid": "JLDate",
	
		"endDate": JL.formatDate(10,2)
  },
    "FJFPZP" : {
            "jlid": "JLUpload",
            "suffix":["png","jpg","rar","zip"],  //扩展可上传文件类型
            "maxsize":1024*1024*1,
    		"listener": {
    			"loadFile" : function(data) {
    				debugger;
    				var length=$("#d_FJFPZP").find(".img_main").find("li").length;
    				var size=1024*1024-data[data.length-1].FILE_SIZE*1;
    				//var name=data[data.length-1].FILE_DESC;
    				if(size<0){
    					JL.tip("导入照片大小超过1MB","info");
//    					$("#d_FJFPZP").find(".img_main").find("li")[length-1].remove();   //删除照片
    					return true;
    				}
    			}
    		}
  },
    "FJGCZP" : {
        "jlid": "JLUpload",
        "suffix":["png","jpg","rar","zip"],//扩展可上传文件类型
        "maxsize":1024*1024*10,
		"listener": {
			"loadFile" : function(data) {
				debugger;
				var size,message ;
				var length=$("#d_FJGCZP").find(".img_main").find("li").length;
				var configData = JL.getJLconf({"DJLX":"makeGCJZL"});
				//var configData = config.data.linkedCaseInsensitiveMapList;
				if(configData[0].JLCO08 == "FJGCZP"){
					if(configData[0].JLCO04 == "0"){
						//湖南格力
						size = 1024*1024*10-data[data.length-1].FILE_SIZE*1;
						message = "导入照片大小超过10M";
						makeGCJZL.getTab().find("dt[name='hn_gczp']").show();
						makeGCJZL.getTab().find("dt[name='sh_gczp']").hide();
					}else if(configData[0].JLCO04 == "2"){
						size=3*1024*1024-data[data.length-1].FILE_SIZE*1;
						message = "导入照片大小超过3M";
						makeGCJZL.getTab().find("dt[name='hn_gczp']").hide();
						makeGCJZL.getTab().find("dt[name='sh_gczp']").show();
					}
				}else{
					size=3*1024*1024-data[data.length-1].FILE_SIZE*1;
					message = "导入照片大小超过3M";
				}
				
				if(size<0){
//					$("#d_FJGCZP").find(".img_main").find("li")[length-1].remove();   //删除照片
					JL.tip(message,"info");
					return true;
				}
			}
		}
    },
  "JGYSSHB" : {
      "jlid": "JLUploadImage",
      "auto":true
  },
  "BZHTFJ":{
	  "jlid": "JLUpload"
  },
  "HTSCFJ":{
      "jlid": "JLUpload",
      //"fileType" : [ "excel" ],
      //"suffix":["oxps"],
      "listener" : {
			"afterUpload" : function(data) {
				
			}
      }
  },
  //验收明细表照片
  "YSMXBZP":{
	  "jlid": "JLUpload",
	  "fileType" : ["img"],
	  "suffix" : ["pdf"],
	  "maxsize":1024*1024*1,
	  "listener": {
			"loadFile" : function(data) {
				debugger;
				var length=$("#d_YSMXBZP").find(".img_main").find("li").length;
				var size=1024*1024-data[data.length-1].FILE_SIZE*1;
				if(size<0){
					JL.tip("导入验收明细表照片大小超过1MB","info");
					return true;
				}
			}
		}
//	  "maxsize":1024*1024*300 
  },
 "LX" : {
         "jlid": "JLGrid",
         "tittles" : "商品列表", 
          "headers": [
		       {"id": "JLWBDH","name": "分销单号","width": 140},
			   {"id": "SPXX01","name": "商品内码","hidden":true},
               {"id": "SPXX02","name": "商品代码","width": 120},
               {"id": "SPXX04","name": "商品名称","width": 250},
               {"id": "PFDJ","name": "批复单价","width": 150,"align":"right","hidden":true},
               {"id": "PFJE","name": "批复金额","width": 150,"align":"right","hidden":true},
               {"id": "PFSL","name": "批复数量","width": 150,"align":"right","hidden":true},
               {"id": "HTSL","name": "合同数量","hidden": true,"width": 100,"align":"right"},
               {"id": "BCZLSL","name": "资料数量","summary" : "sum","width": 150,"align":"right"},
               {"id": "THSL","name": "分销数量","summary" : "sum","width": 120,"align":"right"},
               {"id": "GCSCSL","name": "收差数量","summary" : "sum","width": 120,"align":"right"},
			   {"id": "SJSL","name": "上交数量","align":"right","hidden":true},
			   {"id": "WSJSL","name": "未上交数量","width": 100,"align":"right"},
			   {"id": "SYBTSL","name": "剩余不提数量","width": 120,"align":"right","hidden":true}, 
			   {"id": "ZLSL","name": "已交资料数量","summary" : "sum","width": 120,"align":"right"},
			   {"id": "YFHSL","name": "已返还数量","summary" : "sum","width": 120,"align":"right"},
			   {"id": "BZJDJ","name": "保证金单价","width": 120,"align":"right","format":"number|2"},
			   {"id": "BCFHBZJ","name": "返还保证金","width": 120,"align":"right","format":"number|2"},
			   {"id": "KHYHD","name": "要货单号","width": 100,"align":"right"},
			   {"id": "JXBZ","name": "备注","width": 220},
			   {"id": "WBTDH","name": "WBTDH","width": 100,"hidden": true},
			   {"id": "AZDZMX","name": "安装地址","width": 200},
			   {"id": "LXRMX","name": "联系人","width": 100},
			   {"id": "LXDHMX","name": "联系电话","width": 100},
			   {"id": "KHYHD01","name": "客户要货单号","width": 100},
			   {"id": "PFDI01","name": "PFDI01","width": 100,"hidden":true},
			   {"id": "DJTDH","name": "DJTDH","width": 100,"hidden":true}
          ],
         "buttons" : [0,2],
         "listener": {
        	 "loadRow":function(Plugin, data, index, dl){
        		 debugger;
        		 console.info(data["BZJDJ"]);
        		 if(data["BZJDJ"]*1==0 || JL.isNull(data["BZJDJ"])){
        			 //当保证金单价为0时设置界面显示
        			 if(!makeGCJZL.pid){
        				 makeGCJZL.getPluginObj("LX").setCell(0, index, 14);
        			 }
        		 }
        		 if(data["BCFHBZJ"]*1==0 || JL.isNull(data["BCFHBZJ"])){
        			 //当保证金单价为0时设置界面显示
        			 if(!makeGCJZL.pid){
        				 makeGCJZL.getPluginObj("LX").setCell(0, index, 15);
        			 }
        		 }
         	  },
		      "rowclick":function(){
			
			  },
			  "rowdblclick":function(){
				
			  },
			  "cellclick":function(){
				
			  }
			}
 	},
 	"SCLB" : {
        "jlid": "JLGrid",
        "tittles" : "验收明细表", 
         "headers": [
              {"id": "GGXH","name": "规格型号","width": 250},
              {"id": "SNJ","name": "室内机条码","width": 150},
              {"id": "SWJ","name": "室外机条码","width": 150},
              {"id": "AZDZ","name": "名称地址","width": 210},
              {"id": "LXDH","name": "联系电话","width": 150}
         ],
        "buttons" : [2,6],
        "listener": {
		      "rowclick":function(){
			  },
			  "rowdblclick":function(){
			  },
			  "cellclick":function(){
			  }
			}
 	},
 	"FJTMSC" : {
        "jlid": "JLUpload",
        "fileType" : [ "excel" ],
        "listener" : {
        	"loadFile":function(data){
				console.info(666);
				debugger;
				/*var XmlData = {};
				XmlData["MBBM"] = 7;  //取MongoDB中excel表的jlbh
				XmlData["FILE"] = data;
				var ajaxJson = {};
				ajaxJson["src"] ="excelHandler/getExcelData.do?rid=" + Math.random();
				ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
				var resultData = JL.ajax(ajaxJson);*/
				//var length=$("#d_FJTMSC").find(".img_main").find("li").length;
				var resultData = JL.getExcelData(7, data);  //获取导入数据
				if(!JL.isNull(resultData)){
					resultData = resultData.data.returnList;
					console.info(resultData);
					if (resultData.length > 0){
						//先判断导入是否有重复条码
						for(var i=0;i<resultData.length;i++){
							//控制条码上次必须为13位
							var SNJ_String = resultData[i]["SNJ"];
							var SWJ_String = resultData[i]["SNJ"];
							if(SNJ_String.length!=13){
								JL.tip("商品【"+resultData[i]["GGXH"]+"】的室内机条码【"+resultData[i]["SNJ"]+"】长度不是13位，请检查后上传!");
								return true;
							}
							if(SWJ_String.length!=13){
								JL.tip("商品【"+resultData[i]["GGXH"]+"】的室外机条码【"+resultData[i]["SWJ"]+"】长度不是13位，请检查后上传!");
								return true;
							}


							if(resultData[i]["SNJ"]==resultData[i]["SWJ"]){
								JL.tip("商品【"+resultData[i]["GGXH"]+"】的室内机条码【"+resultData[i]["SNJ"]+"】重复，请检查后重新导入！");
								return true;
							}
							for(var j=i+1;j<resultData.length;j++){
								if(resultData[i]["SNJ"]==resultData[j]["SNJ"]||resultData[i]["SNJ"]==resultData[j]["SWJ"]){
									JL.tip("商品【"+resultData[i]["GGXH"]+"】的室内机条码【"+resultData[i]["SNJ"]+"】重复，请检查后重新导入！");
									return true;
								}
								if(resultData[i]["SWJ"]==resultData[j]["SWJ"]||resultData[i]["SWJ"]==resultData[j]["SNJ"]){
									JL.tip("商品【"+resultData[i]["GGXH"]+"】的室外机条码【"+resultData[i]["SWJ"]+"】重复，请检查后重新导入！");
									return true;
								}
							}
						}
						/*//获取该单已发信息
						var SCLB = getDRYZ();
						if(!JL.isNull(SCLB)){
							for(var i=0;i<SCLB.length;i++){
								var SPMC=SCLB[i]["GGXH"];
								var SNJ=SCLB[i]["SNJ"];
								var SWJ=SCLB[i]["SWJ"];
								for(var j=0;j<resultData.length;j++){
									if(SNJ==resultData[j]["SNJ"]||SNJ==resultData[j]["SWJ"]){
										JL.tip("商品【"+SPMC+"】的室内机条码【"+SNJ+"】重复，请检查后重新导入！");
										if(length!=0){
											$("#d_FJTMSC").find(".img_main").find("li")[length-1].remove();   //删除照片
										}
										return true;
									}
									if(SWJ==resultData[j]["SWJ"]||SNJ==resultData[j]["SNJ"]){
										JL.tip("商品【"+SPMC+"】的室外机条码【"+SWJ+"】重复，请检查后重新导入！");
										if(length!=0){
											$("#d_FJTMSC").find(".img_main").find("li")[length-1].remove();   //删除照片
										}
										return true;
									}
								}
							}
						}*/
						//判断导入条数是否符合
						var LX=makeGCJZL.getPluginObj("LX").getData();
						var DRTS=0;
						for(var i=0;i<LX.length;i++){
							DRTS+=LX[i]["BCZLSL"]*1;
						}
						if(DRTS==resultData.length){
							makeGCJZL.getPluginObj("SCLB").setData(resultData);//将数据写入到对应的列表控件名grid上。
						}else{
							JL.tip("导入商品与实际商品所需数量不符，请检查后重新导入！","info");
							return true;
						}
					} else {
						JL.tip("读取Excel失败");
					}
				}
			
        	},
			"afterUpload" : function(data) {
			}
        }
 	}
});

makeGCJZL.getMrzt=function(startData,endData){
    //js月份默认是从0开始的所以月份要-1
	debugger;
	var res="";
	if(!JL.isNull(startData) && !JL.isNull(endData)){
		var resultData = makeGCJZL.getSqlResult({}, "MONGO_GCJZL", "QUERYJZLZT", "scm/gcgl/gcdl/search");
		resultData=resultData.data;
		var one=resultData[0]["one"];
		var two=resultData[0]["two"];
		var sDate = new Date(startData);
		var eDate = new Date(endData);
		//(1000 * 60 * 60 * 24) 得到分钟除60000就好了 
		var iDays = Math.floor((sDate - eDate) / 86400000);
		if(iDays<=one){
			res="正常";
		}else if(iDays<=two){
			res="迟交";
		}else{
			res="逾期";
		}
	}
	return res;
};