"use strict";
//p5ok
let word = "test";
let string;
let xw = 24; //step per pixel between numebrs
let yh = 20; //margin of the pixels
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}
function draw() {
  background(20);
  fill("white");

  textSize(28);
  text(word, width / 2, height / 2);

  for (let i = 0; i <= 9; i++) {
    let x = yh + i * xw;
    let y = 20;
    text(i, x, y);
  }
  for (let i = 0; i <= 15; i++) {
    //looks good because the two 0s blend over eachother. cux of the step
    let x = 20;
    let y = yh + i * xw;
    text(i, x, y);
  }
}
