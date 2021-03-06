package dev.tgpgamez.whist.managers;

import dev.tgpgamez.whist.engine.GameListener;
import dev.tgpgamez.whist.engine.GameEngine;

/**
 *  Class standing for managing games such as whist
 * */
public class GameManager {
    /**Defines which game and ruleset the game is running from*/
    private GameEngine game;

    private GameListener listener;

    /**
     * Constructor for creating a game from the game in the
     * @param chosenGame
     * */
    public GameManager(GameEngine chosenGame){
        this.game = chosenGame;


    }

    /**
     * Translates message from string to a JSONOBJECT
     * */
    public void translateMessage(String message){

    }

    /**
     * Gets the address from WS so connection is possible
     * */
    public String getAddress(){
        return "Address";
    }
}
