package chamba.backend.dto;

public class AuthResponse {

    private boolean success;
    private String id;
    private String username;
    private String role;

    public AuthResponse(
            boolean success,
            String id,
            String username,
            String role
    ) {
        this.success = success;
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}