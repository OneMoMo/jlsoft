var OA_PROCESSCY = {
	"OA_SQR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SQSJ":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SQFJ":{
		"jlid": "JLUpload"
	},
	"OA_CCGW" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSGW",
		"resource" : "workflow",
		"multi" : true,
		"param" : "",
		"workflow" : {
		    "cc" : "gw"
		}
	},
	"OA_CCRY" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSRY",
		"resource" : "workflow",
		"param" : "",
		"workflow" : {
		    "cc" : "ry"
		}
	}, 
	"OA_SHZT":{ //审核状态
		"jlid": "JLRadio",
		"default": "通过",
    	"options":{"0":"同意","1":"不同意","2":"驳回"},
		"default": "0",
		"listener": {
			"click":function(data, thisPlugin){//参数data为点击的值，是个json对象
				var initField = thisPlugin.form.initField;
				if (data.key == "2" && $.inArray("OA_SHZT", initField) != -1) {
					thisPlugin.obj.next().show();
				}else{
					thisPlugin.obj.next().hide();
				} 
	      	}
		}
	},
	"OA_SHR":{ //审核人
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SHSJ":{ //审核时间
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"PCRM_HTBZ" : { //回退步骤
		"jlid" : "JLSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryHTBZ",
		"resource" : "workflow"
	}/*,
	"OA_LOG":{ //代办列表
		"jlid": "JLLayoutGrid",
		"style": "jl_form",
		"rowclass":"jl_form_01",
		"multi": false,
		"header": [
		    {"id":"SHR_NAME", "title":"审批人", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"OA_SHR", "title":"审批人", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"SHSJ_NAME", "title":"审批时间", "editor":"title", "groupcss":"w01"},
		    {"id":"OA_SHSJ", "title":"审批时间", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"SHYJNR_NAME", "title":"审批状态", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"OA_SHZT", "title":"审批状态", "editor":"plugin", "groupcss":"w11", "css":"w12", 
		    	"config":{
		    		"jlid": "JLRadio",
		    		"options":{"0":"通过","1":"不同意","2":"驳回"}
		    	}
		    },
		    {"id":"HTBZ_NAME", "title":"回退步骤", "editor":"title", "groupcss":"w01"},
		    {"id":"PCRM_HTBZ", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"BZSJ", "title":"", "hidden":true}
		],
	}*/
};