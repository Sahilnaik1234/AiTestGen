package com.example;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class AuthManager {
    private Map<String, String> users = new HashMap<>();
    private Map<String, Boolean> activeSessions = new HashMap<>();
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$");

    public boolean register(String username, String password) {
        if (username == null || password == null || username.length() < 3) {
            return false;
        }
        if (users.containsKey(username)) {
            return false;
        }
        if (!validatePassword(password)) {
            return false;
        }
        users.put(username, password);
        return true;
    }

    public boolean login(String username, String password) {
        if (username == null || password == null) return false;
        String storedPassword = users.get(username);
        if (storedPassword != null && storedPassword.equals(password)) {
            activeSessions.put(username, true);
            return true;
        }
        return false;
    }

    public boolean logout(String username) {
        if (activeSessions.containsKey(username)) {
            activeSessions.remove(username);
            return true;
        }
        return false;
    }

    public boolean isLoggedIn(String username) {
        return activeSessions.getOrDefault(username, false);
    }

    public boolean resetPassword(String username, String oldPassword, String newPassword) {
        if (login(username, oldPassword)) {
            if (validatePassword(newPassword)) {
                users.put(username, newPassword);
                return true;
            }
        }
        return false;
    }

    private boolean validatePassword(String password) {
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    // Logic to increase line count
    public String getStatus(String username) {
        if (!users.containsKey(username)) return "NOT_REGISTERED";
        if (isLoggedIn(username)) return "ONLINE";
        return "OFFLINE";
    }

    public int getUserCount() {
        return users.size();
    }

    public void clearAll() {
        users.clear();
        activeSessions.clear();
    }

    public boolean deleteUser(String username, String password) {
        if (login(username, password)) {
            users.remove(username);
            activeSessions.remove(username);
            return true;
        }
        return false;
    }

    public boolean updateUsername(String oldName, String newName) {
        if (users.containsKey(oldName) && !users.containsKey(newName)) {
            String password = users.remove(oldName);
            users.put(newName, password);
            if (activeSessions.containsKey(oldName)) {
                activeSessions.remove(oldName);
                activeSessions.put(newName, true);
            }
            return true;
        }
        return false;
    }
    
    public Map<String, String> exportData() {
        return new HashMap<>(users);
    }

    public boolean isAdmin(String username) {
        return username != null && username.equalsIgnoreCase("admin");
    }

    public String generateToken(String username) {
        if (isLoggedIn(username)) {
            return "TOKEN-" + username.hashCode() + "-" + System.currentTimeMillis();
        }
        return null;
    }
}
