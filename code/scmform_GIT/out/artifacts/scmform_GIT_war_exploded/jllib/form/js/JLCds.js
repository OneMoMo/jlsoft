/*
修改,新增
cds = JLFrom.getCds("name");
cds.edit();/cds.append();
cds.put(cdsField, value);
cds.submit();
点击
cds.buildDataPointer(cdsField, cdsid);
初始化AJAX
data = cds.getData();
data += ajax;
cds.setData(data);
cds.post();

供CDS调用的方法
setCdsData(json, cdsid);
*/

JLCds = function() {

	this.pluginObj = {};

	this.data = {};
	this.dataUpdate = {};
	this.dataPointer = {};
	this.dataUpdatePointer = {};

	this.mode = "close";

	this.clearDataUpdate = function() {
		this.dataUpdate = JSON.parse(JSON.stringify(this.data));
		this.dataUpdatePointer = JSON.parse(JSON.stringify(this.dataPointer));
	}
	
	this.edit = function() {
		this.mode = "edit";
		this.clearDataUpdate();
	}

	this.append = function() {
		this.mode = "append";
		this.clearDataUpdate();
	}

	this.checkJson = function(json) {
		if (typeof(json) == "object" && json.length != undefined) {
			alert("不允许一次提交多条主记录!");
			return false;
		}

		/*for (var key in json) {
			if (typeof(json[key]) == "object" && json[key].key == undefined && json[key].value == undefined) {
			   alert("主记录不允许包含明细!");
			   return false;
			}
		}*/
		return true;
	}

	this.checkCdsid = function(json) {
		for (var key in json) {
				if (json["_cdsid"] == undefined) {
					alert(key + "缺少cdsid!");
					return false;
				}
		}
		return true;
	}

	this.formatCdsid = function(json) {
		if (json.length != undefined) {
		  var _cdsid = 0;
		  for (var i=0; i<json.length; i++) {
			if (json[i]["_cdsid"] != undefined) {
			  _cdsid = json[i]["_cdsid"] > _cdsid ? json[i]["_cdsid"] : _cdsid;
			}
		  }

		  for (var i=0; i<json.length; i++) {
			for (var key in json[i]) {
			  if (typeof(json[i][key]) == "object") {
				 this.formatCdsid(json[i][key]);
			  }
			}
			if (json[i]["_cdsid"] == undefined) {
			   json[i]["_cdsid"] = ++_cdsid;
			}
		  }
		}else {
			for (var key in json) {
			  if (typeof(json[key]) == "object") {
				 this.formatCdsid(json[key]);
			  }
			}
		}
		return json;
	}


	this.buildDataPointer = function(cdsField, cdsid) {
		var cdsFields = cdsField.split(".");
		var s_tmp = "this.data";
		var i_point = null;
		for (var i = 0; i<cdsFields.length; i++) {

			var s_pointKey = "";
			for (var j = 0; j<=i; j++) {
				s_pointKey += cdsFields[j] + ".";
			}
			s_pointKey = s_pointKey.substring(0, s_pointKey.length-1);

			i_point = this.dataPointer[s_pointKey] == undefined ? 0 : this.dataPointer[s_pointKey];

			//i_point = this.dataPointer[cdsFields[i]] == undefined ? 0 : this.dataPointer[cdsFields[i]];
			if (i == cdsFields.length-1) {
				s_tmp += "['" + cdsFields[i] + "']";
			}else {
				s_tmp += "['" + cdsFields[i] + "'][" + i_point + "]";
			}
		}

		var j_tmp = null;
		eval("j_tmp = " + s_tmp + ";");

		for (var i = 0; i<j_tmp.length; i++) {
			if (j_tmp[i]["_cdsid"] == cdsid) {
				this.dataPointer[cdsField] = i;
				this.updatePluginObj(cdsField);
				return;
			}
		}
		
	}

	
	this.put = function(cdsField, json) {
		if (this.mode == "close") {
			alert("不允许在非编辑模式或非追加模式下PUT数据!");
			return;
		}

		//if (!this.checkJson(json)) return;

		//this.dataUpdate = JSON.parse(JSON.stringify(this.data));
		//this.dataUpdatePointer = JSON.parse(JSON.stringify(this.dataPointer));
			
		var cdsFields = cdsField.split(".");

		var s_tmp = "this.dataUpdate";
		var i_point = null;

		if (this.mode == "edit") {

			if (typeof(json) == "object" && json.length != undefined) {//checkbox多条数据
				for (var i = 0; i<cdsFields.length; i++) {

					var s_pointKey = "";
					for (var j = 0; j<=i; j++) {
						s_pointKey += cdsFields[j] + ".";
					}
					s_pointKey = s_pointKey.substring(0, s_pointKey.length-1);

					i_point = this.dataUpdatePointer[s_pointKey] == undefined ? 0 : this.dataUpdatePointer[s_pointKey];

					//i_point = this.dataUpdatePointer[cdsFields[i]] == undefined ? 0 : this.dataUpdatePointer[cdsFields[i]];
					
					if (i == cdsFields.length-1) {

						s_tmp += "['" + cdsFields[i] + "']";

					}else {
						s_tmp += "['" + cdsFields[i] + "'][" + i_point + "]";
					}
				}

				eval(s_tmp + " = json;");
			}else {
				for (var i = 0; i<cdsFields.length; i++) {
					
					var s_pointKey = "";
					for (var j = 0; j<=i; j++) {
						s_pointKey += cdsFields[j] + ".";
					}
					s_pointKey = s_pointKey.substring(0, s_pointKey.length-1);
					
					i_point = this.dataUpdatePointer[s_pointKey] == undefined ? 0 : this.dataUpdatePointer[s_pointKey];
					
					//i_point = this.dataUpdatePointer[cdsFields[i]] == undefined ? 0 : this.dataUpdatePointer[cdsFields[i]];
					
					if (i == cdsFields.length-1) {
						
						s_tmp += "['" + cdsFields[i] + "']";
						var o_tmp = eval(s_tmp);
						
						if(typeof(o_tmp) == "object" && o_tmp.length != undefined) {
							s_tmp += "[" + i_point + "]";
						}
						
					}else {
						s_tmp += "['" + cdsFields[i] + "'][" + i_point + "]";
					}
				}
				
				
				if (typeof(json) == "object" && typeof(eval(s_tmp)) == "object") {
					for (var key in json) {
						eval(s_tmp + "['" + key + "'] = json[key];");
					}
				}else {
					eval(s_tmp + " = json;");
				}

			}

		}

		if(this.mode == "append") {

			//if (!this.checkJson(json)) return;
			for (var i = 0; i<cdsFields.length; i++) {
				
				var s_pointKey = "";
				for (var j = 0; j<=i; j++) {
					s_pointKey += cdsFields[j] + ".";
				}
				s_pointKey = s_pointKey.substring(0, s_pointKey.length-1);
				
				var i_length = -1;
				
				s_tmp += "['" + cdsFields[i] + "']";
				
				try{
					if(typeof(eval(s_tmp)) == "object" && eval(s_tmp).length != undefined)
						eval("i_length = " + s_tmp + ".length;");
				}catch(e){}
				
				i_point = this.dataUpdatePointer[s_pointKey] == undefined ? i_length : this.dataUpdatePointer[s_pointKey];
				
				if (i == cdsFields.length-1) {
					if (!(typeof(json) == "object" && json.length != undefined)) {//非checkbox数据
						if(i_point != -1) {
							s_tmp += "[" + i_point + "]";
						}
					}
				}else {
					s_tmp += "[" + i_point + "]";
					if(eval(s_tmp) == undefined){
						eval(s_tmp + " = {};");
						this.dataUpdatePointer[s_pointKey] = i_length;
					}
				}
			}
			
			eval(s_tmp + " = json;");
			this.dataUpdate = this.formatCdsid(this.dataUpdate);
		}
	}


	this.submit = function() {
		this.data = JSON.parse(JSON.stringify(this.dataUpdate));
		this.dataPointer = JSON.parse(JSON.stringify(this.dataUpdatePointer));
		this.updatePluginObj();
		this.mode = "close";
	}

	this.updatePluginObj = function(cdsKey) {
		for (var key in this.pluginObj) {
			if(cdsKey != undefined && cdsKey == key){
				continue;
			}
			var o_pluginObj = this.pluginObj[key];
			var cdsField = key;
			var cdsFields = cdsField.split(".");

			var json = null;
			var cdsid = null;
			var s_tmp = "this.data";
			for (var i = 0; i<cdsFields.length; i++) {
				var s_pointKey = "";
				for (var j = 0; j<=i; j++) {
					s_pointKey += cdsFields[j] + ".";
				}
				s_pointKey = s_pointKey.substring(0, s_pointKey.length-1);

				i_point = this.dataPointer[s_pointKey] == undefined ? 0 : this.dataPointer[s_pointKey];
				if (i == cdsFields.length-1) {
					s_tmp += "['" + cdsFields[i] + "']";
				}else {
					s_tmp += "['" + cdsFields[i] + "'][" + i_point + "]";
				}
			}
			
			//节点为空时直接跳过
			try{
				eval("json = " + s_tmp + ";");
				
			}catch(e){}
			try{
				if(typeof(json) == "object" && json.length != undefined && json.length > 0) {
					i_point = this.dataPointer[cdsField] == undefined ? 0 : this.dataPointer[cdsField];
					s_tmp += "[" + i_point + "]['_cdsid']";
					eval("cdsid = " + s_tmp + ";");
				}
			}catch(e){}
			o_pluginObj.setCdsData(json, cdsid);
        }
	}

	this.getData = function() {
		return this.dataUpdate;
	}

	this.setData = function(json) {
		this.dataUpdate = json;
	}

	this.post = function() {
		this.dataUpdate = this.formatCdsid(this.dataUpdate);
		this.data = JSON.parse(JSON.stringify(this.dataUpdate));
		this.dataPointer = JSON.parse(JSON.stringify(this.dataUpdatePointer));
		this.updatePluginObj();
	}
	
}