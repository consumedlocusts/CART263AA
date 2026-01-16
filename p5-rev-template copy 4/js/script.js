"use strict";
let counter = 0;
let orange = {
  x: 80,
  y: 50,
  w: 90,
  h: 90,
  r: 255,
  g: 165,
  b: 0,
};
let ellipseAlpha;
let radius;
function setup() {
  createCanvas(800, 800);
}
function draw() {
  background(0);
  displaySquare();
}

function displaySquare() {
  //checking to make the color change
  if (checkSquare()) {
    fill("#f9ca5cff");
  } else {
    //rbg bruh be fr
    fill(orange.r, orange.g, orange.b);
  }
  rect(orange.x, orange.y, orange.w, orange.h);
}
//check it like  squre cuz its got 4 coordnates ig
function checkSquare() {
  if (
    mouseX >= orange.x &&
    mouseX <= orange.x + orange.w && //fool
    mouseY >= orange.y &&
    mouseY <= orange.y + orange.h
  ) {
    return true;
  } else {
    return false;
  }
  //idk how to make this simpler
}
function mousePressed() {
  if (checkSquare()) {
    counter++;
    //ez
  }
}
