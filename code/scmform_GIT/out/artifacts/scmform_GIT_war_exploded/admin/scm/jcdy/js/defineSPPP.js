var defineSPPP = JL.JLForm();
defineSPPP.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"grid" : "LIST", // 保存成功后，数据写到对应列表控件上显示。
				"before" : function(data) {
					console.info(data);
				},
				"success":function(data,tip){
					console.info('after');
					defineSPPP.query();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"import" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"pldr" : {
				"name": "批量导入",
				"icon": "",
				"func": function(){
					console.info(this);
					var type = $(this).text();
					if(type == "批量导入"){
						defineSPPP.find("#import").show();
						defineSPPP.getPluginObj("EXCEL").setData([]);
						defineSPPP.find("dl[name='BUTTON']").hide();
						defineSPPP.find("dl[name='MESSAGE']").hide();
						$(this).html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
						
					}else{
						defineSPPP.find("#import").hide();
						$(this).html("批量导入");
					}
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
					  if(defineSPPP.find("dl[name='MESSAGE']").is(":hidden"))
					  {
						  defineSPPP.find("dl[name='MESSAGE']").show();
					  }
					  else
					  {
						  defineSPPP.find("dl[name='MESSAGE']").hide();
					  }
				  }
			  }
		  }
	  },
	  "EXCEL" : {
			"jlid" : "JLUpload",
			"fileType" : [ "excel" ],
			"listener" : {
				"loadFile" : function(data) {
					debugger; 
					var resultData = JL.getExcelData(12, data); 
					var ajaxJson = {};
					ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineSPPP/excelSPPP.do";
					ajaxJson["data"] = {"XmlData": JSON.stringify(resultData.data)};
					var resultData = JL.ajax(ajaxJson);
					errorResultData = resultData["data"]["returnList"];
//					} 
//					
					if(errorResultData != -1){
						console.info("error");
						defineSPPP.find("dl[name='BUTTON']").show();
						defineSPPP.getPluginObj("MESSAGE").setData(errorResultData);
						JL.tip("导入失败！");
						return ture;
						
					}else{
						JL.tip("导入成功！");
						defineSPPP.find("dl[name='BUTTON']").hide();
						defineSPPP.query();
					}
				}
			}
		},
		 "MESSAGE": {
			  "jlid"    : "JLGrid",
			  "tittles" : "错误信息列表",
			  "headers" : [
			       {"id" : "NUM", "name" : "EXCEL行号", "width" : 100},
		           {"id" : "ERROR",   "name" : "错误信息", "width" : 800}
		       ]
		  },
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"GSXX01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w06",
		"cds-field" : "LIST.GSXX01",
		"format" : {}
	},
	"SPPP01" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"css" : "w06",
		"cds-field" : "LIST.SPPP01",
		"format" : {}
	},
	"SPPPMC":{
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SPPPMC",
		"format": {
		}
	},
	"YXBJ" : { 
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
		"default" : "1",
		"options": {"1":"有效","0":"无效"},
		"listener": { 
	    }
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"mode": "edit",
		"buttons" : {
			"jlNew":{},
			"DC": {
				"name":"导出模板",
				"icon":"mail-forward",
				"css":"ml10 mr5",
				"func":function(){
					JL.downloadTemplate("定义商品品牌模板",{
						"SPPPMC":"*商品品牌名称-SPPPMC 填写字符串",
						"YXBJ":"*有效标记-YXBJ 0：无效  1：有效"
			    	});
				}
			}
		},
		"title" : [
	    	{"id":"DM", "name":"品牌编码", "width":"w02"},
	    	{"id":"MC", "name":"品牌名称", "width":"w07"},
	    	{"id":"XG", "name":"有效", "width":"w02"},
	    	{"id":"CZ", "name":"操作", "width":"w01"}
	    ],
	    "header" : [
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"SPPP01", "groupid":"DM", "title":"品牌编码", "editor":"text"},
		    {"id":"SPPPMC", "groupid":"MC", "title":"品牌名称", "editor":"text"}, 
		    {"id":"YXBJ", "groupid":"XG", "title":"有效", "groupcss":"overflow_inherit", "editor":"plugin", 
		    	"config":{
		    		"jlid": "JLCheckbox",
		    		"options": {
	    				"1":"",
		    		}
		    	}
		    }, 
		    {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
				"config":{
					"readonly": ["SPPP01"],
					"mapping":{},
					 "listener":{
                 		 "click": function(thisPlugin, rowIndex, obj){}
					 }
				}
			},
			{"id":"delete", "groupid":"CZ", "rowindex":1, "title":"删除", "editor":"link",
             	 "listener":{
             		 "click": function(thisPlugin, rowIndex, obj){
             			JL.confirm("确认删除?", function(){
             				var selectedIndex = thisPlugin.getSelectedIndex();
             				JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, defineGSZT.initField);
             				defineGSZT.query(); 
       						JL.tip("刪除成功"); 
             			}); 
             		 }
             	 }
            } 
        ]
	}
});

defineSPPP.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineSPPP.query();
	}
}])

defineSPPP.setAfterInit(function() {
	debugger;
	JL.tab(defineSPPP, {
		"PPXX": "品牌信息"
	});
	defineSPPP.query();
});


defineSPPP.query = function() {
	var query={};
	var search = defineSPPP.getTab().find("[name='CXTJ']").val();
	query["S_VALUE"] = {"$ne":"D1"};
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	var resultData = defineSPPP.getSqlResult(query, "MONGO_SPPP", "SCM_SPPP", "admin/scm/jcdy/search");
	console.info('defineSPPP.query');
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineSPPP.getPluginObj("LIST").setPaging(resultData.fileName); 
};