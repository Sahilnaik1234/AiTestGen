import pytest
from user_manager import UserManager

@pytest.fixture
def user_manager():
    return UserManager()

def test_create_user_success(user_manager):
    success, message = user_manager.create_user("testuser", "password123", "test@example.com")
    assert success is True
    assert message == "User created successfully"

def test_create_user_invalid_email(user_manager):
    success, message = user_manager.create_user("testuser", "password123", "invalid-email")
    assert success is False
    assert message == "Invalid email"

def test_login_success(user_manager):
    user_manager.create_user("testuser", "password123", "test@example.com")
    success, message = user_manager.login("testuser", "password123")
    assert success is True
    assert message == "Login successful"
    assert "testuser" in user_manager.active_sessions

def test_login_failure(user_manager):
    user_manager.create_user("testuser", "password123", "test@example.com")
    success, message = user_manager.login("testuser", "wrongpassword")
    assert success is False
    assert message == "Invalid password"

def test_logout(user_manager):
    user_manager.create_user("testuser", "password123", "test@example.com")
    user_manager.login("testuser", "password123")
    assert user_manager.logout("testuser") is True
    assert "testuser" not in user_manager.active_sessions
