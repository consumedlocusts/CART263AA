// NEW! 1. We show that the Dog is a subclass of Animal by using the
// key word "extends" and then the name of the class it extends
// Our Dog extends the Animal class...

class Dog extends Animal {
  // Create a new Dog object that moves to the right
  constructor(x, y, width, height) {
    // NEW! 2. We call the Animals's constructor() first!
    // Because the Animal is the superclass for our Dog, we call its constructor super()!
    // So super(x,y) means: call the superclass' constructor with arguments
    // x and y (values passed in as arguments when the Dog is created)
    super(x, y, width, height);

    // After using the Animals's constructor() we need to set
    // the Animals properties to the specific values for a Dog
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
    this.animalBody = document.createElement("div");
  }
  // 3. We don't need to define move() or wrap() because they are already part
  // of the Animal class so our Dog inherits them
  // Move the Dog according to its velocity

  //  we do want to define this - as we want to visualize a dog specifically
  renderAnimal() {
    // Even though the Animals's version of renderAnimal() does nothing, we should STILL
    // call it. The variable "super" contains a reference to the Animal's part of this dod,
    // so we can call the Animal version of the renderAnimal() method by writing:
    super.renderAnimal();

    this.animalBody.classList.add("animal");
    this.animalBody.style.width = this.width + "px";
    this.animalBody.style.height = this.height + "px";
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
    this.animalBody.style.borderRadius = this.width + "px";
    //add to the DOM
    document.getElementsByClassName("grass")[0].appendChild(this.animalBody);
  }
}
