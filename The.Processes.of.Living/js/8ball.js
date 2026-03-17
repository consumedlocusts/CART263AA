//BILLY BALL th e magical
//global ooops
let manager;
let charWid;
let charHi;
let horz;
let vert;

let billy;
let startIndex = 0;
let mouseOverlapsText = 0;
let chars = [];
let startString = "1234567890123456789012345678901234567890";
let otherString;

//Timerss
let revealMessage = "";
let revealFrame = 0;
let revealActive = false;
let revealResult = "";
let revealTimer = null;
//list of possibke results, i just doubled the words to make it more or less common idk
const responses = [
  "IT IS CERTAIN",
  "ASK AGAIN LATER",
  "WITHOUT A DOUBT",
  "CANNOT PREDICT NOW",
  "OUTLOOK GOOD",
  "VERY DOUBTFUL",
  "REPLY HAZY",
  "DON'T COUNT ON IT",
  "YES",
  "NO",
  "IT IS CERTAIN",
  "ASK AGAIN LATER",
  "WITHOUT A DOUBT",
  "CANNOT PREDICT NOW",
  "OUTLOOK GOOD",
  "VERY DOUBTFUL",
  "REPLY HAZY",
  "DON'T COUNT ON IT",
  "YES",
  "NO",
  "FUTURE",
];
function preload() {
  billy = loadImage("assets/8ball.jpg");
}
function setup() {
  background(0);
  //stripped from previous billy.ball code
  textSize(15);
  textAlign(LEFT, BOTTOM);
  //char fit
  horz = floor(width / charWid);
  vert = floor(height / charHi);

  let grid = horz * vert;
  //resizing
  billy.resize(horz, vert);
  billy.loadPixels();

  //char list w image to text grid
  for (let counter = 0; counter < grid; counter = counter + 1) {
    let h = counter % horz;
    let v = floor(counter / horz);

    //let me = (v * billy.width + h) * 4;
  }
}
