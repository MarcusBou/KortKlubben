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

    //constructor(x: string);
    constructor(username: string) {

    }

}