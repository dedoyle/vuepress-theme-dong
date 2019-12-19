---
date: 2019-11-28
tag: 
  - postgreSQL
author: 锦东
location: 广州 
---

# postgreSql

## 安装

    [下载地址](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
    [安装教程](https://www.runoob.com/postgresql/windows-install-postgresql.html)

## 创建数据库

命令行：
1. 打开 postgres 自带的 SQL Shell 控制台
2. 默认情况下，一路回车，直到叫你输入口令，则输入你设置的密码，继续回车进入
3. 输入 `CREATE DATABASE appdb;`，回车

网页：
点击 pgAdmin4，会在浏览器打开数据库管理界面。可以在 PostgreSQL 下的 Database 右键创建一个数据库。

## 控制台命令

```
    \h：查看 SQL 命令的解释，比如 \h select。
    \?：查看 psql 命令列表。
    \l：列出所有数据库。
    \c [database_name]：连接其他数据库。
    \d：列出当前数据库的所有表格。
    \d [table_name]：列出某一张表格的结构。
    \du：列出所有用户。
    \e：打开文本编辑器。
    \conninfo：列出当前数据库和连接的信息。
```


## 常用操作

```
    # 创建新表
    CREATE TABLE user_tbl(name VARCHAR(20), signup_date DATE);

    # 插入数据
    INSERT INTO user_tbl(name, signup_date) VALUES('张三', '2013-12-22');

    # 选择记录
    SELECT * FROM user_tbl;

    # 更新数据
    UPDATE user_tbl set name = '李四' WHERE name = '张三';

    # 删除记录
    DELETE FROM user_tbl WHERE name = '李四' ;

    # 添加栏位
    ALTER TABLE user_tbl ADD email VARCHAR(40);

    # 更新结构
    ALTER TABLE user_tbl ALTER COLUMN signup_date SET NOT NULL;

    # 更名栏位
    ALTER TABLE user_tbl RENAME COLUMN signup_date TO signup;

    # 删除栏位
    ALTER TABLE user_tbl DROP COLUMN email;

    # 表格更名
    ALTER TABLE user_tbl RENAME TO backup_tbl;

    # 删除表格
    DROP TABLE IF EXISTS backup_tbl;
```
