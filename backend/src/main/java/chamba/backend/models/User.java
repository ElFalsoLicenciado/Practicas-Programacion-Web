package chamba.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User implements java.io.Serializable{
       private String id;
       private String user_role;
       private String full_name;
       private String username;
       private String email;
       private String band_role;
       @JsonIgnore
       private String password;
}
