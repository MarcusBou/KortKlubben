import { Card } from "./Card";

/**
 * Class for player
 *
 * This class is used to all related to a player
 *
 * @version 1.0
 * @author Tobias
 */
export class Player {
    //The player's hand which is a list of card
    private hand: Card[];
    private username: string;

    /**
     * Get the player hand
     * @return List of cards
     */
    public GetHand(): Card[] {
        return this.hand;
    }

    /**
     * Set the hand
     * @param hand
     */
    public SetHand(hand: Card[]): void {
        this.hand = hand;
    }

    public GetUsername(): string {
        return this.username;
    }

    /**
     * Constructor
     * @param username Username of player
     */
    constructor(username: string) {
        this.hand = new Array<Card>();
        this.username = username;
    }

    /**
     * Recieve a card for the hand
     * @param card
     */
    public RecieveCard(card: Card): void {
        this.hand.push(card);
    }

    /**
     * Play a card
     * @param index Card index from hand
     * @return played card
     */
    public playCard(index: number): Card {
        let playCard: Card = this.hand[index];
        this.hand.splice(index, 1);
        return playCard;
    }
}
