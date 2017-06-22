var messageDetail = JL.JLForm();

messageDetail.setAfterInit(function(){
	debugger;
	console.info(this.data);
	this.find("#title").html(this.getData("MS06"));
	this.find("#FBR").html(this.getData("MS03"));
	this.find("#FBSJ").html(this.getData("MS10"));
	this.find("#ZY").html(this.getData("MS11"));
	var MSGFJ = this.getData("MSGFJ");
	if(MSGFJ.length > 0){
		for(var i=0;i<MSGFJ.length;i++){
			var FJ = MSGFJ[i];
			var span = $("<span class='jl_btn btn_color_or mr10'><i class='fa fa-download mr5'></i>"+FJ.FILE_DESC+"</span>");
			span.data(FJ);
			span.click(function(){
				var XmlData = {};
				XmlData["filename"] = $(this).data("FILE_DESC");
				XmlData["url"] = $(this).data("FILE_URL");
				JL.download(pubJson.getURL("FormUrl") + "/FormUpload/download.do", XmlData);
			});
			this.find("#FILE").after(span);
		}
	}else{
		this.find("#FILE").after("<span class='font_gray'>( 无 )</span>");
	}
	
	if(!JL.isNull(this.getData("MS12"))){
		debugger;
		this.find("#TEXT").html(JL.getPagingData(this.getData("MS12")+".html"));
	}
	
	if(!JL.isNull(this.getData("SSGSMC"))){
		this.find("#FILE").parent().after("<div class='w12 mt10'><span class='font_gray'>接收公司：</span><span id='ZY'>"+this.getData("SSGSMC")+"</span></div>");
	}
	if(!JL.isNull(this.getData("SSBMMC"))){
		this.find("#FILE").parent().after("<div class='w12 mt10'><span class='font_gray'>接收部门：</span><span id='ZY'>"+this.getData("SSBMMC")+"</span></div>");
	}
	if(!JL.isNull(this.getData("SSGWMC"))){
		this.find("#FILE").parent().after("<div class='w12 mt10'><span class='font_gray'>接收岗位：</span><span id='ZY'>"+this.getData("SSGWMC")+"</span></div>");
	}
	if(!JL.isNull(this.getData("SSRYMC"))){
		this.find("#FILE").parent().after("<div class='w12 mt10'><span class='font_gray'>接收人员：</span><span id='ZY'>"+this.getData("SSRYMC")+"</span></div>");
	}
	
	var XmlData = {};
    XmlData["QX01"] = this.getData("QX01");
    JL.ajax({
	    "async": false,
	    "src": pubJson.getURL("FormUrl") + "/defMSG/updateMSGHF.do",
	    "data": {"XmlData": JSON.stringify(XmlData)},
	    "callback": function(resultData){
		    thisPlugin.removeDL(rowIndex);
	    }
    });
});
