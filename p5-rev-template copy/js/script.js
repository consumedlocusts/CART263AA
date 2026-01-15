"use strict";
let x, y, w, h, r, g, b;

function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);
  drawEllipse(20, 30, 60, 50, 400, 500, 500);
  drawEllipse2(43, 83, 93, 93, 400, 500, 500);
  drawEllipse3(23, 205, 63, 30, 400, 500, 500);
}

function drawEllipse(x, y, w, h, r, g, b) {
  ellipse(x, y, h, w, r, g, b);
}
function drawEllipse2(x, y, w, h, r, g, b) {
  ellipse(x, y, h, w, r, g, b);
}
function drawEllipse3(x, y, w, h, r, g, b) {
  ellipse(x, y, h, w, r, g, b);
}
