
import { AuthService } from './AuthService';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe('register', () => {
        it('should return success false when username is empty', () => {
            const result = authService.register('', 'test@example.com');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username and email are required');
        });

        it('should return success false when email is empty', () => {
            const result = authService.register('testUser', '');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username and email are required');
        });

        it('should return success false when user already exists', () => {
            authService.register('testUser', 'test@example.com');
            const result = authService.register('testUser', 'test@example.com');
            expect(result.success).toBe(false);
            expect(result.message).toBe('User already exists');
        });

        it('should return success false when email format is invalid', () => {
            const result = authService.register('testUser', 'invalidEmail');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid email format');
        });

        it('should return success true when registration is successful', () => {
            const result = authService.register('testUser', 'test@example.com');
            expect(result.success).toBe(true);
            expect(result.message).toBe('User registered successfully');
        });
    });



    describe('validateSession', () => {
        it('should return false when token is invalid', () => {
            const result = authService.validateSession('invalidToken');
            expect(result).toBe(false);
        });

        it('should return true when token is valid', () => {
            authService.register('testUser', 'test@example.com');
            const loginResult = authService.login('testUser');
            const result = authService.validateSession(loginResult.token as string);
            expect(result).toBe(true);
        });
    });

    describe('logout', () => {
        it('should return false when token is invalid', () => {
            const result = authService.logout('invalidToken');
            expect(result).toBe(false);
        });

        it('should return true when logout is successful', () => {
            authService.register('testUser', 'test@example.com');
            const loginResult = authService.login('testUser');
            const result = authService.logout(loginResult.token as string);
            expect(result).toBe(true);
        });
    });

});