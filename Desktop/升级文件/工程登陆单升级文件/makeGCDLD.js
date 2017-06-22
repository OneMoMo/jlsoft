var makeGCDLD = JL.JLForm();

makeGCDLD.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			//新建
			"jlNewForm":{},
			"jlCancel":{},
			//提交
			"jlSaveForm":{
				"success":function(data,tip){
					debugger;
					makeGCDLD.getTab().find("input[name='GCDLD01']").val(data.GCDLD01);
					makeGCDLD.getTab().find("input[name='SYDWDZ']").val(data.SYDWDZ);
				 //自定义保存成功提示信息          
					tip.obj.remove();    //清除公共提示信息。
					JL.tip("保存成功【单据号："+data.GCDLD01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
					$("body i.fa-times-circle:not(:hidden)").click();
					JL.closeForm("makeGCHT");
				}
			},
      //删除
			"jlDeleteForm":{
      			}
			}
		},
	"DLXH":{
      	"dir" : "scm/gcgl/gcdl/search",
     	"namespace" : "MONGO_GCDLD",
    	"sqlid" : "SCM_GCDLD1",
		"init": {"YHDH":"YHDH"},
		"fieldMapping" : {
			"GCDLD01":"YXDH",
			"JXSMC":"YSJXS"
		}
	},
	"GCGZR":{
      	"dir" : "scm/pub/search",
     	"namespace" : "RYXX",
    	"sqlid" : "GCGZR",
		"init": {"WLDW01":"WLDW01"},
		"fieldMapping" : {
			"GCGZR":"GCGZR",
			"GCGZRDM":"GCGZRDM",
			"GCGZRDH":"GZRDH"
		},
		"listener" : {
			 "beforequery" : function(data){
				 //商用家用要区分 商用为2 家用为1
	    		 data["GCBJ"]=1;
	    		 data["GSXX01"]=makeGCDLD.getTab().find("input[name='GSXX01']:not(:disabled)").val();
	    		 }
		}
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
	"AZDZ1" : {		
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do"
	 },
	  "SCTP" : {		
	            "jlid": "JLUploadImage"
		  },
	  "HTSCFJ" : {
		"jlid" : "JLUpload"
	  },
// 下拉控件
	  "GCLX" : {
	      "jlid":"JLSelect",
	      "default": "1",
		  "options":{"1":"家用"}
	  },
	  "GCYT" : {
			 "jlid":"JLSelect",
			 "sqlid":"GCYT.XLK",
			 "init":{"GCYT":"0"},
			 "resource":"scmform",
			 //"options":{"1":"市政机关","2":"医疗卫生","3":"酒店餐饮","4":"金融通讯","5":"交通运输","6":"地产住宅","7":"教育科研","8":"商务办公","9":"商场超市","10":"休闲娱乐","11":"工业生产","12":"文体会馆","13":"沿街商铺","14":"小区","15":"监狱部队","16":"家装工程","17":"其他"}
		 },
	 //湖南需求：当选择不可核查拍照或者不可核查不可拍照时必须上传承诺函附件
	 "SCCTHFJ":{
			"jlid" : "JLUpload"
	  },
	  
	  //湖南需求：增加是否特殊工程下拉框选项
		 "SFTSGC" : {
			 "jlid":"JLSelect",
			 "options":{"1":"可核查拍照","2":"不可核查可拍照","3":"不可核查不可拍照"},
			 "listener":{
				 "change":function(data){
					 debugger;
					 var SFTSGC = data;//makeGCDLD.getPluginObj("SFTSGC").getData();
					 if(SFTSGC.key=="2" || SFTSGC.key=="3"){
						 debugger;
						 //不可核查可拍照  不可核查不可拍照
						 makeGCDLD.find("li[name='li_sccnhfj']").show();
						 //makeGCDLD.getPluginObj("SCCTHFJ").show();
					 }else if(SFTSGC.key=="1"){
						 debugger;
						 //可核查拍照
						 makeGCDLD.find("li[name='li_sccnhfj']").hide();
					 }
				 }
			 }
		 },
	 "WLDW01": {
		 "jlid": "JLInput",
		 "AccessCzy": {
			  "WLDW01": true
		 }
	 },
	 "QXCZY01": {
		 "jlid": "JLInput",
		 "AccessCzy": {
			  "QXCZY01": true
		 }
	 },
//	 经销商
    "JXSMC":{
    	"dir" : "scm/pub/search",
    	"namespace" : "WLDW",
    	"sqlid" : "KH_ALL",
		"fieldMapping" : {
			"WLDW01":"WLDW01",
			"WLDWMC":"JXSMC",
			"LXDH":"JXSDH",
			"WBBM":"JXSGCBH"
		}/*,
	 "listener" : {
		 "beforequery" : function(data){	
			 debugger;
			 var WLDW01=makeGCDLD.getPluginObj("WLDW01").getData();
			 if (WLDW01) {
				 data["WLDW01"]=WLDW01;
			 	}
    		 }
		}*/
	},
//单选
	"KQBJ" : {
            "jlid": "JLRadio",
			"default": "1",
			"options": {"0":"是","1":"否"},
			"listener": {
			      "click":function(data){//参数data为点击的值，是个json对象
			    	  if(data.key==0){
			    		  makeGCDLD.getTab().find("input[name=KQBH]").removeAttr("readonly","readonly");
			    	  }else{
			    	   	  makeGCDLD.getTab().find("input[name=KQBH]").attr("readonly","readonly");
			       	}
			      }
		    }
	},
	//是否第一登录
	"DYDLBJ" : {
        "jlid": "JLRadio",
		"default": "0",
		"options": {"0":"是","1":"否"},
		"listener": {
		      "click":function(data){//参数data为点击的值，是个json对象
		    	  /*if(data.key==0){
		    		  debugger;
		    		  var BHQCZ=makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val();
			  		  if(BHQCZ==""){
			  			makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val("30");
			  			makeGCDLD.getTab().find("input[name='DQR']:not(:disabled)").val(JL.formatDate(30,1));
			  		  }
			  		  makeGCDLD.getTab().find("li[name='BHQXS']").removeAttr("style","display:none");
			  		  if(BHQCZ!=""&&BHQCZ!=30){
			  			  var gnl=confirm("你是否需要刷新保护期"); 
			  			  if (gnl==true){ 
			  				  makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val("30");
			  				  makeGCDLD.getTab().find("input[name='DQR']:not(:disabled)").val(JL.formatDate(30,1));
			  				  return true; 
			  			  }else{ 
			  				  return false; 
			  			  }
			  		  }
			  		if (makeGCDLD.getTab().find("input[name='PFR']").is(":not(:disabled)")) {
			  			makeGCDLD.getTab().find("li[id='YQAN']").attr("style","display:none");
		    		  }
		    	  }else{
		    		  //隐藏保护期显示项
		    		  makeGCDLD.getTab().find("li[name='BHQXS']").attr("style","display:none");
		       	  }*/
		      }
	    }
   },
   "SH" : {
            "jlid": "JLRadio",
			"default": "Y",
			"options": {"Y":"同意","N":"驳回"}
   },
   "YS" : {
       "jlid": "JLRadio",
		"default": "Y",
		"options": {"Y":"同意","N":"不同意"}
   },
   "DLD" : {
       "jlid": "JLRadio",
		"default": "跟进",
		"options": {"制单":"制单","回复":"回复","跟进":"跟进"}
   },
   "GCJL" : {
       "jlid": "JLCheckbox",
       "options": {"1":""},
       "listener": {
		      "checked":function(data, checked, arr){
		    	  var SPLB = makeGCDLD.getPluginObj("SPLB");
		    	  var SPLBData = SPLB.getData();
		    	  if(checked){
			    //	  var JLJE = (edit/100) * PFDJ * PFSL ;//计算方式
		    		  makeGCDLD.getTab().find("input[name='JLLZB']:not(:disabled)").val("2");
		    		  var  JLLZB  = makeGCDLD.getTab().find("input[name='JLLZB']").val()*1;
		    		  
		    		  makeGCDLD.getTab().find("input[name=JLLZB]").removeAttr("readonly","readonly");
			    	  for(var i=0; i<SPLBData.length; i++){
			    	      var	 PFDJ =  SPLBData[i]["PFDJ"];
			    		  var	 PFSL =  SPLBData[i]["PFSL"];
			    		  var JLJE = (2/100) * PFDJ * PFSL ;//计算方式
			    		  SPLB.setCell(JLLZB , i, SPLB.getRowIndexByID("JLL"));
			    		  SPLB.disabledColumn("JLL", false); 
			    	 if(!JL.isNull(PFDJ) && !JL.isNull(PFSL)){
				    		  SPLB.setCell(JLJE.toFixed(2), i, SPLB.getRowIndexByID("JLJE"));//赋值  
			  		  }
			    	  }
			      } else{
			    	  for(var i=0; i<SPLBData.length; i++){
	                      SPLB.setCell( "" , i, SPLB.getRowIndexByID("JLL"));
	                      SPLB.setCell( "" , i, SPLB.getRowIndexByID("JLJE"));
	                 	 SPLB.disabledColumn("JLL", true);
			    	  }
			    	  makeGCDLD.getTab().find("input[name=JLLZB]").attr("readonly","readonly");
			    	  makeGCDLD.getTab().find("input[name='JLLZB']:not(:disabled)").val("");
		    	  }
		      }
		}
},
// 日期控件
   "YJAZRQ" : {
        "jlid": "JLDate",
        "placeholder" : "请选择日期" ,
        "todayBtn": true ,
        "startDate":JL.formatDate(0,1)
   },
 
 "SPLB":{
         "jlid": "JLGrid",
         "tittles" : "商品列表",
          "headers": [
               {"id": "SPDM","name": "商品代码","width": 100,"hidden": true},
               {"id": "SPMC","name": "商品名称","width": 150,"hidden": true},
               {"id": "SPXX01","name": "商品内码","width": 100,"hidden": true},
               {"id": "GCSPBM","name": "工程商品编码","width": 100},
               {"id": "GCSPMC","name": "工程商品名称","width": 150},
               {"id": "SPGG","name": "商品规格","width": 100,"hidden": true},
               {"id": "JLDW","name": "计量单位","width": 100,"hidden": true},
               {"id": "SQSL","name": "申请数量","width": 100,"align":"right"},
               {"id": "SQDJ","name": "合同单价","width": 100,"align":"right"},
               {"id": "PFSL","name": "批复数量","width": 100,"align":"right"},
			   {"id": "PFDJ","name": "批复单价","width": 100,"align":"right"},
			   {"id": "PFJE","name": "批复金额","width": 100,"align":"right"}, 
			   {"id": "JLL","name": "奖励率%","width": 100,"align":"right","hidden": true}, 
			   {"id": "JLJE","name": "奖励金额","width": 100,"align":"right","hidden": true}, 
			   {"id": "YHSL","name": "要货数量","width": 100,"hidden": true,"align":"right"},
			   {"id": "FXSL","name": "分销数量","width": 100,"hidden": true,"align":"right"},
			   {"id": "DJ","name": "分销单价","width": 100,"align":"right","hidden": true},
			   {"id": "ZZSL","name": "终止数量","width": 100,"hidden": true},
			   {"id": "KKDSL","name": "可开单数量","width": 100,"hidden": true},
			   {"id": "SYBTSL","name": "剩余不提数量","width": 100,"hidden": true},
			   {"id": "BZ","name": "备注","width": 220,"editor":{"type":"text"}},
          ],
          "queryConfig":{
        	  "dir":"scm/pub/search",
             "namespace" : "SPXX",
             "sqlid" : "GCSP_SPXX",
   		     "form":makeGCDLD,
   		     "init": {"GSXX01":"GSXX01","GCBJ":"GCBJ"},
   		     "multi":true,
   		     "fieldMapping": {
   		    	 "SPXX01":"SPLB.SPXX01",
   		    	 "SPGG":"SPLB.SPGG",
   		    	 "SPDM":"SPLB.SPDM",
   		    	 "SPMC":"SPLB.SPMC",
   		    	 "GCSPMC":"SPLB.GCSPMC",
   		    	 "GCSPBM":"SPLB.GCSPBM",
   		    	 "JLDW":"SPLB.JLDW"
//   		    	 "YBDJ":"SPLB.PFDJ"
   		     },
            "listener" : {
	 				"aftercallback" : function() {
	 					debugger;
	 					var SPLB = makeGCDLD.getPluginObj("SPLB").getData();
	 					for (var i = 0; i < SPLB.length; i++) {
	 						var YHSL = SPLB[i]["YHSL"] * 1;
	 						var row = makeGCDLD.getPluginObj("SPLB").getRowIndexByID("YHSL");
	 						if (isNaN(YHSL)) {
	 							makeGCDLD.getPluginObj("SPLB").setCell(0, i, row);
	 						}
	 						var FXSL = SPLB[i]["FXSL"] * 1;
	 						var FXSLrow = makeGCDLD.getPluginObj("SPLB").getRowIndexByID("FXSL");
	 						if (isNaN(FXSL)) {
	 							makeGCDLD.getPluginObj("SPLB").setCell(0, i, FXSLrow);
	 						}
	 						var ZZSL = SPLB[i]["ZZSL"] * 1;
	 						var ZZSLrow = makeGCDLD.getPluginObj("SPLB").getRowIndexByID("ZZSL");
	 						if (isNaN(ZZSL)) {
	 							makeGCDLD.getPluginObj("SPLB").setCell(0, i, ZZSLrow);
	 						}
	 					}
	 				},
	 				"beforequery":function(data,tip){
	 					debugger;
						 //商用家用要区分 商用为2 家用为1
	 					 var GCLX=makeGCDLD.getPluginObj("GCLX").getData();
			    		 data["GCBJ"]=GCLX.key;
					}
	 	       }
   		},     
   		"summary" : {"PFJE":"sum","PFSL":"sum","SQSL":"sum","JLJE":"sum"},
	    "buttons" : [0,2,
	      {"text":"预报价",
	    	"func": function(){
	    		debugger;
				var SPLB = makeGCDLD.getPluginObj("SPLB");
				var data = SPLB.getData();
				if(data.length==0){
					JL.tip("请选择商品后才能点击预报价","info");
					return true;
				}
				for(var i=0;i<data.length;i++){
					var queryField={"SPXX01":data[i]["SPXX01"],"GSXX01":userInfo["PCRM_GSXX01"]};
					var resultData = makeGCDLD.getSqlResult(queryField, "SPXX", "GCSP_SPXX", "scm/pub/search");
					var YBDJ=(resultData.data[0]["YBDJ"]*1).toFixed(2);
					if(YBDJ>0){
						SPLB.setCell(YBDJ, i, SPLB.getRowIndexByID("PFDJ"));	
					}
				}
	    	}
	      }],
  },
  "JDGJ" : {
      "jlid": "JLGrid",
       "headers": [
            {"id": "GJZT","name": "跟进状态","width": 120},
            {"id": "GJSJ","name": "跟进时间","width": 250},
            {"id": "GJR","name": "跟进人","width": 150},
            {"id": "GJSM","name": "跟进说明","width": 200}
       ],
       "buttons" : [1,2],
       "listener": {
    	  
			}
  },
  "AZDZLB" : {
      "jlid": "JLGrid",
      "tittles" : "安装地址列表", 
       "headers": [
            {"id": "AZDZ","name": "安装地址","width": 500, "editor":{
                	"type":"plugin",
                	"jlid": "JLSelectTree",   
                	"sBillName": "JLInterface",
            		"sOperateName": "getDQXX.do",
            		"listener" : { 
            			"change" : function() {
            				debugger;
            				if(makeGCDLD.getTab().find("input[name='GC_GJSJ']").is(":not(:disabled)")){
	 							makeGCDLD.find("#QDHT").hide();
	 							/*debugger
	 							if(makeGCDLD.getPluginObj("AZDZLB").getData() == makeGCDLD.getPluginObj("AZDZLB01").getData()){
	 								makeGCDLD.find("#QDHT").show();
	    	 					}else{
	    	 						makeGCDLD.find("#QDHT").hide();
	    	 					}*/
	 						}
            			},
    	 				"click" : function() {
    	 					
    	 					var AZDZLB = makeGCDLD.getPluginObj("AZDZLB").getData();
    	 					var i=makeGCDLD.getPluginObj("AZDZLB").getSelectedIndex();
	 						var YHXM =makeGCDLD.getTab().find("input[name='YHXM']:not(:disabled)").val();
	 						var LXRrow = makeGCDLD.getPluginObj("AZDZLB").getRowIndexByID("LXR");
	 						if (YHXM) {
	 							makeGCDLD.getPluginObj("AZDZLB").setCell(YHXM, i, LXRrow);
	 						}
	 						var YHDH =makeGCDLD.getTab().find("input[name='YHDH']:not(:disabled)").val();
	 						var LXDHrow = makeGCDLD.getPluginObj("AZDZLB").getRowIndexByID("LXDH");
	 						if (YHDH) {
	 							makeGCDLD.getPluginObj("AZDZLB").setCell(YHDH, i, LXDHrow);
	 						}
	 						
	 						
    	 				},
            		}
            	}
            },
            {"id": "LXR","name": "联系人","width": 120},
            {"id": "LXDH","name": "联系电话","width": 150},
       ],
       "buttons" : [1,2],
       "listener": {}
  }
});

