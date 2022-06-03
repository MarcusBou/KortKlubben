import { Card } from "./Card";
import { Symbol } from "./Symbol";

export class Decks {
    public static STANDARD_CARD_DECK: Card[] = this.StandardCardDeck();


    private static StandardCardDeck() {
        var cards: Card[] = new Array<Card>();
        const symbols = Object.keys(Symbol).filter((item) => {
            return isNaN(Number(item));
        });
        for(const symbol in symbols) {
            for(let i = 0; i < 14; i++) {
                cards.push(new Card(parseInt(symbol), i));
            }
        }
        return cards;
    }
}