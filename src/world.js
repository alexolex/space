import Body from "/src/body.js";

export default class World {
  constructor(ctx, scr, bodiesNum) {
    this._bodies = Array(bodiesNum)
      .fill()
      .map(i => new Body(ctx, scr, i));

    //TODO: do we need scr here?
    // this._scr = scr;
    this._ctx = ctx;
  }

  addBody(body) {
    this._bodies.push(body);
  }

  collide(bi, bj) {
    var dx = bi._x - bj._x;
    var dy = bi._y - bj._y;
    var d = Math.sqrt(Math.pow(dx, 2.0) + Math.pow(dy, 2.0));

    if (d <= bi.getR() + bj.getR()) {
      // collision
      bi.overlaps = true;
      var buf = {
        x: bi._v.x,
        y: bi._v.y
      };

      bi._v.x = bj._v.x;
      bi._v.y = bj._v.y;

      bj._v.x = buf.x;
      bj._v.y = buf.y;

      // split bodies
      var offset = bi.getR() + bj.getR() - d;

      bi._x = bi._x + offset * bi._v.x;
      bi._y = bi._y + offset * bi._v.y;

      bj._x = bj._x + offset * bj._v.x;
      bj._y = bj._y + offset * bj._v.y;
    }

    return { dAbs: d, dX: dx, dY: dy };
  }

  update(dt) {
    for (var i = 0; i < this._bodies.length; ++i) {
      var bi = this._bodies[i];
      bi.update(dt);
      bi.draw();

      for (var j = i + 1; j < this._bodies.length; ++j) {
        var bj = this._bodies[j];

        var c = this.collide(bi, bj);

        this._ctx.font = "15px Arial";
        this._ctx.fillStyle = "#000";
        this._ctx.fillText(
          Math.floor(c.dAbs),
          Math.min(bi._x, bj._x) + Math.abs(c.dX) / 2,
          Math.min(bi._y, bj._y) + Math.abs(c.dY) / 2
        );

        this._ctx.beginPath();
        this._ctx.moveTo(bi._x, bi._y);
        this._ctx.lineTo(bj._x, bj._y);
        this._ctx.stroke();
      }
    }
  }
}
