var JLSelectTree = function(json){
	this.config = {
		"multi": false,
		"text": true,
		"placeholder": "",//提示文字
		"sBillName": "jlquery",//接口路径(有默认值)
		"sOperateName": "select.do",//接口方法(有默认值)
		"param": {},//接口传递参数
		"listener": {}//监听事件 change|keyup
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
	
	this.setCdsData = function(data){
		if(!JL.isNull(data)){
			this.setData(data);
		} else {
			this.data = [];
			this.text.val("");
		}
	};
	
	this.setData = function(data){
		this.jl_address.find("> [data-index='1']").siblings("[data-index]").remove();
		
		this.data = data;
		var html = "";
		for(var i=0; i<data.length; i++){
			var row = data[i];
			var VALUE = row.VALUE;
			
			if(typeof row == "object" && $.isArray(row)){
				var str = "";
				for(var j=0; j<row.length; j++){
					str += row[j].VALUE +"、";
				}
				VALUE = str.substring(0, str.length-1);
			} 
			
			if(row.KEY == "0"){
				this.obj.find(".add_main :text").val(row.VALUE);
			}else{
				this.obj.find("[data-id='"+row.KEY+"']").click();
			}
			
			html += VALUE +" ";
		}
		this.text.val(html);
	};
	
	this.getData = function(){
		return this.data;
	};
	
	this.loadData = function(param){
		param = $.extend({}, this.config.param, param);
		if( !JL.isNull(this.config.sqlid) && !JL.isNull(this.config.resource) ){
			var XmlData={};
			XmlData["sqlid"] = this.config.sqlid;
			XmlData["DataBaseType"] = this.config.resource;
			$.extend(XmlData, userInfo);
			$.extend(XmlData, this.config.param);
			param = XmlData;
		}
		var transport = new JLTransport();
		var resultData = transport.select(this.config.sBillName, this.config.sOperateName, param);
		return resultData;
	};
	
	this.loadOption = function(div, options){
		div.append("<h3>请选择</h3>");
		var add_main = $("<div class='add_main'></div>").appendTo(div);
		for(var i=0; i<options.length; i++){
			var option = options[i];
			div.attr("data-index", option.LEVELS);
			var span = $("<span>").appendTo(add_main);
			span.attr("data-id", option.KEY);
			span.html(option.VALUE);
			span.data(option);
			span.click(function(){
				var data = $(this).data();
				if(data.MJBJ == 0){
					var div_new = $("<div class='w12'></div>");//.appendTo(thisPlugin.jl_address);
					div.hide();
					div.after(div_new);
					thisPlugin.loadOption(div_new, thisPlugin.loadData({"PARENT":data.KEY}));
				}
				
				thisPlugin.address.siblings("[data-index='"+data.LEVELS+"']").remove();
				
				if(thisPlugin.config.multi){
					if($(this).hasClass("bian")){
						$(this).removeClass("bian");
					}else{
						$(this).addClass("bian");
					}
				}
				
				var span_result = $("<span>");
				span_result.attr("data-index", data.LEVELS);
				if(data.MJBJ == 1 && thisPlugin.config.multi){
					var bian = $(this).parent().children(".bian");
					var bian_data = [];
					for(var i = 0; i<bian.length; i++){
						var span_bian = $(bian[i]);
						if(i == bian.length-1){
							span_result.append("<label>"+span_bian.data("VALUE")+"</label>");
						}else{
							span_result.append("<label>"+span_bian.data("VALUE")+"、</label>");
						}
						bian_data.push(span_bian.data());
					}
					span_result.data("arr", bian_data);
				} else {
					span_result.data(data);
					span_result.append("<label>"+data.VALUE+"</label>");
				}
					
				var i_fa = $("<i class='fa fa-times-circle' title='返回上级'></i>").appendTo(span_result);
				i_fa.click(function(){
					var index = $(this).closest("span").attr("data-index");
					$(this).closest("span").nextAll("span").remove();
					$(this).closest("span").remove();
					
					thisPlugin.obj.find("div[data-index='"+index+"']").nextAll("div[data-index]").remove();
					if(index > 1){
						thisPlugin.obj.find("div[data-index='"+(index-1)+"']").show();
						thisPlugin.obj.find("div[data-index='"+index+"']").remove();
					}else{
						thisPlugin.obj.find("div[data-index='"+index+"']").show();
					}
				});
				thisPlugin.address.before(span_result);
			});
		}
	};
	
	this.disabled = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.text.attr("disabled","disabled");
			this.span.hide();
		}else{
			this.text.removeAttr("disabled");
			this.span.show();
		}
	};
	
	this.hide = function(boolean){
		boolean = JL.isNull(boolean)? true: boolean;
		if(boolean){
			this.obj.hide();
		}else{
			this.obj.show();
		}
	};
	
	this.init = function(json){
		$(this.obj).empty();
		$(this.obj).addClass("jl_btn_group");
		
		var text = $("<input>").appendTo(this.obj);
		text.attr("type", "text");
		text.attr("name", this.config.id);
		text.attr("readonly", "readonly");
		if(!JL.isNull(this.config.placeholder)){
			text.attr("placeholder", this.config.placeholder);
		}
		text.keyup(function(){
			var lis = $(this).next().next().find("li");
			lis.hide();
			for(var i=0;i<lis.length;i++){
				var li = $(lis[i]);
				if(li.text().indexOf(this.value) != -1){
					li.show();
				}
			}
			if(!JL.isNull(thisPlugin.config.listener.keyup)){
				thisPlugin.config.listener.keyup($(this).val());
			}
		});
		
		var span = $("<span class='jl_btn btn_white'><i class='fa fa-angle-down'></i></span>").appendTo(this.obj);
		span.click(function(){
			$(this).next().show();
		})

		var jl_dropdown_menu = $("<div class='jl_dropdown_menu'></div>").appendTo(this.obj);
		var jl_address = $("<div class='jl_address'></div>").appendTo(jl_dropdown_menu);
		
		var div = $("<div class='w12'></div>").appendTo(jl_address);
		
		this.loadOption(div, this.loadData());
		
		var bottom = $("<div class='w12'></div>").appendTo(jl_address);
		bottom.append("<h3>您选择的结果:</h3>");
		var resultDiv = $("<div class='add_main'></div>").appendTo(bottom);
		this.address = $("<input placeholder='填写详细地址' type='text' />").appendTo(resultDiv);
		if(!this.config.text){
			this.address.hide()
		}
		
		var qd = $("<a class='jl_btn btn_color'><i class='fa fa-gavel'></i><label>确定</label></a>").appendTo(bottom);
		qd.click(function(){
			thisPlugin.data = [];
			var html = "";
			var spans = resultDiv.find("span");
			for(var i=0; i<spans.length; i++){
				var span = $(spans[i]);
				var span_data = span.data();
				if(i == (spans.length-1) && thisPlugin.config.multi && !JL.isNull(span_data.arr)){
					var arr = span_data.arr;
					for(var j=0; j<arr.length; j++){
						html += arr[j].VALUE +"、";
					}
					html = html.substring(0, html.length-1);
					span_data = arr;
				}else{
					html += span_data.VALUE +" ";
				}
				thisPlugin.data.push(span_data);
			}
			if(resultDiv.find(":text:not(:hidden)").length > 0){
				if(JL.isNull(resultDiv.find(":text:not(:hidden)").val())){
					JL.tip("请填写详细地址","warning");
					return false;
				}
				html += resultDiv.find(":text").val();
				var lastData = {};
				lastData.KEY = "0";
				lastData.VALUE = resultDiv.find(":text").val();
				thisPlugin.data.push(lastData);
			}
			thisPlugin.text.val(html);
			if(!JL.isNull(thisPlugin.config.cds)){
				thisPlugin.getCds().put(thisPlugin.config["cds-field"], thisPlugin.data);
			}
			jl_dropdown_menu.hide();
			if(!JL.isNull(thisPlugin.config.listener.change)){
				thisPlugin.config.listener.change(thisPlugin.data);
			}
			if (!JL.isNull(thisPlugin.config.listener.click)) {  
				thisPlugin.config.listener.click(thisPlugin.data);
			}
		});
		
		var chongzhi = $("<a class='jl_btn btn_color'><i class='fa fa-gavel'></i><label>重置</label></a>").appendTo(bottom);
		chongzhi.click(function(){
			thisPlugin.data = [];
			resultDiv.find("span:first i").click();
			resultDiv.find(":text").val("");
			thisPlugin.text.val("");
			
			if(!JL.isNull(thisPlugin.config.listener.change)){
				thisPlugin.config.listener.change(thisPlugin.data);
			}
		});
		
		/*<div class="w12">
        <h3>您选择的结果</h3>
        <div class="add_main">
          <span><label>湖北省</label><i class="fa fa-times-circle" title="返回上级"></i></span>
          <span><label>武汉市</label><i class="fa fa-times-circle" title="返回上级"></i></span>
          <span><label>江汉区</label><i class="fa fa-times-circle" title="返回上级"></i></span>
          <input placeholder="填写街道/小区/门牌号等" type="text" style="box-shadow: rgb(225, 225, 225) 0px 0px 0px inset;">
        </div>
        </div>*/
		
		this.jl_address = jl_address;
		this.text = text;
		this.span = span;
	};
	this.init();
};