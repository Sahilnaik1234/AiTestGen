import unittest
from LoginManager import LoginManager

class TestLoginManager(unittest.TestCase):

    def test_register_user_valid(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        self.assertIn("test_user", manager.users)
        self.assertEqual(manager.users["test_user"], "password123")
        self.assertEqual(manager.failed_attempts["test_user"], 0)

    def test_register_user_empty_username(self):
        manager = LoginManager()
        with self.assertRaises(ValueError):
            manager.register_user("", "password123")

    def test_register_user_empty_password(self):
        manager = LoginManager()
        with self.assertRaises(ValueError):
            manager.register_user("test_user", "")

    def test_register_user_short_password(self):
        manager = LoginManager()
        with self.assertRaises(ValueError):
            manager.register_user("test_user", "short")

    def test_register_user_duplicate_username(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        with self.assertRaises(ValueError):
            manager.register_user("test_user", "password123")

    def test_login_valid(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        self.assertEqual(manager.login("test_user", "password123"), "SUCCESS")

    def test_login_invalid_password(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        self.assertEqual(manager.login("test_user", "wrong"), "FAILED")

    def test_login_locked_user(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        manager.login("test_user", "wrong")
        manager.login("test_user", "wrong")
        manager.login("test_user", "wrong")
        self.assertEqual(manager.login("test_user", "password123"), "LOCKED")

    def test_login_non_existent_user(self):
        manager = LoginManager()
        with self.assertRaises(KeyError):
            manager.login("non_existent_user", "password123")

    def test_reset_password_valid(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        manager.reset_password("test_user", "new_password123")
        self.assertEqual(manager.users["test_user"], "new_password123")
        self.assertEqual(manager.failed_attempts["test_user"], 0)

    def test_reset_password_short_password(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        with self.assertRaises(ValueError):
            manager.reset_password("test_user", "short")

    def test_reset_password_non_existent_user(self):
        manager = LoginManager()
        with self.assertRaises(KeyError):
            manager.reset_password("non_existent_user", "new_password123")

    def test_get_status_locked_user(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        manager.login("test_user", "wrong")
        manager.login("test_user", "wrong")
        manager.login("test_user", "wrong")
        self.assertEqual(manager.get_status("test_user"), "LOCKED")

    def test_get_status_active_user(self):
        manager = LoginManager()
        manager.register_user("test_user", "password123")
        self.assertEqual(manager.get_status("test_user"), "ACTIVE")

    def test_get_status_non_existent_user(self):
        manager = LoginManager()
        self.assertEqual(manager.get_status("non_existent_user"), "NOT_FOUND")

    def test_max_attempts(self):
        manager = LoginManager(max_attempts=2)
        manager.register_user("test_user", "password123")
        manager.login("test_user", "wrong")
        manager.login("test_user", "wrong")
        self.assertEqual(manager.get_status("test_user"), "LOCKED")

if __name__ == "__main__":
    unittest.main()