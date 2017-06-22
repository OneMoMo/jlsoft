var jl_nav = new JLForm();
jl_nav.setPlugin({
	"nav" : [{"code":"01","name":"定义基础属性","img":"","mjbj":"0",
				"item":[{"code":"0101","name":"定义品牌","img":"fa-bookmark-o","url":"jl_dyfl.html","mjbj":"1"},
				        {"code":"0102","name":"定义分类","img":"fa-sitemap","url":"jl_dyfl.html","mjbj":"1"},
				        {"code":"0103","name":"定义分类品牌","img":"fa-indent","url":"jl_dyfl.html","mjbj":"1"},
				        {"code":"0104","name":"定义分类属性","img":"fa-retweet","url":"jl_dyfl.html","mjbj":"1"},
				        {"code":"0105","name":"定义页面","img":"fa-file-text-o","url":"jl_dyfl.html","mjbj":"1"}
				        ]
			}]
});


jl_nav.setAfterInit(function(){
	jl_nav.getTab().empty();
	jl_nav.getTab().append('<ul class="nav_menu">'+
			  '<li class="nav_seach">'+
			    '<input placeholder="检索菜单名称" list="nav_list" type="text" /><i class="fa fa-search"></i>'+
			    '<datalist id="nav_list">'+
				'<option value="新增员工">'+
				'<option value="保险单">'+
				'<option value="客户安装建档">'+
				'<option value="出库单">'+
			    '</datalist>'+
			  '</li>'+
			  '<li>'+
			    '<a><i class="fa fa-home"></i><span>首页</span></i></a>'+
			  '</li>'+
			  '<li>'+
			    '<a><i class="fa fa-table"></i><span>页面布局</span><i class="ren_dian fa fa-circle"></i><i class="arrow fa fa-angle-left"></i></a>'+
			    '<ul class="sub_menu">'+
			      '<li><a><span>投递信息</span><i class="ren_dian fa fa-circle"></i></a></li>'+
			    '</ul>'+
			  '</li>'+
			'</ul>');
	var navlist = jl_nav.getPlugin()["nav"];
	$.each(navlist,function(i,obj){
		jl_nav.getTab().find("ul.nav_menu").append('<li class="bian"><a><i class="fa fa-edit"></i><span>'+obj.name+'</span><i class="arrow fa fa-angle-down"></i></a>'+
				'<ul class="sub_menu">'+
				'</ul></li>');
		/*jl_nav.getTab().find("ul.nav_menu").find("li.menu").click(function(){
			if($(this).attr("class")=="bian menu"){
				$(this).removeClass("xuan");
			    $(this).children(".sub_menu").slideUp();
			    $(this).find("a > .arrow").attr("class","arrow fa fa-angle-left");
			    $(this).attr("class","xuan bian menu"); 
			    $(this).siblings(".sub_menu").slideDown();
			    $(this).children(".arrow").attr("class","arrow fa fa-angle-down");
			}else{
				$(this).removeClass("xuan");
				$(this).children(".sub_menu").slideUp();
				$(this).attr("class","bian menu"); 
			    $(this).siblings(".sub_menu").slideUp();
			    $(this).children(".arrow").attr("class","arrow fa fa-angle-left");
			}
			
		});
		*/
		$.each(obj.item,function(index,val){
			jl_nav.getTab().find("ul li").find("ul.sub_menu").append('<li  code="'+val.code+'">'+
			          '<a><i class="fa '+val.img+'"></i><span>'+val.name+'</span><i class="ren_dian fa fa-circle"></i></a>'+
				      '</li>');
			jl_nav.getTab().find("ul li").find("ul.sub_menu").find("li[code="+val.code+"]").click(function(){
				//$(this).hasClass("xuan")==true?$(this).removeClass("xuan"):$(this).addClass("xuan");
				$(".jl_content").load(val.url);
			});
		})
	})
});


