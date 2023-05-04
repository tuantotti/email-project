package com.email.project.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtView {

    @JsonProperty("x-access-token")
    private String accessToken;
    @JsonProperty("x-refresh-token")
    private String refreshToken;
}
