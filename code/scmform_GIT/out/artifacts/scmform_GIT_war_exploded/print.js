$(document).ready(function(){
	var dybh = JL.getUrlParam("dybh");
	var json = {};
	json["src"] = "form/find.do";
	json["data"] = {"XmlData":JSON.stringify({
		"collection": "formPrint",
		"query": {
			"dybh": dybh
		}
	})};
	var resultData = JL.ajax(json);
	if(!JL.isNull(resultData)){
		resultData = resultData["data"]["returnList"];
		for(var i=0; i<resultData.length; i++){
			var row = resultData[i];
			var option = $("<option value='"+row["dyym"]+"'>"+row["mbmc"]+"</option>").appendTo("#print_temp");
			option.data(row);
			if(!JL.isNull(row["default"])){
				changeTemp(row);
				option.attr("selected", "selected");
			}
		}
		
		$("#print_temp").change(function(){
			changeTemp($(this).data());
		});
		
		$(".fa-print").click(function(){
			$(".print_hide").hide();
			window.print();
			$(".print_hide").show();
		});
	}
});

var changeTemp = function(row){
	$("#print_main").empty();
	var PRINT_DATAS = JSON.parse(sessionStorage["PRINT_DATAS"]);
	debugger;
	if(!JL.isNull(row.mbnr)){
		(function(){
			for(var i = 0; i<PRINT_DATAS.length; i++){
				var data = PRINT_DATAS[i];
				eval(row.mbnr);
			}
		})();
	}else if(!JL.isNull(row.dyym)){
		var DYYM = row.dyym;
		for(var i = 0; i<PRINT_DATAS.length; i++){
			if(PRINT_DATAS.length > 1){
				var print_hide = $("<div class='print_hide' style='padding: 50px 0px;'><div style='width: 6%;float: left;'><input type='checkbox' checked='checked' style='margin-left: 15px;'/>第"+(i+1)+"单</div><div style='width: 94%;float: left;'><hr style='100%' /></div></div>").appendTo("#print_main");
				print_hide.find(":checkbox").click(function(){
					if($(this).is(":checked")){
						$(this).parent().parent().next().slideDown();
					}else{
						$(this).parent().parent().next().slideUp();
					}
				});
			}
			var PRINT_PAGE = $("<div data-index='"+i+"' data-name='"+DYYM+"' class='print_div'></div>").appendTo("#print_main");
			PRINT_PAGE.data(PRINT_DATAS[i]);
			PRINT_PAGE.load(DYYM, function(){
				var print_page = $(this);
				var index = print_page.attr("data-index");
				var PRINT_DATA = print_page.data();
				
				//主表字段
				var names = print_page.find("[name]");
				for(var num=0; num<names.length; num++){
					var selector = $(names[num]);
					var name = selector.attr("name").split(".");
					if(name.length > 1){
						var value = PRINT_DATA[name[0]];
						if(typeof value == "object" && $.isArray(value)){
							for(var j=0; j<value.length; j++){
								selector.html(selector.html() + value[j][name[1]]);
								if(j < value.length-1){
									selector.html(selector.html() + "、");
								}
							}
						}else{
							selector.html(value[name[1]]);
						}
					}else{
						var value = PRINT_DATA[name[0]];
						if(typeof value == "object"){
							if($.isArray(value)){
								for(var j=0; j<value.length; j++){
									selector.html(selector.html() + (value[j]["key"] || value[j]["KEY"]));
									if(j < value.length-1){
										selector.html(selector.html() + "、");
									}
								}
							}else{
								selector.html(value.value);
							}
						}else{
							selector.html(value);
						}
					}
				}
				var names = print_page.find("[grid-id]");
				for(var num=0; num<names.length; num++){
					var selector = $(names[num]);
					var name = selector.attr("grid-id");
					var value = JL.isNull(PRINT_DATA[name])? []: PRINT_DATA[name];
					for(var j=0; j<value.length; j++){
						var rowData = value[j];
						var DL = selector.children(":first").clone(false);
						DL.find("[header]").removeAttr("header");
						DL.appendTo(selector);
						$.each(rowData, function(cloumnID, cloumnVALUE){
							DL.find("#"+cloumnID).html(cloumnVALUE);
						});
						
					}
					selector.find("dl:first").hide();
					selector.find("[header]").hide();
				}
				/*
			
			$.each(PRINT_DATA, function(key, value){
				
				
				
				if(print_page.find("[name='"+key+"']").length > 0){
					
				}else if(print_page.find("[grid-id='"+key+"']").length > 0){
					
				}
				
				
				
				if(print_page.find("div#"+key).length > 0){
					if(typeof value == "string" && value.indexOf("key") != -1 && value.indexOf("value") != -1){
						value = JSON.parse(value);
					}
					
					if(typeof value == "object" && $.isArray(value) && value.length == 0){
						for(var i=0;i<value.length;i++){
							var checkbox_value = value[i];
							value += checkbox_value["key"];
							if(i < value.length-1){
								value += "、";
							}
						}
					}
					
					if(print_page.find("#"+key).attr("name") == "key"){
						value = value["key"];
					}else if(print_page.find("#"+key).attr("name") == "value"){
						value = value["value"];
					}
					
					print_page.find("#"+key).html(value);
				}else if(print_page.find("table#"+key)){
					var title = print_page.find("table#"+key+" tr");
					for(var i=0; i<value.length; i++){
						var row = value[i];
						var clone = title.clone();
						var tds = clone.find("td");
						for(var j=0; j<tds.length; j++){
							var td = tds.eq(j);
							var name = td.attr("name");
							var html = JL.isNull(row[name])? "":row[name];
							td.html(html);
						}
						print_page.find("table#"+key).append(clone);
					}
				}
			});*/
				try{
					var name = print_page.attr("data-name").split(".")[0];
					var page = name.split("/");
					page = page[page.length-1];
					eval(page+"(PRINT_DATA)");
					console.info(page);
				}catch(e){
					console.info(e);
				}
				
			});
		}
		
	}
}

