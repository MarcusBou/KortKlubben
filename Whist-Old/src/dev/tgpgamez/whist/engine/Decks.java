package dev.tgpgamez.whist.engine;

import java.util.ArrayList;
import java.util.List;

public class Decks {

    public static List<Card> STANDARD_CARD_GAME = standardCardGame();







    private static List<Card> standardCardGame() {
        List<Card> cards = new ArrayList<>();
        for(Symbol type : Symbol.values()) {
            for (int i = 1; i < 14; i++) {
                cards.add(new Card(type, i));
            }
        }
        return cards;
    }
}
