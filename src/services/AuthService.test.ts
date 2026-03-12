import './AuthService';

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
            expect(result.token).toBeDefined();
            expect(result.message).toBe('Login successful');
        });

        it('should return error when user does not exist', () => {
            const result = authService.login('nonExistentUser');
            expect(result.success).toBe(false);
            expect(result.message).toBe('User not found');
        });
    });

    describe('validateSession', () => {
        it('should return true when session is valid', () => {
            authService.register('testUser', 'test@example.com');
            const loginResult = authService.login('testUser');
            const result = authService.validateSession(loginResult.token);
            expect(result).toBe(true);
        });

        it('should return false when session is invalid', () => {
            const result = authService.validateSession('invalidToken');
            expect(result).toBe(false);
        });
    });

    describe('logout', () => {
        it('should return true when session is valid', () => {
            authService.register('testUser', 'test@example.com');
            const loginResult = authService.login('testUser');
            const result = authService.logout(loginResult.token);
            expect(result).toBe(true);
        });

        it('should return false when session is invalid', () => {
            const result = authService.logout('invalidToken');
            expect(result).toBe(false);
        });
    });

    describe('promoteUser', () => {
        it('should return true when user exists and code is correct', () => {
            authService.register('testUser', 'test@example.com');
            const result = authService.promoteUser('testUser', 'SECRET_SERVICE_KEY');
            expect(result).toBe(true);
            const user = authService.users.get('testUser');
            expect(user.role).toBe('admin');
        });

        it('should return false when user does not exist', () => {
            const result = authService.promoteUser('nonExistentUser', 'SECRET_SERVICE_KEY');
            expect(result).toBe(false);
        });

        it('should return false when code is incorrect', () => {
            authService.register('testUser', 'test@example.com');
            const result = authService.promoteUser('testUser', 'incorrectCode');
            expect(result).toBe(false);
        });
    });

    describe('resetUser', () => {
        it('should return true when user exists', () => {
            authService.register('testUser', 'test@example.com');
            const result = authService.resetUser('testUser');
            expect(result).toBe(true);
            expect(authService.users.has('testUser')).toBe(false);
        });

        it('should return false when user does not exist', () => {
            const result = authService.resetUser('nonExistentUser');
            expect(result).toBe(false);
        });
    });
});