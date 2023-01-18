create table nutritionist
(
    nutritionist_id int auto_increment
        primary key,
    first_name      varchar(30)  not null,
    last_name       varchar(30)  not null,
    email           varchar(100) not null,
    password        varchar(72)  not null,
    constraint email_unique
        unique (email)
);


