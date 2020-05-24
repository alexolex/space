
export default class Thruster {
    constructor(ctx, scr) {

        //this._thrust_angle = 0;

        this._acceleration = 0.0;
        // 0: rear
        this._is_on = false;
    }

    on(){
        this._is_on = true;
    }

    off(){
        this._is_on = false;
    }

    update(dt) {
        // linear
        if (this._is_on && this._acceleration < 100) {
            this._acceleration += 1.0;
        }
        else if (this._acceleration > 0) {
            this._acceleration -= 1.0;
        }
    }
}