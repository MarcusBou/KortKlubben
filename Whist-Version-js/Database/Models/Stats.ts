export class Stats {
    private username: string;
    private wins: number;
    private lost: number;
    private gamesPlayed: number;

    public GetUsername(): string {
        return this.username;
    }

    public GetWins(): number {
        return this.wins;
    }

    public GetLost(): number {
        return this.lost;
    }

    public GetGamesPlayed(): number {
        return this.gamesPlayed;
    }

    constructor(username: string, wins: number, lost: number, gamesPlayed: number) {
        this.username = username;
        this.wins = wins;
        this.lost = lost;
        this.gamesPlayed = gamesPlayed;
    }
}