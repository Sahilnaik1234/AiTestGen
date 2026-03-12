import unittest
from user_manager import UserManager
import hashlib
import time
import re

class TestUserManager(unittest.TestCase):

    def test_create_user(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        success, message = manager.create_user(username, password, email)
        self.assertTrue(success)
        self.assertEqual(message, "User created successfully")
        self.assertIn(username, manager.users)

    def test_create_user_missing_fields(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = ""
        success, message = manager.create_user(username, password, email)
        self.assertFalse(success)
        self.assertEqual(message, "Missing fields")

    def test_create_user_user_already_exists(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        success, message = manager.create_user(username, password, email)
        self.assertFalse(success)
        self.assertEqual(message, "User already exists")

    def test_create_user_password_too_short(self):
        manager = UserManager()
        username = "test_user"
        password = "pass"
        email = "test@example.com"
        success, message = manager.create_user(username, password, email)
        self.assertFalse(success)
        self.assertEqual(message, "Password too short")

    def test_create_user_invalid_email(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "invalid_email"
        success, message = manager.create_user(username, password, email)
        self.assertFalse(success)
        self.assertEqual(message, "Invalid email")

    def test_login(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        success, message = manager.login(username, password)
        self.assertTrue(success)
        self.assertEqual(message, "Login successful")
        self.assertIn(username, manager.active_sessions)

    def test_login_user_not_found(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        success, message = manager.login(username, password)
        self.assertFalse(success)
        self.assertEqual(message, "User not found")

    def test_login_invalid_password(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        success, message = manager.login(username, "wrong_password")
        self.assertFalse(success)
        self.assertEqual(message, "Invalid password")

    def test_logout(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        manager.login(username, password)
        success = manager.logout(username)
        self.assertTrue(success)
        self.assertNotIn(username, manager.active_sessions)

    def test_logout_user_not_logged_in(self):
        manager = UserManager()
        username = "test_user"
        success = manager.logout(username)
        self.assertFalse(success)

    def test_get_user_email(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        user_email = manager.get_user_email(username)
        self.assertEqual(user_email, email)

    def test_get_user_email_user_not_found(self):
        manager = UserManager()
        username = "test_user"
        user_email = manager.get_user_email(username)
        self.assertIsNone(user_email)

    def test_update_password(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        new_password = "new_password123"
        success, message = manager.update_password(username, password, new_password)
        self.assertTrue(success)
        self.assertEqual(message, "Password updated")
        hashed_new_password = hashlib.sha256(new_password.encode()).hexdigest()
        self.assertEqual(manager.users[username]["password"], hashed_new_password)

    def test_update_password_user_not_found(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        new_password = "new_password123"
        success, message = manager.update_password(username, password, new_password)
        self.assertFalse(success)
        self.assertEqual(message, "User not found")

    def test_update_password_invalid_password(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        new_password = "short"
        success, message = manager.update_password(username, password, new_password)
        self.assertFalse(success)
        self.assertEqual(message, "New password too short")

    def test_set_admin(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        admin_secret = "SUPER_SECRET_123"
        success = manager.set_admin(username, admin_secret)
        self.assertTrue(success)
        self.assertEqual(manager.users[username]["role"], "admin")

    def test_set_admin_invalid_admin_secret(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        admin_secret = "wrong_secret"
        success = manager.set_admin(username, admin_secret)
        self.assertFalse(success)
        self.assertEqual(manager.users[username]["role"], "user")

    def test_disable_user(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        success = manager.disable_user(username)
        self.assertTrue(success)
        self.assertFalse(manager.users[username]["is_active"])

    def test_disable_user_user_not_found(self):
        manager = UserManager()
        username = "test_user"
        success = manager.disable_user(username)
        self.assertFalse(success)

    def test_get_all_active_users(self):
        manager = UserManager()
        username1 = "test_user1"
        password1 = "password123"
        email1 = "test1@example.com"
        manager.create_user(username1, password1, email1)
        username2 = "test_user2"
        password2 = "password123"
        email2 = "test2@example.com"
        manager.create_user(username2, password2, email2)
        manager.disable_user(username2)
        active_users = manager.get_all_active_users()
        self.assertIn(username1, active_users)
        self.assertNotIn(username2, active_users)

    def test_delete_account(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        success = manager.delete_account(username)
        self.assertTrue(success)
        self.assertNotIn(username, manager.users)

    def test_delete_account_user_not_found(self):
        manager = UserManager()
        username = "test_user"
        success = manager.delete_account(username)
        self.assertFalse(success)

    def test_find_users_by_email_domain(self):
        manager = UserManager()
        username1 = "test_user1"
        password1 = "password123"
        email1 = "test1@example.com"
        manager.create_user(username1, password1, email1)
        username2 = "test_user2"
        password2 = "password123"
        email2 = "test2@example.com"
        manager.create_user(username2, password2, email2)
        domain = "example.com"
        users = manager.find_users_by_email_domain(domain)
        self.assertIn(username1, users)
        self.assertIn(username2, users)

    def test_get_account_age_days(self):
        manager = UserManager()
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        manager.create_user(username, password, email)
        age_days = manager.get_account_age_days(username)
        self.assertGreaterEqual(age_days, 0)

    def test_get_account_age_days_user_not_found(self):
        manager = UserManager()
        username = "test_user"
        age_days = manager.get_account_age_days(username)
        self.assertEqual(age_days, -1)

    def test_bulk_create_users(self):
        manager = UserManager()
        users = [
            {"name": "test_user1", "pass": "password123", "email": "test1@example.com"},
            {"name": "test_user2", "pass": "password123", "email": "test2@example.com"},
        ]
        count = manager.bulk_create_users(users)
        self.assertEqual(count, 2)
        self.assertIn("test_user1", manager.users)
        self.assertIn("test_user2", manager.users)

if __name__ == '__main__':
    unittest.main()