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
  for (var j=0; j<36; ++j){
  
    var b1 = new SphericalBody(ctx, scr);
    b1._r = 10;
    b1._azimuth = i*10;;
    b1._inclination = j*10;
  
    world.addToBackground(b1);
  }
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
