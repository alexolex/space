
export default class Thruster {
    constructor(ctx, scr, angle) {

        this._angle = angle;
        this._value = 0.0;

        // 0: rear
        this._is_on = false;
    }

    on(angle){
        this._is_on = true;
        this._angle = angle;

        this._value = 1000;

        //this.update();
    }

    off(){
        this._is_on = false;
        this._value = 0;
    }

    update(dt) {
        
        // var value_step = 1;
        // var max_value = 100;

        // if (this._is_on) {
        //     if (this._value < max_value) {
        //         this._value += value_step;
        //     }            
        // }
        // else if (this._value > 0) {
        //     //this._value -= value_step;
        // }
    }

    // // TODO: not here
    // get_acc_vec() {
    //     var value = this._value;
    //     var angle = this._angle * Math.PI / 180;
    //     var w = 0.05; 

    //     return {
    //         "x" : value * Math.cos(angle) * w,
    //         "y" : value * Math.sin(angle) * w
    //     }
    // }
}