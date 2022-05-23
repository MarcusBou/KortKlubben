package dev.tgpgamez.whist;

import dev.tgpgamez.whist.engine.*;
import dev.tgpgamez.whist.games.WhistGame;

import java.util.ArrayList;
import java.util.List;

public class Whist {
    public static void main(String[] args) {

        CardGame cardGame = new WhistGame();

        cardGame.addPlayer(new Player("Marcus"));
        cardGame.addPlayer(new Player("Sebastian"));
        cardGame.addPlayer(new Player("Tobias"));
        cardGame.addPlayer(new Player("Krøll"));

        cardGame.Start();

        /*for (Player player : cardGame.getPlayers()) {
            System.out.println(player.getName());
            for (Card card : player.getHand()) {
                System.out.println(" - " + card.toString());
            }
            System.out.println(" ");
        }*/
    }
}
