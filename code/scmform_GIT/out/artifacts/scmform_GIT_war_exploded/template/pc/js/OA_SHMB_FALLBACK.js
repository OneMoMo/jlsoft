var OA_SHMB_FALLBACK = JL.JLForm();

OA_SHMB_FALLBACK.setPlugin({
	"footer":{
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveForm": {},
			"jlPrintForm": {},
			"jlCancel":{},
			"jlDeleteForm":{}
		}
	},
	"ZT":{
		"jlid": "JLInput",
		"css": "w12"
	}
});
OA_SHMB_FALLBACK.setFallBack({
	"SHYJ":"1"	
});
OA_SHMB_FALLBACK.setAfterInit(function() {
	if(JL.checkInitField("OA_SHR", OA_SHMB_FALLBACK)){
		OA_SHMB_FALLBACK.getTab().find("#jlDeleteForm").hide();
	}
});


