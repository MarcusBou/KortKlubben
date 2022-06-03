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
    private cards: Card[];

    /**
     * Get the deck
     * @return List of cards
     */
    public getCards(): Card[] {
        return this.cards;
    }

    /**
     * Constructor
     * @param cards Cards for the deck
     */
    public constructor()  {
        this.cards = new Array<Card>();
    }
    

    /**
     * Get a card from the deck by index
     * @param index Which index the card are in
     * @return Card
     */
    public getCardFromDeck(index): Card {
        return this.cards[index];
    }

    /**
     * Set the Deck
     * @param cards
     */
    public setCards(cards: Card[]): void {
        this.cards = cards;
    }

    /**
     * Add a card to the Deck
     * @param card Card to add
     */
    public addCardToDeck(card: Card) {
        this.cards.push(card);
    }
}