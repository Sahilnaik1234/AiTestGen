const { AuthService } = require('../../src/services/auth_service');

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

        it('should generate a unique session id for each login', () => {
            const result1 = authService.login('admin', 'admin123');
            const result2 = authService.login('admin', 'admin123');
            expect(result1.sessionId).not.toBe(result2.sessionId);
        });

        it('should store the session with the current date', () => {
            const result = authService.login('admin', 'admin123');
            const session = authService.sessions.get(result.sessionId);
            expect(session.createdAt).toBeInstanceOf(Date);
        });

        it('should handle multiple logins with the same credentials', () => {
            const result1 = authService.login('admin', 'admin123');
            const result2 = authService.login('admin', 'admin123');
            expect(authService.isSessionValid(result1.sessionId)).toBe(true);
            expect(authService.isSessionValid(result2.sessionId)).toBe(true);
        });

        it('should handle login with empty string username', () => {
            expect(() => authService.login('', 'password')).toThrowError('Username and password are required');
        });

        it('should handle login with empty string password', () => {
            expect(() => authService.login('username', '')).toThrowError('Username and password are required');
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

        it('should not throw an error if session id is missing', () => {
            expect(() => authService.logout(null)).not.toThrow();
            expect(authService.logout(null)).toBe(false);
        });

        it('should handle logout of multiple sessions', () => {
            const loginResult1 = authService.login('admin', 'admin123');
            const loginResult2 = authService.login('admin', 'admin123');
            expect(authService.logout(loginResult1.sessionId)).toBe(true);
            expect(authService.logout(loginResult2.sessionId)).toBe(true);
            expect(authService.isSessionValid(loginResult1.sessionId)).toBe(false);
            expect(authService.isSessionValid(loginResult2.sessionId)).toBe(false);
        });

        it('should handle logout with empty string session id', () => {
            expect(authService.logout('')).toBe(false);
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

        it('should return false if session id is null', () => {
            expect(authService.isSessionValid(null)).toBe(false);
        });

        it('should handle multiple valid sessions', () => {
            const loginResult1 = authService.login('admin', 'admin123');
            const loginResult2 = authService.login('admin', 'admin123');
            expect(authService.isSessionValid(loginResult1.sessionId)).toBe(true);
            expect(authService.isSessionValid(loginResult2.sessionId)).toBe(true);
        });

        it('should handle isSessionValid with empty string session id', () => {
            expect(authService.isSessionValid('')).toBe(false);
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

        it('should return null if session id is null', () => {
            expect(authService.getSessionUser(null)).toBeNull();
        });

        it('should handle multiple valid sessions', () => {
            const loginResult1 = authService.login('admin', 'admin123');
            const loginResult2 = authService.login('admin', 'admin123');
            expect(authService.getSessionUser(loginResult1.sessionId)).toBe('admin');
            expect(authService.getSessionUser(loginResult2.sessionId)).toBe('admin');
        });

        it('should handle getSessionUser with empty string session id', () => {
            expect(authService.getSessionUser('')).toBeNull();
        });
    });
});