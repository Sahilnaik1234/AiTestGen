import unittest
from email_validator import EmailValidator

class TestEmailValidator(unittest.TestCase):

    def test_is_valid(self):
        # Test valid email
        self.assertTrue(EmailValidator.is_valid("test@example.com"))
        
        # Test invalid email
        self.assertFalse(EmailValidator.is_valid("invalid_email"))
        
        # Test empty string
        self.assertFalse(EmailValidator.is_valid(""))
        
        # Test None input
        self.assertFalse(EmailValidator.is_valid(None))
        
        # Test non-string input
        self.assertFalse(EmailValidator.is_valid(123))

    def test_get_domain(self):
        # Test valid email
        self.assertEqual(EmailValidator.get_domain("test@example.com"), "example.com")
        
        # Test invalid email
        self.assertIsNone(EmailValidator.get_domain("invalid_email"))
        
        # Test empty string
        self.assertIsNone(EmailValidator.get_domain(""))
        
        # Test None input
        self.assertIsNone(EmailValidator.get_domain(None))

    def test_is_disposable(self):
        # Test disposable email
        self.assertTrue(EmailValidator.is_disposable("test@mailinator.com"))
        
        # Test non-disposable email
        self.assertFalse(EmailValidator.is_disposable("test@example.com"))
        
        # Test invalid email
        self.assertFalse(EmailValidator.is_disposable("invalid_email"))
        
        # Test empty string
        self.assertFalse(EmailValidator.is_disposable(""))
        
        # Test None input
        self.assertFalse(EmailValidator.is_disposable(None))

    def test_normalize(self):
        # Test valid email
        self.assertEqual(EmailValidator.normalize("Test@Example.com"), "test@example.com")
        
        # Test invalid email
        self.assertIsNone(EmailValidator.normalize("invalid_email"))
        
        # Test empty string
        self.assertIsNone(EmailValidator.normalize(""))
        
        # Test None input
        self.assertIsNone(EmailValidator.normalize(None))

    def test_get_username(self):
        # Test valid email
        self.assertEqual(EmailValidator.get_username("test@example.com"), "test")
        
        # Test invalid email
        self.assertIsNone(EmailValidator.get_username("invalid_email"))
        
        # Test empty string
        self.assertIsNone(EmailValidator.get_username(""))
        
        # Test None input
        self.assertIsNone(EmailValidator.get_username(None))

    def test_mask(self):
        # Test valid email
        self.assertEqual(EmailValidator.mask("test@example.com"), "t***@example.com")
        
        # Test single character username
        self.assertEqual(EmailValidator.mask("a@example.com"), "***@example.com")
        
        # Test invalid email
        self.assertIsNone(EmailValidator.mask("invalid_email"))
        
        # Test empty string
        self.assertIsNone(EmailValidator.mask(""))
        
        # Test None input
        self.assertIsNone(EmailValidator.mask(None))

    def test_is_corporate(self):
        # Test corporate email
        self.assertTrue(EmailValidator.is_corporate("test@example.com", ["example.com"]))
        
        # Test non-corporate email
        self.assertFalse(EmailValidator.is_corporate("test@example.com", ["other.com"]))
        
        # Test invalid email
        self.assertFalse(EmailValidator.is_corporate("invalid_email", ["example.com"]))
        
        # Test empty string
        self.assertFalse(EmailValidator.is_corporate("", ["example.com"]))
        
        # Test None input
        self.assertFalse(EmailValidator.is_corporate(None, ["example.com"]))

    def test_batch_validate(self):
        # Test batch validation
        emails = ["test@example.com", "invalid_email", "test@mailinator.com"]
        results = EmailValidator.batch_validate(emails)
        self.assertEqual(results["test@example.com"]["valid"], True)
        self.assertEqual(results["test@example.com"]["disposable"], False)
        self.assertEqual(results["invalid_email"]["valid"], False)
        self.assertEqual(results["invalid_email"]["disposable"], False)
        self.assertEqual(results["test@mailinator.com"]["valid"], True)
        self.assertEqual(results["test@mailinator.com"]["disposable"], True)

    def test_is_subdomain(self):
        # Test subdomain email
        self.assertTrue(EmailValidator.is_subdomain("test@example.com", "example.com"))
        
        # Test non-subdomain email
        self.assertFalse(EmailValidator.is_subdomain("test@example.com", "other.com"))
        
        # Test invalid email
        self.assertFalse(EmailValidator.is_subdomain("invalid_email", "example.com"))
        
        # Test empty string
        self.assertFalse(EmailValidator.is_subdomain("", "example.com"))
        
        # Test None input
        self.assertFalse(EmailValidator.is_subdomain(None, "example.com"))

    def test_get_tld(self):
        # Test valid email
        self.assertEqual(EmailValidator.get_tld("test@example.com"), "com")
        
        # Test invalid email
        self.assertIsNone(EmailValidator.get_tld("invalid_email"))
        
        # Test empty string
        self.assertIsNone(EmailValidator.get_tld(""))
        
        # Test None input
        self.assertIsNone(EmailValidator.get_tld(None))

    def test_has_alias(self):
        # Test email with alias
        self.assertTrue(EmailValidator.has_alias("test+alias@example.com"))
        
        # Test email without alias
        self.assertFalse(EmailValidator.has_alias("test@example.com"))
        
        # Test invalid email
        self.assertFalse(EmailValidator.has_alias("invalid_email"))
        
        # Test empty string
        self.assertFalse(EmailValidator.has_alias(""))
        
        # Test None input
        self.assertFalse(EmailValidator.has_alias(None))

    def test_is_blacklisted(self):
        # Test blacklisted email
        self.assertTrue(EmailValidator.is_blacklisted("test@example.com", ["example.com", "test@example.com"]))
        
        # Test non-blacklisted email
        self.assertFalse(EmailValidator.is_blacklisted("test@example.com", ["other.com", "other@example.com"]))
        
        # Test invalid email
        self.assertFalse(EmailValidator.is_blacklisted("invalid_email", ["example.com", "test@example.com"]))
        
        # Test empty string
        self.assertFalse(EmailValidator.is_blacklisted("", ["example.com", "test@example.com"]))
        
        # Test None input
        self.assertFalse(EmailValidator.is_blacklisted(None, ["example.com", "test@example.com"]))

    def test_suggest_correction(self):
        # Test email with typo
        self.assertEqual(EmailValidator.suggest_correction("test@gmal.com"), "test@gmail.com")
        
        # Test email without typo
        self.assertIsNone(EmailValidator.suggest_correction("test@example.com"))
        
        # Test invalid email
        self.assertIsNone(EmailValidator.suggest_correction("invalid_email"))
        
        # Test empty string
        self.assertIsNone(EmailValidator.suggest_correction(""))
        
        # Test None input
        self.assertIsNone(EmailValidator.suggest_correction(None))

if __name__ == '__main__':
    unittest.main()