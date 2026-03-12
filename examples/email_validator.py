import re
from datetime import datetime


class EmailValidator:
    """A utility class for validating and parsing email addresses."""

    DISPOSABLE_DOMAINS = {"mailinator.com", "tempmail.com", "throwaway.email", "guerrillamail.com"}

    @staticmethod
    def is_valid(email: str) -> bool:
        """Check if an email address is syntactically valid."""
        if not email or not isinstance(email, str):
            return False
        pattern = r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email.strip()))

    @staticmethod
    def get_domain(email: str) -> str | None:
        """Extract the domain from an email address."""
        if not EmailValidator.is_valid(email):
            return None
        return email.strip().split('@')[1].lower()

    @staticmethod
    def is_disposable(email: str) -> bool:
        """Check if the email uses a known disposable domain."""
        domain = EmailValidator.get_domain(email)
        if not domain:
            return False
        return domain in EmailValidator.DISPOSABLE_DOMAINS

    @staticmethod
    def normalize(email: str) -> str | None:
        """Normalize email to lowercase and strip whitespace."""
        if not EmailValidator.is_valid(email):
            return None
        return email.strip().lower()

    @staticmethod
    def get_username(email: str) -> str | None:
        """Extract the username part of an email."""
        if not EmailValidator.is_valid(email):
            return None
        return email.strip().split('@')[0]

    @staticmethod
    def mask(email: str) -> str | None:
        """Mask the email for display purposes (e.g., j***@example.com)."""
        if not EmailValidator.is_valid(email):
            return None
        username, domain = email.strip().split('@')
        masked = username[0] + '***' if len(username) > 1 else '***'
        return f"{masked}@{domain}"

    @staticmethod
    def is_corporate(email: str, corporate_domains: list[str]) -> bool:
        """Check if email belongs to a list of corporate domains."""
        domain = EmailValidator.get_domain(email)
        if not domain:
            return False
        return domain in [d.lower() for d in corporate_domains]

    @staticmethod
    def batch_validate(emails: list[str]) -> dict:
        """Validate a batch of emails and return a summary."""
        results = {}
        for email in emails:
            results[email] = {
                "valid": EmailValidator.is_valid(email),
                "disposable": EmailValidator.is_disposable(email)
            }
        return results
