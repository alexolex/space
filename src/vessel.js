import SphericalBody from "/src/spherical_body.js";

export default class Vessel extends SphericalBody {
    constructor(ctx, scr) {
        super(ctx, scr);

        this._r = 20;
        this._rotation = 90;

        var ship = this;
        document.addEventListener("keydown", e => {

            var rot_step = 5;
            switch (e.keyCode) {
                case 38:
                    // rear thrusters
                   
                    break;
                case 40:
                    // front thrusters
                    break;
                case 37:
                    // rotate clockwise
                    ship._rotation = ship._rotation + rot_step;
                    if (ship._rotation > 360) ship._rotation -= 360;
                    break;
                case 39:
                    // rotate counterclockwise
                    ship._rotation = ship._rotation - rot_step;
                    if (ship._rotation < -360) ship._rotation += 360;
                    break;
                default:
                    break;
            }
        });
    }

    toCartesian(angle, dist) {
        return {
            "dx": dist * Math.cos((angle + this._rotation) * Math.PI / 180),
            "dy": -dist * Math.sin((angle + this._rotation) * Math.PI / 180),
        }
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
    }
}