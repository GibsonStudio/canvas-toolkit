

function Bullet (args) {

  var args = args || {};
  this.pos = args.pos || [0, 0];
  this.dir = args.dir || 0;
  this.age = 0;
  this.life = 70;
  this.speed = 12;
  this.canvas = args.canvas || Canvas;
  this.owner = args.owner || false;

  this.vel = [this.speed * jLib.sin(this.dir), this.speed * jLib.cos(this.dir)];

  Objects.add(this);


  this.update = function () {

    this.age++;

    if (this.age >= this.life) { this.die(); }

    this.pos[0] += this.vel[0];
    this.pos[1] -= this.vel[1];

    if (this.pos[1] < 0) { this.die(); }

    //bounce?
    if (this.pos[1] > environ.floor) {
      this.pos[1] = environ.floor - (this.pos[1] - environ.floor);
      this.vel[1] = -this.vel[1];
    }

    if (this.pos[0] > WIDTH) {
      this.pos[0] = 0 + (this.pos[0] - WIDTH);
    } else if (this.pos[0] < 0) {
      this.pos[0] = WIDTH - this.pos[0];
    }


    // check collision with players
    var players = [player1, player2];

    for (var i = 0; i < players.length; i++) {

      var dx = this.pos[0] - players[i].pos[0];
      var dy = this.pos[1] - players[i].pos[1];
      var dist = Math.sqrt((dx * dx) + (dy * dy));
      if (dist < 20) {
        players[i].die();
        if (this.owner == players[i]) {
          this.owner.killedSelf();
        } else {
          this.owner.scorePoint();
        }
        this.die();
      }

    }

    this.draw();

  }


  this.draw = function () {

    this.canvas.circle(this.pos[0], this.pos[1], 2);

  }


  this.die = function () {
    Objects.delete(this);
  }



}






//
