var defineBM = JL.JLForm();

defineBM.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(){
					console.info('before');
				},
				"success":function(data,tip){
					console.info('success');
					defineBM.query();
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
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.jlbh",
		"readonly": true,
		"format":{	
		}
	},
/*	"BMLX" : {
		  "jlid": "JLSelect",
		  "cds" : "CDS",
		  "cds-field": "LIST.BMLX",
		  "options": {"1":"A类","2":"B类","3":"C类","4":"D类"}
	},*/
	"BMBH" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"readonly": true,
		//"placeholder": "请输入两位长度编码(数字或字符)",
		"cds-field": "LIST.BMBH", 
		"format": { 
		}
	},
	"BM01" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.BM01",
		"readonly": true, 
		"format": { 
		}
	},
	"SCM_BM01" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.SCM_BM01",
		"readonly": true, 
		"format": { 
		}
	},
	"BM02" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.BM02",
		"placeholder": "请输入部门名称", 
		"format": {
			"null": false
		}
	},
	"BM03" : {
		"jlid": "JLInput", 
		"cds" : "CDS",
		"cds-field": "LIST.BM03",
		"readonly": true,
		"format": { 
		}
	},
	"BM_BM01":{
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field": "LIST.BM_BM01",
		"readonly": true
	},
	"GSZT" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "JLPub.selectGSXX",
		"resource" : "workflow",
		"cds" : "CDS",
		"cds-field": "LIST.GSZT",
		"multi": false,
		"placeholder": "请选择公司帐套！", 
		"listener":{
			"click": function(){
				//alert("自己写");
			}
		}
	},
	"MJBJ" : {
	    "jlid": "JLRadio",
		"cds" : "CDS",
		"cds-field": "LIST.MJBJ",
		"default": "0", 
		"options": {"1":"末级","0":"非末级"},
		"listener":{
			 "click": function(data){
				 console.info('BMSX');
				 if (data.key==0){  
					 defineBM.getPluginObj("BMSX").disabled(true);
					 defineBM.getPluginObj("BMSX").setData();
				 }else{ 
					 defineBM.getPluginObj("BMSX").disabled(false);
				 }
			 }
	    }
	},
	/*"MJBJ" : { 
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.MJBJ", 
		"options": {"1":"末级"},
		"listener": { 
	    }
	},*/
	"BMSX" : {
		  "jlid": "JLRadio", 
		  "cds" : "CDS",
		  "cds-field": "LIST.BMSX",
		  "options": {"2":"采购","3":"销售","4":"其他"},
		  "listener":{
				 "click": function(data){
					 console.info('BMSX');
					 if (data.key==2||data.key==3){  
						// defineBM.getTab().find('[name="emgszt"]').show();
					 }else{ 
						 //defineBM.getTab().find('[name="emgszt"]').hide();
					 }
				 }
		   }
	},
	"YXBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
		"default" : "1",
		"options": {"1":"有效"},
		"listener": { 
	    }
	},
	"GCBJ" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"cds-field": "LIST.GCBJ",
		"placeholder" : "请选择",
		"css": "w04",
		"default": "0", 
		"options": {"-1":"市场部","1":"家用销售","2":"商用销售"}
	},
	"FLBJ" : {
		"jlid": "JLSelect",
		"cds": "CDS",
		"css": "w04",
		"cds-field": "LIST.FLBJ",
		"placeholder" : "请选择",
		"default": "0", 
		"options": {"1":"家用返利","2":"商用返利"}
	},
	"LIST" : {
		"jlid" : "JLTreeGrid",
		"cds" : "CDS", 
		"current": "BMBH",		//当前节点
		"parent": "BM_BM01",	//上级节点
		"level": "BM03",		//级别 
		"final": {"id":"MJBJ", "key": "1"},//末级标记
		"paging": "more",
		"buttons": {
			/*"jlNew": {
				"listener":{
					 "click": function(data){   
						defineBM.getPluginObj("BMSX").disabled(true);
						defineBM.getPluginObj("BMSX").setData(); 
					 }
			    }
			}*/
	    },
		"title" : [
		     {"id":"TREE", "name":"代码/名称", "width":"w09"},
			 {"id":"CZ", "name":"操作", "width":"w03"}
        ],
		"header" : [
             {"id":"jlbh", "title":"jlbh", "hidden":true},
			 {"id":"BM03", "title":"级别", "hidden":true},
			 {"id":"MJBJ", "title":"末级标记", "hidden":true},
			 {"id":"BM_BM01", "title":"上级部门编码", "hidden":true},	 
			 {"id":"BM_BM02", "title":"上级部门名称", "hidden":true},	
			/* {"id":"BMLX", "title":"部门类型", "hidden":true},*/
			 {"id":"GSZT",  "title":"所属公司帐套", "hidden":true}, 
			 {"id":"BMSX", "title":"部门属性", "hidden":true}, 
			 {"id":"BM01", "title":"部门属性", "hidden":true},
             {"id":"BMBH", "groupid":"TREE", "title":"代码"},
             {"id":"BM02", "groupid":"TREE", "title":"名称"},
             {"id":"newChild", "groupid":"CZ", "title":"新增子级", "editor":"JLNewChild", 
            	 "config":{
	            	 "readonly": ["jlbh","BM_BM01","BM03","BM_BM02","GSZT"],
	            	 "mapping":{"BM03":"BM03","BMBH":"BM_BM01","GSZT":"GSZT"}/*"BM02":"BM_BM02",*/
            	 },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 console.info(data);
	        			 
	        			 defineBM.getPluginObj("MJBJ").disabled(false);
	        			 if(data.MJBJ.key == 0){
	        				 defineBM.getPluginObj("BMSX").disabled(true);
	        				 defineBM.getPluginObj("BMSX").setData();
            			 } else {
            				 defineBM.getPluginObj("BMSX").disabled(false);
            			 } 
	        		 }
	        	 }
             },
             {"id":"edit", "groupid":"CZ", "title":"编辑", "editor":"JLEdit", 
            	 "config":{
	            	 "readonly": ["BMBH","BM01","jlbh","BM_BM01","BM03","BM_BM02","GSZT"],
	            	 "mapping":{}
	             },
	             "listener":{
	        		 "click": function(data, rowIndex, obj, plugin){
	        			 console.info(data);
	        			 if (data.BM_BM01==""){
	        				 JL.tip("首部门为公司级别不能编辑，请在定义公司账套界面进行修改！","error");
	        				 defineBM.query(); 
	        			 }
	        			 if(plugin.obj.find("div.jl_tree_02[data-id='"+data.BMBH+"'] dl").length > 0){
	        				 defineBM.getPluginObj("MJBJ").disabled(true);
            			 } else {
            				 defineBM.getPluginObj("MJBJ").disabled(false);
            			 }
	        			 if(data.MJBJ.key == 0){
	        				 defineBM.getPluginObj("BMSX").disabled(true);
	        				 defineBM.getPluginObj("BMSX").setData();
            			 } else {
            				 defineBM.getPluginObj("BMSX").disabled(false);
            			 } 
	        		 }
	        	 }
             }/*,
             {"id":"delete", "groupid":"CZ", "title":"删除", "editor":"link",
            	 "listener":{
            		 "click": function(data, rowIndex, obj, plugin){
            			 console.info(data);
            			 var XmlData = data;
            			 XmlData["S_VALUE"]= "D1"; 
            			 XmlData["YXBJ"] = {"key":"1", "value":"无效"};
            			 var ajaxJson = {};
            			 ajaxJson["src"] = "form/saveRecord.do";
            			 ajaxJson["data"] = {"jyl":true,"json":JSON.stringify(XmlData)};
            			 var resultData = JL.ajax(ajaxJson);
            			 console.info(resultData);
            			 if(!JL.isNull(resultData)){
            				 plugin.removeRow(rowIndex);
            			 }
            		 }
            	 }
             }*/
		]
	}
});

