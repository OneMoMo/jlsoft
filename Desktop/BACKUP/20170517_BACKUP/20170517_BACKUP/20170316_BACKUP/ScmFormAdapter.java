package com.jlsoft.framework.admin.scm.pub.adapter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSONObject;
import com.jlsoft.framework.forms.FormHandler;
import com.jlsoft.framework.forms.FormPlugIn;
import com.jlsoft.framework.pi.convertor.map.MapMappingConvertor;
import com.jlsoft.framework.pi.convertor.map.PartMapMappingConvertor;
import com.jlsoft.framework.util.JLTools;
import com.jlsoft.framework.util.Json;
import com.jlsoft.framework.util.PropertiesReader;

public class ScmFormAdapter extends FormHandler implements FormPlugIn {

	private static Log logger = LogFactory.getLog(ScmFormAdapter.class);

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean check(Map json, int bdbh, HttpServletRequest request)
            throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean insertBefore(Map json, int bdbh, HttpServletRequest request)
            throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean insertAfter(Map json, int bdbh, HttpServletRequest request)
            throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean updateBefore(Map json, int bdbh, HttpServletRequest request)
            throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean updateAfter(Map json, int bdbh, HttpServletRequest request)
            throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Map saveBefore(Map json, HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        return null;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Map saveAfter(Map json, HttpServletRequest request,
                         HttpServletResponse response)
            throws Exception {
        return null;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean queryBefore(Map json) throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public boolean check(Map docMap) throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Map insertBefore(Map docMap, HttpServletRequest request) throws Exception {
        return null;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean insertAfter(Map docMap) throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Map updateBefore(Map docMap) throws Exception {
        return null;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public Boolean updateAfter(Map docMap) throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public boolean checkBatch(List docList) throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public List insertBatchBefore(List docList) throws Exception {
        return null;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public boolean insertBatchAfter(List docList) throws Exception {
        return true;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public List updateBatchBefore(List docList) throws Exception {
        return null;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public boolean updateBatchAfter(List docList) throws Exception {
        return true;
    }

    @SuppressWarnings("unchecked")
    protected void mapping(String configId, Map<String, Object> map) throws Exception {
        if (map == null) {
            return;
        }
        if (JLTools.isNull(configId)) {
            return;
        }
        map.putAll((Map<String, Object>) new MapMappingConvertor(configId).process(map));
    }

    @SuppressWarnings("unchecked")
    protected void mappingPart(String configId, Map<String, Object> map) throws Exception {
        if (map == null) {
            return;
        }
        if (JLTools.isNull(configId)) {
            return;
        }
        map.putAll((Map<String, Object>) new PartMapMappingConvertor(configId).process(map));
    }

    @Override
	@SuppressWarnings({"rawtypes", "unchecked"})
    public Map sendScmInboundInvoke(String interfaceId, Object data) throws Exception {
        JSONObject message = Json.JO();
        if (!JLTools.isNull(interfaceId)) {
            String url = PropertiesReader.getInstance().getProperty("SCM_URL") + "/Inbound/invoke.do";
            Map row = new HashMap();
            row.put("interfaceId", interfaceId);
            if (data instanceof Map) {
                row.put("data", Json.toJO(data));
            } else if (data instanceof List) {
                row.put("data", Json.toJA(data));
            } else {
                throw new Exception("传入的数据类型错误.");
            }
            logger.debug("------------url:" + url + " data=" + row.get("data"));
            String result = JLTools.postFormMap(url, row);
            logger.debug(result);
            System.out.println(result);
            message = Json.toJO(result);
            if ("E".equals(message.getString("MSGID"))) {
            	String msg = message.getString("MESSAGE");
            	msg = JLTools.filterOracleMessage(msg);
                throw new Exception(msg);
            }
            if (!JLTools.isNull(message.getString("JLWBDH"))) {
                if (data instanceof Map) {
                    ((Map) data).put("JLWBDH", message.getString("JLWBDH"));
                }
            }
        }
        return message;
    }
}