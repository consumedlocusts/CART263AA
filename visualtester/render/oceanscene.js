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
  createUniforms() {
    //Converts the plain js params object into the exact uniform structure as expected by Three.js ShaderMaterial
  }
}
