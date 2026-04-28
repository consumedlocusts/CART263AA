import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import * as Tone from "https://cdn.jsdelivr.net/npm/tone@15.0.4/+esm";
import { LocustTopology } from "./locust.js";
//dom mount
// "mount" corresponds to the <div id="mount"> in index.html
//needed to append the Three.js canvas into it
//mount.appendChild(renderer.domElement)
//the canvas would not be attached to the page and would
// remain invisible even if Three.js were rendering correctly
const mount = document.getElementById("mount");

//object maps physical keyboard key characters to musical semitone numbers
//the layout is modelled after a physical piano keyboard projected onto the
//QWERTY layout:
//white keys (natural notes C D E F G A B C) is the "bottom row": a s d f g h j k
//black keys (sharps/flats) is the "top row": w e , t y u
//the semitone values are offsets from whatever the current base octave is:
//0 = root note (e.g., C4 if currentOctave=4)
//1 = one semitone up (C#4)
//2 = two semitones up (D4)
//etc

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
//"#" symbol means "sharp" one semitone higher than the letter note
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
//"octave" is a doubling of frequency. C4 (middle C) is 261.63 Hz
//C5 is 523.25 Hz is exactly double. C3 is 130.81 Hz is exactly half
//user can shift this up or down with the Z and X keys
let currentOctave = 4;
//start
let audioStarted = false;
//"to make" cord like effects after
//keep track of which physical computer keys are being held
//Set is containing
//the key character strings of every key currently pressed so if a keydown for
//a key that's already in the set ignore it
const heldKeys = new Set();

//to store which EXACT note it played
//so it can release exactly the same note when the key goes up
//if a user hits a note then change the octave (with Z or X), then release the key
//it will also register (on release) that new note
const keyToNoteName = new Map();
//the actual tone.js set up, from soruce, a rich sound for those active lines i guess
//after x z altering notion
//every time a note is triggered it creates a "voice" object and adds it to this array,
//then passed to locust.update() every frame for the visual system
//"active note motions" to decide how the lines should lift and bend
const activeVoices = [];
//the richyrich synth fixed
//polySynth is a wrapper that manages multiple simultaneous voices of any
//synth type. without it, playing two notes at once would be impossible
//ex. triggering note B would cut off note A
//maxPolyphony (8 in this case) allows up to 8 notes playing simultaneously
//Tone.Synth is the base synthesizer and has:
//oscillator:waveform generator (the sound source)
//envelope:amplitude shape over time (ADSR)
//envelope controls how the note's volume changes over time
//sawtooth wave rises linearly from -1 to +1, back to -1 as such contains
// many more overtone frequencies (than like sine for example is very hollow)

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

//A LOW-PASS filter lets low frequencies through and blocks high ones
//useful for sawtooth waves having very strong high frequencies
const filter = new Tone.Filter({
  type: "lowpass",
  frequency: 2800,
  rolloff: -12,
});

//reverb adds to the actual visual effects heree
const reverb = new Tone.Reverb({
  decay: 4.2,
  wet: 0.18,
});

