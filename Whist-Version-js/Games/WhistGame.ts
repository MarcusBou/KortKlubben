import { ESMap, sys } from "typescript";
import { Card } from "../Engine/Card";
import { CardGame } from "../Engine/CardGame";
import { Deck } from "../Engine/Deck";
import { Decks } from "../Engine/Decks";
import { IGameListener } from "../Engine/IGameListener";
import { Player } from "../Engine/Player";
import { Symbol } from "../Engine/Symbol";

export class WhistGame extends CardGame {
    private endpointListener: IGameListener;
    private dealtCards: ESMap<Player, Card>;
    private playerPoints: ESMap<Player, number>;

    public constructor() {
        super();
        this.dealtCards = new Map<Player, Card>();
        this.playerPoints = new Map<Player, number>();
    }
    
    public Start(): void {
        this.isRunning = true;
        let setDeck = new Deck();
        setDeck.setCards(Decks.STANDARD_CARD_DECK);
        this.setDeck(setDeck);

        this.deck.setCards(this.dealer.shuffleCards(this.deck.getCards()));
        this.dealCard();
        this.players.forEach(player => {
            this.playerPoints.set(player, 0);
        });
        this.Running();
    }

    public Running(): void {
        let index: number = 0;
        let startPos: number = 0;
        while(this.isRunning) {
            let symbol: Symbol;
            this.dealtCards = new Map<Player, Card>();
            for (let i = 0; i < this.players.length; i++) {
                //Player at index plays a Card
                let card: Card = this.players[i].playCard(0);
                //If i is the first Position of the loop
                if (i == startPos) {
                    //Then set symbol for round
                    symbol = card.GetSymbol();
                }
                if (index >= this.players.length - 1) {
                    index = 0;
                } else {
                    index++;
                }
                //Put the card on the table
                this.dealtCards.set(this.players[i], card);
            }

            //Find the Player who won the stik
            let stik_winner: Player = this.findStikWinner(symbol);

            console.log(stik_winner.GetUsername() + " vandt et stik");
            
            //Add point to stik winner
            this.playerPoints.set(stik_winner, this.playerPoints.get(stik_winner) + 1);
            
            //Check if the players hands are empty
            if (this.isHandsEmpty()) {
                //End game
                this.End();
            } else {
                //Set the start position/index
                startPos = getWinnerPos(stik_winner);
            }
        }
    }

    public End(): void {
        this.isRunning = false;

        console.log("\nThe winner where:");
        this.getRoundWinner().forEach(player => {
            console.log(" - " + player.getUsername());
        });
    }

    /**
     * Method to find the stik winner out from the symbol
     * @param symbol Symbol for the round
     * @return Player who won the stik
     */
    private findStikWinner(symbol: Symbol): Player {
        let winner: Player = null;
        //Set the highestCard to 0
        let highestCard: Card = Card.Empty;
        this.dealtCards.forEach((entry, player) => {
            //Check if the symbol is the same
            if (entry.IsSameSymbol(symbol)) {
                //Check if the number is higher
                if (entry.IsHigher(highestCard.GetNumber())) {
                    //if higher, then set to current value
                    highestCard = entry;
                    //set winner to player
                    winner = player;
                }
            }
        });
        return winner;
    }

    /**
     * Method to get the winner position
     * @param player Player to find index of
     * @return Position
     */
    private getWinnerPos(player: Player): number {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] == player) {
                return i;
            }
        }
        return 0;
    }

    /**
     * Method to del the cards out to players
     */
    public dealCard() {
        throw new Error("Method not implemented.");
    }
    public onCommandRecieved(command: string): void {
        throw new Error("Method not implemented.");
    }
}