import World from "/src/world.js";
import Screen from "/src/screen.js";
import Ship from "/src/ship.js";
import Body from "/src/body.js";
import InputHandler from "/src/input.js";

let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

let scr = new Screen(ctx, 800, 600);
let world = new World(ctx, scr, 0);

//var ship = new Ship(ctx, scr);
var b1 = new Body(ctx, scr);
// b1._x = 400;
// b1._y = 300;
b1._v.x = 0;
b1._v.y = 0;

//var b2 = new Body(ctx, scr);
// b2._x = 100;
// b2._y = 380;
// b2._v.x = 1;
// b2._v.y = 0;

//world.addBody(ship);
world.addBody(b1);
// world.addBody(b2);

let lastTime = 0;

function main(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  scr.clear(0);
  world.update(dt);

  requestAnimationFrame(main);
}

main();
