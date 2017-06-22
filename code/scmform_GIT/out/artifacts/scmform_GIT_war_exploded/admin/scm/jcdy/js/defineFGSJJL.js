
var defineFGSJJL = JL.JLForm();
defineFGSJJL.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(data){
					debugger;
					console.info(data);
				},
				"success":function(data){
					debugger;
					console.info('after');
					defineFGSJJL.query();
				}
			},
			"jlCancelSlide":{}
		}
	},
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",
		 "format":{}
	},
	"XJGS01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.XJGS01",
		 "format":{}
	},
	"SJGS01" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SJGS01",
		 "format":{},
		 "readonly" : true,

	},
	"SJGSMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.SJGSMC",
		 "format":{},
		 "readonly" : true
	},
	"XJGSMC" : {//下级公司
		"jlid" : "JLSelect",
		"param": {"GSXX01":userInfo["PCRM_GSXX01"]}, 
		"cds":"CDS",
		"cds-field":"LIST.XJGSMC",
		"format":{},
		"placeholder" : "请选择下级公司",
		"sqlid": "PUBCX.Qry_XJGS",
		"resource": "scmform",
		"readonly" : true,
	    "listener": {
            "change":function(data){
                defineFGSJJL.getPluginObj("SJGS01").setData(userInfo["PCRM_GSXX01"]);
                var resultData = defineFGSJJL.getSqlResult({"RYXX01":userInfo["PCRM_CZY02"]}, "GS", "GSXX", "scm/pub/search");
                resultData=resultData.data;
                resultData=resultData[0];
                defineFGSJJL.getPluginObj("SJGSMC").setData(resultData["GSXX02"]);
            }
        }
    },
	"MXLB" : {
        "jlid": "JLGrid",
        "cds":"CDS",
		"cds-field":"LIST.MXLB",
        "tittles" : "明细列表", 
        "headers": [
              {"id": "SPFL","name": "商品分类","width": 300,
                 "editor": {
                	"type": "plugin",
                    "jlid" : "JLMultiTree",
		            "sqlid" : "PUBCX.TREE_SPFL",
		            "resource" : "scmform",
		            "single" : true,
		            "clickLoad":false,
		            "readonly" : true
	                },
              },
              {"id": "PPB","name": "品牌","width": 300,
                "editor": {
                	"type": "plugin",
		            "jlid" : "JLSelect",
		            "sqlid" : "PUBCX.PP",
		            "resource" : "scmform",
		            "single" : true,
		            "readonly" : true
	                },
              },
              {"id": "JJL","name": "加价率","width": 200,"editor":{"type":"text"}
              }
         ],
 		"buttons" : [1,2]
    },
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"buttons": {
			"jlNew": {}
	    },
		"title" : [
			        {"id":"SJGSDM", "name":"上级公司代码", "width":"w02"},
			        {"id":"SJGSMC", "name":"上级公司名称", "width":"w03"},
			        {"id":"XJGSDM", "name":"下级公司代码", "width":"w02"},
			        {"id":"XJGSMC", "name":"下级公司名称", "width":"w02"},
			        {"id":"CZ", "name":"操作", "width":"w01"}
		           ],
		    "header" : [
			 {"id":"jlbh", "hidden":true,"groupid":"SJGSDM","groupid":"SJGSDM","rowindex":4},
			 {"id":"MXLB","hidden":true,"groupid":"SJGSDM","groupid":"SJGSDM","rowindex":4},
			 {"id":"SJGS01", "title":"上级公司代码","groupid":"SJGSDM"},
			 {"id":"SJGSMC","groupid":"SJGSMC", "title":"上级公司名称"},
		     {"id":"XJGS01","groupid":"XJGSDM", "title":"下级公司代码"},
		     {"id":"XJGSMC","groupid":"XJGSMC","title":"下级公司名称"},
             {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit",
	            	 "config":{
		            	 "readonly": ["SJGSDM"]
		             },
		             "listener":{
		        		 "click": function(data, rowIndex, obj, plugin){
		        			 console.info(data);
		        		 }
		        	 }
	           },
	      	 {"id":"delete", "groupid":"CZ","rowindex":1,"title":"删除", "editor":"link",
					 "listener":{
						 "click": function(thisPlugin, rowIndex, obj){
							 var data = thisPlugin.getData(rowIndex);
							 JL.confirm("是否确认删除?", function(){
								 data["S_VALUE"] = "D1";
								 JL.saveForm(defineFGSJJL, data, "删除", {
									 "disabled": false,
									 "success":function(){
										 thisPlugin.removeRow(rowIndex);
									 }
								 });
							 });
						 }
						}
					 }
	    ]
	    }
	});

defineFGSJJL.setEvent([{
	"selector": "#query",
	"event":"click",
	"func":function(){
		defineFGSJJL.query();
	}
}]);

defineFGSJJL.setAfterInit(function() {
	defineFGSJJL.query();
});

defineFGSJJL.query = function(){
	debugger;
	var query={};
	// var search = defineFGSJJL.getTab().find("[name='CXTJ']").val();
	// if(!JL.isNull(search)){
	// 	query["CXTJ"] = search;
	// }
	query["S_VALUE"] = "D1";
	query["SJGS01"] = userInfo["PCRM_GSXX01"];
	debugger;
	var resultData = defineFGSJJL.getSqlResult(query, "MONGO_FGSJJL", "SCM_FGSJJL", "admin/scm/jcdy/search");
	console.info('defineFGSJJL.query');
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post();
	defineFGSJJL.getPluginObj("LIST").setPaging(resultData.fileName); 
};