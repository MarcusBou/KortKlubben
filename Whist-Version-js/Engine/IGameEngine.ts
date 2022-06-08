//import { GameListener } from './GameListener';
/**
 * Interface to call basic game methods
 */
export interface IGameEngine {
    
    /**
     * Abstract method to start a game
     */
    Start(): void;

    /**
     * Abstract method for while the game is running
     */
    Running(): void;

    /**
     * Abstract method to end the game
     */
    End(): void;
    
    /**
     * Abstract method for when commannd is received through ws
     */
    onCommandRecieved(username,command: JSON): void;

    /**
     * Adds player to playerlist in the game
     */
     addPlayer(username: string): void;

}