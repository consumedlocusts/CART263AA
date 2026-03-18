//BILLY BALL th e magical
//global ooops
//let manager; //issinged in main (oneforth.js)
//let futureGame; //assigned in set up

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
//loaded from the #responsesdata JSON block in index.html sooo
//something like  <script id="responses-data" type="application/json"></script>
//type="application/json" find in html VVVVV
//i cant use windlow.onload because it is overriding my p5 (its already using it, would stop set up from ever playing) and i put this script at the end of body so "can be read directly"
//the awnsers live in index.html as json block
let responsesEl = document.getElementById("responses-data");
if (responsesEl) {
  responses = JSON.parse(responsesEl.textContent);
  console.log("loaded " + responses.length + " responses");
} else {
  console.log("you suck");
}
function preload() {
  billy = loadImage("assets/8ball.jpg");
}
function setup() {
  let cnv = createCanvas(640, 640);
  cnv.parent("ball-container");
  //cnv.parent("ball-er")
  background(0);
  //stripped from previous billy.ball code messy sorry
  textSize(15);
  textAlign(LEFT, BOTTOM);
  charWid = textWidth("W");
  charHi = textAscent() + textDescent();
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
    //futureGame = new OneForth();
  }
}
function draw() {
  //hover ing adding the letters hovering in the middle yes
  background(0);

  checkHover();
  //scroll the letters/advance the scroll pos counter while reveal it running
  if (revealActive) {
    revealFrame++;
  }
  //char counter for the lettrers
  for (let i = 0; i < chars.length; i++) {
    let c = chars[i];
    let d = dist(mouseX, mouseY, c.x, c.y);
    let hover = d < 50;

    let displayChar = c.listString;
    //"bands" are the cells insdie the horz center "bands" of text that scroll and show the text in red
    //numbers are kinda random, tried to use a "screen measurere" idk
    if (revealActive) {
      let bandTop = height * 0.43;
      let bandBottom = height * 0.58;
      let bandLeft = width * 0.29;
      let bandRight = width * 0.71;
      //this is them as a whole so alternates can be made
      let inBand =
        c.y > bandTop && c.y < bandBottom && c.x > bandLeft && c.x < bandRight;

      if (inBand) {
        //idk i saw this somewhere / sourced it from "city signs neon"
        //localCol = this cell's column offset from the band's left edge
        let localCol = floor((c.x - bandLeft) / charWid);
        let scrollIndex =
          (localCol + floor(revealFrame / 2)) % revealMessage.length;
        displayChar = revealMessage[scrollIndex];

        fill("#c60606");
        text(displayChar, c.x + charWid / 2, c.y + charHi / 2);
        //this cell is already drawn in red, skip the normal fill = continue
        continue;
      }
    }
    //fill normlly back to normal ascii
    if (hover && mouseIsPressed) {
      fill("#c60606ff");
    } else {
      fill("rgba(227, 227, 227, 0.74)");
    }

    text(displayChar, c.x + charWid / 2, c.y + charHi / 2);
  }
}
//controls the reverting from normal text to the future text,
//  replaces each celll from the istString with otherListString (the image-mapped character) when the mouse passes within 50px and once a cell
// is revealed it never reverts
function checkHover() {
  for (let i = 0; i < chars.length; i++) {
    let d = dist(mouseX, mouseY, chars[i].x, chars[i].y);
    if (d < 50) {
      chars[i].listString = chars[i].otherListString;
    }
  }
}
//NOT WORKINGGGGGG
function mousePressed() {
  // if (manager.current !== document.getElementById("opening")) {
  //   return; //do nothing if screen is not running or currently showing
  // }
  let insideBall = dist(mouseX, mouseY, width / 2, height / 2) < 180;
  if (insideBall && revealActive === false) {
    //picks random number from array and floor(random) giving integer 0 to n-1 SOURCE:LINK HERE
    let pick = responses[floor(random(responses.length))];
    //result
    revealResult = pick;
    //the scroll here ensures theres no gaps and also replays the message thrice liike the
    revealMessage = "   " + pick + "   " + pick + "   " + pick + "   ";
    revealFrame = 0;
    revealActive = true; //frame checker??????
    //cancel out previous leftover from clicking
    clearTimeout(revealTimer);
    //the scrolling stops after 1.7 seconds of playing
    revealTimer = window.setTimeout(function () {
      revealActive = false;
      console.log("result was: " + revealResult);
    }, 1700);
  }
}
