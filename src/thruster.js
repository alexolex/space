import { sphericalToCartesian } from "/src/utils.js";
import SphericalBody from "/src/spherical_body.js";

export class AzimuthThruster {
    constructor(ctx) {

        this._value = 0;
        this._step = 5;
        this._ctx = ctx;
    }

    left() {
        this._value = this._step;

    }

    right() {
        this._value = -1 * this._step;
    }

    update() {
    }
}

export class Thruster extends SphericalBody {
    constructor(ctx, scr, angle) {

        super(ctx, scr);
        this._angle = angle;
        this._value = 0.0;

        this._is_on = false;
        this._ctx = ctx;
    }

    on(angle) {
        this._is_on = true;
        this._angle = angle;
    }

    off() {
        this._is_on = false;
    }

    update(dt, az, incl) {
        this._azimuth = az;
        this._inclination = incl;

        //var dt_sec = dt / 1000;
        // var value_step = 10;
        // var max_value = 1000;
        if (this._is_on) {
            this._value = 1000;
            // if (this._value < max_value) {
            //     this._value += value_step;
            // }
        }
        else {
            this._value = 0;
            // this._value -= value_step;
            // if (this._value < 0){
            //     this._value = 0;
            // }
        }
    }

    draw(base_angle) {

        if (this._is_on) {
            var d = 25;
            var engine = [
                { "angle": 0, "dist": -1 * d },
                { "angle": 160, "dist": 15 },
                { "angle": 200, "dist": 15 },
                { "angle": 0, "dist": -1 * d }
            ]

            this.render(engine, base_angle, "#A00", "#A00");
        }
    }
}