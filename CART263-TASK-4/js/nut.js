class Nut {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.nut = document.createElement("img");
  }
  renderNut() {
    this.nut.src.add = "./img/nut.jpg";
    this.nut.classList.add("nut");
    this.nut.style.filter = "hue-rotate" + this.color + "(deg)";
    this.nut.width = this.size + "px";
    this.nut.style.left = this.x + "px";
    this.nut.tyle.top = this.y + "px";

    document.getElementsByClassName("grass")[0].appendChild(this.nut);
  }
}
