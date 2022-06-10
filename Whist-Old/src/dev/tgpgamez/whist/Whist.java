package dev.tgpgamez.whist;

import dev.tgpgamez.whist.database.GameDBManager;

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

        GameDBManager dbManager = new GameDBManager("jdbc:sqlserver://192.168.1.126;databaseName=WhistDatabase;trustServerCertificate=true",
                                            "WhistAdmin", "Kode1234!");
        System.out.println(dbManager.checkPassword("TGPGamez", "Kode1234!"));
    }
}
