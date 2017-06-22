var JLToolBar = function(json){
	this.config = {
		"type": "bottom", // bottom|page
		"buttons": {}
	};
	$.extend(this.config, json);	
	if(JL.isNull(this.config["cds-field"])){
		this.config["cds-field"] = this.config.id;
	}
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.form = this.config.form;
	this.version = 3;
	this.data = {};
	
	this.getCds = function(cds){
		if(!JL.isNull(cds)){
			return this.form.getCds(cds);
		}else{
			return null;
		}
	}
	
	this.defaultButtons = {
		"jlNewCard":{
			"name": "新建",
			"icon": "plus-square",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlNewCard;
				var cds = thisPlugin.getCds(thisConfig.cds);
				if(!JL.isNull(cds)){
					cds.append();
				}
				thisPlugin.form.emptyCard();
				thisPlugin.form.readonly(thisConfig.readonly, true);
				thisPlugin.form.getTab().find(".jl_defCar").find("#jlEmptyCard").show();
				JL.showCard(thisPlugin.form.getTab().find(".jl_defCar"));
				if(JL.isFunction(thisConfig.click)){
					thisConfig.click(cds);
				}
			}
		},
		"jlNewForm":{
			"name": "新建",
			"icon": "plus-square",
			"func": function(){
				thisPlugin.form.jlNew();
			}
		},
		"jlPrintForm":{
			"name": "打印",
			"icon": "print",
			"func": function(){
				thisPlugin.form.jlPrint();
			}
		},
		"jlSaveCard":{
			"name": "提交",
			"icon": "check",
			"func": function(){
				thisPlugin.form.iSave = 0;
				thisPlugin.form.setButton();
				var thisConfig = thisPlugin.defaultButtons.jlSaveCard;
				thisPlugin.form.jlSave($(this),{
					"sBillName": thisConfig.sBillName,
					"sOperateName": thisConfig.sOperateName,
					"before": thisConfig.before,
					"success": function(resultData, tip){
						if(JL.isFunction(thisConfig.success)){
							thisConfig.success(resultData, tip);
						}
						var cds = thisPlugin.getCds(thisConfig.cds);
						if(!JL.isNull(cds)){
							cds.submit();
						}
						thisPlugin.form.iSave = 1;
						thisPlugin.form.setButton();
						if(thisPlugin.form.getTab().find(".jl_defCar").length > 0){
							thisPlugin.form.getTab().find(".jl_defCar_header > .close").click();
						}else if(thisPlugin.form.getTab().find(".addCarShow").length > 0){
							var addCarShow = thisPlugin.form.getTab().find(".addCarShow");
							addCarShow.hide();
							thisPlugin.form.getTab().append(addCarShow);
						}
					},
					"error": function(){
						thisPlugin.form.iSave = 2;
						thisPlugin.form.setButton();
						if(JL.isFunction(thisConfig.error)){
							thisConfig.error(resultData);
						}
					}
				});
				if(!JL.isNull(thisConfig.after)){
					if(thisConfig.after()){
						return false;
					}
				}
			}
		},
		"jlSearchForm":{
			"name": "查找",
			"icon": "search",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlSearchForm;
				JLQuery.show2(thisPlugin.form, {
					"dir": thisConfig.dir,
					"namespace": thisConfig.namespace,
					"sqlid": thisConfig.sqlid,
					"queryField": thisConfig.queryField,
					"callback": {},
					"fieldMapping": {},
					"listener":{
						"aftercallback": function(data){
							if(data.length > 0){
								thisPlugin.form.setData(data[0]);
								thisPlugin.form.resetForm();
								debugger;
								thisPlugin.form.find("#jlCopy").show();
								thisPlugin.form.find("#jlSaveForm").hide();
								thisPlugin.form.find("#jlDeleteForm").hide();
							}
						}
					}
				});
			}
		},
		"jlCopy":{
			"name": "复制",
			"icon": "copy",
			"css": "jl_btn btn_color mr10 hide",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlCopy;
				thisPlugin.form.readData();
				var data = thisPlugin.form.getData();
				if(!JL.isNull(thisConfig.initData)){
					$.each(thisConfig.initData, function(key, value){
						if(key.indexOf(".") != -1){
							var keys = key.split(".");
							var plugin = keys[0];
							var field = keys[1];
							var arr = $.merge([], data[plugin]);
							for(var i=0; i<arr.length; i++){
								arr[i][field] = value;
							}
							data[plugin] = arr;
						}else{
							data[key] = value;
						}
					});
				}
				
				thisPlugin.form.setData(data);
				thisPlugin.form.resetForm();
				thisPlugin.form.find("#jlSaveForm").show();
				thisPlugin.form.find("#jlDeleteForm").hide();
			}
		},
		"jlSaveForm":{
			"name": "提交",
			"icon": "check",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlSaveForm;
				thisPlugin.form.iSave = 0;
				thisPlugin.form.setButton();
				var btnConfig = {
					"success": function(resultData, tip){
						thisPlugin.form.iSave = 1;
						thisPlugin.form.setButton();
						if(JL.isFunction(thisConfig.success)){
							thisConfig.success(resultData, tip);
						}
					},
					"error": function(resultData){
						thisPlugin.form.iSave = 2;
						thisPlugin.form.setButton();
						if(JL.isFunction(thisConfig.error)){
							thisConfig.error(resultData);
						}
					}
				};
				$.extend(btnConfig, thisConfig.config);
				thisPlugin.form.jlSave($(this), btnConfig);
			}
		},
		"jlSaveDraft":{
			"name": "保存草稿",
			"icon": "floppy-o",
			"func": function(){ 
				var thisConfig = thisPlugin.defaultButtons.jlSaveDraft;
				thisPlugin.form.jlSaveDraft($(this),{
					"before": thisConfig.before,
					"beforeSave": thisConfig.beforeSave,
					"success": function(resultData){
					},
					"error": function(){
					}
				});
			}
		},
		"jlDeleteForm":{
			"name": "删除",
			"icon": "trash-o",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlDeleteForm;
				if(JL.isFunction(thisConfig.before)){
					if(thisConfig.before()){
						return false;
					}
				}
				JL.confirm("确认删除?", function(){
					thisPlugin.form.jlDelete($(this),{
						"success": function(resultData, tip){
							if(JL.isFunction(thisConfig.success)){
								thisConfig.success(resultData, tip);
							}
						},
						"error": function(resultData){
							if(JL.isFunction(thisConfig.error)){
								thisConfig.error(resultData);
							}
						}
					});
				});
			}
		},
		"jlStopForm":{
			"name": "终止",
			"icon": "power-off",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlStopForm;
				if(JL.isFunction(thisConfig.before)){
					if(thisConfig.before()){
						return false;
					}
				}
				JL.confirm("确认终止?", function(){
					thisPlugin.form.jlStop($(this),{
						"success": function(resultData, tip){
							if(JL.isFunction(thisConfig.success)){
								thisConfig.success(resultData, tip);
							}
						},
						"error": function(resultData){
							if(JL.isFunction(thisConfig.error)){
								thisConfig.error(resultData);
							}
						}
					});
				});
			}
		},
		"jlBatchDeleteForm":{
			"name": "批量删除",
			"icon": "trash-o",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlBatchDeleteForm;
				JL.confirm("确认删除?", function(){
					var grid = thisConfig.form.getPluginObj(thisConfig.grid);
			    	var selectedIndex = grid.getSelectedIndex();

			    	JL.recursiveAjax(grid, {"S_VALUE" : "D1"}, selectedIndex, "删除", 0, thisConfig.form.initField);
				});
			}
		},
		"jlEmptyCard":{
			"name": "清空",
			"icon": "trash-o",
			"func": function(){
				thisPlugin.form.emptyCard({});
			}
		},
		"jlEmptyForm":{
			"name": "清空",
			"icon": "trash-o",
			"func": function(){
				
			}
		},
		"jlPrint":{
			"name": "打印",
			"icon": "print",
			"func": function(){
				
			}
		},
		"jlCancelSlide":{
			"name": "取消",
			"icon": "times",
			"func": function(){
				var thisConfig = thisPlugin.defaultButtons.jlCancelSlide;
				if(!JL.isNull(thisConfig.before)){
					if(thisConfig.before()){
						return false;
					}
				}
				thisPlugin.form.getTab().find(".addCarShow").hide();
			}
		},
		"jlCancel":{
			"name": "撤回",
			"icon": "repeat",
			"func": function(){	
				thisPlugin.form.iSave = 0;
				thisPlugin.form.setButton();
				thisPlugin.form.jlCancel($(this),{
					"success": function(resultData){
						thisPlugin.form.iSave = 1;
						thisPlugin.form.setButton();
					},
					"error": function(){
						thisPlugin.form.iSave = 2;
						thisPlugin.form.setButton();
					}
				});
			}
		},
		"jlFileView":{
			"name":"查看所有附件",
			"icon": "file-zip-o",
			"css":"jl_btn btn_color",
			"func":function(){
				JL.window(pubJson.getURL("FormUrl") + "/form/form_pc/fileview.html?rid="+Math.random(),{}, function(obj){
					fileview.setTab(obj);
					var data = $.extend({}, thisPlugin.form.getData());
					delete data["bdbh"];
					delete data["jlbh"];
					fileview.setData(data);
					fileview.initForm();
				});
			}
		},
		"jlSubmit_O2O":{
			"name":"保存",
			"css":"jl_btn btn_color",
			"func":function(){
				
			}
		},
		"jlCancel_O2O":{
		    "name":"取消",
			"css":"jl_btn btn_color ml10",
			"func":function(){
				
			}
		}
	};
	
	this.disabled = function(json){
		if(thisPlugin.form.preview){
			this.obj.hide();
		}
	};

	this.addButton = function(json){
		$.each(json, function(key,value){
			var button = null;
			var row = {};
			if(!JL.isNull(thisPlugin.defaultButtons[key])){
				$.extend(thisPlugin.defaultButtons[key], value);
				$.extend(row, thisPlugin.defaultButtons[key]);
			}else{
				row = value;
			}
			row.id = key;
			var css = !JL.isNull(row.css)? row.css: "jl_btn btn_color mr10";
			var html = "<a id='"+row.id+"' class='"+css+"'><i class='fa fa-"+row.icon+" mr5'></i>"+row.name+"</a>"
			button = $(html).appendTo(thisPlugin.obj);
			button.click(row.func);
		});
	};

	this.init = function(json){
		$(this.obj).empty();
		
		this.addButton(this.config.buttons);
	};
	this.init();
};