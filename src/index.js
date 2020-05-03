import World from "/src/world";
import Screen from "/src/screen";

let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

let scr = new Screen(ctx, 800, 600);
let world = new World(ctx, scr, 5);

let lastTime = 0;
function loop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  scr.clear(0);
  world.update(dt);

  requestAnimationFrame(loop);
}

loop();
