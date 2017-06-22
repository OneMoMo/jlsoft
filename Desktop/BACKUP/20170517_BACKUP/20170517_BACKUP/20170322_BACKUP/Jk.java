package com.jlsoft.framework.pcrm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.JLBill;
import com.jlsoft.framework.forms.FormTools;
import com.jlsoft.framework.forms.MongodbHandler;
import com.jlsoft.framework.message.JLMessage;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.jlsoft.framework.util.SequenceFactory;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Controller
@RequestMapping("/Jk")
public class Jk extends JLBill {
	@Autowired
	private Tools ywgl;
	//Tools ywgl = new Tools();
		
	/**
	 * 执行SQL
	 * @param XmlData
	 * @param PI_USERNAME
	 * @throws Exception
	 */
	public Map insertTASKRY(Map glMap) throws Exception {
		Map returnMap = new HashMap();  
		Map ryMap = new HashMap();  
		Map row = new HashMap(); 
		ArrayList ryArrayList = new ArrayList(); 
		String sql;
		int JLBH;  
		
		try{  
			if (glMap.get("RY")!=null){
		      ryArrayList = (ArrayList)glMap.get("RY"); 
			} 
			if (ryArrayList.size() >= 0){
				   for (int j = 0; j < ryArrayList.size(); j++){
					   ryMap = (Map)ryArrayList.get(j);
					   JLBH = SequenceFactory.callProcedureForDJBH(workflow, "W_LCQX", 1);  
					   
					   sql = "INSERT INTO W_TASKRY(QX01,CZY01,CZY03,QX02,GSXX01,SK01)" + 
					         "VALUES(JLBH?,CZY01?,CZY03?,QX02?,GSXX01?,SK01?)";
					   row.put("JLBH", JLBH);  
					   row.put("CZY01", ryMap.get("CZY01").toString()); 
					   row.put("CZY03", ryMap.get("CZY03").toString());   
					   row.put("SK01", glMap.get("SK01").toString());  
					   row.put("QX02", glMap.get("QX02").toString());  
					   row.put("GSXX01", glMap.get("GSXX01").toString()); 
					   row.put("GSXX01", glMap.get("GSXX01").toString()); 
					   execSQL(workflow, sql, row);
				   }
			}
		}catch(Exception ex){
		  throw ex;
		}
		return returnMap;
	}
	 
	@SuppressWarnings("rawtypes")
	public Map selectJK(String uri,Map XmlData) throws Exception{
		Map returnMap = new HashMap();  
		try{ 
	    	JSONObject jsonObject = Json.toJO(XmlData);
	    	Object[] l_initField = Json.toJA(uri).toArray();
	    	Arrays.sort(l_initField);
	    	String bdbh = jsonObject.get("bdbh").toString();
	    	
	    	//通过表单编号查询该表单的所有操作
	    	String sql = "SELECT TBLNAME,JK03 FROM W_JK WHERE TBLNAME='"+bdbh+"'";
	    	List<Map> stepFieldList = queryForList(workflow, sql,null);
	    	  
	    	String stepField="";
	    	for(int i=0;i<stepFieldList.size();i++){
	    		Map map = stepFieldList.get(i);
	    		try{ 
	    			JSONObject JK03 = Json.toJO(map.get("JK03"));
	    			JSONArray field = JK03.getJSONArray("field");
		    		Object[] fieldList = field.toArray();
		    		Arrays.sort(fieldList);
		    		if(Arrays.equals(l_initField,fieldList)) { 
		    			if (stepField!=null){  
		    	    		returnMap = stepFieldList.get(i); 
		    	    	}else{
		    	    		throw new Exception("未找到匹配的接口信息！（-0001：W_JK中为找到匹配的接口）");
		    	    	}
		    			break;
		    		}
	    		}catch(Exception ex){ 
	    			throw new Exception("后台配置W_JK中的JK03格式不正确，请重新配置！（"+map.get("JK03").toString()+"）");
	    		}  
	    	}
		}catch(Exception ex){ 
			  throw ex;
		}
    	return returnMap;
    }  
	
	public String pbmqx(List list,String name) throws Exception {  
		String bmqx=null,bm01;
		Map bmMap;
		try{  
			if (list.size() > 0){
				for (int i = 0; i < list.size(); i++){ 
					 if (list.size() == 1){
						 bmqx = " AND ("+name+".BM01 LIKE '"+
								 list.get(i).toString()+"%'";
					 }else{
						 if (bmqx==null){
						     bmqx = " AND (("+name+".BM01 LIKE '"+
						    		 list.get(i).toString()+"%')";
						 }else{
							 bmqx = bmqx + " OR ("+name+".BM01 LIKE '"+
									 list.get(i).toString()+"%')";
						 }
					 }
				}
				bmqx=bmqx+")";
			}
		}catch(Exception ex){ 
		  throw ex;
	    }
		return bmqx;
	}
	
