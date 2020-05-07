import Body from "/src/body.js";

export default class Ship extends Body {
  constructor(ctx, scr) {
    super(ctx, scr);

    var ship = this;
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 38:
          //up
          //ship._v.x = 0;
          ship._v.y = ship._v.y - 1;
          break;
        case 40:
          //down
          //ship._v.x = 0;
          ship._v.y = ship._v.y + 1;
          break;
        case 37:
          //left
          ship._v.x = ship._v.x - 1;
          //ship._v.y = 0;
          break;
        case 39:
          //right
          ship._v.x = ship._v.x + 1;
          // ship._v.y = 0;
          break;
        default:
          break;
      }
    });
  }

  draw() {
    //this._ctx.fillStyle = this.color;
    //this._ctx.fillRect(this.x, this.y, this.w, this.h);

    super.draw();

    this._ctx.beginPath();
    this._ctx.moveTo(this._x, this._y - this._h / 2);
    this._ctx.lineTo(this._x - this._w / 2, this._y + this._h / 2);
    this._ctx.lineTo(this._x + this._w / 2, this._y + this._h / 2);
    this._ctx.lineTo(this._x, this._y - this._h / 2);

    this._ctx.fillStyle = "#fff";
    this._ctx.fill();
    this._ctx.strokeStyle = this.color;
    this._ctx.stroke();
  }  
}
