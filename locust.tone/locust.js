import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
//class for locust image, loads it and is in the style of the previous ascii project
//in locust.host, but instead the alterations are only row based cuz
//i wanted that bbouncy line topology look i guess
//the lines are bent when notes are played and eased back when nothing is happening
export class LocustTopology {
  constructor({ scene, camera, renderer, imagePath = "./locust.png" }) {
    //save the three.js scene so this class can add line objects into ih
    this.scene = scene;

    //orthographic camera because this class updates its size on resize
    this.camera = camera;

    //again save ys cuz it  updates renderer size on resize
    this.renderer = renderer;

    //yeah
    this.imagePath = imagePath;
    //---++====+=----big vis controls--------+=++==
    //MIGHT GROUP THEM BUT THIS IS SIMPELR TO ME RN
    //     this.PARAMS = {
    //   STROKE_LAYERS: 3,
    //   GRID_STEP: 4,
    //   NOTE_WARP_STRENGTH: 1.2
    // };
    //pixels skipped per resamp
    this.gridStep = 3;
    //the min brightness for a sample counted for the locust img and lower = whiter
    // this.segmentThreshold = 48; //oops its alrd black and white so threshold doesnt do anything

    //min amounf of pixels sampled
    //shrink each one cells before being played
    //slightly shrink each segment so rows feel more etched than blocky
    //better explained:
    //4% reduction leaves a tiny gap at the boundary between two adjacent
    //bright regions preventing the image from looking like a solid block
    //0.96=96% of pixel width
    this.minSegmentPixels = 1;
    this.lineLengthFactor = 0.96;
    //the BASE of image when no notes
    //when the keyboard is silent the topology lines dont sit perfectly so a gentle sine curve lifts the middle rows upward
    // giving the image a slight dome or bubble feeling
    this.baseRelief = 4.5;
    //main vertical displacement strenght, when note is active
    //how violently notes deform the lines / the maximum displacement in scene units(in orthographic scene)
    this.noteWarpStrength = 72;
    //rows to taarget speed
    //"smooth speed" formula: current = current + (target - current) * factor
    //the decay is fast at first, slow to settle
    //at factor=1.0, the value jumps immediately to the target (no smoothing)
    //at factor=0.0, the value never moves (frozen)
    //at factor=0.13, the value moves 13% of the remaining distance each frame
    this.returnEasing = 0.13;
    //number of lines that overlap when note is heavily played
    //"per-segment micro-oscillation strength"
    // it oscillate with a sine wave whose amplitude is this value times a voice(tone.js)
    this.internalWaveAmount = 16;
    //for line thickness WEBGL basicly  too thin so stack a few (3 layers)
    //the layers must be separated just enough to look thicker
    //but not so much that they turn into obviously separate bands
    this.strokeLayers = 3;
    //like each of the strokeLayers copies is offset by this many scene units in Y
    //0.85 keeps the copies close enough to look like one thick line but
    //far enough apart that they genuinely darken (opacity accumulates)
    this.strokeSeparation = 0.85;
    //fraction of screen width the locust is allowed to use
    //horizontal size of the drawing relative to the window so the image doesnt feel cramped
    this.widthFraction = 0.82;
    //same idea as above, they keep the image large but not to touch border unless noted
    this.heightFraction = 0.9;
    this.activeBrightness = 127; //just normal yes or no birghtness
    // the fixed number is like 0 is nothing anything else is something
    //BETTER EXPLAINED
    //pixel brightness is averaged across R, G, B channels to a 0–255 value
    //so then pixels above this threshold (127 = mid gray) are considered "lit"??
    //pixels at or below are considered background (black) and are skipped
    //127 = exactly halfway between 0 (black) and 255 (white) and the image is pure black/white
    //meaning  every pixel is either 0 or 255 the threshold cleanly separates locust white body from background

    //-==-=-=-----runtime states-=--==--=-
    //such is an invisible container object in the Three.js scene
    //and behaves like a folder: you can add many line objects into
    //the group and then transform (move, rotate, scale) the whole group
    //at once. removing the group removes all children with it
    //locust lines will live inside this one group
    this.lineGroup = new THREE.Group();

    //add that group to the scene immediately
    this.scene.add(this.lineGroup);

    //aray that will store one object per visible image row
    this.rowObjects = [];

    //raw row description built from the image before geometry exists
    this.rows = [];
    //these values are computed during readImageAndBuild and updated on resize
    //translate between image pixel coordinates and scene/screen coordinates
    //real width of the image in pixels
    this.imageWidth = 0;

    //height ^^
    this.imageHeight = 0;

    //scale that converts image pixels into scene space
    //its a multiplier:image pixels to scene units
    this.overallScale = 1;

    //horz scene offset for the whole locust
    //horizontal shift to center the drawing
    this.imageOffsetX = 0;

    //vert offset same idea as above
    this.imageOffsetY = 0;

    //becomes true after the image has been loaded
    // this.imageReady = false;
    //this class no longer needs async init or its own image loading job so im NOT doing thar
    this.readImageAndBuild();
  }

