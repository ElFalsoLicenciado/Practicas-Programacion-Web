package chamba.backend.controllers;

import chamba.backend.dto.*;
import chamba.backend.models.User;
import chamba.backend.models.UsersDisplay;
import chamba.backend.services.UserService;

import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;

import java.sql.Connection;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final DataSource dataSource;

    public UserController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) throws Exception {

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

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req ) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            User user = UserService.logInUser(conn, req.getCredential(), req.getPassword() );

            if (user == null) {

                return new LoginResponse(false, null, null, null);
            }

            return new LoginResponse(true, user.getId(), user.getUsername(), user.getUser_role());
        }
    }

    @PostMapping("/admin/add")
    public int addUser(@RequestBody AdminUserRequest req) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.addUser(
                    conn,
                    req.getUserRole(),
                    req.getFullName(),
                    req.getUsername(),
                    req.getEmail(),
                    req.getBandRole(),
                    req.getPassword()
            );
        }
    }

    @PutMapping("/{id}")
    public int updateUser( @PathVariable String id, @RequestBody AdminUserRequest req ) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.updateUser(
                    conn,
                    id,
                    req.getUserRole(),
                    req.getFullName(),
                    req.getUsername(),
                    req.getEmail(),
                    req.getBandRole(),
                    req.getPassword()
            );
        }
    }

    @DeleteMapping("/{id}")
    public int deleteUser(@PathVariable String id) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.deleteUser(conn, id);
        }
    }



    @GetMapping("/{id}")
    public User getUser(@PathVariable String id) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.getUserById(conn, id);
        }
    }

    @GetMapping
    public ArrayList<UsersDisplay> getUsers() throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.displayUsers(conn);
        }
    }

    @GetMapping("/exists/username/{username}")
    public boolean usernameExists(@PathVariable String username) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.usernameExists(conn, username);
        }
    }

    @GetMapping("/exists/email/{email}")
    public boolean emailExists(@PathVariable String email) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return UserService.emailExists(conn, email);
        }
    }

    @GetMapping("/role/{user}")
    public String getUserRole(@PathVariable String user) throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            return UserService.getUserRole(conn, user);
        }
    }
}