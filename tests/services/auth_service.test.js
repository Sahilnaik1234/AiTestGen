const AuthService = require('../../src/services/authorization_service');

describe('AuthService', () => {
    let authService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe('login', () => {
        it('should throw an error if username is missing', () => {
            expect(() => authService.login(null, 'password')).toThrowError('Username and password are required');
        });

        it('should throw an error if password is missing', () => {
            expect(() => authService.login('username', null)).toThrowError('Username and password are required');
        });

        it('should return success false if credentials are invalid', () => {
            const result = authService.login('invalid', 'password');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid credentials');
        });

        it('should return success true and a session id if credentials are valid', () => {
            const result = authService.login('admin', 'admin123');
            expect(result.success).toBe(true);
            expect(result.sessionId).not.toBeNull();
            expect(authService.isSessionValid(result.sessionId)).toBe(true);
        });
    });

    describe('logout', () => {
        it('should return false if session id is invalid', () => {
            expect(authService.logout('invalid')).toBe(false);
        });

        it('should return true and remove session if session id is valid', () => {
            const loginResult = authService.login('admin', 'admin123');
            expect(authService.logout(loginResult.sessionId)).toBe(true);
            expect(authService.isSessionValid(loginResult.sessionId)).toBe(false);
        });
    });

    describe('isSessionValid', () => {
        it('should return false if session id is invalid', () => {
            expect(authService.isSessionValid('invalid')).toBe(false);
        });

        it('should return true if session id is valid', () => {
            const loginResult = authService.login('admin', 'admin123');
            expect(authService.isSessionValid(loginResult.sessionId)).toBe(true);
        });
    });

    describe('getSessionUser', () => {
        it('should return null if session id is invalid', () => {
            expect(authService.getSessionUser('invalid')).toBeNull();
        });

        it('should return the username if session id is valid', () => {
            const loginResult = authService.login('admin', 'admin123');
            expect(authService.getSessionUser(loginResult.sessionId)).toBe('admin');
        });
    });
});