  //a browser's HTMLImageElement (the result of new Image() and
  //image.src) is a DISPLAY OBJECT and can be drawn on screen, but
  //cannot read individual pixel values from it directly so to inspect pixels,
  //draw it onto an HTML <canvas> element and then use the Canvas 2D API
  //to extract the raw RGBA byte array (called ImageData)
  readImageAndBuild() {
    //create an HTML <canvas> element ONLY in memory (not added to the DOM)
    //is invisible to the user but purely a tool for pixel access
    const canvas = document.createElement("canvas");
    //set s the canvas dimensions to exactly match the source image
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    //browser images are display objects but pixel-based logic needs raw image data
    //from basic ources
    //a "context" is the object that exposes the drawing API
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, 0, 0);

    const imgData = ctx.getImageData(0, 0, this.image.width, this.image.height);
    //cachew the image dimensions for use in scale calculations
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    //convert the locusr image into horiz scan rows
    //the final aesthetic is a field of horizontal marks
    //deconstructing or reonstructing behaving like topology lines
    //SCANS THE IMAGE into the abstract row/segment data
    this.rows = this.buildScanRows(imgData);

    // this.updateScaleAndCamera();
    // this.rebuildGeometry();
  }
  // well known brightness scale builder for ascii like objects
  //but the logic rlly needs to know if a point is nothing or something dark or light
  brightnessAt(imgData, x, y) {
    const i = (y * imgData.width + x) * 4;
    const r = imgData.data[i + 0];
    const g = imgData.data[i + 1];
    const b = imgData.data[i + 2];
    return (r + g + b) / 3;
    //likewise of the ascii from previous sessions
  }
  buildScanRows(imgData) {
    const rows = [];
    //// this creates the Joy Division "Pleasures" like scanline structure
    for (let y = 0; y < imgData.height; y += this.gridStep) {
      const segments = []; //bright "runs" found in this particular row
      //idk why i just like putting a bunch of functions that could be inside seachother but in a classlol
      //start remembers where a brightness  begins
      //runBrightness and runCount  measure how bright that it nbe
      //this is like reading every 3rd line "subsampling"
      //and to give the topology lines visible space between them
      let start = null;
      let runBrightness = 0;
      let runCount = 0;
      for (let x = 0; x < imgData.width; x += this.gridStep) {
        const brightness = this.brightnessAt(imgData, x, y);
        //simple threshold: above mid-gray=bright=body
        const active = brightness > this.activeBrightness;
        //grid builidmg
        //if this cell belongs to the locust either begin or continue a segment
        if (active) {
          if (start === null) {
            start = x;
            runBrightness = 0;
            runCount = 0;
          }

          runBrightness += brightness;
          runCount++;
        }
        const atRowEnd = x + this.gridStep >= imgData.width;
        const shouldClose = start !== null && (!active || atRowEnd);
        //a run closes if:
        //open run AND the current pixel is dark (!active)
        //open run AND its hit the last pixel in this row (atRowEnd)
        if (shouldClose) {
          //calculate the end X of the run

          const end = active && atRowEnd ? x : x - this.gridStep;
          //calculates the number of grid cells this run spans
          //Math.max prevents a zero in case of a single cell run (haha Mad Max reference)
          const cellsWide = Math.max(
            1,
            Math.round((end - start) / this.gridStep) + 1,
          );
          //shortens each row seg
          //leaving tiny gaps prevents the image from looking too blocky or fused
          //only keeps segments that meet the minimum width threshold
          //this filters out tiny noise fragments that might be isolated and create chaos
          if (cellsWide >= this.minSegmentPixels) {
            //values here are stored with the segment and later used to
            //modulate animation intensity (brighter regions move more)
            const averageBrightness = runBrightness / Math.max(1, runCount);
            //this applies the length factor to slightly shrink the segment
            const segmentWidth =
              (end - start + this.gridStep) * this.lineLengthFactor;
            //push
            segments.push({
              centerX: start + (end - start) * 0.5,
              width: segmentWidth,
              brightness: averageBrightness,
            });
          }
          start = null;
        }
      }
      //says to only add this row to the result if it actually has segments
      //so rows entirely within the black background produce zero segments
      //and are skipped
      if (segments.length > 0) {
        rows.push({ y, segments });
      }
    }
    return rows;
  }
  clearLineGroup() {
    //three.js objects hold GPU resources, this prevents crashing
    //remove old geo before rebuilding
    //not leave dead line objects behind
    //removes and disposes of all Three.js objects inside lineGroup
    //using WHILE because removing elements while iterating forward with a for loop
    //would skip every other element (looked up the bug)
    while (this.lineGroup.children.length) {
      const child = this.lineGroup.children.pop();
      child.geometry.dispose();
      child.material.dispose();
    }

    this.rowObjects.length = 0;
  }
  //NEED TO REMOVE OLD GEO THEN REBUILD but im setting cam scale and cam
  updateScaleAndCamera() {
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    //only need to use part of the screen dimensions so it fits in the fraem of the locust
    //calculates the maximum drawable area on screen
    //but leave margins by using fractions
    const targetWidth = viewWidth * this.widthFraction;
    const targetHeight = viewHeight * this.heightFraction;
    //calc scale factor: how many screen pixels per image pixel
    //Math.min picks the smaller of the two scales so the image fits in both dimensions
    this.overallScale = Math.min(
      targetWidth / this.imageWidth,
      targetHeight / this.imageHeight,
    );

    //update the orthographic cameras to match the window
    //maps screen pixels directly to scene units: 1 scene unit = 1 pixel
    this.camera.left = -viewWidth / 2;
    this.camera.right = viewWidth / 2;
    this.camera.top = viewHeight / 2;
    this.camera.bottom = -viewHeight / 2; //negative et
    //the projection matrix is the mathematical transform
    //that converts 3D scene coordinates into 2D screen coordinates
    this.camera.updateProjectionMatrix(); //ooooh

    this.imageOffsetX = 0;
    this.imageOffsetY = 0;
  }
  mapImgPointToScene(x, y) {
    //converts a point in IMAGE SPACE to a point in SCENE SPACE
    //IMAGE SPACE: origin at the top-left corner, Y increases downward
    //SCENE SPACE: origin at the center of the screen, Y increases upward
    //center the coordinates by subtracting the images own center
    //negate Y to flip the axis: in image space, Y=0 is the TOP
    //in scene space, Y=0 is the CENTER and positive Y is UP
    //the locust would appear upside down without this
    const centeredX = x - this.imageWidth * 0.5;
    const centeredY = -(y - this.imageHeight * 0.5);
    //scale and apply the offset then return as a point object
    return {
      x: centeredX * this.overallScale + this.imageOffsetX,
      y: centeredY * this.overallScale + this.imageOffsetY,
    };
  }
}
