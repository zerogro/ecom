package com.sambit.Ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sambit.Ecommerce.ApiResponse;
import com.sambit.Ecommerce.models.User;
import com.sambit.Ecommerce.services.AuthService;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User registeredUser = authService.register(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User user) {
        Optional<User> loggedInUser = authService.login(user.getEmail(), user.getPassword());
        
        if (loggedInUser.isPresent()) {
            // Return a JSON response for a successful login
            return ResponseEntity.ok(new ApiResponse("Login successful"));
        } else {
            // Return a JSON response for invalid credentials
            return ResponseEntity.status(401).body(new ApiResponse("Invalid credentials"));
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestParam String email) {
        User user = authService.getUserByEmail(email);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

}

