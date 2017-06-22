var SCXW = new JLForm();

SCXW.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"icon" : "",
				"css": "jl_btn btn_color",
				"sBillName": "News",
				"sOperateName": "insert.do"
			}
		}
	},
	"xxlx": {
		"jlid": "JLSelect",
		"sBillName": "form",
		"sOperateName": "find.do",
		"param": {
			"collection": "W_XXLX"
		}
	},
	"image": {
		"jlid": "JLUploadImage",
		"sBillName": "jlresource",
		"sOperateName": "uploadImg.do"
	},
	"file": {
		"jlid": "JLUpload",
		"fileType": ["html"],
		"afterUpload":function(){
			//SCXW.reloadPlugin("WDTP",SCXW.getPlugin("WDTP"));
		}
	}
});

SCXW.setAfterInit(function(){
	//SCXW.getPluginObj("image").disabled();
});

SCXW.setBtnParam({
	
/*	"jlSave": {
		"sBillName": "News",
		"sOperateName": "insert.do"
	}*/
});
