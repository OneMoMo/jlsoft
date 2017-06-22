var JLUser = {};
JLUser["version"] = 2;
JLUser.data = {};
JLUser.config = {};
JLUser.options = [];
JLUser.configs = {};
JLUser.values = {};
var uinfo = $.cookie('userInfo');
var usercookie = JSON.parse(uinfo);
var city_list = $.cookie("city_list");

JLUser.setValue = function(json,value){
	value = JL.formatObject(value);
	var select = $(json["obj"]).find("[name='"+json["zdid"]+"']");
	var option = select.find("option[value='"+value["key"]+"']");
	if(option.length == 0){
		select.append("<option value='"+value["key"]+"'>"+value["value"]+"</option>")
	}else{
		select.val(value["key"]);
	}
	
	if(!JL.isNull(json["edit"]) && json["edit"]){
		$(json["obj"]).find(":text").val(value["value"]);
	}
}

JLUser.init = function(json){
	JLUser.config = JL.isNull(json.config) ? {} : json.config;
	JLUser.configs[json.zdid] = JLUser.config;
	JLUser.configs[json.zdid]["param"] = JL.isNull(JLUser.config["param"])? {}: JLUser.config["param"];
	if(!JL.isNull(json["INITFIELD"]) && $.inArray(json["zdid"], json["INITFIELD"]) == -1){
		json["disabled"] = true;
	}else{
		json["disabled"] = false;
	}
	
	JLUser["options"] = [];
	
	//初始化数据
	if(json["disabled"] == false
			&& JL.isNull(JLUser.config["edit"])){
		JLUser.load(json);
	} 

	if(!JL.isNull(json["value"])){
		JLUser["values"] = {"KEY":json["value"]["key"],"VALUE":json["value"]["value"]};
		
		if(JLUser["options"].length == 0){
			JLUser["options"].push(JLUser["values"]);
		}else{	
			var noOption = true;
			$.each(JLUser["options"],function(i,arr){
				if(arr["KEY"] == JLUser["values"]["KEY"]
					&& arr["VALUE"] == JLUser["values"]["VALUE"]){
					noOption = false;
				}
			});
			if(noOption){
				JLUser["options"].push(JLUser["values"]);
			}
		}
	}
	
	//控件渲染
	JLUser.write(json); 
	
	if($.inArray(json["zdid"], json["INITFIELD"]) != -1){
		$(json["obj"]).find("input,select").attr("disabled");
	}
}

JLUser.load = function(json){
	JLUser.options = [];
	/*var ajaxJson = {};
	ajaxJson["src"] = JLUser.config["sqlid"];
	ajaxJson["data"] = {"XmlData":"[{}]"};
	var resultData = JL.ajax(ajaxJson);//alert(JSON.stringify(resultData))
	if(!JL.isNull(resultData)){
		resultData = resultData.data;
		JLUser.options = resultData;
	}*/

}

