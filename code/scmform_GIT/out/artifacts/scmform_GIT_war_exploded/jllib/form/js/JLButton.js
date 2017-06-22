function JLButton(){
	
	this.jyl = true;
	
	this.btnParam = {};
	
	this.setBtnParam = function(btnParam){
		this.btnParam = btnParam;
	};
	
	this.updateBtnParam = function(key, btnParam){
		$.extend(this.btnParam[key],btnParam);
	};
	
	this.buttons = {
		"jlNew":"<a id='jlNew' class='jl_btn btn_blue_or'><i class='fa fa-plus-square'></i>新建</a>",
		"jlSave":"<a id='jlSave' class='jl_btn btn_blue_or'><i class='fa fa-check'></i>提交</a>",
		"jlPrint":"<a id='jlPrint' class='jl_btn btn_blue_or'><i class='fa fa-print'></i>打印</a>",
		//"jlNew":"<input id='jlNew' type='button' class='jl_btn btn_blue_or display_none' value='重新制单'>",
		"jlInsert":"<input id='jlInsert' type='button' class='jl_btn btn_blue_or display_none' value='新增'>",
		"jlUpdate":"<input id='jlUpdate' type='button' class='jl_btn btn_blue_or display_none' value='修改'>",
		//"jlSave":"<input id='jlSave' type='button' class='jl_btn btn_blue_or' value='提交'>",
		"jlSaveDraft":"<a id='jlSaveDraft' class='jl_btn btn_blue_or'><i class='fa fa-plus-square'></i>保存草稿</a>",
		"jlCancel":"<a id='jlCancel' class='jl_btn btn_blue_or'><i class='fa fa-plus-square'></i>撤回</a>" 
	};
	
	this.addButton = function(json){
		//{"jldelte":{"name":"删除","sBillName":"DHD"},"jlupdate":{"name":"修改","sBillName":"DHD"}}
		var obj = this;
		$.each(json,function(key,val){
			var fa = JL.isNull(val.fa)? "fa-stop": val.fa;
			//追加button
			obj.buttons[key] = "<a id='"+key+"' class='jl_btn btn_blue_or display_none'><i class='fa "+fa+"'></i>"+val.name+"</a>";
			//追加方法体
			obj[key] = JL.isNull(val.button)?{}:val.button;
		});
		//追加button属性
		$.extend(this.btnParam, json);
	};
	
	this.loadButton = function(){
		var obj = this;
		if(!JL.isNull(this.btnParam)){
			$.each(this.btnParam,function(key,val){
				obj.appendButton(key,val);
			});
		}
		
		this.iSave = 2;
		this.setButton();
		if (this.data.PCRM_CH){
			this.getTab().find("#jlSave").hide();
			this.getTab().find("#jlSaveForm").hide();
			this.getTab().find("#jlSaveDraft").hide();
			this.getTab().find("#jlDeleteForm").hide();
			this.getTab().find("#jlCancel").show();
			
			this.getTab().find("input,select,textarea").attr("disabled","disabled");
			$.each(this.pluginObj, function(key, value){
				if(JL.isFunction(value.disabled)){
					value.disabled(true);
				}
			});
		}
	};
	
	this.appendButton = function(key,val){
		var obj = this;
		var html = null;
		
		if(obj.getTab().find(".jl_operation").length > 0){
			html = obj.getTab().find(".jl_operation");
		}else{
			html = $("<div class='jl_operation' style='bottom: 0px; margin-bottom: 0px;'><div class='oper_line'></div><div class='oper_main'></div></div>");
			html.appendTo(this.getTab());
		}
		
		//生成button
		html.find(".oper_main").append(obj.buttons[key]);
		//button事件初始化
		html.find("#"+key).click(function(){
			if(typeof eval("obj."+key) == "function"){
				//当前button：set属性
				eval("obj."+key+"($(this),obj.btnParam[key]);");
			}
		})
	};
	
	this.hideButton = function(id){
		this.getTab().find(".jl_operation #"+id).hide();
	};
	
	this.disabledButton = function(id){
		JL.disabledClass(this.getTab().find(".jl_operation #"+id),true);
	};
	
	this.setButton = function(id){
		this.getTab().find(".jl_operation").show();
		//0、1是点提交的状态; 2是保存失败 和 初始化 的状态
		if(this.iSave == 0 || this.iSave == 1){
			this.getTab().find("#jlSave").hide();
			this.getTab().find("#jlSaveForm").hide();
			this.getTab().find("#jlSaveDraft").hide();
			this.getTab().find("#jlDeleteForm").hide();
			this.getTab().find("#jlCancel").hide();
			
			if(JL.isNull(this.sk01)){
				this.getTab().find("#jlCopy").show();
			}
		}else if(this.iSave == 2){
			if(!JL.isNull(this.data.bdbh) && this.data.jlbh > 0 && !pubJson.localMode){
				var resultData = JL.checkForm(this.data.bdbh);
				if(resultData.MSGID == "E"){
					this.getTab().find("#jlNewForm").hide();
				}
			}
			this.getTab().find("#jlSave").show();
			this.getTab().find("#jlSaveForm").show();
			this.getTab().find("#jlSaveDraft").show();
			this.getTab().find("#jlCancel").hide();
		}else if(this.iSave == 3){
			this.getTab().find("#jlSave").show();
			this.getTab().find("#jlSaveForm").show();
			this.getTab().find("#jlSaveDraft").hide();
			this.getTab().find("#jlCancel").hide();
		}
		
		if(this.getTab().find(".jl_operation > .oper_main > a:not(:hidden)").length == 0){
			this.getTab().find(".jl_operation").hide();
		}
	};

	this.jlPrint = function(obj,json){
		var OpenWindow = window.open("");
		
		/***
		//写成一行 
		var html = "<!DOCTYPE html>"+
				   "<html lang='zh-cn'>"+
				   "<head>"+
				   "<meta charset='utf-8' />"+
				   "<link rel='stylesheet' type='text/css' href='jllib/jllib_base/css/public.css' />"+
				   "<link rel='stylesheet' type='text/css' href='jllib/form/css/jl_pc_css.css' />"+
				   "<link rel='stylesheet' type='text/css' href='jllib/form/css/jl_pc_form.css' />"+
				   "<link rel='stylesheet' type='text/css' href='jllib/form/css/jl_pc_list.css' />"+
				   "<link rel='stylesheet' type='text/css' href='jllib/form/css/jl_pc_page.css' />"+
				   "<link rel='stylesheet' type='text/css' href='jllib/form/css/jl_pc_control.css' />"+
				   "<script type='text/javascript' src='lib/JQuery/js/jquery-1.11.1.min.js'></script>"+
				   "<title>打印</title>"+
				   "</head>"+
				   "<body></body>"+
				   "</html>";

		//OpenWindow.document.write(html);
		***/
		
		var head = OpenWindow.document.head;
		$(head).html("<meta charset='utf-8' /><title>打印</title>");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/jllib_base/css/public.css' />");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/form/css/jl_pc_css.css' />");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/form/css/jl_pc_form.css' />");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/form/css/jl_pc_list.css' />");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/form/css/jl_pc_page.css' />");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/form/css/jl_pc_table.css' />");
		$(head).append("<link rel='stylesheet' type='text/css' href='"+ pubJson.getURL("FormUrl") +"/jllib/form/css/jl_pc_control.css' />");
		$(head).append("<style>" +
			"@media print {" +
				"@page {" +
					"size: A4;" +
				"}" +
				"@page:left{" +
					"@bottom-left {" +
						"content: 'Page ' counter(page) ' of ' counter(pages);" +
					"}" +
				"}"+
				".hideArea {" +
					"display:none;" +
				"}" +
				"nav, aside {" +
					"display: none;" +
				"}" +
			"}" +
		"</style>");
		var body = OpenWindow.document.body;
		//$(body).append("<input type='button' class='hideArea' onclick='console.info(this);$(this).hide();window.print();$(this).show();' value='确认打印'/>");
		$(body).append("<input type='button' class='hideArea' onclick='window.print();' value='确认打印'/>");
		if(JL.isNull(json) || JL.isNull(json.html)){
			$(body).append(this.getTab().prop('outerHTML'));
		}else{
			$(body).append("<div class='pagr_content'>"+json.html+"</div>");
		}
		$(body).find(".jl_operation").hide();
		$(body).find(".table_show").css("height","inherit");
		//$(body).find(".table_main").css("width","100%");
		
		if($(body).find("#previewForm").length > 0){
			var title = $(body).find("#previewForm").attr("title");
			if(JL.isNull(json) || JL.isNull(json.html)){
				$(body).find("#previewForm").prepend("<h2 class='form_title'>" + title + "</h2>");
			}else{
				$(body).find("#previewForm").prepend("<h3 align='center'>" + title + "</h3>");
			}
			$(body).find("#previewForm").addClass("page_print");
		}else{
			var data_id = this.getTab().data("id");
			var title = $(".jl_huoye_title > ul > li[data-id='"+data_id+"']").text();
			if(JL.isNull(json) || JL.isNull(json.html)){
				$(body).find(".pagr_content").prepend("<h3>" + title + "</h3>");
				$(body).find(".pagr_content").addClass("page_print");
			}else{
				$(body).find(".pagr_content").prepend("<h3 align='center'>" + title + "</h3>");
				$(body).find(".pagr_content").addClass("page_print");
			}
		}
		
		var form = this;
		this.readData();
		$.each(this.data, function(key, value){
			var plugin = form.getPlugin(key)
			if(!JL.isNull(plugin) && !JL.isNull(plugin.jlid)){
				var ddHtml = "";
				if(plugin.jlid == "JLInput" || plugin.jlid == "JLDate"){
					ddHtml = value;
					$(body).find("#d_"+key).closest("dd").html(ddHtml);
				}else if(plugin.jlid == "JLSelect" 
						|| plugin.jlid == "JLRadio"){
					ddHtml = JL.isNull(value.value)? "": value.value;
					$(body).find("#d_"+key).closest("dd").html(ddHtml);
				}else if(plugin.jlid == "JLUpload" 
					|| plugin.jlid == "JLUploadImage"){
					ddHtml = $(body).find("#d_"+key).text();
					$(body).find("#d_"+key).closest("dd").html(ddHtml);
				}else if(plugin.jlid == "JLMultiSelect" 
						|| plugin.jlid == "JLCheckbox"
						|| plugin.jlid == "JLSelectTree"){
					for(var i=0;i<value.length;i++){
						ddHtml += value[i].value + " ";
					}
					$(body).find("#d_"+key).closest("dd").html(ddHtml);
				}else if(plugin.jlid == "JLGrid"){
					$(body).find("#d_"+key).parent().addClass("print_table");
					$(body).find("#d_"+key+" dt").next().remove();
					$(body).find("#d_"+key+" .edit").removeClass("edit");
					/*$(body).find("#d_"+key+" .table_title").hide();
					$(body).find("#d_"+key+" dt").hide();
					$(body).find("#d_"+key+" .table_show dl").unwrap("div");
					$(body).find("#d_"+key+" .table_show :hidden").remove();
					$(body).find("#d_"+key+" .table_show .title").html();
					var grid = $(body).find("#d_"+key+" .table_show").html();
					grid = grid.replace(/dl/g, "tr");
					grid = grid.replace(/dt/g, "td");
					grid = grid.replace(/dd/g, "td");
					$(body).find("#d_"+key+" .table_show").html("<table>"+grid+"</table>");
					*/
				}
			}else{
				$(body).find("[name='"+key+"']").closest("dd").css("height", "inherit");
				$(body).find("[name='"+key+"']").closest("dl").css("height", "inherit");
				$(body).find("[name='"+key+"']").closest("ul").css("height", "inherit");
				$(body).find("[name='"+key+"']").closest("li").css("height", "inherit");
				$(body).find("[name='"+key+"']").closest("dd").html(value);
			}
		});
		var inputs = $(body).find("input");
		for(var i=0; i<inputs.length; i++){
			var input = $(inputs[i]);
			var value = input.val();
			console.info(value);
			//input.closest("dd").html(value);
		}
	};
	
	this.jlNew = function(obj,json){
		var formData = this.getTab().data("formData");
		if(!pubJson.localMode && (!JL.isNull(formData.bdbh) || !JL.isNull(formData.TBLNAME))){
			JL.openForm(formData.bdbh || formData.TBLNAME);
		}else{
			loadPage(formData);
		}
	};
	
	this.jlInsert = function(obj,json){
		var resultData = this.save(json["sBillName"],"insert.do",{},json["callback"]);
		this.checkResult(json, resultData, "新建");
	};
	
	this.jlUpdate = function(obj,json){
		var resultData = this.save(json["sBillName"],"insert.do",{},json["callback"]);
		this.checkResult(json, resultData, "修改");
	};

	this.jlDelete = function(obj,json){ 
		this.saveForm(obj, json, {"S_VALUE": "D1"}, "删除");
	};

	this.jlStop = function(obj,json){ 
		this.saveForm(obj, json, {"S_VALUE": "S1"}, "终止");
	};
	
	this.saveForm = function(obj, json, addData, type){
		try {
			this.jyl = true;
			this.iSave = 0;
			this.setButton();
			this.readData();
			this.setData(addData);
			var resultData = this.save(json["sBillName"],json["sOperateName"],{},json["callback"]);
			this.checkResult(json, resultData, type);
		} catch (e) {
			// TODO: handle exception
			console.info(e);
		}
	};
	
	this.jlSave = function(obj,json){ 
		try {
			this.draft = false;
			this.jyl = true;
			this.iSave = 0;
			this.setButton();
			this.readData();
			if(JL.isFunction(json["before"])){
				json["before"]();
			}
			if(JL.isFunction(json["beforeSave"])){
				if(json["beforeSave"]()){
					return false;
				}
			}
			var resultData = this.save(json["sBillName"],json["sOperateName"],{},json["callback"]);
			this.checkResult(json, resultData, "保存"); 
		} catch (e) {
			// TODO: handle exception
			console.error(e);
		}
	};
	
	this.checkResult = function(json, resultData, type, notAutoDB){
		if(!JL.isNull(resultData)){
			resultData = resultData.data;
			var tip = "";
			if(!JL.isNull(this.data.bdbh) && !JL.isNull(resultData.jlbh)){
				tip = JL.tip(type + "成功[流水号:"+this.data.bdbh+"-"+resultData.jlbh+"]");
			}else{
				tip = JL.tip(type + "成功");
			}
			if(!(this.draft == true || json.disabled == false)){
				if(this.getTab().find(".jl_defCar").length == 0 && this.getTab().find(".addCarShow").length == 0){
					this.getTab().find("input,select,textarea").attr("disabled","disabled");
					$.each(this.pluginObj, function(key, value){
						if(JL.isFunction(value.disabledAllColumn)){
							value.disabledAllColumn(true);
						}else if(JL.isFunction(value.disabled)){
							value.disabled(true);
						}
					});
				}
				this.iSave = 1
				this.setButton();
			}
			
			var data_id = this.getTab().attr("data-id");
			$(".jl_breadcrumb[data-id='"+data_id+"']").find(".center").addClass("center01");
			$(".jl_breadcrumb[data-id='"+data_id+"']").find(".before01").removeClass("before01");
			
			if(!JL.isNull(json["after"]) && typeof json["after"] == "function"){
				json["after"](resultData, tip); 
			}
			if(!JL.isNull(json.success) && typeof json.success == "function"){
				json.success(resultData, tip); 
			}
			
			this.sk01 = resultData.NSK01;
			this.pid = resultData.PID; 
			this.setData({"jlbh": resultData.jlbh});
			
			var temp_data = resultData["PCRM_DATA"];
			if(!JL.isNull(temp_data) && !notAutoDB) {
				temp_data["CD01"] = temp_data["GZL01"];
				temp_data["CD02"] = temp_data["GZL02"];
				loadPage(temp_data, {"CD02":temp_data["GZL02"]});
				var temp_s = "操作";
				if(temp_data["PXW01"] == 0) temp_s = "保存草稿";
				if(temp_data["PXW01"] < 0) temp_s = "回退/撤回";
				JL.tip("【" + temp_data["PBZ02"] +"】" + temp_s + "成功！您可以继续操作【" + temp_data["BZ02"] +"】。");
			}
			
		}else{ 
			if(!this.draft){
				this.iSave = 2;
				this.setButton();
			}
			if(!JL.isNull(json.error) && typeof json.error == "function"){
				json.error(resultData);
			} 
		}	
	};
	
	this.jlCancel = function(obj,json){
		console.info('jlCancel');	
		this.jyl = false;
		JL.disabledClass(obj,true);
		this.readData();
		this.cancel = true;
		var resultData = this.save(json["sBillName"],json["sOperateName"],{},json["callback"]);

		if(!JL.isNull(resultData)){
				resultData = typeof resultData=="string"? resultData: resultData["data"];
				if(typeof resultData=="string"&&resultData.indexOf("Exception") != -1){
					resultData=resultData.replace(/java.lang.Exception: /gm,'').replace(/Exception: /gm,'');
					JL.tip("撤回失败："+resultData);
					JL.disabledClass(obj,false);
				}else if(resultData.TODOLIST != undefined){
					var TODOLIST = resultData.TODOLIST;
					if(TODOLIST.length>0){
						if(confirm("撤回成功[流水号:"+this.data["bdbh"]+"-"+resultData.jlbh+"],是否立即进入下一步?")){
							var srcUrl=$("#IFRAME_GZLBH_"+GZLBH)[0].contentWindow.location.href.split("?")[0]+"?XMBH="+TODOLIST[0].XMBH+"&GZLBH="+TODOLIST[0].GZLBH+"&BZBH="+TODOLIST[0].BZBH+"&RZBH="+TODOLIST[0].RZBH;
							$("#IFRAME_GZLBH_"+GZLBH).attr("src",srcUrl);
						}
					}
				}else if(!JL.isNull(resultData["jlbh"])){
					JL.tip("撤回成功[流水号:"+this.data["bdbh"]+"-"+resultData.jlbh+"]");
					this.getTab().find("input,select,textarea").attr("disabled",true);
				}else if(JL.isNull(resultData)){
					JL.tip("撤回失败");
					JL.disabledClass(obj,false);
				}else if(!JL.isNull(resultData)){
					JL.tip("撤回成功");
					this.getTab().find("input,select,textarea").attr("disabled",true);
				}
			}else{
				JL.disabledClass(obj,false);
			}
	};

	this.jlSaveDraft = function(obj,json){
		debugger;
		this.readData();
		this.draft = true;
		this.jyl = false;
		
		if(JL.isFunction(json["before"])){
			json["before"](obj,this.getData());
		}
		if(JL.isFunction(json["beforeSave"])){
			if(json["beforeSave"](obj,this.getData())){
				return false;
			}
		}
		
		var resultData = this.save(json["sBillName"],json["sOperateName"],{},json["callback"]);
		console.info(resultData);
		
		this.sk01 = resultData.data.SK01;
		this.pid = resultData.data.PID;
		this.setData({"jlbh": resultData.data.jlbh});
		this.checkResult(json, resultData, "保存");
	};
}
