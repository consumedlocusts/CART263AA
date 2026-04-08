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
    this.colorMap = this.textureLoader.load("image/aalieeenn.jpg");
    this.elevMap = this.textureLoader.load("image/2136.jpg");
    this.alphaMap = this.textureLoader.load("image/alien2.jpg");

    this.otherMap = this.textureLoader.load("image/alien.jpg.webp");
    //fixes color space
    this.colorMap.colorSpace = THREE.SRGBColorSpace;
    this.otherMap.colorSpace = THREE.SRGBColorSpace;
    //scene.add(group);

    const geo = new THREE.IcosahedronGeometry(1, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x222222,

      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    //PLANET ONEE

    //plant mesh
    this.planet = new THREE.Mesh(geo, mat);
    //shadows abd depth
    this.planet.castShadow = true;
    this.planet.receiveShadow = true;
    //just messing with a points layer for ray castingwhen u hover over the planet it spikes (soruced from video)
    const pointsGeometry = new THREE.IcosahedronGeometry(1.8, 120);
    const vertexShader = `
            uniform float size;
            uniform sampler2D elevTexture;
            uniform vec2 mouseUV;

            varying vec2 vUv;
            varying float vVisible;
            varying float vDist;

            void main() {
                vUv = uv;
vec3 newPosition = position;

    
        float elv = texture2D(elevTexture, vUv).r;

      
        float dist = distance(mouseUV, vUv);
        float thresh = 0.08;

        float pulse = 0.0;
        if (dist < thresh) {
          pulse = (thresh - dist) * 4.0;
        }

        vDist = dist;
               newPosition += normal * (elv * 0.6 + pulse);

        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

        vec3 vNormal = normalize(normalMatrix * normal);
        vVisible = step(0.0, dot(-normalize(mvPosition.xyz), vNormal));

        gl_PointSize = size;
        gl_Position = projectionMatrix * mvPosition;
            }
        `;

    const fragmentShader = `
            uniform sampler2D colorTexture;
            uniform sampler2D alphaTexture;
            uniform sampler2D otherTexture;

            varying vec2 vUv;
            varying float vVisible;
            varying float vDist;

            void main() {
                if (floor(vVisible + 0.1) == 0.0) discard;

                float alpha = 1.0 - texture2D(alphaTexture, vUv).r;
                vec3 color = texture2D(colorTexture, vUv).rgb;
                vec3 other = texture2D(otherTexture, vUv).rgb;

                float thresh = 0.08;
                if (vDist < thresh) {
                    color = mix(color, other, (thresh - vDist) * 50.0);
                }

                gl_FragColor = vec4(color, alpha);
            }
        `;
    //for stronger blending if needed for above float mixVal = (thresh - vDist) * 8.0;
    //color = mix(color, other, mixVal);
    // }
    this.uniforms = {
      size: { value: 3.5 },
      colorTexture: { value: this.colorMap },
      otherTexture: { value: this.otherMap },
      elevTexture: { value: this.elevMap },
      alphaTexture: { value: this.alphaMap },
      mouseUV: { value: this.theUV },
      //mouseUV: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
    };

    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    this.points = new THREE.Points(pointsGeometry, pointsMaterial);
    this.group.add(this.points);
    //add them
    this.group.add(this.planet);
    this.group.add(this.points);

    //=======()======()=======moon=======()=======()================
    this.moonPivots = [];
    //initial orbit position
    this.group.position.x = this.orbitRadius;

    //the three moons  looop
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
    //this.uniforms = {
    //     time: { value: 0 },
    //     hitUV: { value: this.hitUV }
    // };

    // this.material = new THREE.ShaderMaterial({
    //     vertexShader: this.vertexShader,
    //     fragmentShader: this.fragmentShader,
    //     uniforms: this.uniforms
    // });
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
    this.group.position.x = this.orbitRadius;
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
  setPointer(mouse) {
    this.pointerPos.copy(mouse);
  }

  //called from main animate loop or from click/move handling
  handleRaycast(camera) {
    this.raycaster.setFromCamera(this.pointerPos, camera);

    const intersects = this.raycaster.intersectObject(this.planet);

    if (intersects.length > 0 && intersects[0].uv) {
      this.theUV.copy(intersects[0].uv);
      this.uniforms.mouseUV.value.copy(this.theUV);
    }
  }

  click(mouse, scene, camera) {
    this.pointerPos.copy(mouse);
    this.handleRaycast(camera);
  }
}

//     click(mouse, scene, camera){

//     this.pointer.copy(mouse);

//     this.raycaster.setFromCamera(this.pointer, camera);

//     const hits = this.raycaster.intersectObject(this.planet);

//     if (hits.length > 0 && hits[0].uv) {
//         this.hitUV.copy(hits[0].uv);
//         this.uniforms.hitUV.value.copy(this.hitUV);
//     }
// }
//TODO: Do the raycasting here.

//SAMA SOURCE: https://blogg.bekk.no/procedural-planet-in-webgl-and-three-js-fc77f14f5505
//https://github.com/holgerl/procedural-planet/blob/gh-pages/js/spheremap.js
//https://www.vertexshaderart.com/art/8oJh9QtFGgJksSFFk/
//https://github.com/ashima/webgl-noise/blob/master/src/cellular3D.glsl

//for later
// Create planet
//PLANTET 1
// const planetGeometry = new THREE.SphereGeometry(1.8, 48, 48); //ze geometry is the shape data

// const planetMaterial = new THREE.MeshBasicMaterial({
//   color: 0x660066,
//   wireframe: true,
//   transparent: true,
//   opacity: 0.15,
//   // // color: 0x1b1822,
//   // color: 0x800080, // purple, very obvious
//   // roughness: 0.95,
//   // metalness: 0.3,
//   // emissive: 0x120814,
//   // emissiveIntensity: 0.5,
//   // // color: 0x800080, // purple, very obvious
//   // wireframe: false,
// });
