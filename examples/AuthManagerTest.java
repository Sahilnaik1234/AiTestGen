package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

public class AuthManagerTest {
    private AuthManager auth;

    @BeforeEach
    public void setup() {
        auth = new AuthManager();
    }

    @Test
    public void testRegisterAndLogin() {
        assertTrue(auth.register("sahil", "Password123"));
        assertTrue(auth.login("sahil", "Password123"));
        assertTrue(auth.isLoggedIn("sahil"));
    }

    @Test
    public void testFailedLogin() {
        auth.register("sahil", "Password123");
        assertFalse(auth.login("sahil", "wrongpass"));
    }

    @Test
    public void testInvalidRegister() {
        assertFalse(auth.register("sh", "Password123"));
        assertFalse(auth.register(null, "Password123"));
        assertFalse(auth.register("sahil", "short"));
    }
}
