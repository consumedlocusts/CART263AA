import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//SAMA's THEME: Dark biomechanical horrors
// Planet class for Team F
export class PlanetF {
  constructor(scene, orbitRadius, orbitSpeed) {
    this.scene = scene;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.angle = Math.random() * Math.PI * 2;

    //Create planet groupx
    //its what will orbit the sun?
    this.group = new THREE.Group();
    //blender loader .glb models
    this.loader = new GLTFLoader();
    //moon rotator's pivot
    this.moonPivots = [];

    // Create planet
    //PLANTET 1
    const planetGeometry = new THREE.SphereGeometry(1.8, 48, 48); //ze geometry is the shape data
    //planet material (make evil later)
    const planetMaterial = new THREE.MeshBasicMaterial({
      //   color: 0x1b1822,
      //   roughness: 0.95,
      //   metalness: 0.3,
      //   emissive: 0x120814,
      //   emissiveIntensity: 0.25,
      color: 0x800080, // purple, very obvious
      wireframe: false,
    });
    //plant mesh
    this.planet = new THREE.Mesh(planetGeometry, planetMaterial);
    //shadows abd depth
    this.planet.castShadow = true;
    this.planet.receiveShadow = true;
    //addd the planet to group again
    this.group.add(this.planet);

    //STEP 1:
    //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
    //TODO: Give it a custom material using THREE.MeshStandardMaterial.
    //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
    //TODO: Add the planet mesh to the planet group.

    //STEP 2:
    //TODO: Add from 1 to 3 orbiting moons to the planet group.
    //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.

    //STEP 3:
    //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
    //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

    //STEP 4:
    //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
    //TODO: Use your imagination and creativity!
    //soon will add this but moon firrst this.loadModel('../models/xenoCritter.glb', 0.35, 20, 40, 0);
    this.scene.add(this.group);
  }

  update(delta) {
    // Orbit around sun
    this.angle += this.orbitSpeed * delta * 30;
    this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
    this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

    // Rotate planet
    this.group.rotation.y += delta * 5;

    //TODO: Do the moon orbits and the model animations here.
  }

  click(mouse, scene, camera) {
    //TODO: Do the raycasting here.
  }
}
