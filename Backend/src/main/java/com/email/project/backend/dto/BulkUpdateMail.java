package com.email.project.backend.dto;

import com.email.project.backend.constant.MailStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BulkUpdateMail {
    private int[] ids;
    private MailStatus status;
}
