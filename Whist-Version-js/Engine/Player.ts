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
    public playCard(playedCard: Card): Card {
        let card : Card = null;
        for (let i = 0; i < this.hand.length; i++) {
            if (this.hand[i].IsSameSymbol(playedCard.GetSymbol())) {
                if (this.hand[i].GetNumber() == playedCard.GetNumber()) {
                    card = this.hand[i];
                    this.hand.splice(i, 1);
                }
            }
        }
        return card;
    }
}
