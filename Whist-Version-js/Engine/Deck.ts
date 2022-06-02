import { Card } from './Card';

/**
 * Class for Deck
 *
 * This class is used to all related to a Deck
 *
 * @version 1.0
 * @author Tobias
 */
export class Deck {
    //The cards in the deck
    #cards: Card[];

    /**
     * Get the deck
     * @return List of cards
     */
    getCards() {
        return this.#cards;
    }
    
    /**
     * Constructor
     */
    constructor() {
        //need fix
        this.#cards = new Array;
    }

    /**
     * Constructor
     * @param cards Cards for the deck
     */
    constructor(cards: Card[]) {
        this.#cards = cards;
    }

    /**
     * Get a card from the deck by index
     * @param index Which index the card are in
     * @return Card
     */
    getCardFromDeck(index) {
        return this.#cards
    }



}

var kage = new Deck();