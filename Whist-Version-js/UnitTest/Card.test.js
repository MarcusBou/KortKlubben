"use strict";
exports.__esModule = true;
var Card_1 = require("../Engine/Card");
var Symbol_1 = require("../Engine/Symbol");
var card = new Card_1.Card(Symbol_1.Symbol.Heart, 2);
describe('Test', function () {
    it('test the method GetNumber', function () {
        expect(card.GetNumber()).toBe(0);
    });
});
