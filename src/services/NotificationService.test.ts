import { NotificationService } from './NotificationService';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        service = new NotificationService();
    });

    // ~20% coverage: only tests send() basic case
    test('should send a notification and return it', () => {
        const notif = service.send('user-1', 'Hello!', 'email');
        expect(notif.userId).toBe('user-1');
        expect(notif.message).toBe('Hello!');
        expect(notif.read).toBe(false);
    });

    test('should throw if userId is missing', () => {
        expect(() => service.send('', 'Hello', 'email')).toThrow();
    });
});
