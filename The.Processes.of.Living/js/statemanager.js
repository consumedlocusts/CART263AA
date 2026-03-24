class StateManager {
  constructor(current) {
    //all elements of states storage
    this.states = {};
    //current state visible storeage
    //this.current = current;
    this.current = null;
  }
  add(name, element) {
    //store the element o state by name
    //save a DOM element under a name like "opening" or "future"
    this.states[name] = element;
  }
  switchTo(name) {
    //hide current is theres alreayd another activated
    if (this.current) {
      this.current.style.display = "none";
    }
    //set new current state
    this.current = this.states[name];
    //show it
    this.current.style.display = "flex";
    //if entered the future mode n then reset that game
    if (name === "future") {
      futureGame.enter();
    }
  }
}
//sorrry i wrote this in the wrong js
// class TheFuture {
//   //get element ID stuff
//   constructor() {
//     this.canvas = document.getElementById("future-canvas");
//   }
// }