	/**
	 * 新增单据，流转判断
	 * @param XWBH=0存草稿，XWBH=-1回退，XWBH=-2任意步骤回退
	 * @param草稿不判断接口URL，根据前台传入XWBH=0判断为存草稿,中间过程存草稿传SK01找到当前步骤，不传SK01认为是创建步骤；回退不根据URL查接口，根据前台传入的SK01找到当前位置，再看传入的HTBZBH是否存在于W_LOG
	 * @throws Exception
	 */ 
	public Map check(String uri,Map XmlData,String userid,String pid,String htbzbh,String xwbh,
			         String sk01, String gzlbh,List bmMap,String[] lzry) throws Exception{
		String sql="",bmqx=null,gsxx01=null;
		Map gzlMap = new HashMap(); 
		Map jkMap = new HashMap(); 
		Map taskywglMap = new HashMap();
		Map rowMap = new HashMap(); 
		Map czygwMap = new HashMap();
		Map czyMap = new HashMap();
		Map gwMap = new HashMap();
		List gzlList,ywglList,rowList,taskywglList,czygwList,gwList;
		DBObject insert = new BasicDBObject();
		insert.put("uri", uri); 
		insert.put("userid", userid);
		insert.put("pid", pid);
		insert.put("htbzbh", htbzbh);
		insert.put("xwbh", xwbh);
		insert.put("sk01", sk01);
		insert.put("gzlbh", gzlbh);
		insert.put("bmMap", bmMap);
		insert.put("lzry", lzry); 
		try{ 
			System.out.print(uri);
			if (uri.indexOf("[")!=-1){
				jkMap = selectJK(uri,XmlData); 
			}else{
				jkMap.put("TBLNAME",uri.substring(0,uri.indexOf("/")-1)); 
				jkMap.put("JK03",uri.substring(uri.indexOf("/")+1,uri.length())); 
			}
			
			if (userid==null){
				throw new Exception("没有登录系统，请重新登录！（0004:人员ID为："+userid+"）");
			}
			
			sql = "SELECT A.CZY01,A.CZY02,A.CZY03,A.BM01,A.GSXX01" +
				  "  FROM W_CZY A" +
				  " WHERE EXISTS (SELECT E.CZY01 FROM W_CZYGW E WHERE E.CZY01 = A.CZY01)"+
				  "   AND A.CZY01 = "+userid;
			czyMap = queryForMap(workflow,sql);  
			if (czyMap.size()==0){
				throw new Exception("该操作员不存在或没有绑定岗位！（0006:人员ID为："+userid+"）");
			}else{
				gsxx01 = czyMap.get("GSXX01").toString();
				
				//获得人员的岗位
				ArrayList gwArrayList = new ArrayList(); 
				sql = "SELECT A.GW01 FROM W_CZYGW A WHERE A.CZY01 = "+userid;
				gwList = queryForList(workflow,sql,null);
				for (int i=0;i<gwList.size();i++){
					gwMap = (Map)gwList.get(i);
					gwArrayList.add(gwMap.get("GW01"));
				}
				
				XmlData.put("PCRM_GW01", gwArrayList);
			}
			
			//xwbh!=null传了XWBH 属于草稿或回退
			if (xwbh==null){//正常创建或流转  
				//尝试从任务和业务数据关联关系表查找是否有PID
				sql = "SELECT A.PID,A.TBLNAME,A.GSXX01,A.JLBH" +
					  "  FROM W_TASKYWGL A" +
					  " WHERE A.TBLNAME = '" + jkMap.get("TBLNAME").toString() +"'"+
					//  "   AND A.GSXX01 = '" + gsxx01 + "'"+
					  "   AND A.JLBH = " + XmlData.get("jlbh").toString() +   
					  "   AND A.ZT = 1 ";		
				System.out.print("sql:"+sql);
				insert.put("sql1", sql);
				taskywglList = queryForList(workflow,sql,null); 
				if (taskywglList.size() > 0){
				  taskywglMap = (Map)taskywglList.get(0);
				}
				/*else{
					if (pid!=null){//A单转B单，执行以下代码（只有A单转B单的时候，才会传PID）
					    taskywglMap = new HashMap();
					    taskywglMap.put("PID", pid);
					}
				}*/
				 
			    if (taskywglMap.get("PID") != null){ 
			    	//已经存在流程任务和业务数据关联关系，说明是流转
			    	//通过取得的PID，定位W_TASK表里的流程单据 ，验证该单据所有TASK所在步骤当前人员岗位 ，步骤的行为挂的接口 匹配 传来的 URL
			       	sql = "SELECT A.GZL01,D.XW01,D.ZYZH01,D.LZZH01,A.GZL02,A.DYZDRMC," + //C.GW01,
						  "       A.BZ01,A.BZ02,B.BZ03,A.PID,A.SK01,D.NBZ01,D.GZ01,D.interfaceIds," +
						  "       (SELECT E.BZ02 FROM W_GZLBZ E WHERE E.BZ01 = D.NBZ01) NBZ02," + 
						  "       F.CZY01,F.CZY03,B.HFID_CC,B.HDAT_CC,B.ZDCS_CC,D.JYL," +
						//  "       (SELECT G.GW02 FROM W_GW G WHERE G.GW01 = C.GW01) GW02," +
						  "       (SELECT H.GZ02 FROM W_YWGZ H " +
			       		  "         WHERE H.GZ01 = D.GZ01 AND H.GZ05 <= SYSDATE " +
			       		  "           AND H.GZ06 >= SYSDATE AND H.GZ07 = 0) GZ02" +
			       		  "  FROM W_TASK A,W_GZLBZ B,W_GZLXW D,W_JK E,W_CZY F" +//W_CZYGW C,
			       		  " WHERE A.BZ01 = B.BZ01" + 
			       		  "   AND A.BZ01 = D.BZ01" +
			       		  "   AND D.JK01 = E.JK01" +
			       		  "   AND A.GZL01 = B.GZL01" + 
			       		  "   AND A.GZL01 = D.GZL01" +
			       		 // "   AND C.CZY01 = F.CZY01" + 
			       		 // "   AND EXISTS (SELECT E.GW01 FROM W_CZYGW E WHERE E.CZY01 = F.CZY01)" +
			       		  "	  AND EXISTS (SELECT E.GW01 FROM W_BZGW E,W_CZYGW F WHERE E.GW01 = F.GW01 AND E.BZ01 = B.BZ01)" +
                          "   AND F.CZY01 = " + userid +  
			       		  "   AND E.JK03 = '" + jkMap.get("JK03").toString() + "'" +
			       		  "   AND A.PID = '" + taskywglMap.get("PID").toString()+"'";  
			       	
			       	if (bmMap!=null){
			       		if (pbmqx(bmMap,"A") != null){
			       			sql = sql + pbmqx(bmMap,"A"); 
			       		}
					}
			       	insert.put("sql2", sql);
					gzlList = queryForList(workflow,sql,null); 
			    }else{
			    	//说明是创建 
			        //从流程定义表查所有流程的 开始步骤 的 岗位 匹配 当前人员岗位 ，步骤的行为挂的接口 匹配 传来的 URL
				   	sql = "SELECT B.GZL01,B.XW01,B.ZYZH01,B.LZZH01,B.GZ01,D.CZY03 DYZDRMC," +
						  "       A.GZL02,C.BZ01,C.BZ02,C.BZ03,B.NBZ01,B.interfaceIds, " +//D.GW01,
				   		  "       (SELECT E.BZ02 FROM W_GZLBZ E WHERE E.BZ01 = B.NBZ01) NBZ02," + 
						  "       D.CZY01,D.CZY02,D.CZY03,C.HFID_CC,C.HDAT_CC,C.ZDCS_CC,B.JYL," + 
						 // "       " +//(SELECT G.GW02 FROM W_GW G WHERE G.GW01 = D.GW01) GW02,
				   		  "       (SELECT H.GZ02 FROM W_YWGZ H " +
				   		  "         WHERE H.GZ01 = B.GZ01 AND H.GZ05 <= SYSDATE " +
				   		  "           AND H.GZ06 >= SYSDATE AND H.GZ07 = 0) GZ02" +
				          "  FROM W_GZL A,W_GZLXW B,W_GZLBZ C,W_CZY D,W_JK F" +//W_CZYGW D, ,W_BZGW H
						  " WHERE A.GZL01 = B.GZL01" +
				          "   AND A.GZL01 = C.GZL01" + 
				          "   AND B.BZ01 = C.BZ01" + 
				          "   AND B.JK01 = F.JK01" +
				         // "   AND D.CZY01 = E.CZY01" +
				         // "   AND H.BZ01 = C.BZ01" +
				          //"   AND H.GW01 = D.GW01" +
				          "   AND A.GZL03 = 0" +
				          "   AND C.BZ04 = 0" +
		                  "   AND B.XW03 = 0" +  
			              "   AND C.BZ03 = 1" +
		                  "   AND EXISTS (SELECT E.GW01 FROM W_CZYGW E,W_BZGW H WHERE E.GW01 = H.GW01 AND E.CZY01 = D.CZY01)" + 
			              "   AND D.CZY01 = " + userid +  
			              "   AND F.JK03 = '" + jkMap.get("JK03").toString() + "'";
				   	insert.put("sql3", sql);
			       	gzlList = queryForList(workflow,sql,null); 
			    }
			    System.out.print(XmlData);    
			    //符合的行为进行 业务规则过滤
				ywglList = ywgl.filtData(XmlData, gzlList);
				ywglList = ywgl.invokeJYL(XmlData, ywglList);
				
				if (ywglList.size() > 0){
			   	  	gzlMap = (Map)ywglList.get(0); 
			    	gzlMap.put("SK05","0");
			   	    //判断是否需要抄送
				    if (lzry != null ){ //&& gzlMap.get("GW01") != null
				    	if (lzry.length > 0){ 
				    		for (int i = 0; i < lzry.length; i++){
				    			if (!lzry[i].equals("")){ 
				    				sql = "SELECT A.GW01,B.GW02,D.CZY02,D.CZY03" +
				    					  "  FROM W_CZYGW A,W_GW B,W_BZGW C,W_CZY D" +
				    					  " WHERE A.GW01 = B.GW01" +
				    					  "   AND A.GW01 = C.GW01" +
				    					  "   AND A.CZY01 = D.CZY01" +
				    					  "   AND C.BZ01 = " +gzlMap.get("NBZ01").toString()+
				    					  "   AND A.CZY01 = " +lzry[i].toString();  
				    				czygwList = queryForList(workflow,sql,null); 
				    				
				    				if (czygwList.size() > 0){
				    					czygwMap = (Map)czygwList.get(0); 
				    				}else{
				    					throw new Exception("该人员的岗位与流程设置的岗位不符合，不能保存！"); 
				    				}
				    			}
				    		}
				    		
				    		if (czygwMap.size() > 0){
				    			gzlMap.put("SK05","1");
				    		}
				    	}
				    }
				}else{ 
//					if (gzlList.size() == 1){
//						if (((Map)gzlList.get(0)).get("GZ02")==null){
//							gzlMap = (Map)gzlList.get(0);
//							gzlMap.put("SK05","0");
//						} 
//					}else{ 
						insert.put("errmessage", "请检查工作流配置！（-0003:通过URL，未找到匹配的工作流行为！或者没有部门权限）"); 
						insert.put("XmlData", XmlData);
						insert.put("gzlList", gzlList);
						insert.put("ywglList", ywglList);
						insert.put("jlbh", XmlData.get("jlbh").toString());
						insert.put("TBLNAME", jkMap.get("TBLNAME").toString()); 
						DBCollection dbCollection = MongodbHandler.getDB().getCollection("pcrm_err");
						dbCollection.insert(insert);
						
						throw new Exception("请检查工作流配置！（-0003:通过URL，未找到匹配的工作流行为！或者没有部门权限）（jlbh:"+XmlData.get("jlbh").toString()+";TBLNAME:"+jkMap.get("TBLNAME")+"）");
								                       // "XmlData:"+XmlData+";gzlList:"+gzlList+";sql:"+sql);
//					}
				}
			
				//过滤后的行为》=1合法
				//=1返回TRUE，严正合法 ，》1需要返回给前台选择。
				//gzlMap = (Map)ywglList.get(0);
				//如果传了行为编号手工选了行为验证是否存在此LIST中 
			}else{
				//使用OA批量审核 
				if (JLTools.strToInt(xwbh) > 0){
					//尝试从任务和业务数据关联关系表查找是否有PID
					sql = "SELECT A.PID,A.TBLNAME,A.GSXX01,A.JLBH" +
						  "  FROM W_TASKYWGL A" +
						  " WHERE A.TBLNAME = " + jkMap.get("TBLNAME") +
						//  "   AND A.GSXX01 = '" + gsxx01 + "'"+
						  "   AND A.JLBH = " + XmlData.get("jlbh") +   
						  "   AND A.ZT = 1 ";		
					System.out.print("sql:"+sql);
					insert.put("sql4", sql);
					taskywglList = queryForList(workflow,sql,null); 
					if (taskywglList.size() > 0){
					  taskywglMap = (Map)taskywglList.get(0);
					}else{
						if (pid!=null){//A单转B单，执行以下代码（只有A单转B单的时候，才会传PID）
						    taskywglMap = new HashMap();
						    taskywglMap.put("PID", pid);
						}
					}
					 
				   // if (taskywglMap.get("PID") != null){ 
				    	//已经存在流程任务和业务数据关联关系，说明是流转
				    	//通过取得的PID，定位W_TASK表里的流程单据 ，验证该单据所有TASK所在步骤当前人员岗位 ，步骤的行为挂的接口 匹配 传来的 URL
				       	sql = "SELECT A.GZL01,D.XW01,D.ZYZH01,D.LZZH01,A.GZL02,C.GW01,A.DYZDRMC," + 
							  "       A.BZ01,A.BZ02,B.BZ03,A.PID,A.SK01,D.NBZ01,D.GZ01,D.interfaceIds," +
							  "       (SELECT E.BZ02 FROM W_GZLBZ E WHERE E.BZ01 = D.NBZ01) NBZ02," + 
							  "       C.CZY01,F.CZY03,B.HFID_CC,B.HDAT_CC,B.ZDCS_CC,D.JYL," +
							  "       (SELECT G.GW02 FROM W_GW G WHERE G.GW01 = C.GW01) GW02," +
							  "       (SELECT H.GZ02 FROM W_YWGZ H " +
				       		  "         WHERE H.GZ01 = D.GZ01 AND H.GZ05 <= SYSDATE " +
				       		  "           AND H.GZ06 >= SYSDATE AND H.GZ07 = 0) GZ02" +
				       		  "  FROM W_TASK A,W_GZLBZ B,W_CZYGW C,W_GZLXW D,W_JK E,W_CZY F" +
				       		  " WHERE A.BZ01 = B.BZ01" + 
				       		  "   AND A.BZ01 = D.BZ01" +
				       		  "   AND A.GZL01 = B.GZL01" +
				       		  "   AND A.GZL01 = D.GZL01" +
				       		  "   AND D.JK01 = E.JK01" +
				       		  "   AND C.CZY01 = F.CZY01" +  
				       		  "   AND D.XW01 = " +xwbh+
	                          "   AND F.CZY01 = " + userid +  
				       		  "   AND E.JK03 = '" + jkMap.get("JK03").toString() + "'" +
				       		  "   AND A.PID = " + taskywglMap.get("PID").toString();  
				       	if (bmMap!=null){
				       		if (pbmqx(bmMap,"A") != null){
				       			sql = sql + pbmqx(bmMap,"A"); 
				       		}
						}
				       	insert.put("sql5", sql);
						gzlList = queryForList(workflow,sql,null); 
						/* }else{
				    	//说明是创建 
				        //从流程定义表查所有流程的 开始步骤 的 岗位 匹配 当前人员岗位 ，步骤的行为挂的接口 匹配 传来的 URL
					   	sql = "SELECT B.GZL01,B.XW01,B.ZYZH01,B.LZZH01,B.GZ01," +
							  "       D.GW01,A.GZL02,C.BZ01,C.BZ02,C.BZ03,B.NBZ01,B.interfaceIds, " +
					   		  "       (SELECT E.BZ02 FROM W_GZLBZ E WHERE E.BZ01 = B.NBZ01) NBZ02," + 
							  "       D.CZY01,E.CZY03,C.HFID_CC,C.HDAT_CC,C.ZDCS_CC," + 
							  "       E.CZY02,(SELECT G.GW02 FROM W_GW G WHERE G.GW01 = D.GW01) GW02," +
					   		  "       (SELECT H.GZ02 FROM W_YWGZ H " +
					   		  "         WHERE H.GZ01 = B.GZ01 AND H.GZ05 <= SYSDATE " +
					   		  "           AND H.GZ06 >= SYSDATE AND H.GZ07 = 0) GZ02" +
					          "  FROM W_GZL A,W_GZLXW B,W_GZLBZ C,W_CZYGW D,W_CZY E,W_JK F,W_BZGW H" + 
							  " WHERE A.GZL01 = B.GZL01" +
					          "   AND A.GZL01 = C.GZL01" + 
					          "   AND B.BZ01 = C.BZ01" + 
					          "   AND B.JK01 = F.JK01" +
					          "   AND D.CZY01 = E.CZY01" +
					          "   AND H.BZ01 = C.BZ01" +
					          "   AND H.GW01 = D.GW01" +
					          "   AND A.GZL03 = 0" +
					          "   AND C.BZ04 = 0" +
			                  "   AND B.XW03 = 0" +  
				              "   AND C.BZ03 = 1" +
			                  "   AND B.XW01 = " +xwbh+ 
				              "   AND D.CZY01 = " + userid +  
				              "   AND F.JK03 = '" + jkMap.get("JK03").toString() + "'";
				       	gzlList = queryForList(workflow,sql); 
				    }*/
				    System.out.print(XmlData);    
				    //符合的行为进行 业务规则过滤
					///ywglList = ywgl.filtData(XmlData, gzlList);
					if (gzlList.size() > 0){
				   	  	gzlMap = (Map)gzlList.get(0); 
				    	gzlMap.put("SK05","0");
				   	    //判断是否需要抄送
					    if (lzry != null ){ //&& gzlMap.get("GW01") != null
					    	if (lzry.length > 0){ 
					    		for (int i = 0; i < lzry.length; i++){
					    			if (!lzry[i].equals("")){ 
					    				sql = "SELECT A.GW01,B.GW02,D.CZY02,D.CZY03" +
					    					  "  FROM W_CZYGW A,W_GW B,W_BZGW C,W_CZY D" +
					    					  " WHERE A.GW01 = B.GW01" +
					    					  "   AND A.GW01 = C.GW01" +
					    					  "   AND A.CZY01 = D.CZY01" +
					    					  "   AND C.BZ01 = " +gzlMap.get("NBZ01").toString()+
					    					  "   AND A.CZY01 = " +lzry[i].toString();  
					    				czygwList = queryForList(workflow,sql,null); 
					    				
					    				if (czygwList.size() > 0){
					    					czygwMap = (Map)czygwList.get(0); 
					    				}else{
					    					throw new Exception("该人员的岗位与流程设置的岗位不符合，不能保存！"); 
					    				}
					    			}
					    		}
					    		
					    		if (czygwMap.size() > 0){
					    			gzlMap.put("SK05","1");
					    		}
					    	}
					    }
					}else{ 
						//DBObject insert = new BasicDBObject();
						insert.put("errmessage", "请检查工作流配置！（-0004:通过URL，未找到匹配的工作流行为！或者没有部门权限）"); 
						insert.put("XmlData", XmlData);
						insert.put("gzlList", gzlList);
						insert.put("jlbh", XmlData.get("jlbh"));
						insert.put("TBLNAME", jkMap.get("TBLNAME"));
						
						DBCollection dbCollection = MongodbHandler.getDB().getCollection("pcrm_err");
						dbCollection.insert(insert);
						
						throw new Exception("请检查工作流配置！（-0004:通过URL，未找到匹配的工作流行为！或者没有部门权限）（jlbh:"+XmlData.get("jlbh").toString()+";TBLNAME:"+jkMap.get("TBLNAME")+"）");
					}
				}
				
				
				//草稿不判断接口URL，根据SK01确定当前日志可处理岗位和当前人员岗位匹配
				if (xwbh.equals("0")){
					 if (sk01!=null){
						sql = "SELECT C.CZY01,D.CZY03,A.PID,B.BZ01,B.BZ02,C.GW01,A.DYZDRMC," +
							  "       E.GW02,B.BZ03,F.GZL01,F.GZL02,A.SK01,A.SK02,A.SK03" +
							  "  FROM W_TASK A,W_GZLBZ B,W_CZYGW C,W_CZY D,W_GW E,W_GZL F,W_BZGW G" +
							  " WHERE A.BZ01 = B.BZ01" +
							  "   AND B.BZ01 = G.BZ01" +
							  "   AND A.GZL01 = B.GZL01" +
							  "   AND A.GZL01 = F.GZL01" +
							  "   AND G.GW01 = C.GW01" +
							  "   AND C.CZY01 = D.CZY01" +
							  "   AND C.GW01 = E.GW01" + 
							  "   AND B.BZ04 = 0" +   
							  "   AND D.CZY01 = " + userid +
							  "   AND A.SK01 = " + sk01; 
						if (bmMap!=null){
							if (pbmqx(bmMap,"A") != null){
								sql = sql + pbmqx(bmMap,"A"); 
							}
						}
					}else if(gzlbh != null){
						sql = "SELECT B.CZY01,C.CZY03,A.BZ01,A.BZ02,B.GW01,C.CZY03 DYZDRMC," +
							  "       D.GW02,A.BZ03,E.GZL01,E.GZL02," +
							  "       (SELECT H.ZYZH01 FROM W_GZLXW H WHERE H.BZ01 = A.BZ01 AND ROWNUM = 1) ZYZH01" +
							  "  FROM W_GZLBZ A,W_CZYGW B,W_CZY C,W_GW D,W_GZL E,W_BZGW G" +
							  " WHERE A.BZ01 = G.BZ01" +
							  "   AND G.GW01 = B.GW01" + 
							  "   AND B.CZY01 = C.CZY01" +
							  "   AND B.GW01 = D.GW01" +
							  "   AND A.GZL01 = E.GZL01" +
							  "   AND A.BZ03 = 1" +
							  "   AND A.BZ04 = 0" + 
							  "   AND A.GZL01 = " + gzlbh +
							  "   AND C.CZY01 = " + userid; 
					}
					rowList = queryForList(workflow,sql,null);  
				    rowMap = (Map)rowList.get(0);
					if (rowList.size() >= 0){ 
						if (rowMap.get("PID")!=null){
							gzlMap.put("PID",rowMap.get("PID").toString());
						}else{
							gzlMap.put("PID",null);
						}
						gzlMap.put("SK01",sk01);
						gzlMap.put("XW01","0");
						if (rowMap.get("SK02")!= null){
							gzlMap.put("SK02",rowMap.get("SK02").toString()); 
						}
						if (rowMap.get("SK03")!= null){
							gzlMap.put("SK03",rowMap.get("SK03").toString()); 
						}
						if (!JLTools.isNull(rowMap.get("DYZDRMC"))){
							gzlMap.put("DYZDRMC",rowMap.get("DYZDRMC").toString());
						} 
						gzlMap.put("SK05","1");
						gzlMap.put("BZ01",rowMap.get("BZ01").toString());
						gzlMap.put("BZ02",rowMap.get("BZ02").toString());
						gzlMap.put("BZ03",rowMap.get("BZ03").toString());
						gzlMap.put("GW01",rowMap.get("GW01").toString());
						gzlMap.put("GW02",rowMap.get("GW02").toString());
						gzlMap.put("GZL01",rowMap.get("GZL01").toString());
						gzlMap.put("GZL02",rowMap.get("GZL02").toString());
						gzlMap.put("NBZ01",rowMap.get("BZ01").toString()); 
						gzlMap.put("NBZ02",rowMap.get("BZ02").toString()); 
						gzlMap.put("CZY01", rowMap.get("CZY01").toString());
						gzlMap.put("CZY03", rowMap.get("CZY03").toString()); 
						if (!JLTools.isNull(rowMap.get("ZYZH01"))){
							gzlMap.put("ZYZH01", rowMap.get("ZYZH01").toString()); 	 
						}
					}
				}
				//回退不判断接口URL，根据SK01确定当前日志可处理岗位和当前人员岗位匹配
				if(xwbh.equals("-1") || xwbh.equals("-2")) {
					sql = "SELECT COUNT(1) NUM" +
						  "  FROM W_TASK A,W_GZLBZ B,W_CZYGW C,W_BZGW G" +
						  " WHERE A.BZ01 = B.BZ01" +
						  "   AND B.BZ01 = G.BZ01" +
						  "   AND G.GW01 = C.GW01" + 
						  "   AND C.CZY01 = " + userid +
						  "   AND A.SK01 = " + sk01;
					if (bmMap!=null){
						if (pbmqx(bmMap,"A") != null){
							sql = sql + pbmqx(bmMap,"A"); 
						}
					}
					rowList = queryForList(workflow,sql,null); 
					if (rowList.size() >= 0){
						if(htbzbh==null){
							sql = "SELECT A.SK01,A.PID,A.XW01,A.CLCZY01,A.CLRYMC," +
								  "       A.PID,A.BZ01,A.BZ02,B.BZ03,A.DYZDRMC," +//C.GW01,C.GW02,
							      "       D.GZL01,D.GZL02,A.BZ01 HTBZBH,A.NSK01,H.ZYZH01,H.LZZH01," +
								  "       A.NBZ01,A.NBZ02," + 
								  "       (SELECT G.BZ03 FROM W_GZLBZ G WHERE G.BZ01 = A.NBZ01) NBZ03" + 
						          "  FROM W_LOG A,W_GZLBZ B,W_GZL D,W_CZY E,W_GZLXW H" +//W_GW C,,W_CZYGW F
						          " WHERE A.BZ01 = B.BZ01" +
						         // "   AND A.GW01 = C.GW01" +
						          "   AND A.GZL01 = D.GZL01" +
						          "   AND A.GZL01 = B.GZL01" +
						          "   AND A.TJCZY01 = E.CZY01" +
						         // "   AND E.CZY01 = F.CZY01" +
						         // "   AND A.GW01 = F.GW01" +
						          "   AND A.GZL01 = H.GZL01" +
						          "   AND B.BZ01 = H.BZ01" +
						          "   AND (A.XW01 = H.XW01 OR A.XW01 in (-1,-2))" +  
						          "   AND A.NSK01 = " + sk01;
						}else{
							sql = "SELECT A.SK01,A.PID,A.XW01,A.CLCZY01,A.CLRYMC," +
								  "       B.BZ01,B.BZ02,B.BZ03,E.CZY03 DYZDRMC," +//,C.GW01,C.GW02
								  "       D.GZL01,D.GZL02,A.BZ01 HTBZBH,H.ZYZH01,H.LZZH01," +
								  "       (SELECT G.BZ01 FROM W_TASK G WHERE G.SK01 = "+sk01+") NBZ01," + 
								  "       (SELECT G.BZ02 FROM W_TASK G WHERE G.SK01 = "+sk01+") NBZ02," +
								  "       (SELECT H.BZ03 FROM W_TASK G,W_GZLBZ H WHERE G.BZ01 = H.BZ01 AND G.SK01 = "+sk01+") NBZ03," +
								  "       (SELECT G.SK01 FROM W_TASK G WHERE G.PID = A.PID) NSK01" +
								 // "       A.NBZ01,A.NBZ02" +
							      "  FROM W_LOG A,W_GZLBZ B,W_GZL D,W_CZY E,W_GZLXW H" +//,W_GW C W_CZYGW F,
							      " WHERE A.BZ01 = B.BZ01" +
							     // "   AND A.GW01 = C.GW01" +
							      "   AND A.GZL01 = D.GZL01" +
							      "   AND A.GZL01 = B.GZL01" +
							      "   AND A.TJCZY01 = E.CZY01" + 
							      //"   AND E.CZY01 = F.CZY01" +
							      //"   AND A.GW01 = F.GW01" +
							      "   AND B.BZ01 = H.BZ01" +
							      "   AND (A.XW01 = H.XW01 OR A.XW01 in (-1,-2))" +  
							      "   AND A.GZL01 = H.GZL01" +  
							      "   AND EXISTS (SELECT I.PID" +
		                          "                 FROM W_TASK I" +
		                          "                WHERE I.PID = A.PID" + 
		                          "                  AND I.SK01 = "+sk01+")" + 
							      "   AND A.BZ01 = " + htbzbh;  
						}    
						if (bmMap!=null){
							if (pbmqx(bmMap,"A") != null){
								sql = sql + pbmqx(bmMap,"A");
							}
						}
						rowList = queryForList(workflow,sql,null);  
					    rowMap = (Map)rowList.get(0);
						if (rowList.size() >= 0){  
							if (htbzbh==null){
						  	    gzlMap.put("SK01",sk01); 
							}else{
								gzlMap.put("SK01",rowMap.get("NSK01").toString()); 
							}
							if (!JLTools.isNull(rowMap.get("DYZDRMC"))){
								gzlMap.put("DYZDRMC",rowMap.get("DYZDRMC").toString());
							}
							gzlMap.put("SK05","1");
							gzlMap.put("PID",rowMap.get("PID").toString());
							gzlMap.put("XW01",xwbh); 
							if ( xwbh.equals("-2")){
								gzlMap.put("BZ01",rowMap.get("BZ01").toString());
								gzlMap.put("BZ02",rowMap.get("BZ02").toString());
								gzlMap.put("BZ03",rowMap.get("BZ03").toString());
							}else{
								gzlMap.put("BZ01",rowMap.get("NBZ01").toString());
								gzlMap.put("BZ02",rowMap.get("NBZ02").toString());
								gzlMap.put("BZ03",rowMap.get("NBZ03").toString());
							}
							gzlMap.put("NBZ01",rowMap.get("BZ01").toString()); 
							gzlMap.put("NBZ02",rowMap.get("BZ02").toString()); 
							gzlMap.put("CZY01",rowMap.get("CLCZY01").toString());
							gzlMap.put("CZY03",rowMap.get("CLRYMC").toString());
							gzlMap.put("GZL01",rowMap.get("GZL01").toString());
							gzlMap.put("GZL02",rowMap.get("GZL02").toString());
							if (rowMap.get("ZYZH01")!= null){
								gzlMap.put("ZYZH01",rowMap.get("ZYZH01").toString()); 
							}else{
								gzlMap.put("ZYZH01",null); 
							}
							if (rowMap.get("LZZH01")!= null){
								gzlMap.put("LZZH01",rowMap.get("LZZH01").toString()); 
							}else{
								gzlMap.put("LZZH01",null); 
							} 
							gzlMap.put("HTBZBH",rowMap.get("HTBZBH").toString()); 
						}
					}
				}
			}
			
			//获得当前步骤和下一步骤的处理岗位
			if (!FormTools.isNull(gzlMap.get("NBZ01"))){
				sql = "SELECT '[' || WM_CONCAT('\"' || A.GW01 || '\"') || ']' GW FROM W_BZGW A WHERE A.BZGW02 = 0 AND A.BZ01 = "+gzlMap.get("NBZ01").toString();
				List nbzgwList = queryForList(workflow,sql,null); 
				gzlMap.put("NBZGW",Json.toJA(((Map)nbzgwList.get(0)).get("GW")));
			}
			if (!FormTools.isNull(gzlMap.get("BZ01"))){
				sql = "SELECT '[' || WM_CONCAT('\"' || A.GW01 || '\"') || ']' GW FROM W_BZGW A WHERE A.BZGW02 = 0 AND A.BZ01 = "+gzlMap.get("BZ01").toString();
				List bzgwList = queryForList(workflow,sql,null); 
				gzlMap.put("BZGW",Json.toJA(((Map)bzgwList.get(0)).get("GW")));
			}
			
		    //判断是否有 OA_LOG 字段，如果有则获取最后一条记录
			if (!FormTools.isNull(gzlMap.get("OA_LOG"))){
				ArrayList oalogArrayList = new ArrayList();
				oalogArrayList = (ArrayList)gzlMap.get("OA_LOG"); 
				gzlMap.put("OALOG",(Map)oalogArrayList.get(oalogArrayList.size()));
			} 
			
		}catch(Exception ex){ 
		  throw ex;
	    }
		return gzlMap;
	}

