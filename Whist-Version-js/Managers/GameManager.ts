export class GameManager{
    private id: string;
    constructor(id){
        this.id = id;
    }

    public getId(){
        return this.id;
    }
}
