import * as THREE from "https://esm.sh/three";
import { oceanFragmentShader } from "./oceanFragmentShader.js";
//oceananic like scenery that will later on be a desolate space like on the surface of
//the moon tyep of lanscape instead but i like ocean name
// again for now the visual is generated primarily inside the fragment shader
//here three.js opens webgl context, provides canvas, uniforms to GPU, and a rectangle
export class OceanScene {
  constructor({ params }) {
    this.params = params;
    //light touch o vector2 for mouse pos
    this.mousePos = new THREE.Vector2(0, 0);
    //scene
    this.scene = new THREE.Scene();
    //ortho camera: the mesh is drawn as a flat screen!
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    //web
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    //canavs match the brows windpw
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //limir the pixel ratio for stability, not done in main thingie
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));

    //main html canvas
    document.body.appendChild(this.renderer.domElement);
    //uniform objects: are read-only shader inputs from the GPU's point of view for agiven drawing call
    //ex "uTime " for frame change
    this.uniforms = this.createUniforms();

    //uniform mesh/"screenfilling" mesh
    this.mesh = this.createFullscreenShaderPlane();
    //add mesh to scene graph
    this.scene.add(this.mesh);
    //"bind methods so "this" still refers to the class instance when the browser calls them later"

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    //whenver browser is resized update renderer size and shader resolution

    window.addEventListener("resize", this.onResize);
    //track tmouse in normalized device coords
    document.addEventListener("mousemove", (event) => {
      this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }
  //again three.js:" Represents a uniform which is a global shader variable. They are passed to shader programs."
  createUniforms() {
    //"Converts the plain js params object into the exact uniform structure as expected by Three.js ShaderMaterial"
    //every uniform becomes an object :   { value: something }
    //these objects are sent to thegpu by three.js
    return {
      //uTime is master anim clock, starts at 0 increases every frame, important for most moving effects
      uTime: { value: 0 },
      //uResolution tells shader the pixel dimesnsion of viewport, for converting pixel coords into the UV space
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      //uMouse  passes mouse on to shader
      uMousePos: { value: this.mousePos },
      //scene controls like the waterm sun, atmosphere colors r converted into three.color to then be a v3
      //literally everything becomes a uniform object created in parameters
      // SOURCE: xx
      uSunPosX: { value: this.params.sunPosX },
      uSunPosY: { value: this.params.sunPosY },
      uSunSize: { value: this.params.sunSize },
      uSunIntensity: { value: this.params.sunIntensity },
      uWaveHeight: { value: this.params.waveHeight },
      uWaveChoppiness: { value: this.params.waveChoppiness },
      uSpeed: { value: this.params.speed },
      uFlySpeed: { value: this.params.flySpeed },
      uSssBaseColor: { value: new THREE.Color(this.params.sssBaseColor) },
      uSssTipColor: { value: new THREE.Color(this.params.sssTipColor) },
      uSssStrength: { value: this.params.sssStrength },
      uReflectionStrength: { value: this.params.reflectionStrength },
      uReflectionWidth: { value: this.params.reflectionWidth },
      uHorizonColor: { value: new THREE.Color(this.params.horizonColor) },
      uHaloStrength: { value: this.params.haloStrength },
      uHaloRadius: { value: this.params.haloRadius },
      uHaloSize: { value: this.params.haloSize },
      uVignetteStrength: { value: this.params.vignetteStrength },
      uCameraHeight: { value: this.params.cameraHeight },
      uCameraTilt: { value: this.params.cameraTilt },
    };
  }
  //the new THREE.PlaneGeometry(2, 2) calling its 2x2 cuz clip space in the vertex shader spans from -1 to +1 so
  //  2x2 plane centered at the origin fills that whole range
  //then shader (ShaderMaterial supplies GLSL code)
  //tehn vertex shader FROM OG SOURCE
  //then fragment shader FROM OG SOURCE
  createFullscreenShaderPlane() {
    return new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
        fragmentShader: oceanFragmentShader,
        uniforms: this.uniforms,
      }),
    );
  }
  onResize() {
    //kep renderer canvas the same size as browser window
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //and updates shaders resolution for the math in fragment shader or else it comes out wrong or calcs wromg is what it (the source)says
    this.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  }
  start() {
    //start the animation loop in browser
    requestAnimationFrame(this.animate);
  }
  animate(timeMs) {
    //browser gives time in milisecs (might have to change to delta in 3.js portionlater)
    const time = timeMs * 0.001;
    //update that uniform time

    this.uniforms.uTime.value = time;
    //update mouse uniform
    this.uniforms.uMousePos.value.set(this.mousePos.x, this.mousePos.y);
    //so basically i think it has to RE READ the entire  mutable parameters each frame to keep animation in sync with uniforms
    //but idk im not gonna do that yet
    //draw current frame
    this.renderer.render(this.scene, this.camera);
    //next frame
    requestAnimationFrame(this.animate);
  }
}
