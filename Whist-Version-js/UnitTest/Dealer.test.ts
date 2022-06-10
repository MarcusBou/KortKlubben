import { Card } from "../Engine/Card";
import { Dealer } from "../Engine/Dealer";
import { Deck } from "../Engine/Deck";
import { Decks } from "../Engine/Decks";

describe('test', ()=>{
    test('Expect Card Deck to be shuffled should return true', ()=>{
        let shuffled : boolean = false;
        let dealer : Dealer = new Dealer();
        let deck : Deck = new Deck();
        let unshuffledDeck : Deck = new Deck();
        let cards: Array<Card> = Decks.STANDARD_CARD_DECK;
        deck.setCards(cards);
        dealer.shuffleCards(deck.getCards());

        unshuffledDeck.setCards(Decks.STANDARD_CARD_DECK);
        console.log(deck);
        console.log(Decks.STANDARD_CARD_DECK);
         for (let i = 0; i < deck.getCards().length; i++) {
           if(deck.getCards()[i].GetNumber() != unshuffledDeck.getCards()[i].GetNumber() || deck.getCards()[i].GetSymbol() != unshuffledDeck.getCards()[i].GetSymbol()){
                shuffled = true;
                break;
            }
        }

        expect(shuffled).toBe(true);
    });

    test('Expect an array of hands of cards from the dealer, expect 4 arrays with 14 cards each', () =>{
        let dealer: Dealer = new Dealer();
        let deck: Deck = new Deck();
        deck.setCards(Decks.STANDARD_CARD_DECK);
        let hands: Array<Array<Card>> = dealer.dealCards(deck.getCards(),4);
        expect(hands.length).toBe(4);
        expect(hands[0].length).toBe(13);
    });
});