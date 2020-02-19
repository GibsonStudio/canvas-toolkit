


function Player (args) {

  var args = args || {};

  this.id = args.id || "player1";
  this.pos = [args.x || 0, args.y || 0];
  this.initPos = [this.pos[0], this.pos[1]];
  this.vel = [0, 0];
  this.velMax = 10;
  this.ang = args.ang || 0;
  this.imgSrc = args.imgSrc || "ship-1.png";
  this.thrust = false;
  this.score = 0;
  this.canvas = args.canvas || Canvas;

  this.bulletFrequency = 40;
  this.framesSinceLastBullet = this.bulletFrequency;



  this.update = function () {

    this.framesSinceLastBullet++;

    // calculate thrust
    var thrust = [0,0];

    if (this.thrust) {
      thrust = this.getThrust();
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

      var angTolerance = 30;

      if (this.ang > angTolerance || this.ang < -angTolerance || Math.abs(this.vel[0]) > 1.5 || Math.abs(this.vel[1]) > 1.5) {

        this.die();
        this.killedSelf();

      } else if (Math.abs(this.vel[1]) < 0.3) {
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

    this.draw();

  }


  this.draw = function () {

    this.canvas.image(this.id, this.pos[0], this.pos[1], { rotation:this.ang });

  }


  this.turn = function (acw) {

    var acw = acw || false;
    var angInc = acw ? -3 : 3;
    this.ang += angInc;

  }


  this.getThrust = function () {

    var thrustForce = 30;

    var tX = thrustForce * jLib.sin(this.ang);
    var tY = thrustForce * jLib.cos(this.ang);

    return [tX, tY];

  }


  this.shoot = function () {

    if (this.framesSinceLastBullet < this.bulletFrequency) { return false; }

    this.framesSinceLastBullet = 0;

    // get position at nose of ship
    var offset = 40;
    var bX = this.pos[0] + (offset * jLib.sin(this.ang));
    var bY = this.pos[1] - (offset * jLib.cos(this.ang));

    var b = new Bullet({ pos:[bX, bY], dir:this.ang, canvas:this.canvas, owner:this });

  }


  this.die = function () {
    var e = new Explosion({x:this.pos[0], y:this.pos[1], dx:this.vel[0], dy:-this.vel[1], color:this.color, canvas:this.canvas });
    Objects.add(e);
    Objects.delete(this);
    var myThis = this;
    setTimeout(function () { myThis.respawn(); }, 2000);
  }


  this.respawn = function () {

    this.pos[0] = this.initPos[0];
    this.pos[1] = this.initPos[1];
    this.vel = [0, 0];
    this.ang = 0;
    Objects.add(this);

  }


  this.scorePoint = function () {

    this.score++;
    console.log(this.id + " scored, " + this.score + " points");

  }


  this.killedSelf = function  () {

    if (this.score > 0) { this.score--; }
    console.log(this.id + " killed self, " + this.score + " points.");

  }



}




















//
