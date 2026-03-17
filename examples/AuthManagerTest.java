import com.example.AuthManager;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AuthManagerTest {

    @Test
    public void testRegisterValidUser() {
        AuthManager authManager = new AuthManager();
        assertTrue(authManager.register("user123", "Password123"));
    }

    @Test
    public void testRegisterNullUsername() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register(null, "Password123"));
    }

    @Test
    public void testRegisterNullPassword() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register("user123", null));
    }

    @Test
    public void testRegisterShortUsername() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register("us", "Password123"));
    }

    @Test
    public void testRegisterExistingUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("user123", "Password123");
        assertFalse(authManager.register("user123", "Password123"));
    }

    @Test
    public void testRegisterInvalidPassword() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.register("user123", "password"));
    }

    @Test
    public void testLoginValidUser() {
        AuthManager authManager = new AuthManager();
        authManager.register("user123", "Password123");
        assertTrue(authManager.login("user123", "Password123"));
    }

    @Test
    public void testLoginNullUsername() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.login(null, "Password123"));
    }

    @Test
    public void testLoginNullPassword() {
        AuthManager authManager = new AuthManager();
        assertFalse(authManager.login("user123", null));
    }
}