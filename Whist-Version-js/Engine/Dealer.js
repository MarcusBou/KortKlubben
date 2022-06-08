"use strict";
exports.__esModule = true;
exports.Dealer = void 0;
/**
 * Class for Dealer
 *
 * This class is used to everything regarding dealing and handling cards
 *
 * @version 1.0
 * @author Tobias
 */
var Dealer = /** @class */ (function () {
    function Dealer() {
    }
    /**
     * Method to shuffle a list of cards
     * @param cards List of cards to shuffle
     * @return Shuffled list of cards
     */
    Dealer.prototype.shuffleCards = function (cards) {
        var j, x, i;
        for (i = cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = cards[i];
            cards[i] = cards[j];
            cards[j] = x;
        }
        return cards;
    };
    /**
     * Method used to deal cards to x amount of players
     * @param cards Cards to deal out
     * @param playerAmount Amount of players
     * @return List that has multiple list of cards
     */
    Dealer.prototype.dealCards = function (cards, playerAmount) {
        //Calculates the hand size our from amount of players and cards size :: Array<Array<Card>>
        var hand_size = cards.length / playerAmount;
        var temp_hands = new Array();
        //Loop for each "player"
        for (var i = 0; i < playerAmount; i++) {
            var temp_cards = new Array();
            //Loop hand_size times
            for (var j = 0; j < hand_size; j++) {
                //Add card at index 0 to temp_cards
                //Remove the card at index 0
                var card = cards.shift();
                if (card != null) {
                    temp_cards.push(card);
                }
            }
            //Add the list of cards to our list
            temp_hands.push(temp_cards);
        }
        return temp_hands;
    };
    return Dealer;
}());
exports.Dealer = Dealer;
