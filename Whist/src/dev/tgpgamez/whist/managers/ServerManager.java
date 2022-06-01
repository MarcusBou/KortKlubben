package dev.tgpgamez.whist.managers;

import dev.tgpgamez.whist.games.WhistGame;

import java.util.ArrayList;
import java.util.List;

/**
 * Class for controlling the entire service, handling all the games and start of games.
 * */
public class ServerManager {
    /**
     * List of currently active rooms
     * */
    private List<GameManager> ActiveRooms;

    /**
     * Constructor for Servermanager
     * */
    public ServerManager(){
        ActiveRooms = new ArrayList<>();
    }

    /**
     * Creates room and adds it to the list of activeRooms
     **/
    public String createRoom(){
        GameManager room = new GameManager(new WhistGame());
        String address = room.getAddress();
        this.ActiveRooms.add(room);
        return address;
    }

    /**
     * Get entire list of activeRooms
     * */
    public List<GameManager> getActiveRooms() {
        return this.ActiveRooms;
    }

    /**
     *Deletes room from list of rooms
     * */
    public void deleteRooms(GameManager gm){
        this.ActiveRooms.remove(gm);
    }
}
