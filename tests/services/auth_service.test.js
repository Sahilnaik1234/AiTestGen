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
    });
});