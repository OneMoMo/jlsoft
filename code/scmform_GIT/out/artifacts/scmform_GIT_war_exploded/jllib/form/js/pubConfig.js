var pubJson = new pubJson();
function pubJson() {

	this.data = {
			"FormUrl" : "form5",
			"ScmUrl" : "V9",
			"ResourceUrl" : "resource"
	}
	
	this.visitUrl = location.href.split(location.pathname)[0];
	
	this.writeCss = function(key, url) {
		document.write("<link rel='stylesheet' type='text/css' href='"+ this.getURL(key) + url +"'\/>");
	}
	
	this.writeJs = function(key, url) {
		document.write("<script type='text/javascript' src='"+ this.getURL(key) + url +"'><\/script>");
	}
	
	this.getURL = function(key) {
		return this.visitUrl + "/" + this.data[key];
	}
	
}