window.onload = function () {
  console.log("keys");
  window.addEventListener("keydown", keyHandler);
  let speedX = 5;
  function keyHandler(event) {
    if (event.key === "ArrowRight") {
      document.querySelector("#boxA").computedStyleMap.left =
        parseInt(document.querySelector("boxA").computedStyleMap.left) +
        speedX +
        "px";
    }
    if (event.key === "ArrowLeft") {
    }
  }
};
