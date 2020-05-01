export default class Screen {
  constructor(ctx, w, h) {
    this.w = w;
    this.h = h;

    this._ctx = ctx;
  }

  clear() {
    this._ctx.clearRect(0, 0, this.w, this.h);
  }

  collidesTopWith(body) {
    return body.getY() <= 0;
  }

  collidesBottomWith(body) {
    return body.getY() + body.getH() >= this.h;
  }

  collidesLeftWith(body) {
    return body.getX() <= 0;
  }

  collidesRightWith(body) {
    return body.getX() + body.getW() >= this.w;
  }
}
