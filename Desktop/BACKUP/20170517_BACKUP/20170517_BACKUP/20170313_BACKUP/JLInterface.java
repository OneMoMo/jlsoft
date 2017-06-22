package com.jlsoft.framework.forms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jlsoft.framework.aop.Authorization;
import com.jlsoft.framework.mdm.access.AccessExtender;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.jlsoft.framework.util.PropertiesReader;

@Controller
@RequestMapping("/JLInterface")
public class JLInterface extends FormHandler{

	private static Logger logger = Logger.getLogger(JLInterface.class);
	private String page_server_addr = null;

	public JLInterface() {
		super();
		this.page_server_addr = PropertiesReader.getInstance().getProperty("PAGING_URL");
		if (JLTools.isNull(this.page_server_addr)) {
			this.page_server_addr = null;
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getPagingData.do")
	public Map getPagingData(String XmlData) throws Exception {
		String resultData = "";
		if (this.page_server_addr != null) {
			try {
				Map json = FormTools.mapperToMap(XmlData);
				String sendurl = this.page_server_addr;
				if(!FormTools.isNull(json.get("size"))){
					sendurl += "?filename="+json.get("filename")+"-"+json.get("size")+".xml";
				}else{
					sendurl += "?filename="+json.get("filename");
				}
				resultData = JLTools.sendToSyncWithSSL("", sendurl);
			} catch (Exception e) {
				throw new Exception("获取分页内容失败");
			}
		} else {
			logger.error("PAGING_URL required. Please define it first.");
		}
		Map returnMap= new HashMap();
		returnMap.put("returnList", resultData);
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/checkSPFL01.do")
	public void checkSPFL01(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		String SPFL01 = json.get("SPFL01").toString();
		String SJFLBH = json.get("SJFLBH").toString();
		
		int i=0;
		if(SJFLBH.equals("")){
			String sql = "SELECT COUNT(0) FROM SPFL WHERE SPFL01='"+SPFL01+"'";
			i = queryForInt(scm, sql);
		}else{
			String sql = "SELECT COUNT(0) FROM SPFL WHERE SPFL01='"+SJFLBH + SPFL01+"'";
			i = queryForInt(scm, sql);
		}
		
		if(i>0){
			throw new RuntimeException("分类代码重复");
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getDQXX.do")
	public Map getDQXX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectDQXX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getDQBZM.do")
	public Map getDQBZM(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectDQBZM", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getDQXX_Mongo.do")
	public Map getDQXX_Mongo(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		String collection = json.get("collection").toString();
		List returnList = find(collection, (Map)json.get("query"), null, null);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getBMXX.do")
	public Map getBMXX(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("scm", "JLPub.selectBMXX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectYWGZ.do")
	public Map selectYWGZ(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.selectYWGZ", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectAllBM.do")
	public Map selectAllBM(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("scm", "JLPub.select_ALLBM", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectAllCK.do")
	public Map selectAllCK(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("scm", "JLPub.select_ALLCK", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectAllGZL.do")
	public Map selectAllGZL(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.select_AllGZL", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCDLX.do")
	public Map selectCDLX(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.select_CDLX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectGW.do")
	public Map selectGW(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.selectGW", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectJK.do")
	public Map selectJK(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.selectJK", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getFLSX_Mongo.do")
	public Map getFLXX_Mongo(String XmlData) throws Exception {
		Map returnMap= new HashMap();
		Map json = FormTools.mapperToMap(XmlData); 
		ArrayList returnList = new ArrayList(); 
		List flsxList = find("W_FLSX", (Map)json.get("query"), null, null);
		
		for (int i=0;i<flsxList.size();i++){
			Map flsxMap = new HashMap();
			flsxMap = (Map)flsxList.get(i);
			Map spflMap = FormTools.mapperToMap(flsxMap.get("spfl")); 
			if (!FormTools.isNull(spflMap.get("key"))){
				flsxMap.put("KEY", spflMap.get("key"));
				flsxMap.put("VALUE", spflMap.get("value"));
				
				returnList.add(flsxMap);
			}
		}
		
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getSPFL_Mongo.do")
	public Map getSPFL_Mongo(String XmlData) throws Exception {
		Map returnMap= new HashMap();
		Map json = FormTools.mapperToMap(XmlData); 
		ArrayList returnList = new ArrayList();
		Map queryMap= new HashMap();
		if (!FormTools.isNull(json.get("PARENT"))){
			queryMap.put("sjcode", json.get("PARENT"));
		}else{ 
			queryMap.put("sjcode", "00");
		}
		queryMap.put("yxbj", 1);
		List spflList = find("W_SPFL", queryMap, null, null);
		for (int i=0;i<spflList.size();i++){
			Map spflMap = new HashMap();
			spflMap = (Map)spflList.get(i);
			
			spflMap.put("KEY", spflMap.get("code"));
			spflMap.put("VALUE", spflMap.get("name"));
			spflMap.put("MJBJ", spflMap.get("mjbj"));
			
			Map spflQueryMap = new HashMap();
			spflQueryMap.put("spfl.key", spflMap.get("code"));
			
			List flsxList = find("W_FLSX", spflQueryMap, null, null);
			if (!FormTools.isNull(spflMap.get("mjbj"))){
				if (spflMap.get("mjbj").equals("1") && flsxList.size()>0){
					returnList.add(spflMap);
				}else if (spflMap.get("mjbj").equals("0")){
					returnList.add(spflMap);
				}
			}
		}
		
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectGSXX.do")
	public Map selectGSXX(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.selectGSXX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectBM.do")
	public Map selectBM(String XmlData) throws Exception {
		Map json = Json.toMap(XmlData);
		Map queryMap= new HashMap();
		if (!FormTools.isNull(json.get("PARENT"))){
			queryMap.put("BM_BM01", json.get("PARENT"));
		}else{ 
			queryMap.put("BM_BM01", "00");
		}
		
		List returnList = queryForListByXML("workflow", "JLPub.selectBM", queryMap);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectFWWDTREE.do")
	public Map selectFWWDTREE(String XmlData, HttpServletRequest request) throws Exception {
		Map queryMap = FormTools.mapperToMap(XmlData);
		Map userInfo = Authorization.getUserInfo(request);

		List returnList = new ArrayList();
		String sql = "SELECT GSXX01 KEY,GSXX02 VALUE,1 JB,0 MJBJ FROM GSXX WHERE 1 = 1";
		if(FormTools.isNull(queryMap.get("WDLX"))){
			sql += " AND GSXX01 IN (SELECT GSXX01 FROM CSS_FWWD)";
		}else{
			sql += " AND GSXX01 IN (SELECT GSXX01 FROM CSS_FWWD WHERE WDLX = "+ queryMap.get("WDLX") +")";
		}
		returnList = queryForList(scm, sql,null);
		Map map = new HashMap();
		map.put("KEY", "NO");
		map.put("VALUE", "无所属公司网点");
		map.put("JB", 1);
		map.put("MJBJ", 0);
		returnList.add(map);

		sql = "SELECT CASE WHEN GSXX01 IS NULL THEN　'NO' " +
			  "       ELSE TO_CHAR(GSXX01) END || '-' || A.FWWD01 KEY," +
			  "       A.FWWD02 VALUE,2 JB,1 MJBJ,CASE WHEN GSXX01 IS NULL THEN　'NO' ELSE TO_CHAR(GSXX01) END PARENT " +
			  "FROM CSS_FWWD A WHERE A.YXBJ = 1 ";
		
		if("0".equals(queryMap.get("WDLX"))){
			sql += " AND WDLX = 0 ";
			sql += " JL{CZY|FWWD01|PSWD_CZ|LIKE%}JL ";
		}else if("1".equals(queryMap.get("WDLX"))){
			sql += " AND WDLX = 1";
			sql += " JL{CZY|FWWD01|AZWD_CZ|LIKE%}JL ";
		}
		Map values = new HashMap();
		values.put("GSXX01", userInfo.get("GSXX01"));
		values.put("PersonID", userInfo.get("CZY01"));
		values.put("CompanyID", userInfo.get("GSXX01"));
		
		sql = AccessExtender.extendPlaceHolders(sql, values);//替换权限代码
		sql = AccessExtender.clearPlaceHolders(sql);//清理权限替代字符串	
		returnList.addAll(queryForList(scm, sql,null));
		System.out.print(sql);
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectFWWD.do")
	public Map selectFWWD(String XmlData) throws Exception {
		Map queryMap = Json.toMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectFWWD", queryMap);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectPSWD.do")
	public Map selectPSWD(String XmlData) throws Exception {
		Map queryMap = Json.toMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectPSWD", queryMap);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCK.do")
	public Map selectCK(String XmlData) throws Exception {
		Map queryMap = Json.toMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_CK", queryMap);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectPPB.do")
	public Map selectPPB(String XmlData) throws Exception {
		Map queryMap = Json.toMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectPPB", queryMap);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectSPFL.do")
	public Map selectSPFL(String XmlData) throws Exception {
		Map queryMap = Json.toMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectSPFL", queryMap);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/get_DQXX.do")
	public Map get_DQXX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_DQXX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/get_QXSKFS.do")
	public Map get_SKFS(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_QXSKFS", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/get_QXXSFS.do")
	public Map get_XSFS(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_QXXSFS", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/get_BMCK.do")
	public Map get_BMCK(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_BMCK", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/get_WLDW.do")
	public Map get_WLDW(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_WLDW", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/select_PSCK.do")
	public Map select_PSCK(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectPSCK", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/get_PPSPFLQX.do")
	public Map get_PPSPFLQX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_PPSPFLQX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectAllFWWD.do")
	public Map selectAllFWWD(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_AllFWWD", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectSKFS.do")
	public Map selectSKFS(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectSKFS", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectXSFS.do")
	public Map selectXSFS(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectXSFS", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectLSXSFS.do")
	public Map selectLSXSFS(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectLSXSFS", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectFXXSFS.do")
	public Map selectFXXSFS(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectFXXSFS", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectRYXX.do")
	public Map selectRYXX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_RYXX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectDBR.do")
	public Map selectDBR(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectDBR", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	} 
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectWBJK.do")
	public Map selectWBJK(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectWBJK", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCZYLX.do")
	public Map selectCZYLX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectCZYLX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectXXFL.do")
	public Map selectXXFL(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.select_XXFL", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCZY.do")
	public Map selectCZY(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("workflow", "JLPub.select_CZY", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCZGSQX.do")
	public Map selectCZGSQX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.selectCZGSQX", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/select_BM.do")
	public Map select_BM(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		List returnList = queryForListByXML("form", "JLPub.select_XSBM", json);
		
		Map returnMap= new HashMap();
		returnMap.put("returnList", returnList);
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/checkFYLX.do")
	public void checkFYLX(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		String FYBM = json.get("FYBM").toString();
		String SJFYBM = json.get("SJFYBM").toString();
		
		int i=0;
		if(SJFYBM.equals("")){
			String sql = "SELECT COUNT(0) FROM FYLX WHERE FYLX01='"+FYBM+"'";
			i = queryForInt(scm, sql);
		}else{
			String sql = "SELECT COUNT(0) FROM FYLX WHERE FYLX01='"+SJFYBM + FYBM+"'";
			i = queryForInt(scm, sql);
		}
		
		if(i>0){
			throw new RuntimeException("费用编码已存在");
		}
	}
	
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/checkFYBM.do")
	public void checkFBM(String XmlData) throws Exception {
		Map json = FormTools.mapperToMap(XmlData);
		String FYBMDM = json.get("FYBMDM").toString();
		String SJBMBM = json.get("SJBMBM").toString();
		
		int i=0;
		if(SJBMBM.equals("")){
			String sql = "SELECT COUNT(0) FROM FYBM WHERE FYBM01='"+FYBMDM+"'";
			i = queryForInt(scm, sql);
		}else{
			String sql = "SELECT COUNT(0) FROM FYBM WHERE FYBM01='"+SJBMBM + FYBMDM+"'";
			i = queryForInt(scm, sql);
		}
		
		if(i>0){
			throw new RuntimeException("部门编码已存在");
		}
	}
}
