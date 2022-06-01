package dev.tgpgamez.whist.database;

import dev.tgpgamez.whist.Stats;
import dev.tgpgamez.whist.User;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GameDBManager extends BaseDatabase {
    public GameDBManager(String conString, String user, String password) {
        super(conString, user, password);
    }

    public User getUserFromUsername(String username) {
        this.Open();
        try {
            CallableStatement cs = this.getConnection().prepareCall("{CALL GetUserTFromUsername(?)}");
            cs.setString("@Username", username);
            ResultSet resultSet = this.callProcedure(cs);
            while (resultSet.next()) {
                if (resultSet.getString(1) == "UnknownUsername") return null;
                return new User(username, resultSet.getString("Name"), resultSet.getString("Email"), resultSet.getDate("Birthdate"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            this.Close();
        }
        return null;
    }


    public Stats getStatsFromUsername(String username) {
        this.Open();
        try {
            CallableStatement cs = this.getConnection().prepareCall("{CALL GetStatsFromUserT(?)}");
            cs.setString("@Username", username);
            ResultSet resultSet = this.callProcedure(cs);
            while (resultSet.next()) {
                if (resultSet.getString(1) == "UnknownUsername") return null;
                return new Stats(username, resultSet.getInt("Wins"), resultSet.getInt("Lost"), resultSet.getInt("GamesPlayed"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            this.Close();
        }
        return null;
    }

    public void addToWins(String username) {
        this.Open();
        try {
            CallableStatement cs = this.getConnection().prepareCall("{CALL AddOneToWins(?)}");
            cs.setString("@Username", username);
            cs.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void addToLost(String username) {
        this.Open();
        try {
            CallableStatement cs = this.getConnection().prepareCall("{CALL AddOneToLost(?)}");
            cs.setString("@Username", username);
            cs.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String checkPassword(String username, String inputPassword) {
        this.Open();
        try {
            CallableStatement cs = this.getConnection().prepareCall("{CALL CheckPassword(?,?)}");
            cs.setString("@Username", username);
            cs.setString("@InputPassword", inputPassword);
            ResultSet resultSet = this.callProcedure(cs);
            while (resultSet.next()) {
                return resultSet.getString(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            this.Close();
        }
        return null;
    }
}
