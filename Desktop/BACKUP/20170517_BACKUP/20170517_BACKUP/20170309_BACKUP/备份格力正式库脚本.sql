SELECT *
-- ���ݸ�����ʽ��ı�

   --�������ݱ�  W_TASK_20170307_0001
       CREATE TABLE W_TASK_20170307_0005    AS     SELECT * FROM W_TASK WHERE ROWNUM =1  
     
     --��ѯ���е���������
    SELECT count(*) FROM W_TASK_20170307_0005
     
    --���ݱ� W_TASK_20170307_0002
     CREATE TABLE W_TASK_20170307_0006 as  SELECT * FROM W_TASK
     
     select COUNT(1) FROM W_TASK_20170307_0001
     
        --�������ݱ�  W_LOG_20170307_0001
       CREATE TABLE W_LOG_20170307_0005    AS   SELECT * FROM W_LOG WHERE ROWNUM =1 ; 
       
         --���ݱ� W_LOG_20170307_0002
      CREATE TABLE W_LOG_20170307_0006 as  SELECT * FROM W_LOG
        
      
      
      --�������ݱ�    W_TASKYWGL_20170307_0001
       CREATE TABLE W_TASKYWGL_20170307_0005    AS       SELECT * FROM W_TASKYWGL WHERE ROWNUM =1  
     
     --���ݱ� W_TASKYWGL_20170307_0002
      CREATE TABLE W_TASKYWGL_20170307_0006 as  SELECT * FROM W_TASKYWGL
   
   
   
   --ɾ�����е�����   
       DELETE W_TASKYWGL_20170307_0005 
       
       
       select * from W_TASK_20170307_0001
       
       
       select * from jlconf where jlco02 
      
     SELECT * FROM W_LOG WHERE SK02 LIKE '%DL235-000086%' FOR UPDATE
     
     insert into W_TASK (SK01, PID, GSXX01, SK02, GW01, BZ01, XW01, SK03, GZL01, GZL02, BZ02, TJCZY01, TJRYMC, SK04, LOG02, CLCZY01, CLRYMC, NSK01, BM01, SK05, NBZ01, NBZ02, WLDW01, CK01, QXCZY01, QXBM01)
values (251452, '17520', '0001', '{ "���̵�¼����" : "DL235-000086" , "������" : "1�Ϻ����ůͨ�����豸��װ���޹�˾" , "ʹ�õ�λ" : "�Ϻ���Ȫӡˢ���޹�˾" , "�걨ʱ��" : "2016-11-03 10:51:29" , "GC_DJZT" : "��ǩ��ͬ"}', null, 90404, 5, '{ "bdbh" : "1042" , "jlbh" : 656}', 9040, '���̵�¼��', '����', 741, '���ůͨ', to_date('07-03-2017 10:45:59', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-03-2017 13:30:14', 'dd-mm-yyyy hh24:mi:ss'), 0, 'ϵͳ�Զ����ɴ���ʹ���˺�', 252416, '1058', 0, 90403, '�ⵥ', '901051', null, null, null);


     insert into W_TASK (SK01, PID, GSXX01, SK02, BZ01, SK03, GZL01, GZL02, BZ02, TJCZY01, TJRYMC, SK04, BM01, SK05,  WLDW01, CK01, QXCZY01, QXBM01)
values (251452, '17520', '0001', '{ "���̵�¼����" : "DL235-000086" , "������" : "1�Ϻ����ůͨ�����豸��װ���޹�˾" , "ʹ�õ�λ" : "�Ϻ���Ȫӡˢ���޹�˾" , "�걨ʱ��" : "2016-11-03 10:51:29" , "GC_DJZT" : "��ǩ��ͬ"}', 90404, '{ "bdbh" : "1042" , "jlbh" : 656}', 9040, '���̵�¼��', '����', 741, '���ůͨ', to_date('07-03-2017 10:45:59', 'dd-mm-yyyy hh24:mi:ss'),  '1058', 0, '901051', null, null, null);


select * FROM W_TASK WHERE SK01 = '251452' FOR UPDATE;
SELECT * FROM W_LOG;


SELECT * FROM W_TASKYWGL WHERE PID = '17520' FOR UPDATE
