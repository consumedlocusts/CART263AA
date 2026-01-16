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
let ellipseAlpha = 10;
let radius = 80;
function setup() {
  createCanvas(800, 800);
}
function draw() {
  background(0);
  displaySquare();
  if (counter < 1 || counter > 10) {
    return; //  /|O___o|\
  }
  let i = 0;
  while (i < counter) {
    //test
    //centereed in ze canvas
    //basically elipalph + i * 20 is just saying increment by 20 or wahetevr each time
    fill(255, 255, 255, ellipseAlpha + i * 10);
    ellipse(width / 2, height / 2, radius + i * 40, radius + i * 40);

    //Increment by 20. True!!
    i++;
  }
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
