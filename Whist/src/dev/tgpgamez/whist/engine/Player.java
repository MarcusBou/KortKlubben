package dev.tgpgamez.whist.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Class for player
 *
 * This class is used to all related to a player
 *
 * @version 1.0
 * @author Tobias
 */
public class Player {
    //The player's hand which is a list of card
    private List<Card> hand;
    /**
     * Get the player hand
     * @return List of cards
     */
    public List<Card> getHand() {
        return hand;
    }

    /**
     * Set the hand
     * @param hand
     */
    public void setHand(List<Card> hand) {
        this.hand = hand;
    }

    private String name;

    public String getName() {
        return name;
    }

    /**
     * Constructor
     */
    public Player() {
        hand = new ArrayList<>();
    }

    /**
     * Constructor
     * @param name Name of player
     */
    public Player(String name) {
        hand = new ArrayList<>();
        this.name = name;
    }

    /**
     * Recieve a card for the hand
     * @param card
     */
    public void recieveCard(Card card) {
        hand.add(card);
    }

    /**
     * Play a card
     * @param index Card index from hand
     * @return played card
     */
    public Card playCard(int index) {
        //Get card from hand with index
        Card playCard = hand.get(index);
        //Remove card from hand
        hand.remove(index);
        return playCard;
    }

}
