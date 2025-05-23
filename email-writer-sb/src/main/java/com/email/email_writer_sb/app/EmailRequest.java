package com.email.email_writer_sb.app;

import lombok.Data;

@Data
public class EmailRequest {

    private String emailContent;
    private String tone;

    public String getEmailContent() {
        return emailContent;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    @Override
    public String toString() {
        return "EmailRequest{" +
                "emailContent='" + emailContent + '\'' +
                ", tone='" + tone + '\'' +
                '}';
    }

}
