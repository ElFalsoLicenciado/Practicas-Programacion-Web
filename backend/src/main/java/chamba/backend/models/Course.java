package chamba.backend.models;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class Course implements java.io.Serializable {
    private String id;
    private String title;
    private String description;
    private ArrayList<String> learnPoints;
    private int price;
    private String image;
}