import { NotificationService, Notification } from './NotificationService';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        service = new NotificationService();
    });



    describe('markAllAsRead', () => {
        it('should return 0 if the user has no notifications', () => {
            expect(service.markAllAsRead('userId')).toBe(0);
        });

        it('should mark all notifications as read', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            expect(service.markAllAsRead('userId')).toBe(2);
            expect(service.getUnread('userId')).toEqual([]);
        });
    });

    describe('deleteNotification', () => {
        it('should return false if the user has no notifications', () => {
            expect(service.deleteNotification('userId', 'notifId')).toBe(false);
        });

        it('should return false if the notification does not exist', () => {
            service.send('userId', 'message', 'email');
            expect(service.deleteNotification('userId', 'wrongNotifId')).toBe(false);
        });

        it('should delete the notification', () => {
            const notification = service.send('userId', 'message', 'email');
            service.deleteNotification('userId', notification.id);
            expect(service.getAll('userId')).toEqual([]);
        });
    });

    describe('countByType', () => {
        it('should return 0 if the user has no notifications', () => {
            expect(service.countByType('userId', 'email')).toBe(0);
        });

        it('should count notifications by type', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'sms');
            expect(service.countByType('userId', 'email')).toBe(1);
            expect(service.countByType('userId', 'sms')).toBe(1);
        });
    });
});