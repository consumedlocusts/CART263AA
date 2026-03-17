//BILLY BALL th e magical
//global ooops
let manager; //issinged in main (oneforth.js)
let futureGame; //assigned in set up
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
let revealMessage = ""; //the triad of messages scrolling chosen
let revealFrame = 0; //framecounetr
let revealActive = false; //true while a scrolling answer is on screen
let revealResult = ""; //picked response e.g. "FUTURE" or "YES
let revealTimer = null;
//list of possibke results, i just doubled the words to make it more or less common idk
let responses = [];
//loaded from the #responsesdata JSON block in index.html.

function preload() {
  billy = loadImage("assets/8ball.jpg");
}
function setup() {
  let cnv = createCanvas(640, 640);
  //cnv.parent("ball-er")
  background(0);
  //stripped from previous billy.ball code messy sorry
  textSize(15);
  textAlign(LEFT, BOTTOM);
  //char fit
  horz = floor(width / charWid);
  vert = floor(height / charHi);

  let grid = horz * vert;
  //resizing
  billy.resize(horz, vert);
  billy.loadPixels();
  let charPaint = "Ñ@#W$9876543210?!abc;:+=-,._  ";
  let startString = "1234567890123456789012345678901234567890";
  let total = horz * vert;
  //char list w image to text grid
  for (let i = 0; i < total; i++) {
    let col = i % horz;
    let row = floor(i / horz);
    let px = (row * billy.width + col) * 4;
    let r = billy.pixels[px];
    let g = billy.pixels[px + 1];
    let b = billy.pixels[px + 2];
    let brightness = (r + g + b) / 3;
    let paintIndex = floor(map(brightness, 0, 255, 0, charPaint.length - 1));
    chars.push({
      listString: startString[i % startString.length],
      otherListString: charPaint[paintIndex],
      x: col * charWid,
      y: row * charHi,
    });
    //let me = (v * billy.width + h) * 4;
    setupManager();
    setupButtons();
    futureGame = new OneForth();
  }
}
