package dev.tgpgamez.whist.games;

import dev.tgpgamez.whist.engine.*;

import java.util.*;

public class WhistGame extends CardGame {
    private GameListener endPointListener;
    private HashMap<Player, Card> dealtCards;
    private HashMap<Player, Integer> player_points;

    public WhistGame() {
        super();
        this.dealtCards = new HashMap<>();
        this.player_points = new HashMap<>();
    }


    @Override
    public void Start() {
        this.isRunning = true;
        this.setDeck(new Deck(Decks.STANDARD_CARD_GAME));

        this.deck.setCards(dealer.shuffleCards(deck.getCards()));
        dealCards();
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
            for (int i = 0; i < this.players.size(); i++) {
                //Player at index plays a Card
                Card card = this.players.get(index).playCard(0); //Should be replaced with the code to WS
                //If i is the first Position of the loop
                if (i == startPos) {
                    //Then set symbol for round
                    symbol = card.getSymbol();
                }
                if (index >= players.size()-1) {
                    index = 0;
                } else {
                    index++;
                }
                //Put the card on the table
                this.dealtCards.put(this.players.get(index), card);
            }

            //Find the Player who won the stik
            Player stik_winner = findStikWinner(symbol);

            System.out.println(stik_winner.getUsername() + " vandt et stik");

            //Add point to stik winner
            player_points.put(stik_winner, player_points.get(stik_winner)+1);

            //Check if the players hands are empty
            if (isHandsEmpty()) {
                //End game
                End();
            } else {
                //Set the start position/index
                startPos = getWinnerPos(stik_winner);
            }
        }
    }

    @Override
    public void End() {
        isRunning = false;

        System.out.println("\nThe winners where:");
        for (Player player : getRoundWinner()) {
            System.out.println(" - " + player.getUsername());
        }
    }

    @Override
    public void setListener(GameListener listener) {
        this.endPointListener = listener;
    }

    /**
     * Method to find the stik winner out from the symbol
     * @param symbol Symbol for the round
     * @return Player who won the stik
     */
    private Player findStikWinner(Symbol symbol) {
        Player winner = null;
        //Set the highestCard to 0
        Card highestCard = Card.Empty();
        for (Map.Entry<Player, Card> entry : this.dealtCards.entrySet()) {
            //Check if the symbol is the same
            if (entry.getValue().isSameSymbol(symbol)) {
                //Check if the number is higher
                if (entry.getValue().isHigher(highestCard.getNumber())) {
                    //if higher, then set to current value
                    highestCard = entry.getValue();
                    //set winner to player
                    winner = entry.getKey();
                }
            }

        }
        return winner;
    }

    /**
     * Method to get the winner position
     * @param player Player to find index of
     * @return Position
     */
    private int getWinnerPos(Player player) {
        for (int i = 0; i < players.size(); i++) {
            if (players.get(i).equals(player)) {
                return i;
            }
        }
        return 0;
    }

    /**
     * Method to del the cards out to players
     */

    @Override
    public void dealCards() {
        //Deal the cards
        List<List<Card>> hands = this.dealer.dealCards(this.deck.getCards(), players.size());
        for (int i = 0; i < players.size(); i++) {
            //Set the hand for each player
            players.get(i).setHand(hands.get(i));
        }
    }

    @Override
    public void onCommandRecieved(String command) {
        switch (command) {

        }
    }

    /**
     * Method to check if players hands are empty
     * @return Whether hands are empty = true or still have cards = false
     */
    private boolean isHandsEmpty() {
        for (Player player : players) {
            //Check if hand has more cards
            if (player.getHand().size() > 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Method to get the Team who won
     * @return The 2 winners as a list
     */
    private List<Player> getRoundWinner() {
        //Calculate team 1 points
        int team1_Points = player_points.get(players.get(0)) + player_points.get(players.get(2));
        //Calculate team 2 points
        int team2_Points = player_points.get(players.get(1)) + player_points.get(players.get(3));
        //Check who won
        if (team1_Points > team2_Points) {
            return new ArrayList<>(Arrays.asList(players.get(0), players.get(2)));
        } else {
            return new ArrayList<>(Arrays.asList(players.get(1), players.get(3)));
        }
    }
}
