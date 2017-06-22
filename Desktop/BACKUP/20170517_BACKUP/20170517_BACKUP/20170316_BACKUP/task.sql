SELECT A.*, A.ROWID FROM w_jk A WHERE TBLNAME='1042';

SELECT A.*, A.ROWID FROM  w_gzlxw A where gzl01='9040';


SELECT * FROM W_TASK WHERE SK02 LIKE '%DL803-000183%' FOR UPDATE

PID 111111

SELECT * FROM W_TASKYWGL WHERE PID = 111111 for update

SELECT * FROM W_TASK WHERE PID = 111111
SELECT * FROM W_TASK WHERE GZL01 LIKE '%9040' FOR UPDATE

SELECT * FROM W_TASKYWGL WHERE pid = 23227 FOR UPDATE


select * 
  from w_taskywgl a,w_task b
 where a.pid = b.pid 
   and a.tblname = 1042
   and a.jlbh =18989
   
   SELECT * FROM W_TASKYWGL FOR UPDATE

select * from jlconf


select * from w_taskywgl a,w_task b where a.pid = b.pid  and a.tblname = '18989'  and a.jlbh = '18989' 

insert into JLCONF (JLCO01, JLCO02, JLCO03, JLCO04, JLCO05, JLCO06, JLCO07, JLCO08, JLCO09, JLCO10, JLCO11, JLCO12, TS01)
values (90029, 'makeGCJZL', 2, 2, 0, 0, '0;显示;1;显示并必填;2;不显示
', 'FJGCZP', null, 0, '0;显示;1;显示并必填;2;不显示
', '工程照片', '20170221161320854345');