	/**
	 * 新增、流转
	 * @param 
	 * @throws Exception
	 */ 
	public Map insertTASK(String uri,Map XmlData,String userid,
			               String pid,String htbzbh,String xwbh,
			               String sk01,String gzlbh,List bmMap,
			               String[] ccry,String[] ccgw,String[] lzry,Map qxMap, HttpServletRequest request) throws Exception{
		String sql,jlbh,gsxx01,tblName,bdbh,HFID_CC="",HDAT_CC="";  
		Map returnMap = new HashMap();
		Map taskywglRow = new HashMap();
		Map czyRow = new HashMap();
		Map yssjRow = new HashMap(); 
		Map taskRow = new HashMap();
		Map taskqxMap = new HashMap(); 
		Map jkMap = new HashMap();
		Map bzMap = new HashMap();
		Map ryMap = new HashMap(); 
		Map gzlMap = new HashMap();
		Map zyMap = new HashMap();
		Map lzMap = new HashMap();
		Map czyMap = new HashMap();
		Map row = new HashMap();   
		Map json = new JSONObject();
		Map DATA = new HashMap();
		Map QX = new HashMap();
		ArrayList bmArrayList = new ArrayList(); 
		ArrayList ckArrayList = new ArrayList();
		ArrayList wldwArrayList = new ArrayList();
		ArrayList czyArrayList = new ArrayList();
		
		List taskqxList,jkList,bzList,taskList,taskywglList;
		int NSK01,SK01=0;
		String spid=null;
		
		try{ 
			String sessionid = request.getParameter("SessionID");
			
			if (uri.indexOf("[")!=-1){
				jkMap = selectJK(uri,XmlData); 
			}else{
				jkMap.put("TBLNAME",uri.substring(0,uri.indexOf("/")-1)); 
				jkMap.put("JK03",uri.substring(uri.indexOf("/")+1,uri.length())); 
			}
			tblName = jkMap.get("TBLNAME").toString();
			jlbh = XmlData.get("jlbh").toString();
			bdbh = XmlData.get("bdbh").toString();
			NSK01 = SequenceFactory.callProcedureForDJBH(workflow, "W_TASK", 1);   
			 
			sql = "SELECT A.CZY01,A.CZY02,A.CZY03,A.BM01,A.GSXX01" +
			  	  "  FROM W_CZY A" +
			      " WHERE EXISTS (SELECT E.CZY01 FROM W_CZYGW E WHERE E.CZY01 = A.CZY01)"+
			      "   AND A.CZY01 = "+userid;
			czyMap = queryForMap(workflow,sql);  
			if (czyMap.size()==0){
				throw new Exception("该操作员不存在或没有绑定岗位！（0004:人员ID为："+userid+"）");
			}else{
				gsxx01 = czyMap.get("GSXX01").toString();
			}
			
			//重新执行检验 
			gzlMap = check(uri,XmlData,userid,pid,htbzbh,xwbh,sk01,gzlbh,bmMap,lzry);  
			if(gzlMap==null){
				throw new Exception("流程检查失败");
			}else{
				returnMap.put("SK01", gzlMap.get("SK01"));
				returnMap.put("PID", gzlMap.get("PID"));
			}
			
			if(gzlMap.get("NBZ01")!=null){
				sql = "SELECT A.BZ03 NBZ03,A.BZ01,A.BZ02" +
					  "  FROM W_GZLBZ A" +
				      " WHERE A.BZ01=" +gzlMap.get("NBZ01").toString();
				bzList = queryForList(workflow,sql,null); 
				if (bzList.size() > 0){
			  	  bzMap = (Map)bzList.get(0);
				}
			}
			
			if (gzlMap.get("PID") == null){
				spid = JLTools.intToStr(SequenceFactory.callProcedureForDJBH(workflow, "W_TASK_PID", 1)); 
			}
			
			if (gzlMap.get("BZ03") != null){
				if (gzlMap.get("BZ03").toString().equals("2")){
					gzlMap.put("ZT", "0");
				}else{
					gzlMap.put("ZT", "1");
				}
			}
			
			//如果有下一步骤 ，并且是正常步骤不是结束步骤，则写下一步的TASK
		    if(gzlMap.get("NBZ01")!=null){ 
		       if (bzMap.get("NBZ03").toString().equals("0") ||
		    	   bzMap.get("NBZ03").toString().equals("1")){
					//2、生成摘要数据
		    	    if (gzlMap.get("ZYZH01") != null){
						if (gzlMap.get("ZYZH01").toString() != null){
							zyMap = ywgl.transData(XmlData,gzlMap.get("ZYZH01").toString());
						}
		    	    }
					//3、生成流转数据
		    	    if (gzlMap.get("LZZH01") != null){
						if (gzlMap.get("LZZH01").toString() != null){
							lzMap = ywgl.transData(XmlData,gzlMap.get("LZZH01").toString()); 
						}
		    	    }
							 
					sql = "INSERT INTO W_TASK(SK01,PID,GSXX01,SK02,BZ01,SK03,GZL01," +
							"GZL02,BZ02,TJCZY01,TJRYMC,SK04,BM01,SK05,WLDW01,CK01,QXBM01,QXCZY01,DYZDRMC,OALOG)" +
				   		  "VALUES(SK01?,PID?,GSXX01?,SK02?,BZ01?,SK03?,GZL01?,GZL02?," +
				   		  "BZ02?,TJCZY01?,TJRYMC?,SYSDATE,BM01?,SK05?,WLDW01?,CK01?,QXBM01?,QXCZY01?,DYZDRMC?,OALOG?)";
					
					row.put("SK01", NSK01);  
					if (spid==null){
						row.put("PID", gzlMap.get("PID").toString()); 
					}else{
						row.put("PID", spid);  
					} 
					
					String lzJson=null,zyJson=null;
					if (gzlMap.get("SK02")!= null){
						zyJson = gzlMap.get("SK02").toString();//Json.toJO(gzlMap.get("SK02"));
					}else{
						BasicDBObject zyobj = new BasicDBObject();  
						zyobj.putAll(zyMap); 
						zyJson = zyobj.toString();
					}
					if (gzlMap.get("SK03")!= null){
						lzJson = gzlMap.get("SK03").toString();
					}else{
						BasicDBObject lzobj = new BasicDBObject();  
						lzobj.putAll(lzMap);
						lzJson = lzobj.toString();
					}
					
					//SCM权限
					if (qxMap.get("ck01")!=null){
						row.put("CK01", qxMap.get("ck01")); 
					}
					if (qxMap.get("bm01")!=null){ 
						row.put("QXBM01", qxMap.get("bm01").toString()); 
						/*Map bm01Map = new HashMap();
						String sql1 = "SELECT A.BM01" +
									  "  FROM W_BM A" +
									  " WHERE A.SCM_BM01 = '"+qxMap.get("bm01")+"'";
						bm01Map = queryForMap(workflow,sql1); 
						if (bm01Map!=null){
							row.put("BM01", bm01Map.get("BM01"));
						}*/
					}
					if (qxMap.get("wldw01")!=null){
						row.put("WLDW01", qxMap.get("wldw01")); 
					} 
					if (qxMap.get("qxczy01")!=null){
						row.put("QXCZY01", qxMap.get("qxczy01")); 
					}
					row.put("BM01", czyMap.get("BM01").toString()); 
					row.put("SK02", zyJson.toString()); 
					row.put("SK03", lzJson.toString());
					row.put("BZ01", bzMap.get("BZ01").toString()); 
					row.put("BZ02", bzMap.get("BZ02").toString());
					row.put("GZL01", gzlMap.get("GZL01").toString()); 
					row.put("GZL02", gzlMap.get("GZL02").toString()); 
					row.put("TJCZY01", czyMap.get("CZY01").toString());
					row.put("TJRYMC", czyMap.get("CZY03").toString());  
					row.put("GSXX01", gsxx01); 
					row.put("SK05", gzlMap.get("SK05").toString());  
					if (gzlMap.get("DYZDRMC") != null) {
						row.put("DYZDRMC", gzlMap.get("DYZDRMC").toString());  
					}
					row.put("OALOG", gzlMap.get("OALOG")); 
					execSQL(workflow, sql, row);
					returnMap.put("NSK01", row.get("SK01"));
					returnMap.put("PID", row.get("PID"));
					
					//推送消息给终端（PC,手机,PAD）
					
					DATA.putAll(row);
					DATA.put("NUM", 1);
					
					if (gzlMap.get("SK05").equals("1")){
						//代办流转到人
						ArrayList ryArrayList = new ArrayList();
						if (xwbh!=null){
							//保存草稿 
							ryMap.put("CZY01", gzlMap.get("CZY01").toString());
							ryMap.put("CZY03", gzlMap.get("CZY03").toString());
							ryArrayList.add(0, ryMap);    
						}else{
							//流转制定到人
							if (lzry != null){
								if (lzry.length > 0){
									ryArrayList.clear();
									for (int i = 0; i < lzry.length; i++){ 
						    			if (!lzry[i].equals("")){  
						    				sql = "SELECT A.CZY01,A.CZY03" +
						    				      "  FROM W_CZY A" +
						    					  " WHERE A.CZY01=" +lzry[i].toString();
						    				ryMap = queryForMap(workflow,sql);
						    				ryArrayList.add(i, ryMap);   
						    			}
									}
								}
							}
						}
						
						taskqxMap.put("RY", ryArrayList); 
						taskqxMap.put("QX02", "1");
						taskqxMap.put("SK01", NSK01); 
						taskqxMap.put("GSXX01", gsxx01); 
						insertTASKRY(taskqxMap); 
						
						//推送消息给终端（PC,手机,PAD）--到人员
						//格式：{"DATA":"{\"GZL01\":\"9025\",\"NUM\":1}","CODE":"1001","JSR":"00019999"}
						Map ryxxMap = new HashMap();
						for (int i=0;i<ryArrayList.size();i++){
							ryxxMap = (Map)ryArrayList.get(i);
							
							json.put("JSR", ryxxMap.get("CZY01"));
							json.put("DATA", DATA);
							json.put("CODE", "1001");
							JLMessage.sendMessage(json.toString(), sessionid);
						}
					}else{
						//推送消息给终端（PC,手机,PAD）--到岗位
						//格式：{"QX":{"BM":["0001"],"GW":[-1]},"DATA":"{\"GZL01\":\"9025\",\"NUM\":-1}","CODE":"1001"}
						
						czyArrayList.add(qxMap.get("qxczy01")); 
						wldwArrayList.add(qxMap.get("wldw01")); 
						ckArrayList.add(qxMap.get("ck01")); 
						bmArrayList.add(czyMap.get("BM01"));
						
						QX.put("CZY_CZ", czyArrayList);
						QX.put("WLDW_CZ", wldwArrayList);
						QX.put("CK_CZ", ckArrayList);
						QX.put("BM_CZ", bmArrayList);
						QX.put("GW", gzlMap.get("NBZGW"));
						json.put("QX", QX);
						json.put("DATA", DATA);
						json.put("CODE", "1001");
						//JLMessage.sendMessage(json.toString(), sessionid);
					}
		       }
			}
			 
			//如果有PID说明是流转
			if (spid == null){//先把TASK挪到LOG，补全行为，人员等字段   
				sql = "SELECT A.SK01,A.PID,A.GSXX01,A.SK02,A.BM01,B.BZ01,A.SK03," +
				      "       A.GZL01,A.GZL02,A.BZ02,A.TJCZY01,A.TJRYMC,A.SK04," + 
					  "       A.SK05,A.WLDW01,A.CK01,A.QXBM01,A.OALOG,A.DYZDRMC,A.QXCZY01" + 
				     // "       (SELECT E.GW01 FROM W_CZYGW E WHERE E.CZY01 = A.TJCZY01 AND E.GW01 = C.GW01) GW01" +
				      "  FROM W_TASK A,W_GZLBZ B"+
				      " WHERE A.GZL01 = B.GZL01" +
				      "   AND A.BZ01 = B.BZ01" +
				      "   AND A.SK01 = " + gzlMap.get("SK01").toString();
		        taskRow = queryForMap(workflow,sql);
		
				sql = "INSERT INTO W_LOG(SK01,PID,GSXX01,SK02,BZ01,XW01,SK03,GZL01," +
					  "                  GZL02,BZ02,TJCZY01,TJRYMC,SK04,LOG02,CLCZY01," +
					  "                  CLRYMC,NSK01,BM01,SK05,NBZ01,NBZ02,WLDW01,CK01,QXBM01,QXCZY01,OALOG,DYZDRMC) " +
					  "VALUES(SK01?,PID?,GSXX01?,SK02?,BZ01?,XW01?,SK03?,GZL01?," +
					  "       GZL02?,BZ02?,TJCZY01?,TJRYMC?,SK04?,SYSDATE,CLCZY01?," +
					  "       CLRYMC?,NSK01?,BM01?,SK05?,NBZ01?,NBZ02?,WLDW01?,CK01?,QXBM01?,QXCZY01?,OALOG?,DYZDRMC?)";      
				taskRow.put("XW01", gzlMap.get("XW01").toString()); 
				taskRow.put("CLCZY01", userid); 
				taskRow.put("CLRYMC", czyMap.get("CZY03").toString()); 
				taskRow.put("BM01", czyMap.get("BM01").toString());
				taskRow.put("NSK01", NSK01); 
				taskRow.put("GSXX01", gsxx01);   
				taskRow.put("NBZ01", bzMap.get("BZ01").toString());  
				taskRow.put("NBZ02", bzMap.get("BZ02").toString());
				execSQL(workflow, sql, taskRow); 
				 
				//删除自己的代办 
				sql = "DELETE W_TASKRY WHERE CZY01=CZY01? AND SK01=SK01?";
				czyRow.put("CZY01", userid); 
				czyRow.put("SK01", taskRow.get("SK01").toString()); 
				int i = execSQL(workflow, sql, czyRow); 
				
				//推送信息--推送到人员
				//转送格式：{"DATA":"{\"GZL01\":\"9025\",\"NUM\":1}","CODE":"1001","JSR":"00019999"}
				DATA.putAll(taskRow);
				DATA.put("NUM", -1);
				if (i>0){
					json.put("JSR", userid);
					json.put("DATA", DATA);
					json.put("CODE", "1001");
					JLMessage.sendMessage(json.toString(), sessionid);
				}
				 
				//查询W_TASKRY WHERE SK01 = ???是否还有数据 ，有说明同步骤有其他人的代办还不能删除W_TASK
				//如果没有则删除W_TASK
				sql = "SELECT A.SK01,A.CZY01 FROM W_TASKRY A" +
					  " WHERE A.QX02 = 1 AND A.SK01 = " + taskRow.get("SK01").toString();
				taskqxList = queryForList(workflow,sql,null);  
				
				if (taskqxList.size() == 0){
					sql = "DELETE W_TASK WHERE SK01=SK01?";
					execSQL(workflow, sql, taskRow);
					
					//推送信息--推送到岗位
					//{"QX":{"BM":["0001"],"GW":[-1]},"DATA":"{\"GZL01\":\"9025\",\"NUM\":-1}","CODE":"1001"}
					if (i==0){
						czyArrayList.add(qxMap.get("qxczy01")); 
						wldwArrayList.add(qxMap.get("wldw01")); 
						ckArrayList.add(qxMap.get("ck01")); 
						bmArrayList.add(czyMap.get("BM01"));
						
						QX.put("CZY_CZ", czyArrayList);
						QX.put("WLDW_CZ", wldwArrayList);
						QX.put("CK_CZ", ckArrayList); 
						QX.put("BM_CZ", bmArrayList);
						QX.put("GW", gzlMap.get("BZGW"));
						json.put("QX", QX);
						json.put("DATA", DATA);
						json.put("CODE", "1001");
						//JLMessage.sendMessage(json.toString(), sessionid);
					}
				}
				 
				//写W_TASKYWGL
				sql = "SELECT A.PID " +
					  "  FROM W_TASKYWGL A" +
					  " WHERE A.PID=" + gzlMap.get("PID").toString() +
					  "   AND A.TBLNAME=" +tblName+
					  "   AND A.JLBH=" +jlbh;
				//	  "   AND A.GSXX01='" + taskRow.get("GSXX01").toString()+"'";
				taskywglList = queryForList(workflow,sql,null);  
				
				if (taskywglList.size() == 0){
					sql = "INSERT INTO W_TASKYWGL(PID,TBLNAME,GSXX01,JLBH)" +
						  " VALUES(PID?,TBLNAME?,GSXX01?,JLBH?)"; 
					taskywglRow.put("PID", gzlMap.get("PID").toString()); 
					taskywglRow.put("TBLNAME", tblName); 
					taskywglRow.put("GSXX01", gsxx01); 
					taskywglRow.put("JLBH", jlbh); 
					execSQL(workflow, sql, taskRow); 
				} 
			}
			//如果没有PID说明是新增
			else{//直接写LOG
				SK01 = SequenceFactory.callProcedureForDJBH(workflow, "W_TASK", 1);  
				sql = "INSERT INTO W_LOG(SK01,PID,GSXX01,SK02,GW01,BZ01,XW01,SK03,GZL01," +
					  "                  GZL02,BZ02,TJCZY01,TJRYMC,SK04,LOG02,CLCZY01," +
					  "                  CLRYMC,NSK01,BM01,SK05,NBZ01,NBZ02,WLDW01,CK01,QXCZY01,OALOG,DYZDRMC) " +
					  "VALUES(SK01?,PID?,GSXX01?,SK02?,GW01?,BZ01?,XW01?,SK03?,GZL01?," +
					  "       GZL02?,BZ02?,TJCZY01?,TJRYMC?,SYSDATE,SYSDATE,CLCZY01?," +
					  "       CLRYMC?,NSK01?,BM01?,SK05?,NBZ01?,NBZ02?,WLDW01?,CK01?,QXCZY01?,OALOG?,DYZDRMC?)"; 
				taskRow.put("SK01", SK01);
				taskRow.put("PID", spid); 
				taskRow.put("TJCZY01", userid); 
				taskRow.put("TJRYMC", czyMap.get("CZY03").toString()); 
				taskRow.put("CLCZY01", userid);
				taskRow.put("CLRYMC", czyMap.get("CZY03").toString());   
				//taskRow.put("GW01", gzlMap.get("GW01").toString()); 
				taskRow.put("NSK01", NSK01); 
				taskRow.put("GSXX01", gsxx01);  
				taskRow.put("XW01", gzlMap.get("XW01").toString());
				taskRow.put("BZ01", gzlMap.get("BZ01").toString()); 
				taskRow.put("BZ02", gzlMap.get("BZ02").toString());
				taskRow.put("GZL01", gzlMap.get("GZL01").toString()); 
				taskRow.put("GZL02", gzlMap.get("GZL02").toString()); 
				taskRow.put("SK05", gzlMap.get("SK05").toString()); 
				taskRow.put("NBZ01", bzMap.get("BZ01").toString()); // 
				taskRow.put("NBZ02", bzMap.get("BZ02").toString()); // 
				taskRow.put("BM01", czyMap.get("BM01").toString());
				taskRow.put("OALOG", gzlMap.get("OALOG"));
		        if (gzlMap.get("DYZDRMC") != null) {
					taskRow.put("DYZDRMC", gzlMap.get("DYZDRMC").toString());
		        }
				if (qxMap.get("ck01")!=null){
					taskRow.put("CK01", qxMap.get("ck01")); 
				} 
				if (qxMap.get("bm01")!=null){ 
					row.put("QXBM01", qxMap.get("bm01").toString()); 
					/*Map bm01Map = new HashMap();
					String sql1 = "SELECT A.BM01" +
								  "  FROM W_BM A" +
						          " WHERE A.SCM_BM01 = '"+qxMap.get("bm01")+"'";
					bm01Map = queryForMap(workflow,sql1); 
					if (bm01Map!=null){
						taskRow.put("BM01", bm01Map.get("BM01"));
					}*/
				} 
				if (qxMap.get("wldw01")!=null){
					taskRow.put("WLDW01", qxMap.get("wldw01")); 
				} 
				if (qxMap.get("qxczy01")!=null){
					row.put("QXCZY01", qxMap.get("qxczy01")); 
				}
				execSQL(workflow, sql, taskRow); 
			
				//写W_TASKYWGL
				sql = "INSERT INTO W_TASKYWGL(PID,TBLNAME,GSXX01,JLBH,ZT)" +
					  " VALUES(PID?,TBLNAME?,GSXX01?,JLBH?,ZT?)";  
				taskRow.put("TBLNAME", tblName); 
				taskRow.put("JLBH", jlbh);  
				taskRow.put("ZT", gzlMap.get("BZ03").toString()); 
				execSQL(workflow, sql, taskRow); 
			}
			
			//写原始业务数据CLOB 
			DBCollection dbCollection = null; 
			dbCollection = MongodbHandler.getDB().getCollection("pcrm_YSSJ");
			BasicDBObject record = new BasicDBObject();
			record.put("SK01", taskRow.get("SK01").toString());
			record.put("YSSJ", XmlData.toString());
			dbCollection.insert(record);
			  
			//检查如果TASK是空的，（对应TASKQX应该也是空的），说明该PID单子完全封单了，把对应TASKYWGL的ZT字段置为1表示完成
			if (spid==null){
			    sql = "SELECT SK01" +
				      "  FROM W_TASK " +
				      " WHERE PID="+gzlMap.get("PID").toString();
			}else{
				sql = "SELECT SK01"+
					  "  FROM W_TASK " +
					  " WHERE PID="+spid;
			}
			taskList = queryForList(workflow,sql,null);  
			
		    if (taskList.size() == 0){  
		    	sql = "UPDATE W_TASKYWGL A SET A.ZT = 0" +
		    		  " WHERE A.PID=PID?";
		    	taskywglRow.put("PID", spid==null?gzlMap.get("PID").toString():spid);  
		    	execSQL(workflow, sql,taskywglRow); 
		    }
		    
		    //抄送时使用
		    if (gzlMap.get("SK01")==null){
		    	gzlMap.put("SK01", SK01);
		    }
		    //判断是否需要抄送
		    if (ccry != null){ 
		    	if (ccry.length > 0){
		    		if (gzlMap.get("HDAT_CC")!=null){
	    			    HDAT_CC = gzlMap.get("HDAT_CC").toString();
	    			}
	    			if (gzlMap.get("HFID_CC")!=null){
	    				HFID_CC = gzlMap.get("HFID_CC").toString();
	    			}
	    			
		    		for (int i = 0; i < ccry.length; i++){ 
		    			if (!ccry[i].equals("")){ 
			    			if (gzlMap.get("ZDCS_CC")!=null){
			    				if (gzlMap.get("ZDCS_CC").toString().equals("1")){
					    			insertCC(gzlMap.get("SK01").toString(),
					    					 ccry[i].toString(),null,
					    					 bdbh,jlbh,HFID_CC,HDAT_CC);
			    				}
			    			}
		    			}
		    		}
		    	}
		    }
		    if (ccgw != null){
		    	if (ccgw.length > 0){
		    		if (gzlMap.get("HDAT_CC")!=null){
	    			    HDAT_CC = gzlMap.get("HDAT_CC").toString();
	    			}
	    			if (gzlMap.get("HFID_CC")!=null){
	    				HFID_CC = gzlMap.get("HFID_CC").toString();
	    			} 
		    		for (int i = 0; i < ccgw.length; i++){
		    			if (!ccgw[i].equals("")){
			    			if (gzlMap.get("ZDCS_CC")!=null){
			    				if (gzlMap.get("ZDCS_CC").toString().equals("1")){
					    			insertCC(gzlMap.get("SK01").toString(),null,
					    					 ccgw[i].toString(),
					    					 bdbh,jlbh,HFID_CC,HDAT_CC);
			    				}
			    			}
		    			}
		    		}
		    	}
		    }
		    
		    return returnMap;
		}catch(Exception ex){ 
		   throw ex;
		}
	}
	
