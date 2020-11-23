import SphericalBody from "/src/spherical_body.js";
import { Thruster, RotationThruster } from "/src/thruster.js";
import { round } from "/src/utils.js";

const MAX_DISPLACEMENT = 5.0;

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
        this._rot_thruster = new RotationThruster(ctx);

        var v = this;
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 38:
                    v._thruster.off();
                    break;
                case 37:
                    v._rot_thruster.off();
                    break;
                case 39:
                    v._rot_thruster.off();
                    break;
            }
        });

        document.addEventListener("keydown", e => {

            switch (e.keyCode) {
                case 38:
                    // rear thrusters
                    v._thruster.on(this._direction_angle);
                    break;
                case 40:
                    // front thrusters
                    break;
                case 37:
                    // rotate clockwise
                    this._rot_thruster.left();
                    break;
                case 39:
                    // rotate counterclockwise
                    this._rot_thruster.right();
                    break;
                default:
                    break;
            }
        });
    }

    update(dt) {
        if (!dt) return;

        var dt_sec = dt / 1000;

        // Rotation
        this._direction_angle = this._direction_angle + this._rot_thruster._value;
        if (this._direction_angle > 360) this._direction_angle -= 360;
        if (this._direction_angle < 0) this._direction_angle += 360;

        // Propulsion
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

        if (Math.abs(dx) >= MAX_DISPLACEMENT){
            dx = Math.sign(dx) * MAX_DISPLACEMENT;
        }

        if (Math.abs(dy) >= MAX_DISPLACEMENT){
            dy = Math.sign(dy) * MAX_DISPLACEMENT;
        }

        if (Math.abs(dx) < 1.5) {
            dx = 0.0;
        }
        if (Math.abs(dy) < 1.5) {
            dy = 0.0;
        }

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

        // Update child parts
        this._rot_thruster.update();

        thr.update(dt, this._azimuth, this._inclination, this._direction_angle);
    }

    draw() {
        var ship = [
            { "angle": 0, "dist": this._r },
            { "angle": 135, "dist": this._r },
            { "angle": 225, "dist": this._r },
            { "angle": 0, "dist": this._r }
        ]

        this.render(ship, this._direction_angle, "#ABC", "#ABC");

        // Render child parts
        this._thruster.draw(this._direction_angle);

        this.drawDashboard();
    }

    drawDashboard() {

        this.print(`VEL: [${this._vel.x.toFixed(2)}, ${this._vel.y.toFixed(2)}]`, 10, 20);

        this.print(`THR: ${this._thruster._value.toFixed(2)}, ${this._thruster._angle.toFixed(2)}`, 10, 40);
    }
}