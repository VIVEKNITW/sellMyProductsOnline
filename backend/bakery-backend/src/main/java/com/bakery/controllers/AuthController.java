package com.bakery.controllers;

import com.bakery.models.User;
import com.bakery.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setRole("USER");
        return userRepo.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User found = userRepo.findByUsername(user.getUsername());
        if (found != null && found.getPassword().equals(user.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }
}
