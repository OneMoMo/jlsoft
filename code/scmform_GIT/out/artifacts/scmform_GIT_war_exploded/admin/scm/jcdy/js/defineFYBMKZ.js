var defineFYBMKZ = JL.JLForm();

defineFYBMKZ.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds": "CDS",
				"success":function(data,tip){
					console.info('after');
					defineFYBMKZ.query();
				}
			},
			"jlCancelSlide" :{
				"cds": "CDS"
			}
		}
	},
	"bdbh" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.bdbh",
		"readonly": true, 
		"format": { 
		}
	},
	"jlbh" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.jlbh",
		"readonly": true, 
		"format": { 
		}
	},
	"BJ" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.BJ",
		"readonly": true, 
		"format": { 
		}
	},
	"FYBMMC" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.FYBMMC",
		"readonly": true, 
		"format": { 
		}
	},
	"FYBM01" : {
		"jlid":"JLSearch",
		"hot":"GYS",
		"cds" : "CDS",
		"cds-field": "LIST.FYBM01",
		"placeholder": "请选择费用部门",
		"queryConfig":{
			"dir": "admin/scm/jcdy/search",
			"namespace": "JCDY",
			"sqlid": "FYBM",
			"init": {"FYBM01": "FYBM01"},
			"fieldMapping" : {
				"FYBM01": "FYBM01",
				"FYBM02": "FYBMMC"
			},
			"listener": {
				"beforequery" : function(data) {
					data["GSXX01"] =userInfo["PCRM_GSXX01"] ;
				},
				"beforecallback" : function(data) { 
					
				}
			}
		}
	},
	"DZBM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.DZBM",
		"format": {
		}
	},
	"CBZXLX" : {
		"jlid": "JLSelect",
		"sqlid": "JCDY.CBZXLX",
	    "resource": "scmform",
		"cds" : "CDS",
		"cds-field": "LIST.CBZXLX",
		"format": { 
		}
	},
	"CCJGFW" : {
		"jlid": "JLSelect",
		"sqlid": "JCDY.CCJGFW",
	    "resource": "scmform",
		"cds" : "CDS",
		"cds-field": "LIST.CCJGFW",
		"format": { 
		}
	},
	"GNFW" : {
		"jlid": "JLSelect",
		"sqlid": "JCDY.GNFW",
	    "resource": "scmform",
		"cds" : "CDS",
		"cds-field": "LIST.GNFW",
		"format": { 
		}
	},
	"KSRQ" : {
		"jlid": "JLDate",
		"cds": "CDS",
		"cds-field": "LIST.KSRQ",
		"listener": {
	        "change":function(data){
	        	debugger;
	        	var time = defineFYBMKZ.getPluginObj("JSRQ").getData();
	        	if(!JL.isNull(time)){
				var times = time.split(/-|/);
				var str = "";
				var i;
				for (i = 0; i < times.length; i++) {
		        if (i == 8) {
		  	    continue;
		        } else {
		  	    str += times[i];
		     }
				}
				
				var currentTimes = data.split(/-|:|/);
				var ss = "";
				var j;
				for (j = 0; j < currentTimes.length; j++) {
		        if (j == 8) {
		  	    continue;
		        } else {
		  	    ss += currentTimes[j];
		  }
				}
				var sub = ss.substring(0, 10);
				var a = parseInt(str);//终止日期
				var b = parseInt(sub);//起始日期
				var c =  b-a;
				if (c > 0) {//结束日期-起止日期>=0  起始日期-结束日期《=0
		       defineFYBMKZ.getPluginObj("KSRQ").setData("");
		       JL.tip("起止日期小于结束日期");
				}
	        } 
	        	}
		}
	},
	"JSRQ" : {
		"jlid": "JLDate",
		"cds": "CDS",
		"cds-field": "LIST.JSRQ",
			"listener": {
		        "change":function(data){
		        	var time = defineFYBMKZ.getPluginObj("KSRQ").getData();//开始日期
		        	if(!JL.isNull(time)){
					var times = time.split(/-|/);
					var str = "";
					var i;
					for (i = 0; i < times.length; i++) {
			        if (i == 8) {
			  	    continue;
			        } else {
			  	    str += times[i];
			     }
					}
					
					var currentTimes = data.split(/-|:|/);//结束日期
					var ss = "";
					var j;
					for (j = 0; j < currentTimes.length; j++) {
			        if (j == 8) {
			  	    continue;
			        } else {
			  	    ss += currentTimes[j];
			  }
					}
					var sub = ss.substring(0, 10);
					var a = parseInt(str);//开始日期
					var b = parseInt(sub);//结束日期
					var c =  a-b;
					if (c > 0) {//结束日期-起止日期>=0  起始日期-结束日期《=0
			       defineFYBMKZ.getPluginObj("JSRQ").setData("");
			       JL.tip("起止日期小于结束日期");
					}
		        } 
		        	}
			}
	},
	"BMMS" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.BMMS",
		"format": {
		}
	},
	"FZR" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.FZR",
		"format": {
		}
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi": false,
		"buttons": {
			"jlNew":{
				"listener":{
					"click":function(data){
						defineFYBMKZ.getPluginObj("bdbh").setData("9063");
					}
				}
			}
		},
		"title" : [
				   {"id" : "FYBM01","name" : "费用部门代码","width" : "w03"}, 
				   {"id" : "DZBM","name" : "对照编码","width" : "w03"}, 
				   {"id":"CZ", "name":"操作", "width":"w02"}
				],
		"header" : [
		            {"id" : "FYBM01","groupid" : "FYBM01","rowindex" : 1,"title" : "费用部门代码"}, 
		            {"id" : "DZBM","groupid" : "DZBM","rowindex" : 1,"title" : "对照编码"}, 
		            {"id" : "edit","groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		    	"config" : {
		    		
		        },
		        "listener": {
			    	"click":function(data){
			    		defineFYBMKZ.getPluginObj("FYBM01").disabled(true);
			    	}
		        }
		    },
		    {
				"id" : "delete","groupid" : "CZ","rowindex" : 1,"title" : "删除","editor" : "JLCancelDelete",
				"config" : {

				},
				"listener" : {
					"delete" : function(thisPlugin, rowIndex, obj) {
						var data = thisPlugin.getData(rowIndex);
						JL.confirm("确认删除?", function() {
							var selectedIndex = thisPlugin.getSelectedIndex();
							JL.recursiveAjax(thisPlugin, {
								"S_VALUE" : "D1"
							}, selectedIndex, "删除", 0, defineFYBMKZ.initField);
						});
					}
				}
			}
		]
	}
});
/*defineFYBMKZ.setPlugin({ 
	"KSRQ": { //起始日期
		"jlid" : "JLDate",
		"afterDate":"[name='JSRQ']"
	},
	"JSRQ": { //结束日期
		"jlid" : "JLDate",
		"beforeDate":"[name='KSRQ']"
	}

});*/

defineFYBMKZ.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(data){
	defineFYBMKZ.query();
	}
}]);

defineFYBMKZ.setAfterInit(function() {
	//加载Grid数据事件
	defineFYBMKZ.query();
	
});

defineFYBMKZ.query = function() {
	var queryField={};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var search = defineFYBMKZ.getTab().find("[name='BMMC']").val();
	if(!JL.isNull(search)){
		queryField["BMMC"] = search;
	}
	var resultData = defineFYBMKZ.getSqlResult(queryField, "MONGO_FYBMKZ", "CSS_FYBMKZ", "admin/scm/jcdy/search");
	console.info(resultData.data);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	//分页加在更多
	defineFYBMKZ.getPluginObj("LIST").setPaging(resultData.fileName); 
};