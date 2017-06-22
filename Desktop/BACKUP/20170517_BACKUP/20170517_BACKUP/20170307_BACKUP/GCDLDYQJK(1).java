package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import java.sql.Date; 
import java.text.DateFormat;
import java.text.Format; 
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
 

import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.aop.SpringContextHolder; 
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler; 
import com.jlsoft.framework.pi.bdjk.BdJK;
//import com.jlsoft.framework.util.JLConf;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;


@Component
@RequestMapping("/GCDLDYQJK")
public class GCDLDYQJK extends FormHandler {
	
	/*@Autowired
	private JLConf jlConf;*/
	
	//工程登陆单 延期功能
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCDLDYQ.do")
	public List getGCYHD(String XmlData, HttpServletRequest request) throws Exception{
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("DYDLBJ.key", "0");
		query.put("BZ02", new BasicDBObject("$ne","封单"));
		query.put("S_VALUE", new BasicDBObject("$ne","D1"));
		if (FormTools.isNull(json.get("ZFBJ"))){
			query.put("ZFBJ", new BasicDBObject("$ne",1));
		}
		if (!FormTools.isNull(json.get("GCDLD01"))){
			query.put("GCDLD01", json.get("GCDLD01"));
		}
		System.out.print("query:"+query.toString());
		List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		//转换提日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today=dateFormat.format(DQdate).toString();//当天日期
		
		System.out.println("-----------工程保护期延期接口执行日："+dateFormat.format(DQdate)+"-----------------------------");
		System.out.print("titleList:"+titleList.toString());
		for (int i = 0; i < titleList.size(); i++) {
			//List<DBObject> AA = new ArrayList<DBObject>(); 
			DBObject AA = new BasicDBObject(Json.toJO(titleList.get(i)));
			//JSONObject AA = (JSONObject)titleList.get(i);
			//AA = (ArrayList)titleList.get(i);
			System.out.print("AA:"+AA.toString());
			System.out.print("DQR:"+AA.get("DQR"));
			
			if(!FormTools.isNull(AA.get("BHQ"))&&!FormTools.isNull(AA.get("DQR"))){
				String DQR = AA.get("DQR").toString();
				System.out.println(AA.get("GCDLD01")+"的到期日期"+DQR);
				
				//计算保护期 （相差天数） 
				long BHQ = JLTools.getDistanceDays(today,AA.get("DQR").toString());
				System.out.print("BHQ:"+BHQ);
				
				if (BHQ>0) {
					//long BHQ = JLTools.getDistanceDays(today,DQR);
			       // BHQ = JLTools.comparedate(DQR,today,"yyyy-MM-dd");
					//BHQ=BHQ-1;
					AA.put("BHQ", BHQ);
					AA.put("ZFBJ", "");
					
					DBObject querytj = new BasicDBObject();
					querytj.put("GCDLD01", AA.get("GCDLD01"));
					dbCollection.update(querytj,new BasicDBObject("$set", AA));
				}else if (BHQ<=0){
					AA.put("BHQ", "0");
					
					//作废标记（0：有效 1：作废）
					AA.put("ZFBJ", 1);
					DBObject querytj = new BasicDBObject();
					querytj.put("GCDLD01", AA.get("GCDLD01"));
					dbCollection.update(querytj,new BasicDBObject("$set", AA));
				}
				
				int sjc = JLTools.comparedate(today,DQR,"yyyy-MM-dd");
				
				System.out.print("DQRQ:"+today);
				System.out.print("DQR:"+DQR);
				System.out.print("sjc:"+sjc);
				System.out.print("GCLX:"+AA.get("GCLX").toString());
				if (sjc!=-1) {
					JSONObject GCLX = Json.toJO(AA.get("GCLX"));
					//家用登陆单
					if ("1".equals(GCLX.get("key"))) {
						Map workflowData = new HashMap(); 
						Map jsonMap = Json.toJO(titleList.get(i)); 
						workflowData.put("bdbh", AA.get("bdbh"));//工程登陆单表单编号 
						workflowData.put("GZL01", "9040");//工程登陆单工作流编号
						workflowData.put("jlbh", AA.get("jlbh"));  //记录编号
						workflowData.put("BZ01", "90404");
						workflowData.put("PI_USERNAME", AA.get("GSXX01").toString()+"sys"); //当前操作员,
						
						jsonMap.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
						jsonMap.put("DLD", FormTools.newJson("超期", "超期"));

			        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
			        	//不需要截取报错，继续运行
			        	Map result = bdJK.saveRecord(workflowData,jsonMap);
					}else{
						Map workflowData = new HashMap(); 
						Map jsonMap = Json.toJO(titleList.get(i)); 
						workflowData.put("bdbh", AA.get("bdbh"));//商用工程登陆单表单编号 
						workflowData.put("GZL01", "9093");//商用工程登陆单工作流编号
						workflowData.put("jlbh", AA.get("jlbh"));  //记录编号
						workflowData.put("BZ01", "90934");//工作流步骤
						workflowData.put("PI_USERNAME", AA.get("GSXX01").toString()+"sys"); //当前操作员
						
						jsonMap.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
						jsonMap.put("DLD", FormTools.newJson("超期", "超期"));

			        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
			        	Map result = bdJK.saveRecord(workflowData,jsonMap);
					}
				}
			}
		}
		List baobiaoSJ = new ArrayList();//最终展示的List
		List<DBObject> lsList = new ArrayList<DBObject>();
		DBObject s = new BasicDBObject();
		s.put("工程登录单作废执行成功","success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}
	
	//工程登陆单保护期异常单据
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCBHQYC.do")
	public List getGCBHQYC(String XmlData, HttpServletRequest request) throws Exception{
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBCollection dbCollection1 = MongodbHandler.getDB().getCollection("SCM_GCDLD_TZBHQ_002");
		DBCollection dbCollection2 = MongodbHandler.getDB().getCollection("SCM_GCDLD_TZBHQ"); ///
		DBObject query = new BasicDBObject();
		query.put("DYDLBJ.key", "0");
		query.put("GCLX.key", "2");
		//query.put("BZ02", new BasicDBObject("$ne","封单"));
		if (!FormTools.isNull(json.get("GCDLD01"))){
			query.put("GCDLD01", json.get("GCDLD01"));
		}
		query.put("S_VALUE", new BasicDBObject("$ne","D1"));
		Map sjMap = new HashMap(); 
		sjMap.put("$gte", "2016-11-01 00:00:00");
		sjMap.put("$lt", "2016-11-30 23:59:59");
		query.put("SBSJ", sjMap); 
		List<DBObject> titleList = dbCollection.find(query,new BasicDBObject("_id", 0)).toArray();
		long l = System.currentTimeMillis();
		Format sdf = new SimpleDateFormat("yyyy-MM-dd");  
        String today = sdf.format(new Date(l));
		
		System.out.println("----------------------------------------");
		
		///
		DBObject query1 = new BasicDBObject(); 
		List<DBObject> titleList2 = dbCollection2.find(query1,new BasicDBObject("_id", 0)).toArray();
		
		List<DBObject> djList = new ArrayList<DBObject>();
		for (int i = 0; i < titleList.size(); i++) {
			DBObject AA = new BasicDBObject(Json.toJO(titleList.get(i)));
			
			System.out.print(i);
			///
			int h = 0;
			for (int j=0;j<titleList2.size();j++){
				DBObject AA2 = new BasicDBObject(Json.toJO(titleList2.get(j)));
				
				if (AA2.get("GCDLD01").equals(AA.get("GCDLD01"))){
					h =1;
				}
			}
			if (h > 0){
				continue;
			}
			
			if(!FormTools.isNull(AA.get("SBSJ"))){
				JSONObject GCLX = new JSONObject();
				if (!FormTools.isNull(AA.get("GCLX"))){
					if (AA.get("GCLX").equals("家用")){
						GCLX.put("key", "1");
						GCLX.put("value", "家用");
						AA.put("GCLX", GCLX);
					}else if (AA.get("GCLX").equals("商用")){
						GCLX.put("key", "2");
						GCLX.put("value", "商用");
						AA.put("GCLX", GCLX);
					}else{
						GCLX = Json.toJO(AA.get("GCLX"));
					}
				}else{
					continue;
				}
				
				//获得系统参数
				JSONObject JS_DJLX = new JSONObject();
				JS_DJLX.put("GSXX01", AA.get("GSXX01"));
				
				//获得保护期天数
				Map YQTSMap = new HashMap();
				if ("1".equals(GCLX.get("key"))) {
					YQTSMap.put("JLCO04", "90");
				}else{
					YQTSMap.put("JLCO04", "90");
				}
				
				/*ArrayList YQTSList = new ArrayList();
				Map YQTSMap = new HashMap();
				Map YQTSmaps = jlConf.selSwitch(JS_DJLX.toString());
				YQTSList = (ArrayList)YQTSmaps.get("resultlist");
				if (YQTSList.size() > 0){
					YQTSMap = (Map)YQTSList.get(0);
				}*/
				
				//获得延期次数
				Map YQCSMap = new HashMap();
				if ("1".equals(GCLX.get("key"))) {
					YQCSMap.put("JLCO04", "1");
				}else{
					YQCSMap.put("JLCO04", "1");
				}
				
				/*ArrayList YQCSList = new ArrayList();
				Map YQCSMap = new HashMap();
				Map YQCSmaps = jlConf.selSwitch(JS_DJLX.toString());
				YQCSList = (ArrayList)YQCSmaps.get("resultlist");
				if (YQCSList.size() > 0){
					YQCSMap = (Map)YQCSList.get(0);
				}*/
				
				//获得延保护期天数 
				int YQTS;
				if(!FormTools.isNull(YQTSMap.get("JLCO04"))){
					YQTS = JLTools.strToInt(YQTSMap.get("JLCO04").toString());
				}else{
					continue;
				}
				
				//获得延期次数
				int YQCS = JLTools.strToInt(YQCSMap.get("JLCO04").toString());
				if(!FormTools.isNull(YQCSMap.get("JLCO04"))){
					if (AA.get("YQCS")==null){
						YQCS = 0;
					}else{
						if (!FormTools.isNull(AA.get("YQCS"))){
							if (JLTools.strToInt(AA.get("YQCS").toString()) <= YQCS){ 
								YQCS = JLTools.strToInt(AA.get("YQCS").toString());
							} 
						}else{
							YQCS = 0;
						} 
					}
				}else{
					continue;
				}
				 
				//相差天数
				String DQR;
				if (!FormTools.isNull(AA.get("DQR"))){
					long XCTS = JLTools.getDistanceDays(AA.get("SBSJ").toString(),AA.get("DQR").toString());
					
					if (YQCS > 0){
						if (XCTS > (YQTS*YQCS)) {
							djList.add(AA);
						}
					}else{
						if (XCTS > YQTS) {
							djList.add(AA);
						}
					}
				}else{
					djList.add(AA);
				} 
			}
		}
		dbCollection1.insert(djList); 
		
		List baobiaoSJ = new ArrayList();//最终展示的List
		List<DBObject> lsList = new ArrayList<DBObject>();
		DBObject s = new BasicDBObject();
		s.put("执行成功","success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}
	
	//更具保护期错误数据，来做相应的调整
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getTZBHQ.do")
	public List getTZBHQ(String XmlData, HttpServletRequest request) throws Exception{
		Calendar calendar = new GregorianCalendar(); 
		JSONObject json = Json.toJO(XmlData);
		//生产表
		DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		
		//调整表
		DBCollection dbCollection1 = MongodbHandler.getDB().getCollection("SCM_GCDLD_TZBHQ_002");
		
		
		//DBCollection dbCollection2 = MongodbHandler.getDB().getCollection("SCM_GCDLD_YTZBHQ");
		DBObject query = new BasicDBObject(); 
		if (!FormTools.isNull(json.get("GCDLD01"))){
			query.put("GCDLD01", json.get("GCDLD01"));
		} 
		query.put("GCDLD01", new BasicDBObject("$ne","DL174-000064"));
		List<DBObject> titleList = dbCollection1.find(query,new BasicDBObject("_id", 0)).toArray();
	    
		long l = System.currentTimeMillis();
		Format sdf = new SimpleDateFormat("yyyy-MM-dd");  
        String today = sdf.format(new Date(l));
		System.out.println("----------------------------------------");
		for (int i = 0; i < titleList.size(); i++) {
			System.out.println(i+"/n");
			DBObject AA = new BasicDBObject(Json.toJO(titleList.get(i)));
			//DBObject AA = titleList.get(i);
			if(!FormTools.isNull(AA.get("SBSJ"))){
				JSONObject GCLX = new JSONObject();
				if (!FormTools.isNull(AA.get("GCLX"))){
					if (AA.get("GCLX").equals("家用")){
						GCLX.put("key", "1");
						GCLX.put("value", "家用");
						AA.put("GCLX", GCLX);
					}else if (AA.get("GCLX").equals("商用")){
						GCLX.put("key", "2");
						GCLX.put("value", "商用");
						AA.put("GCLX", GCLX);
					}else{
						GCLX = Json.toJO(AA.get("GCLX"));
					}
				}else{
					continue;
				}
				
				//获得系统参数
				JSONObject JS_DJLX = new JSONObject();
				JS_DJLX.put("GSXX01", AA.get("GSXX01"));
				
				//获得延期天数
				Map YQTSMap = new HashMap();
				if ("1".equals(GCLX.get("key"))) {
					YQTSMap.put("JLCO04", "90");
				}else{
					YQTSMap.put("JLCO04", "90");
				}
				//Map YQTSmap = jlConf.selSwitch(JS_DJLX.toString());
				/*ArrayList YQTSList = new ArrayList();
				Map YQTSMap = new HashMap();
				Map YQTSmaps = jlConf.selSwitch(JS_DJLX.toString());
				YQTSList = (ArrayList)YQTSmaps.get("resultlist");
				if (YQTSList.size() > 0){
					YQTSMap = (Map)YQTSList.get(0);
				}*/
				
				//获得延期次数
				Map YQCSMap = new HashMap();
				if ("1".equals(GCLX.get("key"))) {
					YQCSMap.put("JLCO04", "1");
				}else{
					YQCSMap.put("JLCO04", "1");
				}
				//Map YQCSmap = jlConf.selSwitch(JS_DJLX.toString());
				/*ArrayList YQCSList = new ArrayList();
				Map YQCSMap = new HashMap();
				Map YQCSmaps = jlConf.selSwitch(JS_DJLX.toString());
				YQCSList = (ArrayList)YQCSmaps.get("resultlist");
				if (YQCSList.size() > 0){
					YQCSMap = (Map)YQCSList.get(0);
				}*/
				
				//获得延保护期天数 
				int YQTS;
				if(!FormTools.isNull(YQTSMap.get("JLCO04"))){
					YQTS = JLTools.strToInt(YQTSMap.get("JLCO04").toString());
				}else{
					continue;
				}
				
				//获得延期次数
				int YQCS = JLTools.strToInt(YQCSMap.get("JLCO04").toString());
				if(!FormTools.isNull(YQCSMap.get("JLCO04"))){
					if (AA.get("YQCS")==null){
						YQCS = 0;
					}else{
						if (!FormTools.isNull(AA.get("YQCS"))){
							if (JLTools.strToInt(AA.get("YQCS").toString()) <= YQCS){ 
								YQCS = JLTools.strToInt(AA.get("YQCS").toString());
							} 
						}else{
							YQCS = 0;
						} 
					}
				}else{
					continue;
				}
				
				//计算到期日
				DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
				Date date = new Date(df.parse(AA.get("SBSJ").toString()).getTime());
				
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				//延期次数
				if (YQCS == 0){
					cal.add(Calendar.DATE, YQTS);
				}else{
					cal.add(Calendar.DATE, YQTS*YQCS);
				} 
				 
				//到期日
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				AA.put("DQR", DQR);
				  
				int sjc = JLTools.comparedate(DQR,today,"yyyy-MM-dd");
				
				//当到期日 小于 今天，则表示单据已经过期
				if (sjc==-1) {
					AA.put("BHQ", "0");
				}else if (sjc==1){
					//当到期日 大于 今天，则表示单据还没有过期
					
					//相差天数
					long XCTS = JLTools.getDistanceDays(today,AA.get("DQR").toString());
					AA.put("BHQ", XCTS);
				}else if (sjc==0){
					////当到期日 等于 今天，则表示单据还没有过期
					AA.put("BHQ", "1");
				}
				
				//调用流程接口
				int sjc1 = JLTools.comparedate(DQR,today,"yyyy-MM-dd");
				 
				//当到期日小于今天，表示可以封单作废。
				if (sjc1==-1) { 
					//家用登陆单
					if ("1".equals(GCLX.get("key"))) {
						Map workflowData = new HashMap(); 
						AA.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
						AA.put("DLD", FormTools.newJson("超期", "超期"));
						
						Map jsonMap = Json.toJO(AA); 
						workflowData.put("bdbh", AA.get("bdbh"));//工程登陆单表单编号 
						workflowData.put("GZL01", "9040");//工程登陆单工作流编号
						workflowData.put("jlbh", AA.get("jlbh"));  //记录编号
						workflowData.put("BZ01", "90404");
						workflowData.put("PI_USERNAME", AA.get("GSXX01").toString()+"sys"); //当前操作员,

			        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
			        	//不需要截取报错，继续运行
			        	Map result = bdJK.saveRecord(workflowData,jsonMap);
					}else{
						Map workflowData = new HashMap(); 
						AA.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
						AA.put("DLD", FormTools.newJson("超期", "超期"));
						
						Map jsonMap = Json.toJO(AA); 
						workflowData.put("bdbh", AA.get("bdbh"));//商用工程登陆单表单编号 
						workflowData.put("GZL01", "9093");//商用工程登陆单工作流编号
						workflowData.put("jlbh", AA.get("jlbh"));  //记录编号
						workflowData.put("BZ01", "90934");//工作流步骤
						workflowData.put("PI_USERNAME", AA.get("GSXX01").toString()+"sys"); //当前操作员

			        	BdJK bdJK = SpringContextHolder.getBean("bdJK");
			        	Map result = bdJK.saveRecord(workflowData,jsonMap);
					}
				}else{
					//{"bdbh":"1040","jlbh":1307}
					if ("1".equals(GCLX.get("key"))) {
						String tasksql = "SELECT A.PID FROM W_TASK A " +
						                 " WHERE A.GZL01 = 9040 " + 
						               //  "   AND A.BZ01 = 90404" + 
								         "   AND A.SK03 = '{\"bdbh\":\""+AA.get("bdbh")+"\",\"jlbh\":"+AA.get("jlbh")+"}'";
						List taskLIST = queryForList(workflow, tasksql);
						
						if (taskLIST.size() <= 0){
							tasksql = "SELECT A.SK01,A.GSXX01,A.SK02,A.BZ01,A.SK03,A.PID," +
						              "       A.GZL01,A.GZL02,A.BZ02,A.TJCZY01,A.TJRYMC," +
									  "       A.SK04,A.BM01,WLDW01,CK01,QXCZY01,QXBM01" +
						              "  FROM W_LOG A" +
						              " WHERE A.GZL01 = 9040 " +
									//  "   AND A.BZ01 = 90404" + 
						              "   AND A.NBZ01 = 90403" + 
									  "   AND A.SK03 = '{\"bdbh\":\""+AA.get("bdbh")+"\",\"jlbh\":"+AA.get("jlbh")+"}'" +
									  " order BY A.SK01 DESC";
							List logLIST = queryForList(workflow, tasksql);
							
							if (logLIST.size() > 0){
								Map logMap = new HashMap();
								logMap.putAll((Map)logLIST.get(0));
								
							    //将数据移植到W_task
							    tasksql = "INSERT INTO W_TASK(SK01,GSXX01,SK02,BZ01,SK03,PID,GZL01,GZL02,BZ02," +
							              "                   TJCZY01,TJRYMC,SK04,BM01,WLDW01,CK01,QXCZY01,QXBM01)" + 
							    		  "            VALUES(SK01,GSXX01,SK02,BZ01,SK03,PID,GZL01,GZL02,BZ02," +
							              "                   TJCZY01,TJRYMC,SK04,BM01,WLDW01,CK01,QXCZY01,QXBM01)"; 
							    Map taskMap = new HashMap();
							    taskMap.put("SK01", logMap.get("SK01"));
							    taskMap.put("GSXX01", logMap.get("GSXX01"));
							    taskMap.put("SK02", logMap.get("SK02"));
							    taskMap.put("BZ01", logMap.get("BZ01"));
							    taskMap.put("SK03", logMap.get("SK03"));
							    taskMap.put("PID", logMap.get("PID"));
							    taskMap.put("GZL01", logMap.get("GZL01"));
							    taskMap.put("GZL02", logMap.get("GZL02"));
							    taskMap.put("BZ02", logMap.get("BZ02"));
							    taskMap.put("TJCZY01", logMap.get("TJCZY01"));
							    taskMap.put("TJRYMC", logMap.get("TJRYMC"));
							    taskMap.put("SK04", logMap.get("SK04"));
							    taskMap.put("BM01", logMap.get("BM01"));
							    taskMap.put("WLDW01", logMap.get("WLDW01"));
							    taskMap.put("CK01", logMap.get("CK01"));
							    taskMap.put("QXCZY01", logMap.get("QXCZY01"));
							    taskMap.put("QXBM01", logMap.get("QXBM01"));
							    execSQL(workflow, tasksql,taskMap);
							    
							    //备份 
							    execSQL(workflow, tasksql,logMap);
							    tasksql = "INSERT INTO W_TASK_20170307_0005 AS " +
							              "SELECT * W_TASK A WHERE A.PID=PID?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //删除之前备份 
							    execSQL(workflow, tasksql,logMap);
							    tasksql = "INSERT INTO W_LOG_20170307_0005 AS " +
							              "SELECT * W_LOG A WHERE A.SK01=SK01?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //删除封单数据
							    tasksql = "DELETE W_LOG A WHERE A.SK01=SK01?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //修改之前备份 
							    execSQL(workflow, tasksql,logMap);
							    tasksql = "INSERT INTO W_TASKYWGL_20170307_0005 AS " +
							              "SELECT * W_TASKYWGL A WHERE A.PID=PID?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //修改处理状态
							    tasksql = "UPDATE W_TASKYWGL A SET A.ZT = 1 WHERE A.PID=PID?"; 
							    execSQL(workflow, tasksql,logMap); 
							    
							    //修改MONGO单据状态 
							    DBObject sk02 = new BasicDBObject(Json.toJO(logMap.get("SK02")));
							    AA.put("GC_DJZT", sk02.get("GC_DJZT"));
								AA.put("DLD", sk02.get("单据状态"));
							}
						}
					}else{
						String tasksql = "SELECT A.PID FROM W_TASK A " +
				                 		 " WHERE A.GZL01 = 9093" +
				                 		// "   AND A.BZ01 = 90934" + 
								         "   AND A.SK03 = '{\"bdbh\":\""+AA.get("bdbh")+"\",\"jlbh\":"+AA.get("jlbh")+"}'";
						List taskLIST = queryForList(workflow, tasksql);
						
						if (taskLIST.size() <= 0){
							tasksql = "SELECT A.SK01,A.GSXX01,A.SK02,A.BZ01,A.SK03,A.PID," +
						              "       A.GZL01,A.GZL02,A.BZ02,A.TJCZY01,A.TJRYMC," +
									  "       A.SK04,A.BM01,WLDW01,CK01,QXCZY01,QXBM01" +
						              "  FROM W_LOG A" +
						              " WHERE A.GZL01 = 9093 " +
									//  "   AND A.BZ01 = 90934" + 
						              "   AND A.NBZ01 = 90933" + 
									  "   AND A.SK03 = '{\"bdbh\":\""+AA.get("bdbh")+"\",\"jlbh\":"+AA.get("jlbh")+"}'" +
									  " order BY A.SK01 DESC";
							List logLIST = queryForList(workflow, tasksql);
							
							if (logLIST.size() > 0){
								Map logMap = new HashMap();
								logMap.putAll((Map)logLIST.get(0));
								 
							    //将数据移植到W_task
							    tasksql = "INSERT INTO W_TASK(SK01,GSXX01,SK02,BZ01,SK03,PID,GZL01,GZL02,BZ02," +
							              "                   TJCZY01,TJRYMC,SK04,BM01,WLDW01,CK01,QXCZY01,QXBM01)" + 
							    		  "            VALUES(SK01,GSXX01,SK02,BZ01,SK03,PID,GZL01,GZL02,BZ02," +
							              "                   TJCZY01,TJRYMC,SK04,BM01,WLDW01,CK01,QXCZY01,QXBM01)"; 
							    Map taskMap = new HashMap();
							    taskMap.put("SK01", logMap.get("SK01"));
							    taskMap.put("GSXX01", logMap.get("GSXX01"));
							    taskMap.put("SK02", logMap.get("SK02"));
							    taskMap.put("BZ01", logMap.get("BZ01"));
							    taskMap.put("SK03", logMap.get("SK03"));
							    taskMap.put("PID", logMap.get("PID"));
							    taskMap.put("GZL01", logMap.get("GZL01"));
							    taskMap.put("GZL02", logMap.get("GZL02"));
							    taskMap.put("BZ02", logMap.get("BZ02"));
							    taskMap.put("TJCZY01", logMap.get("TJCZY01"));
							    taskMap.put("TJRYMC", logMap.get("TJRYMC"));
							    taskMap.put("SK04", logMap.get("SK04"));
							    taskMap.put("BM01", logMap.get("BM01"));
							    taskMap.put("WLDW01", logMap.get("WLDW01"));
							    taskMap.put("CK01", logMap.get("CK01"));
							    taskMap.put("QXCZY01", logMap.get("QXCZY01"));
							    taskMap.put("QXBM01", logMap.get("QXBM01"));
							    execSQL(workflow, tasksql,taskMap);
							    
							    //备份 
							    execSQL(workflow, tasksql,logMap);
							    tasksql = "INSERT INTO W_TASK_20170307_0005 AS " +
							              "SELECT * W_TASK A WHERE A.PID=PID?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //删除之前备份 
							    execSQL(workflow, tasksql,logMap);
							    tasksql = "INSERT INTO W_LOG_20170307_0005 AS " +
							              "SELECT * W_LOG A WHERE A.SK01=SK01?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //删除封单数据
							    tasksql = "DELETE W_LOG A WHERE A.SK01=SK01?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //修改之前备份 
							    execSQL(workflow, tasksql,logMap);
							    tasksql = "INSERT INTO W_TASKYWGL_20170307_0005 AS " +
							              "SELECT * W_TASKYWGL A WHERE A.PID=PID?"; 
							    execSQL(workflow, tasksql,logMap);
							    
							    //修改处理状态
							    tasksql = "UPDATE W_TASKYWGL A SET A.ZT = 1 WHERE A.PID=PID?"; 
							    execSQL(workflow, tasksql,logMap); 
							    
							    //修改MONGO单据状态 
							    DBObject sk02 = new BasicDBObject(Json.toJO(logMap.get("SK02")));
							    AA.put("GC_DJZT", sk02.get("GC_DJZT"));
							    AA.put("DLD", sk02.get("单据状态"));
							}
						}
					}
				}
				
				//修改MONGNO数据
				JSONObject upQuery = new JSONObject();
				upQuery.put("GSXX01", AA.get("GSXX01"));
				upQuery.put("GCDLD01", AA.get("GCDLD01"));
				DBObject find = new BasicDBObject(upQuery);
				 
				JSONObject updataJson = new JSONObject();
				updataJson.put("GC_DJZT", AA.get("GC_DJZT"));
				updataJson.put("DLD", AA.get("DLD"));
				updataJson.put("BHQ", AA.get("BHQ"));
				updataJson.put("DQR", AA.get("DQR"));   
				
				DBObject update = new BasicDBObject("$set",updataJson);
				dbCollection.update(find, update);  
			}
		}
		
		List baobiaoSJ = new ArrayList();//最终展示的List
		List<DBObject> lsList = new ArrayList<DBObject>();
		DBObject s = new BasicDBObject();
		s.put("执行成功","success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}
	
	//更具保护期错误数据，来做相应的调整
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getTZJYBHQ.do")
	public List getTZJYBHQ(String XmlData, HttpServletRequest request) throws Exception{
		Calendar calendar = new GregorianCalendar(); 
		JSONObject json = Json.toJO(XmlData);
		//生产表
		DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		
		//调整表
		DBCollection dbCollection1 = MongodbHandler.getDB().getCollection("SCM_GCDLD_TZBHQ");
		
		 
		DBObject query = new BasicDBObject(); 
		if (!FormTools.isNull(json.get("GCDLD01"))){
			query.put("GCDLD01", json.get("GCDLD01"));
		} 
		query.put("GCLX.key", "1");
		List<DBObject> titleList = dbCollection1.find(query,new BasicDBObject("_id", 0)).toArray();
	     
		System.out.println("----------------------------------------");
		for (int i = 0; i < titleList.size(); i++) {
			DBObject AA = new BasicDBObject(Json.toJO(titleList.get(i)));
			//DBObject AA = titleList.get(i);
			if(!FormTools.isNull(AA.get("SBSJ"))){
				JSONObject GCLX = new JSONObject();
				if (!FormTools.isNull(AA.get("GCLX"))){
					if (AA.get("GCLX").equals("家用")){
						GCLX.put("key", "1");
						GCLX.put("value", "家用");
						AA.put("GCLX", GCLX);
					}else if (AA.get("GCLX").equals("商用")){
						GCLX.put("key", "2");
						GCLX.put("value", "商用");
						AA.put("GCLX", GCLX);
					}else{
						GCLX = Json.toJO(AA.get("GCLX"));
					}
				}else{
					continue;
				}
				 
				if ("1".equals(GCLX.get("key"))) {
					 
					//修改MONGNO数据
					JSONObject upQuery = new JSONObject();
					upQuery.put("GSXX01", AA.get("GSXX01"));
					upQuery.put("GCDLD01", AA.get("GCDLD01"));
					DBObject find = new BasicDBObject(upQuery);
					 
					JSONObject updataJson = new JSONObject();
					updataJson.put("GC_DJZT", AA.get("GC_DJZT"));
					updataJson.put("DLD", AA.get("DLD"));
					updataJson.put("BHQ", "");
					updataJson.put("DQR", "");   
					
					DBObject update = new BasicDBObject("$set",updataJson);
					dbCollection.update(find, update);  
				}  
			}
		}
		
		List baobiaoSJ = new ArrayList();//最终展示的List
		List<DBObject> lsList = new ArrayList<DBObject>();
		DBObject s = new BasicDBObject();
		s.put("执行成功","success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}
}
