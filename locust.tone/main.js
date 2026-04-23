import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import * as Tone from "https://cdn.jsdelivr.net/npm/tone@15.0.4/+esm";
import { LocustTopology } from "./locust.js";
//dom mount
const mount = document.getElementById("mount");
//basic keybord mapping
//// A W S E D F T G Y H U J K
const keyToSemitone = {
  a: 0,
  w: 1,
  s: 2,
  e: 3,
  d: 4,
  f: 5,
  t: 6,
  g: 7,
  y: 8,
  h: 9,
  u: 10,
  j: 11,
  k: 12,
};
//here" he note names that belong to the 12 semitones in western equal temperament"
const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
//octave to be shifted with diffirent keys
let currentOctave = 4;
//start
let audioStarted = false;
//"to make" cord like effects after
//keep track of which physical computer keys are being held
const heldKeys = new Set();
//anf when the key is released it need s to release the exact same note
const keyToNoteName = new Map();
//the actual tone.js set up, from soruce, a rich sound for those active lines i guess
//after x z altering notion
// "active note motions" to decide how the lines should lift and bend
const activeVoices = [];
//the richyrich synth fixed
const synth = new Tone.PolySynth(Tone.Synth, {
  maxPolyphony: 8,
  options: {
    oscillator: { type: "sawtooth" },
    envelope: {
      attack: 0.005,
      decay: 0.15,
      sustain: 0.5,
      release: 0.8,
    },
  },
});
//filterized but i dont know if i will like this one yet
const filter = new Tone.Filter({
  type: "lowpass",
  frequency: 3200,
  rolloff: -12,
});
//other efffects n stuff
const chorus = new Tone.Chorus({
  frequency: 0.9,
  delayTime: 2.5,
  depth: 0.28,
  wet: 0.18,
}).start();

const reverb = new Tone.Reverb({
  decay: 4.2,
  wet: 0.18,
});
//from website idk what this really does other than make it so its not annoying
const limiter = new Tone.Limiter(-2);
const analyser = new Tone.Analyser("fft", 128);
//connect it all together
synth.connect(filter);
filter.connect(chorus);
chorus.connect(reverb);
reverb.connect(limiter);
limiter.toDestination();
limiter.connect(analyser);
//the visual freq so those key attacks visibly lift the terrain
let visualEnergy = 0;
//three.js set upp basics taken from the joy division tut
const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-680, -100, 1440, -320, 0.1, 5000);
camera.position.set(400, 1000, 300);
camera.lookAt(400, 0, 0);
//render a bit small for window
let renderWidth = window.innerWidth;
let renderHeight = window.innerHeight;
//new wbgl render activated
const renderer = new THREE.WebGLRenderer({ antialias: true });
//density p1 for le lines

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(renderWidth, renderHeight);
renderer.setClearColor(0x000000, 1);
mount.appendChild(renderer.domElement);

//group all stacked "strips" of lines but the code he shows is kinda too dense idk
//also the spawning speed
const lines = new THREE.Group();
scene.add(lines);

let frameId = null;
let lastSpawnTime = 0;

//HELPPPP ers
function keyboardKeyToNoteName(key) {
  const semitone = keyToSemitone[key];
  if (semitone === undefined) return null;

  const names = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octaveOffset = Math.floor(semitone / 12);
  const noteIndex = semitone % 12;
  return `${names[noteIndex]}${currentOctave + octaveOffset}`;
}
//pretty much everything that activates the key down to line alterations but more detail is needed
async function startAudioIfNeeded() {
  if (audioStarted) return;
  await Tone.start();
  await reverb.generate();
  audioStarted = true;
}

async function onKeyDown(event) {
  const key = event.key.toLowerCase();

  if (key in keyToSemitone || key === "z" || key === "x") {
    event.preventDefault();
  }

  if (heldPhysicalKeys.has(key)) return;

  if (key === "z") {
    currentOctave = Math.max(2, currentOctave - 1);
    heldPhysicalKeys.add(key);
    return;
  }

  if (key === "x") {
    currentOctave = Math.min(6, currentOctave + 1);
    heldPhysicalKeys.add(key);
    return;
  }

  const note = keyboardKeyToNoteName(key);
  if (!note) return;

  await startAudioIfNeeded();

  heldPhysicalKeys.add(key);
  physicalKeyToNote.set(key, note);
  synth.triggerAttack(note);
  //thus also uses x, y , z to change the density
  visualEnergy = Math.min(3.2, visualEnergy + 0.95);
}
//if released to keeep it goingg but fade slowly
function releaseAllNotes() {
  const notes = Array.from(physicalKeyToNote.values());
  if (notes.length) synth.triggerRelease(notes);
  heldPhysicalKeys.clear();
  physicalKeyToNote.clear();
}
//data shaping helpers
function getAnalyserData() {
  return analyser.getValue();
}
//smooth the height profile to presserve a rounded topological look
function smoothProfile(values, passes = 4) {
  let current = values.slice();

  for (let p = 0; p < passes; p++) {
    const next = current.slice();
    for (let i = 1; i < current.length - 1; i++) {
      next[i] = current[i - 1] * 0.2 + current[i] * 0.6 + current[i + 1] * 0.2;
    }
    current = next;
  }

  return current;
}
