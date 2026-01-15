"use strict";
let rect1 = ((x = 300), (y = 300), (w = 40), (h = 40));
let rect2 = ((x = 400), (y = 400), (w = 40), (h = 40));
let rect3 = ((x = 500), (y = 500), (w = 40), (h = 40));
function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);
}

function mousePressedRect() {
  const distance = (mouseX, mouseY, rect1.x, rect1.y);
  const mouseOverlapsRect1 = distance < rect1.x / 2;
  if (mousePressed && mouseOverlapsRect1) {
    rect1.x = 400;
  }
}
