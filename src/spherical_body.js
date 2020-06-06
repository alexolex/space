import { render } from "/src/utils.js";

export default class SphericalBody {
  constructor(ctx, scr) {

    this._r = 5;

    this._azimuth = 0.0;
    this._inclination = 0.0;

    this._ctx = ctx;
    this._scr = scr;

    this._color = "#00AAFF";
  }

  update(dt) {
    // delta time
    if (!dt) return;
  }

  getX() {
    var d_az = this._scr._azimuth - this._azimuth;
    var d_az_sin = Math.sin(d_az * Math.PI / 180);

    return this._scr._w / 2 + this._scr._radius * d_az_sin;
  }

  getY() {
    var d_incl = this._scr._inclination - this._inclination;
    var d_incl_sin = Math.sin(d_incl * Math.PI / 180);

    return this._scr._h / 2 + this._scr._radius * d_incl_sin;
  }

  draw() {

    var x = this.getX();
    var y = this.getY();

    this._ctx.beginPath();
    this._ctx.moveTo(x - 10, y);
    this._ctx.lineTo(x + 10, y);

    this._ctx.moveTo(x, y - 10);
    this._ctx.lineTo(x, y + 10);

    this._ctx.strokeStyle = this._color;
    this._ctx.stroke();
  }

  render(shape, base_angle, stroke="#A00", fill="#A00") {
    var x = this.getX();
    var y = this.getY();

    render(shape, this._ctx, base_angle, x, y, stroke, fill);
  }

  print(text, x = 10, y = 15) {
    this._ctx.font = "15px Arial";
    this._ctx.fillStyle = "#000";
    this._ctx.fillText(text, x, y);
  }
}