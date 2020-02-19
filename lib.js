

//TODO: change global ref to canvas, c to Canvas


var c;
var Mouse;
var Objects;
var distanceRequired = 8;
var lastPosition = { x:0, y:0 };
var WIDTH = 800;
var HEIGHT = 600;
var player1, player2;

function init ()
{

  Mouse = new Mouse({ originElement:"my-canvas" });
  Objects = new Objects();
  c = new Canvas({width: WIDTH, height: HEIGHT });
  window.addEventListener("resize", function (event) { resizeMe(); });
  window.addEventListener("mousedown", function (event) { mouseDown(event); });

  resizeMe();

  player1 = new Player({ id:"player1", imgSrc:"img/ship-1.png", x:100, y:100 });
  player2 = new Player({ id:"player2", imgSrc:"img/ship-2.png", x:700, y:100, color:'rgba(0, 0, 0, ' });

  c.newImage({ id:player1.id, src:player1.imgSrc });
  c.newImage({ id:player2.id, src:player2.imgSrc });

  //animate();

}



function imagesLoaded ()
{
  console.log("images loaded!");
  //animate();
}



function resizeMe ()
{

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  c.width = WIDTH;
  c.height = HEIGHT;

  var el = document.getElementById("my-canvas");
  el.width = WIDTH;
  el.height = HEIGHT;

}



function animate ()
{

  window.requestAnimationFrame(animate);

  c.clear();

  var dist = Math.sqrt(Math.pow((Mouse.x - lastPosition.x), 2) + Math.pow((Mouse.y - lastPosition.y), 2));

  if (dist > distanceRequired) {

    var star = new Star({ x:Mouse.x, y:Mouse.y });
    Objects.add(star);

    lastPosition.x = Mouse.x;
    lastPosition.y = Mouse.y;

  }

  Objects.update();

  c.image("ship", 100, 100);

}



function mouseDown (e)
{

  var ex = new Explosion({ x:Mouse.x, y:Mouse.y });
  Objects.add(ex);

}












//
