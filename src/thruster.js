
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
        var acc_step = 0.01;
        var max_acc = 0.1;

        if (this._is_on) {
            if (this._acceleration < max_acc) {
                this._acceleration += acc_step;
            }
            else {
                // this._acceleration = acc_step;
            }
        }
        else if (this._acceleration > 0) {
            //this._acceleration -= acc_step;
        }
    }
}