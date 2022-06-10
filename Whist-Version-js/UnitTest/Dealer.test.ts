import { Card } from "../Engine/Card";
import { Dealer } from "../Engine/Dealer";
import { Deck } from "../Engine/Deck";
import { Decks } from "../Engine/Decks";

describe('test', ()=>{
    test('Expect Card Deck to be shuffled should return true', ()=>{
        let shuffled : boolean = false;
        let dealer : Dealer = new Dealer();
        let deck : Deck = new Deck();
        deck.setCards(Decks.STANDARD_CARD_DECK);
        let card : Card = deck.getCardFromDeck(0);
        deck.setCards(dealer.shuffleCards(deck.getCards()));
        let card2 : Card = deck.getCardFromDeck(0);
        if(card.GetNumber() != card2.GetNumber()){
            shuffled = true;
        }else if(card.GetSymbol() != card2.GetSymbol()){
            shuffled = true;
        }

        expect(shuffled).toBe(true);
    });

    test('Expect an array of hands of cards from the dealer, expect 4 arrays with 14 cards each', () =>{
        let dealer: Dealer = new Dealer();
        let deck: Deck = new Deck();
        deck.setCards(Decks.STANDARD_CARD_DECK);
        let hands: Array<Array<Card>> = dealer.dealCards(deck.getCards(),4);
        expect(hands.length).toBe(4);
        expect(hands[0].length).toBe(14);
    });
});