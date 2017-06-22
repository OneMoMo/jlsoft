var GC_DIALOG = {
	"GC_GJR":{ //跟进人
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_GJSJ":{ //跟进时间
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_GJGW":{ //跟进岗位
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_SCWJ":{ //上传文件
		"jlid": "JLUpload"
	},
	"GC_SCZP":{ //上传照片
		"jlid": "JLUploadImage"
	},
	"GC_QDHT":{ //签订合同
		"jlid": "JLToolBar",
		"buttons" : {
			"QDHT" : {
				"name": "签定合同",
				"icon": "pencil",
				"func": function(){
					debugger;
					var HTDBBH=makeGCDLD.getTab().find("input[name=HTDBBH]").val();
					if (!HTDBBH) {
						JL.openForm(1095);
						makeGCHT.setData(makeGCDLD.getData());
					}else{
						JL.openForm(1095, HTDBBH);
					}
				}
			}
		}
	},
	"GC_SHHT":{ //审核合同
		"jlid": "JLToolBar",
		"buttons" : {
			"QDHT" : {
				"name": "审核合同",
				"icon": "pencil",
				"func": function(){
					debugger;
					var HTDBBH=makeGCDLD.getTab().find("input[name=HTDBBH]").val();
					JL.openForm(1095, HTDBBH);
				}
			}
		}
	},
	"GC_GJQK":{ //跟进情况
		"jlid": "JLTextarea"
	},
	
	//回复步骤
	"GC_HFR":{ //回复人
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_HFGW":{ //跟进岗位
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_HFSJ":{ //回复时间
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_DJZT":{ //单据状态
		"jlid":"JLSelect",
		  "options":{
			  	/*"登录待审核":"登录待审核",
			  	"待签合同":"待签合同",
			  	"合同待审核":"合同待审核",
			  	"合同已审核":"合同已审核",*/
			  	"超期作废":"超期作废",
			  	"丢单作废":"丢单作废",
			  	" 其它作废":" 其它作废"}
	},
	"GC_HFYJ":{ //回复意见
		"jlid": "JLTextarea"
	},
	"GC_LOG":{ //代办列表
		"jlid": "JLLayoutGrid",
		"style": "jl_form_01 oa_demo_01",
		"rowclass":"w12",
		"multi": false,
		"header": [
		    {"id":"GC_CZY_TITLE", "title":"", "groupcss":"w01", "css":"w12"},
		    {"id":"GC_CZY", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"GC_CZSJ_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_CZSJ", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"GC_CZGW_TITLE", "title":"", "groupcss":"w01", "css":"w12"},
		    {"id":"GC_CZGW", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"GC_CZYJ_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_CZYJ", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"GC_SCWJ_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_SCWJ", "title":"", "groupcss":"w11 min_h25", "css":"w12",
		    	"editor":"file", "filecss":"mr10 mb5 font_blue", 
		    	"listener": {
		    		"click": function(obj){
		    			if($(event.target).is("img")){
		    				JL.showImage($(event.target));
		    			}
		    		}
		    	}
		    },
		    {"id":"GC_SCZP_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_SCZP", "title":"", "groupcss":"w11 min_h25", "css":"w12",
		    	"editor":"img", "imgcss":"max_h50 mr10 mb5", 
	    		"listener": {
	    			"click": function(obj){
	    				if($(event.target).is("img")){
	    					JL.showImage($(event.target));
	    				}
	    			}
	    		}
		    },
		    {"id":"GC_XGJL_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_XGJL", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){
				debugger;
				if(data.GC_CZBJ == "GJ"){
					dl.find("[data-id='GC_XGJL_TITLE']").closest("dd").hide();
					dl.find("[data-id='GC_XGJL']").closest("dd").hide();
				}
				if(data.GC_CZBJ == "HF"){
					dl.addClass("mt10");
					dl.find("[data-id='GC_SCWJ_TITLE']").closest("dd").hide();
					dl.find("[data-id='GC_SCWJ']").closest("dd").hide();
					dl.find("[data-id='GC_SCZP_TITLE']").closest("dd").hide();
					dl.find("[data-id='GC_SCZP']").closest("dd").hide();
				}
			}
		}
	}
};