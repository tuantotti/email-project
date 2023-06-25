package com.email.project.backend.repository;

import com.email.project.backend.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileDataRepository extends JpaRepository<FileData, Integer> {
    @Query(value = "SELECT f from FileData f " +
            "JOIN f.mail m WHERE m.id = :mailId")
    List<FileData> getFileDataByMailId(@Param("mailId") int mailId);
}
