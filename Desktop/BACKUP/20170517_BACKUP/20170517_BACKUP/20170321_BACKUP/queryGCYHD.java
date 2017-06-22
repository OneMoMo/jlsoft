package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.dataset.DataSet;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.mdm.access.AccessExtender;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Component
@RequestMapping("/queryGCYHD")
public class queryGCYHD extends FormHandler {

	//工程要货单查询工程登录单
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCDLD.do")
	public Map getGCDLD(String XmlData, HttpServletRequest request) throws Exception {
		cds = new DataSet(XmlData);
		JSONObject json = Json.toJO(XmlData);

		System.out.print("json:" + json.toString());

		Map query = FormTools.mongoMappingPart("MONGO_GCDLD.YHCXDLD", json, request);
		String sql1 = "SELECT JXSJB FROM W_GW WHERE GW01 = " + json.get("PCRM_GW01");
		System.out.print("sql1:" + sql1);
		int row = queryForInt(workflow, sql1);
		if (row == 2) {
			query.put("SBR02", json.get("PCRM_CZY02"));
		}
		query.put("GC_DJZT.key", "合同已审核");
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		System.out.print("query:" + query.toString());
		List<DBObject> titleList = find("SCM_GCDLD", query, null, null);
		List<DBObject> lsList = new ArrayList<DBObject>();
		for (int j = 0; j < titleList.size(); j++) {
			List<DBObject> list2 = new ArrayList<DBObject>();
			DBObject AA = titleList.get(j);
			if (AA == null) {
				AA = new BasicDBObject();
			}
			JSONObject GCLX = Json.toJO(AA.get("GCLX"));
			int GCBJ;
			if ("家用".equals(GCLX.get("value"))) {
				GCBJ = 1;
			} else {
				GCBJ = 2;
			}
			String bmSQL = "SELECT BM01,BM02 BMMC FROM  BM  WHERE GCBJ='" + GCBJ + "'" + "AND GSXX01='" + json.get("PCRM_GSXX01") + "'";
			System.out.print("bmSQL:" + bmSQL);
			List<Map> bmLIST = queryForList(scm, bmSQL);
			for (int i = 0; i < bmLIST.size(); i++) {
				AA.put("BM01", bmLIST.get(i).get("BM01"));
				AA.put("BMMC", bmLIST.get(i).get("BMMC"));
			}
			List<Map> SPLB = (List<Map>) AA.get("SPLB");

			//查询数据库中登录单的明细
			Map tmp = new HashMap();
			String sql = " select  A.GCSPBM, A.GCSPMC, B.SPXX01 ,A.SPXX02 ,B.SPXX04 ,B.PPB02 PPMC, A.PFSL, A.PFDJ, A.SQDJ, "
					+ "  A.PFDJ*0.05 BZJDJ, A.GCZZSL, A.PFSL-A.YHSL-A.GCZZSL+A.YSZZSL YHSL , A.PFSL-A.YHSL-A.GCZZSL+A.YSZZSL KKDSL,  A.WBTDH DJTDH, "
					+ "  A.YSZZSL, GET_KMS(B.SPXX01,(SELECT NVL(SUM(CKSP04+CKSP05),0) "
					+ "FROM CKSP WHERE SPXX01=B.SPXX01 AND CK01 IN (SELECT CK01 FROM CK WHERE CK19 = 1) JL{CZY|CK01|CK_CZ|LIKE%}JL )) SL from GCDLD A, SPXX B "
					+ "	WHERE  A.PFSL-YHSL-GCZZSL+YSZZSL>0 AND A.SPXX02=B.SPXX02 " + "  AND A.GCDLD01='" + AA.get("GCDLD01") + "' AND A.GSXX01='"
					+ AA.get("GSXX01") + "'" + "  JL{CZY|A.WLDW01|WLDW_CZ|inS}JL ";
			tmp.put("GSXX01", cds.getField("PCRM_GSXX01", 0).toString());
			tmp.put("PersonID", cds.getField("PCRM_CZY02", 0).toString());
			tmp.put("CompanyID", cds.getField("PCRM_GSXX01", 0).toString());

			sql = AccessExtender.extendPlaceHolders(sql, tmp);//替换权限代码
			sql = AccessExtender.clearPlaceHolders(sql);//清理权限替代字符串
			System.out.print("sql:" + sql);
			List<Map> SPMXLIST = queryForList(scm, sql);
			FormTools.replaceListNull(SPMXLIST);
			System.out.print("SPMXLIST:" + SPMXLIST.toString());
			//			JSONArray SPLB_new= new JSONArray();
			for (int i = 0; i < SPMXLIST.size(); i++) {
				//				JSONObject SPLBITEM = new JSONObject();
				String WBTDH = SPMXLIST.get(i).get("DJTDH").toString();
				for (int k = 0; k < SPLB.size(); k++) {
					if (WBTDH.equals(SPLB.get(k).get("WBTDH"))) {
						SPMXLIST.get(i).put("SFDZ", SPLB.get(k).get("DZ"));
						SPMXLIST.get(i).put("AZDZMX", SPLB.get(k).get("AZDZ"));
						SPMXLIST.get(i).put("LXRMX", SPLB.get(k).get("LXR"));
						SPMXLIST.get(i).put("LXDHMX", SPLB.get(k).get("LXDH"));
						continue;
					}
				}
				//减去已制单的要货单的商品占用的要货数量  为控制产生多张废单据
				DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCYHD");
				DBObject KZSLquery = new BasicDBObject();
				KZSLquery.put("GCDLD01", AA.get("GCDLD01"));
				KZSLquery.put("BZ02", new BasicDBObject("$ne", "封单"));
				KZSLquery.put("S_VALUE", new BasicDBObject("$ne", "D1"));
				System.out.print("KZSLquery:" + KZSLquery);
				List<DBObject> YHDtitleList = dbCollection.find(KZSLquery, new BasicDBObject("_id", 0)).toArray();
				for (int n = 0; n < YHDtitleList.size(); n++) {
					DBObject BB = YHDtitleList.get(n);
					if (BB == null) {
						BB = new BasicDBObject();
					}
					List<Map> YHDSPLB = (List<Map>) BB.get("SPLB");
					for (int q = 0; q < YHDSPLB.size(); q++) {
						String YHDDJTDH = YHDSPLB.get(q).get("DJTDH").toString();//要货单的DJTDH 就是 gcdld的 WBTDH
						double yhdyhsl = Double.parseDouble(YHDSPLB.get(q).get("YHSL").toString());
						double yhsl = Double.parseDouble(SPMXLIST.get(i).get("KKDSL").toString());
						if (YHDDJTDH.equals(WBTDH)) {
							double kyhsl = yhsl - yhdyhsl;
							SPMXLIST.get(i).put("KKDSL", kyhsl);
							SPMXLIST.get(i).put("YHSL", kyhsl);
						}
					}
				}
				SPMXLIST.get(i).put("YHSL", 0);//循环结束默认 要货数量默认为0
			}
			for (int s = 0; s < SPMXLIST.size(); s++) {
				double KKDSL = Double.parseDouble(SPMXLIST.get(s).get("KKDSL").toString());
				if (KKDSL == 0) {
					SPMXLIST.remove(s);
					s = s - 1;
				}
			}
			Map queryForJXS = new HashMap();
			queryForJXS.put("WLDW01", AA.get("WLDW01"));
			List queryList2 = new FormHandler().find("SCM_KHXX", queryForJXS, null, null);
			for (int K = 0; K < queryList2.size(); K++) {
				JSONObject queryItem2 = Json.toJO(queryList2.get(K));
				//AA.put("JXSDH", FormTools.isNull(queryItem2.get("JXSDH")) ? "" : queryItem2.get("JXSDH"));
				AA.put("SFZH", FormTools.isNull(queryItem2.get("SFZH")) ? "" : queryItem2.get("SFZH"));
			}
			System.out.print("SPMXLIST1:" + SPMXLIST.toString());
			if (SPMXLIST.size() > 0) {
				AA.put("SPLB", SPMXLIST);
				list2.add(AA);
				lsList.addAll(list2);
			}
		}
		System.out.print("lsList:" + lsList.toString());
		Map result = new HashMap();
		result.put("resultlist", lsList);
		return result;
	}

