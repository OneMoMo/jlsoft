var OA_HTML = {};

OA_HTML.pc = 
"<div id='OA_SQ' class='w12 jl_form'>"+
"	<div class='jl_form_02'>"+
"		<ul>"+
"			<li class='w12'>"+
"				<dl>"+
"					<dt class='w01' title='附件'>附件</dt>"+
"					<dd class='w11'><div id='d_OA_SQFJ'></div></dd>"+
"				</dl>"+
"			</li>"+
"			<li class='w12'>"+
"				<dl>"+
"			    	<dt class='w01' title='抄送岗位'>抄送岗位</dt>"+
"			    	<dd class='w05'>"+
"						<div id='d_OA_CCGW'></div>"+
"			    	</dd>"+
"			    	<dt class='w01' title='抄送人员'>抄送人员</dt>"+
"			    	<dd class='w05'>"+
"			      		<div id='d_OA_CCRY'></div>"+
"			    	</dd>"+
"			    </dl>"+
"			</li>"+
"			<li class='w12' class='hide'>"+
"				<dl class='hide'>"+
"					<dt class='w01' title='制单人'>制单人</dt>"+
"					<dd class='w02'><div id='d_OA_SQR'></div></dd>"+
"					<dt class='w01' title='制单时间'>制单时间</dt>"+
"					<dd class='w03'><div id='d_OA_SQSJ'></div></dd>"+
"				</dl>"+
"			</li>"+
"		</ul>"+
"	</div>"+
"</div>"+
"<div id='OA_DSH' class='w12 jl_form hide font_size_large'>"+
"	<div class='jl_form_02'>"+
"      	<ul>"+
"			<dl class='w12 jl_catalog_line'>"+
"		    	<dt class='catalog_title'><h3>审核</h3><span></span></dt>"+
"		    	<dd class='w12'></dd>"+
"		    	<dt class='catalog_cz'><i class='fa fa-angle-down' title='收起'></i></dt>"+
"		    </dl>"+
"			<li class='w12'>"+
"          		<dl>"+
"	          		<dt class='w01 hide' title='审核人'>审核人</dt>"+
"	          		<dd class='w02 hide'><div id='d_OA_SHR'></div></dd>"+
"	          		<dt class='w01 hide' title='审核时间'>审核时间</dt>"+
"	          		<dd class='w03 hide'><div id='d_OA_SHSJ'></div></dd>"+
"          			<dt class='w01' title='审核状态'>审核状态</dt>"+
"          			<dd class='w11'>" +
"						<div id='d_OA_SHZT'></div>"+
"	            		<div id='d_PCRM_HTBZ' class='hide'></div>" +
"					</dd>"+
"          		</dl>"+
"          		<dl class='hide'>"+
"          			<dd class='w12'><input type='text' name='OA_GW01'></dd>"+
"          		</dl>"+
"          		<dl style='height: 90px;'>"+
"          			<dt class='w01' title='详细描述'>详细描述</dt>"+
"          			<dd class='w11'><textarea name='OA_SHYJ' class='w08' placeholder='详细描述' style='height: 80px;max-height: 80px;'></textarea></dd>"+
"          		</dl>"+
"        	</li>"+
"		</ul>"+
"	</div>"+
"</div>"+
"<div id='OA_YSH' class='w12 jl_form'>"+
"	<div class='jl_form_02'>"+
"     	<ul>"+
"			<div id='d_OA_LOG' class='font_size_large'></div>"+
"		</ul>"+
"	</div>"+
"</div>";

OA_HTML.mobile = 
"<div id='OA_SQ' class='w12 jl_form'>"+
"	<div class='jl_form_01'>"+
/*
"		<dl>"+
"			<dt class='w03' title='附件'>附件</dt>"+
"			<dd class='w09'><div id='d_OA_SQFJ'></div></dd>"+
"		</dl>"+
*/
"		<dl>"+
"	    	<dt class='w03' title='抄送岗位'>抄送岗位</dt>"+
"	    	<dd class='w09'>"+
"				<div id='d_OA_CCGW' class='w12'></div>"+
"	    	</dd>"+
"		</dl>"+
"		<dl>"+
"	    	<dt class='w03' title='抄送人员'>抄送人员</dt>"+
"	    	<dd class='w09'>"+
"	      		<div id='d_OA_CCRY' class='w12'></div>"+
"	    	</dd>"+
"	    </dl>"+
"		<dl class='hide'>"+
"			<dt class='w03' title='制单人'>制单人</dt>"+
"			<dd class='w02'><div id='d_OA_SQR'></div></dd>"+
"			<dt class='w03' title='制单时间'>制单时间</dt>"+
"			<dd class='w03'><div id='d_OA_SQSJ'></div></dd>"+
"		</dl>"+
"	</div>"+
"</div>"+
"<div id='OA_DSH' class='w12 jl_form hide font_size_large'>"+
"	<div class='jl_title'>审核<i class='fa fa-angle-down'></i></div>"+
"	<div class='jl_form_01'>"+
"     	<dl class='hide'>"+
"	    	<dt class='w03 hide' title='审核人'>审核人</dt>"+
"	    	<dd class='w09 hide'><div id='d_OA_SHR'></div></dd>"+
"       </dl>"+
"      	<dl class='hide'>"+
"	    	<dt class='w03 hide' title='审核时间'>审核时间</dt>"+
"	    	<dd class='w09 hide'><div id='d_OA_SHSJ'></div></dd>"+
"       </dl>"+
"      	<dl>"+
"      		<dt class='w03' title='审核状态'>审核状态</dt>"+
"      		<dd class='w09'>" +
"				<div id='d_OA_SHZT' class='w12'></div>"+
"	       		<div id='d_PCRM_HTBZ' class='hide w12 mt10'></div>" +
"			</dd>"+
"       </dl>"+
"      	<dl>"+
"      		<dt class='w03' title='详细描述'>详细描述</dt>"+
"      		<dd class='w09'><textarea name='OA_SHYJ' class='w12' placeholder='详细描述' style='height: 80px;max-height: 80px;'></textarea></dd>"+
"   	</dl>"+
"	</div>"+
"</div>"+
"<div id='OA_YSH' class='w12'>"+
"	<div id='d_OA_LOG' class='jl_form font_size_large'></div>"+
"</div>";

