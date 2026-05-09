package chamba.backend.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Crypto {

    private static final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public static String encrypt(String text) {
        return encoder.encode(text);
    }

    public static boolean verify(String text, String hash) {
        return encoder.matches(text, hash);
    }
}