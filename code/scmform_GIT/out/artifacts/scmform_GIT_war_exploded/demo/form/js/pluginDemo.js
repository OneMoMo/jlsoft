var pluginDemo = new JLForm(); 

pluginDemo.setPlugin({
	"input1" : {
		"jlid" : "JLInput",
		"placeholder": "默认宽度"
	},
	"input2" : {
		"jlid" : "JLInput",
		"css": "w05",
		"placeholder": "宽度 w05"
	},
	"radio" : {
		"jlid" : "JLRadio",
		"options": {
			"男": "男",
			"女": "女"
		}
	},
	"checkbox" : {
		"jlid" : "JLCheckbox",
		"options": {
			"全部": "全部",
			"一": "一",
			"二": "二",
			"三": "三"
		}
	},
	"select" : {
		"jlid" : "JLSelect",
		"options": {
			"江汉区": "江汉区",
			"武昌区": "武昌区",
			"洪山区": "洪山区"
		}
	},
	"date1" : {
		"jlid" : "JLDate",
		"readonly": true
	},
	"date2" : {
		"jlid" : "JLDate",
		"format": "yyyy-mm-dd hh:ii:ss",
		"readonly": true
	},
	"upload" : {
		"jlid" : "JLUpload"
	},
	"address" : {
		"jlid" : "JLAddress",
		"sBillName" : pubJson.getURL("FormUrl") + "/JLInterface",
		"sOperateName" : "getDQBZM.do"
	},
	"selectTree" : {
		"jlid" : "JLSelectTree",
		"multi" : true,
		"text" : false,
		"sBillName" : pubJson.getURL("FormUrl") + "/JLInterface",
		"sOperateName" : "getDQBZM.do"
	}
});