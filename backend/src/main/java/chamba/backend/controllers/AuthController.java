package chamba.backend.controllers;

import chamba.backend.dto.*;
import chamba.backend.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public LoginResponse me(HttpServletRequest request) {
        return authService.getSession(request);
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) throws Exception {

        return authService.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req,HttpServletResponse response) throws Exception {

        return authService.login(req, response);
    }

    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {

        authService.logout(response);
    }
}