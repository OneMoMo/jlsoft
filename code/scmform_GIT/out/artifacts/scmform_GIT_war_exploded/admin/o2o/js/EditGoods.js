var EditGoods = new JLForm();
var transport = new JLTransport();
var resultData="";
var resultDat;
var json={};

EditGoods.setPlugin({
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": {
			"jlSubmit_O2O":{
				"css":"jl_btn btn_color ml20",
				"func": function(){
					console.info('update');
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
					
					XmlData.spbm = FBSP.data.spbm;
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
		    		var jg =EditGoods.getTab().find("[name='spsx']").find("table").find("tr").find("td[name='price'] >input");
        			var fxjg =EditGoods.getTab().find("[name='spsx']").find("table").find("tr").find("td[name='DistributionPrice'] >input");
        			var sl =EditGoods.getTab().find("[name='spsx']").find("table").find("tr").find("td[name='stockNum'] >input");
        			var tpimg =EditGoods.getTab().find("[name='sctp']").find(".more_img").find("ul");
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
		    		var json = {}; 
        			json["query"] = {"jlbh":FBSP.data.jlbh};
        			json["doc"] = XmlData; 
		    		 					
					var ajaxJson = {};
        			ajaxJson["src"] = "Goods/update.do";
        			ajaxJson["data"] = {"json":JSON.stringify(json)};
        			var resultData = JL.ajax(ajaxJson);  
        			console.info(resultData);
        			if (resultData.data.jlbh>0){
        				JL.tip("修改成功！", null);
        				EditGoods.getTab().find("#d_toolbar").find("#jlCancel_O2O").click();
        			}else{
        				JL.tip("修改失败！", null);
        			}
				}
			},
			"jlCancel_O2O":{
				"func": function(){
					EditGoods.getTab().find("[name='sch']").show();
	    			EditGoods.getTab().find("[id='d_Goods']").show();
	    			EditGoods.getTab().find("[name='FBSP']").remove();
	    			EditGoods.getTab().find("#jlSubmit_O2O").hide();
	    			EditGoods.getTab().find("#jlCancel_O2O").hide();
				}
			}
		}
	},
	"Goods":{
		"jlid" : "JLLayoutGrid",
		"style": "public_list w12 no_margin",
		"multi": false,
		"paging" : "more",
		"header":[
		          {"id":"url", "title":"缩略图", "groupcss":"w01", "editor":"img","listener":{
			    	"click": function(thisPlugin,index,obj,itemIndex){
			    	}
			      }},
			      {"id":"name","title":"商品名称", "groupid":"title","groupcss":"w09","rowindex":1},
			      {"id":"ppb","title":"品牌", "editor":"a","groupid":"title","groupcss":"w09","rowindex":2},
			      {"id":"spfl","title":"分类", "groupid":"title","groupcss":"w09","rowindex":3},
			      {"id":"glsp","title":"关联商品","css":"pb5 font_color","editor":"link","groupcss":"w02 font_red ddzt","groupid":"glsp","listener":{
				    	"click": function(thisPlugin,index,obj){
				    	}
				  }},
				  {"id":"bj","title":"编辑","css":"pb5 font_color","editor":"link","groupcss":"w02 font_red ddzt","groupid":"glsp","listener":{
				    	"click": function(thisPlugin,index,obj){
				    			console.info('确认编辑吗');
				    			//显示层的隐藏显示控制
				    			EditGoods.getTab().find("[name='sch']").hide();
				    			EditGoods.getTab().find("[id='d_Goods']").hide();
				    			var DIV_FBSP = EditGoods.getTab().find("[name='DIV_FBSP']");
				    			$('<div class="w12" name="FBSP"></div>').appendTo(DIV_FBSP);
				    			EditGoods.getTab().find("#jlSubmit_O2O").show();
				    			EditGoods.getTab().find("#jlCancel_O2O").show();
				    			
				    			//拼装数据
				    			var spData = thisPlugin.getData(index); 
				    			var data = {};
				    			data.JLShowfl = spData.spfl;
				    			data.ppb = [spData.ppb];
				    			data.tc = spData.tc;
				    			data.attr = spData.attr; 
				    			data.spmc = spData.name;
				    			data.packList = spData.packList;
				    			data.jlbh = spData.jlbh;
				    			data.spbm = spData.spbm;
				    			 
				    			EditGoods.getTab().find("[name='FBSP']").load(pubJson.getURL("FormUrl")+"/admin/o2o/FBSP.html",function(){
				    				//初始化页面
				    				FBSP.setTab($(this));
				    				FBSP.setData(data);
				    				FBSP.isWorkflow = false;
				    				FBSP.initForm();
				    				FBSP.getTab().find("[name='ljfb']").hide();
				    				FBSP.getTab().find("[name='ljfb']").click();
				    				FBSP.getTab().find("#jlSubmit_O2O").parent().parent().parent().hide();
				    				var flxs = FBSP.getTab().find("[name='flxs']");
				    				$("<div disabled name='disflxs'></div>").appendTo(flxs);
				    				var height = flxs.height();
				    				FBSP.getTab().find("[name='disflxs']").attr("style","position: absolute;width: 100%;min-height: "+height+"px;");
				    				//给页面赋值
				    				var dls = FBSP.getTab().find("[name='flxs'] dl");
				    				for (var j=0;j<data.tc.length;j++){
				    					for (var i=0;i<dls.length;i++){
					    					var dl = dls[i];
					    					var dt = $(dl).find("dt").html(); 
					    					var dd = $(dl).find("dd"); 
					    					var spans = $(dd).find('span');
					    					
					    					if (data.tc[j][dt]!=null){
					    						for (var k=0;k<spans.length;k++){
					    							var span = spans[k];
					    							if (data.tc[j][dt]==$(span).html()){
					    								var ii=$(span).prev();
					    								var div=ii.parent();
					    								div.click();
					    							}
					    						}
					    					}
					    				}
				    				}
				    				if (!JL.isNull(spData.spjs_uri_pc)){
					    				var pcuri = [];
					    				for (var i=0;i<spData.spjs_uri_pc.length;i++){
					    					var url=spData.spjs_uri_pc[i];
					    					pcuri.push({'FILE_URL':url});
					    				}
					    				FBSP.getPluginObj('pcsc').setData(pcuri);
					    			}
					    			if (!JL.isNull(spData.spjs_uri_mobile)){
					    				var mobileuri = [];
					    				for (var i=0;i<spData.spjs_uri_mobile.length;i++){
					    					var url=spData.spjs_uri_mobile;
					    					mobileuri.push({'FILE_URL':url});
					    				}
					    				FBSP.getPluginObj('sjsc').setData(mobileuri);
					    			}
					    			console.info('editgiids-123');
				    				//填充笛卡尔积列表数据
				    				for (var j=0;j<data.tc.length;j++){
	    								var prices = FBSP.getTab().find("td[name='price']");
	    								for (var g=0;g<prices.length;g++){
	    									var tdprev = $(prices[g]).prev();
	    									var thprevAll = FBSP.getTab().find("th[name='price']").prevAll();

	    									var row = thprevAll.length;
	    									var bj = tdprev.attr('bj').split(",");
	    									var equals = 0;
	    									for (var h=0;h<thprevAll.length;h++){
	    										var thName = $(thprevAll[h]).attr("name");
	    										if(!JL.isNull(data.tc[j][thName]) && $.inArray(data.tc[j][thName], bj) != -1){
	    											equals++;
		    									}	 
	    									}
	    									if(equals == row){
	    										console.info(data.tc[j]["tcCode"]);
	    										console.info($(prices[g]).find("[name='tcCode']"));
	    										
	    										$(prices[g]).find("[name='jg']").val(data.tc[j]["price"]);
    											var sl = $(prices[g]).next().next().find("[name='sl']").val(data.tc[j]["stockNum"]);
    											var outSideCode = $(prices[g]).next().next().next().next().find("[name='outSideCode']").val(data.tc[j]["outSideCode"]);
    											$(sl).parent().next().find("[name='code']").val(data.tc[j]["tcCode"]);
    											var outSideCode = $(prices[g]).next().find("[name='DistributionPrice']").val(data.tc[j]["DistributionPrice"]);
    											if(data.tc[j]["groupMark"]=="1"){
    												var groupMark = $(prices[g]).next().next().next().next().next().find("[name='groupMark']").val(data.tc[j]["groupMark"]);
    												$(prices[g]).next().next().next().next().next().find("[name='groupMark']").attr("checked","checked");
    											}
    											
	    									}
	    								}
				    				}
				    				FBSP.getTab().find("[name='cz']").hide();
				    				
				    				//填充图片列表数据
				    				var spsx_th = FBSP.getTab().find("[name='tab_spsx'] th");
				    				var spsx_trs = FBSP.getTab().find("[name='tab_spsx'] tr");
				    				var spsx_tds = $(spsx_trs[1]).find('td');
				    				var spsx_spans = FBSP.getTab().find("[name='tab_spsx'] span");
				    				var sxtp = {};
				    				for (var j=0;j<data.tc.length;j++){
				    					var tc = data.tc[j];
				    					var sxz = tc[$(spsx_th[0]).html()];
				    					var uris = tc.uri;
				    					var sxuri = [];
				    					
				    					for (var h=0;h<uris.length;h++){
				    						var uri = uris[h];
				    						sxuri.push({'FILE_URL':uri.big});
				    					}
				    					
				    					if (!JL.isNull(sxtp)){
				    						if (JL.isNull(sxtp[sxz])){
				    							sxtp[sxz] = sxuri;
				    						}
				    					}else{
				    						sxtp[sxz] = sxuri;
				    					}
				    				}
				    				
				    				for (var i=0;i<spsx_spans.length;i++){
				    					var span = $(spsx_spans[i]); 
				    					var id = $(spsx_spans[i]).parent().parent().parent().parent().next().find('.jl_up_img').attr("id");
				    					FBSP.getPluginObj(id).setData(sxtp[$(span).html()]);
				    				}
				    				
				    				//为不影响价格的属性打钩
				    				var spsx_dls = EditGoods.getTab().find("[name='div_spsx'] dl");
				    				for (var i=0;i<spsx_dls.length;i++){
				    					var spsx_dl = spsx_dls[i];
				    					var dt = $(spsx_dl).find("dt").html();
				    					var dd = $(spsx_dl).find("dd");
				    					var spans = $(dd).find("span");
				    					 
				    					if (data.attr[dt]!=null){
				    						for (var j=0;j<spans.length;j++){
					    						var span = spans[j];
					    						if (data.attr[dt]==$(span).html()){
					    							var ii = $(span).prev();
					    							ii.attr("class","fa fa-check-square-o");
					    						}
					    					}
				    					}
				    				}
				    				EditGoods.getTab().find("#d_fbsp").remove();
				    			}); 
				    			EditGoods.getTab().find("[name='FBSP']").append("<script type='text/javascript' src='"+pubJson.getURL("FormUrl")+
				    															"/admin/o2o/js/FBSP.js'></script>");
				    	}
				  }},
				  {"id":"xj","title":"下架","css":"pb5 btn_color hide xj","editor":"button","groupcss":"w02 font_red ddzt","groupid":"glsp","listener":{
				    	"click": function(thisPlugin,index,obj){
				    		JL.confirm("确认下架吗", function(){ 
				    			var ajaxJson = {};
				           		var json={};
				           		json["spbm"]=thisPlugin.getData(index,"spbm");
				           		json["yxbj"]=0;
				           		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/EditGoods/GoodsShelf.do";
				       			ajaxJson["data"] = {"XmlData": JSON.stringify(json)};
				    			var resultData = JL.ajax(ajaxJson);
				    			JL.tip("商品下架成功！");
				    		});
				    	}
				  }},
				  {"id":"sj","title":"上架","css":"pb5 btn_color hide sj","editor":"button","groupcss":"w02 font_red ddzt","groupid":"glsp","listener":{
				    	"click": function(thisPlugin,index,obj){
				    		JL.confirm("确认上架吗", function(){ 
				    			var ajaxJson = {};
				           		var json={};
				           		json["spbm"]=thisPlugin.getData(index,"spbm");
				           		json["yxbj"]=1;
				           		ajaxJson["src"] = pubJson.getURL("FormUrl") + "/EditGoods/GoodsShelf.do";
				       			ajaxJson["data"] = {"XmlData": JSON.stringify(json)};
				    			var resultData = JL.ajax(ajaxJson);
				    			JL.tip("商品上架成功！");
				    		});
				    	}
				  }}
		],
		"listener":{
        	"loadRow":function(thisPlugin, data, rowIndex, dl){ 
        		var yxbj=data.yxbj;
        		if(yxbj ==1){
        			dl.find(".xj").show();
        		}else{
        			dl.find(".sj").show();
        		}
        	}
        }
	}
}); 

