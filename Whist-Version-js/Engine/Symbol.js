export class Symbol {
    static Spades = new Symbol(1);
    static Heart = new Symbol(2);
    static Diamond = new Symbol(3);
    static Clubs = new Symbol(4);

    constructor(num) {
        this.num = num;
    }
}