package com.jlsoft.form.scm.gcgl.gcdl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.admin.scm.pub.adapter.ScmFormAdapter;
import com.jlsoft.framework.aop.Authorization;
import com.jlsoft.framework.forms.FormDiff;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.util.JLConf;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

/**
 * @author 刁小峻
 * 
 */
@Service("scmMakeGCDLD")
public class SCM_GCDLD extends ScmFormAdapter {

	@Autowired
	private JLConf jlConf;

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Boolean check(Map json, int bdbh, HttpServletRequest request) throws Exception {
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		JSONArray SPLB = Json.toJA(json.get("SPLB"));
		JSONArray AZDZLB = Json.toJA(json.get("AZDZLB"));
		JSONObject SHYJ = Json.toJO(json.get("SH"));
		JSONObject DYDLBJ = Json.toJO(json.get("DYDLBJ"));
		JSONObject YSGC_DJZT1 = new JSONObject();
		YSGC_DJZT1.put("key", "合同待审核");
		YSGC_DJZT1.put("value", "合同待审核");
		JSONObject YSGC_DJZT2 = new JSONObject();
		YSGC_DJZT2.put("key", "合同已审核");
		YSGC_DJZT2.put("value", "合同已审核");
		JSONObject YSGC_DJZT3 = new JSONObject();
		YSGC_DJZT3.put("key", "合同驳回");
		YSGC_DJZT3.put("value", "合同驳回");
		if (json.get("GCDLD01") == null || FormTools.isNull(json.get("GCDLD01"))) {
			String WBBH = "";
			//查mogo定义二级经销商 看是否存在该客户
			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_JXSZC");
			DBObject query = new BasicDBObject();
			if (!FormTools.isNull(json.get("SBR02"))) {
				query.put("DLZH", json.get("SBR02"));
			}
			List<DBObject> titleList = dbCollection.find(query, new BasicDBObject("_id", 0)).toArray();
			if (titleList.size() > 0) {
				DBObject aaa = titleList.get(0);
				if (aaa.containsField("CJBM")) {
					if (aaa.get("CJBM") != null) {
						WBBH = aaa.get("CJBM").toString();
					}
				}
			} else {
				//不存在该客户查底表往来单位 
				String sqlString = "SELECT WLDW01 ,WLDW02 WLDWMC ,WBBM FROM WLDW A  WHERE A.WLDW01='" + json.get("WLDW01") + "'";
				List<Map> LISTA = queryForList(scm, sqlString);
				if (LISTA.size() > 0) {
					Map aaa = (Map) LISTA.get(0);
					if (!FormTools.isNull(aaa.get("WBBM"))) {
						WBBH = aaa.get("WBBM").toString();
					}
				}
			}
			if (WBBH == null || WBBH == "") {
				throw new Exception("请先维护厂家编码");
			}
			json.put("GCDLD01", updateW_BHDJ_GCDL(workflow, WBBH, "DL"));
		}
		// 检查
		if (initField.contains("SBR") && !"D1".equals(json.get("S_VALUE"))) {
			mappingPart("form.scm.gcgld.gcdld", json);
			DBObject query = new BasicDBObject();
			query.put("WLDW01", json.get("WLDW01"));
			DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_KHXX");
			List<DBObject> titleList = dbCollection.find(query, new BasicDBObject("_id", 0)).toArray();
			if (titleList.size() > 0) {
				DBObject aaa = titleList.get(0);
				if (aaa == null) {
					aaa = new BasicDBObject();
				}
				json.put("QY", aaa.get("QY"));
			}
			JSONObject GCLX = Json.toJO(json.get("GCLX"));
			int GCBJ;
			if ("家用".equals(GCLX.get("value"))) {
				GCBJ = 1;
			} else {
				GCBJ = 2;
			}
			String bmSQL = "SELECT BM01,BM02 BMMC FROM  BM  WHERE GCBJ='" + GCBJ + "'" + "AND GSXX01='" + json.get("GSXX01") + "'";
			List<Map> bmLIST = queryForList(scm, bmSQL);
			for (int i = 0; i < bmLIST.size(); i++) {
				json.put("XSBM01", bmLIST.get(i).get("BM01"));
			}

			// 解析明细列表安装地址
			String SYDWDZ = "";
			for (int i = 0; i < AZDZLB.size(); i++) {
				String AZDZLBSJ = "";
				List<Map> SYDWDZlist = AZDZLB.getJSONObject(i).get("AZDZ") == null ? new ArrayList<Map>() : (List<Map>) AZDZLB.getJSONObject(i).get("AZDZ");
				//需要控制安装地址必须选择末级区域
				boolean flag = true;
				for (int s = 0; s < SYDWDZlist.size(); s++) {
					int MJBJ = 0;
					if (!FormTools.isNull(SYDWDZlist.get(s).get("MJBJ"))) {
						MJBJ = Integer.parseInt(SYDWDZlist.get(s).get("MJBJ").toString());
					} else {
						throw new RuntimeException("安装地址列表中的安装地址必须选择末级区域。 ");
					}
					if (MJBJ == 1) {
						flag = false;
						break;
					}
				}
				if (flag) {
					throw new RuntimeException("安装地址列表中的安装地址必须选择末级区域。 ");
				}

				for (int j = 0; j < SYDWDZlist.size(); j++) {
					String valueString = SYDWDZlist.get(j).get("VALUE").toString();
					AZDZLBSJ += valueString;
				}
				if (AZDZLB.size() == 1) {
					SYDWDZ += AZDZLBSJ;
				} else {
					SYDWDZ += AZDZLBSJ += ";";
				}
			}
			json.put("SYDWDZ", SYDWDZ);
			json.put("YSYDWDZ", json.get("SYDWDZ"));
			json.put("YSYDW", json.get("SYDW"));
			json.put("YGMDW", json.get("GMDW"));

			if (!"D1".equals(json.get("S_VALUE"))) {
				JSONObject GC_DJZT = new JSONObject();
				GC_DJZT.put("key", "登录待审核");
				GC_DJZT.put("value", "登录待审核");
				json.put("GC_DJZT", GC_DJZT);
				json.put("YXBJ", "有效");
			}
		}
		if (initField.contains("PFR") && !"D1".equals(json.get("S_VALUE"))) {
			if ("Y".equals(SHYJ.get("key"))) {
				mappingPart("form.scm.gcgld.gcdldsh", json);
				if (DYDLBJ.get("value").equals("是")) {
					if (!FormTools.isNull(json.get("YXDH"))) {
						//疑似单号不为空 ，此单登陆单位改为第一登陆，需要把疑似单号改变为登陆标记为否
						DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
						DBObject query = new BasicDBObject();
						query.put("GCDLD01", json.get("YXDH").toString());
						query.put("GSXX01", json.get("GSXX01").toString());
						List<DBObject> titleList = dbCollection.find(query, new BasicDBObject("_id", 0)).toArray();
						if (titleList.size() > 0) {
							DBObject YSSJ = titleList.get(0);
							JSONObject YXDYDLBJ = new JSONObject();
							YXDYDLBJ.put("key", "1");
							YXDYDLBJ.put("value", "否");
							JSONObject YXGC_DJZT = new JSONObject();
							YXGC_DJZT.put("key", "不允许操作");
							YXGC_DJZT.put("value", "不允许操作");
							DBObject XGDJZT = new BasicDBObject();
							XGDJZT.put("DYDLBJ", YXDYDLBJ);
							XGDJZT.put("GC_DJZT", YXGC_DJZT);
							if (DYDLBJ.equals(YSSJ.get("DYDLBJ"))) {
								if (!YSGC_DJZT1.equals(YSSJ.get("GC_DJZT")) && !YSGC_DJZT2.equals(YSSJ.get("GC_DJZT"))
										&& !YSGC_DJZT3.equals(YSSJ.get("GC_DJZT"))) {
									dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
									String pidsql = "SELECT pid FROM w_taskywgl where tblname = '" + YSSJ.get("bdbh") + "' and JLBH = '" + YSSJ.get("jlbh")
											+ "'";
									List<Map> pidLIST = queryForList(workflow, pidsql);
									String dbsql = "select sk01 from  w_task where pid='" + pidLIST.get(0).get("pid") + "'";
									List<Map> dbLIST = queryForList(workflow, dbsql);
									if (dbLIST.size() == 1) {
										//更新的代办摘要
										JSONObject XDBZY = new JSONObject();
										String YXGC_DJZTkey = YXGC_DJZT.get("key").toString();
										XDBZY.put("工程登录单号", titleList.get(0).get("GCDLD01"));
										XDBZY.put("经销商名称", titleList.get(0).get("JXSMC"));
										XDBZY.put("使用单位", titleList.get(0).get("SYDW"));
										XDBZY.put("申报时间", titleList.get(0).get("SBSJ"));
										XDBZY.put("GC_DJZT", YXGC_DJZTkey);
										String upsql = " update w_task set SK02='" + XDBZY + "' WHERE pid='" + pidLIST.get(0).get("pid") + "' AND sk01 ='"
												+ dbLIST.get(0).get("sk01") + "'";
										Map valuesdel = new HashMap();
										execSQL(workflow, upsql, valuesdel);
									}
								}
							}
						}
					}
				}
				if (DYDLBJ.get("value").equals("是")) {
					JSONObject GC_DJZT = new JSONObject();
					GC_DJZT.put("key", "待签合同");
					GC_DJZT.put("value", "待签合同");
					json.put("GC_DJZT", GC_DJZT);
				} else {
					JSONObject GC_DJZT = new JSONObject();
					GC_DJZT.put("key", "不允许操作");
					GC_DJZT.put("value", "不允许操作");
					json.put("GC_DJZT", GC_DJZT);
				}
				//				json.put("DDDLDH", GCDLDXH);
			} else {
				//审核不同意 单据状态为驳回
				JSONObject GC_DJZT = new JSONObject();
				GC_DJZT.put("key", "驳回");
				GC_DJZT.put("value", "驳回");
				json.put("GC_DJZT", GC_DJZT);
			}
		}

		if (initField.contains("GC_GJR") && !"D1".equals(json.get("S_VALUE"))) {
			mappingPart("form.scm.gcgld.gcdld", json);
			mappingPart("form.scm.gcgld.gcdldsh", json);
			if (!FormTools.isNull(json.get("YQBJ"))) {
				if (FormTools.isNull(json.get("GC_GJQK"))) {
					throw new RuntimeException("延期操作，详细描述不能为空");
				}
				json.remove("YQBJ");
			}
			String SYDWDZ = "";
			for (int i = 0; i < AZDZLB.size(); i++) {
				String AZDZLBSJ = "";
				List<Map> SYDWDZlist = AZDZLB.getJSONObject(i).get("AZDZ") == null ? new ArrayList<Map>() : (List<Map>) AZDZLB.getJSONObject(i).get("AZDZ");
				//需要控制安装地址必须选择末级区域
				/*boolean flag = true;
				for(int s=0; s<SYDWDZlist.size(); s++){
					int MJBJ=0;
					if(!FormTools.isNull(SYDWDZlist.get(s).get("MJBJ"))){
						 MJBJ=Integer.parseInt(SYDWDZlist.get(s).get("MJBJ").toString());
					}else{
						throw new RuntimeException("安装地址列表中的安装地址必须选择末级区域。 ");
					}
					if(MJBJ==1){
						flag = false;
						break;
					}
				}
				if(flag){
					throw new RuntimeException("安装地址列表中的安装地址必须选择末级区域。 ");
				}*/
				for (int j = 0; j < SYDWDZlist.size(); j++) {
					String valueString = SYDWDZlist.get(j).get("VALUE").toString();
					AZDZLBSJ += valueString;
				}
				if (AZDZLB.size() == 1) {
					SYDWDZ += AZDZLBSJ;
				} else {
					SYDWDZ += AZDZLBSJ += ";";
				}
			}
			json.put("SYDWDZ", SYDWDZ);

			String YSYDW = json.get("YSYDW").toString();
			String YSYDWDZ = json.get("YSYDWDZ").toString();
			String YGMDW = json.get("YGMDW").toString();
			if (!YSYDW.equals(json.get("SYDW").toString()) || !YSYDWDZ.equals(json.get("SYDWDZ").toString()) || !YGMDW.equals(json.get("GMDW").toString())) {
				//流转下一步回复
				JSONObject SFHF = new JSONObject();
				SFHF.put("key", "回复");
				SFHF.put("value", "回复");
				json.put("DLD", SFHF);
				//回复之后，登陆单改变为不允许操作
				json.put("DLXH", 0);
				DYDLBJ.put("key", "1");
				DYDLBJ.put("value", "否");
				json.put("DYDLBJ", DYDLBJ);
				//改变为待审核状态
				JSONObject GC_DJZT = new JSONObject();
				GC_DJZT.put("key", "登陆待审核");
				GC_DJZT.put("value", "登陆待审核");
				json.put("GC_DJZT", GC_DJZT);

				json.put("YSYDWDZ", json.get("SYDWDZ"));
				json.put("YSYDW", json.get("SYDW"));
				json.put("YGMDW", json.get("GMDW"));
			}
			if ("N".equals(SHYJ.get("key"))) {
				//跟进步骤驳回 回到制单步骤
				JSONObject LZZD = new JSONObject();
				LZZD.put("key", "制单");
				LZZD.put("value", "制单");
				json.put("DLD", LZZD);
			}
			//工程员跟进改变第一登陆，单据状态变为不允许操作,不扭转到回复步骤进这个行为
			JSONObject GC_DJZT = Json.toJO(json.get("GC_DJZT"));
			JSONObject DLD = Json.toJO(json.get("DLD"));
			if (!"登陆待审核".equals(GC_DJZT.get("value")) && "否".equals(DYDLBJ.get("value"))) {
				//改变为待审核状态
				JSONObject GC_DJZT1 = new JSONObject();
				GC_DJZT1.put("key", "不允许操作");
				GC_DJZT1.put("value", "不允许操作");
				json.put("GC_DJZT", GC_DJZT1);
			}
			if ("跟进".equals(DLD.get("value"))) {
				if ("是".equals(DYDLBJ.get("value"))) {
					//改变为
					JSONObject GC_DJZT22 = new JSONObject();
					GC_DJZT22.put("key", "待签合同");
					GC_DJZT22.put("value", "待签合同");
					json.put("GC_DJZT", GC_DJZT22);

					if (!FormTools.isNull(json.get("YXDH"))) {
						//疑似单号不为空 ，此单登陆单位改为第一登陆，需要把疑似单号改变为登陆标记为否
						DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
						DBObject query = new BasicDBObject();
						query.put("GCDLD01", json.get("YXDH").toString());
						query.put("GSXX01", json.get("GSXX01").toString());
						List<DBObject> titleList = dbCollection.find(query, new BasicDBObject("_id", 0)).toArray();
						if (titleList.size() > 0) {
							DBObject YSSJ = titleList.get(0);
							JSONObject YXDYDLBJ = new JSONObject();
							YXDYDLBJ.put("key", "1");
							YXDYDLBJ.put("value", "否");
							JSONObject YXGC_DJZT = new JSONObject();
							YXGC_DJZT.put("key", "不允许操作");
							YXGC_DJZT.put("value", "不允许操作");
							DBObject XGDJZT = new BasicDBObject();
							XGDJZT.put("DYDLBJ", YXDYDLBJ);
							XGDJZT.put("GC_DJZT", YXGC_DJZT);
							if (DYDLBJ.equals(YSSJ.get("DYDLBJ"))) {
								if (!YSGC_DJZT1.equals(YSSJ.get("GC_DJZT")) && !YSGC_DJZT2.equals(YSSJ.get("GC_DJZT"))
										&& !YSGC_DJZT3.equals(YSSJ.get("GC_DJZT"))) {
									dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
									String pidsql = "SELECT pid FROM w_taskywgl where tblname = '" + YSSJ.get("bdbh") + "' and JLBH = '" + YSSJ.get("jlbh")
											+ "'";
									List<Map> pidLIST = queryForList(workflow, pidsql);
									String dbsql = "select sk01 from  w_task where pid='" + pidLIST.get(0).get("pid") + "'";
									List<Map> dbLIST = queryForList(workflow, dbsql);
									if (dbLIST.size() == 1) {
										//更新的代办摘要
										JSONObject XDBZY = new JSONObject();
										String YXGC_DJZTkey = YXGC_DJZT.get("key").toString();
										XDBZY.put("工程登录单号", titleList.get(0).get("GCDLD01"));
										XDBZY.put("经销商名称", titleList.get(0).get("JXSMC"));
										XDBZY.put("使用单位", titleList.get(0).get("SYDW"));
										XDBZY.put("申报时间", titleList.get(0).get("SBSJ"));
										XDBZY.put("GC_DJZT", YXGC_DJZTkey);
										String upsql = " update w_task set SK02='" + XDBZY + "' WHERE pid='" + pidLIST.get(0).get("pid") + "' AND sk01 ='"
												+ dbLIST.get(0).get("sk01") + "'";
										Map valuesdel = new HashMap();
										execSQL(workflow, upsql, valuesdel);
									}
								}
							}
						}
					}
				}
			}
		}
		if (initField.contains("GC_HFR") && !"D1".equals(json.get("S_VALUE"))) {
			mappingPart("form.scm.gcgld.gcdld", json);
			mappingPart("form.scm.gcgld.gcdldsh", json);
			if (DYDLBJ.get("value").equals("是")) {
				if (!FormTools.isNull(json.get("YXDH"))) {
					//疑似单号不为空 ，此单登陆单位改为第一登陆，需要把疑似单号改变为登陆标记为否
					DBCollection dbCollection = MongodbHandler.getDB().getCollection("SCM_GCDLD");
					DBObject query = new BasicDBObject();
					query.put("GCDLD01", json.get("YXDH").toString());
					query.put("GSXX01", json.get("GSXX01").toString());
					List<DBObject> titleList = dbCollection.find(query, new BasicDBObject("_id", 0)).toArray();
					if (titleList.size() > 0) {
						DBObject YSSJ = titleList.get(0);
						JSONObject YXDYDLBJ = new JSONObject();
						YXDYDLBJ.put("key", "1");
						YXDYDLBJ.put("value", "否");
						JSONObject YXGC_DJZT = new JSONObject();
						YXGC_DJZT.put("key", "不允许操作");
						YXGC_DJZT.put("value", "不允许操作");
						DBObject XGDJZT = new BasicDBObject();
						XGDJZT.put("DYDLBJ", YXDYDLBJ);
						XGDJZT.put("GC_DJZT", YXGC_DJZT);
						if (DYDLBJ.equals(YSSJ.get("DYDLBJ"))) {
							if (!YSGC_DJZT1.equals(YSSJ.get("GC_DJZT")) && !YSGC_DJZT2.equals(YSSJ.get("GC_DJZT")) && !YSGC_DJZT3.equals(YSSJ.get("GC_DJZT"))) {
								dbCollection.update(query, new BasicDBObject("$set", XGDJZT));
								String pidsql = "SELECT pid FROM w_taskywgl where tblname = '" + YSSJ.get("bdbh") + "' and JLBH = '" + YSSJ.get("jlbh") + "'";
								List<Map> pidLIST = queryForList(workflow, pidsql);
								String dbsql = "select sk01 from  w_task where pid='" + pidLIST.get(0).get("pid") + "'";
								List<Map> dbLIST = queryForList(workflow, dbsql);
								if (dbLIST.size() == 1) {
									//更新的代办摘要
									JSONObject XDBZY = new JSONObject();
									String YXGC_DJZTkey = YXGC_DJZT.get("key").toString();
									XDBZY.put("工程登录单号", titleList.get(0).get("GCDLD01"));
									XDBZY.put("经销商名称", titleList.get(0).get("JXSMC"));
									XDBZY.put("使用单位", titleList.get(0).get("SYDW"));
									XDBZY.put("申报时间", titleList.get(0).get("SBSJ"));
									XDBZY.put("GC_DJZT", YXGC_DJZTkey);
									String upsql = " update w_task set SK02='" + XDBZY + "' WHERE pid='" + pidLIST.get(0).get("pid") + "' AND sk01 ='"
											+ dbLIST.get(0).get("sk01") + "'";
									Map valuesdel = new HashMap();
									execSQL(workflow, upsql, valuesdel);
								}
							}
						}
					}

				}
			}
			JSONObject GC_DJZT = Json.toJO(json.get("GC_DJZT"));
			if ("超期作废".equals(GC_DJZT.get("key")) || "丢单作废".equals(GC_DJZT.get("key")) || "其它作废".equals(GC_DJZT.get("key"))) {
				json.put("YXBJ", "无效");
				// 单据直接封单
				JSONObject YS = new JSONObject();
				YS.put("key", "N");
				YS.put("value", "不同意");
				json.put("YS", YS);
			}
			if ("合同已审核".equals(GC_DJZT.get("key"))) {
				// 单据直接封单
				JSONObject YS = new JSONObject();
				YS.put("key", "N");
				YS.put("value", "不同意");
				json.put("YS", YS);
			}
			JSONObject SH = Json.toJO(json.get("SH"));
			if ("N".equals(SH.get("key"))) {
				JSONObject YS = new JSONObject();
				YS.put("key", "制单");
				YS.put("value", "制单");
				json.put("YS", YS);
			}
			//回复 批为第一登陆 单据状态改为待签合同
			if (!"合同待审核".equals(GC_DJZT.get("value")) && "是".equals(DYDLBJ.get("value"))) {
				GC_DJZT.put("key", "待签合同");
				GC_DJZT.put("value", "待签合同");
				json.put("GC_DJZT", GC_DJZT);
			}

			if (!"合同待审核".equals(GC_DJZT.get("value")) && "是".equals(DYDLBJ.get("value"))) {
				GC_DJZT.put("key", "待签合同");
				GC_DJZT.put("value", "待签合同");
				json.put("GC_DJZT", GC_DJZT);
			}
		}
		if (!FormTools.isNull(json.get("S_VALUE")) && "D1".equals(json.get("S_VALUE"))) {
			JSONObject GC_DJZT = new JSONObject();
			GC_DJZT.put("key", "单据已删除");
			GC_DJZT.put("value", "单据已删除");
			json.put("YXBJ", "无效");
		}
		System.out.println("--------------------------------------------------------");
		//控制不同版本必填项

		jlConf.isRequired(json, "GCDLD");
		JSONObject SFTSGC = Json.toJO(json.get("SFTSGC"));
		System.out.println(SFTSGC.get("value"));
		if ((!FormTools.isNull(SFTSGC.get("value"))) && ("3".equals(SFTSGC.get("key")) || "2".equals(SFTSGC.get("key")))) {
			System.out.println(SFTSGC.get("value"));
			jlConf.isRequired(json, "GCDLD_1");
		}

		return true;
	}