	/**
	 * 插入抄送信息
	 * @param 
	 * @throws Exception
	 */ 
	public void insertCC(String SK01,String CZY01,String GW01,String BDBH,
						 String JLBH,String HFID_CC,String HDAT_CC) throws Exception{
		Map row = new HashMap();
		try{
			String sql = "INSERT INTO W_CC(SK01,CZY01,GW01,BDBH,JLBH,HFID_CC,HDAT_CC)" +
				         " VALUES(SK01?,CZY01?,GW01?,BDBH?,JLBH?,HFID_CC?,HDAT_CC?)";  
			row.put("SK01", SK01);  
			row.put("CZY01", CZY01); 
			row.put("GW01", GW01); 
			row.put("BDBH", BDBH); 
			row.put("JLBH", JLBH); 
			row.put("HFID_CC", HFID_CC);
			row.put("HDAT_CC", HDAT_CC);  
			execSQL(workflow, sql, row); 
		}catch(Exception ex){
			throw ex;
		}
	}
	
	/**
	 * 查看抄送信息
	 * @param 
	 * @throws Exception
	 */ 
	@SuppressWarnings("rawtypes")
	@RequestMapping("/updateCC")
	public void updateCC(String XmlData) throws Exception{//String SK01,String CZY01
		String SK01;
		String CZY01;
		Map row = new HashMap(); 
		Map ccMap = new HashMap();
		Map czyMap = new HashMap();
		JSONObject json = Json.toJO(XmlData);  
		
		try{ 
			SK01 = json.get("SK01").toString();
			CZY01 = json.get("CZY01").toString();
			
			String sql = "SELECT A.CZY01,B.GW01" +
					  	 "  FROM W_CZY A,W_CZYGW B" +
					  	 " WHERE A.CZY01 = B.CZY01 " +
					  	 "   AND A.CZY01 = " + CZY01;
			czyMap = queryForMap(workflow,sql);  
			if (czyMap.size()==0){
				throw new Exception("该操作员不存在或没有绑定岗位！（0004:人员ID为："+CZY01+"）");
			}
				
			sql = "SELECT A.SK01,A.CZY01,A.GW01 " +
			      "  FROM W_CC A" +
			      " WHERE A.CC02 = 0"+
			      " AND A.SK01=" + SK01+
				  " AND (A.CZY01 = "+czyMap.get("CZY01").toString()+
				  " OR A.GW01 = "+czyMap.get("GW01").toString()+")";
			List ccList = queryForList(workflow,sql,null);  
				
			if (ccList.size() > 0){
				for (int i = 0; i < ccList.size(); i++){
					ccMap = (Map)ccList.get(i);
					if (ccMap.get("CZY01")!=null){
						sql = "UPDATE W_CC A SET A.CC02 = 1 " +
					          " WHERE A.CC02 = 0 " +
							  "   AND A.SK01 = SK01?"+ 
					          "   AND A.CZY01 = CZY01?";
						execSQL(workflow, sql, ccMap);
					}
					if (ccMap.get("GW01")!=null){
						sql = "SELECT A.CZY01" +
					          "  FROM W_CZYGW A" +
							  " WHERE A.GW01 = " + ccMap.get("GW01").toString() +
					          "   AND NOT EXISTS (SELECT E.CZY01 FROM W_CCHF E WHERE E.CZY01 = A.CZY01)";
						List czygwList = queryForList(workflow,sql,null);  
						
						if (czygwList.size() == 0){
							sql = "UPDATE W_CC A SET A.CC02 = 1 " +
							          " WHERE A.CC02 = 0 " +
							          "   AND A.SK01 = SK01?"+ 
							          "   AND A.GW01 = GW01?";
							execSQL(workflow, sql, ccMap); 
						}
					}
				} 
				
				sql = "INSERT INTO W_CCHF(SK01,CZY01,HF02)" +
					  " VALUES(SK01?,CZY01?,sysdate)";   
				row.put("SK01", SK01);
				row.put("CZY01", CZY01); 
				execSQL(workflow, sql, row); 
			} 
		}catch(Exception ex){
			throw ex;
		}
	}
	
}
