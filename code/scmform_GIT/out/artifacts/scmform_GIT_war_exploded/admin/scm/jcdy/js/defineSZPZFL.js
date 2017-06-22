var defineSZPZFL = JL.JLForm();
defineSZPZFL.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds": "CDS",
				"success":function(data,tip){
					console.info('after');
					defineSZPZFL.query();
				}
			},
			"jlCancelSlide" :{
				"cds": "CDS"
			}
		}
	},
	"WBZT01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.WBZT01",
		"format": {
		}
	},
	"PZLX01" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.PZLX01",
		"readonly": true ,
		"format": {
		}
	},
	"GSWBZT":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.XZZT",
		"placeholder": "请选择账套查询", 
		"queryConfig": {
			"namespace": "RYXX",
			"sqlid": "WBZT",
			"dir": "scm/pub/search",
			"fieldMapping":{
				"KEY":"GSWBZT01",
				"VALUE":"GSWBZT"
			},
		"listener":{
				"beforequery" : function(data) {
					//data["GSXX01"] =userInfo["PCRM_GSXX01"];
				}
			}
		}
	},
	"GSPZLX" : {
		"jlid": "JLSelect",
		"sqlid": "PUBCX.PZLX",
		"placeholder": "请选择凭证种类", 
	    "resource": "scmform"
	},
	"BJ" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.BJ",
		"format": {
		}
	},
	"XZZT":{
		"jlid": "JLSearch",
		"cds": "CDS",
		"cds-field": "LIST.XZZT",
		"placeholder": "请选择!", 
		"queryConfig": {
			"namespace": "RYXX",
			"sqlid": "WBZT",
			"dir": "scm/pub/search",
			"fieldMapping":{
				"KEY":"WBZT01",
				"VALUE":"XZZT"
			},
		"listener":{
				"beforequery" : function(data) {
					//data["GSXX01"] =userInfo["PCRM_GSXX01"];
				},"aftercallback" : function(data){
			 		debugger;
			 		console.info(data[0].KEY);
			 		debugger;
			 		var BJ=defineSZPZFL.getPluginObj("BJ").getData();
					if(JL.isNull(BJ)){
					var PZLX=defineSZPZFL.getPluginObj("PZLX").getData();
					var WBZT01=data[0].KEY;
					if(!JL.isNull(PZLX.key)&&!JL.isNull(WBZT01)){
					var query={};
					query["WBZT01"] = WBZT01;
					query["PZLX01"] = PZLX.key;
					var resultData = defineSZPZFL.getSqlResult(query, "JCDY", "XH", "admin/scm/jcdy/search");
					console.info(resultData.data[0]["TS"]);
					var TS=resultData.data[0]["TS"]*1+1;
					defineSZPZFL.getPluginObj("XH").setData(TS);
						}
					}
			 	}
			}
		}
	},
	"PZLX" : {
		"jlid": "JLSelect",
		"sqlid": "PUBCX.PZLX",
	    "resource": "scmform",
		"cds" : "CDS",
		"cds-field": "LIST.PZLX",
		"listener":{
			"click":function(){
				debugger;
				var BJ=defineSZPZFL.getPluginObj("BJ").getData();
				if(JL.isNull(BJ)){
				var PZLX=defineSZPZFL.getPluginObj("PZLX").getData();
				defineSZPZFL.getPluginObj("PZLX01").setData(PZLX.key);
				var WBZT01=defineSZPZFL.getTab().find("input[name='WBZT01']").val();
				if(!JL.isNull(PZLX.key)&&!JL.isNull(WBZT01)){
				var query={};
				query["WBZT01"] = WBZT01;
				query["PZLX01"] = PZLX.key;
				var resultData = defineSZPZFL.getSqlResult(query, "JCDY", "XH", "admin/scm/jcdy/search");
				console.info(resultData.data[0]["TS"]);
				 var TS=resultData.data[0]["TS"]*1+1
				defineSZPZFL.getPluginObj("XH").setData(TS);
					}
				}
			}
		}
	},
	"XH" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"readonly": true ,
		"cds-field": "LIST.XH",
		"format": {
		}
	},
	"FLMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.FLMC",
		"format": {
		}
	},
	"JSFS" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.JSFS",
		"format": {
		}
	},
	"KMDM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.KMDM"
	},
	"KMMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.KMMC"
	},
	"XMBH" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.XMBH"
	},
	"ZY" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.ZY"
	},
	"XMDL" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.XMDL"
	},
	"XJLLXM" : {
		"jlid": "JLSelect",
		"sqlid": "JCDY.XJLLXM",
	    "resource": "scmform",
		"cds" : "CDS",
		"readonly": false ,
		"cds-field": "LIST.XJLLXM",
	},
	"DFKM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.DFKM"
	},
	"DFZTJFDM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.DFZTJFDM"
	},
	"DFZTJFMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.DFZTJFMC"
	},
	"DFZTDFDM" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.DFZTDFDM"
	},
	"DFZTDFMC" : {
		"jlid": "JLInput",
		"cds": "CDS",
		"cds-field": "LIST.DFZTDFMC"
	},
	"FH" : {/*人员状态(0 在职, 1, 请假, 2,辞职)*/
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "LIST.FH",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"正","1":"负"}
	},
	"FX" : {
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "LIST.FX",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"借方","1":"贷方"}
	},
	"SFQY" : {
		"jlid": "JLSelect",
		"css": "w04",
		"cds": "CDS",
		"cds-field": "LIST.SFQY",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"0":"启用","1":"不启用"}
	},
	"SQL" : {
		"jlid": "JLTextarea",
		"height": "120",
		"cds":"CDS",
		"cds-field":"LIST.SQL"
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh"
	},
	"GSXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSXX01"
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
				  		defineSZPZFL.getPluginObj("GSXX01").setData(userInfo.PCRM_GSXX01);
					}
				}
			}
		},
		
		"title" : [
		   {"id" : "ZYXX","name" : "主要信息","width" : "w03"},
		   {"id" : "XH","name" : "","width" : "w03"}, 
		   {"id" : "QTXX","name" : "其它信息","width" : "w02"}, 
		   {"id" : "JFDF","name" : "借方贷方","width" : "w02"}, 
		   {"id":"CZ", "name":"操作", "width":"w02"}
		],
		"header" : [
		    {"id" : "XH","groupid" : "XH", "rowindex" : 1, "name"  : "序号"}, 
		    {"id" : "KMDM","groupid" : "XH", "rowindex" : 2, "name"  : "科目代码"}, 
		    {"id" : "KMMC","groupid" : "XH",   "rowindex" : 3, "name"  : "科目名称"},
		    {"id" : "DFKM","groupid" : "XH", "rowindex" : 4, "name"  : "对方科目"}, 
		    {"id" : "SFQY","groupid" : "XH",   "rowindex" : 5, "name"  : "是否启用"},
		    
		    {"id" : "XZZT","groupid" : "ZYXX", "rowindex" : 1, "name"  : "账套名称"}, 
		    {"id" : "FLMC", "groupid" : "ZYXX",   "rowindex" : 2, "name"  : "分类名称"},
		    {"id" : "PZLX","groupid" : "ZYXX",   "rowindex" : 3, "name"  : "凭证类型"},
		    {"id" : "ZY","groupid" : "ZYXX", "rowindex" : 4, "name"  : "摘要"}, 
		    {"id" : "FX","groupid" : "ZYXX", "rowindex" : 5, "name"  : "借贷方向"}, 
		    
		    {"id" : "JSFS","groupid" : "QTXX",   "rowindex" : 1, "name"  : "结算方式"},
		    {"id" : "XMBH","groupid" : "QTXX",   "rowindex" : 2, "name"  : "项目编号"},
		    {"id" : "XMDL","groupid" : "QTXX",   "rowindex" : 3, "name"  : "项目大类"},
		    {"id" : "XJLLXM","groupid" : "QTXX",   "rowindex" : 4, "name"  : "现金流量项目"},
		    {"id" : "FH", "groupid" : "QTXX",   "rowindex" : 5, "name"  : "符号"},
		    
		    {"id" : "DFZTJFDM","groupid" : "JFDF", "rowindex" : 1, "name"  : "借方代码"}, 
		    {"id" : "DFZTJFMC", "groupid" : "JFDF",   "rowindex" : 2, "name"  : "借方名称"},
		    {"id" : "DFZTDFDM","groupid" : "JFDF",   "rowindex" : 3, "name"  : "贷方代码"},
		    {"id" : "DFZTDFMC","groupid" : "JFDF", "rowindex" : 4, "name"  : "贷方名称"}, 
		    
		    {"id":"SQL", "groupid":"SQL", "name":"SQL","groupcss":"w12 text_hide_none","css":"lh20"},
		    
		    {"id" : "edit","groupid" : "CZ","rowindex" : 1,"title" : "编辑","editor" : "JLEdit",
		    	"config" : {
		    		"readonly": ["XH","XZZT","PZLX"]
		        },
		        "listener": {
			    	"click":function(data){
			    	 //alert("111");
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
							}, selectedIndex, "删除", 0, defineSZPZFL.initField);
						});
					}
				}
			}
		]
	}
});

