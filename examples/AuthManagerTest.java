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

 
}