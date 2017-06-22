package com.jlsoft.form.scm.gcgl.gcdl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.admin.scm.pub.adapter.ScmFormAdapter;
import com.jlsoft.framework.aop.Authorization;
import com.jlsoft.framework.aop.SpringContextHolder;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.pi.bdjk.BdJK;
import com.jlsoft.framework.util.JLConf;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
/**
 * @author 刁小峻
 *
 */
@Service("scmMakeGCHT")
public class SCM_GCHT extends ScmFormAdapter {
	
	@Autowired
	private JLConf jlConf;
	
	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Boolean check(Map json, int bdbh, HttpServletRequest request)
			throws Exception {
		
		
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		mappingPart("form.scm.gcht.gchtzd", json);
		if(FormTools.isNull(json.get("GCHTH01"))){
			json.put("GCHTH01",updateW_DJBHZT(workflow, json.get("GSXX01").toString(), "GT"));
		}
	
		if(initField.contains("ZDR")&&!"D1".equals(json.get("S_VALUE"))){
			JSONArray SPLB = Json.toJA(json.get("SPLB"));
			for (int i = 0; i < SPLB.size(); i++) {
				double SQDJ=Double.parseDouble(SPLB.getJSONObject(i).get("SQDJ").toString());
				if (SQDJ<=0) {
					throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品申请单价不能小于等于0");
				}
			}
			JSONArray SPLBTEMP = Json.toJA(json.get("SPLBTEMP"));
			String result = "";
			boolean delFlag;
			List GCSPMC = new ArrayList();
			for(int i=0; i<SPLBTEMP.size(); i++){
				JSONObject AA = SPLBTEMP.getJSONObject(i);
				delFlag = true;
				for(int j=0; j<SPLB.size(); j++){
					JSONObject BB = SPLB.getJSONObject(j);
					if(FormTools.isNull(BB.get("WBTDH"))){
						if(GCSPMC.indexOf(BB.get("GCSPMC")) == -1){
							GCSPMC.add(BB.get("GCSPMC"));
						}
						continue;
					}else if(AA.getString("WBTDH").equals(BB.getString("WBTDH"))){
						if(FormTools.isNull(AA.get("PFSL")) || !AA.getString("PFSL").equals(BB.getString("PFSL"))){
							result += AA.get("GCSPMC") + "  合同数量: " + AA.get("PFSL") + " --> " + BB.get("PFSL") +" ; ";
						}
						if(FormTools.isNull(AA.get("SQDJ")) || !AA.getString("SQDJ").equals(BB.getString("SQDJ"))){
							result += AA.get("GCSPMC") + "  合同单价: " + AA.get("SQDJ") + " --> " + BB.get("SQDJ") +" ; ";
						}
						delFlag = false;
					}
				}
				if(delFlag){
					result += AA.get("GCSPMC") + "  被删除 ; " ;
				}
			}
			for(int k=0; k<GCSPMC.size(); k++){
				result += GCSPMC.get(k) + "  新增; ";
			}
			result = result.replaceAll("null", "空");
			json.put("SPXGJL", result);
		}
		//驳回提交修改登陆单状态
		if(initField.contains("ZDR")&&"N".equals(FormTools.getJsonKey(json.get("SH")))&&!"D1".equals(json.get("S_VALUE"))){
			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
			DBObject query = new BasicDBObject();
			query.put("GCDLD01", json.get("GCDLD01").toString());
			query.put("GSXX01", json.get("GSXX01").toString());
			List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
			JSONObject GC_DJZT = new JSONObject();
			GC_DJZT.put("key", "合同待审核");
			GC_DJZT.put("value", "合同待审核");
			DBObject XGDJZT = new BasicDBObject();
			XGDJZT.put("GC_DJZT", GC_DJZT);
			dbCollection.update(query,new BasicDBObject("$set", XGDJZT));
			json.put("GC_DJZT", GC_DJZT);
		}
		
		JSONObject FHDLD = Json.toJO(json.get("FHDLD"));
		if("0".equals(FHDLD.get("key"))){
			json.put("S_VALUE", "D1");
			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
			DBObject query = new BasicDBObject();
			query.put("GCDLD01", json.get("GCDLD01").toString());
			query.put("GSXX01", json.get("GSXX01").toString());
			List titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
			JSONObject aa=Json.toJO(titleList.get(0));
			aa.remove("bdbh");
			aa.remove("jlbh");
			json.putAll(aa);
		}
		//控制不同版本必填项
		 jlConf.isRequired(json, "GCHT_BT");
		return true;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map saveBefore(Map json, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		Map userInfo = Authorization.getUserInfo(request);
		JSONObject GCLX = Json.toJO(json.get("GCLX"));
		if ("家用".equals(GCLX.get("value"))) {
			//家用工程登录单
			Map DLD_DATA = (Map) json.get("DLD_DATA");
			
			if (initField.contains("GCDLD01")&&!"D1".equals(json.get("S_VALUE"))){
				if (!"null".equals(DLD_DATA) && DLD_DATA != null) {
					Map workflowData = new HashMap(); 
					workflowData.put("bdbh", DLD_DATA.get("bdbh"));//工程登陆单表单编号 
					workflowData.put("GZL01", "9040");//工程登陆单工作流编号
					workflowData.put("jlbh", DLD_DATA.get("jlbh"));  //记录编号
					workflowData.put("PI_USERNAME", userInfo.get("CZY01")); //当前操作员,
					//workflowData.put("SessionID", request.getParameter("SessionID")); //当前操作员,
					//工程登录单跟进步骤
		        	workflowData.put("BZ01", "90404");//工作流步骤
	        	
		        	DLD_DATA.put("GC_DJZT", FormTools.newJson("合同待审核", "合同待审核"));
		        	DLD_DATA.put("HTDBBH", json.get("jlbh"));
		        	DLD_DATA.put("DLD", FormTools.newJson("合同", "合同"));
			        DLD_DATA.put("HTSCFJ", json.get("HTSCFJ"));

		        
		        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
		        	Map result = bdJK.saveRecord(workflowData, DLD_DATA);
		        	if (result.get("MSGID").equals("E")) {
		        		throw new RuntimeException((String) result.get("MESSAGE"));
		        	}
		        
		        	/*workflowData.put("BZ01", "90405");
					workflowData.put("PI_USERNAME", json.get("GSXX01").toString()+"sys"); //当前操作员,
		        	DBCollection dbCollection = MongodbHandler.getDB().getCollection("JL_SESSIONS");
					DBObject query = new BasicDBObject();
					query.put("username", json.get("GSXX01").toString()+"sys");
					List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
					for (int j = 0; j < titleList.size(); j++) {
						workflowData.put("SessionID", titleList.get(j).get("sessionid"));//当前操作员,
					}
		        	//系统自动把工程登录单封单G
	        		DLD_DATA.put("YS", FormTools.newJson("N", "不同意"));
	        		BdJK bdJK1 = SpringContextHolder.getBean("bdJK");
		        	Map result1 = bdJK1.saveRecord(workflowData, DLD_DATA);
		        	if (result1.get("MSGID").equals("E")) {
		        		throw new RuntimeException((String) result1.get("MESSAGE"));
		        	}*/
				} 
			}else if (initField.contains("SHR")&&!"D1".equals(json.get("S_VALUE"))){
				if ("Y".equals(FormTools.getJsonKey(json.get("SH")))&&!"D1".equals(json.get("S_VALUE"))) {
					mappingPart("form.scm.gcht.gchtsh", json);
					json.put("SPLB", FormTools.addWBTDH(json.get("SPLB")));
					JSONArray SPLB = Json.toJA(json.get("SPLB"));
					for (int i = 0; i < SPLB.size(); i++) {
						int GCSPBM=Integer.parseInt(SPLB.getJSONObject(i).get("GCSPBM").toString());
						int SPXX01=Integer.parseInt(SPLB.getJSONObject(i).get("SPXX01").toString());
						String  sql ="SELECT A.GCSPBM,B.SPXX01,B.SPXX02 SPDM,B.SPXX04 SPMC"
								+ " FROM GCSPDZ A,SPXX B WHERE MR='1' "+" AND A.SPXX01=B.SPXX01 "
								+ " AND A.GCBJ='"+GCLX.get("key")+"'"
								+ " AND A.GSXX01='"+json.get("GSXX01")+"' AND GCSPBM='"+GCSPBM+"'" ;
						List<Map> SPMXLIST = queryForList(scm, sql);
						if(SPMXLIST.size()==0){
							throw new RuntimeException("已经不存在"+GCSPBM+"工程商品");
						}
						int CXspxx01=Integer.parseInt(SPMXLIST.get(0).get("SPXX01").toString());
						if (SPXX01!=CXspxx01) {
							SPLB.getJSONObject(i).put("SPXX01", CXspxx01);
							SPLB.getJSONObject(i).put("SPMC", SPMXLIST.get(0).get("SPMC").toString());
							SPLB.getJSONObject(i).put("SPDM", SPMXLIST.get(0).get("SPDM").toString());
						}
					}
					for (int i = 0; i < SPLB.size(); i++) {
						double PFDJ=Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
						if (PFDJ<=0) {
							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品批复单价不能小于等于0");
						}
					}
		        	json.put("SPLB",SPLB);
		        	//限价判断
		        	DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		    		String gsxx01 = userInfo.get("GSXX01").toString();
		    		String czydm = userInfo.get("CZY01").toString();
		        	String RYXJJBsql = "SELECT RYXX06 FROM RYXX  WHERE RYXX01='"+czydm+"' and gsxx01='"+gsxx01+"'";
		    		List list = queryForList(scm, RYXJJBsql, null);
		    		int RYXX06 = 0;
		    		if (list.size()>0) {
		    			Map m = (HashMap)list.get(0);
		    			RYXX06 = Integer.parseInt(m.get("RYXX06").toString());
		    		}
		        	DBCollection GCSPXJdb = MongodbHandler.getDB().getCollection("SCM_GCSPXJ");
		        	String TSXX="";//提示信息
		        	int XJJB=0;
		        	try{
		        		if(RYXX06>0){
		        			for (int i = 0; i < SPLB.size(); i++) {
		        				DBObject xjquery = new BasicDBObject();
		        				xjquery.put("GSXX01",gsxx01);
		        				xjquery.put("GCSPBM",SPLB.getJSONObject(i).get("GCSPBM").toString());
		        				xjquery.put("S_VALUE", new BasicDBObject("$ne","D1"));
		        				List<DBObject> GCSPXJList = GCSPXJdb.find(xjquery,new BasicDBObject("_id", 0)).toArray();
		        				if (GCSPXJList.size()>0) {
		        					DBObject AA = GCSPXJList.get(0);
		        					double PFDJ=Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
		        					double pfxj1=Double.parseDouble(AA.get("PFXJ1").toString());
		        					double pfxj2=Double.parseDouble(AA.get("PFXJ2").toString());
		        					double pfxj3=Double.parseDouble(AA.get("PFXJ3").toString());
		        					double pfxj4=Double.parseDouble(AA.get("PFXJ4").toString());
		        					double pfxj5=Double.parseDouble(AA.get("PFXJ5").toString());
		        					if(PFDJ<pfxj1){
		        						XJJB=1;
		        						if(PFDJ<pfxj2){
		        							XJJB=2;
		        							if (PFDJ<pfxj3){
		        								XJJB=3;
		        								if (PFDJ<pfxj4){
		        									XJJB=4;
		        									if (PFDJ<pfxj5){
		        										XJJB=5;
		        									}
		        								}
		        							}
		        						}
		        					}
		        					if (RYXX06==1){
		        						if(PFDJ<pfxj1){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==2) {
		        						if(PFDJ<pfxj2){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==3) {
		        						if (PFDJ<pfxj3){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==4) {
		        						if (PFDJ<pfxj4){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==5) {
		        						if (PFDJ<pfxj5){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}
		        				}
		        			}
		        		}
		        	}catch (Exception e) {
		        		DBCollection HTdbCollection = MongodbHandler.getDB().getCollection("SCM_GCHT");
						DBObject XJXGquery = new BasicDBObject();
						XJXGquery.put("GCHTH01", json.get("GCHTH01").toString());
						XJXGquery.put("GSXX01", json.get("GSXX01").toString());
						List<DBObject> titleListaa = HTdbCollection.find(XJXGquery,new BasicDBObject("_id", 0)).toArray();
						DBObject XGDJZTaa = new BasicDBObject();
						XGDJZTaa.put("SPLB", SPLB);
						HTdbCollection.update(XJXGquery,new BasicDBObject("$set", XGDJZTaa));
		        		XJJB=XJJB+1;
						throw new RuntimeException(TSXX+"请限价"+XJJB+"级以上人审批。");
					}
					Map map = sendScmInboundInvoke("scmform.gcgl.gcdld.ins.up",json);
					System.out.println("调用接口成功");

					DBObject query = new BasicDBObject();
					query.put("GCDLD01", json.get("GCDLD01").toString());
					query.put("GSXX01", json.get("GSXX01").toString());
					List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
					JSONObject GC_DJZT = new JSONObject();
					GC_DJZT.put("key", "合同已审核");
					GC_DJZT.put("value", "合同已审核");
					DBObject XGDJZT = new BasicDBObject();
					XGDJZT.put("GC_DJZT", GC_DJZT);
					XGDJZT.put("SPLB", json.get("SPLB"));
					XGDJZT.put("SHSJ", json.get("SHSJ"));
					XGDJZT.put("HTXSFS", json.get("HTXSFS"));
					XGDJZT.put("HTSCFJ", json.get("HTSCFJ"));
					XGDJZT.put("HTQDRQ", json.get("HTQDRQ"));
					dbCollection.update(query,new BasicDBObject("$set", XGDJZT));
				}else if ("N".equals(FormTools.getJsonKey(json.get("SH")))&&!"D1".equals(json.get("S_VALUE"))){
					DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
					DBObject query = new BasicDBObject();
					query.put("GCDLD01", json.get("GCDLD01").toString());
					query.put("GSXX01", json.get("GSXX01").toString());
					List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
					JSONObject GC_DJZT = new JSONObject();
					GC_DJZT.put("key", "合同驳回");
					GC_DJZT.put("value", "合同驳回");
					DBObject XGDJZT = new BasicDBObject();
					XGDJZT.put("GC_DJZT", GC_DJZT);
					dbCollection.update(query,new BasicDBObject("$set", XGDJZT));
					json.put("GC_DJZT", GC_DJZT);
				}
			}
		}else{
			Map DLD_DATA = (Map) json.get("DLD_DATA");
			if (!"null".equals(DLD_DATA) && DLD_DATA != null) {
			//商用工程登录单
				Map workflowData = new HashMap(); 
				workflowData.put("bdbh", DLD_DATA.get("bdbh"));//工程登陆单表单编号 
				workflowData.put("GZL01", "9093");//工程登陆单工作流编号
				workflowData.put("jlbh", DLD_DATA.get("jlbh"));  //记录编号
				workflowData.put("PI_USERNAME", userInfo.get("CZY01")); //当前操作员
				//workflowData.put("SessionID", request.getParameter("SessionID")); //当前操作员,
			
				if (initField.contains("GCDLD01")&&!"D1".equals(json.get("S_VALUE"))){
				//工程登录单跟进步骤
					workflowData.put("BZ01", "90934");//工作流步骤
					DLD_DATA.put("GC_DJZT", FormTools.newJson("合同待审核", "合同待审核"));
					DLD_DATA.put("HTDBBH", json.get("jlbh"));
					DLD_DATA.put("DLD", FormTools.newJson("合同", "合同"));
					DLD_DATA.put("HTSCFJ", json.get("HTSCFJ"));
		        
					BdJK bdJK = SpringContextHolder.getBean("bdJK");
					Map result = bdJK.saveRecord(workflowData, DLD_DATA);
					if (result.get("MSGID").equals("E")) {
						throw new RuntimeException((String) result.get("MESSAGE"));
					}
		        
					/*workflowData.put("BZ01", "90935");  //工作流步骤
					workflowData.put("PI_USERNAME", json.get("GSXX01").toString()+"sys"); //当前操作员,
		        	DBCollection dbCollection = MongodbHandler.getDB().getCollection("JL_SESSIONS");
					DBObject query = new BasicDBObject();
					query.put("username", json.get("GSXX01").toString()+"sys");
					List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
					for (int j = 0; j < titleList.size(); j++) {
						workflowData.put("SessionID", titleList.get(j).get("sessionid"));//当前操作员,
					}
					DLD_DATA.put("YS", FormTools.newJson("N", "不同意"));
					BdJK bdJK1 = SpringContextHolder.getBean("bdJK");
					Map result1 = bdJK1.saveRecord(workflowData, DLD_DATA);
					if (result1.get("MSGID").equals("E")) {
						throw new RuntimeException((String) result.get("MESSAGE"));
					}*/
			}    
			}else if (initField.contains("SHR")&&!"D1".equals(json.get("S_VALUE"))){
				//工程登录单回复步骤编号
		        if("Y".equals(FormTools.getJsonKey(json.get("SH")))&&!"D1".equals(json.get("S_VALUE"))){
		        	mappingPart("form.scm.gcht.gchtsh", json);
					JSONArray SPLB = Json.toJA(json.get("SPLB"));
					for (int i = 0; i < SPLB.size(); i++) {
						int GCSPBM=Integer.parseInt(SPLB.getJSONObject(i).get("GCSPBM").toString());
						int SPXX01=Integer.parseInt(SPLB.getJSONObject(i).get("SPXX01").toString());
						String  sql ="SELECT A.GCSPBM,B.SPXX01,B.SPXX02 SPDM,B.SPXX04 SPMC"
								+ " FROM GCSPDZ A,SPXX B WHERE MR='1' "+" AND A.SPXX01=B.SPXX01 "
								+ " AND A.GCBJ='"+GCLX.get("key")+"'"
								+ " AND A.GSXX01='"+json.get("GSXX01")+"' AND GCSPBM='"+GCSPBM+"'" ;
						List<Map> SPMXLIST = queryForList(scm, sql);
						if(SPMXLIST.size()==0){
							throw new RuntimeException("已经不存在"+GCSPBM+"工程商品");
						}
						int CXspxx01=Integer.parseInt(SPMXLIST.get(0).get("SPXX01").toString());
						if (SPXX01!=CXspxx01) {
							SPLB.getJSONObject(i).put("SPXX01", CXspxx01);
							SPLB.getJSONObject(i).put("SPMC", SPMXLIST.get(0).get("SPMC").toString());
							SPLB.getJSONObject(i).put("SPDM", SPMXLIST.get(0).get("SPDM").toString());
						}
					}
					for (int i = 0; i < SPLB.size(); i++) {
						double PFDJ=Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
						if (PFDJ<=0) {
							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品批复单价不能小于等于0");
						}
					}
		        	json.put("SPLB",SPLB);
		        	json.put("SPLB",FormTools.addWBTDH(json.get("SPLB")));
		        	//限价判断
		        	DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		    		String gsxx01 = userInfo.get("GSXX01").toString();
		    		String czydm = userInfo.get("CZY01").toString();
		        	String RYXJJBsql = "SELECT RYXX06 FROM RYXX  WHERE RYXX01='"+czydm+"' and gsxx01='"+gsxx01+"'";
		    		List list = queryForList(scm, RYXJJBsql, null);
		    		int RYXX06 = 0;
		    		if (list.size()>0) {
		    			Map m = (HashMap)list.get(0);
		    			RYXX06 = Integer.parseInt(m.get("RYXX06").toString());
		    		}
		        	DBCollection GCSPXJdb = MongodbHandler.getDB().getCollection("SCM_GCSPXJ");
		        	String TSXX="";//提示信息
		        	int XJJB=0;
		        	try{
		        		if(RYXX06>0){
		        			for (int i = 0; i < SPLB.size(); i++) {
		        				DBObject xjquery = new BasicDBObject();
		        				xjquery.put("GSXX01",gsxx01);
		        				xjquery.put("GCSPBM",SPLB.getJSONObject(i).get("GCSPBM").toString());
		        				xjquery.put("S_VALUE", new BasicDBObject("$ne","D1"));
		        				List<DBObject> GCSPXJList = GCSPXJdb.find(xjquery,new BasicDBObject("_id", 0)).toArray();
		        				if (GCSPXJList.size()>0) {
		        					DBObject AA = GCSPXJList.get(0);
		        					double PFDJ=Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
		        					double pfxj1=Double.parseDouble(AA.get("PFXJ1").toString());
		        					double pfxj2=Double.parseDouble(AA.get("PFXJ2").toString());
		        					double pfxj3=Double.parseDouble(AA.get("PFXJ3").toString());
		        					double pfxj4=Double.parseDouble(AA.get("PFXJ4").toString());
		        					double pfxj5=Double.parseDouble(AA.get("PFXJ5").toString());
		        					if(PFDJ<pfxj1){
		        						XJJB=1;
		        						if(PFDJ<pfxj2){
		        							XJJB=2;
		        							if (PFDJ<pfxj3){
		        								XJJB=3;
		        								if (PFDJ<pfxj4){
		        									XJJB=4;
		        									if (PFDJ<pfxj5){
		        										XJJB=5;
		        									}
		        								}
		        							}
		        						}
		        					}
		        					if (RYXX06==1){
		        						if(PFDJ<pfxj1){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==2) {
		        						if(PFDJ<pfxj2){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==3) {
		        						if (PFDJ<pfxj3){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==4) {
		        						if (PFDJ<pfxj4){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}else if (RYXX06==5) {
		        						if (PFDJ<pfxj5){
		        							TSXX=SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，";
		        							throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM")+"工程商品超出本账号的限价"+XJJB+"级别，");
		        						}
		        					}
		        				}
		        			}
		        		}
		        	}catch (Exception e) {
		        		DBCollection HTdbCollection = MongodbHandler.getDB().getCollection("SCM_GCHT");
						DBObject XJXGquery = new BasicDBObject();
						XJXGquery.put("GCHTH01", json.get("GCHTH01").toString());
						XJXGquery.put("GSXX01", json.get("GSXX01").toString());
						List<DBObject> titleListaa = HTdbCollection.find(XJXGquery,new BasicDBObject("_id", 0)).toArray();
						DBObject XGDJZTaa = new BasicDBObject();
						XGDJZTaa.put("SPLB", SPLB);
						HTdbCollection.update(XJXGquery,new BasicDBObject("$set", XGDJZTaa));
		        		XJJB=XJJB+1;
						throw new RuntimeException(TSXX+"请限价"+XJJB+"级以上人审批。");
					}
		        	Map map = sendScmInboundInvoke("scmform.gcgl.gcdld.ins.up", json);
		        	System.out.println("调用接口成功");
		        	
					DBObject query = new BasicDBObject();
					query.put("GCDLD01", json.get("GCDLD01").toString());
					query.put("GSXX01", json.get("GSXX01").toString());
					List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
					JSONObject GC_DJZT = new JSONObject();
					GC_DJZT.put("key", "合同已审核");
					GC_DJZT.put("value", "合同已审核");
					DBObject XGDJZT = new BasicDBObject();
					XGDJZT.put("GC_DJZT", GC_DJZT);
					XGDJZT.put("SPLB", json.get("SPLB"));
					XGDJZT.put("SHSJ", json.get("SHSJ"));
					XGDJZT.put("HTXSFS", json.get("HTXSFS"));
					XGDJZT.put("HTSCFJ", json.get("HTSCFJ"));
					XGDJZT.put("HTQDRQ", json.get("HTQDRQ"));
					dbCollection.update(query,new BasicDBObject("$set", XGDJZT));
		        }else if ("N".equals(FormTools.getJsonKey(json.get("SH")))&&!"D1".equals(json.get("S_VALUE"))){
					DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
					DBObject query = new BasicDBObject();
					query.put("GCDLD01", json.get("GCDLD01").toString());
					query.put("GSXX01", json.get("GSXX01").toString());
					List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
					JSONObject GC_DJZT = new JSONObject();
					GC_DJZT.put("key", "合同驳回");
					GC_DJZT.put("value", "合同驳回");
					DBObject XGDJZT = new BasicDBObject();
					XGDJZT.put("GC_DJZT", GC_DJZT);
					dbCollection.update(query,new BasicDBObject("$set", XGDJZT));
					json.put("GC_DJZT", GC_DJZT);
				}
			}
		}
        json.remove("DLD_DATA");
        DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
        DBObject query = new BasicDBObject();
        if ("D1".equals(json.get("S_VALUE"))) {
			query.put("GCDLD01", json.get("GCDLD01").toString());
			query.put("GSXX01", json.get("GSXX01").toString());
			List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
			JSONObject GC_DJZT = new JSONObject();
			GC_DJZT.put("key", "单据已删除");
			GC_DJZT.put("value", "单据已删除");
			DBObject XGDJZT = new BasicDBObject();
			XGDJZT.put("GC_DJZT", GC_DJZT);
			XGDJZT.put("YXBJ", "无效");
			dbCollection.update(query,new BasicDBObject("$set", XGDJZT));
			json.put("GC_DJZT", GC_DJZT);
			json.put("YXBJ", "无效");
		}
        JSONObject FHDLD = Json.toJO(json.get("FHDLD"));
        if ("D1".equals(json.get("S_VALUE"))&&"0".equals(FHDLD.get("key"))){
        	json.remove("GC_DJZT");
        	json.remove("YXBJ");
        	json.remove("DQR");
        	json.remove("BHQ");
        	json.remove("YQCS");
        	json.remove("DLD");
        	json.remove("YS");
        	json.remove("HTDBBH");
        	dbCollection.remove(query);
        }
		return null;
	}
}