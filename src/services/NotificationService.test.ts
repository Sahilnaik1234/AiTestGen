import { NotificationService, Notification } from './NotificationService';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        service = new NotificationService();
    });


    describe('markAsRead', () => {
        it('should return false if the user has no notifications', () => {
            expect(service.markAsRead('userId', 'notifId')).toBe(false);
        });

        it('should return false if the notification does not exist', () => {
            service.send('userId', 'message', 'email');
            expect(service.markAsRead('userId', 'wrongNotifId')).toBe(false);
        });

        it('should mark the notification as read', () => {
            const notification = service.send('userId', 'message', 'email');
            service.markAsRead('userId', notification.id);
            expect(service.getUnread('userId')).toEqual([]);
        });
    });
});