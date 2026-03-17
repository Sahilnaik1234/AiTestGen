import unittest
from email_validator import EmailValidator

class TestEmailValidator(unittest.TestCase):

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