package dev.tgpgamez.whist.engine;

import java.util.ArrayList;
import java.util.List;

/**
 * Class for Deck
 *
 * This class is used to all related to a Deck
 *
 * @version 1.0
 * @author Tobias
 */
public class Deck {
    //The cards in the deck
    private List<Card> cards;
    /**
     * Get the deck
     * @return List of cards
     */
    public List<Card> getCards() {
        return cards;
    }

    /**
     * Constructor
     */
    public Deck() {
        this.cards = new ArrayList<>();
    }

    /**
     * Constructor
     * @param cards Cards for the deck
     */
    public Deck(List<Card> cards) {
        this.cards = cards;
    }

    /**
     * Get a card from the deck by index
     * @param index Which index the card are in
     * @return Card
     */
    public Card getCardFromDeck(int index) {
        return cards.get(index);
    }

    /**
     * Set the Deck
     * @param cards
     */
    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    /**
     * Add a card to the Deck
     * @param card Card to add
     */
    public void addCardToDeck(Card card) {
        this.cards.add(card);
    }

}
