window.onload = function () {
  // Our garden
  let garden = {
    // An array to store the individual flowers
    flowers: [],
    // How many flowers in the garden
    numFlowers: 20,

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

    /*sun object */
    sun: {
      sunColor: {
        r: 240,
        g: 206,
        b: 83,
      },
      //the sun element
      sunDiv: document.createElement("div"),
    },
  };

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(
        ${garden.sky.skyColor.r},
        ${garden.sky.skyColor.g},
        ${garden.sky.skyColor.b}
        )`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);

    //sun - IN the sky
    garden.sun.sunDiv.classList.add("sun");
    garden.sun.sunDiv.style.background = `rgb(
        ${garden.sun.sunColor.r},
        ${garden.sun.sunColor.g},
        ${garden.sun.sunColor.b}
        )`;
    //append to the SKY div
    document.getElementsByClassName("sky")[0].appendChild(garden.sun.sunDiv);

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(
        ${garden.grass.grassColor.r},
        ${garden.grass.grassColor.g},
        ${garden.grass.grassColor.b}
        )`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);
  }
  createAndRenderTheGarden();
  let flower = new Flower();

  //   //let flower = createFlower();
  //   //renderFlower(flower);
  //   for (let i = 0; i < garden.numFlowers; i++) {
  //     garden.flowers.push(createFlower());
  //   }

  //   for (let i = 0; i < garden.flowers.length; i++) {
  //     renderFlower(garden.flowers[i]);
  //   }
};
