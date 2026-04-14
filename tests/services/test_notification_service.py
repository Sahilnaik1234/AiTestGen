import unittest
from notification_service import NotificationService
import time

class TestNotificationService(unittest.TestCase):

    def test_init(self):
        service = NotificationService()
        self.assertEqual(service.notifications, [])

    def test_send_notification(self):
        service = NotificationService()
        user_id = "test_user"
        message = "Hello, world!"
        priority = "high"
        result = service.send_notification(user_id, message, priority)
        self.assertTrue(result)
        self.assertEqual(len(service.notifications), 1)
        notification = service.notifications[0]
        self.assertEqual(notification["user_id"], user_id)
        self.assertEqual(notification["message"], message)
        self.assertEqual(notification["priority"], priority)
        self.assertGreaterEqual(notification["timestamp"], time.time() - 1)

    def test_send_notification_default_priority(self):
        service = NotificationService()
        user_id = "test_user"
        message = "Hello, world!"
        result = service.send_notification(user_id, message)
        self.assertTrue(result)
        self.assertEqual(len(service.notifications), 1)
        notification = service.notifications[0]
        self.assertEqual(notification["user_id"], user_id)
        self.assertEqual(notification["message"], message)
        self.assertEqual(notification["priority"], "medium")
        self.assertGreaterEqual(notification["timestamp"], time.time() - 1)

    def test_send_notification_empty_user_id(self):
        service = NotificationService()
        user_id = ""
        message = "Hello, world!"
        with self.assertRaises(ValueError):
            service.send_notification(user_id, message)

    def test_send_notification_empty_message(self):
        service = NotificationService()
        user_id = "test_user"
        message = ""
        with self.assertRaises(ValueError):
            service.send_notification(user_id, message)

    def test_get_user_notifications(self):
        service = NotificationService()
        user_id = "test_user"
        message = "Hello, world!"
        service.send_notification(user_id, message)
        notifications = service.get_user_notifications(user_id)
        self.assertEqual(len(notifications), 1)
        notification = notifications[0]
        self.assertEqual(notification["user_id"], user_id)
        self.assertEqual(notification["message"], message)

    def test_get_user_notifications_no_notifications(self):
        service = NotificationService()
        user_id = "test_user"
        notifications = service.get_user_notifications(user_id)
        self.assertEqual(notifications, [])

    def test_get_all_notifications(self):
        service = NotificationService()
        user_id = "test_user"
        message = "Hello, world!"
        service.send_notification(user_id, message)
        notifications = service.get_all_notifications()
        self.assertEqual(len(notifications), 1)
        notification = notifications[0]
        self.assertEqual(notification["user_id"], user_id)
        self.assertEqual(notification["message"], message)

    def test_get_all_notifications_no_notifications(self):
        service = NotificationService()
        notifications = service.get_all_notifications()
        self.assertEqual(notifications, [])

    def test_clear_all(self):
        service = NotificationService()
        user_id = "test_user"
        message = "Hello, world!"
        service.send_notification(user_id, message)
        service.clear_all()
        notifications = service.get_all_notifications()
        self.assertEqual(notifications, [])

if __name__ == '__main__':
    unittest.main()