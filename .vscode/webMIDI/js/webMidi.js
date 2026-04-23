window.onload = function(){

console.log("go")
let buttonGo = document.querySelector("#go");
buttonGo.addEventListener("click", runMidi)


 let midi = null; // global MIDIAccess object

function runMidi(){
    console.log("in midi function");

  navigator.permissions.query({ name: "midi", sysex: true })
  
  .then((result) => {
        if (result.state === "granted") {
            console.log("granted")
            navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
           
            // Access granted.
        } else if (result.state === "prompt") {
            // Using API will prompt for permission
             console.log("prompt");

            //  navigator.requestMIDIAccess().then((access) => {
            //     // Get lists of available MIDI controllers
            // const inputs = access.inputs.values();
            // const outputs = access.outputs.values();
            // console.log(inputs)
            navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

           
            

        

        }
    // Permission was denied by user prompt or permission policy
    });
}


function onMIDISuccess(midiAccess) {
            console.log("MIDI ready!");
            midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
            listInputsAndOutputs(midi);
        }

function onMIDIFailure(msg) {
        console.error(`Failed to get MIDI access - ${msg}`);
}

function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    console.log(
      `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`,
    );
  }

  startLoggingMIDIInput(midiAccess)
}

function onMIDIMessage(event) {
//   let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
//   for (const character of event.data) {
//     str += `0x${character.toString(16)} `;
//   }
//   console.log(str);
console.log(event.data);
}

function startLoggingMIDIInput(midiAccess) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

//Byte 0: Status Byte (128–255 or 0x80–0xFF): Defines the message type (e.g., Note On, Note Off, Control Change) and the channel (0–15).
//FOR A NOTE ON (144): i.e. [144, 60, 64] --> Channel 1, Note 60 (C3), Velocity 64
//FOR A NOTE OF (128)
}