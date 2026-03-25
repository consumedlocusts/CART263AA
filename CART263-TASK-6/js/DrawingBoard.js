class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //store mouse position for use in object animation
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs ///
    if (this.drawingBoardId === "partA") {
      console.log("in A");
      //pass nouse pos into every circle on board A
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].targetX = this.mouseOffsetX;
        this.objectsOnCanvas[i].targetY = this.mouseOffsetY;
      }
    }

    // if(this.drawingBoardId ==="partA"){
    // }
    //   if(this.drawingBoardId ==="partB"){
    //     console.log("in B")
    //   }
    //   if(this.drawingBoardId ==="partC"){
    //     console.log("in C")
    //   }
    //   if(this.drawingBoardId ==="partD"){
    //     console.log("in D")
    //  }
  }

  clickCanvas(e) {
    // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);

    //differentiate which canvas
    //you can remove the console.logs ///
    if (this.drawingBoardId === "partA") {
      console.log("in A");
      //add circle with one click then shift +click remove a circle
      if (e.shiftKey) {
        // do not remove the very first original circle
        if (this.objectsOnCanvas.length > 1) {
          this.objectsOnCanvas.pop();
        }
      } else {
        let radius = Math.floor(Math.random() * 25) + 10;

        let colors = [
          "#FFC300",
          "#FF5733",
          "#CF9FFF",
          "#7DF9FF",
          "#98FB98",
          "#FFD1DC",
        ];

        let fillCol = colors[Math.floor(Math.random() * colors.length)];
        let strokeCol = colors[Math.floor(Math.random() * colors.length)];

        this.addObj(
          new CircularObj(
            this.mouseOffsetX,
            this.mouseOffsetY,
            radius,
            fillCol,
            strokeCol,
            this.context,
          ),
        );
      }
    }
    // if(this.drawingBoardId ==="partB"){
    //   console.log("in B")
    // }
    // if(this.drawingBoardId ==="partC"){
    //   console.log("in C")
    // }
    // if(this.drawingBoardId ==="partD"){
    //   console.log("in D")
    //   }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }
  }
}
