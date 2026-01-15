"use strict";
const w = 600 / 3;
const h = 600;
let rect1 = { x: 0, y: 0, w: 600 / 3, h: 600, fill: "olive" };
let rect2 = { x: 600 / 3, y: 0, w: 600 / 3, h: 600, fill: "green" };
let rect3 = { x: 400, y: 0, fill: "brown" };
let turnWhite;
false;
function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);
  push();
  noStroke();
  fill(rect1.fill);
  rect(rect1.x, rect1.y, w, h);
  pop();
  push();
  noStroke();
  fill(rect2.fill);
  rect(rect2.x, rect2.y, w, h);
  pop();
  push();
  noStroke();
  fill(rect3.fill);
  rect(rect3.x, rect3.y, w, h);
  pop();
}

function mouseMoved() {
  const distance = (mouseX, mouseY, rect1.x / 2, rect1.y / 2);
  const mouseOverlapsRect1 = (distance < rect1.w / 2, rect1.h / 2);
  if (turnWhite == true) {
    fill;
  }
  if (mouseX >= w / 3 && (w / 3) * 2) {
    rect1.w;
  }
}
function white() {}