defineBM.setEvent([{
	"selector": "#query",
	"event": "click",
	"func": function(){
		defineBM.query();
	}
}])

defineBM.setAfterInit(function() {
	JL.tab(defineBM, {
		"JCXX": "基础信息"
	});
	  
	//加载Grid数据事件
	defineBM.query();
	
//	defineBM.getTab().find('[name="emgszt"]').hide();
});


defineBM.query = function() {
	console.info('defineBM.query');
	
	var query1={}; 
	query1["CZY01"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl") + "/DefineRY/getCZY.do";
	ajaxJson["data"] = {"XmlData": JSON.stringify(query1)};
	var resultData = JL.ajax(ajaxJson);
	var data = resultData.data.returnList[0];
	
	var query={};
	var search = defineBM.getTab().find("[name='CXTJ']").val();
	query["S_VALUE"] = {"$ne":"D1"};
	query["GSXX01"] = userInfo.PCRM_GSXX01;
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	
	if(!JL.isNull(data)){
	    if (data.CZY14==1){
	    	var resultData = defineBM.getSqlResult(query, "MONGO_BM", "SCM_BM1", "admin/scm/jcdy/search");
	    	debugger;
	    	/*defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {"CZY14":"1"};
			defineRY.getPluginObj('SSGS').init();*/
	    }else if (data.CZY14==2){
	    	var resultData = defineBM.getSqlResult(query, "MONGO_BM", "SCM_BM2", "admin/scm/jcdy/search");
	    	/*
	    	defineRY.getPluginObj("SSGS").config.options = {};
			defineRY.getPluginObj('SSGS').config.param = {};
			defineRY.getPluginObj('SSGS').init();*/
	    }else{
	    	var resultData = defineBM.getSqlResult(query, "MONGO_BM", "SCM_BM", "admin/scm/jcdy/search");
	    }
	}else{
		var resultData = defineBM.getSqlResult(query, "MONGO_BM", "SCM_BM", "admin/scm/jcdy/search");
	}
	
	var CDS = this.getCds("CDS");
	CDS.edit(); 
	CDS.setData({"LIST":resultData.data}); 
	CDS.post(); 
	defineBM.getPluginObj("LIST").setPaging(resultData.fileName);  
};
