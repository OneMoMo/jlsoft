package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import java.io.PrintStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/SelectGCDLD"})
public class SelectGCDLD extends FormHandler
{
  @RequestMapping({"/getGCDLD.do"})
  public Map getqueryGCDLD(String XmlData, HttpServletRequest request)
    throws Exception
  {
    Map json = FormTools.mapperToMap(XmlData);

    Map query = new HashMap();
    String sq = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
    int row = queryForInt(this.workflow, sq);
    if (row == 2)
    {
      query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD2", json, request);
      query.put("QXCZY01", json.get("PCRM_CZY02"));
    }
    else {
      query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD", json, request);
    }
    query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
    List queryList = find("SCM_GCDLD", query, null, null);
    List resultlist = new ArrayList();
    for (int i = 0; i < queryList.size(); i++) {
      JSONObject queryItem = Json.toJO(queryList.get(i));
      JSONArray SPLB = Json.toJA(queryItem.get("SPLB"));
      double sumSQSL = 0.0D;
      double sumPFJE = 0.0D;
      for (int j = 0; j < SPLB.size(); j++) {
        JSONObject SPLBItem = SPLB.getJSONObject(j);
        sumSQSL += (FormTools.isNull(SPLBItem.get("SQSL")) ? 0.0D : SPLBItem.getDouble("SQSL").doubleValue());
        sumPFJE += (FormTools.isNull(SPLBItem.get("PFJE")) ? 0.0D : SPLBItem.getDouble("PFJE").doubleValue());
      }
      DecimalFormat df = new DecimalFormat("#.00");
      queryItem.put("PFJE", df.format(sumPFJE));
      queryItem.put("SQSL", Double.valueOf(sumSQSL));
      resultlist.add(queryItem);
    }
    Map result = new HashMap();
    result.put("resultlist", resultlist);
    return result;
  }

