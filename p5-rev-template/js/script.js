"use strict";
let x, y, w, h, r, g, b;

function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);

  noStroke();
  ellipse(
    (x = 200),
    (y = 30),
    (w = 50),
    (h = 50),
    (r = 90),
    (g = 80),
    (b = 40)
  );

  noStroke();
  ellipse(
    (x = 80),
    (y = 60),
    (w = 30),
    (h = 50),
    (r = 900),
    (g = 890),
    (b = 420)
  );
  noStroke();
  ellipse(
    (x = 300),
    (y = 300),
    (w = 80),
    (h = 90),
    (r = 390),
    (g = 390),
    (b = 320)
  );
}
