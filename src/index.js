import Body from "/src/body";
import Screen from "/src/screen";

let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

let scr = new Screen(ctx, 800, 600);

let bodies = Array(10)
  .fill()
  .map(i => new Body(ctx, scr));

let lastTime = 0;
function loop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  scr.clear(0);

  bodies.forEach(b => {
    b.update(dt);
    b.draw();
  });

  requestAnimationFrame(loop);
}

loop();
