var JLUploadImage = function(json){
	this.config = {
		"sBillName": "FormUpload",//接口路径(有默认值)
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
		this.appendImage(data);
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
	
	this.appendImage = function(files){
		for(var i=0;i<files.length;i++){
			var file = files[i];
			console.info(file);
			var li = $("<li title='"+file["FILE_DESC"]+"' name='"+file["FILE_DESC"]+"'><img src='"+file["FILE_URL"]+"'></li>").appendTo(thisPlugin.ul);
			li.data(file);
			li.click(function(){
				$(".jl_modal").fadeIn();
				var div = $("<div>").appendTo(".jl_modal");
				div.addClass("image");
				div.css({"width":"100%","height":"100%"});
				div.click(function(e){
					if($(e.target).is("div")){
						$(".jl_modal").fadeOut();
						$(this).remove();
					}
				});
				var img = $(this).find("img").clone(false);
				img.appendTo(div);
				img.css({"max-width":"1000px","max-height":"500px","position": "fixed", "top": "50%", "left": "50%"});
				var height = img.height()/2;
				var width = img.width()/2;
				img.css({"margin-top":-height+"px","margin-left":-width+"px"});
			});
			
			if(!this.config.disabled){
				var remove = $("<i class='fa fa-times-circle'></i>").appendTo(li);
				remove.click(function(){
					var parentLi = $(this).closest("li");
					var parentData = parentLi.data();
					parentLi.remove();
					thisPlugin.data.splice($.inArray(parentData, thisPlugin.data),1);
				});
			}
		}
	}

	this.upload = function(obj){
		var url = pubJson.getURL("FormUrl") + "/" +thisPlugin.config.sBillName + "/" + thisPlugin.config.sOperateName;
		$.ajaxFileUpload({
			type:"POST",
			secureuri:false,
			fileElementId:[obj],
			url:encodeURI(url),//encodeURI避免中文乱码
			data:{},
			dataType:"text",
			success: function(data) { 
				var resultList = [];
				try{
					resultList = JSON.parse(data).data.resultData;
				}catch(e){
					JL.tip(data.replace("Exception: java.lang.Exception:",""), "error"); 
				}	
				JL.tip("上传成功");
				var files = resultList;
				thisPlugin.appendImage(files);
				$.unique($.merge(thisPlugin.data, files));
				
				if(!JL.isNull(thisPlugin.config.cds)){
					thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
				}
				
				if(!JL.isNull(thisPlugin.config.listener.afterUpload) && thisPlugin.data.length > 0){
					thisPlugin.config.listener.afterUpload(thisPlugin.data);
				}
			},
			error: function(){
				JL.tip("上传失败");
			}
		});
	}
	
	this.init = function(){
		$(this.obj).empty();
		$(this.obj).addClass("jl_up_img");
		
		var load_main = $("<div>").addClass("load_main").appendTo(this.obj);
		var fa_picture_o = $("<i class='fa fa-picture-o'></i>").appendTo(load_main);
		fa_picture_o.click(function(){
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
			var files = this.files;
			if(thisPlugin.data.length + files.length > thisPlugin.config.maxlength){
				JL.tip("最多上传"+thisPlugin.config.maxlength+"个文件");
				$(this).val("");
				return false;
			}
			for(var i=0; i<files.length; i++){
				var imageType = ["jpg","bmp","gif","png","jpeg"];
				var fileName = files[i]["name"];
				var split = fileName.split(".");
				var fileType = split[split.length-1].toLocaleLowerCase();
				var fileSize = files[i]["size"];
				if(!JL.isNull(thisPlugin.config.maxsize) && fileSize > thisPlugin.config.maxsize){
					JL.tip("图片文件大小("+JL.getFileSize(fileSize)+")不能超过"+JL.getFileSize(thisPlugin.config.maxsize));
					$(this).val("");
					return false;
				}
				if($.inArray(fileType, imageType)==-1){
					JL.tip("请上传图片文件(\".jpg\", \".bmp\", \".gif\", \".png\",\".jpeg\")");
					$(this).val("");
					return false;
				}
			}
			thisPlugin.upload($(this));
		});

		var img_main = $("<div>").addClass("w12 img_main").appendTo(this.obj);
		var fa_angle_left = $("<i class='last fa fa-angle-left'></i>").appendTo(img_main);
		fa_angle_left.click(function(){
			var scroll = $(this).next().scrollLeft();
			$(this).next().scrollLeft(scroll-20);
		});
		
		var more_img = $("<div>").appendTo(img_main);
		more_img.addClass("more_img");
		more_img.css("padding-left","12px");
		var ul = $("<ul>").appendTo(more_img);
		
		var fa_angle_right = $("<i class='next fa fa-angle-right'></i>").appendTo(img_main);
		fa_angle_right.click(function(){
			var scroll = $(this).prev().scrollLeft();
			$(this).prev().scrollLeft(scroll+20);
		});
		
		this.ul = ul;
		this.load_main = load_main;
	}
	this.init();
};