//打印零售收银台
var LODOP; //声明为全局变量       
function myPrint() {		       
	CreatePrintPage();       
	LODOP.PRINT();		       
};         
function myPrintA() {		       
	CreatePrintPage();       
	LODOP.PRINTA();		       
};  	       
function myPreview() {		       
	CreatePrintPage();       
	LODOP.PREVIEW();		       
};		       
function mySetup() {		       
	CreatePrintPage();       
	LODOP.PRINT_SETUP();		       
};	       
function myDesign() {		       
	CreatePrintPage();       
	LODOP.PRINT_DESIGN();		       
};	       
function myBlankDesign() {       
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));         
		LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_空白练习");		       
	LODOP.PRINT_DESIGN();		       
};			       
function CreatePrintPage() {       
	LODOP=getLodop();  
	LODOP.PRINT_INIT("零售收银台打印");
	LODOP.SET_PRINT_STYLE("FontSize",12);
	LODOP.SET_PRINT_STYLE("Bold",1);
	LODOP.ADD_PRINT_TEXT(50,231,260,39,"");
	LODOP.ADD_PRINT_HTM(10,20,30,40,document.getElementById("print_main").innerHTML);
	LODOP.SET_PRINT_PAGESIZE(3,580,45,"");//这里3表示纵向打印且纸高“按内容的高度”；1385表示纸宽138.5mm；45表示页底空白4.5mm
	LODOP.SET_PRINT_MODE("WINDOW_DEFPRINTER", "系统默认打印机");
};         
function myAddHtml() {       
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));         
		LODOP.PRINT_INIT("");		            
	LODOP.ADD_PRINT_HTM(10,55,"100%","100%",document.getElementById("textarea01").value);	       
};	  