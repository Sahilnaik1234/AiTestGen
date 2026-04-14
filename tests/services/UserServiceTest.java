package com.aitestgen.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import com.aitestgen.services.UserService.User;

public class UserServiceTest {

    // Existing tests...

    @Test
    public void testRegisterUserUsernameWithOnlyNumbers() {
        // Arrange
        UserService userService = new UserService();
        String username = "12345";
        String email = "test@example.com";
        String password = "password123";

        // Act
        User registeredUser = userService.registerUser(username, email, password);

        // Assert
        assertNotNull(registeredUser);
        assertEquals(username, registeredUser.getUsername());
        assertEquals(email, registeredUser.getEmail());
        assertNotNull(registeredUser.getPasswordHash());
    }

    @Test
    public void testRegisterUserUsernameWithOnlySpecialCharacters() {
        // Arrange
        UserService userService = new UserService();
        String username = "!@#$%";
        String email = "test@example.com";
        String password = "password123";

        // Act
        User registeredUser = userService.registerUser(username, email, password);

        // Assert
        assertNotNull(registeredUser);
        assertEquals(username, registeredUser.getUsername());
        assertEquals(email, registeredUser.getEmail());
        assertNotNull(registeredUser.getPasswordHash());
    }

    @Test
    public void testUpdateEmailValidInput() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        User user = userService.registerUser(username, email, password);
        String newEmail = "newEmail@example.com";

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    public void testUpdateEmailUsernameWithSpecialCharacters() {
        // Arrange
        UserService userService = new UserService();
        String username = "test_User!@#";
        String email = "test@example.com";
        String password = "password123";
        User user = userService.registerUser(username, email, password);
        String newEmail = "newEmail@example.com";

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    public void testAuthenticateUsernameWithOnlyNumbers() {
        // Arrange
        UserService userService = new UserService();
        String username = "12345";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(isAuthenticated);
    }

    @Test
    public void testAuthenticateUsernameWithOnlySpecialCharacters() {
        // Arrange
        UserService userService = new UserService();
        String username = "!@#$%";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(isAuthenticated);
    }

    @Test
    public void testRegisterUserWithLongEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz@example.com";
        String password = "password123";

        // Act
        User registeredUser = userService.registerUser(username, email, password);

        // Assert
        assertNotNull(registeredUser);
        assertEquals(username, registeredUser.getUsername());
        assertEquals(email, registeredUser.getEmail());
        assertNotNull(registeredUser.getPasswordHash());
    }

    @Test
    public void testUpdateEmailWithLongEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        User user = userService.registerUser(username, email, password);
        String newEmail = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz@example.com";

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        assertEquals(newEmail, user.getEmail());
    }
}