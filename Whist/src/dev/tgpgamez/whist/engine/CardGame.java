package dev.tgpgamez.whist.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Class for CardGame
 *
 * This class is used to all related to the game
 *
 * @version 1.0
 * @author Tobias
 */
public abstract class CardGame implements GameEngine {
    //List of the players
    protected List<Player> players;
    /**
     * Get the players
     * @return List of players
     */
    public List<Player> getPlayers() {
        return players;
    }

    //The dealer in the game
    protected Dealer dealer;
    /**
     * Get the dealer
     * @return The dealer
     */
    public Dealer getDealer() {
        return dealer;
    }

    //The deck in the game
    protected Deck deck;
    /**
     * Get the deck
     * @return Deck
     */
    public Deck getDeck() {
        return deck;
    }

    /**
     * Set the deck
     * @param deck
     */
    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    /**
     * Constructor
     */
    public CardGame() {
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.players = new ArrayList<>();
    }

    //Boolean to check if the game is still running
    protected boolean isRunning;

    /**
     * Method to start the game
     */
    @Override
    public abstract void Start();

    /**
     * Method for while the game is running
     */
    @Override
    public abstract void Running();

    /**
     * Method to end the game
     */
    @Override
    public abstract void End();

    /**
     * Method to del the cards out to players
     */
    public abstract void dealCards();

    /**
     * Method to add a player to the "table"
     * @param player
     */
    public void addPlayer(Player player) {
        this.players.add(player);
    }

    public abstract void onCommandRecieved(String command);
}
