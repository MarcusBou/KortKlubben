"use strict";
exports.__esModule = true;
exports.Player = void 0;
/**
 * Class for player
 *
 * This class is used to all related to a player
 *
 * @version 1.0
 * @author Tobias
 */
var Player = /** @class */ (function () {
    /**
     * Constructor
     * @param username Username of player
     */
    function Player(username) {
        this.hand = new Array();
        this.username = username;
    }
    /**
     * Get the player hand
     * @return List of cards
     */
    Player.prototype.GetHand = function () {
        return this.hand;
    };
    /**
     * Set the hand
     * @param hand
     */
    Player.prototype.SetHand = function (hand) {
        this.hand = hand;
    };
    Player.prototype.GetUsername = function () {
        return this.username;
    };
    /**
     * Recieve a card for the hand
     * @param card
     */
    Player.prototype.RecieveCard = function (card) {
        this.hand.push(card);
    };
    /**
     * Play a card
     * @param index Card index from hand
     * @return played card
     */
    Player.prototype.playCard = function (playedCard) {
        var card = null;
        for (var i = 0; i < this.hand.length; i++) {
            if (this.hand[i].IsSameSymbol(playedCard.GetSymbol())) {
                if (this.hand[i].GetNumber() == playedCard.GetNumber()) {
                    card = this.hand[i];
                    this.hand.splice(i, 1);
                }
            }
        }
        return card;
    };
    return Player;
}());
exports.Player = Player;
