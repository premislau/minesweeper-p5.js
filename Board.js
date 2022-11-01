class Board{
    constructor(width, height, numberOfMines, fieldSize){
        this.width=width; //number
        this.height=height; //number
        this.numberOfMines=numberOfMines; //number
        this.fieldSize=fieldSize; //number
        this.leftToReveal=this.width*this.height-this.numberOfMines; //number
        this.marked=0; //number
        this.initialised; //boolean, game is initialised when player reveals first field
        this.grid=[]; //matrix of Fields
        this.victory=false;
        this.boom=false;
        this.createGrid();
    }

    createGrid(){
        for(let i=0;i<this.width;++i){
            let column=[];
            for(let j=0;j<this.height;++j){
                column[j]=new Field(false);
            }
            this.grid[i]=column;
        }
    }

    // used when player chooses first field
    insertMines(immunityX, immunityY){
        let i=this.numberOfMines;
        while(i>0){
            let x=floor(random(0, this.width));
            let y=floor(random(0, this.height));
            if(!this.grid[x][y].hasMine && !(x==immunityX && y==immunityY)){
                --i;
                this.grid[x][y].hasMine=true;
                this.upadteNieghbours(x,y);
            }
        }
    }

    upadteNieghbours(x,y){
        if(x>0){
            if(y>0){
                ++this.grid[x-1][y-1].neighbourMines;
            }
                ++this.grid[x-1][y].neighbourMines;
            if(y<this.height-1){
                ++this.grid[x-1][y+1].neighbourMines;
            }
        }
        if(y>0){
            ++this.grid[x][y-1].neighbourMines;
        }
        if(y<this.height-1){
            ++this.grid[x][y+1].neighbourMines;
        }
        if(x<this.width-1){
            if(y>0){
                ++this.grid[x+1][y-1].neighbourMines;
            }
                ++this.grid[x+1][y].neighbourMines;
            if(y<this.height-1){
                ++this.grid[x+1][y+1].neighbourMines;
            }
        }
    }

    revealAdjusted(x,y){
        if(x>=0 && x<=this.width-1 && y>=0 && y<=this.height-1 && this.grid[x][y].revealed!==true){
            this.grid[x][y].reveal();
            --this.leftToReveal;
            if(this.grid[x][y].neighbourMines===0){
                this.revealAdjusted(x-1,y-1);
                this.revealAdjusted(x-1,y);
                this.revealAdjusted(x-1,y+1);
                this.revealAdjusted(x,y-1);
                this.revealAdjusted(x,y+1);
                this.revealAdjusted(x+1,y-1);
                this.revealAdjusted(x+1,y);
                this.revealAdjusted(x+1,y+1);
            }
            return;
        }else{
            return;
        }
    }

    show(){
        for(let i=0;i<this.width;++i){
            for(let j=0;j<this.height;++j){
                if(this.grid[i][j].revealed){
                    if(this.grid[i][j].hasMine){
                        if(this.grid[i][j].marked){
                            fill(128,0,0);
                        }else{
                            fill(0);
                        }
                        rect(this.fieldSize*i,this.fieldSize*j,this.fieldSize,this.fieldSize);
                    } else{
                        if(this.grid[i][j].marked){
                            fill(255,150,150);
                        }else{
                            fill(255);
                        }
                        rect(this.fieldSize*i,this.fieldSize*j,this.fieldSize,this.fieldSize);
                        if(this.grid[i][j].neighbourMines>0){
                            let textOutput=this.grid[i][j].neighbourMines.toString();
                            fill(0);
                            textSize(this.fieldSize/2);
                            textAlign(CENTER);
                            text(textOutput,this.fieldSize*(i+0.5),this.fieldSize*(j+0.65));
                        }
                    }
                } else if(this.grid[i][j].marked) {
                    fill(255,0,0);
                    rect(this.fieldSize*i,this.fieldSize*j,this.fieldSize,this.fieldSize);
                }else{
                    fill(100);
                    rect(this.fieldSize*i,this.fieldSize*j,this.fieldSize,this.fieldSize);
                }
            }
        }
        if(this.victory){        
            textSize(floor(this.fieldSize*this.width/6));
            fill(255,255,0);
            text("VICTORY!",width/2,height*0.55);
        }else if(this.boom){
            textSize(floor(this.fieldSize*this.width/6));
            fill(0,255,255);
            text("BOOM!",width/2,height*0.55);
        }
    }

    revealMousePosition(){
        if(this.victory||this.boom){
            return;
        }
        let x = floor(mouseX/this.fieldSize);
        let y = floor(mouseY/this.fieldSize);
        if (x>=0 && x<this.width && y>=0 && y< this.height){
            if(!this.initialised){
                this.insertMines(x, y);
                this.initialised=true;
            }
            if(!this.grid[x][y].revealed && !this.grid[x][y].marked){           
                if(this.grid[x][y].hasMine){
                    this.boom=true;
                    console.log("BOOM!");
                    this.revealAll();
                }else{
                    this.revealAdjusted(x,y);
                    console.log(this.leftToReveal.toString()+" left to reveal");
                }
                if(this.leftToReveal===0){
                    this.victory=true;
                    console.log("VICTORY!");
                }
            }
        }
    }

    markMousePosition(){
        if(this.victory||this.boom){
            return;
        }
        let x = floor(mouseX/this.fieldSize);
        let y = floor(mouseY/this.fieldSize);
        if (x>=0 && x<this.width && y>=0 && y< this.height){
            if(!this.grid[x][y].revealed){
                if(this.grid[x][y].marked){
                    this.grid[x][y].marked=false;
                    --this.marked;
                }else{
                    this.grid[x][y].marked=true;
                    ++this.marked;
                }
                console.log(this.numberOfMines+" total mnines."+this.marked.toString()+" marked.");
            }
        }
    }

    revealAll(){
        for(let row of this.grid){
            for(let element of row){
                element.revealed=true;
            }
        }
    }
}