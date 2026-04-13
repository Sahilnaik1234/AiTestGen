package com.aitestgen.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {

    private UserService userService = new UserService();

    @Test
    public void testRegisterUserValidInput() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";

        // Act
        User user = userService.registerUser(username, email, password);

        // Assert
        assertNotNull(user);
        assertEquals(username, user.getUsername());
        assertEquals(email, user.getEmail());
        assertNotNull(user.getPasswordHash());
    }

    @Test
    public void testRegisterUserInvalidUsername() {
        // Arrange
        String username = "ab"; // less than 3 characters
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserInvalidEmail() {
        // Arrange
        String username = "testUser";
        String email = "invalidEmail"; // does not match email pattern
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserInvalidPassword() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "short"; // less than 8 characters

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserExistingUser() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first

        // Act and Assert
        assertThrows(IllegalStateException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testAuthenticateValidCredentials() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(authenticated);
    }

    @Test
    public void testAuthenticateInvalidCredentials() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first

        // Act
        boolean authenticated = userService.authenticate(username, "wrongPassword");

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testAuthenticateNonExistingUser() {
        // Arrange
        String username = "nonExistingUser";
        String password = "password123";

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testUpdateEmailValidInput() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = "newEmail@example.com";

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        User user = userService.userDatabase.get(username);
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    public void testUpdateEmailInvalidEmail() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = "invalidEmail"; // does not match email pattern

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailNonExistingUser() {
        // Arrange
        String username = "nonExistingUser";
        String newEmail = "newEmail@example.com";

        // Act and Assert
        assertThrows(NoSuchElementException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testRegisterUserNullUsername() {
        // Arrange
        String username = null;
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserNullEmail() {
        // Arrange
        String username = "testUser";
        String email = null;
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserNullPassword() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = null;

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testUpdateEmailNullEmail() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = null;

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailNullUsername() {
        // Arrange
        String username = null;
        String newEmail = "newEmail@example.com";

        // Act and Assert
        assertThrows(NoSuchElementException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testAuthenticateNullUsername() {
        // Arrange
        String username = null;
        String password = "password123";

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testAuthenticateNullPassword() {
        // Arrange
        String username = "testUser";
        String password = null;

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }
}