create table file_data
(
    id        int AUTO_INCREMENT PRIMARY KEY,
    mail_id   int,
    name      varchar(128),
    type      varchar(128),
    size      bigint,
    file_path varchar(256),
    FOREIGN KEY (mail_id) REFERENCES mail (id)
);
