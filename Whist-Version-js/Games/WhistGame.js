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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.WhistGame = void 0;
var Card_1 = require("../Engine/Card");
var CardGame_1 = require("../Engine/CardGame");
var Deck_1 = require("../Engine/Deck");
var Decks_1 = require("../Engine/Decks");
var Symbol_1 = require("../Engine/Symbol");
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
        var _this = this;
        var index = 0;
        var startPos = 0;
        while (this.isRunning) {
            var symbol = void 0;
            this.dealtCards = new Map();
            for (var i = 0; i < this.players.length; i++) {
                this.cardPlayed = null;
                this.playerTurn = this.players[i];
                this.responseListener.onDirectMessageResponse(this.players[i].GetUsername(), "Whist", "turn", "");
                //Waiting for card to play
                while (this.cardPlayed == null) {
                    (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        new Promise(function (f) { return setTimeout(f, 250); });
                        return [2 /*return*/];
                    }); }); });
                }
                //Player at index plays a Card
                var card = this.players[i].playCard(this.cardPlayed);
                if (card != null) {
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
                else {
                    i--;
                }
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
            this.responseListener.onDirectMessageResponse(this.players[i].GetUsername(), "Whist", "dealtHand", JSON.stringify(hands[i]));
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
    /**
     * For when command is received, read through the command and do something
     */
    WhistGame.prototype.onCommandRecieved = function (username, message) {
        if (message.game == "Whist") {
            switch (message.command) {
                case "start":
                    this.Start();
                    break;
                case "playCard":
                    this.setcard(username, message.info);
                    break;
                default:
                    console.log("no command received");
                    this.responseListener.onDirectMessageResponse(username, "Whist", "Error", "Not a valid commande received");
                    break;
            }
        }
        else {
            this.responseListener.onDirectMessageResponse(username, "Whist", "Error", "Not a command intended for whist");
        }
    };
    WhistGame.prototype.setcard = function (username, information) {
        if (username == this.playerTurn.GetUsername()) {
            var symbol = void 0;
            if (information.symbol == Symbol_1.Symbol.Clubs) {
                symbol = Symbol_1.Symbol.Clubs;
            }
            else if (information.symbol == Symbol_1.Symbol.Diamond) {
                symbol = Symbol_1.Symbol.Diamond;
            }
            else if (information.symbol == Symbol_1.Symbol.Heart) {
                symbol = Symbol_1.Symbol.Heart;
            }
            else if (information.symbol == Symbol_1.Symbol.Spades) {
                symbol = Symbol_1.Symbol.Spades;
            }
            this.cardPlayed = new Card_1.Card(symbol, information.number);
            console.log(username + " has played");
        }
    };
    return WhistGame;
}(CardGame_1.CardGame));
exports.WhistGame = WhistGame;
