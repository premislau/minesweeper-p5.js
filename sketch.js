let board; //Board
let h=15; //number
let w=15; //number
let filedSize=40; //number
let numberOfMines=40; //number
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