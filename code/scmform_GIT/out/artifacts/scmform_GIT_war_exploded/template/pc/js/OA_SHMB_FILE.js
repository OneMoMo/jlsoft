var OA_SHMB_FILE = JL.JLForm();

OA_SHMB_FILE.setPlugin({
	"footer":{
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveForm": {},
			"jlPrintForm": {}
		}
	},
	"BT":{
		"jlid": "JLInput",
		"css": "w12"
	},
	"SQR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"SQSJ":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"SQRBM":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w12"
	},
	"SQRFJ":{
		"jlid": "JLUpload"
	},
	"SPZT":{
		"jlid": "JLRadio",
		"default": "同意",
    	"options":{"同意":"同意","不同意":"不同意"}
	},
	"SPR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"SPSJ":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"SPFJ":{
		"jlid": "JLUpload"
	},
	"LIST":{
		"jlid": "JLLayoutGrid",
		"style": "jl_list_05",
		"multi": false,
		"header": [
		    {"id":"SPR_NAME", "title":"审批人", "groupcss":"w01 p0 ellipsis", "css":"w12"},
		    {"id":"SPR", "title":"审批人", "editor":"text", "groupcss":"w03", "css":"ml01 w10"},
		    {"id":"SPSJ_NAME", "title":"审批时间", "groupcss":"w01 p0 ellipsis"},
		    {"id":"SPSJ", "title":"审批时间", "editor":"text", "groupcss":"w03", "css":"ml01 w10"},
		    {"id":"SPZT_NAME", "title":"审批状态", "groupcss":"w01 p0 ellipsis", "css":"w12"},
		    {"id":"SPZT", "title":"审批状态", "editor":"plugin", "groupcss":"w03", "css":"w12", 
		    	"config":{
		    		"jlid": "JLRadio",
		    		"options":{"同意":"同意","不同意":"不同意"}
		    	}
		    },
		    {"id":"SPFJ_NAME", "title":"审批附件", "groupcss":"w01 p0 ellipsis"},
		    {"id":"SPFJ", "title":"审批状态", "editor":"plugin", "groupcss":"w11", "css":"w12", 
		    	"config":{
		    		"jlid": "JLUpload"
		    	}
		    },
		    {"id":"SPYJ_NAME", "title":"审批意见", "groupcss":"w01 p0 ellipsis"},
		    {"id":"SPYJ", "title":"", "editor":"text", "groupcss":"w11", "css":"w12"}
		],
	}
});

OA_SHMB_FILE.setAfterInit(function() {
	/*OA_SHMB_FILE.getPluginObj("LIST").addData([{
		"A1": "审批状态",
		"A": "不同意",
		"B1": "审批人",
		"B":2,
		"C1": "审批时间",
		"C":3,
		"D1": "审批意见",
		"D":4
	}, {
		"A1": "审批状态",
		"A": "同意",
		"B1": "审批人",
		"B":2,
		"C1": "审批时间",
		"C":3,
		"D1": "审批意见",
		"D":4
	}]);
*/
	OA_SHMB_FILE.getPluginObj("LIST").disabledCurrentData(true);
	
	if(OA_SHMB_FILE.getPluginObj("LIST").getData().length == 0){
		OA_SHMB_FILE.getTab().find("#YSH").hide();
	}
	
	console.info(!JL.checkInitField("SPR", OA_SHMB_FILE));
	console.info(JL.isNull(OA_SHMB_FILE.getPluginObj("SPR").getData()));
	if(!JL.checkInitField("SPR", OA_SHMB_FILE) && JL.isNull(OA_SHMB_FILE.getPluginObj("SPR").getData())){
		OA_SHMB_FILE.getTab().find("#DSH").hide();
	}
	
	JL.setInitFieldData(OA_SHMB_FILE, {
		"SQR": userInfo.PCRM_CZY03,
		"SQSJ": JL.formatDate(0, 2),
		"SQRBM": userInfo.PCRM_BM02,
		"SPR": userInfo.PCRM_CZY03,
		"SPSJ": JL.formatDate(0, 2)
	});
});


