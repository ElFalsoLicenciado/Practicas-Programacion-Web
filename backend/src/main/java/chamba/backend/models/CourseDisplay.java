package chamba.backend.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseDisplay implements java.io.Serializable {
    private String id;
    private String title;
}
