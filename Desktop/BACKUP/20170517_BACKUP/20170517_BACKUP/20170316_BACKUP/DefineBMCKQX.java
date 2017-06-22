package com.jlsoft.framework.admin.scm.jcdy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.jlsoft.framework.admin.scm.pub.adapter.ScmFormAdapter;
import com.jlsoft.framework.aop.Authorization;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.mdm.access.AccessExtender;
import com.jlsoft.framework.util.JLText;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
 
@Controller
@RequestMapping("/DefineBMCKQX")
@Service("scmDefineBMCKQX")
public class DefineBMCKQX extends ScmFormAdapter {
	private JLText lang = new JLText();
	@Override
	@SuppressWarnings({ "rawtypes"})
	public Boolean check(Map json, int bdbh, HttpServletRequest request)
			throws Exception {
		//FormTools.isNullException(json.get("QXMC"), "权限名称不能为空");
		if (FormTools.isNull(json.get("QXMC"))){
			throw new RuntimeException(lang.getText("权限名称不能为空！"));
		}
		return true;
	}
	
	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Boolean insertBefore(Map json, int bdbh, HttpServletRequest request)
			throws Exception {		
	//	Map json = FormTools.mapperToMap(XmlData);
		Map userInfo = Authorization.getUserInfo(request);

		Map returnMap = new HashMap();
		Map scmMap = new HashMap();
		try{
			//验证数据是否规范
			if (FormTools.isNull(json.get("QXMC"))){
				throw new RuntimeException(lang.getText("权限名称不能为空！"));
			}
			if (FormTools.isNull(json.get("GSXX01"))||json.get("GSXX01").toString().equals("{ }")||json.get("GSXX01").toString().equals("{}")){
				throw new RuntimeException(lang.getText("所属公司不能为空！"));
			}
			if (!FormTools.isNull(json.get("QXMC"))){
				if (json.get("QXMC").toString().length() > 50){
					throw new RuntimeException(lang.getText("权限过长，重新输入！"));
				}
			}
			//插入数据
		///	int jlbh = FormTools.getJLBH("SCM_BMCKQX");
			json.put("QX01", json.get("jlbh")); 
			
			//SCM接口
			scmMap.put("QXI01", json.get("jlbh"));
			scmMap.put("QXI02", json.get("QXMC"));
			scmMap.put("GSXX01", FormTools.getJsonKey(json.get("GSXX01")));
			
			String SHWD = null;
			if (!FormTools.isNull(json.get("SHWD"))){
				JSONArray shwdArrayList = Json.toJA(json.get("SHWD"));
				for (int i=0;i<shwdArrayList.size();i++){
					Map shwdMap = new HashMap();
					shwdMap = (Map)shwdArrayList.get(i);
					String SHWD_KEY = shwdMap.get("key").toString();
					
					if (SHWD == null){
						SHWD = SHWD_KEY;
					}else{
						SHWD += ";" + SHWD_KEY;
					} 
				}
				scmMap.put("QXI05", SHWD);
			}
			String FWWD = null;
			if (!FormTools.isNull(json.get("FWWD"))){
				JSONArray fwwdArrayList = Json.toJA(json.get("FWWD"));
				for (int i=0;i<fwwdArrayList.size();i++){
					Map fwwdMap = new HashMap();
					fwwdMap = (Map)fwwdArrayList.get(i);
					String FWWD_KEY = fwwdMap.get("key").toString();
					
					if (FWWD == null){
						FWWD = FWWD_KEY;
					}else{
						FWWD += ";" + FWWD_KEY;
					} 
				}
				scmMap.put("QXI06", FWWD);
			}
			
			String CK = null;
			if (!FormTools.isNull(json.get("CK"))){
				JSONArray ckArrayList = Json.toJA(json.get("CK"));
				for (int i=0;i<ckArrayList.size();i++){
					Map ckMap = new HashMap();
					ckMap = (Map)ckArrayList.get(i);
					if (CK == null){
						CK = ckMap.get("key").toString();
					}else{
						CK = CK + ";" +ckMap.get("key").toString();
					} 
				}
				scmMap.put("QXI04", CK);
			}
			 
			String BM = null;
			if (!FormTools.isNull(json.get("BM"))){
				JSONArray bmArrayList = Json.toJA(json.get("BM"));
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (BM == null){
						BM = bmMap.get("key").toString();
					}else{
						BM = BM + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("QXI03", BM);
			}
			
			sendScmInboundInvoke("scmform.qxgl.qxitem.insert", scmMap);
			 System.out.println(returnMap);
			returnMap.put("returnMap","1");
		}catch(Exception ex){
			returnMap.put("returnMap","-1");
			throw ex;
		}
		
		return true;
	}
	@Override
	@SuppressWarnings("rawtypes")
	public Boolean updateBefore(Map json, int bdbh, HttpServletRequest request)
			throws Exception {
		Map userInfo = Authorization.getUserInfo(request);
		Map returnMap = new HashMap();
		Map scmMap = new HashMap();
		try{
			//验证数据是否规范
			if (FormTools.isNull(json.get("QXMC"))){
				throw new RuntimeException(lang.getText("权限名称不能为空！"));
			}
			if (FormTools.isNull(json.get("GSXX01"))||json.get("GSXX01").toString().equals("{ }")||json.get("GSXX01").toString().equals("{}")){
				throw new RuntimeException(lang.getText("所属公司不能为空！"));
			}
			
			//修改MOGO
			/*DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_BMCKQX");
			DBObject update = new BasicDBObject(json);*/
			
			/*DBObject query = new BasicDBObject();
			query.put("jlbh", json.get("jlbh")); 
			dbCollection.update(query, new BasicDBObject("$set", update));*/
			 
			//SCM接口
			scmMap.put("QXI01", json.get("QX01"));
			scmMap.put("QXI02", json.get("QXMC"));
			scmMap.put("GSXX01", FormTools.getJsonKey(json.get("GSXX01")));
			
			String SHWD = null;
			if (!FormTools.isNull(json.get("SHWD"))){
				JSONArray shwdArrayList = Json.toJA(json.get("SHWD"));
				for (int i=0;i<shwdArrayList.size();i++){
					Map shwdMap = new HashMap();
					shwdMap = (Map)shwdArrayList.get(i);
					String SHWD_KEY = shwdMap.get("key").toString();
					
					if (SHWD == null){
						SHWD = SHWD_KEY;
					}else{
						SHWD += ";" + SHWD_KEY;
					} 
				}
				scmMap.put("QXI05", SHWD);
			}
			
			String FWWD = null;
			if (!FormTools.isNull(json.get("FWWD"))){
				JSONArray fwwdArrayList = Json.toJA(json.get("FWWD"));
				for (int i=0;i<fwwdArrayList.size();i++){
					Map fwwdMap = new HashMap();
					fwwdMap = (Map)fwwdArrayList.get(i);
					String FWWD_KEY = fwwdMap.get("key").toString();
					
					if (FWWD == null){
						FWWD = FWWD_KEY;
					}else{
						FWWD += ";" + FWWD_KEY;
					}
				}
				scmMap.put("QXI06", FWWD);
			}
			
			String CK = null;
			if (!FormTools.isNull(json.get("CK"))){
				JSONArray ckArrayList = Json.toJA(json.get("CK"));
				for (int i=0;i<ckArrayList.size();i++){
					Map ckMap = new HashMap();
					ckMap = (Map)ckArrayList.get(i);
					if (CK == null){
						CK = ckMap.get("key").toString();
					}else{
						CK = CK + ";" +ckMap.get("key").toString();
					}
				}
				scmMap.put("QXI04", CK);
			}
			 
			String BM = null;
			if (!FormTools.isNull(json.get("BM"))){
				JSONArray bmArrayList = Json.toJA(json.get("BM"));
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (BM == null){
						BM = bmMap.get("key").toString();
					}else{
						BM = BM + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("QXI03", BM);
			}
			sendScmInboundInvoke("scmform.qxgl.qxitem.update", scmMap);
			
			returnMap.put("returnMap","1");
		}catch(Exception ex){
			returnMap.put("returnMap","-1");
			throw ex;
		}
		
		return true;
	}

	/**
	 * 定义部门仓库权限
	 * @param 
	 * @throws Exception
	 */
/*	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertBMCKQX")
	public Map insertBMCKQX(String XmlData, HttpServletRequest request) throws Exception {  
		Map json = FormTools.mapperToMap(XmlData);
		Map userInfo = Authorization.getUserInfo(request);

		Map returnMap = new HashMap();
		Map scmMap = new HashMap();
		try{
			//验证数据是否规范
			if (FormTools.isNull(json.get("QXMC"))){
				throw new RuntimeException("权限名称不能为空！");
			}
			if (FormTools.isNull(json.get("GSXX01"))||json.get("GSXX01").toString().equals("{ }")||json.get("GSXX01").toString().equals("{}")){
				throw new RuntimeException("所属公司不能为空！");
			}
			if (!FormTools.isNull(json.get("QXMC"))){
				if (json.get("QXMC").toString().length() > 50){
					throw new RuntimeException("权限过长，重新输入！");
				}
			}
			//String gs = userInfo.get("GSXX01").toString();
			//插入数据
			int jlbh = FormTools.getJLBH("SCM_BMCKQX");
			json.put("QX01", jlbh); 
			
//			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_BMCKQX");
//			DBObject insert = new BasicDBObject(json);
//			dbCollection.insert(insert);
			
			//SCM接口
			scmMap.put("QXI01", json.get("QX01"));
			scmMap.put("QXI02", json.get("QXMC"));
			scmMap.put("GSXX01", FormTools.getJsonKey(json.get("GSXX01")));
			
			String SHWD = null;
			if (!FormTools.isNull(json.get("SHWD"))){
				JSONArray shwdArrayList = Json.toJA(json.get("SHWD"));
				for (int i=0;i<shwdArrayList.size();i++){
					Map shwdMap = new HashMap();
					shwdMap = (Map)shwdArrayList.get(i);
					String SHWD_KEY = shwdMap.get("key").toString();
					
					if (SHWD == null){
						SHWD = SHWD_KEY;
					}else{
						SHWD += ";" + SHWD_KEY;
					} 
				}
				scmMap.put("QXI05", SHWD);
			}
			String SSGS = null;
			if (!FormTools.isNull(json.get("GSXX01"))){
				JSONArray bmArrayList = Json.toJA(json.get("GSXX01"));
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (SSGS == null){
						SSGS = bmMap.get("key").toString();
					}else{
						SSGS = SSGS + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("GSXX01", SSGS);
			}
			String FWWD = null;
			if (!FormTools.isNull(json.get("FWWD"))){
				JSONArray fwwdArrayList = Json.toJA(json.get("FWWD"));
				for (int i=0;i<fwwdArrayList.size();i++){
					Map fwwdMap = new HashMap();
					fwwdMap = (Map)fwwdArrayList.get(i);
					String FWWD_KEY = fwwdMap.get("key").toString();
					
					if (FWWD == null){
						FWWD = FWWD_KEY;
					}else{
						FWWD += ";" + FWWD_KEY;
					} 
				}
				scmMap.put("QXI06", FWWD);
			}
			
			String CK = null;
			if (!FormTools.isNull(json.get("CK"))){
				JSONArray ckArrayList = Json.toJA(json.get("CK"));
				for (int i=0;i<ckArrayList.size();i++){
					Map ckMap = new HashMap();
					ckMap = (Map)ckArrayList.get(i);
					if (CK == null){
						CK = ckMap.get("key").toString();
					}else{
						CK = CK + ";" +ckMap.get("key").toString();
					} 
				}
				scmMap.put("QXI04", CK);
			}
			 
			String BM = null;
			if (!FormTools.isNull(json.get("BM"))){
				JSONArray bmArrayList = Json.toJA(json.get("BM"));
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (BM == null){
						BM = bmMap.get("key").toString();
					}else{
						BM = BM + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("QXI03", BM);
			}
			
			System.out.print(scmMap.toString());
			if (!FormTools.isNull(scmMap)){
				throw new RuntimeException(scmMap.toString());
			}
			sendScmInboundInvoke("scmform.qxgl.qxitem.insert", scmMap);
			 
			returnMap.put("returnMap","1");
		}catch(Exception ex){
			returnMap.put("returnMap","-1");
			throw ex;
		}
		return returnMap;
	}
	*/
	/**
	 * 定义部门仓库权限
	 * @param 
	 * @throws Exception
	 */
	/*@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/updateBMCKQX")
	public Map updateBMCKQX(String XmlData, HttpServletRequest request) throws Exception {  
		Map json = FormTools.mapperToMap(XmlData);
		Map userInfo = Authorization.getUserInfo(request);
		//int jlbh = FormTools.getJLBH("SCM_BMCKQX");
		//json.put("jlbh", jlbh);
		//json.put("QX01", jlbh);
		Map returnMap = new HashMap();
		Map scmMap = new HashMap();
		try{
			//验证数据是否规范
			if (FormTools.isNull(json.get("QXMC"))){
				throw new RuntimeException("权限名称不能为空！");
			}
			if (FormTools.isNull(json.get("GSXX01"))||json.get("GSXX01").toString().equals("{ }")||json.get("GSXX01").toString().equals("{}")){
				throw new RuntimeException("所属公司不能为空！");
			}
			
			//修改MOGO
			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_BMCKQX");
			DBObject update = new BasicDBObject(json);
			
			DBObject query = new BasicDBObject();
			query.put("jlbh", json.get("jlbh")); 
			dbCollection.update(query, new BasicDBObject("$set", update));
			 
			//SCM接口
			scmMap.put("QXI01", json.get("QX01"));
			scmMap.put("QXI02", json.get("QXMC"));
			scmMap.put("GSXX01", FormTools.getJsonKey(json.get("GSXX01")));
			
			String SHWD = null;
			if (!FormTools.isNull(json.get("SHWD"))){
				JSONArray shwdArrayList = Json.toJA(json.get("SHWD"));
				for (int i=0;i<shwdArrayList.size();i++){
					Map shwdMap = new HashMap();
					shwdMap = (Map)shwdArrayList.get(i);
					String SHWD_KEY = shwdMap.get("key").toString();
					
					if (SHWD == null){
						SHWD = SHWD_KEY;
					}else{
						SHWD += ";" + SHWD_KEY;
					} 
				}
				scmMap.put("QXI05", SHWD);
			}
			
			String FWWD = null;
			if (!FormTools.isNull(json.get("FWWD"))){
				JSONArray fwwdArrayList = Json.toJA(json.get("FWWD"));
				for (int i=0;i<fwwdArrayList.size();i++){
					Map fwwdMap = new HashMap();
					fwwdMap = (Map)fwwdArrayList.get(i);
					String FWWD_KEY = fwwdMap.get("key").toString();
					
					if (FWWD == null){
						FWWD = FWWD_KEY;
					}else{
						FWWD += ";" + FWWD_KEY;
					}
				}
				scmMap.put("QXI06", FWWD);
			}
			
			String CK = null;
			if (!FormTools.isNull(json.get("CK"))){
				JSONArray ckArrayList = Json.toJA(json.get("CK"));
				for (int i=0;i<ckArrayList.size();i++){
					Map ckMap = new HashMap();
					ckMap = (Map)ckArrayList.get(i);
					if (CK == null){
						CK = ckMap.get("key").toString();
					}else{
						CK = CK + ";" +ckMap.get("key").toString();
					}
				}
				scmMap.put("QXI04", CK);
			}
			 
			String BM = null;
			if (!FormTools.isNull(json.get("BM"))){
				JSONArray bmArrayList = Json.toJA(json.get("BM"));
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (BM == null){
						BM = bmMap.get("key").toString();
					}else{
						BM = BM + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("QXI03", BM);
			}
			String SSGS = null;
			if (!FormTools.isNull(json.get("GSXX01"))){
				JSONArray bmArrayList = Json.toJA(json.get("GSXX01"));
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (SSGS == null){
						SSGS = bmMap.get("key").toString();
					}else{
						SSGS = SSGS + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("GSXX01", SSGS);
			}
			sendScmInboundInvoke("scmform.qxgl.qxitem.update", scmMap);
			
			returnMap.put("returnMap","1");
		}catch(Exception ex){
			returnMap.put("returnMap","-1");
			throw ex;
		}
		return returnMap;
	}*/
	
	//获取所属公司所有网点
	public String getSSGSALLWD(String SSGS, String WDLX, Map userInfo) throws Exception {
		String sql = "SELECT WM_CONCAT(FWWD01) WDKEY FROM CSS_FWWD WHERE WDLX = '"+WDLX+"' ";
		if("NO".equals(SSGS)){
			sql += " AND GSXX01 IS NULL ";
		}else{
			sql += " AND GSXX01 = '"+ SSGS +"'";
		}
		if("0".equals(WDLX)){
			sql += " JL{CZY|FWWD01|PSWD_CZ|LIKE%}JL ";
		}else if("1".equals(WDLX)){
			sql += " JL{CZY|FWWD01|AZWD_CZ|LIKE%}JL ";
		}
		Map values = new HashMap();
		values.put("GSXX01", userInfo.get("GSXX01"));
		values.put("PersonID", userInfo.get("CZY01"));
		values.put("CompanyID", userInfo.get("GSXX01"));
    	
		sql = AccessExtender.extendPlaceHolders(sql, values);//替换权限代码
		sql = AccessExtender.clearPlaceHolders(sql);//清理权限替代字符串	
		
		String WDKEY = "";
		try {
			WDKEY = queryForMap(scm, sql).get("WDKEY").toString();
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e.getMessage());
		}
		return WDKEY;
	}
	
	/**
	 * 定义部门仓库权限
	 * @param 
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/deleteBMCKQX")
	public Map deleteBMCKQX(String XmlData, HttpServletRequest request) throws Exception {  
		Map json = FormTools.mapperToMap(XmlData);
		Map userInfo = Authorization.getUserInfo(request);

		Map returnMap = new HashMap();
		Map scmMap = new HashMap();
		try{ 
			//修改MOGO
			json.put("S_VALUE", "D1");
			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_BMCKQX");
			DBObject update = new BasicDBObject(json);
			
			DBObject query = new BasicDBObject();
			query.put("jlbh", json.get("jlbh")); 
			dbCollection.update(query, new BasicDBObject("$set", update));
			 
			//SCM接口
			scmMap.put("QX01", json.get("jlbh"));
			scmMap.put("QXI01", json.get("jlbh"));
			scmMap.put("QXI02", json.get("QXMC"));
			//scmMap.put("GSXX01", json.get("GSXX01"));
			//scmMap.put("GSXX01", FormTools.getJsonKey(json.get("GSXX01")));
			
			String SHWD = null;
			if (!FormTools.isNull(json.get("SHWD"))){
				ArrayList shwdArrayList = new ArrayList(); 
				shwdArrayList = (ArrayList)json.get("SHWD");  
				for (int i=0;i<shwdArrayList.size();i++){
					Map shwdMap = new HashMap();
					shwdMap = (Map)shwdArrayList.get(i);
					String SHWD_KEY = shwdMap.get("key").toString();
					
					if (SHWD == null){
						SHWD = SHWD_KEY;
					}else{
						SHWD += ";" + SHWD_KEY;
					} 
				}
				scmMap.put("QXI05", SHWD);
			}
			String SSGS = null;
			if (!FormTools.isNull(json.get("GSXX01"))){
				if(json.get("GSXX01") instanceof String){
					scmMap.put("GSXX01", json.get("GSXX01"));
				}else if (json.get("GSXX01") instanceof Map){
					JSONArray bmArrayList = Json.toJA(json.get("GSXX01"));
					for (int i=0;i<bmArrayList.size();i++){
						Map bmMap = new HashMap();
						bmMap = (Map)bmArrayList.get(i);
						if (SSGS == null){
							SSGS = bmMap.get("key").toString();
						}else{
							SSGS = SSGS + ";" +bmMap.get("key").toString();
						} 
					}
					scmMap.put("GSXX01", SSGS);
				}else{
					scmMap.put("GSXX01", "{}");
				}
			}else{
				scmMap.put("GSXX01", "{}");
			}
			String FWWD = null;
			if (!FormTools.isNull(json.get("FWWD"))){
				ArrayList fwwdArrayList = new ArrayList(); 
				fwwdArrayList = (ArrayList)json.get("FWWD");  
				for (int i=0;i<fwwdArrayList.size();i++){
					Map fwwdMap = new HashMap();
					fwwdMap = (Map)fwwdArrayList.get(i);
					String FWWD_KEY = fwwdMap.get("key").toString();
					
					if (FWWD == null){
						FWWD = FWWD_KEY;
					}else{
						FWWD += ";" + FWWD_KEY;
					} 
				}
				scmMap.put("QXI06", FWWD);
			}
			
			String CK = null;
			if (!FormTools.isNull(json.get("CK"))){
				ArrayList ckArrayList = new ArrayList(); 
				ckArrayList = (ArrayList)json.get("CK");  
				for (int i=0;i<ckArrayList.size();i++){
					Map ckMap = new HashMap();
					ckMap = (Map)ckArrayList.get(i);
					if (CK == null){
						CK = ckMap.get("key").toString();
					}else{
						CK = CK + ";" +ckMap.get("key").toString();
					} 
				}
				scmMap.put("QXI04", CK);
			}
			 
			String BM = null;
			if (!FormTools.isNull(json.get("BM"))){
				ArrayList bmArrayList = new ArrayList(); 
				bmArrayList = (ArrayList)json.get("BM");  
				for (int i=0;i<bmArrayList.size();i++){
					Map bmMap = new HashMap();
					bmMap = (Map)bmArrayList.get(i);
					if (BM == null){
						BM = bmMap.get("key").toString();
					}else{
						BM = BM + ";" +bmMap.get("key").toString();
					} 
				}
				scmMap.put("QXI03", BM);
			}
			sendScmInboundInvoke("scmform.qxgl.qxitem.delete", scmMap);
			
			returnMap.put("returnMap","1");
		}catch(Exception ex){
			returnMap.put("returnMap","-1");
			throw ex;
		}
		return returnMap;
	}
}


