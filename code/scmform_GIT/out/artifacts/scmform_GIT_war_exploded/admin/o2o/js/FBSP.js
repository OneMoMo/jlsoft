var FBSP = new JLForm();
var transport = new JLTransport();
var sbArray=new Array();
var jsArray=new Array();
var hbArray=new Array();
var diKaErJiArray;

FBSP.setEvents(function(){
	FBSP.getTab().delegate("[name='ljfb']", "click",function(event){ 
		if (!JL.isNull(FBSP.getPluginObj("JLShowfl").getData())){
			if(JL.isNull(FBSP.getPluginObj("ppb").getData())){
				JL.tip("请先选择品牌！", null);
				return false;
			}
			FBSP.getTab().find("[name='jl_fbsp_02']").attr("class","jl_fbsp_02");

			$.ajax({
				async:false,
				type:"POST",
				url:pubJson.getURL("ResourceUrl")+"/shopJL/baseData/W_SPFLSX.json",
				data:{"sid":Math.random()},
				success:function(data){
					FBSP.showFLSX(data);
				}
			});
			FBSP.getTab().find("#d_JLShowfl").find("input").attr("disabled",true);
			FBSP.getTab().find("#d_JLShowfl").find("input").siblings().eq(0).remove()
			FBSP.getTab().find("#d_ppb").find(".jl_btn_group.w12").find("input").attr("disabled",true);
			FBSP.getTab().find("#d_ppb").find(".jl_btn_group.w12").find("input").parent().parent().children("span").remove();
		}else{
			JL.tip("请先选择分类！", null);
		}
	});

	FBSP.getTab().delegate("[class='jl_checkbox']", "click",function(event){
		console.info('jl_checkbox');
		var radio_class = $(this).children("i").attr("class");
		var td = "<td lastfive class='one'><input class='normal'></td>" +
				 "<td lastfive class='one'><input class='small'></td>" +
				 "<td lastfive class='one'><i class='fa fa-search'></i><a class='sc text_center'>删除</a></td>";

		var table = FBSP.getTab().find("[name='flsx']"); 
		var dls = FBSP.getTab().find("[name='flxs'] dl");
        var divs = $(FBSP.getTab().find("[name='flxs'] dl")).find("div");
        
		if(radio_class == "fa fa-square-o"){
			$(this).children("i").attr("class","fa fa-check-square-o"); 
		}else{
			if(FBSP.getTab().parent().parent().attr("data-name")!="EditGoods"){
				$(this).children("i").attr("class","fa fa-square-o"); 
			}
//			$(this).children("i").attr("class","fa fa-square-o"); 
		}
			
		if ($(this).attr('jgbj') == 1){
			FBSP.getTab().find("[name='tabflsx'] tr").remove();
			FBSP.getTab().find("[name='tabflsx']").append('<tr name="th"><th name="price">零售价格</th><th name="DistributionPrice">分销价格</th>' + 
			      										  '<th name="stockNum">数量</th>' +
			      										  '<th name="tcCode" style="display:none">tcCode</th>' + 
			      										  '<th name="outSideCode">外部编码</th>' +
			      										  '<th name="groupMark">组合商品</th>' +
			      										  '<th name="cz">操作</th></tr>');//style="display:none"
			
			//动态生成TABLE列头
			for (var i=dls.length;i>=0;i--){
				var dl = $(dls[i]);
				if (dl.find(".fa-check-square-o").length>0){ 
					FBSP.getTab().find("[name='tabflsx'] tr[name=th]").prepend("<th rownum="+i+" name="+dl.find("dt").html()+">"+dl.find("dt").html()+"</th>");
				}
			}
			
			//产生笛卡尔积数组
			var aa = [];
			var rownum = 1;
			for (var i=0;i<dls.length;i++){
				var dl = $(dls[i]);
				var squares = dl.find(".fa-check-square-o"); 
				if (squares.length>0){ 
					rownum = rownum * squares.length;
					var bb = [];
					for (var j=0;j<squares.length;j++){
						var square = $(squares[j]);
						bb.push(square.next().html());
					}
					aa.push(bb);
				}
			}
			//动态生成TABLE里面的内容
			diKaErJiArray = JL.diKaErJi(aa);
			console.info(diKaErJiArray);
			if(diKaErJiArray.length > 98){
				JL.tip("套餐不能超过99！");
				return;
			}
			for (var i=0;i<diKaErJiArray.length;i++){
				var diKaErJi = diKaErJiArray[i];
				var tr = $('<tr>').appendTo(FBSP.getTab().find("[name='tabflsx']"));
				var bj = [];
				for (var j=0;j<diKaErJi.length;j++){
					var str = diKaErJi[j];
					bj.push(str);
					var td = $('<td>').appendTo(tr);
					td.attr("row",j);
					td.attr("line",i);
					td.attr("name",str);
					td.attr("bj",bj);
					td.html(str); 
				}  
				
				$('<td name="price"><input type="text" name="jg"></td><td name="DistributionPrice"><input type="text" name="DistributionPrice"></td>'+
				  '<td name="stockNum"><input type="text" name="sl"></td>'+
				  '<td style="display:none"><input type="text" name="code"></td><td name="outSideCode"><input type="text" name="outSideCode"></td><td name="groupMark"><input type="checkbox" onclick="checkbox(this)" value="0" name="groupMark" style="text-align:center;float:none;"></td>').appendTo(tr); 
				var td = $('<td name="cz"><a>删除</a></td>').appendTo(tr); 
				$(td).on("click",function(){
					console.info('删除click');
					var tr = $(this.parentElement).find('td');
					var line = tr.attr('line');
					diKaErJiArray[line]=[];
					for (var i=0;i<tr.length;i++){
						var td=$(tr)[i];
						if ($(td).attr("rowspan")==null){
							$(td).remove();
						}else if ($(td).attr("rowspan")==1){ 
							$(td).remove();
						}
					}
				});  
			}
			
			var abc = 1; 
			for (var i=0;i<dls.length;i++){
				var dl = $(dls[i]);
				var squares = dl.find(".fa-check-square-o");
				if (squares.length>0){ 
					abc = abc*squares.length;
					for (var j=0;j<squares.length;j++){
						var square = $(squares[j]);
						var name = square.next().html();
						var tds = FBSP.getTab().find("[name='tabflsx'] tr:not(:first) td[name='"+name+"']");
						for (var k=0;k<tds.length;k++){
							var td = $(tds[k]);
							if(k>0 && td.attr("bj") == $(tds[k-1]).attr("bj")){
								td.remove();
							} else {
								td.attr("rowspan", rownum/abc);
							}
						}
					}
				}
			}
			
			//动态生成商品属性的图片（tab_spsx）
			if ($(this).attr('tpbj') == 1){
				var tpname = $(this).attr("tpname");
				var tab_spsx = FBSP.getTab().find("[name=tab_spsx]");
				var tr = $(tab_spsx).find('tr');
				if(radio_class == "fa fa-square-o"){
					console.info('勾上');
					var td = $("<td>").appendTo(tab_spsx);
					str = '<tr><td class="one w02">'+
					  	  '<ul class="w12 jl_color" style="width: 150px;padding: 23px;border: 1px solid #f9f9f9;">'+
					      '<li class="w12"><div class="jl_input_checkbox"><span>'+$(this).find("span").html()+'</span></div></li>'+
					      '</ul></td><td class="one w10 pl10"><div id="'+tpname+'" class="jl_up_img" style="width: 50%;"></div></td></tr>'; 
					FBSP.getTab().find("[name='tab_spsx']").append(str);
					  
					var sxtp = JL.initPlugIn(FBSP.getTab().find("#"+tpname), tpname.substring(2,tpname.length), {"jlid": "JLUploadImage",
	                    													   "url": "jlresource/uploadImg.do"});
					var json = {};
					json[tpname] = sxtp;
					FBSP.setPluginObj(json);
				}else{
					console.info('取消');
					var td = $("#"+tpname).parents("tr")[0];
					if(FBSP.getTab().parent().parent().attr("data-name")!="EditGoods"){
						td.remove();
					}
					
				}
			}
		}
	});
})

