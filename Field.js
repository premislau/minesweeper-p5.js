class Field{ //note: maybe excessive
    constructor(hasMine){
        this.hasMine=hasMine;
        this.neighbourMines=0;
        this.revealed=false;
        this.marked=false;
    }

    reveal(){
        if(this.hasMine){
            console.log("BOOM!");
            return "boom";
        }
        this.revealed=true;
        return "revealed";
    }

    mark(){
        this.marked=true;
    }
}