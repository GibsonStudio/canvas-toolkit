

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

  var explosionElementCount = 40;

  // smoke
  for (var i = 0; i < explosionElementCount; i++) {

    var myX = Mouse.x + 10 - (Math.random() * 20);
    var myY = Mouse.y + 10 - (Math.random() * 20);
    var ex = new Explosion({ x:myX, y:myY });
    Objects.add(ex);

  }

  // Explosion2
  var ex2 = new Explosion2({ x:Mouse.x, y:Mouse.y });
  Objects.add(ex2);


}












//
