export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomInt(exclMax) {
  return Math.floor(Math.random() * exclMax);
}

export function round(value, decimals = 1) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export function sphericalToCartesian(angle, dist) {
  return {
      "x": dist * Math.cos(angle * Math.PI / 180),
      "y": dist * Math.sin(angle * Math.PI / 180),
  }
}

export function render(shape, ctx, base_angle=0, x=0, y=0, stroke="#A00", fill="#A00") {
 
  ctx.beginPath();

  var p0 = sphericalToCartesian(shape[0].angle - base_angle, shape[0].dist);
  ctx.moveTo(x + p0.x, y + p0.y);

  for (var i = 1; i < shape.length; ++i) {

    var pi = sphericalToCartesian(shape[i].angle - base_angle, shape[i].dist);
    ctx.lineTo(x + pi.x, y + pi.y);
  };

  ctx.strokeStyle = stroke;
  ctx.stroke();
  ctx.fillStyle = fill;
  ctx.fill();
}