//limiter: a dynamic range compressor with an infinite ratio:
//it prevents the signal from exceeding a set threshold
const limiter = new Tone.Limiter(-2);
//lets it measure the sound energy and since the locust reacts to note pitch and how energized the audio is
//FFT splits a complex sound wave into its component pure frequencie
const analyser = new Tone.Analyser("fft", 128);
//The order matters:
//Filter must come BEFORE reverb, so the reverb processes the filtered sound
//(not: reverb processing raw sawtooth and creating a harsh reverb tail)
//Limiter must come LAST so it catches the combined output of all effects
//Analyser taps AFTER the limiter to measure the actual output level
synth.connect(filter);
filter.connect(reverb);
reverb.connect(limiter);
limiter.toDestination();
limiter.connect(analyser);
///rest of audio set up
//this is an async function because Tone.start() is a Promise
//a Promise represents a value that may not be available yet
//"async" marks functions that can use "await"
//"await" pauses execution until a Promise resolves
//the function returns a Promise itself
async function startAudioIfNeeded() {
  //exit immediately if audio has already been playing
  if (audioStarted) return;

  //"Tone.start() asks the browser for permission to begin audio processing."

  await Tone.start();

  // "Tone.Reverb builds an impulse response internally."
  // "generating it once up front avoids a later hiccup the first time sound is played."
  await reverb.generate();

  audioStarted = true;
}
//--=-=----=---====HELPER FUNCTIONS=--=-=--====-=-
function keyToNote(key) {
  //look up and at how many semitones this key is above the base note

  const semitone = keyToSemitone[key];
  if (semitone === undefined) return null;

  //Handle octave overflow: if semitone >= 12, move into the next octave
  const octaveOffset = Math.floor(semitone / 12);
  //wrap the semitone value back into the 0–11 range using modulo
  //% is the modulo operator
  const noteIndex = semitone % 12;
  //the final octave
  const octave = currentOctave + octaveOffset;
  //tone.js uses note names for sound, while the visual uses MIDI numbers asa convenient pitch scale
  //template literal `${expression}` inserts values into a string
  return {
    name: `${noteNames[noteIndex]}${octave}`,
    midi: 12 * (octave + 1) + noteIndex,
  };
}
function midiToPitchNorm(midi) {
  //convert the useful MIDI range into 0..1 visuals
  // usually work better with small normalized ranges than raw MIDI values allegdly
  //keyboard maps semitones 0–12 from a base octave of 2–6
  //THREE.MathUtils.clamp(value, min, max):
  //returns value if it's between min and max
  //returns min if value < min
  //returns max if value > max
  //this prevents edge notes from producing values outside 0–1
  return THREE.MathUtils.clamp((midi - 48) / 36, 0, 1);
  //define for clamp
}
//teturns the current time in SECONDS since the page loaded
//the animation and voice timing system uses seconds throughout, matching
//the convention of requestAnimationFrame's timestamp parameter
function nowInSeconds() {
  //returns milliseconds the visual timing uses seconds ig
  return performance.now() * 0.001;
}
//reads the current FFT data from the analyser and returns a single 0–1
//number representing the overall audio energy in a specific frequency
function getAverageFft() {
  // The full FFT includes:
  //Very low frequencies (bass: 20–250 Hz):loud
  //Mid frequencies (250–4000 Hz):most musical
  //Very high frequencies (4000+ Hz):ambience or hiss
  //sample bin indices here 3–55 is about 1035 Hz to 18975 Hz
  //such is stable enough to drive smooth visual motion without jitter
  //analyser.getValue() returns a Float32Array of dB values, one per FFT bin
  const data = analyser.getValue();
  let sum = 0;
  let count = 0;

  //samples a middle to low area of the FFT instead of the whole spectrum
  //this range is stable enough to give motion but not so noisy that the lines jitter like crazy
  for (let i = 3; i < 56; i++) {
    const db = THREE.MathUtils.clamp(data[i], -140, 0);
    //"Clamps the given value between min and max" tone.js
    const normalized = THREE.MathUtils.mapLinear(db, -140, 0, 0, 1);

    // from Tone.js directly: this Performs a linear mapping from range <a1, a2> to range <b1, b2> for the given value.
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
  //source:
  //return the average across all sampled bins
  //the "count ? sum / count : 0" is a "ternary" operator:
  //if count > 0: return sum/count
  //else: return 0 (prevent division by zero)
  return count ? sum / count : 0;
}
//creates and returns a "voice" object whihc is a small data record that describes
//the motion event triggered by pressing a note
//iin audio synthesis, a "voice" is one instance of a playing note, the word is repurposed visually
//each voice stores:
//midi:the pitch (determines horizontal position of effect)
//startTime: when the voice was created (for age calculations in update())
//endTime:when to remove voice(startTime + duration)
//duration:total lifetime in seconds
//strength:multiplier for how intensely this voice affects the lines
//centerY:vertical position in scene units where this voice is "focused"
//the centerY calculation maps pitch to vertical position:
//low notes affect the bottom of image, the high notes affect the top of image
function createVoiceFromMidi(midi) {
  //the rippley activation helper
  //"voice" is kinda refering to how its related to both
  const pitchNorm = midiToPitchNorm(midi);
  const startTime = nowInSeconds();

  return {
    midi,
    startTime,
    endTime: startTime + 1.25,
    duration: 1.25,
    strength: 1.12,

    //(1 - pitchNorm) inverts how the higher note to smaller t to closer to -120 (top of scene)
    //scene Y increases upward, so positive Y = upper part of screen = top of image

    centerY: THREE.MathUtils.lerp(-120, 140, 1 - pitchNorm),
  };
}
//a loop by iterating backward, removed elements are always behind and new elements haven't shifted
//removes voices from the activeVoices array that have passed endTime
//called each animation frame to keep the array clean
function removeExpiredVoices(time) {
  for (let i = activeVoices.length - 1; i >= 0; i--) {
    if (time > activeVoices[i].endTime) {
      // Remove 1 element at index i.
      // splice(startIndex, deleteCount) modifies the array in-place.
      activeVoices.splice(i, 1);
    }
  }
}
//the visual freq so those key attacks visibly lift the terrain
//let visualEnergy = 0;
//three.js set upp basics taken from the joy division tut
const scene = new THREE.Scene();
//Orthographic camera keeps scale visually flat
//it has no perspective distortion objects at any depth appear the same size

const camera = new THREE.OrthographicCamera(-500, 500, 500, -500, 0.1, 2000);
//places the camera 500 units "in front of" the scene (Z axis points toward)
//with ortho: the exact position doesn't affect perspective, but the camera
//must be between the near and far clip planes (0.1 and 2000)
camera.position.set(0, 0, 500);

//also this 3.js scene is funnily photo printed like topology look and this flat projection is the better choice
camera.lookAt(0, 0, 0);
//the scene origin (center of screen)
//for an orthographic camera looking at a 2D scene

//new wbgl render activated
//antialias: enables multi-sample anti-aliasing (MSAA)
//MSAA samples each pixel multiple times at sub-pixel positions and averages for smoother edges
const renderer = new THREE.WebGLRenderer({ antialias: true });
//on "Retina" / HiDPI displays devicePixelRatio often 2 or 3 (without doing this the canvas renders at 1:1, blurry)
//use a sensible pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//match the renderer size to the browser
renderer.setSize(window.innerWidth, window.innerHeight);
//clears the canvas to opaque black before each frame,
// without this, previous frames would remain visible and create a motion blur
renderer.setClearColor(0x000000, 1);
//appending it to #mount makes it visible in the page
mount.appendChild(renderer.domElement);

//the visual reference is assigned after the image loads/cannot exist until then
let locustVisual = null;

//image load
//this uses the browser's native image loading mechanism:
//new Image() creates HTMLImageElement (like <img> in HTML)
//image.onload starts when the image has been fully downloaded and decoded
//image.onerror if the download fails
//setting image.src starts the download
//onReady: such callback follows the "continuation" pattern so instead of
//returning a value immediately (impossible for async), it passes a
//function to call when ready (likewise of Promise)
function loadImage(src, onReady) {
  const image = new Image();
  //decode the image only after it has fully loaded
  //can now call onReady with the loaded image object
  image.onload = () => {
    onReady(image);
  };
  //setting .src triggers the HTTP request to download the image, must be after the event handlers
  image.src = src;
}
//creates the LocustTopology instance with recieved image data
function buildLocustVisual(image) {
  // main.js  owns loading locust.js owns visual processing
  //the visual class passing in all the shared Three.js objects
  //plus the now ready image
  locustVisual = new LocustTopology({
    scene,
    camera,
    renderer,
    image,
  });
}
//---=--=-=-==--=-=-=-KEYBOARD EVENTS-=-=-=------=-=-=-=

//an async function since it awaits startAudioIfNeeded() which itself awaits Tone.start() and reverb.generate())
async function onKeyDown(event) {
  //normalize the key to lowercases
  const key = event.key.toLowerCase();
  //PREVENT DEFAULT BROWSER BEHAVIOUR for keys used musically
  if (key in keyToSemitone || key === "z" || key === "x") {
    event.preventDefault();
  }

  //ignore auto repeat if the key is already being held (for now)
  //each physical key press should produce exactly one note

  if (heldKeys.has(key)) return;

  // COOL : Z shifts octave downward
  //"octave changes are really just transposition; they move the same layout into a lower pitch range without remapping every key"
  // Math.max(2, ) prevents going below octave 2 since thats the lowest
  if (key === "z") {
    currentOctave = Math.max(2, currentOctave - 1);
    heldKeys.add(key);
    return;
  }

  //X shifts octave upward
  // "keeping octave on simple nearby keys makes range changes fast during performance"
  //Math.max() method used again, but for the highest pitch
  if (key === "x") {
    currentOctave = Math.min(6, currentOctave + 1);
    heldKeys.add(key);
    return;
  }

  //convert this key into a note finallt
  //const note = keyToMidiAndName(key);
  const note = keyToNote(key);
  //stop if the key is not a musical key!
  if (!note) return;

  //unlock the browser's audio context on first musical key press
  await startAudioIfNeeded();

  //mark the physical key as held
  heldKeys.add(key);

  //remember which note belongs to this physical key
  keyToNoteName.set(key, note.name);

  //start the synth note
  synth.triggerAttack(note.name);

  //create the matching visual note event
  activeVoices.push(createVoiceFromMidi(note.midi));
}
function onKeyUp(event) {
  const key = event.key.toLowerCase();
  //remove the key from the held set.
  heldKeys.delete(key);
  //look up the musical note linked to this physical key y
  const noteName = keyToNoteName.get(key);
  //wierd but
  // it needs to know if a note exists, then to release it.
  if (!noteName) return; //bail if no note
  synth.triggerRelease(noteName);
}
function releaseAllNotes() {
  //gather all currently held note names

  const notes = Array.from(keyToNoteName.values());

  //release the notes together if any exist
  //also called  when the browser window loses focus (user switches tabs)
  if (notes.length) {
    synth.triggerRelease(notes);
  }

  //clear input tracking
  heldKeys.clear();
  keyToNoteName.clear();
}
//finally:
// Register all browser event listeners

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
window.addEventListener("blur", releaseAllNotes, false);
window.addEventListener("pointerdown", startAudioIfNeeded, false);
window.addEventListener(
  "resize",
  () => {
    //the CSS style.width/style.height, keeping them consistent
    renderer.setSize(window.innerWidth, window.innerHeight);
    //update the pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //for the locust visual to recompute scale and rebuild geometry
    //the if statement in case a resize event occurs before the image has loaded
    if (locustVisual) {
      locustVisual.handleResize();
    }
  },
  false,
);

function animate(nowMs = 0) {
  //asks zethe browser to call animate again on the next frame
  requestAnimationFrame(animate);

  //then convert the frame time from milliseconds to seconds
  // the timing system (voices, easing, sine waves) all work in seconds
  const time = nowMs * 0.001;

  //current sound energy
  //this is the shared bridge between sound and drawing;
  // the notes create events but FFT energy tells the image how intense the overall movement should look
  //produces a 0–1 number that scales the visual animation intensity
  const fftEnergy = getAverageFft();

  //remove old visual note events adder
  removeExpiredVoices(time);

  //update the locust line positions
  //the if statement is a protection handling the brief period after page loads
  if (locustVisual) {
    locustVisual.update(time, activeVoices, fftEnergy);
  }

  //RENDER THE SCENE
  renderer.render(scene, camera);
}
//animation loop
animate();
//finally
loadImage("./locust.png", buildLocustVisual);
