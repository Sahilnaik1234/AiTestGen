package com.aitestgen.services;

import java.util.ArrayList;
import java.util.List;

/**
 * EmailService - Another service to test dynamic AI Test Generation.
 */
public class EmailService {

    private final List<String> sentEmails = new ArrayList<>();

    public boolean sendEmail(String recipient, String subject, String body) {
        if (recipient == null || !recipient.contains("@")) {
            throw new IllegalArgumentException("Invalid recipient email");
        }
        if (subject == null || subject.isEmpty()) {
            throw new IllegalArgumentException("Subject cannot be empty");
        }

        // Mock sending email
        String emailRecord = String.format("To: %s | Subject: %s | Body: %s", recipient, subject, body);
        sentEmails.add(emailRecord);
        return true;
    }

    public List<String> getSentEmails() {
        return new ArrayList<>(sentEmails);
    }

    public int getSentCount() {
        return sentEmails.size();
    }

    public void clearHistory() {
        sentEmails.clear();
    }
}
