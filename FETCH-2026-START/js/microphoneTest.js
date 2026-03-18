//The js:(js/microphoneEx.js)

window.onload = getMicrophoneInput;

async function getMicrophoneInput() {
  console.log("here we are ");

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext = new AudioContext(); //using the web audio library
  try {
    //returns a MediaStreamAudioSourceNode.
    let audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    // console.log(audioStream)
    //pass the microphone input to the web audio API
    let microphoneIn = audioContext.createMediaStreamSource(audioStream);
    const filter = audioContext.createBiquadFilter();
    const analyser = audioContext.createAnalyser();
    // microphone -> filter ->  analyzer->destination
    microphoneIn.connect(filter);
    //use the analyzer object to get some properties ....
    filter.connect(analyser);
    analyser.fftSize = 32;
    let frequencyData = new Uint8Array(analyser.frequencyBinCount);

    //call loop ...
    requestAnimationFrame(animateFrequencies);

    /****our looping callback function */
    function animateFrequencies() {
      analyser.getByteFrequencyData(frequencyData);
      let average = 0;
      let sum = 0;

      for (let i = 0; i < frequencyData.length; i++) {
        sum += frequencyData[i];
      }
      average = sum / frequencyData.length;
      console.log(average);
      //call loop ...
      requestAnimationFrame(animateFrequencies);
    }
  } catch (err) {
    /* handle the error */
    console.log("had an error getting the microphone");
  }
}