makeGCDLD.setAfterInit(function(){
	debugger;
	var config = JL.getJLconf({"DJLX":"makeGCDLD"});
	var configData = config.data.linkedCaseInsensitiveMapList;
	debugger;
	for(var i = 0; i < configData.length;i++){
		debugger;
		//通过参数控制是否特殊工程显示与隐藏
		if(configData[i].JLCO08 == "SFTSGC"){
			if(configData[i].JLCO04 == "0"){
				debugger;
				 makeGCDLD.find("li[name='li_sftsgc']").show();
			}else if(configData[i].JLCO04 == "2"){
				 makeGCDLD.find("li[name='li_sftsgc']").hide();
			}
		}
		//通过参数控制经销商工程编号显示与隐藏
		if(configData[i].JLCO08 == "JXSGCBH"){
			if(configData[i].JLCO04 == "0"){
				debugger;
				makeGCDLD.find("li[name='li_jxsgcbh']").show();
			}else if(configData[i].JLCO04 == "2"){
				makeGCDLD.find("li[name='li_jxsgcbh']").hide();
			}
		}
		//通过参数控制经销商工程编号显示与隐藏
		if(configData[i].JLCO08 == "YMBTX"){
			debugger;
			var arra = ["SYDW","YHXM","JXRLXR","JXSLXDH"];
			if(configData[i].JLCO04 == "1"){
				for(var j =0;j<arra.length;j++){
					makeGCDLD.getTab().find("input[name="+arra[j]+"]").after("<em class='btx font_red'></em>");
				}

				//隐藏掉面积和匹数的必填项
				makeGCDLD.getTab().find("em[name='mj_ps']").hide();
			}else if(configData[i].JLCO04 == "2"){
				//默认为隐藏
				makeGCDLD.getTab().find("em[name='em_gcgzr']").hide();
				makeGCDLD.getTab().find("em[name='em_yjazsj']").hide();
			}
		}
		
	}
	
	 debugger;
	 makeGCDLD.getTab().find("input[name=JLLZB]").attr("readonly","readonly");
	 makeGCDLD.getTab().find("input[name='SBR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCDLD.getTab().find("input[name='SBR02']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeGCDLD.getTab().find("input[name='SBSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCDLD.getTab().find("input[name='PFR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCDLD.getTab().find("input[name='PFR02']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeGCDLD.getTab().find("input[name='BM01']:not(:disabled)").val(userInfo["PCRM_BM01"]);
	 makeGCDLD.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeGCDLD.getTab().find("input[name='PFSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCDLD.getTab().find("input[name='GC_GJR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCDLD.getTab().find("input[name='GC_GJSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeGCDLD.getTab().find("input[name='GC_HFR']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeGCDLD.getTab().find("input[name='GC_HFSJ']:not(:disabled)").val(JL.formatDate(0,2));
	 
	 debugger;
	 if (makeGCDLD.getPluginObj("QXCZY01").getData().length<=0){
		 makeGCDLD.getPluginObj("QXCZY01").setData(userInfo["PCRM_CZY02"]);
	 }
	  
	 if (makeGCDLD.getTab().find("input[name='SBR']").is(":not(:disabled)")) {
		 makeGCDLD.getPluginObj("SPLB").hideButton(["2"],true);
		 makeQuerry();//加载页面时 查询登陆人的信息 (SCM_JXSZC)
		 makeGCDLD.getTab().find(".step2").hide();
		 makeGCDLD.getTab().find("div[id='GC_GJ']").hide();
		 makeGCDLD.getTab().find("div[id='GC_HF']").hide();
		 debugger;
		 if (makeGCDLD.getPluginObj("SH").getData().value=="驳回") {
			 makeGCDLD.getTab().find(".step2").show();
		 }
		 if( makeGCDLD.getTab().find("input[name='GCGZR']:not(:disabled)").val()==""){
			 var queryField = {};
			//家用商用要区分 家用为1 商用为2
			var GCLX=makeGCDLD.getPluginObj("GCLX").getData();
			queryField["GCBJ"] =GCLX.key;
			queryField["GSXX01"] = userInfo["PCRM_GSXX01"];
			queryField["WLDW01"] = makeGCDLD.getPluginObj("WLDW01").getData();
			var resultData = makeGCDLD.getSqlResult(queryField, "RYXX", "GCGZR", "scm/pub/search");
			resultData = resultData.data;
			if(resultData.length > 0){
				makeGCDLD.getTab().find("input[name='GCGZR']").val(resultData[0]["GCGZR"]);
				makeGCDLD.getTab().find("input[name='GCGZRDM']").val(resultData[0]["GCGZRDM"]);
				makeGCDLD.getTab().find("input[name='GZRDH']").val(resultData[0]["GCGZRDH"]);
			}
		 }
	}
	 if (makeGCDLD.getTab().find("input[name='PFR']").is(":not(:disabled)")) {
			makeGCDLD.getTab().find("#jlNewForm").hide();
			makeGCDLD.getTab().find("#jlSaveDraft").hide();
			makeGCDLD.getTab().find("div[id='GC_GJ']").hide();
			makeGCDLD.getTab().find("div[id='GC_HF']").hide();
			makeGCDLD.getTab().find("#jlDeleteForm").hide();
			makeGCDLD.getPluginObj("SH").setData({"key":"Y","value":"同意"});
			 var SPLB = makeGCDLD.getPluginObj("SPLB");
			 SPLB.disabledColumn("JLL", true);
			 var DYDLBJ=makeGCDLD.getPluginObj("DYDLBJ").getData();
			 if(DYDLBJ.key==0){
				 //默认第一登陆，登陆序号为1
					var DYDL=1;
		  			makeGCDLD.getTab().find("input[name=DLXH]").val(DYDL);
		  			/*makeGCDLD.getTab().find("li[id='YQAN']").attr("style","display:none");
		  			var BHQCZ=makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val();
		  			if(BHQCZ==""){
		  				makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val("30");
		  				makeGCDLD.getTab().find("input[name='DQR']:not(:disabled)").val(JL.formatDate(30,1));
		  			}*/
			 }
	 }
	 if (makeGCDLD.getTab().find("input[name='GC_GJR']").is(":not(:disabled)")) {
		 makeGCDLD.getPluginObj("SPLB").hideButton(["2"],true);
			makeGCDLD.getTab().find("#jlNewForm").hide();
			makeGCDLD.getTab().find("#jlSaveDraft").hide();
			makeGCDLD.getTab().find("div[id='GC_HF']").hide();
			debugger;
			makeGCDLD.getPluginObj("DLD").setData({"key":"跟进","value":"跟进"});
			var queryField={"DLZH":userInfo["PCRM_CZY02"]};
			var resultData = makeGCDLD.getSqlResult(queryField, "JXSJB", "CZY", "scm/pub/search");
			if (resultData.data.length > 0) {
				if (resultData.data[0]["JXSJB"] >= 1) {// 是否为经销商
					makeGCDLD.getTab().find("input[name=DLXH]").attr("readonly","readonly");
					makeGCDLD.getPluginObj("SH").disabled();
					makeGCDLD.getPluginObj("DYDLBJ").disabled();
					makeGCDLD.getTab().find("li[name='YSJXSYC']").attr("style","display:none");
				}
			}
			var DYDLBJ=makeGCDLD.getPluginObj("DYDLBJ").getData();
			if(DYDLBJ.key==1){
				makeGCDLD.getTab().find("li[name='BHQXS']").attr("style","display:none");
			}
	 }
	 if (makeGCDLD.getTab().find("input[name='GC_HFR']").is(":not(:disabled)")) {
			makeGCDLD.getTab().find("#jlNewForm").hide();
			makeGCDLD.getTab().find("#jlSaveDraft").hide();
			makeGCDLD.getTab().find("#jlDeleteForm").hide();
			var SPLB = makeGCDLD.getPluginObj("SPLB");
			 SPLB.disabledColumn("JLL", true);
	 }
		if(makeGCDLD.getTab().find("input[name='SPR']").is(":not(:disabled)")){
			makeGCDLD.getTab().find("#jlNewForm").hide();
		}
		if(JL.isNull(makeGCDLD.pid)&& JL.isNull(makeGCDLD.getTab().find("input[name='DLXH']").val())){
			debugger;
			makeGCDLD.getTab().find(".step2").hide();
		}
	 JL.setInitFieldData(this, {
		"GC_GJR": userInfo.PCRM_CZY03,
		"GC_GJSJ": JL.formatDate(0, 2),
		"GC_GJQK": "",
		"GC_HFR": userInfo.PCRM_CZY03,
		"GC_HFSJ": JL.formatDate(0, 2),
		"GC_HFYJ": ""
	});
	 
	 
	 
	 makeGCDLD.getPluginObj("SPLB").setAfterEdit(function(grid, id, x, y, old, edit){
			//	参数grid为当前控件对象，参数id为列id名，参数x为行号，参数y为列号，参数edit当前输入项
				        var datas = grid.getData();
				        var SQSL=datas[x]["SQSL"];
				        if(id=="SQSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("申请数量必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("SQSL"));
								return false;
				        	}
		                }
				        if(id=="SQDJ"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("申请价格必须大于0,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("SQDJ"));
								return false;
				        	}
				        	if(SQDJ){
								grid.setCell((SQDJ).toFixed(2), x, grid.getRowIndexByID("SQDJ"));//赋值
							}
		                }
				        var PFDJ = datas[x]["PFDJ"] * 1;//获取值
						var PFSL = datas[x]["PFSL"] * 1;//获取值
					    var JLL = datas[x]["JLL"] * 1;//获取值
					    
				        if(id=="PFDJ"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		do {
									JL.tip("批复单价必须大于0,且必须为数字");
								} while (condition);
								grid.setCell( "" , x, grid.getRowIndexByID("PFDJ"));
								return false;
				        	}
				        	if(PFDJ){
								grid.setCell((PFDJ).toFixed(2), x, grid.getRowIndexByID("PFDJ"));//赋值
							}

				         	if(JLL){
				         		 if(!JL.isNull(datas[x]["PFDJ"] ) && !JL.isNull(datas[x]["PFSL"] )){
				        		var JLJE = (JLL/100) * PFDJ * PFSL ;//计算方式
				        		grid.setCell(JLJE.toFixed(2), x, grid.getRowIndexByID("JLJE"));//赋值
				         	  }
				         	}
				        	if(PFSL){
				        		var PFJE = (PFDJ * PFSL)*1 ;//计算方式
				        		grid.setCell((PFJE).toFixed(2), x, grid.getRowIndexByID("PFJE"));//赋值
				        		grid.setCell(0, x, grid.getRowIndexByID("SYBTSL"));
				        	}
				        	if(SQSL){
				        		var PFJE = (PFDJ * SQSL)*1 ;//计算方式
				        		grid.setCell((PFJE).toFixed(2), x, grid.getRowIndexByID("PFJE"));//赋值
				        	}
		                }
				   
				        if(id=="JLL"){
				        	if(edit*1<0||isNaN(edit*1)||edit*1>100){
				        		JL.tip("奖励率不能小于0或大于100,且必须为数字");
				        		grid.setCell( "" , x, grid.getRowIndexByID("JLL"));
				        		grid.setCell( "" , x, grid.getRowIndexByID("JLJE"));
								return false;
				        	}	
				        	if(!JL.isNull(datas[x]["PFDJ"] ) && !JL.isNull(datas[x]["PFSL"] )){
				        		var JLJE = (edit/100) * PFDJ * PFSL ;//计算方式
				        		grid.setCell(JLJE.toFixed(2), x, grid.getRowIndexByID("JLJE"));//赋值
				      	  	}
				        }
				       
				       
				        if(id=="PFSL"){
				        	if(edit*1<=0||isNaN(edit*1)){
				        		JL.tip("批复数量必须大于0,且必须为数字");
				        		grid.setCell("", x, grid.getRowIndexByID("PFSL"));
				        		grid.setCell("", x, grid.getRowIndexByID("KKDSL"));//赋值
								return false;
				        	}
				           
				        	if(PFSL>SQSL){
				        		JL.tip("批复数量不能大于申请数量");
				        		grid.setCell("", x, grid.getRowIndexByID("PFSL"));
				        		grid.setCell("", x, grid.getRowIndexByID("KKDSL"));//赋值
								return false;
				        	}
				       
				        	if(PFDJ){
				        		var PFJE = (PFDJ * PFSL)*1 ;//计算方式
				        		grid.setCell((PFJE).toFixed(2), x, grid.getRowIndexByID("PFJE"));//赋值
				        	}
				        	
				         	if(JLL){
				         		  if(!JL.isNull(datas[x]["PFDJ"] ) && !JL.isNull(datas[x]["PFSL"] )){
				        		var JLJE = (JLL/100) * PFDJ * PFSL ;//计算方式
				        		grid.setCell(JLJE.toFixed(2), x, grid.getRowIndexByID("JLJE"));//赋值
				         		  }
				         	}
				        	grid.setCell(PFSL, x, grid.getRowIndexByID("KKDSL"));//赋值
			        		grid.setCell(0, x, grid.getRowIndexByID("SYBTSL"));
				        }
		
	 		});
	 makeGCDLD.getPluginObj("AZDZLB").setAfterEdit(function(grid, id, x, y, old, edit){
			//	参数grid为当前控件对象，参数id为列id名，参数x为行号，参数y为列号，参数edit当前输入项
				        var datas = grid.getData();
				        var AZDZ=datas[x]["AZDZ"];
		});
	 
	 debugger;
	 
	/* //隐藏签订合同按钮
		if(makeGCDLD.getTab().find("input[name='GC_GJR']").is(":not(:disabled)")){
			 //隐藏签订合同按钮
			 debugger;
			 	var queryField={"GCDLD":makeGCDLD.find("input[name='GCDLD01']").val()};
				var resultData = makeGCDLD.getSqlResult(queryField, "MONGO_GCDLD", "SCM_AZDZLB01", "scm/gcgl/gcdl/search");
				//makeGCDLD.getPluginObj("AZDZLB01").setData(resultData.data[0].AZDZLB);
				var SYDW = resultData.data[0].SYDW;
				debugger;
				 $("#SYDW").on("change",function(){
					 if(makeGCDLD.find("input[name='SYDW']").val() == SYDW){
						 makeGCDLD.find("#QDHT").show();
					 }else{
						 //隐藏合同按钮QDHT
						 makeGCDLD.find("#QDHT").hide();
					 }
				});
			
				 
		}*/
});
makeGCDLD.setEvent([ 
{
	"selector" : "[name='DLXH']",
	"event" : "change",
	"func" : function() {
		var DLXH = makeGCDLD.getTab().find("input[name='DLXH']:not(:disabled)").val();
		if(!/^[0-9][0-9]*$/.test(DLXH)){
			makeGCDLD.getTab().find("input[name='DLXH']:not(:disabled)").val("");
            JL.tip("请输入整数");
            return false;
        }
   }
},
{
	"selector" : "[name='SYDW']",
	"event" : "change",
	"func" : function() {
		var SYDW = makeGCDLD.getTab().find("input[name='SYDW']:not(:disabled)").val();
		makeGCDLD.getTab().find("input[name='GMDW']:not(:disabled)").val(SYDW);
		//当在跟进状态下时  改变使用单位的值时  隐藏签订合同按钮
		if(makeGCDLD.getTab().find("input[name='GC_GJR']").is(":not(:disabled)")){
			 makeGCDLD.find("#QDHT").hide();
		}
	}
},
{
	"selector" : "[name='YHXM']",
	"event" : "change",
	"func" : function() {
		var YHXM = makeGCDLD.getTab().find("input[name='YHXM']:not(:disabled)").val();
		makeGCDLD.getTab().find("input[name='LXR']:not(:disabled)").val(YHXM);
	}
},
{
	"selector" : "[name='YHDH']",
	"event" : "change",
	"func" : function() {
		var YHDH = makeGCDLD.getTab().find("input[name='YHDH']:not(:disabled)").val();
		makeGCDLD.getTab().find("input[name='LXDH']:not(:disabled)").val(YHDH);
	}
},
{
	"selector" : "[name='JLLZB']",
	"event" : "keyup",
	"func" : function() {
		var SPLB = makeGCDLD.getPluginObj("SPLB");
		var SPLBData = SPLB.getData();
		var  JLLZB  = makeGCDLD.getTab().find("input[name='JLLZB']").val()*1;
		if(JLLZB>100||JLLZB<0||isNaN(JLLZB*1))
		{
	 		JL.tip("奖励率不能小于0或大于100,且必须为数字");
			makeGCDLD.getTab().find("input[name='JLLZB']:not(:disabled)").val("");
			return false;
		}

	  for(var i=0; i<SPLBData.length; i++){
	      var	 PFDJ =  SPLBData[i]["PFDJ"];
		  var	 PFSL =  SPLBData[i]["PFSL"];
  		  var JLJE = (2/100) * PFDJ * PFSL ;//计算方式
  		  SPLB.setCell(JLLZB , i, SPLB.getRowIndexByID("JLL"));
  		 // SPLB.disabledColumn("JLL", false); 
		  if(!JL.isNull(PFDJ) && !JL.isNull(PFSL)){
  		  SPLB.setCell(JLJE.toFixed(2), i, SPLB.getRowIndexByID("JLJE"));//赋值
		  }
		  if(JLLZB){
			  if(!JL.isNull(PFDJ) && !JL.isNull(PFSL)){
				  var JLJE = (JLLZB/100) * PFDJ * PFSL ;//计算方式
	  		  SPLB.setCell(JLJE.toFixed(2), i, SPLB.getRowIndexByID("JLJE"));//赋值
			  }
		  }
	  }
	}
},/*,{
	"selector" : ["a[name='YQ']"],
	"event": "click",
	"func": function(){
		debugger;
		if(makeGCDLD.getPluginObj("DYDLBJ").getData().key=="0"){
			var BHQ=makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val()*1;
			if(BHQ<5){
				var yqbj=makeGCDLD.getTab().find("input[name='YQBJ']:not(:disabled)").val()*1;
				if(yqbj==0){
					var yqbj=makeGCDLD.getTab().find("input[name='YQBJ']:not(:disabled)").val()*1;
					var yqcs=makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val()*1;
					if(yqcs==0){
						makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val("1");
					}else{
						makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val(yqcs+1);
					}
					var yqcs2=makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val();
					if (yqcs2>6) {
						JL.tip("延期次数不能超过6次。");
						makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val("6");
						return false;
					}
					makeGCDLD.getTab().find("input[name='DQR']:not(:disabled)").val(JL.formatDate(30,1));
					makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val("30");
					//延期标记赋值
					makeGCDLD.getTab().find("input[name='YQBJ']:not(:disabled)").val("1");
				}else{
					JL.tip("已经延期。");
					return false;
				}
			}else{
				JL.tip("保护期少于5天，才能进行延期操作");
				return false;
			}
		}else{
			JL.tip("不是第一登陆，不存在保护期");
			return false;
		}
	}
}*/
//通过参数控制家用及商用及延期次数和延期天数
/*{
	"selector" : ["a[name='YQ']"],
	"event": "click",
	"func": function(){
		debugger;
		if(makeGCDLD.getPluginObj("DYDLBJ").getData().key=="0"){
			var BHQ=makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val()*1;
			if(BHQ<5){
				debugger;
				var config = JL.getJLconf({"DJLX":"GCDLD_YQ_JY"});
				var configData = config.data.linkedCaseInsensitiveMapList;
				var ExtensionDays,DelayTimes;
				$(configData).each(function(i,n){
					debugger;
					if(n.JLCO08 == "JY_YQTS"){
						//ExtensionDays 延期天数
						ExtensionDays = n.JLCO04;
					}
					if(n.JLCO08 == "JY_YQCS"){
						//DelayTimes 延期次数
						DelayTimes = n.JLCO04;
					}
				});
				debugger;
				var yqbj=makeGCDLD.getTab().find("input[name='YQBJ']:not(:disabled)").val()*1;
				if(yqbj==0){
					var yqbj=makeGCDLD.getTab().find("input[name='YQBJ']:not(:disabled)").val()*1;
					var yqcs=makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val()*1;
					if(yqcs==0){
						makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val("1");
					}else{
						makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val(yqcs+1);
					}
					var yqcs2=makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val();
					if (yqcs2>DelayTimes) {
						JL.tip("延期次数不能超过"+DelayTimes+"次。");
						makeGCDLD.getTab().find("input[name='YQCS']:not(:disabled)").val(DelayTimes);
						//延期标记赋值
						makeGCDLD.getTab().find("input[name='YQBJ']:not(:disabled)").val("1");
						return false;
					}
					makeGCDLD.getTab().find("input[name='DQR']:not(:disabled)").val(JL.formatDate(ExtensionDays,1));
					makeGCDLD.getTab().find("input[name='BHQ']:not(:disabled)").val(ExtensionDays);
					
				}else{
					JL.tip("已经延期。");
					return false;
				}
			}else{
				JL.tip("保护期少于5天，才能进行延期操作");
				return false;
			}
		}else{
			JL.tip("不是第一登陆，不存在保护期");
			return false;
		}
	}
}*/
]);

//加载页面时 查询登陆人的信息 (SCM_JXSZC)
function makeQuerry() {
	debugger;
	var queryField={"DLZH":userInfo["PCRM_CZY02"]};
	var resultData = makeGCDLD.getSqlResult(queryField, "JXSJB", "CZY", "scm/pub/search");
	if(resultData.data.length!=0){
		if(resultData.data[0]["JXSJB"]==2){//二级经销商
			var resultData01 = makeGCDLD.getSqlResult(queryField, "MONGO_JXSZC", "SCM_JXSZC", "scm/gcgl/gcdl/search");
			console.info(resultData01.data);
			var JXSMC = resultData01.data[0]["KHMC"];
			var JXSDH = resultData01.data[0]["LXDH"];
			var EJJSXMC = resultData01.data[0]["ERJXSGSQC"];
			var EJJSXDH = resultData01.data[0]["YDDH"];
			var WLDW01 = resultData01.data[0]["WLDW01"];
			makeGCDLD.getPluginObj("WLDW01").setData(WLDW01);
			makeGCDLD.getTab().find("input[name='JXSMC']:not(:disabled)").val(JXSMC);
			makeGCDLD.getTab().find("input[name='JXSDH']:not(:disabled)").val(JXSDH);
			makeGCDLD.getTab().find("input[name='EJJSXMC']:not(:disabled)").val(EJJSXMC);
			makeGCDLD.getTab().find("input[name='EJJSXDH']:not(:disabled)").val(EJJSXDH);
		}
		if(resultData.data[0]["JXSJB"]==1){//一级经销商
			var queryField02={};
			var resultData02 = makeGCDLD.getSqlResult(queryField02, "WLDW", "KH_ALL", "scm/pub/search");	
				var JXSMC = resultData02.data[0]["WLDWMC"];
				var JXSDH = resultData02.data[0]["LXDH"];
				var WLDW01 = resultData02.data[0]["WLDW01"]
				makeGCDLD.getPluginObj("WLDW01").setData(WLDW01);
				makeGCDLD.getTab().find("input[name='JXSMC']:not(:disabled)").val(JXSMC);
				makeGCDLD.getTab().find("input[name='JXSDH']:not(:disabled)").val(JXSDH);
				makeGCDLD.getTab().find("li[id='ejjsxmc']").hide();
				makeGCDLD.getTab().find("li[id='ejjsxdh']").hide();
				makeGCDLD.getTab().find("li[id='kong']").hide(); 
		}
	}else{
		makeGCDLD.getTab().find("li[id='ejjsxmc']").hide();
		makeGCDLD.getTab().find("li[id='ejjsxdh']").hide();
		makeGCDLD.getTab().find("li[id='kong']").hide(); 
	}
}


