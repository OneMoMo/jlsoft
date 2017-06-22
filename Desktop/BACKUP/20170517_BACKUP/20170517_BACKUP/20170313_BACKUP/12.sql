--定义客户流程
insert into w_menuview (VIEW01, VIEW02, VIEW03, VIEW04, VIEW05, VIEW06, VIEW07, VIEW08, VIEW09, VIEW10, VIEW11, MENU01, YXBJ)
values ('990507', '定义客户(流程)', '9905', 3, 0, 1, 0, 0, null, 0, 1, '', 0);

insert into w_menuview (VIEW01, VIEW02, VIEW03, VIEW04, VIEW05, VIEW06, VIEW07, VIEW08, VIEW09, VIEW10, VIEW11, MENU01, YXBJ)
values ('99050701', '制单', '990507', 4, 1, 1, 0, 0, '', 0, 1, '99050701', 0);

insert into w_menuview (VIEW01, VIEW02, VIEW03, VIEW04, VIEW05, VIEW06, VIEW07, VIEW08, VIEW09, VIEW10, VIEW11, MENU01, YXBJ)
values ('99050702', '审核', '990507', 4, 1, 1, 0, 0, '', 0, 2, '99050702', 0);

insert into w_czymenu (VIEW01, GW01, CZY01)
values ('990507', -1, null);
insert into w_czymenu (VIEW01, GW01, CZY01)
values ('99050701', -1, null);
insert into w_czymenu (VIEW01, GW01, CZY01)
values ('99050702', -1, null);

SELECT * FROM w_czymenu WHERE VIEW01 LIKE '%99050702'
SELECT * FROM w_menuview WHERE VIEW01 LIKE '%9905%' FOR UPDATE


select * from w_menuview where view02 like '%定义商品%'


-- 定义工作流
insert into w_gzl (GZL01,gzl02,gzl03,gzl04,lx01,gsxx01,gzl05,gzl06,gzl07,gzl08,gzl09) values 
('9124','定义客户','0','1','','0001','0','1','0','0','0');

-- select * from w_gzlbz where gzl01 like '9124%' for update
insert into w_gzlbz (gzl01,bz04,bz02,bz01,bz03,Bzgw01,hfid_cc,hdat_cc,zdcs_cc,bz05) values 
('9124','0','制单','912401','1','','[]','[]',1,'');
insert into w_gzlbz (gzl01,bz04,bz02,bz01,bz03,Bzgw01,hfid_cc,hdat_cc,zdcs_cc,bz05) values 
('9124','0','审核','912402','0','','[]','[]',1,'');
insert into w_gzlbz (gzl01,bz04,bz02,bz01,bz03,Bzgw01,hfid_cc,hdat_cc,zdcs_cc,bz05) values 
('9124','0','封单','912403','2','','[]','[]',1,'');


select * from w_jk where  jk01 = '912402'

-- 定义接口
insert into w_jk (JK01,jk02,jk03,tblname,ymbh) values
(
'912401',
'制单',
'{"name":"1169","field":["jlbh","WLDWMC","PYM","CWXTBM","JC","DZ","KHYH","YHZH","SWDJH","CJBM","FPLX","FLKPFS","KPHT","FRDB","HY","KSLX","YWY","SJKS","QY","YXBJ01","LXDH","LXR","SHDZ","YZBM","CZHM","SMTP","FXZQ","YFZQ","JSBZ","ZFFS","YFJZFS","JGGK01","EDKZ01","ZDSK","YFZDSK"]}',
'1169',
''
)

select * from w_gzlbz where bz01 = 912403

insert into w_jk(JK01,jk02,jk03,tblname,ymbh)values
(
'912402',
'审核',
'{"name":"1169","field":["bdbh","jlbh","SH","SHRMC","SHRQ","SHYJ"]}','1169',
'')

select * from w_gzlxw where gzl01 = '9124' for update

select * from w_log where gzl01=  '9124'

insert into w_gzlxw (gzl01,bz01,xw01,xw02,nbz01,xw03,jk01,xw04,gz01,zyzh01,lzzh01,hfid,hdat,interfaceids) values (
'9124','912401',1,'制单','912402','0','912401','1','9','2','1','[]','[]',''
);

insert into w_gzlxw (gzl01,bz01,xw01,xw02,nbz01,xw03,jk01,xw04,gz01,zyzh01,lzzh01,hfid,hdat,interfaceids) values (
'9124','912401',2,'删除','912403','0','912401','1','10','','1','[]','[]',''
);
--第二步 审核
insert into w_gzlxw (gzl01,bz01,xw01,xw02,nbz01,xw03,jk01,xw04,gz01,zyzh01,lzzh01,hfid,hdat,interfaceids) values (
'9124','912402',1,'审核','912403','0','912402','1','17','2','1','[]','[]',''
);
insert into w_gzlxw (gzl01,bz01,xw01,xw02,nbz01,xw03,jk01,xw04,gz01,zyzh01,lzzh01,hfid,hdat,interfaceids) values (
'9124','912402',2,'不同意','912401','0','912402','1','18','2','1','[]','[]',''
);
insert into w_gzlxw (gzl01,bz01,xw01,xw02,nbz01,xw03,jk01,xw04,gz01,zyzh01,lzzh01,hfid,hdat,interfaceids) values (
'9124','912402',3,'删除','912403','0','912402','1','10','','1','[]','[]',''
);



-- select * from w_menu where menu01 like '9905%' for update
insert into w_menu (MENU01, MENU02)
values ('99050701', '{"GZL01":"9124","BZ01":"912401","BZ03":"1"}');
insert into w_menu (MENU01, MENU02)
values ('99050702', '{"GZL01":"9124","BZ01":"912402","BZ03":"0"}');
