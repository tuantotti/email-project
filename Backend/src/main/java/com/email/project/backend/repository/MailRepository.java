package com.email.project.backend.repository;

import com.email.project.backend.entity.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {
    List<Mail> getMailByStatus(String status);

    @Modifying
    @Query("update Mail m set m.status = :status where m.id = :id")
    void updateStatusById(@Param("status") String status, @Param("id") int id);
}
