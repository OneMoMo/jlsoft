var CKQY = new JLForm(); 

CKQY.setPlugin({
	"CZLX" : {
        "jlid": "JLRadio",
        "default" : "save",
		"options": {"save":"新建","update":"修改"},
		"listener": {
		      "click":function(data){//参数data为点击的值，是个json对象
	    	    if(data.key=="save")
			     {
	    	    	 CKQY.getPluginObj("DQXXLB").removeAll();
	    	    	 CKQY.getPluginObj("SJKCXX").removeAll();
	    	    	 CKQY.getTab().find("[name='warehouseID']").val("");
	    	    	 CKQY.getTab().find("[name='CK02']").val("");
	    	    	 CKQY.getTab().find("[name='SJWBBH']").val("");
			    	 CKQY.getTab().find("[data-id='update']").hide();
			     }	
			     if(data.key=="update")
			     {
			    	 CKQY.getPluginObj("DQXXLB").removeAll();
	    	    	 CKQY.getPluginObj("SJKCXX").removeAll();
	    	    	 CKQY.getTab().find("[name='warehouseID']").val("");
	    	    	 CKQY.getTab().find("[name='CK02']").val("");
	    	    	 CKQY.getTab().find("[name='SJWBBH']").val("");
			    	 CKQY.getTab().find("[data-id='update']").show();
			    	 
			     }		     
		       }
	    }
	},
	"warehouseID":{
		"multi" : true,
		"sqlid" :"CKID",
		"namespace":"MONGDB_CKQY",
		"dir":"admin/o2o/search",
		"init" : {},
		"fieldMapping" : {"warehouseID":"warehouseID",
			              "STOCK":"SJKCXX","RANGE":"DQXXLB","venderId":"venderId","warehouseName":"CK02"
		}
		
	},
	"DQXXLB" : {
	    "jlid": "JLGrid",
	    "tittles": "地区信息",
	    "headers": [ 
	   	     {"id": "key","name": "地区代码","width": 100},
	         {"id": "value","name": "地区名称","width": 180}
	    ],
	    "queryConfig":{
			"jlid" : "JLQuery",// 列查询ID，必须参数
 			"multi" : true,
			"sqlid" :"selectDQXX",
			"namespace":"DQBZM",
			"dir":"admin/o2o/search",
			"init" : {},// 初始化条件
			"fieldMapping" :{
				"DQBZM01" : "DQXXLB.key",
				"DQBZM02" : "DQXXLB.value"
			}
	    },
	    "height": 300,
	    "buttons": [0,2]
	 
	},
	"SJKCXX" : {
	    "jlid": "JLGrid",
	    "tittles": "商品库存",
	    "headers": [ 
	   	     {"id": "tcCode","name": "套餐代码","width": 100},
	         {"id": "tcName","name": "商品名称","width": 180},
	         {"id": "quantity","name": "数量","width": 100,"editor": {"type":"text"}}
	    ],
	    "queryConfig":{
			"jlid" : "JLQuery",// 列查询ID，必须参数
 			"multi" : true,
			"sqlid" :"GOODS",
			"namespace":"JK",
			"dir":"admin/o2o/search",
			"init" : {
				"venderId" : "venderId"
			},// 初始化条件
			"fieldMapping" : {
				"tcName" : "SJKCXX.tcName",
				"tcCode" : "SJKCXX.tcCode"
			}
	    },
	    "height": 300,
	    "buttons": [0,2]
	}
	
});

//界面初始化调用方法
CKQY.setAfterInit(function() {
		var XmlData = {};
		XmlData["CZY01"]=userInfo["PCRM_CZY02"];
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Pay/getzcxx.do"
		ajaxJson["data"] = {"XmlData": JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
         var data =resultData["data"]
         var zcxx01=data["zcxx01"];
		CKQY.getTab().find("input[name='venderId']:not(:disabled)").val(zcxx01);
		
		CKQY.getPluginObj("SJKCXX").setAfterEdit(function(grid, id, x, y, old, edit){
			  if(id=="SL"){
				  if(isNaN(edit*1)){
						grid.setCell("", x, grid.getRowIndexByID("SL"));
		        		JL.tip("数量必须为数字");
						return false;
		        	}
			  }
		});
});


//初始化按钮
CKQY.setBtnParam({
	"jlSave":{
		"sBillName":"CKQY",
		"before":function(){
			CKQY.readData();
			var data = CKQY.getData();
			var CZLX=data["CZLX"].key;
			if(!JL.isNull(CZLX) &&CZLX=="update"){
				this.sOperateName = "getupdate.do";
				CKQY.data = data;
			}else{
				this.sOperateName = "getsave.do";
				CKQY.data = data;
			}
		}
	}
});
