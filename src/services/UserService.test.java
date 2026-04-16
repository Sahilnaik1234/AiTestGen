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

    @Test
    public void testRegisterUserUsernameWithSpaces() {
        // Arrange
        String username = "test user";
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserUsernameWithSpecialCharacters() {
        // Arrange
        String username = "test!@#$";
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testUpdateEmailEmailWithSpaces() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = "new email@example.com";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailEmailWithSpecialCharacters() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = "new!@#$email@example.com";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testAuthenticateUsernameWithSpaces() {
        // Arrange
        String username = "test user";
        String password = "password123";

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testAuthenticateUsernameWithSpecialCharacters() {
        // Arrange
        String username = "test!@#$";
        String password = "password123";

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testRegisterUserUsernameWithOnlyNumbers() {
        // Arrange
        String username = "12345";
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testRegisterUserUsernameWithOnlySpecialCharacters() {
        // Arrange
        String username = "!@#$";
        String email = "test@example.com";
        String password = "password123";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(username, email, password));
    }

    @Test
    public void testUpdateEmailEmailWithOnlyNumbers() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = "12345@example.com";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testUpdateEmailEmailWithOnlySpecialCharacters() {
        // Arrange
        String username = "testUser";
        String email = "test@example.com";
        String password = "password123";
        userService.registerUser(username, email, password); // register user first
        String newEmail = "!@#$@example.com";

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.updateEmail(username, newEmail));
    }

    @Test
    public void testAuthenticateUsernameWithOnlyNumbers() {
        // Arrange
        String username = "12345";
        String password = "password123";

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testAuthenticateUsernameWithOnlySpecialCharacters() {
        // Arrange
        String username = "!@#$";
        String password = "password123";

        // Act
        boolean authenticated = userService.authenticate(username, password);

        // Assert
        assertFalse(authenticated);
    }

    @Test
    public void testRegisterUserMultipleUsers() {
        // Arrange
        String username1 = "testUser1";
        String email1 = "test1@example.com";
        String password1 = "password123";
        String username2 = "testUser2";
        String email2 = "test2@example.com";
        String password2 = "password123";

        // Act
        userService.registerUser(username1, email1, password1);
        userService.registerUser(username2, email2, password2);

        // Assert
        assertNotNull(userService.userDatabase.get(username1));
        assertNotNull(userService.userDatabase.get(username2));
    }

    @Test
    public void testUpdateEmailMultipleUsers() {
        // Arrange
        String username1 = "testUser1";
        String email1 = "test1@example.com";
        String password1 = "password123";
        String username2 = "testUser2";
        String email2 = "test2@example.com";
        String password2 = "password123";
        userService.registerUser(username1, email1, password1);
        userService.registerUser(username2, email2, password2);
        String newEmail1 = "new1@example.com";
        String newEmail2 = "new2@example.com";

        // Act
        userService.updateEmail(username1, newEmail1);
        userService.updateEmail(username2, newEmail2);

        // Assert
        assertEquals(newEmail1, userService.userDatabase.get(username1).getEmail());
        assertEquals(newEmail2, userService.userDatabase.get(username2).getEmail());
    }

    @Test
    public void testAuthenticateMultipleUsers() {
        // Arrange
        String username1 = "testUser1";
        String email1 = "test1@example.com";
        String password1 = "password123";
        String username2 = "testUser2";
        String email2 = "test2@example.com";
        String password2 = "password123";
        userService.registerUser(username1, email1, password1);
        userService.registerUser(username2, email2, password2);

        // Act
        boolean authenticated1 = userService.authenticate(username1, password1);
        boolean authenticated2 = userService.authenticate(username2, password2);

        // Assert
        assertTrue(authenticated1);
        assertTrue(authenticated2);
    }
}