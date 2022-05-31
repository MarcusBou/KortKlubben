package dev.tgpgamez.whist.engine;

/**
 * Interface to call basic game methods
 */
public interface GameEngine {
    /**
     * Abstract method to start a game
     */
    abstract void Start();
    /**
     * Abstract method for while the game is running
     */
    abstract void Running();
    /**
     * Abstract method to end the game
     */
    abstract void End();

    abstract void setListener(GameListener listener);
}
