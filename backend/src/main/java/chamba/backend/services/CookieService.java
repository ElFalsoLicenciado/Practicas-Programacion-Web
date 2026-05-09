package chamba.backend.services;

import jakarta.servlet.http.Cookie;

public class CookieService {

    public static Cookie buildAuthCookie(String token) {

        Cookie cookie = new Cookie("token", token);

        cookie.setHttpOnly(true);

        cookie.setSecure(false);

        cookie.setPath("/");

        cookie.setMaxAge(60 * 60 * 24);

        return cookie;
    }
}