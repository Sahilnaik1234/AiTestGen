
class LoginManager:
    def __init__(self, max_attempts=3):
        self.users = {}  # username -> password
        self.failed_attempts = {}  # username -> count
        self.locked_users = set()
        self.max_attempts = max_attempts

    def register_user(self, username, password):
        if not username or not password:
            raise ValueError("Username and password required")

        if username in self.users:
            raise ValueError("User already exists")

        if len(password) < 6:
            raise ValueError("Password too short")

        self.users[username] = password
        self.failed_attempts[username] = 0

    def login(self, username, password):
        if username in self.locked_users:
            return "LOCKED"

        if username not in self.users:
            raise KeyError("User not found")

        if self.users[username] == password:
            self.failed_attempts[username] = 0
            return "SUCCESS"

        self.failed_attempts[username] += 1

        if self.failed_attempts[username] >= self.max_attempts:
            self.locked_users.add(username)
            return "LOCKED"

        return "FAILED"

    def reset_password(self, username, new_password):
        if username not in self.users:
            raise KeyError("User not found")

        if len(new_password) < 6:
            raise ValueError("Password too short")

        self.users[username] = new_password
        self.failed_attempts[username] = 0
        if username in self.locked_users:
            self.locked_users.remove(username)

    def get_status(self, username):
        if username in self.locked_users:
            return "LOCKED"
        if username in self.users:
            return "ACTIVE"
        return "NOT_FOUND"


def main():
    manager = LoginManager()

    manager.register_user("sahil", "password123")

    print(manager.login("sahil", "wrong"))
    print(manager.login("sahil", "wrong"))
    print(manager.login("sahil", "wrong"))  # should lock

    print(manager.get_status("sahil"))

    manager.reset_password("sahil", "newpass123")
    print(manager.login("sahil", "newpass123"))


if __name__ == "__main__":
    main()
