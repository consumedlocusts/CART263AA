class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    //test properties for animation
    this.targetX = x;
    this.targetY = y;
    this.baseRadius = radius;
    this.pulseAngle = Math.random() * Math.PI * 2;
    this.speedX = (Math.random() * 2 - 1) * 0.4;
    this.speedY = (Math.random() * 2 - 1) * 0.4;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true,
    );
    this.context.fill(); // set the fill
    this.context.lineWidth = 2; //change stroke
    this.context.closePath();
    this.context.stroke();
  }

  update() {
    //update circle
    //drift motion for now
    this.x += this.speedX;
    this.y += this.speedY;

    //move gently toward the mouse position
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;

    //pulsing radius animation
    this.pulseAngle += 0.08;
    this.radius = this.baseRadius + Math.sin(this.pulseAngle) * 4;
    //this.x += 1;
    //console.log("circle update");
  }
}
