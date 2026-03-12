import { NotificationService, Notification } from './NotificationService';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        service = new NotificationService();
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

        it('should add the notification to the user\'s list', () => {
            service.send('userId', 'message', 'email');
            expect(service.getAll('userId')).toHaveLength(1);
        });
    });

    describe('getUnread', () => {
        it('should return an empty array if there are no notifications', () => {
            expect(service.getUnread('userId')).toEqual([]);
        });

        it('should return only unread notifications', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            service.markAsRead('userId', service.getAll('userId')[0].id);
            expect(service.getUnread('userId')).toHaveLength(1);
        });
    });

    describe('getAll', () => {
        it('should return an empty array if there are no notifications', () => {
            expect(service.getAll('userId')).toEqual([]);
        });

        it('should return all notifications for the user', () => {
            service.send('userId', 'message1', 'email');
            service.send('userId', 'message2', 'email');
            expect(service.getAll('userId')).toHaveLength(2);
        });
    });

    describe('markAsRead', () => {
        it('should return false if the user has no notifications', () => {
            expect(service.markAsRead('userId', 'notifId')).toBe(false);
        });

        it('should return false if the notification does not exist', () => {
            service.send('userId', 'message', 'email');
            expect(service.markAsRead('userId', 'non-existent-id')).toBe(false);
        });

        it('should mark the notification as read', () => {
            const notification = service.send('userId', 'message', 'email');
            service.markAsRead('userId', notification.id);
            expect(service.getUnread('userId')).toEqual([]);
        });
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
            expect(service.deleteNotification('userId', 'non-existent-id')).toBe(false);
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