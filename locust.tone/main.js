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
// raw saw tooth fixer
const filter = new Tone.Filter({
  type: "lowpass",
  frequency: 2800,
  rolloff: -12,
});
// //other efffects n stuff
// const chorus = new Tone.Chorus({
//   frequency: 0.9,
//   delayTime: 2.5,
//   depth: 0.28,
//   wet: 0.18,
// }).start();
//reverb adds to the actual visual effects heree
const reverb = new Tone.Reverb({
  decay: 4.2,
  wet: 0.18,
});
//from website idk what this really does other than make it so its not annoying
//ok so limiter protects the output from being too loud too quickly lol
const limiter = new Tone.Limiter(-2);
//lets it measure the sound energy and since the locust reacts to note pitch and how energized the aduio is
const analyser = new Tone.Analyser("fft", 128);
//connect it all together
//chain to chain
synth.connect(filter);
// filter.connect(chorus);
// chorus.connect(reverb)
filter.connect(reverb);
reverb.connect(limiter);
limiter.toDestination();
limiter.connect(analyser);
///rest of audio set up
async function startAudioIfNeeded() {
  //exit immediately if audio has already bee playing
  if (audioStarted) return;

  //"Tone.start() asks the browser for permission to begin audio processing."

  await Tone.start();

  // "Tone.Reverb builds an impulse response internally."
  // cuz "generating it once up front avoids a later hiccup the first time sound is played."
  await reverb.generate();

  audioStarted = true;
}
//--=-=----=---====HELPER FUNCTAIONNS=--=-=--====-=-
function keyToNote(key) {
  //look up and at how many semitones this key is above the base  note
  const semitone = keyToSemitone[key];
  if (semitone === undefined) return null;

  //iff the value reaches 12  move into the next octave ta ta
  const octaveOffset = Math.floor(semitone / 12);
  const noteIndex = semitone % 12;
  const octave = currentOctave + octaveOffset;
  //tone.js uses note names for sound, while the visual uses MIDI numbers asa convenient pitch scale
  return {
    name: `${noteNames[noteIndex]}${octave}`,
    midi: 12 * (octave + 1) + noteIndex,
  };
}
function midiToPitchNorm(midi) {
  //compress the useful MIDI range into 0..1 visuals usually work better with small normalized ranges than raw MIDI values allegdly
  return THREE.MathUtils.clamp((midi - 48) / 36, 0, 1);
  //define for clamp belopw
}

//wierd thing i dont get
function nowInSeconds() {
  //returns milliseconds the visual timing uses seconds ig
  return performance.now() * 0.001;
}
function getAverageFft() {
  const data = analyser.getValue();
  let sum = 0;
  let count = 0;

  //samples a middle to low area of the FFT instead of the whole spectrum
  //this range is stable enough to give motion but not so noisy that the lines jitter like crazy
  for (let i = 3; i < 56; i++) {
    const db = THREE.MathUtils.clamp(data[i], -140, 0);
    //"Clamps the given value between min and max" tone.js
    const normalized = THREE.MathUtils.mapLinear(db, -140, 0, 0, 1);
    //"Performs a linear mapping from range <a1, a2> to range <b1, b2> for the given value.

    // Tone.js says tat this Performs a linear mapping from range <a1, a2> to range <b1, b2> for the given value.
    // x
    // The value to be mapped.
    // a1
    // Minimum value for range A.
    // a2
    // Maximum value for range A.
    // b1
    // Minimum value for range B.
    // b2
    // Maximum value for range B.
    // Returns: The mapped value.
    //thus VV "Normalizes the given value according to the given typed array" VV
    sum += normalized;
    count++;
  }
  //source
  return count ? sum / count : 0;
}
function createVoiceFromMidi(midi) {
  //the rippley activation helper
  //"voice" is kinda refering to how its related to both
  const pitchNorm = midiToPitchNorm(midi);
  const startTime = nowInSeconds();
  //and each "sound"  stores a tiny "motion event" for the visual
  //THIS i need to better view because im going off the tutorial
  return {
    midi,
    startTime,
    endTime: startTime + 1.25,
    duration: 1.25,
    strength: 1.12,

    // lower notes affect lower regions of the drawing to then
    // higher notes affect higher regions to  makes pitch feel spatial instead of random and not spiral
    centerY: THREE.MathUtils.lerp(-120, 140, 1 - pitchNorm),
  };
}

//the visual freq so those key attacks visibly lift the terrain
//let visualEnergy = 0;
//three.js set upp basics taken from the joy division tut
const scene = new THREE.Scene();
//Orthographic camera keeps scale visually flat
const camera = new THREE.OrthographicCamera(-500, 500, 500, -500, 0.1, 2000);
camera.position.set(0, 0, 500);
//also this 3.js scene is funnily photo printed like topology look and this flat projection is the better choice
camera.lookAt(0, 0, 0);
//render a bit small for window
let renderWidth = window.innerWidth;
let renderHeight = window.innerHeight;
//new wbgl render activated
const renderer = new THREE.WebGLRenderer({ antialias: true });
//density p1 for le lines
//use a sensible pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//match the renderer size to the browser
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
mount.appendChild(renderer.domElement);
//the visual cannot exist until the image has loaded
let locustVisual = null;
//group all stacked "strips" of lines but the code he shows is kinda too dense idk
//also the spawning speed

//image load

function loadImage(src, onReady) {
  const image = new Image();

  //decode the image only after it has fully loaded

  image.onload = () => {
    onReady(image);
  };

  image.src = src;
}
function buildLocustVisual(image) {
  // main.js  owns loading locust.js owns visual processing
  locustVisual = new LocustTopology({
    scene,
    camera,
    renderer,
    image,
  });
}
//---=--=-=-==--=-=-=-KEYBOARD EVENTS-=-=-=------=-=-=-=
//and async FUNCTION not "init" which is some over complicated thing for classes

async function onKeyDown(event) {
  //normalize the key to lowercases
  const key = event.key.toLowerCase();

  //prevent default browser behavior for our musical keys and octave keys
  if (key in keyToSemitone || key === "z" || key === "x") {
    event.preventDefault();
  }

  //ignore auto repeat if the key is already being held (for now)
  if (heldPhysicalKeys.has(key)) return;

  // COOL : Z shifts octave downward.
  //"octave changes are really just transposition; they move the same layout into a lower pitch range without remapping every key"
  if (key === "z") {
    currentOctave = Math.max(2, currentOctave - 1);
    heldPhysicalKeys.add(key);
    return;
  }

  //  ye X shifts octave upward.
  // "keeping octave on simple nearby keys makes range changes fast during performance"
  if (key === "x") {
    currentOctave = Math.min(6, currentOctave + 1);
    heldPhysicalKeys.add(key);
    return;
  }

  //convert this key into a note finallt
  const note = keyToMidiAndName(key);

  //stop if the key is not a musical key!
  if (!note) return;

  //,ake sure browser audio is unlocked as above like the first damn tging
  await startAudioIfNeeded();

  //,ark the physical key as held ofc
  heldPhysicalKeys.add(key);

  //temember which note belongs to this physical key.
  physicalKeyToNote.set(key, note.name);

  //start the synth note.
  synth.triggerAttack(note.name);

  //create the matching visual note event.
  activeVoices.push(createVoiceFromMidi(note.midi));
}
function onKeyUp(event) {}
function releaseAllNotes() {}
