package chamba.backend.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class CourseRequest {

    private String title;

    private String description;

    private ArrayList<String> learnPoints;

    private String image;

    private int price;
}