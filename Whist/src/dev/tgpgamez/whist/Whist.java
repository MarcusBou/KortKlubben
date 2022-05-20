package dev.tgpgamez.whist;

import dev.tgpgamez.whist.engine.*;

import java.util.ArrayList;
import java.util.List;

public class Whist {
    public static void main(String[] args) {

        CardGame cardGame = new CardGame();

        cardGame.addPlayer(new Player("Marcus"));
        cardGame.addPlayer(new Player("Sebastian"));
        cardGame.addPlayer(new Player("Tobias"));
        cardGame.addPlayer(new Player("Krøll"));

        cardGame.setDeck(new Deck(Decks.STANDARD_CARD_GAME));

        cardGame.getDeck().setCards(cardGame.getDealer().shuffleCards(cardGame.getDeck().getCards()));
        cardGame.dealCards();

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