EditGoods.setAfterInit(function(){
	//$(".jl_btn.btn_blue").attr("class","jl_btn btn_color");
	console.info('setAfterInit');
	EditGoods.getTab().find("#jlSubmit_O2O").hide();
	EditGoods.getTab().find("#jlCancel_O2O").hide();
	EditGoods.loadGrid(); 
});

EditGoods.setEvents(function() {
	EditGoods.getTab().delegate("[name='search']", "click",function(event){  
		EditGoods.loadGrid();  
	});
	EditGoods.getTab().delegate("[name='tj']", "keydown",function(event){  
		EditGoods.loadGrid();  
	});
})

EditGoods.define({
	//加载订单
	"loadGrid": function(){
		console.info('loadGrid');
		
		EditGoods.orderNum();
		EditGoods.getOrderNum();
		EditGoods.getPluginObj("Goods").setData(resultData);
	},
	"orderNum": function(){
        var cxtj = {};
		if (EditGoods.getTab().find("[name=tj]").val().length!=0){
			cxtj.tj = EditGoods.getTab().find("[name=tj]").val();
		}
		resultData = transport.select(pubJson.getURL("FormUrl")+"/EditGoods","findGoods.do", cxtj);
		 resultDat=EditGoods.getSqlResult(resultData,"MONGO_EditGoods","W_Goods","admin/o2o/search");
		 resultData = resultDat.data;
		 
		 for(var i=0;i<resultData.length;i++){
				var obj =  resultData[i];
				if(obj.tc.length>0){ 
					var tcmap=obj.tc[0];
					var uriArrayList=tcmap.uri;
					if(uriArrayList.length>0){
						resultData[i].url=resultData[i].tc[0].uri[0].big
					}
				}
			}
		 EditGoods.getPluginObj("Goods").setPaging(resultDat.fileName);
	},
	"getOrderNum": function(){
		var cxtj_all = {};
		if (EditGoods.getTab().find("[name=tj]").val().length!=0){
			cxtj_all.tj = EditGoods.getTab().find("[name=tj]").val();
		}
		var resultData_all = transport.select(pubJson.getURL("FormUrl")+"/EditGoods","findGoodsNum.do", cxtj_all);
		if(resultData_all==null){
			EditGoods.getTab().find("[name='cszsp']").html('出售中的商品(0)'); 
		}else{
			resultData_all = resultData_all.basicDBObjectList;
			EditGoods.getTab().find("[name='cszsp']").html('出售中的商品('+resultData_all.length+')'); 
		}
	}
});

EditGoods.setEvent([{
		//加载更多
		"selector" : [".jl_bottom>.pad_load"],
		"event": "click",
		"func": function(){
			 for(var j=0;j<resultData.length;j++){
					var obj =  resultData[j];
					if(obj.tc.length>0){ 
						var tcmap=obj.tc[0];
						var uriArrayList=tcmap.uri;
						if(uriArrayList.length>0){
							resultData[j].url=resultData[j].tc[0].uri[0].big
						}
					}
				}
			EditGoods.getPluginObj("Goods").setData(resultData);
				
		}	
}]);

