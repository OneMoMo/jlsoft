var defineBMKZSX = JL.JLForm();
defineBMKZSX.setPlugin({

		"footer" : {
			"jlid": "JLToolBar",
			"buttons": {
				"jlSaveCard":{
					"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
					"before": function(){
					},
					"success":function(data,tip){
						defineBMKZSX.query();
					    
						
					}
				},
				"jlCancelSlide":{}
			}
		},  
	
	"jlbh":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.jlbh",
		"readonly": true,
		"format":{	
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
//	"BM01" : {
//		"jlid": "JLSelect", 
//		"cds" : "CDS",
//		"cds-field": "LIST.BM01",
//		"sqlid": "RYXX.BM01",
//		"placeholder":"请选择",
//		 "resource": "scmform",
//		 "readonly":false,
//		 "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
//		"format": { 
//		}
//	},
	"BM01" : {
		"jlid":"JLSearch",
		"hot":"GYS",
		"cds" : "CDS",
		"cds-field": "LIST.BM01",
		"placeholder": "请选择部门",
		"queryConfig":{
			"dir": "admin/scm/jcdy/search",
			"namespace": "JCDY",
			"sqlid": "BMKZ",
			"init": {},
			"fieldMapping" : {
				"KEY": "BM01"
				//"BM02": "BMMC"
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
		"cds" : "CDS",
		"cds-field": "LIST.DZBM",
		"placeholder": "请输入编码", 
		"format": {
		}
	},
	"BMMS" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.BMMS",
		"format": { 
		}
	},
	"FZR" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.FZR",
		"format": { 
		}
	},
	"KSRQ" : {
		"jlid" : "JLDate",
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
		"jlid" : "JLDate",
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
	"LRZXZ":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.LRZXZ",
		 "sqlid": "JCDY.LRZX",
		 "resource": "scmform",
		// "param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		 "listener":{
				"click": function(){
					
				}
			}
	},
	"LIST": {
		"jlid": "JLLayoutGrid",
		"paging": "more",
		"multi": false,
		"mode": "edit",
		"cds": "CDS", 
		"buttons": {
			"jlNew":{
				"listener": {
					"click":function(obj, thisPlugin){
						
						
					}
				}
			}
		},
		"title" : [
		     {"id":"BM01", "name":"项目代码", "width":"w04"},
		     {"id":"DZBM", "name":"对照编码", "width":"w04"},
		     {"id":"CZ", "name":"操作", "width":"w03"}
        ],
		"header" : [ 
             {"id":"BM01", "groupid":"BM01", "title":"代码"},
             {"id":"DZBM", "groupid":"DZBM", "title":"对照编码"},
             {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit", 
            	 "config":{
	            	 "readonly": ["BM01"],
	            	 "mapping":{}
	             },
	             "listener":{
        		  "click": function(data, rowIndex, obj, thisPlugin){
        		  }
	        	 }
             },
             
             {"id":"update", "title":"删除", "editor":"JLCancelDelete", "groupid":"CZ", "rowindex":1,
             	"listener": {
             		"click": function(thisPlugin, rowIndex, obj){
 						debugger;
 						var data = thisPlugin.getData(rowIndex);
 						JL.confirm("是否确认删除?", function(){
 							data["S_VALUE"] = "D1";
 							JL.saveForm(defineBMKZSX, data, "删除", {
 								"disabled": false,
 								"success":function(){
 									//defineBOMSPXX.query();
 									thisPlugin.removeRow(rowIndex);
 								 }	 
             			});
             		});
             	}
 		    }
 		    }
		]
	}
});


defineBMKZSX.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineBMKZSX.query();
	}
}]);

defineBMKZSX.setAfterInit(function() {
	JL.tab(defineBMKZSX, {
		"JCXX": "基础信息"
	});
	//加载Grid数据事件
	defineBMKZSX.query();
	
});


defineBMKZSX.query = function() {
	console.info('defineBMKZSX.query');
	var query={};
	
	var search = defineBMKZSX.getTab().find("[name='CXTJ']").val();
	
	query["CXTJ"] = userInfo.PCRM_GSXX01;
	if(!JL.isNull(search)){
		query["search"] = search;
	}

	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineBMKZSX.getSqlResult(query, "MONGO_BMKZSX", "SCM_BMKZSX", "admin/scm/jcdy/search");
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data}); 
	CDS.post(); 
	defineBMKZSX.getPluginObj("LIST").setPaging(resultData.fileName);  
};
