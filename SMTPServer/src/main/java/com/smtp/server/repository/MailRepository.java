package com.smtp.server.repository;


import com.smtp.server.model.Mail;
import com.smtp.server.model.MailStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {

    Optional<Page<Mail>> getMailByToAddressAndStatus(String toAddress, MailStatus status, Pageable pageable);

    @Modifying
    @Query("update Mail m set m.status = :status where m.id = :id")
    void updateStatusById(@Param("id") int id, @Param("status") MailStatus status);
}
