var GC_DIALOG = {
	"GC_GJR":{ //跟进人
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_GJSJ":{ //跟进时间
		"jlid": "JLInput",
		"readonly": true,
	},
	"GC_SCZP":{ //上传照片
		"jlid": "JLUploadImage",
		"maxsize": 5*1024*1024 //最大5M
	},
	"GC_QDHT":{ //签订合同
		"jlid": "JLToolBar",
		"buttons" : {
			"QDHT" : {
				"name": "签定合同",
				"icon": "pencil",
				"func": function(){
					debugger;
					var form = JL.getCurrentForm();
					
					form.readData()
					var DLD_DATA = form.getData();
					var DYDLBJ=DLD_DATA["DYDLBJ"];
					var GC_DJZT=DLD_DATA["GC_DJZT"];
					if (GC_DJZT.value == "待签合同") {
						if (DYDLBJ.value == "是") {
							var HTDBBH = form.getTab().find("input[name='HTDBBH']").val();
							if (!HTDBBH) {
								JL.openForm(1095);
								makeGCHT.setData(DLD_DATA);
								debugger;
								if(DLD_DATA.EJJSXMC){
									makeGCHT.getTab().find("li[id='ejjsxmc']").show();
									makeGCHT.getTab().find("li[id='ejjsxdh']").show();
									makeGCHT.getTab().find("li[id='kong']").show();
								}else{
									makeGCHT.getTab().find("li[id='ejjsxmc']").hide();
									makeGCHT.getTab().find("li[id='ejjsxdh']").hide();
									makeGCHT.getTab().find("li[id='kong']").hide();
								}
							} else {
								JL.openForm(1095, HTDBBH);
							}
						} else {
							JL.tip("不是第一登录不能签订合同");
						}
					} else {
						JL.tip("单据状态不是待签合同状态");
					}
					makeGCHT.data["DLD_DATA"] = DLD_DATA;
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
					var form = JL.getCurrentForm();

					var HTDBBH = form.getTab().find("input[name='HTDBBH']").val();
					if (!HTDBBH) {
						JL.tip("合同还未签订");
					}else{
						JL.openForm(1095, HTDBBH);
					}
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
			  	"其它作废":"其它作废"}
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
		    {"id":"GC_CZYJ_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_CZYJ", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    /*{"id":"GC_SCWJ_TITLE", "title":"", "groupcss":"w01"},
		    {"id":"GC_SCWJ", "title":"", "groupcss":"w11 min_h25", "css":"w12",
		    	"editor":"file", "filecss":"mr10 mb5 font_blue", 
		    	"listener": {
		    		"click": function(obj){
		    			if($(event.target).is("img")){
		    				JL.showImage($(event.target));
		    			}
		    		}
		    	}
		    },*/
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
					/*dl.find("[data-id='GC_XGJL_TITLE']").closest("dd").hide();
					dl.find("[data-id='GC_XGJL']").closest("dd").hide();*/
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