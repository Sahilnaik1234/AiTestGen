import unittest
from user_manager import UserManager
import hashlib
import time
import re

class TestUserManager(unittest.TestCase):

    def setUp(self):
        self.user_manager = UserManager()

    def test_create_user(self):
        # Test with valid input
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        success, message = self.user_manager.create_user(username, password, email)
        self.assertTrue(success)
        self.assertEqual(message, "User created successfully")

        # Test with missing fields
        success, message = self.user_manager.create_user("", password, email)
        self.assertFalse(success)
        self.assertEqual(message, "Missing fields")

        # Test with existing user
        success, message = self.user_manager.create_user(username, password, email)
        self.assertFalse(success)
        self.assertEqual(message, "User already exists")

        # Test with short password
        success, message = self.user_manager.create_user("new_user", "short", email)
        self.assertFalse(success)
        self.assertEqual(message, "Password too short")

        # Test with invalid email
        success, message = self.user_manager.create_user("new_user", password, "invalid_email")
        self.assertFalse(success)
        self.assertEqual(message, "Invalid email")

    def test_login(self):
        # Test with valid input
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        success, message = self.user_manager.login(username, password)
        self.assertTrue(success)
        self.assertEqual(message, "Login successful")

        # Test with non-existent user
        success, message = self.user_manager.login("non_existent_user", password)
        self.assertFalse(success)
        self.assertEqual(message, "User not found")

        # Test with incorrect password
        success, message = self.user_manager.login(username, "wrong_password")
        self.assertFalse(success)
        self.assertEqual(message, "Invalid password")

    def test_logout(self):
        # Test with logged-in user
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        self.user_manager.login(username, password)
        success = self.user_manager.logout(username)
        self.assertTrue(success)

        # Test with logged-out user
        success = self.user_manager.logout(username)
        self.assertFalse(success)

    def test_get_user_email(self):
        # Test with existing user
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        user_email = self.user_manager.get_user_email(username)
        self.assertEqual(user_email, email)

        # Test with non-existent user
        user_email = self.user_manager.get_user_email("non_existent_user")
        self.assertIsNone(user_email)

    def test_update_password(self):
        # Test with valid input
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        new_password = "new_password123"
        success, message = self.user_manager.update_password(username, password, new_password)
        self.assertTrue(success)
        self.assertEqual(message, "Password updated")

        # Test with incorrect old password
        success, message = self.user_manager.update_password(username, "wrong_password", new_password)
        self.assertFalse(success)
        self.assertEqual(message, "Invalid password")

        # Test with short new password
        success, message = self.user_manager.update_password(username, new_password, "short")
        self.assertFalse(success)
        self.assertEqual(message, "New password too short")

    def test_set_admin(self):
        # Test with valid input
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        admin_secret = "SUPER_SECRET_123"
        success = self.user_manager.set_admin(username, admin_secret)
        self.assertTrue(success)

        # Test with invalid admin secret
        success = self.user_manager.set_admin(username, "wrong_secret")
        self.assertFalse(success)

        # Test with non-existent user
        success = self.user_manager.set_admin("non_existent_user", admin_secret)
        self.assertFalse(success)

    def test_disable_user(self):
        # Test with existing user
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        success = self.user_manager.disable_user(username)
        self.assertTrue(success)

        # Test with non-existent user
        success = self.user_manager.disable_user("non_existent_user")
        self.assertFalse(success)

    def test_get_all_active_users(self):
        # Test with active users
        username1 = "test_user1"
        password1 = "password123"
        email1 = "test1@example.com"
        self.user_manager.create_user(username1, password1, email1)
        username2 = "test_user2"
        password2 = "password123"
        email2 = "test2@example.com"
        self.user_manager.create_user(username2, password2, email2)
        active_users = self.user_manager.get_all_active_users()
        self.assertIn(username1, active_users)
        self.assertIn(username2, active_users)

        # Test with disabled user
        self.user_manager.disable_user(username1)
        active_users = self.user_manager.get_all_active_users()
        self.assertNotIn(username1, active_users)
        self.assertIn(username2, active_users)

    def test_delete_account(self):
        # Test with existing user
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        success = self.user_manager.delete_account(username)
        self.assertTrue(success)

        # Test with non-existent user
        success = self.user_manager.delete_account("non_existent_user")
        self.assertFalse(success)

    def test_find_users_by_email_domain(self):
        # Test with existing users
        username1 = "test_user1"
        password1 = "password123"
        email1 = "test1@example.com"
        self.user_manager.create_user(username1, password1, email1)
        username2 = "test_user2"
        password2 = "password123"
        email2 = "test2@example.com"
        self.user_manager.create_user(username2, password2, email2)
        domain = "example.com"
        users = self.user_manager.find_users_by_email_domain(domain)
        self.assertIn(username1, users)
        self.assertIn(username2, users)

        # Test with non-existent domain
        domain = "non_existent_domain.com"
        users = self.user_manager.find_users_by_email_domain(domain)
        self.assertEqual(users, [])

    def test_get_account_age_days(self):
        # Test with existing user
        username = "test_user"
        password = "password123"
        email = "test@example.com"
        self.user_manager.create_user(username, password, email)
        age = self.user_manager.get_account_age_days(username)
        self.assertGreaterEqual(age, 0)

        # Test with non-existent user
        age = self.user_manager.get_account_age_days("non_existent_user")
        self.assertEqual(age, -1)

    def test_bulk_create_users(self):
        # Test with valid input
        users = [
            {"name": "test_user1", "pass": "password123", "email": "test1@example.com"},
            {"name": "test_user2", "pass": "password123", "email": "test2@example.com"}
        ]
        count = self.user_manager.bulk_create_users(users)
        self.assertEqual(count, 2)

        # Test with invalid input
        users = [
            {"name": "", "pass": "password123", "email": "test1@example.com"},
            {"name": "test_user2", "pass": "password123", "email": "test2@example.com"}
        ]
        count = self.user_manager.bulk_create_users(users)
        self.assertEqual(count, 1)

if __name__ == '__main__':
    unittest.main()