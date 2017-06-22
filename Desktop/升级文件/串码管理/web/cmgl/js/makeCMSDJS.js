var makeCMSDJS = JL.JLForm();

// 设置控件
makeCMSDJS.setPlugin({
	"toolbar" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlNewForm" : {},
            "jlTJ":{
                "name":"提交",
                "func":function(){
                	debugger;
                	var SPLB = makeCMSDJS.getPluginObj("SPLB").getData();
                	if(SPLB.length != 0){
                        var ajaxJson = {};
                        ajaxJson["src"] = pubJson.getURL("FormUrl") + "/makeCMSDJS/TJData.do";
                        ajaxJson["data"] = {"XmlData": JSON.stringify(makeCMSDJS.getPluginObj("SPLB").getData())};
                        var resultData = JL.ajax(ajaxJson);
                        JL.tip("提交成功","info");

					}

                }
            },

		}
	},
	"EXCEL" : {
		"jlid" : "JLUpload",
		"fileType" : [ "excel" ],
		"listener" : {
			"loadFile" : function(data) {
				debugger;
				makeCMSDJS.getPluginObj("SPLB").removeAll();
				var XmlData = {};
				XmlData["MBBM"] = 41;
				XmlData["FILE"] = data;
				var ajaxJson = {};
				ajaxJson["src"] = "excelHandler/getExcelData.do?rid="+ Math.random();
				ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
				var resultData = JL.ajax(ajaxJson);
				if (!JL.isNull(resultData)){
					debugger;
					makeCMSDJS.getPluginObj("SPLB").setData(resultData.data.returnList);
				}
			},
			"removefile":function (data) {
                makeCMSDJS.getPluginObj("SPLB").setData({});
            }
			
		}
	},
		

  // 商品列表
  "SPLB" : {
    "jlid"    : "JLGrid",
    "tittles" : "商品列表",
    "headers" : [
     	  {"id" : "CM",      "name" : "串码",   "width" : 350},
	      {"id" : "SDBJ",      "name" : "锁定标记(0,锁定；1,解锁)",   "width" : 100}
    ],
    // 商品列表工具栏按钮
    "buttons" : [2, {"text":"导出模板","css": "drop_menu","icon": "ffa fa-file-image-o","func": function(data)
    	                   {
						    	JL.downloadTemplate("串码锁定解锁模板",{
						    	    "CM": "串码",
						    	    "SDBJ": "锁定标记(0,锁定；1,解锁)",

						    	});
						   }
    				}
    	]
  }
	
});

// 界面初始化调用方法
makeCMSDJS.setAfterInit(function() {
  // 初始化公司信息
  makeCMSDJS.getTab().find("input[name='GSXX01']:not(:disabled)").val(userInfo["PCRM_GSXX01"]);
  // 初始化流程步骤相关数据-制单
  makeCMSDJS.getTab().find("input[name='ZDR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
  makeCMSDJS.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
  makeCMSDJS.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0, 2));


});
