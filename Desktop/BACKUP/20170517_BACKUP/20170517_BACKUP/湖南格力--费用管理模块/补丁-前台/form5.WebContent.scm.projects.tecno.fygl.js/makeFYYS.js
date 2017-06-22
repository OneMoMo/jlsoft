/**
 * @author :周泽
 * 最后一次修改时间:2016-10-14 17:30:59
 * 类名:费用预算
 */
var makeFYYS = JL.JLForm();
var flag = 0;

makeFYYS.setPlugin({
	"toolbar" : {
	    "jlid": "JLToolBar",
	    "buttons": {
			"jlNewForm":{},
			/*"jlSaveDraft":{},*/
			"jlSaveForm":{
				"success":function(data,tip){
					makeFYYS.getTab().find("input[name=FYYSD01]").val(data.FYYSD01);
					//保存成功提示信息                                            
    		        tip.obj.remove();    //清除公共提示信息。
                    JL.tip("保存成功【单据号："+data.FYYSD01+"】流程待办号："+data.bdbh+"-"+data.jlbh);
				}
			 },
			"jlDeleteForm":{}						
	    }
	},
	
	//代办部门权限
	"BM01":{
		"jlid": "JLInput", 
		"format": {
		}, 
		"AccessCzy" : {
			"BM01" : true
		}
	},
	
    //预算期间
	"YSQJ":{
	    "jlid": "JLDate",
	    "format": "yyyy-mm",
	    "listener":{
	    	"change":function(){
	    		getMonth();
	    	}
	    }
	},
	
	//费用部门
	"FYBMMC":{
		"jlid": "JLSelect",
		"placeholder" : "请选择费用部门",
		"sqlid": "FYYS_FYBM",
		"resource": "scmform",
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]}
	},
	
	//导入
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : ["excel"],
		"listener" : {
			"beforeupload" : function(data) {
				if (JL.isNull(makeFYYS.getPluginObj("YSQJ").getData())) {
					JL.tip("必须先选择预算期间");
					return true;
				}
			},
			"afterUpload" : function(data) {
				makeFYYS.getPluginObj("SPLB").removeAll();
				makeFYYS.find("li[id='BUTTON']").hide();
				makeFYYS.find("li[id='MESSAGE']").hide();
				makeFYYS.getPluginObj("MESSAGE").removeAll();
				debugger;
				var resultData = JL.getExcelData(20, data);  
				if (!JL.isNull(resultData)) {
					resultData = resultData.data.returnList;
					if (resultData.length > 0) {
						var new_SPLB=[];  //存数据
						var error_SPLB=[];  //错误列表
						//查询商品必须的条件
						//将导入的商品带入到底表去查看是否存在
						for(var i=0;i<resultData.length;i++){
							var FYBM = resultData[i]["FYBM"];
							if(FYBM==""){
								var ERROR={};
								ERROR.NUM=i+2;
								ERROR.ERROR="费用编码不允许为空";
								error_SPLB.push(ERROR);
							}else{
								//验证导入的数据是否正确，此处只需判断  入库数量输入的数字是否为数字类型，商品编码和商品名称可以从地表查把导入的数据覆盖
							    //1.验证数量
								var YSJE = resultData[i]["YSJE"];
								if (resultData[i]["YSJE"]*1 <= 0||isNaN(resultData[i]["YSJE"]*1)) {
									var ERROR={};
									ERROR.NUM=i+2;
									ERROR.ERROR="输入的金额必须为数字";
									error_SPLB.push(ERROR);
								}
								if(YSJE==""){
									YSJE=1;
								}
								
								//是否存在该费用编码
								var query={};
								var resultData02 = makeFYYS.getSqlResult(query, "FYYS", "YSFYMX", "scm/projects/tecno/fygl/search");
								if (!JL.isNull(resultData02)) {
									if(resultData02.data.length>0){
										//符合条件的处理
										for(var j=0;j<resultData02.data.length;j++){
											if(FYBM == resultData02.data[j]["FYBM"]){
												resultData02.data[j]["FYBM"]= resultData[i]["FYBM"];
												resultData02.data[j]["FYXM"]= resultData[i]["FYXM"];
												resultData02.data[j]["YSJE"]= resultData[i]["YSJE"];
												new_SPLB.push(resultData02.data[j]);
											}
										}
										if(new_SPLB.length!=i+1){
											var ERROR={};
											ERROR.NUM=i+2;
											ERROR.ERROR="导入费用编码不符合条件或系统中不存在该费用编码";
											error_SPLB.push(ERROR);
										}
									}else{
										var ERROR={};
										ERROR.NUM=i+2;
										ERROR.ERROR="导入的费用编码不符合条件或系统中不存在该费用编码";
										error_SPLB.push(ERROR);
									}
								}
							}
						}
						//有错误信息的显示出来
						makeFYYS.getPluginObj("SPLB").removeAll();
						makeFYYS.getPluginObj("MESSAGE").removeAll();
						if(error_SPLB.length>0){
							makeFYYS.getPluginObj("MESSAGE").setData(error_SPLB);
							makeFYYS.find("li[id='BUTTON']").show();
						}else{
							makeFYYS.getPluginObj("SPLB").setData(new_SPLB);
						}
					}
				}else {
					JL.tip("读取Excel失败");
				}
			}
		}
	},
	
	 //查看错误信息按钮
	  "DRCM":{
		  "jlid":"JLToolBar",
		  "buttons":{
			  "jlDEL":{
				  "name":"查看错误信息按钮",
				  "css": "jl_btn btn_blue",
				  "func":function(data){
					  debugger;
					  if(makeFYYS.find("li[id='MESSAGE']").is(":hidden")){
						  makeFYYS.find("li[id='MESSAGE']").show();
					  }else{
						  makeFYYS.find("li[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	//导入商品错误信息展示
	  "MESSAGE": {
		  "jlid"    : "JLGrid",
		  "tittles" : "错误信息列表",
		  "headers" : [
		       {"id" : "NUM", "name" : "EXCEL行号", "width" : 120},
	           {"id" : "ERROR",   "name" : "错误信息", "width" : 400}
	       ]
	  },
	
	//费用预算明细
	"SPLB":{
	    "jlid": "JLGrid",
	    "tittles" : "费用预算明细", 
	    "headers": [
	                {"id": "FYBM","name": "费用编码","width": 130},
	                {"id": "FYXM","name": "费用项目","width": 130},
	                {"id": "CWKM","name": "财务科目","width": 150},
	                {"id": "YSJE","name": "预算金额","width": 100,"align" : "right","format":"number|2"},
	                {"id": "MORE","name": "前三个月报销情况","width": 150},
	                {"id": "RQ01","name": "","width": 100,"hidden": true},
	                {"id": "RQ02","name": "","width": 100,"hidden": true},
	                {"id": "RQ03","name": "","width": 100,"hidden": true}
	           ],
	           "primarykey" : ["FYBM","FYXM"],
		       "queryConfig":{
			   	   "dir" : "scm/projects/tecno/fygl/search",
			       "namespace" : "FYYS",
			       "sqlid" : "YSFYMX",
				    "form":makeFYYS,
				    "multi":true,
				    "init": {"GSXX01":"GSXX01","YSQJ":"YSQJ","FYBM01":"FYBM01"},
				    "fieldMapping": {			
				    	 	"FYBM":"SPLB.FYBM",
					    	"FYXM":"SPLB.FYXM",
					    	"CWKM":"SPLB.CWKM",
					    	"ONE":"SPLB.RQ01",
					    	"TWO":"SPLB.RQ02",
					    	"THREE":"SPLB.RQ03"
				     	},
			     	"listener": {
		 		    	"beforequery" : function(data){
		 		    		if (JL.isNull(makeFYYS.getPluginObj("YSQJ").getData())) {
		 						JL.tip("必须先选择预算期间");
		 						return true;
		 					}		 			
		 		 		   },
	 			        // 回填前的数据处理
	 			        "beforecallback" : function(data) {},
	 			        // 回填后的数据处理
	 			        "aftercallback" : function(data) {
	 			         makeFYYS.getPluginObj("YSQJ").disabled(true);
	 			        //去查前三个月报销情况
	 			        debugger;
	 			        for(var i=0;i<data.length;i++){
	 			        	var GSXX01 = makeFYYS.getTab().find("input[name='GSXX01']").val();
	 			        	var FYBM01 = makeFYYS.getPluginObj("FYBMMC").getData().key;
	 			        	var YSQJ = makeFYYS.getPluginObj("YSQJ").getData();
	 			        	var FYBM = data[i]["FYBM"];
	 			        	var CWKM = data[i]["CWKM"];
							var resultData = makeFYYS.getSqlResult({"GSXX01":GSXX01,"FYBM01":FYBM01,"YSQJ":YSQJ,"FYBM":FYBM,"CWKM":CWKM}, "FYYS", "YSFYMXQJ", "scm/projects/tecno/fygl/search");
							resultData = resultData.data;
							if(resultData.length>0){
								resultData = resultData[0];
								makeFYYS.getPluginObj("SPLB").setCell(resultData["ONE"], i, makeFYYS.getPluginObj("SPLB").getRowIndexByID("RQ01"));
								makeFYYS.getPluginObj("SPLB").setCell(resultData["TWO"], i, makeFYYS.getPluginObj("SPLB").getRowIndexByID("RQ01"));
								makeFYYS.getPluginObj("SPLB").setCell(resultData["THREE"], i, makeFYYS.getPluginObj("SPLB").getRowIndexByID("RQ01"));
							}else{
								makeFYYS.getPluginObj("SPLB").setCell(0, i, makeFYYS.getPluginObj("SPLB").getRowIndexByID("RQ01"));
								makeFYYS.getPluginObj("SPLB").setCell(0, i, makeFYYS.getPluginObj("SPLB").getRowIndexByID("RQ02"));
								makeFYYS.getPluginObj("SPLB").setCell(0, i, makeFYYS.getPluginObj("SPLB").getRowIndexByID("RQ03"));
							}
						  }
						}
					}
				},	           
	           "buttons" : [0,2,{"text":"导出模板",
					  "css": "drop_menu",
					  "icon": "ffa fa-file-image-o",
					  "func": function(data){
						  debugger;
						  JL.downloadTemplate("费用预算模板",{
							  "FYBM": "费用编码",
							  "FYXM": "费用项目",
							  "YSJE": "预算金额"
						  });
					  }
	  				}]
	},
	
    "SH":{
		  "jlid": "JLRadio",
	      "default" : "Y",
		  "options": {"Y":"同意","N":"不同意"},
		  "fixValue":"Y"
	}
});


makeFYYS.setAfterInit(function() {
	 debugger;
	 makeFYYS.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
	 makeFYYS.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeFYYS.getTab().find("input[name='SHRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	 makeFYYS.getTab().find("input[name='ZDR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeFYYS.getTab().find("input[name='SHR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
	 makeFYYS.getTab().find("input[name='SHRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 makeFYYS.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0,2));
	 //动态获取预算期间前三个月时间回填到SPLB
	 getMonth();

	//对应步骤显示对应的内容
	if(makeFYYS.getTab().find("input[name='ZDRMC']").is(":not(:disabled)")){
		makeFYYS.getTab().find(".step2").hide();
		GetRYMC();
		if(makeFYYS.getTab().find("input[name='SHRMC']").val()!=""){
			makeFYYS.getTab().find(".step2").show();
			makeFYYS.getTab().find("#jlNewForm").hide();
        }
	}if(makeFYYS.getTab().find("input[name='SHRMC']").is(":not(:disabled)")) {
		makeFYYS.getTab().find("#jlNewForm").hide();
		makeFYYS.getTab().find("#jlSaveDraft").hide();
		makeFYYS.getPluginObj("SH").setData({"key":"Y","value":"同意"});
	}
	
	
	 
});

/**
 * 动态获取预算期间前三个月时间回填到SPLB
 */
function getMonth() {
	debugger;
	var YSQJ = makeFYYS.getPluginObj("YSQJ").getData();
	if(JL.isNull(YSQJ)){
		var myDate = new Date();
		var YEAR = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var MONTH = myDate.getMonth()+1;//当前月 
		YSQJ = YEAR +"-"+MONTH;
		makeFYYS.getPluginObj("YSQJ").setData(YSQJ);	
	}
	var month = new Date(YSQJ);//当前月
	var year = month.getFullYear();//当前年
	var FirstMonth = month.getMonth();//前一个月
	var SecondMonth = month.getMonth()-1;//前两个月
	var ThirdMonth  = month.getMonth()-2;//前三个月
	var FirstString="";
	var SecondString="";
	var ThirdString="";
	if(FirstMonth == 0){//去年12月
		var FirstYear = year-1;
		FirstString = FirstYear+"-"+12;
	}else{
		FirstString = year+"-"+FirstMonth;
	}
	if(SecondMonth <= 0){//去年12月
		var SecondYear = year-1;
		SecondMonth = 12+SecondMonth;
		SecondString = SecondYear+"-"+SecondMonth;
	}else{
		SecondString = year+"-"+SecondMonth;
	}
	if(ThirdMonth <= 0){//去年12月
		var ThirdYear = year-1;
		ThirdMonth = 12+ThirdMonth;
		ThirdString = ThirdYear+"-"+ThirdMonth;
	}else{
		ThirdString = year+"-"+ThirdMonth;
	}
	makeFYYS.pluginObj.SPLB.setColumnTitle("RQ01",ThirdString);
	makeFYYS.pluginObj.SPLB.setColumnTitle("RQ02",SecondString);
	makeFYYS.pluginObj.SPLB.setColumnTitle("RQ03",FirstString);
	makeFYYS.getPluginObj("SPLB").hideColumn("MORE", true);
	makeFYYS.getPluginObj("SPLB").hideColumn("RQ01", false);
	makeFYYS.getPluginObj("SPLB").hideColumn("RQ02", false);
	makeFYYS.getPluginObj("SPLB").hideColumn("RQ03", false);

}

/**
 * 加载页面时,申请人根据操作员信息自动带出，允许修改；所属部门默认带出，可以修改；
 */
function GetRYMC(){
	debugger;
	//加载页面时,申请人根据操作员信息自动带出，允许修改；所属部门默认带出，可以修改；
	var YWY_RYXX01 = makeFYYS.getTab().find("input[name='ZDR_RYXX01']").val();
	var GSXX01 = makeFYYS.getTab().find("input[name='GSXX01']").val();
	var resultData = makeFYYS.getSqlResult({"RYXX01":YWY_RYXX01,"GSXX01":GSXX01}, "RYXX", "ALL", "scm/pub/search");
	if(resultData.data.length>0){
		makeFYYS.getPluginObj("BM01").setData(resultData.data[0]["BM01"]);
		makeFYYS.getTab().find("input[name='BMMC']").val(resultData.data[0]["BMMC"]);
	}
}

