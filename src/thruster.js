import { sphericalToCartesian } from "/src/utils.js";
import SphericalBody from "/src/spherical_body.js";

export class RotationThruster {
    constructor(ctx) {

        this._value = 0;
        this._mode = 0;
        this._ctx = ctx;
    }

    left() {
        this._mode = 1;
    }

    right() {
        this._mode = -1;
    }

    off() {
        this._mode = 0;
    }

    update() {
        this._value = 3 * this._mode;
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

    on() {
        this._is_on = true;
    }

    off() {
        this._is_on = false;
    }

    update(dt, az, incl, angle) {
        this._azimuth = az;
        this._inclination = incl;
        this._angle = angle;

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