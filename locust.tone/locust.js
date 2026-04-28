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
    this.activeBrightness = 127; //just normal yes or no birghtness the fixed number is like 0 is nothing anything else is something

    //min amounf of pixels sampled
    //shrink each one cells before being played
    //slightly shrink each segment so rows feel more etched than blocky
    this.minSegmentPixels = 1;
    this.lineLengthFactor = 0.96;
    //the basisc amount of
    this.baseRelief = 4.5;
    //main vertical displacement strenght, when note is active
    this.noteWarpStrength = 72;
    //rows to taarget speed
    this.returnEasing = 0.13;
    //number of lines that overlap when note is heavily played
    this.internalWaveAmount = 16;
    //for line thickness WEBGL basicly  too thin so stack a few (3 layers)
    //the layers must be separated just enough to look thicker
    //but not so much that they turn into obviously separate bands
    this.strokeLayers = 3;
    this.strokeSeparation = 0.85;
    //fraction of screen width the locust is allowed to use
    this.widthFraction = 0.82;
    //as height , they keep the image large but not to touch border unless noted
    this.heightFraction = 0.9;

    //-==-=-=-----runtime states-=--==--=-

    //locust lines will live inside this one group
    this.lineGroup = new THREE.Group();

    //add that group to the scene immediately
    this.scene.add(this.lineGroup);

    //aray that will store one object per visible image row
    this.rowObjects = [];

    //raw row description built from the image before geometry exists
    this.rows = [];

    //real width of the image in pixels
    this.imageWidth = 0;

    //height ^^
    this.imageHeight = 0;

    //scale that converts image pixels into scene space
    this.overallScale = 1;

    //horz scene offset for the whole locust
    this.imageOffsetX = 0;

    //vert offset
    this.imageOffsetY = 0;

    //becomes true after the image has been loaded
    // this.imageReady = false;
    //this class no longer needs async init or its own image loading job so im NOT doing thar
    this.readImageAndBuild();
  }
  //ASYNC START UPP FROM SOURCES:

  //   async init() {
  //     //load the image and extract its pixel data
  //     const { image, imgData } = await this.loadImageData(this.imagePath);

  //     //store the image dimensions for later coordconverss
  //     this.imageWidth = image.width;
  //     this.imageHeight = image.height;

  //     //convert the image into row/segment descriptions
  //     // reason why he program never draws og bitmap firts is cuz
  //     // it first translates the bitmap into a custom line visual thinge of tis own idkk
  //     this.rows = this.buildScanRows(imgData);

  //     //fit  image screen size
  //     this.updateScaleAndCamera();

  //     //turn the rows into real three.js line geometry
  //     this.rebuildGeometry();

  //     //,ark the system as ready ,can run safely w update()
  //     this.imageReady = true;
  //   } //noo too complicated for now
  readImageAndBuild() {
    //invisible canvass for image pixels
    const canvas = document.createElement("canvas");
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    //browser images are display objects but pixel-based logic needs raw image data
    //from basic ources
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, 0, 0);

    const imgData = ctx.getImageData(0, 0, this.image.width, this.image.height);

    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    //convert the locusr image into horiz scan rows
    //the final aesthetic isa field of horizontal marks
    //deconstructing or reonstructing behaving like topology lines
    // this.rows = this.buildScanRows(imgData);

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
    //// this creates the Joy Division "P[leasures" like scanline structure
for (let y = 0; y < imgData.height; y += this.gridStep) {
      const segments = [];
//idk why i just like putting a bunch of functions that could be inside seachother but in a classlol
      //start remembers where a brightness  begins
      //runBrightness and runCount  measure how bright that it nbe
      let start = null;
      let runBrightness = 0;
      let runCount = 0;
for (let x = 0; x < imgData.width; x += this.gridStep) {
    const brightness = this.brightnessAt(imgData, x, y);
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
       if (shouldClose){
        //when briteness red convert it into the horz segments
        const end = active && atRowEnd ? x : x - this.gridStep;
          const cellsWide = Math.max(1, Math.round((end - start) / this.gridStep) + 1);
          //shortens each row seg 
          //leaving tiny gaps prevents the image from looking too blocky or fused
          if(cellsWide>=this.minSegmentPixels){
            const averageBrightness = runBrightness / Math.max(1, runCount);
            const segmentWidth=(end - start + this.gridStep) * this.lineLengthFactor;
            //push
            segments.push({
              centerX: start + (end - start) * 0.5,
              width: segmentWidth,
              brightness: averageBrightness,
            });
          }
          start=null;
          }
       }
  }
}
  