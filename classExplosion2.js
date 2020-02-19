

function Explosion2 (args) {

  var args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.dx = args.dx || 0;
  this.dy = args.dy || 0;
  this.point_count = args.point_count || 200;

  this.life = 80;
  this.age = 0;
  this.alpha = 1;
  this.energy = 1;
  this.color = args.color || 'rgba(255, 60, 50, ';

  this.points = [];

  for (var i = 0; i < this.point_count; i++) {
    this.points.push([0, 0, this.energy + (Math.random() * (this.energy / 2))]);
  }






  // class functions


  this.update = function () {

    this.x += this.dx;
    this.y += this.dy;
    this.alpha = 1 - (this.age / this.life);

    for (var j = 0; j < this.points.length; j++) {

      var ang = (j * (360 / this.points.length)).d2r();
      var ix = Math.sin(ang);
      var iy = Math.cos(ang);

      this.points[j][0] += ix * this.points[j][2];
      this.points[j][1] += iy * this.points[j][2];

    }

    this.age++;
    if (this.age >= this.life) { this.die(); }

    this.draw();

  }




  this.draw = function () {

    var color = this.color + this.alpha + ')';
    for (var i = 0; i < this.points.length; i++) {
      c.line(this.x, this.y, this.x + this.points[i][0], this.y + this.points[i][1], { strokeStyle: color });
    }

  }



  this.die = function () {
    Objects.delete(this);
  }



}
