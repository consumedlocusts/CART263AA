window.onload = function () {
  let shades = [
    "#7fb3d5", //grey blue first
    "#76d7c4",
    "#f7dc6f",
    "#eb984e",
    "#cb4335",
    "#8e44ad",
    "#2e4053",
    "#e5e7e9",
  ];

  console.log("timers running");
  for (let i = 0; i < 24; i++) {
    //for each x - make a column of changing y's
    for (let j = 0; j < 24; j++) {
      //create a grid cell with a div
      let parent = document.getElementById("parent");
      let d = document.createElement("div");
      d.classList.add("grid-cell");
      parent.appendChild(d);

      d.style.left = (i + 1) * 25 + "px";
      d.style.top = (j + 1) * 25 + "px";
    }
  }
  let gridCells = document.querySelectorAll(".grid-cell");
  let divisor = 2;
  //   for (let i = 0; i < gridCells.length; i++) {
  //     // if(i%divisor===0){
  //     //     gridCells
  //     // }
  //     if (i % 24 === 0) {
  //       if (currentShadeIndex === 0) {
  //         currentShadeIndex = 1;
  //       } else {
  //         currentShadeIndex = 0;
  //       }
  //     }
  //     gridCells[i].style.background = shades[currentShadeIndex];
  //   }

  let changingDivisor = 0;
  window.setInterval(animate_rows, 1000);
  function animate_rows() {
    changingDivisor += 1;
    console.log(changingDivisor);
  }
};
