var personal = JL.JLForm();

personal.loadAllCD = function(){
	var ul = this.find("#ALLCD");
	ul.empty();
	for(var i=0;i<userMenu.length;i++){
		var row = userMenu[i];
		if(row.MJBJ == 1){
			var li = $("<li>").appendTo(ul);
			li.data(row);
			if(!JL.isNull(row.CD03) && row.CD03.indexOf("BZ01") != -1){
				li.append("<a><i class='fa fa-bookmark-o'></i>"+ row.CDMC + "-" + row.CD02 +"</a>");
			}else{
				li.append("<a><i class='fa fa-bookmark-o'></i>"+row.CD02+"</a>");
			}
			
			if(this.find("#USERCD li[data-CD01='"+row.CD01+"']").length > 0){
				li.find("> a").addClass("jl_btn btn_blue");
			}
			li.click(function(){
				var a = $(this).find("a");
				if(ul.find(".jl_btn").length == 20 && !a.hasClass("jl_btn")){
					alert("最多选择20个常用菜单");
					return false;
				}
				if(a.hasClass("jl_btn")){
					a.removeClass("jl_btn btn_blue");
				}else{
					a.addClass("jl_btn btn_blue");
				}
			});
		}
	}
}

personal.loadUserCD = function(){
	var ul = this.find("#USERCD");

	var ajaxJson={};
	ajaxJson["src"] = "user/getUserMenu.do";
	ajaxJson["async"] = true;
	ajaxJson["callback"] = function(resultData){
		resultData = resultData.data.resultList;
		for(var i=0;i<resultData.length;i++){
			var row = resultData[i];
			var li = $("<li>").appendTo(ul);
			li.attr("data-CD01", row.CD01);
			li.data(row);
			if(!JL.isNull(row.CD03) && row.CD03.indexOf("BZ01") != -1){
				li.append("<a><i class='fa fa-bookmark-o'></i>"+ row.CDMC + "-" + row.CD02 +"</a>");
			}else{
				li.append("<a><i class='fa fa-bookmark-o'></i>"+row.CD02+"</a>");
			}
			li.click(function(){
				quickLoadPage($(this));
			});
		}
	};
	JL.ajax(ajaxJson);
};

//通知公告
personal.loadTZGG = function(){
	var ul = this.find("#TZGG");
	var XmlData = {};
	XmlData["pagenum"] = 1;
	XmlData["pagesize"] = 5;
	XmlData["XXZT"] = "0";
	var resultData = JL.ajax({
		"async": false,
		"src": pubJson.getURL("FormUrl") + "/defMSG/selectMSG.do",
		"data": {"XmlData": JSON.stringify(XmlData)},
		"callback": function(resultData){
			if(!JL.isNull(resultData)){
				resultData = resultData.data.returnList;
				for(var i = 0; i < resultData.length; i++){
					var row = resultData[i];
					var li = $("<li><a title='标题'><i class='fa fa-sun-o'></i>"+row.MS06+"</a><span title='发布人' class='ml10 time'>"+row.MS03+"</span><span title='发布时间' class='time'>"+row.MS10+"</span></li>")
					li.data(row);
					li.appendTo(ul);
					li.click(function(){
						var json = {};
		    			json["CD02"] = "公告详情";
		    			json["CD03"] = JSON.stringify({
							"bdym": "messageDetail",
							"url": pubJson.getURL("FormUrl") + "/form/form_pc/messageDetail.html?rid="+Math.random()
						});
		    			json["YWSJ"]=$(this).data();
						loadPage(json);
					});
				}
				
				if(resultData.length > 0){
					ul.show();
					ul.next().hide();
				}
			}
		}
	});
	
	
	/*
	for(var i = 0; i < 10; i++){
		if(i == 5){
			return false;
		}
		var li = $("<li><a><i class='fa fa-sun-o'></i>2015年元旦放假通知，请各位同事做好假前的准备工作。</a><span class='time'>2014/12/25</span></li>")
		li.appendTo(ul);
	}*/
};

//通知公告
personal.loadBB = function(){
	var XmlData = {};
	XmlData["pagenum"] = 1;
	XmlData["pagesize"] = 5;
	XmlData["XXFL"] = "-1";
	var resultData = JL.ajax({
		"async": false,
		"src": pubJson.getURL("FormUrl") + "/defMSG/selectMSG.do",
		"data": {"XmlData": JSON.stringify(XmlData)},
		"callback": function(resultData){
			console.info(resultData);
			var resultList = resultData.data.returnList;
			for(var i=0; i<resultList.length; i++){
				var row = resultList[i];
				personal.appendBB(row);
			}
		}
	});
	console.info(resultData);
	
};
personal.bb_length = 0;
personal.appendBB = function(row){
	personal.bb_length++;
	if(personal.bb_length%2 > 0){
		main = this.find(".case.left");
	}else{
		main = this.find(".case.right");
	}
	
	var case_main = $("<div class='w12 case_main'>").appendTo(main);
	var case_title = $("<div class='case_title'>").appendTo(case_main);
	if(!JL.isNull(row.FZ02)){
		case_title.append("<h3><i class='fa fa-bar-chart-o'></i>"+ row.FZ02 +"</h3>");
	}else{
		case_title.append("<h3><i class='fa fa-bar-chart-o'></i>"+ row.MS06 +"</h3>");
	}
	
	var case_body = $("<div class='case_body pb10'>").appendTo(case_main);
	case_body.append(row.MS12);
};

