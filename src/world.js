
export default class World {
  constructor(ctx, scr) {
    this._bodies = Array();
    this._background_bodies = Array();
      
    // ?
    this._scr = scr;
    this._ctx = ctx;
  }

  addBody(body) {
    this._bodies.push(body);
  }

  addToBackground(body) {
    this._background_bodies.push(body);
  }

  update(dt) {    
    this._draw(this._background_bodies, dt);
    this._draw(this._bodies, dt);
  }

  _draw(bodies, dt){
    for (var i = 0; i < bodies.length; ++i) {
      var bi = bodies[i];

      bi.update(dt);
      
      if (this._scr.in_view(bi._azimuth, bi._inclination)){
                  
            // bi is within the view
            bi.draw();
      }
    }
  }
}
