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

    public Card(Symbol symbol, int number) {
        this.symbol = symbol;
        this.number = number;
    }

    public boolean isSameSymbol(Symbol symbol) {
        return this.symbol == symbol;
    }

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

