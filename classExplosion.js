

function Explosion (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;

  this.age = 0;
  this.life = 100;
  this.smokeCount = args.smokeCount || 10 + Math.round(Math.random() * 30);
  this.fragmentCount = args.fragmentCount || 40 + Math.round(Math.random() * 160);
  this.smoke = [];
  this.fragments = [];
  this.fragementColor = args.fragmentColor || "rgba(100, 100, 100, ";
  this.canvas = args.canvas || Canvas;

  for (var i = 0; i < this.smokeCount; i++) {
    this.smoke.push(new ExplosionSmoke({ x:this.x, y:this.y, life:this.life, canvas:this.canvas }));
  }

  for (var i = 0; i < this.fragmentCount; i++) {
    var ang = ((Math.PI * 2) / this.fragmentCount) * i;
    this.fragments.push(new ExplosionFragment({ x:this.x, y:this.y, ang:ang, life:this.life, color:this.fragementColor, canvas:this.canvas }));
  }


  this.update = function () {

    this.age++;
    if (this.age >= this.life) { this.die(); return false; }

    for (var i = 0; i < this.smoke.length; i++) {
      this.smoke[i].update();
    }

    for (var i = 0; i < this.fragments.length; i++) {
      this.fragments[i].update();
    }

  }


  this.die = function () {
    Objects.delete(this);
  }



} // end of Explosion









function ExplosionSmoke (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.xVel = (1 - (Math.random() * 2)) * 0.4;
  this.yVel = (1 - (Math.random() * 2)) * 0.4;
  this.startSize = 10 + Math.random() * 4;
  this.endSize = 20 + Math.random() * 5;

  this.age = 0;
  this.life = args.life || 100;
  this.canvas = args.canvas || Canvas;

  var col = Math.round(Math.random() * 200);
  this.R = 220 + Math.round(Math.random() * 30);
  this.G = 80 + Math.round(Math.random() * 140);
  this.B = 15 + Math.round(Math.random() * 15);


  this.update = function () {

    this.age++;
    if (this.age >= this.life) { this.die(); return false; }

    this.x += this.xVel;
    this.y += this.yVel;

    var alpha = Math.max((1 - (this.age / this.life)) * 0.6, 0);
    var size = this.startSize + (this.endSize - this.startSize) * (this.age / this.life);
    var color = "rgba(" + this.R + "," + this.G + "," + this.B + "," + alpha + ")";

    this.canvas.circle(this.x, this.y, size, { fillStyle:color, lineWidth:0 });

  }

} // end of ExplosionSmoke




function ExplosionFragment (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.dx = args.dx || 0;
  this.dy = args.dy || 0;

  this.ang = args.ang || 0;
  this.life = args.life || 80;
  this.age = 0;
  this.alpha = 1;
  this.energy = 0.5;
  this.color = args.color || 'rgba(240, 60, 50, ';
  this.canvas = args.canvas || Canvas;

  var ix = Math.sin(this.ang) * 30;
  var iy = Math.cos(this.ang) * 30;

  this.point = [ix, iy, this.energy + (Math.random() * (this.energy / 2))];


  this.update = function () {

    this.age++;
    this.x += this.dx;
    this.y += this.dy;
    this.alpha = Math.max(1 - (this.age / this.life), 0);
    var ix = Math.sin(this.ang);
    var iy = Math.cos(this.ang);

    this.point[0] += ix * this.point[2];
    this.point[1] += iy * this.point[2];

    this.draw();

  }




  this.draw = function () {

    var color = this.color + this.alpha + ')';
    this.canvas.line(this.x, this.y, this.x + this.point[0], this.y + this.point[1], { strokeStyle: color });

  }



} // end of ExplosionFragment







//
