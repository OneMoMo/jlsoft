var OA_SHMB_FALLBACK = JL.JLForm();

OA_SHMB_FALLBACK.setPlugin({
	"ZT": {
		"jlid": "JLInput",
		"placeholder": "请填写主题"
	},
	/*"ZT" : {
		"jlid":"JLSearch_Mobile",
		"hot":"SPXX",
		"placeholder": "请选择供应商",
		"queryConfig":{
			"dir": "scm/pub/search",
			"namespace": "WLDW",
			"sqlid": "GYS_HT_YX",
			"init": {
				"GSXX01": "GSXX01"
			},
			"fieldMapping" : {
				"WLDW01": "WLDW01",
				"WLDWMC": "ZT",
				"BM01": "BM01",
				"BMMC": "BMMC",
				"GHHT01": "GHHT01",
				"HZFS": "HZFS",
				"HZFSMC": "HZFSMC"
			}
		}
	},*/
	"footer": {
		"jlid": "JLToolBar",
		"buttons":{
			"jlSaveForm": {
				
			}
		}
	}
});
OA_SHMB_FALLBACK.setFallBack({
	"SHYJ":"1"	
});

OA_SHMB_FALLBACK.setEvent([{
	"selector": "#SQ",
	"event":"click",
	"func": function(){
		if($(this).next().is(":hidden")){
			OA_SHMB_FALLBACK.find("#OA_SQ").slideDown();
		}else{
			OA_SHMB_FALLBACK.find("#OA_SQ").slideUp();
		}
	}
}]);

OA_SHMB_FALLBACK.setAfterInit(function() {

});