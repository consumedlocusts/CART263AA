window.onload = function () {
  console.log("move");
  this.document.querySelector("#draw-box-a");
  addEventListener("mousemove", mouseMoveFunction);
  let rect = document.querySelector("#draw-box-a").getBoundingClientRect();
  let pointDiv = this.document.createElement("div");
  pointDiv.classList.add("point");
  document.querySelector("#draw-box-a").appendChild(pointDiv);

  function mouseMoveFunction(eventObj) {
    console.log("moving");
    console.log(eventObj);
    // this.innerHTML = `x:${eventObj.clientX},y:${eventObj.clientY}`;
    let offsetX = eventObj.clientX - rect.x;
    let offsetY = eventObj.clientY - rect.y;
    // this.innerHTML = this.innerHTML = `x:${offsetX},y:${offsetY}`;
    pointDiv.style.top = `y:${offsetY}`;
    pointDiv.style.left = `x:${offsetX}`;
  }
};
