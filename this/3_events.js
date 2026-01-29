window.onload = setup;
function setup() {
  console.log("events!");
  let introSection = document.querySelector("#intro");
  introSection.addEventListener("click", mouseClickCallBack);
  this.style.background = `rgba(214, 110, 239, 0.5)`;
  let s1 = document.querySelector("#s1");
  s1.addEventListener("click", mouseClickCallBack);
}
function mouseClickCallBack() {
  console.log("clicked");
  console.log(this);
}
function mouseClickCallBack() {
  console.log("s1 clicked");
}
