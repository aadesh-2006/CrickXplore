package com.crickxplore.dto;

import java.time.Instant;
import java.util.List;

public class ApiErrorResponse {

    private int status;
    private String message;
    private Instant timestamp;
    private List<String> errors;

    public ApiErrorResponse() {
        this.timestamp = Instant.now();
    }

    public ApiErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public ApiErrorResponse(int status, String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.timestamp = Instant.now();
        this.errors = errors;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}
