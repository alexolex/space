import SphericalBody from "/src/spherical_body.js";
import Thruster from "/src/thruster.js";

export default class Vessel extends SphericalBody {
    constructor(ctx, scr) {
        super(ctx, scr);

        this._r = 20;
        this._direction_angle = 90;

        this._thruster = new Thruster(ctx, scr);

        var ship = this;

        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 38:
                    // rear thrusters
                    ship._thruster.off();
                    break;
            }
        });

        document.addEventListener("keydown", e => {

            var rot_step = 5;
            switch (e.keyCode) {
                case 38:
                    // rear thrusters
                    ship._thruster.on();
                    break;
                case 40:
                    // front thrusters
                    break;
                case 37:
                    // rotate clockwise
                    ship._direction_angle = ship._direction_angle + rot_step;
                    if (ship._direction_angle > 360) ship._direction_angle -= 360;
                    break;
                case 39:
                    // rotate counterclockwise
                    ship._direction_angle = ship._direction_angle - rot_step;
                    if (ship._direction_angle < -360) ship._direction_angle += 360;
                    break;
                default:
                    break;
            }
        });
    }

    toCartesian(angle, dist) {
        return {
            "dx": dist * Math.cos((angle + this._direction_angle) * Math.PI / 180),
            "dy": -dist * Math.sin((angle + this._direction_angle) * Math.PI / 180),
        }
    }

    update(dt) {
        if (!dt) return;

        this._thruster.update(dt);

        // TODO: make it move
        /*

            1. get current (x,y)
            2. update (x,y)
            3. translate to (az, incl)

        */

        var acc = this._thruster._acceleration;
        var dir = this._direction_angle * Math.PI / 180;

        var dx = 0.5 * acc * Math.cos(dir) * Math.pow(dt, 2.0);
        var dy = 0.5 * acc * Math.sin(dir) * Math.pow(dt, 2.0);

        var newX = this.getX() + dx;
        var newY = this.getY() - dy;

        this.print(`${newX.toFixed(1)}, ${newY.toFixed(1)}`, 10, 60);
        
        // TODO: to methods
        var newAz = this._scr._azimuth - Math.asin((newX - this._scr._w / 2) / this._scr._radius) * 180 / Math.PI;
        var newIncl = this._scr._inclination - Math.asin((newY - this._scr._h / 2) / this._scr._radius) * 180 / Math.PI;

        this.print(`${newAz.toFixed(1)}, ${newIncl.toFixed(1)}`, 10, 80);

        this._azimuth = newAz;
        this._inclination = newIncl;
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

        this._ctx.beginPath();

        var p0 = this.toCartesian(shape[0].angle, shape[0].dist);
        this._ctx.moveTo(x + p0.dx, y + p0.dy);
        for (var i = 1; i < shape.length; ++i) {

            var pi = this.toCartesian(shape[i].angle, shape[i].dist);
            this._ctx.lineTo(x + pi.dx, y + pi.dy);

        }

        this._ctx.strokeStyle = "#000";
        this._ctx.stroke();
        this._ctx.fill();

        this.drawDashboard();
    }

    drawDashboard() {

        this.print(
            `ACC: [${this._thruster._is_on}]`,
            10,
            40);

        this.print(`THR: ${this._thruster._acceleration.toFixed(3)}`);
    }
}