---
title: "Debug slow queries"
date: 2019-12-10T21:07:36+02:00
tags: ["databases", "sql"]
---

# How to debug slow queries
 
 go inside the container
 ```
 docker exec -it mysql -uroot -ptest
 ```
 
 if the query is still running you can execute
 ```
 SHOW FULL PROCESSLIST;
 ```
 
 if not you can turn on the query log and rerun the query
 ```
 mysql> SHOW VARIABLES LIKE "general_log%";
 
 +------------------+----------------------------+
 | Variable_name    | Value                      |
 +------------------+----------------------------+
 | general_log      | OFF                        |
 | general_log_file | /var/run/mysqld/mysqld.log |
 +------------------+----------------------------+
 
 mysql> SET GLOBAL general_log = 'ON';
 
 tail -f -n300 /var/run/mysqld/mysqld.log
 ```
 
 once you find the slow query run the EXPLAIN command

 The solution is probably setting an INDEX
 
 ```
 ALTER TABLE commission ADD INDEX `user_id` (`user_id`);
 ```