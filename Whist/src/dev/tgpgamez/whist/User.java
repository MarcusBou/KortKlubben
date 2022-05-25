package dev.tgpgamez.whist;

import java.util.Date;

public class User {

    private String username;
    public String getUsername() {
        return username;
    }

    private String name;

    public String getName() {
        return name;
    }

    private String mail;

    public String getMail() {
        return mail;
    }

    private Date birthdate;

    public Date getBirthdate() {
        return birthdate;
    }

    public User(String username, String name, String mail, Date birthdate) {
        this.username = username;
        this.name = name;
        this.mail = mail;
        this.birthdate = birthdate;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", mail='" + mail + '\'' +
                ", birthdate=" + birthdate +
                '}';
    }
}
