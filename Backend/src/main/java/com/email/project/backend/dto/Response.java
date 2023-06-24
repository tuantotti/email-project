package com.email.project.backend.dto;

import com.email.project.backend.entity.Mail;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import static com.email.project.backend.constant.Constant.SPLIT_STRING;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class Response<T> {

    public Response(@Nullable boolean success, @Nullable T data, @Nullable String message){
        this.success = true;
        this.data = data;
        this.message = message;
    }

    @JsonProperty("success")
    private boolean success;

    @JsonProperty("message")
    @Nullable
    private String message;

    @JsonProperty("data")
    @Nullable
    private T data;



    public static <T> Response<T> ok() {
        return new Response<T>(true, (T) null, null);
    }
    public static <T> Response<T> ok(@Nullable T data) {
        return new Response<T>(true, data, null);
    }
    public static <T> Response<T> ok(@Nullable T data, @Nullable String message) {
        return new Response<T>(true, data, message);
    }

    public static <T> Response<T> fail() {
        return new Response<T>(false, (T) null, null);
    }

    public static <T> Response<T> fail(@Nullable String message) {
        return new Response<T>(false, null, message);
    }
}
