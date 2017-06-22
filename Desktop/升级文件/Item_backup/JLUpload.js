var JLUpload = function(json){
	this.config = {
		"sBillName": pubJson.getURL("FormUrl") + "/FormUpload",//接口路径(有默认值)
		"sOperateName": "multiUpload.do",//接口方法(有默认值),
		"preset": {
			"img": ["jpg","bmp","gif","png","jpeg"], 
			"text": ["txt","doc","docx"], 
			"excel": ["xls","xlsx"], 
			"html": ["html","htm"] 
		},
		"fileType":[], //预设类型 img|text|excel|html
		"suffix":[],  //扩展可上传文件类型
		"listener": {} //监听事件 afterUpload
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		}else{
			this.setData([]);
		}
	};

	this.setData = function(data){
		this.data = JL.formatArray(data);
		this.ul.find('li').remove();
		this.appendFile(data);
	}

	this.getData = function(){
		return this.data;
	}
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		this.config.disabled = boolean;
		if(boolean){
			this.load_main.hide();
			this.ul.find("> li > .fa-times-circle").hide();
		}else{
			this.load_main.show();
			this.ul.find("> li > .fa-times-circle").show();
		}
	}
	
	this.init = function(json){
		$(this.obj).empty();
		$(this.obj).addClass("jl_up_img");
		
		var load_main = $("<div>").appendTo(this.obj);
		load_main.addClass("load_main");
		var i_fa = $("<i class='fa fa-cloud-upload'></i>").appendTo(load_main);
		i_fa.click(function(){
			if(JL.isFunction(thisPlugin.config.listener.beforeupload)){
				if(thisPlugin.config.listener.beforeupload(thisPlugin)){
					return false;
				}
			}
			if(thisPlugin.data.length >= thisPlugin.config.maxlength){
				JL.tip("最多上传"+thisPlugin.config.maxlength+"个文件");
				return false;
			}
			$(this).next().click();
		});
		var file = $("<input>").appendTo(load_main);
		file.addClass("hide");
		file.attr("type", "file");
		file.attr("name", "file_"+this.config.id);
		file.attr("multiple", "multiple");
		file.change(function(){
			var type = thisPlugin.config.suffix;
			if(!JL.isNull(thisPlugin.config.fileType)){
				var fileType = thisPlugin.config.fileType;
				for(var i=0; i<fileType.length; i++){
					var key = fileType[i];
					var preset = thisPlugin.config.preset[key];
					type = type.concat(preset);
				}
			}
			var files = this.files;
			if(thisPlugin.data.length + files.length > thisPlugin.config.maxlength){
				JL.tip("最多上传"+thisPlugin.config.maxlength+"个文件");
				$(this).val("");
				return false;
			}
			for(var i=0; i<files.length; i++){
				var file = files[i];
				var split = file.name.split(".");
				var suffix = split[split.length-1].toLocaleLowerCase();
				
				var fileSize = files[i]["size"];
				if(!JL.isNull(thisPlugin.config.maxsize) && fileSize > thisPlugin.config.maxsize){
					JL.tip("图片文件大小("+JL.getFileSize(fileSize)+")不能超过"+JL.getFileSize(thisPlugin.config.maxsize));
					$(this).val("");
					return false;
				}
				
				if(!JL.isNull(type)){
					if($.inArray(suffix, type) == -1){
						JL.tip("上传文件类型错误","warning");
						$(this).val("");
						return false;
					}
				}
			}
			
			thisPlugin.submit($(this));
		});
		
		var file_main = $("<div>").appendTo(this.obj);
		file_main.addClass("w12 img_main")
		var fa_angle_left = $("<i class='last fa fa-angle-left'></i>").appendTo(file_main);
		fa_angle_left.click(function(){
			var scroll = $(this).next().scrollLeft();
			$(this).next().scrollLeft(scroll-20);
		});
		
		var more_img = $("<div>").addClass("more_img").appendTo(file_main);
		var ul = $("<ul>").appendTo(more_img);
		
		var fa_angle_right = $("<i class='next fa fa-angle-right'></i>").appendTo(file_main);
		fa_angle_right.click(function(){
			var scroll = $(this).prev().scrollLeft();
			$(this).prev().scrollLeft(scroll+20);
		});
		
		this.ul = ul;
		this.i = i_fa;
		this.load_main = load_main;
	}
	
	this.appendFile = function(files) {
		debugger; 
		for(var i=0;i<files.length;i++){
			var file = files[i];
			var li = $("<li class='jl_btn btn_blue'><i class='fa fa-cloud-download mr5'></i>"+file["FILE_DESC"]+"</li>").appendTo(thisPlugin.ul);
			li.data(file);
			li.click(function(){
				var XmlData = {};
				XmlData["filename"] = $(this).data("FILE_DESC");
				XmlData["url"] = $(this).data("FILE_URL");
				JL.download(pubJson.getURL("FormUrl") + "/FormUpload/download.do", XmlData);
			});
			
			if(!this.config.disabled){
				var remove = $("<i class='fa fa-times-circle ml5'></i>").appendTo(li);
				remove.click(function(){
					var parentLi = $(this).closest("li");
					var parentData = parentLi.data();
					parentLi.remove();
					thisPlugin.data.splice($.inArray(parentData, thisPlugin.data),1);
					
					debugger;
					if(!JL.isNull(thisPlugin.config.listener.removefile)){
						thisPlugin.config.listener.removefile(parentData);
					}
				});
			}
		}	
	} 
	
	this.success = function(data) { 
		try{
			thisPlugin.i.attr("class","fa fa-refresh fa-spin");
			var jsonData = [];
			try{
				jsonData = JSON.parse(data).data.resultData;
			}catch(e){
				JL.tip(data.replace("Exception: java.lang.Exception:",""),"error"); 
			}	
			var files = jsonData;
			
			if(JL.isFunction(thisPlugin.config.listener.loadFile) && files.length > 0){
				if(thisPlugin.config.listener.loadFile(files)){
					return false;
				}
			}
			
			thisPlugin.appendFile(files);
			$.unique($.merge(thisPlugin.data, files));
			
			if(!JL.isNull(thisPlugin.config.listener.afterUpload) && thisPlugin.data.length > 0){
				thisPlugin.config.listener.afterUpload(thisPlugin.data);
			}
			thisPlugin.i.attr("class","fa fa-cloud-upload");
			JL.tip("上传成功");

			if(!JL.isNull(thisPlugin.config.cds)){
				thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
			}
		}catch(e){
		}
	}
	
	this.submit = function(obj){
		$.ajaxFileUpload({
			type:"POST",
			secureuri:false,
			fileElementId:[obj],
			url:encodeURI(this.config.sBillName + "/" + this.config.sOperateName),//encodeURI避免中文乱码
			data:{},
			dataType:"text",
			success: this.success,
			error: function(){
				JL.tip("上传失败");
			}
		});
	}
	this.init();
};