//最新待办
personal.loadDB = function(){
	var ul = this.find("#DBLB");
	
	var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo.PCRM_CZY02;
	var ajaxJson = {};
	ajaxJson["src"] = "jlquery/selectDBSY.do";
	ajaxJson["async"] = false;
	ajaxJson["data"] = {"sid":Math.random(),"XmlData":JSON.stringify(XmlData)};
	ajaxJson["callback"] = function(resultData){
		if(!JL.isNull(resultData)){
			var data = resultData.data;
			for(var i = 0; i < data.length; i++){
				if(i == 5){
					return false;
				}
				var row = data[i];
				row.SK02 = JL.isNull(row.SK02)?{}:JSON.parse(row.SK02);//摘要数据
				row.SK03 = JL.isNull(row.SK03)?{}:JSON.parse(row.SK03);//摘要数据
				row.TODO_PROFILE_STR = "";
				$.each(row.SK02,function(key,value){
					row.TODO_PROFILE_STR += key +": "+ value +"&nbsp;&nbsp;";
				});
				row.TODO_PROFILE_STR = "(&nbsp;&nbsp;"+row.TODO_PROFILE_STR+")";
				var li = $("<li>").appendTo(ul);
				li.data(row);
				li.append("<a class='w12'>"+row.GZL02+" "+row.BZ02+" "+row.TODO_PROFILE_STR+"</a>");
				li.append("<div class='w12 mx'><span>提交人员:"+row.TJRYMC+"</span><span>提交时间:"+row.SK04+"</span><span>流水号:"+row.TBLNAME+"-"+row.JLBH+"</span></div>");
				li.click(function(){
					var daiBanRow = $(this).data();
					daiBanRow.CD01 = daiBanRow.GZL01;
					daiBanRow.CD02 = daiBanRow.GZL02 + "("+ daiBanRow.TBLNAME +"-"+ daiBanRow.JLBH+")";
					daiBanRow.YWSJ = {"bdbh":daiBanRow.TBLNAME,"jlbh":daiBanRow.JLBH};
					
					var ajaxJson = {};
					ajaxJson["src"] = "CX/selectDBYZ.do"; 
					ajaxJson["data"] = {"sid":Math.random(),"XmlData":JSON.stringify(daiBanRow)};
					  
					var resultData = JL.ajax(ajaxJson);
					if(!JL.isNull(resultData)){ 
						resultData = resultData["data"];  
						if (resultData.NUM > 0){
							loadPage(daiBanRow,{"CD02":daiBanRow.GZL02+"待办"});
						}else{
							JL.tip("该待办已经被处理，请刷新后再操作！", "error");
						}
					}
				});
			}
		}
	};
	JL.ajax(ajaxJson);
}

personal.setEvent([{
	"selector":"#moreMessage",
	"event":"click",
	"func": function(){
		var json = {};
		json["CD02"] = "公告列表";
		json["CD03"] = JSON.stringify({
			"bdym": "message",
			"url": pubJson.getURL("FormUrl") + "/form/form_pc/message.html?rid="+Math.random()
		});
		loadPage(json);
	}
},{
	"selector":"#chooseCD",
	"event":"click",
	"func": function(){
		personal.find("#ALLCD").closest(".case_main").show();
		personal.find("#USERCD").closest(".case_main").hide();
		personal.loadAllCD();
	}
},{
	"selector":"#cancelCD",
	"event":"click",
	"func": function(){
		personal.find("#USERCD").closest(".case_main").show();
		personal.find("#ALLCD").closest(".case_main").hide();
	}
},{
	"selector":"#saveCD",
	"event":"click",
	"func": function(){
		var ul = personal.find("#USERCD").empty();
		var checked = personal.find("#ALLCD .jl_btn");
		var MENU = [];
		for(var i=0; i<checked.length; i++){
			var row = $(checked[i]).parent().data();
			MENU.push(row);
			var li = $("<li>").appendTo(ul);
			li.attr("data-CD01", row.CD01);
			li.data(row);
			li.append("<a><i class='fa fa-bookmark-o'></i>"+row.CD02+"</a>");
			li.click(function(){
				quickLoadPage($(this));
			});
		}
		var XmlData = {};
		XmlData["MENU"] = MENU;
		var ajaxJson = {};
		ajaxJson["src"] = "user/saveUserMenu.do";
		ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		var resultData = JL.ajax(ajaxJson);
		console.info(resultData);
		if(!JL.isNull(resultData)){
			var STATE = resultData.data.STATE;
			if(STATE == 1){
				personal.find("#USERCD").closest(".case_main").show();
				personal.find("#ALLCD").closest(".case_main").hide();
			}
		}
	}
}]);

personal.setAfterInit(function() {
	personal.loadUserCD();//加载操作员菜单
	//personal.loadDB();
	personal.loadTZGG();//加载通知公告
	personal.loadBB();//加载报表
});


