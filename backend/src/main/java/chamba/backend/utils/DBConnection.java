package chamba.backend.utils;

import java.sql.*;

public class DBConnection {
    private static final String url = "jdbc:oracle:thin:@//localhost:1521/PWDB";
    private static final String[] user = {"app_guest", "app_user", "app_admin", "super"};
    private static final String[] password = {"pwguest", "pwuser", "pwadmin", "super"};


    public static Connection openGuest() throws Exception {
        return DriverManager.getConnection(url, user[0], password[0]) ;
    }

        public static Connection openUser() throws Exception {
        return DriverManager.getConnection(url, user[1], password[1]) ;
    }

    public static Connection openAdmin() throws Exception {
        return DriverManager.getConnection(url, user[2], password[2]) ;
    }

    public static Connection openSuper() throws Exception {
        return DriverManager.getConnection(url, user[3], password[3]) ;
    }


    public static void close(Connection connection) throws Exception {
        connection.close();
    }
}