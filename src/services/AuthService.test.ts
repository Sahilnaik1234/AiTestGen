import { AuthService } from './AuthService';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe('register', () => {
        it('should return success when username and email are provided', () => {
            const result = authService.register('testUser', 'test@example.com');
            expect(result.success).toBe(true);
            expect(result.message).toBe('User registered successfully');
        });

        it('should return error when username is missing', () => {
            const result = authService.register('', 'test@example.com');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username and email are required');
        });

        it('should return error when email is missing', () => {
            const result = authService.register('testUser', '');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username and email are required');
        });

        it('should return error when user already exists', () => {
            authService.register('testUser', 'test@example.com');
            const result = authService.register('testUser', 'test@example.com');
            expect(result.success).toBe(false);
            expect(result.message).toBe('User already exists');
        });

        it('should return error when email format is invalid', () => {
            const result = authService.register('testUser', 'invalidEmail');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid email format');
        });
    });

    describe('login', () => {
        it('should return success when user exists', () => {
            authService.register('testUser', 'test@example.com');
            const result = authService.login('testUser');
            expect(result.success).toBe(true);
            expect(result.token).not.toBeNull();
            expect(result.message).toBe('Login successful');
        });

        it('should return error when user does not exist', () => {
            const result = authService.login('nonExistentUser');
            expect(result.success).toBe(false);
            expect(result.message).toBe('User not found');
        });
    });

});