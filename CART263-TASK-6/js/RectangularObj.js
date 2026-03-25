class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    //properties 4 mic
    this.baseWidth = w;
    this.baseHeight = h;
    this.micLevel = 0;
    this.direction = 1;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    //update freestyle
    //arbitrary? animation
    this.x += this.direction * 1.2;

    if (this.x <= 0 || this.x + this.width >= 400) {
      this.direction *= -1;
    }

    //microphone affects at least two properties
    this.width = this.baseWidth + this.micLevel * 1.5;
    this.height = this.baseHeight + this.micLevel * 0.8;
    // this.x+=1;
    //console.log("rectangle update")
  }
}
