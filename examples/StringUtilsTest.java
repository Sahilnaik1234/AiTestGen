import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class StringUtilsTest {

    @Test
    public void testReverse() {
        // Test case 1: Reverse of a simple string
        String input = "hello";
        String expected = "olleh";
        assertEquals(expected, StringUtils.reverse(input));

        // Test case 2: Reverse of a string with uppercase letters
        input = "Hello";
        expected = "olleH";
        assertEquals(expected, StringUtils.reverse(input));

        // Test case 3: Reverse of a string with special characters
        input = "hello!";
        expected = "!olleh";
        assertEquals(expected, StringUtils.reverse(input));

        // Test case 4: Reverse of a null string
        input = null;
        expected = null;
        assertEquals(expected, StringUtils.reverse(input));
    }

    @Test
    public void testIsPalindrome() {
        // Test case 1: Palindrome string
        String input = "madam";
        assertTrue(StringUtils.isPalindrome(input));

        // Test case 2: Non-palindrome string
        input = "hello";
        assertFalse(StringUtils.isPalindrome(input));

        // Test case 3: Palindrome string with uppercase letters
        input = "Madam";
        assertTrue(StringUtils.isPalindrome(input));

        // Test case 4: Null string
        input = null;
        assertFalse(StringUtils.isPalindrome(input));
    }

    @Test
    public void testCapitalize() {
        // Test case 1: Capitalize a simple string
        String input = "hello";
        String expected = "Hello";
        assertEquals(expected, StringUtils.capitalize(input));

        // Test case 2: Capitalize a string with uppercase letters
        input = "HELLO";
        expected = "HELLO";
        assertEquals(expected, StringUtils.capitalize(input));

        // Test case 3: Capitalize a null string
        input = null;
        expected = null;
        assertEquals(expected, StringUtils.capitalize(input));

        // Test case 4: Capitalize an empty string
        input = "";
        expected = "";
        assertEquals(expected, StringUtils.capitalize(input));
    }

    @Test
    public void testToCamelCase() {
        // Test case 1: Convert a string to camel case
        String input = "hello world";
        String expected = "helloWorld";
        assertEquals(expected, StringUtils.toCamelCase(input));

        // Test case 2: Convert a string with uppercase letters to camel case
        input = "Hello World";
        expected = "helloWorld";
        assertEquals(expected, StringUtils.toCamelCase(input));

        // Test case 3: Convert a null string to camel case
        input = null;
        expected = null;
        assertEquals(expected, StringUtils.toCamelCase(input));
    }

    @Test
    public void testTruncate() {
        // Test case 1: Truncate a string to a shorter length
        String input = "hello world";
        int length = 5;
        String expected = "hello...";
        assertEquals(expected, StringUtils.truncate(input, length));

        // Test case 2: Truncate a string to its original length
        input = "hello world";
        length = 11;
        expected = "hello world";
        assertEquals(expected, StringUtils.truncate(input, length));

        // Test case 3: Truncate a null string
        input = null;
        length = 5;
        expected = null;
        assertEquals(expected, StringUtils.truncate(input, length));
    }

    @Test
    public void testCountOccurrences() {
        // Test case 1: Count occurrences of a character in a string
        String input = "hello world";
        char target = 'l';
        int expected = 3;
        assertEquals(expected, StringUtils.countOccurrences(input, target));

        // Test case 2: Count occurrences of a character not in the string
        input = "hello world";
        target = 'x';
        expected = 0;
        assertEquals(expected, StringUtils.countOccurrences(input, target));

        // Test case 3: Count occurrences in a null string
        input = null;
        target = 'l';
        expected = 0;
        assertEquals(expected, StringUtils.countOccurrences(input, target));
    }

    @Test
    public void testIsNumeric() {
        // Test case 1: Check if a numeric string is numeric
        String input = "123";
        assertTrue(StringUtils.isNumeric(input));

        // Test case 2: Check if a non-numeric string is numeric
        input = "hello";
        assertFalse(StringUtils.isNumeric(input));

        // Test case 3: Check if a decimal number is numeric
        input = "123.45";
        assertTrue(StringUtils.isNumeric(input));

        // Test case 4: Check if a null string is numeric
        input = null;
        assertFalse(StringUtils.isNumeric(input));
    }

    @Test
    public void testRepeat() {
        // Test case 1: Repeat a string
        String input = "hello";
        int times = 3;
        String expected = "hellohellohello";
        assertEquals(expected, StringUtils.repeat(input, times));

        // Test case 2: Repeat a string zero times
        input = "hello";
        times = 0;
        expected = "";
        assertEquals(expected, StringUtils.repeat(input, times));

        // Test case 3: Repeat a null string
        input = null;
        times = 3;
        expected = "";
        assertEquals(expected, StringUtils.repeat(input, times));
    }

    @Test
    public void testStripAccents() {
        // Test case 1: Strip accents from a string
        String input = "héllo";
        String expected = "hello";
        assertEquals(expected, StringUtils.stripAccents(input));

        // Test case 2: Strip accents from a string with no accents
        input = "hello";
        expected = "hello";
        assertEquals(expected, StringUtils.stripAccents(input));

        // Test case 3: Strip accents from a null string
        input = null;
        expected = null;
        assertEquals(expected, StringUtils.stripAccents(input));
    }

    @Test
    public void testSlugify() {
        // Test case 1: Slugify a string
        String input = "Hello World";
        String expected = "hello-world";
        assertEquals(expected, StringUtils.slugify(input));

        // Test case 2: Slugify a string with accents
        input = "Héllo Wörld";
        expected = "hello-world";
        assertEquals(expected, StringUtils.slugify(input));

        // Test case 3: Slugify a null string
        input = null;
        expected = null;
        assertEquals(expected, StringUtils.slugify(input));
    }
}