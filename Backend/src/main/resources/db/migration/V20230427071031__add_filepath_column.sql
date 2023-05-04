ALTER TABLE mail
    ADD COLUMN file_names VARCHAR(256) AFTER received_date;
