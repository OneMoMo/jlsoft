var JLReserveDate = function(json){
	this.config = {
		"param": {},	
		"sBillName": "",
		"sOperateName": "",
		"number":7
	};
	$.extend(this.config, json);
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];
	
	this.setData = function(data){
		this.data = data;
		this.write();
	}
	
	this.getData = function(){
		return this.data;
	}
	
	this.loadData = function(){
		var dataArr = [];
		for(var i=1;i<=this.config.number;i++){
			var dataObj = {};
			dataObj["day"]=JL.getDay(i);
			dataObj["week"]=JL.getWeek(dataObj["day"]);
			dataArr.push(dataObj);
		}
		this.setData(dataArr);
	}
	
	this.write = function(){
		this.obj.empty();
		var dataObj = {};
		var dataArr = this.getData();
		var table = $("<table></table>").appendTo(this.obj);
		var tbody = $("<tbody></tbody>").appendTo(table);
		//显示星期Title
		var titleTr = $("<tr></tr>").appendTo(tbody);
		$("<td class=\"no1\">时间段</td>").appendTo(titleTr);
		//显示上午可选时间段
		var morningTr = $("<tr></tr>").appendTo(tbody);
		$("<td class=\"no1\">09:00-15:00</td>").appendTo(morningTr);
		//显示下午可选时间段
		var afternoonTr = $("<tr></tr>").appendTo(tbody);
		$("<td class=\"no1\">15:00-19:00</td>").appendTo(afternoonTr);
		for(var i=0;i<dataArr.length;i++){
			// class=\"active\"
			dataObj = dataArr[i];
			$("<td><span>"+(dataObj.day).split("-")[1]+"-"+(dataObj.day).split("-")[2]+"</span><label>"+dataObj.week+"</label></td>").appendTo(titleTr);
			$("<td><a>可选</a></td>").appendTo(morningTr);
			$("<td><a>可选</a></td>").appendTo(afternoonTr);
		}
		//增加a标签选中中事件
		$(table).find("a").click(function(){
			$(table).find("a").removeClass("active");
			$(this).addClass("active");
		});
	}
	
	this.init = function(){
		this.loadData();
	}
	
	this.init();
};