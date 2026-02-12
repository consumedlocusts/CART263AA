class Flower {
  constructor() {
    // We write instructions to set up a Flower here
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * 120;
    this.size = 40;
    this.stemLength = 75;
    this.stemThickness = 10;
    this.petalThickness = 8;
    this.flowerStemDiv = document.createElement("div");
    this.flowerPetalDiv = document.createElement("div");

    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50,
    };
    this.petalColor = {
      r: 200,
      g: 50,
      b: 50,
    };
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0,
    };
  }
}
