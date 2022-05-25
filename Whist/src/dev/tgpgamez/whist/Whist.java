package dev.tgpgamez.whist;

import dev.tgpgamez.whist.engine.*;
import dev.tgpgamez.whist.games.WhistGame;
import dev.tgpgamez.whist.managers.DBManager;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Whist {
    public static void main(String[] args) {

        /*CardGame cardGame = new WhistGame();

        cardGame.addPlayer(new Player("Marcus"));
        cardGame.addPlayer(new Player("Sebastian"));
        cardGame.addPlayer(new Player("Tobias"));
        cardGame.addPlayer(new Player("Krøll"));

        cardGame.Start();*/

        /*for (Player player : cardGame.getPlayers()) {
            System.out.println(player.getName());
            for (Card card : player.getHand()) {
                System.out.println(" - " + card.toString());
            }
            System.out.println(" ");
        }*/

        //System.out.println(ErrorMessages.get("WrongPassword"));
        DBManager dbManager = new DBManager("jdbc:sqlserver://192.168.1.126;databaseName=WhistDatabase;trustServerCertificate=true",
                                            "WhistAdmin", "Kode1234!");
        System.out.println(dbManager.getUserFromUsername("TGPGamez").toString());
        /*Connection conn = null;
        String conString = "jdbc:sqlserver://192.168.1.126;databaseName=WhistDatabase;trustServerCertificate=true";
        try{

            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            conn = DriverManager.getConnection(
                    conString,"WhistAdmin","Kode1234!");

            //Procedure
            CallableStatement cs = conn.prepareCall("{CALL GetUserTFromUsername(?)}");

            cs.setString(1, "TGPGamez");
            ResultSet result = cs.executeQuery();
            while (result.next()) {
                System.out.println(result.getString("Name"));
            }

            //Normal query
            //Statement stmt = conn.createStatement();
            //ResultSet rs = stmt.executeQuery("select UserT.Name, UserT.Email, UserT.Birthdate from UserT");
            //while(rs.next())
            //    System.out.println(rs.getString(1)+"  "+rs.getString(2)+"  "+rs.getDate(3));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }*/
    }
}
