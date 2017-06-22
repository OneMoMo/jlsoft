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
	},
	"TAR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"TASJ":{
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
	"SHYJ":{
		"jlid": "JLRadio",
		"default": "通过",
    	"options":{"0":"通过","1":"不同意","2":"驳回"},
		"default": "0",
			"listener": {
			      "click":function(data){//参数data为点击的值，是个json对象
					  if (data.value == "驳回" && OA_SHMB_FALLBACK.initField.indexOf("SHYJ")!= -1)
						{
						    OA_SHMB_FALLBACK.getTab().find("[name='div_HTBZ']").appendTo(OA_SHMB_FALLBACK.getTab().find("[name='HSYJ_HTBZ']"));
							OA_SHMB_FALLBACK.getTab().find("[id='d_HTBZ']").show(); 
						}else{
							OA_SHMB_FALLBACK.getPluginObj("HTBZ").setData("");
							OA_SHMB_FALLBACK.getTab().find("[id='d_HTBZ']").hide(); 
						} 
			      }
			}
	},
	"SHR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"SHSJ":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	/*"SPFJ":{
		"jlid": "JLUpload"
	},*/
	"CC" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSGW",
		"resource" : "workflow",
		"multi" : true,
		"param" : "",
		"workflow" : {
		    "cc" : "gw"
		},
		"listener":{
			"click": function(data){
				/*console.info(data);
				var num = OA_SHMB_FALLBACK.getPluginObj("CSGW").getSelected();
				var value;
				for (var i=0;i<num.length;i++){
					if (value==null){
						value = num[i].VALUE;
					}else{
						value = value+';'+num[i].VALUE;
					}
				} 
				OA_SHMB_FALLBACK.getPluginObj("CSGW").setText(value);*/
			}
		}
	},
	"CCRY" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSRY",
		"resource" : "workflow",
		//"multi" : true,
		"param" : "",
		"workflow" : {
		    "cc" : "ry"
		},
		"listener":{
			"click": function(data){
				/*console.info(data);
				var num = OA_SHMB_FALLBACK.getPluginObj("CSRY").getSelected();
				var value;
				for (var i=0;i<num.length;i++){
					if (value==null){
						value = num[i].VALUE;
					}else{
						value = value+';'+num[i].VALUE;
					}
				}
				OA_SHMB_FALLBACK.getPluginObj("CSRY").setText(value);*/
			}
		}
	}, 
	"HTBZ" : {
		"jlid" : "JLSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryHTBZ",
		"resource" : "workflow"
	},
	"LIST":{
		"jlid": "JLLayoutGrid",
		"style": "jl_list_03 jl_list_05",
		"groupField": "BZSJ",
		"multi": false,
		"header": [
		    {"id":"SHR_NAME", "title":"审批人", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"SHR", "title":"审批人", "groupcss":"w03", "css":"w10 font_dark_blue"},
		    {"id":"SHSJ_NAME", "title":"审批时间", "editor":"title", "groupcss":"w01"},
		    {"id":"SHSJ", "title":"审批时间", "groupcss":"w03", "css":"w10 font_dark_blue"},
		    {"id":"SHYJNR_NAME", "title":"审批状态", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"SHYJ", "title":"审批状态", "editor":"plugin", "groupcss":"w03", "css":"w12", 
		    	"config":{
		    		"jlid": "JLRadio",
		    		"options":{"0":"通过","1":"不同意","2":"驳回"}
		    	}
		    },
		    {"id":"SPFJ_NAME", "title":"审批附件", "editor":"title", "groupcss":"w01"},
		    {"id":"SPFJ", "title":"审批状态", "editor":"plugin", "groupcss":"w11", "css":"w12", 
		    	"config":{
		    		"jlid": "JLUpload"
		    	}
		    },
		/*    {"id":"CSGW_NAME", "title":"抄送岗位", "editor":"title", "groupcss":"w01"},
		    {"id":"CSGW", "title":"", "groupcss":"w03", "css":"w12 font_dark_blue"},
		    {"id":"CSRY_NAME", "title":"抄送人员", "editor":"title", "groupcss":"w01"},
		    {"id":"CSRY", "title":"", "groupcss":"w03", "css":"w12 font_dark_blue"},*/
		    {"id":"HTBZ_NAME", "title":"回退步骤", "editor":"title", "groupcss":"w01"},
		    {"id":"HTBZ", "title":"", "groupcss":"w03", "css":"w12 font_dark_blue"},
		    {"id":"SHYJNR_NAME", "title":"审批意见", "editor":"title", "groupcss":"w01"},
		    {"id":"SHYJNR", "title":"", "groupcss":"w11", "css":"w12 textarea font_dark_blue"},
		    {"id":"BZSJ", "title":"", "hidden":true}
		],
	}
});
OA_SHMB_FALLBACK.setFallBack({
	"SHYJ":"1"	
});
OA_SHMB_FALLBACK.setAfterInit(function() {
	/*OA_SHMB_FALLBACK.getPluginObj("LIST").addData([{
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
	OA_SHMB_FALLBACK.getPluginObj("LIST").disabledCurrentData(true);
	
	if(OA_SHMB_FALLBACK.getPluginObj("LIST").getData().length == 0){
		OA_SHMB_FALLBACK.getTab().find("#YSH").hide();
	}
	
	console.info(!JL.checkInitField("SHR", OA_SHMB_FALLBACK));
	console.info(JL.isNull(OA_SHMB_FALLBACK.getPluginObj("SHR").getData()));
	if(JL.checkInitField("SHR", OA_SHMB_FALLBACK))
	{
		OA_SHMB_FALLBACK.getTab().find("#jlDeleteForm").hide();
	}
	
	if(!JL.checkInitField("SHR", OA_SHMB_FALLBACK) && JL.isNull(OA_SHMB_FALLBACK.getPluginObj("SHR").getData())){
		OA_SHMB_FALLBACK.getTab().find("#DSH").hide();
		
	}
	
	JL.setInitFieldData(OA_SHMB_FALLBACK, {
		"TAR": userInfo.PCRM_CZY03,
		"TASJ": JL.formatDate(0, 2),
		//"SQRBM": userInfo.PCRM_BM02,
		"SHR": userInfo.PCRM_CZY03,
		"SHSJ": JL.formatDate(0, 2)
	});


});


