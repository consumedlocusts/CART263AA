window.onload  = function (){
    console.log("tone");

    // let synth = null;
    let started = false;
    let synths =[]


document.querySelector("#start").addEventListener("click",start)
document.querySelector("#play-button").addEventListener("click",play)

function play(){
if(started){
//create a synth and connect it to the main output (your speakers)
//play a middle 'C' for the duration of an 8th note
 // https://tonejs.github.io/examples/oscillator

//repeat a note 4 times
for(let i =0; i< 4; i++){
    setTimeout(function(){
        synths[0].triggerAttackRelease("C4", "8n");
    },500*i)
}

}


}
 


function start(){
     if (!started) {
        console.log("started")
        document.querySelector("#start").textContent = "STARTED"

        // Only exectued the first time the button is clicked
        // initializing Tone, setting the volume, and setting up the loop
        
        Tone.start();
        Tone.getDestination().volume.rampTo(-10, 0.001)
         //synth = new Tone.Synth().toDestination();
         for(let i = 0; i< 4;i++){
             synths.push(new Tone.Synth({ oscillator: { type: "sine" } }).toDestination())

         }
        
          //synth = new Tone.Synth({ oscillator: { type: "sine" } }).toDestination();
        started = true;
      }
  
    
}

}