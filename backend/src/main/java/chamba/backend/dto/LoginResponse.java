package chamba.backend.dto;

public class LoginResponse {

    private boolean success;
    private String id;
    private String username;
    private String role;

    public LoginResponse() {}

    public LoginResponse(boolean success, String id, String username, String role) {
        this.success = success;
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}