var defineSZYPCYXE = JL.JLForm();

defineSZYPCYXE.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds": "CDS",
				"success":function(data,tip){
					console.info('after');
					defineSZYPCYXE.query();
				}
			},
			"jlCancelSlide" :{
				"cds": "CDS"
			}
		}
	},
	"SPMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.SPMC",
		"format": {
			"null": false
		},
		"dir" : "scm/pub/search",
	    "namespace" : "SPXX",
	    "placeholder":"点击查找商品",
	    "sqlid" : "SPMC",
		"init": {"GSXX01":"GSXX01"},
		"fieldMapping" : {
			"SPXX01":"SPXX01",
			"SPBM":"SPBM",
			"SPMC":"SPMC"
			}
	},
	"SPBM" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.SPBM",
		"readonly": true, 
		"format": { 
		}
	},
	"SPXX01" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.SPXX01",
		"readonly": true, 
		"format": { 
		}
	},
	"GSXX01" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.GSXX01",
		"readonly": true, 
		"format": { 
		}
	},
	"KHMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.KHMC",
		"format": {
		},
		"dir" : "scm/pub/search",
	    "namespace" : "WLDW",
	    "placeholder":"点击查找客户",
	    "sqlid" : "KH_ALL",
		"init": {"GSXX01":"GSXX01"},
		"fieldMapping" : {
			"WLDW01":"KHBM",
			"WLDWMC":"KHMC"
			}
	},
	"KHBM" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.KHBM",
		"readonly": true, 
		"format": { 
		}
	},
	"YCYSL" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.YCYSL",
		"readonly": true, 
		"format": { 
		}
	},
	
	"CYXE" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.CYXE",
		"listener":{
			"blur":function(data){
				debugger
				var num=/^(\d+)|(\d{1}[.]?\d+)$/;
				if(!JL.isNull(data)){
				if(!num.test(data)){
					   JL.tip("请输入大于等于0的数!");
					   defineSZYPCYXE.getPluginObj("CYXE").setData("");
					   return true;
			}
				}
	}
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh"
	},
	"bdbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.bdbh"
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi": false,
		"buttons": {
			"jlNew":{
				"listener": {
			    	"click":function(data){
			    		defineSZYPCYXE.getPluginObj("bdbh").setData("9038");
			    		defineSZYPCYXE.getPluginObj("GSXX01").setData(userInfo["PCRM_GSXX01"]);
			    		defineSZYPCYXE.getPluginObj("KHMC").disabled(false);
			    		defineSZYPCYXE.getPluginObj("SPMC").disabled(false);
			    	}
			    	}
			}
		},
		"groupField": [
	                   {"id":"KHBM", "title":"客户编码", "css":"font_weight_bold font_size_standard","width" : "w01"},
	                   {"id":"KHMC", "title":"客户名称", "css":"font_weight_bold font_size_standard","width" : "w02"},

		           ],
		"title" : [
		  // {"id" : "SPXX01","name" : "商品信息","hidden":true}, 
		   {"id" : "KHBM","name" : "客户编码","width" : "w02"}, 
		   {"id" : "KHBM","name" : "客户名称","width" : "w02"},
		   {"id" : "SPBM","name" : "商品编码","width" : "w02"}, 
		   {"id" : "SPMC","name" : "商品名称","width" : "w02"}, 
		   {"id" : "CYXE","name" : "出样限额","width" : "w01"}, 
		   {"id" : "YCYSL","name" : "已出样数量","width" : "w01"}, 
		   {"id":"CZ", "name":"操作", "width":"w02"}
		],
		"header" : [
		     {"id":"jlbh", "title":"KHBM", "hidden":true},
		     {"id":"bdbh", "title":"KHBM", "hidden":true},
		     {"id":"SPXX01", "title":"商品信息","hidden": true},
		    {"id" : "","groupid" : "KHBM","rowindex" : 1,"title" : "客户编码"}, 
		    {"id" : "","groupid" : "KHMC","rowindex" : 1,"title" : "客户名称"}, 
		    {"id" : "SPBM","groupid" : "SPBM","rowindex" : 2,"title" : "商品编码"}, 
		    {"id" : "SPMC","groupid" : "SPMC","rowindex" : 1,"title" : "商品"},
		    {"id" : "CYXE","groupid" : "CYXE","rowindex" : 1,"title" : "已出样数量"}, 
		    {"id" : "YCYSL","groupid" : "YCYSL","rowindex" : 1,"title" : "已出样数量"}, 
		    {"id" : "edit","groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		    	"config" : {
		    		"disabled": ["KHMC","SPMC"]
		        },
		        "listener": {
			    	"click":function(data){
			    		//console.info("HKKKKKKKKKKKKK");
			    		defineSZYPCYXE.getTab().find("#jlEmptyCard").hide();
			    		defineSZYPCYXE.getPluginObj("bdbh").setData("9038");
			    		defineSZYPCYXE.getPluginObj("KHMC").disabled(true);
			    		defineSZYPCYXE.getPluginObj("SPMC").disabled(true);
			    	}
		        }
		    }, 
			{"id" : "delete","groupid" : "CZ","rowindex" : 1,"title" : "删除","editor" : "link",
				"listener" : {
					
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
              			JL.confirm("确认删除?", function(){
            	          var selectedIndex = thisPlugin.getSelectedIndex();
         		          JL.recursiveAjax(thisPlugin, {"S_VALUE" : "D1","bdbh":"9038"}, selectedIndex, "删除", 0, defineSZYPCYXE.initField);
              			});
               		}
				}
		    }
		]
	}
});

defineSZYPCYXE.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(data){
		defineSZYPCYXE.query();
	}
}]);

defineSZYPCYXE.setAfterInit(function() {
	//加载Grid数据事件
	defineSZYPCYXE.query();
});

defineSZYPCYXE.query = function() {
	debugger;
	var GSXX01=userInfo["PCRM_GSXX01"];
	var queryField={};
	var search = defineSZYPCYXE.getTab().find("[name='KHXX']").val();
	var find = defineSZYPCYXE.getTab().find("[name='SPXX']").val();
	var GSXX = defineSZYPCYXE.getTab().find("[name='GSXX']").val();
	  //上面的查询条件
	if(!JL.isNull(search)){
		queryField["KHXX"] = search;
	}
	if(!JL.isNull(find)){
		queryField["SPXX"] = find;
	}
	if(JL.isNull(GSXX)){
		queryField["GSXX"] = GSXX01+"";
	}
	var resultData = defineSZYPCYXE.getSqlResult(queryField, "RYXX", "queryYPCYXE", "admin/scm/jcdy/search");
	console.info(resultData);
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	//分页加在更多
	defineSZYPCYXE.getPluginObj("LIST").setPaging(resultData.fileName); 
};