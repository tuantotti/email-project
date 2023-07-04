alter table mail
    change status receiver_status enum ('INBOX', 'SENT', 'STARRED', 'SPAM', 'TRASH', 'DELETED') default 'INBOX' null;

ALTER TABLE mail
    ADD COLUMN sender_status VARCHAR(15) DEFAULT 'SENT' AFTER receiver_status;
