var defineRYXX = JL.JLForm();

defineRYXX.setPlugin({
	"footer" : {
		"jlid": "JLToolBar",
		"buttons": ["jlSaveCard","jlEmptyCard"]
	},
	"toolbar" : {
		"jlid": "JLToolBar",
		"buttons": ["jlNewCard"]
	},
	"SSGS" : {
		  "jlid": "JLSelect",
		  "options": {"1":"武汉金力软件","2":"武汉基利软件"}
	},
	"KSSJ" : {
		 "jlid": "JLDate"
	},
	"JSSJ" : {
		 "jlid": "JLDate"
	},
	"RYZT" : {
		  "jlid": "JLRadio",
		  "options": {"在职":"在职","请假":"请假","待岗":"待岗","离职":"离职"}

	},
	"RYLX" : {
		  "jlid": "JLCheckbox",
		  "options": {"采购":"采购","管理":"管理","收银":"收银","销售":"销售","保管":"保管","财务":"财务","售后":"售后","导购":"导购","其他":"其他"}
	},
	"SSWD" : {//使用多级级联控件，目前没有数据，先使用静态下拉列表代替。
		  "jlid": "JLSelect",
		  "options": {"1":"武汉金力软件","2":"武汉基利软件"}
	},
	"RZRQ" : {
		 "jlid": "JLDate"
	},
	"LIST" : {
		"jlid" : "JLLayoutGrid",
		"paging": "paging",
		"title" : [
		           {"id":"DM", "name":"代码", "width":"w01"},
		           {"id":"MC", "name":"名称", "width":"w01"},
		           {"id":"BM", "name":"部门", "width":"w03"},
		           {"id":"XJJB", "name":"限价级别", "width":"w01"},
		           {"id":"ZT", "name":"状态", "width":"w01"},
		           {"id":"LX", "name":"类型", "width":"w02"},
		           {"id":"SFZ", "name":"身份证", "width":"w02"},
		           {"id":"CZ", "name":"操作", "width":"w01"}
		           ],
		           "header" : [
		                       {"id":"RYXX01", "groupid":"DM", "title":"代码"},
		                       {"id":"RYXX02", "groupid":"MC", "title":"名称"},
		                       {"id":"BM01", "groupid":"BM", "rowindex":1, "title":"部门编码"},
		                       {"id":"BM02", "groupid":"BM", "rowindex":1, "title":"部门名称"},
		                       {"id":"XJJB", "groupid":"XJJB", "title":"限价级别"},
		                       {"id":"ZT", "groupid":"ZT", "title":"状态"},
		                       {"id":"LX", "groupid":"LX", "title":"类型"},
		                       {"id":"SFZH", "groupid":"SFZ", "title":"身份证"},
		                       {"id":"edit", "groupid":"CZ", "rowindex":1, "title":"编辑", "editor":"link",
		                    	   "listener":{
		                    		   "click": function(){
		                    			   alert(1);
		                    		   }
		                    	   }
		                       },
		                       {"id":"delete", "groupid":"CZ", "rowindex":1, "title":"删除", "editor":"link",
		                    	   "listener":{
		                    		   "click": function(){
		                    			   alert(2);
		                    		   }
		                    	   }
		                       }
		                       ]
	}

});
defineRYXX.setEvent([{
	"selector": "#jlNew",
	"event": "click",
	"func": function(){
		/*defineRYXX.getPluginObj("LIST").addRow({
			"RYXX01":"1",
			"RYXX02":"测试",
			"BM01":"01010101",
			"BM02":"测试部门",
			"XJJB":"1",
			"ZT":"在职",
			"LX":"开发人员",
			"SFZH":"420XXXXXXXXXXXXXXX",
		});
		*/
	}
}])

defineRYXX.setAfterInit(function() {
});


