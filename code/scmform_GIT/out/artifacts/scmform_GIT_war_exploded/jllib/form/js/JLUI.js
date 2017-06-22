function JLUI() {
	
	this.getUIData = function(key) {
//		var ajaxJson = {};
//		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/trust/jlquery/gm/select.do";
//		ajaxJson["data"] = {"XmlData":JSON.stringify(param)};
//		var resultData = this.get(ajaxJson);
//		return resultData;
		
		return {"data":[{"SPMC":"格力空调", "SPBM":"12E3532532", "GSXX":"0001"}, {"SPMC":"美的空调", "SPBM":"12E3538888", "GSXX":"0002"}]};
	}

	this.UITemplet = {};
	
	this.UIData = {};
	
	this.UIreg = new RegExp("JL\\{.*?\\}JL", "gi");
	
	this.UI = {};
	
	this.setUI = function(json){
		$.extend(this.UI, json);
	};
	
	this.getUI = function(key){	
		if(JL.isNull(key)){
			return this.UI;
		}else if(!JL.isNull(key)){
			return this.UI[key];
		}
	}
	
	this.includeUI = function(json) {
		var jlform = this;
		
		$.each(json, function(key, val) {
			
			if($("script[src*='/"+ key +"']").length == 0) {
				var src = pubJson.getURL("FormUrl") + "/"+ key;
				$(document).find("body").append("<script type='text/javascript' src='" + src + "?rid=" + rid + "'><\/script>");
			}
			
			var includeJS = eval("new " + key.substring(key.lastIndexOf("/") + 1, key.indexOf(".js")) + "();");
			includeJS.includeUI(val, jlform);
			
		});
	}

	this.initUI = function() {

		if($("body").find(".loading").length > 0) {
			$("body").find(".loading").show();
		}else {
			$("body").append('<div class="loading"><div><i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i></div></div>');
		}
		
		var jlui = this;
		
		$.each(jlui.getUI(), function(key, val) {
			
			jlui.writeUI(null, key, val);
			
		});
		
		$("body").find(".loading").hide();

	}
	
	this.applyUIObj = function(jq_obj, key, appendMode) {
		var val = this.getUI(key);
		
		if(appendMode != undefined) {
			this.appendMode = appendMode;
		}
		
		this.writeUI(jq_obj, key, val);
	}


	this.applyUI = function(key, appendMode) {
		var val = this.getUI(key);
		
		if(appendMode != undefined) {
			this.appendMode = appendMode;
		}
		
		this.writeUI(null, key, val);
	}
	
	this.appendMode = false;
	
	
	this.writeUI = function(jq_obj, key, val) {
		
		var obj = null;
		
		if(jq_obj == null) {
			obj = $("[jlui='" + key + "']");
		}else {
			obj = jq_obj;
		}
		
		if(obj.length > 0 && this.UITemplet[key] == undefined) {
			var UITemplet_html = obj.html();//<a href="a.html">商品名称:JL{name}JL 商品价格:JL{spjg}JL</a><br>
			var UITemplet_text = UITemplet_html.match(this.UIreg);//["JL{name}JL", "JL{spjg}JL"]
			var UITemplet_key = [];//["name", "spjg"]
			
			if(UITemplet_text != null && UITemplet_text.length > 0) {
				
			    $.each(UITemplet_text, function(n, value) {
			    	UITemplet_key.push(value.substring(3, value.length-3));
			    });
			    
			    this.UITemplet[obj.attr("jlui")] = {"UITemplet_html":UITemplet_html, "UITemplet_text":UITemplet_text, "UITemplet_key":UITemplet_key};
			    
			    obj.html("");
			    
			}
		}
		
		if(val.query != undefined) {
			
			var dsType = val.query.dsType;
			
			if(dsType != undefined) {
				
				//var data = null;
				/*if(dsType == "local") {
					data = this.getStorage(val.query.key);//this.getUIData().data;
				}else {
					data = val.query.data;
				}*/
				//data = this.queryData(val.query.param, val.query);
				
				this.UIData[key] = this.queryData(val.query.param, val.query);
				
				if(val.query.afterData != undefined) val.query.afterData();
				
				this.writeUITemplet(obj, val);
				
			}
			
		}
		
		this.bindUI(obj, val);
		
		if(val.after != undefined) val.after();
		
	}
	
	this.writeUITemplet = function(obj, ui) {
		  
		  var UITemplet_html = this.UITemplet[obj.attr("jlui")].UITemplet_html;
		  var UITemplet_text = this.UITemplet[obj.attr("jlui")].UITemplet_text;
		  var UITemplet_key = this.UITemplet[obj.attr("jlui")].UITemplet_key;
		  var html_tmp = UITemplet_html;
		  var html_target = "";
		  
		  var data = this.UIData[obj.attr("jlui")];
		  var data2 = [];
		  if(data != null) {
			  if(ui.query.resultList == undefined) {
				  
				  if(data.resultList == undefined) {//找不到resultList
					  
					  if(data.length == undefined) {//是MAP
						  data2.push(data); 
					  }else{//是LIST
						  data2 = data;
					  }
					  
				  }else {//有resultList
					  
					  if (data.resultList.length == undefined) {//resultList是MAP
						  data2.push(data.resultList);
					  }else {//resultList是LIST
						  data2 = data.resultList;
					  }
				  }
				  
			  }else {
				  data2 = eval("data." + ui.query.resultList);
			  }
			  
		  }
		  
		  if(!this.appendMode) obj.html("");
		  
		  $.each(data2, function(m, val) {
			    $.each(UITemplet_text, function(n, value) {
			    	var columnKey = "";
			    	var columnKeyArr = UITemplet_key[n].split(".");
			        $.each(columnKeyArr,function(n,value){
			        	columnKey = columnKey + "[\""+value+"\"]";
					})
					columnKey = "val"+columnKey;
			        var s = eval(columnKey) == undefined?"":eval(columnKey);
			    	//var s = val[UITemplet_key[n]] == undefined ? "" : val[UITemplet_key[n]];
			        html_tmp = html_tmp.replace(value, s);
		        });
			    
			    obj.append(html_tmp);
				html_tmp = UITemplet_html;
	
				var jluiData = ui.query.jluiData;
				
				if(jluiData != undefined) {
					
					var v = {};
					
						
					$.each(jluiData, function(n, value) {
						
						if(value == "*") {
							v = val;
							return false;
						}else {
							v[value] = val[value];
						}
					});
						
					
					var jlui = ui.query.jlui;
					
					if(jlui != undefined) {
						obj.find("[jlui='" + jlui + "']:not([jluiData])").attr("jluiData", JSON.stringify(v));
						//obj.find("[jlui='" + jlui + "']:not([jluiIndex])").attr("jluiIndex", m);
					}else {
						if(obj.attr("jluiData") == undefined) {
							obj.attr("jluiData", JSON.stringify(v));
							//obj.attr("jluiIndex", m);
						}
						
					}
					
				}
		  });
		  
		  this.appendMode = false;
		  
		  var repHtml = obj.html();
		  if(repHtml.indexOf("jlsrc") != -1) {
			  obj.html(repHtml.replace(new RegExp("jlsrc","g"), "src"));
		  }
		  if(repHtml.indexOf("jlhref") != -1) {
			  obj.html(repHtml.replace(new RegExp("jlhref","g"), "href"));
		  }
	}

	
	this.bindUI = function(obj, ui) {
		var listener = ui.listener;
		if(listener != undefined) {
			$.each(listener, function(key, func) {
				
//				var func2 = function(e){
//					alert(111);
//					func(e);
//				};
				obj.unbind(key);
				obj.bind(key, func);
			});
		}
	}
	
	
	this.setStorage = function(key, val) {//只有(单条记录)json才可以传pk,按pk去重,数组和简单类型不传,直接追加
		
		/*val = JSON.parse(val);
		
		var tmp = null;
		if(sessionStorage.getItem(key) != undefined) {
			tmp = JSON.parse(sessionStorage.getItem(key));
			
			if(pk != undefined || pk == null) {
				
				var b = false;
				
				$.each(tmp, function(n, value) {
					var i = 0;
					$.each(pk, function(n2, value2) {
						if(value[value2] == val[value2]) i++;
					});
					if(i == pk.length) {
						b = true;
						return false;
					}
				});
				
				if(!b) tmp.push(val);
				
			}else {
				tmp.push(val);
			}
			
		}else {
			tmp = [];
			tmp.push(val);
		}
		sessionStorage.setItem(key, JSON.stringify(tmp));*/
		
		if(typeof(val) == "string") {
			sessionStorage.setItem(key, val);
		}else {
			sessionStorage.setItem(key, JSON.stringify(val));
		}
		
	}
	
	this.getStorage = function(key) {
		
		var val = sessionStorage.getItem(key);
		var tmp = null;
		if(val != undefined && val != null) tmp = JSON.parse(val);
		//sessionStorage.removeItem(key);
		return tmp;
		
	}
	
	this.delStorage = function(key) {
		
		sessionStorage.removeItem(key);
		
	}
	
	this.local = sessionStorage;
	
	//按给定pk查找jsonArray里某条json
	this.getArrayItemIndex = function(json, jsonArray, pk) {
		
		if(jsonArray == undefined || jsonArray == null) jsonArray = [];
		
		var index = -1;
		$.each(jsonArray, function(n, val) {
			var i = 0;
			$.each(pk, function(m, key) {
				if(json[key] == val[key]) i++;
			});
			
			if(i == pk.length) {
				index = n;
				return false;
			}
		});
		return index;
		
	}
	
	//按给定pk删除jsonArray里的某条json
	this.delArrayItem = function(json, jsonArray, pk) {
		
		if(jsonArray == undefined || jsonArray == null) jsonArray = [];
		
		var tmp = [];
		
		var find = false;
		
		$.each(jsonArray, function(n, val) {
			
			if(!find) {
				var i = 0;
				$.each(pk, function(m, key) {
					if(json[key] == val[key]) i++;
				});
				
				if(i == pk.length) {
					find = true;
				}else {
					tmp.push(val);
				}
			}else {//只找第一条重复的数据,可提高效率,只需保证不放入重复数据
				tmp.push(val);
			}
			
			
		});
		
		return tmp;
		
	}
	
	//按给定pk自动去重往jsonArray里添加json
	this.putArrayItem = function(json, jsonArray, pk) {
//		var tmp = this.delArrayItem(json, jsonArray, pk);
//		tmp.push(json);
//		return tmp;
		
		var index = this.getArrayItemIndex(json, jsonArray, pk);
		if(index == -1) {
			jsonArray.push(json);
		}else {
			jsonArray[index] = json;
		}
		return jsonArray;
	}
	
	//取特定jlui的元素
	this.findUI = function(jlui) {
		return this.find("[jlui='" + jlui + "']");
	}
	
	//取给定jq_obj(jquery对象)子节点里是给定jlui的元素
	this.findChildUI = function(jq_obj, jlui) {
		return jq_obj.find("[jlui='" + jlui + "']");
	}
	
	//取给定jq_obj的jluiData属性
	this.getUIattrData = function(jq_obj) {
		
		var tmp = null;
		var data = jq_obj.attr("jluiData");
		if( data != undefined) tmp = JSON.parse(data);
		return tmp;
		
	}
	
	//取给定jq_obj(jquery对象)父节点里是给定jlui的元素
	this.findParentUI = function(jq_obj, jlui) {
		return jq_obj.closest("[jlui='" + jlui + "']");
	}
	
}





