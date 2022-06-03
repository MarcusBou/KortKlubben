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
        var symbols = Object.keys(Symbol_1.Symbol).filter(function (item) {
            return isNaN(Number(item));
        });
        for (var symbol in symbols) {
            for (var i = 0; i < 14; i++) {
                cards.push(new Card_1.Card(parseInt(symbol), i));
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
