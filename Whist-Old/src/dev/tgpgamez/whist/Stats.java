package dev.tgpgamez.whist;

public class Stats {

    private String username;
    public String getUsername() {
        return username;
    }

    private int wins;
    public int getWins() {
        return wins;
    }

    private int lost;
    public int getLost() {
        return lost;
    }

    private int gamesPlayed;

    public int getGamesPlayed() {
        return gamesPlayed;
    }

    public Stats() {
        this.username = "None";
        this.wins = 0;
        this.lost = 0;
        this.gamesPlayed = 0;
    }

    public Stats(String username, int wins, int lost, int gamesPlayed) {
        this.username = username;
        this.wins = wins;
        this.lost = lost;
        this.gamesPlayed = gamesPlayed;
    }

    @Override
    public String toString() {
        return "Stats{" +
                "username='" + username + '\'' +
                ", wins=" + wins +
                ", lost=" + lost +
                ", gamesPlayed=" + gamesPlayed +
                '}';
    }
}
