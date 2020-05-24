
export default class World {
  constructor(ctx, scr) {
    this._bodies = Array();
      
    // ?
    this._scr = scr;
    this._ctx = ctx;
  }

  addBody(body) {
    this._bodies.push(body);
  }  

  update(dt) {
    for (var i = 0; i < this._bodies.length; ++i) {
      var bi = this._bodies[i];

      bi.update(dt);

      
      if (this._scr.in_view(bi._azimuth, bi._inclination)){
                  
            // bi is within the view
            bi.draw();
      }
    }
  }
}
