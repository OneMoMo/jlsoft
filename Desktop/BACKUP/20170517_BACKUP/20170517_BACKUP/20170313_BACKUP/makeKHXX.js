var makeKHXX = JL.JLForm();

makeKHXX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons" : {
			"jlSaveCard" : {
				"cds":"CDS",
				"success": function(data, tip){
					console.info(data);
					makeKHXX.getTab().find("#jlNewForm").click();
				}
			},
			"jlCancelSlide" : {}
		}
	},
	"CZJM":{
		"jlid": "JLToolBar",
		"buttons": {
			"jlNewForm":{}
		}
	},
	"jlbh":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.jlbh",
		"format": {
		}
	},
	"GSXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSXX01",
		"format": {
		}
	},
	"HYXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.HYXX01",
		"format": {
		}
	},
	"GSMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.GSMC",
		"format": {
		}
	},
	//查看错误信息按钮
	"DRCM":{
		"jlid":"JLToolBar",
		"buttons":{
		  "jlDEL":{
			  "name":"查看错误信息按钮",
			  "css": "jl_btn btn_blue",
			  "func":function(data){
				  if(defineKHXX.find("dl[name='MESSAGE']").is(":hidden"))
				  {
					  defineKHXX.find("dl[name='MESSAGE']").show();
				  }
				  else
				  {
					  defineKHXX.find("dl[name='MESSAGE']").hide();
				  }
			  }
		  }
		}
	},
	 //导入商品错误信息展示
	"MESSAGE": {
		"jlid"    : "JLGrid",
		"tittles" : "错误信息列表", 
		"multi":false,
		"headers" : [
		     {"id" : "NUM", "name" : "EXCEL行号", "width" : 100},
	         {"id" : "ERROR",   "name" : "错误信息", "width" : 800}
	    ]
	},
	"DJR_RYXX01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJR_RYXX01",
		"format": {
		}
	}, 
	"DJRMC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJRMC",
		"format": {
		}
	},
	
	"SMTP":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.SMTP",
		"format": {
		}
	}, 

	/*"ZGSDJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.ZGSDJ",
		"options": {"1":"冻结"},
		"listener": { 
	    }
	},
	"SXGSDJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.SXGSDJ",
		"options":{"1":"冻结"},
		"listener": { 
	    }
	},*/
	
	"DJRQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DJRQ",
		"format": {
		}
	},  
	"DWLB":{
		"jlid": "JLRadio",
		"cds": "CDS",
		"cds-field": "LIST.DWLB",
		"default":"1",
		"options":{"0":"供应商","1":"客户"}	,
		"listener":{
			"click":function(data){
				if(data.key==1){
					defineKHXX.getPluginObj("JGGK01").disabled(false);
				    defineKHXX.getPluginObj("EDKZ01").disabled(false); 
					defineKHXX.getPluginObj("JGGK01").setData([{"key":"1","value":"价格管控"}]);
					defineKHXX.getPluginObj("EDKZ01").setData([{"key":"1","value":"额度控制"}]);
					defineKHXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
					defineKHXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
					
				    defineKHXX.getPluginObj("SJKS").config.param={"WLDW20":"1","WLDW16":"1","GSXX01":userInfo["PCRM_GSXX01"]};
				    defineKHXX.getPluginObj("SJKS").init();
				}
			}
		}
	},
	"YFJZFS":{
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.YFJZFS",
		"options": {"1":"延付发货后记账","2":"延付审核后记账"}
	},
	 "JGGK01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.JGGK01",
		 "options":{"1":"价格管控"},
		 "listener": {
			 "click":function(data){
				 if(data.key==1){
					 defineKHXX.getPluginObj("JGGK").setData({"key":"1","value":"价格管控"});
				 }else{
					 defineKHXX.getPluginObj("JGGK").setData();
				 }
			 }
		 }
	 },
	 "JGGK":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.JGGK",
		 "options": {"1":"价格管控"}
	 },
	 "EDKZ01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.EDKZ01",
		 "options":{"1":"额度控制"},
		 "listener": {
			 "click":function(data){
				 if(data.key==1){
					 defineKHXX.getPluginObj("EDKZ").setData({"key":"1","value":"额度控制"});
				 }else{
					 defineKHXX.getPluginObj("EDKZ").setData();
				 }
			 }
		 }
	 },
	 "EDKZ":{
		 "jlid": "JLSelect",
		 "cds": "CDS",
		 "cds-field": "LIST.EDKZ",
		 "options": {"1":"额度控制"}
	 },
	 "YFZDSK":{
		 "jlid": "JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.YFZDSK",
		 "options": {"1":"延付结算自动收款"},
		 "listener":{
				"click": function(data, checked, obj, thisPlugin){
					if (thisPlugin.data.length > 0){
						defineKHXX.getTab().find("[name='emZFFS']").show(); 
					}else{
						defineKHXX.getTab().find("[name='emZFFS']").hide(); 
					}
				}
			}
	 }, 
	 "ZDSK":{
		 "jlid": "JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.ZDSK",
		 "options": {"1":"分销自动收款"},
		 "listener":{
				"click": function(data, checked, obj, thisPlugin){
					if (thisPlugin.data.length > 0){
						defineKHXX.getTab().find("[name='emZFFS']").show(); 
					}else{
						defineKHXX.getTab().find("[name='emZFFS']").hide(); 
					}
				}
			}
	 }, 
	 "YXBJ01":{
		 "jlid":"JLCheckbox",
		 "cds": "CDS",
		 "cds-field": "LIST.YXBJ01",
		 "options":{"1":"有效"},
		 "default": "1",
		 "listener": {
			 "click":function(data){
				 if(data.key==0){
					 defineKHXX.getPluginObj("YXBJ").setData({"key":"0","value":"无效"});
				 }else{
					 defineKHXX.getPluginObj("YXBJ").setData({"key":"1","value":"有效"});
		    	 }
			 }
		 }
	},
	"YXBJ" : {
		"jlid" : "JLCheckbox",
		"options" : {
			"1" : "有效"
		},
		"cds" : "CDS",
		"cds-field" : "LIST.YXBJ",
		"format" : {
			"null" : false
		}
	},
	"WLDW01":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.WLDW01",
		"format": {
		}
	},
	"WLDWMC":{
		"jlid": "JLInput",
		"placeholder" : "请输入客户名称",
		"cds": "CDS", 
		"cds-field": "LIST.WLDWMC",
		"format": {
		},
		"listener":{
			"blur":function(data){ 
				if (JL.convertToPinYin(data).length>0){
					defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)[JL.convertToPinYin(data).length-1]); 
				}else{
					defineKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(data)); 
				}
			}
        }
	},
	"PYM":{
		"jlid": "JLInput",
		"readonly":true,
		"cds": "CDS", 
		"cds-field": "LIST.PYM",
		"format": {
		}
	},
	
	"CWXTBM":{
		"jlid": "JLInput",
		"readonly":true,
		"cds": "CDS", 
		"cds-field": "LIST.CWXTBM",
		"format": {
		}
	},
	"JC":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JC",
		"format": {
		}
	},
	"DZ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.DZ",
		"format": {
		}
	},
	"KHYH" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.KHYH",
		"format": {
		}
	},
	"YHZH" : {
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YHZH",
		"format": {
		}
	},
	"SWDJH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.SWDJH",
		"format": {
		}
	},
	"SHDZ" : {
		"jlid": "JLSelectTree",
		"sBillName": "JLInterface",
		"sOperateName": "getDQXX.do",
		"cds": "CDS",
		"multi": false,
	    "cds-field": "LIST.SHDZ",
		"text": true
	},
	"KPHT":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.KPHT",
		"format": {
		}
	},
	"FLKPFS":{
		"jlid": "JLSelect",
		"placeholder" : "请选择发票类型",
		"cds": "CDS",
		//"default":"1",
		"cds-field": "LIST.FLKPFS", 
		"options": {"0":"红字发票","1":"票折"}
	},
	"FPLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择发票类型",
		"cds": "CDS",
		"default":"1",
		"cds-field": "LIST.FPLX",
		"options": {"0":"普通发票","1":"增值税发票"}
	},
	"FRDB":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.FRDB",
		"format": {
		}
	},
	"HY":{
		"jlid": "JLSelect",
		"placeholder" : "请选择客户行业",
		"cds": "CDS",
		"cds-field": "LIST.HY",
		"sqlid": "PUBCX.HYXX",
		"resource": "scmform"
	},
	"LXDH":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.LXDH",
		"format": {
			"number":true,
			"null":false
		}
	},
	"LXR":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.LXR",
		"format": {
			"null":false
		}
	},
	"YZBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YZBM",
		"format": {
		}
	},
	"CZHM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.CZHM",
		"format": {
		}
	},
	/*"JXSL":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.JXSL",
		"format": {
		}
	},*/
	"KSLX":{
		"jlid": "JLSelect",
		"placeholder" : "请选择客户类型",
		"cds": "CDS",
		"cds-field": "LIST.KSLX",
		"sqlid": "PUBCX.KSLX",
		"param" : {"KSLX05":"1"},
		"resource": "scmform"
	},

	"SJKS":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "get_WLDW.do", 
		"multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"cds": "CDS",
	    "cds-field": "LIST.SJKS",
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"YWY":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectRYXX.do", 
		"multi" : false,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"],"RYXX08":"3"},
		"cds": "CDS",
	    "cds-field": "LIST.YWY",
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		}
	},
	"FXZQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.FXZQ",
		"format": {
		}
	},
	"YFZQ":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.YFZQ",
		"format": {
		}
	},
	"CJBM":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.CJBM",
		"format": {
		}
	},
	"QY":{
		"jlid": "JLInput",
		"cds": "CDS", 
		"cds-field": "LIST.QY",
		"format": {
		}
	},
	"JSBZ":{
		"jlid": "JLSelect",
		"placeholder" : "请选择结算币种",
		"cds": "CDS",
		"cds-field": "LIST.JSBZ",
		"sqlid": "JCDY.BZ",
		"resource": "scmform"
	},
	/*"ZFFS":{
		"jlid": "JLSelect",
		"placeholder" : "请选择支付方式",
		"cds": "CDS",
		"cds-field": "LIST.ZFFS",
		"sqlid": "PUBCX.SKFS",
		"resource": "scmform",
		"param": {"SKFS":["17","9"]}//9 单位应收 ;17 冲预收款
	}, */
	"ZFFS":{
		"jlid": "JLSelect",
		"placeholder" : "请选择支付方式",
		"cds": "CDS",
		"cds-field": "LIST.ZFFS",
		"options": {"0":"单位应收","1":"冲预收款"}
	},

});

