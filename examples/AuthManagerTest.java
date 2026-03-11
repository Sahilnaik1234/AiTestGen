import com.example.AuthManager;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AuthManagerTest {

    @Test
    public void testRegisterValidUser() {
        AuthManager authManager = new AuthManager();
        assertTrue(authManager.register("testUser", "P@ssw0rd"));
    }

    @Test
    public void testRegisterNullUsername() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register(null, "P@ssw0rd"));
    }

    @Test
    public void testRegisterNullPassword() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register("testUser", null));
    }

    @Test
    public void testRegisterShortUsername() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register("te", "P@ssw0rd"));
    }

    @Test
    public void testRegisterExistingUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertFalse(authManager.register("testUser", "P@ssw0rd"));
    }

    @Test
    public void testRegisterInvalidPassword() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register("testUser", "password"));
    }

    @Test
    public void testLoginValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertTrue(authManager.login("testUser", "P@ssw0rd"));
    }

    @Test
    public void testLoginNullUsername() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.login(null, "P@ssw0rd"));
    }

    @Test
    public void testLoginNullPassword() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.login("testUser", null));
    }

    @Test
    public void testLoginInvalidPassword() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertFalse(authManager.login("testUser", "wrongPassword"));
    }

    @Test
    public void testLogoutValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        authManager.login("testUser", "P@ssw0rd");
        assertTrue(authManager.logout("testUser"));
    }

    @Test
    public void testLogoutInvalidUser() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.logout("testUser"));
    }

    @Test
    public void testIsLoggedInValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        authManager.login("testUser", "P@ssw0rd");
        assertTrue(authManager.isLoggedIn("testUser"));
    }

    @Test
    public void testIsLoggedInInvalidUser() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.isLoggedIn("testUser"));
    }

    @Test
    public void testResetPasswordValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertTrue(authManager.resetPassword("testUser", "P@ssw0rd", "NewP@ssw0rd"));
    }

    @Test
    public void testResetPasswordInvalidOldPassword() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertFalse(authManager.resetPassword("testUser", "wrongPassword", "NewP@ssw0rd"));
    }

    @Test
    public void testResetPasswordInvalidNewPassword() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertFalse(authManager.resetPassword("testUser", "P@ssw0rd", "newpassword"));
    }

    @Test
    public void testGetStatusRegisteredUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertEquals("OFFLINE", authManager.getStatus("testUser"));
    }

    @Test
    public void testGetStatusUnregisteredUser() {
        AuthManager authManager = new AuthManager();
        assertEquals("NOT_REGISTERED", authManager.getStatus("testUser"));
    }

    @Test
    public void testGetStatusLoggedInUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        authManager.login("testUser", "P@ssw0rd");
        assertEquals("ONLINE", authManager.getStatus("testUser"));
    }

    @Test
    public void testGetUserCount() {
        AuthManager authManager = new AuthManager();
        assertEquals(0, authManager.getUserCount());
        authManager.register("testUser", "P@ssw0rd");
        assertEquals(1, authManager.getUserCount());
    }

    @Test
    public void testClearAll() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        authManager.login("testUser", "P@ssw0rd");
        authManager.clearAll();
        assertEquals(0, authManager.getUserCount());
        assertFalse(authManager.isLoggedIn("testUser"));
    }

    @Test
    public void testDeleteUserValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertTrue(authManager.deleteUser("testUser", "P@ssw0rd"));
    }

    @Test
    public void testDeleteUserInvalidPassword() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertFalse(authManager.deleteUser("testUser", "wrongPassword"));
    }

    @Test
    public void testUpdateUsernameValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertTrue(authManager.updateUsername("testUser", "newTestUser"));
    }

    @Test
    public void testUpdateUsernameExistingNewUsername() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        authManager.register("newTestUser", "P@ssw0rd");
        assertFalse(authManager.updateUsername("testUser", "newTestUser"));
    }

    @Test
    public void testExportData() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        assertNotNull(authManager.exportData());
    }

    @Test
    public void testIsAdminValidAdmin() {
        AuthManager authManager = new AuthManager();
        assertTrue(authManager.isAdmin("admin"));
    }

    @Test
    public void testIsAdminInvalidAdmin() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.isAdmin("testUser"));
    }

    @Test
    public void testGenerateTokenValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("testUser", "P@ssw0rd");
        authManager.login("testUser", "P@ssw0rd");
        assertNotNull(authManager.generateToken("testUser"));
    }

    @Test
    public void testGenerateTokenInvalidUser() {
        AuthManager authManager = new AuthManager();
        assertNull(authManager.generateToken("testUser"));
    }
}