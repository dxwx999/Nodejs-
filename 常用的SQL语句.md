### 常用的sql语句

##### 插入值，一一对应

insert into book.student_info (stu_name,password,gender,age,classN,major) VALUES ('钢铁侠2','123456','男','22','1','建设计');  

##### 查询

SELECT * from book.student_info

##### 更新值

UPDATE book.student_info SET password='999999',gender='女' WHERE stu_name='张三';

##### 删除值

DELETE FROM book.student_info WHERE id=4;

##### OR、AND 

##### ORDER BY

###### 升序排序ASC

###### 降序排序DESC

SELECT * FROM book.student_info ORDER BY id DESC,stu_name ASC