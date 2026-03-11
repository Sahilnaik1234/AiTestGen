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
    public void testIsPalindrome() {
        // Test null input
        assertFalse(StringUtils.isPalindrome(null));

        // Test empty string
        assertTrue(StringUtils.isPalindrome(""));

        // Test single character
        assertTrue(StringUtils.isPalindrome("a"));

        // Test palindrome
        assertTrue(StringUtils.isPalindrome("madam"));

        // Test not palindrome
        assertFalse(StringUtils.isPalindrome("hello"));
    }

    @Test
    public void testCapitalize() {
        // Test null input
        assertNull(StringUtils.capitalize(null));

        // Test empty string
        assertEquals("", StringUtils.capitalize(""));

        // Test single character
        assertEquals("A", StringUtils.capitalize("a"));

        // Test multiple characters
        assertEquals("Hello", StringUtils.capitalize("hello"));
    }

    @Test
    public void testToCamelCase() {
        // Test null input
        assertNull(StringUtils.toCamelCase(null));

        // Test empty string
        assertEquals("", StringUtils.toCamelCase(""));

        // Test single character
        assertEquals("a", StringUtils.toCamelCase("a"));

        // Test multiple characters
        assertEquals("helloWorld", StringUtils.toCamelCase("hello world"));
    }

    @Test
    public void testTruncate() {
        // Test null input
        assertNull(StringUtils.truncate(null, 10));

        // Test empty string
        assertEquals("", StringUtils.truncate("", 10));

        // Test string shorter than length
        assertEquals("hello", StringUtils.truncate("hello", 10));

        // Test string longer than length
        assertEquals("hello...", StringUtils.truncate("hello world", 5));
    }

    @Test
    public void testCountOccurrences() {
        // Test null input
        assertEquals(0, StringUtils.countOccurrences(null, 'a'));

        // Test empty string
        assertEquals(0, StringUtils.countOccurrences("", 'a'));

        // Test single character
        assertEquals(1, StringUtils.countOccurrences("a", 'a'));

        // Test multiple characters
        assertEquals(2, StringUtils.countOccurrences("hello", 'l'));
    }

    @Test
    public void testIsNumeric() {
        // Test null input
        assertFalse(StringUtils.isNumeric(null));

        // Test empty string
        assertFalse(StringUtils.isNumeric(""));

        // Test single character
        assertFalse(StringUtils.isNumeric("a"));

        // Test numeric string
        assertTrue(StringUtils.isNumeric("123"));

        // Test decimal string
        assertTrue(StringUtils.isNumeric("123.45"));

        // Test negative string
        assertTrue(StringUtils.isNumeric("-123"));
    }

    @Test
    public void testRepeat() {
        // Test null input
        assertEquals("", StringUtils.repeat(null, 3));

        // Test empty string
        assertEquals("", StringUtils.repeat("", 3));

        // Test single character
        assertEquals("aaa", StringUtils.repeat("a", 3));

        // Test multiple characters
        assertEquals("hellohellohello", StringUtils.repeat("hello", 3));
    }

    @Test
    public void testStripAccents() {
        // Test null input
        assertNull(StringUtils.stripAccents(null));

        // Test empty string
        assertEquals("", StringUtils.stripAccents(""));

        // Test single character
        assertEquals("a", StringUtils.stripAccents("a"));

        // Test accented character
        assertEquals("a", StringUtils.stripAccents("á"));
    }

    @Test
    public void testSlugify() {
        // Test null input
        assertNull(StringUtils.slugify(null));

        // Test empty string
        assertEquals("", StringUtils.slugify(""));

        // Test single character
        assertEquals("a", StringUtils.slugify("a"));

        // Test multiple characters
        assertEquals("hello-world", StringUtils.slugify("Hello World"));
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