defineSZPZFL.setEvent([{
	"selector": "#search",
	"event": "click",
	"func": function(data){
		defineSZPZFL.query();
	}
}]);

defineSZPZFL.setAfterInit(function() {
	//加载Grid数据事件
	defineSZPZFL.query();
});

defineSZPZFL.query = function() {
	debugger;
	var queryField={};
	queryField["S_VALUE"] = {"$ne":"D1"};
	var GSWBZT01 = defineSZPZFL.getTab().find("[name='GSWBZT01']").val();
	if(!JL.isNull(GSWBZT01)){
		queryField["WBZT01"] = GSWBZT01;
	}
	var PZLX=defineSZPZFL.getPluginObj("GSPZLX").getData();
	if(!JL.isNull(PZLX.key)){
		queryField["PZLX01"] = PZLX.key;
	}
	queryField["GSXX01"] = userInfo["PCRM_GSXX01"];
	var resultData = defineSZPZFL.getSqlResult(queryField, "MONGO_SZPZFL", "SCM_SZPZFL", "admin/scm/jcdy/search");
	var data = resultData.data;
	/*for(var i=0;i<data.length;i++){
		data[i].SFQY={"key":data[i].SFQY01,"value":data[i].SFQY};
		data[i].FX={"key":data[i].FX01,"value":data[i].FX};
		data[i].FH={"key":data[i].FH01,"value":data[i].FH};
	}*/
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":data});
	CDS.post();
	//分页加在更多
	defineSZPZFL.getPluginObj("LIST").setPaging(resultData.fileName); 
};