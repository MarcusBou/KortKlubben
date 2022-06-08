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
    private symbol: string;

    /**
     * Get the number
     * @return Card number
     */
    public GetNumber(): number {
        return this.number;
    }

    /**
     * Get the symbol
     * @return Card symbol
     */
    public GetSymbol(): string {
        return this.symbol;
    }


    /**
     * Constructor
     * @param symbol Symbol of card
     * @param number Number of card
     */
    constructor(symbol: string, number: number) {
        this.symbol = symbol;
        this.number = number;
    }

    /**
     * Method to check if symbol is same as argument
     * @param symbol Symbol to compare
     * @return if the symbol is the same
     */
    IsSameSymbol(symbol): boolean {
        return this.symbol == symbol;
    }

    /**
     * Method to check if number is higher than argument
     * @param number Number to compare
     * @return if number is higher
     */
    IsHigher(numb): boolean {
        return this.number >= numb;
    }

    static Empty = new Card(null, 0);
}