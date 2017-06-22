package com.jlsoft.form.scm.gcgl.gcdl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.admin.scm.pub.adapter.ScmFormAdapter;
import com.jlsoft.framework.aop.Authorization;
import com.jlsoft.framework.aop.SpringContextHolder;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.pi.bdjk.BdJK;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service("scmMakeGCHT")
public class SCM_GCHT extends ScmFormAdapter
{
  public Boolean check(Map json, int bdbh, HttpServletRequest request)
    throws Exception
  {
    JSONArray initField = Json.toJA(request.getParameter("initField"));
    mappingPart("form.scm.gcht.gchtzd", json);
    if (FormTools.isNull(json.get("GCHTH01"))) {
      json.put("GCHTH01", updateW_DJBHZT(this.workflow, json.get("GSXX01").toString(), "GT"));
    }

    if ((initField.contains("ZDR")) && (!"D1".equals(json.get("S_VALUE")))) {
      JSONArray SPLB = Json.toJA(json.get("SPLB"));
      for (int i = 0; i < SPLB.size(); i++) {
        double SQDJ = Double.parseDouble(SPLB.getJSONObject(i).get("SQDJ").toString());
        if (SQDJ <= 0.0D) {
          throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品申请单价不能小于等于0");
        }
      }
      JSONArray SPLBTEMP = Json.toJA(json.get("SPLBTEMP"));
      String result = "";

      List GCSPMC = new ArrayList();
      for (int i = 0; i < SPLBTEMP.size(); i++) {
        JSONObject AA = SPLBTEMP.getJSONObject(i);
        boolean delFlag = true;
        for (int j = 0; j < SPLB.size(); j++) {
          JSONObject BB = SPLB.getJSONObject(j);
          if (FormTools.isNull(BB.get("WBTDH"))) {
            if (GCSPMC.indexOf(BB.get("GCSPMC")) == -1) {
              GCSPMC.add(BB.get("GCSPMC"));
            }
          }
          else if (AA.getString("WBTDH").equals(BB.getString("WBTDH"))) {
            if ((FormTools.isNull(AA.get("PFSL"))) || (!AA.getString("PFSL").equals(BB.getString("PFSL")))) {
              result = result + AA.get("GCSPMC") + "  合同数量: " + AA.get("PFSL") + " --> " + BB.get("PFSL") + " ; ";
            }
            if ((FormTools.isNull(AA.get("SQDJ"))) || (!AA.getString("SQDJ").equals(BB.getString("SQDJ")))) {
              result = result + AA.get("GCSPMC") + "  合同单价: " + AA.get("SQDJ") + " --> " + BB.get("SQDJ") + " ; ";
            }
            delFlag = false;
          }
        }
        if (delFlag) {
          result = result + AA.get("GCSPMC") + "  被删除 ; ";
        }
      }
      for (int k = 0; k < GCSPMC.size(); k++) {
        result = result + GCSPMC.get(k) + "  新增; ";
      }
      result = result.replaceAll("null", "空");
      json.put("SPXGJL", result);
    }

    if ((initField.contains("ZDR")) && ("N".equals(FormTools.getJsonKey(json.get("SH")))) && (!"D1".equals(json.get("S_VALUE")))) {
      DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
      DBObject query = new BasicDBObject();
      query.put("GCDLD01", json.get("GCDLD01").toString());
      query.put("GSXX01", json.get("GSXX01").toString());
      List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
      JSONObject GC_DJZT = new JSONObject();
      GC_DJZT.put("key", "合同待审核");
      GC_DJZT.put("value", "合同待审核");
      DBObject XGDJZT = new BasicDBObject();
      XGDJZT.put("GC_DJZT", GC_DJZT);
      dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
      json.put("GC_DJZT", GC_DJZT);
    }

    return Boolean.valueOf(true);
  }