  @RequestMapping({"/getDLXH.do"})
  public Map getDLXH(String XmlData, HttpServletRequest request)
    throws Exception
  {
    Map json = FormTools.mapperToMap(XmlData);
    DBObject czyquery = new BasicDBObject();
    czyquery.put("PersonID", json.get("SYDW"));
    String SHSJ = "";
    String ynsj = "";
    String sysj = "";
    if (!FormTools.isNull(json.get("SHRQ"))) {
      SHSJ = json.get("SHRQ").toString();
    }
    long l = System.currentTimeMillis();
    java.sql.Date DQdate = new java.sql.Date(l);

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String XTSJ = dateFormat.format(DQdate).toString();
    System.out.println(dateFormat.format(DQdate));
    if (!FormTools.isNull(json.get("SHSJ"))) {
      SHSJ = json.get("SHSJ").toString();
    }
    if (SHSJ.equals("365")) {
      Calendar curr = Calendar.getInstance();
      curr.set(1, curr.get(1) - 1);
      java.util.Date date = curr.getTime();
      ynsj = dateFormat.format(date).toString();
      System.out.println(dateFormat.format(date));
    } else if (SHSJ.equals("90")) {
      Calendar curr = Calendar.getInstance();
      curr.set(2, curr.get(2) - 3);
      java.util.Date date = curr.getTime();
      sysj = dateFormat.format(date).toString();
      System.out.println(dateFormat.format(date));
    }
    Map query = new HashMap();
    String TJLX = json.get("TJLX").toString();
    if (TJLX.equals("0"))
    {
      List dboList = new ArrayList();
      DBObject dbo = new BasicDBObject();
      if (!FormTools.isNull(json.get("SYDW"))) {
        dbo = new BasicDBObject();
        dbo.put("SYDW", new BasicDBObject("$regex", json.get("SYDW")));
        dboList.add(dbo);
      }
      if (!FormTools.isNull(json.get("YHDH"))) {
        dbo = new BasicDBObject();
        dbo.put("YHDH", new BasicDBObject("$regex", json.get("YHDH")));
        dboList.add(dbo);
      }
      if (!FormTools.isNull(json.get("SYDWDZ"))) {
        dbo = new BasicDBObject();
        dbo.put("SYDWDZ", new BasicDBObject("$regex", json.get("SYDWDZ")));
        dboList.add(dbo);
      }
      if (!FormTools.isNull(json.get("AZDZ"))) {
        dbo = new BasicDBObject();
        dbo.put("SYDWDZ", new BasicDBObject("$regex", json.get("AZDZ")));
        dboList.add(dbo);
      }
      if (!FormTools.isNull(json.get("GCDLD"))) {
        dbo = new BasicDBObject();
        dbo.put("GCDLD01", new BasicDBObject("$regex", json.get("GCDLD")));
        dboList.add(dbo);
      }
      if (!FormTools.isNull(json.get("GMDW"))) {
        dbo = new BasicDBObject();
        dbo.put("GMDW", new BasicDBObject("$regex", json.get("GMDW")));
        dboList.add(dbo);
      }
      if (!FormTools.isNull(json.get("YHXM"))) {
        dbo = new BasicDBObject();
        dbo.put("YHXM", new BasicDBObject("$regex", json.get("YHXM")));
        dboList.add(dbo);
      }
      if ((!FormTools.isNull(json.get("SBRQQ"))) || (!FormTools.isNull(json.get("SBRQE")))) {
        dbo = new BasicDBObject();
        DBObject dbo2 = new BasicDBObject();
        if (!FormTools.isNull(json.get("SBRQQ"))) {
          dbo2.put("$gte", json.get("SBRQQ").toString() + " 00:00:01");
        }
        if (!FormTools.isNull(json.get("SBRQE"))) {
          dbo2.put("$lte", json.get("SBRQE").toString() + " 23:59:59");
        }
        dbo.put("SBSJ", dbo2);
        dboList.add(dbo);
      }
      if (dboList.size() > 0) {
        query.put("$or", dboList);
      }
      if (!FormTools.isNull(ynsj)) {
        DBObject dbo2 = new BasicDBObject();
        dbo2.put("$gte", ynsj);
        dbo2.put("$lte", XTSJ);
        query.put("SBSJ", dbo2);
      }
      if (!FormTools.isNull(sysj)) {
        DBObject dbo2 = new BasicDBObject();
        dbo2.put("$gte", sysj);
        dbo2.put("$lte", XTSJ);
        query.put("SBSJ", dbo2);
      }
    } else {
      query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_GCDLD1", json, request);
      if (!FormTools.isNull(ynsj)) {
        DBObject dbo2 = new BasicDBObject();
        dbo2.put("$gte", ynsj);
        dbo2.put("$lte", XTSJ);
        query.put("SBSJ", dbo2);
      }
      if (!FormTools.isNull(sysj)) {
        DBObject dbo2 = new BasicDBObject();
        dbo2.put("$gte", sysj);
        dbo2.put("$lte", XTSJ);
        query.put("SBSJ", dbo2);
      }
    }
    Map map = new HashMap();
    map.put("SBSJ", Integer.valueOf(-1));
    query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
    JSONObject jsonObject = Json.toJO(query);
    List queryList = find("SCM_GCDLD", query, null, map);
    List returnList = new ArrayList();
    for (int i = 0; i < queryList.size(); i++) {
      JSONObject queryItem = Json.toJO(queryList.get(i));
      JSONArray SPLB = Json.toJA(queryItem.get("SPLB"));
      double sum = 0.0D;
      for (int j = 0; j < SPLB.size(); j++) {
        JSONObject SPLBItem = SPLB.getJSONObject(j);
        sum += (FormTools.isNull(SPLBItem.get("SQSL")) ? 0.0D : SPLBItem.getDouble("SQSL").doubleValue());
      }
      JSONObject returnItem = new JSONObject();
      returnItem.putAll(queryItem);
      returnItem.put("SPSL", Double.valueOf(sum));

      JSONObject GC_DJZT = Json.toJO(queryItem.get("GC_DJZT"));
      if ((FormTools.isNull(GC_DJZT.get("key"))) || (GC_DJZT.getString("key").equals("登录待审核"))) {
        returnItem.put("DLXH", "");
        returnItem.put("DYDLBJ", "");
      }
      returnList.add(returnItem);
    }
    Map result = new HashMap();
    result.put("resultlist", returnList);
    return result;
  }

