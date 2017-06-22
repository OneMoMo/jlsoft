function JLWorkflow(){
	this.isWorkflow = true;
	this.workflow = {};
	this.initField = [];
	this.sk01 = "";
	this.pid = "";
	this.fallBack = {};
	this.cc = [];
	this.ccgw = [];
	this.lzry = [];
	this.BM01 = "";
	this.WLDW01 = "";
	
	this.setWorkflow = function(config){
		this.workflow.gzl01 = config.GZL01;
		this.workflow.gzl02 = config.GZL02;
		this.workflow.bz01 = config.BZ01;
		this.workflow.bz02 = config.BZ02;
		this.workflow.xw01 = config.XW01;
		this.initField = JSON.parse(config["JK03"])["field"];
		this.sk01 = JL.isNull(config["SK01"])?"":config["SK01"];
		this.pid = JL.isNull(config["PID"])?"":config["PID"];
	}
	
	this.getWorkflow = function(){
		return this.workflow;
	}	
		
	this.initWorkflow = function(){
		var form =this;
		$.each(this.plugin, function(key, value){
			if (!JL.isNull(value["AccessCzy"])){
				if(!JL.isNull(value["AccessCzy"]["BM01"])){
					form.BM01 = key;
				}
				
				if(!JL.isNull(value["AccessCzy"]["WLDW01"])){
					form.WLDW01 = key;
				}
				
				if(!JL.isNull(value["AccessCzy"]["CK01"])){
					form.CK01 = key;
				}
				
				if(!JL.isNull(value["AccessCzy"]["QXCZY01"])){
					form.QXCZY01 = key;
				}
				
				if(!JL.isNull(value["AccessCzy"]["SSBM01"])){
					form.SSBM01 = key;
				}
				
				if(!JL.isNull(value["AccessCzy"]["QX02"])){
					form.QX02 = key;
				}
			}
			
			if(!JL.isNull(value["workflow"])){
				
				if(!JL.isNull(value["workflow"]["lzry"])){
					form.lzry.push(key);
				}

				if(!JL.isNull(value["workflow"]["cc"])){
					if(value["workflow"]["cc"]=="gw"){
						form.ccgw.push(key);
					}else{
						form.cc.push(key);
					}
				}
				
				if(!JL.isNull(value["workflow"]["back"])){
					form.fallBack[key] = value["workflow"]["back"];
				}
			}
		});
	}
		
	this.initDisabled = function(json){
		this.getTab().find("input:not(:button),select,textarea").attr("disabled",true);
		for(var i=0;i<this.initField.length;i++){
			var key = this.initField[i];
			this.getTab().find("[name='"+key+"']").attr("disabled",false);
		}
	}

	this.setFallBack = function(json){
		this.fallBack = json;
	}

	this.formatFallBack = function(INITFIELD){
		var form = this;
		var XmlData = {};
		if(!JL.isNull(this.fallBack)){
			$.each(this.fallBack,function(key, value){
				var val = form.data[key];
				if(!JL.isNull(val) && val["key"] == value && $.inArray(key,INITFIELD) != -1){
					XmlData["sk01"] = form.sk01;
					XmlData["pid"] = form.pid;
					XmlData["xwbh"] = -1;
					return false;
				}
			})
		}else{
			var SHYJ = form.data["SHYJ"];
			//1不同意 
			if(!JL.isNull(SHYJ) && SHYJ["key"] == "1" && $.inArray("SHYJ",INITFIELD) != -1){
				XmlData["sk01"] = form.sk01;
				XmlData["pid"] = form.pid;
				XmlData["xwbh"] = -1;
			} 
		}

		if(!JL.isNull(this.data["PCRM_HTBZ"])){
			//var SHYJ = form.data["SHYJ"];
			//if (!JL.isNull(SHYJ) && SHYJ["key"] == "2" && $.inArray("SHYJ",INITFIELD) != -1){
				if(!JL.isNull(this.data["PCRM_HTBZ"]["key"]) && $.inArray("PCRM_HTBZ",INITFIELD) != -1) {
					XmlData["sk01"] = form.sk01;
					XmlData["pid"] = form.pid;
					XmlData["xwbh"] = -1;
					XmlData["htbzbh"] = form.data["PCRM_HTBZ"]["key"];
				} 
			//} 
		}
		
		return XmlData;
	}

	this.formatCancel = function(INITFIELD){
		var form = this;
		var XmlData = {};
		if(!JL.isNull(this.cancel)){
			//$.each(this.cancel,function(key, value){
				//var val = form.data[key];
				//if(!JL.isNull(val) && val["key"] == value && $.inArray(key,INITFIELD) != -1){
					XmlData["sk01"] = form.sk01;
					XmlData["pid"] = form.pid;
					XmlData["xwbh"] = -2;
					//return false;
				//}
			//})
		} 
		return XmlData;
	}
	
	this.formatDraft = function(INITFIELD){
		console.info('formatDraft');
		var form = this;
		var XmlData = {};
		if(this.draft){ 
			XmlData["initField"] = JSON.stringify(INITFIELD);
			XmlData["json"] = JSON.stringify(this.getData());
			XmlData["xwbh"] = 0; 
			if (!JL.isNull(form.sk01)){
				XmlData["sk01"] = form.sk01;
			}else{
				XmlData["gzlbh"] = this.workflow.gzl01;
			} 
		} 
		return XmlData;
	}

	this.formatValue = function(json){
		var form = this;
		delete this.data["PCRM_CH"];
		delete this.data["CS"];
		
		var XmlData = {};
		XmlData["initField"] = JSON.stringify(this.initField);
		XmlData["json"] = JSON.stringify(this.data);
		XmlData["jyl"] = this.jyl;
		XmlData["formDiff"] = JSON.stringify({"PID":form.pid,"SK01":form.sk01});
		$.extend(XmlData, this.formatFallBack(this.initField));
		$.extend(XmlData, this.formatCancel(this.initField));
		$.extend(XmlData, this.formatDraft(this.initField));
		
		if(!JL.isNull(this.SSBM01)) {
			if (!JL.isNull(form.data[this.SSBM01])){// && $.inArray(this.CK01,form.initField) != -1
				if (typeof form.data[this.SSBM01] == "object"){
					if (form.data[this.SSBM01].length > 0){
						//XmlData["ck01"] = form.data[this.CK01][0].KEY;
						if (form.data[this.SSBM01][0].KEY != undefined){
							XmlData["ssbm01"] = form.data[this.SSBM01][0].KEY;
						}else if(form.data[this.SSBM01][0].key != undefined){
							XmlData["ssbm01"] = form.data[this.SSBM01][0].key;
						} 
					}else{
						//XmlData["ck01"] = form.data[this.CK01].key;
						if (form.data[this.SSBM01].KEY != undefined){
							XmlData["ssbm01"] = form.data[this.SSBM01].KEY;
						}else if(form.data[this.SSBM01].key != undefined){
							XmlData["ssbm01"] = form.data[this.SSBM01].key;
						} 
					} 
				}else{
					XmlData["ssbm01"] = form.data[this.SSBM01];
				}  
			}
		}
		
		if(!JL.isNull(this.QX02)) {
			if (!JL.isNull(form.data[this.QX02])){// && $.inArray(this.CK01,form.initField) != -1
				if (typeof form.data[this.QX02] == "object"){
					if (form.data[this.QX02].length > 0){
						//XmlData["ck01"] = form.data[this.CK01][0].KEY;
						if (form.data[this.QX02][0].KEY != undefined){
							XmlData["qx02"] = form.data[this.QX02][0].KEY;
						}else if(form.data[this.QX02][0].key != undefined){
							XmlData["qx02"] = form.data[this.QX02][0].key;
						} 
					}else{
						//XmlData["ck01"] = form.data[this.CK01].key;
						if (form.data[this.QX02].KEY != undefined){
							XmlData["qx02"] = form.data[this.QX02].KEY;
						}else if(form.data[this.QX02].key != undefined){
							XmlData["qx02"] = form.data[this.QX02].key;
						} 
					} 
				}else{
					XmlData["qx02"] = form.data[this.QX02];
				}  
			}
		}
		
		if(!JL.isNull(this.QXCZY01)) {
			if (!JL.isNull(form.data[this.QXCZY01])){// && $.inArray(this.CK01,form.initField) != -1
				if (typeof form.data[this.QXCZY01] == "object"){
					if (form.data[this.QXCZY01].length > 0){
						//XmlData["ck01"] = form.data[this.CK01][0].KEY;
						if (form.data[this.QXCZY01][0].KEY != undefined){
							XmlData["qxczy01"] = form.data[this.QXCZY01][0].KEY;
						}else if(form.data[this.QXCZY01][0].key != undefined){
							XmlData["qxczy01"] = form.data[this.QXCZY01][0].key;
						} 
					}else{
						//XmlData["ck01"] = form.data[this.CK01].key;
						if (form.data[this.QXCZY01].KEY != undefined){
							XmlData["qxczy01"] = form.data[this.QXCZY01].KEY;
						}else if(form.data[this.QXCZY01].key != undefined){
							XmlData["qxczy01"] = form.data[this.QXCZY01].key;
						} 
					} 
				}else{
					XmlData["qxczy01"] = form.data[this.QXCZY01];
				}  
			}
		}
		
		if(!JL.isNull(this.CK01)) {
			if (!JL.isNull(form.data[this.CK01])){// && $.inArray(this.CK01,form.initField) != -1
				if (typeof form.data[this.CK01] == "object"){
					if (form.data[this.CK01].length > 0){
						//XmlData["ck01"] = form.data[this.CK01][0].KEY;
						if (form.data[this.CK01][0].KEY != undefined){
							XmlData["ck01"] = form.data[this.CK01][0].KEY;
						}else if(form.data[this.CK01][0].key != undefined){
							XmlData["ck01"] = form.data[this.CK01][0].key;
						} 
					}else{
						//XmlData["ck01"] = form.data[this.CK01].key;
						if (form.data[this.CK01].KEY != undefined){
							XmlData["ck01"] = form.data[this.CK01].KEY;
						}else if(form.data[this.CK01].key != undefined){
							XmlData["ck01"] = form.data[this.CK01].key;
						} 
					} 
				}else{
					XmlData["ck01"] = form.data[this.CK01];
				}  
			}
		}
		
		if(!JL.isNull(this.BM01)) {
			if (!JL.isNull(form.data[this.BM01])){// && $.inArray(this.BM01,form.initField) != -1
				if (typeof form.data[this.BM01] == "object"){
					if (form.data[this.BM01].length > 0){
						if (form.data[this.BM01][0].KEY != undefined){
							XmlData["bm01"] = form.data[this.BM01][0].KEY;
						}else if(form.data[this.BM01][0].key != undefined){
							XmlData["bm01"] = form.data[this.BM01][0].key;
						} 
					}else{
						if (form.data[this.BM01].KEY != undefined){
							XmlData["bm01"] = form.data[this.BM01].KEY;
						}else if(form.data[this.BM01].key != undefined){
							XmlData["bm01"] = form.data[this.BM01].key;
						} 
					} 
				}else{
					XmlData["bm01"] = form.data[this.BM01];
				}  
			}
		} 
		
		if(!JL.isNull(this.WLDW01)) {
			if (!JL.isNull(form.data[this.WLDW01])){// && $.inArray(this.WLDW01,form.initField) != -1
				if (typeof form.data[this.WLDW01] == "object"){
					if (form.data[this.WLDW01].length > 0){ 
						if (form.data[this.WLDW01][0].KEY != undefined){
							XmlData["wldw01"] = form.data[this.WLDW01][0].KEY;
						}else if(form.data[this.WLDW01][0].key != undefined){
							XmlData["wldw01"] = form.data[this.WLDW01][0].key;
						}
					}else{
						//XmlData["wldw01"] = form.data[this.WLDW01].key;
						if (form.data[this.WLDW01].KEY != undefined){
							XmlData["wldw01"] = form.data[this.WLDW01].KEY;
						}else if(form.data[this.WLDW01].key != undefined){
							XmlData["wldw01"] = form.data[this.WLDW01].key;
						} 
					} 
				}else{
					XmlData["wldw01"] = form.data[this.WLDW01];
				}  
			}
		}
		
		if(!JL.isNull(this.lzry)) {
			XmlData["lzry"] = '';
			$.each(this.lzry, function(i, value) {
				if (!JL.isNull(form.data[value]) && $.inArray(value,form.initField) != -1)
				{
					$.each(form.data[value], function(j, value2) {
						XmlData["lzry"] += value2["key"];
						XmlData["lzry"] += ',';
					})
				} 
			});
		}
		
		if(!JL.isNull(this.cc)) {
			XmlData["OA_CCRY"] = '';
			$.each(this.cc, function(i, value) {
				if (!JL.isNull(form.data[value]))
				{
					$.each(form.data[value], function(j, value2) {
						XmlData["OA_CCRY"] += value2["key"];
						XmlData["OA_CCRY"] += ',';
					})
				} 
			});
		}

		if(!JL.isNull(this.ccgw)) {
			XmlData["OA_CCGW"] = '';
			$.each(this.ccgw, function(i, value) {
				if (!JL.isNull(form.data[value]))
				{
					$.each(form.data[value], function(j, value2) {
						XmlData["OA_CCGW"] += value2["key"];
						XmlData["OA_CCGW"] += ',';
					})
				} 
			});
		}
		
		return XmlData;
	}

}
