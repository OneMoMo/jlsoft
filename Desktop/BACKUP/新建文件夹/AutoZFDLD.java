//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
@RequestMapping({"/AutoZFDLD"})
public class AutoZFDLD extends FormHandler {
	public AutoZFDLD() {
	}

	@RequestMapping({"/getGCDLDJYYQ.do"})
	public List getGCDLDJYYQ(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "1");
		query.put("DYDLBJ.key", "0");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", new BasicDBObject("$ne", Integer.valueOf(1)));
		if(!FormTools.isNull(json.get("GCDLD01"))) {
			query.put("GCDLD01", json.get("GCDLD01"));
		}

		System.out.print("query:" + query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_JY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		int YQCS = 0;

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("JY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}

			if("JY_YQCS".equals(jlconf.get("JLCO08").toString())) {
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		BasicDBObject find;
		for(int i = 0; i < gcdldList.size(); ++i) {
			System.out.print(i + "\n");
			JSONObject updataJson = new JSONObject();
			find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			if(!JLTools.isNull(gcdldObj.get("GSXX01"))) {
				List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
				if(gchtList.size() <= 0) {
					new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
					System.out.println(gcdldObj.get("SBSJ").toString());
					Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
					Calendar cal = Calendar.getInstance();
					cal.setTime(date);
					System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
					if(gcdldObj.get("YQCS") == null) {
						YQCS = 0;
					} else if(!FormTools.isNull(gcdldObj.get("YQCS"))) {
						if(JLTools.strToInt(gcdldObj.get("YQCS").toString()) <= YQCS) {
							YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
						}
					} else {
						YQCS = 0;
					}

					cal.add(5, YQTS * YQCS + YQTS);
					String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
					updataJson.put("DQR", DQR);
					long BHQ = JLTools.getDistanceDays(DQR, today);
					if(BHQ < 0L) {
						BHQ = 0L;
					}

					updataJson.put("BHQ", Long.valueOf(BHQ));
					int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
					if(sjc == 1) {
						updataJson.put("ZFZT", "1");
						Map workflowData = new HashMap();
						workflowData.put("bdbh", gcdldObj.get("bdbh"));
						workflowData.put("GZL01", "9040");
						workflowData.put("jlbh", gcdldObj.get("jlbh"));
						workflowData.put("BZ01", "90404");
						workflowData.put("PI_USERNAME", gcdldObj.get("GSXX01").toString() + "sys");
						gcdldObj.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
						gcdldObj.put("DLD", FormTools.newJson("超期", "超期"));
						BdJK bdJK = (BdJK)SpringContextHolder.getBean("bdJK");
						bdJK.saveRecord(workflowData, gcdldObj.toMap());
					}

					DBObject update = new BasicDBObject("$set", updataJson);
					dbscm_gcdld.update(find, update);
				}
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		find = new BasicDBObject();
		find.put("家用工程登录单作废执行成功", "success");
		lsList.add(find);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/getGCDLDSYYQ_CE.do"})
	public List getGCDLDSYYQ_CE(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdldbf = MongodbHandler.getDB().getCollection("SCM_GCDLD_BHQCW20170331");
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		List<DBObject> gcdldbfList = dbscm_gcdldbf.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_SY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		int YQCS = 0;
		if(jlconfList.size() <= 0) {
			System.exit(0);
		}

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("SY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		BasicDBObject find;
		for(int i = 0; i < gcdldbfList.size(); ++i) {
			JSONObject updataJson = new JSONObject();
			find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldbfList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
			if(gchtList.size() <= 0) {
				new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
				System.out.println(gcdldObj.get("SBSJ").toString());
				Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
				if(!JLTools.isNull(gcdldObj.get("YQCS"))) {
					YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
				}

				System.out.println("延期次数" + YQCS);
				cal.add(5, YQTS * YQCS + YQTS);
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				updataJson.put("DQR", DQR);
				long BHQ = JLTools.getDistanceDays(DQR, today);
				if(BHQ < 0L) {
					BHQ = 0L;
				}

				updataJson.put("BHQ", Long.valueOf(BHQ));
				int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
				if(sjc != 1) {
					System.out.println("**********" + i + "********" + i);
					updataJson.put("ZFZT", "0");
					String pid = this.getPID(gcdldObj.get("bdbh").toString(), gcdldObj.get("jlbh").toString());
					if(JLTools.isNull(pid)) {
						continue;
					}

					String tasksql = "SELECT A.PID FROM W_TASK A  WHERE A.PID = '" + pid + "' ";
					List taskLIST = this.queryForList(this.workflow, tasksql);
					if(taskLIST.size() <= 0) {
						tasksql = "SELECT A.SK01,A.GSXX01,A.SK02,A.BZ01,A.SK03,A.PID,       A.GZL01,A.GZL02,A.BZ02,A.TJCZY01,A.TJRYMC,       A.SK04,A.BM01,A.SK05,WLDW01,CK01,QXCZY01,QXBM01  FROM W_LOG A WHERE A.PID =  '" + pid + "'" + " order BY A.SK01 DESC";
						List logLIST = this.queryForList(this.workflow, tasksql);
						if(logLIST.size() > 0) {
							Map logMap = new HashMap();
							logMap.putAll((Map)logLIST.get(0));
							tasksql = "INSERT INTO W_TASK(SK01,GSXX01,SK02,BZ01,SK03,PID,GZL01,GZL02,BZ02,                   TJCZY01,TJRYMC,SK04,BM01,SK05,WLDW01,CK01,QXCZY01,QXBM01)            VALUES(SK01?,GSXX01?,SK02?,BZ01?,SK03?,PID?,GZL01?,GZL02?,BZ02?,                   TJCZY01?,TJRYMC?,SK04?,BM01?,SK05?,WLDW01?,CK01?,QXCZY01?,QXBM01?)";
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
							taskMap.put("SK05", logMap.get("SK05"));
							taskMap.put("WLDW01", logMap.get("WLDW01"));
							taskMap.put("CK01", logMap.get("CK01"));
							taskMap.put("QXCZY01", logMap.get("QXCZY01"));
							taskMap.put("QXBM01", logMap.get("QXBM01"));
							this.execSQL(this.workflow, tasksql, taskMap);
							tasksql = "INSERT INTO W_TASK_20170330_001  SELECT * FROM W_TASK A WHERE A.PID=PID?";
							this.execSQL(this.workflow, tasksql, logMap);
							tasksql = "INSERT INTO W_LOG_20170330_001  SELECT * FROM W_LOG A WHERE A.SK01=SK01?";
							this.execSQL(this.workflow, tasksql, logMap);
							tasksql = "DELETE W_LOG A WHERE A.SK01=SK01?";
							this.execSQL(this.workflow, tasksql, logMap);
							tasksql = "INSERT INTO W_TASKYWGL_20170330_001  SELECT * FROM W_TASKYWGL A WHERE A.PID=PID?";
							this.execSQL(this.workflow, tasksql, logMap);
							tasksql = "UPDATE W_TASKYWGL A SET A.ZT = 1 WHERE A.PID=PID?";
							this.execSQL(this.workflow, tasksql, logMap);
							if("跟进".equals(logMap.get("BZ02").toString())) {
								updataJson.put("BZ02", "跟进");
								updataJson.put("DLD", FormTools.newJson("跟进", "跟进"));
								updataJson.put("GC_DJZT", FormTools.newJson("待签合同", "待签合同"));
							}
						}
					}
				}

				DBObject update = new BasicDBObject("$set", updataJson);
				dbscm_gcdld.update(find, update);
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		find = new BasicDBObject();
		find.put("商用工程登录单作废执行成功", "success");
		lsList.add(find);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/SYBHQTZ_HN.do"})
	public List getGCDLDSYYQ_HN(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "2");
		query.put("DYDLBJ.key", "0");
		query.put("BZ02", "跟进");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", new BasicDBObject("$ne","1"));
		if(!FormTools.isNull(json.get("GCDLD01"))) {
			query.put("GCDLD01", json.get("GCDLD01"));
		}

		System.out.print("query:" + query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_SY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		int YQCS = 0;
		if(jlconfList.size() <= 0) {
			System.exit(0);
		}

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("SY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}

			if("SY_YQCS".equals(jlconf.get("JLCO08").toString())) {
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		BasicDBObject find;
		for(int i = 0; i < gcdldList.size(); ++i) {
			JSONObject updataJson = new JSONObject();
			find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
			if(gchtList.size() <= 0) {
				new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
				System.out.println(gcdldObj.get("SBSJ").toString());
				Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
				if(!JLTools.isNull(gcdldObj.get("YQCS"))) {
					YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
				} else {
					YQCS = 0;
				}

				cal.add(5, YQTS * YQCS + YQTS);
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				updataJson.put("DQR", DQR);
				long BHQ = JLTools.getDistanceDays(DQR, today);
				if(BHQ < 0L) {
					BHQ = 0L;
				}

				if(BHQ > 30L) {
					System.out.println("**************************" + BHQ);
				}

				updataJson.put("BHQ", Long.valueOf(BHQ));
				System.out.println("申报时间" + gcdldObj.get("SBSJ").toString());
				System.out.println("到期日" + DQR);
				System.out.println("延期天数" + YQTS);
				System.out.println("延期次数" + YQCS);
				System.out.println("总条数" + gcdldList.size() + "*************当前条数" + i);
				int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
				if(sjc == 1) {
					System.out.println("**************************************************************");
					System.out.println("******************************执行工程登录单作废********************");
					System.out.println("**************************************************************");
					updataJson.put("ZFZT", "1");
					String pid = this.getPID(gcdldObj.get("bdbh").toString(), gcdldObj.get("jlbh").toString());
					if(JLTools.isNull(pid)) {
						continue;
					}

					deleteDB(pid);

					updataJson.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
					updataJson.put("DLD", FormTools.newJson("超期", "超期"));
				}

				DBObject update = new BasicDBObject("$set", updataJson);
				dbscm_gcdld.update(find, update);
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		find = new BasicDBObject();
		find.put("商用工程登录单作废执行成功", "success");
		lsList.add(find);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/JYBHQTZ_HN.do"})
	public List getGCDLDJYYQ_HN(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "1");
		query.put("DYDLBJ.key", "0");
		query.put("BZ02", "跟进");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", new BasicDBObject("$ne", "1"));
		if(!FormTools.isNull(json.get("GCDLD01"))) {
			query.put("GCDLD01", json.get("GCDLD01"));
		}

		System.out.print("query:" + query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_JY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		int YQCS = 0;
		if(jlconfList.size() <= 0) {
			System.exit(0);
		}

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("JY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}

			if("JY_YQCS".equals(jlconf.get("JLCO08").toString())) {
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		BasicDBObject find;
		for(int i = 0; i < gcdldList.size(); ++i) {
			JSONObject updataJson = new JSONObject();
			find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
			if(gchtList.size() <= 0) {
				new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
				System.out.println(gcdldObj.get("SBSJ").toString());
				Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
				System.out.println("延期次数" + YQCS);
				if(!JLTools.isNull(gcdldObj.get("YQCS"))) {
					YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
				} else {
					YQCS = 0;
				}

				System.out.println("延期次数" + YQCS);
				cal.add(5, YQTS * YQCS + YQTS);
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				updataJson.put("DQR", DQR);
				long BHQ = JLTools.getDistanceDays(DQR, today);
				if(BHQ < 0L) {
					System.out.println("*********");
					BHQ = 0L;
					System.out.println("Q:" + gcdldObj.get("SBSJ").toString() + "  " + DQR);
				}

				updataJson.put("BHQ", Long.valueOf(BHQ));
				if(BHQ > 32L) {
					System.out.println("****");
				}

				System.out.println("制单时间" + gcdldObj.get("SBSJ").toString());
				System.out.println("到期日" + DQR);
				System.out.println("延期次数" + YQCS);
				System.out.println("保护器" + BHQ);
				int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
				if(sjc == 1) {
					System.out.println("**************************************************************");
					System.out.println("******************************执行工程登录单作废********************");
					System.out.println("**************************************************************");
					updataJson.put("ZFZT", "1");
					String pid = this.getPID(gcdldObj.get("bdbh").toString(), gcdldObj.get("jlbh").toString());
					if(JLTools.isNull(pid)) {
						continue;
					}
					//代办备份  删除
					deleteDB(pid);

					updataJson.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
					updataJson.put("DLD", FormTools.newJson("超期", "超期"));
				}

				DBObject update = new BasicDBObject("$set", updataJson);
				dbscm_gcdld.update(find, update);
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		find = new BasicDBObject();
		find.put("家用工程登录单作废执行成功", "success");
		lsList.add(find);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/getGCDLDSYYQ.do"})
	public List getGCDLDSYYQ(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "2");
		query.put("DYDLBJ.key", "0");
		query.put("BZ02", "跟进");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", new BasicDBObject("$ne", Integer.valueOf(1)));
		if(!FormTools.isNull(json.get("GCDLD01"))) {
			query.put("GCDLD01", json.get("GCDLD01"));
		}

		System.out.print("query:" + query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_SY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		if(jlconfList.size() <= 0) {
			System.exit(0);
		}

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("SY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		for(int i = 0; i < gcdldList.size(); ++i) {
			int YQCS = 0;
			JSONObject updataJson = new JSONObject();
			DBObject find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
			if(gchtList.size() <= 0) {
				new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
				System.out.println(gcdldObj.get("SBSJ").toString());
				Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
				System.out.println("延期次数" + YQCS);
				if(!JLTools.isNull(gcdldObj.get("YQCS"))) {
					YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
				}

				System.out.println("延期次数`" + YQCS);
				cal.add(5, YQTS * YQCS + YQTS);
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				updataJson.put("DQR", DQR);
				long BHQ = JLTools.getDistanceDays(DQR, today);
				if(BHQ < 0L) {
					BHQ = 0L;
				}

				updataJson.put("BHQ", Long.valueOf(BHQ));
				int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
				if(sjc == 1) {
					updataJson.put("ZFZT", "1");
					Map workflowData = new HashMap();
					workflowData.put("bdbh", gcdldObj.get("bdbh"));
					workflowData.put("GZL01", "9093");
					workflowData.put("jlbh", gcdldObj.get("jlbh"));
					workflowData.put("BZ01", "90934");
					workflowData.put("PI_USERNAME", gcdldObj.get("GSXX01").toString() + "sys");
					gcdldObj.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
					gcdldObj.put("DLD", FormTools.newJson("超期", "超期"));
					BdJK bdJK = (BdJK)SpringContextHolder.getBean("bdJK");
					bdJK.saveRecord(workflowData, gcdldObj.toMap());
				}

				DBObject update = new BasicDBObject("$set", updataJson);
				dbscm_gcdld.update(find, update);
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		DBObject s = new BasicDBObject();
		s.put("商用工程登录单作废执行成功", "success");
		lsList.add(s);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/getGCDLDSYYQ_GSCS.do"})
	public List getGCDLDSYYQ_GSCS(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "2");
		query.put("DYDLBJ.key", "0");
		query.put("BZ02", "跟进");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", new BasicDBObject("$ne", Integer.valueOf(1)));
		if(!FormTools.isNull(json.get("GCDLD01"))) {
			query.put("GCDLD01", json.get("GCDLD01"));
		}

		System.out.print("query:" + query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_SY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		int YQCS = 0;
		if(jlconfList.size() <= 0) {
			System.exit(0);
		}

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("SY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}

			if("SY_YQCS".equals(jlconf.get("JLCO08").toString())) {
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		BasicDBObject find;
		for(int i = 0; i < gcdldList.size(); ++i) {
			JSONObject updataJson = new JSONObject();
			find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
			if(gchtList.size() <= 0) {
				new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
				System.out.println(gcdldObj.get("SBSJ").toString());
				Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
				System.out.println("延期次数" + YQCS);
				if(!JLTools.isNull(gcdldObj.get("YQCS"))) {
					if(YQCS >= JLTools.strToInt(gcdldObj.get("YQCS").toString())) {
						YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
					}
				} else {
					YQCS = 0;
				}

				System.out.println("延期次数`" + YQCS);
				cal.add(5, YQTS * YQCS + YQTS);
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				updataJson.put("DQR", DQR);
				long BHQ = JLTools.getDistanceDays(DQR, today);
				if(BHQ < 0L) {
					BHQ = 0L;
				}

				updataJson.put("BHQ", Long.valueOf(BHQ));
				int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
				if(sjc == 1) {
					updataJson.put("ZFZT", "1");
					Map workflowData = new HashMap();
					workflowData.put("bdbh", gcdldObj.get("bdbh"));
					workflowData.put("GZL01", "9093");
					workflowData.put("jlbh", gcdldObj.get("jlbh"));
					workflowData.put("BZ01", "90934");
					workflowData.put("PI_USERNAME", gcdldObj.get("GSXX01").toString() + "sys");
					gcdldObj.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
					gcdldObj.put("DLD", FormTools.newJson("超期", "超期"));
					BdJK bdJK = (BdJK)SpringContextHolder.getBean("bdJK");
					bdJK.saveRecord(workflowData, gcdldObj.toMap());
				}

				DBObject update = new BasicDBObject("$set", updataJson);
				dbscm_gcdld.update(find, update);
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		find = new BasicDBObject();
		find.put("商用工程登录单作废执行成功", "success");
		lsList.add(find);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/getGCDLDJYYQ_GSCS.do"})
	public List getGCDLDJYYQ_GSCS(String XmlData, HttpServletRequest request) throws Exception {
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today = dateFormat.format(DQdate).toString();
		JSONObject json = Json.toJO(XmlData);
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "1");
		query.put("DYDLBJ.key", "0");
		query.put("BZ02", "跟进");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", new BasicDBObject("$ne", Integer.valueOf(1)));
		if(!FormTools.isNull(json.get("GCDLD01"))) {
			query.put("GCDLD01", json.get("GCDLD01"));
		}

		System.out.print("query:" + query.toString());
		List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
		JSONObject DJLX = new JSONObject();
		DJLX.put("DJLX", "GCDLD_YQ_JY");
		List jlconfList = this.selSwitchList(DJLX.toJSONString());
		int YQTS = 0;
		int YQCS = 0;
		if(jlconfList.size() <= 0) {
			System.exit(0);
		}

		for(int i = 0; i < jlconfList.size(); ++i) {
			JSONObject jlconf = Json.toJO(jlconfList.get(i));
			if("JY_YQTS".equals(jlconf.get("JLCO08").toString())) {
				YQTS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}

			if("JY_YQCS".equals(jlconf.get("JLCO08").toString())) {
				YQCS = Integer.parseInt(jlconf.get("JLCO04").toString());
			}
		}

		DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");
		System.out.println("-----------工程保护期延期接口执行日：" + today + "-----------------------------");

		BasicDBObject find;
		for(int i = 0; i < gcdldList.size(); ++i) {
			JSONObject updataJson = new JSONObject();
			find = new BasicDBObject();
			DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
			find.put("GCDLD01", gcdldObj.get("GCDLD01"));
			find.put("GSXX01", gcdldObj.get("GSXX01"));
			List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
			if(gchtList.size() <= 0) {
				new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
				System.out.println(gcdldObj.get("SBSJ").toString());
				Date date = (new SimpleDateFormat("yyyy-MM-dd")).parse(gcdldObj.get("SBSJ").toString());
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				System.out.println((new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime()));
				System.out.println("延期次数" + YQCS);
				if(!JLTools.isNull(gcdldObj.get("YQCS"))) {
					if(YQCS >= JLTools.strToInt(gcdldObj.get("YQCS").toString())) {
						YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString());
					}
				} else {
					YQCS = 0;
				}

				System.out.println("延期次数`" + YQCS);
				cal.add(5, YQTS * YQCS + YQTS);
				String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
				updataJson.put("DQR", DQR);
				long BHQ = JLTools.getDistanceDays(DQR, today);
				if(BHQ < 0L) {
					BHQ = 0L;
				}

				updataJson.put("BHQ", Long.valueOf(BHQ));
				int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
				if(sjc == 1) {
					updataJson.put("ZFZT", "1");
					Map workflowData = new HashMap();
					workflowData.put("bdbh", gcdldObj.get("bdbh"));
					workflowData.put("GZL01", "9040");
					workflowData.put("jlbh", gcdldObj.get("jlbh"));
					workflowData.put("BZ01", "90404");
					workflowData.put("PI_USERNAME", gcdldObj.get("GSXX01").toString() + "sys");
					gcdldObj.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
					gcdldObj.put("DLD", FormTools.newJson("超期", "超期"));
					BdJK bdJK = (BdJK)SpringContextHolder.getBean("bdJK");
					bdJK.saveRecord(workflowData, gcdldObj.toMap());
				}

				DBObject update = new BasicDBObject("$set", updataJson);
				dbscm_gcdld.update(find, update);
			}
		}

		List baobiaoSJ = new ArrayList();
		List<DBObject> lsList = new ArrayList();
		find = new BasicDBObject();
		find.put("家用工程登录单作废执行成功", "success");
		lsList.add(find);
		baobiaoSJ.addAll(lsList);
		return baobiaoSJ;
	}

	@RequestMapping({"/GCDLDERRORDATABF.do"})
	public void BFERRORDATA() {
		DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBCollection dbscm_gcdldbf = MongodbHandler.getDB().getCollection("SCM_GCDLD_20170330BF");
		DBObject query = new BasicDBObject();
		query.put("GCLX.key", "2");
		query.put("DYDLBJ.key", "0");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		query.put("ZFZT", "1");
		List errorList = dbscm_gcdld.find(query).toArray();

		for(int i = 0; i < errorList.size(); ++i) {
			System.out.println(i + "**************" + i);
			DBObject AA = new BasicDBObject(Json.toJO(errorList.get(i)));
			dbscm_gcdldbf.insert(new DBObject[]{AA});
		}

	}

	@RequestMapping({"/BF_SCM_GCDLD.do"})
	public void BF_SCM_GCDLD() {
		DBCollection dbCollection1 = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBCollection dbCollection2 = MongodbHandler.getDB().getCollection("SCM_GCDLD_2017050902");
		List<DBObject> titleList = dbCollection1.find(new BasicDBObject("DYDLBJ.key", "0"), new BasicDBObject("_id", Integer.valueOf(0))).toArray();

		for(int i = 0; i < titleList.size(); ++i) {
			System.out.println("*************" + i + "\n");
			DBObject AA = new BasicDBObject(Json.toJO(titleList.get(i)));
			dbCollection2.insert(new DBObject[]{AA});
		}

	}

	@RequestMapping({"/BFBHQCW_GCDLD.do"})
	public void BFBHQCW_GCDLD() {
		DBCollection dbCollection1 = MongodbHandler.getDB().getCollection("SCM_GCDLD");
		DBCollection dbCollection2 = MongodbHandler.getDB().getCollection("SCM_GCDLD_20170809");
		DBObject query = new BasicDBObject();
		List<DBObject> titleList = dbCollection1.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();

		for(int i = 0; i < titleList.size(); ++i) {
			System.out.println("*************" + i + "\n");
			DBObject AA = new BasicDBObject(Json.toJO(titleList.get(i)));
			dbCollection2.insert(new DBObject[]{AA});
		}

	}

	public Map selSwitch(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		String sql = "SELECT JLCO12,JLCO04,JLCO08  FROM VIEW_JLCONF  WHERE JLCO02='" + json.get("DJLX") + "'";
		if(!JLTools.isNull(json.get("DJZD"))) {
			sql = sql + "   AND JLCO08='" + json.get("DJZD") + "'";
		}

		if(!JLTools.isNull(json.get("GSXX01"))) {
			sql = sql + "   AND (GSXX01='" + json.get("GSXX01") + "' OR GSXX01 is null)";
		}

		System.out.print(sql);
		List list = this.queryForList(this.scm, sql, (Map)null);
		Map result = new HashMap();
		result.put("resultlist", list);
		return result;
	}

	@RequestMapping({"/selSwitchList"})
	public List selSwitchList(String XmlData) throws Exception {
		List list = null;
		new HashMap();
		Map result = this.selSwitch(XmlData);
		list = (List)result.get("resultlist");
		return list;
	}

	public String getPID(String bdbh, String jlbh) {
		String sql = "SELECT A.PID FROM W_TASKYWGL A  WHERE A.TBLNAME = '" + bdbh + "' " + " AND A.JLBH = '" + jlbh + "' ";
		String PID = "";
		List logLIST = this.queryForList(this.workflow, sql);
		if(logLIST.size() > 0) {
			Map logMap = new HashMap();
			logMap.putAll((Map)logLIST.get(0));
			PID = logMap.get("PID").toString();
		} else {
			PID = null;
		}

		return PID;
	}

	public void deleteDB(String PID) throws Exception {
		Map taskMap = new HashMap();
		taskMap.put("PID",PID);
		String sql = "SELECT BZ01 FROM W_TASK WHERE PID = '"+PID+"'";
		List taskLIST = queryForList(workflow, sql);

		if(taskLIST.size()>0){
			//备份代办
			String tasksql = "INSERT INTO W_TASKDEL AS SELECT * FROM W_TASK WHERE PID =  '"+PID+"'";
			execSQL(this.workflow, tasksql, taskMap);
			//删除代办
			tasksql = "DELETE W_TASK A WHERE A.PID = PID?";
			execSQL(this.workflow, tasksql, taskMap);
		}

	}

}
