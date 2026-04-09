import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PlanetF } from "./toner.js";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510); // Deep space

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 30, 60);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 150;
controls.minDistance = 20;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0x080812); // Dim ambient for space
scene.add(ambientLight);
const planetF = new PlanetF(scene, 0, 0);
let elapsedTime = 0;
function animate(timer) {
  requestAnimationFrame(animate);

  const delta = elapsedTime === 0 ? 0 : (timer - elapsedTime) / 1000;
  elapsedTime = timer;
  console.log(delta);
  console.log("delta:", delta);
  // Update sun
  planetF.update(delta);

  controls.update();
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);
// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
// Click handler
const mouse = new THREE.Vector2();
renderer.domElement.addEventListener("click", (event) => {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  planetF.click(mouse, scene, camera);
});
