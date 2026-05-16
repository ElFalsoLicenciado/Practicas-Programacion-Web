package chamba.backend.services;

import chamba.backend.dto.AuthResponse;
import chamba.backend.models.User;
import chamba.backend.models.UsersDisplay;
import chamba.backend.utils.Crypto;

import java.sql.*;
import java.util.ArrayList;
import java.util.UUID;

public class UserService {

    public static User logInUser(Connection conn, String credential, String password) throws Exception {
        String sql = "call super.log_in_user(?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, credential);

        cs.registerOutParameter(2, Types.VARCHAR);

        cs.execute();

        String storedHash = cs.getString(2);

        cs.close();

        if (storedHash == null) {
            return null;
        }

        boolean valid = Crypto.verify(password, storedHash);

        if (!valid) return null;

        return getUserByCredential(conn, credential);
    }

    private static User getUserByCredential(Connection conn, String credential ) throws Exception {

        String sql =
                "call SUPER.get_user_by_credential(?,?,?,?)";

        CallableStatement cs =
                conn.prepareCall(sql);

        cs.setString(1, credential);

        cs.registerOutParameter(2, Types.VARCHAR);
        cs.registerOutParameter(3, Types.VARCHAR);
        cs.registerOutParameter(4, Types.VARCHAR);

        cs.execute();

        String id = cs.getString(2);

        if (id == null) {
            return null;
        }

        return User.builder()
                .id(id)
                .username(cs.getString(3))
                .user_role(cs.getString(4))
                .build();
    }

    public static AuthResponse registerUser(Connection conn, String name, String username, String email, String band_role, String password) throws Exception {
        int response;

        String id = UUID.randomUUID().toString().substring(0, 32);

        String sql = "call super.register_user(?,?,?,?,?,?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        password = Crypto.encrypt(password);

        cs.setString(1, id);
        cs.setString(2, name);
        cs.setString(3, username);
        cs.setString(4, email);
        cs.setString(5, band_role);
        cs.setString(6, password);
        cs.registerOutParameter(7, Types.NUMERIC);

        cs.execute();

        response = cs.getInt(7);

        cs.close();

        if (response == 1) {
            return new AuthResponse( true, id, username, "user");
        } return new AuthResponse(false, null, null, null);
    }

    public static int addUser(Connection conn, String role, String name, String username, String email, String band_role, String password) throws Exception {
        int response;

        String sql = "call super.add_user(?,?,?,?,?,?,?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        password = Crypto.encrypt(password);

        cs.setString(1, UUID.randomUUID().toString().substring(0, 32));
        cs.setString(2, role);
        cs.setString(3, name);
        cs.setString(4, username);
        cs.setString(5, email);
        cs.setString(6, band_role);
        cs.setString(7, password);
        cs.registerOutParameter(8, Types.NUMERIC);

        cs.execute();

        response = cs.getInt(8);

        cs.close();

        return response;
    }

    public static int updateUser(Connection conn, String id, String role, String name, String username, String email, String band_role, String password) throws Exception {
        int response;

        String sql = "call super.update_user(?,?,?,?,?,?,?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        if (!password.isEmpty())
            password = Crypto.encrypt(password);

        cs.setString(1, id);
        cs.setString(2, role);
        cs.setString(3, name);
        cs.setString(4, username);
        cs.setString(5, email);
        cs.setString(6, band_role);
        cs.setString(7, password);
        cs.registerOutParameter(8, Types.NUMERIC);

        cs.execute();

        response = cs.getInt(8);

        cs.close();

        return response;
    }

    public static int deleteUser(Connection conn, String id) throws Exception {
        int response;

        String sql = "call super.delete_user(?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);
        cs.registerOutParameter(2, Types.NUMERIC);

        cs.execute();

        response = cs.getInt(2);

        cs.close();

        return response;
    }

    public static User getUserById(Connection conn, String id) throws Exception {
        User user;

        String sql = "call super.get_user_by_id(?,?,?,?,?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);
        cs.registerOutParameter(2, Types.VARCHAR);
        cs.registerOutParameter(3, Types.VARCHAR);
        cs.registerOutParameter(4, Types.VARCHAR);
        cs.registerOutParameter(5, Types.VARCHAR);
        cs.registerOutParameter(6, Types.VARCHAR);

        cs.execute();

        user = User.builder()
                .id(id)
                .user_role(cs.getString(2))
                .full_name(cs.getString(3))
                .username(cs.getString(4))
                .email(cs.getString(5))
                .band_role(cs.getString(6))
                .build();

        cs.close();

        return user;
    }

    public static ArrayList<UsersDisplay> displayUsers(Connection conn) throws Exception {
        ArrayList<UsersDisplay> users = new ArrayList<>();

        String sql = "SELECT * FROM super.usersdisplay ORDER BY username";

        Statement stm = conn.createStatement();

        ResultSet rs = stm.executeQuery(sql);
        while (rs.next()) {
            UsersDisplay ud = UsersDisplay.builder()
                    .id(rs.getString("id"))
                    .username(rs.getString("username"))
                    .build();

            users.add(ud);
        }

        rs.close();
        stm.close();

        return users;
    }

    public static boolean usernameExists(Connection conn, String username) throws Exception {

        String sql = "call SUPER.check_username_count(?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, username);
        cs.registerOutParameter(2, Types.NUMERIC);

        cs.execute();

        return cs.getInt(2) > 0;
    }

    public static boolean emailExists(Connection conn, String email) throws Exception {

        String sql = "call SUPER.check_email_count(?,?)";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, email);
        cs.registerOutParameter(2, Types.NUMERIC);

        cs.execute();

        return cs.getInt(2) > 0;
    }

    public static String getUserRole(Connection conn, String id) throws Exception {
        String sql = "call SUPER.get_user_role(?,?)";

        System.out.println(id);

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);
        cs.registerOutParameter(2, Types.VARCHAR);

        cs.execute();

        return cs.getString(2);
    }
}