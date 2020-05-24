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