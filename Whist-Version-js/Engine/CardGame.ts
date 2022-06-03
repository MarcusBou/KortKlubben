import { IGameEngine } from "./IGameEngine"
import { Dealer } from "./Dealer"
import { Deck } from "./Deck"
/**
 * Class for CardGame
 *
 * This class is used to all related to the game
 *
 * @version 1.0
 * @author Tobias
 */
export abstract class CardGame implements IGameEngine {
    //List of the players
    protected players: Player[];
    /**
     * Get the players
     * @return List of players
     */
    public getPlayers(): Player[] {
        return this.players;
    }

     //The dealer in the game
    protected dealer: Dealer;
    /**
     * Get the dealer
     * @return The dealer
     */
    public getDealer(): Dealer {
        return this.dealer;
    }

    //The deck in the game
    protected deck: Deck;
    /**
     * Get the deck
     * @return Deck
     */
    public getDeck(): Deck {
        return this.deck;
    }

    /**
     * Set the deck
     * @param deck
    */
    public setDeck(deck: Deck[]): void {
        this.deck = deck;
    }

    Start() {

    }
}