package com.email.project.backend.repository;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.entity.Mail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {

    Optional<Page<Mail>> getMailByToAddressAndReceiverStatusIn(String toAddress, MailStatus[] statuses, Pageable pageable);
    Optional<Page<Mail>> getMailByFromAddressAndSenderStatusIn(String fromAddress, MailStatus[] statuses, Pageable pageable);

    @Query("SELECT m FROM Mail m WHERE " +
            "(m.fromAddress = :address and m.senderStatus = :status) " +
            "or (m.toAddress = :address and m.receiverStatus = :status)")
    Optional<Page<Mail>> getMailBySpecifyStatus(String address, MailStatus status, Pageable pageable);

    @Modifying
    @Query("update Mail m set m.receiverStatus = :status where m.id = :id")
    void updateReceiverStatusById(@Param("id") int id, @Param("status") MailStatus status);

    @Modifying
    @Query("update Mail m set m.senderStatus = :status where m.id = :id")
    void updateSenderStatusById(@Param("id") int id, @Param("status") MailStatus status);

    List<Mail> findByIdIn(int[] ids);
}
