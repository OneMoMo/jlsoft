-- Create table
create table FS_FILES
(
  FILE_NAME VARCHAR2(32) not null,
  FILE_SIZE NUMBER(18) not null,
  FILE_DESC VARCHAR2(256) not null,
  HD_HOME   VARCHAR2(256) not null,
  HD_DATE   VARCHAR2(20) not null,
  HD_SIZE   VARCHAR2(20) not null,
  HD_HOST   VARCHAR2(256) not null
);
-- Add comments to the table 
comment on table FS_FILES
  is '文件服务名字映射';
-- Add comments to the columns 
comment on column FS_FILES.FILE_NAME
  is '文件名(哈希值)';
comment on column FS_FILES.FILE_SIZE
  is '文件长度(字节)';
comment on column FS_FILES.FILE_DESC
  is '文件描述';
comment on column FS_FILES.HD_HOME
  is '目录(主目录)';
comment on column FS_FILES.HD_DATE
  is '目录(日期)';
comment on column FS_FILES.HD_SIZE
  is '目录(大小)';
comment on column FS_FILES.HD_HOST
  is '目录(主机)';
-- Create/Recreate primary, unique and foreign key constraints 
alter table FS_FILES
  add constraint PK_FS_FILES primary key (FILE_NAME, FILE_SIZE);
