package chamba.backend.services;

import chamba.backend.dto.*;
import chamba.backend.models.User;
import chamba.backend.security.JwtUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import javax.sql.DataSource;

import java.sql.Connection;

@Service
public class AuthService {

    private final DataSource dataSource;

    private final JwtUtil jwtUtil;

    public AuthService(DataSource dataSource, JwtUtil jwtUtil) {
        this.dataSource = dataSource;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse getSession(HttpServletRequest request) {
        try {
            Cookie[] cookies = request.getCookies();

            if (cookies == null) return null;

            String token = null;

            for (Cookie cookie : cookies)
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }

            if (token == null) return null;

            Claims claims = jwtUtil.validate(token);

            return new LoginResponse(
                    true,
                    claims.get("id", String.class),
                    claims.getSubject(),
                    claims.get("role", String.class)
            );
        } catch (Exception e) {
            return null;
        }
    }

    public AuthResponse register(RegisterRequest req) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.registerUser(
                    conn,
                    req.getFullName(),
                    req.getUsername(),
                    req.getEmail(),
                    req.getBandRole(),
                    req.getPassword()
            );
        }
    }

    public LoginResponse login(LoginRequest req, HttpServletResponse response) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            User user = UserService.logInUser(
                    conn,
                    req.getCredential(),
                    req.getPassword()
            );

            if (user == null) {

                return new LoginResponse(
                        false,
                        null,
                        null,
                        null
                );
            }

            String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getUser_role());

            response.addCookie(CookieService.buildAuthCookie(token));

            return new LoginResponse(true, user.getId(), user.getUsername(), user.getUser_role());
        }
    }

    public void logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("token", "");

        cookie.setHttpOnly(true);

        cookie.setSecure(false);

        cookie.setPath("/");

        cookie.setMaxAge(0);

        response.addCookie(cookie);
    }
}