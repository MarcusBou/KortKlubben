import { Card } from "../Engine/Card";
import { Symbol } from "../Engine/Symbol";

describe('Test', () => {
    test('test the card number is 2', () => {
        let card: Card = new Card(Symbol.Heart, 2);
        expect(card.GetNumber()).toBe(2);
    });
    test('test the card number is 12', () => {
        let card: Card = new Card(Symbol.Clubs, 12);
        expect(card.GetNumber()).toBe(12);
    });
    test('test the card number is 5', () => {
        let card: Card = new Card(Symbol.Diamond, 5);
        expect(card.GetNumber()).toBe(5);
    });

    test('test the card symbol is Diamond', () => {
        let card: Card = new Card(Symbol.Diamond, 5);
        expect(card.GetSymbol()).toBe(Symbol.Diamond);
    });
    test('test the card symbol is Clubs', () => {
        let card: Card = new Card(Symbol.Clubs, 5);
        expect(card.GetSymbol()).toBe(Symbol.Clubs);
    });
    test('test the card symbol is Spades', () => {
        let card: Card = new Card(Symbol.Spades, 5);
        expect(card.GetSymbol()).toBe(Symbol.Spades);
    });

    test('test 2 cards to be same symbol', () => {
        let card1: Card = new Card(Symbol.Spades, 5);
        let card2: Card = new Card(Symbol.Spades, 5);
        expect(card1.IsSameSymbol(card2.GetSymbol())).toBe(true);
    });
    test('test 2 cards to be same symbol', () => {
        let card1: Card = new Card(Symbol.Diamond, 5);
        let card2: Card = new Card(Symbol.Diamond, 5);
        expect(card1.IsSameSymbol(card2.GetSymbol())).toBe(true);
    });
    test('test 2 cards to not be the same symbol', () => {
        let card1: Card = new Card(Symbol.Spades, 5);
        let card2: Card = new Card(Symbol.Clubs, 5);
        expect(card1.IsSameSymbol(card2.GetSymbol())).toBe(false);
    });

    test('test card is higher true', () => {
        let card1: Card = new Card(Symbol.Spades, 5);
        let card2: Card = new Card(Symbol.Clubs, 2);
        expect(card1.IsHigher(card2.GetNumber())).toBe(true);
    });
    test('test card is higher true', () => {
        let card1: Card = new Card(Symbol.Spades, 8);
        let card2: Card = new Card(Symbol.Clubs, 5);
        expect(card1.IsHigher(card2.GetNumber())).toBe(true);
    });
    test('test card is higher false', () => {
        let card1: Card = new Card(Symbol.Spades, 2);
        let card2: Card = new Card(Symbol.Clubs, 7);
        expect(card1.IsHigher(card2.GetNumber())).toBe(false);
    });
});