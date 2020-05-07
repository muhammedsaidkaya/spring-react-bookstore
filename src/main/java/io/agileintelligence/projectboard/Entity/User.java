package io.agileintelligence.projectboard.Entity;

import io.agileintelligence.projectboard.Hash;
import javax.persistence.*;
import java.sql.Date;
import java.util.Arrays;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "email", nullable = false)
    private String email;
    private String password;
    private String name;
    private boolean gender;
    private Date dob;
    private int phone_first3;
    private int phone_rest;
    private byte[] profil_pic;
    private boolean is_admin;

    public User() {
    }

    public User(String email, String password, String name, boolean gender, Date dob, int phone_first3, int phone_rest, byte[] profil_pic, boolean is_admin) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.phone_first3 = phone_first3;
        this.phone_rest = phone_rest;
        this.profil_pic = profil_pic;
        this.is_admin = is_admin;
    }


    public void setPassword(String password) {
        this.password = Hash.sha1(password);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }


    public byte[] getProfil_pic() {
        return profil_pic;
    }

    public void setProfil_pic(byte[] profil_pic) {
        this.profil_pic = profil_pic;
    }

    public boolean isIs_admin() {
        return is_admin;
    }

    public void setIs_admin(boolean is_admin) {
        this.is_admin = is_admin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhone_first3() {
        return phone_first3;
    }

    public void setPhone_first3(int phone_first3) {
        this.phone_first3 = phone_first3;
    }

    public int getPhone_rest() {
        return phone_rest;
    }

    public void setPhone_rest(int phone_rest) {
        this.phone_rest = phone_rest;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", gender=" + gender +
                ", dob=" + dob +
                ", phone_first3=" + phone_first3 +
                ", phone_rest=" + phone_rest +
                ", profil_pic=" + Arrays.toString(profil_pic) +
                ", is_admin=" + is_admin +
                '}';
    }
}
