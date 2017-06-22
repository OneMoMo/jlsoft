package com.jlsoft.form.scm.fxgl.fxd.imterfaceQuery;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

/**
 * @author :陈奇
 * @date : 2016年11月11日下午5:35:44
 */
@Component
@RequestMapping("/queryFXD")
public class queryFXD extends FormHandler {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getFXD.do")
	public Map getKHYHD(String XmlData, HttpServletRequest request) throws Exception {
		JSONObject json = Json.toJO(XmlData);
		List resultlist = new ArrayList();
		List list = queryForListByXML("scmform", "FXD.queryFXD", json);
		Map query = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			JSONObject queryItem = Json.toJO(list.get(i));
			JSONObject resultItem = new JSONObject();
			resultItem.putAll(queryItem);
			//从客户中查找工厂编码
			Map query1 = new HashMap();
			query1.put("YXBJ01.key", "1");
			query1.put("WLDW01", queryItem.get("KHBM"));
			List<DBObject> queryListForKHXX = find("SCM_KHXX", query1, null, null);
			for (int j = 0; j < queryListForKHXX.size(); j++) {
				JSONObject KHXXitem = Json.toJO(queryListForKHXX.get(j));
				resultItem.put("CJBM", (JLTools.isNull(KHXXitem.get("FXCJBM"))) ? "" : KHXXitem.get("FXCJBM").toString());
				resultItem.put("QY", KHXXitem.get("QY"));
				/*if (JLTools.isNull(resultItem.get("GCMC"))) {
					//如果是普通分销单
					resultItem.put("CJBM", (JLTools.isNull(KHXXitem.get("FXCJBM"))) ? "" : KHXXitem.get("FXCJBM").toString());
				} else {
					//如果是工程分销单
					resultItem.put("CJBM", (JLTools.isNull(KHXXitem.get("CJBM"))) ? "" : KHXXitem.get("CJBM").toString());
				}*/
			}

			query.put("S_VALUE", new BasicDBObject("$ne", "D1"));
			query.put("PFD01", queryItem.get("FXDH"));
			List<DBObject> queryList = find("SCM_FXD", query, null, null);
			if (queryList.size() != 0) {
				JSONObject queryItem1 = Json.toJO(queryList.get(0));
				resultItem.put("jlbh", queryItem1.get("jlbh"));
				resultItem.put("bdbh", queryItem1.get("bdbh"));

			} else {
				List<DBObject> queryList1 = find("SCM_FXTHCH", query, null, null);
				if (queryList1.size() != 0) {
					JSONObject queryItem2 = Json.toJO(queryList1.get(0));
					resultItem.put("jlbh", queryItem2.get("jlbh"));
					resultItem.put("bdbh", queryItem2.get("bdbh"));
				}
			}
			resultlist.add(resultItem);
		}

		Map result = new HashMap();
		result.put("resultlist", resultlist);
		return result;
	}
}
