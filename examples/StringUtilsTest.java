import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class StringUtilsTest {

    @Test
    public void testReverse() {
        // Test null input
        assertNull(StringUtils.reverse(null));

        // Test empty string
        assertEquals("", StringUtils.reverse(""));

        // Test single character
        assertEquals("a", StringUtils.reverse("a"));

        // Test multiple characters
        assertEquals("dcba", StringUtils.reverse("abcd"));
    }

    @Test
    public void testLogicMethods() {
        StringUtils stringUtils = new StringUtils();
        for (int i = 1; i <= 200; i++) {
            String methodName = "logic_v" + i;
            try {
                java.lang.reflect.Method method = StringUtils.class.getDeclaredMethod(methodName);
                assertTrue((Boolean) method.invoke(stringUtils));
            } catch (Exception e) {
                fail("Error invoking method " + methodName);
            }
        }
    }
}