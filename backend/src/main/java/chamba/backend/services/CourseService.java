package chamba.backend.services;

import chamba.backend.models.Course;

import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

public class CourseService {

    public static String addCourse( Connection conn, String title, String desc, int price, String image ) throws Exception {
        String courseId = UUID.randomUUID().toString().substring(0, 32);

        String sql = "{call super.ADD_COURSE(?,?,?,?,?,?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, courseId);
        cs.setString(2, title);
        cs.setString(3, desc);
        cs.setInt(4, price);
        cs.setString(5, image);

        cs.registerOutParameter(6, Types.NUMERIC);

        cs.execute();

        int response = cs.getInt(6);

        cs.close();

        if (response != 1) {
            throw new Exception("No se pudo crear el curso");
        }

        return courseId;
    }

    public static void addCoursePoint(Connection conn, String course, String point) throws Exception {
        String sql = "{call super.ADD_COURSE_POINT(?,?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1,course);
        cs.setString(2, point);

        cs.execute();

        cs.close();
    }

    public static int deleteCourse(Connection conn, String id) throws Exception {
        int response;

        String sql = "{call super.DELETE_COURSE(?,?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);
        cs.registerOutParameter(2, Types.NUMERIC);

        cs.execute();

        response = cs.getInt(2);

        cs.close();

        return response;
    }

    public static void deleteCoursePoints(Connection conn, String id) throws Exception{
        String sql = "{call super.delete_course_points(?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);

        cs.execute();

        cs.close();
    }

    public static int updateCourse(Connection conn, String id, String title, String desc, int price, String image) throws Exception {
        int response;

        String sql = "{call super.UPDATE_COURSE(?,?,?,?,?,?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);
        cs.setString(2, title);
        cs.setString(3, desc);
        cs.setInt(4, price);
        cs.setString(5, image);
        cs.registerOutParameter(6, Types.NUMERIC);

        cs.execute();

        response = cs.getInt(6);

        cs.close();

        return response;
    }


    public static ArrayList<Course> getCourses(Connection conn) throws Exception {

        Map<String, Course> coursesMap = new LinkedHashMap<>();

        String sql = "SELECT c.id, c.title, c.description, c.price, c.image, p.point FROM super.coursesdata c LEFT JOIN super.coursepoints p ON c.id = p.course_id ORDER BY c.title, p.point_id";

        try (
                Statement stm = conn.createStatement();
                ResultSet rs = stm.executeQuery(sql)
        ) {

            while (rs.next()) {

                String courseId = rs.getString("id");

                Course course = coursesMap.get(courseId);

                // Si el curso aún no existe, lo creamos
                if (course == null) {

                    course = Course.builder()
                            .id(courseId)
                            .title(rs.getString("title"))
                            .description(rs.getString("description"))
                            .learnPoints(new ArrayList<>())
                            .price(rs.getInt("price"))
                            .image(rs.getString("image"))
                            .build();

                    coursesMap.put(courseId, course);
                }

                // Agregar learn point si existe
                String point = rs.getString("point");

                if (point != null) {
                    course.getLearnPoints().add(point);
                }
            }
        }

        return new ArrayList<>(coursesMap.values());
    }

    public static Course getCourseById(Connection conn, String id) throws Exception {
        Course course;

        String sql = "{call super.GET_COURSE_BY_ID(?,?,?,?,?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, id);
        cs.registerOutParameter(2, Types.VARCHAR);
        cs.registerOutParameter(3, Types.VARCHAR);
        cs.registerOutParameter(4, Types.NUMERIC);
        cs.registerOutParameter(5, Types.VARCHAR);

        cs.execute();

        course = Course.builder()
                .id(id)
                .title(cs.getString(2))
                .description(cs.getString(3))
                .learnPoints(getCourseLearnPoints(conn, id))
                .price(cs.getInt(4))
                .image(cs.getString(5))
                .build();

        cs.close();

        return course;
    }

    public static ArrayList<String> getCourseLearnPoints(Connection conn, String course ) throws Exception {

        ArrayList<String> points = new ArrayList<>();

        String sql =
                "SELECT point FROM super.coursepoints WHERE course_id = ? ORDER BY course_id, point_id";

        try (
                PreparedStatement ps = conn.prepareStatement(sql)
        ) {

            ps.setString(1, course);

            try (ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {
                    points.add(rs.getString("point"));
                }
            }
        }
        return points;
    }

    public static boolean joinCourse(Connection conn, String user, String course) throws Exception {
        String sql = "{call super.join_course(?,?,?)}";


        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, user);
        cs.setString(2, course);
        cs.registerOutParameter(3, Types.NUMERIC);

        cs.execute();

        int response = cs.getInt(3);

        cs.close();

        return response > 0;
    }

    public static boolean isOnCourse(Connection conn, String user, String course) throws Exception {
        String sql = "{call super.IS_USER_ON_COURSE(?,?,?)}";

        CallableStatement cs = conn.prepareCall(sql);

        cs.setString(1, user);
        cs.setString(2, course);
        cs.registerOutParameter(3, Types.NUMERIC);

        cs.execute();

        int response = cs.getInt(3);

        cs.close();

        return response > 0;
    }

}
