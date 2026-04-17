import unittest
from LoginManager import LoginManager

class TestLoginManager(unittest.TestCase):

    def test_init(self):
        manager = LoginManager()
        self.assertEqual(manager.users, {})
        self.assertEqual(manager.failed_attempts, {})
        self.assertEqual(manager.locked_users, set())
        self.assertEqual(manager.max_attempts, 3)

    def test_register_user(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        self.assertIn("test", manager.users)
        self.assertIn("test", manager.failed_attempts)
        self.assertEqual(manager.users["test"], "password123")
        self.assertEqual(manager.failed_attempts["test"], 0)

    def test_register_user_empty_username(self):
        manager = LoginManager()
        with self.assertRaises(ValueError):
            manager.register_user("", "password123")

    def test_register_user_empty_password(self):
        manager = LoginManager()
        with self.assertRaises(ValueError):
            manager.register_user("test", "")

    def test_register_user_short_password(self):
        manager = LoginManager()
        with self.assertRaises(ValueError):
            manager.register_user("test", "pass")

    def test_register_user_duplicate_username(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        with self.assertRaises(ValueError):
            manager.register_user("test", "password123")

    def test_login(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        self.assertEqual(manager.login("test", "password123"), "SUCCESS")

    def test_login_wrong_password(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        self.assertEqual(manager.login("test", "wrong"), "FAILED")

    def test_login_locked(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        manager.login("test", "wrong")
        manager.login("test", "wrong")
        manager.login("test", "wrong")
        self.assertEqual(manager.login("test", "password123"), "LOCKED")

    def test_login_non_existent_user(self):
        manager = LoginManager()
        with self.assertRaises(KeyError):
            manager.login("test", "password123")

    def test_reset_password(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        manager.reset_password("test", "newpass123")
        self.assertEqual(manager.users["test"], "newpass123")
        self.assertEqual(manager.failed_attempts["test"], 0)

    def test_reset_password_non_existent_user(self):
        manager = LoginManager()
        with self.assertRaises(KeyError):
            manager.reset_password("test", "newpass123")

    def test_reset_password_short_password(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        with self.assertRaises(ValueError):
            manager.reset_password("test", "pass")

    def test_get_status(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        self.assertEqual(manager.get_status("test"), "ACTIVE")

    def test_get_status_locked(self):
        manager = LoginManager()
        manager.register_user("test", "password123")
        manager.login("test", "wrong")
        manager.login("test", "wrong")
        manager.login("test", "wrong")
        self.assertEqual(manager.get_status("test"), "LOCKED")

    def test_get_status_non_existent_user(self):
        manager = LoginManager()
        self.assertEqual(manager.get_status("test"), "NOT_FOUND")

if __name__ == "__main__":
    unittest.main()