window.onload = function () {
  // Our garden
  let garden = {
    // An array to store the individual birds
    birds: [],
    // How many birds in the garden
    numBirds: 10,
    numDogs: 10,
    dogs: [],
    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },

    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },
  };
  // new  sun instancce
  let sun = new Sun(10, 10, { r: 240, g: 206, b: 83 });

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);
    //sun
    sun.renderSun();

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);
  }
  function createDogs() {
    for (let i = 0; i < garden.numDogs; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * 100;
      let dog = new Dog(x, y, 15, 15);
      garden.dogs.push(dog);
    }
  }
  function createBirds() {
    for (let i = 0; i < garden.numBirds; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * 100;
      let bird = new Bird(x, y, 15, 15);
      garden.birds.push(bird);
    }
  }
  function renderAnimals() {
    // Go through all the animals and move, wrap, and display them
    for (let i = 0; i < garden.dogs.length; i++) {
      let dog = garden.dogs[i];
      dog.move();
      dog.wrap();
    }
    for (let i = 0; i < garden.birds.length; i++) {
      let bird = garden.birds[i];
      bird.move();
      bird.wrap();
    }
  }

  createAndRenderTheGarden();
  createDogs();
  createBirds();
  renderAnimals();
  window.requestAnimationFrame(updateGarden);
  function updateGarden() {
    // Go through all the animals and move, wrap, and display them
    for (let i = 0; i < garden.dogs.length; i++) {
      let dog = garden.dogs[i];
      dog.move();
      dog.wrap();
    }
    // Go through all the birds and move, wrap, and display them
    for (let i = 0; i < garden.birds.length; i++) {
      let bird = garden.birds[i];
      bird.move();
      bird.wrap();
    }
    window.requestAnimationFrame(updateGarden);
  }
};