	@Override
	@SuppressWarnings("rawtypes")
	public Boolean updateBefore(Map json, int bdbh, HttpServletRequest request) throws Exception {
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		if (initField.contains("PFR") && "同意".equals(Json.toJO(json.get("SH")).get("value"))) {
			json.put("SPLB", FormTools.addWBTDH(json.get("SPLB")));
		}
		if (initField.contains("SBR") && !FormTools.isNull(json.get("GCDLD01"))) {
			if (!FormTools.isNull(json.get("S_VALUE")) && "D1".equals(json.get("S_VALUE"))) {
				json.put("YXBJ", "无效");
			}
		}
		return true;
	}

	@SuppressWarnings("rawtypes")
	public Map saveBefore(Map json, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map userInfo = Authorization.getUserInfo(request);
		JSONArray initField = Json.toJA(request.getParameter("initField"));

		JSONArray LIST = new JSONArray();
		JSONArray GC_LOG = json.get("GC_LOG") == null ? new JSONArray() : Json.toJA(json.get("GC_LOG"));

		JSONObject row = new JSONObject();
		if (initField.contains("GC_GJR") || initField.contains("GC_HFR")) {
			if (initField.contains("GC_GJR")) {
				if (userInfo != null) {
					row.put("GC_CZY_TITLE", "跟进人");
					row.put("GC_CZY", userInfo.get("CZY03"));
					row.put("GC_CZSJ_TITLE", "跟进时间");
					row.put("GC_CZSJ", FormTools.getSysTime());
					row.put("GC_CZYJ_TITLE", "跟进情况");
					row.put("GC_CZYJ", json.get("GC_GJQK"));
					row.put("GC_SCZP_TITLE", "上传照片");
					row.put("GC_SCZP", json.get("GC_SCZP"));
					row.put("GC_XGJL_TITLE", "修改记录");
				} else {
					row.put("GC_CZY_TITLE", "跟进人");
					row.put("GC_CZY", "系统超期处理");
					row.put("GC_CZSJ_TITLE", "跟进时间");
					row.put("GC_CZSJ", FormTools.getSysTime());
					row.put("GC_CZYJ_TITLE", "跟进情况");
					row.put("GC_CZYJ", json.get("GC_GJQK"));
					row.put("GC_SCZP_TITLE", "上传照片");
					row.put("GC_SCZP", json.get("GC_SCZP"));
					row.put("GC_XGJL_TITLE", "修改记录");
				}

				json.remove("GC_GJQK");
				json.remove("GC_SCZP");
			} else if (initField.contains("GC_HFR")) {
				//			JSONObject row = new JSONObject();
				row.put("GC_CZY_TITLE", "回复人");
				row.put("GC_CZY", userInfo.get("CZY03"));
				row.put("GC_CZSJ_TITLE", "回复时间");
				row.put("GC_CZSJ", FormTools.getSysTime());
				/*row.put("GC_CZGW_TITLE", "发送至");
				row.put("GC_CZGW",json.get("GC_LZRY"));*/
				row.put("GC_CZYJ_TITLE", "回复意见");
				row.put("GC_CZYJ", json.get("GC_HFYJ"));
				row.put("GC_XGJL_TITLE", "修改记录");
				json.remove("GC_HFYJ");
			}
			Map XmlData = new JSONObject();
			XmlData.put("bdbh", json.get("bdbh"));
			XmlData.put("jlbh", json.get("jlbh"));

			Map XGJL = new FormDiff().getFormDiff(XmlData.toString());
			Map data = (Map) XGJL.get("data");
			String GC_XGJL = "";
			if (!FormTools.isNull(data)) {
				Iterator it = data.keySet().iterator();
				while (it.hasNext()) {
					String key = it.next().toString();
					GC_XGJL += key + ":" + data.get(key) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				}
			}

			if (initField.contains("GC_GJR")) {
				if (JLTools.isNull(GC_XGJL) && (JLTools.isNull(row.get("GC_SCZP")) ? true : row.get("GC_SCZP").toString().replaceAll(" ", "").equals("[]"))
						&& JLTools.isNull(row.get("GC_CZYJ")) && !"封单".equals(json.get("BZ02"))) {
					throw new RuntimeException("您没有对页面进行任何修改操作，不允许提交！ ");
				}
				row.put("GC_XGJL", GC_XGJL);
				row.put("GC_CZBJ", "GJ");
				LIST.add(row);
				LIST.addAll(GC_LOG);
				json.put("GC_LOG", LIST);

			} else if (initField.contains("GC_HFR")) {
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