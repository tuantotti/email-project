package com.email.project.backend.repository;

import com.email.project.backend.entity.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {
    List<Mail> getMailByStatus(String status);
}
