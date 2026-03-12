import { AuthService } from './AuthService';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        service = new AuthService();
    });

    test('should register a new user', () => {
        const result = service.register('testuser', 'test@example.com');
        expect(result.success).toBe(true);
        expect(result.message).toBe("User registered successfully");
    });

    test('should fail if username is missing', () => {
        const result = service.register('', 'test@example.com');
        expect(result.success).toBe(false);
        expect(result.message).toBe("Username and email are required");
    });
});
