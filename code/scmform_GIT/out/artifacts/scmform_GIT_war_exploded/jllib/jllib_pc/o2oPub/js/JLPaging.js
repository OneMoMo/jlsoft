(function($){
	$.extend({
		kkPages:function(obj,options){
		   var thisPlugin = obj;
		   var currentPage = 1;
		   var lastPage = options.lastPage;
		   var filename = options.filename;
		   
		   var paging = "<div class='jl_paging02 color fr'>"+
		   				"<a title='首页'><i class='fa fa-angle-double-left'></i></a>"+
		   				"<a title='上一页'><i class='fa fa-angle-left'></i></a>"+
		   				"<label><span>跳转至</span><input type='text' value=''/><a>确定</a><span>1/"+lastPage+"</span></label>"+
		   				"<a title='下一页'><i class='fa fa-angle-right'></i></a>"+
		   				"<a title='末页'><i class='fa fa-angle-double-right'></i></a>"+
		   				"</div>";
		   paging = $(paging);
		   paging.appendTo(thisPlugin.obj);
		   
		   var page_func = function(){
			   var resultData = JL.getPagingData(filename,currentPage);
			   resultData = JL.isNull(resultData)? []: resultData;
			   thisPlugin.setData(resultData);
			   paging.find("label span:eq(1)").html(currentPage+"/"+lastPage);
			}
			
		    //首页
			paging.find("a:eq(0)").unbind().click(function(){
				currentPage = 1;
				paging.find("label > input").val("");
				page_func();
			});
			
			//上一页
			paging.find("a:eq(1)").unbind().click(function(){
				if(currentPage <= 1){
					alert("已经是第一页了");
					return false;
				}
				currentPage--;
				paging.find("label > input").val("");
				page_func();
			});
			
			//输入页码
			paging.find("a:eq(2)").unbind().click(function(){
				var text_val = paging.find("label > input").val();
				if(text_val < 1 || text_val > lastPage){
					alert("请输入正确的页码");
					return false;
				}
				currentPage = text_val;
				page_func();
			});
			
			//下一页
			paging.find("a:eq(3)").unbind().click(function(){
				//alert(currentPage+"+"+lastPage);
				if(currentPage >= lastPage){
					alert("已经是最后一页了");
					return false;
				}
				currentPage++;
				paging.find("label > input").val("");
				page_func();
			});
			
			//尾页
			paging.find("a:eq(4)").unbind().click(function(){
				currentPage = lastPage;
				paging.find("label > input").val("");
				page_func();
			});
		    
	   } 
	});
})(jQuery);