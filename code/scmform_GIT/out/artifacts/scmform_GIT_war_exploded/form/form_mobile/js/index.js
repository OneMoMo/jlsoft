var index = null;
$(document).ready(function(){
	if(JL.checkLogin()){
		return false;
	}
	index = JL.JLForm();
	index.setTab($("body"));
	
	index.clickMenu = [];
	index.loadedMenu = [];
	
	index.setPlugin({
		"menu": {
			"jlid": "JLLayoutGrid",
			"style": "jl_nav_list",
			"multi": false,
			"rowclass": "w04",
			"header": [
			    {"id" : "CD10","groupid" : "DM","title" : "图标","editor":"fa", "parentcss":"nav_img"}, 
                {"id" : "CD02","groupid" : "DM","title" : "名称","parentcss":"nav_name"}
            ],
            "listener":{
            	"loadRow":function(thisPlugin, data, rowIndex, dl){
            		var fa = data.CD10 || "file-text-o font_blue";
        			dl.find("[data-id='CD10']").addClass("fa fa-" + fa);
            	},
            	"rowclick":function(thisPlugin, data, rowIndex){
            		index.clickMenu.push(data.CD01);
            		index.find("#back").show();
            		if(data.CD04 == 0){
            			thisPlugin.hideAllRow();
            			if($.inArray(data.CD01, index.loadedMenu) != -1){
            				thisPlugin.showRowById("CD08", data.CD01);
            			}else{
            				index.loadedMenu.push(data.CD01);
            				var XmlData={};
            				XmlData["PARENT"] = data.CD01;
            				index.getMenu(XmlData);
            			}
            		}else{
            			var CD03 = JSON.parse(data.CD03);
            			if(CD03.BZ03 == 1){
            				window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/main.html?data="+escape(JSON.stringify(data));
            			}else{
            				window.location.href = pubJson.getURL("FormUrl") + "/form/form_mobile/daiBan.html?GZL01="+CD03.GZL01+"&GZL02="+escape(data.CDMC)+"&BZ01="+CD03.BZ01;
            			}
            		}
            	}
            }
		}
	});
	
	index.setAfterInit(function(){
		$(".jl_header").load("header.html", function(){
			index.find("#back").hide();
		});
		$(".jl_footer").load("footer.html");
		index.getMenu({});
	});
	
	index.getMenu = function(XmlData){	
		//XmlData["CZY01"] = userInfo.PCRM_CZY01;
		XmlData["VIEW08"] = 1;//手机
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl")+"/user/selectMenu.do";
		ajaxJson["data"] = {"XmlData" : JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		if(!JL.isNull(resultData)){
			resultData= resultData.data.resultList;
			index.getPluginObj("menu").addData(resultData);
		}
	}
	
	index.initForm();
})

var headerBack = function(){
	index.getPluginObj("menu").hideAllRow();
	if(index.clickMenu.length > 0){
		var LAST = index.clickMenu.pop();
		index.getPluginObj("menu").showRowById("CD08", LAST);
	}else{
		index.find("#back").hide();
		index.getPluginObj("menu").showRowById("CD08", undefined);
	}
}
