import { Card } from "../Engine/Card";
import { Player } from "../Engine/Player";

describe('test',()=>{
    test('Expect playes username in return should be Marcus', () =>{
        let player: Player = new Player("Marcus");
        expect(player.GetUsername()).toBe("Marcus");
    });

    test('Expect to fill in cards and take out cards from the players hand, expecting first card to be 3 of heart', ()=>{
        let card: Card = new Card("heart", 3)
        let hand: Array<Card> = [card, new Card("spades", 6), new Card("diamond", 8)];
        let player : Player = new Player("Marcus");
        player.SetHand(hand);

        expect(player.GetHand()[0]).toBe(card)
    })

    test('Expect card to be played from hand if it exist in the players hand, expecting card to be 3 of heart', ()=>{
        let card: Card = new Card("heart", 3)
        let hand: Array<Card> = [card, new Card("spades", 6), new Card("diamond", 8)];
        let player : Player = new Player("Marcus");
        player.SetHand(hand);
        let contains : Boolean = true;
        
        expect(player.playCard(card)).toBe(card);
        if(!player.GetHand().includes(card)){contains = false}
        expect(contains).toBe(false);
    })
});