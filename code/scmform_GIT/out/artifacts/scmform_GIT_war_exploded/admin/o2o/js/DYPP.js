var DYPP = new JLForm();
var transport = new JLTransport();
var json={};
$(".fa.fa-check.mr5").attr("class","fa mr5");
DYPP.setPlugin({
	"toolbar":{
		"jlid":"JLToolBar",
		"buttons":{
			"jlSaveCard":{
				"name": "保存",
				"css":"jl_btn btn_color",
				"icon":"",
				"sBillName":"PPB",
				"sOperateName":"insertBatch.do",
				"before": function(){
						var arry=[];
						var json = {};
						json["value"]=DYPP.getPluginObj("dypp").getText();
						json["yxbj"]=1;
						arry.push(json);  
						DYPP.setData({"doc":arry});
					}
			}
		}
	},
	"dypp": {
		"jlid": "JLMultiSelect",
		"sBillName": pubJson.getURL("ResourceUrl")+"/shopJL/baseData",
		"sOperateName": "W_PPB.json",
		"placeholder": "输入品牌名称", 
		"multi": true,
		"listener":{
			"click": function(data){ 
				console.info(data);
				DYPP.getPluginObj("dypp").current = data;
				DYPP.getPluginObj("dypp").setText(data.value);
			}
		}
	}
}); 

DYPP.setAfterInit({
	//$(".fa.fa-check.mr5").attr("class","fa mr5");
});

DYPP.setEvent([
{
	//加载更多
	"selector" :["[name='save']"],
	"event": "click",
	"func": function(){		
		
	}	
}
]);
 
//初始化按钮
DYPP.setBtnParam({
	/*"jlSave":{
		"sBillName":"PPB",
		"sOperateName":"insertBatch.do",
		"before":function(){
			var arry=[];
			var json = {};
			json["value"]=DYPP.getPluginObj("dypp").getText();
			json["yxbj"]=1;
			arry.push(json);  
			DYPP.setData({"doc":arry});
		}
	}*/
});

//初始化按钮
DYPP.addButton({
	"update":{
		"name":"修改",
		"button":function(){
			var arry=[];
			var arry=DYPP.getPluginObj("dypp").getSelected();
			if(arry !=""){
				var json = DYPP.getPluginObj("dypp").current;
				json["value"]=DYPP.getPluginObj("dypp").getText();
				arry.push(json);  
				DYPP.setData({"doc":arry}); 
				DYPP.jlSave(DYPP.getTab().find("#update"),{"sBillName":"PPB","sOperateName":"updateBatch.do"});
			}else{
				JL.tip("请选择需要修改的品牌！");
			}
			
		}
	},
	"delete":{
		"name":"删除",
		"button":function(){
			var arry=DYPP.getPluginObj("dypp").getSelected();
			if(arry !=""){
				for (var i=0;i<arry.length;i++){
					arry[i]["yxbj"] = 0;
				}
				DYPP.setData({"doc":arry});
				DYPP.jlSave(DYPP.getTab().find("#delete"),{"sBillName":"PPB","sOperateName":"updateBatch.do"});
			}else{
				JL.tip("请选择需要删除的品牌！");
			}
			
		}
	}
});



