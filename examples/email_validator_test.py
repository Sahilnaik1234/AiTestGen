import unittest
from email_validator import EmailValidator

class TestEmailValidator(unittest.TestCase):

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

if __name__ == '__main__':
    unittest.main()