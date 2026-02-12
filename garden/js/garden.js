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
};
