import { getRandomInt, getRandomColor } from "/src/utils.js";

export default class Body {
  constructor(ctx, scr) {

    this._a = 0.0;
    this._b = 0.0;

    this._w = 100;
    this._h = 100;

    this._x = getRandomInt(scr.w - this._w) + 1;
    this._y = getRandomInt(scr.h - this._h) + 1;

    this._v = {
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random(),
      y: (Math.random() < 0.5 ? -1 : 1) * Math.random()
    };

    this._ctx = ctx;
    this._scr = scr;

    this.color = getRandomColor();
  }

  getX() {
    return this._x - this._w / 2;
  }

  getY() {
    return this._y - this._h / 2;
  }

  getW() {
    return this._w;
  }

  getH() {
    return this._h;
  }

  getR() {
    return this._w / 2;
  }

  get_adjusted_sin_a() {

    if (this._a < 90) {
      return Math.sin(this._a * Math.PI / 180);
    }

    return Math.sin((this._a - 90 * Math.floor(this._a / 90)) * Math.PI / 180 );
  }

  update(dt) {
    // delta time
    if (!dt) return;

    // if (this._scr.collidesLeftWith(this)) {
    //   this._v.x = 1;
    // }

    // if (this._scr.collidesRightWith(this)) {
    //   this._v.x = -1;
    // }

    // if (this._scr.collidesTopWith(this)) {
    //   this._v.y = 1;
    // }

    // if (this._scr.collidesBottomWith(this)) {
    //   this._v.y = -1;
    // }

    let step = 0.3 * dt;

    // // move
    // this._x = this._x + step * this._v.x;
    // this._y = this._y + step * this._v.y;          
    //TODO: to sperical coordinates!

    this._a += 0.005 * dt * this._v.x;

    this._x = 400 + this._scr._vp_radius * Math.sin((this._scr._vp_a) * Math.PI / 180) +
      this._scr._vp_radius * this.get_adjusted_sin_a();

    this._y = 300 - this._scr._vp_radius * Math.sin((this._scr._vp_b) * Math.PI / 180) -
      this._scr._vp_radius * Math.sin((this._b) * Math.PI / 180);

    this.print(`${this._scr._vp_a}, ${this._scr._vp_b}`, 400, 580);
  }

  draw() {
    //this._ctx.fillStyle = this.color;
    //this._ctx.fillRect(this.x, this.y, this.w, this.h);

    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._w / 2, 0, 2 * Math.PI);
    this._ctx.fillStyle = this.color;
    this._ctx.fill();
    this._ctx.strokeStyle = this.color;
    this._ctx.stroke();

    this.print(`x, y: ${this._x.toFixed(2)}, ${this._y.toFixed(2)}`);
    this.print(`a, b: ${this._a.toFixed(2)}, ${this._b.toFixed(2)}`, 10, 30);
  }

  print(text, x = 10, y = 15) {
    this._ctx.font = "15px Arial";
    this._ctx.fillStyle = "#000";
    this._ctx.fillText(text, x, y);
  }
}
