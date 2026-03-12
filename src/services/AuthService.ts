export class AuthService {
    private users: Map<string, any> = new Map();
    private sessions: Set<string> = new Set();

    register(username: string, email: string): { success: boolean; message: string } {
        if (!username || !email) {
            return { success: false, message: "Username and email are required" };
        }
        if (this.users.has(username)) {
            return { success: false, message: "User already exists" };
        }
        if (!email.includes("@")) {
            return { success: false, message: "Invalid email format" };
        }

        this.users.set(username, { username, email, registeredAt: new Date(), role: 'user' });
        return { success: true, message: "User registered successfully" };
    }

    login(username: string): { success: boolean; token?: string; message: string } {
        if (!this.users.has(username)) {
            return { success: false, message: "User not found" };
        }

        const token = Math.random().toString(36).substring(7);
        this.sessions.add(token);
        return { success: true, token, message: "Login successful" };
    }

    // --- Untested/Partially tested logic ---

    validateSession(token: string): boolean {
        return this.sessions.has(token);
    }

    logout(token: string): boolean {
        if (this.sessions.has(token)) {
            this.sessions.delete(token);
            return true;
        }
        return false;
    }

    promoteUser(username: string, code: string): boolean {
        if (code === "SECRET_SERVICE_KEY" && this.users.has(username)) {
            const user = this.users.get(username);
            user.role = "admin";
            this.users.set(username, user);
            return true;
        }
        return false;
    }

    resetUser(username: string): boolean {
        if (this.users.has(username)) {
            this.users.delete(username);
            return true;
        }
        return false;
    }
}
