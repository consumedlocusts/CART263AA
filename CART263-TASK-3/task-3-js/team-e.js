setup_E();
//1: Dylan-MOUSECLICK: Grid of 50 letters, space randomizes, look for words
// 2:SAMA-HOVER: Picturegrid randomized color change, with hover effect
//3:Dylan-KEY:
//4: Shrook-ANIMATION:
/** THEME: SARCASM  */
function setup_E() {
  console.log("in e");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_E`, "ani_canvE", aniA, aniB, aniC, aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  ///
  ///

  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
    console.log("in ani-B -teamE");

    /****************ANI C ************************************ */
    /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
    /****************ANI C************************************ */
    /**************** TASK *******************************************
     * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
     * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
     * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
     *
     * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
     * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
     * this is so that your styles are not overriden by other teams.
     * NOTE::: All your code is to be added here inside this function -
     * remember you can define other functions inside....
     * Do not change any code above or the HTML markup.
     * **/

    /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
     * using  ONLY key down and/or keyup -- any keys::
     */

    console.log("TEAM E, Sama's image grid thhing HOVERINGG");

    //NOTE : im not using image src because the grid effect is built from div tiles CSS background images (not <img> elmnt)
    //im taking one WHOLE image and slicing it into each grid tile, showing a different cropped bit of the SAME image(using background-position)
    //since I am doing a "grid revealed per tile/box"
    let imgPath = "teamEimages/oneImagecopy.jpg"; //soon i will upload the image, but for now this is the new team E file path
    let step = 20; //grid layout: spacing between cells
    let tileSize = 18; //grid layout: actual tile sizes
    let totalTiles = 0; //for track revealing bool progress
    let revealedT = 0;
    parentCanvas.innerHTML = "";
    let rect = parentCanvas.getBoundingClientRect(); //rendered size of thhis canvas to get
    //building the initial "hidden" style grid with nests
    for (let y = step; y < rect.height; y += step) {
      for (let x = step; x < rect.width; x += step) {
        let tile = document.createElement("div");
        tile.classList.add("TEAM_E_cell");
        parentCanvas.appendChild(tile);

        //placing tiles
        tile.style.left = x + "px";
        tile.style.top = y + "px";
        tile.style.width = tileSize + "px";
        tile.style.height = tileSize + "px";
        //keeping the same image fo every tile but its hidden by the inital first layer of red grids
        //use image file as bacjground image for/as specified div tile
        tile.style.backgroundImage = "url(" + imgPath + ")";
        //stroing tile pos for image slicing
        tile.setAttribute("x", x);
        tile.setAttribute("y", y);
        //track if tile haas been revealed
        tile.setAttribute("revealed", "no");
        tile.style.backgroundColor = "red";
        //hover reveal effect listener
        tile.addEventListener("mousemove", revealTile);
        //counter
        totalTiles += 1;
      }
    }
    function revealTile() {
      //"this" is the tile div the mouse is currently over
      //parseInt converts attrb strings into numbers
      let x = parseInt(this.getAttribute("x"));
      let y = parseInt(this.getAttribute("y"));
      //show correct slice of the only (one) image inside this tile
      //the bgative background pos is saying"move image left/up under the winow"
      this.style.backgroundPosition = -x + "px " + -y + "px";
      //make tile visible bt removing the red layer mask
      this.style.backgroundColor = "transparent";

      //and coubt this tile as revealed only once; attribute toggle
      if (this.getAttribute("revealed") === "no") {
        this.setAttribute("revealed", "yes");
        revealedT += 1;
      }
    }

    function aniC(parentCanvas) {
      console.log("in ani-C -teamE");

      /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
      windowKeyDownRef = function (e) {
        //code for key down in here
        console.log(e);
        console.log("e-down");
      };

      /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
      windowKeyUpRef = function (e) {
        console.log(e);
        console.log("e-up");
      };
      //DO NOT REMOVE
      window.addEventListener("keydown", windowKeyDownRef);
      window.addEventListener("keyup", windowKeyUpRef);
    }
  }
  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
  function aniD(parentCanvas) {
    console.log("in ani-D -teamE");

    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let size = 7;
    let squareS = 60;

    // I am going to try something else

    //this is for making a background of a chess board
    //a grid of squares
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        //create divs for the squares
        let square = document.createElement("div");

        //charactersitcs for the squares
        square.style.left = col * 52 + "px";
        square.style.top = row * 52 + "px";
        square.style.width = squareS + "px";
        square.style.height = squareS + "px";
        square.style.position = "absolute";

        //make it white and black
        square.style.backgroundColor =
          (row + col) % 2 === 0 ? "white" : "black";
        /*   if ((row + col) % 2 === 0) {
            square.style.backgroundColor = "white";
          } else {
            square.style.backgroundColor = "black";
          } */
        //append it to parent
        parentCanvas.appendChild(square);
      }
    }
    let ellipseS = 35;
    let circles = [];
    let images = ["image1.png", "image2.png", "image3.png"];

    //for circles/images
    function addCircles(row, col) {
      //create divs for the images
      let pawn = document.createElement("div");
      //characteristicsfor the images
      pawn.style.position = "absolute";
      pawn.style.width = 50 + "px";
      pawn.style.height = 50 + "px";
      //ellipse.style.borderRadius = "50%";
      // ellipse.style.backgroundColor = "purple";

      // to pick random images
      pawn.style.background = `url(${images[parseInt(Math.random() * images.length)]})`;
      pawn.style.backgroundSize = "cover";
      pawn.style.backgroundPosition = "center";
      pawn.style.backgroundRepeat = "no-repeat";

      pawn.style.left = col * 57 + (squareS - ellipseS) / 2 + "px";
      pawn.style.top = row * 57 + (squareS - ellipseS) / 2 + "px";
      pawn.style.transform = "translate(-50%,-50%)";
      pawn.setAttribute("move", "true");

      pawn.row = row;
      pawn.col = col;
      console.log(pawn.col);

      //append it to parents
      parentCanvas.appendChild(pawn);

      return pawn;
    }

    //call the function addCircles and create multiple of it
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // if (Math.random() < 0.9) {
        circles.push(addCircles(row, col));
        //}
      }
    }

    //do animation  of moving pawns from square to square
    function animate() {
      //to put the animation for all pawns
      for (let i = 0; i < circles.length; i++) {
        let pawn = circles[i];

        //if the pawns move it become true
        if (pawn.getAttribute("move") === "true") {
          console.log("here");
          //steps
          let move = [-1, 1, 0];
          console.log(move);

          //moving for the pawns using -1,1 or 0
          let rowMove = move[parseInt(Math.random() * move.length)];
          let colMove = move[parseInt(Math.random() * move.length)];

          //stay inside grid
          //if (newRow >= 0 && newRow < size) { ellipse.row = newRow; }

          // put limits to where the pawns can go with random numbers after multiple tries and console log
          if (parseFloat(pawn.style.left) < 60 && colMove === -1) {
            colMove = 1;
          } else if (parseFloat(pawn.style.left) > 295 && colMove === 1) {
            colMove = -1;
          }

          if (parseFloat(pawn.style.top) < 60 && rowMove === -1) {
            rowMove = 1;
          } else if (parseFloat(pawn.style.top) > 295 && rowMove === 1) {
            rowMove = -1;
          }

          //pawns new position for colum and row
          let newPosition = parseFloat(pawn.style.left) + colMove * 55;
          let newPositionRow = parseFloat(pawn.style.top) + rowMove * 55;

          pawn.setAttribute("colMove", colMove);
          pawn.setAttribute("rowMove", rowMove);
          pawn.setAttribute("newPosition", newPosition);
          pawn.setAttribute("newPositionRow", newPositionRow);

          //new position
          // let newRow = ellipse.row + rowMove;
          //let newCol = ellipse.col + colMove;
          pawn.setAttribute("move", "moving");
        }

        //if state of pawn is moving then move this code
        if (pawn.getAttribute("move") === "moving") {
          //get attribute
          let colMove = parseInt(pawn.getAttribute("colMove"));
          let rowMove = parseInt(pawn.getAttribute("rowMove"));
          let newPosition = parseFloat(pawn.getAttribute("newPosition"));
          let newPositionRow = parseFloat(pawn.getAttribute("newPositionRow"));

          if (colMove !== 0) {
            console.log(colMove);

            //to move left or right
            pawn.style.left = parseFloat(pawn.style.left) + 1 * colMove + "px";
            console.log(pawn.style.left);
          }

          if (rowMove !== 0) {
            console.log(rowMove);

            //to move up or down
            pawn.style.top = parseFloat(pawn.style.top) + 1 * rowMove + "px";
            console.log(pawn.style.top);
          }
          //if pawn is a new position
          if (parseFloat(pawn.style.left) === parseFloat(newPosition)) {
            console.log("stop");

            //then turn into false and wait 500ms then move again
            pawn.setAttribute("move", "false");

            setTimeout(function () {
              pawn.setAttribute("move", "true");
            }, 500);
          }
          /* 
                    if (parseFloat(pawn.style.top) === parseFloat(newPositionRow)) {
                      console.log("stop")
                      pawn.setAttribute("move", "false")
          
                      setTimeout(function () {
                        pawn.setAttribute("move", "true")
                      }, 500)
                    } */

          console.log(pawn.style.left);
          // ellipse.style.top = ellipse.row * 55 + 15 + "px";
        }
        //
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    /*     function checkBounds(parent, ellipse) {
          let boundingBoxParent = parentCanvas.getBoundingClientRect();
          if (parseFloat(ellipse.style.left) > boundingBoxParent) {
            colMove = 1;
    
          }
          else if (parseFloat(ellipse.style.left) < boundingBoxParent) {
            colMove = -1;
    
          }
    
          if (parseFloat(ellipse.style.top) > boundingBoxParent) {
            rowMove = 1;
    
          }
        } */
  }
}
