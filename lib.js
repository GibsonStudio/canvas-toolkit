

//TODO: 


var c;
var Mouse;
var Objects;
var distanceRequired = 8;
var lastPosition = { x:0, y:0 };
var WIDTH = 800;
var HEIGHT = 600;

function init ()
{

  Mouse = new Mouse({ originElement:"my-canvas" });
  Objects = new Objects();
  c = new Canvas({width: WIDTH, height: HEIGHT });
  window.addEventListener("resize", function (event) { resizeMe(); });
  window.addEventListener("mousedown", function (event) { mouseDown(event); });

  resizeMe();

  c.newImage({ id:"ship", src:"img/ship-1.png" });

  //animate();

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
