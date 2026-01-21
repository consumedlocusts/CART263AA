"use strict";
//I must get rid of objects sadly
//sizes instead :-O i dislike the blending of commas actually skill issue
let x1 = 100;
let y1 = 100;
let x2 = 250;
let y2 = 250;
let x3 = 400;
let y3 = 0;

let r = 255;
let g = 0;
let b = 0;
//i refuse let r=,b=,g= hiiii how r u
//stop
function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);
  //FILE LSIT stop
  fill(r, g, b);
  rect(x1, y1, 45, 45);

  fill(r, g, b);
  rect(x2, y2, 30, 30);

  fill(r, g, b);
  rect(x3, y3, 60, 60);
}

function mousePressed() {
  const distance = (mouseX, mouseY, x1, y1);
  const mouseOverlapsRect1 = (distance < x1 / 2, y1 / 2);
  if (mouseOverlapsRect1 && mousePressed) {
    x1 = random(300);
    y1 = random(300);
    //i figured
  }
}
function keyPressed() {
  if (keyPressed) {
    //move around the random canvas
    x2 = random(600);
    y2 = random(600);
  }
}
function mouseMoved() {
  if (mouseMoved) {
    //add frames pivoting effect idk
    y3 = y3 + 6;
  }
}
