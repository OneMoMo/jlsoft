JL.Template = {
	"OA_PROCESSCY": {
			"path": pubJson.getURL("FormUrl") + "/jllib/jllib_"+JL.getClient()+"/template/"
	},
	"OA_PROCESS": {
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_"+JL.getClient()+"/template/"
	},
	"DIALOG": {
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_"+JL.getClient()+"/template/"
	},
	"GC_DIALOG": {
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_"+JL.getClient()+"/template/"
	}
};

JL.Plugin = {
	/********************PC 表单控件************************************/	
	"JLInput": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLTextarea": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLSearch": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLSelect": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLRadio": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLCheckbox": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLDate": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLRangeDate": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLMultiSelect": {
		"version": "1.0.1",
		"path": (function(){
			if(pubJson.product == "O2O"){
				return pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/";
			}else{
				return pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/";
			}
		})()
	}, "JLCartesian": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLSelectTree": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLSelectMenuTree": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLToolBar": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLUpload": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLUploadImage": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLGrid": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLTreeGrid": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLLayoutGrid": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, "JLAddress": {
		"version": "1.0.1",
		"path": (function(){
			if(pubJson.product == "O2O"){
				return pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/";
			}else{
				return pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/";
			}
		})()
	}, "JLMultiTree": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/pub/js/"
	}, 
	/********************PC O2O格子控件************************************/
	"o2o_bannerAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	}, "o2o_imgAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	}, "o2o_news_abstractAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	}, "o2o_news_imgTitleAbstractAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	}, "o2o_news_titleAbstractAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	}, "o2o_spxxAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	}, "o2o_shopAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	},"o2o_dealerAD": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2o/js/"
	},
	/********************PC O2O公共控件************************************/
	"JLChooseFilter": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLClassAttr": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLClassBrand": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLGoods": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLNavigationCookies": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLNavigationTop": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLNavigationShopTop": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLNewsList": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLPageChange": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLPaging": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLSearchTop": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLShowGoodsDetail": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLShowGoodsGGCS": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLTableImg": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLVenderEntrance":{
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	}, "JLReserveDate":{
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_pc/o2oPub/js/"
	},
	/********************PAD 表单控件************************************/	
	"JLDate_Mobile": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib_pad/pub/js/"
	}, "JLSelect_Mobile": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib_pad/pub/js/"
	}, "JLSelectTree_Mobile": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib_pad/pub/js/"
	},
	/********************手机 表单控件************************************/	
	 "JLTreeGrid_Mobile": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_mobile/pub/js/"
	},
	 "JLTableImg_Mobile": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_mobile/pub/js/"
	},
	 "JLLayoutGrid_Mobile": {
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_mobile/pub/js/"
	},
	"JLSearch_Mobile":{
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_mobile/pub/js/"
	},
	"JLMultiSelect_Mobile":{
		"version": "1.0.1",
		"path": pubJson.getURL("FormUrl") + "/jllib/jllib_mobile/pub/js/"
	}
};
