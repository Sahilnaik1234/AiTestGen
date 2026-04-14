package com.aitestgen.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import com.aitestgen.services.UserService.User;

public class UserServiceTest {

    @Test
    public void testRegisterUserValidInput() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
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
    public void testRegisterUserNullUsername() {
        // Arrange
        UserService userService = new UserService();
        String username = null;
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserShortUsername() {
        // Arrange
        UserService userService = new UserService();
        String username = "ab";
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserInvalidEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "invalidEmail";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserNullEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = null;
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserShortPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "short";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserNullPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = null;

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserExistingUser() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act and Assert
        assertThrows(IllegalStateException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testAuthenticateValidUser() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(isAuthenticated);
    }

    @Test
    public void testAuthenticateInvalidPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, "wrongPassword");

        // Assert
        assertFalse(isAuthenticated);
    }

    @Test
    public void testAuthenticateNonExistingUser() {
        // Arrange
        UserService userService = new UserService();
        String username = "nonExistingUser";
        String password = "password123";

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(isAuthenticated);
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
    public void testUpdateEmailInvalidEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);
        String newEmail = "invalidEmail";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailNullEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);
        String newEmail = null;

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailNonExistingUser() {
        // Arrange
        UserService userService = new UserService();
        String username = "nonExistingUser";
        String newEmail = "newEmail@example.com";

        // Act and Assert
        assertThrows(NoSuchElementException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testRegisterUserLongUsername() {
        // Arrange
        UserService userService = new UserService();
        String username = "abcdefghijklmnopqrstuvwxyz";
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
    public void testRegisterUserLongPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password1234567890";

        // Act
        User registeredUser = userService.registerUser(username, email, password);

        // Assert
        assertNotNull(registeredUser);
        assertEquals(username, registeredUser.getUsername());
        assertEquals(email, registeredUser.getEmail());
        assertNotNull(registeredUser.getPasswordHash());
    }

    @Test
    public void testUpdateEmailLongEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);
        String newEmail = "abcdefghijklmnopqrstuvwxyz@example.com";

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        User user = userService.userDatabase.get(username);
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    public void testAuthenticateNullPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act and Assert
        assertThrows(NullPointerException.class, () -> userService.authenticate(username, null));
    }

    @Test
    public void testAuthenticateNullUsername() {
        // Arrange
        UserService userService = new UserService();
        String password = "password123";

        // Act and Assert
        assertThrows(NullPointerException.class, () -> userService.authenticate(null, password));
    }
}