JLUser.write = function(json){
	$(json.obj).empty();
	var str = "";
	
	
	$(json.obj).append('<div class="content">'+
			'<div class="row">'+
			  '<ul class="sn-quick-menu">'+
			    '<li class="more_bt">'+
			      '<div class="city-locate"><i class="fa fa-map-marker"></i><input id="city_value" type="hidden"><a id="city_name" class="current-city">辽宁</a><i class="jt fa fa-angle-down"></i>'+
			      '<div id="city-wrapper" class="more_cd">'+
			        '<ul id="city-list" class="city_list" data-read="0">'+
			        '</ul>'+
			      '</div>'+
			      '</div>'+
			    '</li>'+
			    '<li>您好，欢迎来到电器服云平台</li>'+
			    '<li class="login-info">'+
			       '<a class="l-login" href="/customer/sydjt/register/login.html">请登录</a>'+
			       '<a class="l-login login-reg" href="/customer/sydjt/register/registered.html">免费注册</a>'+
			    '</li>'+
			    '<li class="login-ext">'+
			       '<a class="l-ext" id="login-name" href="/customer/sydjt/register/login.html"></a>'+
			       '<a class="l-ext" id="login-ext" href="javascript:void(0);">[退出]</a>'+
			    '</li>'+
			  '</ul>'+
			  '<ul>'+
			        '<li>'+
			             '<a href="/index.html" id="u-home">个人中心</a>'+
			        '</li>'+
			        '<li>'+
			             '<a href="/customer/sydjt/index.html">商城首页</a>'+
			        '</li>'+
					'<li>'+
						'<a href="javascript:void(0);" onclick="SetHome(this,"http://localhost:8088");">设为首页</a>'+
					'</li>'+
					'<li>'+
						'<a href="javascript:void(0);" onclick="AddFavorite("我的网站",location.href)">收藏本站</a>'+
					'</li>'+                   
			  '</ul>'+
			'</div>'+
			'</div>');
	
	if(city_list==null){
	    city_list = [];
	    var o = {};
	    o.city_value = "12";
	    o.city_name = "辽宁";
	    o.city_value_2 = "1201";
	    o.city_name_2 = "沈阳市";
	    city_list.push(o);
	    $.cookie("city_list", JSON.stringify(city_list), {
	        expires : 365, path : '/'
	    });
	    city_list = $.cookie("city_list");
	}
	city_list = JSON.parse(city_list);
	$("#city_value").val(city_list[0].city_value);
	$("#city_name").html(city_list[0].city_name);
	
	/* 大区选择 --start-- */
    $(".city-locate").on("mouseenter",function(e){
    	var read = $("#city-list").data("read");
    	if(read === 0){
	    	var XmlData=[{'sqlid':'com.jlsoft.o2o.user.sql.select_dqmc','dataType':'Json'}];
	   	 	var url="/jlquery/selecto2o.action?XmlData="+JSON.stringify(XmlData);
		   	 ajaxQ({
		   			"url" : url,//原始url 
		   			"callback" : function(rData){
		   		 		var tpl = $.trim($("#m-tpl-2").html()),
		   		 			data = {"mapList":rData};
		   		 		JLUser.dToHtml({"tpl":tpl,"data":data,"target":"#city-list"});
		   				$("#city-list").data("read","1");
		   		        //$("#city-wrapper").css({"display":"block"});
		   		        
			   		     $("#city-list").on("click","li",function(e){
			   		    	 var $this = $(e.currentTarget),
			   		    	 	select_text = $.trim($this.children("a").text()),
			   		    	 	b = $this.attr("id"),
			   		    	 	$city_wrapper = $("#city-wrapper");
						  	//将已选的省份值存放于cookie
						  	var XmlData=[{'sqlid':'com.jlsoft.o2o.user.sql.select_dqmc_2','dataType':'Json','dqbzm01':b}];
							var url="/jlquery/selecto2o.action?XmlData="+JSON.stringify(XmlData);
							ajaxQ({
				                "url" : url,
				                "callback" : function(rData){
									var city_list = [];
									var o = {};
									o.city_value = b;
									o.city_name = select_text;
									o.city_value_2 = rData[0].dqbzm01;
									o.city_name_2 = rData[0].dqbzm02;
									city_list.push(o);
									$.cookie("city_list", JSON.stringify(city_list), {
										expires : 365, path : '/'
									});
	
								  	$("#city_name").html(select_text);
								  	$("#city_value").val(b);
									//选择不同地区加载不同广告
									/*$("div.ggtype").each(function(i,val){
										var jlform = eval($(val).data("ggtype"));
										//alert($("#city_value").val());
										jlform.initData();
			   		    			});*/
								  	//$city_wrapper.css({"display":"none"});
								  	$city_wrapper.attr("class","more_cd display_none");
				                },
				                "error":function(){}
				            });
														
			   		     });
		   			},
	                "error":function(){}
		   		});
    	}else{
    		//$("#city-wrapper").css({"display":"block"});
    		$(".more_cd").attr("class","more_cd display_block");
    	}
    }).on("mouseleave",function(e){
    	//$("#city-wrapper").css({"display":"none"});
    	$(".more_cd").attr("class","more_cd display_none");
    });
    /* 大区选择 --end-- */
    JLUser.checkLogin();
}

