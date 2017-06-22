

/******************配置菜单**********************/
--workflow

--select * from w_menuview where view01 like '60%' for update
-- 二级菜单
insert into w_menuview (VIEW01, VIEW02, VIEW03, VIEW04, VIEW05, VIEW06, VIEW07, VIEW08, VIEW09, VIEW10, VIEW11, MENU01, YXBJ)
values ('0330', '串码管理', '03', 2, 0, 1, 0, 0, null, 0, 1,'', 0);

insert into w_czymenu (VIEW01, GW01, CZY01)
values ('0330', -1, null);
SELECT A.*,A.ROWID FROM W_CZYMENU A WHERE VIEW01 = 0330
DELETE W_CZYMENU WHERE VIEW01 = 0330
SELECT * FROM W_MENUVIEW WHERE VIEW01 = 0330
-- 三级菜单
insert into w_menuview (VIEW01, VIEW02, VIEW03, VIEW04, VIEW05, VIEW06, VIEW07, VIEW08, VIEW09, VIEW10, VIEW11, MENU01, YXBJ)
values ('03301', '串码锁定/解锁', '0330', 3, 1, 1, 0, 0, '', 0, 1, '03301', 0);

insert into w_czymenu (VIEW01, GW01, CZY01)
values ('03301', -1, null);


insert into w_menu (MENU01, MENU02)
values ('03301', '{"bdbh":"1239"}');


-- mongo:

{
   "bdbh": 1239,
   "bdmc": "串码锁定/解锁",
   "collection": "SCM_CMSDJS",
   "jyl": "makeCMSDJS",
   "oabj": true,
   "pad": "",
   "pc": "scm/ccgl/cmgl/makeCMSDJS.html",
   "phone": "",
   "template": "" 
}

SELECT * FROM CKSP 
