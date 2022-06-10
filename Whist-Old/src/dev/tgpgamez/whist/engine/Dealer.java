package dev.tgpgamez.whist.engine;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Class for Dealer
 *
 * This class is used to everything regarding dealing and handling cards
 *
 * @version 1.0
 * @author Tobias
 */
public class Dealer {

    /**
     * Constructor
     */
    public Dealer() {

    }

    /**
     * Method to shuffle a list of cards
     * @param cards List of cards to shuffle
     * @return Shuffled list of cards
     */
    public List<Card> shuffleCards(List<Card> cards) {
        Collections.shuffle(cards);
        return cards;
    }

    /**
     * Method used to deal cards to x amount of players
     * @param cards Cards to deal out
     * @param playerAmount Amount of players
     * @return List that has multiple list of cards
     */
    public List<List<Card>> dealCards(List<Card> cards, int playerAmount) {
        //Calculates the hand size our from amount of players and cards size
        int hand_size = cards.size() / playerAmount;
        List<List<Card>> temp_hands = new ArrayList<>();

        //Loop for each "player"
        for (int i = 0; i < playerAmount; i++) {
            List<Card> temp_cards = new ArrayList<>();
            //Loop hand_size times
            for (int j = 0; j < hand_size; j++) {
                //Add card at index 0 to temp_cards
                temp_cards.add(cards.get(0));
                //Remove the card at index 0
                cards.remove(0);
            }
            //Add the list of cards to our list
            temp_hands.add(temp_cards);
        }
        return temp_hands;
    }
}
