import * as THREE from "three";
//import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const scene = new THREE.Scene();
//A: the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//B: the material
const material = new THREE.MeshBasicMaterial({ color: 0x800080 });
//C: put together
const mesh = new THREE.Mesh(geometry, material);
//D: ADD TO THE SCENE
scene.add(mesh);
const sizes = {
  width: 800,
  height: 600,
};
//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

scene.add(camera);
//Access the Canvas
const canvas = document.querySelector("canvas#three-ex");
//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//give it the size

//move camera
camera.position.z = 3;
const controls = new OrbitControls(camera, renderer.domElement);
//TURN ON AXES HELPER
//https://threejs.org/docs/?q=Axes#AxesHelper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);
//move it
axesHelper.position.x = -1;
axesHelper.position.y = -1;
const mesh_2 = new THREE.Mesh(geometry, material);
scene.add(mesh_2);
mesh_2.position.x = 1.5;
mesh_2.position.y = 1.25;
mesh_2.position.z = -1;
renderer.setSize(sizes.width, sizes.height);

//render:
renderer.render(scene, camera);
//A: the geometry

mesh.scale.x = 2;
mesh.scale.y = 0.25;
mesh.scale.z = 0.5;
//const material = new THREE.MeshBasicMaterial()

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.3, 16, 32),
  material,
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);
const water_texture = await loader.loadAsync(
  "textures/Ice002_1K-JPG_Color.jpg",
);
//need to ensure that the textures are encoded correctly - mapping the colors correctly.
water_texture.colorSpace = THREE.SRGBColorSpace;
