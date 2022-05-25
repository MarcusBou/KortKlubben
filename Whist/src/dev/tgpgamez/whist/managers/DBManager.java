package dev.tgpgamez.whist.managers;

import dev.tgpgamez.whist.User;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBManager extends BaseDatabase {
    public DBManager(String conString, String user, String password) {
        super(conString, user, password);
    }

    public User getUserFromUsername(String username) {
        this.Open();
        try {
            CallableStatement cs = this.getConnection().prepareCall("{CALL GetUserTFromUsername(?)}");
            cs.setString("@Username", username);
            ResultSet resultSet = this.callProcedure(cs);
            while (resultSet.next()) {
                return new User(username, resultSet.getString("Name"), resultSet.getString("Email"), resultSet.getDate("Birthdate"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            this.Close();
        }
        return null;
    }
}
