function JLO2OForm(){
	this.JLO2OTypePlugin = null;
	this.setJLO2OTypePlugin = function(data){
		this.JLO2OTypePlugin = data;
	}
	
	this.initDivs = function(){
		var thisJLO2OTypePlugin = this.JLO2OTypePlugin;
		var form = this;
		var plugin = form.plugin;
		var divs = this.getTab().find("[jl-ckid]");
		var form = this;
		if(JL.isNull(this.srchParam.sBillName) || JL.isNull(this.srchParam.sOperateName)){
			return false;
		}
		//获取初始静态资源数据
		var param = {};
		var transport = new JLTransport();
		var resultData = transport.select(this.srchParam.sBillName, this.srchParam.sOperateName, param);
		if(!JL.isNull(resultData)){
			$.each(resultData,function(i,val){
				//var rid = Math.random();
				/** -- 旧写法待删除
				var rid = -1;
				$.ajax({
					   url:pubJson.getURL("FormUrl")+"/jllib/jllib_pc/o2o/js/"+val.ckjs,
					   type:'HEAD', 
					   async: false,//使用同步的方式,true为异步方式
					   error: function() {
							$(document).find("body").append("<script type='text/javascript' val='"+val.ckjs+"' src='"+pubJson.getURL("FormUrl")+"/jllib/jllib_pc/o2oPub/js/"+val.ckjs+"?rid="+rid+"'><\/script>");
					   }, 
					   success: function() {
						    $(document).find("body").append("<script type='text/javascript' val='"+val.ckjs+"' src='"+pubJson.getURL("FormUrl")+"/jllib/jllib_pc/o2o/js/"+val.ckjs+"?rid="+rid+"'><\/script>");
					   }
				});*/
				
				var ckjsArr = val.ckjs.split(".");
				if(!JL.isNull(val.ckjs) && $("script[src*='"+val.ckjs+"']").length==0){
					var pluginConfig = JL.Plugin[ckjsArr[0]];
					var path = pluginConfig.path;
					var version = pluginConfig.version;
					$(document).find("body").append("<script type='text/javascript' src='"+path+val.ckjs+"?version="+version+"'><\/script>");
				}
				
				//var typePlugin = val.ckjs;
				var JLID = eval(val.ckjs.split(".")[0]);
				if(!JL.isNull(JLID)){
					//定位窗口对象
					val["obj"] = form.getTab().find("[jl-ckid=\""+val.ckid+"\"]");
					//控件初始化
					if(!JL.isNull(thisJLO2OTypePlugin)){
						$.each(thisJLO2OTypePlugin,function(j,pluginObj){		
							if(!JL.isNull(pluginObj[val.ckjs])){
								val["JLO2OType"]=pluginObj[val.ckjs];
								return false;
							}
						})
					}
					JLID = new JLID(val);
				}
			 })
			 form.imgLazyload();
		}
	}
	
	this.imgLazyload = function(){
		try{
			//图片懒加载
			this.getTab().find("img").lazyload({
				data_attribute:"src",
			    effect:"fadeIn",
			    placeholder:"../../images/s.gif"
			});
		}catch(e){
			console.info(e);
		}
	}
	
}
