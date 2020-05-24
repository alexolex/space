export default class Screen {
  constructor(ctx, w, h) {
    this._w = w;
    this._h = h;

    this._ctx = ctx;

    this._azimuth = 0.0;
    this._inclination  = 0.0;

    this._radius = 800;
    this._view_angle_sin = (this._w / 2) / this._radius;

    this._view_angle = Math.fround(Math.asin(this._view_angle_sin) * 180 / Math.PI);

    document.addEventListener("keydown", e => {
      
      var step = 1;
      switch (e.keyCode) {
        case 65:
          //a left
          this._azimuth += step;
          if (this._azimuth >= 360){
            this._azimuth -= 360;
          }
          break;
        case 68:
          //d right
          this._azimuth -= step;
          if (this._azimuth < 0){
            this._azimuth = 360 + this._azimuth;
          }
          break;
          
        case 87:
          //w up
          this._inclination += step;
          if (this._inclination >= 360){
            this._inclination -= 360;
          }
          break;
        case 83:
          //s down
          this._inclination -= step;
          if (this._inclination < 0){
            this._inclination = 360 + this._inclination;
          }
          break;
        default:
          break;
      }
    });// a=65, d=68, w=87, s=83

  }

  clear() {
    this._ctx.clearRect(0, 0, this._w, this._h);
  }

  draw() {
    this._ctx.font = "15px Arial";
    this._ctx.fillStyle = "#000";
    this._ctx.fillText(`${this._azimuth}, ${this._inclination }`, 10, this._h - 15);
  }

  in_view(az){

      var lb = this._azimuth + this._view_angle;
      var rb = this._azimuth - this._view_angle;
      
      /*
    scr.az   lb;   rb

        30: 60; 0

        20: 50; 360 - 10
        10: 40; 360 - 20
        0: 30; 360 - 30
                         lb < 360 && az <= lb || az >= (360 + rb)
      350:  380 - 360 = 20; 320
      340:  370 - 360 = 10; 310
      330:  360 - 360 = 0; 300
                         lb >= 360 && az <= (lb - 360) && az >= rb
 &&      */

      if (lb < 360 && rb >= 0) {
        return az >= rb && az <= lb;
      }
      else {
        // Options left: lb >= 360 || rb < 0
        if (lb < 360){
          return az <= lb || az >= 360+ rb;
        }
        else{
          return az <= (lb - 360) || az >= rb;
        }
      }

      
  }
}
