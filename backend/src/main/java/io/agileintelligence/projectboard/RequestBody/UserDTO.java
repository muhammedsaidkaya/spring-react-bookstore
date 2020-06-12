package io.agileintelligence.projectboard.RequestBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO{

    private String email;
    private String name;
    private boolean gender;
    private Date dob;
    private int phone_first3;
    private int phone_rest;
    private String profil_pic;
    private boolean admin;
}
