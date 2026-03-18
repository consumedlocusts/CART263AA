"use strict";
//state changer/manager class
//ok fix later bur creates the statemangaer

function setupManager() {
  manager = new StateManager();

  manager.add("opening", document.getElementById("opening"));
  // manager.add("future", document.getElementById("future"));

  manager.switchTo("opening");
}

//return button when ready

function setupButtons() {
  document.getElementById("future-return");
  document.addEventListener("click", function () {
    // manager.switchTo("opening");
  });
}

// class StateManager {
//   constructor() {
//     //all elements of states storage
//     this.states = {};
//     //current state visible storeage
//     this.current = null;
//   }
//   add(name, state) {
//     //store the element o state by name
//     this.states[name] = state;
//   }
//   switch(name) {
//     //hide current is theres alreayd another activated
//     if (this.current) {
//       this.current.style.display = "none";
//     }
//     //set new current state
//     this.current = this.states[name];
//     //show it
//     this.current.style.display = "block";

//     // if (name === "future") {
//     //   futureThe.enter;
//     // }
//   }
// }
// //sorrry i wrote this in the wrong js
// class TheFuture {
//   //get element ID stuff
//   constructor() {
//     this.canvas = document.getElementById("future-canvas");
//   }
// }
