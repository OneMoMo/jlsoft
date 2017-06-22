var defGZZ = JL.JLForm();

$(document).ready(function(){   
	$(document).on("click",".list_nav > li",function(){
	   $(".list_nav > li").removeClass("xuan");
	   $(this).addClass("xuan");
	})  

	$(document).on("click","ul > li > div > i",function(){
		var i_text = $(this).text();
		if(i_text == "+"){
			$(this).text("-");
			$(this).parent("div").next("ul").slideDown();
		 }
	})
 
    showQueryGZZ();
    showQueryBM();
})

function showQueryGZZ(){  
  var json = {};
  json.CXTJ = $("#CXTJ").val(); 
  json.GSXX01 = userInfo["PCRM_GSXX01"];  
  var datagzz = selectGZZInfomation(json);   
  showGZZ(datagzz);
}

function showQueryBM(){   
  var json = {}; 
  json.GSXX01 = userInfo["PCRM_GSXX01"];  
  var databm = selectBMInfomation(json);    
  showBM(databm);
}

function selectBMInfomation(XmlData){  
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectBM.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)}; 
  var resultData = JL.ajax(ajaxJson); 
  //调用数据方法之前，将界面table中的数据清空  使用 remove() 将整个 <tr> 干掉  
  if((resultData.data.list).length == 0){   
	alert("未查找到符合条件的部门!");
  }
  return resultData.data.list;
}

function selectGZZInfomation(XmlData){  
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectSJQX.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)}; 
  var resultData = JL.ajax(ajaxJson);
  $("#sjqxmx").remove();
  if((resultData.data.list).length == 0){   
	alert("未查找到符合条件的数据权限!");
  }
  return resultData.data.list;
}

function showGZZ(gzzdata){  
  $("#sjqxmx").remove();
  $("#gzz_w03").append('<ul class="w12 list_nav" id="sjqxmx"></ul>');
    
  for(var i=0;i<gzzdata.length;i++){
	if (i == 0){
		$("#sjqxmx").append('<li class="w12 xuan" onclick="showgzzxx(\''+gzzdata[i].SJ01+
			                '\',\''+gzzdata[i].SJ02+'\')">' +
			                '<b>'+gzzdata[i].SJ02+
			                '</b> - '+gzzdata[i].SJ01+'</li>');
	}else{
		$("#sjqxmx").append('<li class="w12" onclick="showgzzxx(\''+gzzdata[i].SJ01+
			                '\',\''+gzzdata[i].SJ02+'\')">' +
			                '<b>'+gzzdata[i].SJ02+
			                '</b> - '+gzzdata[i].SJ01+'</li>');
    }
  }
}

function showgzzxx(sj01,sj02) {
  $("#SJ01").val(sj01);
  $("#SJ02").val(sj02);

  var json = {};
  json.SJ01 = sj01;  
  var data = selectSJQXBMInfomation(json);   
  
  for(var i=0;i<data.length;i++){ 
	  $("#sjqxbm_"+data[i].BM01).attr("checked","checked");
  }
}

function selectSJQXBMInfomation(XmlData){  
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectSJQXBM.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)}; 
  var resultData = JL.ajax(ajaxJson); 
 
  return resultData.data.list;
} 
 
function showBM(data){ 
  var str;
  for(var i=0;i<data.length;i++){  
	 if (data[i].BM03=='1'){
	     str = '<i class="jt"></i>';
	 }else{
		 str = '<i>+</i>'; 
	 }
	 if (data[i].BM_BM01=='' || data[i].BM_BM01 == data[i].BM01){
		 $("#bmxx").append('<li><div>'+
						'<input type="checkbox" code="'+data[i].BM02+
			            '" name="'+data[i].BM01+'" id="sjqxbm_'+data[i].BM01+'">'+str+
						'<a>"'+data[i].BM02+'"</a></div>'+
						'<ul id="bm_'+data[i].BM01+'"></ul>'+
						'</li>');	
	 }else{
		 $("#bm_"+data[i].BM_BM01).append('<li><div>'+
									   '<input type="checkbox" code="'+data[i].BM02+
			                           '" name="'+data[i].BM01+'" id="sjqxbm_'+data[i].BM01+'">'+str+
									   '<a>"'+data[i].BM02+'"</a></div>'+
									   '<ul id="bm_'+data[i].BM01+'"></ul>'+
									   '</li>');
	 }
  } 
}

