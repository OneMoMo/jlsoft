var JLLayoutGrid_mobile =function(json){
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
		 var SPLB =this.data;
		 for(var i=0;i<SPLB.length;i++){
			 SPLB[i].JE = "4.00";
			 SPLB[i].XSDJ="19";
			 SPLB[i].SL="1";
			 SPLB[i].SPGG="9.0";
			 SPLB[i].SPSX="普通";
			 SPLB[i].SPDW="个";
			 SPLB[i].CK01="000107";
			 SPLB[i].CK02="厂家仓库";
			 SPLB[i].CG_BM01="0009";
			 SPLB[i].CGBMMC="厂家";
			 SPLB[i].GYS_WLDW01="000017";
			 SPLB[i].WLDWMC="1213";
			 SPLB[i].CG_BM01="00010106"
		
		 }
		 return SPLB;

		             	 };

 	this.setData = function(data){
       this.data=data;
       this.init();
	};
	
var userInfoCookie = $.cookie("userInfo");
var userInfo = JSON.parse(userInfoCookie);
this.appendRow=function(ul,data){
for(var i=0; i<thisPlugin.config.header.length; i++){
	var row = thisPlugin.config.header[i];
	console.log(row);
    var value = JL.isNull(data[row.id])? "": data[row.id];
    var li= $('<li  class="w12 pro_name"></li>').appendTo(ul)
    
   if(row.editor=="chec"){
    	
    	li.append('<li class="checkbox"><i class="fa fa-square-o checkbox"></i></li>')
    }
  else if(row.editor == "title"){
    	li.append('<i class="bgcolor_blue"></i><h4>'+value+'</h4>');
   
    }
    else if(row.editor=="del"){
    	
    	$('<div class="btn" style="right: -100%;"><ul><li class="w06 btn_red"><i class="fa fa-plus plus"></i><input type="number" placeholder="数量" value="1"><i class="fa fa-minus minus"></i></li><li class="w06 btn_blue"><span>删除</span></li></ul></div>')

    	//$('<div class="btn" style="right: 0px;"><ul><li class="w06 btn_red"><i class="fa fa-plus plus"></i><input type="number" placeholder="数量" value="1"><i class="fa fa-minus minus"></i></li><li class="w06 btn_blue"><span>删除</span></li></ul></div>')
    	.appendTo($("#d_SPLB"))
    }
   
    
    else{

    	li.append('<dl><dt class="w05">'+row.name+'：</dt><dd class="w07"><span>'+value+'</span></dd></dl>');
    }
    
  
    
    li.click(function(){
		if(!JL.isNull(row.listener) && JL.isFunction(row.listener.click)){
			row.listener.click(data);
		}
    });
}
};


this.addRow=function(data, index){

	if(JL.isNull(index)){
		this.data.push(data);
		index = this.data.length - 1;
	 }
	index = JL.isNull(index)? this.data.length-1: index;	
	var ul= $('<ul class="w12"></ul>').appendTo($(this.obj))
	ul.data(data);
	this.appendRow(ul, data);

	ul.click(function(){
		if(JL.isFunction(thisPlugin.config.listener.rowclick)){
			thisPlugin.config.listener.rowclick($(this).data());
		}
	});
};

this.init= function(){
   for(var i=0;i<this.data.length;i++){
	   this.addRow(this.data[i], i);
   }
};

this.init();


this.disabled = function(){
	
}
	
};



