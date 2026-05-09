package chamba.backend.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsersDisplay implements java.io.Serializable{
    private String id;
    private String username;
}
