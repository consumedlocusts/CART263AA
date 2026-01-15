"use strict";
let rect1 = { x: 300, y: 300, w: 40, h: 40 };
let rect2 = { x: 400, y: 400, w: 40, h: 40 };
let rect3 = { x: 500, y: 500, w: 40, h: 40 };
function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);
  noStroke();
  rect(rect1.x, rect1.y, rect1.w, rect1.h);
  noStroke();
  rect(rect2.x, rect2.y, rect2.w, rect2.h);
  noStroke();
  rect(rect3.x, rect3.y, rect3.w, rect3.h);
}

function mousePressed() {
  const distance = (mouseX, mouseY, rect1.x, rect1.y);
  const mouseOverlapsRect1 = (distance < rect1.x / 2, rect1.y / 2);
  if (mouseOverlapsRect1 && mousePressed) {
    rect1.x = 500;
    rect1.y = 500;
  }
}
function keyPressed() {
  if (keyPressed) {
    rect2.x = 20;
    rect2.y = 30;
  }
}
function mouseMoved() {
  if (mouseMoved) {
    rect3.x = 95;
    rect3.y = 200;
  }
}
