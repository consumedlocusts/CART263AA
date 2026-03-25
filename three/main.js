import * as THREE from "three";
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
renderer.setSize(sizes.width, sizes.height);

//render:
renderer.render(scene, camera);
//move camera
camera.position.z = 3;

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
