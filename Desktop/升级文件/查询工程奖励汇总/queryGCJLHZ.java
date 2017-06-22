package com.jlsoft.form.scm.gcgl.gcdl.interfaceQuery;

import java.util.ArrayList;
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
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

/**
 * 查询工程奖励汇总
 * @author 王定福
 *
 */
@Controller
@RequestMapping("/queryGCJLHZ")
public class queryGCJLHZ extends FormHandler {

	/**
	 * 去SCM_JXSJS 和   SCM_GCSCD 中去查询奖励金额和收差金额
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getJLHZ.do")
	public Map getJLHZ(String XmlData, HttpServletRequest request) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List resultlist = new ArrayList();
		JSONObject result = new JSONObject();
		Map query = FormTools.mongoMappingPart("GCJLHZB.CXGCJLHZ", json, request);
		query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
		if(!FormTools.isNull(json.get("PCRM_GSXX01"))){
			query.put("GSXX01", json.get("PCRM_GSXX01"));
		}else{
			System.exit(0);
		}
		List<DBObject> JXSJS_LIST = find("SCM_JXSJS", query, null, null);
		for(int i = 0;i<JXSJS_LIST.size();i++){
			JSONObject resultItem = new JSONObject();
			JSONObject queryItem = Json.toJO(JXSJS_LIST.get(i));
			JSONArray SPLB = queryItem.getJSONArray("SPLB");
			Double JLJE,SUMJLJE = 0.00;
			for(int j = 0;j<SPLB.size();j++){
				JSONObject SPLBItem = SPLB.getJSONObject(j);
				JLJE= Double.parseDouble(SPLBItem.get("JLJE").toString());
				SUMJLJE += JLJE;
			}
			resultItem.put("JLJE",SUMJLJE);//从经销商结算中获取奖励金额
			resultItem.put("JXSMC",queryItem.getString("JXSMC"));//从经销商结算中获取经销商名称
			resultItem.put("GCDLD01",queryItem.getString("GCDLD01"));//从经销商结算中获取经销商名称
			//去工程特殊收差单查询收差金额和收差原因
			Map queryForGCTSSC = new HashMap();
			queryForGCTSSC.put("GCDLD01", queryItem.get("GCDLD01"));
			queryForGCTSSC.put("S_VALUE", new BasicDBObject("$ne", "D1"));
			queryForGCTSSC.put("GSXX01", queryItem.getString("GSXX01"));
			List queryListForGCTSSC = new FormHandler().find("SCM_GCTSSC", queryForGCTSSC, null, null);
			for (int k = 0; k < queryListForGCTSSC.size(); k++) {
				JSONObject queryItemForGCTSSC = Json.toJO(queryListForGCTSSC.get(k));
				resultItem.put("SCJE", queryItemForGCTSSC.getString("SCJE"));
				//收差原因为使用单位地址+备注
				resultItem.put("SCSM", queryItemForGCTSSC.getString("SYDWDZ")+queryItemForGCTSSC.getString("JSBZ"));
			}
			if(queryListForGCTSSC.size()>0){
				resultlist.add(resultItem);
			}

		}
		result.put("resultlist", resultlist);
		return result;
	}
}
