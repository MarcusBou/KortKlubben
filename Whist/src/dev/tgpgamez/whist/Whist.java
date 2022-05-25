package dev.tgpgamez.whist;

import dev.tgpgamez.whist.engine.*;
import dev.tgpgamez.whist.games.WhistGame;

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
        Connection conn = null;

        try {
            DriverManager.registerDriver(new com.microsoft.sqlserver.jdbc.SQLServerDriver());
            String dbURL = "jdbc:sqlserver://192.168.1.126\\WhistDatabase";
            String user = "WhistAdmin";
            String pass = "Kode1234!";
            conn = DriverManager.getConnection(dbURL, user, pass);
            if (conn != null) {
                System.out.println("Connected");
            }


        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            System.out.println("Error");
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
}