/* 通过数据构建HTML */
JLUser.dToHtml = function(obj){
    var tpl = $.trim(obj["tpl"]),
        datas = obj["data"],
        fc =  _.template(tpl),
        rh = fc(datas);
    var target = typeof obj["target"] === "string"?$(obj["target"]):obj["target"];
    target.html(rh);
}

//(新)ajax 访问服务器端,异步访问服务器端，获取JSON返回结果，val是连接地址
function ajaxQ(obj){
    var opt = {
        "type" : obj.type || "get",
        "url" : encodeURI(__formatUrl(obj.url)),
        "data" : obj.data || {},
        "dataType" : obj.dataType || "JSON",
        "callback" : obj.callback || function(){ alert("操作成功"); },
        "error":function(msg){
            if(msg && msg === ""){
                //alert("操作失败");
                return;
            }
        }
    };

    $.ajax({
        type: opt.type,  //请求方式
        dataType: opt.dataType,
        url:opt.url,
        data:opt.data,
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        timeout : 60000,
        success: function(data){
            if (data != null){
                try{
                    var json = JSON.parse(JSON.stringify(data));
                    //var json = $.parseJSON(data);
                    opt.callback(json.data);
                }catch(e){
                    //opt.error("请求异常");
                }
            }
        },
        //获取错误信息
        error:function(data,XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });
}

function __formatUrl(val){
    //var url = "";

    if(val.lastIndexOf("?") != -1){
        if(val.lastIndexOf("?") !== val.length - 1){
            val+="&r="+Math.random();
        }else{
            val+="r="+Math.random();
        }
    }else{
        val+="?r="+Math.random();
    }

    return val;
}

JLUser.selectMyCart = function(){
	var xmlData=[];
    var json={};
    json.HBID=usercookie.ZCXX01;
    json.DQXX01=usercookie.ZCXX07;
    xmlData.push(json);
    var url="/CartManage/selectGwcByHbid.action?XmlData="+JSON.stringify(xmlData);
    
    ajaxQ({
        "url" : url,
        "callback" : function(rData){
	    	if(!rData || rData.GWCLIST == "" || rData.GWCLIST == null) {
	            $("#shopping-amount").html(0);
	        }else {
	            $("#shopping-amount").html(rData.GWCLIST[0].TOTALNUM);
	        }
        },
        "error":function(){}
    });
}

JLUser.checkLogin=function(){
	if(usercookie!=null){
		JLUser.selectMyCart(usercookie);
		// 
		$("#login-ext").one("click",function(e){
			var qm = $(".sn-quick-menu");
			qm.find("li.login-info").css("display","block");
			$("#login-name").text("");
			$("#login-ext").text("");
			qm.find("li.login-ext").css("display","none");
			$.cookie('userInfo',null,{path:"/"});
			window.location.href="/customer/sydjt/index.html";
			return false;
		});
		var qm = $(".sn-quick-menu");
		if(usercookie.LX=='24'){//个人
			$("#login-name").text("您好，"+usercookie.XTCZY01);
		}else{//企业
			$("#login-name").text("您好，"+usercookie.ZCXX02);
		}
		qm.find("li.login-info").css("display","none");
		qm.find("li.login-ext").css("display","block");
		if(usercookie.ZCGS01==4){
			$("#u-home").attr('href','/index.html');
			//$("#fbsp").attr('href','/customer/sydjt/back/shop-main.html?menuId=A001');
		}else if(usercookie.ZCGS01==2){
			$("#u-home").attr('href','/customer/sydjt/register/registerPerfectDB.html');
		}
		
	}else{
		var qm = $(".sn-quick-menu");
		qm.find("li.login-info").css("display","block");
		qm.find("li.login-ext").css("display","none");
	}
}