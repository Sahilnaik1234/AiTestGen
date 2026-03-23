import com.example.AuthManager;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AuthManagerTest {


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