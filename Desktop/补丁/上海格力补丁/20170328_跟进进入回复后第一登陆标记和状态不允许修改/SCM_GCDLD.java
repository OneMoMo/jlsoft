package com.jlsoft.form.scm.gcgl.gcdl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.admin.scm.pub.adapter.ScmFormAdapter;
import com.jlsoft.framework.aop.Authorization;
import com.jlsoft.framework.forms.FormDiff;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service("scmMakeGCDLD")
public class SCM_GCDLD extends ScmFormAdapter
{
  public Boolean check(Map json, int bdbh, HttpServletRequest request)
    throws Exception
  {
    JSONArray initField = Json.toJA(request.getParameter("initField"));
    JSONArray SPLB = Json.toJA(json.get("SPLB"));
    JSONArray AZDZLB = Json.toJA(json.get("AZDZLB"));
    JSONObject SHYJ = Json.toJO(json.get("SH"));
    JSONObject DYDLBJ = Json.toJO(json.get("DYDLBJ"));
    JSONObject YSGC_DJZT1 = new JSONObject();
    YSGC_DJZT1.put("key", "��ͬ�����");
    YSGC_DJZT1.put("value", "��ͬ�����");
    JSONObject YSGC_DJZT2 = new JSONObject();
    YSGC_DJZT2.put("key", "��ͬ�����");
    YSGC_DJZT2.put("value", "��ͬ�����");
    JSONObject YSGC_DJZT3 = new JSONObject();
    YSGC_DJZT3.put("key", "��ͬ����");
    YSGC_DJZT3.put("value", "��ͬ����");
    if ((json.get("GCDLD01") == null) || (FormTools.isNull(json.get("GCDLD01")))) {
      String WBBH = "";

      DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_JXSZC");
      DBObject query = new BasicDBObject();
      if (!FormTools.isNull(json.get("SBR02"))) {
        query.put("DLZH", json.get("SBR02"));
      }
      List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
      if (titleList.size() > 0) {
        DBObject aaa = (DBObject)titleList.get(0);
        if (aaa.containsField("CJBM"))
        {
          if (aaa.get("CJBM") != null) {
            WBBH = aaa.get("CJBM").toString();
          }
        }
      }
      else
      {
        String sqlString = "SELECT WLDW01 ,WLDW02 WLDWMC ,WBBM FROM WLDW A  WHERE A.WLDW01='" + 
          json.get("WLDW01") + 
          "'";
        List LISTA = queryForList(this.scm, sqlString);
        if (LISTA.size() > 0) {
          Map aaa = (Map)LISTA.get(0);
          if (!FormTools.isNull(aaa.get("WBBM"))) {
            WBBH = aaa.get("WBBM").toString();
          }
        }
      }
      if ((WBBH == null) || (WBBH == "")) {
        throw new Exception("����ά�����ұ���");
      }
      json.put("GCDLD01", updateW_BHDJ_GCDL(this.workflow, WBBH, "DL"));
    }

    if ((initField.contains("SBR")) && (!"D1".equals(json.get("S_VALUE")))) {
      mappingPart("form.scm.gcgld.gcdld", json);
      DBObject query = new BasicDBObject();
      query.put("WLDW01", json.get("WLDW01"));
      DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_KHXX");
      List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
      if (titleList.size() > 0) {
        DBObject aaa = (DBObject)titleList.get(0);
        if (aaa == null) {
          aaa = new BasicDBObject();
        }
        json.put("QY", aaa.get("QY"));
      }
      JSONObject GCLX = Json.toJO(json.get("GCLX"));
      int GCBJ;
      if ("����".equals(GCLX.get("value")))
        GCBJ = 1;
      else {
        GCBJ = 2;
      }
      String bmSQL = "SELECT BM01,BM02 BMMC FROM  BM  WHERE GCBJ='" + GCBJ + "'" + "AND GSXX01='" + json.get("GSXX01") + "'";
      List bmLIST = queryForList(this.scm, bmSQL);
      for (int i = 0; i < bmLIST.size(); i++) {
        json.put("XSBM01", ((Map)bmLIST.get(i)).get("BM01"));
      }

      String SYDWDZ = "";
      for (int i = 0; i < AZDZLB.size(); i++) {
        String AZDZLBSJ = "";
        List SYDWDZlist = AZDZLB.getJSONObject(i).get("AZDZ") == null ? new ArrayList() : (List)AZDZLB.getJSONObject(i).get("AZDZ");

        boolean flag = true;
        for (int s = 0; s < SYDWDZlist.size(); s++) {
          int MJBJ = 0;
          if (!FormTools.isNull(((Map)SYDWDZlist.get(s)).get("MJBJ")))
            MJBJ = Integer.parseInt(((Map)SYDWDZlist.get(s)).get("MJBJ").toString());
          else {
            throw new RuntimeException("��װ��ַ�б��еİ�װ��ַ����ѡ��ĩ������ ");
          }
          if (MJBJ == 1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          throw new RuntimeException("��װ��ַ�б��еİ�װ��ַ����ѡ��ĩ������ ");
        }

        for (int j = 0; j < SYDWDZlist.size(); j++) {
          String valueString = ((Map)SYDWDZlist.get(j)).get("VALUE").toString();
          AZDZLBSJ = AZDZLBSJ + valueString;
        }
        if (AZDZLB.size() == 1)
          SYDWDZ = SYDWDZ + AZDZLBSJ;
        else {
          SYDWDZ = SYDWDZ + (AZDZLBSJ += ";");
        }
      }
      json.put("SYDWDZ", SYDWDZ);
      json.put("YSYDWDZ", json.get("SYDWDZ"));
      json.put("YSYDW", json.get("SYDW"));
      json.put("YGMDW", json.get("GMDW"));

      if (!"D1".equals(json.get("S_VALUE"))) {
        JSONObject GC_DJZT = new JSONObject();
        GC_DJZT.put("key", "��¼�����");
        GC_DJZT.put("value", "��¼�����");
        json.put("GC_DJZT", GC_DJZT);
        json.put("YXBJ", "��Ч");
      }
    }
    if ((initField.contains("PFR")) && (!"D1".equals(json.get("S_VALUE")))) {
      if ("Y".equals(SHYJ.get("key"))) {
        mappingPart("form.scm.gcgld.gcdldsh", json);
        if ((DYDLBJ.get("value").equals("��")) && 
          (!FormTools.isNull(json.get("YXDH"))))
        {
          DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
          DBObject query = new BasicDBObject();
          query.put("GCDLD01", json.get("YXDH").toString());
          query.put("GSXX01", json.get("GSXX01").toString());
          List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
          if (titleList.size() > 0) {
            DBObject YSSJ = (DBObject)titleList.get(0);
            JSONObject YXDYDLBJ = new JSONObject();
            YXDYDLBJ.put("key", "1");
            YXDYDLBJ.put("value", "��");
            JSONObject YXGC_DJZT = new JSONObject();
            YXGC_DJZT.put("key", "���������");
            YXGC_DJZT.put("value", "���������");
            DBObject XGDJZT = new BasicDBObject();
            XGDJZT.put("DYDLBJ", YXDYDLBJ);
            XGDJZT.put("GC_DJZT", YXGC_DJZT);
            if ((DYDLBJ.equals(YSSJ.get("DYDLBJ"))) && 
              (!YSGC_DJZT1.equals(YSSJ.get("GC_DJZT"))) && (!YSGC_DJZT2.equals(YSSJ.get("GC_DJZT"))) && 
              (!YSGC_DJZT3.equals(YSSJ.get("GC_DJZT")))) {
              dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
              String pidsql = "SELECT pid FROM w_taskywgl where tblname = '" + YSSJ.get("bdbh") + "' and JLBH = '" + YSSJ.get("jlbh") + "'";
              List pidLIST = queryForList(this.workflow, pidsql);
              String dbsql = "select sk01 from  w_task where pid='" + ((Map)pidLIST.get(0)).get("pid") + "'";
              List dbLIST = queryForList(this.workflow, dbsql);
              if (dbLIST.size() == 1)
              {
                JSONObject XDBZY = new JSONObject();
                String YXGC_DJZTkey = YXGC_DJZT.get("key").toString();
                XDBZY.put("���̵�¼����", ((DBObject)titleList.get(0)).get("GCDLD01"));
                XDBZY.put("����������", ((DBObject)titleList.get(0)).get("JXSMC"));
                XDBZY.put("ʹ�õ�λ", ((DBObject)titleList.get(0)).get("SYDW"));
                XDBZY.put("�걨ʱ��", ((DBObject)titleList.get(0)).get("SBSJ"));
                XDBZY.put("GC_DJZT", YXGC_DJZTkey);
                String upsql = " update w_task set SK02='" + XDBZY + "' WHERE pid='" + ((Map)pidLIST.get(0)).get("pid") + 
                  "' AND sk01 ='" + ((Map)dbLIST.get(0)).get("sk01") + "'";
                Map valuesdel = new HashMap();
                execSQL(this.workflow, upsql, valuesdel);
              }
            }
          }

        }

        if (DYDLBJ.get("value").equals("��")) {
          JSONObject GC_DJZT = new JSONObject();
          GC_DJZT.put("key", "��ǩ��ͬ");
          GC_DJZT.put("value", "��ǩ��ͬ");
          json.put("GC_DJZT", GC_DJZT);
        } else {
          JSONObject GC_DJZT = new JSONObject();
          GC_DJZT.put("key", "���������");
          GC_DJZT.put("value", "���������");
          json.put("GC_DJZT", GC_DJZT);
        }
      }
      else
      {
        JSONObject GC_DJZT = new JSONObject();
        GC_DJZT.put("key", "����");
        GC_DJZT.put("value", "����");
        json.put("GC_DJZT", GC_DJZT);
      }
    }

    if ((initField.contains("GC_GJR")) && (!"D1".equals(json.get("S_VALUE")))) {
      mappingPart("form.scm.gcgld.gcdld", json);
      mappingPart("form.scm.gcgld.gcdldsh", json);

      JSONObject GC_DJZT = Json.toJO(json.get("GC_DJZT"));
      JSONObject DLD = Json.toJO(json.get("DLD"));

      if (!FormTools.isNull(json.get("YQBJ"))) {
        if (FormTools.isNull(json.get("GC_GJQK"))) {
          throw new RuntimeException("���ڲ�������ϸ��������Ϊ��");
        }
        json.remove("YQBJ");
      }
      String SYDWDZ = "";
      for (int i = 0; i < AZDZLB.size(); i++) {
        String AZDZLBSJ = "";
        List SYDWDZlist = AZDZLB.getJSONObject(i).get("AZDZ") == null ? new ArrayList() : (List)AZDZLB.getJSONObject(i).get("AZDZ");

        for (int j = 0; j < SYDWDZlist.size(); j++) {
          String valueString = ((Map)SYDWDZlist.get(j)).get("VALUE").toString();
          AZDZLBSJ = AZDZLBSJ + valueString;
        }
        if (AZDZLB.size() == 1)
          SYDWDZ = SYDWDZ + AZDZLBSJ;
        else {
          SYDWDZ = SYDWDZ + (AZDZLBSJ += ";");
        }
      }
      json.put("SYDWDZ", SYDWDZ);

      String YSYDW = json.get("YSYDW").toString();
      String YSYDWDZ = json.get("YSYDWDZ").toString();
      String YGMDW = json.get("YGMDW").toString();
      if ((!YSYDW.equals(json.get("SYDW").toString())) || 
        (!YSYDWDZ.equals(json.get("SYDWDZ").toString())) || 
        (!YGMDW.equals(json.get("GMDW").toString())))
      {
        if (!"��ͬ".equals(DLD.get("value"))) {
          JSONObject SFHF = new JSONObject();
          SFHF.put("key", "�ظ�");
          SFHF.put("value", "�ظ�");
          json.put("DLD", SFHF);
        }
        
        /**
         * �ͻ����󣺸�������ظ����һ��½��Ǻ�״̬�����޸�
         */

//        json.put("DLXH", Integer.valueOf(0));
//        DYDLBJ.put("key", "1");
//        DYDLBJ.put("value", "��");
//        json.put("DYDLBJ", DYDLBJ);
//
//        JSONObject DJZT = new JSONObject();
//        DJZT.put("key", "��½�����");
//        DJZT.put("value", "��½�����");
//        json.put("GC_DJZT", DJZT);

        json.put("YSYDWDZ", json.get("SYDWDZ"));
        json.put("YSYDW", json.get("SYDW"));
        json.put("YGMDW", json.get("GMDW"));
      }
      if ("N".equals(SHYJ.get("key")))
      {
        JSONObject LZZD = new JSONObject();
        LZZD.put("key", "�Ƶ�");
        LZZD.put("value", "�Ƶ�");
        json.put("DLD", LZZD);
      }

      if ((!"��½�����".equals(GC_DJZT.get("value"))) && ("��".equals(DYDLBJ.get("value"))))
      {
        JSONObject GC_DJZT1 = new JSONObject();
        GC_DJZT1.put("key", "���������");
        GC_DJZT1.put("value", "���������");
        json.put("GC_DJZT", GC_DJZT1);
      }
      if (("����".equals(DLD.get("value"))) && 
        ("��".equals(DYDLBJ.get("value"))))
      {
        JSONObject GC_DJZT22 = new JSONObject();
        GC_DJZT22.put("key", "��ǩ��ͬ");
        GC_DJZT22.put("value", "��ǩ��ͬ");
        json.put("GC_DJZT", GC_DJZT22);

        if (!FormTools.isNull(json.get("YXDH")))
        {
          DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
          DBObject query = new BasicDBObject();
          query.put("GCDLD01", json.get("YXDH").toString());
          query.put("GSXX01", json.get("GSXX01").toString());
          List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
          if (titleList.size() > 0) {
            DBObject YSSJ = (DBObject)titleList.get(0);
            JSONObject YXDYDLBJ = new JSONObject();
            YXDYDLBJ.put("key", "1");
            YXDYDLBJ.put("value", "��");
            JSONObject YXGC_DJZT = new JSONObject();
            YXGC_DJZT.put("key", "���������");
            YXGC_DJZT.put("value", "���������");
            DBObject XGDJZT = new BasicDBObject();
            XGDJZT.put("DYDLBJ", YXDYDLBJ);
            XGDJZT.put("GC_DJZT", YXGC_DJZT);
            if ((DYDLBJ.equals(YSSJ.get("DYDLBJ"))) && 
              (!YSGC_DJZT1.equals(YSSJ.get("GC_DJZT"))) && (!YSGC_DJZT2.equals(YSSJ.get("GC_DJZT"))) && 
              (!YSGC_DJZT3.equals(YSSJ.get("GC_DJZT")))) {
              dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
              String pidsql = "SELECT pid FROM w_taskywgl where tblname = '" + YSSJ.get("bdbh") + "' and JLBH = '" + YSSJ.get("jlbh") + "'";
              List pidLIST = queryForList(this.workflow, pidsql);
              String dbsql = "select sk01 from  w_task where pid='" + ((Map)pidLIST.get(0)).get("pid") + "'";
              List dbLIST = queryForList(this.workflow, dbsql);
              if (dbLIST.size() == 1)
              {
                JSONObject XDBZY = new JSONObject();
                String YXGC_DJZTkey = YXGC_DJZT.get("key").toString();
                XDBZY.put("���̵�¼����", ((DBObject)titleList.get(0)).get("GCDLD01"));
                XDBZY.put("����������", ((DBObject)titleList.get(0)).get("JXSMC"));
                XDBZY.put("ʹ�õ�λ", ((DBObject)titleList.get(0)).get("SYDW"));
                XDBZY.put("�걨ʱ��", ((DBObject)titleList.get(0)).get("SBSJ"));
                XDBZY.put("GC_DJZT", YXGC_DJZTkey);
                String upsql = " update w_task set SK02='" + XDBZY + "' WHERE pid='" + ((Map)pidLIST.get(0)).get("pid") + 
                  "' AND sk01 ='" + ((Map)dbLIST.get(0)).get("sk01") + "'";
                Map valuesdel = new HashMap();
                execSQL(this.workflow, upsql, valuesdel);
              }
            }
          }
        }
      }

    }

    if ((initField.contains("GC_HFR")) && (!"D1".equals(json.get("S_VALUE")))) {
      mappingPart("form.scm.gcgld.gcdld", json);
      mappingPart("form.scm.gcgld.gcdldsh", json);
      if ((DYDLBJ.get("value").equals("��")) && 
        (!FormTools.isNull(json.get("YXDH"))))
      {
        DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
        DBObject query = new BasicDBObject();
        query.put("GCDLD01", json.get("YXDH").toString());
        query.put("GSXX01", json.get("GSXX01").toString());
        List titleList = dbCollection.find(query, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
        if (titleList.size() > 0) {
          DBObject YSSJ = (DBObject)titleList.get(0);
          JSONObject YXDYDLBJ = new JSONObject();
          YXDYDLBJ.put("key", "1");
          YXDYDLBJ.put("value", "��");
          JSONObject YXGC_DJZT = new JSONObject();
          YXGC_DJZT.put("key", "���������");
          YXGC_DJZT.put("value", "���������");
          DBObject XGDJZT = new BasicDBObject();
          XGDJZT.put("DYDLBJ", YXDYDLBJ);
          XGDJZT.put("GC_DJZT", YXGC_DJZT);
          if ((DYDLBJ.equals(YSSJ.get("DYDLBJ"))) && 
            (!YSGC_DJZT1.equals(YSSJ.get("GC_DJZT"))) && (!YSGC_DJZT2.equals(YSSJ.get("GC_DJZT"))) && 
            (!YSGC_DJZT3.equals(YSSJ.get("GC_DJZT")))) {
            dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
            String pidsql = "SELECT pid FROM w_taskywgl where tblname = '" + YSSJ.get("bdbh") + "' and JLBH = '" + YSSJ.get("jlbh") + "'";
            List pidLIST = queryForList(this.workflow, pidsql);
            String dbsql = "select sk01 from  w_task where pid='" + ((Map)pidLIST.get(0)).get("pid") + "'";
            List dbLIST = queryForList(this.workflow, dbsql);
            if (dbLIST.size() == 1)
            {
              JSONObject XDBZY = new JSONObject();
              String YXGC_DJZTkey = YXGC_DJZT.get("key").toString();
              XDBZY.put("���̵�¼����", ((DBObject)titleList.get(0)).get("GCDLD01"));
              XDBZY.put("����������", ((DBObject)titleList.get(0)).get("JXSMC"));
              XDBZY.put("ʹ�õ�λ", ((DBObject)titleList.get(0)).get("SYDW"));
              XDBZY.put("�걨ʱ��", ((DBObject)titleList.get(0)).get("SBSJ"));
              XDBZY.put("GC_DJZT", YXGC_DJZTkey);
              String upsql = " update w_task set SK02='" + XDBZY + "' WHERE pid='" + ((Map)pidLIST.get(0)).get("pid") + 
                "' AND sk01 ='" + ((Map)dbLIST.get(0)).get("sk01") + "'";
              Map valuesdel = new HashMap();
              execSQL(this.workflow, upsql, valuesdel);
            }
          }

        }

      }

      JSONObject GC_DJZT = Json.toJO(json.get("GC_DJZT"));
      if (("��������".equals(GC_DJZT.get("key"))) || 
        ("��������".equals(GC_DJZT.get("key"))) || 
        ("��������".equals(GC_DJZT.get("key")))) {
        json.put("YXBJ", "��Ч");

        JSONObject YS = new JSONObject();
        YS.put("key", "N");
        YS.put("value", "��ͬ��");
        json.put("YS", YS);
      }
      if ("��ͬ�����".equals(GC_DJZT.get("key")))
      {
        JSONObject YS = new JSONObject();
        YS.put("key", "N");
        YS.put("value", "��ͬ��");
        json.put("YS", YS);
      }
      JSONObject SH = Json.toJO(json.get("SH"));
      if ("N".equals(SH.get("key"))) {
        JSONObject YS = new JSONObject();
        YS.put("key", "�Ƶ�");
        YS.put("value", "�Ƶ�");
        json.put("YS", YS);
      }

      if ((!"��ͬ�����".equals(GC_DJZT.get("value"))) && ("��".equals(DYDLBJ.get("value")))) {
        GC_DJZT.put("key", "��ǩ��ͬ");
        GC_DJZT.put("value", "��ǩ��ͬ");
        json.put("GC_DJZT", GC_DJZT);
      }

      if ((!"��ͬ�����".equals(GC_DJZT.get("value"))) && ("��".equals(DYDLBJ.get("value")))) {
        GC_DJZT.put("key", "��ǩ��ͬ");
        GC_DJZT.put("value", "��ǩ��ͬ");
        json.put("GC_DJZT", GC_DJZT);
      }
    }
    if ((!FormTools.isNull(json.get("S_VALUE"))) && ("D1".equals(json.get("S_VALUE")))) {
      JSONObject GC_DJZT = new JSONObject();
      GC_DJZT.put("key", "������ɾ��");
      GC_DJZT.put("value", "������ɾ��");
      json.put("YXBJ", "��Ч");
    }
    return Boolean.valueOf(true);
  }

  public Boolean updateBefore(Map json, int bdbh, HttpServletRequest request)
    throws Exception
  {
    JSONArray initField = Json.toJA(request.getParameter("initField"));
    if ((initField.contains("PFR")) && 
      ("ͬ��".equals(Json.toJO(json.get("SH")).get("value")))) {
      json.put("SPLB", FormTools.addWBTDH(json.get("SPLB")));
    }
    if ((initField.contains("SBR")) && (!FormTools.isNull(json.get("GCDLD01"))) && 
      (!FormTools.isNull(json.get("S_VALUE"))) && ("D1".equals(json.get("S_VALUE")))) {
      json.put("YXBJ", "��Ч");
    }

    return Boolean.valueOf(true);
  }

  public Map saveBefore(Map json, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    Map userInfo = Authorization.getUserInfo(request);
    JSONArray initField = Json.toJA(request.getParameter("initField"));

    JSONArray LIST = new JSONArray();
    JSONArray GC_LOG = json.get("GC_LOG") == null ? new JSONArray() : Json.toJA(json.get("GC_LOG"));

    JSONObject row = new JSONObject();
    if ((initField.contains("GC_GJR")) || (initField.contains("GC_HFR"))) {
      if (initField.contains("GC_GJR")) {
        if (userInfo != null) {
          row.put("GC_CZY_TITLE", "������");
          row.put("GC_CZY", userInfo.get("CZY03"));
          row.put("GC_CZSJ_TITLE", "����ʱ��");
          row.put("GC_CZSJ", FormTools.getSysTime());
          row.put("GC_CZYJ_TITLE", "�������");
          row.put("GC_CZYJ", json.get("GC_GJQK"));
          row.put("GC_SCZP_TITLE", "�ϴ���Ƭ");
          row.put("GC_SCZP", json.get("GC_SCZP"));
          row.put("GC_XGJL_TITLE", "�޸ļ�¼");
        } else {
          row.put("GC_CZY_TITLE", "������");
          row.put("GC_CZY", "ϵͳ���ڴ���");
          row.put("GC_CZSJ_TITLE", "����ʱ��");
          row.put("GC_CZSJ", FormTools.getSysTime());
          row.put("GC_CZYJ_TITLE", "�������");
          row.put("GC_CZYJ", json.get("GC_GJQK"));
          row.put("GC_SCZP_TITLE", "�ϴ���Ƭ");
          row.put("GC_SCZP", json.get("GC_SCZP"));
          row.put("GC_XGJL_TITLE", "�޸ļ�¼");
        }

        json.remove("GC_GJQK");
        json.remove("GC_SCZP");
      } else if (initField.contains("GC_HFR"))
      {
        row.put("GC_CZY_TITLE", "�ظ���");
        row.put("GC_CZY", userInfo.get("CZY03"));
        row.put("GC_CZSJ_TITLE", "�ظ�ʱ��");
        row.put("GC_CZSJ", FormTools.getSysTime());

        row.put("GC_CZYJ_TITLE", "�ظ����");
        row.put("GC_CZYJ", json.get("GC_HFYJ"));
        row.put("GC_XGJL_TITLE", "�޸ļ�¼");
        json.remove("GC_HFYJ");
      }
      Map XmlData = new JSONObject();
      XmlData.put("bdbh", json.get("bdbh"));
      XmlData.put("jlbh", json.get("jlbh"));

      Map XGJL = new FormDiff().getFormDiff(XmlData.toString());
      Map data = (Map)XGJL.get("data");
      String GC_XGJL = "";
      if (!FormTools.isNull(data)) {
        Iterator it = data.keySet().iterator();
        while (it.hasNext()) {
          String key = it.next().toString();
          GC_XGJL = GC_XGJL + key + ":" + data.get(key) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
      }
      if (initField.contains("GC_GJR")) {
        row.put("GC_XGJL", GC_XGJL);
        row.put("GC_CZBJ", "GJ");
        LIST.add(row);
        LIST.addAll(GC_LOG);
        json.put("GC_LOG", LIST);
      }
      else if (initField.contains("GC_HFR")) {
        row.put("GC_XGJL", GC_XGJL);
        row.put("GC_CZBJ", "HF");
        LIST.add(row);
        LIST.addAll(GC_LOG);
        json.put("GC_LOG", LIST);
      }

    }

    return json;
  }
}