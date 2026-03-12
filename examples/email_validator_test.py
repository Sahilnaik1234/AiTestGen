import unittest
from email_validator import EmailValidator


class TestEmailValidatorPartial(unittest.TestCase):
    """Partial tests (~20% coverage) to let the AI fill in the rest."""

    def test_valid_email(self):
        self.assertTrue(EmailValidator.is_valid("user@example.com"))

    def test_invalid_email_no_at(self):
        self.assertFalse(EmailValidator.is_valid("userexample.com"))

    def test_invalid_email_empty(self):
        self.assertFalse(EmailValidator.is_valid(""))


if __name__ == '__main__':
    unittest.main()
