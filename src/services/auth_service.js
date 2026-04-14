/**
 * AuthService - A simple JavaScript service to test dynamic AI Test Generation.
 */
class AuthService {
    constructor() {
        this.sessions = new Map();
    }

    login(username, password) {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        // Mock authentication logic
        if (username === 'admin' && password === 'admin123') {
            const sessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;
            this.sessions.set(sessionId, { username, createdAt: new Date() });
            return { success: true, sessionId };
        }

        return { success: false, message: 'Invalid credentials' };
    }

    logout(sessionId) {
        if (this.sessions.has(sessionId)) {
            this.sessions.delete(sessionId);
            return true;
        }
        return false;
    }

    isSessionValid(sessionId) {
        return this.sessions.has(sessionId);
    }

    getSessionUser(sessionId) {
        const session = this.sessions.get(sessionId);
        return session ? session.username : null;
    }
}

module.exports = AuthService;
