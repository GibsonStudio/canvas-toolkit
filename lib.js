

//TODO: add howler and sound effects
//TODO: add objects collide




var jLib;
var Canvas;
var Mouse;
var Objects;

var WIDTH = 800;
var HEIGHT = 600;

var environ, player1, player2;
var distanceRequired = 8;
var lastPosition = { x:0, y:0 };




function init ()
{

  jLib = new jLib({ keysEnabled:true });
  Mouse = new Mouse({ originElement:"my-canvas" });
  Objects = new Objects();
  Canvas = new Canvas({width: WIDTH, height: HEIGHT });
  window.addEventListener("resize", function (event) { resizeMe(); });
  window.addEventListener("mousedown", function (event) { mouseDown(event); });

  resizeMe();

  environ = {};
  environ.gravity = 9.81;
  environ.floor = HEIGHT - 40;

  player1 = new Player({ id:"player1", imgSrc:"img/ship-1.png", canvas:Canvas, x:100, y:environ.floor });
  Objects.add(player1);
  player2 = new Player({ id:"player2", imgSrc:"img/ship-2.png", canvas:Canvas, x:(WIDTH - 100), y:environ.floor });
  Objects.add(player2);

  Canvas.newImage({ id:player1.id, src:player1.imgSrc });
  Canvas.newImage({ id:player2.id, src:player2.imgSrc });

}



function imagesLoaded ()
{
  console.log("images loaded!");
  animate();
}



function resizeMe ()
{

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  Canvas.width = WIDTH;
  Canvas.height = HEIGHT;

  var el = document.getElementById("my-canvas");
  el.width = WIDTH;
  el.height = HEIGHT;

}



function animate ()
{

  window.requestAnimationFrame(animate);

  Canvas.clear();

  CheckKeys();

  var dist = Math.sqrt(Math.pow((Mouse.x - lastPosition.x), 2) + Math.pow((Mouse.y - lastPosition.y), 2));

  if (dist > distanceRequired) {

    var star = new Star({ x:Mouse.x, y:Mouse.y, canvas:Canvas });
    Objects.add(star);
    lastPosition.x = Mouse.x;
    lastPosition.y = Mouse.y;

  }

  Objects.update();

}



function mouseDown (e)
{

  var ex = new Explosion({ x:Mouse.x, y:Mouse.y, canvas:Canvas });
  Objects.add(ex);

}




function CheckKeys ()
{

  // player 1
  player1.thrust = false;
  if (jLib.keys.KeyA) { player1.turn(true); }
  if (jLib.keys.KeyD) { player1.turn(); }
  if (jLib.keys.KeyW) { player1.thrust = true; }
  if (jLib.keys.KeyS) { player1.shoot(); }

  // player 2
  player2.thrust = false;
  if (jLib.keys.ArrowLeft) { player2.turn(true); }
  if (jLib.keys.ArrowRight) { player2.turn(); }
  if (jLib.keys.ArrowUp) { player2.thrust = true; }
  if (jLib.keys.ArrowDown) { player2.shoot(); }

}










//
