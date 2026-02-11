function setup_E() {
  //1: Dylan-MOUSECLICK: Grid of 50 letters, space randomizes, look for words
  // 2:SAMA-HOVER: Picturegrid randomized color change, with hover effect
  //3:Dylan-KEY:
  //4: Shrook-ANIMATION:
  /** THEME: SARCASM  */
  //god be with us
  function aniA(parentCanvas) {
    console.log("TEAM E aniA");
    parentCanvas.innerHTML = "";
  }
  function setup_E() {
    activateButtons(`#TEAM_E`, "ani_canvE", aniA, aniB, aniC, aniD);

    function aniA(parentCanvas) {
      parentCanvas.innerHTML = "";
    }

    function aniB(parentCanvas) {
      parentCanvas.innerHTML = "";
      parentCanvas.style.position = "relative";
      parentCanvas.style.overflow = "hidden";

      let img = document.createElement("img");
      img.src = "./teamEimages/oneImage.jpg";
      img.style.position = "absolute";
      img.style.left = "0px";
      img.style.top = "0px";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      parentCanvas.appendChild(img);

      let step = 20;
      let tileSize = 18;
      let rect = parentCanvas.getBoundingClientRect();

      for (let y = 0; y < rect.height; y += step) {
        for (let x = 0; x < rect.width; x += step) {
          let tile = document.createElement("div");
          tile.style.position = "absolute";
          tile.style.left = x + "px";
          tile.style.top = y + "px";
          tile.style.width = tileSize + "px";
          tile.style.height = tileSize + "px";
          tile.style.background = "red";
          tile.style.zIndex = "2";
          parentCanvas.appendChild(tile);

          tile.addEventListener("mouseover", function () {
            this.remove();
          });
        }
      }
    }

    function aniC(parentCanvas) {
      parentCanvas.innerHTML = "";
    }

    function aniD(parentCanvas) {
      parentCanvas.innerHTML = "";
    }
  }
}
