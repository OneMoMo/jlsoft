var header = JL.JLForm();
header.setTab($("header.jl_header"));

var page = $("body").attr("page") || "";
var html = "";
if(page == "index"){
	html = "首页";
}else if(page == "message"){
	html = "消息";
}
header.find("#title").html(html);

header.find("#back").click(function(){
	if(JL.isFunction(headerBack)){
		headerBack();
	}else{
		history.back();
	}
});

var headerBack;
