function createFlower() {
  // Create our object
  let flower = {
    // Position and size information
    x: Math.random() * window.innerWidth,
    y: Math.random() * 120,
    size: 40,
    stemLength: 75,
    stemThickness: 10,
    petalThickness: 8,
    flowerStemDiv: document.createElement("div"),
    flowerPetalDiv: document.createElement("div"),

    // Color information
    stemColor: {
      r: 50,
      g: 150,
      b: 50,
    },
    petalColor: {
      r: 200,
      g: 50,
      b: 50,
    },
    centreColor: {
      r: 50,
      g: 0,
      b: 0,
    },
  };
  return flower;
}
