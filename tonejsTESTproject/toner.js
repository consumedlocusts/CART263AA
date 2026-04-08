import * as Tone from "tone";
import * as THREE from "three";
//npm install tone      // Install the latest stable version
console.log(Tone);
const synth = Tone.Synth().toDestination();
const now = Tone.now();
// trigger the attack immediately
synth.triggerAttack("C4", now);
// wait one second before triggering the release
synth.triggerRelease(now + 1);
// function playNote() {
//   // create a synth
//   const synth = new Tone.Synth().toDestination();
//   // play a note from that synth
//   synth.triggerAttackRelease("C4", "8n");
// }
//https://nodejs.org/en/download
