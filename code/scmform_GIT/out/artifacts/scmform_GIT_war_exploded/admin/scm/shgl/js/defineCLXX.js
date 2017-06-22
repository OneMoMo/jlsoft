/**
 * @author 陈奇
 * 2016年8月31日16:37:01
 */
var defineCLXX = JL.JLForm();

defineCLXX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSaveCard":{
				"grid": "LIST",   //保存成功后，数据写到对应列表控件上显示。
				"before": function(data){
					debugger;
					console.info(data);
				},
				"success":function(data){
					console.info('after');
					defineCLXX.query();
				}
			},
			"jlCancelSlide":{}
			/*"jlEmptyCard":{}*/
		}
	},
	"jlbh" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.jlbh",
		 "format":{}
	},
	//网点编号
	"WDBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.WDBM",
		 "format":{}
	},
	//货运公司编码
	"HYGSBM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.HYGSBM",
		 "format":{}
	},
	//编码（不分货运公司编码，网点编号）
	"BM" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.BM",
		 "format":{}
	},
	"CLLX" : {
		 "jlid": "JLRadio",
		 "cds":"CDS",
		 "cds-field":"LIST.CLLX",
		 "default": "0",
		 "options" : {"0":"定义网点车辆","1":"客运公司车辆"},
		 "listener": {
		        "change":function(data){
		        	     debugger;
		                if(data.key==1){
		                    //显示货运公司
		                	defineCLXX.getTab().find("#LI_HYGS").show();
		                	//屏蔽送货网点
		                	defineCLXX.getTab().find("#LI_SHWD").hide();
		                	//清空送货网点数据
		                	defineCLXX.getPluginObj("WDBM").setData("");
		                	defineCLXX.getPluginObj("WDMC").setData({});
		                	//屏蔽车牌号
		                	defineCLXX.getTab().find("#LI_CPH").hide();
		                	//清空车牌号数据
		                	defineCLXX.getPluginObj("CPH").setData("");
		                	/*//显示配送方式
		                	defineCLXX.getTab().find("#LI_PSFS").show();*/
		                	
		                }
		                if(data.key==0){
		                	//屏蔽货运公司
		                	defineCLXX.getTab().find("#LI_HYGS").hide();
		                	//清空货运公司数据
		                	defineCLXX.getPluginObj("HYGSBM").setData("");
		                	defineCLXX.getPluginObj("HYGSMC").setData({});
		                	//显示送货网点
		                	defineCLXX.getTab().find("#LI_SHWD").show();
		                	/*//屏蔽配送方式
		                	defineCLXX.getTab().find("#LI_PSFS").hide();
		                	//清空配送方式的值
		                	defineCLXX.getPluginObj("PSFS").setData("");*/
		                	//显示车牌号
		                	defineCLXX.getTab().find("#LI_CPH").show();
		                }
		               
		        }
		}
	},
	
     //送货网点
	"WDMC" : {
		 "jlid": "JLSelect",
		 "cds":"CDS",
		 "cds-field":"LIST.WDMC",
		 "sqlid" : "PUBCX.SHWD",
			"resource" : "scmform",
			"listener": {
		        "change":function(data){
		        	debugger;
		        	defineCLXX.getPluginObj("WDBM").setData(data.key);
		        	defineCLXX.getPluginObj("BM").setData(data.key);
		        }
			}
	},
	//货运公司
	"HYGSMC" : {
		 "jlid": "JLSelect",
		 "cds":"CDS",
		 "cds-field":"LIST.HYGSMC",
		 "sqlid" : "PUBCX.RYWLGS",
			"resource" : "scmform",
			"listener": {
		        "change":function(data){
		        	debugger;
		        	defineCLXX.getPluginObj("HYGSBM").setData(data.key);
		        	defineCLXX.getPluginObj("BM").setData(data.key);
		        	
		        }
			}
	},
	//车辆名称
	"CLMC" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CLMC",
		 "format":{}
	},
	//体积
	"YZZTJ" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.YZZTJ",
		 "format":{}
	},
	//装载体积
	"CLXX" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CLXX",
		   "format": {
		        "number":true
		         },
		    "listener": {
			  "blur":function(data){
				       debugger;
			        	if(isNaN(data)||data<0){
			        		JL.tip("装载体积只允许输入非负数");
			        		//清空
			        		defineCLXX.getPluginObj("CLXX").setData("");
			        	}
			    }
			}
	},
	//车牌号
	"CPH" : {
		 "jlid": "JLInput",
		 "cds":"CDS",
		 "cds-field":"LIST.CPH",
		 "format":{}
	},
	//有效
	"YXBJ" : {
		"jlid": "JLCheckbox",
		"cds": "CDS",
		"cds-field": "LIST.YXBJ",
		"default" : "1",
		"options": {"1":"有效"},
		"listener": {
	    }
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"cds" : "CDS",
		"paging": "more",
		"multi":false,
		"mode": "edit",
		"buttons": {
			"jlNew": {
				"listener": {
				"click": function(){
					debugger;
					defineCLXX.XZJM();
					 defineCLXX.getPluginObj("CLLX").disabled(false);
				}
			}
			}
	    },

		"title" : [
		           {"id":"WD", "name":"网点名称", "width":"w02"},
		           {"id":"GS", "name":"货运公司", "width":"w02"},
		           {"id":"MC", "name":"车辆名称", "width":"w02"},
		           {"id":"XX", "name":"装载体积", "width":"w01"},
		           {"id":"CPH", "name":"车牌号", "width":"w02"},
		           {"id":"YXBJ", "name":"有效标记", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		           ],
		    "header" : [
			 {"id":"bdbh", "hidden":true},
			 {"id":"jlbh", "hidden":true},
			 {"id":"WDBM", "hidden":true},
			 {"id":"HYGSBM", "hidden":true},
			 {"id":"BM", "hidden":true},
			 {"id":"YZZTJ", "hidden":true},
		     {"id":"WDMC",  "groupid":"WD", "title":"网点名称"},
		     {"id":"HYGSMC",  "groupid":"GS", "title":"货运公司"},
		     {"id":"CLMC",  "groupid":"MC", "title":"车辆名称"},
		     {"id":"CLXX",  "groupid":"XX", "title":"装载体积"},
		     {"id":"CPH",  "groupid":"CPH", "title":"车牌号"},
		     {"id":"YXBJ",  "groupid":"YXBJ", "title":"有效标记","rowindex":1,"groupcss":"overflow_inherit", "editor":"plugin",
    		     "config":{
    		    	       "jlid": "JLCheckbox",
    		    	       "options": {"1":"有效"},
    		    	       "listener": {
    		    			      "checked":function(data, checked, arr){
    		    			    	  if(checked){
    		    			    		  data.key = 1;
    		    			    		  data.value ="有效";
    		    			    	  }else{
    		    			    		  data.key = 0;
    		    			    		  data.value ="无效";
    		    			    	  }
    		    			       }
    		    		   }
    		             }
    		   },
             {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"JLEdit",
	            	 "config":{
		            	 "readonly": ["CLMC"]
		             },
		             "listener":{
		            	 "click": function(data, rowIndex, obj, plugin){
		            		 debugger;
		        			 console.info(data);
		        			 defineCLXX.XZJM();
		        			 
		        			 defineCLXX.getPluginObj("CLLX").disabled(true);
		        			   //在修改的时候，把修改前的体积存放
		        			 var CLXX=defineCLXX.getPluginObj("CLXX").getData();
		        				defineCLXX.getPluginObj("YZZTJ").setData(CLXX);
		        			 
		        		 }
		        	 }
	           },
	      	 {"id":"delete", "groupid":"CZ",  "rowindex":1,"title":"删除", "editor":"link",
					 "listener":{
						 "click": function(thisPlugin, rowIndex, obj){
							 var data = thisPlugin.getData(rowIndex);
							 JL.confirm("是否确认删除?", function(){
								 data["S_VALUE"] = "D1";
								 JL.saveForm(defineCLXX, data, "删除", {
									 "disabled": false,
									 "success":function(){
										 //defineCLXX.query();
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




defineCLXX.setEvent([{
	"selector": "#search",
	"event":"click",
	"func":function(){
		
		defineCLXX.query();
	}
}])

defineCLXX.setAfterInit(function() {
	defineCLXX.query();
});


defineCLXX.query = function() {
	var query={};
	debugger;
	var search = defineCLXX.getTab().find("[name='CXTJ']").val();
	if(!JL.isNull(search)){
		query["search"] = search;
	}
	query["S_VALUE"] = {"$ne":"D1"};
	var resultData = defineCLXX.getSqlResult(query, "MONGO_CLXX", "CSS_CLXX", "admin/scm/shgl/search");
	console.info('defineCLXX.query');
	var CDS = this.getCds("CDS");
	CDS.edit();
	CDS.setData({"LIST":resultData.data});
	CDS.post();
	defineCLXX.getPluginObj("LIST").setPaging(resultData.fileName);
};
//根据选择车辆类型显示不同界面
defineCLXX.XZJM = function() {
	  if(defineCLXX.getPluginObj("CLLX").getData().key==1){
          //显示货运公司
      	defineCLXX.getTab().find("#LI_HYGS").show();
      	//屏蔽送货网点
      	defineCLXX.getTab().find("#LI_SHWD").hide();
      	//清空送货网点数据
      	defineCLXX.getPluginObj("WDBM").setData("");
      	defineCLXX.getPluginObj("WDMC").setData({});
      	//屏蔽车牌号
      	defineCLXX.getTab().find("#LI_CPH").hide();
      	//清空车牌号数据
      	defineCLXX.getPluginObj("CPH").setData("");
      	/*//显示配送方式
      	defineCLXX.getTab().find("#LI_PSFS").show();*/
      	
      }
      if(defineCLXX.getPluginObj("CLLX").getData().key==0){
      	//屏蔽货运公司
      	defineCLXX.getTab().find("#LI_HYGS").hide();
      	//清空货运公司数据
      	defineCLXX.getPluginObj("HYGSBM").setData("");
      	defineCLXX.getPluginObj("HYGSMC").setData({});
      	//显示送货网点
      	defineCLXX.getTab().find("#LI_SHWD").show();
      	defineCLXX.getTab().find("#LI_CPH").show();
      }
}