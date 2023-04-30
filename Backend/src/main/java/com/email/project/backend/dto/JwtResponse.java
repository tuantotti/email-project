package com.email.project.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    @JsonProperty("x-access-token")
    private String accessToken;
    @JsonProperty("x-refresh-token")
    private String refreshToken;
}
