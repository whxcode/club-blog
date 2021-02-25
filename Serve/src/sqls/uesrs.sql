create table users(
       id int primary key auto_increment comment '用户唯一Id',
       username varchar(50) not null comment '用户名',
       password varchar(256) not null comment '用户密码',
       email varchar(50) comment '用户邮箱',
       about varchar(256) comment '用户简介',
       avatar varchar(256) comment '用户头像路径',
       create_time timestamp not null default CURRENT_TIMESTAMP comment '用户创建时间',
       update_time timestamp not null default  current_timestamp on update current_timestamp comment '用户更新时间'
)charset utf8 comment '用户表';
