import { sphericalToCartesian } from "/src/utils.js";

export default class Thruster {
    constructor(ctx, scr, angle) {

        this._angle = angle;
        this._value = 0.0;     

        this._is_on = false;
        this._ctx = ctx;
    }

    on(angle){
        this._is_on = true;
        this._angle = angle;
    }

    off(){
        this._is_on = false;
    }

    update(dt) {
        
        var dt_sec = dt / 1000;

        // per sec
        var value_step = 3000;
        
        var max_value = 100;

        if (this._is_on) {

            if (this._value < max_value) {
                this._value += value_step * dt_sec;
            }            
        }
        else {            
            this._value -= value_step * dt_sec * 0.5;
            if (this._value < 0){
                this._value = 0;
            }
        }
    }

    draw(x, y, angle){
        
        
        var shape = [
            { "angle": 0, "dist": -5 },
            { "angle": 150, "dist": 20 },
            { "angle": 210, "dist": 20 },
            { "angle": 0, "dist": -5 }
        ]
        
        this._ctx.beginPath();

        var p0 = sphericalToCartesian(shape[0].angle - angle, shape[0].dist);  
        this._ctx.moveTo(x + p0.x, y + p0.y);

        for (var i = 1; i < shape.length; ++i) {

            var pi = sphericalToCartesian(shape[i].angle - angle, shape[i].dist);
            this._ctx.lineTo(x + pi.x, y + pi.y);
        };
        
        this._ctx.strokeStyle = "#A00";
        this._ctx.stroke();
        this._ctx.fillStyle = "#A00";
        this._ctx.fill();

        
        this._ctx.beginPath();
        this._ctx.moveTo(x + p0.x, y + p0.y);

        var thrust_length = 0;
        if (this._value > 50){
            thrust_length = 100 - 1/(this._value * 0.001);
        }
        var p = sphericalToCartesian(shape[0].angle - angle, shape[0].dist - thrust_length);
        this._ctx.lineTo(x + p.x, y + p.y);
        this._ctx.strokeStyle = "#A00";
        this._ctx.stroke();
    }
}