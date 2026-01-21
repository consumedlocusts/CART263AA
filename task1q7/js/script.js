"use strict";
//the most strange grid, with improper use of arrays cuz i frogot
let rows;
let cols;
let epSize = 80;
let spacing;
let square = false;
let colors = [];
function setup() {
  createCanvas(800, 800);
  background(0);
  //ralculate spacing based on number of columns and rows

  epSize = constrain((epSize / 5) * 5, 5, 100); //this is just saying nothing atp
  spacing = epSize;
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  colorRand();
}

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let epX = x * spacing + spacing / 2;
      let epY = y * spacing + spacing / 2;
      //fill("brown");
      let idx = x + y * cols; //INDEX OF THE COLORS BY CELLS ok chill cap slok
      fill(colors[idx]);
      if (square) {
        rectMode(CENTER);
        rect(epX, epY, epSize, epSize);
      } else {
        ellipse(epX, epY, epSize);
      }
    }
  }
}
function mousePressed() {
  square = !square;
}
function keyPressed() {
  if (key === " ") {
    colorRand();
  }
}
function colorRand() {
  //each ep is accounted for and changes color at random instead of all the circles a unifomr tone
  //or I may change it to a gradient
  colors = [];
  for (let i = 0; i < rows * cols; i++) {
    colors[i] = color(random(255), random(255), random(255));
  }
}
