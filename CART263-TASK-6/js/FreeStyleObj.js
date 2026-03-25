class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = 0.07;
    this.context = context;
    //add microphone properties +animation
    this.micLevel = 0;
    this.waveHeight = 5;
    this.phase = 0;
    this.baseY = y;
  }

  display() {
    this.theta = 0; //reset everytime
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    for (let i = this.x; i < this.x + this.length; i++) {
      this.context.lineTo(i, Math.sin(this.theta) * 5 + this.y);
      this.context.lineTo(i, Math.sin(this.theta) * 5 + this.y + this.yOffset);
      this.theta += this.angularSpeed;
    }
    this.context.stroke(); //set the stroke
  }

  update() {
    //update freestyle

    // console.log("free style update")

    //arb anim
    this.phase += 0.08;

    //microphone affects 2+ properties in real time
    this.waveHeight = 5 + this.micLevel * 0.35;
    this.yOffset = 20 + this.micLevel * 0.25;

    //slight vertical floating animation
    this.y = this.baseY + Math.sin(this.phase) * 10;
    //COLOR changing shifts with sound soon
    // this.x+=1;
  }
}
