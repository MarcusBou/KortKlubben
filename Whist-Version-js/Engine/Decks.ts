import { Card } from "./Card";
import { Symbol } from "./Symbol";

export class Decks {
    public static STANDARD_CARD_DECK: Card[] = this.StandardCardDeck();


    private static StandardCardDeck() {
        var cards: Card[] = new Array<Card>();
        for(const symbol in Symbol) {
            for(let i = 1; i < 14; i++) {
                cards.push(new Card(symbol, i));
            }
        }
        return cards;
    }
}