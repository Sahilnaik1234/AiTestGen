package com.aitestgen.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

public class EmailServiceTest {

    @Test
    public void testSendEmailValidInput() {
        EmailService emailService = new EmailService();
        boolean result = emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testSendEmailInvalidRecipient() {
        EmailService emailService = new EmailService();
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail(null, "Test Subject", "Test Body"));
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("", "Test Subject", "Test Body"));
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("invalid", "Test Subject", "Test Body"));
    }

    @Test
    public void testSendEmailEmptySubject() {
        EmailService emailService = new EmailService();
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("test@example.com", null, "Test Body"));
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("test@example.com", "", "Test Body"));
    }

    @Test
    public void testGetSentEmails() {
        EmailService emailService = new EmailService();
        emailService.sendEmail("test1@example.com", "Test Subject 1", "Test Body 1");
        emailService.sendEmail("test2@example.com", "Test Subject 2", "Test Body 2");
        List<String> sentEmails = emailService.getSentEmails();
        assertEquals(2, sentEmails.size());
    }

    @Test
    public void testGetSentCount() {
        EmailService emailService = new EmailService();
        assertEquals(0, emailService.getSentCount());
        emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testClearHistory() {
        EmailService emailService = new EmailService();
        emailService.sendEmail("test1@example.com", "Test Subject 1", "Test Body 1");
        emailService.sendEmail("test2@example.com", "Test Subject 2", "Test Body 2");
        emailService.clearHistory();
        assertEquals(0, emailService.getSentCount());
    }

    @Test
    public void testMultipleSendEmails() {
        EmailService emailService = new EmailService();
        emailService.sendEmail("test1@example.com", "Test Subject 1", "Test Body 1");
        emailService.sendEmail("test2@example.com", "Test Subject 2", "Test Body 2");
        emailService.sendEmail("test3@example.com", "Test Subject 3", "Test Body 3");
        assertEquals(3, emailService.getSentCount());
    }
}