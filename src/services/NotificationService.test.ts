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

        it('should mark all notifications as read when there are multiple types', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'sms');
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

        it('should delete the notification when there are multiple notifications', () => {
            const notification1 = service.send('userId', 'message1', 'email');
            const notification2 = service.send('userId', 'message2', 'email');
            service.deleteNotification('userId', notification1.id);
            expect(service.getAll('userId')).toEqual([notification2]);
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

        it('should count notifications by type when there are multiple notifications of the same type', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            expect(service.countByType('userId', 'email')).toBe(2);
        });
    });

    describe('send', () => {
        it('should throw an error if userId is missing', () => {
            expect(() => service.send('', 'message', 'email')).toThrowError('userId and message are required');
        });

        it('should throw an error if message is missing', () => {
            expect(() => service.send('userId', '', 'email')).toThrowError('userId and message are required');
        });

        it('should create a new notification', () => {
            const notification = service.send('userId', 'message', 'email');
            expect(notification).toHaveProperty('id');
            expect(notification).toHaveProperty('userId', 'userId');
            expect(notification).toHaveProperty('message', 'message');
            expect(notification).toHaveProperty('type', 'email');
            expect(notification).toHaveProperty('read', false);
            expect(notification).toHaveProperty('createdAt');
        });
    });

    describe('getUnread', () => {
        it('should return an empty array if the user has no notifications', () => {
            expect(service.getUnread('userId')).toEqual([]);
        });

        it('should return an array of unread notifications', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            expect(service.getUnread('userId')).toEqual([
                { id: expect.any(String), userId: 'userId', message: 'message1', type: 'email', read: false, createdAt: expect.any(Date) },
                { id: expect.any(String), userId: 'userId', message: 'message2', type: 'email', read: false, createdAt: expect.any(Date) },
            ]);
        });

        it('should return an empty array if all notifications are read', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            service.markAllAsRead('userId');
            expect(service.getUnread('userId')).toEqual([]);
        });
    });

    describe('getAll', () => {
        it('should return an empty array if the user has no notifications', () => {
            expect(service.getAll('userId')).toEqual([]);
        });

        it('should return an array of all notifications', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            expect(service.getAll('userId')).toEqual([
                { id: expect.any(String), userId: 'userId', message: 'message1', type: 'email', read: false, createdAt: expect.any(Date) },
                { id: expect.any(String), userId: 'userId', message: 'message2', type: 'email', read: false, createdAt: expect.any(Date) },
            ]);
        });
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