"use strict";
//state changer/manager class
//ok fix later bur creates the statemangaer
//FIX: manager and futureGame declared here as proper globals
let manager;
let futureGame;
function setupManager() {
  manager = new StateManager();
  //(document.getElementById("opening"));
  manager.add("opening", document.getElementById("opening"));
  // manager.add("opening", document.getElementById("opening"));
  manager.add("future", document.getElementById("future"));
  manager.switchTo("opening");
}

//return button when ready
//brings back after no ball content
function setupButtons() {
  document
    .getElementById("future-return")
    .addEventListener("click", function () {
      manager.switchTo("opening");
    });
}
