 
$(document).ready(function(){   
	showCZYXX();
})

function showCZYXX(){   
    var CZY01=JL.getUrlParam("CZY01");  
	var CZY03=JL.getUrlParam("CZY03");
    var CZY02=JL.getUrlParam("CZY02"); 
	var BM01=JL.getUrlParam("BM01");
	var BM02=JL.getUrlParam("BM02");
	var SJ01=JL.getUrlParam("SJ01");
	var SJ02=JL.getUrlParam("SJ02");
	var GW01=JL.getUrlParam("GW01");
	var GW02=JL.getUrlParam("GW02"); 
	if (CZY01 == '0'){
		$("#xg").hide();
	}else{
		$("#xg").show();
	}  
	 
	$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=rydm]").attr("code",CZY01);
	$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=rymc]").val(CZY03);
	$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=rydm]").val(CZY02);
 
    if (GW01 != 'undefined'){
		$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=gwxx_01]").attr("code",GW01);
		$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=gwxx_01]").val(GW02);
    }
    
	if (SJ01 != 'undefined'){
		$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=sjxx_01]").attr("code",SJ01);
		$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=sjxx_01]").val(SJ02);
	}
	  
	if (BM01 != 'undefined'){
		$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=bmxx_01]").attr("code",BM01); 
		$("#xsdiv_"+CZY01).prevAll().parent().find("input[id=bmxx_01]").val(BM02); 
    }

	var json = {};  
    json.GSXX01 = userInfo["PCRM_GSXX01"];  
    var bmdata = selectBMInfomation(json); 
	var gwdata = selectGWInfomation(json); 
	var sjdata = selectSJInfomation(json); 
  
    for(var j=0;j<bmdata.length;j++){ 
		$("#xsdiv_"+CZY01).prevAll().parent().find("#bmxx").append('<li class="w12" id="'+bmdata[j].BM01+
																	'">'+bmdata[j].BM02+'</li>'); 
		$("#xsdiv_"+CZY01).prevAll().parent().find("#bmxx").find('li').eq(j).click(function(){ 
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").val($(this).html());
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").attr("value",$(this).html());
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").attr("code",$(this).attr('id')); 
			$(this).parents(".jl_poplayer").attr("style","");
		})
	}

	for(var h=0;h<gwdata.length;h++){
		$("#xsdiv_"+CZY01).prevAll().parent().find("#gwxx").append('<li class="w12" id="'+gwdata[h].GW01+
																	'">'+gwdata[h].GW02+'</li>');
		$("#xsdiv_"+CZY01).prevAll().parent().find("#gwxx").find('li').eq(h).click(function(){ 
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").val($(this).html());
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").attr("value",$(this).html());
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").attr("code",$(this).attr('id'));
			$(this).parents(".jl_poplayer").attr("style","");
		})
	}

	for(var g=0;g<sjdata.length;g++){
		$("#xsdiv_"+CZY01).prevAll().parent().find("#sjxx").append('<li class="w12" id="'+sjdata[g].SJ01+
																	'">'+sjdata[g].SJ02+'</li>');
		$("#xsdiv_"+CZY01).prevAll().parent().find("#sjxx").find('li').eq(g).click(function(){ 
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").val($(this).html());
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").attr("value",$(this).html());
			$(this).parents(".jl_poplayer").prevAll().parent().find("input").attr("code",$(this).attr('id'));
			$(this).parents(".jl_poplayer").attr("style","");
		})
	}
}


function selectGWInfomation(XmlData){  
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectGWXX.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  var resultData = JL.ajax(ajaxJson);
   
  return resultData.data.list; 
}

function selectBMInfomation(XmlData){ 
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectBM.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  var resultData = JL.ajax(ajaxJson);
  
  return resultData.data.list;  
}
 
function selectSJInfomation(XmlData){ 
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectSJQX.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  var resultData = JL.ajax(ajaxJson);
  
  return resultData.data.list;  
}
  

$('i[name="sjxx_02"]').click(function () { 
   $(this).parents(".jl_poplayer").attr("style","");
});

$('i[name="bmxx_02"]').click(function () { 
   $(this).parents(".jl_poplayer").attr("style","");
});

$('i[name="gwxx_02"]').click(function () { 
   $(this).parents(".jl_poplayer").attr("style","");
});
 
function xg(czy01){ 
	var XmlData = {};  
	XmlData.GSXX01 = userInfo["PCRM_GSXX01"]; 
	XmlData.CZY01 = $("#rydm").attr("code");
	XmlData.CZY02 = $("#rydm").val();
	XmlData.CZY03 = $("#rymc").val();
	XmlData.CZY04 = $("#rymm").val();
	XmlData.CZY07 = '0';
	XmlData.BM01 = $("#bmxx_01").attr("code");
	XmlData.GW01 = $("#gwxx_01").attr("code");
	XmlData.SJ01 = $("#sjxx_01").attr("code");

	var ajaxJson = {};
	ajaxJson["src"] ="JCXX/updateCZY.do?rid=" + Math.random();
	ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  
	var resultData = JL.ajax(ajaxJson);

	if (resultData.data.returnMap == '1'){
		alert('修改成功');
	}else{
		alert('修改失败');
	}
}