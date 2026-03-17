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

    @staticmethod
    def is_subdomain(email: str, parent_domain: str) -> bool:
        """Check if the email domain is a subdomain of the parent domain."""
        domain = EmailValidator.get_domain(email)
        if not domain:
            return False
        return domain == parent_domain or domain.endswith("." + parent_domain.lower())

    @staticmethod
    def get_tld(email: str) -> str | None:
        """Extract the Top-Level Domain (TLD) from the email."""
        domain = EmailValidator.get_domain(email)
        if not domain:
            return None
        parts = domain.split('.')
        return parts[-1] if len(parts) > 1 else None

    @staticmethod
    def has_alias(email: str) -> bool:
        """Check if the email uses a '+' alias (e.g., user+extra@gmail.com)."""
        username = EmailValidator.get_username(email)
        return username is not None and '+' in username

    @staticmethod
    def is_blacklisted(email: str, blacklist: list[str]) -> bool:
        """Check if the email domain or full address is in a blacklist."""
        normalized = EmailValidator.normalize(email)
        if not normalized:
            return False
        domain = EmailValidator.get_domain(email)
        return normalized in [b.lower() for b in blacklist] or (domain and domain in [b.lower() for b in blacklist])

    @staticmethod
    def suggest_correction(email: str) -> str | None:
        """Suggest a correction for common typos in domains (e.g., gmal.com -> gmail.com)."""
        if not email:
            return None
        domain = email.strip().split('@')[-1].lower() if '@' in email else email.lower()
        typos = {
            "gmal.com": "gmail.com",
            "yaho.com": "yahoo.com",
            "hotmial.com": "hotmail.com",
            "outlok.com": "outlook.com"
        }
        if domain in typos:
            username = EmailValidator.get_username(email) or "user"
            return f"{username}@{typos[domain]}"
        return None
