import { getRandomInt, getRandomColor } from "/src/utils";

export default class Body {
  constructor(ctx, scr, id) {
    this.id = id;

    this._w = 100;
    this._h = 100;

    this._x = getRandomInt(scr.w - this._w) + 1;
    this._y = getRandomInt(scr.h - this._h) + 1;

    this.v = {
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

  draw() {
    //this._ctx.fillStyle = this.color;
    //this._ctx.fillRect(this.x, this.y, this.w, this.h);

    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._w / 2, 0, 2 * Math.PI);
    this._ctx.fillStyle = this.color;
    this._ctx.fill();
    this._ctx.strokeStyle = this.color;
    this._ctx.stroke();
  }

  update(dt) {
    // delta time
    if (!dt) return;

    if (this._scr.collidesLeftWith(this)) {
      this.v.x = 1;
    }

    if (this._scr.collidesRightWith(this)) {
      this.v.x = -1;
    }

    if (this._scr.collidesTopWith(this)) {
      this.v.y = 1;
    }

    if (this._scr.collidesBottomWith(this)) {
      this.v.y = -1;
    }

    let step = 30 / dt;

    this._x = this._x + step * this.v.x;
    this._y = this._y + step * this.v.y;
  }
}
