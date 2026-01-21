"use strict";
let x, y, w, h, r, g, b;

function setup() {
  console.log("go");
  createCanvas(600, 600);
  drawEllipse(120, 230, 100, 50, 195, 250, 90);
  drawEllipse(430, 300, 58, 93, 90, 143, 432);
  drawEllipse(300, 300, 220, 60, 140, 20, 50);
}
//odd face in the snow
function drawEllipse(x, y, w, h, r, g, b) {
  fill(r, g, b);
  ellipse(x, y, h, w);
}
