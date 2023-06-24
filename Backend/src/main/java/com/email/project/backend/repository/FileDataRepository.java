package com.email.project.backend.repository;

import com.email.project.backend.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileDataRepository extends JpaRepository<FileData, Integer> {
}
