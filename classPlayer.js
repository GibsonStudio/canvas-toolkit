


function Player (args) {

  var args = args || {};

  this.id = args.id || "player1";
  this.pos = [args.x || 0, args.y || 0];
  this.vel = [0, 0];
  this.velMax = 10;
  this.ang = args.ang || 0;
  this.imgSrc = args.imgSrc || "ship-1.png";
  this.thrust = false;

  this.color = args.color || 'rgba(19, 181, 234, ';

  this.bulletFrequency = 40;
  this.framesSinceLastBullet = this.bulletFrequency;



  this.Update = function () {

    this.framesSinceLastBullet++;

    // calculate thrust
    var thrust = [0,0];

    if (this.thrust) {
      thrust = this.GetThrust();
    }

    var factor = 400;

    var accelX = thrust[0] / factor;
    this.vel[0] = this.vel[0] + accelX;
    this.pos[0] += this.vel[0];

    var accelY = (environ.gravity - thrust[1]) / factor;
    this.vel[1] = this.vel[1] + accelY;
    this.pos[1] += this.vel[1];

    //bounce?
    if (this.pos[1] > environ.floor) {

      if (Math.abs(this.vel[1]) < 0.3) {
        this.vel[0] = 0;
        this.vel[1] = 0;
        this.pos[1] = environ.floor;
        this.ang = 0;
      } else {
        var diff = this.pos[1] - environ.floor;
        this.pos[1] = environ.floor - diff;
        this.vel[0] *= 0.5;
        this.vel[1] *= -0.6;
      }
    }

    this.pos[0] += this.vel[0];

    if (this.pos[0] > WIDTH) {
      this.pos[0] = 0 + (this.pos[0] - WIDTH);
    } else if (this.pos[0] < 0) {
      this.pos[0] = WIDTH - this.pos[0];
    }

    this.Draw();

  }


  this.Draw = function () {

    c.image(this.id, this.pos[0], this.pos[1], { rotation:this.ang });

  }



  this.Turn = function (acw) {

    var acw = acw || false;
    var angInc = acw ? -3 : 3;
    this.ang += angInc;

  }


  this.GetThrust = function () {

    var thrustForce = 30;

    var tX = thrustForce * this.ang.jSin();
    var tY = thrustForce * this.ang.jCos();

    return [tX, tY];

  }



  this.Shoot = function () {

    if (this.framesSinceLastBullet < this.bulletFrequency) { return false; }

    this.framesSinceLastBullet = 0;

    // get position at nose of ship
    var offset = 40;
    var bX = this.pos[0] + (offset * this.ang.jSin());
    var bY = this.pos[1] - (offset * this.ang.jCos());

    var b = new Bullet({ pos:[bX, bY], dir:this.ang });

  }


  this.die = function () {
    var e = new Explosion({x:this.pos[0], y:this.pos[1], dx:this.vel[0], dy:-this.vel[1], color:this.color });
    Objects.add(e);
  }



}




















//
