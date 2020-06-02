export default class Screen {
  constructor(ctx, w, h) {
    this._w = w;
    this._h = h;

    this._ctx = ctx;

    this._azimuth = 0.0;
    this._inclination  = 0.0;

    this._radius = 800;
    this._az_range_sin = (this._w / 2) / this._radius;
    this._incl_range_sin = (this._h / 2) / this._radius;

    this._az_range = Math.fround(Math.asin(this._az_range_sin) * 180 / Math.PI);
    this._incl_range = Math.fround(Math.asin(this._incl_range_sin) * 180 / Math.PI);

    // document.addEventListener("keydown", e => {
      
    //   var step = 1;
    //   switch (e.keyCode) {
    //     case 65:
    //       //a left
    //       this._azimuth += step;
    //       if (this._azimuth >= 360){
    //         this._azimuth -= 360;
    //       }
    //       break;
    //     case 68:
    //       //d right
    //       this._azimuth -= step;
    //       if (this._azimuth < 0){
    //         this._azimuth = 360 + this._azimuth;
    //       }
    //       break;
          
    //     case 87:
    //       //w up
    //       this._inclination += step;
    //       if (this._inclination >= 360){
    //         this._inclination -= 360;
    //       }
    //       break;
    //     case 83:
    //       //s down
    //       this._inclination -= step;
    //       if (this._inclination < 0){
    //         this._inclination = 360 + this._inclination;
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // });// a=65, d=68, w=87, s=83

  }

  clear() {
    this._ctx.clearRect(0, 0, this._w, this._h);
  }

  draw() {
    this._ctx.font = "15px Arial";
    this._ctx.fillStyle = "#000";
    this._ctx.fillText(`SCR_AZ, SCR_INCL: ${this._azimuth}, ${this._inclination }`, 10, this._h - 15);
  }

  in_view(az, incl){
    return this.in_az_range(az) && this.in_incl_range(incl);
  }

  in_incl_range(incl){

    var top = this._inclination + this._incl_range;
    var btm = this._inclination - this._incl_range;      

    if (top < 360 && btm >= 0) {
      return incl >= btm && incl <= top;
    }
    else {
      
      if (top < 360){
        return incl <= top || incl >= 360 + btm;
      }
      else{
        return incl <= (top - 360) || incl >= btm;
      }
    }
}

  in_az_range(az){

      var lb = this._azimuth + this._az_range;
      var rb = this._azimuth - this._az_range;      

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
