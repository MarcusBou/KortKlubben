"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.WhistGame = void 0;
var Card_1 = require("../Engine/Card");
var CardGame_1 = require("../Engine/CardGame");
var Deck_1 = require("../Engine/Deck");
var Decks_1 = require("../Engine/Decks");
var WhistGame = /** @class */ (function (_super) {
    __extends(WhistGame, _super);
    function WhistGame(listener) {
        var _this = _super.call(this) || this;
        _this.dealtCards = new Map();
        _this.playerPoints = new Map();
        _this.responseListener = listener;
        return _this;
    }
    WhistGame.prototype.Start = function () {
        var _this = this;
        this.isRunning = true;
        var setDeck = new Deck_1.Deck();
        setDeck.setCards(Decks_1.Decks.STANDARD_CARD_DECK);
        this.setDeck(setDeck);
        this.deck.setCards(this.dealer.shuffleCards(this.deck.getCards()));
        this.dealCard();
        this.players.forEach(function (player) {
            _this.playerPoints.set(player, 0);
        });
        this.Running();
    };
    WhistGame.prototype.Running = function () {
        var index = 0;
        var startPos = 0;
        while (this.isRunning) {
            var symbol = void 0;
            this.dealtCards = new Map();
            for (var i = 0; i < this.players.length; i++) {
                //Player at index plays a Card
                var card = this.players[i].playCard(0);
                //If i is the first Position of the loop
                if (i == startPos) {
                    //Then set symbol for round
                    symbol = card.GetSymbol();
                }
                if (index >= this.players.length - 1) {
                    index = 0;
                }
                else {
                    index++;
                }
                //Put the card on the table
                this.dealtCards.set(this.players[i], card);
            }
            //Find the Player who won the stik
            var stik_winner = this.findStikWinner(symbol);
            console.log(stik_winner.GetUsername() + " vandt et stik");
            //Add point to stik winner
            this.playerPoints.set(stik_winner, this.playerPoints.get(stik_winner) + 1);
            //Check if the players hands are empty
            if (this.isHandsEmpty()) {
                //End game
                this.End();
            }
            else {
                //Set the start position/index
                startPos = this.getWinnerPos(stik_winner);
            }
        }
    };
    WhistGame.prototype.End = function () {
        this.isRunning = false;
        console.log("\nThe winner where:");
        this.getRoundWinner().forEach(function (player) {
            console.log(" - " + player.GetUsername());
        });
    };
    /**
     * Method to find the stik winner out from the symbol
     * @param symbol Symbol for the round
     * @return Player who won the stik
     */
    WhistGame.prototype.findStikWinner = function (symbol) {
        var winner = null;
        //Set the highestCard to 0
        var highestCard = Card_1.Card.Empty;
        this.dealtCards.forEach(function (entry, player) {
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
    };
    /**
     * Method to get the winner position
     * @param player Player to find index of
     * @return Position
     */
    WhistGame.prototype.getWinnerPos = function (player) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] == player) {
                return i;
            }
        }
        return 0;
    };
    /**
     * Method to deal the cards out to players
     */
    WhistGame.prototype.dealCard = function () {
        //Deal the cards
        var hands = this.dealer.dealCards(this.deck.getCards(), this.players.length);
        for (var i = 0; i < this.players.length; i++) {
            //Set the hand for each player
            this.players[i].SetHand(hands[i]);
        }
    };
    WhistGame.prototype.onCommandRecieved = function (command) {
        switch (command.command) {
            case "start":
                this.Start();
                break;
            case "playCard":
                this.responseListener.onResponse(command.info["username"]);
                break;
            default:
                console.log("no command received");
                break;
        }
    };
    /**
     * Method to check if players hands are empty
     * @return Whether hands are empty = true or still have cards = false
     */
    WhistGame.prototype.isHandsEmpty = function () {
        this.players.forEach(function (player) {
            //Check if hand has more cards
            if (player.GetHand().length > 0) {
                return false;
            }
        });
        return true;
    };
    /**
     * Method to get the Team who won
     * @return The 2 winners as a list
     */
    WhistGame.prototype.getRoundWinner = function () {
        //Calculate team 1 points
        var team1_Points = this.playerPoints.get(this.players[0]) + this.playerPoints.get(this.players[2]);
        //Calculate team 2 points
        var team2_Points = this.playerPoints.get(this.players[1]) + this.playerPoints.get(this.players[3]);
        //Check who won
        if (team1_Points > team2_Points) {
            return [this.players[0], this.players[2]];
        }
        else {
            return [this.players[1], this.players[3]];
        }
    };
    return WhistGame;
}(CardGame_1.CardGame));
exports.WhistGame = WhistGame;
