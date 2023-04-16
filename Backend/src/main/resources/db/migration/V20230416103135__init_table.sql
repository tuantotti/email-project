create table IF NOT EXISTS users
(
    id           int          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name   varchar(255) NOT NULL,
    last_name    varchar(255) NOT NULL,
    email        varchar(255) NOT NULL,
    phone_number varchar(10)  NOT NULL,
    create_at    TIMESTAMP,
    active       BOOLEAN
);

create table credentials
(
    id       int AUTO_INCREMENT PRIMARY KEY,
    user_id  int UNIQUE ,
    email    varchar(255),
    password varchar(255),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create table mail
(
    id            int AUTO_INCREMENT PRIMARY KEY,
    subject       varchar(512),
    body          varchar(1024),
    from_address  varchar(128),
    to_address    varchar(128),
    cc_address    varchar(128),
    bcc_address   varchar(128),
    sent_date     DATETIME,
    received_date DATETIME,
    is_read BOOLEAN
)