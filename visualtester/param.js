//stroing the editable numberss better for later

export const params = {
  //the sun placement that the shaders sky model uses and interperts as direction
  //toward light source
  sunPosX: 0.0,
  sunPosY: 0.3,
  //controls largness of sun (if sliders come back but nah will tone.js this)
  sunSize: 0.9, //these r defults to test btw

  //sun briteness
  sunIntensity: 3.0,
  //ocean waves controller
  //height = tallness relief , choppiness=broken/jagged/disturbed waves, speed=local wave animation speed
  waveHeight: 0.2,
  waveChoppiness: 2.5,
  speed: 0.2,
  //sun reflection in water
  reflectionStrength: 2.5,
  reflectionWidth: 0.015,
  //creating the moving illusion
  // the shader treats camera as moving along z axis but the camera is still and isnt
  //moving in any geomtry, shader "moves it" thus making it appear like its flowing beneath one
  flySpeed: 0.5,
  //atmos helpers random numbers idk
  horizonColor: "#0a0a15",
  haloStrength: 1.5,
  haloRadius: 0.3,
  haloSize: 0.02,
  vignetteStrength: 0.65,
  //camera values
  cameraHeight: 4.0,
  cameraTilt: -0.1,
};
