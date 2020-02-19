

function Star (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.size = args.size || 4 + Math.random() * 10;
  this.ang = args.ang || Math.random() * Math.PI * 2;
  this.angInc = (1 - (Math.random() * 2)) * 0.2;
  this.life = 170;
  this.age = 0;
  this.xVel = 3 - (Math.random() * 6);
  this.yVel = 1 + (Math.random() * 2);
  this.pointCount = 4 + Math.round(Math.random() * 4);
  this.canvas = args.canvas || Canvas;

  var col = Math.round(Math.random() * 200);
  this.R = 255 - col;
  this.G = 0;
  this.B = col;


  this.update = function () {

    this.age++;
    if (this.age >= this.life) { this.die(); return false; }
    if (this.y > HEIGHT) { this.die(); return false; }

    this.x += this.xVel;
    this.xVel *= 0.96;

    this.yVel -= 0.1;
    this.y -= this.yVel;

    this.ang += this.angInc;

    var alpha = (1 - (this.age / this.life)) * 0.6;
    var color = "rgba(" + this.R + "," + this.G + "," + this.B + "," + alpha + ")";
    var size = this.size * (1.1 - (this.age / this.life));
    var ang = (this.ang * 180) / Math.PI;
    this.canvas.star(this.x, this.y, { size:size, fillStyle:color, lineWidth:0, rot:ang, pointCount:this.pointCount });

  }



  this.die = function () {
    Objects.delete(this);
  }


}














//
