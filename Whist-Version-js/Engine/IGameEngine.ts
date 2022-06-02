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
    
    //setListener(listener: GameListener): void;
}