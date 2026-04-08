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
    //its what will orbit the sun?
    this.group = new THREE.Group();
    //Raycasting tools
    this.raycaster = new THREE.Raycaster();
    this.pointerPos = new THREE.Vector2();
    this.theUV = new THREE.Vector2(0.0, 0.0);

    //texture loader
    this.textureLoader = new THREE.TextureLoader();

    //load textures
    this.colorMap = this.textureLoader.load("");
    this.boneMap = this.textureLoader.load("");
    this.alphaMap = this.textureLoader.load("");
    this.otherMap = this.textureLoader.load("");

    //Create planet groupx

    //blender loader .glb models
    //this.loader = new GLTFLoader();
    //moon rotator's pivot
    // this.moonPivots = [];

    // Create planet
    //PLANTET 1
    // const planetGeometry = new THREE.SphereGeometry(1.8, 48, 48); //ze geometry is the shape data
    const planetGeometry = new THREE.IcosahedronGeometry(1.8, 16);
    //planet material (make evil later)
    const planetMaterial = new THREE.MeshBasicMaterial({
      color: 0x660066,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      // // color: 0x1b1822,
      // color: 0x800080, // purple, very obvious
      // roughness: 0.95,
      // metalness: 0.3,
      // emissive: 0x120814,
      // emissiveIntensity: 0.5,
      // // color: 0x800080, // purple, very obvious
      // wireframe: false,
    });

    //plant mesh
    this.planet = new THREE.Mesh(planetGeometry, planetMaterial);
    //shadows abd depth
    this.planet.castShadow = true;
    this.planet.receiveShadow = true;
    //just messing with a points layer for ray castingwhen u hover over the planet it spikes (soruced from video)
    const pointsGeometry = new THREE.IcosahedronGeometry(1.8, 120);
    //addd the planet to group again
    this.group.add(this.planet);
    this.moonPivots = [];
    //the three moons as looops
    for (let i = 0; i < 3; i++) {
      const moonPivot = new THREE.Group();

      const moonGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const moonMaterial = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
      });

      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.castShadow = true;
      moon.receiveShadow = true;
      //place moon away from center so pivot rotation makes it orbit (source:)
      moon.position.x = 3 + i * 1.2;

      moonPivot.add(moon);
      this.group.add(moonPivot);
      //moon to planet
      this.moonPivots.push({
        pivot: moonPivot,
        speed: 0.2 + i * 0.2,
      });
    }

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
    //rptate moon:
    //the moon is attached to the pivot and positioned away from its center so rotating the parent group swings the child around , physics
    //delta is time and frame rate for loop counter
    for (let moonData of this.moonPivots) {
      moonData.pivot.rotation.y += delta * moonData.speed;
    }
    //TODO: Do the moon orbits and the model animations here.
  }

  click(mouse, scene, camera) {
    //TODO: Do the raycasting here.
  }
}
//SAMA SOURCE: https://blogg.bekk.no/procedural-planet-in-webgl-and-three-js-fc77f14f5505
//https://github.com/holgerl/procedural-planet/blob/gh-pages/js/spheremap.js
//https://www.vertexshaderart.com/art/8oJh9QtFGgJksSFFk/
//https://github.com/ashima/webgl-noise/blob/master/src/cellular3D.glsl
