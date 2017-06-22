
var JLmessage =function(json){

	this.config = {
	
		};
		$.extend(this.config,json);	
		var thisPlugin = this;
		this.obj = this.config.obj;
		this.form = this.config.form;

		this.version = 3;
		this.data = {};

var userInfoCookie = $.cookie("userInfo");
var userInfo = JSON.parse(userInfoCookie);

this.init= function(){
	var massage=$("#d_massage");
	    massage.empty();

    var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	XmlData["ROWNUM"]=50;
	var ajaxJson = {};
	ajaxJson["src"] = "http://localhost:30800/form5/CX/selectDB.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(resultData){
     var data =resultData.data.resultList;
  for(var i=0;i<data.length;i++){
$('<div class="jl_title">今天<span class="font_red ml10">(3条)</span><i class="fa fa-angle-down"></i></div><div class="jl_list"><div class="jl_list_03"><ul><li><a><div class="list_name bgcolor_blue">龙威</div><div class="list_main"><div class="w12"><h4 class="w10">'+data[i].GZL02+'</h4><label>'+data[i].SK04+'</label></div><div class="w12"><span>'+data[i].TJRYMC+'</span></div></div></a></li></ul></div></div>')
			.appendTo(massage)



			}

     }










	
	
			
	
		};
		

	
	this.init();
	
};



