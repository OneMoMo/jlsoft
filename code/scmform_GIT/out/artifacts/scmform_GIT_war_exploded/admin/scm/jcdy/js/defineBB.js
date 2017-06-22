var defineBB = JL.JLForm();
var editor=null;//这个是全局变量
defineBB.setPlugin({
	"footer" : {
		"jlid" : "JLToolBar",
		"jlCancelSlide" : {},
		"buttons" : {
			"new": {	
				"name": "提交",
				"icon": "check",
				"css": "jl_btn btn_color mr10",
				"func": function(){
					if(JL.isNull(defineBB.getPluginObj("BBBH").getData())){
						//新增插入
						debugger;				
						var ajaxJson = {};
						var XmlData=defineBB.config();	
						var MBLB=XmlData["MBLB"];
								
						if(JL.isNull(XmlData["BBMC"])){
							 JL.tip("报表名称不允许为空");
							 return;
						}
						if(JL.isNull(XmlData["BBFL"])){
							 JL.tip("报表分类不允许为空");
							 return;
						}if(JL.isNull(XmlData["FZBH"])){
							 JL.tip("报表分组不允许为空");
							 return;
						}
						if(JL.isNull(MBLB)){
							 JL.tip("请填写模板信息");
							 return;
						}
						for(var i=0;i<MBLB.length;i++){			
						    if(JL.isNull(MBLB[i].BBMB)){
							 	  JL.tip("模板URL地址不允许为空");
							 	   return;	
						      }else if(JL.isNull(MBLB[i].DSLX)){
							 	 JL.tip("数据源类型不允许为空");
								 	return;	
							 }else if(JL.isNull(MBLB[i].MRBJ)){
								 JL.tip("择默认模板");
								 return;
							}
						}
						 ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
						 ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineBB/checkBB.do";
						 var resultData= JL.ajax(ajaxJson);
						 debugger;
						 if(!JL.isNull(resultData.data)){
							 ajaxJson["data"] = {"XmlData": JSON.stringify(resultData)};
							 ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineBB/insertBB.do";
						     resultData= JL.ajax(ajaxJson);
							 debugger;	
							 if(!JL.isNull(resultData.data)){
						    		resultData = resultData.data;
						    		if(resultData.returnMap == "1"){
						    			JL.tip("提交成功");
						    			defineBB.query();
						    			return true;
						    		}
						    	}			 
						 }
					}else{	
						// 修改        
					debugger;
	    			var ajaxJson = {};
	    			var XmlData=defineBB.config();	
	    			debugger;
	    			var BBMC=XmlData["BBMC"];
	    			var BBBH=XmlData["BBBH"];
	    			var query={};
					query["BBMC"]=BBMC;
					var result = defineBB.getSqlResult(query, "MONGO_BB", "FORM_BB", "admin/scm/jcdy/search");
					debugger;
					if(JL.isNull(result)){
						 JL.tip("报表名称已经存在");
					}
	    			 ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
					 ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineBB/checkBB.do";
					 var resultData= JL.ajax(ajaxJson);
					 debugger;
					 if(!JL.isNull(resultData.data)){
							ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineBB/updateBB.do";                                           
			    			ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
			    			var resultData = JL.ajax(ajaxJson);
			    			if(!JL.isNull(resultData.data)){
						    		resultData = resultData.data;
						    		if(resultData.returnMap == "1"){
						    			JL.tip("修改成功");
						    			defineBB.query();
						    			return true;
						    		}
						    	}			 
					 }
	    			
			}
				 }
				},
		  "cancel": {
				"name": "取消",
				"icon": "check",
				"css": "jl_btn btn_color",
				"func": function(){
					defineBB.getTab().find(".addCarShow ").hide();
					
				  }
				}
        },
},
	"jlbh" : {
		"jlid" : "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.jlbh",
		"format" : {}
	},
	
	"GSXX01":{
		"jlid": "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.GSXX01",
		"format" : {}
	},
	"BM01":{
		"jlid": "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.BM01",
		"format" : {}
	},	
	"BBBH":{
		"jlid": "JLInput",
		"readonly": true,
		"cds" : "CDS",
		"cds-field" : "LIST.BBBH",
	},
	"BBMC":{
		"jlid": "JLInput",
		"cds" : "CDS",
		"cds-field" : "LIST.BBMC",	
	},
	"BBFL":{
		"jlid": "JLSelect",
   		"placeholder" : "请选择类型",
   		"update":true, 
 		"options": {"0":"经营","1":"营销","2":"生产","3":"研发","4":"财务"},
	    "cds" : "CDS",
		"cds-field" : "LIST.BBFL",
	},
	"FZXH":{
		"jlid": "JLInput",
		"cds" : "CDS",
	    "cds-field" : "LIST.FZXH",
	},
	"FZBH":{
		"jlid": "JLInput",
		"cds" : "CDS",
	    "cds-field" : "LIST.FZBH",
	},
	
  "BBFZ":{
		"jlid": "JLSearch",
   		"placeholder" : "请选择类型",
   		"queryConfig":{
   			"dir": "admin/scm/jcdy/search",
   	   		"namespace":"BB",
   			"sqlid": "FZ",
   			"init": {"GSXX01":"GSXX01"},
   			"fieldMapping" : {
				"FZ01": "FZBH",
				"FZ02": "BBFZ",
				"FZ03": "FZXH",
			}
			},
   		"cds" : "CDS",
	    "cds-field" : "LIST.FZMC",
	    "readonly": true,

	},
	"BBMS" : {
		"jlid": "JLTextarea",
		"height": "120",
		"cds" : "CDS",
		"cds-field" : "LIST.BBMS",
	}, 
	 "YXBJ":{
		 "jlid": "JLRadio",
	     "default" : "1",
		 "options": {"1":"有效","2":"无效"},
		 "cds" : "CDS",
         "cds-field" : "LIST.YXBJ",
   },
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "more",
		"multi":false,
		"cds" : "CDS",
		"rowclass": "pl10",
		"buttons" : {
			"jlNew":{}
		},
		"title" : [
	    	{"id":"BBBH", "name":"报表编号", "width":"w02"},
	    	{"id":"BBMC", "name":"报表名称", "width":"w02"},
	    	{"id":"FZMC", "name":"报表分组", "width":"w02"},
	    	{"id":"BBFL", "name":"报表类型", "width":"w02"},
	    	{"id":"YXBJ", "name":"有效标记", "width":"w02"},
	    	{"id":"CZ", "name":"操作", "width":"w01 tc pr15"}
	    ],
	    "header" : [
	        {"id":"GSXX01","hidden":true},
	        {"id":"BM01", "hidden":true},
            {"id":"bdbh", "hidden":true},
            {"id":"jlbh", "hidden":true},
		    {"id":"BBBH", "groupid":"BBBH", "title":"报表编号", "width":"w02"},
		    {"id":"BBMC", "groupid":"BBMC", "title":"报表名称", "width":"w02"},
		    {"id":"FZMC", "groupid":"FZMC", "title":"报表分组", "width":"w02"},
		    {"id":"BBFL", "groupid":"BBFL", "title":"报表类型", "width":"w02"},
		    {"id":"YXBJ", "groupid":"YXBJ", "title":"有效标记", "width":"w02"},
		    {"id":"update", "title":"编辑", "editor":"JLEdit", "groupid":"CZ", "rowindex":1, 
		    	"config":{
		    		"readonly": ["BBBH"],
		    		"mapping":{}
		    	},
		    	"listener": {
		    	  "edit":function(thisPlugin,rowIndex){//参数data为点击的值，是个json对象
		    		  debugger;
		    	}
		    	}
		    },    
		    {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "css":"", "editor":"link",
				"listener":{
					"click": function(thisPlugin, rowIndex, obj){
						debugger;
						if(!JL.isNull(thisPlugin.getData(rowIndex, "BBBH"))){
				    		JL.confirm("是否确认删除?", function(){
				    			debugger;
				    				var ajaxJson={};
									var data = thisPlugin.getData(rowIndex);
									ajaxJson["src"] = pubJson.getURL("FormUrl") + "/defineBB/deleteBB.do";                                           
					    			ajaxJson["data"] = {"XmlData": JSON.stringify(data)};
					    			var resultData = JL.ajax(ajaxJson);
					    			 if(!JL.isNull(resultData.data)){
								    		resultData = resultData.data;
								    		if(resultData.returnMap == "1"){
								    			JL.tip("删除成功");
								    			defineBB.query();
								    			return true;	
								    		}
								    	}			 
				    		});
		    			}
					}
				}
			}
        ]
	},
	"MBLB" : {
		"jlid" : "JLGrid",
		"buttons": [1,2],
		"cds": "CDS",
		"cds-field": "LIST.MBLB",
	    "headers" : [
		    {"id":"MBBH", "name":"模板编号", "width": 100,"hidden":true,
		    	 "editor": {
		    		 "type":"text",
	           		 "jlid": "JLInput",
			    	 }
		    },
		    {"id":"MBMC", "name":"模板名称", "width": 100,
		    	 "editor": {
		    		 "type":"text",
	           		 "jlid": "JLInput",  				
			    	 }
		    },
		    {"id":"BBMB", "name":"模板URL地址", "width": 250,
		    	 "editor": {
           		    "type":"plugin",
           		    "jlid": "JLUpload"//,
           			//"fileType" : [ "excel" ],	   
		    	 }
		    },
		    {"id":"DSLX", "name":"数据源类型", "width": 100,
		    	 "editor": {
	           		"type":"plugin",
	           		"jlid": "JLSelect",
	           		"placeholder" : "请选择类型",
               		"update":true, 
    	     		"options": {"1":"ORACLE","2":"MONGODB"}, 	       
		    	 }
		    },  
		    {"id":"QX", "name":"权限", "width": 100,
		    	 "editor": {
		    		  "type":"text",
	           		 "jlid": "JLInput",
			    	   }
		    },
		    {"id":"TSQX", "name":"推送权限", "width": 100,  
		    	 "editor": {
	           		    "type":"text",
	           		    "jlid": "JLInput",
			    	   } 	
		    },
		    {"id":"MRBJ", "name":"模板默认标记", "width": 100, 
		    	 "editor": {
		    		"type":"checkbox", 
		    	 }
		    },
		    {"id":"JSGS", "name":"接收公司", "width": 300, 
		    	 "editor": {
		    		"type":"plugin",
		    		"jlid" : "JLMultiSelect",
	    			"sBillName": "JLInterface",
	    			"sOperateName": "selectGSXX.do",  
	    			"multi": true,
	    			"param" : {},
	    			"placeholder": "请选择！", 
	    			"listener":{
	    				"click": function(){
	    				}
	    			},
		    	 }
		    },
		    {"id":"JSBM", "name":"接收部门", "width": 300, 
		    	 "editor": {
		    		   "type":"plugin",
		    			"jlid": "JLMultiTree",
		    			"sqlid":"JLPub.select_ALLBM",
		    			"resource":"form",
		    			"param" : {}
			    	   }
		    },
		    {"id":"JSGW", "name":"接收岗位", "width": 300, 
		    	 "editor": {
		    		"type":"plugin",
		    		"jlid" : "JLMultiSelect",
	    			"sBillName": "JLInterface",
	    			"sOperateName": "selectGW.do",  
	    			"multi": true,
	    			"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
	    			"placeholder": "请选择！", 
	    			"listener":{
	    				"click": function(){
	    				}
	    			}
			    	   }
	    			
		    	
		    },   
		  	 {"id":"JSRY", "name":"接收人员", "width": 300, 
		    	 "editor": {
		    		"type":"plugin",
		    		"jlid" : "JLMultiSelect",
		 			"sBillName": "JLInterface",
		 			"sOperateName": "selectCZY.do",  
		 			"multi": true,
		 			"param" : {},
		 			"placeholder": "请选择！", 
		 			"listener":{
		 				"click": function(){
		 				}
		 			},
		 			 }
		    },
		   
		],
		"listener": {
			"loadRow": function(thisPlugin, data, rowIndex, dl){	
			}
		},
		"queryConfig": {
			
		}
	},
});
 