var OA_PLUGIN = {};
OA_PLUGIN.pc = {
	"OA_SQR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SQSJ":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SQFJ":{
		"jlid": "JLUpload"
	},
	"OA_CCGW" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSGW",
		"resource" : "workflow",
		"multi" : true,
		"param" : "",
		"workflow" : {
		    "cc" : "gw"
		}
	},
	"OA_CCRY" : {
		"jlid" : "JLMultiSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSRY",
		"resource" : "workflow",
		"param" : "",
		"workflow" : {
		    "cc" : "ry"
		}
	}, 
	"OA_SHZT":{ //审核状态
		"jlid": "JLRadio",
		"default": "通过",
    	"options":{"0":"同意","1":"不同意","2":"驳回"},
		"default": "0",
		"listener": {
			"click":function(data, thisPlugin){//参数data为点击的值，是个json对象
				var initField = thisPlugin.form.initField;
				if (data.key == "2" && $.inArray("OA_SHZT", initField) != -1) {
					thisPlugin.obj.next().show();
				}else{
					thisPlugin.obj.next().hide();
				} 
	      	}
		}
	},
	"OA_SHR":{ //审核人
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SHSJ":{ //审核时间
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"PCRM_HTBZ" : { //回退步骤
		"jlid" : "JLSelect",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryHTBZ",
		"resource" : "workflow"
	}/*,
	"OA_LOG":{ //代办列表
		"jlid": "JLLayoutGrid",
		"style": "jl_form",
		"rowclass":"jl_form_01",
		"multi": false,
		"header": [
		    {"id":"SHR_NAME", "title":"审批人", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"OA_SHR", "title":"审批人", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"SHSJ_NAME", "title":"审批时间", "editor":"title", "groupcss":"w01"},
		    {"id":"OA_SHSJ", "title":"审批时间", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"SHYJNR_NAME", "title":"审批状态", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"OA_SHZT", "title":"审批状态", "editor":"plugin", "groupcss":"w11", "css":"w12", 
		    	"config":{
		    		"jlid": "JLRadio",
		    		"options":{"0":"通过","1":"不同意","2":"驳回"}
		    	}
		    },
		    {"id":"HTBZ_NAME", "title":"回退步骤", "editor":"title", "groupcss":"w01"},
		    {"id":"PCRM_HTBZ", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"BZSJ", "title":"", "hidden":true}
		],
	}*/
};

OA_PLUGIN.mobile = {
	"OA_SQR":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SQSJ":{
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SQFJ":{
		"jlid": "JLUpload"
	},
	"OA_CCGW":{
		"jlid": "JLMultiSelect_Mobile",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSGW",
		"resource" : "workflow",
		"placeholder": "请选择抄送岗位",
		"workflow" : {
		    "cc" : "gw"
		}
	},
	"OA_CCRY":{
		"jlid": "JLMultiSelect_Mobile",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryCSRY",
		"resource" : "workflow",
		"placeholder": "请选择抄送人员",
		"workflow" : {
			"cc" : "ry"
		}
	},
	"OA_SHZT":{ //审核状态
		"jlid": "JLRadio",
		"css": "w04",
		"default": "通过",
    	"options":{"0":"同意","1":"不同意","2":"驳回"},
		"default": "0",
		"listener": {
			"click":function(data, thisPlugin){//参数data为点击的值，是个json对象
				var initField = thisPlugin.form.initField;
				if (data.key == "2" && $.inArray("OA_SHZT", initField) != -1) {
					thisPlugin.obj.next().show();
				}else{
					thisPlugin.obj.next().hide();
				} 
	      	}
		}
	},
	"OA_SHR":{ //审核人
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"OA_SHSJ":{ //审核时间
		"jlid": "JLInput",
		"readonly": true,
		"css": "w10"
	},
	"PCRM_HTBZ" : { //回退步骤
		"jlid" : "JLSelect_Mobile",
		"placeholder": "回退步骤",
		"sqlid" : "com.jlsoft.framework.pcrm.CX.queryHTBZ",
		"resource" : "workflow"
	}/*,
	"OA_LOG":{ //代办列表
		"jlid": "JLLayoutGrid",
		"style": "jl_form",
		"rowclass":"jl_form_01",
		"multi": false,
		"header": [
		    {"id":"SHR_NAME", "title":"审批人", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"OA_SHR", "title":"审批人", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"SHSJ_NAME", "title":"审批时间", "editor":"title", "groupcss":"w01"},
		    {"id":"OA_SHSJ", "title":"审批时间", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"SHYJNR_NAME", "title":"审批状态", "editor":"title", "groupcss":"w01", "css":"w12"},
		    {"id":"OA_SHZT", "title":"审批状态", "editor":"plugin", "groupcss":"w11", "css":"w12", 
		    	"config":{
		    		"jlid": "JLRadio",
		    		"options":{"0":"通过","1":"不同意","2":"驳回"}
		    	}
		    },
		    {"id":"HTBZ_NAME", "title":"回退步骤", "editor":"title", "groupcss":"w01"},
		    {"id":"PCRM_HTBZ", "title":"", "groupcss":"w11", "css":"w12 font_dark_blue"},
		    {"id":"BZSJ", "title":"", "hidden":true}
		],
	}*/
};
