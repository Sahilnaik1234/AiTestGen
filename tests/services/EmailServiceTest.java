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

    @Test
    public void testGetSentEmailsEmpty() {
        EmailService emailService = new EmailService();
        List<String> sentEmails = emailService.getSentEmails();
        assertTrue(sentEmails.isEmpty());
    }

    @Test
    public void testClearHistoryEmpty() {
        EmailService emailService = new EmailService();
        emailService.clearHistory();
        assertEquals(0, emailService.getSentCount());
    }

    @Test
    public void testSendEmailValidInputMultipleTimes() {
        EmailService emailService = new EmailService();
        for (int i = 0; i < 10; i++) {
            boolean result = emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
            assertTrue(result);
        }
        assertEquals(10, emailService.getSentCount());
    }

    @Test
    public void testGetSentEmailsMultipleTimes() {
        EmailService emailService = new EmailService();
        for (int i = 0; i < 10; i++) {
            emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        }
        List<String> sentEmails = emailService.getSentEmails();
        assertEquals(10, sentEmails.size());
    }

    @Test
    public void testClearHistoryMultipleTimes() {
        EmailService emailService = new EmailService();
        for (int i = 0; i < 10; i++) {
            emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        }
        for (int i = 0; i < 5; i++) {
            emailService.clearHistory();
        }
        assertEquals(0, emailService.getSentCount());
    }

    @Test
    public void testSendEmailWithValidRecipientAndEmptyBody() {
        EmailService emailService = new EmailService();
        boolean result = emailService.sendEmail("test@example.com", "Test Subject", "");
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testSendEmailWithValidRecipientAndNullBody() {
        EmailService emailService = new EmailService();
        boolean result = emailService.sendEmail("test@example.com", "Test Subject", null);
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testGetSentEmailsAfterClearHistory() {
        EmailService emailService = new EmailService();
        emailService.sendEmail("test1@example.com", "Test Subject 1", "Test Body 1");
        emailService.sendEmail("test2@example.com", "Test Subject 2", "Test Body 2");
        emailService.clearHistory();
        List<String> sentEmails = emailService.getSentEmails();
        assertTrue(sentEmails.isEmpty());
    }

    @Test
    public void testGetSentCountAfterClearHistory() {
        EmailService emailService = new EmailService();
        emailService.sendEmail("test1@example.com", "Test Subject 1", "Test Body 1");
        emailService.sendEmail("test2@example.com", "Test Subject 2", "Test Body 2");
        emailService.clearHistory();
        assertEquals(0, emailService.getSentCount());
    }

    @Test
    public void testSendEmailWithRecipientHavingOnlyAtSymbol() {
        EmailService emailService = new EmailService();
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("@", "Test Subject", "Test Body"));
    }

    @Test
    public void testSendEmailWithRecipientHavingAtSymbolAtTheEnd() {
        EmailService emailService = new EmailService();
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("test@", "Test Subject", "Test Body"));
    }

    @Test
    public void testSendEmailWithRecipientHavingAtSymbolAtTheBeginning() {
        EmailService emailService = new EmailService();
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("@test", "Test Subject", "Test Body"));
    }

    @Test
    public void testSendEmailWithValidRecipientHavingMultipleAtSymbols() {
        EmailService emailService = new EmailService();
        assertThrows(IllegalArgumentException.class, () -> emailService.sendEmail("test@te@st", "Test Subject", "Test Body"));
    }

    @Test
    public void testSendEmailWithValidRecipientHavingAtSymbolAndOtherCharacters() {
        EmailService emailService = new EmailService();
        boolean result = emailService.sendEmail("test@example.com", "Test Subject", "Test Body");
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testGetSentEmailsContent() {
        EmailService emailService = new EmailService();
        emailService.sendEmail("test1@example.com", "Test Subject 1", "Test Body 1");
        emailService.sendEmail("test2@example.com", "Test Subject 2", "Test Body 2");
        List<String> sentEmails = emailService.getSentEmails();
        assertEquals("To: test1@example.com | Subject: Test Subject 1 | Body: Test Body 1", sentEmails.get(0));
        assertEquals("To: test2@example.com | Subject: Test Subject 2 | Body: Test Body 2", sentEmails.get(1));
    }

    @Test
    public void testSendEmailWithLongRecipient() {
        EmailService emailService = new EmailService();
        String longRecipient = "test".repeat(1000) + "@example.com";
        boolean result = emailService.sendEmail(longRecipient, "Test Subject", "Test Body");
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testSendEmailWithLongSubject() {
        EmailService emailService = new EmailService();
        String longSubject = "Test Subject ".repeat(1000);
        boolean result = emailService.sendEmail("test@example.com", longSubject, "Test Body");
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testSendEmailWithLongBody() {
        EmailService emailService = new EmailService();
        String longBody = "Test Body ".repeat(1000);
        boolean result = emailService.sendEmail("test@example.com", "Test Subject", longBody);
        assertTrue(result);
        assertEquals(1, emailService.getSentCount());
    }

    @Test
    public void testGetSentEmailsWithLongEmails() {
        EmailService emailService = new EmailService();
        String longRecipient = "test".repeat(1000) + "@example.com";
        String longSubject = "Test Subject ".repeat(1000);
        String longBody = "Test Body ".repeat(1000);
        emailService.sendEmail(longRecipient, longSubject, longBody);
        List<String> sentEmails = emailService.getSentEmails();
        assertEquals(1, sentEmails.size());
    }
}