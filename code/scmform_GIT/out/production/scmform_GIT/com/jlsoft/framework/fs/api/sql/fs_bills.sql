-- Create table
create table FS_BILLS
(
  BILL_ID      VARCHAR2(20) not null,
  BILL_TYPE    VARCHAR2(20) not null,
  BILL_COMPANY VARCHAR2(20) not null,
  BILL_SYSID   VARCHAR2(20) not null,
  FILE_NAME    VARCHAR2(32) not null,
  FILE_SIZE    NUMBER(18) not null,
  FILE_DESC    VARCHAR2(256) not null,
  HD_HOST      VARCHAR2(256) not null
);
-- Add comments to the table 
comment on table FS_BILLS
  is '单据文件映射';
-- Add comments to the columns 
comment on column FS_BILLS.BILL_ID
  is '单据ID';
comment on column FS_BILLS.BILL_TYPE
  is '单据类型';
comment on column FS_BILLS.BILL_COMPANY
  is '单据公司';
comment on column FS_BILLS.BILL_SYSID
  is '单据系统ID';
comment on column FS_BILLS.FILE_NAME
  is '文件名(哈希值)';
comment on column FS_BILLS.FILE_SIZE
  is '文件长度(字节)';
comment on column FS_BILLS.FILE_DESC
  is '文件描述';
comment on column FS_BILLS.HD_HOST
  is '目录(主机)';
-- Create/Recreate indexes 
create index I_FS_BILLS_BILL on FS_BILLS (BILL_ID, BILL_TYPE, BILL_COMPANY, BILL_SYSID);
create index I_FS_BILLS_FILE on FS_BILLS (FILE_NAME, FILE_SIZE);
