package dev.tgpgamez.whist;

import dev.tgpgamez.whist.engine.GameEngine;

/**
 *  Class standing for managing games such as whist
 * */
public class GameManager {
    /**Defines which game and ruleset the game is running from*/
    private GameEngine game;


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
    public void TranslateMessage(String message){

    }

    /**
     * Gets the address from WS so connection is possible
     * */
    public String GetAddress(){
        return "Address";
    }
}