  public Map saveBefore(Map json, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    JSONArray initField = Json.toJA(request.getParameter("initField"));
    Map userInfo = Authorization.getUserInfo(request);
    JSONObject GCLX = Json.toJO(json.get("GCLX"));
    if ("家用".equals(GCLX.get("value")))
    {
      Map DLD_DATA = (Map)json.get("DLD_DATA");

      if ((initField.contains("GCDLD01")) && (!"D1".equals(json.get("S_VALUE")))) {
        if ((!"null".equals(DLD_DATA)) && (DLD_DATA != null)) {
          Map workflowData = new HashMap();
          workflowData.put("bdbh", DLD_DATA.get("bdbh"));
          workflowData.put("GZL01", "9040");
          workflowData.put("jlbh", DLD_DATA.get("jlbh"));
          workflowData.put("PI_USERNAME", userInfo.get("CZY01"));

          workflowData.put("BZ01", "90404");

          DLD_DATA.put("GC_DJZT", FormTools.newJson("合同待审核", "合同待审核"));
          DLD_DATA.put("HTDBBH", json.get("jlbh"));
          DLD_DATA.put("DLD", FormTools.newJson("合同", "合同"));
          DLD_DATA.put("HTSCFJ", json.get("HTSCFJ"));

          BdJK bdJK = (BdJK)SpringContextHolder.getBean("bdJK");
          Map result = bdJK.saveRecord(workflowData, DLD_DATA);
          if (result.get("MSGID").equals("E")) {
            throw new RuntimeException((String)result.get("MESSAGE"));
          }

        }

      }
      else if ((initField.contains("SHR")) && (!"D1".equals(json.get("S_VALUE"))))
        if (("Y".equals(FormTools.getJsonKey(json.get("SH")))) && (!"D1".equals(json.get("S_VALUE")))) {
//判断工程登录单代办是否删除
				DBCollection dbCollection_GCDLD = MongodbHandler.getDB().getCollection("SCM_GCDLD");
				DBObject query01 = new BasicDBObject();
				query01.put("GCDLD01", json.get("GCDLD01"));
				query01.put("GSXX01", json.get("GSXX01"));
				List<DBObject> titleList01 = dbCollection_GCDLD.find(query01,new BasicDBObject("_id", 0)).toArray();
				if(titleList01.size()>=0){
					DBObject AA = new BasicDBObject(Json.toJO(titleList01.get(0)));
					String jlbh_01 = AA.get("jlbh").toString();
					String bdbh_01 = AA.get("bdbh").toString();
					String sql = "select * "+
							"from w_taskywgl a,w_task b"+
							" where a.pid = b.pid "+
							" and a.tblname = '"+bdbh_01+"' "+
							"and a.jlbh = '"	+jlbh_01 +"' ";
//					String ywglsql = "SELECT A.PID FROM W_TASKYWGL A "+
//									"WHERE A.JLBH = '"+jlbh+"' AND A.TBLNAME = '"+bdbh+"' ";
					List taskLIST01 = queryForList(workflow, sql);
					System.out.println("shfshdj");
					if(taskLIST01.size() > 0){
						throw new RuntimeException("该工程登陆单["+json.get("GSXX01")+"]待办非正常封单，合同不能审核");
					}
//					if(taskLISTywgl.size() >= 0){
//						Map logMap = (Map)taskLISTywgl.get(0);
//						String pid = logMap.get("PID").toString();
//						String tasksql = "SELECT COUNT(1) FROM W_TASK A " +
//				                 " WHERE A.PID = '" +pid +"' ";
//						List taskLIST = queryForList(workflow, tasksql);
//						if(taskLIST.size()>0){
//							throw new RuntimeException("代办有问题");
//						}
//					}
					
				}else{
					throw new RuntimeException("该工程登陆单待办非正常封单，合同不能审核");
				}
				
          mappingPart("form.scm.gcht.gchtsh", json);
          json.put("SPLB", FormTools.addWBTDH(json.get("SPLB")));
          JSONArray SPLB = Json.toJA(json.get("SPLB"));
          for (int i = 0; i < SPLB.size(); i++) {
            int GCSPBM = Integer.parseInt(SPLB.getJSONObject(i).get("GCSPBM").toString());
            int SPXX01 = Integer.parseInt(SPLB.getJSONObject(i).get("SPXX01").toString());
            String sql = "SELECT A.GCSPBM,B.SPXX01,B.SPXX02 SPDM,B.SPXX04 SPMC FROM GCSPDZ A,SPXX B WHERE MR='1'  AND A.SPXX01=B.SPXX01  AND A.GCBJ='" + 
              GCLX.get("key") + "'" + 
              " AND A.GSXX01='" + json.get("GSXX01") + "' AND GCSPBM='" + GCSPBM + "'";
            List SPMXLIST = queryForList(this.scm, sql);
            if (SPMXLIST.size() == 0) {
              throw new RuntimeException("已经不存在" + GCSPBM + "工程商品");
            }
            int CXspxx01 = Integer.parseInt(((Map)SPMXLIST.get(0)).get("SPXX01").toString());
            if (SPXX01 != CXspxx01) {
              SPLB.getJSONObject(i).put("SPXX01", Integer.valueOf(CXspxx01));
              SPLB.getJSONObject(i).put("SPMC", ((Map)SPMXLIST.get(0)).get("SPMC").toString());
              SPLB.getJSONObject(i).put("SPDM", ((Map)SPMXLIST.get(0)).get("SPDM").toString());
            }
          }
          for (int i = 0; i < SPLB.size(); i++) {
            double PFDJ = Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
            if (PFDJ <= 0.0D) {
              throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品批复单价不能小于等于0");
            }
          }
          json.put("SPLB", SPLB);

          DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
          String gsxx01 = userInfo.get("GSXX01").toString();
          String czydm = userInfo.get("CZY01").toString();
          String RYXJJBsql = "SELECT RYXX06 FROM RYXX  WHERE RYXX01='" + czydm + "' and gsxx01='" + gsxx01 + "'";
          List list = queryForList(this.scm, RYXJJBsql, null);
          int RYXX06 = 0;
          if (list.size() > 0) {
            Map m = (HashMap)list.get(0);
            RYXX06 = Integer.parseInt(m.get("RYXX06").toString());
          }
          DBCollection GCSPXJdb = MongodbHandler.getDB().getCollection("SCM_GCSPXJ");
          String TSXX = "";
          int XJJB = 0;
          try {
            if (RYXX06 > 0)
              for (int i = 0; i < SPLB.size(); i++) {
                DBObject xjquery = new BasicDBObject();
                xjquery.put("GSXX01", gsxx01);
                xjquery.put("GCSPBM", SPLB.getJSONObject(i).get("GCSPBM").toString());
                List GCSPXJList = GCSPXJdb.find(xjquery, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
                if (GCSPXJList.size() > 0) {
                  DBObject AA = (DBObject)GCSPXJList.get(i);
                  double PFDJ = Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
                  double pfxj1 = Double.parseDouble(AA.get("PFXJ1").toString());
                  double pfxj2 = Double.parseDouble(AA.get("PFXJ2").toString());
                  double pfxj3 = Double.parseDouble(AA.get("PFXJ3").toString());
                  double pfxj4 = Double.parseDouble(AA.get("PFXJ4").toString());
                  double pfxj5 = Double.parseDouble(AA.get("PFXJ5").toString());
                  if (PFDJ < pfxj1) {
                    XJJB = 1;
                    if (PFDJ < pfxj2) {
                      XJJB = 2;
                      if (PFDJ < pfxj3) {
                        XJJB = 3;
                        if (PFDJ < pfxj4) {
                          XJJB = 4;
                          if (PFDJ < pfxj5) {
                            XJJB = 5;
                          }
                        }
                      }
                    }
                  }
                  if (RYXX06 == 1) {
                    if (PFDJ < pfxj1) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if (RYXX06 == 2) {
                    if (PFDJ < pfxj2) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if (RYXX06 == 3) {
                    if (PFDJ < pfxj3) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if (RYXX06 == 4) {
                    if (PFDJ < pfxj4) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if ((RYXX06 == 5) && 
                    (PFDJ < pfxj5)) {
                    TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                    throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                  }
                }
              }
          }
          catch (Exception e)
          {
            DBCollection HTdbCollection = MongodbHandler.getDB().getCollection("SCM_GCHT");
            DBObject XJXGquery = new BasicDBObject();
            XJXGquery.put("GCHTH01", json.get("GCHTH01").toString());
            XJXGquery.put("GSXX01", json.get("GSXX01").toString());
            List titleListaa = HTdbCollection.find(XJXGquery, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
            DBObject XGDJZTaa = new BasicDBObject();
            XGDJZTaa.put("SPLB", SPLB);
            HTdbCollection.update(XJXGquery, new BasicDBObject("$set", XGDJZTaa));
            XJJB++;
            throw new RuntimeException(TSXX + "请限价" + XJJB + "级以上人审批。");
          }
          Map map = sendScmInboundInvoke("scmform.gcgl.gcdld.ins.up", json);
          System.out.println("调用接口成功");

          DBObject query = new BasicDBObject();
          query.put("GCDLD01", json.get("GCDLD01").toString());
          query.put("GSXX01", json.get("GSXX01").toString());
          List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
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
          dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
        } else if (("N".equals(FormTools.getJsonKey(json.get("SH")))) && (!"D1".equals(json.get("S_VALUE")))) {
          DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
          DBObject query = new BasicDBObject();
          query.put("GCDLD01", json.get("GCDLD01").toString());
          query.put("GSXX01", json.get("GSXX01").toString());
          List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
          JSONObject GC_DJZT = new JSONObject();
          GC_DJZT.put("key", "合同驳回");
          GC_DJZT.put("value", "合同驳回");
          DBObject XGDJZT = new BasicDBObject();
          XGDJZT.put("GC_DJZT", GC_DJZT);
          dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
          json.put("GC_DJZT", GC_DJZT);
        }
    }
    else {
      Map DLD_DATA = (Map)json.get("DLD_DATA");
      if ((!"null".equals(DLD_DATA)) && (DLD_DATA != null))
      {
        Map workflowData = new HashMap();
        workflowData.put("bdbh", DLD_DATA.get("bdbh"));
        workflowData.put("GZL01", "9093");
        workflowData.put("jlbh", DLD_DATA.get("jlbh"));
        workflowData.put("PI_USERNAME", userInfo.get("CZY01"));

        if ((initField.contains("GCDLD01")) && (!"D1".equals(json.get("S_VALUE"))))
        {
          workflowData.put("BZ01", "90934");
          DLD_DATA.put("GC_DJZT", FormTools.newJson("合同待审核", "合同待审核"));
          DLD_DATA.put("HTDBBH", json.get("jlbh"));
          DLD_DATA.put("DLD", FormTools.newJson("合同", "合同"));
          DLD_DATA.put("HTSCFJ", json.get("HTSCFJ"));

          BdJK bdJK = (BdJK)SpringContextHolder.getBean("bdJK");
          Map result = bdJK.saveRecord(workflowData, DLD_DATA);
          if (result.get("MSGID").equals("E")) {
            throw new RuntimeException((String)result.get("MESSAGE"));
          }

        }

      }
      else if ((initField.contains("SHR")) && (!"D1".equals(json.get("S_VALUE"))))
      {
        if (("Y".equals(FormTools.getJsonKey(json.get("SH")))) && (!"D1".equals(json.get("S_VALUE")))) {
//判断工程登录单代办是否删除
				DBCollection dbCollection_GCDLD = MongodbHandler.getDB().getCollection("SCM_GCDLD");
				DBObject query01 = new BasicDBObject();
				query01.put("GCDLD01", json.get("GCDLD01"));
				query01.put("GSXX01", json.get("GSXX01"));
				List<DBObject> titleList01 = dbCollection_GCDLD.find(query01,new BasicDBObject("_id", 0)).toArray();
				if(titleList01.size()>=0){
					DBObject AA = new BasicDBObject(Json.toJO(titleList01.get(0)));
					String jlbh_01 = AA.get("jlbh").toString();
					String bdbh_01 = AA.get("bdbh").toString();
					String sql = "select * "+
							"from w_taskywgl a,w_task b"+
							" where a.pid = b.pid "+
							" and a.tblname = '"+bdbh_01+"' "+
							"and a.jlbh = '"	+jlbh_01 +"' ";
//					String ywglsql = "SELECT A.PID FROM W_TASKYWGL A "+
//									"WHERE A.JLBH = '"+jlbh+"' AND A.TBLNAME = '"+bdbh+"' ";
					List taskLIST01 = queryForList(workflow, sql);
					System.out.println("shfshdj");
					if(taskLIST01.size() > 0){
						throw new RuntimeException("该工程登陆单["+json.get("GSXX01")+"]待办非正常封单，合同不能审核");
					}
//					if(taskLISTywgl.size() >= 0){
//						Map logMap = (Map)taskLISTywgl.get(0);
//						String pid = logMap.get("PID").toString();
//						String tasksql = "SELECT COUNT(1) FROM W_TASK A " +
//				                 " WHERE A.PID = '" +pid +"' ";
//						List taskLIST = queryForList(workflow, tasksql);
//						if(taskLIST.size()>0){
//							throw new RuntimeException("代办有问题");
//						}
//					}
					
				}else{
					throw new RuntimeException("该工程登陆单待办非正常封单，合同不能审核");
				}
				
          mappingPart("form.scm.gcht.gchtsh", json);
          JSONArray SPLB = Json.toJA(json.get("SPLB"));
          for (int i = 0; i < SPLB.size(); i++) {
            int GCSPBM = Integer.parseInt(SPLB.getJSONObject(i).get("GCSPBM").toString());
            int SPXX01 = Integer.parseInt(SPLB.getJSONObject(i).get("SPXX01").toString());
            String sql = "SELECT A.GCSPBM,B.SPXX01,B.SPXX02 SPDM,B.SPXX04 SPMC FROM GCSPDZ A,SPXX B WHERE MR='1'  AND A.SPXX01=B.SPXX01  AND A.GCBJ='" + 
              GCLX.get("key") + "'" + 
              " AND A.GSXX01='" + json.get("GSXX01") + "' AND GCSPBM='" + GCSPBM + "'";
            List SPMXLIST = queryForList(this.scm, sql);
            if (SPMXLIST.size() == 0) {
              throw new RuntimeException("已经不存在" + GCSPBM + "工程商品");
            }
            int CXspxx01 = Integer.parseInt(((Map)SPMXLIST.get(0)).get("SPXX01").toString());
            if (SPXX01 != CXspxx01) {
              SPLB.getJSONObject(i).put("SPXX01", Integer.valueOf(CXspxx01));
              SPLB.getJSONObject(i).put("SPMC", ((Map)SPMXLIST.get(0)).get("SPMC").toString());
              SPLB.getJSONObject(i).put("SPDM", ((Map)SPMXLIST.get(0)).get("SPDM").toString());
            }
          }
          for (int i = 0; i < SPLB.size(); i++) {
            double PFDJ = Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
            if (PFDJ <= 0.0D) {
              throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品批复单价不能小于等于0");
            }
          }
          json.put("SPLB", SPLB);
          json.put("SPLB", FormTools.addWBTDH(json.get("SPLB")));

          DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
          String gsxx01 = userInfo.get("GSXX01").toString();
          String czydm = userInfo.get("CZY01").toString();
          String RYXJJBsql = "SELECT RYXX06 FROM RYXX  WHERE RYXX01='" + czydm + "' and gsxx01='" + gsxx01 + "'";
          List list = queryForList(this.scm, RYXJJBsql, null);
          int RYXX06 = 0;
          if (list.size() > 0) {
            Map m = (HashMap)list.get(0);
            RYXX06 = Integer.parseInt(m.get("RYXX06").toString());
          }
          DBCollection GCSPXJdb = MongodbHandler.getDB().getCollection("SCM_GCSPXJ");
          String TSXX = "";
          int XJJB = 0;
          try {
            if (RYXX06 > 0)
              for (int i = 0; i < SPLB.size(); i++) {
                DBObject xjquery = new BasicDBObject();
                xjquery.put("GSXX01", gsxx01);
                xjquery.put("GCSPBM", SPLB.getJSONObject(i).get("GCSPBM").toString());
                List GCSPXJList = GCSPXJdb.find(xjquery, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
                if (GCSPXJList.size() > 0) {
                  DBObject AA = (DBObject)GCSPXJList.get(i);
                  double PFDJ = Double.parseDouble(SPLB.getJSONObject(i).get("PFDJ").toString());
                  double pfxj1 = Double.parseDouble(AA.get("PFXJ1").toString());
                  double pfxj2 = Double.parseDouble(AA.get("PFXJ2").toString());
                  double pfxj3 = Double.parseDouble(AA.get("PFXJ3").toString());
                  double pfxj4 = Double.parseDouble(AA.get("PFXJ4").toString());
                  double pfxj5 = Double.parseDouble(AA.get("PFXJ5").toString());
                  if (PFDJ < pfxj1) {
                    XJJB = 1;
                    if (PFDJ < pfxj2) {
                      XJJB = 2;
                      if (PFDJ < pfxj3) {
                        XJJB = 3;
                        if (PFDJ < pfxj4) {
                          XJJB = 4;
                          if (PFDJ < pfxj5) {
                            XJJB = 5;
                          }
                        }
                      }
                    }
                  }
                  if (RYXX06 == 1) {
                    if (PFDJ < pfxj1) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if (RYXX06 == 2) {
                    if (PFDJ < pfxj2) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if (RYXX06 == 3) {
                    if (PFDJ < pfxj3) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if (RYXX06 == 4) {
                    if (PFDJ < pfxj4) {
                      TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                      throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                    }
                  } else if ((RYXX06 == 5) && 
                    (PFDJ < pfxj5)) {
                    TSXX = SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，";
                    throw new RuntimeException(SPLB.getJSONObject(i).get("GCSPBM") + "工程商品超出本账号的限价" + XJJB + "级别，");
                  }
                }
              }
          }
          catch (Exception e)
          {
            DBCollection HTdbCollection = MongodbHandler.getDB().getCollection("SCM_GCHT");
            DBObject XJXGquery = new BasicDBObject();
            XJXGquery.put("GCHTH01", json.get("GCHTH01").toString());
            XJXGquery.put("GSXX01", json.get("GSXX01").toString());
            List titleListaa = HTdbCollection.find(XJXGquery, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
            DBObject XGDJZTaa = new BasicDBObject();
            XGDJZTaa.put("SPLB", SPLB);
            HTdbCollection.update(XJXGquery, new BasicDBObject("$set", XGDJZTaa));
            XJJB++;
            throw new RuntimeException(TSXX + "请限价" + XJJB + "级以上人审批。");
          }
          Map map = sendScmInboundInvoke("scmform.gcgl.gcdld.ins.up", json);
          System.out.println("调用接口成功");

          DBObject query = new BasicDBObject();
          query.put("GCDLD01", json.get("GCDLD01").toString());
          query.put("GSXX01", json.get("GSXX01").toString());
          List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
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
          dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
        } else if (("N".equals(FormTools.getJsonKey(json.get("SH")))) && (!"D1".equals(json.get("S_VALUE")))) {
          DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
          DBObject query = new BasicDBObject();
          query.put("GCDLD01", json.get("GCDLD01").toString());
          query.put("GSXX01", json.get("GSXX01").toString());
          List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
          JSONObject GC_DJZT = new JSONObject();
          GC_DJZT.put("key", "合同驳回");
          GC_DJZT.put("value", "合同驳回");
          DBObject XGDJZT = new BasicDBObject();
          XGDJZT.put("GC_DJZT", GC_DJZT);
          dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
          json.put("GC_DJZT", GC_DJZT);
        }
      }
    }
    json.remove("DLD_DATA");
    if ((initField.contains("SHR")) && ("D1".equals(json.get("S_VALUE")))) {
      DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
      DBObject query = new BasicDBObject();
      query.put("GCDLD01", json.get("GCDLD01").toString());
      query.put("GSXX01", json.get("GSXX01").toString());
      List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
      JSONObject GC_DJZT = new JSONObject();
      GC_DJZT.put("key", "单据已删除");
      GC_DJZT.put("value", "单据已删除");
      DBObject XGDJZT = new BasicDBObject();
      XGDJZT.put("GC_DJZT", GC_DJZT);
      XGDJZT.put("YXBJ", "无效");
      dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
      json.put("GC_DJZT", GC_DJZT);
      json.put("YXBJ", "无效");
    }
    return null;
  }
}