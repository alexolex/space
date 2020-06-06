import SphericalBody from "/src/spherical_body.js";
import { Thruster, AzimuthThruster } from "/src/thruster.js";
import { round, sphericalToCartesian } from "/src/utils.js";

export default class Vessel extends SphericalBody {
    constructor(ctx, scr) {
        super(ctx, scr);

        this._r = 15;
        this._direction_angle = 0;

        // vessel's current acceleration vector
        this._vel = {
            "x": 0.0,
            "y": 0.0
        }

        this._thruster = new Thruster(ctx, scr, this._direction_angle);
        this._az_thruster = new AzimuthThruster(ctx);

        var ship = this;
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 38:
                    ship._thruster.off();
                    break;
            }
        });

        document.addEventListener("keydown", e => {

            var rot_step = 5;

            switch (e.keyCode) {
                case 38:
                    // rear thrusters
                    ship._thruster.on(this._direction_angle);
                    break;
                case 40:
                    // front thrusters
                    break;
                case 37:
                    // rotate clockwise
                    // ship._direction_angle = ship._direction_angle + rot_step;
                    // if (ship._direction_angle > 360) ship._direction_angle -= 360;
                    ship._az_thruster.left();
                    ship.update_direction_angle();
                    break;
                case 39:
                    // rotate counterclockwise
                    // ship._direction_angle = ship._direction_angle - rot_step;
                    // if (ship._direction_angle < 0) ship._direction_angle += 360;
                    ship._az_thruster.right();
                    ship.update_direction_angle();
                    break;
                default:
                    break;
            }
        });
    }

    update_direction_angle() {
        this._direction_angle += this._az_thruster._value;
        if (this._direction_angle > 360) { this._direction_angle -= 360; }
        if (this._direction_angle < 0) { this._direction_angle += 360; }
    }

    getCartesianOffset(angle, dist) {
        return {
            "dx": dist * Math.cos((angle + this._direction_angle) * Math.PI / 180),
            "dy": dist * Math.sin((angle + this._direction_angle) * Math.PI / 180),
        }
    }

    update(dt) {
        if (!dt) return;

        var dt_sec = dt / 1000;
                
        var thr = this._thruster;

        // acceleration from the thruster
        var acc = {
            "x": thr._value * Math.cos(thr._angle * Math.PI / 180),
            "y": thr._value * Math.sin(thr._angle * Math.PI / 180)
        };
        this.print(`ACC: [${acc.x.toFixed(2)}, ${acc.y.toFixed(2)}]`, 10, 100);

        // velocity update
        this._vel = {
            "x": this._vel.x + acc.x * dt_sec,
            "y": this._vel.y + acc.y * dt_sec
        }

        // displacement update
        var dx = this._vel.x * dt_sec;
        var dy = this._vel.y * dt_sec;
        this.print(`dx, dy: ${dx.toFixed(1)}, ${dy.toFixed(1)}`, 10, 60);

        var newX = this.getX() + dx;
        var newY = this.getY() - dy;

        this.print(`DIR: ${this._direction_angle}`, 10, 80);

        // Cartesians to spherical
        var newAz = round(this._scr._azimuth - Math.asin((newX - this._scr._w / 2) / this._scr._radius) * 180 / Math.PI);
        var newIncl = round(this._scr._inclination - Math.asin((newY - this._scr._h / 2) / this._scr._radius) * 180 / Math.PI);

        this._azimuth = newAz;
        if (this._azimuth > 360) {
            this._azimuth -= 360;
        }
        if (this._azimuth < 0) {
            this._azimuth += 360;
        }

        this._inclination = newIncl;
        if (this._inclination > 360) {
            this._inclination -= 360;
        }
        if (this._inclination < 0) {
            this._inclination += 360;
        }

        // Attach the screen to the vessel
        this._scr._azimuth = this._azimuth;
        this._scr._inclination = this._inclination;

        thr.update(dt, this._azimuth, this._inclination);
    }

    draw() {

        var x = this.getX();
        var y = this.getY();

        var shape = [
            { "angle": 0, "dist": this._r },
            { "angle": 135, "dist": this._r },
            { "angle": 225, "dist": this._r },
            { "angle": 0, "dist": this._r }
        ]

        this.render(shape, this._direction_angle, "#ABC", "#ABC");

        this._thruster.draw(this._direction_angle);
        this.drawDashboard();
    }

    drawDashboard() {

        this.print(`VEL: [${this._vel.x.toFixed(2)}, ${this._vel.y.toFixed(2)}]`, 10, 20);

        this.print(`THR: ${this._thruster._value.toFixed(2)}, ${this._thruster._angle.toFixed(2)}`, 10, 40);
    }
}