package dev.tgpgamez.whist.engine;

/**
 * Class for Card
 *
 * This class is used to all related to a Card
 *
 * @version 1.0
 * @author Tobias
 */
public class Card {
    //Which Symbol the card has
    private Symbol symbol;
    /**
     * Get the symbol
     * @return Card symbol
     */
    public Symbol getSymbol() {
        return symbol;
    }

    //The number on the card
    private int number;
    /**
     * Get the number
     * @return Card number
     */
    public int getNumber() {
        return number;
    }

    /**
     * Constructor
     * @param symbol Symbol of card
     * @param number Number of card
     */
    public Card(Symbol symbol, int number) {
        this.symbol = symbol;
        this.number = number;
    }

    /**
     * Method to check if symbol is same as argument
     * @param symbol Symbol to compare
     * @return if the symbol is the same
     */
    public boolean isSameSymbol(Symbol symbol) {
        return this.symbol == symbol;
    }

    /**
     * Method to check if number is higher than argument
     * @param number Number to compare
     * @return if number is higher
     */
    public boolean isHigher(int number) {
        return this.number >= number;
    }

    @Override
    public String toString() {
        return "Card {" + symbol + " " + number + "}";
    }

    public static Card Empty() {
        return new Card(null, 0);
    }
}

