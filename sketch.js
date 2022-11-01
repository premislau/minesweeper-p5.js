const h=8; //number, heightof the board
const w=12; //number, width of the board
const filedSize=60; //number, height and witdth of each field of the board
const numberOfMines=10; //number

let board; //Board
let flagMode = false; //boolean


function setup() {
  createCanvas(w*filedSize,h*filedSize);
  if(h*w-numberOfMines>=1){
    board=new Board(w,h,numberOfMines,filedSize);
  }else{
    throw "too many mines!";
  }
}

function draw() {
  board.show();
}

function keyPressed(){
  if (keyCode === 70){//f
    flagMode=true;
  }
}

function keyReleased(){
  if (keyCode === 70){//f
    flagMode=false;
  }
}

function mouseClicked(){
  if(flagMode){
    board.markMousePosition()
  } else{
    board.revealMousePosition();
  }
}