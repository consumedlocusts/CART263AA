"use strict";
const canSize = 600;
const w = canSize / 3;
const h = canSize;
//make objects the colors i suppose it is NOT a flag
const col1 = { c: "olive" };
const col2 = { c: "brown" };
const col3 = { c: "grey" };

function setup() {
  console.log("go");
  createCanvas(600, 600);
}

function draw() {
  background(0);

  noStroke();
  fill(col1.c);
  rect(0, 0, w, h);
  //i dont think im supposed to pushpop
  //unncessary numbers and objects removed, y = 0
  noStroke();
  fill(col2.c);
  rect(w, 0, w, h);

  noStroke();
  fill(col3.c);
  rect(w * 2, 0, w, h);
}

function mouseMoved() {
  //call and reset the colors again to be used and not turn stringy,
  // also so that the colors reset obv
  col1.c = "olive";
  col2.c = "brown";
  col3.c = "grey";

  if (mouseX < w) {
    col1.c = "white";
  }
  //check 2 see if mouse is in the pixel range without that distance stuff
  else if (mouseX < w * 2) {
    col2.c = "white";
  }
  //liek 1,2,3
  else if (mouseX < w * 3) {
    col3.c = "white";
  }
}