function selectBZInfomation(XmlData){  
  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/selectGZLBZ.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  
  var resultData = JL.ajax(ajaxJson);
   
  return resultData.data.list;
}

function qx(){
  defGZZ.getTab().find("input[name='bc']").hide(); 
  defGZZ.getTab().find("input[name='qx']").hide(); 
  defGZZ.getTab().find("input[name='xz']").show(); 
  defGZZ.getTab().find("input[name='sc']").show();
  defGZZ.getTab().find("input[name='xg']").show();
}
 
function xg(){
  var arr=[]; 
  var XmlData = {}; 
  for(var i=0;i<$("input:checked").size();i++){ 
	 var o1={}; 
     o1["SJ01"]=$("#SJ01").val();
	 o1["GSXX01"]=userInfo["PCRM_GSXX01"];
	 o1["BM01"]=$("input:checked").eq(i).attr("name");
	 arr.push(o1);
  }
  XmlData.SJ01 = $("#SJ01").val();
  XmlData.SJ02 = $("#SJ02").val(); 
  XmlData.GSXX01 = userInfo["PCRM_GSXX01"];
  XmlData.SJQXBM = arr;  

  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/updateSJQX.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  
  var resultData = JL.ajax(ajaxJson);

  if (resultData.data.returnMap == '1'){
	  alert('修改成功');
  }else{
      alert('修改失败');
  }
}

function xz(){
	$("#SJ01").val("");
	$("#SJ02").val("");
    $("input:checked").removeAttr("checked"); 

	defGZZ.getTab().find("input[name='bc']").show(); 
	defGZZ.getTab().find("input[name='qx']").show(); 
	defGZZ.getTab().find("input[name='xz']").hide(); 
	defGZZ.getTab().find("input[name='sc']").hide();
	defGZZ.getTab().find("input[name='xg']").hide();
}

function bc(){
  var arr=[]; 
  var XmlData = {}; 
  for(var i=0;i<$("input:checked").size();i++){ 
	 var o1={};   
	 o1["GSXX01"]=userInfo["PCRM_GSXX01"];
	 o1["BM01"]=$("input:checked").eq(i).attr("name");
	 arr.push(o1);
  }    
  XmlData.SJ02 = $("#SJ02").val(); 
  XmlData.GSXX01 = userInfo["PCRM_GSXX01"];
  XmlData.SJQXBM = arr;   

  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/insertSJQX.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  
  var resultData = JL.ajax(ajaxJson);

  if (resultData.data.returnMap == '1'){
	  alert('保存成功');
  }else{
      alert('保存失败');
  }  

  defGZZ.getTab().find("input[name='xz']").show();
  defGZZ.getTab().find("input[name='bc']").hide(); 
  defGZZ.getTab().find("input[name='qx']").hide(); 
  defGZZ.getTab().find("input[name='sc']").show();
  defGZZ.getTab().find("input[name='xg']").show();
}

function sc(){ 
  var XmlData = {};  
  XmlData.SJ01 = $("#SJ01").val();  

  var ajaxJson = {};
  ajaxJson["src"] ="JCXX/deleteSJQX.do?rid=" + Math.random();
  ajaxJson["data"] ={"XmlData":JSON.stringify(XmlData)};
  
  var resultData = JL.ajax(ajaxJson);

  if (resultData.data.returnMap == '1'){
	  alert('删除成功');
  }else{
      alert('删除失败');
  }  
}