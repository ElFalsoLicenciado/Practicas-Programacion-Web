package chamba.backend.controllers;

import chamba.backend.models.Course;
import chamba.backend.dto.CourseRequest;
import chamba.backend.services.CourseService;

import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final DataSource dataSource;

    public CourseController(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    @GetMapping
    public ArrayList<Course> getCourses() throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return CourseService.getCourses(conn);
        }
    }


    @GetMapping("/{id}")
    public Course getCourse(@PathVariable String id) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            return CourseService.getCourseById(conn, id);
        }
    }


    @PostMapping("/admin/add")
    public void addCourse(@RequestBody CourseRequest req) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            conn.setAutoCommit(false);

            try {

                String courseId = CourseService.addCourse(conn, req.getTitle(), req.getDescription(), req.getPrice(),req.getImage());

                for (String point : req.getLearnPoints()) {

                    CourseService.addCoursePoint(conn, courseId, point);
                }

                conn.commit();

            } catch (Exception e) {

                conn.rollback();

                throw e;
            } finally {

                conn.setAutoCommit(true);
            }
        }
    }


    @PutMapping("/{id}")
    public void updateCourse(@PathVariable String id, @RequestBody CourseRequest req ) throws Exception {

        try (Connection conn = dataSource.getConnection()) {
            conn.setAutoCommit(false);
            try {
                int response = CourseService.updateCourse( conn, id, req.getTitle(), req.getDescription(), req.getPrice(), req.getImage());

                if (response != 1) return;

                CourseService.deleteCoursePoints(conn, id);

                for (String point : req.getLearnPoints())
                    CourseService.addCoursePoint(conn, id, point);

                conn.commit();

            } catch (Exception e) {
                conn.rollback();
                throw e;
            } finally {

                conn.setAutoCommit(true);
            }
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable String id) throws Exception {

        try (Connection conn = dataSource.getConnection()) {

            CourseService.deleteCourse(conn, id);
        }
    }

    @PostMapping("/{courseId}/join/{userId}")
    public boolean joinCourse(@PathVariable String userId, @PathVariable String courseId) throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            return CourseService.joinCourse(conn, userId, courseId);
        }
    }

    @GetMapping("/{courseId}/joined/{userId}")
    public boolean isOnCourse(@PathVariable String userId, @PathVariable String courseId) throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            return CourseService.isOnCourse(conn, userId, courseId);
        }
    }
}