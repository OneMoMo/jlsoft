function JLTransport(){
	
	this.srchParam = {};
	
	this.setSrchParam = function(srchParam){
		this.srchParam = srchParam;

		//this.async = JL.isNull(json["async"])?this.async:json["async"];
		//this.sBillName = JL.isNull(json["sBillName"])?this.sBillName:json["sBillName"];
		//this.sOperateName = JL.isNull(json["sOperateName"])?this.sOperateName:json["sOperateName"];
		//this.callback = JL.isNull(json["callback"])?{}:json["callback"];
		//$.extend(this.data, json);
	}

	this.onceQuery = function(queryForm,obj){
		var pluginName = obj.attr("name");
		var plugin = queryForm.plugin[pluginName];
		plugin["autocallback"] = true;
		queryForm.setPlugin({pluginName : plugin});
		obj.click();
		plugin = queryForm.plugin[pluginName];
		delete plugin["autocallback"];
		queryForm.setPlugin({pluginName:plugin});
	}
	//不建议使用
	this.getJLQuery = function(querybh, queryField, alert){
		var XmlData = {};
		XmlData["CX01"] = querybh;
		if(typeof userInfo != "undefined"){
			XmlData["queryField"] = $.extend(queryField, userInfo);
		}else{
			XmlData["queryField"] = queryField;
		}
		
		var ajaxJson = {};
		ajaxJson["src"] = pubJson.getURL("FormUrl")+"/jlquery/selectCustom.do?rid="+Math.random();
		ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		if(alert == true){
			ajaxJson["alert"] = alert;
		}
		var resultData = JL.ajax(ajaxJson);
		if(JL.isNull(resultData)){
			resultData = [];
		}
		return resultData;
	}
	//建议使用
	this.getJLQueryResult = function(querybh, queryField, alert, paging){
		var resultData = this.getJLQuery(querybh, queryField, alert);
		if(paging || JL.isNull(resultData)){
			return resultData;
		}else if(!JL.isNull(resultData)){
			return resultData.data;
		}
	}
	//建议使用
	this.getJLQueryPaging = function(querybh, queryField, alert){
		return this.getJLQuery(querybh, queryField, alert);
	}

	//建议使用
	this.getSqlResult = function(json, namespace, sqlid, dir){
		var sqlMap = JL.getSqlMap({
			"namespace":namespace, 
			"sqlid":sqlid,
			"dir":dir
		});

		var XmlData = {};
		if(typeof userInfo != "undefined"){
			$.extend(XmlData, userInfo);
		}
		if(!JL.isNull(json)){
			$.extend(XmlData, json);
		}
		
		XmlData["dataType"] = "Json";
		XmlData["sqlid"] = sqlMap.sqlid;
		XmlData["sort"] = sqlMap.sort;
		XmlData["DataBaseType"] = sqlMap.DataBaseType;
		
		var ajaxJson = {};
		if(!JL.isNull(sqlMap.url)){
			ajaxJson["src"] = sqlMap.url;
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}else if(!JL.isNull(sqlMap.interfaceId)){
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Inbound/dispatch.do?rid="+Math.random();
			ajaxJson["data"] = {"interfaceId":sqlMap.interfaceId, "data":JSON.stringify(XmlData)};
		}else if(!JL.isNull(sqlMap.collection)){
			XmlData["collection"] = sqlMap.collection;
			XmlData["result"] = {};
			if(!JL.isNull(sqlMap.sort)){
				XmlData["sort"] = sqlMap.sort;
			}
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/selectMongo.do?rid="+Math.random();
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}else{
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/select.do?rid="+Math.random();
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}
		var resultData = JL.ajax(ajaxJson,true);
		return resultData;
	}
	
	this.queryData = function(json, config) {
		
		var XmlData = {};
		if(typeof userInfo != "undefined"){
			$.extend(XmlData, userInfo);
		}
		if(!JL.isNull(json)){
			$.extend(XmlData, json);
		}
		
		XmlData["dataType"] = "Json";

		var ajaxJson = {};
		
		if(config.dsType == "sql") {
			
			XmlData["DataBaseType"] = config.DataBaseType;
			//XmlData["namespace"] = config.namespace;
			XmlData["sqlid"] = config.sqlid;
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/select.do?rid="+Math.random();
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}
		
		if(config.dsType == "mongo") {
			//XmlData["namespace"] = config.namespace;
			XmlData["sqlid"] = config.sqlid;
			XmlData["collection"] = config.collection;
			XmlData["result"] = {};
			if(!JL.isNull(config.sort)){
				XmlData["sort"] = config.sort;
			}
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlquery/selectMongo.do?rid="+Math.random();
			ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		}		
		
		if(config.dsType == "jk") {
			//ajaxJson["src"] = pubJson.getURL("FormUrl") + "/Inbound/dispatch.do?rid="+Math.random();
			ajaxJson["src"] = pubJson.getURL("FormUrl") + "/jlGateWay/invoke.do?rid="+Math.random();
			ajaxJson["data"] = {"interfaceId":config.interfaceId, "data":JSON.stringify(XmlData)};
			if(!JL.isNull(config.sysType)) ajaxJson["data"]["sysType"] =  config.sysType;
		}
		
		if(config.dsType == "url") {
			ajaxJson["src"] = config.url;
			ajaxJson["data"] = json;
		}
		
		if(config.dsType == "local") {
			return this.getStorage(config.key);
		}
		
		if(config.dsType == "var") {
			
			if(typeof(config.data) == "function") {
				return config.data();
			}else {
				return config.data;
			}
			
		}

		var resultData = JL.ajax(ajaxJson,true);
		return resultData;
	}
	
	this.loadData = function(){
		
		var form = this;
		if(JL.isNull(this.srchParam)){
			if (this.getData("CS") || this.getData("PCRM_YB")){
				this.csparametersForDefaultMongo();
			}else if(!this.isWorkflow || this.getData("query")){
				this.qbparametersForDefaultMongo();
			}else{
				this.parametersForDefaultMongo();
			}
		}
		var json = {};
		$.each(JL.isNull(this.srchParam.paramKey)?{}:this.srchParam.paramKey,function(index,key){
			if(!JL.isNull(form.workflow[key])){
				json[key] = form.workflow[key];
			}
			if(!JL.isNull(form.data[key])){
				json[key] = form.data[key];
			}
			if(JL.isNull(json[key])){
				json[key] = "";
			}
		});
		
		var resultData = this.select(this.srchParam.sBillName,this.srchParam.sOperateName,json,this.callback);
		if(!JL.isNull(resultData)){
			this.setData(resultData);
		}
	}
	
	this.qbparametersForDefaultMongo = function(){
		this.srchParam["sBillName"] = pubJson.getURL("FormUrl")+"/form";
        this.srchParam["sOperateName"] = "getRecordData.do";
		this.srchParam["paramKey"] = ["bdbh","jlbh"];
	}

	this.parametersForDefaultMongo = function(){
		this.srchParam["sBillName"] = pubJson.getURL("FormUrl")+"/form";
        this.srchParam["sOperateName"] = "getRecordHDAT.do";
		this.srchParam["paramKey"] = ["bdbh","jlbh","gzl01","bz01","xw01"];
	}
	
	this.csparametersForDefaultMongo = function(){
		this.srchParam["sBillName"] = "form";
        this.srchParam["sOperateName"] = "getRecordHDAT_CC.do";
		this.srchParam["paramKey"] = ["bdbh","jlbh","sk01"];
	}

	this.parametersForGet = function(json){
		json["dataType"] = "Json";
		json["QryType"] = "Bill";
		return json;
	}

	this.parametersForPost = function(json){
		$.extend(this.data, json);
	}
	
	this.select = function(sBillName,sOperateName,json,func){
		var data = this.parametersForGet(json);
		
		var src = sBillName;
		if(!JL.isNull(sOperateName)){
			src += "/"+sOperateName;
		}
		
		var ajaxJson = {};
		ajaxJson["src"] = src;
		ajaxJson["data"] = {"XmlData":JSON.stringify(data)};
		ajaxJson["callback"] = JL.isNull(func) ? {} : func;

		var resultData = this.get(ajaxJson);
		var result = null;
		if(!JL.isNull(resultData)){
			result = resultData;
			if(!JL.isNull(resultData.data)){
				result = resultData.data;
				if(!JL.isNull(resultData.data.returnList)){
					result = resultData.data.returnList;
				}
			}
		}
		return result;
	}

	this.get = function(ajaxJson){
		var returnData = JL.ajax(ajaxJson);
		return returnData;
	}
	
	this.save = function(sBillName,sOperateName,json,func){
		if(JL.isNull(sBillName)||JL.isNull(sOperateName)){
			sBillName = "form";
			sOperateName = "saveRecord.do";
		}
		var resultData = this.callService(sBillName,sOperateName,json,func);
		return resultData;
	}
	
	this.insert = function(sBillName,json,func){
		var sOperateName = "insert.do";
		var resultData = this.callService(sBillName,sOperateName,json,func);
		return resultData;
	}
	
	this.update = function(sBillName,json,func){
		var sOperateName = "update.do";
		var resultData = this.callService(sBillName,sOperateName,json,func);
		return resultData;
	}
	
	this.del = function(sBillName,json,func){
		var sOperateName = "delete.do";
		var resultData = this.callService(sBillName,sOperateName,json,func);
		return resultData;
	}

	this.callService = function(sBillName,sOperateName,json,func){
		debugger;
		var json = JL.isNull(json)?{}:json;
		this.parametersForPost(json);
		var ajaxJson = {};
		ajaxJson["contentType"] = "application/x-www-form-urlencoded;charset=utf-8";
		ajaxJson["src"]= pubJson.getURL("FormUrl")+"/"+sBillName+"/"+sOperateName;
		ajaxJson["data"]=this.formatValue();
		ajaxJson["callback"]=JL.isNull(func) ? {} : func;
		var resultData = this.post(ajaxJson);
		return resultData;
	}
	
	
	this.startService = function(sBillName,sOperateName,json,func){
		debugger;
		var json = JL.isNull(json)?{}:json;
		this.parametersForPost(json);
		var ajaxJson = {};
		ajaxJson["contentType"] = "application/x-www-form-urlencoded;charset=utf-8";
		ajaxJson["src"]= pubJson.getURL("FormUrl")+"/"+sBillName+"/"+sOperateName;
		ajaxJson["data"]=json;
		ajaxJson["callback"]=JL.isNull(func) ? {} : func;
		var resultData = this.post(ajaxJson);
		return resultData;
	}

	this.post = function(ajaxJson){
		var returnData = JL.ajax(ajaxJson);
		return returnData;
	}
	
}
