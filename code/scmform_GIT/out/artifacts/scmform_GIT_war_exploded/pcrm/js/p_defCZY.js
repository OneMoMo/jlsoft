var defCZY = JL.JLForm();
$(document).ready(function(){  
	$(document).on("click",".list_02 > dl > div > dt",function(){
	   $(".list_02 > dl").removeClass("hild");
	   $(this).parent("div").parent("dl").addClass("hild");
	   $(this).parent("div").parent("dl").siblings("dl").children("dd").slideUp();	
	   $(this).parent("div").siblings("dd").slideDown();	
	})  

	$(document).on("focus","input",function(){
	   $(".jl_poplayer").fadeOut(100);	
	   $(this).siblings(".jl_poplayer").fadeIn();	
	})
 
    showQueryCzy(); 
})

function showQueryCzy(){  
  var json = {};
  json.CXTJ = $("#CXTJ").val(); 
  json.GSXX01 = userInfo["PCRM_GSXX01"];   
  var data = selectCZYInfomation(json);  
  showCZY(data);
}

function selectCZYInfomation(XmlData){  
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectCZY.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  var resultData = JL.ajax(ajaxJson);
  
  $("#rymxsj").remove();
  if((resultData.data.list).length == 0){   
	alert("未查找到符合条件的人员!");
  }
  return resultData.data.list;
}


//展示人员
function showCZY(data){ 
	/**
  if (data.length > 0){
	var json = {};  
    json.GSXX01 = userInfo["PCRM_GSXX01"];  
    var bmdata = selectBMInfomation(json); 
	var gwdata = selectGWInfomation(json); 
	var sjdata = selectSJInfomation(json);  
  }**/

  $("#rymxsj").remove();
  $("#czy_jl_list").append('<div class="w12 list_02" id="rymxsj"></div>');
  for(var i=0;i<data.length;i++){ 
	var CZY01 = data[i].CZY01;
	var CZY03 = data[i].CZY03;
	var CZY02 = data[i].CZY02;
	var BM01 = data[i].BM01;
	var BM02 = data[i].BM02;
	var GW01 = data[i].GW01;
	var GW02 = data[i].GW02;
	var SJ01 = data[i].SJ01;
	var SJ02 = data[i].SJ02; 

    $("#rymxsj").append('<dl class="w12 list">' + 
		                '<div class="w12" id="div_'+data[i].CZY01+'" code="0" ' +
		                   'onclick="loadhtml(\''+data[i].CZY01+
		                   '\',\''+data[i].CZY03+'\',\''+data[i].CZY02+
		                   '\',\''+data[i].BM01+'\',\''+data[i].BM02+
		                   '\',\''+data[i].GW01+'\',\''+data[i].GW02+
		                   '\',\''+data[i].SJ01+'\',\''+SJ02+'\')">' +
		                   '<dt class="w01">'+
		                   '<input type="checkbox" code="'+data[i].CZY01+'"/></dt>'+
						   '<dt class="w02"><h3>'+data[i].CZY03+
						   '</h3></dt><dt class="w02">'+data[i].CZY02+'</dt>'+
						   '<dt class="w04">'+data[i].GSXX02+'</dt><dt class="w03">'+
		                   '<i class="fa fa-arrow-circle-down" title="展开"></i>'+
		                   '</dt></div>'+
						   '<dd class="w12 display_none" id="xsdiv_'+data[i].CZY01+'">'+ 
		                   '</dd></dl>'); 
  } 
}  

function loadhtml(CZY01,CZY03,CZY02,BM01,BM02,GW01,GW02,SJ01,SJ02){ 
	//if ($("#div_"+CZY01).attr("code") == "0"){  
		JL.setUrlParam("pcrm/defCZYXX.html?CZY01="+CZY01+ 
			           "&CZY03="+CZY03+
					   "&CZY02="+CZY02+
			           "&BM01="+BM01+
			           "&BM02="+BM02+
			           "&GW01="+GW01+
					   "&GW02="+GW02+
			           "&SJ01="+SJ01+
			           "&SJ02="+SJ02); 

		$("#xsdiv_"+CZY01).load("pcrm/defCZYXX.html",function(){
		   $("#div_"+CZY01).attr("code","1");
		});
	//}  
}
 
function sc(){
  var czyarr='';
  var XmlData = {}; 
  if ($("input:checked").size() == 0){
	  alert("请勾选需要删除的人员！");
  }

  for(var i=0;i<$("input:checked").size();i++){ 
	 if (czyarr == ''){
		czyarr = $("input:checked").eq(i).attr("code");
	 }else{
		czyarr = czyarr + ',' +$("input:checked").eq(i).attr("code");
	 }
  }
  XmlData.CZY = czyarr;

  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/deleteCZY.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  
  var resultData = JL.ajax(ajaxJson);

  if (resultData.data.returnMap == '1'){
	  alert('删除成功');
  }else{
      alert('删除失败');
  }  
}

function xz(){
	$("#rymxsj").remove();
	$("#czy_jl_list").append('<div class="w12 list_02" id="rymxsj"></div>');
	$("#rymxsj").append('<dl class="w12 list" id="xz_dl">'+
		                   '<div class="w12" id="div_0" code="0">' +
		                   '<dt class="w01"><input type="checkbox" /></dt>'+
						   '<dt class="w02"><h3></h3></dt><dt class="w02"></dt>'+
						   '<dt class="w04"></dt><dt class="w03">'+
		                   '<i class="fa fa-arrow-circle-down" title="展开"></i>'+
		                   '</dt>'+
		                   '<dd class="w12" id="xsdiv_0">'+
						   '</dd></div></dl>');
	
    JL.setUrlParam("pcrm/defCZYXX.html?CZY01=0&CZY03=&CZY02="+
				   "&BM01=&BM02=&GW01=&GW02=&SJ01=&SJ02="); 
	$("#xsdiv_0").load("pcrm/defCZYXX.html",function(){
	   $("#div_0").attr("code","1");
	});

	defCZY.getTab().find("input[name='xz']").hide();
    defCZY.getTab().find("input[name='bc']").show(); 
    defCZY.getTab().find("input[name='qx']").show(); 
    defCZY.getTab().find("input[name='sc']").hide(); 
}

function qx(){
	defCZY.getTab().find("input[name='bc']").hide(); 
	defCZY.getTab().find("input[name='qx']").hide(); 
	defCZY.getTab().find("input[name='xz']").show(); 
	defCZY.getTab().find("input[name='sc']").show(); 
}

function bc(){
	defCZY.getTab().find("input[name='xz']").show();
	defCZY.getTab().find("input[name='bc']").hide(); 
	defCZY.getTab().find("input[name='qx']").hide(); 
	defCZY.getTab().find("input[name='sc']").show(); 
}