FBSP.setAfterInit = function(json){
	FBSP.load(json);
}

FBSP.define({
		"showFLSX": function(flsxJson) {
			console.info("showFLSX");
			FBSP.getTab().find("[name='flxs'] dl").remove();
			FBSP.getTab().find("[name='div_spsx'] dl").remove();
			FBSP.getTab().find("[name='tab_spsx']").remove();
			FBSP.getTab().find("[name='tabflsx']").remove();
			console.info(flsxJson);
			for(var i=0;i<flsxJson.length;i++){
				if(flsxJson[i].spfl.key==FBSP.getPluginObj("JLShowfl").getData().key){
					var str,sth;
					console.info(flsxJson[i].spfl);
					console.info(flsxJson[i]);
					for(var j=0;j<flsxJson[i].item.length;j++){ 
						if (flsxJson[i].item[j].jgbj == 1){
							//动态显示属性
							FBSP.getTab().find("[name='flxs']").append('<dl><dt class="w02" title="'+flsxJson[i].item[j].name+'">'+flsxJson[i].item[j].name+'</dt>'+
																	   '<dd class="w10"><ul class="w11 jl_color" name="xs_'+i+'-'+j+'"></ul></dd></dl>');
						}else{
							var div_spsx = FBSP.getTab().find('[name="div_spsx"]');
							var dl = $('<dl class="w12">').appendTo(div_spsx);
							var dt = $('<dt class="w02" title="商品介绍">'+flsxJson[i].item[j].name+'</dt>').appendTo(dl);
							var dd = $('<dd class="w10"></dd>').appendTo(dl);
						}
						  
						if (flsxJson[i].item[j].tpbj == 1){
							//显示需要上传的属性
							FBSP.getTab().find("[name='sctp']").append('<table class="w12" style="margin-top:10px;" name="tab_spsx">'+
																	   '<tr><th>'+flsxJson[i].item[j].name+'</th><th>上传图片</th></tr></table>'); 
						} 
						
						//动态显示属性选项值
						for(var h=0;h<=flsxJson[i].item[j].item.length;h++){
							if (flsxJson[i].item[j].item[h] != null){
								if (flsxJson[i].item[j].jgbj==1){
									//显示选项
									FBSP.getTab().find('[name="xs_'+i+'-'+j+'"]').append('<li class="w03">'+
											                                             '<div class="jl_checkbox" tpname="d_sxtp_'+h+
											                                             '" jgbj="'+flsxJson[i].item[j].jgbj+
											                                             '" tpbj="'+flsxJson[i].item[j].tpbj+
											                                             '" name="xs_'+i+'-'+j+'-'+h+'" jb="'+j+'">'+
											 											 '<i class="fa fa-square-o"></i>'+
										                                                 '<span>'+flsxJson[i].item[j].item[h].name+'</span></div></li>');
								}else{ 
									var li = $('<li class="w03"></li>').appendTo(dd);
									var div = $('<div class="jl_checkbox"><i name="xs_'+i+'-'+j+'" jb="'+j+'" class="fa fa-square-o"></i><span>'+flsxJson[i].item[j].item[h].name+'</span></div>').appendTo(li);
								} 
							}
						}
					}
					FBSP.getTab().find("[name='spsx']").append('<table width="40%" border="1" cellspacing="0" cellpadding="0" name="tabflsx">'+
							                                   '<tr name="th">'+
							                                   '<th name="price">零售价格</th><th name="DistributionPrice">分销价格</th>' + 
						    								   '<th name="stockNum">数量</th>' + 
						    								   '<th name="tcCode" style="display:none">tcCode</th>'+
						    								   '<th name="outSideCode">外部编码</th>' +
						    								   '<th name="groupMark">组合商品</th>' +
						                                       '<th name="操作">操作</th></tr></table>');
				}
			}
		}
});
var checkbox =function(obj){
	$(obj).val(1);
}
FBSP.setPlugin({
		"fbsp" : {
			"jlid": "JLToolBar",
			"buttons": {
				"jlSubmit_O2O":{
					"func": function(){
			    		var XmlData = {};  
			    		var attr = {};
						var tc = []; 
						var ppbJson = {};
						var ppbList = FBSP.getPluginObj("ppb").getData();
						for (var i=0;i<ppbList.length;i++){
							var ppb = ppbList[i];
							ppbJson.key = ppb.key;
							ppbJson.value = ppb.value;
						}
						XmlData.ppb = ppbJson;
						XmlData.name = FBSP.getTab().find('[name="spmc"]').val(); 
						XmlData.packList = FBSP.getTab().find("textarea[name='packList']").val();
						XmlData.spfl = FBSP.getPluginObj("JLShowfl").getData();
						
						var spjs_uri_mobile=[];
						var spjs_uri_pc=[];
						var spsjs = FBSP.getPluginObj("sjsc").getData();
						for (var i=0;i<spsjs.length;i++){
							spsj=spsjs[i];
							spjs_uri_mobile[i] = spsj.FILE_URL;  
						}
						XmlData.spjs_uri_mobile = spjs_uri_mobile;
						
						var div_spsx = FBSP.getTab().find('[name="div_spsx"]');
						var dls = div_spsx.find('dl');
						for (var i=0;i<dls.length;i++){
							var dl = dls[i];
							var dt = $(dl).find('dt').html();
							var dd = $(dl).find('dd');
							var span = $(dd).find('.fa-check-square-o').next().html();
							attr[dt] = span;
						}
						XmlData.attr = attr;
						
						var sppcs = FBSP.getPluginObj("pcsc").getData();
						for (var i=0;i<sppcs.length;i++){
							sppc=sppcs[i];
							spjs_uri_pc[i] = sppc.FILE_URL; 
						}
						XmlData.spjs_uri_pc = spjs_uri_pc;
						
					    var table = FBSP.getTab().find('[name="tabflsx"]');
					    var tds = $(table).find("td");
					    if (tds.length==0){
					    	JL.tip("该商品选择分类无套餐属性，无法保存！", null);
					    	return;
					    }
					    
					    var trs = $(table).find("tr");
					    for (var i=1;i<trs.length;i++){
					    	var ls;
					    	var sx = {};  
					    	var tr = trs[i];
					    	var tds = $(tr).find("td"); 
					    	var th = $(trs[0]).find('th');
					    	var gdl = 7;
					    	for (var k=0;k<th.length-1;k++){
					    		var lt = $($(trs[0]).find('th')[k]).attr("name");
					    		
					    		if (k<diKaErJiArray[i-1].length){
						    		sx[lt] = diKaErJiArray[i-1][k];
						    		ls = k;
					    		}else{
					    			if (tds.length==th.length){
					    				var td = tds[k];
					    			}else{
					    				var td = tds[tds.length-gdl];
					    				gdl = gdl-1;
					    			}
						    		var input = $(td).find('input');
						    		sx[lt] = $(input).val();
					    		}
					    	}
					    	tc.push(sx);
					    	
					    	//拼属性中对应的图片
					    	var tab_spsx = FBSP.getTab().find('[name="tab_spsx"]');
					    	var sxtrs = $(tab_spsx).find("tr");
					    	var sxlt = $(sxtrs[0]).find("th").eq(0).html();
					    	for (var k=1;k<sxtrs.length;k++){
					    		var sxtr = sxtrs[k];
					    		var sxtds = $(sxtr).find("td"); 
					    		var span = $(sxtds).eq(0).find("span").html();
					    		if (sx[sxlt]==span){
					    			var tps = $(sxtds).eq(1).find("div").attr("id");
					    			var sctps = FBSP.getPluginObj(tps).getData();
					    			var sctp_uri=[];
					    			for (var j=0;j<sctps.length;j++){
					    				sctp = sctps[j];
					    				sctp_uri[j] = sctp.FILE_URL; 
					    			}
					    			
					    			tc[i-1]['uri'] = sctp_uri;
					    		}
					    	}
					    	
					    	XmlData.tc = tc;
					    }
			    		console.info(XmlData);
						var json = {}; 
	        			json["query"] = {"jlbh":FBSP.data.jlbh};
	        			json["doc"] = XmlData; 
	        			
	        			var jg =FBSP.getTab().find("[name='spsx']").find("table").find("tr").find("td[name='price'] >input");
	        			var fxjg =FBSP.getTab().find("[name='spsx']").find("table").find("tr").find("td[name='DistributionPrice'] >input");
	        			var sl =FBSP.getTab().find("[name='spsx']").find("table").find("tr").find("td[name='stockNum'] >input");
	        			var tpimg =FBSP.getTab().find("[name='sctp']").find(".more_img").find("ul");
	        			for(var m=0;m<jg.length;m++){
	        				if(jg.eq(m).val() ==""){
	        					JL.tip("零售价格不允许有空值！");
	        					return;
	        				}
	        				if(fxjg.eq(m).val() ==""){
	        					JL.tip("分销价格不允许有空值！");
	        					return;
	        				}
	        				if(jg.eq(m).val()*1 < fxjg.eq(m).val()*1){
	        					JL.tip("分销价格不允许大于零售价！");
	        					return;
	        				}
	        				var reg=/^\d+(\.\d{1,2})?$/;
	        				if(!reg.test(fxjg.eq(m).val())){
	        					JL.tip("分销价格不符合规范！");
	        					return;
	        				}
	        				if(!reg.test(jg.eq(m).val())){
	        					JL.tip("零售价格不符合规范！");
	        					return;
	        				}
	        			}
	        			for(var l=0;l<sl.length;l++){
	        				if(sl.eq(l).val() ==""){
	        					JL.tip("数量不允许有空值！");
	        					return;
	        				}
	        			}
	        			for(var n=0;n<tpimg.length;n++){
	        				if(tpimg.eq(n).find("img").attr("src")==undefined){
	        					JL.tip("商品图片必须上传！");
	        					return;
	        				}
	        			}
	        			
						var ajaxJson = {};
	        			ajaxJson["src"] = "Goods/insert.do";
	        			ajaxJson["data"] = {"json":JSON.stringify(json)};
	        			var resultData = JL.ajax(ajaxJson);
	        			if (resultData.data.jlbh>0){
	        				FBSP.getTab().find("#d_fbsp").hide();
	        				JL.tip("保存成功！", null);
	        			}else{
	        				JL.tip("保存失败！", null);
	        			}
					}
				}
			}
		},
		"pcsc": {
			  "jlid": "JLUploadImage",
			  "url": "jlresource/uploadImg.do"
		},
		"sjsc": {
			  "jlid": "JLUploadImage",
			  "url": "jlresource/uploadImg.do"
		},
		"JLShowfl" : {
			"jlid":"JLSelectMenuTree",
			"sBillName": "JLInterface",
			"sOperateName": "getSPFL_Mongo.do",
			"dataStructure": "list", 
			"final":true,
			"listener":{
				"click": function(row){ 
					console.info(row);
					if (!JL.isNull(row)){
//						FBSP.getTab().find("[name='ljfb']").click();
					}
				}
			}
		},
		"ppb": {
			"jlid": "JLMultiSelect",
			"sBillName": pubJson.getURL("ResourceUrl")+"/shopJL/baseData",
			"sOperateName": "W_PPB.json",
			"multi": false,
			"placeholder": "输入品牌1名称可查询", 
			"listener":{
				"click": function(){
					//alert("自己写");
				}
			}
		}
});


FBSP.addEleEvent=function(thisId,thisObj){
	//先选择分类
	var flCode=$("#chooseCode").val();	
	
	if(!JL.isNull(flCode)){
		$(thisObj).on("click",function(){
			//FBSP.getPluginObj("JLShowfl").getData()
			FBSP.ppbid = $(thisObj).find("[name='ppCode']").val();
			FBSP.getTab().find('[name="ppName"]').val($(thisObj).find('span').html());
		});
	}else{
		JL.tip("请先选择分类！", null);
	}
}

FBSP.reloadPp=function(flParam){}
