import { ESMap, SymbolDisplayPartKind, sys } from "typescript";
import { Console } from "winston/lib/winston/transports";
import { Card } from "../Engine/Card";
import { CardGame } from "../Engine/CardGame";
import { Deck } from "../Engine/Deck";
import { Decks } from "../Engine/Decks";
import { IGameListener } from "../Engine/IGameListener";
import { Player } from "../Engine/Player";
import { Symbol } from "../Engine/Symbol";

export class WhistGame extends CardGame {
    private responseListener: IGameListener;
    private dealtCards: ESMap<Player, Card>;
    private playerPoints: ESMap<Player, number>;
    private cardPlayed: Card;
    private playerTurn: Player;

    public constructor(listener : IGameListener) {
        super();
        this.dealtCards = new Map<Player, Card>();
        this.playerPoints = new Map<Player, number>();
        this.responseListener = listener;
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
        this.gameLoop(index, startPos);
    }

    public End(): void {
        this.isRunning = false;

        console.log("\nThe winner where:");
        this.getRoundWinner().forEach(player => {
            console.log(" - " + player.GetUsername());
        });
    }

    /**
     * Method to find the stik winner out from the symbol
     * @param symbol Symbol for the round
     * @return Player who won the stik
     */
    private findStikWinner(symbol: string): Player {
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
     * Method to deal the cards out to players
     */
    public dealCard() {
        //Deal the cards
        let hands: Array<Array<Card>> = this.dealer.dealCards(this.deck.getCards(), this.players.length);
        for (let i = 0; i < this.players.length; i++) {
            //Set the hand for each player
            this.players[i].SetHand(hands[i]);
            this.responseListener.onDirectMessageResponse(this.players[i].GetUsername(), "Whist", "dealtHand", JSON.stringify(hands[i]));
        }
    }


    /**
     * Method to check if players hands are empty
     * @return Whether hands are empty = true or still have cards = false
     */
    private isHandsEmpty(): boolean {
        this.players.forEach(player => {
            //Check if hand has more cards
            if (player.GetHand().length > 0) {
                return false;
            }
        });
        return true;
    }

    /**
     * Method to get the Team who won
     * @return The 2 winners as a list
     */
    private getRoundWinner(): Array<Player> {
        //Calculate team 1 points
        let team1_Points: number = this.playerPoints.get(this.players[0]) + this.playerPoints.get(this.players[2]);
        //Calculate team 2 points
        let team2_Points: number = this.playerPoints.get(this.players[1]) + this.playerPoints.get(this.players[3]);
        //Check who won
        if (team1_Points > team2_Points) {
            return [this.players[0], this.players[2]];
        } else {
            return [this.players[1], this.players[3]];
        }
    }

    /**
     * For when command is received, read through the command and do something
     */
    public onCommandRecieved(username, message): void {
        if(message.game == "Whist"){
            switch (message.command) {
                case "start":
                    this.Start();
                    break;
                case "playCard":
                        this.setcard(username, message.info);
                    break;
                default:
                    console.log("no command received");
                    this.responseListener.onDirectMessageResponse(username,"Whist", "Error" ,"Not a valid commande received");
                    break;
            }
        }else{
            this.responseListener.onDirectMessageResponse(username, "Whist", "Error" ,"Not a command intended for whist");
        }
    }
    
    private setcard(username, information){
        if(username == this.playerTurn.GetUsername()){
            let symbol;
            if(information.symbol == Symbol.Clubs){symbol = Symbol.Clubs}
            else if(information.symbol == Symbol.Diamond){symbol = Symbol.Diamond}
            else if(information.symbol == Symbol.Heart){symbol = Symbol.Heart}
            else if(information.symbol == Symbol.Spades){symbol = Symbol.Spades}
            this.cardPlayed = new Card(symbol, information.number);
            console.log(username + " has played")
        }
    }

    private gameLoop(index:number, startPos: number){
        let symbol: string;
        this.dealtCards = new Map<Player, Card>();
        this.round(index, symbol,startPos)
    }


    public async waitForInput(_callback){
       
        console.log("FUCK NU AF");
        if(this.cardPlayed == null){
            await this.delay(1000);
            this.waitForInput(_callback)
        }
        else{
            _callback();
        }
        
    }

    private async round(index, symbol,startPos){
        let i = 0;
        await this.roundLoop(i,index, symbol,startPos);
        //this.endOfRound(index, symbol, startPos);
    }

    private endOfRound(index, symbol, startPos){
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
            startPos = this.getWinnerPos(stik_winner);
            this.gameLoop(index, startPos);
        }
    }

    private async delay(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async roundLoop(i, startPos, symbol, index){
        if(i < this.players.length){
            this.cardPlayed = null;
            this.playerTurn = this.players[i];
            console.log(this.playerTurn.GetUsername());
            this.responseListener.onDirectMessageResponse(this.players[i].GetUsername(),"Whist", "turn", "")
            //Waiting for card to play
            await this.waitForInput(()=>{
                let card: Card = this.players[i].playCard(this.cardPlayed);  
                if(card != null){
                    console.log("D??d over nisserne");
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
                    i++;
                }else{
                    i--;
            }});
            this.roundLoop(i, startPos, symbol, index);
        }
    }
}
