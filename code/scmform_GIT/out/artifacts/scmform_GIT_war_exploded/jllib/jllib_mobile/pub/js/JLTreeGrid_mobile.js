var JLTreeGrid_mobile =function(json){

	this.config = {
			"listener":{}
		};
	
		$.extend(this.config,json);	
		var thisPlugin = this;
		this.obj = this.config.obj;
		this.form = this.config.form;

		this.version = 3;
		this.data = [];
		
		
		 this.getData = function(){
			 
         };

	 	this.setData = function(data){		
	 		  for(var i=0;i<data.length;i++){
	 			 this.addRow(data[i]);
	 		  }
		};
		
		
		this.appendRow=function(a,data){
			//debugger;
			for(var i=0; i<thisPlugin.config.header.length; i++){
				var header = thisPlugin.config.header[i];
				 var div="";
				if(!JL.isNull(header.groupid)){
				if(a.find("[groupid="+header.groupid+"]").length==0){
		 	     div= $('<div></div>').attr("groupid",header.groupid).addClass(header.groupcss).appendTo(a);
				}else{
					div= a.find("[groupid="+header.groupid+"]");
					
				}
				
				if(div.find("[rowindex="+header.rowindex+"]").length==0){
			 	     div= $('<div></div>').attr("rowindex",header.rowindex).addClass(header.rowcss).appendTo(div);
					
				}else{
			     	div= div.find("[rowindex="+header.rowindex+"]");
					
					}
				

				}
				var groupDiv=a;
				
			   if(!JL.isNull(div)){
				   groupDiv=div;
				   
			   }
			   
			   
			   var selector="";
				if(header.editor=="img"){
					
					selector=$('<div>消息</div>').appendTo(groupDiv);
				
				}else if(!JL.isNull(header.editor)){
					 selector = $('<'+header.editor+'></'+header.editor+'>').appendTo(groupDiv);
					if(!JL.isNull(data[header.id])){
						selector.html(data[header.id]);
					}
					
				}else{
					 selector = $('<span></span>').appendTo(groupDiv);
					if(!JL.isNull(data[header.id])){
						selector.html(data[header.id]);
					}
					
				}
				if(!JL.isNull(header.css)){
					selector.addClass(header.css)
					
					
				}
				
			}
		}



this.addRow=function(data,index){
	if(JL.isNull(index)){
		this.data.push(data);
		index = this.data.length - 1;
	 }
	
	index = JL.isNull(index)? this.data.length-1: index;
	
    // var div =$('<div class="jl_list"><div class="jl_list_03"><ul><li><a><div class="list_name bgcolor_blue">消息</div><div class="list_main"><div class="w12"><h4 class="w10">'+data.GZL02+'</h4><label>'+data.NUM+'</label></div><div class="w12"><span></span></div></div></a></li></ul></div></div>').appendTo(this.obj);
	
	//var div=$('<div class="jl_list"><div><ul><li></li></ul></div></div>').appendTo(this.obj);
	          
	var div1=$('<div class="jl_list_03 swiper ui-page ui-body-c ui-page-active"></div>').appendTo(this.obj);
	
	var div=$('<div><ul><li></li></ul></div>').appendTo(div1);
	
	if(!JL.isNull(thisPlugin.config.style)){
		
		div.addClass(thisPlugin.config.style);
		
	}else{
		
		div.addClass('list_case');
		
	}
	var a= $('<a></a>').appendTo(div.find("li"));
	         
	        //$('<div class="jl_list"><div class="jl_list_03"><ul><li><a><div class="list_name bgcolor_blue">消息</div><div class="list_main"><div class="w12"><h4 class="w10">'+data.GZL02+'</h4><label>'+data.NUM+'</label></div><div class="w12"><span></span></div></div></a></li></ul></div></div>')
           // $('<div class="jl_list"><div class="jl_list_03"><ul><li><a><div class="list_name bgcolor_blue">消息</div><div class="list_main"><div class="w12"><h4 class="w10">'+data[i].TBLNAME+"-"+data[i].JLBH+'-'+data[i].BZ02+' '+data[i].TODO_PROFILE_STR+'</h4><label>'+data[i].SK04+'</label></div><div class="w12"><span>'+data[i].TJRYMC+'</span></div></div></a></li></ul></div></div>')
	 
	
	
	this.appendRow(a, data);
	
	div.click(function(){
		if(!JL.isNull(thisPlugin.config.listener) && JL.isFunction(thisPlugin.config.listener.click)){
			thisPlugin.config.listener.click(thisPlugin,data,index);
		}
    });
	
};
	
	
	this.init= function(){
	
		
		
};
		this.init();
		
		
		

/*var flage=0;
var init= function(mesId,numberId){
	flage=1;
  var massage= mesId;
	//var massage=$("#daiban");
	   massage.empty();
    var XmlData = {};
	XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
	//XmlData["ROWNUM"]=50;
	var ajaxJson = {};
	ajaxJson["src"] = pubJson.getURL("FormUrl")+"/CX/selectDBSL.do";
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(resultData){
     var data =resultData.data.returnList;
    //$("#numberId").text(data.length+"条");
     var a=0;
     numberId.text(data.length+"条");
  for(var i=0;i<data.length;i++){
	 a+=Number(data[i].NUM);
$('<div  onclick="messageListOn(this)" class="jl_list" id1='+data[i].GZL01+' ><div class="jl_list_03"><ul><li><a><div class="list_name bgcolor_blue">消息</div><div class="list_main"><div class="w12"><h4 class="w10">'+data[i].GZL02+'</h4><label>'+data[i].NUM+'</label></div><div class="w12"><span></span></div></div></a></li></ul></div></div>')
			.appendTo(massage);

			}

     }
	
	  $("#messageId").text(a);

		};

		this.initData=function(){
           var mesId= $("#daiban");
           var numberId=$("#numberId");
          init(mesId,numberId);

		};
		this.initData1=function(){
           var mesId= $("#chaosong");
           var numberId=$("#numberId1");
          init(mesId,numberId);
	}

		 messageListOn=function(obj){
			 flage=2;
       var massage=$("#d_massage");
          massage.empty();
      var XmlData = {};
	 XmlData["PI_USERNAME"] = userInfo["PCRM_CZY02"];
      XmlData["GZL01"]=$(obj).attr("id1");
	//XmlData["ROWNUM"]="2";
	var ajaxJson = {};
	var url;
	if($(obj).parent().attr("id")=="daiban"){
		url=pubJson.getURL("FormUrl")+"/CX/selectDB.do";
	}else{
		url=pubJson.getURL("FormUrl")+"/CX/selectDB_CC.do";
	}
	ajaxJson["src"] = url;
	ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
	var resultData = JL.ajax(ajaxJson);
	if(resultData){
	console.log(resultData);
     var data =resultData.data.resultList;
    for(var i=0;i<data.length;i++){
	  data[i].SK02 = JL.isNull( data[i].SK02)?{}:JSON.parse( data[i].SK02)
	  data[i].SK03 = JL.isNull(data[i].SK03)?{}:JSON.parse(data[i].SK03);//摘要数据
	  data[i].TODO_PROFILE_STR = "";
		$.each(data[i].SK02,function(key,value){
			data[i].TODO_PROFILE_STR += key +": "+ value +"&nbsp;&nbsp;";
		});
		data[i].TODO_PROFILE_STR = "(&nbsp;&nbsp;"+data[i].TODO_PROFILE_STR+")";
	  
	  
$('<div id1="data[i].SK01" class="jl_list" id1='+data[i].GZL01+' ><div class="jl_list_03"><ul><li><a><div class="list_name bgcolor_blue">消息</div><div class="list_main"><div class="w12"><h4 class="w10">'+data[i].TBLNAME+"-"+data[i].JLBH+'-'+data[i].BZ02+' '+data[i].TODO_PROFILE_STR+'</h4><label>'+data[i].SK04+'</label></div><div class="w12"><span>'+data[i].TJRYMC+'</span></div></div></a></li></ul></div></div>')
			.appendTo(massage);

			}

         }      
         };

this.initData1();	
this.initData();

	
$("#goBack").click(function(){

	if(flage==2){
	
		$("#messId").click();
		
	}
	
});*/


this.disabled = function(){
	
	
}
	
};



