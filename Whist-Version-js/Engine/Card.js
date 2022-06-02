"use strict";
exports.__esModule = true;
exports.Card = void 0;
/**
 * Class for Card
 *
 * This class is used to all related to a Card
 *
 * @version 1.01
 * @author Tobias
 */
var Card = /** @class */ (function () {
    /**
     * Constructor
     * @param symbol Symbol of card
     * @param number Number of card
     */
    function Card(symbol, number) {
        this.symbol = symbol;
        this.number = number;
    }
    /**
     * Get the number
     * @return Card number
     */
    Card.prototype.GetNumber = function () {
        return this.number;
    };
    /**
     * Get the symbol
     * @return Card symbol
     */
    Card.prototype.GetSymbol = function () {
        return this.symbol;
    };
    /**
     * Method to check if symbol is same as argument
     * @param symbol Symbol to compare
     * @return if the symbol is the same
     */
    Card.prototype.IsSameSymbol = function (symbol) {
        return this.symbol == symbol;
    };
    /**
     * Method to check if number is higher than argument
     * @param number Number to compare
     * @return if number is higher
     */
    Card.prototype.IsHigher = function (numb) {
        return this.number >= numb;
    };
    Card.Empty = new Card(null, 0);
    return Card;
}());
exports.Card = Card;
