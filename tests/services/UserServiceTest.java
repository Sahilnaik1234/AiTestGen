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
    public void testAuthenticateWrongPassword() {
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
    public void testUpdateEmailNonExistingUser() {
        // Arrange
        UserService userService = new UserService();
        String username = "nonExistingUser";
        String newEmail = "newEmail@example.com";

        // Act and Assert
        assertThrows(NoSuchElementException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailInvalidNewEmail() {
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
    public void testUpdateEmailNullNewEmail() {
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
    public void testRegisterUserUsernameWithSpecialCharactersAndNumbers() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser123!@#";
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
    public void testRegisterUserUsernameWithUnderscore() {
        // Arrange
        UserService userService = new UserService();
        String username = "test_User";
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
    public void testRegisterUserEmailWithSubdomain() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@subdomain.example.com";
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
    public void testUpdateEmailToEmailWithSubdomain() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        User user = userService.registerUser(username, email, password);
        String newEmail = "test@subdomain.example.com";

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    public void testAuthenticateUserWithUsernameContainingUnderscore() {
        // Arrange
        UserService userService = new UserService();
        String username = "test_User";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(isAuthenticated);
    }

    @Test
    public void testAuthenticateUserWithEmailContainingSubdomain() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@subdomain.example.com";
        String password = "password123";
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(isAuthenticated);
    }

    @Test
    public void testRegisterUserWithMaximumLengthUsername() {
        // Arrange
        UserService userService = new UserService();
        String username = "a".repeat(1000); // Assuming maximum length is not defined
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertDoesNotThrow(() -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserWithMaximumLengthEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "a".repeat(1000) + "@example.com"; // Assuming maximum length is not defined
        String password = "password123";

        // Act and Assert
        assertDoesNotThrow(() -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserWithMaximumLengthPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "a".repeat(1000); // Assuming maximum length is not defined

        // Act and Assert
        assertDoesNotThrow(() -> userService.registerUser(username, email, password));
    }

    @Test
    public void testUpdateEmailWithMaximumLengthNewEmail() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        User user = userService.registerUser(username, email, password);
        String newEmail = "a".repeat(1000) + "@example.com"; // Assuming maximum length is not defined

        // Act
        userService.updateEmail(username, newEmail);

        // Assert
        assertEquals(newEmail, user.getEmail());
    }

    @Test
    public void testAuthenticateWithMaximumLengthPassword() {
        // Arrange
        UserService userService = new UserService();
        String username = "testUser";
        String email = "test@example.com";
        String password = "a".repeat(1000); // Assuming maximum length is not defined
        userService.registerUser(username, email, password);

        // Act
        boolean isAuthenticated = userService.authenticate(username, password);

        // Assert
        assertTrue(isAuthenticated);
    }
}