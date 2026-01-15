"use strict";
let rect1 = { x: 300, y: 300, w: 40, h: 40 };
let rect2 = { x: 400, y: 400, w: 40, h: 40 };

function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);
  noStroke();
  rect(rect1.x, rect1.y, rect1.w, rect1.h);
}

function mousePressedRect() {
  const distance = (mouseX, mouseY, rect1.x, rect1.y);
  const mouseOverlapsRect1 = (distance < rect1.x / 2, rect1.y / 2);
  if (mouseOverlapsRect1) {
    rect1.x = rect1.x / 2;
  }
}
