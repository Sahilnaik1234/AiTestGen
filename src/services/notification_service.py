import time

class NotificationService:
    """
    NotificationService - Another python service to test dynamic AI Test Generation.
    """
    def __init__(self):
        self.notifications = []

    def send_notification(self, user_id: str, message: str, priority: str = "medium"):
        if not user_id:
            raise ValueError("User ID is required")
        if not message:
            raise ValueError("Message cannot be empty")
        
        notification = {
            "user_id": user_id,
            "message": message,
            "priority": priority,
            "timestamp": time.time()
        }
        
        self.notifications.append(notification)
        return True

    def get_user_notifications(self, user_id: str):
        return [n for n in self.notifications if n["user_id"] == user_id]

    def get_all_notifications(self):
        return self.notifications

    def clear_all(self):
        self.notifications = []
