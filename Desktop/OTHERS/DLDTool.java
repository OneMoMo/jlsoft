package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import org.apache.jasper.tagplugins.jstl.core.If;
import org.apache.lucene.search.Query;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import sun.java2d.pipe.PixelDrawPipe;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by jl-soft on 2017/5/15.
 */

@Component
@RequestMapping("/DLDTool")
public class DLDTool extends FormHandler {

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/XFCFCS.do")
    public List XFCFCS()throws Exception {

        long l = System.currentTimeMillis();
        Date DQdate = new Date(l);
        //转换提日期输出格式
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String today =  dateFormat.format(DQdate).toString();//当天日期
        DBCollection dbscm_gcdld = MongodbHandler.getDB().getCollection("SCM_GCDLD");

        DBObject query = new BasicDBObject();
        query.put("BHQ", new BasicDBObject("$gte", 60));
        query.put("GCLX.key", "1");
        query.put("DYDLBJ.key", "0");
        query.put("BZ02", "跟进");
        query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
        query.put("ZFZT", new BasicDBObject("$ne", "1"));
        List<DBObject> gcdldList = dbscm_gcdld.find(query, new BasicDBObject("_id", 0)).toArray();
        DBCollection dbscm_gcht = MongodbHandler.getDB().getCollection("SCM_GCHT");

        for (int i = 0; i < gcdldList.size(); i++) {
            JSONObject updataJson = new JSONObject();

            DBObject find = new BasicDBObject();
            DBObject gcdldObj = new BasicDBObject(Json.toJO(gcdldList.get(i)));
            find.put("GCDLD01", gcdldObj.get("GCDLD01"));
            find.put("GSXX01", gcdldObj.get("GSXX01"));

            //验证是否签合同
            List<DBObject> gchtList = dbscm_gcht.find(find, new BasicDBObject("_id", 0)).toArray();
            int YQCS = 0;
            int cs = 0;
            int YQTS = 30;
            if (gchtList.size() <= 0) {

                int BHQa = Integer.parseInt(gcdldObj.get("BHQ").toString());
                if (BHQa >= 60) {
                    cs = (BHQa - 60) / 30 + 1;
                }

                if (!JLTools.isNull(gcdldObj.get("YQCS"))) {
                    YQCS = JLTools.strToInt(gcdldObj.get("YQCS").toString()) - cs;
                } else {
                    YQCS = 0;
                }
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(gcdldObj.get("PFSJ").toString());
                Calendar cal = Calendar.getInstance();
                cal.setTime(date);
                //延期天数
                cal.add(Calendar.DATE, (YQTS * YQCS) + YQTS);
                //到期日
                String DQR = (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
                updataJson.put("DQR", DQR);
                //保护期
                long BHQ = JLTools.getDistanceDays(DQR, today);//到期日减当天日期  为负则过期
                if (BHQ < 0) {
                    System.out.println("*********");
                    BHQ = 0;
                    System.out.println("Q:" + gcdldObj.get("PFSJ").toString() + "  " + DQR);
                }
                updataJson.put("BHQ", BHQ);
                updataJson.put("YQCS", YQCS);
                if (BHQ > 32) {
                    System.out.println("****");
                }
                System.out.println("制单时间" + gcdldObj.get("PFSJ").toString());
                System.out.println("到期日" + DQR);
                System.out.println("延期次数" + YQCS);
                System.out.println("保护器" + BHQ);
                System.out.println("总条数" + gcdldList.size() + "*************当前条数" + i);
                int sjc = JLTools.comparedate(today, DQR, "yyyy-MM-dd");
                if (sjc == 1 || sjc == 0) {
                    System.out.println("**************************************************************");
                    System.out.println("******************************执行工程登录单作废********************");
                    System.out.println("**************************************************************");
                    updataJson.put("ZFZT", "1");
                    String pid = this.getPID(gcdldObj.get("bdbh").toString(), gcdldObj.get("jlbh").toString());
                    if (JLTools.isNull(pid)) {
                        continue;
                    }


                    updataJson.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
                    updataJson.put("DLD", FormTools.newJson("超期", "超期"));
                }
                //没过期  则修改单据的延期次数和到期日  保护期
                DBObject update = new BasicDBObject("$set", updataJson);
                dbscm_gcdld.update(find, update);
            }
        }

        List baobiaoSJ = new ArrayList();//最终展示的List
        List<DBObject> lsList = new ArrayList<DBObject>();
        DBObject s = new BasicDBObject();
        s.put("家用工程登录单作废执行成功", "success");
        lsList.add(s);
        baobiaoSJ.addAll(lsList);
        return baobiaoSJ;
    }


    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/DLDDBDEL.do")
    public List DLDDBDEL(String XmlData, HttpServletRequest request)throws Exception{
        DBObject query = new BasicDBObject();
        query.put("GCLX.key", "1");
        query.put("DYDLBJ.key", "0");
        query.put("BZ02", "工程部审核");
        query.put("S_VALUE", new BasicDBObject("$ne","D1"));
        DBCollection GCHT_CONNECTION = MongodbHandler.getDB().getCollection("SCM_GCHT");
        List<DBObject> GCHT_MONGODATA = GCHT_CONNECTION.find(query,new BasicDBObject("_id", 0)).toArray();
        for (int i = 0; i < GCHT_MONGODATA.size(); i++) {
            System.out.println("*************"+i);
            DBObject gcdldObj = new BasicDBObject(Json.toJO(GCHT_MONGODATA.get(i)));
            String GCDLD01 = gcdldObj.get("GCDLD01").toString();
            String tasksql = "SELECT A.SK01,A.GSXX01,A.SK02,A.BZ01,A.SK03,A.PID," +
                    "       A.GZL01,A.GZL02,A.BZ02,A.TJCZY01,A.TJRYMC," +
                    "       A.SK04,A.BM01,A.SK05,WLDW01,CK01,QXCZY01,QXBM01"+
                    " FROM W_TASK A WHERE SK02 LIKE '%"+GCDLD01+"%'";
            List taskLIST = queryForList(workflow, tasksql);
            if(taskLIST.size()==2){
                JSONObject ONE = Json.toJO(taskLIST.get(0));
                JSONObject TWO = Json.toJO(taskLIST.get(1));
                String BZ01 = ONE.get("BZ01").toString();
                String GZL01 = ONE.get("GZL01").toString();
                String BZ02 = TWO.get("BZ01").toString();
                String GZL02 = TWO.get("GZL01").toString();
                if("90405".equals(BZ01) && "9040".equals(GZL01)
                        && "90923".equals(BZ02) && "9092".equals(GZL02)){
                    dbdel(ONE);
                }else if("90405".equals(BZ02) && "9040".equals(GZL02)
                        && "90923".equals(BZ01) && "9092".equals(GZL01)){
                    dbdel(TWO);
                }
            }
        }
        List baobiaoSJ = new ArrayList();//最终展示的List
        List<DBObject> lsList = new ArrayList<DBObject>();
        DBObject s = new BasicDBObject();
        s.put("商用工程登录单作废执行成功","success");
        lsList.add(s);
        baobiaoSJ.addAll(lsList);
        return baobiaoSJ;
    }

    /**
     * 解决工程登录单老数据问题
     * 工程登录单签订合同但合同没有审核时  工程登录单已经在跟进步骤封单
     * 因于五月十号新增合同删除返回登录单功能导致流程出现问题
     * 需要把已经封单了的登录单代办重新从log表中查询出来插入task表中并进入合同制单步骤
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/DLDDBDEL.do")
    public List XZDB(String XmlData, HttpServletRequest request)throws Exception{
        DBObject query = new BasicDBObject();
        query.put("GCLX.key", "1");
        query.put("DYDLBJ.key", "0");
        query.put("BZ02", new BasicDBObject("$ne","封单"));
        query.put("S_VALUE", new BasicDBObject("$ne","D1"));
        DBCollection GCHT_CONNECTION = MongodbHandler.getDB().getCollection("SCM_GCHT");
        DBCollection GCDLD_CONNECTION = MongodbHandler.getDB().getCollection("SCM_GCDLD");
        List<DBObject> GCHT_MONGODATA = GCHT_CONNECTION.find(query,new BasicDBObject("_id", 0)).toArray();

        for (int i = 0; i < GCHT_MONGODATA.size(); i++) {
            System.out.println("*************"+i);
            DBObject gcdldObj = new BasicDBObject(Json.toJO(GCHT_MONGODATA.get(i)));
            String HT_PID = getPID(gcdldObj.get("bdbh").toString(),gcdldObj.get("jlbh").toString());

            DBObject find = new BasicDBObject();
            find.put("GCDLD01",gcdldObj.get("GCDLD01").toString());
            find.put("GSXX01",gcdldObj.get("GSXX01").toString());

            List<DBObject> GCDLD_MONGODATA = GCHT_CONNECTION.find(find,new BasicDBObject("_id", 0)).toArray();
            JSONObject DLD_DATA = Json.toJO(GCDLD_MONGODATA.get(0));
            DLD_DATA.get("jlbh").toString();
            DLD_DATA.get("bdbh").toString();
            String DLD_PID = getPID(DLD_DATA.get("bdbh").toString(),DLD_DATA.get("jlbh").toString());
            String tasksql = "";

            List taskLIST = queryForList(workflow, tasksql);
            if(taskLIST.size()==2){
                JSONObject ONE = Json.toJO(taskLIST.get(0));
                JSONObject TWO = Json.toJO(taskLIST.get(1));
                String BZ01 = ONE.get("BZ01").toString();
                String GZL01 = ONE.get("GZL01").toString();
                String BZ02 = TWO.get("BZ01").toString();
                String GZL02 = TWO.get("GZL01").toString();
                if("90405".equals(BZ01) && "9040".equals(GZL01)
                        && "90923".equals(BZ02) && "9092".equals(GZL02)){
                    dbdel(ONE);
                }else if("90405".equals(BZ02) && "9040".equals(GZL02)
                        && "90923".equals(BZ01) && "9092".equals(GZL01)){
                    dbdel(TWO);
                }
            }
        }
        List baobiaoSJ = new ArrayList();//最终展示的List
        List<DBObject> lsList = new ArrayList<DBObject>();
        DBObject s = new BasicDBObject();
        s.put("商用工程登录单作废执行成功","success");
        lsList.add(s);
        baobiaoSJ.addAll(lsList);
        return baobiaoSJ;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/LSHFDB.do")
    public void LSHFDB(String XmlData, HttpServletRequest request)throws Exception{
        DBCollection GCHT_CONNECTION = MongodbHandler.getDB().getCollection("SCM_GCHT");
        DBCollection GCDLD_CONNECTION = MongodbHandler.getDB().getCollection("SCM_GCDLD");
        DBObject query = new BasicDBObject();
        DBObject GCDLD01 = new BasicDBObject();
        DBObject querys = new BasicDBObject();
        JSONArray array = new JSONArray();
        JSONObject BH = new JSONObject();
        JSONObject GCDLD = new JSONObject();
        List GCDLDS = new ArrayList();
        String sql = "SELECT PID FROM W_TASK WHERE BZ01 = '90923'";
        List taskList = queryForList(workflow,sql);
        if(taskList.size()>0){
            for(int h = 0;h<taskList.size();h++){
                JSONObject AA = Json.toJO(taskList.get(h));
                List list = getjlbhANDbdbh(AA.getString("PID"));
                BH = Json.toJO(list.get(0));
                query.put("jlbh",BH.get("JLBH"));
                query.put("bdbh",BH.get("TBLNAME"));
                query.put("S_VALUE", new BasicDBObject("$ne","D1"));
                GCDLDS = GCHT_CONNECTION.find(query,new BasicDBObject("_id", 0)).toArray();
                if(GCDLDS.size()>0){
                    GCDLD = Json.toJO(GCDLDS.get(0));
//                GCDLD01.put("GCDLD01",GCDLD.get("GCDLD01").toString());
                    array.add(GCDLD.get("GCDLD01").toString());
                }

            }
        }
        array.add("DLT59000488");
        GCDLD01.put("$in",array);
        querys.put("GCDLD01",GCDLD01);
        querys.put("S_VALUE",new BasicDBObject("$ne","D1"));
        List data = GCDLD_CONNECTION.find(querys,new BasicDBObject("_id", 0)).toArray();
        String PID = "";
        for(int j = 0;j<data.size();j++){
            JSONObject AA = Json.toJO(data.get(j));
            Map map = new HashMap();
            PID = getPID(AA.get("bdbh").toString(),AA.get("jlbh").toString());
            map.put("PID",PID);
            //将代办状态改为未封单
            sql = "UPDATE W_TASKYWGL SET ZT=1 WHERE PID = PID?";
            execSQL(workflow, sql,map);


            sql = "SELECT BZ01 FROM W_TASK WHERE PID = '"+PID+"'";
            List taskLIST = queryForList(workflow, sql);
            if(taskLIST.size()>0){
                JSONObject task = Json.toJO(taskLIST.get(0));
                if(!"90406".equals(task.get("BZ01").toString())){
                    //修改代办前备份
                    sql = "insert into w_taskDel SELECT * FROM W_TASK WHERE PID=PID?";
                    execSQL(workflow, sql,map);
                    //修改代办
                    sql = "UPDATE W_TASK SET BZ01 = '90406',BZ02 = '合同制单' WHERE PID = PID?";
                    execSQL(workflow, sql,map);
                }

                sql = "SELECT NSK01,BZ01 FROM W_LOG WHERE PID='"+PID+"' AND NBZ01 = '90403'";
                List logLIST = queryForList(workflow,sql);
                if(logLIST.size()>0){

                    //LOG备份
                    sql = "INSERT INTO W_LOGDEL SELECT * FROM W_LOG WHERE PID=PID? AND NBZ01='90403'";
                    execSQL(workflow, sql,map);
                    //删除log封单数据
                    sql = "DELETE W_LOG WHERE PID=PID? AND NBZ01 = '90403'";
                    execSQL(workflow, sql,map);

                }

            }else{
                /**
                 * 大部分单据都为此种情况
                 */
                //1、查询log表
                sql = "SELECT BZ01,NSK01,NBZ02,SK01 FROM W_LOG WHERE PID="+PID+" AND NBZ01 = '90403'";
                List logLIST = queryForList(workflow,sql,map);
                if(logLIST.size()>0){
                    JSONObject LOG = Json.toJO(logLIST.get(0));
                    String SK01 = "";
                    String BZ01 = "";
                    if("90406".equals(LOG.getString("BZ01"))){
                        SK01 = LOG.get("SK01").toString();
                        BZ01 = LOG.get("BZ01").toString();
                    }else{
                        SK01 = LOG.get("NSK01").toString();
                        BZ01 = LOG.get("BZ01").toString();

                    }
                    map.put("BZ01",BZ01);

                    //插入task
                    sql = "INSERT INTO W_TASK " +
                            "(SK01, GSXX01, SK02, BZ01, SK03, PID, GZL01, GZL02, BZ02, TJCZY01, TJRYMC, SK04, BM01," +
                            " SK05, WLDW01, CK01, QXCZY01, QXBM01, DYZDRMC, OALOG, SSBM01, QX02)" +
                            "SELECT '"+SK01+"' AS SK01, GSXX01, SK02, '90406' as BZ01, SK03, PID, GZL01, GZL02, " +
                            "'合同制单' AS BZ02, TJCZY01, TJRYMC, SK04, BM01, SK05, WLDW01, CK01, QXCZY01, QXBM01, DYZDRMC,OALOG, SSBM01, QX02 " +
                            "FROM W_LOG WHERE PID = PID? AND BZ01 = BZ01? AND NBZ01 = '90403'";
                    execSQL(workflow, sql,map);
                    //LOG备份
                    sql = "INSERT INTO W_LOGDEL SELECT * FROM W_LOG WHERE PID=PID? AND NBZ01='90403' AND BZ01 = BZ01?";
                    execSQL(workflow, sql,map);
                    //删除log封单数据
                    sql = "DELETE W_LOG WHERE PID=PID? AND NBZ01 = '90403' AND BZ01 = BZ01?";
                    execSQL(workflow, sql,map);
                }

            }

        }





    }



    public void dbdel(JSONObject ONE)throws Exception{
        String tasksql = "INSERT INTO W_TASKDEL(SK01,GSXX01,SK02,BZ01,SK03,PID,GZL01,GZL02,BZ02," +
                "                   TJCZY01,TJRYMC,SK04,BM01,SK05,WLDW01,CK01,QXCZY01,QXBM01)" +
                "            VALUES(SK01?,GSXX01?,SK02?,BZ01?,SK03?,PID?,GZL01?,GZL02?,BZ02?," +
                "                   TJCZY01?,TJRYMC?,SK04?,BM01?,SK05?,WLDW01?,CK01?,QXCZY01?,QXBM01?)";
        Map taskMap = new HashMap();
        taskMap.put("SK01", ONE.get("SK01"));
        taskMap.put("GSXX01", ONE.get("GSXX01"));
        taskMap.put("SK02", ONE.get("SK02"));
        taskMap.put("BZ01", ONE.get("BZ01"));
        taskMap.put("SK03", ONE.get("SK03"));
        taskMap.put("PID", ONE.get("PID"));
        taskMap.put("GZL01", ONE.get("GZL01"));
        taskMap.put("GZL02", ONE.get("GZL02"));
        taskMap.put("BZ02", ONE.get("BZ02"));
        taskMap.put("TJCZY01", ONE.get("TJCZY01"));
        taskMap.put("TJRYMC", ONE.get("TJRYMC"));
        taskMap.put("SK04", ONE.get("SK04"));
        taskMap.put("BM01", ONE.get("BM01"));
        taskMap.put("SK05", ONE.get("SK05"));
        taskMap.put("WLDW01", ONE.get("WLDW01"));
        taskMap.put("CK01", ONE.get("CK01"));
        taskMap.put("QXCZY01", ONE.get("QXCZY01"));
        taskMap.put("QXBM01", ONE.get("QXBM01"));
        execSQL(workflow, tasksql,taskMap);

        String sql = "DELETE W_TASK WHERE SK01 = SK01? AND GZL01 = GZL01? AND PID = PID?";
        execSQL(workflow, sql,taskMap);

    }


    /**
     * 非第一登陆保护期单据自动延期
     * ****************************************海南
     * @param XmlData
     * @param request
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/FDYDLYQ_HN.do")
    public String FDYDLYQ_HN(String XmlData, HttpServletRequest request) throws Exception{
        DBCollection DLD_CON = MongodbHandler.getDB().getCollection("SCM_GCDLD");
        DBCollection GCHT_CON = MongodbHandler.getDB().getCollection("SCM_GCHT");

        JSONObject json = Json.toJO(XmlData);
        DBObject query = new BasicDBObject();
        DBObject query_show = new BasicDBObject();
//        query.put("GCLX.key", "1");
        query.put("DYDLBJ.key", "1");
        query.put("BZ02", "跟进");
        query.put("S_VALUE", new BasicDBObject("$ne","D1"));
//        query.put("ZFZT", new BasicDBObject("$ne","1"));
        List list = new ArrayList();
        query_show.put("PFSJ",1);
        query_show.put("GCDLD01",1);
        query_show.put("GSXX01",1);
        query_show.put("bdbh",1);
        query_show.put("jlbh",1);
        List<DBObject> DLD_DATA = DLD_CON.find(query,query_show).toArray();
        int YQTS = 30;int YQCS = 0;
        int size = DLD_DATA.size();
        for(int j = 0;j<DLD_DATA.size();j++){
            System.out.println("共"+size+"条  当前第"+j+"条");
            DBObject find = new BasicDBObject();
            DBObject DLD = new BasicDBObject(Json.toJO(DLD_DATA.get(j)));
            find.put("GCDLD01", DLD.get("GCDLD01"));
            find.put("GSXX01", DLD.get("GSXX01"));
            List GCHT_DATA = GCHT_CON.find(find,new BasicDBObject("GCDLD01",1)).toArray();
            if(GCHT_DATA.size()<=0){
                DBObject update = new BasicDBObject();
                SimpleDateFormat simp = new SimpleDateFormat("YYYY-MM-DD hh:mm:ss");
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(DLD.get("PFSJ").toString());
                System.out.println("审核时间:"+DLD.get("PFSJ").toString());
                String DQR = getDQR(date,30);
                long BHQ = JLTools.getDistanceDays(DQR, getToday());//到期日减当天日期  为负则过期
                if(BHQ<=0){
                    for(YQCS = 0;YQCS<7;YQCS++){
                        if((BHQ+YQCS*YQTS)>0){
                            DQR = getDQR(date,YQTS+YQCS*YQTS);
                            BHQ = JLTools.getDistanceDays(DQR,getToday());
                            break;
                        }
                    }
                    if(YQCS>6){
                        YQCS = YQCS - 1;
                    }
                }
                if(BHQ>30){
                    System.out.println("保护期超过30天啦");
                }
                if(BHQ<0){
                    BHQ = 0;
                }
                update.put("BHQ",BHQ);
                update.put("DQR",DQR);
                update.put("YQCS",YQCS);
                int SJC = JLTools.comparedate(getToday(), DQR, "yyyy-MM-dd");
                if(SJC!=-1){
                    //过期
                    update.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
                    update.put("DLD", FormTools.newJson("超期", "超期"));
                    update.put("ZFZT","1");
                    String pid = getPID(DLD.get("bdbh").toString(),DLD.get("jlbh").toString());
                    if(JLTools.isNull(pid)) {
                        continue;
                    }
                    list.add(deleteDB(pid));
                }
                //没过期  则修改单据的延期次数和到期日  保护期
                DBObject update_data = new BasicDBObject("$set",update);
                DLD_CON.update(find, update_data);

            }

        }
        System.out.println(list.toString());
        return "";
    }



    /**
     * 海南作废后将代办备份删除
     * @param PID
     * @throws Exception
     */
    public String deleteDB(String PID) throws Exception {
        Map taskMap = new HashMap();
        taskMap.put("PID",PID);
        String sql = "SELECT BZ01 FROM W_TASK WHERE PID = '"+PID+"'";
        List taskLIST = queryForList(workflow, sql);

        if(taskLIST.size()>0){
            //备份代办
            String tasksql = "INSERT INTO W_TASKDEL SELECT * FROM W_TASK WHERE PID =  '"+PID+"'";
            execSQL(this.workflow, tasksql, taskMap);
            //删除代办
            tasksql = "DELETE W_TASK A WHERE A.PID = PID?";
            execSQL(this.workflow, tasksql, taskMap);
        }

        return PID;
    }

    /**
     * 获取当天日期
     * @return
     */
    public String getToday(){
        //转换提日期输出格式
        return new SimpleDateFormat("yyyy-MM-dd").format(new Date(System.currentTimeMillis())).toString();
    }

    /**
     * 获取到期日
     * 给一个时间  和 一个天数  返回这个时间+这个天数后的时间
     * @param date
     * @param day
     * @return
     */
    public String getDQR(Date date,int day){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, day);
        return (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
    }



    /**
     * 获取log的pid
     * @param bdbh
     * @param jlbh
     * @return
     */
    public String getPID(String bdbh,String jlbh){
        String PID = "";
        String sql = "SELECT A.PID FROM W_TASKYWGL A "+
                " WHERE A.TBLNAME = '"+bdbh+"' "+
                " AND A.JLBH = '"+jlbh+"' ";
        List logLIST = queryForList(workflow, sql);
        if(logLIST.size()>0){
            Map logMap = new HashMap();
            logMap.putAll((Map)logLIST.get(0));
            PID = logMap.get("PID").toString();
        }else{
            //退出程序
            System.exit(0);
        }
        return PID;
    }

    public List getjlbhANDbdbh(String PID){
        String sql = "SELECT TBLNAME,JLBH FROM W_TASKYWGL WHERE PID='"+PID+"'";
        List YWGLLIST = queryForList(workflow, sql);
        return YWGLLIST;
    }






    /**
     * 湖南保护期调整
     * @return
     * @throws Exception
     */

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping("/HN_BHQ.do")
    public List HN_BHQ()throws Exception {
        DBCollection GCHT_CON = MongodbHandler.getDB().getCollection("SCM_GCHT");
        DBCollection GCDLD_CON = MongodbHandler.getDB().getCollection("SCM_GCDLD");

        DBObject query = new BasicDBObject();
        query.put("GCLX.key", "1");//家用
        query.put("DYDLBJ.key", "0");
        query.put("BZ02", "跟进");
        query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
        query.put("ZFZT", new BasicDBObject("$ne", "1"));
        String[] array = {"PFSJ","GCDLD01","GSXX01","YQCS"};
        List<DBObject> DLD_LIST = GCDLD_CON.find(query, getShowFiled(array)).toArray();

        for (int i = 0; i < DLD_LIST.size(); i++) {
            JSONObject update = new JSONObject();
            DBObject find = new BasicDBObject();
            DBObject GCDLD = new BasicDBObject(Json.toJO(DLD_LIST.get(i)));
            find.put("GCDLD01", GCDLD.get("GCDLD01"));
            find.put("GSXX01", GCDLD.get("GSXX01"));
            //验证是否签合同
            List<DBObject> GCHT_LIST = GCHT_CON.find(find,new BasicDBObject("GCDLD01",1)).toArray();
            int YQTS = 30;int YQCS = 2;
            if (GCHT_LIST.size() <= 0) {

                if (!JLTools.isNull(GCDLD.get("YQCS"))) {
                    YQCS = JLTools.strToInt(GCDLD.get("YQCS").toString());
                } else {
                    YQCS = 0;
                }
                if(YQCS>2){
                    YQCS = 2;
                }
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(GCDLD.get("PFSJ").toString());

                String DQR = getDQR(date,YQTS+YQCS*YQTS);
                //保护期
                long BHQ = JLTools.getDistanceDays(DQR, getToday());//到期日减当天日期  为负则过期
                if (BHQ <= 0) {
                    update = AutoYQ(date,BHQ);
                }else {
                    update.put("DQR", DQR);
                    update.put("BHQ", BHQ);
                    update.put("YQCS", YQCS);
                }

                if(BHQ<0){
                    BHQ = 0;
                }
                if (BHQ > 32) {
                    System.out.println("****");
                }
                System.out.println("制单时间" + GCDLD.get("PFSJ").toString());
                System.out.println("到期日" + DQR);
                System.out.println("延期次数" + YQCS);
                System.out.println("保护期" + BHQ);
                System.out.println("总条数" + DLD_LIST.size() + "*************当前条数" + i);
                int sjc = JLTools.comparedate(getToday(), update.get("DQR").toString(), "yyyy-MM-dd");
                if (sjc == 1 || sjc == 0) {
                    update.put("ZFZT", "1");
                    update.put("GC_DJZT", FormTools.newJson("超期作废", "超期作废"));
                    update.put("DLD", FormTools.newJson("超期", "超期"));
                }
                //没过期  则修改单据的延期次数和到期日  保护期
                DBObject update_ = new BasicDBObject("$set", update);
                GCDLD_CON.update(find, update_);
            }
        }

        List baobiaoSJ = new ArrayList();//最终展示的List
        List<DBObject> lsList = new ArrayList<DBObject>();
        DBObject s = new BasicDBObject();
        s.put("家用工程登录单作废执行成功", "success");
        lsList.add(s);
        baobiaoSJ.addAll(lsList);
        return baobiaoSJ;
    }

    /**
     * 自动延期
     * @param date
     * @param BHQ
     * @return
     * @throws Exception
     */
    public JSONObject AutoYQ(Date date,long BHQ)throws Exception{
        int YQCS = 0,YQTS=30;
        String DQR = "";
        for(YQCS = 0;YQCS<7;YQCS++){
            if((BHQ+YQCS*YQTS)>0){
                DQR = getDQR(date,YQTS+YQCS*YQTS);
                BHQ = JLTools.getDistanceDays(DQR,getToday());
                break;
            }
        }
        if(YQCS>6){
            YQCS = YQCS - 1;
        }
        JSONObject json = new JSONObject();
        json.put("YQCS",YQCS);
        json.put("BHQ",BHQ);
        json.put("DQR",DQR);
        return json;
    }


    /**
     * 返回查询的字段集
     * @param array
     * @return
     */
    public DBObject getShowFiled(String[] array){
        DBObject query = new BasicDBObject();
        for(int i = 0;i<array.length;i++){
            query.put(array[i],1);
        }
        return query;
    }



}
