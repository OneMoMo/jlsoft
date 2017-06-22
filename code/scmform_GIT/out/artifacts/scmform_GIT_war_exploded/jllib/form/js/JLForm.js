function JLForm(){
    //平台、设备和操作系统
    var system = JL.checkClient();
    //if (system.pc || system.pad) {
    	//PC端
    	JLWorkflow.call(this);//继承JLWorkflow
    	JLBaseForm.call(this);//继承JLBaseForm
    	JLButton.call(this);//继承JLButton
    	JLTransport.call(this);//继承JLTransport
    	JLO2OForm.call(this);//继承JLO2OFrom
		JLUI.call(this);//继承JLUI
    /*} else if(system.mobile) {	
    	//手机端 
    	JLWorkflow_mobile.call(this);//继承JLWorkflow_mobile
    	JLBaseForm_mobile.call(this);//继承JLBaseForm_mobile
    	JLButton_mobile.call(this);//继承JLButton_mobile
    	JLTransport_mobile.call(this);//继承JLTransport_mobile
    	JLO2OForm_mobile.call(this);//继承JLO2OForm_mobile
    }*/
}

var rid = Math.random();
//var rid = -1;
var src = $("script").eq(-1).attr("src");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLCds")+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLBaseForm")+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLO2OForm")+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLTransport")+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLWorkflow")+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLWorkflow_OA_Process")+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLUI")+"'><\/script>");
var system = JL.checkClient();
if (system.pad) {
	src = src.replace("jllib","jllib_pad").replace("JLForm","JLButton_pad");
	document.write("<script type='text/javascript' src='"+src+"'><\/script>");
} else if(system.pc || system.mobile) {
	document.write("<script type='text/javascript' src='"+src.replace("JLForm","JLButton")+"'><\/script>");
}