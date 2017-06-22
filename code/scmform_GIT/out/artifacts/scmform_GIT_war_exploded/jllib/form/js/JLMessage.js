var JLMessage = {}; 
JLMessage.websocket = null;
JLMessage.bindFunc = {};
JLMessage.bindParam = {};
JLMessage.checkWebsocket = function(){
	//校验连接状态,如果不是连接状态就重新连接
	if(!(JLMessage.websocket != null && JLMessage.websocket.readyState == 1)){
		JLMessage.createWebsocket();
	}
};

JLMessage.createWebsocket = function(){
	if ('WebSocket' in window)  
		JLMessage.websocket = new WebSocket("ws:/"+"/"+location.host+"/"+pubJson.data.FormUrl+"/websocket/{"+userInfo.SessionID+"}");  
	//ws = new WebSocket("ws://119.79.224.118:25104");
	else if ('MozWebSocket' in window)  
		JLMessage.websocket = new MozWebSocket("ws:/"+"/"+location.host+"/"+pubJson.data.FormUrl+"/websocket/{"+userInfo.SessionID+"}");  
	else  
		alert("not support");  
	
	JLMessage.websocket.onmessage = function(evt) {
		debugger;
		var data = "";
		try {
			data = JSON.parse(evt.data);
		} catch (e) {
			// TODO: handle exception
			data = evt.data;
		}
		JLMessage.message(data); 
	};  
	
	JLMessage.websocket.onclose = function(evt) {  
		//alert("close");  
	};  
	
	JLMessage.websocket.onopen = function(evt) {  
		//alert("open");  
	};  
}

JLMessage.unbind = function(code){
	delete JLMessage.bindFunc[code];
	delete JLMessage.bindParam[code];
	return this;
};

JLMessage.bind = function(code, func, param){
	JLMessage.checkWebsocket();
	if(JL.isNull(JLMessage.bindFunc[code])){
		JLMessage.bindFunc[code] = [];
		JLMessage.bindParam[code] = [];
	}
	JLMessage.bindFunc[code].push(func);
	JLMessage.bindParam[code].push(param || {});
};

JLMessage.message = function(data){
	debugger;
	var CODE = data.CODE;
	var DATA = data.DATA;
	console.info(data);
	$.each(JLMessage.bindFunc, function(code, funcs){
		if(code == CODE){
			for(var i=0;i<funcs.length;i++){
				var func = funcs[i];
				func(DATA, JLMessage.bindParam[code][i]);
			}
		}
	});
}

if(!JL.isNull(userInfo) && !JL.isNull(userInfo.SessionID)){
	JLMessage.createWebsocket();
}