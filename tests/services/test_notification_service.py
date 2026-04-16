import unittest
from notification_service import NotificationService
import time

class TestNotificationService(unittest.TestCase):

    def test_init(self):
        service = NotificationService()
        self.assertEqual(service.notifications, [])


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