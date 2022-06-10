"use strict";
exports.__esModule = true;
exports.Decks = void 0;
var Card_1 = require("./Card");
var Symbol_1 = require("./Symbol");
var Decks = /** @class */ (function () {
    function Decks() {
    }
    Decks.StandardCardDeck = function () {
        var cards = new Array();
        for (var symbol in Symbol_1.Symbol) {
            for (var i = 1; i < 14; i++) {
                cards.push(new Card_1.Card(symbol, i));
            }
        }
        return cards;
    };
    var _a;
    _a = Decks;
    Decks.STANDARD_CARD_DECK = _a.StandardCardDeck();
    return Decks;
}());
exports.Decks = Decks;
