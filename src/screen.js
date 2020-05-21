export default class Screen {
  constructor(ctx, w, h) {
    this.w = w;
    this.h = h;

    this._ctx = ctx;
    this._bodies = [];

    this._vp_a = 0.0;
    this._vp_b = 0.0;
    this._vp_angle = 15; 
    this._vp_radius = 1600; 

    var ship = this;
    document.addEventListener("keydown", e => {
      
      switch (e.keyCode) {
        case 65:
          //a left

          this._vp_a += 5;
          if (this._vp_a == 360){
            this._vp_a = 0;
          }

          break;
        case 68:
          //d right
          this._vp_a -= 5;
          if (this._vp_a == -360){
            this._vp_a = 0;
          }
          break;
          
        case 87:
          //w up
          this._vp_b -= 5;
          if (this._vp_b == -360){
            this._vp_b = 0;
          }
          break;
        case 83:
          //s down
          this._vp_b += 5;
          if (this._vp_b == 360){
            this._vp_b = 0;
          }
          break;
        default:
          break;
      }
    });// a=65, d=68, w=87, s=83

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
