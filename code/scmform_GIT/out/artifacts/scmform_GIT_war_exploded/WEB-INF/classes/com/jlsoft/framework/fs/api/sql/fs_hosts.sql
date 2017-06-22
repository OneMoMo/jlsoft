-- Create table
create table FS_HOSTS
(
  HOST             VARCHAR2(40) not null,
  TYPE             VARCHAR2(20) not null,
  VD_HOST          VARCHAR2(256) not null,
  VD_HOME          VARCHAR2(256) not null,
  MAX_STORAGE_SIZE NUMBER(18) not null,
  ACTIVE           NUMBER(2) not null
);
-- Add comments to the table 
comment on table FS_HOSTS
  is '文件服务虚拟主机';
-- Add comments to the columns 
comment on column FS_HOSTS.HOST
  is '主机类型';
comment on column FS_HOSTS.VD_HOST
  is '目录(主机)';
comment on column FS_HOSTS.VD_HOME
  is '目录(主目录)';
comment on column FS_HOSTS.MAX_STORAGE_SIZE
  is '最大存储容量';
comment on column FS_HOSTS.ACTIVE
  is '激活状态';
-- Create/Recreate primary, unique and foreign key constraints 
alter table FS_HOSTS
  add constraint PK_FS_HOSTS primary key (HOST, TYPE);
