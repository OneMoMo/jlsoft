package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import java.sql.Date;
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

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

/**
 * 
 * @author 晏志荣
 *
 */
@Controller
@RequestMapping("/SelectGCDLD")
public class SelectGCDLD extends FormHandler {
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCDLD.do")
	public Map getqueryGCDLD(String XmlData, HttpServletRequest request) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		Map query = new HashMap();
		String sq = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
		int row = queryForInt(workflow, sq);
		if(row == 2){
			//二级经销商不带部门权限 带 权限操作员 QXCZY01 条件
			query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD2", json, request);
			query.put("QXCZY01", json.get("PCRM_CZY02"));	
		}else{
			//非二级经销商带部门权限
			query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD", json, request);
		}
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		List queryList = find("SCM_GCDLD", query, null, null);
		List resultlist = new ArrayList();
		for(int i=0; i<queryList.size(); i++){
			JSONObject queryItem = Json.toJO(queryList.get(i));
			JSONArray SPLB = Json.toJA(queryItem.get("SPLB"));
			double sumSQSL = 0;
			double sumPFJE = 0;
			for(int j=0; j<SPLB.size(); j++){
				JSONObject SPLBItem = SPLB.getJSONObject(j);
				sumSQSL += FormTools.isNull(SPLBItem.get("SQSL"))?0:SPLBItem.getDouble("SQSL");
				sumPFJE += FormTools.isNull(SPLBItem.get("PFJE"))?0:SPLBItem.getDouble("PFJE");
			}
			DecimalFormat df = new DecimalFormat("#.00");   
			queryItem.put("PFJE", df.format(sumPFJE));
			queryItem.put("SQSL", sumSQSL);
			resultlist.add(queryItem);
		}
		Map result = new HashMap();
		result.put("resultlist", resultlist);
		return result;
	}
	
	//工程登录单查询登录序号
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getDLXH.do")
	public Map getDLXH(String XmlData, HttpServletRequest request) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		DBObject czyquery = new BasicDBObject();
		czyquery.put("PersonID", json.get("SYDW"));
		String SHSJ = "";
		String ynsj = "";//一年前时间
		String sysj = "";//三个月时间
		if(!FormTools.isNull(json.get("SHRQ"))){
			SHSJ=json.get("SHRQ").toString();
		}
		long l = System.currentTimeMillis();
		Date DQdate = new Date(l);
		//转换提日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String XTSJ=dateFormat.format(DQdate).toString();
		System.out.println(dateFormat.format(DQdate));
		if (!FormTools.isNull(json.get("SHSJ"))) {
			SHSJ=json.get("SHSJ").toString();
		}
		if (SHSJ.equals("365")) {
			Calendar curr = Calendar.getInstance();
			curr.set(Calendar.YEAR,curr.get(Calendar.YEAR)-1);
			java.util.Date date=curr.getTime();
			ynsj=dateFormat.format(date).toString();
			System.out.println(dateFormat.format(date));
		}else if (SHSJ.equals("90"))  {
			Calendar curr = Calendar.getInstance();
			curr.set(Calendar.MONTH,curr.get(Calendar.MONTH)-3);
			java.util.Date date= curr.getTime();
			sysj=dateFormat.format(date).toString();
			System.out.println(dateFormat.format(date));
		}
		Map query = new HashMap();
		String TJLX = json.get("TJLX").toString();
		if(TJLX.equals("0")){
			//差异  海南屏蔽 部门权限
			query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_GCDLDHZ", json, request);
			List<DBObject> dboList = new ArrayList<DBObject>();
			DBObject dbo = new BasicDBObject();
			if(!FormTools.isNull(json.get("SYDW"))){
				dbo = new BasicDBObject();
				dbo.put("SYDW",new BasicDBObject("$regex",json.get("SYDW")));
				dboList.add(dbo);
			}
			if(!FormTools.isNull(json.get("YHDH"))){
				dbo = new BasicDBObject();
				dbo.put("YHDH",new BasicDBObject("$regex",json.get("YHDH")));
				dboList.add(dbo);
			}
			if(!FormTools.isNull(json.get("SYDWDZ"))){
				dbo = new BasicDBObject();
				dbo.put("SYDWDZ",new BasicDBObject("$regex",json.get("SYDWDZ")));
				dboList.add(dbo);
			}
			if(!FormTools.isNull(json.get("GCDLD"))){
				dbo = new BasicDBObject();
				dbo.put("GCDLD01",new BasicDBObject("$regex",json.get("GCDLD")));
				dboList.add(dbo);
			}
			if(!FormTools.isNull(json.get("GMDW"))){
				dbo = new BasicDBObject();
				dbo.put("GMDW",new BasicDBObject("$regex",json.get("GMDW")));
				dboList.add(dbo);
			}
			if(!FormTools.isNull(json.get("YHXM"))){
				dbo = new BasicDBObject();
				dbo.put("YHXM",new BasicDBObject("$regex",json.get("YHXM")));
				dboList.add(dbo);
			}
			if(!FormTools.isNull(json.get("SBRQQ")) || !FormTools.isNull(json.get("SBRQE"))){
				dbo = new BasicDBObject();
				DBObject dbo2 = new BasicDBObject();
				if(!FormTools.isNull(json.get("SBRQQ"))){
					dbo2.put("$gte",FormTools.isNull(json.get("SBRQQ").toString()+" 00:00:01") ? "" : json.get("SBRQQ").toString()+" 00:00:01");
				}
				if(!FormTools.isNull(json.get("SBRQE"))){
					dbo2.put("$lte",FormTools.isNull(json.get("SBRQE").toString()+" 23:59:59") ? "" : json.get("SBRQE").toString()+" 23:59:59");
				}
				dbo.put("SBSJ",dbo2);
				dboList.add(dbo);
			}
			if(dboList.size() > 0){
				query.put("$or", dboList);
			}
			if (!FormTools.isNull(ynsj)) {
				DBObject dbo2 = new BasicDBObject();
				dbo2.put("$gte",ynsj);
				dbo2.put("$lte",XTSJ);
				query.put("SBSJ", dbo2);
			}
			if (!FormTools.isNull(sysj)) {
				DBObject dbo2 = new BasicDBObject();
				dbo2.put("$gte",sysj);
				dbo2.put("$lte",XTSJ);
				query.put("SBSJ", dbo2);
			}
		}else{
			query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_GCDLD1", json, request);
			if (!FormTools.isNull(ynsj)) {
				DBObject dbo2 = new BasicDBObject();
				dbo2.put("$gte",ynsj);
				dbo2.put("$lte",XTSJ);
				query.put("SBSJ", dbo2);
			}
			if (!FormTools.isNull(sysj)) {
				DBObject dbo2 = new BasicDBObject();
				dbo2.put("$gte",sysj);
				dbo2.put("$lte",XTSJ);
				query.put("SBSJ", dbo2);
			}
		}
		Map map = new HashMap();
		map.put("SBSJ", -1);
		query.put("S_VALUE", new BasicDBObject("$ne","D1"));
		List queryList = find("SCM_GCDLD", query, null, map);
		List returnList = new ArrayList();
		for(int i=0; i<queryList.size(); i++){
			JSONObject queryItem = Json.toJO(queryList.get(i));
			JSONArray SPLB = Json.toJA(queryItem.get("SPLB"));
			double sum = 0;
			for(int j=0; j<SPLB.size(); j++){
				JSONObject SPLBItem = SPLB.getJSONObject(j);
				sum += FormTools.isNull(SPLBItem.get("SQSL"))?0:SPLBItem.getDouble("SQSL");
			}
			JSONObject returnItem = new JSONObject();
			returnItem.putAll(queryItem);
			returnItem.put("SPSL", sum);
		
			JSONObject GC_DJZT = Json.toJO(queryItem.get("GC_DJZT"));
			if(FormTools.isNull(GC_DJZT.get("key")) || GC_DJZT.getString("key").equals("登录待审核")){
				returnItem.put("DLXH", "");
				returnItem.put("DYDLBJ", "");
			}
			returnList.add(returnItem);
		}
		Map result = new HashMap();
		result.put("resultlist", returnList);
		return result;
	}
	
	//工程合同调整单查询工程合同
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCHT.do")
	public Map getGCHT(String XmlData, HttpServletRequest request) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List resultList = new ArrayList();
		Map query = new HashMap();
		query = FormTools.mongoMappingPart("GCHTTZD.CXGCHT", json, request);
		String sql = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
		int row = queryForInt(workflow, sql);
		if(row == 2){
			query.put("QXCZY01", json.get("PCRM_CZY02"));	
		}
		query.put("GC_DJZT.key", "待签合同");
		query.put("BZ02", "封单");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		List queryList = find("SCM_GCHT", query, null, null);
		for(int i=0; i<queryList.size(); i++){
			JSONObject queryItem = Json.toJO(queryList.get(i));
			String sql2 = "SELECT GCSPBM, GCSPMC, SPXX02 SPDM, PFSL, SQDJ, PFSL*SQDJ SQJE, PFDJ, PFSL*PFDJ PFJE, YHSL-YSZZSL YHSL, WBTDH  "
					    + "  FROM GCDLD "
					    + " WHERE 1=1 "
					    + "   AND GCDLD01 = '" + queryItem.get("GCDLD01")
					    + "'  AND GSXX01  = '" + queryItem.get("GSXX01") + "'";
			List<Map> list = queryForList(scm, sql2);
			
			JSONArray SPLB = queryItem.getJSONArray("SPLB");
			for(int j=0; j<list.size(); j++){
				String WBTDH = list.get(j).get("WBTDH").toString();
				for (int k = 0; k < SPLB.size(); k++){
					JSONObject SPLBITEM = SPLB.getJSONObject(k);
					if (WBTDH.equals(SPLBITEM.get("WBTDH"))) {
						list.get(j).put("SPXX01", SPLBITEM.get("SPXX01"));
						list.get(j).put("SPMC", SPLBITEM.get("SPMC"));
						list.get(j).put("DZ", SPLBITEM.get("DZ"));
						list.get(j).put("AZDZ", SPLBITEM.get("AZDZ"));
						list.get(j).put("LXR", SPLBITEM.get("LXR"));
						list.get(j).put("LXDH", SPLBITEM.get("LXDH"));
						list.get(j).put("BZ", SPLBITEM.get("BZ"));
						break;
					}
				}
				//减去已制单的要货单的商品占用的要货数量  为控制产生多张废单据
				DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCYHD");
				DBObject YHSLquery = new BasicDBObject();
				YHSLquery.put("GCDLD01", queryItem.get("GCDLD01"));
				YHSLquery.put("BZ02", new BasicDBObject("$ne","封单"));
				YHSLquery.put("S_VALUE", new BasicDBObject("$ne","D1"));
				List<DBObject> YHDtitleList  = dbCollection.find(YHSLquery,new BasicDBObject("_id", 0)).toArray();
				for (int n = 0; n < YHDtitleList.size(); n++) {
					DBObject BB = YHDtitleList.get(n);
					if (BB == null) {
						BB = new BasicDBObject();
					}
					List<Map> YHDSPLB =(List<Map>) BB.get("SPLB");
					for (int q = 0; q < YHDSPLB.size(); q++) {
						String YHDDJTDH = YHDSPLB.get(q).get("DJTDH").toString();//要货单的DJTDH 就是 gcdld的 WBTDH
						double yhdyhsl=Double.parseDouble(YHDSPLB.get(q).get("YHSL").toString());
						double yhsl=Double.parseDouble(list.get(j).get("YHSL").toString());
						if (YHDDJTDH.equals(WBTDH)) {
							double kyhsl=yhsl+yhdyhsl;
							list.get(j).put("YHSL", kyhsl);
						}
					}
				}
			}
			
			queryItem.put("SPLB", list);
			resultList.add(queryItem);
		}
		Map result = new HashMap();
		result.put("resultlist", resultList);
		return result;
	}
	
	//查询工程合同报表
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCHTBB.do")
	public Map getGCHTBB(String XmlData, HttpServletRequest request) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		Map query = new HashMap();
		query = FormTools.mongoMappingPart("GCHTTZD.CXGCHTBB", json, request);
		String sql = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
		int row = queryForInt(workflow, sql);
		if(row == 2){
			query.put("QXCZY01", json.get("PCRM_CZY02"));	
		}
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		List<DBObject> queryList = find("SCM_GCHT", query, null, null);
		List resultlist = new ArrayList();
		for(int i=0; i<queryList.size(); i++){
			DBObject queryItem = queryList.get(i);
			if("制单".equals(queryItem.get("BZ02"))){
				queryItem.put("DJZT", "合同驳回");
			}else if("审核".equals(queryItem.get("BZ02"))){
				queryItem.put("DJZT", "合同待审核");
				queryItem.put("YJNR", "");
			}else if("封单".equals(queryItem.get("BZ02"))){
				queryItem.put("DJZT", "合同已审核");
				JSONObject GC_DJZT=Json.toJO(queryItem.get("GC_DJZT"));
				if("超期作废".equals(GC_DJZT.get("key"))
						|| "丢单作废".equals(GC_DJZT.get("key"))
						|| "其它作废".equals(GC_DJZT.get("key"))){
					queryItem.put("DJZT", GC_DJZT.get("key"));
				}
			}
			JSONArray SPLB = Json.toJA(queryItem.get("SPLB"));
			String sql2 = "SELECT GCSPBM, GCSPMC, SPXX02 SPDM, PFSL, SQDJ, PFSL*SQDJ SQJE, PFDJ, PFSL*PFDJ PFJE, YHSL-YSZZSL YHSL,WBTDH  "
				    + "  FROM GCDLD "
				    + " WHERE 1=1 "
				    + "   AND GCDLD01 = '" + queryItem.get("GCDLD01")
				    + "'  AND GSXX01  = '" + queryItem.get("GSXX01") + "'";
			List<Map> list = queryForList(scm, sql2);
			for(int j=0; j<SPLB.size(); j++){
				DBObject SPLBITEM =  new BasicDBObject(SPLB.getJSONObject(j));
				String WBTDH=null;
				if ("封单".equals(queryItem.get("BZ02"))) {
					WBTDH = SPLBITEM.get("WBTDH").toString();
				}
				double yhsl=0;
				if (list.size()>0) {
					for (int k = 0; k < list.size(); k++) {
						String YHDDJTDH = list.get(k).get("WBTDH").toString();
						double yhdyhsl=Double.parseDouble(list.get(k).get("YHSL").toString());
						double pfsl=Double.parseDouble(list.get(k).get("PFSL").toString());
						if (YHDDJTDH.equals(WBTDH)){
							yhsl=yhsl+yhdyhsl;
							double wyhsl=pfsl-yhsl;
							SPLBITEM.put("YHSL", yhsl);
							SPLBITEM.put("WYHSL", wyhsl);
						}
					}
				}
				SPLBITEM.putAll(queryItem);
				resultlist.add(SPLBITEM);
			}
		}
		Map result = new HashMap();
		DBObject ztquery = new BasicDBObject();
		if (!FormTools.isNull(json.get("BZ02"))||!FormTools.isNull(json.get("GCSP"))) {
			if (!FormTools.isNull(json.get("BZ02"))){
				ztquery.put("DJZT", new BasicDBObject("$regex",json.get("BZ02").toString()));
			}
			if (!FormTools.isNull(json.get("GCSP"))){
				JSONArray ja1 = new JSONArray();
				JSONObject jo1 = new JSONObject();
				JSONObject jo2 = new JSONObject();
				String str= json.get("GCSP").toString();
				str=str.replaceAll("\\(", "\\\\(");
				str=str.replaceAll("\\)", "\\\\)");
				DBObject ob=new BasicDBObject("$regex",str);
				ob.put("$options", "i");
//				jo1.put("GCSPMC", new BasicDBObject("$regex", json.get("GCSP").toString()).put("$options", "-i"));
				jo1.put("GCSPMC",ob);
				try{
					jo2.put("GCSPBM", Integer.parseInt(json.get("GCSP").toString()));
					ja1.add(jo2);
				}catch(Exception e){
					
				}
				
				ja1.add(jo1);
				
				ztquery.put("$or", ja1);
			}
			DBCollection lsb = MongodbHandler.getDB().getCollection("linshibiao");
			lsb.insert(resultlist);
			List<DBObject> cxhtitleList = lsb.find(ztquery,new BasicDBObject("_id", 0)).toArray();
			lsb.drop();
			result.put("resultlist", cxhtitleList);
		}else{
			result.put("resultlist", resultlist);
		}
		return result;
	}
	
	//查询保护期内工程登陆单
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/BHQDLD.do")
	public Map BHQDLD(String XmlData, HttpServletRequest request) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		Map query = new HashMap();
		String sq = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
		int row = queryForInt(workflow, sq);
		if(row>0){
			//经销商 权限操作员 QXCZY01 条件
			query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD", json, request);
			query.put("QXCZY01", json.get("PCRM_CZY02"));	
		}else{
			//非经销商不带操作员权限
			query = FormTools.mongoMappingPart("MONGO_GCDLD.SCM_CXGCDLD", json, request);
		}
		query.put("DYDLBJ.key","0");
		query.put("BZ02", new BasicDBObject("$ne", "封单"));
		query.put("BHQ", new BasicDBObject("$exists", true));
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		List queryList = find("SCM_GCDLD", query, null, null);
		int bhqtj=0;
		if(!FormTools.isNull(json.get("BHQ"))){
			 bhqtj=Integer.parseInt(json.get("BHQ").toString());
		}
		List resultlist = new ArrayList();
		for(int i=0; i<queryList.size(); i++){
			JSONObject queryItem = Json.toJO(queryList.get(i));
			if (bhqtj==0){
				resultlist.add(queryItem);
			}else {
				if(!FormTools.isNull(queryItem.get("BHQ"))){
					int	bhq=Integer.parseInt(queryItem.get("BHQ").toString());
					if(bhqtj==15&&bhqtj>=bhq){
						resultlist.add(queryItem);
					}else if(bhqtj==10&&bhqtj>=bhq){
						resultlist.add(queryItem);
					}else if(bhqtj==5&&bhqtj>=bhq){
						resultlist.add(queryItem);
					}
				}
			}
		}
		Map result = new HashMap();
		result.put("resultlist", resultlist);
		return result;
	}	
}

