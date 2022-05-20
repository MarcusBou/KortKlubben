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
public class CardGame implements GameEngine {
    //List of the players
    private List<Player> players;
    /**
     * Get the players
     * @return List of players
     */
    public List<Player> getPlayers() {
        return players;
    }

    //The dealer in the game
    private Dealer dealer;
    /**
     * Get the dealer
     * @return The dealer
     */
    public Dealer getDealer() {
        return dealer;
    }

    //The deck in the game
    private Deck deck;
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

    private HashMap<Player, Card> dealtCards;
    private HashMap<Player, Integer> player_points;


    public CardGame() {
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.players = new ArrayList<>();
        this.dealtCards = new HashMap<>();
        this.player_points = new HashMap<>();
    }

    private boolean isRunning;

    @Override
    public void Start() {
        this.isRunning = true;
        for (Player player : players) {
            player_points.put(player, 0);
        }
        Running();
    }

    @Override
    public void Running() {
        int index = 0;
        int startPos = 0;
        while(isRunning) {

            Symbol symbol = null;
            this.dealtCards = new HashMap<>();
            for (int i = 0; i < players.size(); i++) {
                //System.out.println(index);
                Card card = players.get(index).playCard(0);
                if (i == startPos) {
                    //System.out.println("Symbol: " + card.getSymbol() + " (" + index + " / " + i + ")");
                    symbol = card.getSymbol();
                }
                if (index >= players.size()-1) {
                    index = 0;
                } else {
                    index++;
                }
                this.dealtCards.put(players.get(index), card);
            }

            Player stik_winner = findStikWinner(symbol);

            System.out.println(stik_winner.getName() + " vandt et stik");

            player_points.put(stik_winner, player_points.get(stik_winner)+1);

            if (isHandsEmpty()) {
                isRunning = false;
                for (Map.Entry<Player, Integer> entry : player_points.entrySet()) {
                    System.out.println(entry.getKey().getName() + ": " + entry.getValue());
                }
            } else {
                startPos = getWinnerPos(stik_winner);
            }
        }
    }

    @Override
    public void End() {

    }


    public void addPlayer(Player player) {
        this.players.add(player);
    }

    public void dealCards() {
        List<List<Card>> hands = this.dealer.dealCards(this.deck.getCards(), players.size());
        for (int i = 0; i < players.size(); i++) {
            players.get(i).setHand(hands.get(i));
        }
    }


    private boolean isHandsEmpty() {
        for (Player player : players) {
            if (player.getHand().size() > 0) {
                return false;
            }
        }
        return true;
    }

    private Player findStikWinner(Symbol symbol) {
        Player winner = null;
        Card highestCard = Card.Empty();
        for (Map.Entry<Player, Card> entry : this.dealtCards.entrySet()) {
            if (entry.getValue().isSameSymbol(symbol)) {
                if (entry.getValue().isHigher(highestCard.getNumber())) {
                    highestCard = entry.getValue();
                    winner = entry.getKey();
                }
            }

        }
        return winner;
    }

    private int getWinnerPos(Player player) {
        for (int i = 0; i < players.size(); i++) {
            if (players.get(i).equals(player)) {
                return i;
            }
        }
        return 0;
    }
}
