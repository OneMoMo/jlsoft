package com.jlsoft.form.scm.gcgl.gcdl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.admin.scm.pub.adapter.ScmFormAdapter;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

/**
 * @author 方宜倍
 *
 */
@Service("scmMakeGCJZL")
public class SCM_GCJZL extends ScmFormAdapter {

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Boolean check(Map json, int bdbh, HttpServletRequest request) throws Exception {
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		JSONArray SPLBITEMS = Json.toJA(json.get("LX"));
		JSONArray SCLB = Json.toJA(json.get("SCLB"));
		/*JSONArray SPLB2 = new JSONArray();
		for(int i=0; i<SPLBITEMS.size(); i++){	
			JSONObject AA = SPLBITEMS.getJSONObject(i);
			String SPXH = json.get("jlbh").toString()+"-"+(i+1);
			AA.put("SPXH",SPXH);
			SPLB2.add(AA);
		}
		if(SPLB2.size()>0){
			json.put("LX", SPLB2);
		}*/
		if (initField.contains("SBR") && !"D1".equals(json.get("S_VALUE"))) {
			if (FormTools.isNull(json.get("GCZLDH"))) {
				json.put("GCZLDH", updateW_DJBHZT(workflow, json.get("GSXX01").toString(), "ZL"));
			}
			json.put("WLDW01", json.get("JXS01").toString());
			json.put("SPLB", json.get("LX"));
			json.put("SYDWDZ_V", json.get("SYDWDZ"));
			DBCollection SCM_JZLTM = MongodbHandler.getDB().getCollection("SCM_JZLTM");
			List<DBObject> lsList = new ArrayList<DBObject>();
			for (int i = 0; i < SCLB.size(); i++) {
				DBObject aa = new BasicDBObject();
				DBObject bb = new BasicDBObject();
				//内机
				aa.put("_id", SCLB.getJSONObject(i).get("SNJ").toString());
				aa.put("GGXH", SCLB.getJSONObject(i).get("GGXH").toString());
				aa.put("AZDZ", SCLB.getJSONObject(i).get("AZDZ").toString());
				aa.put("LXDH", SCLB.getJSONObject(i).get("LXDH").toString());
				aa.put("TMLX", "内机");
				aa.put("GCDLD01", json.get("GCDLD01"));
				aa.put("GCZLDH", json.get("GCZLDH"));
				//外机
				bb.put("_id", SCLB.getJSONObject(i).get("SWJ").toString());
				bb.put("GGXH", SCLB.getJSONObject(i).get("GGXH").toString());
				bb.put("AZDZ", SCLB.getJSONObject(i).get("AZDZ").toString());
				bb.put("LXDH", SCLB.getJSONObject(i).get("LXDH").toString());
				bb.put("TMLX", "外机");
				bb.put("GCDLD01", json.get("GCDLD01"));
				bb.put("GCZLDH", json.get("GCZLDH"));
				lsList.add(bb);
				lsList.add(aa);
			}
			//制单提交，判断条码的唯一性
			for (int i = 0; i < lsList.size(); i++) {
				DBObject querytj = new BasicDBObject();
				querytj.put("_id", lsList.get(i).get("_id"));
				List<DBObject> titleList = SCM_JZLTM.find(querytj, new BasicDBObject("_id", 0)).toArray();
				if (titleList.size() > 0) {
					throw new RuntimeException(lsList.get(i).get("GGXH") + "的条码" + lsList.get(i).get("_id") + "存在重复，不能提交");
				}
			}
			mappingPart("form.scm.gcgl.gcdl.gcjzl", json);
		}
		json.put("DJLY", "TJZL");
		return true;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Boolean insertBefore(Map json, int bdbh, HttpServletRequest request) throws Exception {
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		//交资料条码重复上传
//		List mongoList;
//		DBObject query = new BasicDBObject();
//		JSONArray QUERY_TJ = new JSONArray();
//		JSONObject JO1 = new JSONObject();
//		JSONObject JO2 = new JSONObject();
//		JSONArray FJTMSC = Json.toJA((json.get("SCLB")));
//		DBCollection DBSCM_GCJZLTM = MongodbHandler.getDB().getCollection("SCM_JZLTM");
//		if(FJTMSC.size()>0){
//			for(int i = 0;i<FJTMSC.size();i++){
//				JSONObject TM = Json.toJO(FJTMSC.get(i));
//				String SNJ = TM.get("SNJ").toString();
//				String SWJ = TM.get("SWJ").toString();
//				JO1.put("_id", SNJ);
//				JO2.put("_id", SWJ);
//				QUERY_TJ.add(JO1);
//				QUERY_TJ.add(JO2);
//				query.put("$or",QUERY_TJ);
//				mongoList = DBSCM_GCJZLTM.find(query).toArray();
//				if(mongoList.size()>0){
//					System.out.println(mongoList);
//					JSONObject error = Json.toJO(mongoList.get(0));
//					if(SNJ.equals(error.get("_id"))){
//						throw new RuntimeException("室内机条码【"+error.get("_id")+"】已上传");
//					}else if(SWJ.equals(error.get("_id"))){
//						throw new RuntimeException("室外机条码【"+error.get("_id")+"】已上传");
//					}else{
//						throw new RuntimeException("条码【"+error.get("_id")+"】已上传");
//					}
//				}
//				//String SNJ = 
//			}
//		}
		
		return true;
	}

	@Override
	@SuppressWarnings("rawtypes")
	public Boolean updateBefore(Map json, int bdbh, HttpServletRequest request) throws Exception {
		JSONArray initField = Json.toJA(request.getParameter("initField"));
		JSONObject SH = Json.toJO(json.get("SH"));
		JSONArray LX = Json.toJA(json.get("LX"));
		JSONArray SCLB = Json.toJA(json.get("SCLB"));
		JSONObject ZLZT = Json.toJO(json.get("ZLZT"));
		if (initField.contains("PFR") && "Y".equals(SH.get("key")) && !"D1".equals(json.get("S_VALUE"))) {
			mappingPart("form.scm.gcgl.gcdl.gcjzlsh", json);
			DBCollection SCM_JZLTM = MongodbHandler.getDB().getCollection("SCM_JZLTM");
			List<DBObject> lsList = new ArrayList<DBObject>();
			for (int i = 0; i < SCLB.size(); i++) {
				DBObject aa = new BasicDBObject();
				DBObject bb = new BasicDBObject();
				//内机
				aa.put("_id", SCLB.getJSONObject(i).get("SNJ").toString());
				aa.put("GGXH", SCLB.getJSONObject(i).get("GGXH").toString());
				aa.put("AZDZ", SCLB.getJSONObject(i).get("AZDZ").toString());
				aa.put("LXDH", SCLB.getJSONObject(i).get("LXDH").toString());
				aa.put("TMLX", "内机");
				aa.put("GCDLD01", json.get("GCDLD01"));
				aa.put("GCZLDH", json.get("GCZLDH"));
				//外机
				bb.put("_id", SCLB.getJSONObject(i).get("SWJ").toString());
				bb.put("GGXH", SCLB.getJSONObject(i).get("GGXH").toString());
				bb.put("AZDZ", SCLB.getJSONObject(i).get("AZDZ").toString());
				bb.put("LXDH", SCLB.getJSONObject(i).get("LXDH").toString());
				bb.put("TMLX", "外机");
				bb.put("GCDLD01", json.get("GCDLD01"));
				bb.put("GCZLDH", json.get("GCZLDH"));
				lsList.add(bb);
				lsList.add(aa);
			}
			//调接口前，判断条码的唯一性
			for (int i = 0; i < lsList.size(); i++) {
				DBObject querytj = new BasicDBObject();
				querytj.put("_id", lsList.get(i).get("_id"));
				List<DBObject> titleList = SCM_JZLTM.find(querytj, new BasicDBObject("_id", 0)).toArray();
				if (titleList.size() > 0) {
					throw new RuntimeException(lsList.get(i).get("GGXH") + "的条码" + lsList.get(i).get("_id") + "存在重复，不能提交");
				}
			}
			//			System.out.println("1111111111111111111");
			JSONObject GCLX = Json.toJO(json.get("GCLX"));
			int GCBJ;
			if ("家用".equals(GCLX.get("value"))) {
				GCBJ = 1;
			} else {
				GCBJ = 2;
			}
			json.put("GCBJ", GCBJ);
			json.put("WLDW01", json.get("JXS01").toString());
			json.put("SPLB", json.get("LX"));

			String BZ = "";
			if (!FormTools.isNull(json.get("BZ"))) {
				BZ = json.get("BZ").toString();
			}
			//BZ = BZ + " " + json.get("SYDW").toString() + "+" + json.get("GCDLD01").toString();
			json.put("BZ", BZ);
			try {
				Map map = sendScmInboundInvoke("scmform.gcgl.pfd.gcjzlsl", json);
			} catch (Exception e) {
				String str1 = e.toString();
				if (str1.contains("归还数量大于申请数量")) {
					String str = str1.substring(21);
					String jieguo = str.substring(str.indexOf(":") + 1, str.indexOf("归"));
					JSONObject jsonArray = Json.toJO(json);
					JSONArray ja = (JSONArray) jsonArray.get("SPLB");
					for (int z = 0; z < ja.size(); z++) {
						JSONObject jo = (JSONObject) ja.get(z);
						if (jieguo.equals(jo.get("SPXX01").toString())) {
							jieguo = jo.get("JLWBDH").toString() + "有分销退货,交资料数量大于可交资料数量,请删除重新制单交资料!";
						}
					}

					throw new RuntimeException(jieguo);
				} else {
					throw new RuntimeException(e);
				}
			}
			//			Map map = sendScmInboundInvoke("scmform.gcgl.pfd.gcjzlsl", json);
			//插入条码
			SCM_JZLTM.insert(lsList);
			for (int i = 0; i < LX.size(); i++) {
				LX.getJSONObject(i).put("GCZLDH", json.get("GCZLDH"));
				LX.getJSONObject(i).put("ZLZT", ZLZT.get("value"));
			}
			json.put("LX", LX);
		}
		return true;
	}
}