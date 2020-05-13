import Body from "/src/body.js";

export default class Ship extends Body {
  constructor(ctx, scr) {
    super(ctx, scr);

    this._w = 20;
    this._h = 20;

    this._accMod = 0;
    this._accVec = {
      "dx" : 0,
      "dy" : 0
    };

    this._x = 20;
    this._y = 300;
    this._r = 0;
    this._v.x = 0;
    this._v.y = 0;
    this.color = "#888"

    var ship = this;
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 38:
          // rear thruster
  
          var accXY = this.toXY(0, 1); 
          
          var curAccMod = Math.sqrt(Math.pow(this._accVec.dx, 2.0) + Math.pow(this._accVec.dy, 2.0));
          //TODO: ship's acc is bound by force that thruster gives, not by itself.
          var maxAcc = 3.0;

          //TODO: update _accVec in "update" method. 
          //TODO: Here update only thruster's force.
          if (curAccMod < maxAcc){
            ship._accVec = {
              "dx" : ship._accVec.dx + accXY.dx * 0.1,
              "dy" : ship._accVec.dy + accXY.dy * 0.1
            }
          }
          else{
            ship._accVec = {
              "dx" : (ship._accVec.dx / curAccMod) * (maxAcc - 0.1),
              "dy" : (ship._accVec.dy / curAccMod) * (maxAcc - 0.1)
            }
          }

          break;
        case 40:
          // front thruster
          break;
        case 37:
          //rotate left
          ship._r = ship._r + 5;
          if (ship._r > 360) ship._r-=360;          
          break;
        case 39:
          //rotate right
          ship._r = ship._r - 5;
          if (ship._r < -360) ship._r+=360;
          break;
        default:
          break;
      }
    });
  }

  toXY(r, d) {
    return {
      "dx" : d * Math.cos((r + this._r) * Math.PI / 180),
      "dy" : -d * Math.sin((r + this._r) * Math.PI / 180),
    }
  }

  update(dt) {
    // delta time
    if (!dt) return;

    var weight = 0.005;
    
    this._x = this._x + weight * 0.5 * this._accVec.dx * Math.pow(dt, 2.0);
    this._y = this._y + weight * 0.5 * this._accVec.dy * Math.pow(dt, 2.0);
  }

  drawPanel(){
    
    var accMod = Math.abs(Math.sqrt(Math.pow(this._accVec.dx, 2.0) + Math.pow(this._accVec.dy, 2.0)));    

    this.print(
      `ACC: [${accMod.toFixed(2)}] (${this._accVec.dx.toFixed(2)}, ${this._accVec.dy.toFixed(2)})`, 
      10, 
      this._scr.h - 30);
    this.print(`ROT: ${this._r}°`, 10, this._scr.h - 14);


  }

  draw() {    
    var d = this._w / 2;
    var x = this._x;
    var y = this._y;

    this._ctx.beginPath();

    var rot = [
      { "r": 0,   "d": this._w/2 },
      { "r": 135, "d": this._w/2 },
      { "r": 225, "d": this._w/2 },
      { "r": 0,   "d": this._w/2 }
    ]    

    var p0 = this.toXY(rot[0].r, rot[0].d);
    this._ctx.moveTo(this._x + p0.dx, this._y + p0.dy);

    var p1 = this.toXY(rot[1].r, rot[1].d);
    this._ctx.lineTo(this._x + p1.dx, this._y + p1.dy);

    var p2 = this.toXY(rot[2].r, rot[2].d);
    this._ctx.lineTo(this._x + p2.dx, this._y + p2.dy);

    var p3 = this.toXY(rot[3].r, rot[3].d);
    this._ctx.lineTo(this._x + p3.dx, this._y + p3.dy);


    this._ctx.strokeStyle = "#000";
    this._ctx.stroke();    

    this.drawPanel();
  }
}
