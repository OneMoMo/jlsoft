package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
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
@RequestMapping("/AutoDSJ")
public class AutoDSJ extends FormHandler {


    /**
     * 工程结算单（GC_JSD GC_JSDSPLB）
     *http://localhost:8787/scmform/AutoDSJ/getGCJSD.do
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/getGCJSD.do")
    public String getgcjsd(String XmlData, HttpServletRequest request) throws Exception {
        String sql = null;
        DBCollection dbscm_gcjsd = MongodbHandler.getDB().getCollection("SCM_JXSJS");


        List<DBObject> gcjsdList = dbscm_gcjsd.find(new BasicDBObject(), new BasicDBObject("_id", 0)).toArray();

        if (gcjsdList.size() > 0) {
            for (int h = 0; h < gcjsdList.size(); h++) {
                DBObject gcjsdObj = new BasicDBObject(Json.toJO(gcjsdList.get(h)));

                // 拼数据 GC_JSD
                Map gcjsdRow = new HashMap();
                gcjsdRow.put("JXSJS01", gcjsdObj.get("JXSJSD01"));
                gcjsdRow.put("DLD01", gcjsdObj.get("GCDLD01"));
                gcjsdRow.put("JSD01", gcjsdObj.get("JLJE"));
                gcjsdRow.put("JSD02", gcjsdObj.get("SCJE"));
                gcjsdRow.put("JSD03", gcjsdObj.get("QTKK"));
                gcjsdRow.put("JSD04", gcjsdObj.get("ZCJLL"));
                gcjsdRow.put("JSD05", gcjsdObj.get("CJJLL"));
                gcjsdRow.put("JSD06", gcjsdObj.get("YQJLL"));
                gcjsdRow.put("JSD07", gcjsdObj.get("JSBZ"));
                gcjsdRow.put("JSD08", gcjsdObj.get("SBR"));
                gcjsdRow.put("JSD09", gcjsdObj.get("SBSJ"));
                if (!JLTools.isNull(gcjsdObj.get("PFYJ"))) {
                    Map shMap = (Map) gcjsdObj.get("PFYJ");
                    gcjsdRow.put("JSD10", shMap.get("value"));
                }
                gcjsdRow.put("JSD11", gcjsdObj.get("PFR"));
                gcjsdRow.put("JSD12", gcjsdObj.get("PFSJ"));
                gcjsdRow.put("JSD13", gcjsdObj.get("YJNR"));
                gcjsdRow.put("GSXX01", gcjsdObj.get("GSXX01"));
                gcjsdRow.put("BZ02", gcjsdObj.get("BZ02"));

                // 删除之前导入的重复数据
                // sql = "DELETE GC_JSD WHERE JXSJS01=JXSJS01?";
                // execSQL(scm, sql, gcjsdRow);
                // 执行语句插入数据
                sql = "INSERT INTO GC_JSD(JXSJS01,DLD01,JSD01,JSD02,JSD03,JSD04,JSD05,JSD06,"
                        + "                   JSD07,JSD08,JSD09,JSD10,JSD11,JSD12,JSD13,GSXX01,BZ02)"
                        + "            VALUES(JXSJS01?,DLD01?,JSD01?,JSD02?,JSD03?,JSD04?,JSD05?,JSD06?,"
                        + "                   JSD07?,JSD08?,to_date(JSD09?,'yyyy-mm-dd hh24:mi:ss'),JSD10?,JSD11?,"
                        + "				to_date(JSD12?,'yyyy-mm-dd hh24:mi:ss'),JSD13?,GSXX01?,BZ02?)";
                execSQL(scm, sql, gcjsdRow);

                // String jsd = (String)gcjsdRow.get("JSD14");
                // if(jsd==null||jsd=="") continue;

                // 拼数据 GC_JSDSPLB
                if (!JLTools.isNull(gcjsdObj.get("SPLB"))) {
                    List splbList = (List) gcjsdObj.get("SPLB");
                    boolean flag = true;
                    for (int e = 0; e < splbList.size(); e++) {
                        DBObject splbObj = new BasicDBObject(Json.toJO(splbList.get(e)));
                        Map gcjsdsplbRow = new HashMap();
                        gcjsdsplbRow.put("GSXX01", gcjsdObj.get("GSXX01"));
                        gcjsdsplbRow.put("WBTDH", splbObj.get("WBTDH"));
                        gcjsdsplbRow.put("SPXX01", splbObj.get("SPXX01"));
                        gcjsdsplbRow.put("JSD01", gcjsdObj.get("JXSJSD01"));
                        gcjsdsplbRow.put("GCZLDH", splbObj.get("GCZLDH"));
                        gcjsdsplbRow.put("JLWBDH", splbObj.get("JLWBDH"));
                        gcjsdsplbRow.put("SPLB01", splbObj.get("FXJE"));
                        gcjsdsplbRow.put("SPLB02", splbObj.get("WTSCDJ"));
                        gcjsdsplbRow.put("SPLB03", splbObj.get("WTCE"));
                        gcjsdsplbRow.put("SPLB04", splbObj.get("WTZLSL"));
                        gcjsdsplbRow.put("SPLB05", splbObj.get("BCZLSL"));
                        gcjsdsplbRow.put("SPLB06", splbObj.get("JLDJ"));
                        gcjsdsplbRow.put("SPLB07", splbObj.get("JLJE"));
                        gcjsdsplbRow.put("SPLB08", splbObj.get("WTSCJE"));
                        gcjsdsplbRow.put("SPLB09", splbObj.get("JZLBZ"));
                        gcjsdsplbRow.put("JSI01",
                                updateW_DJBHZT_NUM(scm, gcjsdObj.get("GSXX01").toString(), "GC_JSDSPLB"));
                        // 删除之前导入的重复数据
                        // sql = "DELETE GC_JSDSPLB WHERE WBTDH=WBTDH?";
                        // execSQL(scm, sql, gcjsdsplbRow);

                        // 执行语句插入数据
                        sql = "INSERT INTO GC_JSDSPLB(GSXX01,WBTDH,SPXX01,JSD01,GCZLDH,JLWBDH,SPLB01,SPLB02,SPLB03,SPLB04,SPLB05,SPLB06,SPLB07,SPLB08,SPLB09,JSI01)"
                                + "            VALUES(GSXX01?,WBTDH?,SPXX01?,JSD01?,GCZLDH?,JLWBDH?,SPLB01?,SPLB02?,SPLB03?,SPLB04?,SPLB05?,SPLB06?,SPLB07?,SPLB08?,SPLB09?,JSI01?)";
                        execSQL(scm, sql, gcjsdsplbRow);
                    }
                }

                // 回写标记
                JSONObject updataJson = new JSONObject();
                updataJson.put("XBB_DRBJ", "1");

                DBObject find = new BasicDBObject();
                find.put("jlbh", gcjsdObj.get("jlbh"));
                find.put("bdbh", gcjsdObj.get("bdbh"));

                DBObject update = new BasicDBObject("$set", updataJson);
                dbscm_gcjsd.update(find, update);
            }
        } else {
            return "无数据导入！";
        }

        System.out.println("导入成功！");
        return "导入成功！";
    }


    /**
     * 工程交资料（GC_JZL、GC_JZLSPLB、GC_JZLTM）
     *http://localhost:8787/scmform/AutoDSJ/getGCJZL.do
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/getGCJZL.do")
    public String getgcjzl(String XmlData, HttpServletRequest request) throws Exception {
        String sql = null;
        DBCollection dbscm_gcjzl = MongodbHandler.getDB().getCollection("SCM_GCJZL");

        // int PageIndex = 10000;
        // for (int i = 0; i < PageIndex; i++) { // $exists
        String[] array = {"GSXX01","GCDLD01","GCZLDH","JGSJ","SDSJ","LXDH","LXR","BZ","ZLSHBH","SBR",
                "SBSJ","PFR","PFSJ","SH","YJNR","BZ02","HTQDSJ","GCBH","JZLLXDH","YHSJ","ZLZT","LX"};
        List<DBObject> gcjzlList = dbscm_gcjzl.find(new BasicDBObject(), getShowFiled(array)).toArray();

        // .sort(new BasicDBObject("jlbh", 1)).skip(i).limit(1000)
        if (gcjzlList.size() > 0) {
            for (int h = 0; h < gcjzlList.size(); h++) {
                DBObject gcjzlObj = new BasicDBObject(Json.toJO(gcjzlList.get(h)));

                // 拼数据 GC_JZL
                // if (!"D1".equals(gcjzlObj.get("S_VALUE"))) {
                Map gcjzlRow = new HashMap();
                gcjzlRow.put("GSXX01", gcjzlObj.get("GSXX01"));
                gcjzlRow.put("DLD01", gcjzlObj.get("GCDLD01"));
                gcjzlRow.put("JZL01", gcjzlObj.get("GCZLDH"));
                gcjzlRow.put("JZL02", gcjzlObj.get("JGSJ"));
                gcjzlRow.put("JZL03", gcjzlObj.get("SDSJ"));
                gcjzlRow.put("JZL04", gcjzlObj.get("LXDH"));
                gcjzlRow.put("JZL05", gcjzlObj.get("LXR"));
                gcjzlRow.put("JZL06", gcjzlObj.get("BZ"));
                // gcjzlRow.put("JZL07", gcjzlObj.get("JDRQ"));
                gcjzlRow.put("JZL08", gcjzlObj.get("ZLSHBH"));
                gcjzlRow.put("JZL09", gcjzlObj.get("SBR"));
                gcjzlRow.put("JZL10", gcjzlObj.get("SBSJ"));
                gcjzlRow.put("JZL11", gcjzlObj.get("PFR"));
                gcjzlRow.put("JZL12", gcjzlObj.get("PFSJ"));
                if (!JLTools.isNull(gcjzlObj.get("SH"))) {
                    Map shMap = (Map) gcjzlObj.get("SH");
                    gcjzlRow.put("JZL13", shMap.get("key"));
                }
                gcjzlRow.put("JZL14", gcjzlObj.get("YJNR"));
                gcjzlRow.put("JZL15", gcjzlObj.get("ZHYCFXSJ"));
                DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    // String SDSJ = gcjzlObj.get("SDSJ").toString();
                    Date d1 = sdf.parse(gcjzlObj.get("SDSJ").toString());
                    Date d2 = sdf.parse(gcjzlObj.get("ZHYCFXSJ").toString());
                    long diff = d1.getTime() - d2.getTime();// 这样得到的差值是微秒级别
                    long days = diff / (1000 * 60 * 60 * 24);
                    gcjzlRow.put("JZL16", days);
                    d1 = sdf.parse(gcjzlObj.get("SDSJ").toString());
                    d2 = sdf.parse(gcjzlObj.get("JGSJ").toString());
                    diff = d1.getTime() - d2.getTime();// 这样得到的差值是微秒级别
                    days = diff / (1000 * 60 * 60 * 24);
                    gcjzlRow.put("JZL17", days);
                } catch (Exception e) {
                    System.out.println("收单日期、竣工日期或分销开单日期有空值！");
                }

                gcjzlRow.put("JZL19", gcjzlObj.get("BZ02"));
                gcjzlRow.put("JZL20", gcjzlObj.get("HTQDSJ"));
                gcjzlRow.put("JZL21", gcjzlObj.get("GCBH"));
                gcjzlRow.put("JZL22", gcjzlObj.get("YHSJ"));
                gcjzlRow.put("JZL23", gcjzlObj.get("JZLLXDH"));
                if (!JLTools.isNull(gcjzlObj.get("ZLZT"))) {
                    Map shMap = (Map) gcjzlObj.get("ZLZT");
                    gcjzlRow.put("JZL18", shMap.get("key"));
                }
                String jzl = (String) gcjzlRow.get("JZL01");
                if (jzl == null || jzl == "")
                    continue;
                // 删除之前导入的重复数据
                sql = "DELETE GC_JZL WHERE JZL01=JZL01?";
                execSQL(scm, sql, gcjzlRow);
                sql = "INSERT INTO GC_JZL(GSXX01,DLD01,JZL01,JZL02,JZL03,JZL04,JZL05,JZL06,"
                        + "JZL08,JZL09,JZL10,JZL11,JZL12,JZL13,JZL14,JZL15,JZL16,JZL17,JZL18,JZL19,JZL20,JZL21,JZL22,JZL23)"
                        + "VALUES(GSXX01?,DLD01?,JZL01?,to_date(JZL02?,'yyyy-mm-dd hh24:mi:ss'),to_date(JZL03?,'yyyy-mm-dd hh24:mi:ss'),JZL04?,JZL05?,JZL06?,"
                        + "JZL08?,JZL09?,to_date(JZL10?,'yyyy-mm-dd hh24:mi:ss'),JZL11?,"
                        + "to_date(JZL12?,'yyyy-mm-dd hh24:mi:ss'),JZL13?,JZL14?,to_date(JZL15?,'yyyy-mm-dd hh24:mi:ss'),JZL16?,JZL17?,JZL18?,JZL19?,to_date(JZL20?,'yyyy-mm-dd hh24:mi:ss'),JZL21?,JZL22?,JZL23?)";
                execSQL(scm, sql, gcjzlRow);

                // 拼数据 GC_JZLSPLB
                if (!JLTools.isNull(gcjzlObj.get("LX"))) {
                    List splbList = (List) gcjzlObj.get("LX");

                    for (int e = 0; e < splbList.size(); e++) {
                        DBObject splbObj = new BasicDBObject(Json.toJO(splbList.get(e)));
                        Map gcjzlsplbRow = new HashMap();
                        // JSONObject jo = Json.toJO(splbList.get(e));
                        gcjzlsplbRow.put("GSXX01", gcjzlObj.get("GSXX01"));
                        gcjzlsplbRow.put("JZL01", gcjzlObj.get("GCZLDH"));
                        gcjzlsplbRow.put("PFD01", splbObj.get("JLWBDH"));
                        gcjzlsplbRow.put("SPXX01", splbObj.get("SPXX01"));
                        gcjzlsplbRow.put("WBTDH", splbObj.get("WBTDH"));
                        gcjzlsplbRow.put("JZLI01", updateW_DJBHZT_NUM(scm, gcjzlObj.get("GSXX01").toString(), "GC_JZLSPLB"));
                        gcjzlsplbRow.put("JZLI02", splbObj.get("BCZLSL"));
                        gcjzlsplbRow.put("JZLI03", splbObj.get("THSL"));
                        gcjzlsplbRow.put("JZLI04", splbObj.get("FXDJ"));
                        gcjzlsplbRow.put("JZLI05", splbObj.get("PFJE"));
                        gcjzlsplbRow.put("JZLI06", splbObj.get("BCZLSL"));
                        gcjzlsplbRow.put("JZLI07", splbObj.get("WSJSL"));
                        gcjzlsplbRow.put("JZLI08", splbObj.get("ZLSL"));
                        gcjzlsplbRow.put("JZLI09", splbObj.get("YFHSL"));
                        gcjzlsplbRow.put("JZLI10", splbObj.get("BZ"));
                        gcjzlsplbRow.put("JZLI11", splbObj.get("SFDZ"));
                        gcjzlsplbRow.put("JZLI12", splbObj.get("BZJDJ"));
                        gcjzlsplbRow.put("JZLI13", splbObj.get("BCFHBZJ"));
                        gcjzlsplbRow.put("JZLI14", splbObj.get("JSBJ"));

//                        // 删除之前导入的重复数据
//                        sql = "DELETE GC_JZLSPLB WHERE JZL01=JZL01?";
//                        execSQL(scm, sql, gcjzlsplbRow);

                        // 执行语句插入数据
                        sql = "INSERT INTO GC_JZLSPLB(GSXX01,JZL01,JZLI01,PFD01,SPXX01,WBTDH,JZLI02,JZLI03,JZLI04,JZLI05,JZLI06,JZLI07,JZLI08,JZLI09,JZLI10,JZLI11,JZLI12,JZLI13,JZLI14)"
                                + "            VALUES(GSXX01?,JZL01?,JZLI01?,PFD01?,SPXX01?,WBTDH?,JZLI02?,JZLI03?,JZLI04?,JZLI05?,JZLI06?,JZLI07?,JZLI08?,JZLI09?,JZLI10?,JZLI11?,JZLI12?,JZLI13?,JZLI14?)";
                        execSQL(scm, sql, gcjzlsplbRow);
                    }
                }
                // 拼数据 GC_JZLTM
                if (!JLTools.isNull(gcjzlObj.get("SCLB"))) {
                    List tmList = (List) gcjzlObj.get("SCLB");

                    for (int e = 0; e < tmList.size(); e++) {
                        DBObject tmObj = new BasicDBObject(Json.toJO(tmList.get(e)));
                        Map gcjzltmRow = new HashMap();
                        gcjzltmRow.put("GSXX01", gcjzlObj.get("GSXX01"));
                        gcjzltmRow.put("JZL01", gcjzlObj.get("GCZLDH"));
                        gcjzltmRow.put("TM02", tmObj.get("SWJ"));
                        gcjzltmRow.put("TM03", tmObj.get("SNJ"));
                        gcjzltmRow.put("TM04", tmObj.get("AZDZ"));
                        gcjzltmRow.put("TM05", tmObj.get("LXDH"));
                        gcjzltmRow.put("TM06", tmObj.get("GGXH"));

//                        // 删除之前导入的重复数据
//                        sql = "DELETE GC_JZLTM WHERE JZL01=JZL01?";
//                        execSQL(scm, sql, gcjzltmRow);
                        // 执行语句插入数据
                        sql = "INSERT INTO GC_JZLTM(GSXX01,JZL01,TM02,TM03,TM04,TM05,TM06)"
                                + "            VALUES(GSXX01?,JZL01?,TM02?,TM03?,TM04?,TM05?,TM06?)";
                        execSQL(scm, sql, gcjzltmRow);
                    }
                }
                // 回写标记
                JSONObject updataJson = new JSONObject();
                updataJson.put("XBB_DRBJ", "1");

                DBObject find = new BasicDBObject();
                find.put("jlbh", gcjzlObj.get("jlbh"));
                find.put("bdbh", gcjzlObj.get("bdbh"));

                DBObject update = new BasicDBObject("$set", updataJson);
                dbscm_gcjzl.update(find, update);
            }
            // }
        } else {
            return "无数据导入！";
        }
        // }

        return "导入成功！";
    }


    /**
     * 工程登录单（GC_DLD、GC_DLDSPLB、GC_DLDAZLB）
     *
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/getGCDLD.do")
    public String getGCDLD(String XmlData, HttpServletRequest request) throws Exception {
        String sql = null;
        DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");

        int PageIndex = 10000;
        for (int i = 0; i < PageIndex; i++) { //$exists
            List<DBObject> gcdldList = dbscm_gcdld.find(new BasicDBObject("XBB_DRBJ", new BasicDBObject("$exists", false)),
                    new BasicDBObject("_id", 0)).sort(new BasicDBObject("jlbh", 1)).skip(i).limit(1000).toArray();

            if (gcdldList.size() > 0) {
                for (int h = 0; h < gcdldList.size(); h++) {
                    DBObject SCD = new BasicDBObject(Json.toJO(gcdldList.get(h)));

                    //拼数据 GC_DLD
                    Map SCD_ROW = new HashMap();
                    SCD_ROW.put("GSXX01", SCD.get("GSXX01"));

                    if (!JLTools.isNull(SCD.get("BM01"))) {
                        sql = "select a.scm_bm01 from w_bm a " +
                                " where a.bm01 = '" + SCD.get("BM01").toString() + "'";
                        Map bmMap = queryForMap(workflow, sql, null);
                        if (!JLTools.isNull(bmMap)) {
                            SCD_ROW.put("BM01", bmMap.get("SCM_BM01"));
                        } else {
                            return "部门为空！";
                        }
                    }
                    SCD_ROW.put("WLDW01", SCD.get("WLDW01"));
                    SCD_ROW.put("DLD42", SCD.get("gzry01"));
                    SCD_ROW.put("dld01", SCD.get("GCDLD01"));
                    SCD_ROW.put("dld02", SCD.get("GCDLD01"));

                    if (!JLTools.isNull(SCD.get("GCLX"))) {
                        Map gclxMap = (Map) SCD.get("GCLX");
                        SCD_ROW.put("dld03", gclxMap.get("key"));
                    }

                    //拼数据 GC_DLDSPLB SPLB
                    if (!JLTools.isNull(SCD.get("SPLB"))) {
                        Map dldsplbRow = new HashMap();
                        sql = "INSERT INTO GC_DLDSPLB(gsxx01,DLD01,SPXX01,SPLB02,WBTDH,SPLB04)" +
                                "                VALUES(gsxx01?,DLD01?,SPXX01?,SPLB02?,WBTDH?,SPLB04?)";
                        execSQL(workflow, sql, dldsplbRow);
                    }

                    //拼数据 GC_DLDAZLB AZDZLB
                    if (!JLTools.isNull(SCD.get("AZDZLB"))) {
                        Map dldazlbRow = new HashMap();

                        sql = "INSERT INTO GC_DLDAZLB(gsxx01,DLD01,AZLB02,AZLB03,KHDQ01,AZLB04,AZLB01)" +
                                "                VALUES(gsxx01?,DLD01?,AZLB02?,AZLB03?,KHDQ01?,AZLB04?,AZLB01?)";
                        execSQL(workflow, sql, dldazlbRow);
                    }

                    //执行语句插入数据
                    sql = "INSERT INTO GC_DLD(GSXX01,BM01,wldw01,DLD42,dld01,dld02,dld03,dld04,dld05," +
                            "                   dld06,dld07,dld08,dld09,dld10,dld11,dld12,dld13,dld14," +
                            "                   dld15,dld16,dld17,dld18,dld19,dld20,dld21,dld22,dld23," +
                            "                   dld24,dld25,dld26,dld27,dld28,dld29,dld30,dld31,dld32," +
                            "                   dld33,dld34,dld35,dld36,dld37,dld38,dld39,dld40,dld41)" +
                            "            VALUES(GSXX01?,BM01?,wldw01?,DLD42?,dld01?,dld02?,dld03?,dld04?,dld05?," +
                            "                   dld06?,dld07?,dld08?,dld09?,dld10?,dld11?,dld12?,dld13?,dld14?," +
                            "                   dld15?,dld16?,dld17?,dld18?,dld19?,dld20?,dld21?,dld22?,dld23?," +
                            "                   dld24?,dld25?,dld26?,dld27?,dld28?,dld29?,dld30?,dld31?,dld32?," +
                            "                   dld33?,dld34?,dld35?,dld36?,dld37?,dld38?,dld39?,dld40?,dld41?)";
                    execSQL(workflow, sql, SCD_ROW);

                    //回写标记
                    JSONObject updataJson = new JSONObject();
                    updataJson.put("XBB_DRBJ", "1");

                    DBObject find = new BasicDBObject();
                    find.put("jlbh", SCD.get("jlbh"));
                    find.put("bdbh", SCD.get("bdbh"));

                    DBObject update = new BasicDBObject("$set", updataJson);
                    dbscm_gcdld.update(find, update);
                }
            } else {
                return "无数据导入！";
            }
        }

        return "导入成功！";
    }


    /**
     * 合同调整单 (GC_HTTZD  GC_HTTZDSPLB)
     *
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/importHTTZD.do")
    public String importHTTZD(String XmlData, HttpServletRequest request) throws Exception {
        String sql = null;
        DBCollection HTTZD_CON = MongodbHandler.getDB().getCollection("SCM_GCHTTZD");

        int PageIndex = 100;
        String[] array = {"GSXX01", "GCHTH01", "GCDLD01", "JXSMC", "SYDW", "SYDWDZ", "GCMS", "HTXSFS", "GCLX", "GCYT",
                "ZDR", "ZDRDM", "ZDSJ", "SHR", "SHRDM", "GC_DJZT", "SHSJ", "YJNR", "HTSJ", "SPLB", "HTSJ", "jlbh", "bdbh"};
        DBObject show_filed = getShowFiled(array);
        for (int i = 0; i < PageIndex; i++) { //$exists
            //new BasicDBObject("XBB_DRBJ", new BasicDBObject("$exists", false))
            List<DBObject> HTTZD_LIST = HTTZD_CON.find(new BasicDBObject(),
                    show_filed).sort(new BasicDBObject("jlbh", 1)).skip(i).limit(1000).toArray();
            if (HTTZD_LIST.size() > 0) {
                for (int h = 0; h < HTTZD_LIST.size(); h++) {
                    DBObject HTTZD = new BasicDBObject(Json.toJO(HTTZD_LIST.get(h)));

                    //拼数据 GC_SCD
                    Map TZD_ROW = new HashMap();
                    TZD_ROW.put("GSXX01", HTTZD.get("GSXX01"));
                    TZD_ROW.put("DLD01", HTTZD.get("GCDLD01"));
                    TZD_ROW.put("TZD01", HTTZD.get("GCHTH01"));
                    TZD_ROW.put("TZD02", HTTZD.get("ZDR"));
                    TZD_ROW.put("TZD03", HTTZD.get("ZDRDM"));
                    TZD_ROW.put("TZD04", HTTZD.get("HTSJ"));
                    TZD_ROW.put("TZD05", HTTZD.get("SYDW"));
                    TZD_ROW.put("TZD06", HTTZD.get("SYDWDZ"));
//					TZD_ROW.put("TZD07", HTTZD.get("HTXSFS"));
                    TZD_ROW.put("TZD08", HTTZD.get("SHR"));
                    TZD_ROW.put("TZD09", HTTZD.get("SHSJ"));
                    TZD_ROW.put("TZD10", HTTZD.get("YJNR"));
                    TZD_ROW.put("TZD12", HTTZD.get("JXSMC"));

                    sql = "SELECT TZD01 FROM GC_HTTZD WHERE TZD01 = '" + TZD_ROW.get("TZD01") + "'" +
                            " AND DLD01 = '" + TZD_ROW.get("DLD01") + "' ";
                    if (queryForList(scm, sql, TZD_ROW).size() > 0) {
                        continue;
                    }

                    if (!JLTools.isNull(HTTZD.get("GC_DJZT"))) {
                        Map GCLX_MAP = (Map) HTTZD.get("GC_DJZT");
                        TZD_ROW.put("TZD11", GCLX_MAP.get("key"));
                    }

                    if (!JLTools.isNull(HTTZD.get("HTXSFS"))) {
                        Map GCLX_MAP = (Map) HTTZD.get("HTXSFS");
                        TZD_ROW.put("TZD07", GCLX_MAP.get("key"));
                    }
                    if (!JLTools.isNull(HTTZD.get("GCYT"))) {
                        Map GCYT_Map = (Map) HTTZD.get("GCYT");
                        TZD_ROW.put("TZD13", GCYT_Map.get("key"));
                    }

                    JSONArray HTTZD_SPLB = Json.toJA(HTTZD.get("SPLB"));
                    for (int b = 0; b < HTTZD_SPLB.size(); b++) {
                        JSONObject SPLB = HTTZD_SPLB.getJSONObject(b);
                        Map TZDSPLBROW = new HashMap();
                        if (JLTools.isNull(SPLB.get("SPXX01"))) {
                            //商品信息不存在则过滤这条数据
                            continue;
                        }

                        TZDSPLBROW.put("DLD01", HTTZD.get("GCDLD01"));
                        TZDSPLBROW.put("TZD01", HTTZD.get("GCHTH01"));
                        TZDSPLBROW.put("GSXX01", HTTZD.get("GSXX01"));
                        TZDSPLBROW.put("SPXX01", SPLB.get("SPXX01"));

                        sql = "SELECT TZD01 FROM GC_HTTZDSPLB WHERE TZD01 = '" + TZDSPLBROW.get("TZD01") + "'" +
                                " AND DLD01 = '" + TZDSPLBROW.get("DLD01") + "'  AND SPXX01 = '" + TZDSPLBROW.get("SPXX01") + "'";
                        if (queryForList(scm, sql, TZDSPLBROW).size() > 0) {
                            continue;
                        }

                        TZDSPLBROW.put("SPLB01", SPLB.get("GCSPBM"));
                        TZDSPLBROW.put("SPLB02", SPLB.get("GCSPMC"));
                        TZDSPLBROW.put("SPLB03", SPLB.get("YHSL"));
                        TZDSPLBROW.put("SPLB04", SPLB.get("TZSL"));
                        TZDSPLBROW.put("SPLB05", SPLB.get("PFSL"));
                        TZDSPLBROW.put("SPLB06", SPLB.get("SQDJ"));
                        TZDSPLBROW.put("SPLB07", SPLB.get("SQJE"));//
                        TZDSPLBROW.put("SPLB08", SPLB.get("PFDJ"));
                        TZDSPLBROW.put("SPLB09", SPLB.get("PFJE"));
                        TZDSPLBROW.put("SPLB10", SPLB.get("DZ"));//
                        TZDSPLBROW.put("SPLB11", SPLB.get("AZDZ"));
                        TZDSPLBROW.put("SPLB12", SPLB.get("LXR"));
                        TZDSPLBROW.put("SPLB13", SPLB.get("LXDH"));
                        TZDSPLBROW.put("SPLB14", SPLB.get("BZ"));


                        //插入副表数据
                        //拼数据 GC_DLDSPLB SPLB
                        if (!JLTools.isNull(TZDSPLBROW)) {
                            sql = "INSERT INTO GC_HTTZDSPLB(DLD01,TZD01,GSXX01,SPXX01,SPLB01,SPLB02,SPLB03,SPLB04,SPLB05,SPLB06," +
                                    "SPLB07,SPLB08,SPLB09,SPLB10,SPLB11,SPLB12,SPLB13,SPLB14)" +
                                    "                VALUES(DLD01?,TZD01?,GSXX01?,SPXX01?,SPLB01?,SPLB02?,SPLB03?,SPLB04?,SPLB05?,SPLB06?," +
                                    "SPLB07?,SPLB08?,SPLB09?,SPLB10?,SPLB11?,SPLB12?,SPLB13?,SPLB14?)";
                            execSQL(scm, sql, TZDSPLBROW);
                        }

                    }


                    //执行语句插入数据
                    //插入主表数据
                    sql = "INSERT INTO GC_HTTZD(GSXX01,DLD01,TZD01,TZD02,TZD03,TZD04,TZD05,TZD06,TZD07,TZD08,TZD09,TZD10,TZD11,TZD12,TZD13)" +
                            "            VALUES(GSXX01?,DLD01?,TZD01?,TZD02?,TZD03?," +
                            "to_date(TZD04?,'yyyy-mm-dd hh24:mi:ss'),TZD05?,TZD06?,TZD07?,TZD08?,to_date(TZD09?,'yyyy-mm-dd hh24:mi:ss'),TZD10?,TZD11?,TZD12?,TZD13?)";
                    execSQL(scm, sql, TZD_ROW);

                    //回写标记
                    JSONObject updataJson = new JSONObject();
                    updataJson.put("XBB_DRBJ", "1");

                    DBObject find = new BasicDBObject();
                    find.put("jlbh", HTTZD.get("jlbh"));
                    find.put("bdbh", HTTZD.get("bdbh"));

                    DBObject update = new BasicDBObject("$set", updataJson);
                    HTTZD_CON.update(find, update);
                }
            } else {
                return "无数据导入！";
            }
        }

        return "导入成功！";
    }


    /**
     * 收差单  (GC_SCD   GC_SCDSPLB)
     *http://localhost:8787/scmform/AutoDSJ/importSCD.do
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/importSCD.do")
    public String importSCD(String XmlData, HttpServletRequest request) throws Exception {
        String sql = null;
        DBCollection GCSCD_CON = MongodbHandler.getDB().getCollection("SCM_GCTSSC");
//		DBCollection GCTSSCD_CON = MongodbHandler.getDB().getCollection("SCM_GCTSSCD");

        String[] array = {"GSXX01", "JXSJSD01", "GCDLD01", "JXSMC", "SYDW", "GCMS", "JSBZ", "GCLX", "GCYT",
                "SBR", "SBRDM", "SBSJ", "PFR", "PFRDM", "PFSJ", "SHYJ", "SPLB", "FHJE", "SCJE", "jlbh", "bdbh"};
        DBObject show_filed = getShowFiled(array);

        DBObject query = new BasicDBObject();
//			query.put("XBB_DRBJ",new BasicDBObject("$exists", false));
        query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
        List<DBObject> GCSCD_LIST = GCSCD_CON.find(query, show_filed).toArray();
        if (GCSCD_LIST.size() > 0) {
            for (int h = 0; h < GCSCD_LIST.size(); h++) {
                DBObject SCD = new BasicDBObject(Json.toJO(GCSCD_LIST.get(h)));

                //拼数据 GC_SCD
                Map SCD_ROW = new HashMap();
                SCD_ROW.put("SCDH01", updateW_DJBHZT_NUM(scm, SCD.get("GSXX01").toString(), "GC_TSSCD"));//主表唯一标识
//                SCD_ROW.put("SCDH01", updateW_DJBHZT_NUM(scm, SCD.get("GSXX01").toString(), "GC_SCD"));//主表唯一标识
                SCD_ROW.put("GSXX01", SCD.get("GSXX01"));
                SCD_ROW.put("DLD01", SCD.get("GCDLD01"));
                SCD_ROW.put("SCD01", SCD.get("JXSJSD01"));
                SCD_ROW.put("SCD02", SCD.get("JXSMC"));
                SCD_ROW.put("SCD03", SCD.get("SYDW"));
                SCD_ROW.put("SCD04", SCD.get("GCMS"));
                SCD_ROW.put("SCD05", SCD.get("SHYJ"));
                SCD_ROW.put("SCD06", SCD.get("FHJE"));
                SCD_ROW.put("SCD07", SCD.get("SCJE"));
                SCD_ROW.put("SCD10", SCD.get("JSBZ"));
                SCD_ROW.put("SCD11", SCD.get("SBR"));
                SCD_ROW.put("SCD12", SCD.get("SBRDM"));
                SCD_ROW.put("SCD13", SCD.get("SBSJ"));
                SCD_ROW.put("SCD14", SCD.get("PFR"));
                SCD_ROW.put("SCD15", SCD.get("PFRDM"));
                SCD_ROW.put("SCD16", SCD.get("PFSJ"));
                SCD_ROW.put("SCDBJ", 1);

                if (!JLTools.isNull(SCD.get("GCLX"))) {
                    Map GCLX_MAP = (Map) SCD.get("GCLX");
                    SCD_ROW.put("SCD08", GCLX_MAP.get("key"));
                }
                if (!JLTools.isNull(SCD.get("GCYT"))) {
                    Map GCYT_Map = (Map) SCD.get("GCYT");
                    SCD_ROW.put("SCD09", GCYT_Map.get("key"));
                }

                JSONArray SCD_SPLB = Json.toJA(SCD.get("SPLB"));
                for (int b = 0; b < SCD_SPLB.size(); b++) {
                    JSONObject SPLB = SCD_SPLB.getJSONObject(b);
                    Map SCDSPLBROW = new HashMap();
                    SCDSPLBROW.put("SCDH01", SCD_ROW.get("SCDH01"));//主表唯一标识
                    SCDSPLBROW.put("SCDI01", updateW_DJBHZT_NUM(scm, SCD.get("GSXX01").toString(), "GC_TSSCDITEM"));//副表唯一标识
//                    SCDSPLBROW.put("SCDI01", updateW_DJBHZT_NUM(scm, SCD.get("GSXX01").toString(), "GC_SCDITEM"));//副表唯一标识
                    SCDSPLBROW.put("DLD01", SCD.get("GCDLD01"));
                    SCDSPLBROW.put("WBTDH", SPLB.get("WBTDH"));
                    SCDSPLBROW.put("JLWBDH", SPLB.get("JLWBDH"));
                    SCDSPLBROW.put("GSXX01", SCD.get("GSXX01"));
                    SCDSPLBROW.put("SPXX01", SPLB.get("SPXX01"));
                    SCDSPLBROW.put("SPLB01", SPLB.get("SCDJ"));
                    SCDSPLBROW.put("SPLB02", SPLB.get("SCCE"));
                    SCDSPLBROW.put("SPLB03", SPLB.get("SCSL"));
                    SCDSPLBROW.put("SPLB05", SPLB.get("SCBZ"));
                    SCDSPLBROW.put("SPLB06", SPLB.get("THSL"));
                    SCDSPLBROW.put("SPLB07", SPLB.get("PFDJ"));
                    SCDSPLBROW.put("SPLB08", SPLB.get("WTSCDJ"));//
                    SCDSPLBROW.put("SPLB09", SPLB.get("WTCE"));
                    SCDSPLBROW.put("SPLB10", SPLB.get("WTZLSL"));
                    SCDSPLBROW.put("SPLB11", SPLB.get("YYWTZLSL"));//
                    SCDSPLBROW.put("SPLB12", SPLB.get("ZLSL"));
                    SCDSPLBROW.put("SPLB13", SPLB.get("WTSCJE"));
                    SCDSPLBROW.put("SPLB14", SPLB.get("AZDZMX"));
                    SCDSPLBROW.put("SPLB15", SPLB.get("LXRMX"));
                    SCDSPLBROW.put("SPLB16", SPLB.get("LXDHMX"));
                    SCDSPLBROW.put("SPLB17", SPLB.get("PFDI01"));
                    SCDSPLBROW.put("SPLB18", SPLB.get("KHYHD01"));

                    if (!JLTools.isNull(SPLB.get("SCYY"))) {
                        Map GCYT_Map = (Map) SPLB.get("SCYY");
                        SCD_ROW.put("SPLB04", GCYT_Map.get("key"));
                    }

                    //插入副表数据
                    //拼数据 GC_DLDSPLB SPLB
                    if (!JLTools.isNull(SCDSPLBROW)) {
                        sql = "INSERT INTO GC_SCDITEM(SCDI01,SCDH01,DLD01,WBTDH,JLWBDH,GSXX01,SPXX01,SPLB01,SPLB02,SPLB03,SPLB04,SPLB05,SPLB06," +
                                "SPLB07,SPLB08,SPLB09,SPLB10,SPLB11,SPLB12,SPLB13,SPLB14,SPLB15,SPLB16,SPLB17,SPLB18)" +
                                "                VALUES(SCDI01?,SCDH01?,DLD01?,WBTDH?,JLWBDH?,GSXX01?,SPXX01?,SPLB01?,SPLB02?,SPLB03?,SPLB04?,SPLB05?,SPLB06?," +
                                "SPLB07?,SPLB08?,SPLB09?,SPLB10?,SPLB11?,SPLB12?,SPLB13?,SPLB14?,SPLB15?,SPLB16?,SPLB17?,SPLB18?)";
                        execSQL(scm, sql, SCDSPLBROW);
                    }

                }


                //执行语句插入数据
                //插入主表数据
                sql = "INSERT INTO GC_SCD(SCDH01,GSXX01,DLD01,SCD01,SCD02,SCD03,SCD04,SCD05,SCD06,SCD07," +
                        "                   SCD08,SCD09,SCD10,SCD11,SCD12,SCD13,SCD14,SCD15,SCD16,SCDBJ)" +
                        "            VALUES(SCDH01?,GSXX01?,DLD01?,SCD01?,SCD02?,SCD03?,SCD04?,SCD05?,SCD06?,SCD07?," +
                        "                   SCD08?,SCD09?,SCD10?,SCD11?,SCD12?,to_date(SCD13?,'yyyy-mm-dd hh24:mi:ss'),SCD14?,SCD15?,to_date(SCD16?,'yyyy-mm-dd hh24:mi:ss'),SCDBJ?)";
                execSQL(scm, sql, SCD_ROW);

                //回写标记
                JSONObject updataJson = new JSONObject();
                updataJson.put("XBB_DRBJ", "1");

                DBObject find = new BasicDBObject();
                find.put("jlbh", SCD.get("jlbh"));
                find.put("bdbh", SCD.get("bdbh"));

                DBObject update = new BasicDBObject("$set", updataJson);
                GCSCD_CON.update(find, update);
            }
        } else {
            return "无数据导入！";
        }

        return "导入成功！";
    }

    /**
     * 返回查询的字段集
     *
     * @param array
     * @return
     */
    public DBObject getShowFiled(String[] array) {
        DBObject query = new BasicDBObject();
        for (int i = 0; i < array.length; i++) {
            query.put(array[i], 1);
        }
        return query;
    }
}
