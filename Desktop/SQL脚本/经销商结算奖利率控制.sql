prompt Importing table jlconf...
set feedback off
set define off
insert into jlconf (JLCO01, JLCO02, JLCO03, JLCO04, JLCO05, JLCO06, JLCO07, JLCO08, JLCO09, JLCO10, JLCO11, JLCO12, TS01)
values (90070, 'JXSJS', 0, 0, 0, 0, '经销商结算 正常\迟交\逾期奖励率 0：海南 1：湖南 2：上海', 'JLL', null, 0, '因为jlco04字段不能存储小数类型的值，所以通过JLL这个字段来返回湖南海南上海三种情况  具体数据在代码中设置', '奖励率', '20170331161320854323');

prompt Done.
