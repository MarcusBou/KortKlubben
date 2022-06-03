"use strict";
exports.__esModule = true;
exports.CardGame = void 0;
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
    function CardGame() {
        this.deck = new Deck_1.Deck([]);
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
    CardGame.prototype.Start = function () {
        for (var i = 0; i < 10; i++) {
            console.log(i);
        }
    };
    CardGame.prototype.Running = function () {
        throw new Error("Method not implemented.");
    };
    CardGame.prototype.End = function () {
        throw new Error("Method not implemented.");
    };
    return CardGame;
}());
exports.CardGame = CardGame;
