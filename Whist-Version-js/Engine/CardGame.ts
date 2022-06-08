import { IGameEngine } from "./IGameEngine"
import { Dealer } from "./Dealer"
import { Deck } from "./Deck"
import { Player } from "./Player";
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
    public setDeck(deck: Deck): void {
        this.deck = deck;
    }

    /**
     * Constructor
     */
    constructor() {
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.players = new Array<Player>();
    }
    

    //Boolean to check if the game is still running
    protected isRunning: boolean;

    /**
     * Method to start the game
     */
    Start(): void {
    }

    /**
     * Method for while the game is running
     */
    Running(): void {
    }

    /**
     * Method to end the game
     */
    End(): void {
    }

    /**
     * Method to del the cards out to players
     */
    public abstract dealCard();
    
    /**
     * Method to add a player to the "table"
     * @param player
     */
    public addPlayer(username: string): void {
        this.players.push(new Player(username));
    }
    
    /**
     * Method when command is received in game
     * @param command 
     */
     onCommandRecieved(username: string,command: JSON): void {
    }
}