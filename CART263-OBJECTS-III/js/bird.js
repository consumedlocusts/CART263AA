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
    this.originalY = this.y;

    //ONLY in the Bird class : new variables
    this.angle = 0;
    this.sleepiness = 0.1;

    // override A - p1
    // Move the Animal according to its velocity
    //   move() {
    //     //console.log("go");

    //     this.y = this.originalY + Math.sin(this.angle) * 8;
    //     this.angle += 0.05;
    //     this.veer();
    //     super.move();
    //   }
    //   // p2
    //   // veer() causes the bird to randomly veer on the y axis
    //   veer() {
    //     let r = Math.random();
    //     //console.log("in veer "+r)
    //     if (r < this.sleepiness) {
    //       this.vy += randomRange(-0.1, 0.1);
    //     }
    //   }

    // Display the bird as a ellipse
    //   renderAnimal() {
    //     // Remember to call the superclass' version of this method!
    //     super.renderAnimal();
    //     this.animalBody.classList.add("animal");
    //     this.animalBody.style.width = this.width + "px";
    //     this.animalBody.style.height = this.height + "px";
    //     this.animalBody.style.left = this.x + "px";
    //     this.animalBody.style.top = this.y + "px";
    //     this.animalBody.style.borderRadius = this.width + "px";
    //     this.animalBody.style.backgroundColor = `rgb(106, 90, 205)`;
    //     document.getElementsByClassName("sky")[0].appendChild(this.animalBody);
  }

  renderAnimal() {
    // Remember to call the superclass' version of this method!
    super.renderAnimal();
    this.animalBody.style.backgroundColor = `rgb(106, 90, 205)`;
    document.getElementsByClassName("sky")[0].appendChild(this.animalBody);
  }
}
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
