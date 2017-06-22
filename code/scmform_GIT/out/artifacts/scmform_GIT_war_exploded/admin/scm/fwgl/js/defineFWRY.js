var defineFWRY = JL.JLForm();
var transport = new JLTransport();

defineFWRY.setPlugin({
	"footer" : {
		"jlid": "JLToolBar", 
		"buttons" : {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
				},
				"success":function(data,tip){
					console.info('after');
					var resultData = defineFWRY.query();
					
				    CDS = defineFWRY.getCds("CDS");
					CDS.edit();
					CDS.setData({"FWRY":resultData});
					CDS.post();
				}
			},
			"jlCancelSlide":{}
		}
	},
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewCard": {
				"readonly": []
			}
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "FWRY.jlbh"
	},
	"FWRY01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.FWRY01"
	},
	"FWRY02" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.FWRY02",
		"format": {
	        "null": false,
		}
	},
	"FWWD01" : {
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectFWWD.do", 
		"cds": "CDS",
	    "cds-field": "FWRY.FWWD01",
		"multi": false,
		"param" : {"WDLX":"1"},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"LXDH" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "FWRY.LXDH",
		"format": {
			"null": false,
			"number":true
		}
	},
	"SFZH" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "FWRY.SFZH",
		"format": {
			"null": true
		}
	},
	"FWLX" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
	    "cds-field": "FWRY.FWLX",
		"options": {"1":"服务"} 
	},
	"AZLX" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
	    "cds-field": "FWRY.AZLX",
		"options": {"1":"安装"} 
	},
	"RYZT" : {/*人员状态(0 在职, 1, 请假, 2,辞职)*/
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "FWRY.RYZT",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"在职","1":"请假","2":"辞职"}
	},
	"YXBJ" : {
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "FWRY.YXBJ",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"有效","1":"无效"}
	},
	"FWRY" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS", 
		"paging" : "paging",
		"style" : "jl_list_03",
        "multi": false,
        "buttons": {
			"jlNew": {}
	    },
		"title" : [   
		           {"id":"FWRY01", "name":"人员编码", "width":"w01"},
		           {"id":"FWRY02", "name":"人员名称", "width":"w02"},
		           {"id":"FWWD01", "name":"网点", "width":"w02"},
		           {"id":"LXDH", "name":"手机号码", "width":"w02"},
		           {"id":"LX", "name":"人员类型", "width":"w01"},
		           {"id":"SFZH", "name":"身份证号", "width":"w02"},
		           {"id":"RYZT", "name":"人员状态", "width":"w01"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		          ], 
        "header" :[
                   {"id":"jlbh", "name":"jlbh","hidden":true}, 
                   {"id":"FWRY01", "groupid":"FWRY01", "rowindex":1, "title":"人员编码"},
                   {"id":"FWRY02", "groupid":"FWRY02", "rowindex":1, "title":"人员名称"},
                   {"id":"FWWD01", "groupid":"FWWD01", "rowindex":1,"title":"网点"},
                   {"id":"LXDH", "groupid":"LXDH","rowindex":1, "title":"手机号码"}, 
                   {"id":"FWLX", "groupid":"LX","rowindex":1, "title":"服务类型"}, 
                   {"id":"AZLX", "groupid":"LX","rowindex":1, "title":"安装类型"}, 
                   {"id":"SFZH", "groupid":"SFZH","rowindex":1, "title":"身份证号"}, 
                   {"id":"RYZT", "groupid":"RYZT","rowindex":1, "title":"人员状态"}, 
                   {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit","rowindex":1,
	  	            	 "config":{
	  		            	 "readonly": ["FWRY01"]
	  		             },
	  		             "listener":{
	  		        		 "click": function(data, rowIndex, obj, plugin){
	  		        			 console.info(data);
	  		        		 }
	  		        	 }
	  	           }
                  ],
          		"listener":{
        			"loadRow": function(thisPlugin, data, rowIndex, dl){
        			}
        		}
	}
});

defineFWRY.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(){
		console.info('search');
		var resultData = defineFWRY.query();
		
	    CDS = defineFWRY.getCds("CDS");
		CDS.edit();
		CDS.setData({"FWRY":resultData});
		CDS.post();
	}
}])

defineFWRY.setAfterInit(function() {
	//打开界面时加载当前登录人信息
	CDS = defineFWRY.getCds("CDS"); 
	  
	//加载Grid数据事件
	console.info('setAfterInit');
	var query={};
	var search = defineFWRY.getTab().find("[name='CXTJ']").val();
	  
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	//queryField["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineFWRY.getSqlResult(query, "MONGO_FWRY", "CSS_FWRY", "admin/scm/fwgl/search");
	console.info(resultData.data);
	
	//加载工作流步骤-Grid数据事件   
	CDS.edit();
	CDS.setData({"FWRY":resultData.data}); 
	CDS.post();
});

defineFWRY.query = function() {
	var query={};
	var search = defineFWRY.getTab().find("[name='CXTJ']").val();
	  
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	var resultData = defineFWRY.getSqlResult(query, "MONGO_FWRY", "CSS_FWRY", "admin/scm/fwgl/search");
	return resultData.data;
};

