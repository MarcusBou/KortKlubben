import { Symbol } from "./Symbol";

/**
 * Class for Card
 *
 * This class is used to all related to a Card
 *
 * @version 1.01
 * @author Tobias
 */
export class Card {
    //The number on the card
    private number: number;
    //Which Symbol the card has
    private symbol: Symbol;

    /**
     * Get the number
     * @return Card number
     */
    public GetNumber() {
        return this.number;
    }

    /**
     * Get the symbol
     * @return Card symbol
     */
    public GetSymbol() {
        return this.symbol;
    }


    /**
     * Constructor
     * @param symbol Symbol of card
     * @param number Number of card
     */
    constructor(symbol: Symbol, number: number) {
        this.symbol = symbol;
        this.number = number;
    }

    IsSameSymbol(symbol) {
        return this.symbol == symbol;
    }

    IsHigher(numb) {
        return this.number >= numb;
    }

    static Empty = new Card(null, 0);
}