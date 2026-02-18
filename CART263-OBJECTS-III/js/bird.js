class Bird extends Animal {
  // Create a new bird object that moves to the right

  constructor(x, y, width, height) {
    // Call the Animal's constructor()
    // Remember, it's called super() when we call it from a subclass
    super(x, y, width, height);
    // Set our properties to the specific bird values
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
    this.animalBody = document.createElement("div");
  }

  // Display the bird as a ellipse
  renderAnimal() {
    // Remember to call the superclass' version of this method!
    super.renderAnimal();
    this.animalBody.classList.add("animal");
    this.animalBody.style.width = this.width + "px";
    this.animalBody.style.height = this.height + "px";
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
    this.animalBody.style.borderRadius = this.width + "px";
    this.animalBody.style.backgroundColor = `rgb(106, 90, 205)`;
    //add to the DOM
    document.getElementsByClassName("sky")[0].appendChild(this.animalBody);
  }
}