defineBB.setAfterInit(function() {
	defineBB.query();
});
defineBB.query = function(){
	debugger;
	defineBB.getPluginObj("GSXX01").setData(userInfo["PCRM_GSXX01"]);  
	defineBB.getPluginObj("BM01").setData(userInfo["PCRM_BM01"]);
	var query={};
	query["GSXX01"] =userInfo.PCRM_GSXX01;
	query["BM01"] = userInfo["PCRM_BM01"];
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineBB.getSqlResult(query, "MONGO_BB", "FORM_BB", "admin/scm/jcdy/search");
    var CDS = this.getCds("CDS");
	CDS.edit(); 
	CDS.setData({"LIST":resultData.data}); 
	CDS.post(); 
	defineBB.getPluginObj("LIST").setPaging(resultData.fileName);  
	debugger;
};

defineBB.config = function(){
	debugger;
	var XmlData={}; 
	XmlData["GSXX01"] = defineBB.getPluginObj("GSXX01").getData();
	XmlData["BM01"] = defineBB.getPluginObj("BM01").getData();
	XmlData["jlbh"] = defineBB.getPluginObj("jlbh").getData();
	XmlData["MBLB"] = defineBB.getPluginObj("MBLB").getData();
	XmlData["BBBH"] = defineBB.getPluginObj("BBBH").getData();
	XmlData["BBMC"] = defineBB.getPluginObj("BBMC").getData();
	XmlData["BBFL"] = defineBB.getPluginObj("BBFL").getData();
	XmlData["BBMS"] = defineBB.getPluginObj("BBMS").getData();
	XmlData["YXBJ"] = defineBB.getPluginObj("YXBJ").getData();
	XmlData["FZMC"] = defineBB.getPluginObj("BBFZ").getData();
	XmlData["FZBH"] = defineBB.getPluginObj("FZBH").getData();
	XmlData["FZXH"] = defineBB.getPluginObj("FZXH").getData();
	return XmlData;
};
