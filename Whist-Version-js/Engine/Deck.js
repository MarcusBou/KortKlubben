"use strict";
exports.__esModule = true;
exports.Deck = void 0;
/**
 * Class for Deck
 *
 * This class is used to all related to a Deck
 *
 * @version 1.0
 * @author Tobias
 */
var Deck = /** @class */ (function () {
    /**
     * Constructor
     * @param cards Cards for the deck
     */
    function Deck() {
        this.cards = new Array();
    }
    /**
     * Get the deck
     * @return List of cards
     */
    Deck.prototype.getCards = function () {
        return this.cards;
    };
    /**
     * Get a card from the deck by index
     * @param index Which index the card are in
     * @return Card
     */
    Deck.prototype.getCardFromDeck = function (index) {
        return this.cards[index];
    };
    /**
     * Set the Deck
     * @param cards
     */
    Deck.prototype.setCards = function (cards) {
        this.cards = cards;
    };
    /**
     * Add a card to the Deck
     * @param card Card to add
     */
    Deck.prototype.addCardToDeck = function (card) {
        this.cards.push(card);
    };
    return Deck;
}());
exports.Deck = Deck;
