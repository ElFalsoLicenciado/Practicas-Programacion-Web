package chamba.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;
    private String username;
    private String email;
    private String bandRole;
    private String password;
}