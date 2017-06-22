var JLChooseFilter = function(json){
	this.config = {
			"param": {},	
			"listener": {},	
			"sBillName": "jlquery",
			"sOperateName": "select.do"
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = [];
	
	this.getCds = function(){
		if(JL.isFunction(this.form.getCds)){
			return this.form.getCds(this.config.cds);
		}else{
			return null;
		}
	}
	
	this.setData = function(data){
		this.data = data;
		this.init();
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.setCdsData = function(json, cdsid){
		this.setData(json);
		if (!JL.isNull(this.config.listener.change)) {  
			this.config.listener.change(json);
		}
	}
	
	this.loadData = function(){
		
	}
	
	this.init = function(){
		$(this.obj).empty();
		this.write();
	}
	
	this.write = function(){
		var resultData = this.data[0];
		if(!JL.isNull(resultData)){
			//一级分类
			if(!JL.isNull(resultData.firstSPFL)){
				var firstSPFL = $("<div class='breadcrumb_main'>").appendTo(this.obj);
				firstSPFL.addClass("breadcrumb_main");
				firstSPFL.append("<h2><a>"+resultData.firstSPFL+"</a></h2><i class='jt fa fa-angle-double-right'></i>");
				
				if(!JL.isNull(resultData.secondSPFL)){
					//二级分类
					var secondSPFL = $("<div class='breadcrumb_main'>").appendTo(this.obj);
					secondSPFL.addClass("breadcrumb_main");
					secondSPFL.append("<dl><dt><span>"+resultData.secondSPFL+"</span></i></dt></dl><i class='jt fa fa-angle-double-right'>");
					
					if(!JL.isNull(resultData.thirdSPFL)){
						//三级分类
						var thirdSPFL = $("<div class='breadcrumb_main'>").appendTo(this.obj);
						thirdSPFL.addClass("breadcrumb_main");
						thirdSPFL.append("<dl><dt><span>"+resultData.thirdSPFL+"</span></dt></dl><i class='jt fa fa-angle-double-right'>");
					}
				}
			} else {
				var all = $("<div class='breadcrumb_main'>").appendTo(this.obj);
				all.addClass("breadcrumb_main");
				all.append("<h2><a>全部结果</a></h2><i class='jt fa fa-angle-double-right'></i>");
			}
			
			if(!JL.isNull(resultData.keyWord)){
				var keyWord = $("<div class='breadcrumb_main'>").appendTo(this.obj);
				keyWord.addClass("breadcrumb_main");
				keyWord.append("<dl><dt><span> 关键字 : "+resultData.keyWord+"</span></dt></dl>");
			}
			
			var pp_sx = $("<div class='breadcrumb_main'>").appendTo(this.obj);
			pp_sx.addClass("breadcrumb_main");
			
			
			console.info("++++++++++++++++++++++++");
			console.info(resultData);
			if(!JL.isNull(resultData.classify)){
				var dl = $("<dl><dt><span>分类：</span><label>"+resultData.classify.value+"</label><i class='fa fa-trash-o' title='删除'></i></dt></dl>").appendTo(pp_sx);
				dl.data({"type":"classify", "key": "分类","value": resultData.classify});
			}

			if(!JL.isNull(resultData.classBrand)){
				var dl = $("<dl><dt><span>品牌：</span><label>"+resultData.classBrand.value+"</label><i class='fa fa-trash-o' title='删除'></i></dt></dl>").appendTo(pp_sx);
				dl.data({"type":"brand", "key": "品牌","value": resultData.classBrand});
			}
			
			if(!JL.isNull(resultData.classAttr)){
				$.each(resultData.classAttr, function(key, value){
					var dl = $("<dl><dt><span>"+key+"：</span><label>"+value+"</label><i class='fa fa-trash-o' title='删除'></i></dt></dl>").appendTo(pp_sx);
					dl.data({"type":"attr", "key": key,"value": value});
				});
			}
			
			//删除选项
			pp_sx.find(".fa-trash-o").click(function(){
				var dl = $(this).closest("dl");
				var dlData = dl.data();
				if (!JL.isNull(thisPlugin.config.listener.remove)) {  
					thisPlugin.config.listener.remove(dlData);
				}
				if(dlData.type == "classify") {
					//删除品牌
					delete thisPlugin.data[0]["classify"];
				} else if(dlData.type == "brand") {
					//删除品牌
					delete thisPlugin.data[0]["classBrand"];
				} else if(dlData.type == "attr") {
					//删除属性
					delete thisPlugin.data[0]["classAttr"][dlData.key];
				}
				dl.remove();
				
				console.info(thisPlugin.data[0]);
				var cds = thisPlugin.getCds();
				cds.edit();
				cds.put(thisPlugin.config["cds-field"], thisPlugin.data);
				cds.submit();
			});
		}
	}
	
	this.init();
};