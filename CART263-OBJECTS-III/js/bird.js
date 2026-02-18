class Bird {
  // Create a new bird object that moves to the right
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
    this.animalBody = document.createElement("div");
  }

  // Move the bird according to its velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
    //update the actual div...
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
  }

  // Wrap the bird if it reaches the right edge
  wrap() {
    if (this.x > window.innerWidth) {
      this.x -= window.innerWidth;
    }
  }

  // Display the bird as a ellipse
  renderAnimal() {
    this.animalBody.classList.add("animal");
    this.animalBody.style.width = this.width + "px";
    this.animalBody.style.height = this.height + "px";
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
    this.animalBody.style.borderRadius = this.width + "px";
    this.animalBody.style.backgroundColor = `rgb(106, 90, 205)`;
    //add to the DOM
    document.getElementsByClassName("grass")[0].appendChild(this.animalBody);
  }
}