	//查询工程要货单报表
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCYHD.do")
	public Map getGCYHD(String XmlData, HttpServletRequest request) throws Exception {
		JSONObject json = Json.toJO(XmlData);
		Map query = FormTools.mongoMappingPart("MONGO_GCYHHD.SCM_GCYHHD", json, request);
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		List<DBObject> titleList = find("SCM_GCYHD", query, null, null);
		List resultList = new ArrayList();
		String sql = "";
		for (int i = 0; i < titleList.size(); i++) {
			JSONObject AA = Json.toJO(titleList.get(i));

			JSONArray SPLB = Json.toJA(AA.get("SPLB"));
			/*
			 *  查询结果里面的单据状态显示结果为 待审核、已审核，驳回
			 */
			if ("审核".equals(AA.get("BZ02").toString())) {
				AA.remove("BZ02");
				AA.put("BZ02", "待审核");
			}
			if ("封单".equals(AA.get("BZ02").toString())) {
				AA.remove("BZ02");
				AA.put("BZ02", "已审核");
			}
			if ("制单".equals(AA.get("BZ02").toString())) {
				AA.remove("BZ02");
				AA.put("BZ02", "驳回");
			}
			for (int j = 0; j < SPLB.size(); j++) {
				JSONObject BB = SPLB.getJSONObject(j);
				sql = "SELECT A.SPXX02, (SELECT SPXX04 FROM SPXX WHERE SPXX02 = A.SPXX02) SPMC,(SELECT PPB02 FROM SPXX WHERE SPXX02 = A.SPXX02) SPPPMC ,"
						+ " 	A.XSSL YKDSL, A.YHSL, (A.YHSL-A.XSSL-A.ZZSL) SYKDSL ,A.YHDJ, A.YHSL * A.YHDJ YHJE, A.ZZSL, A.XSSL, A.KHYHD01,A.FLBL,(A.YHSL * A.YHDJ * A.FLBL)FLJE "
						+ "  FROM KHYHDITEM_NEW A, KHYHD_NEW B " + "  WHERE A.GSXX01 = B.GSXX01 AND A.KHYHD01 = B.KHYHD01  " + "  AND B.GCDJH IS NOT NULL"
						+ "  AND B.GSXX01 = '" + AA.get("GSXX01") + "' AND B.JLWBDH = '" + AA.get("GCYHD01") + "' ";
				if (!FormTools.isNull(BB.get("WBTDH"))) {
					sql += " AND A.WBTDH = '" + BB.get("WBTDH") + "' ";
				}
				List<Map> list = queryForList(scm, sql);
				JSONObject CC = new JSONObject();
				CC.putAll(AA);
				if (list.size() > 0) {
					double SYKDSL = Double.parseDouble(list.get(0).get("SYKDSL").toString());
					double YHDJ = Double.parseDouble(list.get(0).get("YHDJ").toString());
					CC.put("SYKDJE", SYKDSL*YHDJ);
					CC.put("SPXX02", list.get(0).get("SPXX02"));
					CC.put("SPMC", list.get(0).get("SPMC"));
					CC.put("SPPPMC", list.get(0).get("SPPPMC"));
					CC.put("YHSL", list.get(0).get("YHSL"));
					CC.put("YKDSL", list.get(0).get("YKDSL"));
					CC.put("SYKDSL", list.get(0).get("SYKDSL"));
					CC.put("YHDJ", list.get(0).get("YHDJ"));
					CC.put("YHJE", list.get(0).get("YHJE"));
					CC.put("FLBL", list.get(0).get("FLBL"));
					CC.put("FLJE", list.get(0).get("FLJE"));
					CC.put("ZZSL", list.get(0).get("ZZSL"));
					CC.put("XSSL", list.get(0).get("XSSL"));
					CC.put("KHYHD", list.get(0).get("KHYHD01"));
					CC.put("BZJ", BB.get("BZJ"));
					CC.put("BZJDJ", BB.get("BZJDJ"));
					double bzjdj = Double.parseDouble(BB.get("BZJDJ").toString());
					double pfdj = Double.parseDouble(BB.get("PFDJ").toString());
					CC.put("KDDJ", bzjdj + pfdj);
					CC.put("HJJE", BB.get("HJJE"));
				} else {
					CC.put("SPXX02", BB.get("SPXX02"));
					/*
					 * MONGO里没有存放品牌名称这个字段，通过商品信息查询出来
					 */
					String sql1 = "select PPB02 from SPXX where SPXX02 = '" + BB.get("SPXX02") + "'";
					Map map = queryForMap(scm, sql1);
					if (!FormTools.isNull(map)) {
						CC.put("SPPPMC", map.get("PPB02"));
					}
					CC.put("YKDSL", 0);
					CC.put("SYKDSL", BB.get("YHSL"));
					CC.put("SPMC", BB.get("SPXX04"));
					CC.put("YHSL", BB.get("YHSL"));
					CC.put("YHDJ", BB.get("FXDJ"));
					if (!FormTools.isNull(BB.get("FLBL"))) {
						CC.put("FLBL", BB.get("FLBL"));
					} else {
						CC.put("FLBL", 0);
					}
					if (!FormTools.isNull(BB.get("FLJE"))) {
						CC.put("FLJE", BB.get("FLJE"));
					} else {
						CC.put("FLJE", 0);
					}
					CC.put("YHJE", BB.get("PFJE"));
					CC.put("ZZSL", 0);
					CC.put("XSSL", 0);
					CC.put("BZJ", BB.get("BZJ"));
					CC.put("BZJDJ", BB.get("BZJDJ"));
					double bzjdj = Double.parseDouble(BB.get("BZJDJ").toString());
					double pfdj = Double.parseDouble(BB.get("PFDJ").toString());
					CC.put("KDDJ", bzjdj + pfdj);
					CC.put("HJJE", BB.get("HJJE"));
					double SYKDSL = Double.parseDouble(BB.get("YHSL").toString());
					double YHDJ = Double.parseDouble(BB.get("FXDJ").toString());
					CC.put("SYKDJE", SYKDSL*YHDJ);
				}
				CC.put("AZDZMX", BB.get("AZDZMX"));
				if (!FormTools.isNull(json.get("KDZT"))) {
					if ("未开单".equals(json.get("KDZT"))) {
						if (CC.getDouble("SYKDSL") == 0) {
							continue;
						}
					}
					/*if("部分开单".equals(json.get("KDZT"))){
							if((CC.getDouble("YHSL")-CC.getDouble("YKDSL")-CC.getDouble("ZZSL")) <= 0 || CC.getDouble("YKDSL") == 0){
								continue;
							}
						}*/
					if ("已开单".equals(json.get("KDZT"))) {
						if (CC.getDouble("YHSL") - CC.getDouble("YKDSL") > 0) {
							continue;
						}
					}
					if ("已终止".equals(json.get("KDZT"))) {
						if (CC.getDouble("ZZSL") == 0) {
							continue;
						}
					}
				}
				if (CC.getDouble("YHSL") != 0) {
					resultList.add(CC);
				}
			}
		}
		Map result = new HashMap();
		if (!FormTools.isNull(json.get("SP"))) {
			Map query2 = FormTools.mongoMappingPart("CXGCYHD.SP", json, request);
			List<DBObject> lsList = new ArrayList<DBObject>();
			for (int i = 0; i < resultList.size(); i++) {
				DBObject ls = new BasicDBObject(Json.toJO(resultList.get(i)));
				lsList.add(ls);
			}
			DBCollection lsb = MongodbHandler.getDB().getCollection("linshiBJHJH");
			lsb.insert(lsList);
			List<DBObject> cxhtitleList = find("linshiBJHJH", query2, null, null);
			lsb.drop();
			result.put("resultlist", cxhtitleList);
		} else {
			result.put("resultlist", resultList);
		}
		
		return result;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGCTZD.do")
	public Map getGCTZD(String XmlData, HttpServletRequest request) throws Exception {
		Map result = new HashMap();
		Map json = FormTools.mapperToMap(XmlData);
		JSONArray splb = Json.toJA(json.get("SPLB"));

		//		List mogoList=null;
		//	    DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCHTTZD");
		//	    DBObject query = new BasicDBObject();
		//	    query.put("GCDLD01", json.get("gcht01"));
		////	    query.put("GCDLD01","asfAEF");
		//	    query.put("SH.key", new BasicDBObject("$regex","Y" ));
		//	    query.put("BZ02", new BasicDBObject("$regex","封单" ));
		//	    mogoList = dbCollection.find(query).toArray();
		//	    Map result = new HashMap();    
		//	    result.put("resultlist", mogoList);
		//	    return result;

		for (int i = 0; i < splb.size(); i++) {
			JSONObject spmx = splb.getJSONObject(i);

			String sql = "SELECT COUNT(1) TS FROM GCDLD A, SPXX B " + " WHERE A.PFSL - YHSL - GCZZSL + YSZZSL > 0 " + "   AND A.SPXX02 = B.SPXX02"
					+ "   AND A.GCDLD01 = '" + json.get("GCDLD01") + "' " + "   AND A.GSXX01 = '" + json.get("GSXX01") + "' " + "   AND A.GCSPBM = '"
					+ spmx.get("GCSPBM") + "' " + "   AND A.PFDJ = '" + spmx.get("PFDJ") + "' " + "   AND A.SQDJ = " + spmx.get("SQDJ");
			Map map = queryForMap(scm, sql);

			if (JLTools.strToInt(map.get("TS").toString()) <= 0) {
				result.put("resultlist", "-1");
			}

		}

		return result;
	}
}