  @RequestMapping({"/getGCHT.do"})
  public Map getGCHT(String XmlData, HttpServletRequest request)
    throws Exception
  {
    Map json = FormTools.mapperToMap(XmlData);
    List resultList = new ArrayList();
    Map query = new HashMap();
    query = FormTools.mongoMappingPart("GCHTTZD.CXGCHT", json, request);
    String sql = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
    int row = queryForInt(this.workflow, sql);
    if (row == 2) {
      query.put("QXCZY01", json.get("PCRM_CZY02"));
    }

    JSONArray listdjzt = new JSONArray();
    JSONObject j1 = new JSONObject();
    JSONObject j2 = new JSONObject();
    j1.put("GC_DJZT.key", "待签合同");
    j2.put("GC_DJZT.key", "合同待审核");
    listdjzt.add(j2);
    listdjzt.add(j1);
    query.put("$or", listdjzt);

    query.put("BZ02", "封单");
    query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
    List queryList = find("SCM_GCHT", query, null, null);
    for (int i = 0; i < queryList.size(); i++) {
      JSONObject queryItem = Json.toJO(queryList.get(i));
      String sql2 = "SELECT GCSPBM, GCSPMC, SPXX02 SPDM, PFSL, SQDJ, PFSL*SQDJ SQJE, PFDJ, PFSL*PFDJ PFJE, YHSL-YSZZSL YHSL, WBTDH    FROM GCDLD  WHERE 1=1    AND GCDLD01 = '" + 
        queryItem.get("GCDLD01") + "'  AND GSXX01  = '" + queryItem.get("GSXX01") + "'";
      List list = queryForList(this.scm, sql2);

      JSONArray SPLB = queryItem.getJSONArray("SPLB");
      for (int j = 0; j < list.size(); j++) {
        String WBTDH = ((Map)list.get(j)).get("WBTDH").toString();
        for (int k = 0; k < SPLB.size(); k++) {
          JSONObject SPLBITEM = SPLB.getJSONObject(k);
          if (WBTDH.equals(SPLBITEM.get("WBTDH"))) {
            ((Map)list.get(j)).put("SPXX01", SPLBITEM.get("SPXX01"));
            ((Map)list.get(j)).put("SPMC", SPLBITEM.get("SPMC"));
            ((Map)list.get(j)).put("DZ", SPLBITEM.get("DZ"));
            ((Map)list.get(j)).put("AZDZ", SPLBITEM.get("AZDZ"));
            ((Map)list.get(j)).put("LXR", SPLBITEM.get("LXR"));
            ((Map)list.get(j)).put("LXDH", SPLBITEM.get("LXDH"));
            ((Map)list.get(j)).put("BZ", SPLBITEM.get("BZ"));
            break;
          }
        }

        DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCYHD");
        DBObject YHSLquery = new BasicDBObject();
        YHSLquery.put("GCDLD01", queryItem.get("GCDLD01"));
        YHSLquery.put("BZ02", new BasicDBObject("$ne", "封单"));
        YHSLquery.put("S_VALUE", new BasicDBObject("$ne", "D1"));
        List YHDtitleList = dbCollection.find(YHSLquery, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
        for (int n = 0; n < YHDtitleList.size(); n++) {
          DBObject BB = (DBObject)YHDtitleList.get(n);
          if (BB == null) {
            BB = new BasicDBObject();
          }
          List YHDSPLB = (List)BB.get("SPLB");
          for (int q = 0; q < YHDSPLB.size(); q++) {
            String YHDDJTDH = ((Map)YHDSPLB.get(q)).get("DJTDH").toString();
            double yhdyhsl = Double.parseDouble(((Map)YHDSPLB.get(q)).get("YHSL").toString());
            double yhsl = Double.parseDouble(((Map)list.get(j)).get("YHSL").toString());
            if (YHDDJTDH.equals(WBTDH)) {
              double kyhsl = yhsl + yhdyhsl;
              ((Map)list.get(j)).put("YHSL", Double.valueOf(kyhsl));
            }
          }
        }
      }

      queryItem.put("SPLB", list);
      resultList.add(queryItem);
    }

    List newResult = new ArrayList();
    for (int i = 0; i < resultList.size(); i++) {
      JSONObject jo = Json.toJO(resultList.get(i));
      Map m = new HashMap();
      m.put("BZ02", "封单");
      m.put("SH.key", "Y");
      m.put("GCDLD01", jo.get("GCDLD01"));
      List mList = find("SCM_GCJZL", m, null, null);
      if (mList.size() <= 0) {
        newResult.add(jo);
      }
    }

    Map result = new HashMap();

    result.put("resultlist", newResult);
    return result;
  }

  @RequestMapping({"/getGCHTBB.do"})
  public Map getGCHTBB(String XmlData, HttpServletRequest request)
    throws Exception
  {
    Map json = FormTools.mapperToMap(XmlData);
    Map query = new HashMap();

    query = FormTools.mongoMappingPart("GCHTTZD.CXGCHTBB", json, request);
    String sql = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
    int row = queryForInt(this.workflow, sql);
    if (row == 2) {
      query.put("QXCZY01", json.get("PCRM_CZY02"));
    }
    query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
    List queryList = find("SCM_GCHT", query, null, null);
    List resultlist = new ArrayList();
    for (int i = 0; i < queryList.size(); i++) {
      DBObject queryItem = (DBObject)queryList.get(i);
      if ("制单".equals(queryItem.get("BZ02"))) {
        queryItem.put("DJZT", "合同驳回");
      } else if ("审核".equals(queryItem.get("BZ02"))) {
        queryItem.put("DJZT", "合同待审核");
        queryItem.put("YJNR", "");
      } else if ("业务员审核".equals(queryItem.get("BZ02"))) {
        queryItem.put("DJZT", "业务员待审核");
        queryItem.put("YJNR", "");
      } else if ("工程部审核".equals(queryItem.get("BZ02"))) {
        queryItem.put("DJZT", "工程部待审核");
        queryItem.put("YJNR", "");
      } else if ("封单".equals(queryItem.get("BZ02"))) {
        queryItem.put("DJZT", "合同已审核");
        JSONObject GC_DJZT = Json.toJO(queryItem.get("GC_DJZT"));
        if (("超期作废".equals(GC_DJZT.get("key"))) || ("丢单作废".equals(GC_DJZT.get("key"))) || ("其它作废".equals(GC_DJZT.get("key")))) {
          queryItem.put("DJZT", GC_DJZT.get("key"));
        }
      }
      JSONArray SPLB = Json.toJA(queryItem.get("SPLB"));
      String sql2 = "SELECT GCSPBM, GCSPMC, SPXX02 SPDM, PFSL, SQDJ, PFSL*SQDJ SQJE, PFDJ, PFSL*PFDJ PFJE, YHSL-YSZZSL YHSL,WBTDH    FROM GCDLD  WHERE 1=1    AND GCDLD01 = '" + 
        queryItem.get("GCDLD01") + "'  AND GSXX01  = '" + queryItem.get("GSXX01") + "'";
      List list = queryForList(this.scm, sql2);
      for (int j = 0; j < SPLB.size(); j++) {
        DBObject SPLBITEM = new BasicDBObject(SPLB.getJSONObject(j));
        String WBTDH = null;
        if ("封单".equals(queryItem.get("BZ02"))) {
          WBTDH = SPLBITEM.get("WBTDH").toString();
        }
        double yhsl = 0.0D;
        if (list.size() > 0) {
          for (int k = 0; k < list.size(); k++) {
            String YHDDJTDH = ((Map)list.get(k)).get("WBTDH").toString();
            double yhdyhsl = Double.parseDouble(((Map)list.get(k)).get("YHSL").toString());
            double pfsl = Double.parseDouble(((Map)list.get(k)).get("PFSL").toString());
            if (YHDDJTDH.equals(WBTDH)) {
              yhsl += yhdyhsl;
              double wyhsl = pfsl - yhsl;
              SPLBITEM.put("YHSL", Double.valueOf(yhsl));
              SPLBITEM.put("WYHSL", Double.valueOf(wyhsl));
            }
          }
        }
        SPLBITEM.putAll(queryItem);
        resultlist.add(SPLBITEM);
      }
    }
    Map result = new HashMap();
    DBObject ztquery = new BasicDBObject();
    if ((!FormTools.isNull(json.get("BZ02"))) || (!FormTools.isNull(json.get("GCSP")))) {
      if (!FormTools.isNull(json.get("BZ02"))) {
        ztquery.put("DJZT", new BasicDBObject("$regex", json.get("BZ02").toString()));
      }
      if (!FormTools.isNull(json.get("GCSP"))) {
        JSONArray ja1 = new JSONArray();
        JSONObject jo1 = new JSONObject();
        JSONObject jo2 = new JSONObject();
        String str = json.get("GCSP").toString();
        str = str.replaceAll("\\(", "\\\\(");
        str = str.replaceAll("\\)", "\\\\)");
        DBObject ob = new BasicDBObject("$regex", str);
        ob.put("$options", "i");

        jo1.put("GCSPMC", ob);
        try {
          jo2.put("GCSPBM", Integer.valueOf(Integer.parseInt(json.get("GCSP").toString())));
          ja1.add(jo2);
        }
        catch (Exception localException)
        {
        }
        ja1.add(jo1);

        ztquery.put("$or", ja1);
      }
      DBCollection lsb = MongodbHandler.getDB().getCollection("linshibiao");
      lsb.insert(resultlist);
      List cxhtitleList = lsb.find(ztquery, new BasicDBObject("_id", Integer.valueOf(0))).toArray();
      lsb.drop();
      result.put("resultlist", cxhtitleList);
    } else {
      result.put("resultlist", resultlist);
    }
    return result;
  }

  @RequestMapping({"/BHQDLD.do"})
  public Map BHQDLD(String XmlData, HttpServletRequest request)
    throws Exception
  {
    Map json = FormTools.mapperToMap(XmlData);
    Map query = new HashMap();
    String sq = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
    int row = queryForInt(this.workflow, sq);
    if (row > 0)
    {
      query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD", json, request);
      query.put("QXCZY01", json.get("PCRM_CZY02"));
    }
    else {
      query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD", json, request);
    }
    query.put("DYDLBJ.key", "0");
    query.put("BZ02", new BasicDBObject("$ne", "封单"));
    query.put("BHQ", new BasicDBObject("$exists", Boolean.valueOf(true)));
    query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
    List queryList = find("SCM_GCDLD", query, null, null);
    int bhqtj = 0;
    if (!FormTools.isNull(json.get("BHQ"))) {
      bhqtj = Integer.parseInt(json.get("BHQ").toString());
    }
    List resultlist = new ArrayList();
    for (int i = 0; i < queryList.size(); i++) {
      JSONObject queryItem = Json.toJO(queryList.get(i));
      queryItem.put("GCYT", JLTools.isNull(queryItem.get("GCYT")) ? null : queryItem.getJSONObject("GCYT").get("value"));
      queryItem.put("SFTSGC", JLTools.isNull(queryItem.get("SFTSGC")) ? null : queryItem.getJSONObject("SFTSGC").get("value"));
      if (bhqtj == 0) {
        resultlist.add(queryItem);
      }
      else if (!FormTools.isNull(queryItem.get("BHQ"))) {
        int bhq = Integer.parseInt(queryItem.get("BHQ").toString());
        if ((bhqtj == 15) && (bhqtj >= bhq))
          resultlist.add(queryItem);
        else if ((bhqtj == 10) && (bhqtj >= bhq))
          resultlist.add(queryItem);
        else if ((bhqtj == 5) && (bhqtj >= bhq)) {
          resultlist.add(queryItem);
        }
      }
    }

    Map result = new HashMap();
    result.put("resultlist", resultlist);
    return result;
  }
}