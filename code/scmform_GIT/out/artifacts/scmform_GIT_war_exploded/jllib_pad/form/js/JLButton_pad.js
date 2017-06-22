function JLButton(){
	
	this.btnParam = {};
	
	this.setBtnParam = function(btnParam){
		this.btnParam = btnParam;
	}
	
	this.updateBtnParam = function(key, btnParam){
		$.extend(this.btnParam[key],btnParam);
	}
	
	this.buttons = {
		"jlSave": "<a id='jlSave' class='jl_btn btn_blue'><i class='fa fa-save'></i>保存</a>",
		"jlCancel": "<a id='jlCancel'>取消</a>"
	};
	
	this.addButton = function(json){
		//{"jldelte":{"name":"删除","sBillName":"DHD"},"jlupdate":{"name":"修改","sBillName":"DHD"}}
		var obj = this;
		$.each(json,function(key,val){
			var style = JL.isNull(val["class"])? "jl_btn btn_blue": val["class"];
			//追加button
			obj.buttons[key] = "<a id='"+key+"' class='"+style+"'>"+val.name+"</a>";
			//追加方法体
			obj[key] = JL.isNull(val.button)?{}:val.button;
		});
		//追加button属性
		$.extend(this.btnParam, json);
	}
	
	this.loadButton = function(){
		var obj = this;
		var html = null;
		if(obj.getTab().find(".jl_operation").length > 0){
			html = obj.getTab().find(".jl_operation");
		}else{
			html = $("<div class='jl_operation'></div>");
			html.appendTo(this.getTab());
		}
		//{"jlSave":{"sBillName":"form","button":function(){}},"jlSaveDraft":{"bill":"DHD","button":function(){}}
		$.each(this.btnParam,function(key,val){
			//生成button
			html.append(obj.buttons[key]);
			//button事件初始化
			obj.getTab().find("a#"+key).click(function(){
				if(typeof eval("obj."+key) == "function"){
					//当前button：set属性
					eval("obj."+key+"(this,obj.btnParam[key]);");
				}
			})
		})
	}

	this.jlSave = function(obj,json){
		JL.disabledClass(obj,true);
		if(json["sBillName"]=="form"&&json["sOperateName"]=="saveRecord.do"){
			this.readData();
		}
		
		if(!JL.isNull(json["before"]) && typeof json["before"] == "function"){
			json["before"]();
		}
		this.readData();
		var resultData = this.save(json["sBillName"],json["sOperateName"],{},json["callback"]);
		this.checkResult(obj,json,resultData);
	}
	

	this.checkResult = function(obj,json,resultData){
		if(!JL.isNull(resultData)){
			resultData = typeof resultData=="string"? resultData: resultData["data"];
			if(typeof resultData=="string"&&resultData.indexOf("Exception") != -1){
				resultData=resultData.replace(/java.lang.Exception: /gm,'').replace(/Exception: /gm,'');
				JL.tip("保存失败："+resultData);
				JL.disabledClass(obj,false);
			}else if(resultData.TODOLIST != undefined){
				var TODOLIST = resultData.TODOLIST;
				if(TODOLIST.length>0){
					if(confirm("保存成功[流水号:"+this.data["bdbh"]+"-"+resultData.jlbh+"],是否立即进入下一步?")){
						var srcUrl=$("#IFRAME_GZLBH_"+GZLBH)[0].contentWindow.location.href.split("?")[0]+"?XMBH="+TODOLIST[0].XMBH+"&GZLBH="+TODOLIST[0].GZLBH+"&BZBH="+TODOLIST[0].BZBH+"&RZBH="+TODOLIST[0].RZBH;
						$("#IFRAME_GZLBH_"+GZLBH).attr("src",srcUrl);
					}
				}
			}else if(!JL.isNull(resultData["jlbh"])){
				JL.tip("保存成功[流水号:"+this.data["bdbh"]+"-"+resultData.jlbh+"]");
				if(!JL.isNull(json["after"]) && typeof json["after"] == "function"){
					json["after"](resultData);
				}
				this.getTab().find("input,select,textarea").attr("disabled",true);
			}else if(JL.isNull(resultData)){
				JL.tip("保存失败");
				JL.disabledClass(obj,false);
			}else if(!JL.isNull(resultData)){
				JL.tip("保存成功");
				if(!JL.isNull(json["after"]) && typeof json["after"] == "function"){
					json["after"](resultData);
				}
				this.getTab().find("input,select,textarea").attr("disabled",true);
			}
		}else{
			JL.disabledClass(obj,false);
		}	
	}
	
	this.jlCancel = function(obj,json){
		
	}

	this.jlSaveDraft = function(obj,json){
		
	}
}
