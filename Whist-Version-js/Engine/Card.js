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
    #number;
    //Which Symbol the card has
    #symbol;

    /**
     * Get the number
     * @return Card number
     */
    get getNumber() {
        return this.#number;
    }

    /**
     * Get the symbol
     * @return Card symbol
     */
    get getSymbol() {
        return this.#symbol;
    }


    /**
     * Constructor
     * @param symbol Symbol of card
     * @param number Number of card
     */
    constructor(symbol, number) {
        this.#symbol = symbol;
        this.#number = number;
    }

    isSameSymbol(symbol) {
        return this.#symbol == symbol;
    }

    isHigher(numb) {
        return this.#number >= numb;
    }

    static Empty = new Card(null, 0);
}