import World from "/src/world.js";
import Screen from "/src/screen.js";
import Vessel from "/src/vessel.js";
import SphericalBody from "/src/spherical_body.js";
//import InputHandler from "/src/input.js";

let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

let scr = new Screen(ctx, 800, 600);

let world = new World(ctx, scr, 0);

for (var i=0; i<36; ++i){
  var b1 = new SphericalBody(ctx, scr);
  b1._azimuth = i*10;
  b1._inclination = 0;
  b1._color = "#fff"
  
  world.addBody(b1);
}

for (var i=1; i<36; ++i){
  
  var b1 = new SphericalBody(ctx, scr);
  b1._r = 10;
  b1._color = "#fff"
  b1._azimuth = 0;
  b1._inclination = i*10;

  world.addBody(b1);
}

var vsl= new Vessel(ctx, scr);
world.addBody(vsl);


let lastTime = 0;

function main(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  scr.clear(0);
  scr.draw();

  world.update(dt);

  requestAnimationFrame(main);
}

main();
