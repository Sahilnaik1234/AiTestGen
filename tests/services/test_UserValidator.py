import unittest
from UserValidator import UserValidator

class TestUserValidator(unittest.TestCase):

    def test_init(self):
        validator = UserValidator()
        self.assertEqual(validator.min_age, 18)

        validator = UserValidator(21)
        self.assertEqual(validator.min_age, 21)

    def test_validate_user_valid(self):
        validator = UserValidator()
        user = {
            "name": "John Doe",
            "email": "john@example.com",
            "age": 25
        }
        self.assertEqual(validator.validate_user(user), "VALID")

    def test_validate_user_underage(self):
        validator = UserValidator()
        user = {
            "name": "John Doe",
            "email": "john@example.com",
            "age": 17
        }
        self.assertEqual(validator.validate_user(user), "UNDERAGE")

    def test_validate_user_invalid_name(self):
        validator = UserValidator()
        user = {
            "name": "",
            "email": "john@example.com",
            "age": 25
        }
        with self.assertRaises(ValueError):
            validator.validate_user(user)

        user = {
            "name": "ab",
            "email": "john@example.com",
            "age": 25
        }
        with self.assertRaises(ValueError):
            validator.validate_user(user)

    def test_validate_user_invalid_email(self):
        validator = UserValidator()
        user = {
            "name": "John Doe",
            "email": "invalid_email",
            "age": 25
        }
        with self.assertRaises(ValueError):
            validator.validate_user(user)

        user = {
            "name": "John Doe",
            "email": "john@example",
            "age": 25
        }
        with self.assertRaises(ValueError):
            validator.validate_user(user)

    def test_validate_user_invalid_age(self):
        validator = UserValidator()
        user = {
            "name": "John Doe",
            "email": "john@example.com",
            "age": -1
        }
        with self.assertRaises(ValueError):
            validator.validate_user(user)

        user = {
            "name": "John Doe",
            "email": "john@example.com",
            "age": "25"
        }
        with self.assertRaises(TypeError):
            validator.validate_user(user)

    def test_validate_user_missing_field(self):
        validator = UserValidator()
        user = {
            "name": "John Doe",
            "age": 25
        }
        with self.assertRaises(KeyError):
            validator.validate_user(user)

    def test_validate_user_invalid_input_type(self):
        validator = UserValidator()
        user = "invalid_input"
        with self.assertRaises(TypeError):
            validator.validate_user(user)

    def test_generate_username(self):
        validator = UserValidator()
        name = "John Doe"
        age = 25
        self.assertEqual(validator.generate_username(name, age), "johndoe25")

    def test_generate_username_invalid_input(self):
        validator = UserValidator()
        name = ""
        age = 25
        with self.assertRaises(ValueError):
            validator.generate_username(name, age)

        name = "John Doe"
        age = "25"
        with self.assertRaises(ValueError):
            validator.generate_username(name, age)

if __name__ == "__main__":
    unittest.main()