makeKHXX.setEvent([
	{
		"selector": "[name='WLDWMC']",
		"event": "keyup",
		"func": function(data,event){
			var WLDWMC=makeKHXX.getTab().find("input[name='WLDWMC']").val();
		//	makeKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC));
			if (JL.convertToPinYin(WLDWMC).length>0){
				makeKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC)[JL.convertToPinYin(WLDWMC).length-1]); 
			}else{
				makeKHXX.getPluginObj("PYM").setData(JL.convertToPinYin(WLDWMC)); 
			}
		}
	},
	{
		"selector": "[data-id='KSXX']",
		"event": "click",
		"func": function(){
			makeKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	},
	{
		"selector": "[data-id='LXFS']",
		"event": "click",
		"func": function(){
			makeKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	},
	{
		"selector": "[data-id='ZFXX']",
		"event": "click",
		"func": function(){
			makeKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	},
	{
		"selector": "[data-id='QTXX']",
		"event": "click",
		"func": function(){
			makeKHXX.getTab().find("[id='jlSaveCard']").show();
		}
	}/*,
	{
		"selector": "[data-id='PLDR']",
		"event": "click",
		"func": function(){
			makeKHXX.getTab().find("[id='jlSaveCard']").hide();
		}
	}*/
]);

makeKHXX.setAfterInit(function() {
	
	debugger;
	JL.tab(makeKHXX, {
		"KSXX": "基础信息",
		"LXFS": "联系方式",
		"ZFXX": "支付信息",
		"QTXX": "其他信息"/*,
		"PLDR": "批量导入"*/
	});
	
	makeKHXX.getTab().find("input[name='GSXX01']").val(userInfo["PCRM_GSXX01"]);// 公司信息
	makeKHXX.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
	makeKHXX.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0,2));
    if (makeKHXX.getTab().find("input[name='ZDRMC']").is(":not(:disabled)"))
    {
    	makeKHXX.getTab().find(".step2").hide();
    }
    
    // 初始化流程步骤相关数据-制单
    makeKHXX.getTab().find("input[name='ZDR_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
    makeKHXX.getTab().find("input[name='ZDRMC']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
    makeKHXX.getTab().find("input[name='ZDRQ']:not(:disabled)").val(JL.formatDate(0, 2));
    // 初始化流程步骤相关数据-审核
    makeKHXX.getTab().find("input[name='SHR1_RYXX01']:not(:disabled)").val(userInfo["PCRM_CZY02"]);
    makeKHXX.getTab().find("input[name='SHRMC1']:not(:disabled)").val(userInfo["PCRM_CZY03"]);
    makeKHXX.getTab().find("input[name='SHRQ1']:not(:disabled)").val(JL.formatDate(0, 2));
    //加载Grid数据事件
	makeKHXX.query();
});



makeKHXX.query = function(){
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getSCMCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	debugger;
	var queryField = {};
	var DMMC = makeKHXX.getTab().find("[name='DMMC']").val();
	if(!JL.isNull(DMMC)){
		queryField["DMMC"] = DMMC;
	}
	queryField["S_VALUE"] = {"$ne":"D1"};
	queryField["GSXX01"] = userInfo["PCRM_GSXX01"];

	debugger;
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = makeKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX1", "admin/scm/jcdy/search");
	        
	    	makeKHXX.getPluginObj("GSXX01").config.options = {};
	    	makeKHXX.getPluginObj('GSXX01').config.param = {"CZY14":"1"};
	    	makeKHXX.getPluginObj('GSXX01').init();
	    }else if (data.CZY14==2){
	    	var resultData = makeKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX2", "admin/scm/jcdy/search");
	    	
	    	makeKHXX.getPluginObj("GSXX01").config.options = {};
	    	makeKHXX.getPluginObj('GSXX01').config.param = {};
	    	makeKHXX.getPluginObj('GSXX01').init();
	    }else{
	    	var resultData = makeKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = makeKHXX.getSqlResult(queryField, "MONGO_KHXX", "SCM_KHXX", "admin/scm/jcdy/search");
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	makeKHXX.getPluginObj("LIST").setPaging(resultData.fileName); 
};