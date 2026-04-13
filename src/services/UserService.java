package com.aitestgen.services;

import java.util.*;
import java.util.regex.Pattern;

/**
 * UserService - A new service to test dynamic AI Test Generation.
 */
public class UserService {

    private final Map<String, User> userDatabase = new HashMap<>();
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    public User registerUser(String username, String email, String password) {
        if (username == null || username.length() < 3) {
            throw new IllegalArgumentException("Username must be at least 3 characters");
        }
        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
        if (userDatabase.containsKey(username)) {
            throw new IllegalStateException("User already exists");
        }

        User newUser = new User(username, email, hashPassword(password));
        userDatabase.put(username, newUser);
        return newUser;
    }

    public boolean authenticate(String username, String password) {
        User user = userDatabase.get(username);
        if (user == null) return false;
        return user.getPasswordHash().equals(hashPassword(password));
    }

    public void updateEmail(String username, String newEmail) {
        User user = userDatabase.get(username);
        if (user == null) throw new NoSuchElementException("User not found");
        
        if (newEmail == null || !EMAIL_PATTERN.matcher(newEmail).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
        user.setEmail(newEmail);
    }

    private String hashPassword(String password) {
        // Simple mock hashing for demonstration
        return "HASHED_" + password + "_SALT";
    }

    public static class User {
        private String username;
        private String email;
        private String passwordHash;

        public User(String username, String email, String passwordHash) {
            this.username = username;
            this.email = email;
            this.passwordHash = passwordHash;
        }

        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPasswordHash() { return passwordHash; }
    }
}
