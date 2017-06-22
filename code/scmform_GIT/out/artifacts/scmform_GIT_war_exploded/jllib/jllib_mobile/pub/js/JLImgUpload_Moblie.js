var JLImgUpload_Moblie={
		this.config = {
				"sBillName": "FormUpload",//接口路径(有默认值)
				"sOperateName": "multiUpload.do",//接口方法(有默认值),
				"preset": {
					"img": ["jpg","bmp","gif","png","jpeg"], 
					"text": ["txt","doc","docx"], 
					"excel": ["xls","xlsx"], 
					"html": ["html","htm"] 
				},
				"fileType":[], //预设类型 img|text|excel|html
				"suffix":[],  //扩展可上传文件类型
				"listener": {} //监听事件 afterUpload
			};
		
		
		var uploadHttp = "http://te.3g2win.com/pidginimg/upload.php";
		function explorerSuccess(data){
			document.getElementById('dirPath').value = obj.fileExplorerPath;
		}
		function upload(){
			uexUploaderMgr.createUploader(1,uploadHttp);
			uexUploaderMgr.uploadFile(1,document.getElementById('dirPath').value,"inputName",document.getElementById('ys').value);	
		}
		
		
		window.uexOnload = function(){
			uexWidgetOne.cbError = function(opCode,errorCode,errorInfo){
					alert(errorInfo);
			}
			uexUploaderMgr.onStatus = function(opCode,fileSize,percent,serverPath,status){
			switch (status) {
						case 0:
							document.getElementById('percentage').innerHTML = "文件大小："+fileSize+"字节<br>上传进度："+percent+"%";
							break;

						case 1:
							uexUploaderMgr.closeUploader(1);
							break;
						case 2:
							alert("上传失败");
							uexUploaderMgr.closeUploader(1);
							break;

					}
				
			}
			uexFileMgr.cbExplorer = function(opCode,dataType,data){
				document.getElementById('dirPath').value = data;
			}
			uexUploaderMgr.cbCreateUploader =function(opCode,dataType,data){
				if(data == 0){
					alert("创建成功");
				}else{
					alert("创建失败");
				}
				
			}
		}
		

}