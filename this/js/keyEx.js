window.onload = function () {
  console.log("keys");

  window.setTimeout(function (e) {
    let parent = document.querySelector("#parent");
    parent.innerHTML += "New text";
  }, 5000);
  window.addEventListener("keydown", keyHandler);
  window.addEventListener("keyup", keyHandlerUp);

  let speedX = 5;
  function keyHandlerUp(event) {
    if (event.key === "Space") {
      document.querySelector("#boxB").style.left = document.querySelector(
        "boxB",
      ).style.background = "blue";
    }
  }
  function keyHandler(event) {
    if (event.key === "ArrowRight") {
      document.querySelector("#boxA").style.left =
        parseInt(document.querySelector("boxA").style.left) + speedX + "px";
    } else if (event.key === "ArrowLeft") {
      document.querySelector("boxA").style.left =
        parseInt(document.querySelector("boxA").style.left) - speedX + "px";
    }
  }
};
