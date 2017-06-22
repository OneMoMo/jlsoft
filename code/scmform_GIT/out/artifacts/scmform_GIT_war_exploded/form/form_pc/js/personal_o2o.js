var personal_o2o = JL.JLForm();
var userInfo
personal_o2o.setEvent([

]);

personal_o2o.setAfterInit(function() {
	getCZY();
	getsqjmsdl();
	judgeBFDealer();
	var qd =JL.getUrlParam("qd");
	var zcxx01 =JL.getUrlParam("zcxx01");
	var cz =JL.getUrlParam("cz");
	var orderId =localStorage.getItem("orderId");
	debugger;
	if(!JL.isNull(orderId)){
		$("[data-id='20']").find("a").eq(0).click();
		personal_o2o.getTab().load("o2o/xsgl/orderDetails.html");
		debugger;
	}
	if(!JL.isNull(qd) && qd=="bf"){
		personal_o2o.getTab().find("#sqjxsdl").click();
	}else if(!JL.isNull(qd) && qd=="dq"){
		var ajaxJson = {};
	    var json = {};
	    json["userId"]=userInfo["PCRM_CZY02"];
	    json["applyType"]="3";
	    json["zcxx01"]=zcxx01;
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/MultichannelDealer/findRoleApply.do";
		ajaxJson["data"] = {"XmlData": JSON.stringify(json)};
		var resultData = JL.ajax(ajaxJson);
		if(resultData.data.MSGID=="S"){
			var state = resultData.data.map.status.key;
			if(state == "10"){
				personal_o2o.getTab().load("o2o/user/rygl/dealerApply.html");
			}else if(state == "20"){
				personal_o2o.getTab().load("o2o/user/rygl/dealerApply_clerk.html");
			}else if(state == "21"){
				personal_o2o.getTab().load("o2o/user/rygl/apply_fail.html",function(){
					apply_fail.setData(resultData);
					apply_fail.initForm();
				});
			}else if(state == "30"){
				personal_o2o.getTab().load("o2o/user/rygl/applyjxs_success.html");
			}else if(state == "40"){
				personal_o2o.getTab().load("o2o/user/rygl/downPrint.html");
			}
		}else{
			personal_o2o.getTab().load("o2o/user/rygl/dealerApply_clause.html");
		/*	personal.getTab().load("o2o/user/rygl/dealerApply.html");*/
		}
	}
	if(cz=="cz"){
		$("[data-id='0701']").click();
	}
});

function getsqjmsdl( ){
	personal_o2o.getTab().find("#sqjmsdl").on("click",function(){
		var ajaxJson = {};
	    var json = {};
	    json["userId"]=userInfo["PCRM_CZY02"];
	    json["applyType"]="1";
		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/wholesaleIndex/findRoleApply.do";
		ajaxJson["data"] = {"XmlData": JSON.stringify(json)};
		var resultData = JL.ajax(ajaxJson);
		if(resultData.data.MSGID=="S"){
			var state = resultData.data.map.status.key;
			if(state == "0"){
				personal_o2o.getTab().load("o2o/user/rygl/businessList.html");
			}else if(state == "1"){
				personal_o2o.getTab().load("o2o/user/rygl/apply_success.html");
			}
		}else{
			personal_o2o.getTab().load("o2o/user/rygl/wholesaleIndex.html");	  
		}
	  });
	  personal_o2o.getTab().find("#sqjxsdl").on("click",function(){
		    var ajaxJson = {};
		    var json = {};
		    json["userId"]=userInfo["PCRM_CZY02"];
		    json["applyType"]="2";
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/wholesaleIndex/findRoleApply.do";
			ajaxJson["data"] = {"XmlData": JSON.stringify(json)};
			var resultData = JL.ajax(ajaxJson);
			if(resultData.data.MSGID=="S"){
				var state = resultData.data.map.status.key;
				if(state == "10"){
					personal_o2o.getTab().load("o2o/shopBaofengTV/user/dealerApply.html",function(){
						dealerApply.setTab($(this));
						dealerApply.isWorkflow = false;
						dealerApply.initForm();
					});
				}
				else if(state == "20"){
					personal_o2o.getTab().load("o2o/shopBaofengTV/user/dealerApply_clerk.html");
				}else if(state == "21" || state == "23" || state == "24"){
					personal_o2o.getTab().load("o2o/shopBaofengTV/user/apply_fail.html",function(){
						apply_fail.setTab($(this));
						apply_fail.setData(resultData.data.map);
						apply_fail.initForm();
					});
				}else if(state == "30" || state == "22"){
					personal_o2o.getTab().load("o2o/shopBaofengTV/user/apply_success.html");
				}else if(state == "40"){
					personal_o2o.getTab().load("o2o/shopBaofengTV/user/downPrint.html");
				}
			}else{
				personal_o2o.getTab().load("o2o/shopBaofengTV/user/dealerApply_clause.html");
			/*	personal.getTab().load("o2o/user/rygl/dealerApply.html");*/
			}
	  });
	  personal_o2o.getTab().find("#sqjxsdl2").on("click",function(){
		  personal_o2o.getTab().load("o2o/shopBaofengTV/user/dealerApply_clerk.html");
	  });
	  //经销商修改时间绑定
	  personal_o2o.getTab().find("#bfjxsxg").on("click",function(){
	  	var json = {};
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl")+ "/CopyGuideManage/findRoleUpdateInfo.do";
		ajaxJson["data"] = {"XmlData" : JSON.stringify(json)};
		var resultData = JL.ajax(ajaxJson).data;
		if(resultData.status==null){
			personal_o2o.getTab().load("o2o/shopBaofengTV/user/dealerUpdate.html");
		}else if(resultData.status.key=="21" || resultData.status.key=="23"  || resultData.status.key=="24"){
			personal_o2o.getTab().load("o2o/shopBaofengTV/user/apply_fail2.html",function(){
				apply_fail2.setTab($(this));
				apply_fail2.setData(resultData);
				apply_fail2.initForm();
			});
		}else if(resultData.status.key == "30" || resultData.status.key == "22"){
			personal_o2o.getTab().load("o2o/shopBaofengTV/user/apply_success.html");
		}else{
			personal_o2o.getTab().load("o2o/shopBaofengTV/user/dealerUpdate.html");
		}
	 });
}

//控制申请和修改经销商显示和隐藏
function judgeBFDealer(){
	debugger;
	//查询登录人是否与暴风有关系
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl")+"/trust/BaofengTVInterface/checkCompanyRelation.do";
	var returnData = JL.ajaxCall(ajaxJson).data;
	if(!JL.isNull(returnData) && returnData["MSGID"] == "S"){
		var IS_Dealer = userInfo.IS_Dealer;
		if(IS_Dealer==0){
			personal_o2o.getTab().find("#bfjxsxg").hide();
		}else if(IS_Dealer==1){
			personal_o2o.getTab().find("#sqjxsdl").hide();
		}
	}else{
		personal_o2o.getTab().find("#bfjxsxg").hide();
		personal_o2o.getTab().find("#sqjxsdl").hide();
	}
}

function getCZY(){
	var userInfoCookie = $.cookie("userInfo");
	 userInfo = JSON.parse(userInfoCookie);
	 if(JL.isNull(userInfo.companyName)){
		 personal_o2o.getTab().find("#name").text(userInfo.PCRM_CZY03);
	 }else{
		 personal_o2o.getTab().find("#name").text(userInfo.companyName);
	 }
	 personal_o2o.getTab().find("#showMobile").text(userInfo.mobile);
	 $(".jl_btn.btn_red").attr("class","jl_btn btn_color");
}