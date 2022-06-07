"use strict";
exports.__esModule = true;
exports.CardGame = void 0;
var Dealer_1 = require("./Dealer");
var Deck_1 = require("./Deck");
/**
 * Class for CardGame
 *
 * This class is used to all related to the game
 *
 * @version 1.0
 * @author Tobias
 */
var CardGame = /** @class */ (function () {
    /**
     * Constructor
     */
    function CardGame() {
        this.deck = new Deck_1.Deck();
        this.dealer = new Dealer_1.Dealer();
        this.players = new Array();
    }
    /**
     * Get the players
     * @return List of players
     */
    CardGame.prototype.getPlayers = function () {
        return this.players;
    };
    /**
     * Get the dealer
     * @return The dealer
     */
    CardGame.prototype.getDealer = function () {
        return this.dealer;
    };
    /**
     * Get the deck
     * @return Deck
     */
    CardGame.prototype.getDeck = function () {
        return this.deck;
    };
    /**
     * Set the deck
     * @param deck
    */
    CardGame.prototype.setDeck = function (deck) {
        this.deck = deck;
    };
    /**
     * Method to start the game
     */
    CardGame.prototype.Start = function () {
    };
    /**
     * Method for while the game is running
     */
    CardGame.prototype.Running = function () {
    };
    /**
     * Method to end the game
     */
    CardGame.prototype.End = function () {
    };
    /**
     * Method to add a player to the "table"
     * @param player
     */
    CardGame.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    return CardGame;
}());
exports.CardGame = CardGame;
