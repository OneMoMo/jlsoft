SELECT *
-- ���ݸ�����ʽ��ı�

   --�������ݱ�  W_TASK_20170307_0001
       CREATE TABLE W_TASK_20170307_0001    AS     SELECT * FROM W_TASK WHERE ROWNUM =1  
     
     --��ѯ���е���������
    SELECT count(*) FROM W_LOG_20170307_0002
     
    --���ݱ� W_TASK_20170307_0002
     CREATE TABLE W_TASK_20170307_0002 as  SELECT * FROM W_TASK
     
     
     
        --�������ݱ�  W_LOG_20170307_0001
       CREATE TABLE W_LOG_20170307_0001    AS   SELECT * FROM W_LOG WHERE ROWNUM =1 ; 
       
         --���ݱ� W_LOG_20170307_0002
      CREATE TABLE W_LOG_20170307_0002 as  SELECT * FROM W_LOG
        
      
      
      --�������ݱ�    W_TASKYWGL_20170307_0001
       CREATE TABLE W_TASKYWGL_20170307_0001    AS       SELECT * FROM W_TASKYWGL WHERE ROWNUM =1  
     
     --���ݱ� W_TASKYWGL_20170307_0002
      CREATE TABLE W_TASKYWGL_20170307_0002 as  SELECT * FROM W_TASKYWGL
   
   
   
   --ɾ�����е�����   
       DELETE W_TASK_20170307_0001 
       
       
       select * from W_TASK_20170307_0001
      
     
