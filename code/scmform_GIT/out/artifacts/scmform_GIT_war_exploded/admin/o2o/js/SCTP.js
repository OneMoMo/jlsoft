var SCTP = new JLForm();

SCTP.setPlugin({
	"SCTP": {
		"jlid": "JLUploadImage",
		"sBillName": "jlresource",
		"sOperateName": "uploadImg.do",
		"afterUpload":function(){
			SCTP.reloadPlugin("WDTP",SCTP.getPlugin("WDTP"));
		}
	},
	"WDTP":{
		"jlid" : "JLTableImg",
		//"sBillName":"o2o",
		//"sOperateName":"1.json",
		
		"sBillName": "jlquery",
		"sOperateName": "selectForm.do",
		"param":{
			"collection": "W_Img",
			"result": {},
			"query": {"shopId":"0001","yxbj":1}
		},
		
		"header":[
		    /*{"id":"tc.uri","title":"AAAA","class":"w12 pro_img","editor":"img"},
		    {"id":"tc.jg","title":"name","class":"w12 pro_pic","editor":"i","icon":"fa-rmb"},
		    {"id":"name","title":"ts","class":"w12 pro_name"}*/

		    {"id":"uri","title":"AAAA","class":"pro_img","editor":"img"}
        ],
		"listener":{
			"click": function(data, obj){
				var KJCZ = SCTP.getTab().find("[name='KJCZ']:checked");
				if(KJCZ.length == 1 || confirm("是否确定删除")){
					var ajaxJson = {};
					ajaxJson["src"] = "jlresource/deleteImg.do";
					ajaxJson["data"] = {"url": data.uri};
					var resultData = JL.ajax(ajaxJson);
					console.info(resultData);
					if(!JL.isNull(resultData) && resultData.data.MSGID=='S'){
						obj.remove();
					}
				}
			}
		}
		
		/*"doURL":"/jlquery/selectCustom.do",
		"key":["shopId","uri","空占位","fileName"],
		"CX01":2,
		"queryField":{"shopId":'0001'},
		"clickFunc":"占位"*/
	}
});

