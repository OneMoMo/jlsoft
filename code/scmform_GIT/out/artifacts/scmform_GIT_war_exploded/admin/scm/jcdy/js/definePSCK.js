var definePSCK = JL.JLForm();

definePSCK.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds": "CDS",
				"success":function(data,tip){
					console.info('after');
					definePSCK.query();
				}
			},
			"jlCancelSlide" :{
				"cds": "CDS"
			}
		}
	},
	"CK01" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.CK01",
		"readonly": true, 
		"format": { 
		}
	},
	"PSCK01" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.PSCK01",
		"readonly": true, 
		"format": { 
		}
	},
	"SKFS01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SKFS01",
		"format": {
		}
	},
	"PSCKMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PSCKMC",
		"format": {
		}
	},
	"LXDH" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.LXDH",
		"format": {
			"null": false
		}
	},
	"CKDZ" : {
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do",
		"cds": "CDS",
		"cds-field": "LIST.CKDZ",
		"format": {
			"null": false
		}
	},
	"LXR" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.LXR"
	},
	/*"DYCK" : {
		"jlid" : "JLMultiTree",
		"sqlid" : "PUBCX.TREE_CK",
		"clickLoad":false,
		"resource" : "scmform",
		"cds": "CDS",
		"cds-field": "LIST.DYCK"
		",listener":{
			"check":function(data,tip){
				//ck01!=data.key;
				alert("31231");
			}
		}
	},*/
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh"
	},
	"GSXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSXX01"
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi": false,
		"buttons": {
			"jlNew":{
				"listener":{
					"click":function(data){
				  		definePSCK.getPluginObj("GSXX01").setData(userInfo.PCRM_GSXX01);
					}
				}
			}
		},
		
		"title" : [
		   {"id" : "PSCKMC","name" : "配送仓库名称","width" : "w03"}, 
		   {"id" : "LXDH","name" : "联系电话","width" : "w03"}, 
		   {"id" : "CKDZ","name" : "仓库地址","width" : "w03"}, 
		   {"id":"CZ", "name":"操作", "width":"w02"}
		],
		"header" : [
		    {"id" : "PSCKMC","groupid" : "PSCKMC","rowindex" : 1,"title" : "配送仓库名称"}, 
		    {"id" : "LXDH","groupid" : "LXDH","title" : "联系电话"}, 
		    {"id" : "CKDZ","groupid" : "CKDZ","rowindex" : 1,"title" : "仓库地址"}, 
		    {"id" : "edit","groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		    	"config" : {
		    		"readonly": ["PSCKMC"]
		        },
		        "listener": {
			    	"click":function(data){
			    		console.info("HKKKKKKKKKKKKK");
			    		definePSCK.getTab().find("#jlEmptyCard").hide();
			    	
			    	}
		        }
		    }
		]
	}
});

definePSCK.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(data){
		definePSCK.query();
	}
}]);

definePSCK.setAfterInit(function() {
	//加载Grid数据事件
	definePSCK.query();
});

definePSCK.query = function() {
	var queryField={};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var search = definePSCK.getTab().find("[name='PSCK']").val();
	  
	if(!JL.isNull(search)){
		queryField["PSCK"] = search;
	}
	var resultData = definePSCK.getSqlResult(queryField, "MONGO_PSCK", "SCM_PSCK", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	//分页加在更多
	definePSCK.getPluginObj("LIST").setPaging(resultData.fileName); 
};