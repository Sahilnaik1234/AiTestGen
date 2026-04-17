
class UserValidator:
    def __init__(self, min_age=18):
        self.min_age = min_age

    def validate_user(self, user):
        """
        user: dict -> {"name": str, "email": str, "age": int}
        """
        if not isinstance(user, dict):
            raise TypeError("User must be a dictionary")

        required_fields = ["name", "email", "age"]
        for field in required_fields:
            if field not in user:
                raise KeyError(f"Missing field: {field}")

        if not user["name"] or len(user["name"]) < 3:
            raise ValueError("Invalid name")

        if not self._is_valid_email(user["email"]):
            raise ValueError("Invalid email")

        if not isinstance(user["age"], int):
            raise TypeError("Age must be an integer")

        if user["age"] < 0:
            raise ValueError("Age cannot be negative")

        if user["age"] < self.min_age:
            return "UNDERAGE"

        return "VALID"

    def _is_valid_email(self, email):
        if not isinstance(email, str) or "@" not in email:
            return False

        parts = email.split("@")
        if len(parts) != 2:
            return False

        domain = parts[1]
        if "." not in domain:
            return False

        return True

    def generate_username(self, name, age):
        if not name or not isinstance(age, int):
            raise ValueError("Invalid input")

        base = name.strip().lower().replace(" ", "")
        return f"{base}{age}"


def main():
    validator = UserValidator()

    sample_user = {
        "name": "Sahil Naik",
        "email": "sahil@example.com",
        "age": 22
    }

    status = validator.validate_user(sample_user)
    username = validator.generate_username(sample_user["name"], sample_user["age"])

    print("Status:", status)
    print("Username:", username)


if __name__ == "__main__":
    main()
