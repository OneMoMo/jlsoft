var defineXTGG = JL.JLForm();
var editor=null;//这个是全局变量

defineXTGG.setPlugin({
	"toolbar" : {
	    "jlid": "JLToolBar",
	    "buttons": {
	      //新建
	      "jlNewForm":{},
	      //保存草稿
//	      "jlSaveDraft":{},
	      //提交
	      "jlSaveCard":{
	    	  "before":function(){
	    		  debugger;
	    		  var data = defineXTGG.data;
	    		  data["ke_demo"] = editor.html();
	    	  },
	    	  "success":function(data,tip){
		    		  debugger;
		    	   //自定义保存成功提示信息
		    	 //  tip.obj.remove();    //清除公共提示信息。
		    		  JL.tip("保存成功【公告编号："+data.GGBH+"】流程待办号："+data.bdbh+"-"+data.jlbh);
		    		  if(defineXTGG.getTab().find("input[name='ZDRMC']").is(":disabled")&&defineXTGG.getTab().find("input[name='SHRQ']").is(":disabled")){
		    			  defineXTGG.getTab().find("#jlSaveCard").hide();
	    			  }
	    	  }
	      },
	       //删除
	      "jlDeleteForm":{
	    	  "success": function(resultData, tip){
	    		  defineXTGG.getTab().find("#jlSaveCard").hide();
				},
	      }  
	    }
	},
	"jlbh":{
		"jlid": "JLInput",
		"format": {
		}
	},
	"GSXX01":{
		"jlid": "JLInput",
		"format": {
		}
	},
	"GGBH" : {
		"jlid": "JLInput",  
		"readonly": true, 
		"format": { 
		}
	},  
	"JSGS":{
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
		"header" : [
		            {"id":"KEY", "title":"公司编码", "css":"w06"},
		            {"id":"VALUE", "title":"公司名称", "css":"w06"}
		           ]
	},
	"JSBM":{
		"jlid": "JLMultiTree",
		"sqlid":"JLPub.select_ALLBM",
		"resource":"form",
	/*	"clickLoad":false, 
		"single":false,
		"jbToAll" :5,*/
		"param" : {}
	},
	"JSGW":{
		"jlid" : "JLMultiSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectGW.do",  
		"multi": true,
		"param" : {"GSXX01":userInfo["PCRM_GSXX01"]},
		"placeholder": "请选择！", 
		"listener":{
			"click": function(){
			}
		},
		"header" : [
		            {"id":"KEY", "title":"岗位编码", "css":"w06"},
		            {"id":"VALUE", "title":"岗位名称", "css":"w06"}
		           ]
	},
	"JSRY":{
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
			"header" : [
			            {"id":"CZY02", "title":"人员编码", "css":"w06"},
			            {"id":"VALUE", "title":"人员名称", "css":"w06"}
			           ]
	},
	"ZT" : {
		"jlid": "JLInput", 
		"format": {
		}
	}, 
	"ZDRDM" : {
		"jlid": "JLInput", 
		"format": {
		}
	}, 
	"SHRDM" : {
		"jlid": "JLInput", 
		"format": {
		}
	},
	"ZY" : {
		"jlid": "JLTextarea",
		"height": "120"
	}, 
	"XXFL" : {
		"jlid": "JLSelect",
		"sBillName": "JLInterface",
		"sOperateName": "selectXXFL.do"
	}, 
	"FJSC" : {
          "jlid": "JLUpload",
          "fileType" : ["img","text","excel","html"]  
	}, 
    "SH":{
		 "jlid": "JLRadio",
	     "default" : "Y",
		 "options": {"Y":"同意","N":"不同意"}
	}
});
 
defineXTGG.setAfterInit(function() {
	debugger;
	/*editor = KindEditor.create('#ke_demo', {allowFileManager : true,
		  items:['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
		         'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		         'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		         'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
		         'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		         'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
		         'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',//'flash', 'media', 'insertfile',
		         'anchor', 'link', 'unlink', '|', 'about']});*/
	
	editor = KindEditor.create('#ke_demo', {allowFileManager : true});
	
	//加载Grid数据事件 
	defineXTGG.getPluginObj("GSXX01").setData(userInfo["PCRM_GSXX01"]);  
	defineXTGG.getPluginObj("ZDRDM").setData(userInfo["PCRM_CZY01"]);
	defineXTGG.getTab().find("input[name='ZDRMC']").val(userInfo["PCRM_CZY03"]);
	defineXTGG.getTab().find("input[name='ZDRQ']").val(JL.formatDate(0,2));
	/*defineXTGG.getTab().find("a[id='jlDeleteForm']").hide();*/
	if (defineXTGG.getTab().find("input[name='ZDRMC']").is(":not(:disabled)")) {
	
		defineXTGG.getTab().find(".step2").hide();
		if(defineXTGG.data.jlbh>0){		
			defineXTGG.getTab().find("a[id='jlDeleteForm']").show();
		}else{
			defineXTGG.getTab().find("a[id='jlDeleteForm']").hide();
		}
		//editor.readonly(true);
	}
	if (defineXTGG.getTab().find("input[name='SHRQ']").is(":not(:disabled)")) {
		defineXTGG.getTab().find(".step1").hide();
		 
		defineXTGG.getPluginObj("SHRDM").setData(userInfo["PCRM_CZY01"]);
		defineXTGG.getTab().find("input[name='SHRMC']").val(userInfo["PCRM_CZY03"]);
		defineXTGG.getTab().find("input[name='SHRQ']").val(JL.formatDate(0,2));
		debugger;
		defineXTGG.getTab().find("a[id='jlDeleteForm']").hide();
		defineXTGG.getTab().find("a[id='jlSaveDraft']").hide();
	}
	if (!JL.isNull(defineXTGG.data.ke_demo)){
		editor.html(defineXTGG.data.ke_demo);
		editor.readonly(true);
	} 
});


