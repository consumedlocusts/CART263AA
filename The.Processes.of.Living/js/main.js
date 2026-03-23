"use strict";
//state changer/manager class
//ok fix later bur creates the statemangaer
let manager;
function setupManager() {
  manager = new StateManager(document.getElementById("opening"));
  manager.add("opening", document.getElementById("opening"));
  // manager.add("opening", document.getElementById("opening"));
  manager.add("future", document.getElementById("future"));
}

//return button when ready

// function setupButtons() {
//   document.getElementById("future-return");
//   document.addEventListener("click", function () {
//     //  manager.switchTo("opening");
//   });
// }
