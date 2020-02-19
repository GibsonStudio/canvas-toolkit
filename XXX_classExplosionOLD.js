


function Explosion (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.xVel = (1 - (Math.random() * 2)) * 0.4;
  this.yVel = (1 - (Math.random() * 2)) * 0.4;
  this.startSize = 10 + Math.random() * 4;
  this.endSize = 20 + Math.random() * 5;

  this.age = 0;
  this.life = 100;

  var col = Math.round(Math.random() * 200);
  this.R = 66; //220 + Math.round(Math.random() * 30);
  this.G = 66; //80 + Math.round(Math.random() * 140);
  this.B = 66; //15 + Math.round(Math.random() * 15);



  this.update = function () {

    this.age++;
    if (this.age >= this.life) { this.die(); return false; }

    this.x += this.xVel;
    this.y += this.yVel;

    var alpha = (1 - (this.age / this.life)) * 0.6;
    var size = this.startSize + (this.endSize - this.startSize) * (this.age / this.life);
    var color = "rgba(" + this.R + "," + this.G + "," + this.B + "," + alpha + ")";

    c.circle(this.x, this.y, size, { fillStyle:color, lineWidth:0 });

  }



  this.die = function () {
    Objects.delete(this);
  }




}

















//
