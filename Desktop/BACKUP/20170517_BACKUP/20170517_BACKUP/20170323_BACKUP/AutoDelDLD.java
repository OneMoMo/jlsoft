package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.aop.SpringContextHolder;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.pi.bdjk.BdJK;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Component
@RequestMapping("/AutoDelDLD")
public class AutoDelDLD extends FormHandler{

	/**
	 * 工程登陆的家用延期功能
	 * @param XmlData
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCDLDJYYQ.do")
	public List getGCDLDJYYQ(String XmlData, HttpServletRequest request) throws Exception{
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		//转换提日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today =  dateFormat.format(DQdate).toString();//当天日期
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "1");
		query.put("DYDLBJ.key", "0");
		query.put("S_VALUE", new BasicDBObject("$ne","D1"));
		query.put("ZFZT", new BasicDBObject("$ne",1));
		if (!FormTools.isNull(json.get("GCDLD01"))){
			query.put("GCDLD01", json.get("GCDLD01"));
		}
		
		System.out.print("query:"+query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query,new BasicDBObject("_id", 0)).toArray();
		
		//获取到期日和延期次数
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_JY");
		List jlconfList = selSwitchList(DJLX.toJSONString());
		JSONObject jlconfs = Json.toJO(jlconfList.get(0));
		int YQTS = 0,YQCS = 0;
		for(int i = 0;i<jlconfs.size();i++){
			JSONObject jlconf = Json.toJO(jlconfs.get(i));
			if("JY_YQTS".equals(jlconf.get("JLCO08").toString())){
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
			if("JY_YQCS".equals(jlconf.get("JLCO08").toString())){
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}
		
		System.out.println("-----------工程保护期延期接口执行日："+today+"-----------------------------");
		for (int i = 0; i < gcdldList.size(); i++) {
			JSONObject updataJson = new JSONObject();
			
			DBObject find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			//获取到期日
			SimpleDateFormat simp = new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
			Date date = new Date(simp.parse(gcdldObj.get("SBSJ").toString()).getTime());
			
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			
			//延期天数
			cal.add(Calendar.DATE, (YQTS*YQCS)+YQTS);
			
			//延期次数
			if (gcdldObj.get("YQCS")==null){
				YQCS = 0;
			}else{
				if (!FormTools.isNull(gcdldObj.get("YQCS"))){
					if (JLTools.strToInt(gcdldObj.get("YQCS").toString()) <= YQCS){ 
						YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
					}
				}else{
					YQCS = 0;
				} 
			}
			
			//到期日
			String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
			updataJson.put("DQR", DQR);
			
			//保护期 
			long BHQ =  JLTools.getDistanceDays(today, DQR); 
			updataJson.put("BHQ", BHQ);
			
			int sjc = JLTools.comparedate(today,DQR,"yyyy-MM-dd");

			
			
			//超期了
			if(sjc == 1){
				updataJson.put("ZFZT", "1"); 
				
				Map workflowData = new HashMap();  
				workflowData.put("bdbh", gcdldObj.get("bdbh"));//工程登陆单表单编号 
				workflowData.put("GZL01", "9040");//工程登陆单工作流编号
				workflowData.put("jlbh", gcdldObj.get("jlbh"));  //记录编号
				workflowData.put("BZ01", "90404");
				workflowData.put("PI_USERNAME", gcdldObj.get("GSXX01").toString()+"sys"); //当前操作员,
				
				gcdldObj.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
				gcdldObj.put("DLD", FormTools.newJson("超期", "超期"));

	        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
	        	//不需要截取报错，继续运行
	        	bdJK.saveRecord(workflowData,gcdldObj.toMap());
			}
			
			//没过期  则修改单据的延期次数和到期日  保护期
			DBObject update = new BasicDBObject("$set",updataJson);
			dbscm_gcdld.update(find, update); 
		}
		
		List baobiaoSJ = new ArrayList();//最终展示的List
		List<DBObject> lsList = new ArrayList<DBObject>();
		DBObject s = new BasicDBObject();
		s.put("家用工程登录单作废执行成功","success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}
	
	
	
	
	/**
	 * 工程登陆的商用延期功能
	 * @param XmlData
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCDLDSYYQ.do")
	public List getGCDLDSYYQ(String XmlData, HttpServletRequest request) throws Exception{
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		//转换提日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today =  dateFormat.format(DQdate).toString();//当天日期
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "2");
		query.put("DYDLBJ.key", "0");
		query.put("S_VALUE", new BasicDBObject("$ne","D1"));
		query.put("ZFZT", new BasicDBObject("$ne",1));
		if (!FormTools.isNull(json.get("GCDLD01"))){
			query.put("GCDLD01", json.get("GCDLD01"));
		}
		
		System.out.print("query:"+query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query,new BasicDBObject("_id", 0)).toArray();
		
		//获取到期日和延期次数
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_SY");
		List jlconfList = selSwitchList(DJLX.toJSONString());
		JSONObject jlconfs = Json.toJO(jlconfList.get(0));
		int YQTS = 0,YQCS = 0;
		for(int i = 0;i<jlconfs.size();i++){
			JSONObject jlconf = Json.toJO(jlconfs.get(i));
			if("SY_YQTS".equals(jlconf.get("JLCO08").toString())){
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
			if("SY_YQCS".equals(jlconf.get("JLCO08").toString())){
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}
		
		System.out.println("-----------工程保护期延期接口执行日："+today+"-----------------------------");
		for (int i = 0; i < gcdldList.size(); i++) {
			JSONObject updataJson = new JSONObject();
			
			DBObject find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			//获取到期日
			SimpleDateFormat simp = new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
			Date date = new Date(simp.parse(gcdldObj.get("SBSJ").toString()).getTime());
			
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			
			//延期天数
			cal.add(Calendar.DATE, (YQTS*YQCS)+YQTS);
			
			//延期次数
			if (gcdldObj.get("YQCS")==null){
				YQCS = 0;
			}else{
				if (!FormTools.isNull(gcdldObj.get("YQCS"))){
					if (JLTools.strToInt(gcdldObj.get("YQCS").toString()) <= YQCS){ 
						YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
					}
				}else{
					YQCS = 0;
				} 
			}
			
			//到期日
			String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
			updataJson.put("DQR", DQR);
			
			//保护期 
			long BHQ =  JLTools.getDistanceDays(today, DQR); 
			updataJson.put("BHQ", BHQ);
			
			int sjc = JLTools.comparedate(today,DQR,"yyyy-MM-dd");
			
			//超期了
			if(sjc == 1){
				updataJson.put("ZFZT", "1"); 
				
				Map workflowData = new HashMap(); 
				workflowData.put("bdbh", gcdldObj.get("bdbh"));//商用工程登陆单表单编号 
				workflowData.put("GZL01", "9093");//商用工程登陆单工作流编号
				workflowData.put("jlbh", gcdldObj.get("jlbh"));  //记录编号
				workflowData.put("BZ01", "90934");//工作流步骤
				workflowData.put("PI_USERNAME", gcdldObj.get("GSXX01").toString()+"sys"); //当前操作员
				
				gcdldObj.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
				gcdldObj.put("DLD", FormTools.newJson("超期", "超期"));

	        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
	        	bdJK.saveRecord(workflowData,gcdldObj.toMap());
			}
			
			//没过期  则修改单据的延期次数和到期日  保护期
			DBObject update = new BasicDBObject("$set",updataJson);
			dbscm_gcdld.update(find, update); 
		}
		
		List baobiaoSJ = new ArrayList();//最终展示的List
		List<DBObject> lsList = new ArrayList<DBObject>();
		DBObject s = new BasicDBObject();
		s.put("家用工程登录单作废执行成功","success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}
	

	
	/**
	 * 去数据库查询保护期及延期天数等字段
	 * @param XmlData  单据类型
	 * @return
	 * @throws Exception
	 */
	public Map selSwitch(String XmlData) throws Exception{
		Map json = FormTools.mapperToMap(XmlData);
		String sql="SELECT JLCO12,JLCO04,JLCO08" +
		           "  FROM VIEW_JLCONF " + 
		           " WHERE JLCO02='" +  json.get("DJLX") + "'";
		if (!JLTools.isNull(json.get("DJZD"))){
			sql = sql + "   AND JLCO08='" + json.get("DJZD") + "'";
		}
		if (!JLTools.isNull(json.get("GSXX01"))){
			sql = sql + "   AND (GSXX01='" + json.get("GSXX01") + "' OR GSXX01 is null)";
		}
		System.out.print(sql);
		//returnMap = queryForMap(scm, sql, null); 
		List list = queryForList(scm, sql, null); 
		
		Map result = new HashMap();
		result.put("resultlist", list);
		return result;
	}
	
	
	@RequestMapping("/selSwitchList")
	public List selSwitchList(String XmlData) throws Exception{
		List list=null;
		Map result = new HashMap();
		result = selSwitch(XmlData);
		list = (List)result.get("resultlist");
		
		return list;
	}
	
}
